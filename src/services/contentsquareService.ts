import { CSQ, Currency, StartConfig } from '@contentsquare/react-native-bridge';
import type { AnalyticsOptions } from '@contentsquare/react-native-bridge';
import { Linking, Platform, Settings } from 'react-native';
import { appConfig } from '../config/appConfig';
import { contentsquareConfig, hasContentsquareStartId } from '../config/contentsquareConfig';
import type { UserProfile } from '../types';
import { contentsquareStorage } from './contentsquareStorage';
import { analyticsHelper } from './analyticsHelper';
import { logger } from '../utils/logger';

type CsqGlobal = typeof globalThis & { __csqStarted?: boolean };

let started = false;
let analyticsActive = false;
let inAppFeaturesUnlocked = false;
let metadataUnsubscribe: (() => void) | null | undefined = null;
let replayLinkUnsubscribe: (() => void) | null | undefined = null;
let linkingUnsubscribe: (() => void) | null = null;
let lastScreenview: string | null = null;

function sdkAlreadyStarted(): boolean {
  return started || !!(global as CsqGlobal).__csqStarted;
}

function markSdkStarted(): void {
  started = true;
  (global as CsqGlobal).__csqStarted = true;
}

function canUseContentsquare(): boolean {
  return appConfig.enableContentsquare && hasContentsquareStartId();
}

function triggerSessionReplayBootstrap(): void {
  try {
    CSQ.triggerReplayForCurrentSession('session_bootstrap');
  } catch (e) {
    console.warn('[CSQ] triggerReplayForCurrentSession failed:', e);
  }
}

/** Opt-in + start Session Replay (iOS & Android). Safe to call repeatedly. */
function ensureSessionReplayRunning(reason: string): void {
  if (!appConfig.contentsquareSessionReplayAutoStart) return;

  try {
    CSQ.startSessionReplay();
    logger.log(`[CSQ] session replay started (${reason}) on ${Platform.OS}`);
  } catch (e) {
    console.warn(`[CSQ] startSessionReplay failed (${reason}):`, e);
  }
  triggerSessionReplayBootstrap();
}

/**
 * Signed-in users collect by default (default masking off so replays are visible).
 * Profile → Allow analytics can explicitly opt out; that choice is sticky.
 */
async function shouldCollectAnalytics(user: UserProfile | null): Promise<boolean> {
  if (!user) return false;
  if (await contentsquareStorage.hasExplicitPreference()) {
    return contentsquareStorage.isEnabled();
  }
  return true;
}

function csqIdentity(user: UserProfile | null | undefined): string {
  const email = user?.email?.trim().toLowerCase();
  // Production requirement: use email as the Contentsquare user identifier.
  if (email) return email;
  // Fallback when email is unavailable (should be rare).
  return user?.csq?.identity ?? user?.uid ?? 'unknown';
}

async function activateAnalytics(user?: UserProfile | null, userInitiated = false): Promise<void> {
  if (!canUseContentsquare()) return;

  analyticsActive = true;
  if (userInitiated) {
    await contentsquareStorage.setUserPreference(true);
  } else {
    await contentsquareStorage.setEnabled(true);
  }

  CSQ.optIn();
  try {
    CSQ.setDefaultMasking(appConfig.contentsquareDefaultMasking);
  } catch (e) {
    console.warn('[CSQ] setDefaultMasking failed:', e);
  }

  // sessionReplayAutoStart covers SDK start; startSessionReplay covers post-opt-in activation.
  // Android sometimes needs a short deferred retry after optIn settles.
  ensureSessionReplayRunning('opt_in');
  setTimeout(() => ensureSessionReplayRunning('opt_in_retry'), Platform.OS === 'android' ? 600 : 250);

  if (user) {
    contentsquareService.identifyUser(user);
  }

  logger.log(`[CSQ] analytics active on ${Platform.OS} — autocapture + session replay on`);
}

async function deactivateAnalytics(userInitiated = false): Promise<void> {
  if (!canUseContentsquare()) return;

  analyticsActive = false;
  lastScreenview = null;
  if (userInitiated) {
    await contentsquareStorage.setUserPreference(false);
  } else {
    await contentsquareStorage.setEnabled(false);
  }

  contentsquareService.clearUserIdentity();
  try {
    CSQ.stopSessionReplay();
  } catch (e) {
    console.warn('[CSQ] stopSessionReplay failed:', e);
  }
  CSQ.optOut();
}

