import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import type { DailyPlan, WellnessScore } from '../../types';
import type { IoniconName } from '../../theme/icons';

type Props = {
  streak: number;
  dailyPlan: DailyPlan | null;
  wellnessScore: WellnessScore | null;
  previousScore?: number | null;
  /** Hide streak pill when a dedicated streak card is already shown above. */
  hideStreak?: boolean;
};

type Signal = { icon: IoniconName; label: string; color: string };

export default function ProgressSignals({ streak, dailyPlan, wellnessScore, previousScore, hideStreak }: Props) {
  const signals: Signal[] = [];

  if (streak > 0 && !hideStreak) {
    signals.push({
      icon: 'flame-outline',
      label: `${streak}-day streak`,
      color: Colors.warning,
    });
  }

  if (dailyPlan && dailyPlan.tasks.length > 0) {
    const pct = Math.round((dailyPlan.completedCount / dailyPlan.tasks.length) * 100);
    if (pct > 0) {
      signals.push({
        icon: 'checkmark-circle-outline',
        label: `${pct}% plan done`,
        color: Colors.success,
      });
    }
  }

  if (wellnessScore && previousScore != null) {
    const delta = wellnessScore.overall - previousScore;
    if (Math.abs(delta) >= 0.1) {
      signals.push({
        icon: delta >= 0 ? 'trending-up-outline' : 'trending-down-outline',
        label: `${delta >= 0 ? '+' : ''}${delta.toFixed(1)} score`,
        color: delta >= 0 ? Colors.success : Colors.error,
      });
    }
  }

  if (signals.length === 0) return null;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {signals.map((s) => (
        <View key={s.label} style={[styles.pill, { backgroundColor: s.color + '14' }]}>
          <Ionicons name={s.icon as keyof typeof Ionicons.glyphMap} size={14} color={s.color} />
          <Text style={[styles.label, { color: s.color }]}>{s.label}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: Spacing.sm, paddingVertical: Spacing.xs },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
  },
  label: { fontSize: Typography.size.sm, fontWeight: '700' },
});
