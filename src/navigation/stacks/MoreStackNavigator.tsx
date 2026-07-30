// src/navigation/stacks/MoreStackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { MoreStackParamList } from '../../types';
import MoreMenuScreen from '../../screens/more/MoreMenuScreen';
import MyCareHubScreen from '../../screens/more/MyCareHubScreen';
import ConnectClinicianScreen from '../../screens/more/ConnectClinicianScreen';
import ContentLibraryScreen from '../../screens/more/ContentLibraryScreen';
import ProfileScreen from '../../screens/more/ProfileScreen';
import CarePlanScreen from '../../screens/more/CarePlanScreen';
import MessagesScreen from '../../screens/more/MessagesScreen';
import ProgramsScreen from '../../screens/more/ProgramsScreen';
import ProgramDetailScreen from '../../screens/more/ProgramDetailScreen';
import AchievementsScreen from '../../screens/more/AchievementsScreen';
import CoachingScreen from '../../screens/more/CoachingScreen';
import NotificationsScreen from '../../screens/more/NotificationsScreen';
import SubscriptionScreen from '../../screens/more/SubscriptionScreen';
import HelpScreen from '../../screens/more/HelpScreen';
import PrivacyScreen from '../../screens/more/PrivacyScreen';
import LegalDocumentScreen from '../../screens/more/LegalDocumentScreen';
import DataRightsScreen from '../../screens/more/DataRightsScreen';
import NewsletterScreen from '../../screens/more/NewsletterScreen';
import MenstrualCycleScreen from '../../screens/more/MenstrualCycleScreen';
import TrackedWebViewScreen from '../../screens/common/TrackedWebViewScreen';
import BlogScreen from '../../screens/more/BlogScreen';
import ForumScreen from '../../screens/more/ForumScreen';
import ScanCustomPlanScreen from '../../screens/more/ScanCustomPlanScreen';
import GoalSettingScreen from '../../screens/more/GoalSettingScreen';
import HabitTrackingScreen from '../../screens/more/HabitTrackingScreen';
import SocialHubScreen from '../../screens/more/SocialHubScreen';
import SocialFeedScreen from '../../screens/more/SocialFeedScreen';
import LeaderboardScreen from '../../screens/more/LeaderboardScreen';
import CreateChallengeScreen from '../../screens/more/CreateChallengeScreen';
import SocialChallengesScreen from '../../screens/more/SocialChallengesScreen';
import AnatomyExplorerScreen from '../../screens/anatomy/AnatomyExplorerScreen';
import AnatomyLearningScreen from '../../screens/anatomy/AnatomyLearningScreen';
import AnatomyModuleScreen from '../../screens/anatomy/AnatomyModuleScreen';
import ConditionHubScreen from '../../screens/health/ConditionHubScreen';
import ConditionDetailScreen from '../../screens/health/ConditionDetailScreen';
import WorkoutHubScreen from '../../screens/workout/WorkoutHubScreen';
import WorkoutDetailScreen from '../../screens/workout/WorkoutDetailScreen';
import WorkoutTrackerScreen from '../../screens/workout/WorkoutTrackerScreen';
import { Screen } from '../screenNames';

const Stack = createNativeStackNavigator<MoreStackParamList>();

export default function MoreStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screen.moreMenu} component={MoreMenuScreen} />
      <Stack.Screen name={Screen.myCare} component={MyCareHubScreen} />
      <Stack.Screen name={Screen.connectClinician} component={ConnectClinicianScreen} />
      <Stack.Screen name={Screen.contentLibrary} component={ContentLibraryScreen} />
      <Stack.Screen name={Screen.profile} component={ProfileScreen} />
      <Stack.Screen name={Screen.carePlan} component={CarePlanScreen} />
      <Stack.Screen name={Screen.messages} component={MessagesScreen} />
      <Stack.Screen name={Screen.programs} component={ProgramsScreen} />
      <Stack.Screen name={Screen.programDetail} component={ProgramDetailScreen} />
      <Stack.Screen name={Screen.achievements} component={AchievementsScreen} />
      <Stack.Screen name={Screen.coaching} component={CoachingScreen} />
      <Stack.Screen name={Screen.notifications} component={NotificationsScreen} />
      <Stack.Screen name={Screen.subscription} component={SubscriptionScreen} />
      <Stack.Screen name={Screen.help} component={HelpScreen} />
      <Stack.Screen name={Screen.privacyPolicy} component={PrivacyScreen} />
      <Stack.Screen
        name={Screen.termsOfService}
        component={LegalDocumentScreen}
        initialParams={{ document: 'terms' }}
      />
      <Stack.Screen
        name={Screen.aiDisclosure}
        component={LegalDocumentScreen}
        initialParams={{ document: 'ai' }}
      />
      <Stack.Screen
        name={Screen.healthDataDisclosure}
        component={LegalDocumentScreen}
        initialParams={{ document: 'health' }}
      />
      <Stack.Screen name={Screen.dataRights} component={DataRightsScreen} />
      <Stack.Screen name={Screen.newsletter} component={NewsletterScreen} />
      <Stack.Screen name={Screen.menstrualCycle} component={MenstrualCycleScreen} />
      <Stack.Screen name={Screen.website} component={TrackedWebViewScreen} />
      <Stack.Screen name={Screen.blog} component={BlogScreen} />
      <Stack.Screen name={Screen.forum} component={ForumScreen} />
      <Stack.Screen name={Screen.scanCustomPlan} component={ScanCustomPlanScreen} />
      <Stack.Screen name={Screen.goals} component={GoalSettingScreen} />
      <Stack.Screen name={Screen.habitTracking} component={HabitTrackingScreen} />
      <Stack.Screen name={Screen.socialHub} component={SocialHubScreen} />
      <Stack.Screen name={Screen.socialFeed} component={SocialFeedScreen} />
      <Stack.Screen name={Screen.leaderboard} component={LeaderboardScreen} />
      <Stack.Screen name={Screen.createChallenge} component={CreateChallengeScreen} />
      <Stack.Screen name={Screen.socialChallenges} component={SocialChallengesScreen} />
      <Stack.Screen name={Screen.anatomyExplorer} component={AnatomyExplorerScreen} />
      <Stack.Screen name={Screen.anatomyLearning} component={AnatomyLearningScreen} />
      <Stack.Screen name={Screen.anatomyModule} component={AnatomyModuleScreen} />
      <Stack.Screen name={Screen.conditionHub} component={ConditionHubScreen} />
      <Stack.Screen name={Screen.conditionDetail} component={ConditionDetailScreen} />
      <Stack.Screen name={Screen.workoutHub} component={WorkoutHubScreen} />
      <Stack.Screen name={Screen.workoutDetail} component={WorkoutDetailScreen} />
      <Stack.Screen name={Screen.workoutTracker} component={WorkoutTrackerScreen} />
    </Stack.Navigator>
  );
}
