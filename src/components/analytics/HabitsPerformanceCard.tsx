import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import type { EngagementStats } from '../../services/analyticsService';

type Props = {
  stats: EngagementStats;
  planCompletionRate?: number | null;
};

const HABITS = [
  { key: 'checkIn', label: 'Daily check-in', icon: '✓' },
  { key: 'plan', label: 'Complete daily plan', icon: '✓' },
  { key: 'steps', label: 'Hit step goal', icon: '✓' },
  { key: 'mindfulness', label: 'Mindfulness session', icon: '✓' },
];

export default function HabitsPerformanceCard({ stats, planCompletionRate }: Props) {
  const rates = [
    Math.min(100, stats.checkInStreak * 14),
    planCompletionRate ?? stats.planCompletionRate ?? 0,
    Math.round((stats.checkInStreak / 14) * 100),
    Math.round(((stats.planCompletionRate ?? 0) / 100) * 80),
  ];

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Habits performance</Text>
      <Text style={styles.sub}>Based on the last 14 days</Text>
      {HABITS.map((habit, i) => {
        const pct = Math.min(100, Math.max(0, rates[i] ?? 0));
        return (
          <View key={habit.key} style={styles.row}>
            <Text style={styles.rowLabel}>{habit.label}</Text>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: `${pct}%` }]} />
            </View>
            <Text style={styles.pct}>{pct}%</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: Spacing.sm },
  title: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  sub: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginBottom: Spacing.xs },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  rowLabel: { width: 130, fontSize: Typography.size.sm, color: Colors.textSecondary },
  barTrack: {
    flex: 1, height: 8, borderRadius: 4, backgroundColor: Colors.borderLight, overflow: 'hidden',
  },
  barFill: { height: '100%', backgroundColor: Colors.success, borderRadius: 4 },
  pct: { width: 36, textAlign: 'right', fontSize: Typography.size.xs, fontWeight: '700', color: Colors.text },
});
