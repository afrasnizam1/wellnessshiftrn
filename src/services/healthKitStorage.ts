import AsyncStorage from '@react-native-async-storage/async-storage';

const HEALTH_KIT_ENABLED_KEY = 'health_kit_enabled';

/** Device-level flag — user opted in to Apple Health / Health Connect reads. */
export const healthKitStorage = {
  isEnabled: async (): Promise<boolean> => {
    const value = await AsyncStorage.getItem(HEALTH_KIT_ENABLED_KEY);
    return value === 'true';
  },

  setEnabled: async (enabled: boolean): Promise<void> => {
    await AsyncStorage.setItem(HEALTH_KIT_ENABLED_KEY, enabled ? 'true' : 'false');
  },
};
