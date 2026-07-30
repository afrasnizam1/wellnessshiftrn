// src/theme/index.ts — aligned with native iOS DesignSystem.swift

export const Colors = {
  // iOS system blues (tabs, links)
  primary: '#007AFF',
  primaryLight: 'rgba(0, 122, 255, 0.12)',
  primaryDark: '#0055CC',

  // Brand pink (CTAs, auth, marketing)
  brand: '#F24D80',
  brandLight: '#FF6699',
  brandDark: '#D93A6A',
  brandSubtle: 'rgba(242, 77, 128, 0.08)',
  brandMuted: 'rgba(242, 77, 128, 0.18)',
  accent: '#F24D80',
  accentLight: '#FF85A1',

  // Legacy purple — secondary brand accents
  purple: '#8C59BF',
  purpleLight: '#A878D4',
  primaryBg: '#F3EEFF',

  // Wellness category colours (orbit rings — native WellnessOrbitRingView)
  physical: '#389EFA',
  nutrition: '#2EDBBD',
  mental: '#946BFA',
  social: '#FF8561',
  environment: '#2EDBBD',
  fitness: '#389EFA',
  sleep: '#946BFA',
  mindfulness: '#2EDBBD',
  stress: '#FA5C94',
  workLife: '#FF8561',

  // iOS grouped UI — slightly cooler modern tint
  background: '#F0F2F8',
  backgroundAlt: '#E8ECF4',
  backgroundSecondary: '#F5F6FA',
  surface: '#FFFFFF',
  surfaceSecondary: '#F5F6FA',
  surfaceElevated: '#FFFFFF',
  border: '#E2E4EC',
  borderLight: 'rgba(60, 60, 67, 0.10)',

  // Glass / frosted overlays
  glass: 'rgba(255, 255, 255, 0.72)',
  glassBorder: 'rgba(255, 255, 255, 0.85)',
  glassDark: 'rgba(255, 255, 255, 0.55)',

  // Text (iOS label colors)
  text: '#1C1C1E',
  textSecondary: '#6C6C70',
  textTertiary: '#AEAEB2',
  textInverse: '#FFFFFF',

  // Tab bar
  tabActive: '#007AFF',
  tabInactive: '#8E8E93',

  // Status
  success: '#34C759',
  successLight: 'rgba(52, 199, 89, 0.12)',
  warning: '#FF9500',
  warningLight: 'rgba(255, 149, 0, 0.12)',
  error: '#FF3B30',
  errorLight: 'rgba(255, 59, 48, 0.10)',
  info: '#007AFF',

  severityLow: '#34C759',
  severityMedium: '#FF9500',
  severityHigh: '#FF3B30',

  black: '#000000',
  white: '#FFFFFF',
  transparent: 'transparent',
  overlay: 'rgba(0,0,0,0.45)',
};

export const Gradients = {
  brand: ['#F24D80', '#FF6699'] as const,
  brandDeep: ['#D93A6A', '#F24D80', '#FF6699'] as const,
  purple: ['#8C59BF', '#994DB3'] as const,
  hero: ['#F24D80', '#FF6699', '#FF8561'] as const,
  mesh: ['#F0F2F8', '#EDE8FF', '#FFF0F5'] as const,
  primary: ['#007AFF', '#0055CC'] as const,
  success: ['#34C759', '#2EDBBD'] as const,
  sunset: ['#FF8561', '#F24D80', '#946BFA'] as const,
};

export const Typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
  },
  size: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 22,
    '2xl': 28,
    '3xl': 34,
    '4xl': 40,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.45,
    relaxed: 1.6,
  },
};

export const Spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  pill: 100,
  full: 999,
};

export const Shadow = {
  sm: {
    shadowColor: '#1C1C1E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  md: {
    shadowColor: '#1C1C1E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#1C1C1E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 8,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 6,
  }),
  card: {
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
};

export const Animation = {
  pressScale: 0.96,
  spring: { damping: 15, stiffness: 400, mass: 0.8 },
  duration: { fast: 150, normal: 250, slow: 400 },
};

export const WELLNESS_CATEGORIES = [
  { key: 'physical', label: 'Physical Health', color: Colors.physical, icon: '🏃‍♂️', ionIcon: 'body-outline' as const },
  { key: 'nutrition', label: 'Nutrition', color: Colors.nutrition, icon: '🥗', ionIcon: 'nutrition-outline' as const },
  { key: 'mental', label: 'Mental Health', color: Colors.mental, icon: '🧠', ionIcon: 'happy-outline' as const },
  { key: 'social', label: 'Social Wellness', color: Colors.social, icon: '🤝', ionIcon: 'people-outline' as const },
  { key: 'environment', label: 'Environmental', color: Colors.environment, icon: '🌱', ionIcon: 'leaf-outline' as const },
  { key: 'fitness', label: 'Fitness', color: Colors.fitness, icon: '🏋️', ionIcon: 'barbell-outline' as const },
  { key: 'sleep', label: 'Sleep', color: Colors.sleep, icon: '🌙', ionIcon: 'moon-outline' as const },
  { key: 'mindfulness', label: 'Mindfulness', color: Colors.mindfulness, icon: '🪷', ionIcon: 'flower-outline' as const },
  { key: 'stress', label: 'Stress Management', color: Colors.stress, icon: '😮‍💨', ionIcon: 'flame-outline' as const },
  { key: 'workLife', label: 'Work–Life Balance', color: Colors.workLife, icon: '⚖️', ionIcon: 'briefcase-outline' as const },
];

export { TAB_ICONS, CATEGORY_IONICONS, IconSize, categoryIonIcon } from './icons';
export { fitnessModuleIonIcon } from './fitnessModuleIcons';
export type { IoniconName } from './icons';

export const navigationTheme = {
  dark: false as const,
  colors: {
    primary: Colors.primary,
    background: Colors.background,
    card: Colors.background,
    text: Colors.text,
    border: Colors.border,
    notification: Colors.brand,
  },
};
