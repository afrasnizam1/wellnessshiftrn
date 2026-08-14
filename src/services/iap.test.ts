import type { Purchase } from 'react-native-iap';
import {
  PRODUCT_IDS,
  getTierFromProductId,
  resolveHighestSubscription,
} from './iap';

jest.mock('react-native-iap', () => ({
  initConnection: jest.fn(),
  endConnection: jest.fn(),
  fetchProducts: jest.fn(),
  requestPurchase: jest.fn(),
  getAvailablePurchases: jest.fn(),
  purchaseUpdatedListener: jest.fn(),
  purchaseErrorListener: jest.fn(),
  finishTransaction: jest.fn(),
}));

jest.mock('../store', () => ({
  useAppStore: { getState: () => ({ setSubscriptionTier: jest.fn() }) },
}));

function purchase(productId: string): Purchase {
  return { productId } as Purchase;
}

describe('getTierFromProductId', () => {
  it('maps all four product IDs to the correct tier', () => {
    expect(getTierFromProductId(PRODUCT_IDS.growthMonthly)).toBe('growth');
    expect(getTierFromProductId(PRODUCT_IDS.growthYearly)).toBe('growth');
    expect(getTierFromProductId(PRODUCT_IDS.proMonthly)).toBe('pro');
    expect(getTierFromProductId(PRODUCT_IDS.proYearly)).toBe('pro');
  });

  it('returns free for unknown product IDs', () => {
    expect(getTierFromProductId('unknown.sku')).toBe('free');
  });
});

describe('resolveHighestSubscription', () => {
  it('picks pro over growth when a user has both', () => {
    const best = resolveHighestSubscription([
      purchase(PRODUCT_IDS.growthMonthly),
      purchase(PRODUCT_IDS.proYearly),
    ]);
    expect(best).toEqual({ tier: 'pro', productId: PRODUCT_IDS.proYearly });
  });

  it('returns growth when that is the only paid product', () => {
    const best = resolveHighestSubscription([purchase(PRODUCT_IDS.growthYearly)]);
    expect(best).toEqual({ tier: 'growth', productId: PRODUCT_IDS.growthYearly });
  });

  it('returns null when there are no paid products', () => {
    expect(resolveHighestSubscription([])).toBeNull();
  });
});
