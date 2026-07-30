import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors, Typography } from '../../theme';

type RingSpec = {
  label: string;
  value: number;
  goal: number;
  color: string;
  unit: string;
};

type Props = {
  rings: RingSpec[];
  size?: number;
};

function ActivityRing({
  cx, cy, radius, stroke, color, pct,
}: {
  cx: number; cy: number; radius: number; stroke: number; color: string; pct: number;
}) {
  const c = 2 * Math.PI * radius;
  const offset = c * (1 - Math.min(pct, 1));
  return (
    <>
      <Circle cx={cx} cy={cy} r={radius} stroke={color + '22'} strokeWidth={stroke} fill="none" />
      <Circle
        cx={cx}
        cy={cy}
        r={radius}
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={`${c} ${c}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        fill="none"
        rotation={-90}
        origin={`${cx}, ${cy}`}
      />
    </>
  );
}

/** Apple Health–style concentric activity rings. */
export default function ActivityRings({ rings, size = 200 }: Props) {
  const stroke = 14;
  const gap = stroke + 6;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2 - stroke;
  const primary = rings[0];

  return (
    <View style={styles.wrap}>
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={size} height={size}>
          {rings.map((ring, i) => {
            const radius = maxR - i * gap;
            const pct = ring.value / Math.max(ring.goal, 1);
            return (
              <ActivityRing
                key={ring.label}
                cx={cx}
                cy={cy}
                radius={radius}
                stroke={stroke}
                color={ring.color}
                pct={pct}
              />
            );
          })}
        </Svg>
        <View style={[StyleSheet.absoluteFill, styles.center]}>
          <Text style={styles.centerValue}>{primary.value.toLocaleString()}</Text>
          <Text style={styles.centerLabel}>{primary.label}</Text>
        </View>
      </View>
      <View style={styles.legend}>
        {rings.map((ring) => (
          <View key={ring.label} style={styles.legendRow}>
            <View style={[styles.dot, { backgroundColor: ring.color }]} />
            <Text style={styles.legendLabel}>{ring.label}</Text>
            <Text style={styles.legendValue}>
              {ring.value.toLocaleString()} / {ring.goal.toLocaleString()} {ring.unit}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: 16 },
  center: { alignItems: 'center', justifyContent: 'center' },
  centerValue: { fontSize: 28, fontWeight: '800', color: Colors.text, letterSpacing: -0.5 },
  centerLabel: { fontSize: Typography.size.sm, color: Colors.textSecondary, fontWeight: '600' },
  legend: { alignSelf: 'stretch', gap: 8 },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  legendLabel: { flex: 1, fontSize: Typography.size.sm, color: Colors.text, fontWeight: '600' },
  legendValue: { fontSize: Typography.size.xs, color: Colors.textSecondary },
});
