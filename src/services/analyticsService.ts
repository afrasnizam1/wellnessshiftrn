import { format } from 'date-fns';
import { wellnessService, planService } from './firebase';
import { healthKitService } from './healthkit';
import { checkInService } from './checkInService';
import { mockWellnessHistory } from '../utils/mockWellnessHistory';
import { WELLNESS_CATEGORIES } from '../theme';
import type { ActivitySnapshot, WellnessCategoryKey, WellnessScore } from '../types';

export interface EngagementStats {
  checkInStreak: number;
  planCompletionRate: number | null;
  checkInDates: string[];
}

export interface ProgressHistoryResult {
  history: WellnessScore[];
  isDemoData: boolean;
}

export async function getProgressHistory(
  uid: string | undefined,
  days: number,
  fallbackScore: WellnessScore | null
): Promise<ProgressHistoryResult> {
  if (!uid) {
    return { history: mockWellnessHistory(days), isDemoData: true };
  }

  try {
    const real = await wellnessService.getScoreHistory(uid, days);
    if (real.length >= 2) {
      return { history: [...real].reverse(), isDemoData: false };
    }
    if (real.length === 1) {
      return { history: [...real].reverse(), isDemoData: false };
    }
    if (fallbackScore) {
      return { history: [fallbackScore], isDemoData: false };
    }
    return { history: mockWellnessHistory(days), isDemoData: true };
  } catch {
    if (fallbackScore) {
      return { history: [fallbackScore], isDemoData: false };
    }
    return { history: mockWellnessHistory(days), isDemoData: true };
  }
}

export async function getDashboardTrend(uid: string | undefined, days: number) {
  if (!uid) return [];
  const history = await wellnessService.getScoreHistory(uid, days);
  return [...history].reverse();
}

export function buildCategoryTrendSeries(
  history: WellnessScore[],
  keys: WellnessCategoryKey[]
): { key: WellnessCategoryKey; label: string; data: { value: number }[] }[] {
  return keys.map((key) => {
    const cat = WELLNESS_CATEGORIES.find((c) => c.key === key);
    return {
      key,
      label: cat?.label.split(' ')[0] ?? key,
      data: history.map((h) => ({
        value: h.categories[key] ?? 0,
      })),
    };
  });
}

export function buildInsightLines(
  history: WellnessScore[],
  wellnessScore: WellnessScore | null,
  periodLabel: string
): string[] {
  const scores = history.length > 0 ? history : wellnessScore ? [wellnessScore] : [];
  if (scores.length === 0) {
    return ['Complete your wellness assessment to unlock personalised insights.'];
  }

  const first = scores[0].overall;
  const last = scores[scores.length - 1].overall;
  const change = last - first;

  const catScores = WELLNESS_CATEGORIES.map((cat) => ({
    label: cat.label,
    score: wellnessScore?.categories[cat.key as WellnessCategoryKey] ?? scores[scores.length - 1].categories[cat.key as WellnessCategoryKey] ?? 0,
  }));
  const best = [...catScores].sort((a, b) => b.score - a.score)[0];
  const worst = [...catScores].sort((a, b) => a.score - b.score)[0];

  const lines: string[] = [];
  if (change > 0.1) {
    lines.push(`Your wellness score improved by ${change.toFixed(1)} points over the past ${periodLabel.toLowerCase()}.`);
  } else if (change < -0.1) {
    lines.push(`Your score dipped by ${Math.abs(change).toFixed(1)} points — focus on daily plan tasks to recover.`);
  } else {
    lines.push('Your score has been steady — small daily wins will move the needle.');
  }
  if (worst) {
    lines.push(`${worst.label} is your biggest opportunity for improvement.`);
  }
  if (best) {
    lines.push(`${best.label} is your strongest category — keep building on it.`);
  }
  return lines;
}

export async function getActivityForDashboard(): Promise<ActivitySnapshot | null> {
  try {
    const available = await healthKitService.isAvailable();
    if (!available) return null;
    return await healthKitService.getTodayActivity();
  } catch {
    return null;
  }
}

export async function getDailyPlanCompletionRate(uid: string, days = 7): Promise<number | null> {
  try {
    let completed = 0;
    let total = 0;
    const today = new Date();

    for (let i = 0; i < days; i += 1) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateKey = format(d, 'yyyy-MM-dd');
      const plan = await planService.getDailyPlan(uid, dateKey);
      if (!plan) continue;
      total += plan.tasks.length;
      completed += plan.tasks.filter((t) => t.status === 'complete').length;
    }

    if (total === 0) return null;
    return Math.round((completed / total) * 100);
  } catch {
    return null;
  }
}

export async function getEngagementStats(uid: string | undefined): Promise<EngagementStats> {
  if (!uid) {
    return { checkInStreak: 0, planCompletionRate: null, checkInDates: [] };
  }
  const [checkInStreak, planCompletionRate, checkInDates] = await Promise.all([
    checkInService.getCheckInStreak(uid).catch(() => 0),
    getDailyPlanCompletionRate(uid, 14),
    checkInService.getRecentCheckInDates(uid, 28).catch(() => [] as string[]),
  ]);
  return { checkInStreak, planCompletionRate, checkInDates };
}

export function buildCategoryHistorySeries(
  history: WellnessScore[],
  key: WellnessCategoryKey,
): { value: number; label: string }[] {
  return history.map((h, i) => ({
    value: h.categories[key] ?? 0,
    label: format(new Date(h.date), history.length <= 7 ? 'EEE' : i % 5 === 0 ? 'd' : ''),
  }));
}
