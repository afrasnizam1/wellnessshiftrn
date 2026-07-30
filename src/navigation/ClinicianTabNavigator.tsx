import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import type { ClinicianTabParamList } from '../types';
import { Typography, Shadow, type IoniconName } from '../theme';
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
      {focused ? (
        <LinearGradient colors={[...ClinicianTheme.gradient]} style={styles.iconWrapActive}>
          <Ionicons name={activeIcon} size={20} color="#FFF" />
        </LinearGradient>
      ) : (
        <View style={styles.iconWrap}>
          <Ionicons name={icon} size={20} color={ClinicianTheme.tabInactive} />
        </View>
      )}
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
    left: 20,
    right: 20,
    bottom: Platform.OS === 'ios' ? 28 : 14,
    height: Platform.OS === 'ios' ? 76 : 68,
    paddingBottom: Platform.OS === 'ios' ? 10 : 8,
    paddingTop: 10,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderTopWidth: 0,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: ClinicianTheme.border,
    ...Shadow.lg,
    elevation: 16,
  },
  tabIcon: { alignItems: 'center', gap: 3 },
  iconWrap: {
    width: 44,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  iconWrapActive: {
    width: 44,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  tabLabel: { fontSize: Typography.size.xs, color: ClinicianTheme.tabInactive, fontWeight: '600' },
  tabLabelActive: { color: ClinicianTheme.accent, fontWeight: '800' },
});
