import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, fitnessModuleIonIcon } from '../../theme';
import { AppCard, AnimatedPressable, IconBadge } from '../ui';
import { scoreLabelColor } from '../analytics';
import type { ScoreImprovementAdvice } from '../../utils/recommendedModules';

type Props = {
  plan: ScoreImprovementAdvice[];
  canOpenModules: boolean;
  onOpenModule: (title: string) => void;
};

export default function ScoreImprovementCard({ plan, canOpenModules, onOpenModule }: Props) {
  if (plan.length === 0) return null;

  return (
    <AppCard>
      <Text style={styles.sectionTitle}>How to improve your score & age</Text>
      <Text style={styles.sectionSub}>
        {canOpenModules
          ? 'Your lowest quiz areas. Tap a module to start it in Fitness Hub.'
          : 'Your lowest quiz areas. After you finish setup, open Fitness Hub and start with these.'}
      </Text>
      {plan.map((item, index) => (
        <View key={item.categoryKey} style={[styles.adviceBlock, index === 0 && styles.adviceBlockFirst]}>
          <View style={styles.adviceHeader}>
            <View style={[styles.categoryDot, { backgroundColor: item.categoryColor }]} />
            <Text style={styles.adviceCat}>{item.categoryLabel}</Text>
            <Text style={[styles.categoryScore, { color: scoreLabelColor(item.score) }]}>
              {item.score.toFixed(1)}
            </Text>
          </View>
          <Text style={styles.adviceWhy}>{item.why}</Text>
          {item.modules.map((module) => (
            <AnimatedPressable
              key={module.id}
              style={styles.moduleRow}
              onPress={canOpenModules ? () => onOpenModule(module.title) : undefined}
              disabled={!canOpenModules}
              accessibilityRole={canOpenModules ? 'button' : 'text'}
              accessibilityLabel={module.title}
            >
              <IconBadge name={fitnessModuleIonIcon(module)} color={module.color} size="sm" />
              <View style={{ flex: 1 }}>
                <Text style={styles.moduleTitle}>{module.title}</Text>
                <Text style={styles.moduleSub}>{module.subtitle}</Text>
              </View>
              {canOpenModules ? (
                <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} />
              ) : null}
            </AnimatedPressable>
          ))}
        </View>
      ))}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text },
  sectionSub: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginBottom: Spacing.sm },
  categoryDot: { width: 10, height: 10, borderRadius: 5 },
  categoryScore: { fontSize: Typography.size.sm, fontWeight: '700', width: 36, textAlign: 'right' },
  moduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderLight,
  },
  moduleTitle: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.text },
  moduleSub: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
  adviceBlock: {
    paddingTop: Spacing.sm,
    marginBottom: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.borderLight,
  },
  adviceBlockFirst: { borderTopWidth: 0, paddingTop: 0 },
  adviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: 4,
  },
  adviceCat: { flex: 1, fontSize: Typography.size.sm, fontWeight: '700', color: Colors.text },
  adviceWhy: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: Spacing.xs,
  },
});
