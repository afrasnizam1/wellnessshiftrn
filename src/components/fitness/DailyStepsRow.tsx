import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { Colors, Typography } from '../../theme';

const ORANGE = '#FF9500';

type Props = {
  date: string;
  steps: number;
  goal?: number;
};

function formatStepsDate(dateIso: string): string {
  const date = parseISO(dateIso);
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'EEE, MMM d');
}

export default function DailyStepsRow({ date, steps, goal = 10000 }: Props) {
  const today = isToday(parseISO(date));
  const progress = goal > 0 ? Math.min(steps / goal, 1) : 0;

  return (
    <View style={styles.row}>
      <Text style={[styles.date, today && styles.dateToday]} numberOfLines={1}>
        {formatStepsDate(date)}
      </Text>
      <View style={styles.barTrack}>
        <View
          style={[
            styles.barFill,
            {
              width: `${Math.max(progress * 100, 8)}%`,
              backgroundColor: today ? ORANGE : `${ORANGE}B3`,
            },
          ]}
        />
      </View>
      <Text style={styles.steps}>{steps.toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  date: {
    width: 120,
    fontSize: Typography.size.sm,
    fontWeight: '500',
    color: Colors.text,
  },
  dateToday: {
    fontWeight: '600',
    color: ORANGE,
  },
  barTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(142, 142, 147, 0.25)',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
    minWidth: 8,
  },
  steps: {
    width: 70,
    textAlign: 'right',
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.text,
  },
});
