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
import { isPlaceholderName, resolveDisplayName } from '../utils/greetingName';

/** Coerce Firestore Timestamp | Date | ISO string | seconds map → ISO string. */
function toIsoString(value: unknown): string | null {
  if (value == null || value === '') return null;
  if (typeof value === 'string') {
    const t = new Date(value).getTime();
    return Number.isNaN(t) ? null : new Date(value).toISOString();
  }
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value.toISOString();
  }
  if (typeof value === 'object') {
    const v = value as { toDate?: () => Date; seconds?: number; _seconds?: number; nanoseconds?: number };
    if (typeof v.toDate === 'function') {
      try {
        const d = v.toDate();
        return Number.isNaN(d.getTime()) ? null : d.toISOString();
      } catch {
        return null;
      }
    }
    const seconds = typeof v.seconds === 'number' ? v.seconds : typeof v._seconds === 'number' ? v._seconds : null;
    if (seconds != null) {
      const d = new Date(seconds * 1000);
      return Number.isNaN(d.getTime()) ? null : d.toISOString();
    }
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    const ms = value < 1e12 ? value * 1000 : value;
    const d = new Date(ms);
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
  }
  return null;
}

async function getProfile(uid: string): Promise<UserProfile | null> {
  try {
    const doc = await firestore().collection('users').doc(uid).get();
    if (!doc.exists()) return null;
    const data = doc.data() as UserProfile & Record<string, unknown>;
    const createdAt = toIsoString(data.createdAt) ?? toIsoString(data.joinDate) ?? data.createdAt;
    return {
      ...data,
      uid,
      createdAt: typeof createdAt === 'string' ? createdAt : new Date().toISOString(),
      displayName: resolveDisplayName({
        displayName: data.displayName,
        name: (data as { name?: string }).name,
        email: data.email,
      }),
    };
  } catch (error) {
    console.warn('[getProfile] read failed:', uid, error);
    return null;
  }
}

export type ClinicianPatientProfile = UserProfile & {
  linkedAtIso?: string | null;
  joinDateIso?: string | null;
  patientDocName?: string;
};

