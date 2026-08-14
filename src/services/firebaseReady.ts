import auth from '@react-native-firebase/auth';
import { Platform } from 'react-native';
import { appConfig } from '../config/appConfig';
import { isAuthNetworkError } from '../utils/authErrorMessage';

export const NOOP_UNSUB = () => {};

export function isFirebaseReady(): boolean {
  return appConfig.isFirebaseConfigured;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type AuthUserWithToken = { getIdToken: (forceRefresh?: boolean) => Promise<string> };

/** Warm the ID token; retry once on transient Auth network failures. */
async function ensureIdToken(user: AuthUserWithToken): Promise<void> {
  try {
    await user.getIdToken();
  } catch (error) {
    if (!isAuthNetworkError(error)) throw error;
    // Android Identity Toolkit / Play Services is flakier right after sign-in.
    await delay(Platform.OS === 'android' ? 700 : 400);
    await user.getIdToken();
  }
}

/** Ensure the Firebase Auth session is attached before Firestore writes (avoids permission-denied races). */
export async function ensureAuthReadyForUid(uid: string): Promise<void> {
  if (!isFirebaseReady()) return;

  const current = auth().currentUser;
  if (current?.uid === uid) {
    await ensureIdToken(current);
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
        await ensureIdToken(user);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  });
}
