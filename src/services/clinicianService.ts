import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { ensureAuthReadyForUid, isFirebaseReady, NOOP_UNSUB } from './firebaseReady';
import { logFirestoreListenerError, snapshotDocs } from './firestoreHelpers';
import {
  buildClinicianDoc,
  buildNativeClinicianProfile,
  buildPatientDoc,
  buildCustomCarePlanNativeFields,
  denormalizeClinicianTopLevel,
  ensureClinicianSchema,
  enqueueCarePlanNotification,
  fsNow,
  fsTimestampFromIso,
  splitDisplayName,
} from './firestoreSchema';
import type {
  CarePlan,
  CarePlanTask,
  ClinicianProfileDoc,
  ConnectionRequest,
  CustomCarePlan,
  FitnessHubRecommendation,
  LinkedPatient,
  PatientSummary,
  UserProfile,
  WellnessScore,
} from '../types';
import { FITNESS_MODULES } from '../data/fitnessData';
import { clinicianTriageStorage, patientNeedsAttention } from './clinicianTriageStorage';

async function getProfile(uid: string): Promise<UserProfile | null> {
  try {
    const doc = await firestore().collection('users').doc(uid).get();
    return doc.exists() ? (doc.data() as UserProfile) : null;
  } catch (error) {
    console.warn('[getProfile] read failed:', uid, error);
    return null;
  }
}

async function resolvePatientProfile(patientId: string): Promise<UserProfile> {
  const fromDoc = await getProfile(patientId);
  if (fromDoc) return fromDoc;

  const authUser = auth().currentUser;
  if (authUser?.uid === patientId) {
    return {
      uid: patientId,
      email: authUser.email ?? '',
      displayName: authUser.displayName ?? 'Patient',
      role: 'patient',
      createdAt: new Date().toISOString(),
      subscriptionTier: 'free',
      onboardingComplete: false,
      quizComplete: false,
    };
  }

  throw new Error('Could not load your profile. Please sign out and sign in again.');
}

async function resolveClinicianName(clinicianId: string): Promise<string> {
  const profile = await getProfile(clinicianId);
  if (profile?.displayName) return profile.displayName;

  const clinicianDoc = await firestore().collection('clinicians').doc(clinicianId).get();
  const data = clinicianDoc.data();
  return (data?.name as string) ?? 'Your Clinician';
}

async function getLatestScore(uid: string): Promise<WellnessScore | null> {
  const snap = await firestore()
    .collection('users')
    .doc(uid)
    .collection('wellnessScores')
    .orderBy('date', 'desc')
    .limit(1)
    .get();
  if (snap.empty) return null;
  return snap.docs[0].data() as WellnessScore;
}

function generateCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  if (Number.isNaN(diff)) return 'Unknown';
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}

function needsAttention(
  score: number,
  lastActivityAt?: string,
  triage?: { lowScoreThreshold: number; inactivityDays: number }
): boolean {
  const settings = triage ?? { lowScoreThreshold: 4, inactivityDays: 3 };
  return patientNeedsAttention(score, lastActivityAt, settings);
}

async function syncClinicianUserDoc(clinicianId: string, profile: Partial<UserProfile>) {
  const full = profile as UserProfile;
  await ensureClinicianSchema(clinicianId, full);
}

async function syncPatientUserDoc(patientId: string, profile: Partial<UserProfile>) {
  const full = profile as UserProfile;
  await firestore().collection('patients').doc(patientId).set(
    buildPatientDoc({
      uid: patientId,
      email: full.email ?? '',
      displayName: full.displayName ?? 'Patient',
      role: 'patient',
      createdAt: full.createdAt ?? new Date().toISOString(),
      subscriptionTier: full.subscriptionTier ?? 'free',
      onboardingComplete: full.onboardingComplete ?? false,
      quizComplete: full.quizComplete ?? false,
    }),
    { merge: true }
  );
}

