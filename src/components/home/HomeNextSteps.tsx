import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AnimatedPressable } from '../ui';
import type { CarePlan, DailyPlan } from '../../types';

type Props = {
  startHereDone: boolean;
  dayOneDone: boolean;
  hasCheckedInToday: boolean;
  healthConnected: boolean;
  dailyPlan: DailyPlan | null;
  carePlan: CarePlan | null;
  onStartHere: () => void;
  onDayOne: () => void;
  onCheckIn: () => void;
  onDailyPlan: () => void;
  onCarePlan: () => void;
  onConnectHealth: () => void;
  onOpenAiInsights: () => void;
};

export default function HomeNextSteps({
  startHereDone,
  dayOneDone,
  hasCheckedInToday,
  healthConnected,
  dailyPlan,
  carePlan,
  onStartHere,
  onDayOne,
  onCheckIn,
  onDailyPlan,
  onCarePlan,
  onConnectHealth,
  onOpenAiInsights,
}: Props) {
  const nextStep = useMemo(() => {
    if (!startHereDone) {
      return { title: 'Start Here — set up your journey', icon: 'sparkles' as const, onPress: onStartHere };
    }
    if (!dayOneDone) {
      return { title: 'Complete your Day 1 checklist', icon: 'checkbox-outline' as const, onPress: onDayOne };
    }
    if (!hasCheckedInToday) {
      return { title: 'Do your daily check-in', icon: 'heart-outline' as const, onPress: onCheckIn };
    }
    const incompleteTask = dailyPlan?.tasks.find((t) => t.status !== 'complete');
    if (incompleteTask) {
      return { title: `Continue: ${incompleteTask.title}`, icon: 'list-outline' as const, onPress: onDailyPlan };
    }
    if (dailyPlan && dailyPlan.tasks.length === 0) {
      return { title: 'Generate today\'s plan', icon: 'calendar-outline' as const, onPress: onDailyPlan };
    }
    if (carePlan) {
      return { title: 'Review your care plan', icon: 'medkit-outline' as const, onPress: onCarePlan };
    }
    if (!healthConnected) {
      return { title: 'Connect Apple Health for activity', icon: 'fitness-outline' as const, onPress: onConnectHealth };
    }
    return null;
  }, [
    startHereDone,
    dayOneDone,
    hasCheckedInToday,
    healthConnected,
    dailyPlan,
    carePlan,
    onStartHere,
    onDayOne,
    onCheckIn,
    onDailyPlan,
    onCarePlan,
    onConnectHealth,
  ]);

  if (!nextStep) return null;

  return (
    <AnimatedPressable style={styles.row} onPress={nextStep.onPress}>
      <Ionicons name={nextStep.icon} size={14} color={Colors.brand} />
      <Text style={styles.title} numberOfLines={1}>{nextStep.title}</Text>
      <Ionicons name="chevron-forward" size={14} color={Colors.textTertiary} />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  title: {
    flex: 1,
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: Colors.text,
  },
});