async function bootstrapAnalytics(): Promise<void> {
  if (!canUseContentsquare()) return;

  const hasPreference = await contentsquareStorage.hasExplicitPreference();
  if (hasPreference && (await contentsquareStorage.isEnabled())) {
    await activateAnalytics();
    return;
  }

  if (hasPreference) {
    analyticsActive = false;
    try {
      CSQ.optOut();
    } catch {
      /* SDK may not be ready for optOut before start completes */
    }
    return;
  }

  // No preference yet — leave SDK started; syncAnalyticsForUser activates after sign-in.
  analyticsActive = false;
}

function analyticsOptions(): AnalyticsOptions {
  return {
    // Touches/interactions only — screenviews come from React Navigation → trackNavigationScreenview.
    enableRNAutocapture: true,
    enableViewAutocapture: false,
    disablePageviewAutocapture: true,
    disablePageviewTitleAutocapture: true,
    sessionReplayAutoStart: appConfig.contentsquareSessionReplayAutoStart,
  };
}

function buildStartConfig() {
  const options = analyticsOptions();
  if (contentsquareConfig.dataSourceId) {
    return StartConfig.withDataSourceId(contentsquareConfig.dataSourceId, options);
  }
  return StartConfig.withEnvironmentId(contentsquareConfig.environmentId!, options);
}

function attachDebugLogging(): void {
  CSQ.logToConsole();
  const idLabel = contentsquareConfig.dataSourceId
    ? `dataSource:${contentsquareConfig.dataSourceId}`
    : `project:${contentsquareConfig.environmentId}`;
  logger.log(
    '[CSQ]',
    idLabel,
    Platform.OS === 'ios' ? `bundle: ${appConfig.iosBundleId}` : `bundle: ${appConfig.androidApplicationId}`,
  );

  metadataUnsubscribe = CSQ.onMetadataChange((metadata) => {
    logger.log(
      '[CSQ] session:',
      metadata.sessionID,
      'project:',
      metadata.projectID,
      'identity:',
      metadata.identity,
      'replay:',
      metadata.sessionReplayURL
    );
  });
  replayLinkUnsubscribe = CSQ.onSessionReplayLinkChange((link) => {
    logger.log('[CSQ] replay link:', link);
  });
}

/**
 * Snapshot Capture / in-app features: QR deeplinks use scheme
 * `cs-$(PRODUCT_BUNDLE_IDENTIFIER)` (e.g. cs-afras.wellnessshiftrn.ios / cs-afras.wellnessshiftrn.android).
 * Must run AFTER CSQ.start(). iOS AppDelegate stashes the URL —
 * calling handle before start (or twice) freezes the UI.
 * Android merges the cs-… intent filter from the CSQ SDK; JS still forwards via Linking.
 * @see https://docs.contentsquare.com/en/react-native/in-app-features/
 */
function attachInAppFeatureUrlHandling(): void {
  if (linkingUnsubscribe) return;

  let lastHandled: string | null = null;
  let handleTimer: ReturnType<typeof setTimeout> | null = null;

  const isCsqActivationUrl = (url: string) =>
    /^cs-/i.test(url) || url.toLowerCase().includes('contentsquare');

  const forward = (url: string | null | undefined) => {
    if (!url || !isCsqActivationUrl(url) || lastHandled === url) return;
    lastHandled = url;
    inAppFeaturesUnlocked = true;

    // Defer off the openURL / Linking callback stack so the SDK UI doesn't deadlock.
    if (handleTimer) clearTimeout(handleTimer);
    handleTimer = setTimeout(() => {
      try {
        CSQ.optIn();
        analyticsActive = true;
        CSQ.handleUrl(url);
        ensureSessionReplayRunning('in_app_features');
        if (__DEV__) {
          logger.log('[CSQ] handleUrl:', url);
        }
      } catch (e) {
        console.warn('[CSQ] handleUrl failed:', e);
        lastHandled = null;
      }
    }, 250);
  };

  // Cold start (iOS): URL stashed by AppDelegate before JS was ready.
  if (Platform.OS === 'ios') {
    try {
      const pending = Settings.get('CSQPendingActivationURL');
      if (typeof pending === 'string' && pending.length > 0) {
        Settings.set({ CSQPendingActivationURL: null });
        forward(pending);
      }
    } catch {
      /* Settings unavailable */
    }
  }

  Linking.getInitialURL()
    .then(forward)
    .catch((e) => console.warn('[CSQ] getInitialURL failed:', e));

  const sub = Linking.addEventListener('url', ({ url }) => forward(url));
  linkingUnsubscribe = () => {
    if (handleTimer) clearTimeout(handleTimer);
    sub.remove();
  };
}