/** Full patient profile for clinician detail — merges users + patients docs. */
async function getPatientFullProfile(patientId: string): Promise<ClinicianPatientProfile | null> {
  try {
    const [userDoc, patientDoc, profileDoc] = await Promise.all([
      firestore().collection('users').doc(patientId).get().catch(() => null),
      firestore().collection('patients').doc(patientId).get().catch(() => null),
      firestore().collection('userProfiles').doc(patientId).get().catch(() => null),
    ]);

    const userData = userDoc?.exists() ? (userDoc.data() as Record<string, unknown>) : null;
    const patientData = patientDoc?.exists() ? (patientDoc.data() as Record<string, unknown>) : null;
    const extras = profileDoc?.exists() ? (profileDoc.data() as Record<string, unknown>) : null;

    if (!userData && !patientData && !extras) return null;

    const email =
      (userData?.email as string) ||
      (patientData?.email as string) ||
      (extras?.email as string) ||
      '';

    const displayName = resolveDisplayName({
      displayName: (userData?.displayName as string) || undefined,
      name: (patientData?.name as string) || (extras?.name as string) || undefined,
      email,
    });

    const createdAt =
      toIsoString(userData?.createdAt) ||
      toIsoString(patientData?.joinDate) ||
      toIsoString(extras?.joinDate) ||
      new Date().toISOString();

    const healthGoals =
      (userData?.healthGoals as string[] | undefined) ||
      (extras?.healthGoals as string[] | undefined) ||
      (patientData?.fitnessGoals as string[] | undefined) ||
      undefined;

    return {
      uid: patientId,
      email,
      displayName,
      role: 'patient',
      createdAt,
      subscriptionTier: (userData?.subscriptionTier as UserProfile['subscriptionTier']) ?? 'free',
      onboardingComplete: Boolean(userData?.onboardingComplete ?? patientData?.onboardingComplete),
      quizComplete: Boolean(userData?.quizComplete ?? patientData?.hasCompletedAssessment),
      primaryGoal: (userData?.primaryGoal as string) || undefined,
      healthGoals,
      appPurpose: userData?.appPurpose as UserProfile['appPurpose'],
      appPurposes: userData?.appPurposes as UserProfile['appPurposes'],
      experienceLevel: userData?.experienceLevel as UserProfile['experienceLevel'],
      trainingDaysPerWeek: userData?.trainingDaysPerWeek as number | undefined,
      dateOfBirth: (userData?.dateOfBirth as string) || (extras?.dateOfBirth as string) || undefined,
      heightCm: (userData?.heightCm as number) || (extras?.heightCm as number) || undefined,
      weightKg: (userData?.weightKg as number) || (extras?.weightKg as number) || undefined,
      gender: (userData?.gender as UserProfile['gender']) || undefined,
      avatarUrl: (userData?.avatarUrl as string) || undefined,
      clinicianId: (userData?.clinicianId as string) || (patientData?.linkedClinicianId as string) || undefined,
      linkedAtIso: toIsoString(patientData?.linkedAt) || toIsoString(patientData?.linkedClinicianAt),
      joinDateIso: toIsoString(patientData?.joinDate) || toIsoString(extras?.joinDate) || createdAt,
      patientDocName: (patientData?.name as string) || undefined,
    };
  } catch (error) {
    console.warn('[getPatientFullProfile] failed:', patientId, error);
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
  try {
    const snap = await firestore()
      .collection('users')
      .doc(uid)
      .collection('wellnessScores')
      .orderBy('date', 'desc')
      .limit(1)
      .get();
    if (snap.empty) return null;
    return snap.docs[0].data() as WellnessScore;
  } catch (error) {
    console.warn('[getLatestScore] failed:', uid, error);
    return null;
  }
}

function generateCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function formatRelativeTime(value: unknown): string {
  const iso = toIsoString(value);
  if (!iso) return 'Unknown';
  const diff = Date.now() - new Date(iso).getTime();
  if (Number.isNaN(diff)) return 'Unknown';
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function formatDate(value: unknown): string {
  const iso = toIsoString(value);
  if (iso) {
    try {
      return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return '—';
    }
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed || /invalid\s*date/i.test(trimmed)) return '—';
    const parsed = Date.parse(trimmed);
    if (!Number.isNaN(parsed)) {
      return new Date(parsed).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    // Already a human-readable date string from a prior format pass
    return trimmed;
  }
  return '—';
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

    let linked: LinkedPatient[] = subSnap.docs.map((d) => {
      const data = d.data() as Record<string, unknown>;
      return {
        patientId: (data.patientId as string) || d.id,
        patientName: (data.patientName as string) || '',
        patientEmail: (data.patientEmail as string) || '',
        linkedAt: toIsoString(data.linkedAt) ?? new Date().toISOString(),
        latestOverallScore: data.latestOverallScore as number | undefined,
        patientStatus: data.patientStatus as string | undefined,
        lastActivityAt: toIsoString(data.lastActivityAt) ?? undefined,
        lastCarePlanCompletedAt: toIsoString(data.lastCarePlanCompletedAt) ?? undefined,
      } satisfies LinkedPatient;
    });

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
            const name = resolveDisplayName({
              displayName: profile?.displayName,
              name: data.name as string,
              email: (data.email as string) ?? profile?.email,
            });
            return {
              patientId: doc.id,
              patientName: name,
              patientEmail: (data.email as string) ?? profile?.email ?? '',
              linkedAt:
                toIsoString(data.linkedAt) ||
                toIsoString(data.joinDate) ||
                profile?.createdAt ||
                new Date().toISOString(),
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
        patientName: '',
        patientEmail: '',
        linkedAt: new Date().toISOString(),
      }));
    }

    const summaries = await Promise.all(
      linked.map(async (lp) => {
        const profile = await getProfile(lp.patientId);
        let scoreDoc: WellnessScore | null = null;
        try {
          scoreDoc = await getLatestScore(lp.patientId);
        } catch (error) {
          console.warn('[fetchLinkedPatients] score read failed:', lp.patientId, error);
        }
        const wellnessScore = lp.latestOverallScore ?? scoreDoc?.overall ?? 0;
        const linkedIso = toIsoString(lp.linkedAt) ?? lp.linkedAt;
        const lastAt =
          toIsoString(lp.lastActivityAt) ??
          toIsoString(profile?.createdAt) ??
          linkedIso;
        const displayName = resolveDisplayName({
          displayName: isPlaceholderName(lp.patientName) ? profile?.displayName : lp.patientName,
          name: profile?.displayName,
          email: lp.patientEmail || profile?.email,
        });
        return {
          uid: lp.patientId,
          displayName,
          email: lp.patientEmail || profile?.email || '',
          wellnessScore,
          lastActive: formatRelativeTime(lastAt),
          linkedSince: formatDate(linkedIso),
          needsAttention: needsAttention(wellnessScore, lastAt ?? undefined, triage),
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
  ): Promise<{
    clinicianId: string;
    clinicianName: string;
    specialty?: string;
    email?: string;
    clinicName?: string;
  } | null> => {
    const patientDoc = await firestore().collection('patients').doc(patientId).get();
    const userDoc = await firestore().collection('users').doc(patientId).get();
    const patientData = patientDoc.data();
    const clinicianId =
      (patientData?.linkedClinicianId as string) ?? (userDoc.data()?.clinicianId as string);
    if (!clinicianId) return null;

    const clinicianUser = await firestore().collection('users').doc(clinicianId).get();
    const clinicianDoc = await firestore().collection('clinicians').doc(clinicianId).get();
    const clinicianData = clinicianDoc.data();
    const profile = clinicianData?.clinicianProfile as ClinicianProfileDoc | undefined;
    const clinicianUserData = clinicianUser.data();
    const profileName = [profile?.firstName, profile?.lastName].filter(Boolean).join(' ').trim();

    return {
      clinicianId,
      clinicianName:
        (patientData?.linkedClinicianName as string) ||
        profileName ||
        (clinicianData?.name as string) ||
        (clinicianUserData?.displayName as string) ||
        'Your clinician',
      specialty: profile?.specialty ?? (clinicianData?.specialty as string | undefined),
      email:
        profile?.workEmail ||
        (clinicianData?.workEmail as string | undefined) ||
        (clinicianData?.email as string | undefined) ||
        (clinicianUserData?.email as string | undefined),
      clinicName: profile?.clinicName,
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
    try {
      const snap = await firestore()
        .collection('customCarePlans')
        .where('patientId', '==', patientId)
        .orderBy('createdAt', 'desc')
        .get();
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as CustomCarePlan));
    } catch (error) {
      console.warn('[getCustomCarePlansForPatient] ordered query failed, falling back:', error);
      try {
        const snap = await firestore()
          .collection('customCarePlans')
          .where('patientId', '==', patientId)
          .get();
        return snap.docs
          .map((d) => ({ id: d.id, ...d.data() } as CustomCarePlan))
          .sort((a, b) => {
            const aT = toIsoString(a.createdAt) ?? '';
            const bT = toIsoString(b.createdAt) ?? '';
            return bT.localeCompare(aT);
          });
      } catch (fallbackError) {
        console.warn('[getCustomCarePlansForPatient] fallback failed:', fallbackError);
        return [];
      }
    }
  },

  /** Load merged patient profile for clinician detail screens. */
  getPatientFullProfile,

  formatPatientDate: formatDate,
  formatPatientRelativeTime: formatRelativeTime,

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
    const data = doc.data();
    const profile = data?.clinicianProfile as ClinicianProfileDoc | undefined;
    if (!profile) return null;
    return {
      ...profile,
      specialty: profile.specialty || (data?.specialty as string) || 'General Practice',
      clinicName: profile.clinicName || '',
      workEmail:
        profile.workEmail ||
        (data?.workEmail as string) ||
        (data?.email as string) ||
        '',
    };
  },

  isClinicianOnboardingComplete: async (clinicianId: string): Promise<boolean> => {
    try {
      const doc = await firestore().collection('clinicians').doc(clinicianId).get();
      if (!doc.exists()) return false;
      const data = doc.data() ?? {};
      const nested = data.clinicianProfile as { onboardingCompleted?: boolean } | undefined;
      if (nested?.onboardingCompleted === true) return true;
      if (data.onboardingCompleted === true) return true;
      // Native parity: completed onboarding writes onboardingCompleteDate at root.
      if (data.onboardingCompleteDate) return true;
      return false;
    } catch (error) {
      console.warn('[isClinicianOnboardingComplete] failed:', clinicianId, error);
      return false;
    }
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
