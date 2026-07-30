// src/services/ai.ts
// AI coach — local responses in development.
// To enable Cloud Functions later: install @react-native-firebase/functions,
// deploy openAIChat, and wire callFunction in this file.

import type { ChatMessage, WellnessScore, AIInsight, WellnessCategoryKey, ActivitySnapshot } from '../types';
import { generateAssessmentInsights } from './insightRecommendationService';

function mockCoachReply(messages: ChatMessage[], wellnessScore: WellnessScore | null): string {
  const last = messages[messages.length - 1]?.content.toLowerCase() ?? '';
  const score = wellnessScore?.overall?.toFixed(1) ?? '—';

  if (last.includes('sleep')) {
    return `Your sleep score is a key lever right now (overall wellness: ${score}/10). Try a consistent wind-down: no screens 30 minutes before bed, same bedtime each night, and a short breathing exercise. Small changes over 7 days usually show up in your score.`;
  }
  if (last.includes('stress') || last.includes('anx')) {
    return `For stress relief, try box breathing: inhale 4s, hold 4s, exhale 4s, hold 4s — repeat 4 rounds. Pair it with a 10-minute walk. Your mental wellness category will respond well to daily consistency rather than intensity.`;
  }
  if (last.includes('eat') || last.includes('food') || last.includes('nutrition')) {
    return `Focus on protein and fibre at each meal, and hydrate before you feel thirsty. With your current score (${score}/10), steady energy beats strict diets — aim for one more serving of vegetables at lunch and dinner this week.`;
  }
  if (last.includes('exercise') || last.includes('workout') || last.includes('fitness')) {
    return `Start where you are: 20 minutes of movement you enjoy beats an ambitious plan you skip. Check your Fitness Hub for modules matched to your lowest categories. Your overall score is ${score}/10 — consistency will move it faster than intensity.`;
  }

  return `Thanks for sharing. Based on your wellness score (${score}/10), I'd suggest picking one small habit from today's daily plan and completing it before noon. What area would you like to focus on — sleep, stress, fitness, or nutrition?`;
}

export const aiService = {
  sendMessage: async (
    messages: ChatMessage[],
    wellnessScore: WellnessScore | null
  ): Promise<string> => mockCoachReply(messages, wellnessScore),

  generateInsights: async (
    wellnessScore: WellnessScore | null,
    activity: ActivitySnapshot | null = null,
    healthAuthorized = true
  ): Promise<AIInsight[]> =>
    generateAssessmentInsights(wellnessScore, activity, healthAuthorized),

  generatePatientSummary: async (_patientId: string): Promise<string> =>
    'Patient is engaging with their daily plan. Wellness trends are stable. Recommend continuing current care plan and monitoring sleep category.',
};

export const MOCK_INSIGHTS: AIInsight[] = [
  {
    id: '1',
    title: 'Mindfulness Practice',
    type: 'Workout',
    severity: 'Medium',
    description:
      'Based on your recent activity patterns and progress data, this recommendation is tailored to improve your mental wellness score.',
    linkedCategory: 'mental' as WellnessCategoryKey,
    isComplete: false,
  },
  {
    id: '2',
    title: 'Mobility Work Integration',
    type: 'Recovery',
    severity: 'Low',
    description:
      'Based on your recent activity patterns and progress data, this recommendation is tailored to support recovery.',
    linkedCategory: 'stress' as WellnessCategoryKey,
    isComplete: false,
  },
  {
    id: '3',
    title: 'Recovery Day Planning',
    type: 'Recovery',
    severity: 'High',
    description:
      'Analysis of your performance metrics suggests this adjustment could significantly improve your recovery.',
    linkedCategory: 'fitness' as WellnessCategoryKey,
    isComplete: false,
  },
  {
    id: '4',
    title: 'Sleep Schedule Optimisation',
    type: 'Lifestyle',
    severity: 'High',
    description:
      'Your sleep score is low. Establishing a consistent sleep schedule will have the highest impact on your overall wellness.',
    linkedCategory: 'sleep' as WellnessCategoryKey,
    isComplete: false,
  },
  {
    id: '5',
    title: 'Nutrition Timing',
    type: 'Nutrition',
    severity: 'Medium',
    description:
      'Aligning meal timing with your activity schedule could boost your energy and nutrition scores.',
    linkedCategory: 'nutrition' as WellnessCategoryKey,
    isComplete: false,
  },
];
