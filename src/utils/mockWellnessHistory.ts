import { WELLNESS_CATEGORIES } from '../theme';
import type { WellnessScore } from '../types';

/** Deterministic demo trend (no random) for offline / sparse-data states */
export function mockWellnessHistory(days: number): WellnessScore[] {
  return Array.from({ length: days }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (days - 1 - i));
    const base = 3.0 + (i / Math.max(days, 1)) * 2;
    return {
      date: d.toISOString(),
      overall: parseFloat((base + Math.sin(i * 0.4) * 0.2).toFixed(1)),
      categories: Object.fromEntries(
        WELLNESS_CATEGORIES.map((c, ci) => [
          c.key,
          parseFloat((base + (ci % 3) * 0.3).toFixed(1)),
        ])
      ) as WellnessScore['categories'],
    };
  });
}
