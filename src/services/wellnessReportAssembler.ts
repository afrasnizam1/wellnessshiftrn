import { WELLNESS_CATEGORIES } from '../theme';
import {
  buildInsightLines,
  getDailyPlanCompletionRate,
} from './analyticsService';
import { checkInService } from './checkInService';
import { wellnessService } from './firebase';
import { healthKitService } from './healthkit';
import type { ActivitySnapshot, WellnessReportSnapshot, WellnessScore } from '../types';

const DISCLAIMER =
  'For personal records only — not a medical document. Consult a healthcare professional for medical advice.';

export async function buildWellnessReportSnapshot(
  uid: string,
  userName: string,
  wellnessScore: WellnessScore | null,
  reportTitle = 'Wellness Year Report'
): Promise<WellnessReportSnapshot> {
  const [history, streak, activity, completionRate] = await Promise.all([
    wellnessService.getScoreHistory(uid, 90).catch(() => [] as WellnessScore[]),
    checkInService.getCheckInStreak(uid).catch(() => 0),
    (async (): Promise<ActivitySnapshot | null> => {
      try {
        if (!(await healthKitService.isAvailable())) return null;
        return await healthKitService.getTodayActivity();
      } catch {
        return null;
      }
    })(),
    getDailyPlanCompletionRate(uid, 14),
  ]);

  const scoreHistory =
    history.length > 0
      ? [...history].reverse()
      : wellnessScore
        ? [wellnessScore]
        : [];

  const latest = scoreHistory[scoreHistory.length - 1] ?? wellnessScore;
  const overallScore = latest?.overall ?? wellnessScore?.overall ?? null;

  const categoryScores = WELLNESS_CATEGORIES.map((cat) => ({
    key: cat.key,
    label: cat.label,
    score: latest?.categories[cat.key] ?? wellnessScore?.categories[cat.key] ?? 0,
  }));

  const sorted = [...categoryScores].sort((a, b) => b.score - a.score);
  const strengths = sorted.slice(0, 3).map((c) => `${c.label}: ${c.score.toFixed(1)}/10`);
  const areasForImprovement = [...sorted]
    .reverse()
    .slice(0, 3)
    .map((c) => `${c.label}: ${c.score.toFixed(1)}/10`);

  const insightLines = buildInsightLines(scoreHistory, wellnessScore, '90 days');
  if (streak > 0) {
    insightLines.push(`Check-in streak: ${streak} day${streak === 1 ? '' : 's'}.`);
  }
  if (completionRate != null) {
    insightLines.push(`Daily plan completion (last 14 days): ${completionRate}%.`);
  }
  if (activity) {
    insightLines.push(
      `Today's activity: ${activity.steps.toLocaleString()} steps, ${activity.exerciseMinutes} min exercise.`
    );
  }

  return {
    userName,
    generatedAt: new Date().toISOString(),
    reportTitle,
    overallScore,
    categoryScores,
    scoreHistory,
    strengths,
    areasForImprovement,
    activityToday: activity,
    checkInStreak: streak,
    dailyPlanCompletionRate: completionRate,
    insightLines,
    disclaimer: DISCLAIMER,
  };
}
