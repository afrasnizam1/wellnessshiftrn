#!/usr/bin/env node
// Generates stub screens so the app compiles immediately

const fs = require('fs');
const path = require('path');

const stubs = [
  // Auth
  ['src/screens/auth/SignInScreen.tsx', 'Sign In', 'auth'],
  ['src/screens/auth/SignUpScreen.tsx', 'Sign Up', 'auth'],
  ['src/screens/auth/RoleSelectScreen.tsx', 'Choose Your Role', 'auth'],
  ['src/screens/auth/IntroVideoScreen.tsx', 'Welcome to Wellness Shift', 'auth'],
  ['src/screens/auth/QuizScreen.tsx', 'Wellness Assessment', 'primary'],
  ['src/screens/auth/PostQuizScreen.tsx', 'Your Results Are Ready', 'primary'],
  ['src/screens/auth/HealthKitPermissionScreen.tsx', 'Connect Apple Health', 'primary'],
  ['src/screens/auth/PaywallScreen.tsx', 'Unlock Premium', 'primary'],
  // Home
  ['src/screens/home/DailyPlanScreen.tsx', "Today's Plan", 'home'],
  ['src/screens/home/TaskDetailScreen.tsx', 'Task', 'home'],
  ['src/screens/home/CheckInScreen.tsx', 'Daily Check-In', 'home'],
  // Fitness
  ['src/screens/fitness/FitnessHubScreen.tsx', 'Fitness Hub', 'fitness'],
  ['src/screens/fitness/ModuleDetailScreen.tsx', 'Module', 'fitness'],
  ['src/screens/fitness/BreathingExerciseScreen.tsx', 'Breathing Exercise', 'fitness'],
  ['src/screens/fitness/MeditationTimerScreen.tsx', 'Meditation Timer', 'fitness'],
  ['src/screens/fitness/BrainGameScreen.tsx', 'Brain Game', 'fitness'],
  ['src/screens/fitness/CalculatorScreen.tsx', 'Health Calculator', 'fitness'],
  ['src/screens/fitness/HealthTrackerScreen.tsx', 'Health Tracker', 'fitness'],
  ['src/screens/fitness/AnatomyViewerScreen.tsx', '3D Anatomy', 'fitness'],
  ['src/screens/fitness/HealthTopicScreen.tsx', 'Health Topic', 'fitness'],
  // Insights
  ['src/screens/insights/InsightsFeedScreen.tsx', 'AI Insights', 'insights'],
  ['src/screens/insights/AIChatScreen.tsx', 'AI Health Coach', 'insights'],
  ['src/screens/insights/InsightDetailScreen.tsx', 'Insight', 'insights'],
  // Analytics
  ['src/screens/analytics/AnalyticsDashboardScreen.tsx', 'Analytics', 'analytics'],
  ['src/screens/analytics/ProgressTrackingScreen.tsx', 'Progress', 'analytics'],
  ['src/screens/analytics/WellnessExportScreen.tsx', 'Export Report', 'analytics'],
  // More
  ['src/screens/more/MoreMenuScreen.tsx', 'More', 'more'],
  ['src/screens/more/ProfileScreen.tsx', 'My Profile', 'more'],
  ['src/screens/more/CarePlanScreen.tsx', 'My Care Plan', 'more'],
  ['src/screens/more/MessagesScreen.tsx', 'Messages', 'more'],
  ['src/screens/more/ProgramsScreen.tsx', 'My Programs', 'more'],
  ['src/screens/more/AchievementsScreen.tsx', 'Achievements', 'more'],
  ['src/screens/more/CoachingScreen.tsx', 'Coaching & Consultations', 'more'],
  ['src/screens/more/NotificationsScreen.tsx', 'Notifications', 'more'],
  ['src/screens/more/SubscriptionScreen.tsx', 'Subscription', 'more'],
  ['src/screens/more/HelpScreen.tsx', 'Help & FAQ', 'more'],
  ['src/screens/more/PrivacyScreen.tsx', 'Privacy Policy', 'more'],
  ['src/screens/more/DataRightsScreen.tsx', 'Your Data Rights', 'more'],
  // Clinician
  ['src/screens/clinician/ClinicianDashboardScreen.tsx', 'Clinician Dashboard', 'clinician'],
  ['src/screens/clinician/PatientsScreen.tsx', 'Patients', 'clinician'],
  ['src/screens/clinician/ClinicianAnalyticsScreen.tsx', 'Analytics', 'clinician'],
  ['src/screens/clinician/ClinicianSettingsScreen.tsx', 'Settings', 'clinician'],
];

const colorMap = {
  auth: '#7B4FD4',
  home: '#7B4FD4',
  fitness: '#3498DB',
  insights: '#9B59B6',
  analytics: '#27AE60',
  more: '#6B7280',
  clinician: '#E8567A',
  primary: '#7B4FD4',
};

stubs.forEach(([filePath, title, section]) => {
  const fullPath = path.join('/home/claude/WellnessShift', filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (fs.existsSync(fullPath)) return; // Don't overwrite already-created screens

  const color = colorMap[section] || '#7B4FD4';
  const componentName = path.basename(filePath, '.tsx');

  const content = `// ${filePath}
// TODO: Implement full ${title} screen
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ${componentName}() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>${title}</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.placeholder}>
        <Text style={styles.emoji}>🚧</Text>
        <Text style={styles.label}>${title}</Text>
        <Text style={styles.sub}>Coming soon — this screen is next to be built</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F9FA' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  back: { width: 40, alignItems: 'flex-start' },
  backText: { fontSize: 28, color: '${color}', lineHeight: 32 },
  title: { flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '700', color: '#111827' },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  emoji: { fontSize: 48 },
  label: { fontSize: 20, fontWeight: '700', color: '#111827' },
  sub: { fontSize: 14, color: '#6B7280', textAlign: 'center', paddingHorizontal: 40 },
});
`;

  fs.writeFileSync(fullPath, content);
  console.log(`Created: ${filePath}`);
});

console.log('\nAll stub screens generated!');
