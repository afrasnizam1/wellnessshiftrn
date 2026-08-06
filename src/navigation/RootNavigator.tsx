import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoadingScreen from '../components/auth/AppLoadingScreen';

import { appConfig } from '../config/appConfig';
import { useAppStore } from '../store';
import { firebaseAuth, userService, wellnessService } from '../services/firebase';
import { onboardingStorage } from '../services/onboardingStorage';
import { contentsquareService } from '../services/contentsquareService';
import { Colors, navigationTheme } from '../theme';
import type { RootStackParamList, UserProfile } from '../types';

import { ClinicianStackNavigator } from './ClinicianStackNavigator';
import { clinicianService } from '../services/clinicianService';
import { syncNativeRoleDoc } from '../services/firestoreSchema';
import { ensureAuthReadyForUid } from '../services/firebaseReady';
import { AuthNavigator } from './AuthNavigator';
import { applyPendingOnboardingToAccount, hydrateStoreFromPending } from '../services/applyPendingOnboarding';
import {
  resolvePostAuthOnboardingRoute,
  resolvePreAuthRoute,
  type PostAuthOnboardingRoute,
  type PreAuthRoute,
} from '../services/onboardingRoutes';
import {
  pendingCanShowResults,
  pendingJustFinishedQuiz,
  pendingOnboardingStorage,
} from '../services/pendingOnboardingStorage';

import SplashScreen from '../screens/auth/SplashScreen';
import BreathWelcomeScreen from '../screens/auth/BreathWelcomeScreen';
import ExperienceLevelScreen from '../screens/auth/ExperienceLevelScreen';
import OnboardingHabitsScreen from '../screens/auth/OnboardingHabitsScreen';
import OnboardingBaselineScreen from '../screens/auth/OnboardingBaselineScreen';
import FirstWinActivityScreen from '../screens/auth/FirstWinActivityScreen';
import EmailVerificationScreen from '../screens/auth/EmailVerificationScreen';
import IntroVideoScreen from '../screens/auth/IntroVideoScreen';
import QuizScreen from '../screens/auth/QuizScreen';
import BuildingWellnessPlanScreen from '../screens/auth/BuildingWellnessPlanScreen';
import GoalSelectionScreen from '../screens/auth/GoalSelectionScreen';
import PurposeSelectionScreen from '../screens/auth/PurposeSelectionScreen';
import AssessmentPathScreen from '../screens/auth/AssessmentPathScreen';
import EnhancedWellnessResultsScreen from '../screens/auth/EnhancedWellnessResultsScreen';
import QuizResultsDetailScreen from '../screens/auth/QuizResultsDetailScreen';
import OnboardingMoodScreen from '../screens/auth/OnboardingMoodScreen';
import NotificationPermissionScreen from '../screens/auth/NotificationPermissionScreen';
import HealthKitPermissionScreen from '../screens/auth/HealthKitPermissionScreen';
import PaywallScreen from '../screens/auth/PaywallScreen';
import ClinicianOnboardingScreen from '../screens/clinician/ClinicianOnboardingScreen';
import { notificationService, setupNotificationNavigation } from '../services/notifications';
import { subscriptionService } from '../services/subscriptionService';
import { freeTrialService } from '../services/freeTrialService';
import { crashlyticsService } from '../services/crashlyticsService';
import { navigationRef, navigateFromNotification } from './navigationRef';
import { screenviewFromNavigationState } from './screenTracking';
import { enterDemoSession, isDemoModeActive, isDemoProfile, shouldSkipToApp } from '../services/demoSession';
import { signOutCurrentUser } from '../services/authSession';
import { registerPreAuthRouteListener, registerWelcomeVideoCompletedListener } from '../services/onboardingNavigation';
import {
  clearDeferredSimulatorSession,
  isSimulatorOrEmulator,
  setDeferredSimulatorSession,
} from '../services/simulatorLaunch';
import { Screen } from './screenNames';
import { logger } from '../utils/logger';

const Stack = createNativeStackNavigator<RootStackParamList>();

/** Lazy so Food Scan / Health stacks can't break guest boot if a native module fails. */
function PatientAppScreen() {
  const { MainTabNavigator } = require('./MainTabNavigator') as typeof import('./MainTabNavigator');
  return <MainTabNavigator />;
}

