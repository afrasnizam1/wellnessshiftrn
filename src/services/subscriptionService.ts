import { Linking, Platform } from 'react-native';
import { appConfig } from '../config/appConfig';
import {
  iapService,
  getProductId,
  type ActiveSubscription,
} from './iap';
import { subscriptionStorage } from './subscriptionStorage';
import { userService } from './firebase';
import { isFirebaseReady } from './firebaseReady';
import { contentsquareService } from './contentsquareService';
import type { SubscriptionTier } from '../types';

type TierListener = (tier: SubscriptionTier) => void;

let cleanupListeners: (() => void) | null = null;
let currentUid: string | null = null;

async function persistTier(
  tier: SubscriptionTier,
  productId?: string,
  uid?: string | null
) {
  await subscriptionStorage.save(tier, productId);
  const resolvedUid = uid ?? currentUid;
  if (resolvedUid && isFirebaseReady()) {
    await userService.updateProfile(resolvedUid, {
      subscriptionTier: tier,
    }).catch(() => {});
  }
}

export const subscriptionService = {
  init: async (onTierChange: TierListener) => {
    if (appConfig.enableDevSubscriptionBypass) {
      onTierChange(appConfig.devSubscriptionTier);
      return () => {};
    }

    try {
      await iapService.init();
      await iapService.loadStoreProducts();

      const storedTier = await subscriptionStorage.getTier();
      if (storedTier) {
        onTierChange(storedTier);
      }

      const active = await iapService.syncActiveSubscription();
      if (active) {
        await persistTier(active.tier, active.productId);
        onTierChange(active.tier);
      }

      cleanupListeners?.();
      cleanupListeners = iapService.setupListeners(
        async (purchase, tier) => {
          await persistTier(tier, purchase.productId);
          onTierChange(tier);

          const product = iapService.getCachedStoreProducts().find(
            (item) => iapService.productSku(item) === purchase.productId
          );
          const price = product ? parseFloat(iapService.productPriceAmount(product)) : 0;
          if (price > 0) {
            contentsquareService.trackSubscriptionPurchase(
              purchase.productId,
              price,
              purchase.id
            );
          }
        },
        (error) => {
          if (error.code !== 'E_USER_CANCELLED') {
            console.warn('IAP error:', error.message ?? error.code);
          }
        }
      );

      return () => {
        cleanupListeners?.();
        cleanupListeners = null;
      };
    } catch (e) {
      console.warn('Subscription init failed:', e);
      return () => {};
    }
  },

  setCurrentUser: (uid: string | null) => {
    currentUid = uid;
  },

  syncForUser: async (uid: string, onTierChange: TierListener) => {
    currentUid = uid;
    if (appConfig.enableDevSubscriptionBypass) {
      onTierChange(appConfig.devSubscriptionTier);
      return;
    }

    const active = await iapService.syncActiveSubscription();
    if (active) {
      await persistTier(active.tier, active.productId, uid);
      onTierChange(active.tier);
      return;
    }

    const stored = await subscriptionStorage.getTier();
    if (stored) {
      onTierChange(stored);
    }
  },

  loadStoreProducts: () => iapService.loadStoreProducts(),

  getLocalizedPrice: (tier: 'growth' | 'pro', period: 'monthly' | 'yearly') => {
    const productId = getProductId(tier, period);
    const fallback = tier === 'pro'
      ? period === 'yearly' ? '£79.99' : '£8.99'
      : period === 'yearly' ? '£59.99' : '£6.99';
    return iapService.getLocalizedPrice(productId, fallback);
  },

  purchase: async (tier: 'growth' | 'pro', period: 'monthly' | 'yearly') => {
    if (appConfig.enableDevSubscriptionBypass) {
      await persistTier(appConfig.devSubscriptionTier);
      return { tier: appConfig.devSubscriptionTier };
    }
    const productId = getProductId(tier, period);
    await iapService.subscribe(productId);
    return null;
  },

  restore: async (): Promise<ActiveSubscription | null> => {
    if (appConfig.enableDevSubscriptionBypass) {
      await persistTier(appConfig.devSubscriptionTier);
      return { tier: appConfig.devSubscriptionTier, productId: 'dev_bypass' };
    }
    const active = await iapService.restore();
    if (active) {
      await persistTier(active.tier, active.productId);
    } else {
      await persistTier('free');
    }
    return active;
  },

  openManageSubscriptions: () => {
    const url = Platform.select({
      ios: 'https://apps.apple.com/account/subscriptions',
      android: 'https://play.google.com/store/account/subscriptions',
    });
    if (url) Linking.openURL(url);
  },

  billingLegalText: iapService.billingLegalText,
};
