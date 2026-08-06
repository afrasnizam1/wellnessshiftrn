import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius, WELLNESS_CATEGORIES } from '../../theme';
import type { WellnessCategoryKey, WellnessCategoryScores } from '../../types';
import { AnimatedPressable } from '../ui';
import { shortCategoryLabel, scoreLabel, scoreLabelColor } from './chartInteraction';
import type { ChartTapContext } from './chartTapAnalytics';
import { chartTapA11yProps, trackChartCategoryTap } from './chartTapAnalytics';

type Props = {
  categories?: WellnessCategoryScores;
  selectedCategory?: WellnessCategoryKey | null;
  onCategoryPress?: (key: WellnessCategoryKey | null) => void;
  analytics?: ChartTapContext;
};

export default function CategoryBalanceBars({
  categories,
  selectedCategory = null,
  onCategoryPress,
  analytics,
}: Props) {
  const rows = useMemo(() => {
    return WELLNESS_CATEGORIES.map((cat) => ({
      key: cat.key as WellnessCategoryKey,
      label: shortCategoryLabel(cat.label),
      color: cat.color,
      score: categories?.[cat.key as WellnessCategoryKey] ?? 0,
    })).sort((a, b) => b.score - a.score);
  }, [categories]);

  const toggleCategory = useCallback(
    (key: WellnessCategoryKey) => {
      const deselecting = selectedCategory === key;
      if (analytics && !deselecting) {
        trackChartCategoryTap(analytics, key);
      }
      onCategoryPress?.(deselecting ? null : key);
    },
    [analytics, onCategoryPress, selectedCategory],
  );

  const selected = selectedCategory
    ? rows.find((r) => r.key === selectedCategory)
    : null;

  return (
    <View style={styles.wrap}>
      <View style={styles.list}>
        {rows.map((row) => {
          const isSelected = selectedCategory === row.key;
          return (
            <AnimatedPressable
              key={row.key}
              style={[styles.row, isSelected && { backgroundColor: row.color + '14' }]}
              onPress={() => toggleCategory(row.key)}
              {...(analytics ? chartTapA11yProps(analytics, row.key) : {})}
            >
              <View style={[styles.dot, { backgroundColor: row.color }]} />
              <Text
                style={[
                  styles.label,
                  isSelected && { color: row.color, fontWeight: '700' },
                ]}
                numberOfLines={1}
              >
                {row.label}
              </Text>
              <View style={styles.track}>
                <View
                  style={[
                    styles.fill,
                    {
                      width: `${Math.min(100, Math.max(0, row.score * 10))}%`,
                      backgroundColor: row.color,
                      opacity: isSelected ? 1 : 0.8,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.score, { color: scoreLabelColor(row.score) }]}>
                {row.score.toFixed(1)}
              </Text>
            </AnimatedPressable>
          );
        })}
      </View>

      {selected ? (
        <View style={[styles.detail, { borderColor: selected.color + '44' }]}>
          <View style={[styles.detailDot, { backgroundColor: selected.color }]} />
          <View style={styles.detailBody}>
            <Text style={styles.detailTitle}>{selected.label}</Text>
            <Text style={[styles.detailScore, { color: selected.color }]}>
              {selected.score.toFixed(1)}/10 · {scoreLabel(selected.score)}
            </Text>
          </View>
          <AnimatedPressable onPress={() => onCategoryPress?.(null)} hitSlop={8}>
            <Text style={styles.clear}>Clear</Text>
          </AnimatedPressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: Spacing.sm },
  list: { gap: 2 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderRadius: Radius.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  label: {
    width: 92,
    fontSize: Typography.size.xs,
    fontWeight: '600',
    color: Colors.text,
  },
  track: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.borderLight,
    borderRadius: Radius.sm,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: Radius.sm,
  },
  score: {
    width: 28,
    fontSize: Typography.size.xs,
    fontWeight: '700',
    textAlign: 'right',
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.md,
    borderWidth: StyleSheet.hairlineWidth,
  },
  detailDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  detailBody: { flex: 1 },
  detailTitle: {
    fontSize: Typography.size.sm,
    fontWeight: '700',
    color: Colors.text,
  },
  detailScore: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
    marginTop: 1,
  },
  clear: {
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: Colors.textTertiary,
  },
});
