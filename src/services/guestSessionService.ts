// src/services/guestSessionService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEMO_WELLNESS_SCORE, DEMO_PATIENT } from '../config/demoUser';
import type { UserProfile, WellnessScore, DailyPlan } from '../types';
import { generateDailyPlan } from './planGenerator';
import { onboardingStorage } from './onboardingStorage';

const GUEST_KEY = 'wellnessshift_guest_session';

interface GuestSession {
  uid: string;
  displayName: string;
  email: string;
  role: 'patient';
  createdAt: string;
  onboardingComplete: boolean;
  quizComplete: boolean;
  primaryGoal?: string;
  streakFreezes?: number;
}

export async function createGuestSession(): Promise<UserProfile> {
  const uid = `guest_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const now = new Date().toISOString();
  const profile: GuestSession = {
    uid,
    displayName: 'Guest User',
    email: 'guest@wellnessshift.local',
    role: 'patient',
    createdAt: now,
    onboardingComplete: false,
    quizComplete: false,
    streakFreezes: 1,
  };
  await AsyncStorage.setItem(GUEST_KEY, JSON.stringify(profile));
  return profile as UserProfile;
}

export async function getGuestSession(): Promise<UserProfile | null> {
  try {
    const raw = await AsyncStorage.getItem(GUEST_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GuestSession;
    return parsed as UserProfile;
  } catch {
    return null;
  }
}

export async function clearGuestSession(): Promise<void> {
  await AsyncStorage.removeItem(GUEST_KEY);
}

export async function ensureGuestOnboarding(): Promise<void> {
  const guest = await getGuestSession();
  if (!guest) return;
  // Simulate minimal onboarding for guest
  await onboardingStorage.markQuizComplete(guest.uid);
  await onboardingStorage.markWellnessResultsComplete(guest.uid);
  await onboardingStorage.markPostQuizActionPlanComplete(guest.uid);
  await onboardingStorage.markPostQuizOnboardingComplete(guest.uid);
  await onboardingStorage.markQuickStartComplete(guest.uid);
  await onboardingStorage.markHealthKitPromptSeen(guest.uid);
  // Set a default primary goal for guest if not set
  const hasGoal = await onboardingStorage.getSelectedPrimaryGoal(guest.uid);
  if (!hasGoal) {
    await onboardingStorage.setSelectedPrimaryGoal(guest.uid, 'general');
  }
}

export async function generateGuestDailyPlan(primaryGoal?: string): Promise<DailyPlan> {
  return generateDailyPlan(DEMO_WELLNESS_SCORE, undefined, primaryGoal);
}

export async function upgradeGuestToRealUser(realProfile: UserProfile): Promise<void> {
  const guest = await getGuestSession();
  if (!guest) return;
  // In a real implementation, you'd migrate any guest data to the real user's Firestore
  // For now, just clear the guest session
  await clearGuestSession();
}
