import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type { ClinicianTabParamList } from '../types';
import { Typography, Colors, type IoniconName } from '../theme';
import { ClinicianTheme } from '../theme/clinicianTheme';

import ClinicianDashboardScreen from '../screens/clinician/ClinicianDashboardScreen';
import PatientsScreen from '../screens/clinician/PatientsScreen';
import ClinicianAnalyticsScreen from '../screens/clinician/ClinicianAnalyticsScreen';
import ClinicianSettingsScreen from '../screens/clinician/ClinicianSettingsScreen';
import { Screen } from './screenNames';

const Tab = createBottomTabNavigator<ClinicianTabParamList>();

const TABS: { name: keyof ClinicianTabParamList; label: string; icon: IoniconName; activeIcon: IoniconName }[] = [
  { name: Screen.clinicianDashboard, label: 'Home', icon: 'grid-outline', activeIcon: 'grid' },
  { name: Screen.patients, label: 'Patients', icon: 'people-outline', activeIcon: 'people' },
  { name: Screen.clinicianAnalytics, label: 'Insights', icon: 'bar-chart-outline', activeIcon: 'bar-chart' },
  { name: Screen.clinicianSettings, label: 'Settings', icon: 'settings-outline', activeIcon: 'settings' },
];

function TabIcon({ focused, icon, activeIcon, label }: { focused: boolean; icon: IoniconName; activeIcon: IoniconName; label: string }) {
  return (
    <View style={styles.tabIcon}>
      <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
        <Ionicons
          name={focused ? activeIcon : icon}
          size={20}
          color={focused ? ClinicianTheme.accent : ClinicianTheme.tabInactive}
        />
      </View>
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>{label}</Text>
    </View>
  );
}

export function ClinicianTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      {TABS.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={
            tab.name === Screen.clinicianDashboard ? ClinicianDashboardScreen :
            tab.name === Screen.patients ? PatientsScreen :
            tab.name === Screen.clinicianAnalytics ? ClinicianAnalyticsScreen :
            ClinicianSettingsScreen
          }
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={tab.icon} activeIcon={tab.activeIcon} label={tab.label} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: Platform.OS === 'ios' ? 24 : 12,
    height: Platform.OS === 'ios' ? 72 : 64,
    paddingBottom: Platform.OS === 'ios' ? 8 : 6,
    paddingTop: 8,
    backgroundColor: Colors.surface,
    borderTopWidth: 0,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
    shadowColor: '#1C1C1E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  tabIcon: { alignItems: 'center', gap: 2 },
  iconWrap: {
    width: 40,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  iconWrapActive: {
    backgroundColor: ClinicianTheme.accentMuted,
  },
  tabLabel: { fontSize: Typography.size.xs, color: ClinicianTheme.tabInactive, fontWeight: '600' },
  tabLabelActive: { color: ClinicianTheme.accent, fontWeight: '700' },
});
