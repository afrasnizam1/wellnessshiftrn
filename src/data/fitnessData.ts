// src/data/fitnessData.ts
import { Colors } from '../theme';
import type { FitnessModule } from '../types';
import { EXTENDED_FITNESS_MODULES } from './fitnessHubModulesExtended';
import { BATCH3_FITNESS_MODULES } from './fitnessHubModulesBatch3';
import type { FitnessDomainSection } from './fitnessExploreCategories';

// ─── Core Modules (existing) ──────────────────────────────────────────────────

const CORE_MODULES: FitnessModule[] = [
  // Mind & Body
  { id: 'breathing',          title: 'Breathing Exercises',       subtitle: 'Guided breathing techniques',                  category: 'mindBody',     icon: '🌬️',  color: Colors.fitness,    isPremium: false, wellnessCategory: 'stress' },
  { id: 'meditation',         title: 'Meditation Timer',          subtitle: 'Guided meditation & techniques',               category: 'mindBody',     icon: '🧘',  color: Colors.mindfulness, isPremium: false, wellnessCategory: 'mindfulness' },
  { id: 'mindfulness-toolkit',title: 'Mindfulness Toolkit',       subtitle: 'Stress reduction tools',                       category: 'mindBody',     icon: '🧠',  color: Colors.mental,     isPremium: false, wellnessCategory: 'mindfulness' },
  { id: 'mindfulness',        title: 'Mindfulness',               subtitle: 'Mindfulness practices',                        category: 'mindBody',     icon: '☯️',  color: Colors.mindfulness, isPremium: false, wellnessCategory: 'mindfulness' },
  { id: 'stretching',         title: 'Stretching Routines',       subtitle: 'Full-body mobility & flexibility',             category: 'mindBody',     icon: '🤸',  color: Colors.fitness,    isPremium: false, wellnessCategory: 'fitness' },
  { id: 'yoga',               title: 'Yoga & Pilates',            subtitle: 'Mind-body movement practices',                 category: 'mindBody',     icon: '🧘‍♀️',  color: Colors.mindfulness, isPremium: true,  wellnessCategory: 'mindfulness' },
  { id: 'sleep-tools',        title: 'Sleep Tools',               subtitle: 'Sleep tracking & debt calculator',             category: 'mindBody',     icon: '😴',  color: Colors.sleep,      isPremium: false, wellnessCategory: 'sleep' },

  // 3D Anatomy — native iOS USDZ holograms only
  { id: 'heart-hologram',     title: 'Beating Heart Hologram',    subtitle: 'Interactive 3D heart anatomy',                 category: 'anatomy',      icon: '❤️',  color: '#E74C3C',         isPremium: false },
  { id: 'heart-lungs-hologram', title: 'Heart & Lungs Hologram',  subtitle: 'Combined cardio-respiratory anatomy',        category: 'anatomy',      icon: '🫀',  color: '#C0392B',         isPremium: false },
  { id: 'heart-conduction-system', title: 'Heart & Bronchial Airways', subtitle: 'Heart with bronchial tree in 3D',       category: 'anatomy',      icon: '💓',  color: '#E74C3C',         isPremium: false },
  { id: 'brain-model',        title: 'Brain Hologram Tutor',      subtitle: '3D brain anatomy explorer',                   category: 'anatomy',      icon: '🧠',  color: '#9B59B6',         isPremium: false },
  { id: 'lung-model',         title: 'Lung Hologram',             subtitle: 'Respiratory system in 3D',                    category: 'anatomy',      icon: '🫁',  color: '#3498DB',         isPremium: false },
  { id: 'stomach-model',      title: 'Stomach Hologram',          subtitle: 'Digestive system anatomy',                    category: 'anatomy',      icon: '🫃',  color: '#27AE60',         isPremium: false },
  { id: 'skeleton-model',     title: 'Skeleton Hologram',         subtitle: 'Full skeletal system viewer',                  category: 'anatomy',      icon: '💀',  color: '#95A5A6',         isPremium: false },
  { id: 'muscle-model',       title: 'Ecorche Hologram',          subtitle: 'Full-body muscle anatomy study',              category: 'anatomy',      icon: '💪',  color: '#E67E22',         isPremium: false },
  { id: 'anatomy-study',      title: 'Anatomy Study Hologram',    subtitle: 'Écorché anatomy study figure',                category: 'anatomy',      icon: '🧍',  color: '#E67E22',         isPremium: false },

  // Brain Games
  { id: 'memory-match',       title: 'Memory Match',              subtitle: 'Test and improve working memory',             category: 'brainGames',   icon: '🃏',  color: Colors.primary,    isPremium: false, wellnessCategory: 'mental' },
  { id: 'reaction-time',      title: 'Reaction Time',             subtitle: 'Sharpen your reflexes',                       category: 'brainGames',   icon: '⚡',  color: '#F39C12',         isPremium: false, wellnessCategory: 'mental' },
  { id: 'pattern-recognition',title: 'Pattern Recognition',       subtitle: 'Train visual pattern detection',              category: 'brainGames',   icon: '🔷',  color: '#3498DB',         isPremium: true,  wellnessCategory: 'mental' },
  { id: 'quick-math',         title: 'Quick Math',                subtitle: 'Mental arithmetic training',                  category: 'brainGames',   icon: '🔢',  color: '#27AE60',         isPremium: false, wellnessCategory: 'mental' },
  { id: 'word-recall',        title: 'Word Recall',               subtitle: 'Improve verbal memory',                       category: 'brainGames',   icon: '💬',  color: '#9B59B6',         isPremium: true,  wellnessCategory: 'mental' },
  { id: 'number-sequence',    title: 'Number Sequence',           subtitle: 'Sequential memory challenges',                category: 'brainGames',   icon: '🔟',  color: '#E74C3C',         isPremium: true,  wellnessCategory: 'mental' },
  { id: 'color-match',        title: 'Color Match',               subtitle: 'Cognitive flexibility trainer',               category: 'brainGames',   icon: '🎨',  color: '#1ABC9C',         isPremium: false, wellnessCategory: 'mental' },
  { id: 'attention-switch',   title: 'Attention Switch',          subtitle: 'Task-switching & focus training',             category: 'brainGames',   icon: '🔄',  color: '#E67E22',         isPremium: true,  wellnessCategory: 'mental' },
  { id: 'speed-reading',      title: 'Speed Reading',             subtitle: 'Increase reading speed & comprehension',      category: 'brainGames',   icon: '📖',  color: '#2C3E50',         isPremium: true,  wellnessCategory: 'mental' },
  { id: 'focus-training',     title: 'Focus Training',            subtitle: 'Tap targets while avoiding distractions',     category: 'brainGames',   icon: '🎯',  color: '#2980B9',         isPremium: false, wellnessCategory: 'mental' },
  { id: 'visual-puzzle',      title: 'Visual Puzzle',             subtitle: 'Memorise and recreate grid patterns',       category: 'brainGames',   icon: '🧩',  color: '#8E44AD',         isPremium: true,  wellnessCategory: 'mental' },
  { id: 'mental-rotation',    title: 'Mental Rotation',           subtitle: 'Find the rotated shape match',                category: 'brainGames',   icon: '🔀',  color: '#16A085',         isPremium: true,  wellnessCategory: 'mental' },

  // Health Calculators
  { id: 'bmi',                title: 'BMI Calculator',            subtitle: 'Body mass index',                             category: 'calculators',  icon: '⚖️',  color: Colors.physical,   isPremium: false, wellnessCategory: 'physical' },
  { id: 'bmr',                title: 'BMR & TDEE',                subtitle: 'Basal metabolic rate & daily calories',       category: 'calculators',  icon: '🔥',  color: '#E74C3C',         isPremium: false, wellnessCategory: 'nutrition' },
  { id: 'macros',             title: 'Macro Calculator',          subtitle: 'Protein, carbs & fat targets',               category: 'calculators',  icon: '🥗',  color: Colors.nutrition,  isPremium: true,  wellnessCategory: 'nutrition' },
  { id: 'heart-rate-zones',   title: 'Heart Rate Zones',          subtitle: 'Train at the right intensity',               category: 'calculators',  icon: '💓',  color: '#E74C3C',         isPremium: false, wellnessCategory: 'fitness' },
  { id: 'vo2-max',            title: 'VO₂ Max Estimator',         subtitle: 'Estimate aerobic capacity',                  category: 'calculators',  icon: '🫀',  color: Colors.fitness,    isPremium: true,  wellnessCategory: 'fitness' },
  { id: 'hydration',          title: 'Hydration Calculator',      subtitle: 'Daily water intake target',                  category: 'calculators',  icon: '💧',  color: '#3498DB',         isPremium: false, wellnessCategory: 'physical' },
  { id: 'sleep-debt',         title: 'Sleep Debt Calculator',     subtitle: 'How much sleep you\'ve missed',              category: 'calculators',  icon: '😴',  color: Colors.sleep,      isPremium: false, wellnessCategory: 'sleep' },
  { id: 'one-rep-max',        title: 'One-Rep Max',               subtitle: 'Strength benchmark calculator',              category: 'calculators',  icon: '🏋️',  color: Colors.fitness,    isPremium: true,  wellnessCategory: 'fitness' },
  { id: 'intermittent-fast',  title: 'Intermittent Fasting',      subtitle: 'Fast window planning',                       category: 'calculators',  icon: '⏳',  color: '#F39C12',         isPremium: true,  wellnessCategory: 'nutrition' },
  { id: 'body-fat',           title: 'Body Fat Calculator',       subtitle: 'U.S. Navy circumference method',             category: 'calculators',  icon: '📏',  color: '#8E44AD',         isPremium: false, wellnessCategory: 'physical' },
  { id: 'protein-calculator', title: 'Protein Calculator',        subtitle: 'Daily protein based on weight & activity',   category: 'calculators',  icon: '🥩',  color: '#27AE60',         isPremium: false, wellnessCategory: 'nutrition' },
  { id: 'waist-hip',          title: 'Waist-to-Hip Ratio',        subtitle: 'Cardiovascular risk assessment',             category: 'calculators',  icon: '📐',  color: '#5B2C6F',         isPremium: false, wellnessCategory: 'physical' },

  // Health Trackers
  { id: 'steps',              title: 'Steps Tracker',             subtitle: 'Daily step count & goals',                   category: 'trackers',     icon: '👣',  color: Colors.physical,   isPremium: false, wellnessCategory: 'physical' },
  { id: 'heart-rate-tracker', title: 'Heart Rate Tracker',        subtitle: 'Monitor cardiovascular health',              category: 'trackers',     icon: '❤️',  color: '#E74C3C',         isPremium: false, wellnessCategory: 'physical' },
  { id: 'blood-pressure',     title: 'Blood Pressure Tracker',    subtitle: 'Log and trend your BP readings',             category: 'trackers',     icon: '💉',  color: '#E74C3C',         isPremium: false, wellnessCategory: 'physical' },
  { id: 'blood-glucose',      title: 'Blood Glucose Tracker',     subtitle: 'Diabetes & metabolic health tracking',       category: 'trackers',     icon: '🩸',  color: '#E74C3C',         isPremium: true,  wellnessCategory: 'physical' },
  { id: 'hydration-tracker',  title: 'Hydration Tracker',         subtitle: 'Log daily water intake',                     category: 'trackers',     icon: '💧',  color: '#3498DB',         isPremium: false, wellnessCategory: 'physical' },
  { id: 'pain-scale',         title: 'Pain Scale Tracker',        subtitle: 'Monitor and log pain levels',                category: 'trackers',     icon: '🩹',  color: '#E74C3C',         isPremium: true,  wellnessCategory: 'physical' },
  { id: 'energy-level',       title: 'Energy Level Tracker',      subtitle: 'Track daily energy patterns',                category: 'trackers',     icon: '⚡',  color: '#F39C12',         isPremium: false, wellnessCategory: 'physical' },
  { id: 'mindfulness-tracker',title: 'Mindfulness Tracker',       subtitle: 'Log meditation and mindfulness sessions',    category: 'trackers',     icon: '🧘',  color: Colors.mindfulness, isPremium: false, wellnessCategory: 'mindfulness' },

  // Workouts & Sports
  { id: 'workout-library',    title: 'Workout Library',           subtitle: 'Browse and follow guided workouts',          category: 'workouts',     icon: '🏋️',  color: Colors.fitness,    isPremium: true,  wellnessCategory: 'fitness' },
  { id: 'sports-injury',      title: 'Sports Injury Education',   subtitle: 'Prevention and recovery guidance',           category: 'workouts',     icon: '🩻',  color: '#E67E22',         isPremium: false, wellnessCategory: 'physical' },
  { id: 'senior-fitness',     title: 'Senior Fitness & Balance',  subtitle: 'Low-impact exercises for all ages',          category: 'workouts',     icon: '🧓',  color: '#27AE60',         isPremium: false, wellnessCategory: 'fitness' },
  { id: 'walking-running',    title: 'Walking & Running',         subtitle: 'Outdoor activity guidance & plans',          category: 'workouts',     icon: '🏃',  color: Colors.physical,   isPremium: false, wellnessCategory: 'fitness' },

  // Health Education (selected topics)
  { id: 'anxiety',            title: 'Anxiety',                   subtitle: 'Understanding and managing anxiety',         category: 'education',    icon: '😰',  color: Colors.mental,     isPremium: false, wellnessCategory: 'mental' },
  { id: 'depression',         title: 'Depression',                subtitle: 'Mental health support & guidance',           category: 'education',    icon: '💙',  color: Colors.mental,     isPremium: false, wellnessCategory: 'mental' },
  { id: 'stress-disorders',   title: 'Stress-Related Disorders',  subtitle: 'Burnout causing physical symptoms',          category: 'education',    icon: '🔥',  color: '#E74C3C',         isPremium: false, wellnessCategory: 'stress' },
  { id: 'insomnia',           title: 'Insomnia & Sleep Disorders', subtitle: 'Exhaustion & mental health collapse',       category: 'education',    icon: '🌙',  color: Colors.sleep,      isPremium: false, wellnessCategory: 'sleep' },
  { id: 'back-pain',          title: 'Lower Back Pain',           subtitle: 'Top GP visit reason — movement is medicine', category: 'education',    icon: '🦴',  color: '#E67E22',         isPremium: false, wellnessCategory: 'physical' },
  { id: 'neck-pain',          title: 'Neck Pain',                 subtitle: 'Nerve compression & arm weakness',           category: 'education',    icon: '🦴',  color: '#E67E22',         isPremium: false, wellnessCategory: 'physical' },
  { id: 'posture-analyzer',   title: 'Posture Analyzer',          subtitle: 'Posture assessment & correction',            category: 'education',    icon: '🧍',  color: Colors.physical,   isPremium: false, wellnessCategory: 'physical' },
  { id: 'stress-assessment',  title: 'Stress Assessment',         subtitle: 'Stress level evaluation',                    category: 'education',    icon: '📊',  color: Colors.stress,     isPremium: false, wellnessCategory: 'stress' },
  { id: 'chronic-stress',     title: 'Chronic Stress Response',   subtitle: 'Prolonged sympathetic activation management',category: 'education',    icon: '⚡',  color: Colors.stress,     isPremium: false, wellnessCategory: 'stress' },
  { id: 'high-bp',            title: 'High Blood Pressure',       subtitle: 'Understanding hypertension',                 category: 'education',    icon: '💓',  color: '#E74C3C',         isPremium: false, wellnessCategory: 'physical' },
  { id: 'diabetes',           title: 'Diabetes',                  subtitle: 'Managing blood sugar and metabolic health',  category: 'education',    icon: '🩸',  color: '#E74C3C',         isPremium: false, wellnessCategory: 'physical' },
  { id: 'smoking-cessation',  title: 'Smoking Cessation',         subtitle: 'Quitting strategies and health benefits',    category: 'education',    icon: '🚭',  color: '#27AE60',         isPremium: false, wellnessCategory: 'physical' },
  { id: 'menopause',          title: 'Menopause',                 subtitle: 'Symptoms, support and management',           category: 'education',    icon: '🌺',  color: Colors.accent,     isPremium: false, wellnessCategory: 'physical' },
  { id: 'long-covid',         title: 'Long COVID',                subtitle: 'Fatigue, brain fog and recovery',            category: 'education',    icon: '🦠',  color: '#3498DB',         isPremium: false, wellnessCategory: 'physical', exploreTags: ['Chronic Care', 'Respiratory'], domain: 'Health Education' },
];

