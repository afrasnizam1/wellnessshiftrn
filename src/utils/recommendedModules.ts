import { FITNESS_MODULES } from '../data/fitnessData';
import type { FitnessModule } from '../types';

const GOAL_MODULE_IDS: Record<string, string[]> = {
  lose_weight: ['meal-planner', 'bmi', 'walking-running'],
  gain_strength: ['workout-library', 'muscle-model', 'walking-running'],
  stress_relief: ['breathing', 'meditation', 'mindfulness-toolkit'],
  better_sleep: ['sleep-tools', 'meditation', 'breathing'],
  mindfulness: ['meditation', 'mindfulness-toolkit', 'breathing'],
  improve_energy: ['walking-running', 'meal-planner', 'workout-library'],
  mental_health: ['mindfulness-toolkit', 'meditation', 'memory-match'],
  nutrition: ['meal-planner', 'bmi', 'mindfulness-toolkit'],
  sleep: ['sleep-tools', 'meditation', 'breathing'],
  stress: ['breathing', 'meditation', 'mindfulness-toolkit'],
  fitness: ['workout-library', 'walking-running', 'stretching'],
  nutrition_goal: ['meal-planner', 'bmi', 'walking-running'],
  mental: ['mindfulness-toolkit', 'meditation', 'memory-match'],
  habits: ['meditation', 'mindfulness-tracker', 'breathing'],
  condition: ['breathing', 'stretching', 'mindfulness-toolkit'],
  general: ['meditation', 'walking-running', 'sleep-tools'],
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
