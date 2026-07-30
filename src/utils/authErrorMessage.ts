/** Map Firebase / Firestore errors to user-facing signup messages. */
export function authErrorMessage(err: unknown, fallback = 'Something went wrong. Please try again.'): string {
  const code = (err as { code?: string })?.code ?? '';
  const message = (err as { message?: string })?.message ?? '';

  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/invalid-email':
      return 'Enter a valid email address.';
    case 'auth/weak-password':
      return 'Password is too weak. Use at least 8 characters.';
    case 'auth/operation-not-allowed':
      return 'Email sign-up is not enabled. Enable Email/Password in Firebase Console → Authentication.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Wait a minute, then try resending the verification email.';
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
