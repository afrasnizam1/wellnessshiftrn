import {
  WELLNESS_ASSESSMENT_QUESTIONS,
  type AssessmentQuestion,
} from '../data/wellnessAssessmentQuestions';
import type { WellnessCategoryKey } from '../types';

const GOAL_TO_CATEGORIES: Record<string, WellnessCategoryKey[]> = {
  sleep: ['sleep'],
  stress: ['stress', 'mindfulness'],
  fitness: ['fitness', 'physical'],
  lose_weight: ['nutrition', 'fitness', 'physical'],
  gain_weight: ['nutrition', 'fitness', 'physical'],
  maintain_weight: ['nutrition', 'fitness'],
  build_muscle: ['fitness', 'physical', 'nutrition'],
  nutrition: ['nutrition'],
  mental: ['mental'],
  habits: ['mindfulness', 'stress'],
  condition: ['physical'],
  clinician: ['physical'],
  general: ['physical', 'mental', 'sleep', 'nutrition', 'fitness'],
};

/**
 * Optional legacy helper — builds a short goal-tailored question subset.
 * Main onboarding uses `ONBOARDING_ASSESSMENT_QUESTIONS` (10 = 1 per category).
 */
export function getMiniAssessmentQuestions(
  goals: string[],
  primaryGoal?: string | null,
): AssessmentQuestion[] {
  const seedGoals = goals.length > 0 ? goals : primaryGoal ? [primaryGoal] : ['general'];
  const categories = new Set<WellnessCategoryKey>();

  seedGoals.forEach((goal) => {
    (GOAL_TO_CATEGORIES[goal] ?? GOAL_TO_CATEGORIES.general).forEach((cat) => categories.add(cat));
  });

  if (categories.size < 4) {
    GOAL_TO_CATEGORIES.general.forEach((cat) => categories.add(cat));
  }

  const picked: AssessmentQuestion[] = [];
  categories.forEach((category) => {
    const question = WELLNESS_ASSESSMENT_QUESTIONS.find((q) => q.category === category);
    if (question) picked.push(question);
  });

  return picked.slice(0, 6);
}
