import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { Colors } from '../../theme';

export type PieSlice = {
  value: number;
  color: string;
  label?: string;
};

type Props = {
  data: PieSlice[];
  size?: number;
  selectedIndex?: number;
  onSlicePress?: (index: number) => void;
  donut?: boolean;
  innerRadius?: number;
};

export default function TwoDPieChart({
  data,
  size = 120,
  selectedIndex = -1,
  onSlicePress,
  donut = true,
  innerRadius = 0.6,
}: Props) {
  const pieData = data.map((d, i) => ({
    value: d.value,
    color: d.color,
    focused: i === selectedIndex,
    onPress: () => onSlicePress?.(i),
  }));

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <PieChart
        data={pieData}
        donut={donut}
        innerRadius={innerRadius}
        radius={size / 2}
        showText={false}
        showTextBackground={false}
        showValuesAsLabels={false}
        strokeWidth={2}
        strokeColor={Colors.surface}
        focusOnPress
        onPress={(_item: any, index: number) => onSlicePress?.(index)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'center',
  },
});
