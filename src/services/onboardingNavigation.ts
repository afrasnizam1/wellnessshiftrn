import { CommonActions, type NavigationProp } from '@react-navigation/native';
import { Screen } from '../navigation/screenNames';
import { resolvePreAuthRoute, type PreAuthRoute } from './onboardingRoutes';
import { pendingOnboardingStorage } from './pendingOnboardingStorage';
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

let onWelcomeVideoCompleted: (() => void) | null = null;

/** Fired after the launch welcome (breath + scenes) is marked complete. */
export function registerWelcomeVideoCompletedListener(listener: () => void): () => void {
  onWelcomeVideoCompleted = listener;
  return () => {
    if (onWelcomeVideoCompleted === listener) {
      onWelcomeVideoCompleted = null;
    }
  };
}

export function notifyWelcomeVideoCompleted() {
  onWelcomeVideoCompleted?.();
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

/** Prefer stack history so Back works; fall back to an explicit screen. */
export function goBackOrTo(
  navigation: RootNavigation,
  fallback: keyof RootStackParamList,
) {
  if (navigation.canGoBack()) {
    navigation.goBack();
    return;
  }
  resetOnboardingStack(navigation, fallback);
}

export function goToGoalSelection(navigation: RootNavigation) {
  navigation.navigate(Screen.goalSelection);
}

export function goToPurposeSelection(navigation: RootNavigation) {
  navigation.navigate(Screen.purposeSelection);
}

export function goToAssessmentPath(navigation: RootNavigation) {
  navigation.navigate(Screen.assessmentPath);
}

export function goToExperienceLevel(navigation: RootNavigation) {
  navigation.navigate(Screen.experienceLevel);
}

export function goToOnboardingHabits(navigation: RootNavigation) {
  navigation.navigate(Screen.onboardingHabits);
}

export function goToOnboardingBaseline(navigation: RootNavigation) {
  navigation.navigate(Screen.onboardingBaseline);
}

export function goToFirstWinActivity(navigation: RootNavigation) {
  resetOnboardingStack(navigation, Screen.firstWinActivity);
}

export function goToBuildingWellnessPlan(navigation: RootNavigation) {
  resetOnboardingStack(navigation, Screen.buildingWellnessPlan);
}

export function goToWellnessResults(navigation: RootNavigation) {
  resetOnboardingStack(navigation, Screen.wellnessResults);
}

export function goToOnboardingMood(navigation: RootNavigation) {
  resetOnboardingStack(navigation, Screen.onboardingMood);
}

/** @deprecated Use goToOnboardingMood — same destination */
export const goToOnboardingMoodPreAuth = goToOnboardingMood;

export function goToNotificationPermissions(navigation: RootNavigation) {
  resetOnboardingStack(navigation, Screen.notificationPermissions);
}

export function goToCreateAccount(navigation: RootNavigation) {
  resetOnboardingStack(navigation, Screen.authentication, {
    routes: [{ name: Screen.createAccount, params: { savePlan: true } }],
  });
}

/**
 * Skip screens already completed — mirrors resolvePreAuthRoute so remounts
 * land on the correct pre-auth step.
 */
export async function resumePreAuthOnboardingFromPending(
  navigation: RootNavigation,
  introSeen: boolean | null = null,
): Promise<'handled' | 'continue'> {
  const pending = await pendingOnboardingStorage.get();

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

  const route = await resolvePreAuthRoute(introSeen);
  onPreAuthRouteResolved?.(route);

  if (route === Screen.authentication) {
    goToCreateAccount(navigation);
    return 'handled';
  }

  // Already on the quiz — resetting to the same screen remounts forever and
  // leaves questionsReady false (blank spinner / empty screen).
  if (route === Screen.wellnessQuiz) {
    return 'continue';
  }

  if (route === Screen.subscriptionPaywall) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: Screen.subscriptionPaywall, params: { fromOnboarding: true } }],
      }),
    );
    return 'handled';
  }

  resetOnboardingStack(navigation, route);
  return 'handled';
}
