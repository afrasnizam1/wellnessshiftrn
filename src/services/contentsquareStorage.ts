import AsyncStorage from '@react-native-async-storage/async-storage';

const ANALYTICS_ENABLED_KEY = 'analytics_tracking_enabled';
const ANALYTICS_EXPLICIT_KEY = 'analytics_tracking_explicit';

export const contentsquareStorage = {
  isEnabled: async (): Promise<boolean> => {
    const value = await AsyncStorage.getItem(ANALYTICS_ENABLED_KEY);
    return value === 'true';
  },

  /** True after the user toggles analytics in Profile (opt-in or opt-out). */
  hasExplicitPreference: async (): Promise<boolean> => {
    return (await AsyncStorage.getItem(ANALYTICS_EXPLICIT_KEY)) === 'true';
  },

  setEnabled: async (enabled: boolean): Promise<void> => {
    await AsyncStorage.setItem(ANALYTICS_ENABLED_KEY, enabled ? 'true' : 'false');
  },

  /** Profile toggle — records an explicit user choice (opt-in or opt-out). */
  setUserPreference: async (enabled: boolean): Promise<void> => {
    await AsyncStorage.multiSet([
      [ANALYTICS_ENABLED_KEY, enabled ? 'true' : 'false'],
      [ANALYTICS_EXPLICIT_KEY, 'true'],
    ]);
  },
};
