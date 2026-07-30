import type { ActivitySnapshot } from '../types';

export type MetricBand = 'low' | 'moderate' | 'high' | 'optimal';

export type BodyDayMetrics = {
  recoveryScore: number;
  strainScore: number;
  sleepHours: number;
  sleepQualityLabel: string;
  recoveryBand: MetricBand;
  strainBand: MetricBand;
  recoverySummary: string;
  strainSummary: string;
  hasHealthSleep: boolean;
  hasActivity: boolean;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function bandFromScore(score: number, kind: 'recovery' | 'strain'): MetricBand {
  if (kind === 'recovery') {
    if (score >= 75) return 'optimal';
    if (score >= 55) return 'high';
    if (score >= 35) return 'moderate';
    return 'low';
  }
  if (score >= 16) return 'high';
  if (score >= 10) return 'moderate';
  if (score >= 4) return 'low';
  return 'low';
}

/**
 * Bevel-style recovery (0–100) and strain (0–21) from Apple Health / Watch snapshot.
 * Recovery prioritises overnight sleep; strain blends exercise load + steps.
 */
export function computeBodyDayMetrics(activity: ActivitySnapshot | null): BodyDayMetrics {
  const sleepHours = activity?.sleepHours ?? 0;
  const steps = activity?.steps ?? 0;
  const exerciseMinutes = activity?.exerciseMinutes ?? 0;
  const calories = activity?.calories ?? 0;
  const heartRate = activity?.heartRate;

  const hasHealthSleep = sleepHours > 0;
  const hasActivity = steps > 0 || exerciseMinutes > 0 || calories > 0;

  // Sleep contribution: peak around 7.5–8.5h
  let sleepScore = 35;
  if (hasHealthSleep) {
    const deficit = Math.abs(sleepHours - 8);
    sleepScore = clamp(100 - deficit * 18, 20, 100);
    if (sleepHours < 5) sleepScore = Math.min(sleepScore, 35);
    if (sleepHours >= 7 && sleepHours <= 9) sleepScore = Math.max(sleepScore, 78);
  }

  // Light HR penalty when resting/latest HR looks elevated (proxy without RHR baseline).
  let hrAdj = 0;
  if (heartRate != null) {
    if (heartRate > 95) hrAdj = -12;
    else if (heartRate > 85) hrAdj = -6;
    else if (heartRate > 0 && heartRate < 62) hrAdj = 4;
  }

  // Strain softens recovery when load is high without sleep.
  const loadProxy =
    exerciseMinutes * 0.9 +
    Math.min(steps, 18000) / 900 +
    Math.min(calories, 900) / 120;
  const strainScore = clamp(Math.round(loadProxy * 10) / 10, 0, 21);

  let recoveryScore = clamp(Math.round(sleepScore + hrAdj - Math.max(0, strainScore - 12) * 1.2), 5, 100);
  if (!hasHealthSleep && !hasActivity) {
    recoveryScore = 0;
  } else if (!hasHealthSleep) {
    recoveryScore = clamp(42 - Math.max(0, strainScore - 8), 15, 55);
  }

  const recoveryBand = recoveryScore === 0 ? 'low' : bandFromScore(recoveryScore, 'recovery');
  const strainBand = bandFromScore(strainScore, 'strain');

  let sleepQualityLabel = 'No sleep data';
  if (hasHealthSleep) {
    if (sleepHours >= 7 && sleepHours <= 9) sleepQualityLabel = 'Solid overnight sleep';
    else if (sleepHours < 6) sleepQualityLabel = 'Short sleep';
    else if (sleepHours > 9.5) sleepQualityLabel = 'Long sleep window';
    else sleepQualityLabel = 'Partial overnight sleep';
  }

  const recoverySummary =
    recoveryScore === 0
      ? 'Connect Apple Health / Watch to unlock recovery from sleep and load.'
      : recoveryBand === 'optimal' || recoveryBand === 'high'
        ? 'Body looks ready — keep strain productive and protect tonight’s sleep.'
        : recoveryBand === 'moderate'
          ? 'Moderate recovery — ease intensity or prioritise earlier bedtime.'
          : 'Low recovery — favour rest, hydration, and sleep tonight.';

  const strainSummary =
    strainScore < 4
      ? 'Light day — a short walk or mobility session can still help wellness.'
      : strainScore < 10
        ? 'Balanced load — good for building fitness without overreaching.'
        : strainScore < 16
          ? 'Elevated strain — pair with solid sleep for recovery tomorrow.'
          : 'High strain — schedule recovery and watch sleep quality tonight.';

  return {
    recoveryScore,
    strainScore,
    sleepHours: Math.round(sleepHours * 10) / 10,
    sleepQualityLabel,
    recoveryBand,
    strainBand,
    recoverySummary,
    strainSummary,
    hasHealthSleep,
    hasActivity,
  };
}

/** Map recovery + sleep into a 0–10 sleep category target for wellness scoring. */
export function sleepCategoryFromMetrics(metrics: BodyDayMetrics): number | null {
  if (!metrics.hasHealthSleep && metrics.recoveryScore === 0) return null;
  if (metrics.hasHealthSleep) {
    return clamp(Math.round((metrics.recoveryScore / 10) * 10) / 10, 1, 10);
  }
  return clamp(Math.round((metrics.recoveryScore / 10) * 10) / 10, 1, 6.5);
}

/** Map strain into a soft fitness nudge (0–10 scale contribution target). */
export function fitnessNudgeFromStrain(strain: number): number {
  // Sweet spot ~6–12 strain
  if (strain <= 0) return 0;
  if (strain < 4) return 0.05;
  if (strain <= 12) return 0.15;
  if (strain <= 16) return 0.08;
  return -0.05;
}
