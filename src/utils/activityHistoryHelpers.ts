import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import type { DailyActivityPoint } from '../types';

export const DEFAULT_ACTIVITY_GOALS = {
  steps: 8000,
  calories: 400,
  exerciseMinutes: 30,
  sleepHours: 8,
};

export const DAILY_STEP_GOAL = 5000;

export function dateKey(d: Date): string {
  return format(d, 'yyyy-MM-dd');
}

export function lastNDays(n: number): Date[] {
  const today = startOfDay(new Date());
  return Array.from({ length: n }, (_, i) => subDays(today, n - 1 - i));
}

export function buildEmptyHistory(days: number): DailyActivityPoint[] {
  return lastNDays(days).map((d) => ({
    date: dateKey(d),
    steps: 0,
    calories: 0,
    distanceKm: 0,
    exerciseMinutes: 0,
    sleepHours: 0,
  }));
}

/** Demo history when HealthKit/Health Connect has no samples */
export function buildDemoActivityHistory(
  days: number,
  today?: Partial<DailyActivityPoint>
): DailyActivityPoint[] {
  const base = today?.steps ?? 6200;
  return lastNDays(days).map((d, i) => {
    const variance = 0.7 + ((i * 17 + 3) % 10) / 20;
    const steps = Math.round(base * variance);
    return {
      date: dateKey(d),
      steps: i === days - 1 ? (today?.steps ?? steps) : steps,
      calories: Math.round(steps * 0.04),
      distanceKm: Math.round(steps * 0.00075 * 10) / 10,
      exerciseMinutes: Math.round(steps / 200),
      sleepHours: 6.5 + (i % 3) * 0.5,
    };
  });
}

export function averageMetric(
  history: DailyActivityPoint[],
  key: keyof Pick<DailyActivityPoint, 'steps' | 'calories' | 'distanceKm' | 'exerciseMinutes' | 'sleepHours'>
): number {
  if (history.length === 0) return 0;
  const sum = history.reduce((acc, d) => acc + (d[key] ?? 0), 0);
  return sum / history.length;
}

export function weekOverWeekChange(
  history: DailyActivityPoint[],
  key: keyof Pick<DailyActivityPoint, 'steps' | 'calories' | 'sleepHours'>,
  days = 7
): number | null {
  if (history.length < days * 2) return null;
  const thisWeek = history.slice(-days);
  const priorWeek = history.slice(-days * 2, -days);
  const thisAvg = averageMetric(thisWeek, key);
  const priorAvg = averageMetric(priorWeek, key);
  if (priorAvg === 0) return null;
  return ((thisAvg - priorAvg) / priorAvg) * 100;
}

export function dailyGoalsAchieved(history: DailyActivityPoint[], goal = DAILY_STEP_GOAL): number {
  return history.filter((d) => d.steps >= goal).length;
}

export function dayRangeISO(days: number): { start: string; end: string } {
  const end = endOfDay(new Date());
  const start = startOfDay(subDays(new Date(), days - 1));
  return { start: start.toISOString(), end: end.toISOString() };
}
