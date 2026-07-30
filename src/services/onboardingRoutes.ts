import { Screen } from '../navigation/screenNames';
import { onboardingStorage } from './onboardingStorage';
import {
  pendingCanShowResults,
  pendingJustFinishedQuiz,
  pendingOnboardingStorage,
} from './pendingOnboardingStorage';
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
 * Pre-auth launch route — personalisation first, account after value.
 *
 * Cold start with no Firebase session:
 *   1. Breath welcome (skipped on simulator for faster iteration)
 *   2. Goals → experience → habits → baseline → assessment path
 *   3. Quiz → results → mood → first win
 *   4. Create account / sign in (after they've seen personalised results)
 *
 * Returning users can still Sign in from Breath Welcome or Goal Selection.
 * Signed-in restore is handled by RootNavigator (not this function).
 */
export async function resolvePreAuthRoute(_introSeen: boolean | null): Promise<PreAuthRoute> {
  const pending = await pendingOnboardingStorage.get();

  // Simulators skip the breath animation; everyone else sees it once.
  if (!isSimulatorOrEmulator() && !pending.breathWelcomeComplete) {
    return Screen.breathWelcome;
  }

  if (!pending.primaryGoal) {
    return Screen.goalSelection;
  }
  if (!pending.experienceLevel) {
    return Screen.experienceLevel;
  }
  if (pending.trainingDaysPerWeek == null || pending.reminderAnchor == null) {
    return Screen.onboardingHabits;
  }
  if (!pending.baselineStepComplete) {
    return Screen.onboardingBaseline;
  }
  if (!pending.assessmentPath) {
    return Screen.assessmentPath;
  }

  // Quiz just finished → Results (never teleport back to a blank quiz).
  if (pendingCanShowResults(pending) || pendingJustFinishedQuiz(pending)) {
    return Screen.wellnessResults;
  }

  if (!pending.resultsPreviewComplete) {
    return Screen.wellnessQuiz;
  }
  if (!pending.moodStepComplete) {
    return Screen.onboardingMood;
  }
  if (!pending.firstWinComplete) {
    return Screen.firstWinActivity;
  }

  // Personalisation complete — now ask for an account.
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
