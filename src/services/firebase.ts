// src/services/firebase.ts
// Install: npx react-native-firebase
// Add GoogleService-Info.plist to ios/ folder from Firebase Console

import auth from '@react-native-firebase/auth';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { ensureAuthReadyForUid, isFirebaseReady, NOOP_UNSUB } from './firebaseReady';
import { logFirestoreListenerError, snapshotDocs } from './firestoreHelpers';
import { syncNativeRoleDoc } from './firestoreSchema';
import { appConfig } from '../config/appConfig';
import type {
  UserProfile,
  RegisteredUser,
  WellnessScore,
  DailyPlan,
  CarePlan,
  Message,
  MessageThread,
  InboxThread,
  WellnessCategoryKey,
} from '../types';
import { logger } from '../utils/logger';

// ─── Auth ─────────────────────────────────────────────────────────────────

export const firebaseAuth = {
  signInWithEmail: (email: string, password: string) =>
    auth().signInWithEmailAndPassword(email, password),

  signUpWithEmail: (email: string, password: string) =>
    auth().createUserWithEmailAndPassword(email, password),

  signOut: () => auth().signOut(),

  deleteAccount: () => auth().currentUser?.delete(),

  onAuthStateChanged: (cb: (user: any) => void) =>
    auth().onAuthStateChanged(cb),

  sendEmailVerification: async () => {
    const currentUser = auth().currentUser;
    if (!currentUser) {
      throw new Error('No current user found');
    }
    // Prefer continue URL so the link lands on our confirmation page; if the
    // URL/domain is misconfigured in Firebase Console, fall back to the default
    // Firebase verification email (still verifies the account).
    try {
      await currentUser.sendEmailVerification({
        url: appConfig.emailVerificationContinueUrl,
        handleCodeInApp: false,
      });
      logger.log('Verification email sent successfully');
      return;
    } catch (primaryError: any) {
      console.warn(
        'Verification email with continue URL failed; retrying without ActionCodeSettings:',
        primaryError?.code ?? primaryError,
      );
      try {
        await currentUser.sendEmailVerification();
        logger.log('Verification email sent successfully (fallback)');
        return;
      } catch (fallbackError: any) {
        console.error('Failed to send verification email:', fallbackError);
        throw fallbackError;
      }
    }
  },

  sendPasswordResetEmail: (email: string) =>
    auth().sendPasswordResetEmail(email),

  currentUser: () => auth().currentUser,
};

// ─── User Profiles ────────────────────────────────────────────────────────

async function syncRegisteredUser(profile: UserProfile, batch?: FirebaseFirestoreTypes.WriteBatch): Promise<void> {
  if (batch) {
    await syncNativeRoleDoc(profile, batch);
    return;
  }
  await syncNativeRoleDoc(profile);
}

