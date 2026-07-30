// src/navigation/stacks/HomeStackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../types';
import HomeScreen from '../../screens/home/HomeScreen';
import DailyPlanScreen from '../../screens/home/DailyPlanScreen';
import TaskDetailScreen from '../../screens/home/TaskDetailScreen';
import CheckInScreen from '../../screens/home/CheckInScreen';
import ActivityDashboardScreen from '../../screens/home/ActivityDashboardScreen';
import StepsDetailScreen from '../../screens/home/StepsDetailScreen';
import HealthKitPermissionScreen from '../../screens/auth/HealthKitPermissionScreen';
import { Screen } from '../screenNames';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screen.homeDashboard} component={HomeScreen} />
      <Stack.Screen name={Screen.dailyPlan} component={DailyPlanScreen} />
      <Stack.Screen name={Screen.taskDetail} component={TaskDetailScreen} />
      <Stack.Screen name={Screen.dailyCheckIn} component={CheckInScreen} />
      <Stack.Screen name={Screen.activityDashboard} component={ActivityDashboardScreen} />
      <Stack.Screen name={Screen.stepsDetail} component={StepsDetailScreen} />
      <Stack.Screen name={Screen.healthPermissions} component={HealthKitPermissionScreen} />
    </Stack.Navigator>
  );
}
