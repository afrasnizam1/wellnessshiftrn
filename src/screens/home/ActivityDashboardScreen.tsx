// src/screens/home/ActivityDashboardScreen.tsx — iOS ActivityDashboardView parity
import React, { useCallback, useEffect, useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { format, parseISO } from 'date-fns';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppCard, ScreenHeader, ListRow, AnimatedPressable } from '../../components/ui';
import WeeklyBarChart from '../../components/activity/WeeklyBarChart';
import { healthKitService, getHealthPlatformName } from '../../services/healthkit';
import { useAppStore } from '../../store';
import type { DailyActivityPoint } from '../../types';
import {
  DAILY_STEP_GOAL,
  DEFAULT_ACTIVITY_GOALS,
  dailyGoalsAchieved,
  weekOverWeekChange,
} from '../../utils/activityHistoryHelpers';
import AppScreen from '../../components/common/AppScreen';

const METRICS: {
  key: keyof Pick<DailyActivityPoint, 'steps' | 'calories' | 'distanceKm' | 'exerciseMinutes'>;
  label: string;
  icon: string;
  color: string;
  format: (v: number) => string;
}[] = [
  { key: 'steps', label: 'Steps', icon: 'footsteps-outline', color: '#389EFA', format: (v) => v.toLocaleString() },
  { key: 'calories', label: 'Energy expended', icon: 'flame-outline', color: '#FF8561', format: (v) => `${v} kcal` },
  { key: 'distanceKm', label: 'Distance', icon: 'walk-outline', color: '#2EDBBD', format: (v) => `${v.toFixed(1)} km` },
  { key: 'exerciseMinutes', label: 'Move minutes', icon: 'timer-outline', color: '#946BFA', format: (v) => `${v} min` },
];