// Merge core + extended, dedupe by id
const merged = [...CORE_MODULES];
for (const mod of [...EXTENDED_FITNESS_MODULES, ...BATCH3_FITNESS_MODULES]) {
  if (!merged.some((m) => m.id === mod.id)) merged.push(mod);
}

function enrichModuleTags(m: FitnessModule): FitnessModule {
  if (m.exploreTags?.length && m.domain) return m;
  const tags = new Set(m.exploreTags ?? []);
  const id = m.id;
  const wc = m.wellnessCategory;

  if (m.category === 'brainGames' || id.includes('brain')) tags.add('Mental Health');
  if (m.category === 'mindBody') {
    tags.add('Mindfulness');
    if (wc === 'stress') tags.add('Stress & Anxiety');
    if (wc === 'sleep') tags.add('Sleep');
  }
  if (m.category === 'anatomy') tags.add('Cardiovascular');
  if (m.category === 'calculators') tags.add('Assessments');
  if (m.category === 'trackers') tags.add('Health Tracking');
  if (m.category === 'workouts') tags.add('Sports');
  if (m.category === 'education') tags.add('Health Education');
  if (wc === 'nutrition') tags.add('Nutrition');
  if (wc === 'fitness') tags.add('Fitness');
  if (wc === 'physical') tags.add('Cardiovascular');
  if (id.includes('heart')) tags.add('Heart Health');
  if (id.includes('sleep')) tags.add('Sleep');
  if (id.includes('diabetes') || id === 'blood-glucose') tags.add('Diabetes');
  if (id.includes('hydration')) tags.add('Hydration');

  return {
    ...m,
    exploreTags: [...tags],
    domain: m.domain ?? inferDomain(m),
  };
}