export const userService = {
  getProfile: async (uid: string): Promise<UserProfile | null> => {
    if (!isFirebaseReady()) return null;
    try {
      await ensureAuthReadyForUid(uid);
      const doc = await firestore().collection('users').doc(uid).get();
      return doc.exists() ? (doc.data() as UserProfile) : null;
    } catch (error) {
      console.warn('[userService] getProfile failed:', error);
      return null;
    }
  },

  createProfile: async (uid: string, data: Partial<UserProfile>) => {
    if (!isFirebaseReady()) {
      throw new Error('Firebase is not configured');
    }
    try {
      await ensureAuthReadyForUid(uid);

      const existingDoc = await firestore().collection('users').doc(uid).get();
      const existing = existingDoc.exists() ? (existingDoc.data() as UserProfile) : null;

      const now = new Date().toISOString();
      const profile: UserProfile = {
        uid,
        email: data.email ?? existing?.email ?? '',
        displayName: data.displayName ?? existing?.displayName ?? 'User',
        role: data.role ?? existing?.role ?? 'patient',
        createdAt: existing?.createdAt ?? now,
        subscriptionTier: existing?.subscriptionTier ?? data.subscriptionTier ?? 'free',
        onboardingComplete: data.onboardingComplete ?? existing?.onboardingComplete ?? false,
        quizComplete: data.quizComplete ?? existing?.quizComplete ?? false,
        streakFreezes: existing?.streakFreezes ?? data.streakFreezes ?? 1,
        csq: data.csq ?? existing?.csq ?? { identity: uid },
        ...data,
      };

      const batch = firestore().batch();
      batch.set(firestore().collection('users').doc(uid), profile, { merge: true });
      await syncRegisteredUser(profile, batch);
      await batch.commit();
    } catch (error) {
      console.warn('[userService] createProfile failed:', error);
      throw error;
    }
  },

  updateProfile: async (uid: string, data: Partial<UserProfile>) => {
    if (!isFirebaseReady()) return;
    try {
      await ensureAuthReadyForUid(uid);
      await firestore().collection('users').doc(uid).set(data, { merge: true });
    } catch (error) {
      console.warn('[userService] updateProfile failed:', error);
      return;
    }

    const shouldSyncRegistry =
      data.role !== undefined ||
      data.email !== undefined ||
      data.displayName !== undefined ||
      data.consentAccepted !== undefined ||
      data.medicalDisclaimerAcknowledged !== undefined ||
      data.ageConfirmed !== undefined ||
      data.onboardingComplete !== undefined ||
      data.quizComplete !== undefined ||
      data.primaryGoal !== undefined ||
      data.healthGoals !== undefined;

    if (shouldSyncRegistry) {
      try {
        const profile = await userService.getProfile(uid);
        if (profile) await syncRegisteredUser(profile);
      } catch (error) {
        console.warn('[userService] syncRegisteredUser failed:', error);
      }
    }
  },

  deleteProfile: async (uid: string) => {
    if (!isFirebaseReady()) return;
    await firestore().collection('users').doc(uid).delete();
  },

  watchProfile: (uid: string, cb: (profile: UserProfile) => void) => {
    if (!isFirebaseReady()) return NOOP_UNSUB;
    return firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot(
        (snap) => {
          if (snap?.exists()) cb(snap.data() as UserProfile);
        },
        (error) => logFirestoreListenerError('watchProfile', error)
      );
  },
};

// ─── Wellness ─────────────────────────────────────────────────────────────

export const wellnessService = {
  saveScore: async (uid: string, score: WellnessScore) => {
    if (!isFirebaseReady()) return;
    try {
      await ensureAuthReadyForUid(uid);
      const userRef = firestore().collection('users').doc(uid);
      await userRef
        .collection('wellnessScores')
        .add(score);
      await userRef.set({ latestWellnessScore: score }, { merge: true });
    } catch (error) {
      console.warn('[wellnessService] saveScore failed:', error);
      throw error;
    }
  },

  getLatestScore: async (uid: string): Promise<WellnessScore | null> => {
    if (!isFirebaseReady()) return null;
    const snap = await firestore()
      .collection('users')
      .doc(uid)
      .collection('wellnessScores')
      .orderBy('date', 'desc')
      .limit(1)
      .get();
    if (snap.empty) return null;
    return snap.docs[0].data() as WellnessScore;
  },

  getScoreHistory: async (uid: string, days = 7): Promise<WellnessScore[]> => {
    if (!isFirebaseReady()) return [];
    const snap = await firestore()
      .collection('users')
      .doc(uid)
      .collection('wellnessScores')
      .orderBy('date', 'desc')
      .limit(days)
      .get();
    return snap.docs.map((d) => d.data() as WellnessScore);
  },
};

// ─── Daily Plan ───────────────────────────────────────────────────────────

