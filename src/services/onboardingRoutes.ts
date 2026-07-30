import { Screen } from '../navigation/screenNames';
import { onboardingStorage } from './onboardingStorage';
import {
  pendingCanShowResults,
  pendingJustFinishedQuiz,
  pendingOnboardingStorage,
} from './pendingOnboardingStorage';
import type { UserProfile } from '../types';

export type PreAuthRoute =
  | typeof Screen.introVideo
  | typeof Screen.breathWelcome
  | typeof Screen.purposeSelection
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
  | typeof Screen.introVideo
  | typeof Screen.purposeSelection
  | typeof Screen.wellnessQuiz
  | typeof Screen.wellnessResults
  | typeof Screen.onboardingMood
  | typeof Screen.notificationPermissions
  | typeof Screen.healthPermissions
  | typeof Screen.subscriptionPaywall;

/**
 * Pre-auth launch route — short funnel, account after quiz.
 *
 * Cold start with no Firebase session (including simulators):
 *   1. Welcome video (always shown once — never skipped on simulator)
 *   2. Why are you here (purpose)
 *   3. Wellness quiz
 *   4. Account creation / sign in
 *
 * Results, mood, permissions, paywall, etc. run post-auth (“the rest”).
 * Signed-in restore is handled by RootNavigator (not this function).
 */
export async function resolvePreAuthRoute(_introSeen: boolean | null): Promise<PreAuthRoute> {
  const pending = await pendingOnboardingStorage.get();

  if (!pending.welcomeVideoComplete) {
    return Screen.introVideo;
  }

  if (!pending.appPurpose && !(pending.appPurposes?.length > 0)) {
    return Screen.purposeSelection;
  }

  // Quiz not finished — stay on assessment (ignore legacy mid-funnel steps).
  if (!pending.quizComplete && !pendingJustFinishedQuiz(pending) && !pendingCanShowResults(pending)) {
    return Screen.wellnessQuiz;
  }

  // After quiz → create account. Results / mood / first-win move post-auth.
  return Screen.authentication;
}

/**
 * Post-auth funnel (signed-in patient, !onboardingComplete):
 * Welcome video (if not already seen pre-auth) → Why are you here → Quiz → …
 */
export async function resolvePostAuthOnboardingRoute(
  user: UserProfile,
  opts: { hasScore: boolean; resultsSeen: boolean; awaitingResults: boolean },
): Promise<PostAuthOnboardingRoute | 'complete'> {
  if (user.role !== 'patient') return 'complete';

  const pending = await pendingOnboardingStorage.get();
  if (pending.welcomeVideoComplete) {
    await onboardingStorage.markWelcomeVideoSeen(user.uid);
  } else if (!(await onboardingStorage.hasSeenWelcomeVideo(user.uid))) {
    return Screen.introVideo;
  }

  const storedPurpose = await onboardingStorage.getAppPurpose(user.uid);
  const storedPurposes = await onboardingStorage.getAppPurposes(user.uid);
  if (!user.appPurpose && !storedPurpose && !(user.appPurposes?.length) && storedPurposes.length === 0) {
    return Screen.purposeSelection;
  }

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
