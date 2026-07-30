import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Svg, {
  Polygon,
  Line,
  Circle,
  Ellipse,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius, WELLNESS_CATEGORIES } from '../../theme';
import type { WellnessCategoryKey, WellnessCategoryScores } from '../../types';
import { shortCategoryLabel, scoreLabel } from './chartInteraction';
import type { ChartTapContext } from './chartTapAnalytics';
import { chartTapA11yProps, trackChartCategoryTap } from './chartTapAnalytics';

type Props = {
  categories?: WellnessCategoryScores;
  size?: number;
  selectedCategory?: WellnessCategoryKey | null;
  onCategoryPress?: (key: WellnessCategoryKey | null) => void;
  analytics?: ChartTapContext;
};

type Point3 = { x: number; y: number; z: number };
type Point2 = { x: number; y: number; z: number };

const DEFAULT_TILT_X = -0.42;
const DEFAULT_TILT_Y = 0.55;
const AUTO_SPIN = 0.0016;

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function transform(p: Point3, rotX: number, rotY: number, cx: number, cy: number): Point2 {
  let { x, y, z } = p;
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);
  const x1 = x * cosY + z * sinY;
  const z1 = -x * sinY + z * cosY;
  x = x1;
  z = z1;

  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);
  const y1 = y * cosX - z * sinX;
  const z2 = y * sinX + z * cosX;
  y = y1;
  z = z2;

  const perspective = 520 / (520 + z);
  return {
    x: cx + x * perspective,
    y: cy - y * perspective,
    z,
  };
}

function avgZ(points: Point2[]) {
  return points.reduce((s, p) => s + p.z, 0) / points.length;
}

function poly(points: Point2[]) {
  return points.map((p) => `${p.x},${p.y}`).join(' ');
}

function spokeAngle(i: number, count: number) {
  return (Math.PI * 2 * i) / count - Math.PI / 2;
}

function spokeXY(r: number, angle: number): { x: number; y: number } {
  return { x: r * Math.cos(angle), y: r * Math.sin(angle) };
}

