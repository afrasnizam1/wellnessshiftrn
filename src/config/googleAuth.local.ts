/**
 * Google Sign-In is disabled for App Store v1 (Apple + email only).
 *
 * To re-enable later:
 * 1. Set appConfig.enableGoogleSignIn = true
 * 2. Paste the Firebase Console → Authentication → Google → Web client ID below
 * 3. Ensure Info.plist GIDClientID + URL scheme match GoogleService-Info.plist
 *    CLIENT_ID / REVERSED_CLIENT_ID (iOS OAuth client)
 */
export default {
  webClientId: '' as string | undefined,
};
