// src/screens/insights/InsightsFeedScreen.tsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Typography, Spacing, Radius, Gradients, WELLNESS_CATEGORIES } from '../../theme';
import { AppCard, ScreenHeader, FilterChip, AnimatedPressable, CategoryIcon } from '../../components/ui';
import { useAppStore } from '../../store';
import { aiService } from '../../services/ai';
import { healthKitService } from '../../services/healthkit';
import { getInsightsPersonalizationNote } from '../../services/insightRecommendationService';
import { navigateToLinkedModule } from '../../utils/fitnessNavigation';
import type { AIInsight, InsightType, WellnessCategoryKey } from '../../types';
import AppScreen from '../../components/common/AppScreen';

const FILTER_TABS: { key: InsightType | 'All'; label: string }[] = [
  { key: 'All', label: 'All' },
  { key: 'Workout', label: 'Workout' },
  { key: 'Nutrition', label: 'Nutrition' },
  { key: 'Recovery', label: 'Recovery' },
  { key: 'Lifestyle', label: 'Lifestyle' },
  { key: 'Mental', label: 'Mental' },
];

const SEVERITY_COLORS = {
  Low: Colors.severityLow,
  Medium: Colors.severityMedium,
  High: Colors.severityHigh,
};

function mergeCompletionState(generated: AIInsight[], previous: AIInsight[]): AIInsight[] {
  return generated.map((insight) => {
    const existing = previous.find((p) => p.id === insight.id);
    return existing?.isComplete ? { ...insight, isComplete: true } : insight;
  });
}

