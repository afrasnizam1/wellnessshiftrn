// src/screens/analytics/AnalyticsDashboardScreen.tsx
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LineChart, BarChart, PieChart } from 'react-native-gifted-charts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius, WELLNESS_CATEGORIES } from '../../theme';
import { AppCard, ScreenHeader, SegmentedControl, ListRow, AnimatedPressable, IconBadge, CategoryIcon } from '../../components/ui';
import {
  BarChartTooltip,
  buildLinePointerConfig,
  ChartSelectionBanner,
  chartContentWidth,
  CollapsibleChartHeader,
  getCategoryMeta,
  scoreLabel,
  scoreLabelColor,
  shortCategoryLabel,
  CategoryRadarChart,
  ThreeDPieChart,
  TwoDPieChart,
  EngagementSummaryCard,
  chartTapA11yProps,
  trackChartCategoryTap,
} from '../../components/analytics';
import { useAppStore } from '../../store';
import {
  buildCategoryTrendSeries,
  getActivityForDashboard,
  getDashboardTrend,
  getEngagementStats,
  type EngagementStats,
} from '../../services/analyticsService';
import {
  analyticsCustomizationStorage,
  DEFAULT_ANALYTICS_CUSTOMIZATION,
  type AnalyticsCustomization,
} from '../../services/analyticsCustomizationStorage';
import AnalyticsCustomizationModal from '../../components/analytics/AnalyticsCustomizationModal';
import HabitsPerformanceCard from '../../components/analytics/HabitsPerformanceCard';
import { healthKitService, getHealthPlatformName } from '../../services/healthkit';
import ActivityRing from '../../components/analytics/ActivityRing';
import WeeklyBarChart from '../../components/activity/WeeklyBarChart';
import { DEFAULT_ACTIVITY_GOALS, weekOverWeekChange } from '../../utils/activityHistoryHelpers';
import type { DailyActivityPoint, WellnessCategoryKey, WellnessScore } from '../../types';
import { format } from 'date-fns';
import AppScreen from '../../components/common/AppScreen';

type AnalyticsTab = 'Overview' | 'Health' | 'Trends' | 'Insights';
const TABS: AnalyticsTab[] = ['Overview', 'Health', 'Trends', 'Insights'];
const TREND_KEYS: WellnessCategoryKey[] = WELLNESS_CATEGORIES.map((c) => c.key as WellnessCategoryKey);
const PRIMARY_TREND_KEYS: WellnessCategoryKey[] = ['physical', 'nutrition', 'mental'];
const CHART_W = chartContentWidth();
const CSQ_SCREEN = 'Analytics - Dashboard';

function lighten(hex: string, amt = 0.5) {
  const m = hex.replace('#', '');
  if (m.length < 6) return hex;
  const r = parseInt(m.substring(0, 2), 16);
  const g = parseInt(m.substring(2, 4), 16);
  const b = parseInt(m.substring(4, 6), 16);
  const f = (c: number) =>
    Math.round(c + (255 - c) * amt)
      .toString(16)
      .padStart(2, '0');
  return `#${f(r)}${f(g)}${f(b)}`;
}

