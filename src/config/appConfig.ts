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

  /** Where users land after tapping the email verification link (Firebase Hosting). */
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

  /** Remote intro video URL — replace with production CDN asset when available */
  introVideoUrl: 'https://wellnessshift.co.uk/wp-content/uploads/wellnessshift-intro.mp4',

  /** Fallback if introVideoUrl fails to load */
  introVideoFallbackUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',

  /** Crashlytics + App Check — require isFirebaseConfigured: true */
  enableCrashlytics: true,
  enableAppCheck: false,
  /** Register in Firebase Console → App Check → Debug tokens, then paste here for dev */
  appCheckDebugToken: '',

  /** Contentsquare / Session Replay — IDs live in src/config/contentsquare.local.ts */
  enableContentsquare: true,
  /**
   * Start session replay with the SDK so Contentsquare can capture replays.
   * activateAnalytics() also calls startSessionReplay() after opt-in as a backup.
   * Users can still opt out in Profile.
   */
  contentsquareSessionReplayAutoStart: true,
  /** Mask UI by default; set false so Session Replay shows real screens. */
  contentsquareDefaultMasking: false,

  /** Canonical app IDs — must match Xcode / Android / Firebase / ASC. */
  iosBundleId: 'afras.wellnessshiftrn.ios',
  androidApplicationId: 'afras.wellnessshiftrn.android',
};

export function isGoogleSignInConfigured(): boolean {
  const id = appConfig.googleWebClientId?.trim() ?? '';
  return id.length > 0 && !id.startsWith('YOUR_');
}