export default function InsightsFeedScreen() {
  const navigation = useNavigation<any>();
  const { insights, setInsights, markInsightComplete, subscriptionTier, wellnessScore, activity } = useAppStore();
  const [activeFilter, setActiveFilter] = useState<InsightType | 'All'>('All');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const loadInsights = useCallback(async () => {
    setLoading(true);
    try {
      const authorized = await healthKitService.isAvailable();
      const generated = await aiService.generateInsights(wellnessScore, activity, authorized);
      const previous = useAppStore.getState().insights;
      const merged = mergeCompletionState(generated, previous);
      setInsights(merged);
      setExpandedIds(new Set(merged.map((i) => i.id)));
      setLastRefreshed(new Date());
    } finally {
      setLoading(false);
    }
  }, [wellnessScore, activity, setInsights]);

  useEffect(() => {
    loadInsights();
  }, [loadInsights]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadInsights();
    setRefreshing(false);
  };

  const filtered = useMemo(
    () => (activeFilter === 'All' ? insights : insights.filter((i) => i.type === activeFilter)),
    [insights, activeFilter]
  );

  const filteredIds = useMemo(() => filtered.map((i) => i.id), [filtered]);
  const allFilteredExpanded = filtered.length > 0 && filteredIds.every((id) => expandedIds.has(id));
  const anyFilteredExpanded = filteredIds.some((id) => expandedIds.has(id));

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      filteredIds.forEach((id) => next.add(id));
      return next;
    });
  };

  const collapseAll = () => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      filteredIds.forEach((id) => next.delete(id));
      return next;
    });
  };

  const completed = insights.filter((i) => i.isComplete).length;
  const total = insights.length;
  const personalizationNote = getInsightsPersonalizationNote(wellnessScore);

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <ScreenHeader
          title="AI Insights"
          subtitle={lastRefreshed
            ? `Updated ${lastRefreshed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
            : 'Refreshes with today\'s activity and your assessment.'}
          actions={[
            { icon: 'refresh-outline', onPress: onRefresh },
            { icon: 'chatbubble-ellipses-outline', onPress: () => navigation.navigate(Screen.aiHealthCoach) },
          ]}
        />

        {total > 0 && (
          <View style={styles.progressWrap}>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={[...Gradients.brand]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressFill, { width: `${(completed / total) * 100}%` }]}
              />
            </View>
            <Text style={styles.progressText}>{completed}/{total} complete</Text>
          </View>
        )}

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {FILTER_TABS.map((tab) => (
            <FilterChip
              key={tab.key}
              label={tab.label}
              active={activeFilter === tab.key}
              onPress={() => setActiveFilter(tab.key)}
            />
          ))}
        </ScrollView>
      </View>

      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator color={Colors.primary} size="large" />
          <Text style={styles.loadingText}>Analysing your wellness data…</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View style={styles.personalizationBanner}>
            <Ionicons name="information-circle-outline" size={18} color={Colors.brand} />
            <Text style={styles.personalizationText}>{personalizationNote}</Text>
          </View>

          <AnimatedPressable
            style={styles.chatCTA}
            onPress={() => navigation.navigate(Screen.aiHealthCoach)}
          >
            <LinearGradient colors={[...Gradients.brand]} style={StyleSheet.absoluteFill} />
            <View style={styles.chatCTAContent}>
              <View style={styles.chatCTAIcon}>
                <Ionicons name="sparkles" size={22} color={Colors.white} />
              </View>
              <View style={styles.chatCTAInfo}>
                <Text style={styles.chatCTATitle}>Chat with AI Health Coach</Text>
                <Text style={styles.chatCTASub}>
                  {subscriptionTier === 'free'
                    ? 'Free: 5 messages per day'
                    : 'Unlimited — ask anything about your wellness'}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.85)" />
            </View>
          </AnimatedPressable>

          {filtered.length > 0 && (
            <View style={styles.expandRow}>
              <Text style={styles.expandLabel}>
                {filtered.length} insight{filtered.length !== 1 ? 's' : ''}
                {activeFilter !== 'All' ? ` · ${activeFilter}` : ''}
              </Text>
              <View style={styles.expandActions}>
                <TouchableOpacity
                  style={[styles.expandBtn, allFilteredExpanded && styles.expandBtnActive]}
                  onPress={expandAll}
                  disabled={allFilteredExpanded}
                >
                  <Ionicons
                    name="chevron-down-circle-outline"
                    size={16}
                    color={allFilteredExpanded ? Colors.textTertiary : Colors.brand}
                  />
                  <Text style={[styles.expandBtnText, allFilteredExpanded && styles.expandBtnTextMuted]}>
                    Expand all
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.expandBtn, !anyFilteredExpanded && styles.expandBtnActive]}
                  onPress={collapseAll}
                  disabled={!anyFilteredExpanded}
                >
                  <Ionicons
                    name="chevron-up-circle-outline"
                    size={16}
                    color={!anyFilteredExpanded ? Colors.textTertiary : Colors.brand}
                  />
                  <Text style={[styles.expandBtnText, !anyFilteredExpanded && styles.expandBtnTextMuted]}>
                    Collapse all
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {filtered.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>✅</Text>
              <Text style={styles.emptyTitle}>All caught up!</Text>
              <Text style={styles.emptySub}>
                No {activeFilter !== 'All' ? activeFilter.toLowerCase() : ''} insights right now.
              </Text>
            </View>
          ) : (
            filtered.map((insight) => (
              <InsightCard
                key={insight.id}
                insight={insight}
                expanded={expandedIds.has(insight.id)}
                onToggle={() => toggleExpanded(insight.id)}
                onComplete={() => markInsightComplete(insight.id)}
                onNavigate={() => navigation.navigate(Screen.insightDetail, { insight })}
                onOpenModule={() => navigateToLinkedModule(navigation, insight.linkedModule)}
              />
            ))
          )}

          <View style={{ height: 100 }} />
        </ScrollView>
      )}
    </AppScreen>
  );
}

function InsightCard({
  insight, expanded, onToggle, onComplete, onNavigate, onOpenModule,
}: {
  insight: AIInsight;
  expanded: boolean;
  onToggle: () => void;
  onComplete: () => void;
  onNavigate: () => void;
  onOpenModule: () => void;
}) {
  const cat = WELLNESS_CATEGORIES.find((c) => c.key === insight.linkedCategory);
  const severityColor = SEVERITY_COLORS[insight.severity];

  return (
    <View style={[styles.insightCard, insight.isComplete && styles.insightCardDone]}>
      <TouchableOpacity style={styles.insightHeader} onPress={onToggle} activeOpacity={0.7}>
        {cat ? (
          <CategoryIcon categoryKey={cat.key as WellnessCategoryKey} color={cat.color} size="sm" />
        ) : (
          <View style={styles.insightIconWrap}>
            <Ionicons name="bulb-outline" size={18} color={Colors.primary} />
          </View>
        )}
        <View style={styles.insightMeta}>
          <Text style={[styles.insightTitle, insight.isComplete && styles.insightTitleDone]}>
            {insight.title}
          </Text>
          <View style={styles.insightTags}>
            <Text style={styles.insightType}>{insight.type}</Text>
            <Text style={styles.tagDot}>•</Text>
            <Text style={[styles.insightSeverity, { color: severityColor }]}>{insight.severity}</Text>
            {insight.categoryScore != null && (
              <>
                <Text style={styles.tagDot}>•</Text>
                <Text style={styles.insightScore}>{insight.categoryScore.toFixed(1)}/10</Text>
              </>
            )}
          </View>
        </View>
        <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color={Colors.textTertiary} />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.insightBody}>
          <Text style={styles.insightDesc}>{insight.description}</Text>

          {insight.summary ? (
            <View style={styles.detailBlock}>
              <Text style={styles.detailLabel}>Summary</Text>
              <Text style={styles.detailText}>{insight.summary}</Text>
            </View>
          ) : null}

          {insight.categoryScore != null && insight.targetScore != null && (
            <View style={styles.scoreRow}>
              <View style={styles.scorePill}>
                <Text style={styles.scorePillLabel}>Current</Text>
                <Text style={[styles.scorePillValue, { color: cat?.color ?? Colors.brand }]}>
                  {insight.categoryScore.toFixed(1)}
                </Text>
              </View>
              <Ionicons name="arrow-forward" size={14} color={Colors.textTertiary} />
              <View style={styles.scorePill}>
                <Text style={styles.scorePillLabel}>Target</Text>
                <Text style={styles.scorePillValue}>{insight.targetScore.toFixed(1)}</Text>
              </View>
            </View>
          )}

          {insight.basedOn && insight.basedOn.length > 0 && (
            <View style={styles.detailBlock}>
              <Text style={styles.detailLabel}>Based on your data</Text>
              {insight.basedOn.map((line) => (
                <View key={line} style={styles.bulletRow}>
                  <View style={[styles.bulletDot, { backgroundColor: cat?.color ?? Colors.brand }]} />
                  <Text style={styles.bulletText}>{line}</Text>
                </View>
              ))}
            </View>
          )}

          {insight.whyItMatters ? (
            <View style={styles.detailBlock}>
              <Text style={styles.detailLabel}>Why it matters</Text>
              <Text style={styles.detailText}>{insight.whyItMatters}</Text>
            </View>
          ) : null}

          {insight.actionSteps && insight.actionSteps.length > 0 && (
            <View style={styles.detailBlock}>
              <Text style={styles.detailLabel}>Action steps</Text>
              {insight.actionSteps.map((step, idx) => (
                <View key={step} style={styles.stepRow}>
                  <View style={styles.stepNum}>
                    <Text style={styles.stepNumText}>{idx + 1}</Text>
                  </View>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>
          )}

          {insight.tip ? (
            <View style={styles.tipBox}>
              <Ionicons name="bulb-outline" size={16} color={Colors.brand} />
              <Text style={styles.tipText}>{insight.tip}</Text>
            </View>
          ) : null}

          <View style={styles.insightFooter}>
            <View style={styles.insightLinks}>
              {cat && (
                <TouchableOpacity onPress={onNavigate}>
                  <Text style={[styles.insightLink, { color: cat.color }]}>{cat.label}</Text>
                </TouchableOpacity>
              )}
              {insight.linkedModule ? (
                <TouchableOpacity onPress={onOpenModule}>
                  <Text style={styles.moduleLink}>Open {insight.linkedModule} →</Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <TouchableOpacity
              style={[styles.completeBtn, insight.isComplete && styles.completeBtnDone]}
              onPress={onComplete}
              disabled={insight.isComplete}
            >
              <Text style={styles.completeBtnIcon}>{insight.isComplete ? '✓' : '○'}</Text>
              <Text style={[styles.completeBtnText, insight.isComplete && { color: Colors.success }]}>
                {insight.isComplete ? 'Completed' : 'Mark complete'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.md,
    gap: Spacing.md,
  },

  progressWrap: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  progressBar: { flex: 1, height: 6, backgroundColor: 'rgba(118, 118, 128, 0.12)', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  progressText: { fontSize: Typography.size.xs, color: Colors.textSecondary, minWidth: 60 },

  filterRow: { paddingRight: Spacing.base },

  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.base, gap: Spacing.md },

  loadingWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.md },
  loadingText: { fontSize: Typography.size.base, color: Colors.textSecondary },

  personalizationBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    backgroundColor: Colors.brandSubtle,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.brandMuted,
  },
  personalizationText: {
    flex: 1,
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    lineHeight: 18,
  },

  chatCTA: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    minHeight: 80,
  },
  chatCTAContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    gap: Spacing.md,
  },
  chatCTAIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatCTAInfo: { flex: 1 },
  chatCTATitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.white },
  chatCTASub: { fontSize: Typography.size.xs, color: 'rgba(255,255,255,0.85)', marginTop: 2 },

  expandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  expandLabel: {
    flex: 1,
    fontSize: Typography.size.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  expandActions: { flexDirection: 'row', gap: Spacing.xs },
  expandBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  expandBtnActive: { opacity: 0.55 },
  expandBtnText: { fontSize: Typography.size.xs, fontWeight: '700', color: Colors.brand },
  expandBtnTextMuted: { color: Colors.textTertiary },

  insightCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  insightCardDone: { opacity: 0.7 },
  insightHeader: {
    flexDirection: 'row', alignItems: 'center',
    padding: Spacing.base, gap: Spacing.md,
  },
  insightIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightMeta: { flex: 1 },
  insightTitle: { fontSize: Typography.size.base, fontWeight: '600', color: Colors.text },
  insightTitleDone: { textDecorationLine: 'line-through', color: Colors.textSecondary },
  insightTags: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2, flexWrap: 'wrap' },
  insightType: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  tagDot: { fontSize: Typography.size.xs, color: Colors.textTertiary },
  insightSeverity: { fontSize: Typography.size.xs, fontWeight: '600' },
  insightScore: { fontSize: Typography.size.xs, fontWeight: '700', color: Colors.text },

  insightBody: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    gap: Spacing.md,
  },
  insightDesc: {
    fontSize: Typography.size.sm,
    color: Colors.text,
    lineHeight: 20,
    paddingTop: Spacing.md,
    fontWeight: '500',
  },
  detailBlock: { gap: Spacing.xs },
  detailLabel: {
    fontSize: Typography.size.xs,
    fontWeight: '800',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  detailText: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  scorePill: {
    alignItems: 'center',
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    minWidth: 88,
  },
  scorePillLabel: { fontSize: Typography.size.xs, color: Colors.textTertiary, fontWeight: '600' },
  scorePillValue: { fontSize: Typography.size.xl, fontWeight: '800', color: Colors.text },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm, paddingTop: 2 },
  bulletDot: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  bulletText: { flex: 1, fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm, paddingTop: 4 },
  stepNum: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.brandMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumText: { fontSize: Typography.size.xs, fontWeight: '800', color: Colors.brand },
  stepText: { flex: 1, fontSize: Typography.size.sm, color: Colors.text, lineHeight: 20 },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    backgroundColor: Colors.brandSubtle,
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  tipText: { flex: 1, fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },

  insightFooter: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingTop: Spacing.xs },
  insightLinks: { flex: 1, gap: 6 },
  insightLink: { fontSize: Typography.size.sm, fontWeight: '600' },
  moduleLink: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.primary },
  completeBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  completeBtnDone: {},
  completeBtnIcon: { fontSize: 18, color: Colors.brand },
  completeBtnText: { fontSize: Typography.size.sm, color: Colors.brand, fontWeight: '600' },

  emptyState: { alignItems: 'center', paddingTop: Spacing['3xl'], gap: Spacing.md },
  emptyEmoji: { fontSize: 48 },
  emptyTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text },
  emptySub: { fontSize: Typography.size.sm, color: Colors.textSecondary },
});
