// Assessment + activity driven insights — iOS AIInsightsRecommendationService parity (local)
import type {
  ActivitySnapshot,
  AIInsight,
  InsightSeverity,
  InsightType,
  WellnessCategoryKey,
  WellnessScore,
} from '../types';

const CATEGORY_TO_INSIGHT: Record<
  WellnessCategoryKey,
  { title: string; type: InsightType; moduleHint: string }
> = {
  physical: { title: 'Improve physical health', type: 'Lifestyle', moduleHint: 'Heart Monitoring' },
  nutrition: { title: 'Improve nutrition habits', type: 'Nutrition', moduleHint: 'Calorie Calculator' },
  mental: { title: 'Support mental wellness', type: 'Mental', moduleHint: 'Stress Assessment' },
  social: { title: 'Strengthen social connections', type: 'Lifestyle', moduleHint: 'Mindfulness' },
  environment: { title: 'Enhance your environment', type: 'Lifestyle', moduleHint: 'Steps Tracker' },
  fitness: { title: 'Increase daily activity', type: 'Workout', moduleHint: 'Steps Tracker' },
  sleep: { title: 'Improve sleep quality', type: 'Recovery', moduleHint: 'Sleep Tools' },
  mindfulness: { title: 'Practice mindfulness', type: 'Mental', moduleHint: 'Meditation Timer' },
  stress: { title: 'Manage stress levels', type: 'Mental', moduleHint: 'Breathing Exercises' },
  workLife: { title: 'Improve work-life balance', type: 'Lifestyle', moduleHint: 'Stress Assessment' },
};

const CATEGORY_RICH: Record<
  WellnessCategoryKey,
  { whyItMatters: string; steps: string[]; tip: string }
> = {
  physical: {
    whyItMatters:
      'Physical health underpins energy, immunity, and long-term disease risk. Small daily movement compounds into measurable wellness gains within 2–4 weeks.',
    steps: [
      'Aim for 30 minutes of moderate movement today (walk, stretch, or light cardio).',
      'Check resting heart rate trends in Heart Monitoring.',
      'Stand and move for 2 minutes every hour if you sit for long periods.',
    ],
    tip: 'Pair movement with hydration — even mild dehydration can reduce perceived energy by 20%.',
  },
  nutrition: {
    whyItMatters:
      'Nutrition directly affects mood, recovery, and metabolic health. Consistent meal quality often moves your score faster than restrictive dieting.',
    steps: [
      'Add one serving of vegetables or fruit to lunch and dinner.',
      'Drink a glass of water before each meal.',
      'Use the Calorie Calculator to estimate today\'s energy needs.',
    ],
    tip: 'Protein at breakfast helps stabilise blood sugar and reduces afternoon cravings.',
  },
  mental: {
    whyItMatters:
      'Mental wellness affects sleep, relationships, and motivation. Brief daily practices build resilience more reliably than occasional intensive sessions.',
    steps: [
      'Name one stressor and one thing within your control today.',
      'Take a 5-minute break without your phone mid-morning.',
      'Complete the Stress Assessment to identify your top triggers.',
    ],
    tip: 'Writing three gratitudes before bed improves sleep quality in many people within a week.',
  },
  social: {
    whyItMatters:
      'Social connection is linked to lower stress hormones and better cardiovascular outcomes. Even brief meaningful contact counts.',
    steps: [
      'Send a message to someone you haven\'t spoken to this week.',
      'Schedule one social activity in the next 7 days.',
      'Try a group mindfulness session in Fitness Hub.',
    ],
    tip: 'Quality beats quantity — one deep conversation often matters more than many surface-level chats.',
  },
  environment: {
    whyItMatters:
      'Your surroundings affect sleep, focus, and stress. Optimising light, air, and clutter can improve wellbeing without extra exercise.',
    steps: [
      'Open a window or take a 10-minute outdoor break for natural light.',
      'Reduce screen brightness 2 hours before bed.',
      'Clear one small area of your workspace or bedroom.',
    ],
    tip: 'Morning sunlight within an hour of waking helps regulate your circadian rhythm.',
  },
  fitness: {
    whyItMatters:
      'Regular movement improves mood, sleep, and cardiovascular health. Daily steps are one of the most trackable fitness habits.',
    steps: [
      'Take a 10-minute walk after a meal today.',
      'Set a step reminder for mid-afternoon.',
      'Explore a Fitness Hub module matched to your level.',
    ],
    tip: 'Walking after meals can improve blood sugar response — even 10 minutes helps.',
  },
  sleep: {
    whyItMatters:
      'Sleep is when your body repairs tissue, consolidates memory, and regulates hormones. Poor sleep often drags down mental and physical scores together.',
    steps: [
      'Set a fixed bedtime within a 30-minute window for the next 7 nights.',
      'Stop screens 30 minutes before bed; try Sleep Tools wind-down audio.',
      'Keep your room cool (16–19°C) and dark.',
    ],
    tip: 'Caffeine has a half-life of ~5 hours — cut off by early afternoon if sleep is a struggle.',
  },
  mindfulness: {
    whyItMatters:
      'Mindfulness reduces rumination and lowers perceived stress. Even 5 minutes daily can shift how you respond to challenges.',
    steps: [
      'Try a 5-minute guided meditation in the Meditation Timer.',
      'Practice box breathing: 4s in, 4s hold, 4s out, 4s hold.',
      'Notice three sensations during your next walk (sounds, air, ground).',
    ],
    tip: 'Anchor mindfulness to an existing habit — e.g. three breaths before your first sip of morning tea.',
  },
  stress: {
    whyItMatters:
      'Chronic stress elevates cortisol, impairs sleep, and reduces recovery. Active stress management protects both mental and physical scores.',
    steps: [
      'Open Breathing Exercises and complete one 4-minute session.',
      'Identify your biggest stressor and one small action to address it.',
      'Take a 15-minute walk without headphones to decompress.',
    ],
    tip: 'Progressive muscle relaxation before bed can cut time-to-sleep by several minutes.',
  },
  workLife: {
    whyItMatters:
      'Work-life imbalance often shows up as stress, poor sleep, and reduced social connection. Boundaries protect long-term burnout risk.',
    steps: [
      'Define one non-negotiable off-work hour today.',
      'Batch notifications — check messages at set times instead of constantly.',
      'Complete the Stress Assessment to see work-related patterns.',
    ],
    tip: 'A hard stop ritual (e.g. closing laptop + 5 breaths) signals your brain that work is done.',
  },
};

