import type { UserRole } from '../types';

export type AuthErrorContext = 'signin' | 'signup' | 'general';

/** Map Firebase / Firestore errors to clear, user-facing messages. */
export function authErrorMessage(
  err: unknown,
  fallback = 'Something went wrong. Please try again.',
  context: AuthErrorContext = 'general',
): string {
  const code = (err as { code?: string })?.code ?? '';
  const message = (err as { message?: string })?.message ?? '';

  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Try signing in, or use Forgot Password.';

    case 'auth/invalid-email':
      return 'Please enter a valid email address.';

    case 'auth/weak-password':
      return 'Password is too weak. Use at least 8 characters.';

    case 'auth/operation-not-allowed':
      return 'Email sign-in is not enabled. Please contact support.';

    case 'auth/user-not-found':
      return context === 'signin'
        ? 'No account found with that email. Check the address or tap Create Account below.'
        : 'No account found with that email.';

    case 'auth/wrong-password':
    case 'auth/invalid-credential':
    case 'auth/invalid-login-credentials':
      return 'Incorrect email or password. Please try again, or use Forgot Password.';

    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support for help.';

    case 'auth/too-many-requests':
      return context === 'signup'
        ? 'Too many attempts. Wait a minute, then try again.'
        : 'Too many sign-in attempts. Please wait a few minutes and try again.';

    case 'auth/network-request-failed':
      return 'Unable to connect. Check your internet connection and try again.';

    case 'auth/unauthorized-continue-uri':
    case 'auth/invalid-continue-uri':
    case 'auth/missing-continue-uri':
      return 'Email verification is misconfigured. Check the continue URL / authorized domains in Firebase Authentication.';

    case 'firestore/permission-denied':
      return 'Could not save your profile. Please try again in a moment, or sign out and create your account again.';

    default:
      if (__DEV__ && message) return message;
      return fallback;
  }
}

/** Clear copy when the selected account type does not match the profile role. */
export function accountTypeMismatchMessage(selected: UserRole, actual: UserRole): string {
  if (actual === 'clinician' && selected === 'patient') {
    return 'This account is registered as a clinician. Switch Account Type to Clinician and sign in again.';
  }
  if (actual === 'patient' && selected === 'clinician') {
    return 'This account is registered as a patient. Switch Account Type to Patient and sign in again.';
  }
  return `This account type does not match your selection (${actual}). Switch Account Type and try again.`;
}