export const planService = {
  getDailyPlan: async (uid: string, date: string): Promise<DailyPlan | null> => {
    if (!isFirebaseReady()) return null;
    const doc = await firestore()
      .collection('users')
      .doc(uid)
      .collection('dailyPlans')
      .doc(date)
      .get();
    return doc.exists() ? (doc.data() as DailyPlan) : null;
  },

  saveDailyPlan: async (uid: string, plan: DailyPlan) => {
    if (!isFirebaseReady()) return;
    await firestore()
      .collection('users')
      .doc(uid)
      .collection('dailyPlans')
      .doc(plan.date)
      .set(plan);
  },

  updateTaskStatus: async (
    uid: string,
    date: string,
    taskId: string,
    status: 'complete' | 'skipped'
  ) => {
    if (!isFirebaseReady()) return;
    const ref = firestore()
      .collection('users')
      .doc(uid)
      .collection('dailyPlans')
      .doc(date);
    const doc = await ref.get();
    if (!doc.exists()) return;
    const plan = doc.data() as DailyPlan;
    const tasks = plan.tasks.map((t) =>
      t.id === taskId ? { ...t, status } : t
    );
    const completedCount = tasks.filter((t) => t.status === 'complete').length;
    await ref.update({ tasks, completedCount });
    return { ...plan, tasks, completedCount };
  },

  updateGymVisit: async (uid: string, date: string, visited: boolean) => {
    if (!isFirebaseReady()) return;
    const ref = firestore()
      .collection('users')
      .doc(uid)
      .collection('dailyPlans')
      .doc(date);
    await ref.set({ gymVisitToday: visited }, { merge: true });
  },
};

export const wellnessScoreService = {
  applyTaskCompletionBoost: async (
    uid: string,
    category: WellnessCategoryKey,
    boost: number
  ): Promise<WellnessScore | null> => {
    if (!isFirebaseReady()) return null;
    const latest = await wellnessService.getLatestScore(uid);
    if (!latest) return null;

    const categories = { ...latest.categories };
    const current = categories[category as keyof typeof categories] ?? 0;
    categories[category as keyof typeof categories] = Math.min(10, current + boost);

    const overall =
      Object.values(categories).reduce((sum, v) => sum + v, 0) /
      Object.values(categories).length;

    const updated: WellnessScore = {
      ...latest,
      overall: Math.round(overall * 10) / 10,
      categories,
      date: new Date().toISOString(),
    };

    await wellnessService.saveScore(uid, updated);
    return updated;
  },
};

// ─── Care Plans ───────────────────────────────────────────────────────────

export const carePlanService = {
  getCarePlans: async (uid: string): Promise<CarePlan[]> => {
    if (!isFirebaseReady()) return [];
    const snap = await firestore()
      .collection('users')
      .doc(uid)
      .collection('carePlans')
      .orderBy('createdAt', 'desc')
      .get();
    return snap.docs.map((d) => d.data() as CarePlan);
  },

  watchCarePlans: (uid: string, cb: (plans: CarePlan[]) => void) => {
    if (!isFirebaseReady()) {
      cb([]);
      return NOOP_UNSUB;
    }
    return firestore()
      .collection('users')
      .doc(uid)
      .collection('carePlans')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (snap) => {
          cb(snapshotDocs(snap, (d) => d.data() as CarePlan));
        },
        (error) => logFirestoreListenerError('watchCarePlans', error)
      );
  },
};

// ─── Messages ─────────────────────────────────────────────────────────────

function messageThreadId(patientId: string, clinicianId: string) {
  return [patientId, clinicianId].sort().join('_');
}

function mapMessageDoc(d: { id: string; data: () => Record<string, unknown> }): Message {
  const data = d.data() as Omit<Message, 'id'>;
  return { ...data, id: d.id };
}

