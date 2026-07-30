// src/services/ai.ts
// AI coach — local responses in development.
// To enable Cloud Functions later: install @react-native-firebase/functions,
// deploy openAIChat, and wire callFunction in this file.

import { WELLNESS_CATEGORIES } from '../theme';
import type {
  ActivitySnapshot,
  AIInsight,
  ChatMessage,
  WellnessCategoryKey,
  WellnessScore,
} from '../types';
import { generateAssessmentInsights } from './insightRecommendationService';

export type AnalyticsSummaryInput = {
  wellnessScore: WellnessScore | null;
  activity: ActivitySnapshot | null;
  engagement?: {
    checkInStreak: number;
    planCompletionRate: number | null;
  };
  /** Overall wellness scores over recent days (oldest → newest). */
  recentOverallTrend?: number[];
};

export type AnalyticsAiSummary = {
  headline: string;
  body: string;
  strengths: string[];
  improvements: string[];
};

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

function rankedCategories(score: WellnessScore): { key: WellnessCategoryKey; label: string; value: number }[] {
  return WELLNESS_CATEGORIES.map((c) => ({
    key: c.key as WellnessCategoryKey,
    label: c.label,
    value: score.categories[c.key as WellnessCategoryKey] ?? 0,
  })).sort((a, b) => b.value - a.value);
}

function trendSentence(recent?: number[]): string {
  if (!recent || recent.length < 2) return '';
  const first = recent[0];
  const last = recent[recent.length - 1];
  const delta = Math.round((last - first) * 10) / 10;
  if (Math.abs(delta) < 0.2) {
    return `Your overall score has stayed fairly steady across recent check-ins (around ${last.toFixed(1)}/10).`;
  }
  if (delta > 0) {
    return `Your overall score has trended up by about ${delta.toFixed(1)} points recently — momentum is on your side.`;
  }
  return `Your overall score has dipped by about ${Math.abs(delta).toFixed(1)} points recently — a good moment to protect sleep and stick to one daily habit.`;
}

function activitySentence(activity: ActivitySnapshot | null): string {
  if (!activity) {
    return 'Health data isn’t synced yet, so activity advice is limited until Apple Health or Health Connect is connected.';
  }
  const parts: string[] = [];
  if (activity.steps > 0) {
    parts.push(
      activity.steps >= 8000
        ? `${activity.steps.toLocaleString()} steps today is a strong movement day`
        : activity.steps >= 4000
          ? `${activity.steps.toLocaleString()} steps today is a solid base — a short evening walk would push you further`
          : `${activity.steps.toLocaleString()} steps today is on the low side for cardiovascular benefit`,
    );
  }
  if ((activity.sleepHours ?? 0) > 0) {
    const h = activity.sleepHours!;
    parts.push(
      h >= 7 && h <= 9
        ? `last night’s ${h}h sleep looks restorative`
        : h < 6.5
          ? `last night’s ${h}h sleep is short — recovery and mood usually suffer when this repeats`
          : `${h}h sleep is outside the typical 7–9h sweet spot`,
    );
  }
  if (activity.exerciseMinutes >= 30) {
    parts.push(`${activity.exerciseMinutes} minutes of exercise is excellent load for today`);
  } else if (activity.exerciseMinutes > 0 && activity.exerciseMinutes < 20) {
    parts.push(`${activity.exerciseMinutes} minutes of exercise is a start — aim closer to 20–30 when you can`);
  }
  if (parts.length === 0) {
    return 'Activity readings look quiet today — even a 10-minute walk would give the AI more signal to work with.';
  }
  return `${parts.join('; ')}.`;
}

function tipForCategory(key: WellnessCategoryKey): string {
  switch (key) {
    case 'sleep':
      return 'Keep a consistent bedtime and wind down without screens for 30 minutes.';
    case 'stress':
      return 'Try 4 rounds of box breathing when stress spikes, then take a short walk.';
    case 'nutrition':
      return 'Log one meal with Food Scan and prioritise protein plus vegetables.';
    case 'fitness':
    case 'physical':
      return 'Schedule one 20-minute movement block you enjoy and treat it as non-negotiable.';
    case 'mental':
    case 'mindfulness':
      return 'Use a 5-minute meditation or body scan before lunch.';
    case 'social':
      return 'Send one meaningful message or plan a short catch-up this week.';
    case 'workLife':
      return 'Protect a hard stop for work and a short transition ritual into evening.';
    case 'environment':
      return 'Get morning daylight within an hour of waking and declutter one small surface.';
    default:
      return 'Pick one small daily action in this category and track it for seven days.';
  }
}

