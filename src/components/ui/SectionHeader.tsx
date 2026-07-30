import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import AnimatedPressable from './AnimatedPressable';
import IconBadge from './IconBadge';
import type { IoniconName } from '../../theme/icons';

type Props = {
  title: string;
  icon?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function SectionHeader({ title, icon, actionLabel, onAction }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        {icon ? (
          <IconBadge name={icon as IoniconName} color={Colors.primary} size="sm" />
        ) : null}
        <Text style={[styles.title, icon && styles.titleWithIcon]}>{title}</Text>
      </View>
      {actionLabel && onAction ? (
        <AnimatedPressable style={styles.action} onPress={onAction} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.actionText}>{actionLabel}</Text>
          <Ionicons name="chevron-forward" size={14} color={Colors.primary} />
        </AnimatedPressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
    marginTop: Spacing.xs,
  },
  left: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  title: {
    fontSize: Typography.size.lg,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.4,
  },
  titleWithIcon: { marginLeft: Spacing.sm },
  action: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  actionText: { fontSize: Typography.size.sm, color: Colors.primary, fontWeight: '600' },
});