type LegacyOnboardingRoute = typeof Screen.wellnessQuiz | typeof Screen.wellnessResults;
type PatientOnboardingRoute = PostAuthOnboardingRoute | LegacyOnboardingRoute;

function isEmailPasswordUser(): boolean {
  if (!appConfig.isFirebaseConfigured) return false;
  const auth = require('@react-native-firebase/auth').default;
  const providers = auth().currentUser?.providerData ?? [];
  return providers.some((p: { providerId: string }) => p.providerId === 'password');
}

function needsEmailVerification(): boolean {
  if (!appConfig.isFirebaseConfigured) return false;
  const auth = require('@react-native-firebase/auth').default;
  const fbUser = auth().currentUser;
  return !!fbUser && isEmailPasswordUser() && !fbUser.emailVerified;
}

const PROFILE_CREATE_RETRY_MS = 250;
const PROFILE_CREATE_RETRY_ATTEMPTS = 8;
const CLINICIAN_GATE_TIMEOUT_MS = 10_000;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<T>((resolve) => {
        timer = setTimeout(() => resolve(fallback), ms);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

async function ensureProfile(firebaseUser: { uid: string; email: string | null; displayName: string | null }): Promise<UserProfile | null> {
  try {
    await ensureAuthReadyForUid(firebaseUser.uid);
  } catch (error) {
    console.warn('[ensureProfile] auth not ready:', error);
    return null;
  }

  // Sign-up creates the profile (with the correct role) right after auth.
  // Wait briefly so we don't race ahead and stamp a default patient doc.
  let profile = await userService.getProfile(firebaseUser.uid);
  if (!profile) {
    for (let attempt = 0; attempt < PROFILE_CREATE_RETRY_ATTEMPTS && !profile; attempt += 1) {
      await delay(PROFILE_CREATE_RETRY_MS);
      profile = await userService.getProfile(firebaseUser.uid);
    }
  }

  if (!profile) {
    try {
      await userService.createProfile(firebaseUser.uid, {
        displayName: firebaseUser.displayName || 'User',
        email: firebaseUser.email || '',
        role: 'patient',
      });
      profile = await userService.getProfile(firebaseUser.uid);
    } catch (error) {
      console.warn('[ensureProfile] createProfile failed:', error);
      return null;
    }
  }
  if (!profile) return null;

  if (profile.role === 'patient') {
    const applied = await applyPendingOnboardingToAccount(firebaseUser.uid);
    if (applied) {
      profile = (await userService.getProfile(firebaseUser.uid)) ?? profile;
    }
  }

  if (!profile.csq?.identity) {
    profile = { ...profile, csq: { identity: firebaseUser.uid } };
    await userService.updateProfile(firebaseUser.uid, { csq: profile.csq });
  }

  await syncNativeRoleDoc(profile).catch((error) => {
    console.warn('[ensureProfile] role doc sync failed:', error);
  });

  return profile;
}

/** Resolve clinician onboarding flag and always clear the loading gate. */
async function resolveClinicianSessionGate(
  uid: string,
  setClinicianProfileReady: (ready: boolean) => void,
): Promise<boolean> {
  try {
    // Await schema backfill so we don't race a false onboardingCompleted write.
    await clinicianService.ensureClinicianDoc(uid).catch((error) => {
      console.warn('[resolveClinicianSessionGate] ensureClinicianDoc failed:', error);
    });

    const result = await Promise.race([
      clinicianService.isClinicianOnboardingComplete(uid).then((onboarded) => ({
        onboarded,
        timedOut: false as const,
      })),
      new Promise<{ onboarded: boolean; timedOut: true }>((resolve) => {
        setTimeout(() => resolve({ onboarded: false, timedOut: true }), CLINICIAN_GATE_TIMEOUT_MS);
      }),
    ]);

    if (result.timedOut) {
      // Direct retry without race — don't assume incomplete after a slow network.
      const retry = await clinicianService.isClinicianOnboardingComplete(uid).catch(() => false);
      setClinicianProfileReady(retry);
      notificationService.registerDevice(uid, 'clinician').catch(() => {});
      return retry;
    }

    setClinicianProfileReady(result.onboarded);
    notificationService.registerDevice(uid, 'clinician').catch(() => {});
    return result.onboarded;
  } catch (error) {
    console.warn('[resolveClinicianSessionGate] failed:', error);
    // Fail open into clinician onboarding rather than an infinite spinner.
    setClinicianProfileReady(false);
    return false;
  }
}

async function resolvePatientOnboardingRouteFromProfile(
  profile: UserProfile,
  setUser: (user: UserProfile) => void,
): Promise<PatientOnboardingRoute | null> {
  if (profile.onboardingComplete) return null;

  let current = profile;
  // Apply guest funnel progress once (goals, quiz score, mood flags, etc.).
  if (!current.quizComplete || !current.onboardingComplete) {
    await applyPendingOnboardingToAccount(current.uid);
    const refreshed = await userService.getProfile(current.uid);
    if (refreshed) {
      current = refreshed;
      setUser(current);
    }
  }

  const pending = await pendingOnboardingStorage.get();
  let score = await wellnessService.getLatestScore(current.uid);
  // Guest quiz → account: score may still only live in pending until apply runs.
  if (!score && pending.wellnessScore && pending.quizComplete) {
    await wellnessService.saveScore(current.uid, pending.wellnessScore);
    score = pending.wellnessScore;
  }
  const resultsSeen = await onboardingStorage.hasCompletedWellnessResults(current.uid);
  const awaitingResults =
    pendingCanShowResults(pending) || pendingJustFinishedQuiz(pending);

  // Real quiz = profile flag + saved score. Never invent completion from legacy flags.
  if (score && !current.quizComplete && pending.quizComplete) {
    await userService.updateProfile(current.uid, { quizComplete: true });
    current = { ...current, quizComplete: true };
    setUser(current);
  }

  const route = await resolvePostAuthOnboardingRoute(current, {
    hasScore: !!score,
    resultsSeen,
    awaitingResults,
  });

  if (route === 'complete') {
    await onboardingStorage.markMainOnboardingSupplementsComplete(current.uid);
    await onboardingStorage.setPendingInAppGuide(current.uid, true);
    await userService.updateProfile(current.uid, { onboardingComplete: true });
    setUser({ ...current, onboardingComplete: true });
    return null;
  }
  return route;
}

export default function RootNavigator() {
  const {
    user, isAuthLoading, setUser, setAuthLoading, setHasSeenIntro, setWellnessScore, setLastQuizAnswers,
    clinicianProfileReady, setClinicianProfileReady, setSubscriptionTier, subscriptionTier,
    setTrialActive, sessionEpoch, resetSession,
  } = useAppStore();
  const [introSeen, setIntroSeen] = useState(true);
  const [preAuthRoute, setPreAuthRoute] = useState<PreAuthRoute | null>(null);
  const [onboardingRoute, setOnboardingRoute] = useState<PatientOnboardingRoute | null>(null);
  const [onboardingRouteReady, setOnboardingRouteReady] = useState(false);
  const [clinicianGateReady, setClinicianGateReady] = useState(false);
  /** Signed-in patients who never saw launch breath/welcome on this install. */
  const [launchWelcomeGate, setLaunchWelcomeGate] = useState<'loading' | 'needed' | 'done'>('loading');
  const lastAuthUidRef = useRef<string | null>(null);
  const freezePreAuthRouteRef = useRef(false);
  const guestNavActiveRef = useRef(false);
  const lastCsqScreenviewRef = useRef<string | null>(null);
  const simulatorSessionAcceptedRef = useRef(false);

  useEffect(() => {
    return registerPreAuthRouteListener((route) => {
      // Explicit progress from refreshPreAuthRouteFromPending — always apply.
      // Freeze only blocks the cold-start useEffect re-resolve below.
      setPreAuthRoute(route);
    });
  }, []);

  useEffect(() => {
    return registerWelcomeVideoCompletedListener(() => {
      setLaunchWelcomeGate('done');
    });
  }, []);

  // Physical device / signed-in: show launch breathe+welcome once per account
  // (again after signup even if they already watched it as a guest).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!user || user.role !== 'patient') {
        if (!cancelled) setLaunchWelcomeGate('done');
        return;
      }
      if (!cancelled) setLaunchWelcomeGate('loading');
      try {
        const seen = await onboardingStorage.hasSeenWelcomeVideo(user.uid);
        if (!cancelled) setLaunchWelcomeGate(seen ? 'done' : 'needed');
      } catch {
        if (!cancelled) setLaunchWelcomeGate('done');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.uid, user?.role]);

  useEffect(() => {
    if (user) {
      guestNavActiveRef.current = false;
      freezePreAuthRouteRef.current = false;
      return;
    }
    if (preAuthRoute && !isAuthLoading) {
      guestNavActiveRef.current = true;
      freezePreAuthRouteRef.current = true;
    }
  }, [user, preAuthRoute, isAuthLoading]);

  const lastPatientUidRef = useRef<string | null>(null);

  useEffect(() => {
    if (user?.uid !== lastPatientUidRef.current) {
      lastPatientUidRef.current = user?.uid ?? null;
      if (user?.role === 'patient' && !user.onboardingComplete) {
        setOnboardingRouteReady(false);
      }
    }
  }, [user?.uid, user?.role, user?.onboardingComplete]);

  useEffect(() => {
    contentsquareService.syncAnalyticsForUser(user, isAuthLoading).catch((error) => {
      console.warn('[CSQ] syncAnalyticsForUser failed:', error);
    });
  }, [user?.uid, user?.role, isAuthLoading]);

  useEffect(() => {
    subscriptionService.setCurrentUser(user?.uid ?? null);
    if (appConfig.isFirebaseConfigured) {
      crashlyticsService.setUser(user?.uid ?? null, user?.role);
    }
    if (!user) return;
    subscriptionService.syncForUser(user.uid, setSubscriptionTier).catch((error) => {
      console.warn('[subscription] syncForUser failed:', error);
    });
  }, [user?.uid, user?.role, setSubscriptionTier]);

  useEffect(() => {
    if (!user?.uid || user.role !== 'patient') {
      setTrialActive(false);
      return;
    }
    let cancelled = false;
    freeTrialService.getStatus(user.uid, subscriptionTier).then((status) => {
      if (!cancelled) setTrialActive(status.isActive);
    }).catch(() => {
      if (!cancelled) setTrialActive(false);
    });
    return () => { cancelled = true; };
  }, [user?.uid, user?.role, subscriptionTier, setTrialActive]);

  useEffect(() => {
    if (shouldSkipToApp()) {
      enterDemoSession({
        setUser,
        setWellnessScore,
        setAuthLoading,
        setSubscriptionTier,
      });
      setIntroSeen(true);
      setHasSeenIntro(true);
      return;
    }

    setIntroSeen(true);
    setHasSeenIntro(true);
  }, [setUser, setWellnessScore, setAuthLoading, setSubscriptionTier, setHasSeenIntro]);

  useEffect(() => {
    if (user || shouldSkipToApp() || isAuthLoading) return;
    hydrateStoreFromPending(setWellnessScore, setLastQuizAnswers).catch(() => {});
    resolvePreAuthRoute(introSeen).then((route) => {
      if (!freezePreAuthRouteRef.current) {
        setPreAuthRoute(route);
      }
    }).catch(() => {
      if (!freezePreAuthRouteRef.current) {
        setPreAuthRoute(Screen.introVideo);
      }
    });
  }, [user, introSeen, isAuthLoading, setWellnessScore, setLastQuizAnswers]);

  useEffect(() => {
    if (!appConfig.isFirebaseConfigured) {
      setAuthLoading(false);
      return;
    }

    let cancelled = false;
    let unsub: (() => void) | undefined;

    const timeoutId = setTimeout(() => {
      console.warn('Firebase auth state change timeout - forcing loading to false');
      setAuthLoading(false);
    }, 10000);

    const attachAuthListener = () => {
      unsub = firebaseAuth.onAuthStateChanged(async (firebaseUser) => {
        clearTimeout(timeoutId);
        if (cancelled) return;
        try {
          if (firebaseUser) {
            const acceptSession = async () => {
              const profile = await ensureProfile(firebaseUser);
              if (!profile || cancelled) return;

              simulatorSessionAcceptedRef.current = true;
              clearDeferredSimulatorSession();
              setUser(profile);

              if (profile.role === 'clinician') {
                // Clear the loading gate before optional score fetch so SignUp /
                // SignIn setUser(clinician) cannot leave users on an infinite spinner.
                try {
                  await resolveClinicianSessionGate(firebaseUser.uid, setClinicianProfileReady);
                } finally {
                  if (!cancelled) setClinicianGateReady(true);
                }
              } else if (profile.role === 'patient') {
                setClinicianGateReady(true);
                if (!profile.onboardingComplete) {
                  const route = await resolvePatientOnboardingRouteFromProfile(profile, setUser);
                  setOnboardingRoute(route);
                  setOnboardingRouteReady(true);
                }
              } else {
                setClinicianGateReady(true);
              }

              try {
                const score = await withTimeout(
                  wellnessService.getLatestScore(firebaseUser.uid),
                  CLINICIAN_GATE_TIMEOUT_MS,
                  null,
                );
                if (score && !cancelled) setWellnessScore(score);
              } catch (error) {
                console.warn('[acceptSession] getLatestScore failed:', error);
              }
            };

            // Simulator: keep Firebase session available via "Continue with session",
            // but still start the personalisation funnel (purpose → goals → …).
            if (isSimulatorOrEmulator() && !simulatorSessionAcceptedRef.current) {
              setDeferredSimulatorSession(acceptSession);
              freezePreAuthRouteRef.current = false;
              guestNavActiveRef.current = false;
              const route = await resolvePreAuthRoute(introSeen);
              if (!cancelled) setPreAuthRoute(route);
              setAuthLoading(false);
              lastAuthUidRef.current = firebaseUser.uid;
              return;
            }

            await acceptSession();
          } else if (isDemoProfile(useAppStore.getState().user)) {
            setAuthLoading(false);
          } else {
            clearDeferredSimulatorSession();
            simulatorSessionAcceptedRef.current = false;
            const hadFirebaseSession = lastAuthUidRef.current != null;
            if (hadFirebaseSession) {
              freezePreAuthRouteRef.current = false;
              guestNavActiveRef.current = false;
              resetSession();
              setOnboardingRoute(null);
              setOnboardingRouteReady(false);
              setClinicianGateReady(false);
            }
            resolvePreAuthRoute(introSeen).then(setPreAuthRoute);
          }
        } catch (error) {
          console.error('Auth state change error:', error);
          setAuthLoading(false);
        }
        setAuthLoading(false);
        lastAuthUidRef.current = firebaseUser?.uid ?? null;
      });
    };

      const start = async () => {
      if (__DEV__ && appConfig.forceAuthScreenOnLaunch && !isSimulatorOrEmulator()) {
        try {
          await signOutCurrentUser();
          logger.log('[RootNavigator] cleared session for clean auth launch');
        } catch (error) {
          console.warn('[RootNavigator] force auth launch sign-out failed:', error);
        }
      }
      // Simulators: do NOT force authentication here — that skipped the
      // "Why are you here?" → goals funnel. Auth listener sets deferred session
      // + auth screen only when a Firebase session exists to resume.
      if (cancelled) return;
      attachAuthListener();
    };

    start();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      unsub?.();
    };
  }, [setUser, setAuthLoading, setWellnessScore, setLastQuizAnswers, resetSession, setClinicianProfileReady, introSeen]);

  useEffect(() => {
    if (user && (isDemoModeActive() || isDemoProfile(user))) {
      setIntroSeen(true);
      setHasSeenIntro(true);
    }
  }, [user?.uid, setHasSeenIntro]);

  useEffect(() => {
    if (!isDemoProfile(user)) return;

    setIntroSeen(true);
    setHasSeenIntro(true);
    setAuthLoading(false);
    setClinicianGateReady(true);

    if (user?.role === 'clinician') {
      setClinicianProfileReady(true);
    }
  }, [user?.uid, user?.role, setClinicianProfileReady, setHasSeenIntro, setAuthLoading]);

  useEffect(() => {
    if (!user || user.role !== 'patient' || user.onboardingComplete) {
      setOnboardingRoute(null);
      setOnboardingRouteReady(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const route = await resolvePatientOnboardingRouteFromProfile(user, setUser);
        if (cancelled) return;
        setOnboardingRoute(route);
      } catch (error) {
        console.warn('Onboarding route resolution failed:', error);
      } finally {
        if (!cancelled) setOnboardingRouteReady(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user?.uid, user?.quizComplete, user?.onboardingComplete, user?.role, setUser]);

  // SignUp / SignIn call setUser(clinician) outside acceptSession. If the auth
  // listener already returned early (profile race) or is still mid-flight, the
  // clinician loading gate would never clear without this fallback.
  useEffect(() => {
    if (!user || user.role !== 'clinician' || clinicianGateReady) return;

    let cancelled = false;
    let settled = false;
    const timeoutId = setTimeout(() => {
      if (cancelled || settled) return;
      console.warn('[RootNavigator] clinician gate timeout — clearing spinner (keeping resolved flag)');
      // Do NOT force clinicianProfileReady=false — that incorrectly re-onboards
      // clinicians whose profile check is merely slow.
      setClinicianGateReady(true);
    }, CLINICIAN_GATE_TIMEOUT_MS);

    (async () => {
      try {
        await resolveClinicianSessionGate(user.uid, setClinicianProfileReady);
      } finally {
        settled = true;
        if (!cancelled) {
          clearTimeout(timeoutId);
          setClinicianGateReady(true);
        }
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [user?.uid, user?.role, clinicianGateReady, setClinicianProfileReady]);

  useEffect(() => {
    if (!user || !appConfig.isFirebaseConfigured) return;
    return notificationService.onTokenRefresh(user.uid, () => {});
  }, [user?.uid]);

  useEffect(() => {
    if (!appConfig.isFirebaseConfigured) return;
    if (!user?.onboardingComplete && user?.role === 'patient') return;
    if (user?.role === 'clinician' && !clinicianProfileReady) return;
    if (needsEmailVerification()) return;
    if (!user) return;

    return setupNotificationNavigation(navigateFromNotification);
  }, [user?.uid, user?.role, user?.onboardingComplete, clinicianProfileReady]);

  const showEmailVerification = !!user && needsEmailVerification();
  const showLaunchWelcome =
    !!user && user.role === 'patient' && !showEmailVerification && launchWelcomeGate === 'needed';
  const showPatientOnboarding =
    !!user &&
    user.role === 'patient' &&
    !user.onboardingComplete &&
    !showEmailVerification &&
    launchWelcomeGate === 'done';
  const showClinicianOnboarding =
    !!user && user.role === 'clinician' && clinicianGateReady && !clinicianProfileReady && !showEmailVerification;
  const showClinician =
    !!user && user.role === 'clinician' && clinicianGateReady && clinicianProfileReady && !showEmailVerification;
  const showPatientMain =
    !!user &&
    user.role === 'patient' &&
    user.onboardingComplete &&
    !showEmailVerification &&
    launchWelcomeGate === 'done';

  if (
    (isAuthLoading && !guestNavActiveRef.current) ||
    (!user && preAuthRoute === null) ||
    (user?.role === 'patient' && launchWelcomeGate === 'loading') ||
    (showPatientOnboarding && !onboardingRouteReady) ||
    // Email verification must not be blocked by the clinician gate.
    (!!user && user.role === 'clinician' && !clinicianGateReady && !showEmailVerification)
  ) {
    return <AppLoadingScreen />;
  }

  let initialRouteName: keyof RootStackParamList = Screen.introVideo;
  if (!user) {
    initialRouteName = preAuthRoute ?? Screen.introVideo;
  } else if (showEmailVerification) {
    initialRouteName = Screen.emailVerification;
  } else if (showLaunchWelcome) {
    initialRouteName = Screen.introVideo;
  } else if (showPatientOnboarding && onboardingRouteReady && onboardingRoute) {
    initialRouteName = onboardingRoute;
  } else if (showClinicianOnboarding) {
    initialRouteName = Screen.clinicianOnboarding;
  } else if (showClinician) {
    initialRouteName = Screen.clinicianPortal;
  } else if (showPatientMain) {
    initialRouteName = Screen.patientApp;
  }

  const reportNavigationScreenview = () => {
    if (!navigationRef.isReady()) return;
    const next = screenviewFromNavigationState(navigationRef.getRootState());
    if (!next || next === lastCsqScreenviewRef.current) return;
    lastCsqScreenviewRef.current = next;
    contentsquareService.trackNavigationScreenview(next);
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={navigationTheme}
      key={`${user?.uid ?? 'guest'}-${sessionEpoch}-${user?.role ?? 'none'}-${user?.onboardingComplete ? 'main' : 'onboard'}-${launchWelcomeGate}-${user?.role === 'clinician' ? (clinicianProfileReady ? 'portal' : 'clinician-onboard') : 'n'}`}
      onReady={() => {
        lastCsqScreenviewRef.current = null;
        reportNavigationScreenview();
      }}
      onStateChange={reportNavigationScreenview}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { flex: 1, backgroundColor: Colors.background },
        }}
        initialRouteName={initialRouteName}
      >
        {!user ? (
          <Stack.Group>
            <Stack.Screen name={Screen.introVideo} component={IntroVideoScreen} />
            <Stack.Screen name={Screen.breathWelcome} component={BreathWelcomeScreen} />
            <Stack.Screen name={Screen.authentication} component={AuthNavigator} />
            <Stack.Screen name={Screen.welcome} component={SplashScreen} />
            <Stack.Screen name={Screen.purposeSelection} component={PurposeSelectionScreen} />
            <Stack.Screen name={Screen.goalSelection} component={GoalSelectionScreen} />
            <Stack.Screen name={Screen.experienceLevel} component={ExperienceLevelScreen} />
            <Stack.Screen name={Screen.onboardingHabits} component={OnboardingHabitsScreen} />
            <Stack.Screen name={Screen.onboardingBaseline} component={OnboardingBaselineScreen} />
            <Stack.Screen name={Screen.assessmentPath} component={AssessmentPathScreen} />
            <Stack.Screen name={Screen.wellnessQuiz} component={QuizScreen} />
            <Stack.Screen name={Screen.buildingWellnessPlan} component={BuildingWellnessPlanScreen} />
            <Stack.Screen name={Screen.wellnessResults} component={EnhancedWellnessResultsScreen} />
            <Stack.Screen name={Screen.onboardingMood} component={OnboardingMoodScreen} />
            <Stack.Screen name={Screen.firstWinActivity} component={FirstWinActivityScreen} />
            <Stack.Screen name={Screen.quizCategoryDetail} component={QuizResultsDetailScreen} />
            <Stack.Screen name={Screen.notificationPermissions} component={NotificationPermissionScreen} />
            <Stack.Screen name={Screen.healthPermissions} component={HealthKitPermissionScreen} />
            <Stack.Screen
              name={Screen.subscriptionPaywall}
              component={PaywallScreen}
              initialParams={{ fromOnboarding: true }}
            />
          </Stack.Group>
        ) : showEmailVerification ? (
          <Stack.Screen name={Screen.emailVerification} component={EmailVerificationScreen} />
        ) : showLaunchWelcome ? (
          <Stack.Screen name={Screen.introVideo} component={IntroVideoScreen} />
        ) : showPatientOnboarding && onboardingRouteReady ? (
          <Stack.Group>
            <Stack.Screen name={Screen.introVideo} component={IntroVideoScreen} />
            <Stack.Screen name={Screen.purposeSelection} component={PurposeSelectionScreen} />
            <Stack.Screen name={Screen.wellnessQuiz} component={QuizScreen} />
            <Stack.Screen name={Screen.buildingWellnessPlan} component={BuildingWellnessPlanScreen} />
            <Stack.Screen name={Screen.wellnessResults} component={EnhancedWellnessResultsScreen} />
            <Stack.Screen name={Screen.quizCategoryDetail} component={QuizResultsDetailScreen} />
            <Stack.Screen name={Screen.onboardingMood} component={OnboardingMoodScreen} />
            <Stack.Screen name={Screen.authentication} component={AuthNavigator} />
            <Stack.Screen name={Screen.notificationPermissions} component={NotificationPermissionScreen} />
            <Stack.Screen name={Screen.healthPermissions} component={HealthKitPermissionScreen} />
            <Stack.Screen
              name={Screen.subscriptionPaywall}
              component={PaywallScreen}
              initialParams={{ fromOnboarding: true }}
            />
          </Stack.Group>
        ) : showClinicianOnboarding ? (
          <Stack.Screen name={Screen.clinicianOnboarding} component={ClinicianOnboardingScreen} />
        ) : showClinician ? (
          <Stack.Screen name={Screen.clinicianPortal} component={ClinicianStackNavigator} />
        ) : showPatientMain ? (
          <>
            <Stack.Screen name={Screen.patientApp} component={PatientAppScreen} />
            {/* Retake assessment from Home / Daily Plan */}
            <Stack.Screen name={Screen.wellnessQuiz} component={QuizScreen} />
            <Stack.Screen name={Screen.buildingWellnessPlan} component={BuildingWellnessPlanScreen} />
            <Stack.Screen name={Screen.wellnessResults} component={EnhancedWellnessResultsScreen} />
            <Stack.Screen name={Screen.quizCategoryDetail} component={QuizResultsDetailScreen} />
          </>
        ) : null}

        {user && showPatientMain ? (
          <Stack.Screen
            name={Screen.subscriptionPaywall}
            component={PaywallScreen}
            options={{ presentation: 'modal' }}
          />
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