export const FITNESS_MODULES: FitnessModule[] = merged.map(enrichModuleTags);

/** iOS-style recommended modules from lowest wellness categories */
export function getRecommendedModules(
  wellnessScore: { categories: Record<string, number> } | null,
  limit = 10
): FitnessModule[] {
  if (!wellnessScore) return FITNESS_MODULES.slice(0, limit);

  const sorted = Object.entries(wellnessScore.categories)
    .sort(([, a], [, b]) => a - b);
  const lowKeys = sorted.filter(([, s]) => s < 6).slice(0, 3).map(([k]) => k);
  const targetKeys = lowKeys.length > 0 ? lowKeys : sorted.slice(0, 3).map(([k]) => k);

  const relevant = FITNESS_MODULES.filter((m) =>
    m.wellnessCategory && targetKeys.includes(m.wellnessCategory)
  );
  const steps = FITNESS_MODULES.find((m) => m.id === 'steps');
  const deduped = [...new Map(relevant.map((m) => [m.id, m])).values()];
  if (steps && !deduped.find((m) => m.id === 'steps')) deduped.unshift(steps);
  return deduped.length >= 4 ? deduped.slice(0, limit) : FITNESS_MODULES.slice(0, limit);
}

export function getModulesByDomain(domain: FitnessDomainSection): FitnessModule[] {
  return FITNESS_MODULES.filter((m) => (m.domain ?? inferDomain(m)) === domain);
}

