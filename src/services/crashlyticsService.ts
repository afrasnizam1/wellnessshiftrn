import { appConfig } from '../config/appConfig';

function canUseCrashlytics(): boolean {
  return appConfig.isFirebaseConfigured && appConfig.enableCrashlytics !== false;
}

function getCrashlytics() {
  if (!canUseCrashlytics()) return null;
  try {
    // Lazy load — top-level import crashes when Firebase is not configured (demo mode).
    return require('@react-native-firebase/crashlytics').default as () => {
      setCrashlyticsCollectionEnabled: (enabled: boolean) => Promise<void>;
      log: (message: string) => void;
      setUserId: (uid: string) => Promise<void>;
      setAttribute: (key: string, value: string) => Promise<void>;
      recordError: (error: Error) => void;
    };
  } catch {
    return null;
  }
}

export const crashlyticsService = {
  init: async () => {
    const crashlytics = getCrashlytics();
    if (!crashlytics) return;
    try {
      await crashlytics().setCrashlyticsCollectionEnabled(!__DEV__);
      crashlytics().log('Crashlytics initialized');
    } catch (e) {
      console.warn('Crashlytics init failed:', e);
    }
  },

  setUser: async (uid: string | null, role?: string) => {
    const crashlytics = getCrashlytics();
    if (!crashlytics) return;
    try {
      await crashlytics().setUserId(uid ?? '');
      if (role) {
        await crashlytics().setAttribute('role', role);
      }
    } catch {}
  },

  log: (message: string) => {
    const crashlytics = getCrashlytics();
    if (!crashlytics) return;
    try {
      crashlytics().log(message);
    } catch {}
  },

  recordError: (error: unknown, context?: string) => {
    const crashlytics = getCrashlytics();
    if (!crashlytics) return;
    try {
      if (context) crashlytics().log(context);
      if (error instanceof Error) {
        crashlytics().recordError(error);
      } else {
        crashlytics().recordError(new Error(String(error)));
      }
    } catch {}
  },
};

export function installGlobalErrorHandler() {
  if (!canUseCrashlytics()) return;

  const defaultHandler = ErrorUtils.getGlobalHandler();
  ErrorUtils.setGlobalHandler((error, isFatal) => {
    crashlyticsService.recordError(error, isFatal ? 'fatal' : 'non-fatal');
    defaultHandler(error, isFatal);
  });
}

declare const ErrorUtils: {
  getGlobalHandler: () => (error: Error, isFatal?: boolean) => void;
  setGlobalHandler: (handler: (error: Error, isFatal?: boolean) => void) => void;
};
