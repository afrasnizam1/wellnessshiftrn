import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SubscriptionTier } from '../types';

const TIER_KEY = '@wellnessshift/subscription_tier';
const PRODUCT_KEY = '@wellnessshift/subscription_product';
const EXPIRY_KEY = '@wellnessshift/subscription_expiry';

export const subscriptionStorage = {
  getTier: async (): Promise<SubscriptionTier | null> => {
    const tier = await AsyncStorage.getItem(TIER_KEY);
    if (tier === 'free' || tier === 'growth' || tier === 'pro') return tier;
    return null;
  },

  save: async (tier: SubscriptionTier, productId?: string, expiry?: string) => {
    await AsyncStorage.setItem(TIER_KEY, tier);
    if (productId) {
      await AsyncStorage.setItem(PRODUCT_KEY, productId);
    } else {
      await AsyncStorage.removeItem(PRODUCT_KEY);
    }
    if (expiry) {
      await AsyncStorage.setItem(EXPIRY_KEY, expiry);
    } else {
      await AsyncStorage.removeItem(EXPIRY_KEY);
    }
  },

  clear: async () => {
    await AsyncStorage.multiRemove([TIER_KEY, PRODUCT_KEY, EXPIRY_KEY]);
  },
};
