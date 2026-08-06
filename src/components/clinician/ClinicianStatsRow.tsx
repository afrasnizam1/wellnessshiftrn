import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Spacing, Radius, Typography } from '../../theme';
import { AnimatedPressable } from '../ui';

export type StatItem = {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  bg: string;
  alert?: boolean;
  onPress?: () => void;
};

type Props = {
  stats: StatItem[];
};

export default function ClinicianStatsRow({ stats }: Props) {
  return (
    <View style={styles.row}>
      {stats.map((s) => {
        const inner = (
          <>
            <View style={[styles.iconWrap, { backgroundColor: s.bg }]}>
              <Ionicons name={s.icon as any} size={16} color={s.color} />
            </View>
            <Text style={[styles.value, s.alert && { color: s.color }]}>{s.value}</Text>
            <Text style={styles.label} numberOfLines={1}>{s.label}</Text>
          </>
        );

        if (s.onPress) {
          return (
            <AnimatedPressable
              key={s.label}
              style={[styles.card, s.alert && styles.cardAlert]}
              onPress={s.onPress}
              accessibilityRole="button"
              accessibilityLabel={`${s.label}: ${s.value}`}
            >
              {inner}
            </AnimatedPressable>
          );
        }

        return (
          <View key={s.label} style={[styles.card, s.alert && styles.cardAlert]}>
            {inner}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.base,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    alignItems: 'center',
    gap: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  cardAlert: {
    borderColor: Colors.error + '40',
    backgroundColor: Colors.errorLight,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: Typography.size.xl,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.4,
    fontVariant: ['tabular-nums'],
  },
  label: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