function severityForScore(score: number): InsightSeverity {
  if (score < 4) return 'High';
  if (score < 6) return 'Medium';
  return 'Low';
}

function formatCategoryLabel(key: WellnessCategoryKey): string {
  return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
}

function activityBasedOn(activity: ActivitySnapshot | null, healthAuthorized: boolean): string[] {
  const lines: string[] = [];
  if (!healthAuthorized) {
    lines.push('Health app not connected — activity data unavailable');
    return lines;
  }
  if (!activity) {
    lines.push('No activity snapshot for today');
    return lines;
  }
  lines.push(`${activity.steps.toLocaleString()} steps logged today`);
  if (activity.calories > 0) lines.push(`${activity.calories} active kcal burned`);
  if (activity.distanceKm > 0) lines.push(`${activity.distanceKm.toFixed(1)} km distance`);
  if (activity.exerciseMinutes > 0) lines.push(`${activity.exerciseMinutes} exercise minutes`);
  if (activity.heartRate) lines.push(`${activity.heartRate} bpm average heart rate`);
  return lines;
}

function assessmentBasedOn(
  wellnessScore: WellnessScore | null,
  category: WellnessCategoryKey,
  score?: number
): string[] {
  const lines: string[] = [];
  if (wellnessScore) {
    lines.push(`Overall wellness score: ${wellnessScore.overall.toFixed(1)}/10`);
    const catScore = score ?? wellnessScore.categories[category];
    if (catScore != null) {
      lines.push(`${formatCategoryLabel(category)} score: ${catScore.toFixed(1)}/10`);
    }
    const sorted = Object.entries(wellnessScore.categories).sort(([, a], [, b]) => a - b);
    const rank = sorted.findIndex(([k]) => k === category) + 1;
    if (rank > 0 && rank <= 3) {
      lines.push(`Among your ${rank === 1 ? 'lowest' : `top-${rank} lowest`} wellness categories`);
    }
  } else {
    lines.push('Complete your wellness assessment for personalised scores');
  }
  return lines;
}

function healthAwareDescription(
  base: string,
  category: WellnessCategoryKey,
  activity: ActivitySnapshot | null
): string {
  if (!activity) return base;
  const parts = [base];
  if (category === 'fitness' || category === 'physical') {
    if (activity.steps < 4000) parts.push(`You've logged ${activity.steps.toLocaleString()} steps today — a short walk could help.`);
    else if (activity.steps >= 8000) parts.push(`Great activity today (${activity.steps.toLocaleString()} steps) — keep the momentum.`);
  }
  if (category === 'sleep' && activity.exerciseMinutes > 45) {
    parts.push('Prioritise wind-down tonight after higher activity.');
  }
  if (category === 'nutrition' && activity.calories > 400) {
    parts.push(`You've burned ~${activity.calories} active kcal — refuel with protein and fibre.`);
  }
  return parts.join(' ');
}

