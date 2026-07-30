import React, { useEffect, useMemo, useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, ScrollView, ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LineChart } from 'react-native-gifted-charts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius, WELLNESS_CATEGORIES } from '../../theme';
import { ScreenHeader, AppCard, AnimatedPressable } from '../../components/ui';
import {
  buildCategoryHistorySeries,
  getProgressHistory,
} from '../../services/analyticsService';
import {
  buildLinePointerConfig,
  chartContentWidth,
  scoreLabel,
  scoreLabelColor,
} from '../../components/analytics';
import { useAppStore } from '../../store';
import type { WellnessCategoryKey, WellnessScore } from '../../types';
import AppScreen from '../../components/common/AppScreen';

const CHART_W = chartContentWidth();

export default function CategoryDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const category = route.params?.category as WellnessCategoryKey;
  const { user, wellnessScore } = useAppStore();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<{ value: number; label: string }[]>([]);
  const [scoreHistory, setScoreHistory] = useState<WellnessScore[]>([]);

  const meta = WELLNESS_CATEGORIES.find((c) => c.key === category);
  const score = wellnessScore?.categories?.[category] ?? 0;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getProgressHistory(user?.uid, 30, wellnessScore);
      setScoreHistory(result.history);
      setHistory(buildCategoryHistorySeries(result.history, category));
      setLoading(false);
    })();
  }, [user?.uid, category, wellnessScore]);

  const insights = useMemo(() => {
    const lines: string[] = [];
    if (score < 5) {
      lines.push(`${meta?.label} is a priority focus area — small daily habits will help most.`);
    } else if (score < 7) {
      lines.push(`You're making progress in ${meta?.label?.toLowerCase()} — consistency is key.`);
    } else {
      lines.push(`${meta?.label} is a strength — maintain your current routines.`);
    }
    if (scoreHistory.length >= 2) {
      const first = scoreHistory[0].categories[category] ?? 0;
      const last = scoreHistory[scoreHistory.length - 1].categories[category] ?? 0;
      const delta = last - first;
      if (delta > 0.2) lines.push(`Up ${delta.toFixed(1)} points over the last 30 days.`);
      else if (delta < -0.2) lines.push(`Down ${Math.abs(delta).toFixed(1)} points — revisit your daily plan tasks.`);
    }
    lines.push('Explore related modules in Fitness Hub to improve this category.');
    return lines;
  }, [score, meta, scoreHistory, category]);

  const pointerConfig = useMemo(
    () => buildLinePointerConfig((index, value) => ({
      title: history[index]?.label || `Day ${index + 1}`,
      value: value.toFixed(1),
      subtitle: meta?.label ?? category,
      color: meta?.color ?? Colors.primary,
    })),
    [history, meta, category],
  );

  if (!meta) {
    return (
      <AppScreen style={styles.safe}>
        <ScreenHeader title="Category" onBack={() => navigation.goBack()} />
        <Text style={styles.error}>Category not found.</Text>
      </AppScreen>
    );
  }

  return (
    <AppScreen style={styles.safe}>
      <ScreenHeader title={meta.label} onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppCard style={styles.hero}>
          <Text style={styles.heroIcon}>{meta.icon}</Text>
          <Text style={[styles.heroScore, { color: scoreLabelColor(score) }]}>
            {score.toFixed(1)}
          </Text>
          <Text style={styles.heroStatus}>{scoreLabel(score)}</Text>
          <Text style={styles.heroSub}>out of 10</Text>
        </AppCard>

        <AppCard>
          <Text style={styles.sectionTitle}>30-day trend</Text>
          {loading ? (
            <ActivityIndicator color={meta.color} style={{ marginVertical: Spacing.xl }} />
          ) : history.length > 0 ? (
            <LineChart
              data={history}
              width={CHART_W}
              height={180}
              color={meta.color}
              thickness={2.5}
              dataPointsRadius={4}
              dataPointsColor={meta.color}
              maxValue={10}
              noOfSections={5}
              rulesColor={Colors.borderLight}
              yAxisTextStyle={{ fontSize: 10, color: Colors.textSecondary }}
              xAxisLabelTextStyle={{ fontSize: 9, color: Colors.textSecondary }}
              curved
              areaChart
              startFillColor={meta.color + '33'}
              endFillColor={meta.color + '00'}
              pointerConfig={pointerConfig}
            />
          ) : (
            <Text style={styles.empty}>Complete check-ins and daily plans to build history.</Text>
          )}
        </AppCard>

        <AppCard>
          <Text style={styles.sectionTitle}>Insights</Text>
          {insights.slice(0, 3).map((line) => (
            <View key={line} style={styles.insightRow}>
              <View style={[styles.insightDot, { backgroundColor: meta.color }]} />
              <Text style={styles.insightText}>{line}</Text>
            </View>
          ))}
        </AppCard>

        <AnimatedPressable
          style={styles.linkCard}
          onPress={() => navigation.navigate(Screen.tabFitness, { screen: Screen.fitnessHub })}
        >
          <Ionicons name="barbell-outline" size={22} color={Colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.linkTitle}>Explore Fitness Hub modules</Text>
            <Text style={styles.linkSub}>Find workouts and tools for {meta.label.toLowerCase()}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
        </AnimatedPressable>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, gap: Spacing.md },
  error: { textAlign: 'center', marginTop: Spacing.xl, color: Colors.textSecondary },
  hero: { alignItems: 'center', paddingVertical: Spacing.xl, gap: Spacing.xs },
  heroIcon: { fontSize: 40 },
  heroScore: { fontSize: Typography.size['4xl'], fontWeight: '800', letterSpacing: -1 },
  heroStatus: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text },
  heroSub: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  sectionTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text, marginBottom: Spacing.sm },
  empty: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center', paddingVertical: Spacing.lg },
  insightRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.sm },
  insightDot: { width: 8, height: 8, borderRadius: 4, marginTop: 6 },
  insightText: { flex: 1, fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.base,
  },
  linkTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  linkSub: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
});
