import React, { useEffect, useMemo, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const LIME = '#B8FF3A';
const TEAL = '#2EDBBD';
const BLUE = '#3B6BFF';
const AT_A = '#5CE1E6';
const AT_T = '#F4C15D';
const GC_G = '#7C8CFF';
const GC_C = '#FF7A9A';

type Pt = { x: number; y: number; z: number };

function hypot2(dx: number, dy: number) {
  return Math.hypot(dx, dy) || 1;
}

function ribbonPath(pts: Pt[], halfW: number) {
  if (pts.length < 2) return '';
  const left: Pt[] = [];
  const right: Pt[] = [];
  for (let i = 0; i < pts.length; i += 1) {
    const prev = pts[Math.max(0, i - 1)];
    const next = pts[Math.min(pts.length - 1, i + 1)];
    const dx = next.x - prev.x;
    const dy = next.y - prev.y;
    const len = hypot2(dx, dy);
    const nx = -dy / len;
    const ny = dx / len;
    const w = halfW * (0.62 + Math.max(0, pts[i].z) * 0.55);
    left.push({ x: pts[i].x + nx * w, y: pts[i].y + ny * w, z: pts[i].z });
    right.push({ x: pts[i].x - nx * w, y: pts[i].y - ny * w, z: pts[i].z });
  }
  const d = [
    `M ${left[0].x.toFixed(2)} ${left[0].y.toFixed(2)}`,
    ...left.slice(1).map((p) => `L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`),
    ...right.reverse().map((p) => `L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`),
    'Z',
  ].join(' ');
  return d;
}

function splitRuns(pts: Pt[], front: boolean) {
  const runs: Pt[][] = [];
  let cur: Pt[] = [];
  const isFront = (z: number) => (front ? z >= -0.04 : z < -0.04);
  pts.forEach((p, i) => {
    if (isFront(p.z)) {
      if (cur.length === 0 && i > 0) cur.push(pts[i - 1]);
      cur.push(p);
    } else if (cur.length) {
      if (i < pts.length) cur.push(p);
      if (cur.length >= 2) runs.push(cur);
      cur = [];
    }
  });
  if (cur.length >= 2) runs.push(cur);
  return runs;
}

function buildHelix(phase: number, width: number, height: number, centered: boolean) {
  const cx = centered ? width * 0.5 : width * 0.38;
  const top = 8;
  const bottom = height - 8;
  const radius = width * 0.28;
  const turns = 2.55;
  const samples = 48;
  const groove = Math.PI * 0.72;
  const a: Pt[] = [];
  const b: Pt[] = [];

  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const y = top + (bottom - top) * t;
    const theta = t * Math.PI * 2 * turns + phase;
    const za = Math.sin(theta);
    const zb = Math.sin(theta + groove);
    const perspA = 1 / (1 - za * 0.22);
    const perspB = 1 / (1 - zb * 0.22);
    a.push({ x: cx + Math.cos(theta) * radius * perspA, y, z: za });
    b.push({ x: cx + Math.cos(theta + groove) * radius * perspB, y, z: zb });
  }

  const pairs: {
    ax: number; ay: number; bx: number; by: number;
    mx: number; my: number; z: number; gc: boolean;
  }[] = [];
  for (let i = 3; i < samples - 2; i += 2) {
    const pa = a[i];
    const pb = b[i];
    pairs.push({
      ax: pa.x,
      ay: pa.y,
      bx: pb.x,
      by: pb.y,
      mx: (pa.x + pb.x) / 2,
      my: (pa.y + pb.y) / 2,
      z: (pa.z + pb.z) / 2,
      gc: i % 4 === 1,
    });
  }

  const phosphates = [...a, ...b]
    .filter((_, i) => i % 6 === 0)
    .map((p) => ({ x: p.x, y: p.y, z: p.z }));

  return {
    backA: splitRuns(a, false).map((run) => ribbonPath(run, 2.15)),
    backB: splitRuns(b, false).map((run) => ribbonPath(run, 2.15)),
    frontA: splitRuns(a, true).map((run) => ribbonPath(run, 2.35)),
    frontB: splitRuns(b, true).map((run) => ribbonPath(run, 2.35)),
    pairs,
    phosphates,
  };
}

type Props = {
  size?: number;
  showLabel?: boolean;
  tilt?: boolean;
};

