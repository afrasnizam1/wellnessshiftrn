import AsyncStorage from '@react-native-async-storage/async-storage';

export interface NotificationPrefs {
  dailyPlan: boolean;
  careplan: boolean;
  insights: boolean;
  checkin: boolean;
  milestone: boolean;
  inactivity: boolean;
  dailyPlanHour: number;
  dailyPlanMinute: number;
  meditationHour: number;
  meditationMinute: number;
  checkinHour: number;
  checkinMinute: number;
}

export const DEFAULT_NOTIFICATION_PREFS: NotificationPrefs = {
  dailyPlan: true,
  careplan: true,
  insights: true,
  checkin: false,
  milestone: true,
  inactivity: false,
  dailyPlanHour: 9,
  dailyPlanMinute: 0,
  meditationHour: 20,
  meditationMinute: 0,
  checkinHour: 8,
  checkinMinute: 0,
};

const PREFS_KEY = 'notificationPrefs';

export const notificationPrefsStorage = {
  get: async (): Promise<NotificationPrefs> => {
    try {
      const raw = await AsyncStorage.getItem(PREFS_KEY);
      if (!raw) return { ...DEFAULT_NOTIFICATION_PREFS };
      return { ...DEFAULT_NOTIFICATION_PREFS, ...JSON.parse(raw) };
    } catch {
      return { ...DEFAULT_NOTIFICATION_PREFS };
    }
  },

  save: async (prefs: NotificationPrefs) => {
    await AsyncStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  },
};
