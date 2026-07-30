import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format, parseISO } from 'date-fns';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import type { DailyActivityPoint } from '../../types';

type Props = {
  data: DailyActivityPoint[];
  metric: keyof Pick<DailyActivityPoint, 'steps' | 'calories' | 'exerciseMinutes' | 'distanceKm' | 'sleepHours'>;
  color?: string;
  goal?: number;
  height?: number;
  unit?: string;
};

export default function WeeklyBarChart({
  data,
  metric,
  color = Colors.primary,
  goal,
  height = 72,
}: Props) {
  const values = data.map((d) => d[metric] ?? 0);
  const max = Math.max(...values, goal ?? 1, 1);

  return (
    <View style={styles.wrap}>
      <View style={[styles.bars, { height }]}>
        {data.map((d) => {
          const v = d[metric] ?? 0;
          const h = Math.max(4, (v / max) * height);
          const metGoal = goal != null && v >= goal;
          return (
            <View key={d.date} style={styles.barCol}>
              <View
                style={[
                  styles.bar,
                  {
                    height: h,
                    backgroundColor: metGoal ? color : color + '55',
                  },
                ]}
              />
            </View>
          );
        })}
      </View>
      <View style={styles.labels}>
        {data.map((d) => (
          <Text key={d.date} style={styles.dayLabel}>
            {format(parseISO(d.date), 'EEE').slice(0, 1)}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: Spacing.xs },
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  barCol: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  bar: { width: '100%', borderRadius: Radius.sm, minWidth: 6 },
  labels: { flexDirection: 'row', gap: 4 },
  dayLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
    color: Colors.textTertiary,
    fontWeight: '600',
  },
});
