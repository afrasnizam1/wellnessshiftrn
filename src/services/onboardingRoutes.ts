import { Screen } from '../navigation/screenNames';
import { onboardingStorage } from './onboardingStorage';
import { pendingOnboardingStorage } from './pendingOnboardingStorage';
import { isSimulatorOrEmulator } from './simulatorLaunch';
import type { UserProfile } from '../types';

export type PreAuthRoute =
  | typeof Screen.breathWelcome
  | typeof Screen.goalSelection
  | typeof Screen.experienceLevel
  | typeof Screen.onboardingHabits
  | typeof Screen.onboardingBaseline
  | typeof Screen.assessmentPath
  | typeof Screen.wellnessQuiz
  | typeof Screen.wellnessResults
  | typeof Screen.onboardingMood
  | typeof Screen.firstWinActivity
  | typeof Screen.authentication;

export type PostAuthOnboardingRoute =
  | typeof Screen.wellnessQuiz
  | typeof Screen.wellnessResults
  | typeof Screen.onboardingMood
  | typeof Screen.notificationPermissions
  | typeof Screen.healthPermissions
  | typeof Screen.subscriptionPaywall;

/**
 * Pre-auth (guest) launch route.
 * Cold start with no Firebase session:
 *   1. Breath welcome (first launch on device)
 *   2. Login / signup landing
 * Simulators / emulators always open the auth landing (skip breath).
 * Signed-in restore is handled by RootNavigator (not this function).
 */
export async function resolvePreAuthRoute(_introSeen: boolean | null): Promise<PreAuthRoute> {
  if (isSimulatorOrEmulator()) {
    return Screen.authentication;
  }

  const pending = await pendingOnboardingStorage.get();
  if (!pending.breathWelcomeComplete) {
    return Screen.breathWelcome;
  }
  return Screen.authentication;
}

/**
 * Post-auth funnel (signed-in patient, !onboardingComplete):
 * Quiz (if needed) → Results (if needed) → Mood → Notifications → Health → Paywall
 * After paywall (subscribe or continue free), Home shows the first-run app tour
 * via onboardingStorage pendingInAppGuide / hasCompletedAppTour.
 */
export async function resolvePostAuthOnboardingRoute(
  user: UserProfile,
  opts: { hasScore: boolean; resultsSeen: boolean; awaitingResults: boolean },
): Promise<PostAuthOnboardingRoute | 'complete'> {
  if (user.role !== 'patient') return 'complete';

  if (!user.quizComplete || !opts.hasScore) {
    return Screen.wellnessQuiz;
  }
  // Show Results only when this session just finished the quiz.
  if (!opts.resultsSeen && opts.awaitingResults) {
    return Screen.wellnessResults;
  }
  // Score exists but Results was never gated — skip Results (don't fake a preview)
  // and continue funnel. Mark results seen so we don't loop.
  if (!opts.resultsSeen && opts.hasScore && !opts.awaitingResults) {
    await onboardingStorage.markWellnessResultsComplete(user.uid);
  }
  if (!(await onboardingStorage.hasCompletedOnboardingMood(user.uid))) {
    return Screen.onboardingMood;
  }
  if (!(await onboardingStorage.hasSeenNotificationPrompt(user.uid))) {
    return Screen.notificationPermissions;
  }
  if (!(await onboardingStorage.hasSeenHealthKitPrompt(user.uid))) {
    return Screen.healthPermissions;
  }
  if (!(await onboardingStorage.hasSeenOnboardingPaywall(user.uid))) {
    return Screen.subscriptionPaywall;
  }
  return 'complete';
}
