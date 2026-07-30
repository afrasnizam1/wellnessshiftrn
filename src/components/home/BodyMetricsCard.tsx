import React, { useMemo, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Shadow } from '../../theme';
import { AppCard, AnimatedPressable } from '../ui';
import { computeBodyDayMetrics, type BodyDayMetrics } from '../../services/bodyMetricsService';
import type { ActivitySnapshot } from '../../types';

type Props = {
  activity: ActivitySnapshot | null;
  onPress?: () => void;
  onConnectHealth?: () => void;
  healthConnected?: boolean;
};

function bandColor(band: BodyDayMetrics['recoveryBand'], kind: 'recovery' | 'strain') {
  if (kind === 'recovery') {
    if (band === 'optimal' || band === 'high') return Colors.success;
    if (band === 'moderate') return Colors.warning;
    return Colors.error;
  }
  if (band === 'high') return Colors.warning;
  if (band === 'moderate') return Colors.primary;
  return Colors.fitness;
}

export default memo(function BodyMetricsCard({
  activity,
  onPress,
  onConnectHealth,
  healthConnected,
}: Props) {
  const metrics = useMemo(() => computeBodyDayMetrics(activity), [activity]);
  const recoveryColor = bandColor(metrics.recoveryBand, 'recovery');
  const strainColor = bandColor(metrics.strainBand, 'strain');
  const empty = metrics.recoveryScore === 0 && !metrics.hasHealthSleep && !metrics.hasActivity;

  const content = (
    <AppCard style={styles.card}>
      <View style={styles.headerRow}>
        <View style={[styles.iconWrap, { backgroundColor: Colors.primaryLight }]}>
          <Ionicons name="fitness-outline" size={18} color={Colors.primary} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.eyebrow}>Body metrics</Text>
          <Text style={styles.title}>Recovery · Strain · Sleep</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
      </View>

      {empty ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>
            Sync Apple Health / Apple Watch to unlock last-night sleep, recovery, and strain —
            the same signals that move your wellness score and biological age.
          </Text>
          {onConnectHealth && !healthConnected ? (
            <AnimatedPressable style={styles.connectBtn} onPress={onConnectHealth}>
              <Text style={styles.connectText}>Connect Apple Health</Text>
            </AnimatedPressable>
          ) : null}
        </View>
      ) : (
        <>
          <View style={styles.metricsRow}>
            <View style={styles.metric}>
              <Text style={[styles.metricValue, { color: recoveryColor }]}>
                {metrics.recoveryScore || '—'}
              </Text>
              <Text style={styles.metricLabel}>Recovery</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.metric}>
              <Text style={[styles.metricValue, { color: strainColor }]}>
                {metrics.strainScore.toFixed(1)}
              </Text>
              <Text style={styles.metricLabel}>Strain</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.metric}>
              <Text style={styles.metricValueMuted}>
                {metrics.hasHealthSleep ? `${metrics.sleepHours}h` : '—'}
              </Text>
              <Text style={styles.metricLabel}>Sleep</Text>
            </View>
          </View>
          <Text style={styles.summary}>{metrics.recoverySummary}</Text>
        </>
      )}
    </AppCard>
  );

  if (onPress) {
    return (
      <AnimatedPressable onPress={onPress} accessibilityRole="button">
        {content}
      </AnimatedPressable>
    );
  }
  return content;
});

const styles = StyleSheet.create({
  card: {
    gap: Spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.glassBorder,
    ...Shadow.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: { flex: 1, gap: 2 },
  eyebrow: {
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: Typography.size.base,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.2,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  metric: { flex: 1, alignItems: 'center', gap: 2 },
  metricValue: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    letterSpacing: -1,
  },
  metricValueMuted: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    letterSpacing: -1,
    color: Colors.text,
  },
  metricLabel: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    backgroundColor: Colors.borderLight,
  },
  summary: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  emptyBox: { gap: Spacing.sm },
  emptyText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  connectBtn: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.xs,
  },
  connectText: {
    fontSize: Typography.size.sm,
    fontWeight: '700',
    color: Colors.primary,
  },
});
