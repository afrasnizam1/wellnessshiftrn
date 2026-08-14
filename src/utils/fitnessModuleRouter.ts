import { CommonActions, type NavigationProp } from '@react-navigation/native';
import { FITNESS_MODULES } from '../data/fitnessData';
import { Screen } from '../navigation/screenNames';
import { navigationRef } from '../navigation/navigationRef';
import type { FitnessModule, SubscriptionTier } from '../types';
import { getEffectiveTier } from '../services/iap';

export type FitnessScreenName =
  | typeof Screen.fitnessHub
  | typeof Screen.brainGame
  | typeof Screen.healthCalculator
  | typeof Screen.healthTracker
  | typeof Screen.anatomyViewer
  | typeof Screen.healthTopic
  | typeof Screen.breathingExercise
  | typeof Screen.meditationTimer
  | typeof Screen.moduleDetail
  | typeof Screen.learningGuide
  | typeof Screen.vitaminsLearning
  | typeof Screen.nutritionBasics
  | typeof Screen.guidedProgram
  | typeof Screen.mealPlanner
  | typeof Screen.highProteinMeals
  | typeof Screen.foodScan
  | typeof Screen.bodyMetrics
  | typeof Screen.healthRecords
  | typeof Screen.activityDashboard
  | typeof Screen.stepsDetail
  | typeof Screen.premiumShop
  | typeof Screen.organHealthNutrition;

export type FitnessRoute = {
  screen: FitnessScreenName;
  params?: Record<string, unknown>;
};

export function getRouteForModule(module: FitnessModule): FitnessRoute {
  switch (module.category) {
    case 'brainGames':
      return { screen: Screen.brainGame, params: { gameId: module.id } };
    case 'calculators':
      return { screen: Screen.healthCalculator, params: { calculatorId: module.id } };
    case 'trackers':
      if (module.id === 'body-metrics') {
        return { screen: Screen.bodyMetrics };
      }
      return { screen: Screen.healthTracker, params: { trackerId: module.id } };
    case 'anatomy':
      return { screen: Screen.anatomyViewer, params: { modelId: module.id } };
    case 'education':
      if (module.id === 'stress-assessment' || module.id === 'stress-assessment-tool') {
        return { screen: Screen.healthCalculator, params: { calculatorId: 'stress-assessment' } };
      }
      if (module.id === 'meal-planner') {
        return { screen: Screen.mealPlanner };
      }
      if (module.id === 'high-protein-meals') {
        return { screen: Screen.highProteinMeals };
      }
      if (module.id === 'food-scan') {
        return { screen: Screen.foodScan };
      }
      if (module.id === 'organ-health-nutrition') {
        return { screen: Screen.organHealthNutrition };
      }
      return { screen: Screen.healthTopic, params: { topicId: module.id } };
    case 'mindBody':
      if (module.id === 'breathing') return { screen: Screen.breathingExercise };
      if (module.id === 'meditation') return { screen: Screen.meditationTimer };
      if (module.id === 'sleep-tools') {
        return { screen: Screen.healthCalculator, params: { calculatorId: 'sleep-debt' } };
      }
      if (module.id === 'stretching') {
        return { screen: Screen.healthTopic, params: { topicId: 'stretching' } };
      }
      return { screen: Screen.guidedProgram, params: { module } };
    case 'workouts':
      return { screen: Screen.guidedProgram, params: { module } };
    default:
      if (module.id === 'track-progress') return { screen: Screen.activityDashboard };
      if (module.id === 'calorie-calculator') {
        return { screen: Screen.healthCalculator, params: { calculatorId: 'bmr' } };
      }
      return { screen: Screen.moduleDetail, params: { module } };
  }
}

export function getRouteForModuleId(moduleId: string): FitnessRoute | null {
  const module = FITNESS_MODULES.find((m) => m.id === moduleId);
  return module ? getRouteForModule(module) : null;
}

