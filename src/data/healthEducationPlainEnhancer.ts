import { FITNESS_MODULES } from './fitnessData';
import { HEALTH_TOPIC_ALIASES, resolveHealthTopicContent } from './healthTopicContent';
import type { RichHealthEducation, HealthEducationSection } from './healthEducationRichContent';
import type { FitnessModule } from '../types';
import type { IoniconName } from '../theme/icons';

const DEFAULT_HERO =
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=85&auto=format&fit=crop';

const CATEGORY_ICONS: Record<string, IoniconName> = {
  mental: 'heart-outline',
  stress: 'pulse-outline',
  sleep: 'moon-outline',
  physical: 'body-outline',
  nutrition: 'nutrition-outline',
  fitness: 'fitness-outline',
  mindfulness: 'leaf-outline',
};

function parseBullets(body: string) {
  return body
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^[•-]\s*/, ''));
}

function sectionFromPlain(heading: string, body: string): HealthEducationSection {
  const bullets = parseBullets(body);
  const isList = bullets.length > 1 || body.includes('•') || body.includes('\n-');

  if (isList) {
    return {
      title: heading,
      cards: bullets.map((text, i) => ({
        icon: 'checkmark-circle-outline' as IoniconName,
        title: `Point ${i + 1}`,
        body: text,
      })),
    };
  }

  return {
    title: heading,
    intro: body,
    cards: [],
  };
}

function recoverySection(wc: string): HealthEducationSection {
  const map: Record<string, HealthEducationSection> = {
    mental: {
      title: 'Recovery & daily coping',
      cards: [
        { icon: 'calendar-outline', title: 'Structure your day', body: 'Fixed wake time, one scheduled activity, and short outdoor breaks anchor mood when motivation is low.' },
        { icon: 'people-outline', title: 'Stay connected', body: 'Brief messages or calls — isolation worsens most mental health conditions.' },
        { icon: 'moon-outline', title: 'Protect sleep', body: 'Wind-down routine 60 minutes before bed. Limit alcohol — it fragments sleep and worsens mood.' },
      ],
    },
    stress: {
      title: 'Recovery practices',
      cards: [
        { icon: 'leaf-outline', title: 'Daily reset', body: '5 minutes slow breathing morning and evening resets baseline cortisol.' },
        { icon: 'walk-outline', title: 'Nature & movement', body: '20-minute walks lower stress hormones within hours.' },
        { icon: 'shield-outline', title: 'Boundaries', body: 'Block recovery time in your calendar like any medical appointment.' },
      ],
    },
    sleep: {
      title: 'Sleep recovery plan',
      cards: [
        { icon: 'alarm-outline', title: 'Fixed wake time', body: 'Same wake time 7 days a week — the single most powerful insomnia intervention.' },
        { icon: 'bed-outline', title: 'Bed association', body: 'Use bed only for sleep — leave if awake more than 20 minutes.' },
        { icon: 'phone-portrait-outline', title: 'Digital sunset', body: 'Dim lights and screens 90 minutes before target sleep time.' },
      ],
    },
    physical: {
      title: 'Recovery timeline',
      cards: [
        { icon: 'snow-outline', title: 'Acute phase', body: 'Rest from aggravating activity 48–72 hours, then reintroduce gentle movement.' },
        { icon: 'thermometer-outline', title: 'Pain monitoring', body: 'Mild discomfort during rehab that settles within 24 hours is usually acceptable.' },
        { icon: 'medical-outline', title: 'Professional guidance', body: 'Physiotherapy personalises progression — do not push through sharp or worsening pain.' },
      ],
    },
  };
  return map[wc] ?? map.physical;
}

function nutritionSection(wc: string): HealthEducationSection {
  const map: Record<string, HealthEducationSection> = {
    mental: {
      title: 'Foods that support mood',
      cards: [
        { icon: 'fish-outline', title: 'Omega-3 sources', body: 'Salmon, mackerel, sardines, walnuts, and flaxseed support brain health.' },
        { icon: 'leaf-outline', title: 'Fibre & plants', body: 'Whole grains, beans, and vegetables feed gut bacteria linked to serotonin production.' },
        { icon: 'nutrition-outline', title: 'Steady blood sugar', body: 'Protein at breakfast, limit ultra-processed snacks — glucose swings affect mood and energy.' },
      ],
    },
    stress: {
      title: 'Nutrition under stress',
      cards: [
        { icon: 'nutrition-outline', title: 'Do not skip meals', body: 'Low blood sugar amplifies cortisol and irritability. Regular balanced meals stabilise energy.' },
        { icon: 'cafe-outline', title: 'Caffeine awareness', body: 'Cap at 1–2 coffees before noon if anxiety or sleep are affected.' },
        { icon: 'water-outline', title: 'Magnesium-rich foods', body: 'Leafy greens, nuts, seeds, and dark chocolate support muscle relaxation and sleep.' },
      ],
    },
    sleep: {
      title: 'Evening nutrition',
      cards: [
        { icon: 'moon-outline', title: 'Light evening meals', body: 'Finish eating 2–3 hours before bed. Heavy meals disrupt sleep quality.' },
        { icon: 'nutrition-outline', title: 'Sleep-supporting snacks', body: 'If hungry: banana with yogurt, tart cherries, or warm milk — small portions only.' },
        { icon: 'wine-outline', title: 'Limit alcohol', body: 'Alcohol sedates then fragments sleep in the second half of the night.' },
      ],
    },
    physical: {
      title: 'Foods that support healing',
      cards: [
        { icon: 'nutrition-outline', title: 'Protein at every meal', body: 'Eggs, fish, poultry, legumes, and dairy provide amino acids for tissue repair.' },
        { icon: 'leaf-outline', title: 'Vitamin C & colour', body: 'Citrus, peppers, berries, and broccoli support collagen and immune function.' },
        { icon: 'fish-outline', title: 'Anti-inflammatory fats', body: 'Oily fish, olive oil, and nuts support a balanced healing environment.' },
      ],
    },
    nutrition: {
      title: 'Core nutrition principles',
      cards: [
        { icon: 'nutrition-outline', title: 'Whole foods first', body: 'Vegetables, lean protein, whole grains, and healthy fats at most meals.' },
        { icon: 'water-outline', title: 'Hydration', body: 'Pale yellow urine is a simple hydration target throughout the day.' },
        { icon: 'scale-outline', title: 'Portion awareness', body: 'Use the Meal Planner module to structure balanced plates for the week.' },
      ],
    },
  };
  return map[wc] ?? map.physical;
}

