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
  | typeof Screen.buildingWellnessPlan
  | typeof Screen.wellnessResults
  | typeof Screen.onboardingMood
  | typeof Screen.notificationPermissions
  | typeof Screen.healthPermissions
  | typeof Screen.subscriptionPaywall
  | typeof Screen.firstWinActivity
  | typeof Screen.authentication;

export type PostAuthOnboardingRoute =
  | typeof Screen.introVideo
  | typeof Screen.purposeSelection
  | typeof Screen.wellnessQuiz
  | typeof Screen.buildingWellnessPlan
  | typeof Screen.wellnessResults
  | typeof Screen.onboardingMood
  | typeof Screen.notificationPermissions
  | typeof Screen.healthPermissions
  | typeof Screen.subscriptionPaywall;

/** Mini path is legacy — main onboarding uses the 10-question (1 per category) quiz. */
function pendingFullQuizFinished(
  pending: Awaited<ReturnType<typeof pendingOnboardingStorage.get>>,
): boolean {
  if (pending.assessmentPath === 'mini') return false;
  return (
    pending.quizComplete === true ||
    pendingJustFinishedQuiz(pending) ||
    pendingCanShowResults(pending)
  );
}

/**
 * Pre-auth launch route — account right after results.
 *
 *   1. Welcome video (breath + scenes)
 *   2. Why are you here
 *   3. Wellness quiz (10 questions — 1 per category)
 *   4. Building plan interstitial (3s)
 *   5. Results / score
 *   6. Create account / sign in → main app
 */
export async function resolvePreAuthRoute(_introSeen: boolean | null): Promise<PreAuthRoute> {
  const pending = await pendingOnboardingStorage.get();

  if (!pending.welcomeVideoComplete) {
    return Screen.introVideo;
  }

  if (!pending.appPurpose && !(pending.appPurposes?.length > 0)) {
    return Screen.purposeSelection;
  }

  if (!pendingFullQuizFinished(pending)) {
    return Screen.wellnessQuiz;
  }

  if (!pending.resultsPreviewComplete) {
    if (!pending.planBuildingComplete) {
      return Screen.buildingWellnessPlan;
    }
    return Screen.wellnessResults;
  }

  return Screen.authentication;
}

/**
 * Post-auth funnel for signed-in patients who still need onboarding
 * (e.g. signed up before finishing the guest funnel).
 *
 * Guests who already finished Results then create an account are marked
 * onboardingComplete in applyPendingOnboarding — they skip this path.
 */
export async function resolvePostAuthOnboardingRoute(
  user: UserProfile,
  opts: { hasScore: boolean; resultsSeen: boolean; awaitingResults: boolean },
): Promise<PostAuthOnboardingRoute | 'complete'> {
  if (user.role !== 'patient') return 'complete';

  if (!(await onboardingStorage.hasSeenWelcomeVideo(user.uid))) {
    return Screen.introVideo;
  }

  const storedPurpose = await onboardingStorage.getAppPurpose(user.uid);
  const storedPurposes = await onboardingStorage.getAppPurposes(user.uid);
  if (!user.appPurpose && !storedPurpose && !(user.appPurposes?.length) && storedPurposes.length === 0) {
    return Screen.purposeSelection;
  }

  const pending = await pendingOnboardingStorage.get();

  if (!opts.resultsSeen && opts.awaitingResults) {
    if (!pending.planBuildingComplete) {
      return Screen.buildingWellnessPlan;
    }
    return Screen.wellnessResults;
  }

  if (!user.quizComplete || !opts.hasScore) {
    return Screen.wellnessQuiz;
  }

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
