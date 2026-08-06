import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Spacing, Radius, Typography } from '../../theme';
import { ClinicianType } from '../../theme/clinicianTheme';
import { AnimatedPressable } from '../ui';

export type QuickActionItem = {
  icon: string;
  title: string;
  subtitle?: string;
  color: string;
  bg: string;
  onPress: () => void;
};

type Props = {
  actions: QuickActionItem[];
  title?: string;
};

export function ClinicianQuickActions({ actions, title = 'Quick actions' }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.grid}>
        {actions.map((a) => (
          <AnimatedPressable
            key={a.title}
            style={styles.card}
            onPress={a.onPress}
            accessibilityRole="button"
            accessibilityLabel={`${a.title}. ${a.subtitle ?? ''}`}
          >
            <View style={[styles.iconWrap, { backgroundColor: a.bg }]}>
              <Ionicons name={a.icon as any} size={20} color={a.color} />
            </View>
            <View style={styles.copy}>
              <Text style={styles.cardTitle} numberOfLines={1}>{a.title}</Text>
              {a.subtitle ? (
                <Text style={styles.cardSub} numberOfLines={1}>{a.subtitle}</Text>
              ) : null}
            </View>
          </AnimatedPressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: Spacing.sm,
    paddingHorizontal: Spacing.base,
  },
  title: {
    ...ClinicianType.sectionTitle,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  card: {
    width: '48%',
    flexGrow: 1,
    minWidth: '46%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: { flex: 1, minWidth: 0, gap: 2 },
  cardTitle: {
    fontSize: Typography.size.sm,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.2,
  },
  cardSub: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});