function buildAssessmentInsight(
  cat: WellnessCategoryKey,
  score: number,
  index: number,
  wellnessScore: WellnessScore,
  activity: ActivitySnapshot | null
): AIInsight {
  const meta = CATEGORY_TO_INSIGHT[cat];
  const rich = CATEGORY_RICH[cat];
  const target = Math.min(10, score + 1.5);
  const gap = (target - score).toFixed(1);

  return {
    id: `assess-${cat}-${index}`,
    title: meta.title,
    type: meta.type,
    severity: severityForScore(score),
    description: healthAwareDescription(
      `Your ${formatCategoryLabel(cat).toLowerCase()} score is ${score.toFixed(1)}/10. Try ${meta.moduleHint} in Fitness Hub.`,
      cat,
      activity
    ),
    summary: `Closing a ${gap}-point gap toward ${target.toFixed(1)}/10 could lift your overall wellness.`,
    whyItMatters: rich.whyItMatters,
    actionSteps: rich.steps,
    basedOn: [
      ...assessmentBasedOn(wellnessScore, cat, score),
      ...activityBasedOn(activity, true).slice(0, 3),
    ],
    tip: rich.tip,
    categoryScore: score,
    targetScore: target,
    linkedCategory: cat,
    linkedModule: meta.moduleHint,
    isComplete: false,
  };
}

