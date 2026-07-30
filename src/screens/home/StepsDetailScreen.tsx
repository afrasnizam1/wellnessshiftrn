import React, { useCallback, useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { ScreenHeader, SegmentedControl } from '../../components/ui';
import StepsMiniBars from '../../components/fitness/StepsMiniBars';
import DailyStepsRow from '../../components/fitness/DailyStepsRow';
import ActivityRingsCompact from '../../components/fitness/ActivityRingsCompact';
import { healthKitService } from '../../services/healthkit';
import { useAppStore } from '../../store';
import type { DailyActivityPoint } from '../../types';
import AppScreen from '../../components/common/AppScreen';

const ORANGE = '#FF9500';
const MOVE_GOAL = 600;
const EXERCISE_GOAL = 30;
const STAND_GOAL = 12;
const STEPS_GOAL = 10000;

const RANGE_OPTIONS = ['7 Days', '14 Days', '30 Days'] as const;

function estimateStandHours(steps: number): number {
  return Math.min(12, Math.max(0, Math.floor(steps / 500)));
}

export default function StepsDetailScreen() {
  const navigation = useNavigation<any>();
  const { activity, setActivity } = useAppStore();
  const [rangeLabel, setRangeLabel] = useState<(typeof RANGE_OPTIONS)[number]>('7 Days');
  const [history, setHistory] = useState<DailyActivityPoint[]>([]);
  const [weeklySteps, setWeeklySteps] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stepsUpdatedAt, setStepsUpdatedAt] = useState<string | null>(null);
  const [activityUpdatedAt, setActivityUpdatedAt] = useState<string | null>(null);

  const days = rangeLabel === '7 Days' ? 7 : rangeLabel === '14 Days' ? 14 : 30;

  const load = useCallback(async () => {
    const [today, hist, week] = await Promise.all([
      healthKitService.getTodayActivity(),
      healthKitService.getActivityHistory(days),
      healthKitService.getActivityHistory(7),
    ]);
    setActivity(today);
    setHistory(hist);
    setWeeklySteps(week.map((d) => d.steps));
    const now = format(new Date(), 'HH:mm');
    setStepsUpdatedAt(now);
    setActivityUpdatedAt(now);
  }, [days, setActivity]);

  useEffect(() => {
    setLoading(true);
    load().finally(() => setLoading(false));
  }, [load]);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const steps = activity?.steps ?? 0;
  const calories = activity?.calories ?? 0;
  const exercise = activity?.exerciseMinutes ?? 0;
  const standHours = estimateStandHours(steps);

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.navHeader}>
        <ScreenHeader
          title="Steps"
          onBack={() => navigation.goBack()}
          large={false}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pinnedHeader}>
          <Text style={styles.pinnedTitle}>Pinned</Text>
          <Text style={styles.editBtn}>Edit</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="walk-outline" size={16} color={ORANGE} />
            <Text style={styles.cardHeaderTitle}>Steps</Text>
            <View style={styles.cardHeaderSpacer} />
            {stepsUpdatedAt ? (
              <Text style={styles.cardTime}>{stepsUpdatedAt}</Text>
            ) : null}
            <Ionicons name="chevron-forward" size={12} color={Colors.textTertiary} />
          </View>
          <View style={styles.stepsBody}>
            <View style={styles.countBlock}>
              <Text style={styles.bigCount}>{steps.toLocaleString()}</Text>
              <Text style={styles.countLabel}>steps</Text>
            </View>
            <StepsMiniBars values={weeklySteps} width={90} height={44} />
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.dailyHeader}>
            <Ionicons name="walk-outline" size={16} color={ORANGE} />
            <Text style={styles.dailyTitle}>Daily Steps</Text>
          </View>

          <SegmentedControl
            options={[...RANGE_OPTIONS]}
            value={rangeLabel}
            onChange={(v) => setRangeLabel(v as (typeof RANGE_OPTIONS)[number])}
          />

          {loading && history.length === 0 ? (
            <ActivityIndicator color={Colors.primary} style={styles.loader} />
          ) : history.length === 0 ? (
            <Text style={styles.emptyText}>
              No step data available. Connect Apple Health to see your daily steps.
            </Text>
          ) : (
            <View style={styles.historyList}>
              {[...history].reverse().map((row, index) => (
                <View key={row.date}>
                  <DailyStepsRow date={row.date} steps={row.steps} goal={STEPS_GOAL} />
                  {index < history.length - 1 ? <View style={styles.divider} /> : null}
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="flame" size={16} color={ORANGE} />
            <Text style={styles.cardHeaderTitle}>Activity</Text>
            <View style={styles.cardHeaderSpacer} />
            {activityUpdatedAt ? (
              <Text style={styles.cardTime}>{activityUpdatedAt}</Text>
            ) : null}
            <Ionicons name="chevron-forward" size={12} color={Colors.textTertiary} />
          </View>

          <View style={styles.activityBody}>
            <View style={styles.activityMetrics}>
              <View style={styles.metricRow}>
                <Text style={[styles.metricLabel, { color: '#FF3B30' }]}>Move</Text>
                <Text style={styles.metricValue}>{calories.toLocaleString()}</Text>
                <Text style={styles.metricUnit}>kcal</Text>
              </View>
              <View style={styles.metricRow}>
                <Text style={[styles.metricLabel, { color: '#34C759' }]}>Exercise</Text>
                <Text style={styles.metricValue}>{exercise.toLocaleString()}</Text>
                <Text style={styles.metricUnit}>min</Text>
              </View>
              <View style={styles.metricRow}>
                <Text style={[styles.metricLabel, { color: '#007AFF' }]}>Stand</Text>
                <Text style={styles.metricValue}>{standHours.toLocaleString()}</Text>
                <Text style={styles.metricUnit}>hr</Text>
              </View>
            </View>
            <ActivityRingsCompact
              moveProgress={calories / MOVE_GOAL}
              exerciseProgress={exercise / EXERCISE_GOAL}
              standProgress={standHours / STAND_GOAL}
            />
          </View>
        </View>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  navHeader: { paddingHorizontal: Spacing.base },
  content: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing['3xl'],
    gap: Spacing.md,
  },
  pinnedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.sm,
  },
  pinnedTitle: {
    fontSize: Typography.size['2xl'],
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  editBtn: {
    fontSize: Typography.size.base,
    fontWeight: '500',
    color: Colors.primary,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    gap: Spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardHeaderTitle: {
    fontSize: Typography.size.base,
    fontWeight: '500',
    color: Colors.text,
  },
  cardHeaderSpacer: { flex: 1 },
  cardTime: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    marginRight: 4,
  },
  stepsBody: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 16,
  },
  countBlock: { flex: 1, gap: 4 },
  bigCount: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  countLabel: {
    fontSize: Typography.size.sm,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  dailyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dailyTitle: {
    fontSize: Typography.size.base,
    fontWeight: '600',
    color: Colors.text,
  },
  loader: { paddingVertical: Spacing.xl },
  emptyText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingVertical: Spacing.xl,
    lineHeight: 20,
  },
  historyList: { paddingVertical: 4 },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.borderLight,
    marginLeft: 48,
  },
  activityBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  activityMetrics: { flex: 1, gap: 6 },
  metricRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  metricLabel: { fontSize: Typography.size.sm, fontWeight: '500' },
  metricValue: { fontSize: Typography.size.xl, fontWeight: '600', color: Colors.text },
  metricUnit: { fontSize: Typography.size.sm, color: Colors.textSecondary },
});