export const contentsquareService = {
  init: () => {
    if (!canUseContentsquare()) {
      started = true;
      return;
    }

    if (!sdkAlreadyStarted()) {
      CSQ.start(buildStartConfig());
      CSQ.setDefaultMasking(appConfig.contentsquareDefaultMasking);

      void bootstrapAnalytics();
      attachDebugLogging();
      markSdkStarted();
    }

    // Always (re)attach — Snapshot Capture QR deeplinks must reach CSQ.handleUrl.
    attachInAppFeatureUrlHandling();
  },

  isAnalyticsEnabled: async () => analyticsActive || (await contentsquareStorage.isEnabled()),

  identifyUser: (user: UserProfile) => {
    if (!canUseContentsquare()) return;

    const identity = csqIdentity(user);
    CSQ.identify(identity);
    CSQ.sendUserIdentifier(identity);
    CSQ.addUserProperties({
      role: user.role,
      identity,
    });
  },

  clearUserIdentity: () => {
    if (!canUseContentsquare()) return;
    CSQ.resetIdentity();
  },

  setAnalyticsEnabled: async (enabled: boolean, user?: UserProfile | null, userInitiated = false) => {
    if (!canUseContentsquare()) return;

    if (enabled) {
      await activateAnalytics(user, userInitiated);
    } else {
      await deactivateAnalytics(userInitiated);
    }
  },

  restoreConsentAndOptIn: async (user: UserProfile) => {
    if (!canUseContentsquare()) return;

    if (await shouldCollectAnalytics(user)) {
      await activateAnalytics(user);
    }
  },

  syncAnalyticsForUser: async (user: UserProfile | null, authLoading = false) => {
    if (!canUseContentsquare()) return;

    if (!user) {
      if (authLoading) return;
      // After Snapshot / in-app QR unlock, keep tracking so capture can succeed.
      if (inAppFeaturesUnlocked) {
        if (!analyticsActive) await activateAnalytics();
        return;
      }
      await deactivateAnalytics();
      return;
    }

    await contentsquareService.restoreConsentAndOptIn(user);
  },

  onAuthSuccess: async (user: UserProfile) => {
    if (!canUseContentsquare()) return;

    if (await shouldCollectAnalytics(user)) {
      await activateAnalytics(user);
    } else if (analyticsActive) {
      contentsquareService.identifyUser(user);
    }
  },

  trackNavigationScreenview: (screenview: string | null) => {
    if (!canUseContentsquare() || !screenview || !analyticsActive) return;

    // Absolute dedupe: only fire when the screen label actually changes.
    // React Navigation emits many onStateChange events for the same leaf route
    // (focus, nested stack updates, tab blur). A time window still double-counted.
    if (lastScreenview === screenview) return;
    lastScreenview = screenview;

    CSQ.trackScreenview(screenview);
    if (__DEV__) {
      logger.log(`[CSQ] screenview: ${screenview}`);
    }
  },

  trackSubscriptionPurchase: (
    productId: string,
    price: number,
    transactionId?: string | null
  ) => {
    if (!canUseContentsquare() || !analyticsActive) return;

    CSQ.trackTransaction(price, Currency.GBP, transactionId ?? productId);
    analyticsHelper.logFunnelSubscription(
      productId.includes('pro') ? 'pro' : 'growth',
      productId
    );
    CSQ.trackEvent('subscription_purchase', {
      product_id: productId,
      currency: 'GBP',
      price,
    });
  },
};
