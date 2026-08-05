import { WELLNESS_ASSESSMENT_QUESTIONS } from '../data/wellnessAssessmentQuestions';
import type { WellnessCategoryKey, WellnessCategoryScores, WellnessScore } from '../types';

export type AssessmentAnswerMap = Record<string, number>;

/** Quiz answers are 1–5; wellness scores across the app remain on a 0–10 scale. */
export function quizAnswerToWellnessScore(answer: number): number {
  return answer * 2;
}

/** Average scores per category from answered questions (1+ per category is enough). */
export function computeWellnessScoreFromAnswers(answers: AssessmentAnswerMap): WellnessScore {
  const categoryTotals: Partial<Record<WellnessCategoryKey, number>> = {};
  const categoryCounts: Partial<Record<WellnessCategoryKey, number>> = {};

  for (const question of WELLNESS_ASSESSMENT_QUESTIONS) {
    const score = answers[question.id];
    if (score == null) continue;
    categoryTotals[question.category] =
      (categoryTotals[question.category] ?? 0) + quizAnswerToWellnessScore(score);
    categoryCounts[question.category] = (categoryCounts[question.category] ?? 0) + 1;
  }

  const categories = {} as WellnessCategoryScores;
  (Object.keys(categoryTotals) as WellnessCategoryKey[]).forEach((key) => {
    const count = categoryCounts[key] ?? 1;
    categories[key] = Math.round(((categoryTotals[key] ?? 0) / count) * 10) / 10;
  });

  // Ensure all 10 categories exist (fallback 0)
  const ALL_KEYS: WellnessCategoryKey[] = [
    'physical', 'nutrition', 'mental', 'social', 'environment',
    'fitness', 'sleep', 'mindfulness', 'stress', 'workLife',
  ];
  ALL_KEYS.forEach((k) => {
    if (categories[k] == null) categories[k] = categoryCounts[k] ? 0 : 5;
  });

  const values = Object.values(categories);
  const answeredCount = Object.keys(categoryCounts).length;
  const overall = answeredCount > 0 && answeredCount < ALL_KEYS.length
    ? Math.round(
        (ALL_KEYS.filter((k) => categoryCounts[k])
          .reduce((sum, k) => sum + (categories[k] ?? 0), 0) / answeredCount) * 10,
      ) / 10
    : Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;

  return {
    overall,
    categories,
    date: new Date().toISOString(),
  };
}
