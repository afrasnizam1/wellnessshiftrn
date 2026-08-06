import messaging from '@react-native-firebase/messaging';
import { appConfig } from '../config/appConfig';
import type { UserRole } from '../types';
import { Screen } from '../navigation/screenNames';
import { saveFcmTokenNative } from './firestoreSchema';
import {
  localNotificationService,
  notificationPrefsStorage,
  type NotificationPrefs,
} from './localNotifications';
import { logger } from '../utils/logger';

export { notificationPrefsStorage, DEFAULT_NOTIFICATION_PREFS } from './localNotifications';
export type { NotificationPrefs } from './notificationPrefsStorage';

function resolveNotificationRoute(data?: Record<string, string>): string | null {
  if (!data) return null;
  const type = data.type;
  if (type === 'daily_plan') return Screen.dailyPlan;
  if (type === 'checkin') return Screen.dailyCheckIn;
  if (type === 'meditation') return Screen.tabFitness;
  if (type === 'goal') return Screen.tabFitness;
  if (type === 'care_plan' || type === 'carePlan') return Screen.carePlan;
  if (type === 'message') return data.role === 'clinician' ? Screen.clinicianInbox : Screen.messages;
  if (type === 'connection_request') return Screen.myCare;
  if (type === 'insight') return Screen.tabAiInsights;
  return null;
}

export const notificationService = {
  init: async () => {
    await localNotificationService.init();
  },

  requestPermission: async (): Promise<boolean> => {
    const fcmGranted = await (async () => {
      if (!appConfig.isFirebaseConfigured) return false;
      const authStatus = await messaging().requestPermission();
      return (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      );
    })();

    const localGranted = await localNotificationService.requestPermission();
    return fcmGranted || localGranted;
  },

  getFCMToken: async (): Promise<string | null> => {
    try {
      return await messaging().getToken();
    } catch {
      return null;
    }
  },

  saveTokenToFirestore: async (uid: string, token: string, role?: UserRole) => {
    await saveFcmTokenNative(uid, token, role);
  },

  registerDevice: async (uid: string, role: UserRole) => {
    try {
      const granted = await notificationService.requestPermission();
      if (!granted) return;

      const token = await notificationService.getFCMToken();
      if (token) {
        await notificationService.saveTokenToFirestore(uid, token, role);
      }

      const topic = role === 'clinician' ? `clinician_${uid}` : `patient_${uid}`;
      await messaging().subscribeToTopic(topic);
      await messaging().subscribeToTopic('wellness_shift_all');

      if (role === 'patient') {
        await notificationService.syncLocalReminders();
      }
    } catch (e) {
      console.warn('Device registration failed:', e);
    }
  },

  unregisterDevice: async (uid: string, role: UserRole) => {
    try {
      const topic = role === 'clinician' ? `clinician_${uid}` : `patient_${uid}`;
      await messaging().unsubscribeFromTopic(topic);
      if (role === 'patient') {
        await localNotificationService.cancelLocalReminders();
      }
    } catch {}
  },

  onForegroundMessage: (callback: (msg: any) => void) =>
    messaging().onMessage(callback),

  setBackgroundHandler: () => {
    if (!appConfig.isFirebaseConfigured) return;
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      logger.log('Background message:', remoteMessage);
    });
  },

  onTokenRefresh: (uid: string, callback: (token: string) => void) =>
    messaging().onTokenRefresh(async (token) => {
      try {
        await notificationService.saveTokenToFirestore(uid, token, undefined);
        callback(token);
      } catch (e) {
        console.warn('FCM token refresh save failed:', e);
      }
    }),

  scheduleDailyPlanReminder: (hour?: number, minute?: number) =>
    localNotificationService.scheduleDailyPlanReminder(hour, minute),

  scheduleMeditationReminder: (hour?: number, minute?: number) =>
    localNotificationService.scheduleMeditationReminder(hour, minute),

  scheduleGoalReminder: (goal: string, hour?: number, minute?: number) =>
    localNotificationService.scheduleGoalReminder(goal, hour, minute),

  cancelGoalReminder: () => localNotificationService.cancelGoalReminder(),

  syncLocalReminders: async (prefs?: NotificationPrefs) => {
    try {
      const resolved = prefs ?? (await notificationPrefsStorage.get());
      await localNotificationService.syncReminders(resolved);
    } catch (e) {
      console.warn('syncLocalReminders failed:', e);
    }
  },

  cancelAllNotifications: () => localNotificationService.cancelAll(),

  subscribeToCarePlanUpdates: async (clinicianId: string) => {
    await messaging().subscribeToTopic(`clinician_${clinicianId}`);
  },

  unsubscribeFromCarePlanUpdates: async (clinicianId: string) => {
    await messaging().unsubscribeFromTopic(`clinician_${clinicianId}`);
  },
};

export function getInitialNotificationRoute(): Promise<string | null> {
  return Promise.all([
    messaging().getInitialNotification(),
    localNotificationService.getInitialPressRoute(),
  ]).then(([remoteMessage, localRoute]) => {
    return (
      resolveNotificationRoute(remoteMessage?.data as Record<string, string>) ??
      localRoute
    );
  });
}

export function setupNotificationNavigation(onNavigate: (route: string) => void) {
  getInitialNotificationRoute().then((route) => {
    if (route) onNavigate(route);
  });

  const unsubOpened = messaging().onNotificationOpenedApp((remoteMessage) => {
    const route = resolveNotificationRoute(remoteMessage?.data as Record<string, string>);
    if (route) onNavigate(route);
  });

  // Foreground: show a local banner; do not auto-navigate away.
  const unsubForeground = messaging().onMessage(async (remoteMessage) => {
    try {
      const title = remoteMessage.notification?.title ?? 'Wellness Shift';
      const body = remoteMessage.notification?.body ?? '';
      const data = (remoteMessage.data ?? {}) as Record<string, string>;
      await localNotificationService.displayRemote(title, body, data);
    } catch (e) {
      console.warn('Foreground notification display failed:', e);
    }
  });

  const unsubLocal = localNotificationService.setupPressHandlers(onNavigate);

  return () => {
    unsubOpened();
    unsubForeground();
    unsubLocal();
  };
}