export default function CategoryRadarChart({
  categories,
  size = 240,
  selectedCategory = null,
  onCategoryPress,
  analytics,
}: Props) {
  const cx = size / 2;
  const cy = size / 2 + 6;
  const maxR = size * 0.3;
  const maxHeight = size * 0.34;
  const count = WELLNESS_CATEGORIES.length;

  const [rot, setRot] = useState({ x: DEFAULT_TILT_X, y: DEFAULT_TILT_Y });
  const rotX = rot.x;
  const rotY = rot.y;

  const tiltRef = useRef({ x: DEFAULT_TILT_X, y: DEFAULT_TILT_Y });
  const dragStart = useRef({ x: DEFAULT_TILT_X, y: DEFAULT_TILT_Y });
  const velRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef<{ x: number; y: number } | null>(null);
  const modeRef = useRef<'idle' | 'drag' | 'momentum' | 'reset'>('idle');
  const rafRef = useRef<number | null>(null);
  const selectedRef = useRef<WellnessCategoryKey | null>(selectedCategory);

  useEffect(() => {
    selectedRef.current = selectedCategory;
  }, [selectedCategory]);

  const apply = useCallback((x: number, y: number) => {
    const nx = clamp(x, -1.15, 0.25);
    tiltRef.current = { x: nx, y };
    setRot({ x: nx, y });
  }, []);

  // Single rAF loop drives momentum, eased reset, and gentle idle auto-rotation.
  useEffect(() => {
    const FRICTION = 0.92;
    const tick = () => {
      const cur = tiltRef.current;
      const mode = modeRef.current;
      if (mode === 'momentum') {
        const v = velRef.current;
        apply(cur.x + v.x, cur.y + v.y);
        v.x *= FRICTION;
        v.y *= FRICTION;
        if (Math.abs(v.x) < 0.0003 && Math.abs(v.y) < 0.0003) {
          modeRef.current = 'idle';
        }
      } else if (mode === 'reset' && targetRef.current) {
        const t = targetRef.current;
        const nx = cur.x + (t.x - cur.x) * 0.16;
        const ny = cur.y + (t.y - cur.y) * 0.16;
        if (Math.abs(t.x - nx) < 0.0015 && Math.abs(t.y - ny) < 0.0015) {
          apply(t.x, t.y);
          targetRef.current = null;
          modeRef.current = 'idle';
        } else {
          apply(nx, ny);
        }
      } else if (mode === 'idle' && !selectedRef.current) {
        apply(cur.x, cur.y + AUTO_SPIN);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [apply]);

  // Intro reveal: ease from a pulled-back angle into the default tilt.
  useEffect(() => {
    tiltRef.current = { x: DEFAULT_TILT_X, y: DEFAULT_TILT_Y - 0.85 };
    setRot({ x: DEFAULT_TILT_X, y: DEFAULT_TILT_Y - 0.85 });
    targetRef.current = { x: DEFAULT_TILT_X, y: DEFAULT_TILT_Y };
    modeRef.current = 'reset';
  }, []);

  const toggleCategory = useCallback(
    (key: WellnessCategoryKey) => {
      const deselecting = selectedCategory === key;
      if (analytics && !deselecting) {
        trackChartCategoryTap(analytics, key);
      }
      onCategoryPress?.(deselecting ? null : key);
    },
    [analytics, onCategoryPress, selectedCategory],
  );

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .runOnJS(true)
        .onBegin(() => {
          modeRef.current = 'drag';
          dragStart.current = { ...tiltRef.current };
          velRef.current = { x: 0, y: 0 };
        })
        .onUpdate((e) => {
          if (modeRef.current !== 'drag') return;
          apply(
            dragStart.current.x - e.translationY * 0.009,
            dragStart.current.y + e.translationX * 0.009,
          );
        })
        .onEnd((e) => {
          velRef.current = {
            x: clamp(-e.velocityY * 0.00004, -0.06, 0.06),
            y: clamp(e.velocityX * 0.00004, -0.06, 0.06),
          };
          modeRef.current = 'momentum';
        })
        .onFinalize(() => {
          if (modeRef.current === 'drag') modeRef.current = 'idle';
        }),
    [apply],
  );

  const resetTilt = useCallback(() => {
    velRef.current = { x: 0, y: 0 };
    targetRef.current = { x: DEFAULT_TILT_X, y: DEFAULT_TILT_Y };
    modeRef.current = 'reset';
  }, []);

  const geometry = useMemo(() => {
    const to2 = (p: Point3) => transform(p, rotX, rotY, cx, cy);

    const scores = WELLNESS_CATEGORIES.map(
      (cat) => categories?.[cat.key as WellnessCategoryKey] ?? 0,
    );

    const baseVerts: Point3[] = [];
    const topVerts: Point3[] = [];
    const meta: {
      key: WellnessCategoryKey;
      label: string;
      score: number;
      color: string;
      top2: Point2;
    }[] = [];

    for (let i = 0; i < count; i++) {
      const angle = spokeAngle(i, count);
      const { x, y } = spokeXY(maxR, angle);
      const zTop = (scores[i] / 10) * maxHeight;
      baseVerts.push({ x, y, z: 0 });
      topVerts.push({ x, y, z: zTop });
      const top2 = to2({ x, y, z: zTop });
      meta.push({
        key: WELLNESS_CATEGORIES[i].key as WellnessCategoryKey,
        label: shortCategoryLabel(WELLNESS_CATEGORIES[i].label).slice(0, 3),
        score: scores[i],
        color: WELLNESS_CATEGORIES[i].color,
        top2,
      });
    }

    const centerBase = to2({ x: 0, y: 0, z: 0 });
    const centerTop = to2({ x: 0, y: 0, z: maxHeight * 0.04 });

    const gridLevels = [0.25, 0.5, 0.75, 1];
    const gridRings = gridLevels.map((level) => {
      const z = level * maxHeight;
      const ring = baseVerts.map((v) => to2({ x: v.x, y: v.y, z }));
      return { level, ring, z: avgZ(ring) };
    });

    const axisLines = baseVerts.map((v) => ({
      from: centerBase,
      to: to2(v),
      z: avgZ([centerBase, to2(v)]),
    }));

    const wallFaces: { pts: Point2[]; color: string; z: number }[] = [];
    for (let i = 0; i < count; i++) {
      const j = (i + 1) % count;
      const b0 = to2(baseVerts[i]);
      const b1 = to2(baseVerts[j]);
      const t0 = to2(topVerts[i]);
      const t1 = to2(topVerts[j]);
      const color = WELLNESS_CATEGORIES[i].color;
      wallFaces.push({
        pts: [b0, b1, t1, t0],
        color,
        z: avgZ([b0, b1, t1, t0]),
      });
    }

    const topRing = topVerts.map((v) => to2(v));
    const topZ = avgZ(topRing);

    const pillarLines = topVerts.map((v, i) => ({
      from: to2(baseVerts[i]),
      to: to2(v),
      color: WELLNESS_CATEGORIES[i].color,
      z: avgZ([to2(baseVerts[i]), to2(v)]),
    }));

    const shadow = {
      cx,
      cy: cy + maxR * 0.55,
      rx: maxR * 1.05,
      ry: maxR * 0.28,
      z: -maxHeight,
    };

    const sortedWalls = [...wallFaces].sort((a, b) => a.z - b.z);
    const sortedGrid = [...gridRings].sort((a, b) => a.z - b.z);

    return {
      meta,
      centerBase,
      centerTop,
      gridRings: sortedGrid,
      axisLines,
      wallFaces: sortedWalls,
      topRing,
      topZ,
      pillarLines,
      shadow,
    };
  }, [categories, rotX, rotY, cx, cy, maxR, maxHeight, count]);

  const selectedMeta = selectedCategory
    ? geometry.meta.find((m) => m.key === selectedCategory)
    : null;

  return (
    <View style={[styles.wrap, { width: size, height: size + 88 }]}>
      <View style={styles.toolbar}>
        <Text style={styles.hint}>Drag to rotate · Tap a label</Text>
        <TouchableOpacity style={styles.resetBtn} onPress={resetTilt} hitSlop={8}>
          <Ionicons name="refresh-outline" size={14} color={Colors.brand} />
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <GestureDetector gesture={pan}>
        <View style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          <Defs>
            <LinearGradient id="radarTop" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={Colors.primary} stopOpacity="0.55" />
              <Stop offset="1" stopColor={Colors.accent} stopOpacity="0.35" />
            </LinearGradient>
          </Defs>

          <Ellipse
            cx={geometry.shadow.cx}
            cy={geometry.shadow.cy}
            rx={geometry.shadow.rx}
            ry={geometry.shadow.ry}
            fill="rgba(0,0,0,0.08)"
          />

          {geometry.axisLines
            .slice()
            .sort((a, b) => a.z - b.z)
            .map((axis, i) => (
              <Line
                key={`axis-${i}`}
                x1={axis.from.x}
                y1={axis.from.y}
                x2={axis.to.x}
                y2={axis.to.y}
                stroke={Colors.borderLight}
                strokeWidth={1}
              />
            ))}

          {geometry.gridRings.map((ring) => (
            <Polygon
              key={`grid-${ring.level}`}
              points={poly(ring.ring)}
              fill="none"
              stroke={Colors.borderLight}
              strokeWidth={0.8}
              opacity={0.55 + ring.level * 0.15}
            />
          ))}

          {geometry.wallFaces.map((face, i) => (
            <Polygon
              key={`wall-${i}`}
              points={poly(face.pts)}
              fill={face.color + (selectedCategory ? '28' : '38')}
              stroke={face.color + '66'}
              strokeWidth={0.6}
            />
          ))}

          <Polygon
            points={poly(geometry.topRing)}
            fill="url(#radarTop)"
            stroke={Colors.primary}
            strokeWidth={2}
          />

          {geometry.pillarLines.map((pillar, i) => (
            <Line
              key={`pillar-${i}`}
              x1={pillar.from.x}
              y1={pillar.from.y}
              x2={pillar.to.x}
              y2={pillar.to.y}
              stroke={pillar.color}
              strokeWidth={selectedCategory === geometry.meta[i]?.key ? 2.5 : 1.5}
              opacity={0.85}
            />
          ))}

          {geometry.meta.map((m) => (
            <Circle
              key={`dot-${m.key}`}
              cx={m.top2.x}
              cy={m.top2.y}
              r={selectedCategory === m.key ? 5.5 : 4}
              fill={m.color}
              stroke={Colors.white}
              strokeWidth={1.5}
            />
          ))}

          <Circle cx={geometry.centerTop.x} cy={geometry.centerTop.y} r={3} fill={Colors.primary} opacity={0.5} />
        </Svg>

        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          {geometry.meta.map((m) => {
            const angle = spokeAngle(
              WELLNESS_CATEGORIES.findIndex((c) => c.key === m.key),
              count,
            );
            const lx = cx + Math.cos(angle) * (maxR + 22);
            const ly = cy + Math.sin(angle) * (maxR + 22);
            const isSelected = selectedCategory === m.key;
            return (
              <TouchableOpacity
                key={`lbl-${m.key}`}
                style={[
                  styles.labelHit,
                  {
                    left: lx - 18,
                    top: ly - 14,
                    backgroundColor: isSelected ? m.color + '22' : 'transparent',
                    borderColor: isSelected ? m.color : 'transparent',
                  },
                ]}
                onPress={() => toggleCategory(m.key)}
                activeOpacity={0.7}
                {...(analytics ? chartTapA11yProps(analytics, m.key) : {})}
              >
                <Text
                  style={[
                    styles.axisLabel,
                    {
                      color: isSelected ? m.color : Colors.textSecondary,
                      fontWeight: isSelected ? '800' : '600',
                    },
                  ]}
                >
                  {m.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        </View>
      </GestureDetector>

      {selectedMeta ? (
        <View style={[styles.detailCard, { borderColor: selectedMeta.color + '44' }]}>
          <View style={[styles.detailDot, { backgroundColor: selectedMeta.color }]} />
          <View style={styles.detailBody}>
            <Text style={styles.detailTitle}>
              {getCategoryFullLabel(selectedMeta.key)}
            </Text>
            <Text style={[styles.detailScore, { color: selectedMeta.color }]}>
              {selectedMeta.score.toFixed(1)}/10 · {scoreLabel(selectedMeta.score)}
            </Text>
          </View>
          <TouchableOpacity onPress={() => onCategoryPress?.(null)} hitSlop={8}>
            <Ionicons name="close-circle" size={20} color={Colors.textTertiary} />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

function getCategoryFullLabel(key: WellnessCategoryKey) {
  return shortCategoryLabel(WELLNESS_CATEGORIES.find((c) => c.key === key)?.label ?? key);
}

const styles = StyleSheet.create({
  wrap: { alignSelf: 'center' },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
    paddingHorizontal: 2,
  },
  hint: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.pill,
    backgroundColor: Colors.brandSubtle,
  },
  resetText: {
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: Colors.brand,
  },
  labelHit: {
    position: 'absolute',
    width: 36,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
  },
  axisLabel: {
    fontSize: 9,
    textAlign: 'center',
  },
  detailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: StyleSheet.hairlineWidth,
  },
  detailDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  detailBody: { flex: 1 },
  detailTitle: {
    fontSize: Typography.size.sm,
    fontWeight: '700',
    color: Colors.text,
  },
  detailScore: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
    marginTop: 1,
  },
});
