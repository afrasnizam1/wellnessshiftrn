import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius, WELLNESS_CATEGORIES } from '../../theme';
import type { WellnessCategoryKey } from '../../types';
import { AnimatedPressable, IconBadge } from '../ui';
import type { IoniconName } from '../../theme/icons';

export function scoreLabel(score: number) {
  if (score >= 8) return 'Excellent';
  if (score >= 6) return 'Good';
  if (score >= 4) return 'Fair';
  return 'Needs Work';
}

export function scoreLabelColor(score: number) {
  if (score >= 8) return Colors.success;
  if (score >= 6) return Colors.info;
  if (score >= 4) return Colors.warning;
  return Colors.error;
}

export function shortCategoryLabel(label: string): string {
  return label.replace(' Health', '').replace(' Wellness', '').replace(' Management', '');
}

export function getCategoryMeta(key: WellnessCategoryKey) {
  return WELLNESS_CATEGORIES.find((c) => c.key === key);
}

export function chartContentWidth(padding = 80): number {
  return Math.max(260, Dimensions.get('window').width - padding);
}

/** Floating tooltip used by gifted-charts pointer labels. */
export function ChartPointerLabel({
  title,
  value,
  subtitle,
  color = Colors.primary,
}: {
  title: string;
  value: string;
  subtitle?: string;
  color?: string;
}) {
  return (
    <View style={[pointerStyles.wrap, { borderLeftColor: color }]}>
      <Text style={pointerStyles.title}>{title}</Text>
      <Text style={[pointerStyles.value, { color }]}>{value}</Text>
      {subtitle ? <Text style={pointerStyles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

/** Bar chart tooltip bubble. */
export function BarChartTooltip({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <View style={[pointerStyles.barTooltip, { backgroundColor: color }]}>
      <Text style={pointerStyles.barTooltipLabel}>{label}</Text>
      <Text style={pointerStyles.barTooltipValue}>{value.toFixed(1)}/10</Text>
    </View>
  );
}

export function buildLinePointerConfig(
  formatLabel: (index: number, value: number) => { title: string; value: string; subtitle?: string; color?: string },
) {
  return {
    pointerStripHeight: 160,
    pointerStripColor: Colors.primary + '55',
    pointerStripWidth: 2,
    pointerColor: Colors.primary,
    radius: 6,
    pointerLabelWidth: 130,
    pointerLabelHeight: 88,
    activatePointersInstantlyOnTouch: true,
    persistPointer: true,
    autoAdjustPointerLabelPosition: true,
    shiftPointerLabelY: -8,
    pointerLabelComponent: (items: { value?: number }[], _secondary: unknown, pointerIndex: number) => {
      const value = items[0]?.value ?? 0;
      const meta = formatLabel(pointerIndex, value);
      return (
        <ChartPointerLabel
          title={meta.title}
          value={meta.value}
          subtitle={meta.subtitle}
          color={meta.color ?? Colors.primary}
        />
      );
    },
  };
}

type SelectionProps = {
  title: string;
  value: string;
  subtitle?: string;
  hint?: string;
  color?: string;
  onClear?: () => void;
};

/** Banner shown when user taps a chart element, legend row, or list item. */
export function ChartSelectionBanner({
  title,
  value,
  subtitle,
  hint,
  color = Colors.primary,
  onClear,
}: SelectionProps) {
  return (
    <View style={[bannerStyles.wrap, { borderColor: color + '40' }]}>
      <View style={[bannerStyles.accent, { backgroundColor: color }]} />
      <View style={bannerStyles.body}>
        <Text style={bannerStyles.title}>{title}</Text>
        <Text style={[bannerStyles.value, { color }]}>{value}</Text>
        {subtitle ? <Text style={bannerStyles.subtitle}>{subtitle}</Text> : null}
        {hint ? <Text style={bannerStyles.hint}>{hint}</Text> : null}
      </View>
      {onClear ? (
        <AnimatedPressable style={bannerStyles.clearBtn} onPress={onClear}>
          <Ionicons name="close-circle" size={22} color={Colors.textTertiary} />
        </AnimatedPressable>
      ) : null}
    </View>
  );
}

type CollapsibleHeaderProps = {
  title: string;
  icon?: IoniconName;
  collapsed: boolean;
  onToggle: () => void;
};

export function CollapsibleChartHeader({ title, icon, collapsed, onToggle }: CollapsibleHeaderProps) {
  return (
    <AnimatedPressable style={headerStyles.row} onPress={onToggle}>
      <View style={headerStyles.left}>
        {icon ? <IconBadge name={icon} color={Colors.primary} size="sm" /> : null}
        <Text style={[headerStyles.title, icon && headerStyles.titleWithIcon]}>{title}</Text>
      </View>
      <Ionicons
        name={collapsed ? 'chevron-down' : 'chevron-up'}
        size={20}
        color={Colors.textSecondary}
      />
    </AnimatedPressable>
  );
}

const pointerStyles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderLeftWidth: 3,
    ...{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      elevation: 4,
    },
  },
  title: { fontSize: 10, color: Colors.textSecondary, fontWeight: '600' },
  value: { fontSize: Typography.size.lg, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { fontSize: 10, color: Colors.textTertiary, marginTop: 1 },
  barTooltip: {
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    alignItems: 'center',
    minWidth: 64,
  },
  barTooltipLabel: { fontSize: 9, color: 'rgba(255,255,255,0.85)', fontWeight: '600' },
  barTooltipValue: { fontSize: Typography.size.sm, color: Colors.white, fontWeight: '800' },
});

const bannerStyles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  accent: { width: 4, alignSelf: 'stretch' },
  body: { flex: 1, padding: Spacing.md, gap: 2 },
  title: { fontSize: Typography.size.xs, color: Colors.textSecondary, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  value: { fontSize: Typography.size['2xl'], fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { fontSize: Typography.size.sm, color: Colors.text, fontWeight: '600' },
  hint: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 4, lineHeight: 16 },
  clearBtn: { padding: Spacing.md },
});

const headerStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  title: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text, letterSpacing: -0.3 },
  titleWithIcon: { marginLeft: Spacing.sm },
});