function exerciseSection(wc: string): HealthEducationSection {
  const map: Record<string, HealthEducationSection> = {
    mental: {
      title: 'Movement for mental health',
      cards: [
        { icon: 'walk-outline', title: 'Walking', body: '20–30 minutes brisk walking most days — as effective as some medications for mild-moderate depression.' },
        { icon: 'leaf-outline', title: 'Yoga & stretching', body: 'Gentle yoga or mobility 2–3× weekly reduces muscle tension held from stress.' },
        { icon: 'barbell-outline', title: 'Resistance training', body: '2 sessions weekly of bodyweight or band exercises improve mood and self-efficacy.' },
      ],
    },
    stress: {
      title: 'Exercises that calm the nervous system',
      cards: [
        { icon: 'leaf-outline', title: 'Breathing drills', body: 'Box breathing or 4-7-8 breath — use the Breathing Exercises module daily.' },
        { icon: 'walk-outline', title: 'Low-intensity cardio', body: 'Walking, swimming, or cycling at conversational pace — 30 minutes most days.' },
        { icon: 'body-outline', title: 'Progressive relaxation', body: 'Tense and release muscle groups head-to-toe before bed.' },
      ],
    },
    sleep: {
      title: 'Relaxation exercises',
      cards: [
        { icon: 'leaf-outline', title: 'Body scan', body: 'Use Meditation Timer — 10-minute body scan in the wind-down window.' },
        { icon: 'fitness-outline', title: 'Gentle stretching', body: 'Hip flexor and lower back stretches relieve physical tension that blocks sleep.' },
        { icon: 'moon-outline', title: 'No vigorous evening exercise', body: 'Finish intense workouts 3+ hours before bed — raises core temperature and alertness.' },
      ],
    },
    physical: {
      title: 'Rehab & strengthening exercises',
      cards: [
        { icon: 'body-outline', title: 'Mobility first', body: 'Gentle range-of-motion within pain-free limits daily.' },
        { icon: 'barbell-outline', title: 'Progressive strength', body: 'Isometrics → resistance bands → weights as pain allows. 2–3 sets of 10–15 reps.' },
        { icon: 'walk-outline', title: 'Low-impact cardio', body: 'Cycling and swimming maintain fitness while joints heal.' },
      ],
    },
    fitness: {
      title: 'Safe activity guidelines',
      cards: [
        { icon: 'walk-outline', title: 'Start low', body: '10-minute sessions and add 10% weekly volume if pain-free.' },
        { icon: 'barbell-outline', title: 'Strength base', body: 'Compound movements with good form before adding intensity.' },
        { icon: 'time-outline', title: 'Rest days', body: 'Schedule at least 1–2 full recovery days per week.' },
      ],
    },
  };
  return map[wc] ?? map.physical;
}

/** Build structured rich content from plain topic articles when no hand-authored guide exists */
export function buildEnhancedPlainRich(
  topicId: string,
  rawTopicId: string | undefined,
  title: string,
  subtitle: string | undefined,
  module?: FitnessModule,
): RichHealthEducation {
  const resolvedId = HEALTH_TOPIC_ALIASES[rawTopicId ?? ''] ?? topicId;
  const mod =
    module
    ?? FITNESS_MODULES.find((m) => m.id === resolvedId || m.id === rawTopicId || m.id === topicId);
  const content = resolveHealthTopicContent(resolvedId, title, subtitle);
  const wc = mod?.wellnessCategory ?? 'physical';
  const accent = mod?.color ?? '#389EFA';

  const plainSections = content.sections.map((s) => sectionFromPlain(s.heading, s.body));

  const sections: HealthEducationSection[] = [
    ...plainSections,
    recoverySection(wc),
    nutritionSection(wc),
    exerciseSection(wc),
  ];

  const intro =
    plainSections[0]?.intro
    ?? plainSections[0]?.cards[0]?.body
    ?? subtitle
    ?? `${title} affects daily wellbeing. Use this guide alongside advice from your healthcare team.`;

  const keyTakeaways = content.sections
    .map((s) => s.heading)
    .filter((h) => !['Related tools', 'Getting support'].includes(h))
    .slice(0, 5);

  return {
    heroImageUrl: DEFAULT_HERO,
    heroIcon: CATEGORY_ICONS[wc] ?? 'book-outline',
    accentColor: accent,
    intro,
    keyTakeaways: keyTakeaways.length >= 3 ? keyTakeaways : [
      ...keyTakeaways,
      'Recovery takes consistent daily habits',
      'Nutrition and movement support healing',
    ].slice(0, 4),
    sections,
    tips: [
      {
        title: 'Track your progress',
        body: 'Log symptoms and activity in Fitness Hub to spot patterns and share with your clinician.',
      },
    ],
    relatedModuleIds: wc === 'mental' || wc === 'stress'
      ? ['breathing', 'meditation']
      : wc === 'sleep'
        ? ['breathing', 'meditation']
        : ['breathing'],
  };
}