export function findModuleByTitleOrId(key: string): FitnessModule | undefined {
  return (
    FITNESS_MODULES.find((m) => m.title === key) ??
    FITNESS_MODULES.find((m) => m.id === key)
  );
}

export function navigateToFitnessModule(
  navigation: NavigationProp<any>,
  module: FitnessModule,
  subscriptionTier: SubscriptionTier = 'free'
) {
  if (module.isPremium && getEffectiveTier(subscriptionTier) === 'free') {
    navigation.navigate(Screen.subscriptionPaywall, { feature: module.title });
    return;
  }
  const route = getRouteForModule(module);
  navigation.navigate(route.screen, route.params);
}

/** Clinician library preview — no paywall; opens module in clinician stack */
export function navigateClinicianFitnessModule(
  navigation: NavigationProp<any>,
  module: FitnessModule
) {
  const route = getRouteForModule(module);
  navigation.navigate(route.screen, route.params);
}

const LINKED_TITLE_OVERRIDES: Record<string, FitnessRoute> = {
  'Stress Assessment': { screen: Screen.healthCalculator, params: { calculatorId: 'stress-assessment' } },
  'Hydration Tracker': { screen: Screen.healthTracker, params: { trackerId: 'hydration-tracker' } },
  'Macro Calculator': { screen: Screen.healthCalculator, params: { calculatorId: 'macros' } },
  'Meal Planner': { screen: Screen.mealPlanner },
  'Food Scan': { screen: Screen.foodScan },
  'Recovery & Strain': { screen: Screen.bodyMetrics },
  'Sleep Debt Calculator': { screen: Screen.healthCalculator, params: { calculatorId: 'sleep-debt' } },
};

function fitnessNestedNavigate(
  navigation: NavigationProp<any>,
  route: FitnessRoute,
  fromRootStack: boolean,
  extraParams?: Record<string, unknown>,
) {
  const params = { ...(route.params ?? {}), ...(extraParams ?? {}) };
  const nested = {
    screen: Screen.tabFitness,
    params: { screen: route.screen, params },
  };
  if (fromRootStack) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(
        CommonActions.navigate({
          name: Screen.patientApp,
          params: nested,
        }),
      );
      return;
    }
    navigation.navigate(Screen.patientApp, nested);
    return;
  }
  navigation.navigate(Screen.tabFitness, { screen: route.screen, params });
}

export function navigateToLinkedModule(
  navigation: NavigationProp<any>,
  linkedModule?: string,
  options?: { fromRootStack?: boolean; fromCarePlan?: boolean },
) {
  const fromRoot = options?.fromRootStack === true;
  const extra = options?.fromCarePlan ? { fromCarePlan: true } : undefined;
  const hub: FitnessRoute = { screen: Screen.fitnessHub };

  if (!linkedModule) {
    fitnessNestedNavigate(navigation, hub, fromRoot, extra);
    return;
  }

  const override = LINKED_TITLE_OVERRIDES[linkedModule];
  if (override) {
    fitnessNestedNavigate(navigation, override, fromRoot, extra);
    return;
  }

  const module = findModuleByTitleOrId(linkedModule);
  if (module) {
    fitnessNestedNavigate(navigation, getRouteForModule(module), fromRoot, extra);
    return;
  }

  fitnessNestedNavigate(navigation, hub, fromRoot, extra);
}

/** Normalise legacy calculator param IDs to registry keys */
export function resolveCalculatorId(id: string): string {
  const aliases: Record<string, string> = {
    macro: 'macros',
    heartRate: 'heart-rate-zones',
    sleepDebt: 'sleep-debt',
    sleep: 'sleep-debt',
    stress: 'stress-assessment',
    hydration: 'hydration-tracker',
    protein: 'protein-calculator',
    'body_fat': 'body-fat',
    bodyFat: 'body-fat',
    waist_hip: 'waist-hip',
  };
  return aliases[id] ?? id;
}
