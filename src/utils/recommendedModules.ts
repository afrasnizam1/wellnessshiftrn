import { FITNESS_MODULES } from '../data/fitnessData';
import type { FitnessModule, WellnessCategoryKey } from '../types';
import { WELLNESS_CATEGORIES } from '../theme';

const GOAL_MODULE_IDS: Record<string, string[]> = {
  lose_weight: ['meal-planner', 'high-protein-meals', 'bmi'],
  gain_weight: ['meal-planner', 'high-protein-meals', 'bmi'],
  maintain_weight: ['meal-planner', 'bmi', 'walking-running'],
  build_muscle: ['workout-library', 'high-protein-meals', 'walking-running'],
  gain_strength: ['workout-library', 'high-protein-meals', 'walking-running'],
  stress_relief: ['breathing', 'meditation', 'mindfulness-toolkit'],
  better_sleep: ['sleep-tools', 'meditation', 'breathing'],
  mindfulness: ['meditation', 'mindfulness-toolkit', 'breathing'],
  improve_energy: ['walking-running', 'meal-planner', 'workout-library'],
  mental_health: ['mindfulness-toolkit', 'meditation', 'memory-match'],
  nutrition_goal: ['high-protein-meals', 'meal-planner', 'bmi'],
  sleep: ['sleep-tools', 'meditation', 'breathing'],
  stress: ['breathing', 'meditation', 'mindfulness-toolkit'],
  fitness: ['workout-library', 'walking-running', 'stretching'],
  nutrition: ['high-protein-meals', 'meal-planner', 'bmi'],
  mental: ['mindfulness-toolkit', 'meditation', 'memory-match'],
  habits: ['meditation', 'mindfulness-tracker', 'breathing'],
  condition: ['breathing', 'stretching', 'mindfulness-toolkit'],
  clinician: ['breathing', 'mindfulness-toolkit', 'meditation'],
  general: ['meditation', 'walking-running', 'sleep-tools'],
};

const CATEGORY_MODULE_IDS: Record<string, string[]> = {
  physical: ['bmi', 'hydration', 'body-metrics'],
  nutrition: ['meal-planner', 'high-protein-meals', 'macros'],
  mental: ['memory-match', 'focus-training', 'mindfulness-toolkit'],
  social: ['walking-meditation', 'loving-kindness'],
  environment: ['walking-meditation', 'circadian-reset'],
  fitness: ['walking-running', 'workout-library', 'stretching'],
  sleep: ['sleep-tools', 'bedtime-wind-down', 'circadian-reset'],
  mindfulness: ['meditation', 'breath-anchor', 'mindfulness-toolkit'],
  stress: ['breathing', 'five-minute-calm', 'progressive-relax'],
  workLife: ['five-minute-calm', 'evening-unwind', 'breathing'],
};

const CATEGORY_WHY: Record<string, string> = {
  physical: 'Improving physical health is one of the fastest ways to lift your overall score and biological age estimate.',
  nutrition: 'Better nutrition supports energy, recovery, and your wellness score over time.',
  mental: 'Mental fitness modules help focus and mood — both feed your score and age estimate.',
  social: 'Connection and calm practices support social wellness and overall score.',
  environment: 'Light, movement outdoors, and daily rhythm all support this category.',
  fitness: 'Regular movement is a major driver of wellness score and biological age.',
  sleep: 'Sleep quality strongly affects recovery, score, and how old your body estimates.',
  mindfulness: 'Short mindfulness sessions reduce load on stress and lift your score.',
  stress: 'Lowering daily stress is one of the highest-leverage ways to improve score and age.',
  workLife: 'Short resets during the day protect energy and keep your score from stalling.',
};

export function getRecommendedModules(
  primaryGoal?: string | null,
  healthGoals: string[] = [],
): FitnessModule[] {
  const ids = new Set<string>();
  const keys = healthGoals.length > 0 ? healthGoals : primaryGoal ? [primaryGoal] : ['general'];

  keys.forEach((key) => {
    const mapped = GOAL_MODULE_IDS[key] ?? GOAL_MODULE_IDS.general;
    mapped.forEach((id) => ids.add(id));
  });

  const modules = FITNESS_MODULES.filter((m) => ids.has(m.id));
  if (modules.length >= 3) return modules.slice(0, 3);

  const fallback = FITNESS_MODULES.filter((m) => !m.isPremium).slice(0, 3);
  return [...modules, ...fallback.filter((m) => !modules.find((x) => x.id === m.id))].slice(0, 3);
}

export type ScoreImprovementAdvice = {
  categoryKey: WellnessCategoryKey;
  categoryLabel: string;
  categoryColor: string;
  score: number;
  why: string;
  modules: FitnessModule[];
};

/** Lowest quiz categories → Fitness Hub modules that can raise score / biological age. */
export function getScoreImprovementAdvice(
  scores: Record<string, number> | undefined,
  limit = 3,
): ScoreImprovementAdvice[] {
  if (!scores) return [];
  const ranked = WELLNESS_CATEGORIES
    .map((cat) => ({
      ...cat,
      score: scores[cat.key] ?? 0,
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, limit);

  const used = new Set<string>();
  return ranked.map((cat) => {
    const preferred = CATEGORY_MODULE_IDS[cat.key] ?? [];
    const fromMap = preferred
      .map((id) => FITNESS_MODULES.find((m) => m.id === id))
      .filter((m): m is FitnessModule => !!m && !used.has(m.id));
    const fromTag = FITNESS_MODULES.filter(
      (m) =>
        m.wellnessCategory === cat.key &&
        m.category !== 'anatomy' &&
        !used.has(m.id) &&
        !fromMap.some((x) => x.id === m.id),
    );
    const modules = [...fromMap, ...fromTag].slice(0, 2);
    modules.forEach((m) => used.add(m.id));
    return {
      categoryKey: cat.key as WellnessCategoryKey,
      categoryLabel: cat.label,
      categoryColor: cat.color,
      score: cat.score,
      why: CATEGORY_WHY[cat.key] ?? 'Working this area will help raise your overall wellness score.',
      modules,
    };
  });
}