export const messageService = {
  threadId: messageThreadId,

  watchMessages: (
    patientId: string,
    clinicianId: string,
    cb: (msgs: Message[]) => void
  ) => {
    if (!isFirebaseReady()) {
      cb([]);
      return NOOP_UNSUB;
    }
    const threadId = messageThreadId(patientId, clinicianId);
    return firestore()
      .collection('messageThreads')
      .doc(threadId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(
        (snap) => {
          cb(snapshotDocs(snap, mapMessageDoc));
        },
        (error) => logFirestoreListenerError('watchMessages', error)
      );
  },

  sendMessage: async (
    patientId: string,
    clinicianId: string,
    message: Omit<Message, 'id'>
  ) => {
    if (!isFirebaseReady()) return;
    const threadId = messageThreadId(patientId, clinicianId);
    const threadRef = firestore().collection('messageThreads').doc(threadId);
    const msgRef = threadRef.collection('messages').doc();
    const timestamp = message.timestamp || new Date().toISOString();
    const payload: Message = { ...message, id: msgRef.id, timestamp };

    const unreadField = message.senderId === patientId ? 'clinicianUnread' : 'patientUnread';
    await firestore().runTransaction(async (tx) => {
      const threadSnap = await tx.get(threadRef);
      const currentUnread = threadSnap.data()?.[unreadField] ?? 0;
      tx.set(msgRef, payload);
      tx.set(
        threadRef,
        {
          patientId,
          clinicianId,
          lastMessage: message.content,
          lastMessageAt: timestamp,
          lastSenderId: message.senderId,
          updatedAt: timestamp,
          [unreadField]: currentUnread + 1,
        },
        { merge: true }
      );
    });
  },

  markMessagesRead: async (patientId: string, clinicianId: string, readerId: string) => {
    if (!isFirebaseReady()) return;
    const threadId = messageThreadId(patientId, clinicianId);
    const threadRef = firestore().collection('messageThreads').doc(threadId);
    const unreadField = readerId === patientId ? 'patientUnread' : 'clinicianUnread';

    const snap = await threadRef.collection('messages').get();
    const unread = snap.docs.filter((d) => {
      const m = d.data();
      return m.receiverId === readerId && m.isRead === false;
    });

    if (unread.length === 0) {
      await threadRef.set({ [unreadField]: 0 }, { merge: true });
      return;
    }

    const batch = firestore().batch();
    unread.forEach((d) => batch.update(d.ref, { isRead: true }));
    batch.set(threadRef, { [unreadField]: 0 }, { merge: true });
    await batch.commit();
  },

  watchPatientUnread: (
    patientId: string,
    clinicianId: string,
    cb: (count: number) => void
  ) => {
    if (!isFirebaseReady()) {
      cb(0);
      return NOOP_UNSUB;
    }
    const threadId = messageThreadId(patientId, clinicianId);
    return firestore()
      .collection('messageThreads')
      .doc(threadId)
      .onSnapshot(
        (doc) => {
          cb((doc?.data()?.patientUnread as number) ?? 0);
        },
        (error) => logFirestoreListenerError('watchPatientUnread', error)
      );
  },

  watchClinicianInbox: (
    clinicianId: string,
    patients: { uid: string; displayName: string; email: string }[],
    cb: (threads: InboxThread[]) => void
  ) => {
    if (!isFirebaseReady()) {
      cb([]);
      return NOOP_UNSUB;
    }
    const patientMap = new Map(patients.map((p) => [p.uid, p]));
    return firestore()
      .collection('messageThreads')
      .where('clinicianId', '==', clinicianId)
      .onSnapshot(
        (snap) => {
          const threads: InboxThread[] = snapshotDocs(snap, (d) => {
            const data = d.data() as MessageThread;
            const patient = patientMap.get(data.patientId);
            if (!patient) return null;
            return {
              ...data,
              threadId: d.id,
              patientName: patient.displayName,
              patientEmail: patient.email,
            };
          })
            .filter((t): t is InboxThread => t !== null)
            .sort((a, b) => {
              const aTime = a.lastMessageAt ?? '';
              const bTime = b.lastMessageAt ?? '';
              return bTime.localeCompare(aTime);
            });
          cb(threads);
        },
        (error) => logFirestoreListenerError('watchClinicianInbox', error)
      );
  },

  getClinicianUnreadTotal: async (clinicianId: string): Promise<number> => {
    if (!isFirebaseReady()) return 0;
    const snap = await firestore()
      .collection('messageThreads')
      .where('clinicianId', '==', clinicianId)
      .get();
    return snap.docs.reduce((sum, d) => sum + ((d.data().clinicianUnread as number) ?? 0), 0);
  },
};

export { clinicianService } from './clinicianService';
