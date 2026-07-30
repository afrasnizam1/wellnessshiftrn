import type { UserProfile } from '../types';
import { pendingOnboardingStorage } from './pendingOnboardingStorage';
import { onboardingStorage } from './onboardingStorage';
import { userService, wellnessService } from './firebase';
import { checkInService } from './checkInService';
import type { MoodLevel } from '../types';

/** Apply pre-auth quiz/goals to the account and return the latest profile. */
export async function ensurePendingOnboardingApplied(uid: string): Promise<UserProfile | null> {
  await applyPendingOnboardingToAccount(uid);
  return userService.getProfile(uid);
}

export async function applyPendingOnboardingToAccount(uid: string): Promise<boolean> {
  const pending = await pendingOnboardingStorage.get();
  if (!pending.resultsPreviewComplete || !pending.wellnessScore) return false;

  const goals = pending.goals;
  const primaryGoal = pending.primaryGoal ?? goals[0] ?? 'general';

  await userService.updateProfile(uid, {
    primaryGoal,
    healthGoals: goals,
    quizComplete: true,
    onboardingComplete: false,
    appPurpose: pending.appPurpose ?? pending.appPurposes?.[0] ?? undefined,
    appPurposes: pending.appPurposes?.length
      ? pending.appPurposes
      : pending.appPurpose
        ? [pending.appPurpose]
        : undefined,
    experienceLevel: pending.experienceLevel ?? undefined,
    trainingDaysPerWeek: pending.trainingDaysPerWeek ?? undefined,
    reminderAnchor: pending.reminderAnchor ?? undefined,
    hasHomeEquipment: pending.hasHomeEquipment ?? undefined,
    dateOfBirth: pending.dateOfBirth ?? undefined,
    heightCm: pending.heightCm ?? undefined,
    weightKg: pending.weightKg ?? undefined,
  });

  await wellnessService.saveScore(uid, pending.wellnessScore);

  await onboardingStorage.setUserGoals(uid, goals);
  await onboardingStorage.setSelectedPrimaryGoal(uid, primaryGoal);
  if (pending.appPurpose || pending.appPurposes?.length) {
    const purposes = pending.appPurposes?.length
      ? pending.appPurposes
      : pending.appPurpose
        ? [pending.appPurpose]
        : [];
    if (pending.appPurpose) {
      await onboardingStorage.setAppPurpose(uid, pending.appPurpose);
    }
    if (purposes.length) {
      await onboardingStorage.setAppPurposes(uid, purposes);
    }
  }
  if (pending.experienceLevel) {
    await onboardingStorage.setExperienceLevel(uid, pending.experienceLevel);
  }
  if (pending.reminderAnchor && pending.trainingDaysPerWeek) {
    await onboardingStorage.setOnboardingHabits(uid, {
      reminderAnchor: pending.reminderAnchor,
      trainingDaysPerWeek: pending.trainingDaysPerWeek,
      hasHomeEquipment: pending.hasHomeEquipment ?? undefined,
    });
  }
  if (pending.dateOfBirth || pending.heightCm || pending.weightKg) {
    await onboardingStorage.setBaselineMetrics(uid, {
      dateOfBirth: pending.dateOfBirth ?? undefined,
      heightCm: pending.heightCm ?? undefined,
      weightKg: pending.weightKg ?? undefined,
    });
  }

  await onboardingStorage.markQuizComplete(uid);
  await onboardingStorage.markWellnessResultsComplete(uid);
  await onboardingStorage.markMainOnboardingSupplementsComplete(uid);

  if (pending.moodStepComplete) {
    await onboardingStorage.markOnboardingMoodComplete(uid);
    if (pending.moodLevel) {
      await checkInService.saveCheckIn(uid, {
        mood: pending.moodLevel as MoodLevel,
        energy: 3,
        stress: 5,
        notes: '',
      });
    }
  }
  if (pending.firstWinComplete) {
    await onboardingStorage.markFirstWinComplete(uid);
  }

  await pendingOnboardingStorage.clear();
  return true;
}

import type { AssessmentAnswerMap } from '../utils/wellnessAssessmentScoring';
import type { WellnessScore } from '../types';

export async function hydrateStoreFromPending(
  setWellnessScore: (score: WellnessScore | null) => void,
  setLastQuizAnswers: (answers: AssessmentAnswerMap | null) => void,
): Promise<void> {
  const pending = await pendingOnboardingStorage.get();
  // Only hydrate a score when Results is actually allowed (just finished quiz).
  if (pending.awaitingResultsPreview && pending.wellnessScore) {
    setWellnessScore(pending.wellnessScore);
    if (pending.quizAnswers) setLastQuizAnswers(pending.quizAnswers);
  }
}
