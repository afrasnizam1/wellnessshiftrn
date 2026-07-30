// src/screens/analytics/ProgressTrackingScreen.tsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LineChart, BarChart } from 'react-native-gifted-charts';
import { Colors, Typography, Spacing, Radius, WELLNESS_CATEGORIES } from '../../theme';
import { ScreenHeader, SegmentedControl, AnimatedPressable, CategoryIcon } from '../../components/ui';
import {
  BarChartTooltip,
  buildLinePointerConfig,
  ChartSelectionBanner,
  chartContentWidth,
  getCategoryMeta,
  scoreLabel,
  scoreLabelColor,
  shortCategoryLabel,
  chartTapA11yProps,
  trackChartCategoryTap,
} from '../../components/analytics';
import { useAppStore } from '../../store';
import { getProgressHistory } from '../../services/analyticsService';
import type { WellnessCategoryKey, WellnessScore } from '../../types';
import AppScreen from '../../components/common/AppScreen';

type Period = '7D' | '30D' | '90D';
type SummaryFocus = 'current' | 'change' | 'peak' | null;

const PERIOD_LABELS: Record<Period, string> = { '7D': '7 Days', '30D': '30 Days', '90D': '90 Days' };
const CHART_W = chartContentWidth();
const CSQ_SCREEN = 'Analytics - Progress';