export default function AnalyticsDashboardScreen() {
  const navigation = useNavigation<any>();
  const { user, wellnessScore, activity, setActivity } = useAppStore();
  const [activeTab, setActiveTab] = useState<AnalyticsTab>('Overview');
  const [trendData, setTrendData] = useState<{ value: number }[]>(
    () => Array.from({ length: 7 }, () => ({ value: 3.3 })),
  );
  const [dayLabels, setDayLabels] = useState<string[]>(
    () => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  );
  const [categoryTrends, setCategoryTrends] = useState<
    { key: WellnessCategoryKey; label: string; data: { value: number }[]; color: string }[]
  >([]);

  const [selectedCategory, setSelectedCategory] = useState<WellnessCategoryKey | null>(null);
  const [selectedPieIndex, setSelectedPieIndex] = useState(-1);
  const [selectedBarIndex, setSelectedBarIndex] = useState(-1);
  const [selectedTrendIndex, setSelectedTrendIndex] = useState(-1);
  const [selectedHealthKey, setSelectedHealthKey] = useState<string | null>(null);
  const [visibleTrendKeys, setVisibleTrendKeys] = useState<WellnessCategoryKey[]>([...PRIMARY_TREND_KEYS]);
  const [explorerCategory, setExplorerCategory] = useState<WellnessCategoryKey>('physical');
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [activityHistory, setActivityHistory] = useState<DailyActivityPoint[]>([]);
  const [fourteenDayHistory, setFourteenDayHistory] = useState<DailyActivityPoint[]>([]);
  const [monthTrendData, setMonthTrendData] = useState<{ value: number }[]>([]);
  const [monthLabels, setMonthLabels] = useState<string[]>([]);
  const [wellnessHistory, setWellnessHistory] = useState<WellnessScore[]>([]);
  const [engagement, setEngagement] = useState<EngagementStats>({
    checkInStreak: 0,
    planCompletionRate: null,
    checkInDates: [],
  });
  const [customization, setCustomization] = useState<AnalyticsCustomization>(
    DEFAULT_ANALYTICS_CUSTOMIZATION,
  );
  const [showCustomize, setShowCustomize] = useState(false);

  const toggleCollapse = (key: string) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectCategory = useCallback((
    key: WellnessCategoryKey | null,
    options?: { chart?: string },
  ) => {
    if (key && options?.chart) {
      trackChartCategoryTap({ screen: CSQ_SCREEN, chart: options.chart }, key);
    }
    setSelectedCategory(key);
    setSelectedHealthKey(null);
    if (key) {
      const idx = WELLNESS_CATEGORIES.findIndex((c) => c.key === key);
      setSelectedPieIndex(idx);
      setSelectedBarIndex(idx);
    } else {
      setSelectedPieIndex(-1);
      setSelectedBarIndex(-1);
    }
  }, []);

  useEffect(() => {
    analyticsCustomizationStorage.get().then(setCustomization);
  }, []);

  useEffect(() => {
    if (!user) return;
    getDashboardTrend(user.uid, 7).then((history) => {
      const ordered = history.length > 0
        ? history
        : wellnessScore
          ? [wellnessScore]
          : [];

      if (ordered.length === 0) {
        const fallback = wellnessScore?.overall ?? 3.3;
        setTrendData(Array.from({ length: 7 }, () => ({ value: fallback })));
        setDayLabels(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
        setCategoryTrends([]);
        return;
      }

      setTrendData(ordered.map((s) => ({ value: s.overall })));
      setDayLabels(ordered.map((s) => format(new Date(s.date), 'EEE')));

      const series = buildCategoryTrendSeries(ordered, PRIMARY_TREND_KEYS);
      setCategoryTrends(
        series.map((s, i) => ({
          ...s,
          color: [Colors.physical, Colors.nutrition, Colors.mental][i],
        })),
      );
    });
  }, [user?.uid, wellnessScore?.overall]);

  useEffect(() => {
    if (!user) return;
    getDashboardTrend(user.uid, 30).then((history) => {
      setWellnessHistory(history);
      if (history.length === 0) return;
      setMonthTrendData(history.map((s) => ({ value: s.overall })));
      setMonthLabels(history.map((s) => format(new Date(s.date), history.length <= 7 ? 'EEE' : 'd')));
    });
    getEngagementStats(user.uid).then(setEngagement);
  }, [user?.uid]);

  useEffect(() => {
    if (activity) return;
    getActivityForDashboard().then((snapshot) => {
      if (snapshot) setActivity(snapshot);
    });
  }, [activity, setActivity]);

  useEffect(() => {
    healthKitService.getActivityHistory(7).then(setActivityHistory).catch(() => {});
    healthKitService.getActivityHistory(14).then(setFourteenDayHistory).catch(() => {});
  }, [activity?.steps]);

  const overall = wellnessScore?.overall ?? 3.3;
  const categories = wellnessScore?.categories;

  const pieData = useMemo(
    () => WELLNESS_CATEGORIES.map((cat, index) => ({
      value: categories?.[cat.key as WellnessCategoryKey] ?? 0,
      color: cat.color,
      gradientCenterColor: lighten(cat.color, 0.55),
      text: cat.label.split(' ')[0],
      focused: selectedPieIndex === index,
      onPress: () => {
        const key = cat.key as WellnessCategoryKey;
        if (selectedPieIndex === index) selectCategory(null);
        else selectCategory(key, { chart: 'Score Distribution' });
      },
    })),
    [categories, selectedPieIndex, selectCategory],
  );

  const barData = useMemo(
    () => WELLNESS_CATEGORIES.map((cat, index) => ({
      value: categories?.[cat.key as WellnessCategoryKey] ?? 0,
      label: shortCategoryLabel(cat.label).substring(0, 6),
      frontColor: selectedBarIndex === index ? cat.color : cat.color + 'CC',
      topLabelComponent: () => (
        selectedBarIndex === index ? (
          <Text style={styles.barTopLabel}>{(categories?.[cat.key as WellnessCategoryKey] ?? 0).toFixed(1)}</Text>
        ) : null
      ),
    })),
    [categories, selectedBarIndex],
  );

  const trendPointerConfig = useMemo(
    () => buildLinePointerConfig((index, value) => ({
      title: dayLabels[index] ?? `Day ${index + 1}`,
      value: value.toFixed(1),
      subtitle: 'Overall wellness',
      color: Colors.primary,
    })),
    [dayLabels],
  );

  const physicalTrend = visibleTrendKeys.includes('physical') ? categoryTrends[0]?.data : undefined;
  const nutritionTrend = visibleTrendKeys.includes('nutrition') ? categoryTrends[1]?.data : undefined;
  const mentalTrend = visibleTrendKeys.includes('mental') ? categoryTrends[2]?.data : undefined;

  const toggleTrendSeries = (key: WellnessCategoryKey) => {
    setVisibleTrendKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const openCategoryDetail = (key: WellnessCategoryKey) => {
    navigation.navigate(Screen.categoryDetail, { category: key });
  };

  const explorerTrend = useMemo(() => {
    const history = wellnessHistory.length > 0 ? wellnessHistory : [];
    if (history.length === 0) return [];
    return buildCategoryTrendSeries(history, [explorerCategory])[0]?.data ?? [];
  }, [wellnessHistory, explorerCategory]);

  const explorerLabels = useMemo(() => {
    const history = wellnessHistory.length > 0 ? wellnessHistory : [];
    return history.map((s) => format(new Date(s.date), history.length <= 7 ? 'EEE' : 'd'));
  }, [wellnessHistory]);

  const selectionBanner = useMemo(() => {
    if (selectedHealthKey && activity) {
      const map: Record<string, { label: string; value: string; unit: string; hint: string }> = {
        steps: {
          label: 'Steps today',
          value: activity.steps?.toLocaleString() ?? '0',
          unit: 'steps',
          hint: 'Synced from Apple Health or Health Connect. Tap refresh on Home to update.',
        },
        calories: {
          label: 'Active calories',
          value: activity.calories?.toLocaleString() ?? '0',
          unit: 'kcal',
          hint: 'Energy burned through activity today.',
        },
        exercise: {
          label: 'Exercise time',
          value: String(activity.exerciseMinutes ?? 0),
          unit: 'min',
          hint: 'Recorded exercise sessions from your connected health apps.',
        },
        distance: {
          label: 'Distance',
          value: (activity.distanceKm ?? 0).toFixed(1),
          unit: 'km',
          hint: 'Walking and running distance aggregated for today.',
        },
        heartRate: {
          label: 'Heart rate',
          value: activity.heartRate ? String(activity.heartRate) : '—',
          unit: 'bpm',
          hint: 'Latest heart rate reading from your watch or phone.',
        },
      };
      const row = map[selectedHealthKey];
      if (!row) return null;
      return (
        <ChartSelectionBanner
          title={row.label}
          value={`${row.value} ${row.unit}`}
          hint={row.hint}
          color={Colors.error}
          onClear={() => setSelectedHealthKey(null)}
        />
      );
    }

    if (selectedTrendIndex >= 0 && trendData[selectedTrendIndex]) {
      const val = trendData[selectedTrendIndex].value;
      return (
        <ChartSelectionBanner
          title={dayLabels[selectedTrendIndex] ?? 'Trend point'}
          value={val.toFixed(1)}
          subtitle="Overall wellness score"
          hint={`Status: ${scoreLabel(val)}`}
          color={scoreLabelColor(val)}
          onClear={() => setSelectedTrendIndex(-1)}
        />
      );
    }

    if (selectedCategory) {
      const meta = getCategoryMeta(selectedCategory);
      const score = categories?.[selectedCategory] ?? 0;
      return (
        <ChartSelectionBanner
          title={meta?.label ?? selectedCategory}
          value={`${score.toFixed(1)}/10`}
          subtitle={scoreLabel(score)}
          hint={
            score < 5
              ? 'Focus area — try Fitness Hub modules or daily plan tasks in this category.'
              : score >= 7
                ? 'Strength — keep up your current habits!'
                : 'Room to grow — small daily improvements add up.'
          }
          color={meta?.color ?? Colors.primary}
          onClear={() => selectCategory(null)}
        />
      );
    }

    return null;
  }, [
    selectedCategory,
    selectedHealthKey,
    selectedTrendIndex,
    activity,
    categories,
    dayLabels,
    trendData,
    selectCategory,
  ]);

  const healthRows = [
    { key: 'steps', label: 'Steps today', value: activity?.steps?.toLocaleString() ?? '0', unit: 'steps', icon: 'footsteps-outline' as const, color: Colors.physical },
    { key: 'calories', label: 'Active calories', value: activity?.calories?.toLocaleString() ?? '0', unit: 'kcal', icon: 'flame-outline' as const, color: Colors.social },
    { key: 'exercise', label: 'Exercise time', value: activity?.exerciseMinutes?.toLocaleString() ?? '0', unit: 'min', icon: 'time-outline' as const, color: Colors.mental },
    { key: 'distance', label: 'Distance', value: activity?.distanceKm?.toFixed(1) ?? '0', unit: 'km', icon: 'navigate-outline' as const, color: Colors.nutrition },
    { key: 'heartRate', label: 'Heart rate', value: activity?.heartRate ? String(activity.heartRate) : '—', unit: 'bpm', icon: 'heart-outline' as const, color: Colors.brand },
  ];

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <ScreenHeader
          title="Analytics"
          actions={[
            { icon: 'options-outline', onPress: () => setShowCustomize(true) },
            { icon: 'share-outline', onPress: () => navigation.navigate(Screen.wellnessExport) },
            { icon: 'stats-chart-outline', onPress: () => navigation.navigate(Screen.progressTracking) },
          ]}
        />
        <SegmentedControl
          options={TABS}
          value={activeTab}
          onChange={(tab) => {
            setActiveTab(tab);
            setSelectedTrendIndex(-1);
            setSelectedHealthKey(null);
          }}
          compact
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {selectionBanner}

        <AnimatedPressable
          style={[styles.card, styles.scoreHero]}
          onPress={() => {
            selectCategory(null);
            setSelectedTrendIndex(-1);
            setSelectedHealthKey(null);
          }}
        >
          <View style={styles.scoreHeroLeft}>
            <View style={[styles.scoreRing, { borderColor: scoreLabelColor(overall) }]}>
              <Text style={styles.scoreRingNumber}>{overall.toFixed(1)}</Text>
            </View>
          </View>
          <View style={styles.scoreHeroRight}>
            <Text style={styles.scoreHeroLabel}>Wellness Score · Tap charts to explore</Text>
            <Text style={[styles.scoreHeroStatus, { color: scoreLabelColor(overall) }]}>
              {scoreLabel(overall)}
            </Text>
            <Text style={styles.scoreHeroHint}>
              Complete Today's Plan, AI Insights, or retake the assessment to improve.
            </Text>
          </View>
          <View style={styles.scoreHeroPie}>
            <TwoDPieChart
              data={pieData}
              size={100}
              selectedIndex={selectedPieIndex}
              onSlicePress={(index) => {
                const key = WELLNESS_CATEGORIES[index]?.key as WellnessCategoryKey;
                if (selectedPieIndex === index) selectCategory(null);
                else selectCategory(key, { chart: 'Quick Pie' });
              }}
            />
          </View>
        </AnimatedPressable>

        {activeTab === 'Overview' && (
          <>
            {monthTrendData.length > 1 && (
              <View style={styles.card}>
                <CollapsibleChartHeader
                  title="30-Day Wellness Trend"
                  icon="trending-up-outline"
                  collapsed={!!collapsed.month}
                  onToggle={() => toggleCollapse('month')}
                />
                {!collapsed.month && (
                  <LineChart
                    data={monthTrendData}
                    width={CHART_W}
                    height={160}
                    color={Colors.primary}
                    thickness={2}
                    dataPointsRadius={3}
                    xAxisLabelTexts={monthLabels}
                    xAxisLabelTextStyle={{ fontSize: 9, color: Colors.textSecondary }}
                    yAxisTextStyle={{ fontSize: 10, color: Colors.textSecondary }}
                    maxValue={10}
                    noOfSections={5}
                    rulesColor={Colors.borderLight}
                    curved
                    areaChart
                    startFillColor={Colors.primary + '22'}
                    endFillColor={Colors.primary + '00'}
                    hideDataPoints={monthTrendData.length > 14}
                  />
                )}
              </View>
            )}

            <View style={styles.card}>
              <CollapsibleChartHeader
                title="Category Balance"
                icon="git-network-outline"
                collapsed={!!collapsed.radar}
                onToggle={() => toggleCollapse('radar')}
              />
              {!collapsed.radar && (
                <>
                  <Text style={styles.chartHint}>Drag to rotate · Tap a category label</Text>
                  <CategoryRadarChart
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryPress={selectCategory}
                    analytics={{ screen: CSQ_SCREEN, chart: 'Category Balance' }}
                  />
                </>
              )}
            </View>

            <View style={styles.card}>
              <CollapsibleChartHeader
                title="Score Distribution"
                icon="pie-chart-outline"
                collapsed={!!collapsed.pie}
                onToggle={() => toggleCollapse('pie')}
              />
              {!collapsed.pie && (
                <>
                  <Text style={styles.chartHint}>Tap a slice or legend item to inspect</Text>
                  <View style={styles.pieWrap}>
                    <ThreeDPieChart
                      data={pieData}
                      size={220}
                      selectedIndex={selectedPieIndex}
                      onSlicePress={(index) => {
                        const key = WELLNESS_CATEGORIES[index]?.key as WellnessCategoryKey;
                        if (selectedPieIndex === index) selectCategory(null);
                        else selectCategory(key, { chart: 'Score Distribution' });
                      }}
                      centerLabel={
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ fontSize: 22, fontWeight: '700', color: Colors.text }}>
                            {selectedCategory && categories
                              ? categories[selectedCategory]?.toFixed(1)
                              : overall.toFixed(1)}
                          </Text>
                          <Text style={{ fontSize: 10, color: Colors.textSecondary }}>
                            {selectedCategory ? shortCategoryLabel(getCategoryMeta(selectedCategory)?.label ?? '') : 'Average'}
                          </Text>
                        </View>
                      }
                    />
                  </View>
                  <View style={styles.legend}>
                    {WELLNESS_CATEGORIES.map((cat, index) => {
                      const isSelected = selectedCategory === cat.key;
                      const score = categories?.[cat.key as WellnessCategoryKey] ?? 0;
                      return (
                        <AnimatedPressable
                          key={cat.key}
                          style={[styles.legendItem, isSelected && { backgroundColor: cat.color + '18' }]}
                          onPress={() => {
                            if (isSelected) selectCategory(null);
                            else selectCategory(cat.key as WellnessCategoryKey, { chart: 'Score Distribution Legend' });
                            setSelectedPieIndex(isSelected ? -1 : index);
                          }}
                          {...chartTapA11yProps(
                            { screen: CSQ_SCREEN, chart: 'Score Distribution Legend' },
                            cat.key as WellnessCategoryKey,
                          )}
                        >
                          <View style={[styles.legendDot, { backgroundColor: cat.color }]} />
                          <Text style={[styles.legendLabel, isSelected && { color: cat.color, fontWeight: '700' }]} numberOfLines={1}>
                            {cat.label.split(' ')[0]}
                          </Text>
                          <Text style={[styles.legendScore, isSelected && { color: cat.color }]}>
                            {score.toFixed(1)}
                          </Text>
                        </AnimatedPressable>
                      );
                    })}
                  </View>
                </>
              )}
            </View>

            <View style={styles.card}>
              <CollapsibleChartHeader
                title="Category Scores"
                icon="bar-chart-outline"
                collapsed={!!collapsed.bars}
                onToggle={() => toggleCollapse('bars')}
              />
              {!collapsed.bars && (
                <>
                  <Text style={styles.chartHint}>Tap any row to highlight</Text>
                  <View style={styles.categoryBars}>
                    {WELLNESS_CATEGORIES.map((cat) => {
                      const score = categories?.[cat.key as WellnessCategoryKey] ?? 0;
                      const isSelected = selectedCategory === cat.key;
                      return (
                        <AnimatedPressable
                          key={cat.key}
                          style={[styles.categoryBarRow, isSelected && styles.categoryBarRowSelected]}
                          onPress={() => {
                            if (isSelected) selectCategory(null);
                            else selectCategory(cat.key as WellnessCategoryKey, { chart: 'Category Scores' });
                          }}
                          {...chartTapA11yProps(
                            { screen: CSQ_SCREEN, chart: 'Category Scores' },
                            cat.key as WellnessCategoryKey,
                          )}
                        >
                          <Text style={[styles.categoryBarLabel, isSelected && { color: cat.color, fontWeight: '700' }]}>
                            {cat.label}
                          </Text>
                          <View style={styles.categoryBarTrack}>
                            <View
                              style={[
                                styles.categoryBarFill,
                                {
                                  width: `${score * 10}%`,
                                  backgroundColor: cat.color,
                                  opacity: isSelected ? 1 : 0.75,
                                },
                              ]}
                            />
                          </View>
                          <Text style={[styles.categoryBarScore, { color: scoreLabelColor(score) }]}>
                            {score.toFixed(1)}
                          </Text>
                        </AnimatedPressable>
                      );
                    })}
                  </View>
                </>
              )}
            </View>
          </>
        )}

        {activeTab === 'Trends' && (
          <>
            <View style={styles.card}>
              <CollapsibleChartHeader
                title="Category Trends"
                icon="analytics-outline"
                collapsed={!!collapsed.trendLine}
                onToggle={() => toggleCollapse('trendLine')}
              />
              {!collapsed.trendLine && (
                <>
                  <Text style={styles.chartHint}>Drag or tap the chart · Toggle series below</Text>
                  <LineChart
                    data={trendData}
                    data2={physicalTrend}
                    data3={nutritionTrend}
                    data4={mentalTrend}
                    width={CHART_W}
                    height={190}
                    color={Colors.primary}
                    color1={Colors.primary}
                    color2={visibleTrendKeys.includes('physical') ? Colors.physical : 'transparent'}
                    color3={visibleTrendKeys.includes('nutrition') ? Colors.nutrition : 'transparent'}
                    color4={visibleTrendKeys.includes('mental') ? Colors.mental : 'transparent'}
                    thickness={2.5}
                    dataPointsRadius={5}
                    dataPointsColor1={Colors.primary}
                    dataPointsColor2={Colors.physical}
                    dataPointsColor3={Colors.nutrition}
                    dataPointsColor4={Colors.mental}
                    xAxisLabelTexts={dayLabels}
                    xAxisLabelTextStyle={{ fontSize: 10, color: Colors.textSecondary }}
                    yAxisTextStyle={{ fontSize: 10, color: Colors.textSecondary }}
                    maxValue={10}
                    noOfSections={5}
                    rulesColor={Colors.borderLight}
                    yAxisColor={Colors.border}
                    xAxisColor={Colors.border}
                    hideDataPoints={trendData.length > 14}
                    startFillColor={Colors.physical + '33'}
                    endFillColor={Colors.physical + '00'}
                    areaChart
                    curved
                    focusEnabled
                    showDataPointOnFocus
                    pointerConfig={trendPointerConfig}
                    getPointerProps={(p: { pointerIndex: number }) => {
                      if (p.pointerIndex >= 0) setSelectedTrendIndex(p.pointerIndex);
                    }}
                  />
                  <View style={styles.trendLegend}>
                    <AnimatedPressable style={styles.trendLegendItem}>
                      <View style={[styles.legendDot, { backgroundColor: Colors.primary }]} />
                      <Text style={styles.legendLabel}>Overall</Text>
                    </AnimatedPressable>
                    {(categoryTrends.length > 0
                      ? categoryTrends
                      : TREND_KEYS.map((key, i) => ({
                          key,
                          label: getCategoryMeta(key)?.label.split(' ')[0] ?? key,
                          color: [Colors.physical, Colors.nutrition, Colors.mental][i],
                        }))
                    ).map((l) => {
                      const active = visibleTrendKeys.includes(l.key as WellnessCategoryKey);
                      return (
                        <AnimatedPressable
                          key={l.key}
                          style={[styles.trendLegendItem, !active && styles.trendLegendItemOff]}
                          onPress={() => toggleTrendSeries(l.key as WellnessCategoryKey)}
                        >
                          <View style={[styles.legendDot, { backgroundColor: l.color, opacity: active ? 1 : 0.35 }]} />
                          <Text style={[styles.legendLabel, !active && styles.legendLabelOff]}>{l.label}</Text>
                        </AnimatedPressable>
                      );
                    })}
                  </View>
                </>
              )}
            </View>

            <TouchableOpacity
              style={styles.progressLink}
              onPress={() => navigation.navigate(Screen.progressTracking)}
            >
              <Text style={styles.progressLinkText}>View detailed progress tracking →</Text>
            </TouchableOpacity>

            <View style={styles.card}>
              <CollapsibleChartHeader
                title="Category Trend Explorer"
                icon="search-outline"
                collapsed={!!collapsed.explorer}
                onToggle={() => toggleCollapse('explorer')}
              />
              {!collapsed.explorer && (
                <>
                  <Text style={styles.chartHint}>Select a category to view its 30-day trend</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
                    {WELLNESS_CATEGORIES.map((cat) => {
                      const active = explorerCategory === cat.key;
                      return (
                        <TouchableOpacity
                          key={cat.key}
                          style={[styles.chip, active && { backgroundColor: cat.color + '22', borderColor: cat.color }]}
                          onPress={() => setExplorerCategory(cat.key as WellnessCategoryKey)}
                        >
                          <Text style={[styles.chipText, active && { color: cat.color, fontWeight: '700' }]}>
                            {shortCategoryLabel(cat.label)}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                  {explorerTrend.length > 0 ? (
                    <LineChart
                      data={explorerTrend}
                      width={CHART_W}
                      height={150}
                      color={getCategoryMeta(explorerCategory)?.color ?? Colors.primary}
                      thickness={2.5}
                      dataPointsRadius={4}
                      xAxisLabelTexts={explorerLabels}
                      xAxisLabelTextStyle={{ fontSize: 9, color: Colors.textSecondary }}
                      yAxisTextStyle={{ fontSize: 10, color: Colors.textSecondary }}
                      maxValue={10}
                      noOfSections={5}
                      rulesColor={Colors.borderLight}
                      curved
                    />
                  ) : (
                    <Text style={styles.chartHint}>Not enough history yet for this category.</Text>
                  )}
                  <TouchableOpacity onPress={() => openCategoryDetail(explorerCategory)}>
                    <Text style={styles.detailLink}>Open full category report →</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            <View style={styles.card}>
              <CollapsibleChartHeader
                title="Category Scores"
                icon="stats-chart-outline"
                collapsed={!!collapsed.trendBar}
                onToggle={() => toggleCollapse('trendBar')}
              />
              {!collapsed.trendBar && (
                <>
                  <Text style={styles.chartHint}>Tap a bar to see category details</Text>
                  <BarChart
                    data={barData}
                    width={CHART_W}
                    height={170}
                    barWidth={22}
                    spacing={8}
                    roundedTop
                    isAnimated
                    animationDuration={600}
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
                      else {
                        setSelectedBarIndex(index);
                        selectCategory(key, { chart: 'Category Scores Chart' });
                      }
                    }}
                    renderTooltip={(item: { value: number }, index: number) => (
                      <BarChartTooltip
                        label={shortCategoryLabel(WELLNESS_CATEGORIES[index]?.label ?? '')}
                        value={item.value}
                        color={WELLNESS_CATEGORIES[index]?.color ?? Colors.primary}
                      />
                    )}
                  />
                </>
              )}
            </View>
          </>
        )}

        {activeTab === 'Health' && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{getHealthPlatformName()}</Text>
              <Text style={styles.chartHint}>Today's synced activity</Text>
              <View style={styles.healthTileGrid}>
                {[
                  { label: 'Steps', value: activity?.steps ?? 0, icon: 'footsteps-outline' as const, color: Colors.physical },
                  { label: 'Calories', value: activity?.calories ?? 0, icon: 'flame-outline' as const, color: Colors.social },
                  { label: 'Heart rate', value: activity?.heartRate ?? '—', icon: 'heart-outline' as const, color: Colors.brand },
                  { label: 'Exercise', value: `${activity?.exerciseMinutes ?? 0}m`, icon: 'time-outline' as const, color: Colors.mental },
                ].map((tile) => (
                  <View key={tile.label} style={styles.healthTile}>
                    <IconBadge name={tile.icon} color={tile.color} size="sm" />
                    <Text style={styles.healthTileValue}>{tile.value}</Text>
                    <Text style={styles.healthTileLabel}>{tile.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Today's Activity</Text>
              <View style={styles.ringsRow}>
                <ActivityRing
                  label="Steps"
                  value={activity?.steps ?? 0}
                  goal={customization.showGoalsProgress ? customization.stepsGoal : DEFAULT_ACTIVITY_GOALS.steps}
                  color="#389EFA"
                />
                <ActivityRing
                  label="Calories"
                  value={activity?.calories ?? 0}
                  goal={customization.showGoalsProgress ? customization.caloriesGoal : DEFAULT_ACTIVITY_GOALS.calories}
                  color="#FF8561"
                  unit="kcal"
                />
                <ActivityRing
                  label="Exercise"
                  value={activity?.exerciseMinutes ?? 0}
                  goal={customization.showGoalsProgress ? customization.exerciseGoal : DEFAULT_ACTIVITY_GOALS.exerciseMinutes}
                  color="#946BFA"
                  unit="min"
                />
              </View>
            </View>

            {activityHistory.length > 0 && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Activity Snapshot — 7 days</Text>
                <Text style={styles.chartHint}>Steps</Text>
                <WeeklyBarChart
                  data={activityHistory}
                  metric="steps"
                  color={Colors.primary}
                  goal={5000}
                />
                <View style={styles.statRow}>
                  <View style={styles.statChip}>
                    <Text style={styles.statChipLabel}>Avg steps</Text>
                    <Text style={styles.statChipValue}>
                      {Math.round(activityHistory.reduce((s, d) => s + d.steps, 0) / activityHistory.length).toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.statChip}>
                    <Text style={styles.statChipLabel}>Best day</Text>
                    <Text style={styles.statChipValue}>
                      {Math.max(...activityHistory.map((d) => d.steps)).toLocaleString()}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {activityHistory.length > 0 && (
              <>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Active energy — 7 days</Text>
                  <WeeklyBarChart data={activityHistory} metric="calories" color="#FF8561" goal={400} />
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Exercise minutes — 7 days</Text>
                  <WeeklyBarChart data={activityHistory} metric="exerciseMinutes" color="#946BFA" goal={30} />
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Distance — 7 days</Text>
                  <WeeklyBarChart data={activityHistory} metric="distanceKm" color="#389EFA" />
                </View>
                {activityHistory.some((d) => (d.sleepHours ?? 0) > 0) && (
                  <View style={styles.card}>
                    <Text style={styles.cardTitle}>Sleep — 7 days</Text>
                    <WeeklyBarChart data={activityHistory} metric="sleepHours" color="#5B6EE1" goal={8} />
                  </View>
                )}
              </>
            )}

            {fourteenDayHistory.length > 0 && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>14-day steps trend</Text>
                <WeeklyBarChart
                  data={fourteenDayHistory}
                  metric="steps"
                  color="#389EFA"
                  height={56}
                />
              </View>
            )}

            {activityHistory.length >= 7 && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Vs. prior week</Text>
                <View style={styles.wowRow}>
                  {(['steps', 'calories', 'sleepHours'] as const).map((key) => {
                    const change = weekOverWeekChange(fourteenDayHistory, key, 7);
                    const label = key === 'steps' ? 'Steps' : key === 'calories' ? 'Active energy' : 'Sleep';
                    return (
                      <View key={key} style={styles.wowChip}>
                        <Text style={styles.wowLabel}>{label}</Text>
                        <Text style={[styles.wowValue, change != null && change >= 0 ? styles.wowUp : styles.wowDown]}>
                          {change != null ? `${change >= 0 ? '+' : ''}${change.toFixed(0)}%` : '—'}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}

            <TouchableOpacity
              style={styles.progressLink}
              onPress={() => navigation.navigate(Screen.tabHome, { screen: Screen.activityDashboard })}
            >
              <Text style={styles.progressLinkText}>Open full activity dashboard →</Text>
            </TouchableOpacity>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Health Metrics</Text>
              <Text style={styles.chartHint}>Tap a metric for details</Text>
              {healthRows.map((row) => {
                const isSelected = selectedHealthKey === row.key;
                return (
                  <AnimatedPressable
                    key={row.key}
                    style={[styles.healthRow, isSelected && styles.healthRowSelected]}
                    onPress={() => setSelectedHealthKey(isSelected ? null : row.key)}
                  >
                    <IconBadge name={row.icon} color={row.color} size="sm" />
                    <Text style={[styles.healthLabel, isSelected && styles.healthLabelSelected]}>{row.label}</Text>
                    <Text style={styles.healthValue}>
                      {row.value} <Text style={styles.healthUnit}>{row.unit}</Text>
                    </Text>
                    <Ionicons name="chevron-forward" size={14} color={Colors.textTertiary} />
                  </AnimatedPressable>
                );
              })}
            </View>
          </>
        )}

        {activeTab === 'Insights' && (
          <>
            {customization.showHabits && (
              <View style={styles.card}>
                <HabitsPerformanceCard stats={engagement} planCompletionRate={engagement.planCompletionRate} />
              </View>
            )}

            <View style={styles.card}>
            <View style={styles.cardTitleRow}>
              <IconBadge name="flame-outline" color={Colors.warning} size="sm" />
              <Text style={styles.cardTitle}>Habits & Engagement</Text>
            </View>
              <EngagementSummaryCard stats={engagement} />
            </View>

            <View style={styles.card}>
            <View style={styles.cardTitleRow}>
              <IconBadge name="locate-outline" color={Colors.primary} size="sm" />
              <Text style={styles.cardTitle}>Key Insights</Text>
            </View>
              <Text style={styles.chartHint}>Tap a category for personalised tips</Text>
              <Text style={styles.insightHint}>Based on your wellness scores</Text>
              {WELLNESS_CATEGORIES.map((cat) => {
                const score = categories?.[cat.key as WellnessCategoryKey] ?? 0;
                const isSelected = selectedCategory === cat.key;
                return (
                  <AnimatedPressable
                    key={cat.key}
                    style={[styles.insightRow, isSelected && { backgroundColor: cat.color + '12' }]}
                    onPress={() => {
                      if (isSelected) selectCategory(null);
                      else selectCategory(cat.key as WellnessCategoryKey, { chart: 'Key Insights' });
                    }}
                    {...chartTapA11yProps(
                      { screen: CSQ_SCREEN, chart: 'Key Insights' },
                      cat.key as WellnessCategoryKey,
                    )}
                  >
                    <CategoryIcon categoryKey={cat.key as WellnessCategoryKey} color={cat.color} size="sm" />
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.insightRowTitle, isSelected && { color: cat.color }]}>{cat.label}</Text>
                      <Text style={styles.insightRowSub}>
                        {score < 4
                          ? `Score ${score.toFixed(1)} — focus area this week`
                          : score < 7
                            ? `Score ${score.toFixed(1)} — room for improvement`
                            : `Score ${score.toFixed(1)} — keep it up!`}
                      </Text>
                    </View>
                    <Text style={[styles.insightScore, { color: scoreLabelColor(score) }]}>
                      {score.toFixed(1)}
                    </Text>
                  </AnimatedPressable>
                );
              })}
              {selectedCategory ? (
                <TouchableOpacity onPress={() => openCategoryDetail(selectedCategory)}>
                  <Text style={styles.detailLink}>View full {getCategoryMeta(selectedCategory)?.label} report →</Text>
                </TouchableOpacity>
              ) : null}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Reports</Text>
              {[
                { title: 'Progress Tracking', sub: '7 / 30 / 90-day wellness trends', route: Screen.progressTracking, icon: 'trending-up-outline' as const },
                { title: 'Activity Dashboard', sub: 'Steps, energy, distance & exercise', route: Screen.activityDashboard, stack: Screen.tabHome, icon: 'pulse-outline' as const },
                { title: 'Wellness Year Report', sub: 'Export a PDF summary', route: Screen.wellnessExport, icon: 'document-text-outline' as const },
              ].map((item) => (
                <ListRow
                  key={item.title}
                  title={item.title}
                  subtitle={item.sub}
                  iconName={item.icon}
                  iconColor={Colors.primary}
                  onPress={() => {
                    if ('stack' in item && item.stack) {
                      navigation.navigate(item.stack, { screen: item.route });
                    } else {
                      navigation.navigate(item.route);
                    }
                  }}
                  showDivider={item.title !== 'Wellness Year Report'}
                />
              ))}
            </View>
          </>
        )}

        <AppCard style={styles.exportCard}>
          <ListRow
            title="Export Wellness Year Report"
            subtitle="Download a PDF summary of your progress"
            iconName="document-text-outline"
            iconColor={Colors.primary}
            onPress={() => navigation.navigate(Screen.wellnessExport)}
            showDivider={false}
          />
        </AppCard>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>

      <AnalyticsCustomizationModal
        visible={showCustomize}
        onClose={() => {
          setShowCustomize(false);
          analyticsCustomizationStorage.get().then(setCustomization);
        }}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.base, gap: Spacing.md },
  scroll: { flex: 1 },
  content: { padding: Spacing.base, gap: Spacing.md },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    gap: Spacing.md,
  },
  cardTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text, letterSpacing: -0.3 },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.xs },
  chartHint: { fontSize: Typography.size.xs, color: Colors.textTertiary, marginTop: -Spacing.sm },

  scoreHero: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  scoreHeroLeft: {},
  scoreRing: {
    width: 72, height: 72, borderRadius: 36,
    borderWidth: 4, borderColor: Colors.brand,
    alignItems: 'center', justifyContent: 'center',
  },
  scoreRingNumber: { fontSize: Typography.size.xl, fontWeight: '700', color: Colors.text },
  scoreHeroRight: { flex: 1, gap: 4 },
  scoreHeroLabel: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  scoreHeroStatus: { fontSize: Typography.size.lg, fontWeight: '700' },
  scoreHeroHint: { fontSize: Typography.size.xs, color: Colors.textSecondary, lineHeight: 16 },
  scoreHeroPie: {},

  pieWrap: { alignItems: 'center', paddingTop: Spacing.md, paddingBottom: Spacing.lg },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: '48%',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: Radius.sm,
  },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendLabel: { flex: 1, fontSize: Typography.size.xs, color: Colors.textSecondary },
  legendLabelOff: { opacity: 0.45 },
  legendScore: { fontSize: Typography.size.xs, fontWeight: '700', color: Colors.text },

  categoryBars: { gap: Spacing.sm },
  categoryBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: Radius.sm,
  },
  categoryBarRowSelected: { backgroundColor: Colors.primaryLight },
  categoryBarLabel: { width: 110, fontSize: Typography.size.xs, color: Colors.text },
  categoryBarTrack: {
    flex: 1, height: 10, backgroundColor: Colors.borderLight,
    borderRadius: 5, overflow: 'hidden',
  },
  categoryBarFill: { height: '100%', borderRadius: 5 },
  categoryBarScore: { width: 32, fontSize: Typography.size.sm, fontWeight: '700', textAlign: 'right' },
  barTopLabel: { fontSize: 9, fontWeight: '700', color: Colors.text, marginBottom: 2 },

  trendLegend: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  trendLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surfaceSecondary,
  },
  trendLegendItemOff: { opacity: 0.55 },
  progressLink: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
  },
  progressLinkText: { fontSize: Typography.size.sm, color: Colors.primary, fontWeight: '600' },

  healthRow: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    borderBottomWidth: 1, borderBottomColor: Colors.borderLight,
    borderRadius: Radius.sm,
  },
  healthRowSelected: { backgroundColor: Colors.error + '10' },
  healthIcon: { fontSize: 20, width: 28, textAlign: 'center' },
  healthLabel: { flex: 1, fontSize: Typography.size.sm, color: Colors.textSecondary },
  healthLabelSelected: { color: Colors.text, fontWeight: '700' },
  healthValue: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  healthUnit: { fontWeight: '400', color: Colors.textSecondary },

  insightHint: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: -Spacing.sm },
  insightRow: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    borderBottomWidth: 1, borderBottomColor: Colors.borderLight,
    borderRadius: Radius.sm,
  },
  insightDot: { width: 10, height: 10, borderRadius: 5 },
  insightRowTitle: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.text },
  insightRowSub: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
  insightScore: { fontSize: Typography.size.base, fontWeight: '700' },

  healthTileGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  healthTile: {
    width: '47%',
    backgroundColor: Colors.background,
    borderRadius: Radius.md,
    padding: Spacing.md,
    alignItems: 'center',
  },
  healthTileIcon: { fontSize: 22, marginBottom: 4 },
  healthTileValue: { fontSize: Typography.size.base, fontWeight: '800', color: Colors.text },
  healthTileLabel: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  ringsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: Spacing.sm },
  statRow: { flexDirection: 'row', gap: Spacing.sm },
  statChip: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: Radius.md,
    padding: Spacing.sm,
  },
  statChipLabel: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  statChipValue: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text, marginTop: 2 },
  wowRow: { flexDirection: 'row', gap: Spacing.sm },
  wowChip: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    alignItems: 'center',
  },
  wowLabel: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  wowValue: { fontSize: Typography.size.base, fontWeight: '700', marginTop: 4 },
  wowUp: { color: Colors.success },
  wowDown: { color: Colors.error },

  exportCard: { padding: 0 },
  detailLink: {
    fontSize: Typography.size.sm,
    color: Colors.primary,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  chipScroll: { marginBottom: Spacing.sm },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: Spacing.xs,
    backgroundColor: Colors.surfaceSecondary,
  },
  chipText: { fontSize: Typography.size.xs, color: Colors.textSecondary },
});
