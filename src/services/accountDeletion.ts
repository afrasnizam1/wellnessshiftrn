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

async function deleteUserSubcollections(uid: string): Promise<void> {
  const userRef = firestore().collection(FS.users).doc(uid);
  await Promise.all(
    USER_SUBCOLLECTIONS.map((name) =>
      deleteCollectionDocs(userRef.collection(name)).catch(() => {}),
    ),
  );
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

/**
 * Permanently deletes the signed-in user's Firestore data, then Auth account.
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

  await deleteUserSubcollections(uid);
  await deleteTopLevelUserDocs(uid);

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
