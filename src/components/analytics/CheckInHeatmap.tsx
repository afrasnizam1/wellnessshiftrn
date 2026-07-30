import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format, subDays } from 'date-fns';
import { Colors, Typography, Spacing, Radius } from '../../theme';

type Props = {
  dates: string[];
  days?: number;
};

export default function CheckInHeatmap({ dates, days = 28 }: Props) {
  const cells = useMemo(() => {
    const set = new Set(dates);
    const today = new Date();
    return Array.from({ length: days }, (_, i) => {
      const d = subDays(today, days - 1 - i);
      const key = format(d, 'yyyy-MM-dd');
      return { key, checked: set.has(key), day: format(d, 'd') };
    });
  }, [dates, days]);

  const checkedCount = cells.filter((c) => c.checked).length;

  return (
    <View style={styles.wrap}>
      <View style={styles.grid}>
        {cells.map((cell) => (
          <View
            key={cell.key}
            style={[
              styles.cell,
              cell.checked ? styles.cellOn : styles.cellOff,
            ]}
          />
        ))}
      </View>
      <Text style={styles.caption}>
        {checkedCount} of {days} days checked in
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: Spacing.sm },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  cell: {
    width: 14,
    height: 14,
    borderRadius: 3,
  },
  cellOn: { backgroundColor: Colors.success },
  cellOff: { backgroundColor: Colors.borderLight },
  caption: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
  },
});
