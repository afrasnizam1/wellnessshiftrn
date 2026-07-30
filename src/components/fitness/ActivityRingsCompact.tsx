import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type Props = {
  moveProgress: number;
  exerciseProgress: number;
  standProgress: number;
  size?: number;
};

function Ring({
  diameter,
  stroke,
  color,
  progress,
}: {
  diameter: number;
  stroke: number;
  color: string;
  progress: number;
}) {
  const radius = (diameter - stroke) / 2;
  const c = 2 * Math.PI * radius;
  const offset = c * (1 - Math.min(Math.max(progress, 0), 1));
  const center = diameter / 2;

  return (
    <Svg width={diameter} height={diameter}>
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke={`${color}33`}
        strokeWidth={stroke}
        fill="none"
      />
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={`${c} ${c}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        fill="none"
        rotation={-90}
        origin={`${center}, ${center}`}
      />
    </Svg>
  );
}

export default function ActivityRingsCompact({
  moveProgress,
  exerciseProgress,
  standProgress,
  size = 46,
}: Props) {
  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <View style={styles.centered}>
        <Ring diameter={44} stroke={5} color="#007AFF" progress={standProgress} />
      </View>
      <View style={styles.centered}>
        <Ring diameter={34} stroke={5} color="#34C759" progress={exerciseProgress} />
      </View>
      <View style={styles.centered}>
        <Ring diameter={24} stroke={5} color="#FF3B30" progress={moveProgress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