export default function ActivityDashboardScreen() {
  const navigation = useNavigation<any>();
  const { activity, setActivity } = useAppStore();
  const [weekHistory, setWeekHistory] = useState<DailyActivityPoint[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [healthConnected, setHealthConnected] = useState(false);

  const load = useCallback(async () => {
    const connected = await healthKitService.isConnected();
    setHealthConnected(connected);
    if (connected) {
      const [today, history] = await Promise.all([
        healthKitService.getTodayActivity(),
        healthKitService.getActivityHistory(7),
      ]);
      setActivity(today);
      setWeekHistory(history);
    } else {
      setWeekHistory(await healthKitService.getActivityHistory(7));
    }
  }, [setActivity]);

  useEffect(() => { load(); }, [load]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const goalsHit = dailyGoalsAchieved(weekHistory, DAILY_STEP_GOAL);
  const heartPoints = Math.round((activity?.exerciseMinutes ?? 0) * 2 + (activity?.steps ?? 0) / 500);
  const stepsWow = weekOverWeekChange([...weekHistory], 'steps', 7);
  const weekStart = weekHistory[0]?.date;
  const weekEnd = weekHistory[weekHistory.length - 1]?.date;

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <ScreenHeader
          title="Activity Dashboard"
          subtitle={`Synced from ${getHealthPlatformName()}`}
          onBack={() => navigation.goBack()}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionLabel}>INSIGHTS</Text>

        <AppCard style={styles.card}>
          <Text style={styles.cardTitle}>Your daily goals</Text>
          <Text style={styles.cardSub}>
            {goalsHit}/7 days with {DAILY_STEP_GOAL.toLocaleString()}+ steps
          </Text>
          <View style={styles.goalDots}>
            {weekHistory.map((d) => (
              <View
                key={d.date}
                style={[
                  styles.goalDot,
                  d.steps >= DAILY_STEP_GOAL ? styles.goalDotHit : styles.goalDotMiss,
                ]}
              >
                <Text style={styles.goalDotDay}>{format(parseISO(d.date), 'EEE').slice(0, 1)}</Text>
              </View>
            ))}
          </View>
        </AppCard>

        <AnimatedPressable onPress={() => navigation.navigate(Screen.tabAiInsights, { screen: Screen.aiHealthCoach })}>
          <AppCard style={styles.coachCard}>
            <ListRow
              title="AI Health Coach"
              subtitle="Ask about your activity and wellness goals"
              icon={<Ionicons name="sparkles" size={22} color={Colors.brand} />}
              iconBg="rgba(242, 77, 128, 0.12)"
              showDivider={false}
            />
          </AppCard>
        </AnimatedPressable>

        <AppCard style={styles.card}>
          <View style={styles.targetRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Your weekly target</Text>
              <Text style={styles.cardSub}>WHO recommends 150 heart points / week</Text>
              {weekStart && weekEnd && (
                <Text style={styles.dateRange}>
                  {format(parseISO(weekStart), 'd MMM')} – {format(parseISO(weekEnd), 'd MMM')}
                </Text>
              )}
            </View>
            <View style={styles.targetBadge}>
              <Text style={styles.targetValue}>{heartPoints}</Text>
              <Text style={styles.targetGoal}>/ 150</Text>
            </View>
          </View>
          {stepsWow != null && (
            <Text style={[styles.wowText, stepsWow >= 0 ? styles.wowUp : styles.wowDown]}>
              Steps {stepsWow >= 0 ? '↑' : '↓'} {Math.abs(stepsWow).toFixed(0)}% vs prior week
            </Text>
          )}
        </AppCard>

        <Text style={styles.sectionLabel}>DATA</Text>

        {!healthConnected && (
          <TouchableOpacity onPress={() => navigation.navigate(Screen.healthPermissions)}>
            <AppCard style={styles.banner}>
              <Text style={styles.bannerText}>
                Connect {getHealthPlatformName()} to see live activity from your iPhone and Apple Watch.
              </Text>
              <Text style={styles.bannerAction}>Connect now →</Text>
            </AppCard>
          </TouchableOpacity>
        )}

        {METRICS.map((m) => {
          const todayVal = m.key === 'steps'
            ? activity?.steps ?? 0
            : m.key === 'calories'
              ? activity?.calories ?? 0
              : m.key === 'distanceKm'
                ? activity?.distanceKm ?? 0
                : activity?.exerciseMinutes ?? 0;
          const hasWeekData = weekHistory.some((d) => (d[m.key] ?? 0) > 0);

          const card = (
            <AppCard key={m.key} style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <View style={[styles.metricIcon, { backgroundColor: m.color + '18' }]}>
                  <Ionicons name={m.icon as any} size={20} color={m.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.metricLabel}>{m.label}</Text>
                  <Text style={styles.metricToday}>{m.format(todayVal)} today</Text>
                </View>
                {m.key === 'steps' && (
                  <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
                )}
              </View>
              {hasWeekData ? (
                <WeeklyBarChart
                  data={weekHistory}
                  metric={m.key}
                  color={m.color}
                  goal={m.key === 'steps' ? DAILY_STEP_GOAL : undefined}
                />
              ) : (
                <Text style={styles.noData}>NO RECENT DATA</Text>
              )}
            </AppCard>
          );

          if (m.key === 'steps') {
            return (
              <AnimatedPressable key={m.key} onPress={() => navigation.navigate(Screen.stepsDetail)}>
                {card}
              </AnimatedPressable>
            );
          }
          return card;
        })}

        <View style={{ height: Spacing['3xl'] }} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.base },
  content: { padding: Spacing.base, gap: Spacing.md },
  sectionLabel: {
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: Colors.textTertiary,
    letterSpacing: 1,
    marginTop: Spacing.sm,
  },
  card: { gap: Spacing.sm },
  cardTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  cardSub: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  goalDots: { flexDirection: 'row', gap: 6, marginTop: Spacing.sm },
  goalDot: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 40,
  },
  goalDotHit: { backgroundColor: Colors.success + '33' },
  goalDotMiss: { backgroundColor: Colors.borderLight },
  goalDotDay: { fontSize: 10, fontWeight: '700', color: Colors.textSecondary },
  coachCard: { padding: 0, overflow: 'hidden' },
  targetRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  targetBadge: { alignItems: 'center' },
  targetValue: { fontSize: 28, fontWeight: '800', color: Colors.brand },
  targetGoal: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  dateRange: { fontSize: Typography.size.xs, color: Colors.textTertiary, marginTop: 4 },
  wowText: { fontSize: Typography.size.sm, fontWeight: '600', marginTop: Spacing.sm },
  wowUp: { color: Colors.success },
  wowDown: { color: Colors.error },
  banner: { backgroundColor: Colors.primaryLight, gap: Spacing.xs },
  bannerText: { fontSize: Typography.size.sm, color: Colors.primary },
  bannerAction: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.primary },
  metricCard: { gap: Spacing.md },
  metricHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricLabel: { fontSize: Typography.size.base, fontWeight: '600', color: Colors.text },
  metricToday: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  noData: {
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: Colors.textTertiary,
    letterSpacing: 0.5,
    textAlign: 'center',
    paddingVertical: Spacing.lg,
  },
});
