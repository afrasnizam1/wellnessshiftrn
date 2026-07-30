// src/components/home/StreakRecoveryCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { AnimatedPressable } from '../ui';

interface Props {
  longest: number;
  freezes: number;
  onPress: () => void;
}

export default function StreakRecoveryCard({ longest, freezes, onPress }: Props) {
  return (
    <AnimatedPressable onPress={onPress}>
      <View style={styles.card}>
        <View style={[styles.iconWrap, { backgroundColor: Colors.primaryLight }]}>
          <Ionicons name="refresh" size={22} color={Colors.primary} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Streaks break — that's normal. Your longest streak was {longest} day{longest === 1 ? '' : 's'}. One check-in restarts it.
          </Text>
        </View>
        <View style={styles.action}>
          <Text style={styles.actionText}>Check in</Text>
          <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
        </View>
      </View>
      {freezes > 0 && (
        <View style={styles.freezeRow}>
          <Ionicons name="snow" size={14} color={Colors.info} />
          <Text style={styles.freezeText}>{freezes} streak freeze{freezes === 1 ? '' : 's'} available</Text>
        </View>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.sm,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1 },
  title: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text, letterSpacing: -0.2 },
  subtitle: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginTop: 3 },
  action: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  actionText: { fontSize: Typography.size.sm, color: Colors.primary, fontWeight: '700' },
  freezeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.sm,
    marginLeft: Spacing.base,
  },
  freezeText: { fontSize: Typography.size.xs, color: Colors.textSecondary },
});
