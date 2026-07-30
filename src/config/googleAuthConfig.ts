import local from './googleAuth.local';

function readEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

/** Web OAuth client ID for @react-native-google-signin (idToken). */
export const googleAuthConfig = {
  webClientId:
    readEnv('GOOGLE_WEB_CLIENT_ID') ??
    (typeof local.webClientId === 'string' ? local.webClientId.trim() : '') ??
    '',
};
