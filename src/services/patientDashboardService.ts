import type { FitnessHubRecommendation, WellnessCategoryKey, WellnessScore } from '../types';
import { wellnessService } from './firebase';
import { checkInService } from './checkInService';
import { programService } from './programService';
import { clinicianService } from './clinicianService';
import { isFirebaseReady } from './firebaseReady';
import { DEMO_WELLNESS_SCORE } from '../config/demoUser';
import { WELLNESS_CATEGORIES } from '../theme';

export interface PatientDashboardData {
  score: WellnessScore | null;
  scoreHistory: WellnessScore[];
  checkInStreak: number;
  checkInsLast7Days: number;
  activePrograms: number;
  carePlanCount: number;
  fitnessRecommendations: FitnessHubRecommendation | null;
  categoryScores: { key: WellnessCategoryKey; label: string; score: number; color: string }[];
  engagementLevel: 'high' | 'medium' | 'low';
}

function engagementFromMetrics(streak: number, programs: number, checkIns7: number): PatientDashboardData['engagementLevel'] {
  const score = streak * 2 + programs * 3 + checkIns7;
  if (score >= 12) return 'high';
  if (score >= 5) return 'medium';
  return 'low';
}

export const patientDashboardService = {
  getDashboard: async (patientId: string): Promise<PatientDashboardData> => {
    if (!isFirebaseReady()) {
      const score = DEMO_WELLNESS_SCORE;
      return {
        score,
        scoreHistory: [score],
        checkInStreak: 5,
        checkInsLast7Days: 4,
        activePrograms: 1,
        carePlanCount: 1,
        fitnessRecommendations: null,
        categoryScores: WELLNESS_CATEGORIES.map((c) => ({
          key: c.key as WellnessCategoryKey,
          label: c.label,
          score: score.categories[c.key as WellnessCategoryKey] ?? 0,
          color: c.color,
        })),
        engagementLevel: 'medium',
      };
    }

    const [score, scoreHistory, streak, checkInDates, programs, plans, recs] = await Promise.all([
      wellnessService.getLatestScore(patientId).catch(() => null),
      wellnessService.getScoreHistory(patientId, 14).catch(() => [] as WellnessScore[]),
      checkInService.getCheckInStreak(patientId).catch(() => 0),
      checkInService.getRecentCheckInDates(patientId, 7).catch(() => [] as string[]),
      programService.getActivePrograms(patientId).catch(() => []),
      clinicianService.getCustomCarePlansForPatient(patientId).catch(() => []),
      clinicianService.getLatestFitnessHubRecommendations(patientId).catch(() => null),
    ]);

    const latest = score ?? scoreHistory[scoreHistory.length - 1] ?? null;
    const categories = WELLNESS_CATEGORIES.map((c) => ({
      key: c.key as WellnessCategoryKey,
      label: c.label.split(' ')[0],
      score: latest?.categories[c.key as WellnessCategoryKey] ?? 0,
      color: c.color,
    }));

    return {
      score: latest,
      scoreHistory,
      checkInStreak: streak,
      checkInsLast7Days: checkInDates.length,
      activePrograms: programs.filter((p) => p.status === 'active').length,
      carePlanCount: plans.length,
      fitnessRecommendations: recs,
      categoryScores: categories,
      engagementLevel: engagementFromMetrics(streak, programs.length, checkInDates.length),
    };
  },
};
