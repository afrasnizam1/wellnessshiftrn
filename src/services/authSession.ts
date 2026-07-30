import auth from '@react-native-firebase/auth';
import { useAppStore } from '../store';
import { contentsquareService } from './contentsquareService';
import { notificationService } from './notifications';
import type { UserProfile } from '../types';

/** Clears Firebase, Google, analytics identity, and all local session state. */
export async function signOutCurrentUser(user?: UserProfile | null): Promise<void> {
  const profile = user ?? useAppStore.getState().user;

  if (profile) {
    await notificationService.unregisterDevice(profile.uid, profile.role).catch(() => {});
  }

  try {
    const { GoogleSignin } = await import('@react-native-google-signin/google-signin');
    await GoogleSignin.signOut();
  } catch {
    // Not signed in with Google, or module unavailable.
  }

  try {
    if (auth().currentUser) {
      await auth().signOut();
    }
  } catch (error) {
    if (__DEV__) {
      console.warn('[authSession] Firebase signOut failed; clearing local session anyway.', error);
    }
  }

  contentsquareService.clearUserIdentity();
  useAppStore.getState().resetSession({ bumpEpoch: true });
}
