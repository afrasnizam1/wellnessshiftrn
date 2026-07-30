import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_ACTIVITY_GOALS } from '../utils/activityHistoryHelpers';

export type AnalyticsCustomization = {
  showSleepAnalysis: boolean;
  showMoodStress: boolean;
  showActivityBreakdown: boolean;
  showActivityConsistency: boolean;
  showRecoveryBalance: boolean;
  showCardioLoad: boolean;
  showAIInsights: boolean;
  showGoalsProgress: boolean;
  showHabits: boolean;
  stepsGoal: number;
  caloriesGoal: number;
  exerciseGoal: number;
};

const KEY = 'analytics_customization_v1';

export const DEFAULT_ANALYTICS_CUSTOMIZATION: AnalyticsCustomization = {
  showSleepAnalysis: true,
  showMoodStress: true,
  showActivityBreakdown: true,
  showActivityConsistency: true,
  showRecoveryBalance: true,
  showCardioLoad: true,
  showAIInsights: true,
  showGoalsProgress: true,
  showHabits: true,
  stepsGoal: DEFAULT_ACTIVITY_GOALS.steps,
  caloriesGoal: DEFAULT_ACTIVITY_GOALS.calories,
  exerciseGoal: DEFAULT_ACTIVITY_GOALS.exerciseMinutes,
};

export const analyticsCustomizationStorage = {
  get: async (): Promise<AnalyticsCustomization> => {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_ANALYTICS_CUSTOMIZATION };
    try {
      return { ...DEFAULT_ANALYTICS_CUSTOMIZATION, ...JSON.parse(raw) };
    } catch {
      return { ...DEFAULT_ANALYTICS_CUSTOMIZATION };
    }
  },

  save: async (value: AnalyticsCustomization) => {
    await AsyncStorage.setItem(KEY, JSON.stringify(value));
  },
};
