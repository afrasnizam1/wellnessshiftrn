/**
 * Google Sign-In client ID for @react-native-google-signin (idToken).
 *
 * No separate Web OAuth client ID was found in this repo. Using the iOS CLIENT_ID
 * from GoogleService-Info.plist so Google Sign-In UI is restored (user asked to
 * turn Google back on). This can work for the iOS idToken → Firebase flow.
 *
 * For full Android support (and the library’s preferred setup), replace with the
 * Firebase Console → Authentication → Sign-in method → Google → Web client ID
 * (OAuth 2.0 client type “Web application”), not this iOS client.
 */
export default {
  webClientId:
    '912633076119-7r2856eet5vtupfeehfru1k0hrbvgg2m.apps.googleusercontent.com' as
      string | undefined,
};