function dailyActivityInsights(
  activity: ActivitySnapshot | null,
  authorized: boolean,
  wellnessScore: WellnessScore | null
): AIInsight[] {
  const items: AIInsight[] = [];
  const basedOnActivity = activityBasedOn(activity, authorized);
  const basedOnBoth = [
    ...basedOnActivity,
    ...assessmentBasedOn(wellnessScore, 'fitness'),
  ];

  if (!authorized) {
    items.push({
      id: 'connect-health',
      title: 'Connect Apple Health / Health Connect',
      type: 'Lifestyle',
      severity: 'Medium',
      description: 'Link your health app to unlock activity-based recommendations and richer analytics.',
      summary: 'Activity insights need permission to read steps, heart rate, and workouts.',
      whyItMatters:
        'Without health data, recommendations stay generic. Connected data lets us tailor insights to your real movement, sleep patterns, and recovery.',
      actionSteps: [
        'Open Health Permissions from Home or More.',
        'Allow read access to steps, heart rate, and workouts.',
        'Return here and pull to refresh.',
      ],
      basedOn: ['Health app not connected', ...(wellnessScore ? [`Wellness score: ${wellnessScore.overall.toFixed(1)}/10`] : [])],
      tip: 'On iPhone, data syncs automatically once permissions are granted — no manual entry needed.',
      linkedCategory: 'fitness',
      linkedModule: 'Steps Tracker',
      isComplete: false,
    });
    return items;
  }

  const steps = activity?.steps ?? 0;
  if (steps === 0) {
    items.push({
      id: 'sync-activity',
      title: "Sync today's activity",
      type: 'Workout',
      severity: 'Low',
      description: 'No steps recorded yet today. Open Activity Dashboard or pull to refresh on Home.',
      summary: 'Your step count is at zero — data may not have synced yet.',
      whyItMatters:
        'Accurate daily activity helps us calibrate workout and recovery recommendations. A quick sync ensures insights reflect your real day.',
      actionSteps: [
        'Pull to refresh on the Home screen activity bar.',
        'Open Activity Dashboard for a full breakdown.',
        'Take a short walk — movement often triggers a sync on wearables.',
      ],
      basedOn: basedOnBoth,
      tip: 'If you use Apple Watch, open the Fitness app once to force a sync.',
      linkedCategory: 'fitness',
      linkedModule: 'Track your progress',
      isComplete: false,
    });
  } else if (steps < 4000) {
    items.push({
      id: 'move-more',
      title: 'Add a 10-minute walk',
      type: 'Workout',
      severity: 'Medium',
      description: `You're at ${steps.toLocaleString()} steps — a brisk 10-minute walk could add ~1,000 steps and boost energy.`,
      summary: `${steps.toLocaleString()} steps — below the 4,000 "active day" threshold.`,
      whyItMatters:
        'Light movement improves circulation, mood, and sleep quality. Even 10 minutes breaks sedentary streaks linked to higher stress scores.',
      actionSteps: [
        'Walk for 10 minutes after your next meal.',
        'Take phone calls while walking if possible.',
        'Set a mid-afternoon step reminder.',
      ],
      basedOn: basedOnBoth,
      tip: 'Walking right after eating can improve blood sugar — aim for within 30 minutes of a meal.',
      linkedCategory: 'fitness',
      linkedModule: 'Walking & Running',
      isComplete: false,
    });
  } else if (steps < 8000) {
    items.push({
      id: 'approach-goal',
      title: 'Approaching daily step goal',
      type: 'Workout',
      severity: 'Low',
      description: `${steps.toLocaleString()} steps so far — you're on track. One more short walk hits 8,000.`,
      summary: `${steps.toLocaleString()}/8,000 steps — ${(8000 - steps).toLocaleString()} to go.`,
      whyItMatters:
        '8,000 steps is associated with meaningful cardiovascular and mood benefits. You\'re close — a small push completes a strong movement day.',
      actionSteps: [
        `Add ${Math.max(500, 8000 - steps).toLocaleString()} more steps with an evening walk.`,
        'Take the stairs instead of the lift for the rest of the day.',
        'Review weekly trends in Analytics.',
      ],
      basedOn: basedOnBoth,
      tip: 'Split remaining steps into two 5-minute walks — easier than one long session.',
      linkedCategory: 'fitness',
      isComplete: false,
    });
  } else {
    items.push({
      id: 'step-streak',
      title: 'Strong step count today',
      type: 'Workout',
      severity: 'Low',
      description: `${steps.toLocaleString()} steps logged — excellent daily movement. Focus on recovery and hydration.`,
      summary: `${steps.toLocaleString()} steps — above the 8,000 daily target.`,
      whyItMatters:
        'High activity days need matching recovery. Hydration, protein, and sleep protect gains and prevent next-day fatigue.',
      actionSteps: [
        'Drink an extra glass of water this evening.',
        'Include protein within 2 hours of your most active period.',
        'Try light stretching or Sleep Tools before bed.',
      ],
      basedOn: basedOnBoth,
      tip: 'On high-step days, magnesium-rich foods (nuts, leafy greens) may support muscle recovery.',
      linkedCategory: 'fitness',
      isComplete: false,
    });
  }

  if ((activity?.calories ?? 0) >= 250) {
    items.push({
      id: 'refuel',
      title: 'Refuel after activity',
      type: 'Nutrition',
      severity: 'Low',
      description: 'Higher active energy today — include protein and complex carbs within 2 hours.',
      summary: `${activity!.calories} active kcal burned — time to refuel smartly.`,
      whyItMatters:
        'Post-activity nutrition supports muscle repair and stable energy. Skipping refuel can lead to evening crashes and poor sleep.',
      actionSteps: [
        'Eat a balanced meal with protein + complex carbs within 2 hours.',
        'Hydrate with water or electrolytes if you sweated heavily.',
        'Log intake in the Calorie Calculator for awareness.',
      ],
      basedOn: [
        `${activity!.calories} active kcal burned today`,
        `${steps.toLocaleString()} steps`,
        ...assessmentBasedOn(wellnessScore, 'nutrition').slice(0, 2),
      ],
      tip: 'A 3:1 carb-to-protein ratio within 30–60 minutes post-workout aids recovery for most people.',
      linkedCategory: 'nutrition',
      isComplete: false,
    });
  }

  return items;
}

