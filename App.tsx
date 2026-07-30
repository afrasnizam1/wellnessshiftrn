// App.tsx
import React, { useEffect } from 'react';
import { InteractionManager, LogBox, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { subscriptionService } from './src/services/subscriptionService';
import { notificationService } from './src/services/notifications';
import { registerBackgroundNotificationHandler } from './src/services/localNotifications';
import { setupGoogleSignIn } from './src/services/socialAuth';
import { crashlyticsService, installGlobalErrorHandler } from './src/services/crashlyticsService';
import { appCheckService } from './src/services/appCheckService';
import { contentsquareService } from './src/services/contentsquareService';
import { ensureFirestoreSettings } from './src/services/firestoreHelpers';
import { useAppStore } from './src/store';
import { appConfig, isGoogleSignInConfigured } from './src/config/appConfig';
import { Colors } from './src/theme';

if (__DEV__) {
  LogBox.ignoreLogs([
    'HeapReactNativeBridgeModule requires main queue setup',
    'Heap start did not become ready before timeout',
  ]);
}

export default function App() {
  const { setSubscriptionTier } = useAppStore();

  useEffect(() => {
    let cleanupIap = () => {};
    let cancelled = false;

    // Contentsquare in-app QR deeplinks must be wired ASAP (before delayed init).
    contentsquareService.init();

    const initApp = async () => {
      registerBackgroundNotificationHandler();

      if (isGoogleSignInConfigured()) {
        setupGoogleSignIn(appConfig.googleWebClientId);
      }

      cleanupIap = await subscriptionService.init(setSubscriptionTier);

      if (appConfig.isFirebaseConfigured) {
        ensureFirestoreSettings();
        await crashlyticsService.init();
        installGlobalErrorHandler();
        await appCheckService.init();
      }

      try {
        if (appConfig.isFirebaseConfigured) {
          notificationService.setBackgroundHandler();
        }
        await notificationService.init();
        // Permission prompt deferred — requesting at startup races RCTEventEmitter on RN 0.86 iOS.
      } catch (e) {
        console.warn('Notifications init failed:', e);
      }
    };

    const task = InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        if (!cancelled) initApp();
      }, 300);
    });

    return () => {
      cancelled = true;
      task.cancel();
      cleanupIap();
    };
  }, [setSubscriptionTier]);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
