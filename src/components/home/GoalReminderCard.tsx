// src/components/home/GoalReminderCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { AnimatedPressable } from '../ui';
import { Screen } from '../../navigation/screenNames';

type PrimaryGoal =
  | 'sleep' | 'stress' | 'fitness' | 'nutrition' | 'mental' | 'habits' | 'condition' | 'clinician' | 'general';

interface Props {
  goal: PrimaryGoal;
}

const GOAL_ACTIONS: Record<
  PrimaryGoal,
  { icon: string; title: string; subtitle: string; tab: string; screen: string }
> = {
  sleep: { icon: 'moon-outline', title: 'Wind-down reminder', subtitle: 'Prepare for better sleep tonight', tab: Screen.tabFitness, screen: Screen.fitnessHub },
  stress: { icon: 'leaf-outline', title: 'Stress check-in', subtitle: '2 minutes to reset your nervous system', tab: Screen.tabFitness, screen: Screen.fitnessHub },
  fitness: { icon: 'fitness-outline', title: 'Movement today', subtitle: 'A small workout that fits your plan', tab: Screen.tabFitness, screen: Screen.fitnessHub },
  nutrition: { icon: 'nutrition-outline', title: 'Nutrition focus', subtitle: 'Log one healthy meal or snack', tab: Screen.tabFitness, screen: Screen.fitnessHub },
  mental: { icon: 'happy-outline', title: 'Mental wellness moment', subtitle: 'A brief practice for your mood', tab: Screen.tabFitness, screen: Screen.fitnessHub },
  habits: { icon: 'checkbox-outline', title: 'Habit due', subtitle: 'Check off one habit today', tab: Screen.tabMore, screen: Screen.habitTracking },
  condition: { icon: 'medical-outline', title: 'Health tracking', subtitle: 'Log a symptom or vital sign', tab: Screen.tabFitness, screen: Screen.fitnessHub },
  clinician: {
    icon: 'people-outline',
    title: 'Connect with a clinician',
    subtitle: 'Link with an invite code from My Care',
    tab: Screen.tabMyCare,
    screen: Screen.connectClinician,
  },
  general: { icon: 'sparkles-outline', title: 'Daily wellness boost', subtitle: 'One action for overall health', tab: Screen.tabFitness, screen: Screen.fitnessHub },
};

export default function GoalReminderCard({ goal }: Props) {
  const navigation = useNavigation<any>();
  const action = GOAL_ACTIONS[goal] ?? GOAL_ACTIONS.general;

  return (
    <AnimatedPressable
      onPress={() => navigation.navigate(action.tab, { screen: action.screen })}
      accessibilityRole="button"
      accessibilityLabel={action.title}
    >
      <View style={styles.card}>
        <View style={styles.iconWrap}>
          <Ionicons name={action.icon as any} size={22} color={Colors.primary} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{action.title}</Text>
          <Text style={styles.subtitle}>{action.subtitle}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.sm,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1 },
  title: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text, letterSpacing: -0.2 },
  subtitle: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginTop: 3 },
});
