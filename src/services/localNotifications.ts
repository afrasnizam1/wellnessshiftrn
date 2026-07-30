import { Platform } from 'react-native';
import notifee, {
  AndroidImportance,
  EventType,
  RepeatFrequency,
  TriggerType,
  type TimestampTrigger,
} from '@notifee/react-native';
import {
  DEFAULT_NOTIFICATION_PREFS,
  notificationPrefsStorage,
  type NotificationPrefs,
} from './notificationPrefsStorage';
import { Screen } from '../navigation/screenNames';
import { logger } from '../utils/logger';

export const LOCAL_IDS = {
  dailyPlan: 'daily_plan_reminder',
  meditation: 'meditation_reminder',
  checkin: 'checkin_reminder',
  goal: 'goal_reminder',
} as const;

const ANDROID_CHANNEL_ID = 'wellness_reminders';

function nextDailyTimestamp(hour: number, minute: number): number {
  const next = new Date();
  next.setSeconds(0, 0);
  next.setHours(hour, minute, 0, 0);
  if (next.getTime() <= Date.now()) {
    next.setDate(next.getDate() + 1);
  }
  return next.getTime();
}

async function ensureAndroidChannel() {
  if (Platform.OS !== 'android') return;
  try {
    await notifee.createChannel({
      id: ANDROID_CHANNEL_ID,
      name: 'Wellness Reminders',
      importance: AndroidImportance.HIGH,
      sound: 'default',
    });
  } catch (e) {
    console.warn('Android notification channel setup failed:', e);
  }
}

async function scheduleRepeating(
  id: string,
  title: string,
  body: string,
  hour: number,
  minute: number,
  dataType: string
) {
  try {
    await notifee.cancelNotification(id);

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: nextDailyTimestamp(hour, minute),
      repeatFrequency: RepeatFrequency.DAILY,
    };

    await notifee.createTriggerNotification(
      {
        id,
        title,
        body,
        data: { type: dataType },
        ...(Platform.OS === 'android'
          ? {
              android: {
                channelId: ANDROID_CHANNEL_ID,
                pressAction: { id: 'default' },
              },
            }
          : {
              ios: {
                sound: 'default',
                foregroundPresentationOptions: {
                  badge: true,
                  sound: true,
                  banner: true,
                  list: true,
                },
              },
            }),
      },
      trigger
    );
  } catch (e) {
    console.warn(`Failed to schedule notification ${id}:`, e);
  }
}

async function cancelSafe(id: string) {
  try {
    await notifee.cancelNotification(id);
  } catch {}
}

