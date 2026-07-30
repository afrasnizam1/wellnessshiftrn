// src/screens/insights/InsightDetailScreen.tsx
import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow, WELLNESS_CATEGORIES } from '../../theme';
import { useAppStore } from '../../store';
import type { AIInsight } from '../../types';
import AppScreen from '../../components/common/AppScreen';
import { CategoryIcon } from '../../components/ui';
import type { WellnessCategoryKey } from '../../types';

export default function InsightDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { markInsightComplete } = useAppStore();
  const insight: AIInsight = route.params?.insight;

  if (!insight) return null;

  const cat = WELLNESS_CATEGORIES.find((c) => c.key === insight.linkedCategory);
  const severityColors = { Low: Colors.success, Medium: Colors.warning, High: Colors.error };
  const severityColor = severityColors[insight.severity];

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Insight</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { backgroundColor: cat?.color + '15' ?? Colors.primaryBg }]}>
          {cat ? (
            <CategoryIcon categoryKey={cat.key as WellnessCategoryKey} color={cat.color} size="lg" />
          ) : (
            <Ionicons name="bulb-outline" size={28} color={Colors.primary} />
          )}
          <Text style={styles.heroTitle}>{insight.title}</Text>
          <View style={styles.heroTags}>
            <View style={styles.typeTag}>
              <Text style={styles.typeTagText}>{insight.type}</Text>
            </View>
            <View style={[styles.severityTag, { backgroundColor: severityColor + '22' }]}>
              <Text style={[styles.severityTagText, { color: severityColor }]}>
                {insight.severity} Priority
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>What this means</Text>
          <Text style={styles.cardBody}>{insight.description}</Text>
          {insight.summary ? (
            <Text style={styles.cardSummary}>{insight.summary}</Text>
          ) : null}
        </View>

        {insight.basedOn && insight.basedOn.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Based on your data</Text>
            {insight.basedOn.map((line) => (
              <View key={line} style={styles.bulletRow}>
                <View style={[styles.bulletDot, { backgroundColor: cat?.color ?? Colors.brand }]} />
                <Text style={styles.bulletText}>{line}</Text>
              </View>
            ))}
          </View>
        )}

        {insight.whyItMatters ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Why it matters</Text>
            <Text style={styles.cardBody}>{insight.whyItMatters}</Text>
          </View>
        ) : null}

        {insight.actionSteps && insight.actionSteps.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Action steps</Text>
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
            <Ionicons name="bulb-outline" size={18} color={Colors.brand} />
            <Text style={styles.tipText}>{insight.tip}</Text>
          </View>
        ) : null}

        {cat && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Wellness category</Text>
            <TouchableOpacity style={styles.catRow}>
              <CategoryIcon categoryKey={cat.key as WellnessCategoryKey} color={cat.color} size="md" />
              <Text style={styles.catLabel}>{cat.label}</Text>
              {insight.categoryScore != null && (
                <Text style={styles.catScore}>{insight.categoryScore.toFixed(1)}/10</Text>
              )}
              <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={[styles.completeBtn, insight.isComplete && styles.completeBtnDone]}
          onPress={() => { markInsightComplete(insight.id); navigation.goBack(); }}
          disabled={insight.isComplete}
        >
          <Text style={styles.completeBtnText}>
            {insight.isComplete ? '✓ Completed' : 'Mark as Complete'}
          </Text>
        </TouchableOpacity>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: Colors.primary, lineHeight: 38 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  content: { padding: Spacing.base, gap: Spacing.md },

  hero: {
    borderRadius: Radius.xl, padding: Spacing.xl,
    alignItems: 'center', gap: Spacing.md,
  },
  heroEmoji: { fontSize: 52 },
  heroTitle: { fontSize: Typography.size.xl, fontWeight: '700', color: Colors.text, textAlign: 'center' },
  heroTags: { flexDirection: 'row', gap: Spacing.sm },
  typeTag: {
    backgroundColor: Colors.surfaceSecondary,
    paddingHorizontal: Spacing.md, paddingVertical: 4,
    borderRadius: Radius.xl,
  },
  typeTagText: { fontSize: Typography.size.xs, fontWeight: '600', color: Colors.textSecondary },
  severityTag: {
    paddingHorizontal: Spacing.md, paddingVertical: 4, borderRadius: Radius.xl,
  },
  severityTagText: { fontSize: Typography.size.xs, fontWeight: '600' },

  card: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, gap: Spacing.sm, ...Shadow.sm },
  cardTitle: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5 },
  cardBody: { fontSize: Typography.size.base, color: Colors.text, lineHeight: 24 },
  cardSummary: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 22, fontStyle: 'italic' },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  bulletDot: { width: 6, height: 6, borderRadius: 3, marginTop: 8 },
  bulletText: { flex: 1, fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 22 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.brandMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumText: { fontSize: Typography.size.xs, fontWeight: '800', color: Colors.brand },
  stepText: { flex: 1, fontSize: Typography.size.sm, color: Colors.text, lineHeight: 22 },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    backgroundColor: Colors.brandSubtle,
    borderRadius: Radius.lg,
    padding: Spacing.base,
  },
  tipText: { flex: 1, fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 22 },
  catRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  catIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  catLabel: { flex: 1, fontSize: Typography.size.base, fontWeight: '600', color: Colors.text },
  catScore: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.textSecondary },
  chevron: { fontSize: 20, color: Colors.textTertiary },

  completeBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl, paddingVertical: Spacing.base,
    alignItems: 'center', ...Shadow.sm,
  },
  completeBtnDone: { backgroundColor: Colors.success },
  completeBtnText: { color: Colors.white, fontSize: Typography.size.base, fontWeight: '700' },
});
