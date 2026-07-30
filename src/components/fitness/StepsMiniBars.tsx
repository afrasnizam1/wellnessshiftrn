import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

const BAR_COUNT = 7;
const ORANGE = '#FF9500';

type Props = {
  values: number[];
  width?: number;
  height?: number;
};

export default function StepsMiniBars({ values, width = 96, height = 44 }: Props) {
  const normalized = useMemo(() => {
    const slice = values.slice(-BAR_COUNT);
    while (slice.length < BAR_COUNT) slice.unshift(0);
    const maxValue = Math.max(...slice, 1);
    return slice.map((v) => v / maxValue);
  }, [values]);

  return (
    <View style={[styles.wrap, { width, height }]}>
      {normalized.map((pct, index) => {
        const barHeight = Math.max(6, pct * height);
        const isToday = index === BAR_COUNT - 1;
        return (
          <View
            key={index}
            style={[
              styles.bar,
              {
                height: barHeight,
                backgroundColor: isToday ? ORANGE : 'rgba(142, 142, 147, 0.35)',
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 3,
  },
  bar: {
    flex: 1,
    borderRadius: 2,
    minHeight: 6,
  },
});
