// src/navigation/MainTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Platform, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type { MainTabParamList } from '../types';
import { Colors, Typography, Shadow, TAB_ICONS, type IoniconName } from '../theme';
import { useAppStore } from '../store';

import HomeStackNavigator from './stacks/HomeStackNavigator';
import FitnessStackNavigator from './stacks/FitnessStackNavigator';
import AIInsightsStackNavigator from './stacks/AIInsightsStackNavigator';
import AnalyticsStackNavigator from './stacks/AnalyticsStackNavigator';
import MoreStackNavigator from './stacks/MoreStackNavigator';
import MyCareStackNavigator from './stacks/MyCareStackNavigator';
import { Screen } from './screenNames';

const AI_INSIGHTS_HIDE_TAB: ReadonlySet<string> = new Set([Screen.aiHealthCoach, Screen.insightDetail]);

const Tab = createBottomTabNavigator<MainTabParamList>();

type TabIconName = IoniconName;

const TAB_ICON_MAP: Record<keyof MainTabParamList, { active: TabIconName; inactive: TabIconName }> = {
  [Screen.tabHome]: TAB_ICONS.home,
  [Screen.tabFitness]: TAB_ICONS.fitness,
  [Screen.tabAiInsights]: TAB_ICONS.insights,
  [Screen.tabAnalytics]: TAB_ICONS.analytics,
  [Screen.tabMore]: TAB_ICONS.more,
  [Screen.tabMyCare]: TAB_ICONS.myCare,
};

function TabIcon({ focused, name, color }: { focused: boolean; name: TabIconName; color: string }) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <Ionicons name={name} size={focused ? 24 : 22} color={color} />
    </View>
  );
}

export function MainTabNavigator() {
  const { user } = useAppStore();
  const hasClinician = !!user?.clinicianId;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        sceneContainerStyle: styles.scene,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.tabActive,
        tabBarInactiveTintColor: Colors.tabInactive,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused, color }) => {
          const icons = TAB_ICON_MAP[route.name];
          const name = focused ? icons.active : icons.inactive;
          return <TabIcon focused={focused} name={name} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={Screen.tabHome}
        component={HomeStackNavigator}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name={Screen.tabFitness}
        component={FitnessStackNavigator}
        options={{ tabBarLabel: 'Fitness' }}
      />
      <Tab.Screen
        name={Screen.tabAiInsights}
        component={AIInsightsStackNavigator}
        options={({ route }) => {
          const focused = getFocusedRouteNameFromRoute(route) ?? Screen.aiInsightsFeed;
          const hideTab = AI_INSIGHTS_HIDE_TAB.has(focused);
          return {
            tabBarLabel: 'AI Insights',
            // Floating tab bar overlays chat/detail input — hide on those screens
            tabBarStyle: hideTab ? { display: 'none' } : styles.tabBar,
          };
        }}
      />
      <Tab.Screen
        name={Screen.tabAnalytics}
        component={AnalyticsStackNavigator}
        options={{ tabBarLabel: 'Analytics' }}
      />
      <Tab.Screen
        name={Screen.tabMore}
        component={MoreStackNavigator}
        options={{ tabBarLabel: 'More' }}
      />
      {hasClinician && (
        <Tab.Screen
          name={Screen.tabMyCare}
          component={MyCareStackNavigator}
          options={{ tabBarLabel: 'My Care' }}
        />
      )}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: Platform.OS === 'ios' ? 24 : 12,
    height: Platform.OS === 'ios' ? 72 : 64,
    paddingBottom: Platform.OS === 'ios' ? 8 : 6,
    paddingTop: 8,
    backgroundColor: Platform.OS === 'ios' ? 'rgba(255,255,255,0.92)' : Colors.surface,
    borderTopWidth: 0,
    borderRadius: 24,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.glassBorder,
    ...Shadow.lg,
    elevation: 12,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
    letterSpacing: -0.1,
  },
  iconWrap: {
    width: 40,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  iconWrapActive: {
    backgroundColor: Colors.primaryLight,
  },
});
