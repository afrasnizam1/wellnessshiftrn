import { Platform } from 'react-native';
import local from './contentsquare.local';

function readEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

function resolveEnvironmentId(): string | undefined {
  if (Platform.OS === 'ios') {
    return (
      readEnv('CONTENTSQUARE_ENVIRONMENT_ID_IOS') ??
      local.environmentIdIos ??
      readEnv('CONTENTSQUARE_ENVIRONMENT_ID') ??
      local.environmentId
    );
  }
  if (Platform.OS === 'android') {
    return (
      readEnv('CONTENTSQUARE_ENVIRONMENT_ID_ANDROID') ??
      local.environmentIdAndroid ??
      readEnv('CONTENTSQUARE_ENVIRONMENT_ID') ??
      local.environmentId
    );
  }
  return readEnv('CONTENTSQUARE_ENVIRONMENT_ID') ?? local.environmentId;
}

/** CSQ IDs from env (build/CI) with local file fallback — never hardcode in appConfig. */
export const contentsquareConfig = {
  dataSourceId: readEnv('CONTENTSQUARE_DATA_SOURCE_ID') ?? local.dataSourceId,
  environmentId: resolveEnvironmentId(),
};

export function hasContentsquareStartId(): boolean {
  return Boolean(
    contentsquareConfig.dataSourceId || contentsquareConfig.environmentId
  );
}