export function getModulesForExploreCategory(categoryName: string): FitnessModule[] {
  return FITNESS_MODULES.filter((m) => m.exploreTags?.includes(categoryName));
}

function inferDomain(m: FitnessModule): FitnessDomainSection {
  switch (m.category) {
    case 'trackers': return 'Health Tracking';
    case 'calculators': return 'Assessments & Analysis';
    case 'education': return 'Health Education';
    case 'brainGames':
    case 'mindBody': return 'Mental Health';
    case 'anatomy': return 'Cardiovascular';
    case 'workouts': return 'Sports';
    default: return 'Health Education';
  }
}

export const FITNESS_DOMAIN_GROUPS: { title: FitnessDomainSection; data: FitnessModule[] }[] = [
  'Activity & progress',
  'Cardiovascular',
  'Metabolic',
  'Respiratory',
  'Musculoskeletal',
  'Mental Health',
  'Digestive',
  'Sleep',
  'Weight',
  "Women's Health",
  'Pediatric',
  'Sports',
  'Immune',
  'Health Tracking',
  'Nutrition & Meal Planning',
  'Assessments & Analysis',
  'Health Education',
].map((title) => ({
  title: title as FitnessDomainSection,
  data: getModulesByDomain(title as FitnessDomainSection),
})).filter((s) => s.data.length > 0);

