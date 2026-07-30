// src/components/home/ActivityBar.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { AnimatedPressable } from '../ui';
import type { ActivitySnapshot } from '../../types';

interface Props {
  activity: ActivitySnapshot | null;
  onRefresh?: () => void;
  onPress?: () => void;
}

const METRICS = [
  { key: 'steps', icon: 'footsteps-outline' as const, label: 'steps', format: (v: number) => v.toLocaleString(), color: Colors.physical },
  { key: 'sleepHours', icon: 'moon-outline' as const, label: 'sleep', format: (v: number) => `${v}h`, color: Colors.sleep },
  { key: 'calories', icon: 'flame-outline' as const, label: 'cal', format: (v: number) => v.toString(), color: Colors.social },
  { key: 'exerciseMinutes', icon: 'time-outline' as const, label: 'min', format: (v: number) => v.toString(), color: Colors.mental },
  { key: 'heartRate', icon: 'heart-outline' as const, label: 'bpm', format: (v: number) => v.toString(), color: Colors.brand },
] as const;

export default function ActivityBar({ activity, onRefresh, onPress }: Props) {
  const content = (
    <View style={styles.container}>
      {METRICS.map((m) => {
        const val = activity?.[m.key as keyof ActivitySnapshot];
        return (
          <View key={m.key} style={styles.metric}>
            <Ionicons name={m.icon} size={17} color={m.color} />
            <Text style={styles.value}>
              {val != null ? m.format(val as number) : '—'}
            </Text>
            <Text style={styles.label}>{m.label}</Text>
          </View>
        );
      })}
      {onRefresh ? (
        <AnimatedPressable style={styles.refresh} onPress={onRefresh} hitSlop={8}>
          <Ionicons name="refresh-outline" size={18} color={Colors.primary} />
        </AnimatedPressable>
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <AnimatedPressable onPress={onPress} style={styles.pressWrap}>
        {content}
      </AnimatedPressable>
    );
  }
  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    gap: Spacing.xs,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.glassBorder,
    ...Shadow.sm,
  },
  metric: { alignItems: 'center', flex: 1, gap: 3 },
  value: { fontSize: Typography.size.sm, fontWeight: '800', color: Colors.text, letterSpacing: -0.3 },
  label: { fontSize: 10, color: Colors.textSecondary, fontWeight: '600' },
  refresh: { marginLeft: 2, padding: 4 },
  pressWrap: { marginBottom: 0 },
});
