import AnatomyViewerScreen from '../../screens/fitness/AnatomyViewerScreen';
import BrainGameScreen from '../../screens/fitness/BrainGameScreen';
import BreathingExerciseScreen from '../../screens/fitness/BreathingExerciseScreen';
import CalculatorScreen from '../../screens/fitness/CalculatorScreen';
import GuidedProgramScreen from '../../screens/fitness/GuidedProgramScreen';
import HealthTopicScreen from '../../screens/fitness/HealthTopicScreen';
import HealthTrackerScreen from '../../screens/fitness/HealthTrackerScreen';
import LearningGuideDetailScreen from '../../screens/fitness/LearningGuideDetailScreen';
import MealPlannerScreen from '../../screens/fitness/MealPlannerScreen';
import MeditationTimerScreen from '../../screens/fitness/MeditationTimerScreen';
import ModuleDetailScreen from '../../screens/fitness/ModuleDetailScreen';
import NutritionBasicsLearningScreen from '../../screens/fitness/NutritionBasicsLearningScreen';
import VitaminsLearningScreen from '../../screens/fitness/VitaminsLearningScreen';
import ActivityDashboardScreen from '../../screens/home/ActivityDashboardScreen';
import { Screen } from '../screenNames';

/** Shared module detail screens — registered on Fitness + Clinician stacks */
export const FITNESS_MODULE_SCREEN_CONFIG = [
  { name: Screen.moduleDetail, component: ModuleDetailScreen },
  { name: Screen.anatomyViewer, component: AnatomyViewerScreen },
  { name: Screen.brainGame, component: BrainGameScreen },
  { name: Screen.healthCalculator, component: CalculatorScreen },
  { name: Screen.healthTracker, component: HealthTrackerScreen },
  { name: Screen.healthTopic, component: HealthTopicScreen },
  { name: Screen.breathingExercise, component: BreathingExerciseScreen },
  { name: Screen.meditationTimer, component: MeditationTimerScreen },
  { name: Screen.guidedProgram, component: GuidedProgramScreen },
  { name: Screen.mealPlanner, component: MealPlannerScreen },
  { name: Screen.vitaminsLearning, component: VitaminsLearningScreen },
  { name: Screen.nutritionBasics, component: NutritionBasicsLearningScreen },
  { name: Screen.learningGuide, component: LearningGuideDetailScreen },
  { name: Screen.activityDashboard, component: ActivityDashboardScreen },
] as const;

export type FitnessModuleScreenName = typeof FITNESS_MODULE_SCREEN_CONFIG[number]['name'];
