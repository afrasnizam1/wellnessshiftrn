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
}

export default function CarePlanBanner({ carePlan, onPress }: Props) {
  const pendingCount = carePlan.tasks.filter((t) => !t.isComplete).length;

  return (
    <AnimatedPressable onPress={onPress}>
      <LinearGradient
        colors={['#F3EEFF', '#EDE8FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <LinearGradient colors={[Colors.purple, Colors.purpleLight]} style={styles.iconWrap}>
          <Ionicons name="clipboard" size={20} color={Colors.white} />
        </LinearGradient>
        <View style={styles.info}>
          <Text style={styles.label}>Care Plan Available</Text>
          <Text style={styles.sub}>From {carePlan.clinicianName ?? 'your clinician'}</Text>
          <Text style={styles.title}>{carePlan.title}</Text>
          <Text style={styles.link}>Tap to view your personalized plan</Text>
        </View>
        {pendingCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{pendingCount}</Text>
          </View>
        )}
        <Ionicons name="chevron-forward" size={18} color={Colors.purple} />
      </LinearGradient>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.xl,
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(140, 89, 191, 0.2)',
    ...Shadow.sm,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1 },
  label: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.text },
  sub: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 1 },
  title: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text, marginTop: 4, letterSpacing: -0.2 },
  link: { fontSize: Typography.size.xs, color: Colors.purple, marginTop: 4, fontWeight: '600' },
  badge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: { color: Colors.white, fontSize: Typography.size.xs, fontWeight: '700' },
});
