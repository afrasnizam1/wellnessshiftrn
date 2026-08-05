import { WELLNESS_ASSESSMENT_QUESTIONS } from '../data/wellnessAssessmentQuestions';
import { WELLNESS_CATEGORIES } from '../theme';
import type { WellnessCategoryKey } from '../types';
import type { AssessmentAnswerMap } from './wellnessAssessmentScoring';

export function getCategoryQuizBreakdown(
  category: WellnessCategoryKey,
  answers: AssessmentAnswerMap | null,
) {
  const questions = WELLNESS_ASSESSMENT_QUESTIONS.filter((q) => q.category === category);
  return questions
    .filter((question) => answers?.[question.id] != null)
    .map((question) => {
      const score = answers?.[question.id];
      const option = question.options.find((o) => o.score === score);
      return {
        questionId: question.id,
        question: question.question,
        score: score ?? null,
        answerText: option?.text ?? 'Not answered',
        description: option?.description,
      };
    });
}

export function getCategoryScoreSummary(scores: Record<string, number> | undefined) {
  return WELLNESS_CATEGORIES
    .map((cat) => ({
      ...cat,
      score: scores?.[cat.key as WellnessCategoryKey] ?? 0,
    }))
    .sort((a, b) => b.score - a.score);
}

export function categoryInsight(score: number): string {
  if (score >= 8) return 'This is a strength — keep building on your current habits.';
  if (score >= 6) return 'You are doing okay here — small consistent improvements will help.';
  if (score >= 4) return 'There is room to grow — your daily plan will focus here.';
  return 'This is a priority focus area — start with one simple habit this week.';
}
