import React, { useMemo, useState, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, {
  Defs,
  LinearGradient as SvgLinearGradient,
  Path,
  Stop,
  Circle,
} from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppCard, AnimatedPressable } from '../ui';
import { computeBiologicalAge, type BiologicalAgeBand } from '../../utils/biologicalAge';
import type { WellnessScore } from '../../types';

type Props = {
  dateOfBirth?: string | null;
  wellnessScore: WellnessScore | null;
  heightCm?: number;
  weightKg?: number;
  onImproveScore?: () => void;
  onAddDateOfBirth?: () => void;
};

const BAND_COLORS: Record<BiologicalAgeBand, string> = {
  poor: Colors.error,
  fair: Colors.warning,
  good: Colors.nutrition,
  great: Colors.success,
  excellent: '#1B7F6E',
};

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const start = polar(cx, cy, r, endDeg);
  const end = polar(cx, cy, r, startDeg);
  const large = endDeg - startDeg <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y}`;
}

function CompactGauge({
  progress,
  accent,
  size = 88,
}: {
  progress: number;
  accent: string;
  size?: number;
}) {
  const stroke = 8;
  const cx = size / 2;
  const cy = size / 2 + 4;
  const r = size * 0.38;
  const startAngle = -110;
  const endAngle = 110;
  const sweep = endAngle - startAngle;
  const clamped = Math.max(0.02, Math.min(1, progress));
  const fillEnd = startAngle + sweep * clamped;
  const tip = polar(cx, cy, r, fillEnd);

  return (
    <Svg width={size} height={size * 0.62}>
      <Defs>
        <SvgLinearGradient id="bioCompactFill" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor={Colors.primary} stopOpacity="0.55" />
          <Stop offset="100%" stopColor={accent} stopOpacity="1" />
        </SvgLinearGradient>
      </Defs>
      <Path
        d={arcPath(cx, cy, r, startAngle, endAngle)}
        stroke={Colors.border}
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d={arcPath(cx, cy, r, startAngle, fillEnd)}
        stroke="url(#bioCompactFill)"
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
      />
      <Circle cx={tip.x} cy={tip.y} r={stroke * 0.45} fill={accent} />
    </Svg>
  );
}

export default memo(function BiologicalAgeCard({
  dateOfBirth,
  wellnessScore,
  heightCm,
  weightKg,
  onImproveScore,
  onAddDateOfBirth,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const result = useMemo(() => {
    if (!dateOfBirth || !wellnessScore) return null;
    return computeBiologicalAge({
      dateOfBirth,
      wellnessScore,
      heightCm,
      weightKg,
    });
  }, [dateOfBirth, wellnessScore, heightCm, weightKg]);

  const toggle = () => setExpanded((v) => !v);

  if (!wellnessScore) return null;

  if (!dateOfBirth || !result) {
    return (
      <AppCard style={styles.card}>
        <View style={styles.headerRow}>
          <View style={[styles.iconWrap, { backgroundColor: Colors.primaryLight }]}>
            <Ionicons name="hourglass-outline" size={18} color={Colors.primary} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>Biological age</Text>
            <Text style={styles.title}>Needs your date of birth</Text>
          </View>
        </View>
        <Text style={styles.emptyBody}>
          Add your date of birth in Profile. We combine it with your wellness score so improving
          habits can pull your biological age down.
        </Text>
        {onAddDateOfBirth ? (
          <AnimatedPressable
            style={styles.secondaryCta}
            onPress={onAddDateOfBirth}
            accessibilityRole="button"
            accessibilityLabel="Add date of birth in profile"
          >
            <Text style={styles.secondaryCtaText}>Add in Profile</Text>
            <Ionicons name="arrow-forward" size={14} color={Colors.primary} />
          </AnimatedPressable>
        ) : null}
      </AppCard>
    );
  }

  const accent = BAND_COLORS[result.band];
  const ageLabel = Number.isInteger(result.biologicalAge)
    ? String(result.biologicalAge)
    : result.biologicalAge.toFixed(1);
  const deltaLabel =
    (result.deltaYears > 0 ? '+' : '') +
    result.deltaYears.toFixed(1).replace(/\.0$/, '');

  return (
    <AppCard style={styles.card} padded={false}>
      <AnimatedPressable
        onPress={toggle}
        style={styles.pressArea}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        accessibilityLabel={`Biological age ${ageLabel}. ${result.summary}. Tap for details.`}
      >
        <View style={styles.headerRow}>
          <View style={[styles.iconWrap, { backgroundColor: `${accent}18` }]}>
            <Ionicons name="hourglass-outline" size={18} color={accent} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>Biological age</Text>
            <Text style={styles.title}>{result.bandLabel} · wellness-linked</Text>
          </View>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={Colors.textTertiary}
          />
        </View>

        <View style={styles.mainRow}>
          <View style={styles.ageBlock}>
            <Text style={[styles.ageValue, { color: accent }]}>{ageLabel}</Text>
            <Text style={styles.ageHint}>{result.summary}</Text>
          </View>
          <View style={styles.gaugeBlock}>
            <CompactGauge progress={result.gaugeProgress} accent={accent} />
            <Text style={[styles.bandChip, { color: accent }]}>{result.bandLabel.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.statStrip}>
          <View style={styles.statCell}>
            <Text style={styles.statValue}>{result.chronologicalAge}</Text>
            <Text style={styles.statLabel}>Actual age</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCell}>
            <Text style={styles.statValue}>{result.wellnessScoreOverall.toFixed(1)}</Text>
            <Text style={styles.statLabel}>Wellness</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCell}>
            <Text style={[styles.statValue, { color: result.deltaYears > 0 ? Colors.error : Colors.success }]}>
              {deltaLabel}
            </Text>
            <Text style={styles.statLabel}>Years Δ</Text>
          </View>
        </View>
      </AnimatedPressable>

      {expanded ? (
        <View style={styles.expanded}>
          <Text style={styles.expandedTitle}>How this is calculated</Text>
          <Text style={styles.expandedBody}>
            Uses your date of birth from Profile as actual age, then shifts biological age from your
            wellness score (plus sleep, stress, fitness, and BMI when available). Raise your
            wellness score and biological age moves down.
          </Text>
          <Text style={styles.linkLine}>{result.scoreLinkSummary}</Text>

          {onImproveScore ? (
            <AnimatedPressable
              style={styles.primaryCta}
              onPress={onImproveScore}
              accessibilityRole="button"
              accessibilityLabel="Improve wellness score"
            >
              <Text style={styles.primaryCtaText}>Improve wellness score</Text>
              <Ionicons name="arrow-forward" size={16} color={Colors.white} />
            </AnimatedPressable>
          ) : null}
          <Text style={styles.footnote}>Estimate only — not a medical diagnosis.</Text>
        </View>
      ) : (
        <Text style={styles.tapHint}>Tap for how this works</Text>
      )}
    </AppCard>
  );
});

const styles = StyleSheet.create({
  card: {
    gap: 0,
  },
  pressArea: {
    padding: Spacing.base,
    gap: Spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: { flex: 1, minWidth: 0 },
  eyebrow: {
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: Colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  title: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 1,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  ageBlock: { flex: 1, minWidth: 0, gap: 4 },
  ageValue: {
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -1.5,
    lineHeight: 44,
  },
  ageHint: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  gaugeBlock: { alignItems: 'center', width: 96 },
  bandChip: {
    marginTop: -4,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  statStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.sm,
  },
  statCell: { flex: 1, alignItems: 'center', gap: 2 },
  statValue: {
    fontSize: Typography.size.base,
    fontWeight: '800',
    color: Colors.text,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textTertiary,
  },
  statDivider: {
    width: StyleSheet.hairlineWidth,
    height: 28,
    backgroundColor: Colors.border,
  },
  tapHint: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.sm,
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
  expanded: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.borderLight,
    padding: Spacing.base,
    gap: Spacing.sm,
    backgroundColor: Colors.surfaceSecondary,
  },
  expandedTitle: {
    fontSize: Typography.size.sm,
    fontWeight: '800',
    color: Colors.text,
  },
  expandedBody: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  linkLine: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.text,
    lineHeight: 20,
  },
  primaryCta: {
    marginTop: Spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: Radius.pill,
    paddingVertical: 12,
  },
  primaryCtaText: {
    fontSize: Typography.size.sm,
    fontWeight: '800',
    color: Colors.white,
  },
  secondaryCta: {
    marginTop: Spacing.xs,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  secondaryCtaText: {
    fontSize: Typography.size.sm,
    fontWeight: '700',
    color: Colors.primary,
  },
  emptyBody: {
    marginTop: Spacing.sm,
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  footnote: {
    fontSize: 11,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
});
