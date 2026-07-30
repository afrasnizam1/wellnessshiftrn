import { useEffect, useRef, useState } from 'react';
import type { WellnessCategoryKey, WellnessScore } from '../types';

export type ScoreChangeFeedback = {
  category: WellnessCategoryKey | 'overall';
  direction: 'up' | 'down';
  delta: number;
};

const MIN_DELTA = 0.05;

function findLargestCategoryChange(
  prev: WellnessScore,
  next: WellnessScore,
): { category: WellnessCategoryKey; delta: number } | null {
  let best: { category: WellnessCategoryKey; delta: number } | null = null;

  (Object.keys(prev.categories) as WellnessCategoryKey[]).forEach((key) => {
    const delta = next.categories[key] - prev.categories[key];
    if (Math.abs(delta) < MIN_DELTA) return;
    if (!best || Math.abs(delta) > Math.abs(best.delta)) {
      best = { category: key, delta };
    }
  });

  return best;
}

export function useWellnessScoreChangeFeedback(
  wellnessScore: WellnessScore | null,
): ScoreChangeFeedback | null {
  const prevScoreRef = useRef<WellnessScore | null>(null);
  const [feedback, setFeedback] = useState<ScoreChangeFeedback | null>(null);

  useEffect(() => {
    const prev = prevScoreRef.current;
    prevScoreRef.current = wellnessScore;

    if (!wellnessScore || !prev) return;

    const overallDelta = wellnessScore.overall - prev.overall;
    const categoryChange = findLargestCategoryChange(prev, wellnessScore);

    let nextFeedback: ScoreChangeFeedback | null = null;

    if (categoryChange && Math.abs(categoryChange.delta) >= MIN_DELTA) {
      nextFeedback = {
        category: categoryChange.category,
        direction: categoryChange.delta > 0 ? 'up' : 'down',
        delta: categoryChange.delta,
      };
    } else if (Math.abs(overallDelta) >= MIN_DELTA) {
      nextFeedback = {
        category: 'overall',
        direction: overallDelta > 0 ? 'up' : 'down',
        delta: overallDelta,
      };
    }

    if (!nextFeedback) return;

    setFeedback(nextFeedback);
    const timer = setTimeout(() => setFeedback(null), 2200);
    return () => clearTimeout(timer);
  }, [wellnessScore]);

  return feedback;
}