// ─── Sections for SectionList ─────────────────────────────────────────────────

export const FITNESS_SECTIONS = [
  {
    title: 'Mind & Body Practices',
    icon: '🧘',
    subtitle: 'Breathing, meditation, mindfulness and more',
    data: FITNESS_MODULES.filter((m) => m.category === 'mindBody'),
  },
  {
    title: '3D Anatomy & Visual Learning',
    icon: '🫀',
    subtitle: 'Interactive 3D models to understand your body',
    data: FITNESS_MODULES.filter((m) => m.category === 'anatomy'),
  },
  {
    title: 'Brain Training',
    icon: '🧠',
    subtitle: 'Games to sharpen memory, focus and cognition',
    data: FITNESS_MODULES.filter((m) => m.category === 'brainGames'),
  },
  {
    title: 'Health Calculators',
    icon: '🔢',
    subtitle: 'Tools to calculate key health metrics',
    data: FITNESS_MODULES.filter((m) => m.category === 'calculators'),
  },
  {
    title: 'Health Trackers',
    icon: '📊',
    subtitle: 'Log and monitor your health data',
    data: FITNESS_MODULES.filter((m) => m.category === 'trackers'),
  },
  {
    title: 'Workouts & Sports',
    icon: '🏋️',
    subtitle: 'Exercise plans and injury education',
    data: FITNESS_MODULES.filter((m) => m.category === 'workouts'),
  },
  {
    title: 'Health Education Library',
    icon: '📚',
    subtitle: '100+ topics covering every area of your health',
    data: FITNESS_MODULES.filter((m) => m.category === 'education'),
  },
];
