import type { IoniconName } from '../theme/icons';

export type FitnessExploreCategory = {
  id: string;
  name: string;
  icon: IoniconName;
  color: string;
};

/** 35 explore categories — matches iOS FitnessHubView.fitnessCategories */
export const FITNESS_EXPLORE_CATEGORIES: FitnessExploreCategory[] = [
  { id: 'cardiovascular', name: 'Cardiovascular', icon: 'heart', color: '#E74C3C' },
  { id: 'heart-health', name: 'Heart Health', icon: 'heart-circle', color: '#C0392B' },
  { id: 'blood-pressure', name: 'Blood Pressure', icon: 'pulse', color: '#E74C3C' },
  { id: 'metabolic', name: 'Metabolic', icon: 'flame', color: '#E67E22' },
  { id: 'diabetes', name: 'Diabetes', icon: 'water', color: '#3498DB' },
  { id: 'nutrition', name: 'Nutrition', icon: 'restaurant', color: '#27AE60' },
  { id: 'respiratory', name: 'Respiratory', icon: 'fitness', color: '#3498DB' },
  { id: 'breathing', name: 'Breathing', icon: 'cloudy', color: '#5DADE2' },
  { id: 'musculoskeletal', name: 'Musculoskeletal', icon: 'walk', color: '#E67E22' },
  { id: 'pain-management', name: 'Pain Management', icon: 'bandage', color: '#E74C3C' },
  { id: 'mobility', name: 'Mobility', icon: 'body', color: '#F39C12' },
  { id: 'mental-health', name: 'Mental Health', icon: 'happy', color: '#9B59B6' },
  { id: 'stress-anxiety', name: 'Stress & Anxiety', icon: 'pulse-outline', color: '#8E44AD' },
  { id: 'mindfulness', name: 'Mindfulness', icon: 'sparkles', color: '#946BFA' },
  { id: 'digestive', name: 'Digestive', icon: 'leaf', color: '#27AE60' },
  { id: 'sleep', name: 'Sleep', icon: 'moon', color: '#4338CA' },
  { id: 'weight', name: 'Weight', icon: 'scale', color: '#7F8C8D' },
  { id: 'fitness', name: 'Fitness', icon: 'barbell', color: '#E67E22' },
  { id: 'immune', name: 'Immune', icon: 'shield', color: '#27AE60' },
  { id: 'preventative', name: 'Preventative', icon: 'leaf', color: '#2ECC71' },
  { id: 'lifestyle', name: 'Lifestyle', icon: 'home', color: '#3498DB' },
  { id: 'womens-health', name: "Women's Health", icon: 'woman', color: '#F24D80' },
  { id: 'pregnancy', name: 'Pregnancy', icon: 'people', color: '#E91E63' },
  { id: 'menstrual', name: 'Menstrual', icon: 'calendar', color: '#EC407A' },
  { id: 'pediatric', name: 'Pediatric', icon: 'happy-outline', color: '#FF9800' },
  { id: 'sports', name: 'Sports', icon: 'football', color: '#FF5722' },
  { id: 'recovery', name: 'Recovery', icon: 'medkit', color: '#009688' },
  { id: 'hydration', name: 'Hydration', icon: 'water-outline', color: '#0891B2' },
  { id: 'energy', name: 'Energy', icon: 'flash', color: '#F39C12' },
  { id: 'healthy-aging', name: 'Healthy Aging', icon: 'hourglass', color: '#795548' },
  { id: 'chronic-care', name: 'Chronic Care', icon: 'medical', color: '#607D8B' },
  { id: 'health-tracking', name: 'Health Tracking', icon: 'analytics', color: '#389EFA' },
  { id: 'assessments', name: 'Assessments', icon: 'checkbox', color: '#946BFA' },
  { id: 'health-education', name: 'Health Education', icon: 'book', color: '#2C3E50' },
];

export function getCategoryByName(name: string): FitnessExploreCategory | undefined {
  return FITNESS_EXPLORE_CATEGORIES.find((c) => c.name === name);
}

export function countModulesInCategory(
  modules: { exploreTags?: string[] }[],
  categoryName: string
): number {
  return modules.filter((m) => m.exploreTags?.includes(categoryName)).length;
}

/** Flat domain sections — iOS Explore all list grouping */
export const FITNESS_DOMAIN_SECTIONS = [
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
] as const;

export type FitnessDomainSection = typeof FITNESS_DOMAIN_SECTIONS[number];

export function getDomainForModule(module: { domain?: FitnessDomainSection; category: string }): FitnessDomainSection {
  if (module.domain) return module.domain;
  switch (module.category) {
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
