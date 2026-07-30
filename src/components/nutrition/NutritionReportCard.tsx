import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import type { NutritionReport, MicroProgress } from '../../services/foodLogService';

type Props = {
  report: NutritionReport;
  /** Show grams under each macro column. */
  unitLabel?: string;
};

const DOT_ROWS = 5;
const DOT_COLS = 4;

function MacroDotChart({ percent, color }: { percent: number; color: string }) {
  const filled = Math.max(1, Math.round((Math.min(100, Math.max(0, percent)) / 100) * DOT_ROWS * DOT_COLS));
  const dots: boolean[] = [];
  // Build bottom-up so taller macros look like mounds.
  for (let row = DOT_ROWS - 1; row >= 0; row -= 1) {
    for (let col = 0; col < DOT_COLS; col += 1) {
      const indexFromBottom = (DOT_ROWS - 1 - row) * DOT_COLS + col;
      dots.push(indexFromBottom < filled);
    }
  }

  return (
    <View style={styles.dotGrid}>
      {dots.map((on, i) => (
        <View
          key={i}
          style={[styles.dot, { backgroundColor: on ? color : `${color}33` }]}
        />
      ))}
    </View>
  );
}

function NetEnergyGauge({ net }: { net: number }) {
  // Scale −500 … +250 → marker position.
  const min = -500;
  const max = 250;
  const clamped = Math.max(min, Math.min(max, net));
  const t = (clamped - min) / (max - min);

  return (
    <View style={styles.gaugeWrap}>
      <View style={styles.gaugeTrack}>
        <LinearGradient
          colors={['#FF8A4C', '#FFD56A', '#B8E0FF']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.gaugeFill}
        />
        <View style={[styles.gaugeMarker, { left: `${t * 100}%` }]} />
      </View>
      <View style={styles.gaugeLabels}>
        <Text style={styles.gaugeLabel}>−500</Text>
        <Text style={styles.gaugeLabel}>−250</Text>
        <Text style={styles.gaugeLabel}>0</Text>
        <Text style={styles.gaugeLabel}>250</Text>
      </View>
    </View>
  );
}

function MicroCard({ item }: { item: MicroProgress }) {
  const barPct = Math.min(100, item.percent);
  const barColor =
    item.overTarget || item.percent >= 85
      ? '#86D957'
      : item.percent >= 50
        ? '#58D68D'
        : item.percent >= 30
          ? '#FFAA47'
          : '#FF8A4C';

  return (
    <View style={styles.microCard}>
      <View style={styles.microHeader}>
        <Text style={styles.microTitle} numberOfLines={1}>
          {item.label}
        </Text>
        <Ionicons name="chevron-forward" size={14} color={Colors.textTertiary} />
      </View>
      <View style={styles.microTrack}>
        <View style={[styles.microFill, { width: `${barPct}%`, backgroundColor: barColor }]} />
      </View>
      <View style={styles.microFooter}>
        <Text style={styles.microLeft}>{item.remainingLabel}</Text>
        <Text style={styles.microPct}>{Math.min(item.percent, 999)}%</Text>
      </View>
    </View>
  );
}

export default function NutritionReportCard({ report, unitLabel = 'g' }: Props) {
  const netLabel =
    report.netEnergyKcal > 0
      ? `+${report.netEnergyKcal} kcal`
      : `${report.netEnergyKcal} kcal`;

  return (
    <View style={styles.wrap}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{report.title}</Text>
          <View style={styles.unitPill}>
            <Text style={styles.unitText}>{unitLabel}</Text>
          </View>
        </View>
        {report.subtitle ? <Text style={styles.subtitle}>{report.subtitle}</Text> : null}

        <View style={styles.macroRow}>
          {report.macroShares.map((m) => (
            <View key={m.key} style={styles.macroCol}>
              <MacroDotChart percent={m.percent} color={m.color} />
              <Text style={[styles.macroPct, { color: m.color }]}>{m.percent}%</Text>
              <Text style={styles.macroLabel}>{m.label}</Text>
              <Text style={styles.macroGrams}>{m.grams}g</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.netHeader}>
          <View>
            <Text style={styles.netValue}>{netLabel}</Text>
            <Text style={styles.netSub}>Net energy</Text>
          </View>
          <View style={styles.flamePill}>
            <Ionicons name="flame" size={14} color="#FF8A4C" />
            <Text style={styles.flameText}>{report.activeBurnKcal || 0}</Text>
          </View>
        </View>
        <NetEnergyGauge net={report.netEnergyKcal} />
        <Text style={styles.netHint}>
          Based on {report.macros.calories} kcal eaten vs {report.calorieTarget} kcal target
          {report.activeBurnKcal > 0 ? ` (+${report.activeBurnKcal} active burn)` : ''}.
        </Text>
      </View>

      <View style={styles.microGrid}>
        {report.micros.map((m) => (
          <View key={m.id} style={styles.microCell}>
            <MicroCard item={m} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: Spacing.md },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 22,
    padding: Spacing.base,
    gap: Spacing.sm,
    ...Shadow.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  unitPill: {
    backgroundColor: '#F1F0F7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  unitText: {
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  subtitle: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
    gap: Spacing.sm,
  },
  macroCol: { flex: 1, alignItems: 'center', gap: 4 },
  dotGrid: {
    width: 56,
    height: 70,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-end',
    justifyContent: 'center',
    gap: 3,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  macroPct: {
    fontSize: Typography.size.base,
    fontWeight: '800',
    marginTop: 4,
  },
  macroLabel: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  macroGrams: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
  },
  netHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  netValue: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.8,
  },
  netSub: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  flamePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,138,76,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radius.full,
  },
  flameText: {
    fontSize: Typography.size.sm,
    fontWeight: '800',
    color: '#FF8A4C',
  },
  gaugeWrap: { marginTop: Spacing.sm, gap: 6 },
  gaugeTrack: {
    height: 14,
    borderRadius: 8,
    overflow: 'visible',
    justifyContent: 'center',
    position: 'relative',
  },
  gaugeFill: {
    height: 10,
    borderRadius: 8,
  },
  gaugeMarker: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.08)',
    marginLeft: -9,
    top: -2,
    ...Shadow.sm,
  },
  gaugeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  gaugeLabel: {
    fontSize: 11,
    color: Colors.textTertiary,
    fontWeight: '600',
  },
  netHint: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
    lineHeight: 16,
  },
  microGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  microCell: {
    width: '47.5%',
    flexGrow: 1,
    maxWidth: '48.5%',
  },
  microCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: Spacing.md,
    gap: Spacing.sm,
    ...Shadow.sm,
  },
  microHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  microTitle: {
    flex: 1,
    fontSize: Typography.size.sm,
    fontWeight: '700',
    color: Colors.text,
  },
  microTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EEEAF6',
    overflow: 'hidden',
  },
  microFill: {
    height: '100%',
    borderRadius: 4,
  },
  microFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  microLeft: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  microPct: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
    fontWeight: '700',
  },
});