export const clinicianService = {
  ensureClinicianDoc: async (clinicianId: string) => {
    const profile = await getProfile(clinicianId);
    if (profile) {
      await ensureClinicianSchema(clinicianId, profile);
    }
  },

  ensureInviteCode: async (clinicianId: string): Promise<string> => {
    await clinicianService.ensureClinicianDoc(clinicianId);
    const doc = await firestore().collection('clinicians').doc(clinicianId).get();
    const existing = doc.data()?.clinicianInviteCode as string | undefined;
    if (existing) return existing;

    const code = generateCode();
    const now = fsNow();
    await firestore().collection('clinicians').doc(clinicianId).set(
      {
        clinicianInviteCode: code,
        clinicianInviteCodeUpdatedAt: now,
        lastUpdated: now,
      },
      { merge: true }
    );
    return code;
  },

  /** @deprecated Use ensureInviteCode — kept for compatibility */
  generateInviteCode: async (clinicianId: string) => clinicianService.ensureInviteCode(clinicianId),

  findClinicianByInviteCode: async (code: string): Promise<string | null> => {
    const normalized = code.trim().toUpperCase();
    const byMain = await firestore()
      .collection('clinicians')
      .where('clinicianInviteCode', '==', normalized)
      .limit(1)
      .get();
    if (!byMain.empty) return byMain.docs[0].id;

    const legacy = await firestore().collection('inviteCodes').doc(normalized).get();
    if (legacy.exists()) {
      const data = legacy.data();
      if (data?.clinicianId && !data.used) return data.clinicianId as string;
    }
    return null;
  },

  linkPatientToClinician: async (patientId: string, clinicianId: string) => {
    await ensureAuthReadyForUid(patientId);

    const [patientProfile, clinicianName] = await Promise.all([
      resolvePatientProfile(patientId),
      resolveClinicianName(clinicianId),
    ]);

    const now = new Date().toISOString();
    const score = await getLatestScore(patientId).catch(() => null);
    const overall = score?.overall ?? 0;

    // Core link — patient-owned writes (matches native iOS).
    try {
      await syncPatientUserDoc(patientId, patientProfile);
    } catch (error) {
      console.warn('[linkPatientToClinician] patient doc sync failed:', error);
    }

    await firestore().collection('patients').doc(patientId).set(
      {
        linkedClinicianId: clinicianId,
        linkedClinicianName: clinicianName,
        linkedClinicianAt: fsNow(),
        lastUpdated: fsNow(),
      },
      { merge: true }
    );

    await firestore().collection('users').doc(patientId).set(
      { clinicianId },
      { merge: true }
    );

    // Clinician mirror — patient writes their own linkedPatients doc (native iOS parity).
    try {
      await firestore()
        .collection('clinicians')
        .doc(clinicianId)
        .collection('linkedPatients')
        .doc(patientId)
        .set(
          {
            patientId,
            patientName: patientProfile.displayName,
            patientEmail: patientProfile.email,
            linkedAt: fsTimestampFromIso(now),
            latestOverallScore: overall,
            patientStatus: 'active',
          },
          { merge: true }
        );
    } catch (error) {
      console.warn('[linkPatientToClinician] linkedPatients mirror failed:', error);
    }

    // Denormalized extras — best effort; link still succeeds if these fail.
    try {
      await firestore()
        .collection('users')
        .doc(clinicianId)
        .set(
          { linkedPatients: firestore.FieldValue.arrayUnion(patientId) },
          { merge: true }
        );
    } catch (error) {
      console.warn('[linkPatientToClinician] clinician linkedPatients array failed:', error);
    }

    try {
      const clinicianProfile =
        (await getProfile(clinicianId)) ??
        ({
          uid: clinicianId,
          email: '',
          displayName: clinicianName,
          role: 'clinician',
          createdAt: now,
          subscriptionTier: 'free',
          onboardingComplete: true,
          quizComplete: false,
        } satisfies UserProfile);
      await clinicianService.createWelcomeCarePlan(patientId, clinicianId, clinicianProfile);
    } catch (error) {
      console.warn('[linkPatientToClinician] welcome care plan failed:', error);
    }

    return clinicianId;
  },

  connectWithCode: async (patientId: string, code: string) => {
    await ensureAuthReadyForUid(patientId);
    const clinicianId = await clinicianService.findClinicianByInviteCode(code);
    if (!clinicianId) throw new Error('Invalid invite code');
    if (clinicianId === patientId) throw new Error('You cannot link to yourself');

    const patientDoc = await firestore().collection('patients').doc(patientId).get();
    const existing = patientDoc.data()?.linkedClinicianId as string | undefined;
    if (existing && existing !== clinicianId) {
      throw new Error('You are already linked to another clinician. Disconnect first.');
    }

    return clinicianService.linkPatientToClinician(patientId, clinicianId);
  },

  disconnectPatient: async (patientId: string, clinicianId: string) => {
    await firestore().collection('patients').doc(patientId).set(
      {
        linkedClinicianId: firestore.FieldValue.delete(),
        linkedClinicianName: firestore.FieldValue.delete(),
        linkedClinicianAt: firestore.FieldValue.delete(),
      },
      { merge: true }
    );
    await firestore()
      .collection('clinicians')
      .doc(clinicianId)
      .collection('linkedPatients')
      .doc(patientId)
      .delete();
    await firestore()
      .collection('users')
      .doc(patientId)
      .update({ clinicianId: firestore.FieldValue.delete() });
    await firestore()
      .collection('users')
      .doc(clinicianId)
      .update({ linkedPatients: firestore.FieldValue.arrayRemove(patientId) });
  },

  fetchLinkedPatients: async (clinicianId: string): Promise<PatientSummary[]> => {
    const triage = await clinicianTriageStorage.get();
    const subSnap = await firestore()
      .collection('clinicians')
      .doc(clinicianId)
      .collection('linkedPatients')
      .get();

    let linked: LinkedPatient[] = subSnap.docs.map((d) => d.data() as LinkedPatient);

    if (linked.length === 0) {
      const byPatientDoc = await firestore()
        .collection('patients')
        .where('linkedClinicianId', '==', clinicianId)
        .get();
      if (!byPatientDoc.empty) {
        linked = await Promise.all(
          byPatientDoc.docs.map(async (doc) => {
            const data = doc.data();
            const profile = await getProfile(doc.id);
            return {
              patientId: doc.id,
              patientName: (data.name as string) ?? profile?.displayName ?? 'Patient',
              patientEmail: (data.email as string) ?? profile?.email ?? '',
              linkedAt: new Date().toISOString(),
              latestOverallScore: undefined,
            } satisfies LinkedPatient;
          })
        );
      }
    }

    if (linked.length === 0) {
      const userDoc = await firestore().collection('users').doc(clinicianId).get();
      const ids = (userDoc.data()?.linkedPatients as string[]) ?? [];
      linked = ids.map((patientId) => ({
        patientId,
        patientName: 'Patient',
        patientEmail: '',
        linkedAt: new Date().toISOString(),
      }));
    }

    const summaries = await Promise.all(
      linked.map(async (lp) => {
        const profile = await getProfile(lp.patientId);
        const scoreDoc = await getLatestScore(lp.patientId);
        const wellnessScore = lp.latestOverallScore ?? scoreDoc?.overall ?? 0;
        const lastAt = lp.lastActivityAt ?? profile?.createdAt ?? lp.linkedAt;
        return {
          uid: lp.patientId,
          displayName: lp.patientName || profile?.displayName || 'Patient',
          email: lp.patientEmail || profile?.email || '',
          wellnessScore,
          lastActive: formatRelativeTime(lastAt),
          linkedSince: formatDate(lp.linkedAt),
          needsAttention: needsAttention(wellnessScore, lastAt, triage),
          patientStatus: lp.patientStatus,
        } satisfies PatientSummary;
      })
    );

    return summaries.sort((a, b) => {
      if (a.needsAttention !== b.needsAttention) return a.needsAttention ? -1 : 1;
      return a.wellnessScore - b.wellnessScore;
    });
  },

  watchLinkedPatients: (clinicianId: string, cb: (patients: PatientSummary[]) => void) => {
    if (!isFirebaseReady()) {
      cb([]);
      return NOOP_UNSUB;
    }
    return firestore()
      .collection('clinicians')
      .doc(clinicianId)
      .collection('linkedPatients')
      .onSnapshot(
        async (snap) => {
          if (!snap) return;
          const patients = await clinicianService.fetchLinkedPatients(clinicianId);
          cb(patients);
        },
        (error) => logFirestoreListenerError('watchLinkedPatients', error)
      );
  },

  getUnreadMessageCount: async (clinicianId: string, _patientIds?: string[]): Promise<number> => {
    const snap = await firestore()
      .collection('messageThreads')
      .where('clinicianId', '==', clinicianId)
      .get();
    return snap.docs.reduce((sum, d) => sum + ((d.data().clinicianUnread as number) ?? 0), 0);
  },

  getPatientClinicianInfo: async (
    patientId: string
  ): Promise<{ clinicianId: string; clinicianName: string; specialty?: string } | null> => {
    const patientDoc = await firestore().collection('patients').doc(patientId).get();
    const userDoc = await firestore().collection('users').doc(patientId).get();
    const patientData = patientDoc.data();
    const clinicianId =
      (patientData?.linkedClinicianId as string) ?? (userDoc.data()?.clinicianId as string);
    if (!clinicianId) return null;

    const clinicianUser = await firestore().collection('users').doc(clinicianId).get();
    const clinicianDoc = await firestore().collection('clinicians').doc(clinicianId).get();
    const profile = clinicianDoc.data()?.clinicianProfile as { specialty?: string } | undefined;

    return {
      clinicianId,
      clinicianName:
        (patientData?.linkedClinicianName as string) ??
        (clinicianUser.data()?.displayName as string) ??
        'Your clinician',
      specialty: profile?.specialty,
    };
  },

  getActiveCarePlanCount: async (clinicianId: string): Promise<number> => {
    const snap = await firestore()
      .collection('customCarePlans')
      .where('clinicianId', '==', clinicianId)
      .get();
    return snap.docs.filter((d) => !d.data().completedAt).length;
  },

  computeAnalytics: (patients: PatientSummary[]) => {
    const count = patients.length;
    const avgScore = count
      ? patients.reduce((s, p) => s + p.wellnessScore, 0) / count
      : 0;
    const attention = patients.filter((p) => p.needsAttention).length;
    const buckets = { excellent: 0, good: 0, fair: 0, low: 0 };
    patients.forEach((p) => {
      if (p.wellnessScore >= 8) buckets.excellent += 1;
      else if (p.wellnessScore >= 6) buckets.good += 1;
      else if (p.wellnessScore >= 4) buckets.fair += 1;
      else buckets.low += 1;
    });
    return { count, avgScore, attention, buckets };
  },

  createWelcomeCarePlan: async (
    patientId: string,
    clinicianId: string,
    clinicianProfile: UserProfile
  ): Promise<CarePlan> => {
    const now = new Date().toISOString();
    const planId = `plan_${Date.now()}`;
    const tasks: CarePlanTask[] = [
      {
        id: '1',
        title: 'Complete daily wellness check-in',
        description: 'Log mood, energy, and sleep each day.',
        type: 'habit',
        isComplete: false,
      },
      {
        id: '2',
        title: 'Follow your personalised daily plan',
        description: 'Complete at least 2 tasks from your daily plan.',
        type: 'goal',
        isComplete: false,
      },
    ];

    const carePlan: CarePlan = {
      id: planId,
      clinicianId,
      clinicianName: clinicianProfile.displayName,
      specialty: 'General Practice',
      title: 'Your Wellness Care Plan',
      tasks,
      createdAt: now,
      updatedAt: now,
    };

    await firestore()
      .collection('users')
      .doc(patientId)
      .collection('carePlans')
      .doc(planId)
      .set(carePlan);

    const customPlan: CustomCarePlan = {
      id: planId,
      clinicianId,
      clinicianName: clinicianProfile.displayName,
      patientId,
      planName: carePlan.title,
      description: 'Welcome care plan from your clinician.',
      recommendations: tasks.map((t, i) => ({
        id: t.id,
        type: 'task',
        title: t.title,
        description: t.description,
        order: i,
      })),
      createdAt: now,
      sentAt: now,
      planStatus: 'sent',
      ...buildCustomCarePlanNativeFields(planId),
    };

    await firestore().collection('customCarePlans').doc(planId).set({
      ...customPlan,
      createdAt: fsTimestampFromIso(now),
      sentAt: fsTimestampFromIso(now),
    });
    await enqueueCarePlanNotification({
      patientId,
      planId,
      planName: carePlan.title,
      clinicianName: clinicianProfile.displayName,
    });
    return carePlan;
  },

  createCustomCarePlan: async (input: {
    clinicianId: string;
    clinicianName: string;
    patientId: string;
    planName: string;
    description: string;
    personalNote?: string;
    taskTitles: string[];
  }): Promise<CustomCarePlan> => {
    const now = new Date().toISOString();
    const planId = `plan_${Date.now()}`;
    const tasks: CarePlanTask[] = input.taskTitles.map((title, i) => ({
      id: String(i + 1),
      title,
      description: input.personalNote ?? '',
      type: 'goal' as const,
      isComplete: false,
    }));

    const carePlan: CarePlan = {
      id: planId,
      clinicianId: input.clinicianId,
      clinicianName: input.clinicianName,
      specialty: 'General Practice',
      title: input.planName,
      tasks,
      createdAt: now,
      updatedAt: now,
    };

    const customPlan: CustomCarePlan = {
      id: planId,
      clinicianId: input.clinicianId,
      clinicianName: input.clinicianName,
      patientId: input.patientId,
      planName: input.planName,
      description: input.description,
      personalNote: input.personalNote,
      recommendations: tasks.map((t, i) => ({
        id: t.id,
        type: 'task',
        title: t.title,
        description: t.description,
        order: i,
      })),
      createdAt: now,
      sentAt: now,
      planStatus: 'sent',
      ...buildCustomCarePlanNativeFields(planId),
    };

    await firestore().collection('customCarePlans').doc(planId).set({
      ...customPlan,
      createdAt: fsTimestampFromIso(now),
      sentAt: fsTimestampFromIso(now),
    });
    await firestore()
      .collection('users')
      .doc(input.patientId)
      .collection('carePlans')
      .doc(planId)
      .set(carePlan);

    await enqueueCarePlanNotification({
      patientId: input.patientId,
      planId,
      planName: input.planName,
      clinicianName: input.clinicianName,
    });

    return customPlan;
  },

  getCustomCarePlansForPatient: async (patientId: string): Promise<CustomCarePlan[]> => {
    const snap = await firestore()
      .collection('customCarePlans')
      .where('patientId', '==', patientId)
      .orderBy('createdAt', 'desc')
      .get();
    return snap.docs.map((d) => d.data() as CustomCarePlan);
  },

  saveFitnessHubRecommendations: async (input: {
    clinicianId: string;
    clinicianName: string;
    patientId: string;
    patientName: string;
    moduleIds: string[];
    personalNote?: string;
  }) => {
    const now = new Date().toISOString();
    const recId = `rec_${Date.now()}`;
    const modules = input.moduleIds
      .map((id) => FITNESS_MODULES.find((m) => m.id === id))
      .filter(Boolean)
      .map((m) => ({
        id: m!.id,
        title: m!.title,
        description: m!.subtitle,
        icon: m!.icon,
        colorName: m!.color,
      }));

    const rec: FitnessHubRecommendation = {
      id: recId,
      clinicianId: input.clinicianId,
      clinicianName: input.clinicianName,
      patientId: input.patientId,
      patientName: input.patientName,
      recommendedModules: modules,
      personalNote: input.personalNote,
      createdAt: now,
    };

    await firestore()
      .collection('patients')
      .doc(input.patientId)
      .collection('fitnessHubRecommendations')
      .doc(recId)
      .set(rec);

    await firestore().collection('patients').doc(input.patientId).set(
      {
        hasFitnessHubRecommendations: true,
        lastFitnessHubRecommendationAt: now,
        lastFitnessHubRecommendationBy: input.clinicianId,
      },
      { merge: true }
    );

    return rec;
  },

  getPatientLinkStatus: async (patientId: string) => {
    const patientDoc = await firestore().collection('patients').doc(patientId).get();
    const userDoc = await firestore().collection('users').doc(patientId).get();
    const clinicianId =
      (patientDoc.data()?.linkedClinicianId as string) ??
      (userDoc.data()?.clinicianId as string);
    return clinicianId ?? null;
  },

  getLatestFitnessHubRecommendations: async (
    patientId: string
  ): Promise<FitnessHubRecommendation | null> => {
    const snap = await firestore()
      .collection('patients')
      .doc(patientId)
      .collection('fitnessHubRecommendations')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();
    if (snap.empty) return null;
    return snap.docs[0].data() as FitnessHubRecommendation;
  },

  watchFitnessHubRecommendations: (
    patientId: string,
    cb: (rec: FitnessHubRecommendation | null) => void
  ) => {
    if (!isFirebaseReady()) {
      cb(null);
      return NOOP_UNSUB;
    }
    return firestore()
      .collection('patients')
      .doc(patientId)
      .collection('fitnessHubRecommendations')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .onSnapshot(
        (snap) => {
          if (!snap?.docs?.length || snap.empty) {
            cb(null);
            return;
          }
          cb(snap.docs[0].data() as FitnessHubRecommendation);
        },
        (error) => logFirestoreListenerError('watchFitnessHubRecommendations', error)
      );
  },

  // ─── Clinician profile / onboarding ───────────────────────────────────────

  getClinicianProfile: async (clinicianId: string): Promise<ClinicianProfileDoc | null> => {
    const doc = await firestore().collection('clinicians').doc(clinicianId).get();
    const profile = doc.data()?.clinicianProfile as ClinicianProfileDoc | undefined;
    return profile ?? null;
  },

  isClinicianOnboardingComplete: async (clinicianId: string): Promise<boolean> => {
    const profile = await clinicianService.getClinicianProfile(clinicianId);
    return profile?.onboardingCompleted === true;
  },

  saveClinicianProfile: async (clinicianId: string, data: ClinicianProfileDoc) => {
    const userProfile = await getProfile(clinicianId);
    if (!userProfile) throw new Error('Clinician user profile not found');

    await clinicianService.ensureClinicianDoc(clinicianId);
    const { firstName, lastName } = splitDisplayName(
      [data.firstName, data.lastName].filter(Boolean).join(' ') || userProfile.displayName
    );
    const timeZone = data.timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'Europe/London';
    const nested = buildNativeClinicianProfile({
      ...data,
      firstName: data.firstName ?? firstName,
      lastName: data.lastName ?? lastName,
      workEmail: data.workEmail ?? userProfile.email,
      role: data.role ?? 'Physician',
      scopeOfPractice: data.scopeOfPractice ?? 'Selective',
      statesOfPractice: data.statesOfPractice?.length ? data.statesOfPractice : ['England'],
      timeZone,
      onboardingCompletedAt: data.onboardingCompleted
        ? data.onboardingCompletedAt ?? new Date().toISOString()
        : undefined,
      languagesSpoken: data.languagesSpoken?.length ? data.languagesSpoken : ['English'],
      communicationPreferences: data.communicationPreferences ?? [],
    });
    const topLevel = denormalizeClinicianTopLevel(nested, userProfile.email);

    await firestore().collection('clinicians').doc(clinicianId).set(
      {
        clinicianProfile: nested,
        ...topLevel,
        email: userProfile.email,
        name: [nested.firstName, nested.lastName].filter(Boolean).join(' ').trim() || userProfile.displayName,
      },
      { merge: true }
    );
  },

  // ─── Connection requests ────────────────────────────────────────────────────

  searchPatientByEmail: async (email: string): Promise<UserProfile | null> => {
    const normalized = email.trim().toLowerCase();

    const patientsSnap = await firestore()
      .collection('patients')
      .where('email', '==', normalized)
      .limit(1)
      .get();
    if (!patientsSnap.empty) {
      const doc = patientsSnap.docs[0];
      const data = doc.data();
      return {
        uid: doc.id,
        email: (data.email as string) ?? normalized,
        displayName: (data.name as string) ?? 'Patient',
        role: 'patient',
        createdAt: new Date().toISOString(),
        subscriptionTier: 'free',
        onboardingComplete: Boolean(data.onboardingComplete),
        quizComplete: Boolean(data.hasCompletedAssessment),
      };
    }

    const snap = await firestore()
      .collection('users')
      .where('email', '==', normalized)
      .limit(1)
      .get();
    if (snap.empty) return null;
    const profile = snap.docs[0].data() as UserProfile;
    if (profile.role === 'clinician') return null;
    return { ...profile, uid: snap.docs[0].id };
  },

  sendConnectionRequest: async (clinicianId: string, patientEmail: string) => {
    const clinician = await getProfile(clinicianId);
    if (!clinician) throw new Error('Clinician profile not found');

    const patient = await clinicianService.searchPatientByEmail(patientEmail);
    if (!patient) throw new Error('No patient account found with that email.');

    const linked = await clinicianService.getPatientLinkStatus(patient.uid);
    if (linked) throw new Error('This patient is already linked to a clinician.');

    const existing = await firestore()
      .collection('patients')
      .doc(patient.uid)
      .collection('pendingClinicianRequests')
      .where('clinicianId', '==', clinicianId)
      .where('status', '==', 'pending')
      .get();
    if (!existing.empty) throw new Error('A pending request already exists for this patient.');

    const requestId = `req_${Date.now()}`;
    const now = new Date().toISOString();
    const request: ConnectionRequest = {
      id: requestId,
      clinicianId,
      clinicianName: clinician.displayName,
      patientId: patient.uid,
      patientName: patient.displayName,
      patientEmail: patient.email,
      requestedAt: now,
      status: 'pending',
    };

    await syncPatientUserDoc(patient.uid, patient);

    await firestore()
      .collection('patients')
      .doc(patient.uid)
      .collection('pendingClinicianRequests')
      .doc(requestId)
      .set(request);

    await firestore()
      .collection('clinicians')
      .doc(clinicianId)
      .collection('outgoingRequests')
      .doc(requestId)
      .set(request);

    return request;
  },

  watchPendingRequestsForPatient: (
    patientId: string,
    cb: (requests: ConnectionRequest[]) => void
  ) => {
    if (!isFirebaseReady()) {
      cb([]);
      return NOOP_UNSUB;
    }
    return firestore()
      .collection('patients')
      .doc(patientId)
      .collection('pendingClinicianRequests')
      .where('status', '==', 'pending')
      .onSnapshot(
        (snap) => {
          cb(snapshotDocs(snap, (d) => d.data() as ConnectionRequest));
        },
        (error) => logFirestoreListenerError('watchPendingRequestsForPatient', error)
      );
  },

  approveConnectionRequest: async (patientId: string, requestId: string) => {
    const ref = firestore()
      .collection('patients')
      .doc(patientId)
      .collection('pendingClinicianRequests')
      .doc(requestId);
    const doc = await ref.get();
    if (!doc.exists()) throw new Error('Request not found');
    const request = doc.data() as ConnectionRequest;

    await clinicianService.linkPatientToClinician(patientId, request.clinicianId);
    await ref.delete();
    await firestore()
      .collection('clinicians')
      .doc(request.clinicianId)
      .collection('outgoingRequests')
      .doc(requestId)
      .delete()
      .catch(() => {});
    return request.clinicianId;
  },

  declineConnectionRequest: async (patientId: string, requestId: string) => {
    const ref = firestore()
      .collection('patients')
      .doc(patientId)
      .collection('pendingClinicianRequests')
      .doc(requestId);
    const doc = await ref.get();
    if (!doc.exists()) return;
    const request = doc.data() as ConnectionRequest;
    await ref.update({ status: 'declined' });
    await firestore()
      .collection('clinicians')
      .doc(request.clinicianId)
      .collection('outgoingRequests')
      .doc(requestId)
      .update({ status: 'declined' })
      .catch(() => {});
  },

  getCustomCarePlanById: async (planId: string): Promise<CustomCarePlan | null> => {
    if (!isFirebaseReady()) return null;
    const doc = await firestore().collection('customCarePlans').doc(planId).get();
    return doc.exists() ? (doc.data() as CustomCarePlan) : null;
  },

  linkCustomPlanToPatient: async (patientId: string, customPlan: CustomCarePlan) => {
    if (!isFirebaseReady()) return;
    const now = new Date().toISOString();
    const carePlan: CarePlan = {
      id: customPlan.id,
      clinicianId: customPlan.clinicianId,
      clinicianName: customPlan.clinicianName,
      specialty: 'General Practice',
      title: customPlan.planName,
      tasks: customPlan.recommendations.map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description ?? '',
        type: 'goal' as const,
        isComplete: false,
      })),
      createdAt: customPlan.createdAt ?? now,
      updatedAt: now,
    };
    await firestore()
      .collection('users')
      .doc(patientId)
      .collection('carePlans')
      .doc(customPlan.id)
      .set(carePlan);
    await firestore().collection('customCarePlans').doc(customPlan.id).set(
      { ...customPlan, patientId, planStatus: 'active' },
      { merge: true }
    );
  },

  getClinicalNotes: async (patientId: string): Promise<{ id: string; text: string; createdAt: string }[]> => {
    if (!isFirebaseReady()) return [];
    const snap = await firestore()
      .collection('patients')
      .doc(patientId)
      .collection('clinicalNotes')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as { text: string; createdAt: string }) }));
  },

  addClinicalNote: async (patientId: string, text: string) => {
    const note = { text, createdAt: new Date().toISOString() };
    if (!isFirebaseReady()) {
      return { id: `local_${Date.now()}`, ...note };
    }
    const ref = await firestore()
      .collection('patients')
      .doc(patientId)
      .collection('clinicalNotes')
      .add(note);
    return { id: ref.id, ...note };
  },
};
