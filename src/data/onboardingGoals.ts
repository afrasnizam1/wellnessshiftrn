import { Colors } from '../theme';
import type { IoniconName } from '../theme/icons';
import { Screen } from '../navigation/screenNames';
import type { WellnessCategoryKey } from '../types';

export type PrimaryGoal =
  | 'sleep'
  | 'stress'
  | 'fitness'
  | 'lose_weight'
  | 'gain_weight'
  | 'maintain_weight'
  | 'build_muscle'
  | 'nutrition'
  | 'mental'
  | 'habits'
  | 'condition'
  | 'clinician'
  | 'general';

export interface GoalOption {
  id: PrimaryGoal;
  icon: IoniconName;
  color: string;
  title: string;
  subtitle: string;
}

export const ONBOARDING_GOALS: GoalOption[] = [
  { id: 'sleep', icon: 'bed-outline', color: Colors.sleep, title: 'Sleep better', subtitle: 'Improve sleep quality and recovery' },
  { id: 'stress', icon: 'flower-outline', color: Colors.stress, title: 'Reduce stress', subtitle: 'Build calm and resilience' },
  { id: 'fitness', icon: 'barbell-outline', color: Colors.fitness, title: 'Get fitter', subtitle: 'Move more and build endurance' },
  { id: 'lose_weight', icon: 'trending-down-outline', color: '#3498DB', title: 'Lose weight', subtitle: 'Sustainable fat loss with nutrition and movement' },
  { id: 'gain_weight', icon: 'trending-up-outline', color: '#E67E22', title: 'Gain weight', subtitle: 'Healthy weight gain with balanced nutrition' },
  { id: 'maintain_weight', icon: 'scale-outline', color: '#27AE60', title: 'Maintain weight', subtitle: 'Stay at a healthy weight long term' },
  { id: 'build_muscle', icon: 'fitness-outline', color: '#D35400', title: 'Build muscle', subtitle: 'Strength training and protein to grow lean mass' },
  { id: 'nutrition', icon: 'nutrition-outline', color: Colors.nutrition, title: 'Eat healthier', subtitle: 'Improve nutrition and energy' },
  { id: 'mental', icon: 'happy-outline', color: Colors.mental, title: 'Improve mental health', subtitle: 'Mood, anxiety, and focus' },
  { id: 'habits', icon: 'checkbox-outline', color: Colors.mindfulness, title: 'Build healthy habits', subtitle: 'Small daily wins that stick' },
  { id: 'condition', icon: 'medical-outline', color: Colors.physical, title: 'Manage a condition', subtitle: 'Track and support a health goal' },
  {
    id: 'clinician',
    icon: 'people-outline',
    color: Colors.brand,
    title: 'GP-referred clinician support',
    subtitle: 'Only if your GP referred you for a health issue',
  },
  { id: 'general', icon: 'sparkles-outline', color: Colors.purple, title: 'Overall wellness', subtitle: 'A balanced approach to health' },
];

/** Goals that should surface home-equipment questions during onboarding habits. */
export const FITNESS_RELATED_GOALS: PrimaryGoal[] = [
  'fitness',
  'build_muscle',
  'lose_weight',
  'gain_weight',
  'maintain_weight',
];

export function isFitnessRelatedGoal(goal: string): boolean {
  return FITNESS_RELATED_GOALS.includes(goal as PrimaryGoal);
}

export function goalToWellnessCategory(goal?: string | null): WellnessCategoryKey | null {
  const map: Record<string, WellnessCategoryKey> = {
    sleep: 'sleep',
    stress: 'stress',
    fitness: 'fitness',
    nutrition: 'nutrition',
    mental: 'mental',
    habits: 'mindfulness',
    condition: 'physical',
    clinician: 'physical',
    general: 'physical',
    lose_weight: 'nutrition',
    gain_weight: 'nutrition',
    maintain_weight: 'nutrition',
    build_muscle: 'fitness',
  };
  return goal ? map[goal] ?? null : null;
}

export function getGoalLabel(goalId: string): string {
  return ONBOARDING_GOALS.find((g) => g.id === goalId)?.title ?? goalId.replace(/_/g, ' ');
}

export const GOAL_REMINDER_ACTIONS: Record<
  PrimaryGoal,
  { icon: string; title: string; subtitle: string; tab: string; screen: string }
> = {
  sleep: { icon: 'moon-outline', title: 'Wind-down reminder', subtitle: 'Prepare for better sleep tonight', tab: Screen.tabFitness, screen: Screen.fitnessHub },
  stress: { icon: 'leaf-outline', title: 'Stress check-in', subtitle: '2 minutes to reset your nervous system', tab: Screen.tabFitness, screen: Screen.fitnessHub },
  fitness: { icon: 'fitness-outline', title: 'Movement today', subtitle: 'A small workout that fits your plan', tab: Screen.tabFitness, screen: Screen.fitnessHub },
  lose_weight: { icon: 'trending-down-outline', title: 'Weight-loss focus', subtitle: 'Log a meal and move for 10 minutes', tab: Screen.tabFitness, screen: Screen.fitnessHub },
  gain_weight: { icon: 'trending-up-outline', title: 'Healthy gain check-in', subtitle: 'Eat a protein-rich meal today', tab: Screen.tabFitness, screen: Screen.fitnessHub },
  maintain_weight: { icon: 'scale-outline', title: 'Stay on track', subtitle: 'Balance movement and mindful eating', tab: Screen.tabFitness, screen: Screen.fitnessHub },
  build_muscle: { icon: 'barbell-outline', title: 'Strength session', subtitle: 'A short workout to build lean muscle', tab: Screen.tabFitness, screen: Screen.fitnessHub },
  nutrition: { icon: 'nutrition-outline', title: 'Nutrition focus', subtitle: 'Log one healthy meal or snack', tab: Screen.tabFitness, screen: Screen.fitnessHub },
  mental: { icon: 'happy-outline', title: 'Mental wellness moment', subtitle: 'A brief practice for your mood', tab: Screen.tabFitness, screen: Screen.fitnessHub },
  habits: { icon: 'checkbox-outline', title: 'Habit due', subtitle: 'Check off one habit today', tab: Screen.tabMore, screen: Screen.habitTracking },
  condition: { icon: 'medical-outline', title: 'Health tracking', subtitle: 'Log a symptom or vital sign', tab: Screen.tabFitness, screen: Screen.fitnessHub },
  clinician: {
    icon: 'people-outline',
    title: 'Connect with your GP-referred clinician',
    subtitle: 'Only if referred for a health issue — invite code in My Care',
    tab: Screen.tabMyCare,
    screen: Screen.connectClinician,
  },
  general: { icon: 'sparkles-outline', title: 'Daily wellness boost', subtitle: 'One action for overall health', tab: Screen.tabFitness, screen: Screen.fitnessHub },
};
