import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, WELLNESS_CATEGORIES } from '../../theme';
import { ScreenHeader, AppCard } from '../../components/ui';
import { scoreLabel, scoreLabelColor } from '../../components/analytics';
import { useAppStore } from '../../store';
import { categoryInsight, getCategoryQuizBreakdown } from '../../utils/quizResultsHelpers';
import type { WellnessCategoryKey } from '../../types';
import AppScreen from '../../components/common/AppScreen';

export default function QuizResultsDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const category = route.params?.category as WellnessCategoryKey;
  const { wellnessScore, lastQuizAnswers } = useAppStore();

  const meta = WELLNESS_CATEGORIES.find((c) => c.key === category);
  const score = wellnessScore?.categories?.[category] ?? 0;

  const breakdown = useMemo(
    () => getCategoryQuizBreakdown(category, lastQuizAnswers),
    [category, lastQuizAnswers],
  );

  if (!meta) {
    return (
      <AppScreen style={styles.safe}>
        <ScreenHeader title="Results" onBack={() => navigation.goBack()} />
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
          <Text style={styles.sectionTitle}>Your answers</Text>
          {breakdown.map((item, index) => (
            <View key={item.questionId} style={[styles.qBlock, index > 0 && styles.qBlockBorder]}>
              <Text style={styles.qText}>{item.question}</Text>
              <View style={styles.answerPill}>
                <Text style={styles.answerText}>
                  {item.answerText}
                  {item.score != null ? ` · ${item.score}/5` : ''}
                </Text>
              </View>
              {item.description ? (
                <Text style={styles.qDesc}>{item.description}</Text>
              ) : null}
            </View>
          ))}
        </AppCard>

        <AppCard>
          <Text style={styles.sectionTitle}>What this means</Text>
          <Text style={styles.insight}>{categoryInsight(score)}</Text>
        </AppCard>

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
  qBlock: { paddingVertical: Spacing.sm },
  qBlockBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.borderLight,
    marginTop: Spacing.sm,
  },
  qText: { fontSize: Typography.size.base, fontWeight: '600', color: Colors.text, lineHeight: 22 },
  answerPill: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    marginTop: Spacing.sm,
  },
  answerText: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.primary },
  qDesc: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginTop: Spacing.xs, lineHeight: 20 },
  insight: { fontSize: Typography.size.base, color: Colors.textSecondary, lineHeight: 22 },
});
