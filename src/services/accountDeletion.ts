import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { FS } from './firestoreSchema';
import { isFirebaseReady } from './firebaseReady';
import { signOutCurrentUser } from './authSession';

const USER_SUBCOLLECTIONS = [
  'wellnessScores',
  'dailyPlans',
  'carePlans',
  'habits',
  'goals',
  'friends',
  'accountabilityBoard',
  'stats',
  'achievements',
  'dailyCheckIns',
  'activePrograms',
  'completedPrograms',
] as const;

async function deleteCollectionDocs(
  collectionRef: FirebaseFirestoreTypes.CollectionReference,
  batchSize = 40,
): Promise<void> {
  // Recursively delete docs in batches (client SDK has no recursive delete).
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const snap = await collectionRef.limit(batchSize).get();
    if (snap.empty) return;
    const batch = firestore().batch();
    snap.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
    if (snap.size < batchSize) return;
  }
}

async function deleteQueryDocs(
  query: FirebaseFirestoreTypes.Query,
  batchSize = 40,
): Promise<void> {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const snap = await query.limit(batchSize).get();
    if (snap.empty) return;
    const batch = firestore().batch();
    snap.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
    if (snap.size < batchSize) return;
  }
}

async function deleteUserSubcollections(uid: string): Promise<void> {
  const userRef = firestore().collection(FS.users).doc(uid);
  await Promise.all(
    USER_SUBCOLLECTIONS.map((name) =>
      deleteCollectionDocs(userRef.collection(name)).catch(() => {}),
    ),
  );
}

async function deleteMessageThreadsForUser(uid: string): Promise<void> {
  const db = firestore();
  for (const field of ['patientId', 'clinicianId'] as const) {
    try {
      const snap = await db.collection('messageThreads').where(field, '==', uid).get();
      for (const thread of snap.docs) {
        await deleteCollectionDocs(thread.ref.collection('messages')).catch(() => {});
        await thread.ref.delete().catch(() => {});
      }
    } catch {
      // Query may lack an index in some environments — skip and continue wipe.
    }
  }
}

async function deleteCarePlansAndNotifications(uid: string): Promise<void> {
  const db = firestore();
  await Promise.all([
    deleteQueryDocs(db.collection(FS.customCarePlans).where('patientId', '==', uid)).catch(
      () => {},
    ),
    deleteQueryDocs(db.collection(FS.customCarePlans).where('clinicianId', '==', uid)).catch(
      () => {},
    ),
    deleteQueryDocs(db.collection(FS.notifications).where('patientId', '==', uid)).catch(
      () => {},
    ),
    deleteQueryDocs(db.collection(FS.notificationQueue).where('patientId', '==', uid)).catch(
      () => {},
    ),
    deleteQueryDocs(db.collection('inviteCodes').where('clinicianId', '==', uid)).catch(() => {}),
  ]);
}

async function unlinkClinicianRelationships(uid: string): Promise<void> {
  const db = firestore();

  // Patient → remove mirror on clinician + denormalized array entry.
  try {
    const patientSnap = await db.collection(FS.patients).doc(uid).get();
    const clinicianId =
      (patientSnap.data()?.linkedClinicianId as string | undefined) ||
      (await db.collection(FS.users).doc(uid).get()).data()?.clinicianId;
    if (typeof clinicianId === 'string' && clinicianId.length > 0) {
      await db
        .collection(FS.clinicians)
        .doc(clinicianId)
        .collection('linkedPatients')
        .doc(uid)
        .delete()
        .catch(() => {});
      await db
        .collection(FS.users)
        .doc(clinicianId)
        .set({ linkedPatients: firestore.FieldValue.arrayRemove(uid) }, { merge: true })
        .catch(() => {});
    }
  } catch {
    // best effort
  }

  // Clinician → wipe linkedPatients subcollection.
  await deleteCollectionDocs(
    db.collection(FS.clinicians).doc(uid).collection('linkedPatients'),
  ).catch(() => {});
}

async function deleteTopLevelUserDocs(uid: string): Promise<void> {
  const db = firestore();
  const refs = [
    db.collection(FS.users).doc(uid),
    db.collection(FS.patients).doc(uid),
    db.collection(FS.clinicians).doc(uid),
    db.collection(FS.userProfiles).doc(uid),
    db.collection(FS.userTrials).doc(uid),
    db.collection(FS.fcmTokens).doc(uid),
  ];
  await Promise.all(refs.map((ref) => ref.delete().catch(() => {})));
}

/** Clears on-device user data (cycle logs, meal photos metadata, health records, onboarding). */
async function clearLocalUserData(uid: string): Promise<void> {
  const known = [
    `menstrual_cycle_v2_${uid}`,
    `menstrual_cycle_data_${uid}`,
    `food_log_v1_${uid}`,
    `health_records_v1_${uid}`,
    `seenCarePlanIds:${uid}`,
  ];
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const matching = allKeys.filter((key) => key.includes(uid));
    await AsyncStorage.multiRemove([...new Set([...known, ...matching])]);
  } catch {
    await AsyncStorage.multiRemove(known).catch(() => {});
  }
}

/**
 * Permanently deletes the signed-in user's Firestore data, local cache, then Auth account.
 * Clears local session afterwards. Throws with a friendly message if re-auth is required.
 */
export async function deleteCurrentUserAccount(): Promise<void> {
  if (!isFirebaseReady()) {
    throw new Error('Account deletion is unavailable right now. Please try again later.');
  }

  const currentUser = auth().currentUser;
  if (!currentUser) {
    throw new Error('You must be signed in to delete your account.');
  }

  const uid = currentUser.uid;

  await deleteMessageThreadsForUser(uid);
  await deleteCarePlansAndNotifications(uid);
  await unlinkClinicianRelationships(uid);
  await deleteUserSubcollections(uid);
  await deleteTopLevelUserDocs(uid);
  await clearLocalUserData(uid);

  try {
    await currentUser.delete();
  } catch (error: any) {
    if (error?.code === 'auth/requires-recent-login') {
      throw new Error(
        'For security, please sign out, sign back in, then try deleting your account again.',
      );
    }
    throw error instanceof Error
      ? error
      : new Error('Could not delete your account. Please try again or contact support.');
  }

  await signOutCurrentUser().catch(() => {});
}
