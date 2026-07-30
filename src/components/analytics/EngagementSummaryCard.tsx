import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import CheckInHeatmap from './CheckInHeatmap';
import type { EngagementStats } from '../../services/analyticsService';

type Props = {
  stats: EngagementStats;
};

export default function EngagementSummaryCard({ stats }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.metricsRow}>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{stats.checkInStreak}</Text>
          <Text style={styles.metricLabel}>Day streak</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.metric}>
          <Text style={styles.metricValue}>
            {stats.planCompletionRate != null ? `${stats.planCompletionRate}%` : '—'}
          </Text>
          <Text style={styles.metricLabel}>Plan completion</Text>
          <Text style={styles.metricSub}>Last 14 days</Text>
        </View>
      </View>
      <Text style={styles.heatmapTitle}>Check-in activity</Text>
      <CheckInHeatmap dates={stats.checkInDates} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: Spacing.md },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  metric: { flex: 1, alignItems: 'center', gap: 2 },
  metricValue: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  metricLabel: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  metricSub: {
    fontSize: 10,
    color: Colors.textTertiary,
  },
  divider: {
    width: 1,
    height: 48,
    backgroundColor: Colors.borderLight,
    marginHorizontal: Spacing.sm,
  },
  heatmapTitle: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.text,
  },
});
