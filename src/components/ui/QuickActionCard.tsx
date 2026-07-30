import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Radius, Spacing, Shadow } from '../../theme';
import AnimatedPressable from './AnimatedPressable';
import { iconTintBg } from './IconBadge';
import type { IoniconName } from '../../theme/icons';

type Props = {
  label: string;
  subtitle?: string;
  icon: string;
  colors?: [string, string];
  tintColor?: string;
  onPress: () => void;
  wide?: boolean;
};

export default function QuickActionCard({
  label,
  subtitle,
  icon,
  colors,
  tintColor,
  onPress,
  wide,
}: Props) {
  const accent = tintColor ?? colors?.[0] ?? Colors.primary;

  return (
    <AnimatedPressable style={[styles.card, wide && styles.cardWide]} onPress={onPress}>
      <View style={[styles.iconTile, { backgroundColor: iconTintBg(accent) }]}>
        <Ionicons name={icon as IoniconName} size={22} color={accent} />
      </View>
      <Text style={styles.label} numberOfLines={1}>{label}</Text>
      {subtitle ? (
        <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
      ) : null}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 118,
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    marginRight: Spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.glassBorder,
    ...Shadow.sm,
  },
  cardWide: { width: 140 },
  iconTile: {
    width: 40,
    height: 40,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: Typography.size.sm,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.2,
    marginTop: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    marginTop: 3,
  },
});
