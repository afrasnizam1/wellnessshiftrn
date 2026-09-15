/** Modern circular DNA helix geometry for WellnessOrbitRing — lean SVG paths for smooth spin. */

export const WELLNESS_HELIX_COLORS = [
  '#7A57F5',
  '#FA5C94',
  '#FF8561',
  '#2EDBBD',
  '#389EFA',
  '#9470FA',
];

function hexToRgb(hex: string): [number, number, number] {
  const n = hex.replace('#', '');
  return [
    parseInt(n.slice(0, 2), 16) / 255,
    parseInt(n.slice(2, 4), 16) / 255,
    parseInt(n.slice(4, 6), 16) / 255,
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  const to = (v: number) =>
    Math.round(Math.max(0, Math.min(1, v)) * 255)
      .toString(16)
      .padStart(2, '0');
  return `#${to(r)}${to(g)}${to(b)}`;
}

function blend(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

export function helixColorAt(position: number): string {
  const colors = WELLNESS_HELIX_COLORS.map(hexToRgb);
  const count = colors.length;
  const wrapped = position - Math.floor(position);
  const scaled = wrapped * count;
  const index = Math.floor(scaled) % count;
  const next = (index + 1) % count;
  const t = scaled - Math.floor(scaled);
  const mixed = blend(colors[index], colors[next], t);
  const lifted = blend(mixed, [1, 1, 1], 0.12);
  return rgbToHex(lifted[0], lifted[1], lifted[2]);
}

type Point = { x: number; y: number };

/** Closed Catmull–Rom → cubic Bezier path (one continuous stroke). */
function closedSmoothPath(points: Point[]): string {
  const n = points.length;
  if (n < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < n; i += 1) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return `${d} Z`;
}

export type DnaRingRung = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  mx: number;
  my: number;
  color: string;
  opacity: number;
};

export type DnaRingNode = {
  x: number;
  y: number;
  color: string;
  opacity: number;
  radius: number;
};

export type ModernDnaRing = {
  strandA: string;
  strandB: string;
  strandWidth: number;
  strandAColor: string;
  strandBColor: string;
  rungs: DnaRingRung[];
  nodes: DnaRingNode[];
  trackRadius: number;
  trackWidth: number;
};

/**
 * Lean circular DNA: 2 continuous strand paths + sparse rungs/nodes.
 * Far fewer SVG nodes than the old micro-segment helix → cheaper to spin.
 */
export function buildModernDnaRing(size: number, orbitRadius: number): ModernDnaRing {
  const nodeCount = 24;
  const layoutScale = Math.max(0.78, Math.min(1.12, orbitRadius / 60));
  const helixAmplitude = 8.5 * layoutScale;
  const twists = 5;
  const groove = Math.PI * 0.78;
  const strandWidth = Math.max(2.6, 3.1 * layoutScale);

  const cx = size / 2;
  const cy = size / 2;

  type Node = Point & { z: number; position: number };
  const strand1: Node[] = [];
  const strand2: Node[] = [];

  for (let index = 0; index < nodeCount; index += 1) {
    const position = index / nodeCount;
    const angle = position * Math.PI * 2 - Math.PI / 2;
    const twist = position * Math.PI * 2 * twists;
    const z1 = Math.sin(twist);
    const z2 = Math.sin(twist + groove);
    const r1 = orbitRadius + Math.cos(twist) * helixAmplitude;
    const r2 = orbitRadius + Math.cos(twist + groove) * helixAmplitude;
    strand1.push({
      x: cx + Math.cos(angle) * r1,
      y: cy + Math.sin(angle) * r1,
      z: z1,
      position,
    });
    strand2.push({
      x: cx + Math.cos(angle) * r2,
      y: cy + Math.sin(angle) * r2,
      z: z2,
      position: position + 0.5,
    });
  }

  const rungs: DnaRingRung[] = [];
  const nodes: DnaRingNode[] = [];
  const minSpan = helixAmplitude * 0.5;
  const nodeRadius = Math.max(1.6, 2.1 * layoutScale);

  for (let index = 0; index < nodeCount; index += 3) {
    const a = strand1[index];
    const b = strand2[index];
    const span = Math.hypot(b.x - a.x, b.y - a.y);
    if (span < minSpan) continue;
    const z = (a.z + b.z) / 2;
    const color = helixColorAt((a.position + b.position) / 2);
    const opacity = 0.28 + Math.max(0, z) * 0.42;
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    rungs.push({
      x1: a.x,
      y1: a.y,
      x2: b.x,
      y2: b.y,
      mx,
      my,
      color,
      opacity,
    });
    nodes.push({
      x: mx,
      y: my,
      color,
      opacity: 0.55 + Math.max(0, z) * 0.4,
      radius: nodeRadius * (0.85 + Math.max(0, z) * 0.25),
    });
  }

  return {
    strandA: closedSmoothPath(strand1),
    strandB: closedSmoothPath(strand2),
    strandWidth,
    strandAColor: '#6B5CE7',
    strandBColor: '#2BC4B6',
    rungs,
    nodes,
    trackRadius: orbitRadius,
    trackWidth: Math.max(1, 1.25 * layoutScale),
  };
}

/** @deprecated Prefer buildModernDnaRing — kept for any legacy callers. */
export function buildDnaHelixSegments(size: number, orbitRadius: number) {
  const modern = buildModernDnaRing(size, orbitRadius);
  return {
    strandBack: [
      {
        d: modern.strandA,
        color: modern.strandAColor,
        width: modern.strandWidth * 0.75,
        opacity: 0.35,
      },
      {
        d: modern.strandB,
        color: modern.strandBColor,
        width: modern.strandWidth * 0.75,
        opacity: 0.35,
      },
    ],
    strandFront: [
      {
        d: modern.strandA,
        color: modern.strandAColor,
        width: modern.strandWidth,
        opacity: 0.95,
      },
      {
        d: modern.strandB,
        color: modern.strandBColor,
        width: modern.strandWidth,
        opacity: 0.95,
      },
    ],
    rungsBack: modern.rungs
      .filter((r) => r.opacity < 0.45)
      .map((r) => ({
        x1: r.x1,
        y1: r.y1,
        x2: r.x2,
        y2: r.y2,
        mx: r.mx,
        my: r.my,
        colorA: r.color,
        colorB: r.color,
        width: 1.4,
        opacity: r.opacity,
      })),
    rungsFront: modern.rungs
      .filter((r) => r.opacity >= 0.45)
      .map((r) => ({
        x1: r.x1,
        y1: r.y1,
        x2: r.x2,
        y2: r.y2,
        mx: r.mx,
        my: r.my,
        colorA: r.color,
        colorB: r.color,
        width: 1.6,
        opacity: r.opacity,
      })),
  };
}

export function computeRingLayout(size: number) {
  const layoutScale = size / 200;
  const lineWidth = Math.max(3.5, 4.2 * layoutScale);
  const ringCount = 10;

  const centerDisc = size * 0.26;
  const centerRadius = centerDisc / 2;

  const edgePadding = 4 * layoutScale;
  const maxRadius = size / 2 - edgePadding - lineWidth / 2;

  const maxDiameter = Math.max(centerDisc + 8, maxRadius * 2);

  const ringGap = 3 * layoutScale;
  const minRadius = centerRadius + ringGap + lineWidth / 2;
  const minDiameter = minRadius * 2;
  const sizeStep = (maxDiameter - minDiameter) / (ringCount - 1);

  const outermostRadius = maxDiameter / 2 + lineWidth / 2;
  const dnaGap = 7 * layoutScale;
  const dnaLayoutScale = Math.max(0.78, Math.min(1.12, outermostRadius / 60));
  const helixAmplitude = 8.5 * dnaLayoutScale;
  const backboneHalf = 2.8 * dnaLayoutScale;
  const dnaOrbitRadius = outermostRadius + dnaGap + helixAmplitude + backboneHalf;

  return {
    lineWidth,
    maxDiameter,
    minDiameter,
    ringCount,
    sizeStep,
    dnaOrbitRadius,
    centerDisc,
  };
}

/** Full square panel — category rings + DNA helix glow (matches iOS wellnessRingPanelSide). */
export function computeOrbitPanelSide(size: number): number {
  const layout = computeRingLayout(size);
  const inset = computeHelixCanvasInset(size, layout);
  return size + inset * 2;
}

/** Extra margin so the rotating DNA helix is not clipped by the view bounds. */
export function computeHelixCanvasInset(
  size: number,
  layout: { dnaOrbitRadius: number },
): number {
  const dnaLayoutScale = Math.max(0.78, Math.min(1.12, layout.dnaOrbitRadius / 60));
  const helixAmplitude = 8.5 * dnaLayoutScale;
  const backboneWidth = Math.max(2.8, helixAmplitude * 0.4);
  const glowWidth = backboneWidth + 2.2;
  const helixOuter = layout.dnaOrbitRadius + helixAmplitude + glowWidth / 2;
  return Math.ceil(Math.max(0, helixOuter - size / 2 + 2));
}