export default function ProgressTrackingScreen() {
  const navigation = useNavigation<any>();
  const { user, wellnessScore } = useAppStore();
  const [period, setPeriod] = useState<Period>('7D');
  const [history, setHistory] = useState<WellnessScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDemoData, setIsDemoData] = useState(false);

  const [selectedPointIndex, setSelectedPointIndex] = useState(-1);
  const [selectedBarIndex, setSelectedBarIndex] = useState(-1);
  const [selectedCategory, setSelectedCategory] = useState<WellnessCategoryKey | null>(null);
  const [summaryFocus, setSummaryFocus] = useState<SummaryFocus>(null);

  useEffect(() => {
    loadHistory();
  }, [period, user?.uid, wellnessScore?.overall]);

  const loadHistory = async () => {
    setLoading(true);
    const days = period === '7D' ? 7 : period === '30D' ? 30 : 90;
    const result = await getProgressHistory(user?.uid, days, wellnessScore);
    setHistory(result.history);
    setIsDemoData(result.isDemoData);
    setLoading(false);
    setSelectedPointIndex(-1);
    setSelectedBarIndex(-1);
    setSelectedCategory(null);
    setSummaryFocus(null);
  };

  const selectCategory = useCallback((
    key: WellnessCategoryKey | null,
    barIndex = -1,
    options?: { chart?: string },
  ) => {
    if (key && options?.chart) {
      trackChartCategoryTap({ screen: CSQ_SCREEN, chart: options.chart }, key);
    }
    setSelectedCategory(key);
    setSelectedBarIndex(barIndex);
    setSummaryFocus(null);
  }, []);

  const trendData = history.map((h, i) => ({
    value: h.overall,
    label: period === '7D'
      ? ['M', 'T', 'W', 'T', 'F', 'S', 'S'][i % 7]
      : i % 5 === 0 ? `${i + 1}` : '',
    dataPointText: '',
  }));

  const catBarData = WELLNESS_CATEGORIES.map((cat, index) => ({
    value: wellnessScore?.categories?.[cat.key as WellnessCategoryKey] ?? 0,
    label: shortCategoryLabel(cat.label).substring(0, 5),
    frontColor: selectedBarIndex === index ? cat.color : cat.color + 'CC',
  }));

  const catScores = WELLNESS_CATEGORIES.map((cat) => ({
    ...cat,
    score: wellnessScore?.categories?.[cat.key as WellnessCategoryKey] ?? 0,
  }));
  const best = [...catScores].sort((a, b) => b.score - a.score).slice(0, 3);
  const worst = [...catScores].sort((a, b) => a.score - b.score).slice(0, 3);

  const firstScore = history[0]?.overall ?? wellnessScore?.overall ?? 0;
  const lastScore = history[history.length - 1]?.overall ?? wellnessScore?.overall ?? 0;
  const change = lastScore - firstScore;
  const peakScore = history.length > 0
    ? Math.max(...history.map((h) => h.overall))
    : lastScore;

  const trendPointerConfig = useMemo(
    () => buildLinePointerConfig((index, value) => ({
      title: period === '7D'
        ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index % 7]
        : `Point ${index + 1}`,
      value: value.toFixed(1),
      subtitle: `Wellness · ${PERIOD_LABELS[period]}`,
      color: scoreLabelColor(value),
    })),
    [period],
  );

  const selectionBanner = useMemo(() => {
    if (summaryFocus === 'current') {
      return (
        <ChartSelectionBanner
          title="Current Score"
          value={lastScore.toFixed(1)}
          subtitle={scoreLabel(lastScore)}
          hint="Your most recent wellness score from assessment and daily activity."
          color={scoreLabelColor(lastScore)}
          onClear={() => setSummaryFocus(null)}
        />
      );
    }
    if (summaryFocus === 'change') {
      return (
        <ChartSelectionBanner
          title={`Change (${PERIOD_LABELS[period]})`}
          value={`${change >= 0 ? '+' : ''}${change.toFixed(1)}`}
          subtitle={change >= 0 ? 'Improving trend' : 'Needs attention'}
          hint={`From ${firstScore.toFixed(1)} to ${lastScore.toFixed(1)} over ${PERIOD_LABELS[period].toLowerCase()}.`}
          color={change >= 0 ? Colors.success : Colors.error}
          onClear={() => setSummaryFocus(null)}
        />
      );
    }
    if (summaryFocus === 'peak') {
      return (
        <ChartSelectionBanner
          title="Peak Score"
          value={peakScore.toFixed(1)}
          subtitle="Best in period"
          hint={`Your highest wellness score in the last ${PERIOD_LABELS[period].toLowerCase()}.`}
          color={Colors.primary}
          onClear={() => setSummaryFocus(null)}
        />
      );
    }
    if (selectedPointIndex >= 0 && history[selectedPointIndex]) {
      const h = history[selectedPointIndex];
      return (
        <ChartSelectionBanner
          title={formatDateLabel(h.date, period)}
          value={h.overall.toFixed(1)}
          subtitle={scoreLabel(h.overall)}
          hint="Tap another point on the chart or clear to dismiss."
          color={scoreLabelColor(h.overall)}
          onClear={() => setSelectedPointIndex(-1)}
        />
      );
    }
    if (selectedCategory) {
      const meta = getCategoryMeta(selectedCategory);
      const score = wellnessScore?.categories?.[selectedCategory] ?? 0;
      return (
        <ChartSelectionBanner
          title={meta?.label ?? selectedCategory}
          value={`${score.toFixed(1)}/10`}
          subtitle={scoreLabel(score)}
          hint={
            worst.some((w) => w.key === selectedCategory)
              ? 'Listed in Focus Areas — prioritise daily plan tasks here.'
              : best.some((b) => b.key === selectedCategory)
                ? 'One of your strengths — maintain these habits.'
                : 'Tap bars or list items to compare categories.'
          }
          color={meta?.color ?? Colors.primary}
          onClear={() => selectCategory(null)}
        />
      );
    }
    return null;
  }, [
    summaryFocus,
    selectedPointIndex,
    selectedCategory,
    history,
    lastScore,
    change,
    firstScore,
    peakScore,
    period,
    wellnessScore,
    best,
    worst,
    selectCategory,
  ]);

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <ScreenHeader title="Progress Tracking" onBack={() => navigation.goBack()} />
        <SegmentedControl
          options={Object.values(PERIOD_LABELS)}
          value={PERIOD_LABELS[period]}
          onChange={(label) => {
            const next = (Object.entries(PERIOD_LABELS).find(([, v]) => v === label)?.[0] ?? '7D') as Period;
            setPeriod(next);
          }}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {selectionBanner}

        {isDemoData && (
          <View style={styles.demoBanner}>
            <Text style={styles.demoBannerText}>
              Sample trend data — complete check-ins and assessments to see your real progress.
            </Text>
          </View>
        )}

        <View style={styles.summaryRow}>
          <AnimatedPressable
            style={[styles.summaryCard, summaryFocus === 'current' && styles.summaryCardActive]}
            onPress={() => setSummaryFocus(summaryFocus === 'current' ? null : 'current')}
          >
            <Text style={styles.summaryLabel}>Current Score</Text>
            <Text style={styles.summaryValue}>{lastScore.toFixed(1)}</Text>
          </AnimatedPressable>
          <AnimatedPressable
            style={[styles.summaryCard, summaryFocus === 'change' && styles.summaryCardActive]}
            onPress={() => setSummaryFocus(summaryFocus === 'change' ? null : 'change')}
          >
            <Text style={styles.summaryLabel}>Change ({PERIOD_LABELS[period]})</Text>
            <Text style={[styles.summaryValue, { color: change >= 0 ? Colors.success : Colors.error }]}>
              {change >= 0 ? '+' : ''}{change.toFixed(1)}
            </Text>
          </AnimatedPressable>
          <AnimatedPressable
            style={[styles.summaryCard, summaryFocus === 'peak' && styles.summaryCardActive]}
            onPress={() => setSummaryFocus(summaryFocus === 'peak' ? null : 'peak')}
          >
            <Text style={styles.summaryLabel}>Peak Score</Text>
            <Text style={[styles.summaryValue, { color: Colors.primary }]}>
              {peakScore.toFixed(1)}
            </Text>
          </AnimatedPressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📈 Overall Wellness Trend</Text>
          <Text style={styles.chartHint}>Drag along the chart or tap a data point</Text>
          {loading ? (
            <ActivityIndicator color={Colors.primary} style={{ paddingVertical: Spacing.xl }} />
          ) : (
            <LineChart
              data={trendData}
              width={CHART_W}
              height={180}
              color={Colors.primary}
              thickness={2.5}
              dataPointsColor={Colors.primary}
              dataPointsRadius={5}
              xAxisLabelTextStyle={{ fontSize: 10, color: Colors.textSecondary }}
              yAxisTextStyle={{ fontSize: 10, color: Colors.textSecondary }}
              maxValue={10}
              noOfSections={5}
              rulesColor={Colors.borderLight}
              yAxisColor={Colors.border}
              xAxisColor={Colors.border}
              startFillColor={Colors.primary + '33'}
              endFillColor={Colors.primary + '00'}
              areaChart
              curved
              focusEnabled
              showDataPointOnFocus
              hideDataPoints={trendData.length > 20}
              pointerConfig={trendPointerConfig}
              getPointerProps={(p: { pointerIndex: number }) => {
                if (p.pointerIndex >= 0) {
                  setSelectedPointIndex(p.pointerIndex);
                  setSummaryFocus(null);
                  selectCategory(null);
                }
              }}
            />
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📊 Category Scores</Text>
          <Text style={styles.chartHint}>Tap a bar to inspect a category</Text>
          <BarChart
            data={catBarData}
            width={CHART_W}
            height={160}
            barWidth={20}
            spacing={10}
            roundedTop
            isAnimated
            hideRules
            xAxisThickness={1}
            yAxisThickness={0}
            xAxisColor={Colors.border}
            yAxisTextStyle={{ fontSize: 9, color: Colors.textSecondary }}
            xAxisLabelTextStyle={{ fontSize: 8, color: Colors.textSecondary }}
            maxValue={10}
            noOfSections={5}
            focusBarOnPress
            focusedBarIndex={selectedBarIndex >= 0 ? selectedBarIndex : undefined}
            onPress={(_item: { value: number }, index: number) => {
              const key = WELLNESS_CATEGORIES[index]?.key as WellnessCategoryKey;
              if (selectedBarIndex === index) selectCategory(null);
              else selectCategory(key, index, { chart: 'Category Scores' });
            }}
            renderTooltip={(item: { value: number }, index: number) => (
              <BarChartTooltip
                label={shortCategoryLabel(WELLNESS_CATEGORIES[index]?.label ?? '')}
                value={item.value}
                color={WELLNESS_CATEGORIES[index]?.color ?? Colors.primary}
              />
            )}
          />
        </View>

        <View style={styles.row2col}>
          <View style={[styles.card, { flex: 1 }]}>
            <Text style={styles.cardTitle}>Strengths</Text>
            {best.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              return (
                <AnimatedPressable
                  key={cat.key}
                  style={[styles.catRow, isSelected && { backgroundColor: cat.color + '15' }]}
                  onPress={() => {
                    const idx = WELLNESS_CATEGORIES.findIndex((c) => c.key === cat.key);
                    if (isSelected) selectCategory(null);
                    else selectCategory(cat.key as WellnessCategoryKey, idx, { chart: 'Strengths' });
                  }}
                  {...chartTapA11yProps(
                    { screen: CSQ_SCREEN, chart: 'Strengths' },
                    cat.key as WellnessCategoryKey,
                  )}
                >
                  <CategoryIcon
                    categoryKey={cat.key as WellnessCategoryKey}
                    color={cat.color}
                    size="sm"
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.catLabel, isSelected && { color: cat.color, fontWeight: '700' }]}>
                      {cat.label.split(' ')[0]}
                    </Text>
                    <View style={styles.miniBarTrack}>
                      <View style={[styles.miniBarFill, { width: `${cat.score * 10}%`, backgroundColor: cat.color }]} />
                    </View>
                  </View>
                  <Text style={[styles.catScore, { color: Colors.success }]}>{cat.score.toFixed(1)}</Text>
                </AnimatedPressable>
              );
            })}
          </View>

          <View style={[styles.card, { flex: 1 }]}>
            <Text style={styles.cardTitle}>Focus areas</Text>
            {worst.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              return (
                <AnimatedPressable
                  key={cat.key}
                  style={[styles.catRow, isSelected && { backgroundColor: cat.color + '15' }]}
                  onPress={() => {
                    const idx = WELLNESS_CATEGORIES.findIndex((c) => c.key === cat.key);
                    if (isSelected) selectCategory(null);
                    else selectCategory(cat.key as WellnessCategoryKey, idx, { chart: 'Focus Areas' });
                  }}
                  {...chartTapA11yProps(
                    { screen: CSQ_SCREEN, chart: 'Focus Areas' },
                    cat.key as WellnessCategoryKey,
                  )}
                >
                  <CategoryIcon
                    categoryKey={cat.key as WellnessCategoryKey}
                    color={cat.color}
                    size="sm"
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.catLabel, isSelected && { color: cat.color, fontWeight: '700' }]}>
                      {cat.label.split(' ')[0]}
                    </Text>
                    <View style={styles.miniBarTrack}>
                      <View style={[styles.miniBarFill, { width: `${cat.score * 10}%`, backgroundColor: cat.color }]} />
                    </View>
                  </View>
                  <Text style={[styles.catScore, { color: Colors.error }]}>{cat.score.toFixed(1)}</Text>
                </AnimatedPressable>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>💡 Insights</Text>
          {[
            change > 0 ? `Your wellness score improved by ${change.toFixed(1)} points over the past ${PERIOD_LABELS[period].toLowerCase()}.` : `Keep completing daily tasks to improve your score.`,
            worst[0] ? `${worst[0].label} is your biggest opportunity — focus here for the fastest gains.` : '',
            best[0] ? `${best[0].label} is your strongest category — keep it up!` : '',
          ].filter(Boolean).map((insight, i) => (
            <TouchableOpacity
              key={i}
              style={styles.insightRow}
              onPress={() => {
                if (i === 1 && worst[0]) {
                  const idx = WELLNESS_CATEGORIES.findIndex((c) => c.key === worst[0].key);
                  selectCategory(worst[0].key as WellnessCategoryKey, idx, { chart: 'Insights' });
                } else if (i === 2 && best[0]) {
                  const idx = WELLNESS_CATEGORIES.findIndex((c) => c.key === best[0].key);
                  selectCategory(best[0].key as WellnessCategoryKey, idx, { chart: 'Insights' });
                }
              }}
            >
              <View style={styles.insightDot} />
              <Text style={styles.insightText}>{insight}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </AppScreen>
  );
}

function formatDateLabel(iso: string, period: Period): string {
  try {
    const d = new Date(iso);
    if (period === '7D') return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch {
    return 'Data point';
  }
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.base, gap: Spacing.md, paddingBottom: Spacing.sm },
  content: { padding: Spacing.base, gap: Spacing.md },

  demoBanner: {
    backgroundColor: Colors.info + '18',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.info + '40',
  },
  demoBannerText: {
    fontSize: Typography.size.sm,
    color: Colors.info,
    fontWeight: '500',
    textAlign: 'center',
  },

  summaryCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  summaryCardActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  summaryLabel: { fontSize: 10, color: Colors.textSecondary, textAlign: 'center' },
  summaryValue: { fontSize: Typography.size.xl, fontWeight: '700', color: Colors.text },

  summaryRow: { flexDirection: 'row', gap: Spacing.sm },

  card: { backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: Spacing.base, gap: Spacing.md },
  cardTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text, letterSpacing: -0.3 },
  chartHint: { fontSize: Typography.size.xs, color: Colors.textTertiary, marginTop: -Spacing.sm },

  row2col: { flexDirection: 'row', gap: Spacing.sm },

  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: Radius.sm,
  },
  catLabel: { fontSize: Typography.size.xs, color: Colors.text, fontWeight: '500' },
  miniBarTrack: { height: 4, backgroundColor: Colors.borderLight, borderRadius: 2, overflow: 'hidden', marginTop: 2 },
  miniBarFill: { height: '100%', borderRadius: 2 },
  catScore: { fontSize: Typography.size.xs, fontWeight: '700', width: 28, textAlign: 'right' },

  insightRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm, paddingVertical: 4 },
  insightDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary, marginTop: 6 },
  insightText: { flex: 1, fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
});
