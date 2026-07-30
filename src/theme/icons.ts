import type { WellnessCategoryKey } from '../types';

/** Consistent icon sizes — iOS-style optical weights */
export const IconSize = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
} as const;

export type IoniconName =
  | 'home-outline'
  | 'home'
  | 'fitness-outline'
  | 'fitness'
  | 'sparkles-outline'
  | 'sparkles'
  | 'stats-chart-outline'
  | 'stats-chart'
  | 'grid-outline'
  | 'grid'
  | 'body-outline'
  | 'nutrition-outline'
  | 'happy-outline'
  | 'people-outline'
  | 'people'
  | 'leaf-outline'
  | 'barbell-outline'
  | 'bar-chart-outline'
  | 'bar-chart'
  | 'moon-outline'
  | 'flower-outline'
  | 'flame-outline'
  | 'briefcase-outline'
  | 'footsteps-outline'
  | 'heart-outline'
  | 'heart'
  | 'navigate-outline'
  | 'time-outline'
  | 'refresh-outline'
  | 'chevron-forward'
  | 'chevron-back'
  | 'close'
  | 'close-circle'
  | 'medical-outline'
  | 'checkmark-circle'
  | 'flag-outline'
  | 'checkbox-outline'
  | 'trending-up'
  | 'trending-down'
  | 'git-network-outline'
  | 'pie-chart-outline'
  | 'analytics-outline'
  | 'sunny-outline'
  | 'chatbubble-ellipses-outline'
  | 'game-controller-outline'
  | 'bed-outline'
  | 'clipboard-outline'
  | 'arrow-redo-outline'
  | 'calendar-outline'
  | 'list-outline'
  | 'bulb-outline'
  | 'pulse-outline'
  | (string & {});

export const CATEGORY_IONICONS: Record<WellnessCategoryKey, IoniconName> = {
  physical: 'body-outline',
  nutrition: 'nutrition-outline',
  mental: 'happy-outline',
  social: 'people-outline',
  environment: 'leaf-outline',
  fitness: 'barbell-outline',
  sleep: 'moon-outline',
  mindfulness: 'flower-outline',
  stress: 'flame-outline',
  workLife: 'briefcase-outline',
};

export const TAB_ICONS = {
  home: { active: 'home' as IoniconName, inactive: 'home-outline' as IoniconName },
  fitness: { active: 'fitness' as IoniconName, inactive: 'fitness-outline' as IoniconName },
  insights: { active: 'sparkles' as IoniconName, inactive: 'sparkles-outline' as IoniconName },
  analytics: { active: 'stats-chart' as IoniconName, inactive: 'stats-chart-outline' as IoniconName },
  more: { active: 'grid' as IoniconName, inactive: 'grid-outline' as IoniconName },
  myCare: { active: 'heart' as IoniconName, inactive: 'heart-outline' as IoniconName },
};

export function categoryIonIcon(key: WellnessCategoryKey): IoniconName {
  return CATEGORY_IONICONS[key] ?? 'ellipse-outline';
}
