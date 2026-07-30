// src/navigation/stacks/AnalyticsStackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AnalyticsStackParamList } from '../../types';
import AnalyticsDashboardScreen from '../../screens/analytics/AnalyticsDashboardScreen';
import ProgressTrackingScreen from '../../screens/analytics/ProgressTrackingScreen';
import WellnessExportScreen from '../../screens/analytics/WellnessExportScreen';
import CategoryDetailScreen from '../../screens/analytics/CategoryDetailScreen';
import { Screen } from '../screenNames';

const Stack = createNativeStackNavigator<AnalyticsStackParamList>();

export default function AnalyticsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screen.analyticsDashboard} component={AnalyticsDashboardScreen} />
      <Stack.Screen name={Screen.progressTracking} component={ProgressTrackingScreen} />
      <Stack.Screen name={Screen.wellnessExport} component={WellnessExportScreen} />
      <Stack.Screen name={Screen.categoryDetail} component={CategoryDetailScreen} />
    </Stack.Navigator>
  );
}
