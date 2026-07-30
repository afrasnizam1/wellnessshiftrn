import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Ellipse, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Colors } from '../../theme';

export type PieSlice = {
  value: number;
  color: string;
};

type Props = {
  data: PieSlice[];
  size?: number;
  /** Donut hole ratio (0 = full pie, 0.6 = thin ring). */
  innerRatio?: number;
  /** Vertical squash for the tilt — smaller = more top-down. */
  tilt?: number;
  /** Extrusion depth in pixels. */
  depth?: number;
  selectedIndex?: number;
  onSlicePress?: (index: number) => void;
  centerLabel?: React.ReactNode;
};

type Pt = { x: number; y: number };

function darken(hex: string, amt: number): string {
  const m = hex.replace('#', '');
  if (m.length < 6) return hex;
  const r = parseInt(m.substring(0, 2), 16);
  const g = parseInt(m.substring(2, 4), 16);
  const b = parseInt(m.substring(4, 6), 16);
  const f = (c: number) =>
    Math.max(0, Math.round(c * (1 - amt)))
      .toString(16)
      .padStart(2, '0');
  return `#${f(r)}${f(g)}${f(b)}`;
}

function lighten(hex: string, amt: number): string {
  const m = hex.replace('#', '');
  if (m.length < 6) return hex;
  const r = parseInt(m.substring(0, 2), 16);
  const g = parseInt(m.substring(2, 4), 16);
  const b = parseInt(m.substring(4, 6), 16);
  const f = (c: number) =>
    Math.round(c + (255 - c) * amt)
      .toString(16)
      .padStart(2, '0');
  return `#${f(r)}${f(g)}${f(b)}`;
}

const TAU = Math.PI * 2;

export default function ThreeDPieChart({
  data,
  size = 220,
  innerRatio = 0.58,
  tilt = 0.52,
  depth,
  selectedIndex = -1,
  onSlicePress,
  centerLabel,
}: Props) {
  const total = data.reduce((s, d) => s + Math.max(0, d.value), 0);

  const geometry = useMemo(() => {
    const pad = 18;
    const R = (size - pad * 2) / 2;
    const r = R * innerRatio;
    const ky = tilt;
    const h = depth ?? size * 0.16;
    const popOut = 9;

    const width = R * 2 + pad * 2;
    const height = R * ky * 2 + h + pad * 2;
    const cx = width / 2;
    const cy = pad + R * ky;

    const pt = (radius: number, a: number, sx: number, sy: number): Pt => ({
      x: cx + radius * Math.cos(a) + sx,
      y: cy + radius * ky * Math.sin(a) + sy,
    });

    const wedgePath = (a0: number, a1: number, sx: number, sy: number) => {
      const large = a1 - a0 > Math.PI ? 1 : 0;
      const o0 = pt(R, a0, sx, sy);
      const o1 = pt(R, a1, sx, sy);
      const i1 = pt(r, a1, sx, sy);
      const i0 = pt(r, a0, sx, sy);
      return (
        `M ${o0.x} ${o0.y} ` +
        `A ${R} ${R * ky} 0 ${large} 1 ${o1.x} ${o1.y} ` +
        `L ${i1.x} ${i1.y} ` +
        `A ${r} ${r * ky} 0 ${large} 0 ${i0.x} ${i0.y} Z`
      );
    };

    // Vertical strip on the outer edge between top arc and bottom (top + depth).
    const wallPath = (a0: number, a1: number, sx: number, sy: number) => {
      const large = a1 - a0 > Math.PI ? 1 : 0;
      const t0 = pt(R, a0, sx, sy);
      const t1 = pt(R, a1, sx, sy);
      return (
        `M ${t0.x} ${t0.y} ` +
        `A ${R} ${R * ky} 0 ${large} 1 ${t1.x} ${t1.y} ` +
        `L ${t1.x} ${t1.y + h} ` +
        `A ${R} ${R * ky} 0 ${large} 0 ${t0.x} ${t0.y + h} Z`
      );
    };

    let start = -Math.PI / 2;
    const slices = data.map((d, index) => {
      const frac = total > 0 ? Math.max(0, d.value) / total : 0;
      const a0 = start;
      const a1 = start + frac * TAU;
      start = a1;
      const mid = (a0 + a1) / 2;
      const selected = index === selectedIndex;
      const sx = selected ? Math.cos(mid) * popOut : 0;
      const sy = selected ? Math.sin(mid) * ky * popOut : 0;

      // Clip the visible front-facing wall to the lower half (sin > 0 → angle in (0, π)).
      const lo = Math.max(a0, 0);
      const hi = Math.min(a1, Math.PI);
      const wall = hi > lo ? wallPath(lo, hi, sx, sy) : null;

      return {
        index,
        a0,
        a1,
        mid,
        color: d.color,
        top: wedgePath(a0, a1, sx, sy),
        wall,
        wallColor: darken(d.color, 0.32),
        // Draw front walls (and their caps) last so they layer above back ones.
        order: Math.sin(mid),
      };
    });

    const walls = slices
      .filter((s) => s.wall)
      .sort((a, b) => a.order - b.order);

    const shadow = {
      cx,
      cy: cy + h + R * ky * 0.15,
      rx: R * 1.02,
      ry: R * ky * 0.85,
    };

    return { width, height, cx, cy, R, ky, slices, walls, shadow };
  }, [data, size, innerRatio, tilt, depth, selectedIndex, total]);

  return (
    <View style={{ width: geometry.width, height: geometry.height }}>
      <Svg width={geometry.width} height={geometry.height}>
        <Defs>
          {data.map((d, i) => (
            <LinearGradient key={`g${i}`} id={`pieGrad${i}`} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={lighten(d.color, 0.32)} stopOpacity="1" />
              <Stop offset="1" stopColor={d.color} stopOpacity="1" />
            </LinearGradient>
          ))}
        </Defs>

        {/* Ground shadow */}
        <Ellipse
          cx={geometry.shadow.cx}
          cy={geometry.shadow.cy}
          rx={geometry.shadow.rx}
          ry={geometry.shadow.ry}
          fill="rgba(28,28,30,0.10)"
        />

        {/* Side walls (depth) — front-facing only, back-to-front */}
        {geometry.walls.map((s) => (
          <Path
            key={`wall-${s.index}`}
            d={s.wall as string}
            fill={s.wallColor}
            stroke={s.wallColor}
            strokeWidth={0.5}
            onPress={() => onSlicePress?.(s.index)}
          />
        ))}

        {/* Top faces */}
        {geometry.slices.map((s) => (
          <Path
            key={`top-${s.index}`}
            d={s.top}
            fill={`url(#pieGrad${s.index})`}
            stroke={Colors.surface}
            strokeWidth={2}
            opacity={selectedIndex === -1 || selectedIndex === s.index ? 1 : 0.82}
            onPress={() => onSlicePress?.(s.index)}
          />
        ))}
      </Svg>

      {centerLabel ? (
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              top: geometry.cy - geometry.height / 2,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          {centerLabel}
        </View>
      ) : null}
    </View>
  );
}
