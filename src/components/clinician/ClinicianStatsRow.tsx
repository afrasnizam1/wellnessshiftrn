import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Spacing, Radius, Typography } from '../../theme';
import { ClinicianTheme } from '../../theme/clinicianTheme';

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
              <Ionicons name={s.icon as any} size={18} color={s.color} />
            </View>
            <Text style={[styles.value, s.alert && { color: s.color }]}>{s.value}</Text>
            <Text style={styles.label}>{s.label}</Text>
          </>
        );

        if (s.onPress) {
          return (
            <TouchableOpacity key={s.label} style={[styles.card, s.alert && styles.cardAlert]} onPress={s.onPress} activeOpacity={0.85}>
              {inner}
            </TouchableOpacity>
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
    paddingTop: Spacing.sm,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xs,
    alignItems: 'center',
    gap: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  cardAlert: {
    borderColor: Colors.error + '35',
    backgroundColor: '#FFFBFB',
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  value: {
    fontSize: Typography.size.xl,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
});
