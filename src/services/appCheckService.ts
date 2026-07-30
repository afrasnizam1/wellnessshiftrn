import { appConfig } from '../config/appConfig';
import { isFirebaseReady } from './firebaseReady';

export const appCheckService = {
  init: async () => {
    if (!isFirebaseReady() || !appConfig.enableAppCheck) return;

    try {
      const appCheck = require('@react-native-firebase/app-check').default;
      const provider = appCheck().newReactNativeFirebaseAppCheckProvider();
      provider.configure({
        android: {
          provider: __DEV__ ? 'debug' : 'playIntegrity',
          debugToken: appConfig.appCheckDebugToken || undefined,
        },
        apple: {
          provider: __DEV__ ? 'debug' : 'appAttestWithDeviceCheckFallback',
          debugToken: appConfig.appCheckDebugToken || undefined,
        },
      });

      await appCheck().initializeAppCheck({
        provider,
        isTokenAutoRefreshEnabled: true,
      });
    } catch (e) {
      console.warn('App Check init failed:', e);
    }
  },
};