const DEFAULT_INSIGHTS: AIInsight[] = [
  {
    id: 'default-steps',
    title: 'Build a daily walking habit',
    type: 'Workout',
    severity: 'Medium',
    description: 'Aim for 8,000 steps daily. Start with a 10-minute walk after lunch.',
    summary: 'Daily walking is the highest-impact habit for beginners.',
    whyItMatters: CATEGORY_RICH.fitness.whyItMatters,
    actionSteps: CATEGORY_RICH.fitness.steps,
    basedOn: ['No wellness assessment yet — using general guidance'],
    tip: CATEGORY_RICH.fitness.tip,
    linkedCategory: 'fitness',
    isComplete: false,
  },
  {
    id: 'default-sleep',
    title: 'Protect your sleep window',
    type: 'Recovery',
    severity: 'High',
    description: 'Consistent bed and wake times are the highest-impact sleep habit.',
    summary: 'Sleep regularity beats sleep duration for many people.',
    whyItMatters: CATEGORY_RICH.sleep.whyItMatters,
    actionSteps: CATEGORY_RICH.sleep.steps,
    basedOn: ['No wellness assessment yet — using general guidance'],
    tip: CATEGORY_RICH.sleep.tip,
    linkedCategory: 'sleep',
    isComplete: false,
  },
  {
    id: 'default-hydration',
    title: 'Hydrate before you feel thirsty',
    type: 'Nutrition',
    severity: 'Low',
    description: 'Use the Hydration Calculator in Fitness Hub for a personalised target.',
    summary: 'Mild dehydration affects energy and focus before you notice thirst.',
    whyItMatters: CATEGORY_RICH.nutrition.whyItMatters,
    actionSteps: [
      'Drink a glass of water upon waking.',
      'Use the Hydration Calculator for your daily target.',
      'Keep a bottle visible at your desk.',
    ],
    basedOn: ['No wellness assessment yet — using general guidance'],
    tip: 'Urine pale yellow is a simple hydration check — dark yellow often means drink more.',
    linkedCategory: 'nutrition',
    linkedModule: 'Hydration Calculator',
    isComplete: false,
  },
];

function daySeed(): number {
  const now = new Date();
  return now.getFullYear() * 1000 + now.getMonth() * 50 + now.getDate();
}

function shuffleWithSeed<T>(arr: T[], seed: number): T[] {
  const out = [...arr];
  let s = seed;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function getInsightsPersonalizationNote(wellnessScore: WellnessScore | null): string {
  if (!wellnessScore) {
    return 'Complete your wellness assessment to unlock personalised insights based on your lowest-scoring categories.';
  }
  const low = Object.entries(wellnessScore.categories)
    .sort(([, a], [, b]) => a - b)
    .slice(0, 3)
    .map(([k, v]) => `${formatCategoryLabel(k as WellnessCategoryKey)} (${v.toFixed(1)})`)
    .join(', ');
  return `Personalised from your assessment — prioritising: ${low}. Refreshes daily with today's activity.`;
}

export function generateAssessmentInsights(
  wellnessScore: WellnessScore | null,
  activity: ActivitySnapshot | null,
  healthAuthorized: boolean
): AIInsight[] {
  const activityCards = dailyActivityInsights(activity, healthAuthorized, wellnessScore);
  let assessmentCards: AIInsight[] = [];

  if (wellnessScore) {
    const lowScores = Object.entries(wellnessScore.categories)
      .filter(([, score]) => score < 7)
      .sort(([, a], [, b]) => a - b)
      .slice(0, 3);

    const targets = lowScores.length > 0
      ? lowScores
      : Object.entries(wellnessScore.categories).sort(([, a], [, b]) => a - b).slice(0, 3);

    assessmentCards = targets.map(([key, score], i) =>
      buildAssessmentInsight(key as WellnessCategoryKey, score, i, wellnessScore, activity)
    );

    const mindfulnessRich = CATEGORY_RICH.mindfulness;
    assessmentCards.push({
      id: 'mindfulness-daily',
      title: 'Take 5 minutes to breathe',
      type: 'Mental',
      severity: 'Low',
      description: 'Brief mindfulness reduces cortisol and improves focus — open Breathing Exercises.',
      summary: '5 minutes of breathing can lower stress within one session.',
      whyItMatters: mindfulnessRich.whyItMatters,
      actionSteps: mindfulnessRich.steps,
      basedOn: [
        ...assessmentBasedOn(wellnessScore, 'mindfulness'),
        ...activityBasedOn(activity, healthAuthorized).slice(0, 2),
      ],
      tip: mindfulnessRich.tip,
      categoryScore: wellnessScore.categories.mindfulness,
      targetScore: Math.min(10, wellnessScore.categories.mindfulness + 1),
      linkedCategory: 'mindfulness',
      linkedModule: 'Breathing Exercises',
      isComplete: false,
    });
  } else {
    assessmentCards = DEFAULT_INSIGHTS;
  }

  const combined = shuffleWithSeed(
    [...activityCards, ...assessmentCards],
    daySeed() * 31 + (wellnessScore?.overall ?? 5) * 10
  );

  return combined.slice(0, 14);
}

/** Rotate display set like iOS (max 6 visible) */
export function getRotatedInsights(all: AIInsight[], max = 6): AIInsight[] {
  if (all.length <= max) return all;
  const seed = daySeed();
  const offset = seed % all.length;
  return [...all.slice(offset), ...all.slice(0, offset)].slice(0, max);
}
