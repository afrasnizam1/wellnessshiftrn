import { CSQ } from '@contentsquare/react-native-bridge';
import { appConfig } from '../config/appConfig';
import { logger } from '../utils/logger';

type EventProps = Record<string, string | number | boolean>;

function canTrack(): boolean {
  return appConfig.enableContentsquare;
}

function trackEvent(eventName: string, properties?: EventProps) {
  if (!canTrack()) return;
  if (properties && Object.keys(properties).length > 0) {
    CSQ.trackEvent(eventName, properties);
  } else {
    CSQ.trackEvent(eventName);
  }
  if (__DEV__) {
    logger.log(`📊 CSQ event: ${eventName}`, properties ?? '');
  }
}

/** Mirrors native AnalyticsHelper CSQ custom events (not Firebase-only helpers). */
export const analyticsHelper = {
  trackButtonTap: (button: string, screen: string) => {
    trackEvent('button_tap', { button, screen });
  },

  trackFeatureInteraction: (feature: string, action: string, screen: string) => {
    trackEvent('feature_interaction', { feature, action, screen });
  },

  trackChartCategoryTap: (props: {
    screen: string;
    chart: string;
    category: string;
    category_key: string;
    action?: string;
  }) => {
    trackEvent('chart_category_tap', {
      screen: props.screen,
      chart: props.chart,
      category: props.category,
      category_key: props.category_key,
      action: props.action ?? 'select',
    });
  },

  trackUserAction: (action: string, details: EventProps = {}) => {
    trackEvent('user_action', { action, ...details });
  },

  trackAssessmentCompleted: (score: number, categoriesCount: number) => {
    trackEvent('assessment_completed', {
      overall_score: score,
      categories_count: categoriesCount,
    });
  },

  trackHealthKitConnected: () => {
    trackEvent('healthkit_connected');
  },

  logFunnelAssessmentComplete: () => {
    trackEvent('funnel_assessment_complete');
  },

  logFunnelSubscription: (tier: string, productId: string) => {
    trackEvent('funnel_subscription_start', { tier, product_id: productId });
  },
};
