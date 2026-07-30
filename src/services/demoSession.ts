import { appConfig } from '../config/appConfig';
import { contentsquareService } from './contentsquareService';
import {
  DEMO_CLINICIAN,
  DEMO_PATIENT,
  DEMO_PATIENT_QUESTIONNAIRE,
  DEMO_WELLNESS_SCORE,
} from '../config/demoUser';
import type { SubscriptionTier, UserProfile, WellnessScore } from '../types';

export function isDemoProfile(user: UserProfile | null | undefined): boolean {
  return !!user?.uid?.startsWith('demo_');
}

export function isDemoModeActive(): boolean {
  return appConfig.enableDemoMode && !appConfig.isFirebaseConfigured;
}

export function canSkipToApp(): boolean {
  return appConfig.enableDemoMode;
}

export function shouldSkipToApp(): boolean {
  return isDemoModeActive() && appConfig.skipAuthAndOnboarding;
}

type DemoSessionSetters = {
  setUser: (user: UserProfile | null) => void;
  setWellnessScore: (score: WellnessScore) => void;
  setAuthLoading: (loading: boolean) => void;
  setSubscriptionTier?: (tier: SubscriptionTier) => void;
  setHasSeenIntro?: (seen: boolean) => void;
  setClinicianProfileReady?: (ready: boolean) => void;
};

function applyDemoDefaults({
  setUser,
  setWellnessScore,
  setAuthLoading,
  setSubscriptionTier,
  setHasSeenIntro,
}: DemoSessionSetters, profile: UserProfile): void {
  setUser(profile);
  setWellnessScore(DEMO_WELLNESS_SCORE);
  setAuthLoading(false);
  setHasSeenIntro?.(true);

  if (appConfig.enableDevSubscriptionBypass && setSubscriptionTier) {
    setSubscriptionTier(appConfig.devSubscriptionTier);
  }

  contentsquareService.onAuthSuccess(profile).catch(() => {});
}

/** Full patient app (onboarding complete) */
export function enterDemoSession(setters: DemoSessionSetters): void {
  applyDemoDefaults(setters, DEMO_PATIENT);
}

/** Wellness questionnaire / onboarding flow */
export function enterDemoQuestionnaireSession(setters: DemoSessionSetters): void {
  applyDemoDefaults(setters, DEMO_PATIENT_QUESTIONNAIRE);
}

/** Clinician portal */
export function enterDemoClinicianSession(setters: DemoSessionSetters): void {
  applyDemoDefaults(setters, DEMO_CLINICIAN);
  setters.setClinicianProfileReady?.(true);
}
