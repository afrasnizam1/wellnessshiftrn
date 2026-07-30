import { CommonActions, type NavigationProp } from '@react-navigation/native';
import { Screen } from '../navigation/screenNames';
import { resolvePreAuthRoute, type PreAuthRoute } from './onboardingRoutes';
import {
  pendingCanShowResults,
  pendingJustFinishedQuiz,
  pendingOnboardingStorage,
} from './pendingOnboardingStorage';
import type { RootStackParamList } from '../types';

type RootNavigation = NavigationProp<RootStackParamList>;

let onPreAuthRouteResolved: ((route: PreAuthRoute) => void) | null = null;

export function registerPreAuthRouteListener(listener: (route: PreAuthRoute) => void): () => void {
  onPreAuthRouteResolved = listener;
  return () => {
    if (onPreAuthRouteResolved === listener) {
      onPreAuthRouteResolved = null;
    }
  };
}

export async function refreshPreAuthRouteFromPending(introSeen: boolean | null): Promise<PreAuthRoute> {
  const route = await resolvePreAuthRoute(introSeen);
  onPreAuthRouteResolved?.(route);
  return route;
}

export function resetOnboardingStack(
  navigation: RootNavigation,
  routeName: keyof RootStackParamList,
  nestedState?: { routes: Array<{ name: string; params?: object }> },
) {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: nestedState ? [{ name: routeName, state: nestedState }] : [{ name: routeName }],
    }),
  );
}

export function goToAssessmentPath(navigation: RootNavigation) {
  resetOnboardingStack(navigation, Screen.assessmentPath);
}

export function goToExperienceLevel(navigation: RootNavigation) {
  resetOnboardingStack(navigation, Screen.experienceLevel);
}

export function goToOnboardingHabits(navigation: RootNavigation) {
  resetOnboardingStack(navigation, Screen.onboardingHabits);
}

export function goToOnboardingBaseline(navigation: RootNavigation) {
  resetOnboardingStack(navigation, Screen.onboardingBaseline);
}

export function goToFirstWinActivity(navigation: RootNavigation) {
  resetOnboardingStack(navigation, Screen.firstWinActivity);
}

export function goToWellnessResults(navigation: RootNavigation) {
  resetOnboardingStack(navigation, Screen.wellnessResults);
}

export function goToOnboardingMood(navigation: RootNavigation) {
  resetOnboardingStack(navigation, Screen.onboardingMood);
}

/** @deprecated Use goToOnboardingMood — same destination */
export const goToOnboardingMoodPreAuth = goToOnboardingMood;

export function goToCreateAccount(navigation: RootNavigation) {
  resetOnboardingStack(navigation, Screen.authentication, {
    routes: [{ name: Screen.createAccount, params: { savePlan: true } }],
  });
}

/**
 * Skip screens already completed — only jumps to Results when awaitingResultsPreview
 * was set by an actual quiz finish.
 */
export async function resumePreAuthOnboardingFromPending(
  navigation: RootNavigation,
): Promise<'handled' | 'continue'> {
  const pending = await pendingOnboardingStorage.get();

  if (pendingCanShowResults(pending) || pendingJustFinishedQuiz(pending)) {
    resetOnboardingStack(navigation, Screen.wellnessResults);
    return 'handled';
  }

  // Stale quizComplete/score without the results gate → force quiz, don't teleport.
  // Never wipe when awaitingResultsPreview is still set.
  if (
    !pending.awaitingResultsPreview &&
    (pending.quizComplete || pending.wellnessScore) &&
    !pending.resultsPreviewComplete
  ) {
    await pendingOnboardingStorage.clearQuizProgress();
    if (pending.assessmentPath) {
      await pendingOnboardingStorage.save({ assessmentPath: pending.assessmentPath });
    }
  }

  if (pending.resultsPreviewComplete) {
    if (!pending.moodStepComplete) {
      resetOnboardingStack(navigation, Screen.onboardingMood);
      return 'handled';
    }
    if (!pending.firstWinComplete) {
      resetOnboardingStack(navigation, Screen.firstWinActivity);
      return 'handled';
    }
    goToCreateAccount(navigation);
    return 'handled';
  }

  return 'continue';
}
