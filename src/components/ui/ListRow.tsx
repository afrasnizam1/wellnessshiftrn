import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Typography, Spacing } from '../../theme';
import { iconTintBg } from './IconBadge';
import type { IoniconName } from '../../theme/icons';
import AnimatedPressable from './AnimatedPressable';

type Props = {
  title: string;
  subtitle?: string;
  /** Preferred — renders a single flat icon tile. */
  iconName?: IoniconName;
  iconColor?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  iconGradient?: [string, string];
  badge?: string;
  badgeColor?: string;
  onPress?: () => void;
  showDivider?: boolean;
  trailing?: React.ReactNode;
};

export default function ListRow({
  title,
  subtitle,
  iconName,
  iconColor = Colors.primary,
  icon,
  iconBg,
  iconGradient,
  badge,
  badgeColor = Colors.brand,
  onPress,
  showDivider = true,
  trailing,
}: Props) {
  const tint = iconBg ?? iconTintBg(iconColor);

  const iconTile = iconName ? (
    <View style={[styles.iconTile, { backgroundColor: tint }]}>
      <Ionicons
        name={iconName as keyof typeof Ionicons.glyphMap}
        size={19}
        color={iconColor}
      />
    </View>
  ) : icon ? (
    iconGradient ? (
      <LinearGradient colors={iconGradient} style={styles.iconTile} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        {icon}
      </LinearGradient>
    ) : (
      <View style={[styles.iconTile, { backgroundColor: tint }]}>
        {icon}
      </View>
    )
  ) : null;

  const content = (
    <>
      {iconTile}
      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          {badge ? (
            <View style={[styles.badge, { backgroundColor: badgeColor + '20' }]}>
              <Text style={[styles.badgeText, { color: badgeColor }]}>{badge}</Text>
            </View>
          ) : null}
        </View>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={2}>{subtitle}</Text>
        ) : null}
      </View>
      {trailing ?? (onPress ? (
        <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} style={styles.chevron} />
      ) : null)}
    </>
  );

  if (onPress) {
    return (
      <AnimatedPressable
        style={[styles.row, showDivider && styles.rowDivider]}
        onPress={onPress}
      >
        {content}
      </AnimatedPressable>
    );
  }

  return (
    <View style={[styles.row, showDivider && styles.rowDivider]}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: Spacing.base,
    gap: Spacing.md,
    minHeight: 60,
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderLight,
  },
  iconTile: {
    width: 34,
    height: 34,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  title: {
    flex: 1,
    fontSize: Typography.size.base,
    fontWeight: '600',
    color: Colors.text,
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 18,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  chevron: {
    opacity: 0.55,
    marginRight: 2,
  },
});