/**
 * Build a text-length analytics summary: strengths vs improvements.
 * Local heuristic for now; same shape can be filled by a Cloud Function later.
 */
export function buildAnalyticsAiSummary(input: AnalyticsSummaryInput): AnalyticsAiSummary {
  const { wellnessScore, activity, engagement, recentOverallTrend } = input;

  if (!wellnessScore) {
    return {
      headline: 'Complete your wellness assessment first',
      body:
        'There isn’t enough scored data to summarise yet. Take the wellness assessment, sync health data, and log a few check-ins — then Summarize with AI will highlight what’s going well versus what needs work.',
      strengths: [],
      improvements: ['Take the wellness assessment to unlock category scores.'],
    };
  }

  const ranked = rankedCategories(wellnessScore);
  const strengths = ranked.filter((c) => c.value >= 6.5).slice(0, 3);
  const improvements = [...ranked].reverse().filter((c) => c.value < 6.5).slice(0, 3);
  const weakest = improvements[0] ?? ranked[ranked.length - 1];
  const strongest = strengths[0] ?? ranked[0];

  const overall = wellnessScore.overall;
  const status =
    overall >= 8 ? 'excellent shape' : overall >= 6.5 ? 'solid shape' : overall >= 5 ? 'mixed shape' : 'needs focused attention';

  const strengthLines = (strengths.length ? strengths : ranked.slice(0, 2)).map(
    (c) => `${c.label} (${c.value.toFixed(1)}/10)`,
  );
  const improveLines = (improvements.length ? improvements : ranked.slice(-2).reverse()).map(
    (c) => `${c.label} (${c.value.toFixed(1)}/10) — ${tipForCategory(c.key)}`,
  );

  const engagementBits: string[] = [];
  if (engagement) {
    if (engagement.checkInStreak > 0) {
      engagementBits.push(
        engagement.checkInStreak >= 7
          ? `a ${engagement.checkInStreak}-day check-in streak shows real consistency`
          : `your ${engagement.checkInStreak}-day check-in streak is building — keep the chain going`,
      );
    } else {
      engagementBits.push('check-ins are sparse right now — a daily mood check-in would sharpen this summary');
    }
    if (engagement.planCompletionRate != null) {
      const pct = Math.round(engagement.planCompletionRate * 100);
      engagementBits.push(
        pct >= 70
          ? `plan completion at ~${pct}% is strong`
          : `plan completion at ~${pct}% has room to grow — finish one task before noon`,
      );
    }
  }

  const paragraphs = [
    `Overall you’re in ${status} at ${overall.toFixed(1)}/10. ${trendSentence(recentOverallTrend)}`.trim(),
    `Doing well: ${strengthLines.join('; ')}. Your strongest signal is ${strongest.label} — protect the habits that got you there.`,
    `Needs improvement: ${improveLines.join(' ')}`,
    activitySentence(activity),
    engagementBits.length ? `Habits: ${engagementBits.join('; ')}.` : '',
    `Focus this week on ${weakest.label.toLowerCase()} with one concrete action: ${tipForCategory(weakest.key)} That single lever usually moves both wellness score and biological age faster than spreading effort thin.`,
  ].filter(Boolean);

  return {
    headline:
      overall >= 7
        ? 'You’re building strong foundations'
        : overall >= 5
          ? 'Balanced progress with a few clear gaps'
          : 'Priority reset: focus on your weakest categories',
    body: paragraphs.join('\n\n'),
    strengths: strengthLines,
    improvements: improveLines,
  };
}

export const aiService = {
  sendMessage: async (
    messages: ChatMessage[],
    wellnessScore: WellnessScore | null,
  ): Promise<string> => mockCoachReply(messages, wellnessScore),

  generateInsights: async (
    wellnessScore: WellnessScore | null,
    activity: ActivitySnapshot | null = null,
    healthAuthorized = true,
  ): Promise<AIInsight[]> =>
    generateAssessmentInsights(wellnessScore, activity, healthAuthorized),

  summarizeAnalytics: async (input: AnalyticsSummaryInput): Promise<AnalyticsAiSummary> => {
    await new Promise((r) => setTimeout(r, 650));
    return buildAnalyticsAiSummary(input);
  },

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
