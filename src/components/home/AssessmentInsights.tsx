import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Typography, Spacing, Radius, Shadow, WELLNESS_CATEGORIES } from '../../theme';
import { CategoryIcon } from '../ui';
import type { WellnessCategoryKey, WellnessScore } from '../../types';

interface Props {
  wellnessScore: WellnessScore;
}

export default function AssessmentInsights({ wellnessScore }: Props) {
  const sorted = Object.entries(wellnessScore.categories).sort(([, a], [, b]) => b - a);
  const strengths = sorted.filter(([, score]) => score >= 7).slice(0, 1);
  const focusAreas = sorted.filter(([, score]) => score < 7).slice(0, 2);

  if (strengths.length === 0 && focusAreas.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>From your assessment</Text>
      {strengths.map(([key, score]) => {
        const cat = WELLNESS_CATEGORIES.find((c) => c.key === key);
        return (
          <LinearGradient
            key={key}
            colors={['rgba(52,199,89,0.08)', 'rgba(46,219,189,0.06)']}
            style={[styles.card, styles.strengthCard]}
          >
            <View style={styles.strengthInner}>
              <Text style={[styles.cardLabel, { color: Colors.success }]}>Strength</Text>
              <View style={styles.titleRow}>
                {cat ? <CategoryIcon categoryKey={cat.key as WellnessCategoryKey} color={cat.color} size="sm" /> : null}
                <Text style={styles.cardTitle}>{cat?.label ?? key}</Text>
              </View>
              <Text style={styles.cardScore}>{score.toFixed(1)}/10 — keep it up!</Text>
            </View>
          </LinearGradient>
        );
      })}
      {focusAreas.map(([key, score]) => {
        const cat = WELLNESS_CATEGORIES.find((c) => c.key === key);
        return (
          <View key={key} style={[styles.card, { borderLeftWidth: 4, borderLeftColor: cat?.color ?? Colors.warning }]}>
            <Text style={[styles.cardLabel, { color: cat?.color ?? Colors.warning }]}>Focus area</Text>
            <View style={styles.titleRow}>
              {cat ? <CategoryIcon categoryKey={cat.key as WellnessCategoryKey} color={cat.color} size="sm" /> : null}
              <Text style={styles.cardTitle}>{cat?.label ?? key}</Text>
            </View>
            <Text style={styles.cardScore}>{score.toFixed(1)}/10 — small steps help here</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: Spacing.sm },
  sectionTitle: { fontSize: Typography.size.lg, fontWeight: '800', color: Colors.text, letterSpacing: -0.4 },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    gap: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.glassBorder,
    ...Shadow.sm,
  },
  strengthCard: {
    borderWidth: 0,
    padding: 0,
    overflow: 'hidden',
  },
  strengthInner: {
    padding: Spacing.base,
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: 2,
  },
  cardLabel: {
    fontSize: Typography.size.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  cardTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text, letterSpacing: -0.2, flex: 1 },
  cardScore: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginTop: 2 },
});