export default memo(function BioAgeDnaMark({ size = 118, showLabel = true, tilt = true }: Props) {
  const spin = useSharedValue(0);

  useEffect(() => {
    if (!tilt) {
      cancelAnimation(spin);
      return;
    }
    spin.value = withRepeat(
      withTiming(360, { duration: 20000, easing: Easing.linear }),
      -1,
      false,
    );
    return () => cancelAnimation(spin);
  }, [tilt, spin]);

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value}deg` }],
  }));

  const dnaW = showLabel ? size * 0.52 : size * 0.82;
  const dnaH = showLabel ? size * 0.78 : size * 0.9;
  const helix = useMemo(() => buildHelix(0.45, dnaW, dnaH, !showLabel), [dnaW, dnaH, showLabel]);
  const gradA = `bioDnaA-${size}`;
  const gradB = `bioDnaB-${size}`;

  return (
    <Animated.View style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }, spinStyle]}>
      <View style={[styles.inner, !showLabel && styles.innerCentered]}>
        <View shouldRasterizeIOS renderToHardwareTextureAndroid collapsable={false}>
          <Svg width={dnaW} height={dnaH} viewBox={`0 0 ${dnaW} ${dnaH}`}>
          <Defs>
            <LinearGradient id={gradA} x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={LIME} />
              <Stop offset="45%" stopColor={TEAL} />
              <Stop offset="100%" stopColor={BLUE} />
            </LinearGradient>
            <LinearGradient id={gradB} x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#D8FF7A" />
              <Stop offset="50%" stopColor="#3EC8E0" />
              <Stop offset="100%" stopColor="#5B6CFF" />
            </LinearGradient>
          </Defs>

          {helix.backA.map((d, i) => (
            <Path key={`ba${i}`} d={d} fill={`url(#${gradA})`} opacity={0.38} />
          ))}
          {helix.backB.map((d, i) => (
            <Path key={`bb${i}`} d={d} fill={`url(#${gradB})`} opacity={0.38} />
          ))}

          {helix.pairs.filter((p) => p.z < 0).map((p, i) => (
            <Path
              key={`bpb${i}`}
              d={`M ${p.ax.toFixed(1)} ${p.ay.toFixed(1)} L ${p.mx.toFixed(1)} ${p.my.toFixed(1)} L ${p.bx.toFixed(1)} ${p.by.toFixed(1)}`}
              stroke={p.gc ? GC_G : AT_A}
              strokeWidth={Math.max(1.2, 2.1 + p.z)}
              strokeOpacity={0.35}
              strokeLinecap="round"
              fill="none"
            />
          ))}

          {helix.pairs.filter((p) => p.z >= 0).map((p, i) => (
            <React.Fragment key={`bpf${i}`}>
              <Path
                d={`M ${p.ax.toFixed(1)} ${p.ay.toFixed(1)} L ${p.mx.toFixed(1)} ${p.my.toFixed(1)}`}
                stroke={p.gc ? GC_G : AT_A}
                strokeWidth={Math.max(1.6, 2.6 + p.z * 0.8)}
                strokeLinecap="round"
                fill="none"
              />
              <Path
                d={`M ${p.mx.toFixed(1)} ${p.my.toFixed(1)} L ${p.bx.toFixed(1)} ${p.by.toFixed(1)}`}
                stroke={p.gc ? GC_C : AT_T}
                strokeWidth={Math.max(1.6, 2.6 + p.z * 0.8)}
                strokeLinecap="round"
                fill="none"
              />
              <Circle cx={p.mx} cy={p.my} r={1.15 + p.z * 0.4} fill="#fff" opacity={0.55} />
            </React.Fragment>
          ))}

          {helix.frontA.map((d, i) => (
            <Path key={`fa${i}`} d={d} fill={`url(#${gradA})`} opacity={0.96} />
          ))}
          {helix.frontB.map((d, i) => (
            <Path key={`fb${i}`} d={d} fill={`url(#${gradB})`} opacity={0.96} />
          ))}

          {helix.phosphates.filter((p) => p.z > 0.15).map((p, i) => (
            <Circle
              key={`ph${i}`}
              cx={p.x}
              cy={p.y}
              r={1.7 + p.z * 0.7}
              fill="#F6FFE8"
              opacity={0.55 + p.z * 0.35}
            />
          ))}
        </Svg>
        </View>
        {showLabel ? (
          <View style={styles.copy}>
            <Text style={styles.word}>Bio</Text>
            <Text style={styles.word}>Age</Text>
          </View>
        ) : null}
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  circle: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    overflow: 'hidden',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 2,
  },
  innerCentered: {
    paddingHorizontal: 0,
    justifyContent: 'center',
  },
  copy: {
    marginLeft: -4,
  },
  word: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.4,
    lineHeight: 20,
  },
});
