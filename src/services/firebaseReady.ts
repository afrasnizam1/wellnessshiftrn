import auth from '@react-native-firebase/auth';
import { appConfig } from '../config/appConfig';

export const NOOP_UNSUB = () => {};

export function isFirebaseReady(): boolean {
  return appConfig.isFirebaseConfigured;
}

/** Ensure the Firebase Auth session is attached before Firestore writes (avoids permission-denied races). */
export async function ensureAuthReadyForUid(uid: string): Promise<void> {
  if (!isFirebaseReady()) return;

  const current = auth().currentUser;
  if (current?.uid === uid) {
    await current.getIdToken();
    return;
  }

  await new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      unsub();
      reject(new Error('Auth session not ready'));
    }, 8000);

    const unsub = auth().onAuthStateChanged(async (user) => {
      if (user?.uid !== uid) return;
      clearTimeout(timeout);
      unsub();
      try {
        await user.getIdToken();
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  });
}