export const localNotificationService = {
  init: async () => {
    await ensureAndroidChannel();
  },

  requestPermission: async (): Promise<boolean> => {
    try {
      const settings = await notifee.requestPermission();
      if (Platform.OS === 'ios') {
        return settings.authorizationStatus >= 1;
      }
      return settings.authorizationStatus === 1;
    } catch (e) {
      console.warn('Notifee permission request failed:', e);
      return false;
    }
  },

  syncReminders: async (prefs?: NotificationPrefs) => {
    try {
      const resolved = prefs ?? (await notificationPrefsStorage.get());
      if (Platform.OS === 'android') {
        await ensureAndroidChannel();
      } else {
        const granted = await localNotificationService.requestPermission();
        if (!granted) return;
      }

      if (resolved.dailyPlan) {
        await scheduleRepeating(
          LOCAL_IDS.dailyPlan,
          'Your daily plan is ready',
          'Open Wellness Shift to see today\'s tasks and keep your streak going.',
          resolved.dailyPlanHour,
          resolved.dailyPlanMinute,
          'daily_plan'
        );
      } else {
        await cancelSafe(LOCAL_IDS.dailyPlan);
      }

      if (resolved.checkin) {
        await scheduleRepeating(
          LOCAL_IDS.checkin,
          'Morning check-in',
          'Take a moment to log your mood and energy for today.',
          resolved.checkinHour,
          resolved.checkinMinute,
          'checkin'
        );
      } else {
        await cancelSafe(LOCAL_IDS.checkin);
      }

      if (resolved.dailyPlan) {
        await scheduleRepeating(
          LOCAL_IDS.meditation,
          'Time to unwind',
          'A few minutes of mindfulness can improve sleep and reduce stress.',
          resolved.meditationHour,
          resolved.meditationMinute,
          'meditation'
        );
      } else {
        await cancelSafe(LOCAL_IDS.meditation);
      }
    } catch (e) {
      console.warn('syncReminders failed:', e);
    }
  },

  scheduleDailyPlanReminder: async (hour?: number, minute?: number) => {
    const prefs = await notificationPrefsStorage.get();
    const next = {
      ...prefs,
      dailyPlan: true,
      dailyPlanHour: hour ?? prefs.dailyPlanHour,
      dailyPlanMinute: minute ?? prefs.dailyPlanMinute,
    };
    await notificationPrefsStorage.save(next);
    await localNotificationService.syncReminders(next);
  },

  scheduleMeditationReminder: async (hour?: number, minute?: number) => {
    const prefs = await notificationPrefsStorage.get();
    const next = {
      ...prefs,
      dailyPlan: true,
      meditationHour: hour ?? prefs.meditationHour,
      meditationMinute: minute ?? prefs.meditationMinute,
    };
    await notificationPrefsStorage.save(next);
    await localNotificationService.syncReminders(next);
  },

  scheduleGoalReminder: async (goal: string, hour = 18, minute = 0) => {
    const messages: Record<string, string> = {
      sleep: 'Wind down soon — better sleep starts with a calm evening.',
      stress: 'Take a 2-minute breather to lower stress today.',
      fitness: 'Move your body today — even a short walk counts.',
      nutrition: 'Fuel well today. Log one healthy meal.',
      mental: 'Check in with your mood. A small practice helps.',
      habits: 'Keep your habit streak alive today.',
      condition: 'Track your health today to stay on course.',
      general: 'One small wellness action today. You got this.',
    };
    await scheduleRepeating(
      LOCAL_IDS.goal,
      'Your wellness goal',
      messages[goal] ?? messages.general,
      hour,
      minute,
      'goal'
    );
  },

  cancelGoalReminder: async () => {
    await cancelSafe(LOCAL_IDS.goal);
  },

  cancelAll: async () => {
    try {
      await notifee.cancelAllNotifications();
    } catch (e) {
      console.warn('cancelAll failed:', e);
    }
  },

  cancelLocalReminders: async () => {
    await Promise.all(Object.values(LOCAL_IDS).map(cancelSafe));
  },

  getInitialPressRoute: async (): Promise<string | null> => {
    try {
      const initial = await notifee.getInitialNotification();
      return resolveLocalRoute(initial?.notification?.data as Record<string, string> | undefined);
    } catch {
      return null;
    }
  },

  setupPressHandlers: (onNavigate: (route: string) => void) => {
    localNotificationService.getInitialPressRoute().then((route) => {
      if (route) onNavigate(route);
    });

    try {
      return notifee.onForegroundEvent(({ type, detail }) => {
        if (type === EventType.PRESS) {
          const route = resolveLocalRoute(detail.notification?.data as Record<string, string>);
          if (route) onNavigate(route);
        }
      });
    } catch {
      return () => {};
    }
  },
};

export function resolveLocalRoute(data?: Record<string, string>): string | null {
  if (!data?.type) return null;
  switch (data.type) {
    case 'daily_plan':
      return Screen.dailyPlan;
    case 'checkin':
      return Screen.dailyCheckIn;
    case 'meditation':
      return Screen.tabFitness;
    case 'goal':
      return Screen.tabFitness;
    default:
      return null;
  }
}

export function registerBackgroundNotificationHandler() {
  try {
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      if (type === EventType.PRESS) {
        logger.log('Background notification press:', detail.notification?.data);
      }
    });
  } catch (e) {
    console.warn('Background notification handler setup failed:', e);
  }
}

export { DEFAULT_NOTIFICATION_PREFS, notificationPrefsStorage, type NotificationPrefs };
