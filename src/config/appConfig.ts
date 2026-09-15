/**
 * App configuration — production defaults for App Store / Play builds.
 *
 * Google Sign-In: set webClientId in googleAuth.local.ts (Firebase Console →
 * Authentication → Google → Web client ID). Leave empty to keep Google disabled.
 */
import { Platform } from 'react-native';
import { googleAuthConfig } from './googleAuthConfig';

export const appConfig = {
  /** Empty / unset = Google Sign-In hidden. Never ship a YOUR_ placeholder. */
  googleWebClientId: googleAuthConfig.webClientId,

  firebaseProjectId: 'wellnessshift-rn-ios',

  /** Branded confirmation page (also used as a custom email-action handler). */
  emailVerificationContinueUrl:
    'https://wellnessshift-rn-ios.firebaseapp.com/email-verified.html',

  /** True when native Firebase config exists (iOS plist / Android google-services.json) */
  isFirebaseConfigured: Platform.OS === 'ios' || Platform.OS === 'android',

  /** Allows exploring the UI without Firebase (splash → demo user → main app). Off for App Store builds. */
  enableDemoMode: false,

  /**
   * When true (and Firebase is not configured), launch straight into the main app
   * as a demo user — no splash, sign-in, intro video, or onboarding.
   */
  skipAuthAndOnboarding: false,

  /**
   * When true in __DEV__, clear any restored Firebase session on cold launch so
   * Xcode runs always start on the login / sign-up welcome screen.
   * Leave false for normal behaviour — signed-in users go straight into the app.
   */
  forceAuthScreenOnLaunch: false,

  /**
   * When true, premium gates use devSubscriptionTier instead of store tier.
   * Useful for testing Growth/Pro features without a sandbox purchase.
   * Must stay false for App Store / production builds.
   */
  enableDevSubscriptionBypass: false,
  devSubscriptionTier: 'growth' as 'free' | 'growth' | 'pro',

  websiteUrl: 'https://wellnessshift.co.uk',
  privacyPolicyUrl: 'https://wellnessshift.co.uk/privacy',
  termsOfServiceUrl: 'https://wellnessshift.co.uk/terms',

  /**
   * Remote welcome video after account creation.
   * Leave empty to use the built-in cinematic welcome.
   * Host an mp4 on your CDN and set the URL to play a real video instead.
   */
  introVideoUrl: '',

  /** Optional second URL if introVideoUrl fails — leave empty to use cinematic fallback */
  introVideoFallbackUrl: '',

  /** Crashlytics + App Check — require isFirebaseConfigured: true */
  enableCrashlytics: true,
  enableAppCheck: false,
  /** Register in Firebase Console → App Check → Debug tokens, then paste here for dev */
  appCheckDebugToken: '',

  /**
   * Contentsquare / Session Replay.
   * Health apps: keep masking ON by default. Collection is opt-in (Profile).
   */
  enableContentsquare: true,
  contentsquareSessionReplayAutoStart: true,
  /** true = Session Replay masks UI by default (safer for health data). */
  contentsquareDefaultMasking: true,

  /**
   * Feature gates for App Store v1 — hide unfinished / mock surfaces from navigation.
   * Screens remain registered so deep links do not crash; entry points are removed.
   */
  enableSocialFeed: false,
  enableCommunityLeaderboard: false,
  enablePremiumShop: false,
  /** false = hide Google Sign-In for v1 (Apple + email only). */
  enableGoogleSignIn: false,

  /** Canonical app IDs — must match Xcode / Android / Firebase / ASC. */
  iosBundleId: 'afras.wellnessshiftrn.ios',
  androidApplicationId: 'afras.wellnessshiftrn.android',
};

export function isGoogleSignInConfigured(): boolean {
  if (!appConfig.enableGoogleSignIn) return false;
  const id = appConfig.googleWebClientId?.trim() ?? '';
  return id.length > 0 && !id.startsWith('YOUR_');
}
