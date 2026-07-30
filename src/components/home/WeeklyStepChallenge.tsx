import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius } from '../../theme';

interface Props {
  weeklySteps: number;
  goal?: number;
}

export default function WeeklyStepChallenge({ weeklySteps, goal = 50000 }: Props) {
  const progress = Math.min(weeklySteps / goal, 1);
  const pct = Math.round(progress * 100);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="footsteps" size={16} color={Colors.primary} />
          <Text style={styles.title}>Weekly Step Challenge</Text>
        </View>
        <Text style={styles.count}>
          {Math.round(weeklySteps).toLocaleString()} / {goal.toLocaleString()}
        </Text>
      </View>
      <View style={styles.track}>
        <LinearGradient
          colors={['#007AFF', '#389EFA', '#2EDBBD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.fill, { width: `${pct}%` }]}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.hint}>
          {progress >= 1 ? '🎉 Goal hit! Great work.' : `${pct}% complete — keep going!`}
        </Text>
        <Text style={styles.pct}>{pct}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  title: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.text },
  count: { fontSize: Typography.size.xs, fontWeight: '700', color: Colors.textSecondary },
  track: { height: 10, backgroundColor: Colors.border, borderRadius: 5, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 5 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  hint: { fontSize: Typography.size.xs, color: Colors.textSecondary, fontWeight: '500' },
  pct: { fontSize: Typography.size.xs, fontWeight: '800', color: Colors.primary },
});
