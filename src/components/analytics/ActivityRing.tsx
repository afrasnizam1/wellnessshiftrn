import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors, Typography, Spacing } from '../../theme';

type Props = {
  label: string;
  value: number;
  goal: number;
  color: string;
  unit?: string;
  size?: number;
};

export default function ActivityRing({
  label,
  value,
  goal,
  color,
  unit = '',
  size = 88,
}: Props) {
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = goal > 0 ? Math.min(value / goal, 1) : 0;
  const offset = circumference * (1 - progress);

  return (
    <View style={styles.wrap}>
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={Colors.borderLight}
            strokeWidth={stroke}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>
        <View style={[StyleSheet.absoluteFill, styles.center]}>
          <Text style={styles.value}>{Math.round(value)}</Text>
          {unit ? <Text style={styles.unit}>{unit}</Text> : null}
        </View>
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.goal}>Goal {goal.toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center' },
  value: { fontSize: Typography.size.sm, fontWeight: '800', color: Colors.text },
  unit: { fontSize: 10, color: Colors.textSecondary, fontWeight: '600' },
  label: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
    color: Colors.text,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  goal: { fontSize: 10, color: Colors.textTertiary, marginTop: 2 },
});
