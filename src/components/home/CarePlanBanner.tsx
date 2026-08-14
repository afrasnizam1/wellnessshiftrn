// src/components/home/CarePlanBanner.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { AnimatedPressable } from '../ui';
import type { CarePlan } from '../../types';

interface Props {
  carePlan: CarePlan;
  onPress: () => void;
  isNew?: boolean;
}

export default function CarePlanBanner({ carePlan, onPress, isNew = false }: Props) {
  const pendingCount = carePlan.tasks.filter((t) => !t.isComplete).length;
  const fromLabel = carePlan.clinicianName
    ? `From ${carePlan.clinicianName}`
    : 'From your clinician';
  const meta =
    pendingCount > 0
      ? `${fromLabel} · ${pendingCount} pending`
      : fromLabel;

  return (
    <AnimatedPressable onPress={onPress} accessibilityRole="button" accessibilityLabel="Open care plan">
      <LinearGradient
        colors={isNew ? ['#FFF0F3', '#F3EEFF'] : ['#F3EEFF', '#EDE8FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, isNew && styles.cardNew]}
      >
        <LinearGradient colors={[Colors.purple, Colors.purpleLight]} style={styles.iconWrap}>
          <Ionicons name="clipboard" size={22} color={Colors.white} />
        </LinearGradient>
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {isNew ? 'New care plan' : carePlan.title}
            </Text>
            {isNew ? <View style={styles.dot} /> : null}
          </View>
          <Text style={styles.subtitle} numberOfLines={1}>
            {isNew ? carePlan.title : meta}
          </Text>
          {isNew ? (
            <Text style={styles.meta} numberOfLines={1}>
              {meta}
            </Text>
          ) : null}
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
      </LinearGradient>
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
    borderWidth: 1,
    borderColor: 'rgba(140, 89, 191, 0.2)',
    ...Shadow.sm,
  },
  cardNew: {
    borderColor: 'rgba(255, 59, 48, 0.35)',
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1, minWidth: 0 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  title: {
    flexShrink: 1,
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.error,
  },
  subtitle: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    marginTop: 3,
  },
  meta: {
    fontSize: Typography.size.xs,
    color: Colors.purple,
    fontWeight: '600',
    marginTop: 2,
  },
});
