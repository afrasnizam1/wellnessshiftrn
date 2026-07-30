// src/navigation/stacks/FitnessStackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { FitnessStackParamList } from '../../types';
import FitnessHubScreen from '../../screens/fitness/FitnessHubScreen';
import ModuleDetailScreen from '../../screens/fitness/ModuleDetailScreen';
import BreathingExerciseScreen from '../../screens/fitness/BreathingExerciseScreen';
import MeditationTimerScreen from '../../screens/fitness/MeditationTimerScreen';
import BrainGameScreen from '../../screens/fitness/BrainGameScreen';
import CalculatorScreen from '../../screens/fitness/CalculatorScreen';
import HealthTrackerScreen from '../../screens/fitness/HealthTrackerScreen';
import AnatomyViewerScreen from '../../screens/fitness/AnatomyViewerScreen';
import HealthTopicScreen from '../../screens/fitness/HealthTopicScreen';
import VitaminsLearningScreen from '../../screens/fitness/VitaminsLearningScreen';
import NutritionBasicsLearningScreen from '../../screens/fitness/NutritionBasicsLearningScreen';
import LearningGuideDetailScreen from '../../screens/fitness/LearningGuideDetailScreen';
import GuidedProgramScreen from '../../screens/fitness/GuidedProgramScreen';
import MealPlannerScreen from '../../screens/fitness/MealPlannerScreen';
import ActivityDashboardScreen from '../../screens/home/ActivityDashboardScreen';
import StepsDetailScreen from '../../screens/home/StepsDetailScreen';
import PremiumShopScreen from '../../screens/fitness/PremiumShopScreen';
import OrganHealthNutritionScreen from '../../screens/fitness/OrganHealthNutritionScreen';
import { Screen } from '../screenNames';

const Stack = createNativeStackNavigator<FitnessStackParamList>();

export default function FitnessStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screen.fitnessHub} component={FitnessHubScreen} />
      <Stack.Screen name={Screen.moduleDetail} component={ModuleDetailScreen} />
      <Stack.Screen name={Screen.breathingExercise} component={BreathingExerciseScreen} />
      <Stack.Screen name={Screen.meditationTimer} component={MeditationTimerScreen} />
      <Stack.Screen name={Screen.brainGame} component={BrainGameScreen} />
      <Stack.Screen name={Screen.healthCalculator} component={CalculatorScreen} />
      <Stack.Screen name={Screen.healthTracker} component={HealthTrackerScreen} />
      <Stack.Screen name={Screen.anatomyViewer} component={AnatomyViewerScreen} />
      <Stack.Screen name={Screen.healthTopic} component={HealthTopicScreen} />
      <Stack.Screen name={Screen.vitaminsLearning} component={VitaminsLearningScreen} />
      <Stack.Screen name={Screen.nutritionBasics} component={NutritionBasicsLearningScreen} />
      <Stack.Screen name={Screen.learningGuide} component={LearningGuideDetailScreen} />
      <Stack.Screen name={Screen.guidedProgram} component={GuidedProgramScreen} />
      <Stack.Screen name={Screen.mealPlanner} component={MealPlannerScreen} />
      <Stack.Screen name={Screen.activityDashboard} component={ActivityDashboardScreen} />
      <Stack.Screen name={Screen.stepsDetail} component={StepsDetailScreen} />
      <Stack.Screen name={Screen.premiumShop} component={PremiumShopScreen} />
      <Stack.Screen name={Screen.organHealthNutrition} component={OrganHealthNutritionScreen} />
    </Stack.Navigator>
  );
}
