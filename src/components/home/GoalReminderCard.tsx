// src/components/home/GoalReminderCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { AnimatedPressable } from '../ui';
import { GOAL_REMINDER_ACTIONS, type PrimaryGoal } from '../../data/onboardingGoals';

interface Props {
  goal: PrimaryGoal;
}

export default function GoalReminderCard({ goal }: Props) {
  const navigation = useNavigation<any>();
  const action = GOAL_REMINDER_ACTIONS[goal] ?? GOAL_REMINDER_ACTIONS.general;

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
