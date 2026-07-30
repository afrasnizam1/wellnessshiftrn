import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing } from '../../theme';
import AnimatedPressable from './AnimatedPressable';
import IconBadge from './IconBadge';

type Action = {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  color?: string;
};

type Props = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  backLabel?: string;
  rightLabel?: string;
  onRightPress?: () => void;
  rightDisabled?: boolean;
  actions?: Action[];
  large?: boolean;
};

export default function ScreenHeader({
  title,
  subtitle,
  onBack,
  backLabel,
  rightLabel,
  onRightPress,
  rightDisabled,
  actions,
  large = true,
}: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        {onBack ? (
          <AnimatedPressable
            onPress={onBack}
            style={styles.backBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel={backLabel ? `Back, ${backLabel}` : 'Back'}
          >
            <View style={styles.backCircle}>
              <Ionicons name="chevron-back" size={22} color={Colors.primary} />
            </View>
            {backLabel ? <Text style={styles.backLabel}>{backLabel}</Text> : null}
          </AnimatedPressable>
        ) : (
          <View style={styles.titleBlock}>
            <Text style={[styles.title, !large && styles.titleNav]}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
        )}

        {onBack ? (
          <Text style={styles.navTitle} numberOfLines={1}>{title}</Text>
        ) : null}

        <View style={styles.right}>
          {actions?.map((action) => (
            <AnimatedPressable
              key={action.icon}
              onPress={action.onPress}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel={String(action.icon).replace(/-/g, ' ').replace(/outline/g, '').trim() || 'Action'}
            >
              <IconBadge
                name={action.icon}
                color={action.color ?? Colors.primary}
                size="sm"
              />
            </AnimatedPressable>
          ))}
          {rightLabel && onRightPress ? (
            <AnimatedPressable
              onPress={onRightPress}
              disabled={rightDisabled}
              accessibilityRole="button"
              accessibilityLabel={rightLabel}
            >
              <Text style={[styles.rightLabel, rightDisabled && styles.rightDisabled]}>{rightLabel}</Text>
            </AnimatedPressable>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingBottom: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
  },
  titleBlock: { flex: 1 },
  title: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.8,
  },
  titleNav: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    marginTop: 4,
    lineHeight: 20,
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', minWidth: 44 },
  backCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  backLabel: { fontSize: Typography.size.base, color: Colors.primary, marginLeft: 4, fontWeight: '600' },
  navTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  right: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, minWidth: 44, justifyContent: 'flex-end' },
  rightLabel: { fontSize: Typography.size.base, color: Colors.primary, fontWeight: '700' },
  rightDisabled: { opacity: 0.5 },
});
