// src/navigation/stacks/AIInsightsStackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AIInsightsStackParamList } from '../../types';
import InsightsFeedScreen from '../../screens/insights/InsightsFeedScreen';
import AIChatScreen from '../../screens/insights/AIChatScreen';
import InsightDetailScreen from '../../screens/insights/InsightDetailScreen';
import { Screen } from '../screenNames';

const Stack = createNativeStackNavigator<AIInsightsStackParamList>();

export default function AIInsightsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screen.aiInsightsFeed} component={InsightsFeedScreen} />
      <Stack.Screen name={Screen.aiHealthCoach} component={AIChatScreen} />
      <Stack.Screen name={Screen.insightDetail} component={InsightDetailScreen} />
    </Stack.Navigator>
  );
}
