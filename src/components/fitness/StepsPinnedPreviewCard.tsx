import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { format } from 'date-fns';
import { Colors, Typography, Spacing } from '../../theme';
import { AnimatedPressable } from '../ui';
import StepsMiniBars from './StepsMiniBars';
import { healthKitService } from '../../services/healthkit';
import { useAppStore } from '../../store';

const ORANGE = '#FF9500';

type Props = {
  onPress: () => void;
};

export default function StepsPinnedPreviewCard({ onPress }: Props) {
  const { activity, setActivity } = useAppStore();
  const [weeklySteps, setWeeklySteps] = useState<number[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const [today, history] = await Promise.all([
        healthKitService.getTodayActivity(),
        healthKitService.getActivityHistory(7),
      ]);
      if (!mounted) return;
      setActivity(today);
      setWeeklySteps(history.map((d) => d.steps));
      setUpdatedAt(format(new Date(), 'HH:mm'));
    })().catch(() => {});
    return () => { mounted = false; };
  }, [setActivity]);

  const todaySteps = activity?.steps ?? 0;

  return (
    <AnimatedPressable onPress={onPress} style={styles.wrap}>
      <View style={styles.headerRow}>
        <Ionicons name="walk-outline" size={16} color={ORANGE} />
        <Text style={styles.headerTitle}>Steps today</Text>
        <View style={styles.headerSpacer} />
        {updatedAt ? (
          <Text style={styles.updated}>Updated {updatedAt}</Text>
        ) : null}
        <Ionicons name="chevron-forward" size={14} color={Colors.textTertiary} />
      </View>

      <View style={styles.bodyRow}>
        <View style={styles.countBlock}>
          <Text style={styles.count}>{todaySteps.toLocaleString()}</Text>
          <Text style={styles.countLabel}>steps</Text>
        </View>
        <StepsMiniBars values={weeklySteps} />
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  headerSpacer: { flex: 1 },
  updated: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    marginRight: 4,
  },
  bodyRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 16,
  },
  countBlock: {
    flex: 1,
    gap: 2,
  },
  count: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  countLabel: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
});
