import type { ActivitySnapshot, WellnessCategoryKey, WellnessScore } from '../types';
import { wellnessService } from './firebase';
import {
  computeBodyDayMetrics,
  fitnessNudgeFromStrain,
  sleepCategoryFromMetrics,
} from './bodyMetricsService';
import { foodLogService } from './foodLogService';

function blendToward(current: number, target: number, weight: number): number {
  const w = Math.max(0, Math.min(1, weight));
  return Math.round((current * (1 - w) + target * w) * 10) / 10;
}

function clampScore(n: number) {
  return Math.max(0, Math.min(10, Math.round(n * 10) / 10));
}

/**
 * Pull Apple Health sleep/recovery/strain + food logs into wellness categories
 * so biological age (driven by wellness score) moves with lifestyle data.
 */
export async function applyLifestyleMetricsToWellnessScore(
  uid: string,
  activity: ActivitySnapshot | null,
): Promise<WellnessScore | null> {
  const latest = await wellnessService.getLatestScore(uid);
  if (!latest) return null;

  const metrics = computeBodyDayMetrics(activity);
  const nutritionSummary = await foodLogService.getTodaySummary(uid);
  const hasLifestyleSignal =
    metrics.hasHealthSleep ||
    metrics.hasActivity ||
    nutritionSummary.entries.length > 0;
  if (!hasLifestyleSignal) return latest;

  const categories = { ...latest.categories };

  const sleepTarget = sleepCategoryFromMetrics(metrics);
  if (sleepTarget != null) {
    const current = categories.sleep ?? latest.overall;
    categories.sleep = clampScore(blendToward(current, sleepTarget, 0.45));
  }

  if (nutritionSummary.entries.length > 0) {
    const current = categories.nutrition ?? latest.overall;
    categories.nutrition = clampScore(
      blendToward(current, nutritionSummary.nutritionScore, 0.5),
    );
  }

  if (metrics.hasActivity || metrics.strainScore > 0) {
    const key: WellnessCategoryKey = 'fitness';
    const current = categories[key] ?? latest.overall;
    const nudge = fitnessNudgeFromStrain(metrics.strainScore);
    const target = clampScore(current + nudge * 10);
    categories[key] = clampScore(blendToward(current, target, 0.25));
  }

  // Recovery softens stress when high; low recovery raises stress slightly.
  if (metrics.recoveryScore > 0) {
    const current = categories.stress ?? latest.overall;
    const recoveryAsCalm = metrics.recoveryScore / 10;
    const stressTarget =
      metrics.recoveryScore >= 70
        ? Math.min(10, current + 0.3)
        : metrics.recoveryScore < 40
          ? Math.max(1, current - 0.35)
          : current;
    // Higher recovery → better (higher) stress-management score in this app's model.
    const blended = blendToward(current, Math.max(stressTarget, recoveryAsCalm * 0.4 + current * 0.6), 0.2);
    categories.stress = clampScore(blended);
  }

  const values = Object.values(categories);
  const overall = Math.round((values.reduce((s, v) => s + v, 0) / values.length) * 10) / 10;

  const categoriesUnchanged = (Object.keys(categories) as WellnessCategoryKey[]).every(
    (key) => categories[key] === latest.categories[key],
  );
  if (categoriesUnchanged && overall === latest.overall) {
    return latest;
  }

  const updated: WellnessScore = {
    ...latest,
    overall,
    categories,
    date: new Date().toISOString(),
  };

  await wellnessService.saveScore(uid, updated);
  return updated;
}
