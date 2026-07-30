/** Port of iOS WellnessOrbitRingView gradient palette */
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
  const to = (v: number) => Math.round(Math.max(0, Math.min(1, v)) * 255)
    .toString(16)
    .padStart(2, '0');
  return `#${to(r)}${to(g)}${to(b)}`;
}

function blend(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
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
  const lifted = blend(mixed, [1, 1, 1], 0.08);
  return rgbToHex(lifted[0], lifted[1], lifted[2]);
}

type Point = { x: number; y: number };

function smoothSegmentD(points: Point[], index: number): string {
  const count = points.length;
  const previous = points[(index - 1 + count) % count];
  const start = points[index];
  const end = points[(index + 1) % count];
  const next = points[(index + 2) % count];

  const c1x = start.x + (end.x - previous.x) / 6;
  const c1y = start.y + (end.y - previous.y) / 6;
  const c2x = end.x - (next.x - start.x) / 6;
  const c2y = end.y - (next.y - start.y) / 6;

  return `M ${start.x} ${start.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${end.x} ${end.y}`;
}

export type HelixSegment = { d: string; color: string; width: number; opacity?: number };

export function buildDnaHelixSegments(
  size: number,
  orbitRadius: number,
): { strand1: HelixSegment[]; strand2: HelixSegment[] } {
  const nodeCount = 52;
  const layoutScale = Math.max(0.78, Math.min(1.12, orbitRadius / 60));
  const helixAmplitude = 10 * layoutScale;
  const helixFrequency = 5.5;
  const backboneWidth = Math.max(3.6, helixAmplitude * 0.46);
  const glowWidth = backboneWidth + 2.8;

  const cx = size / 2;
  const cy = size / 2;

  const strand1: Point[] = [];
  const strand2: Point[] = [];
  const positions: number[] = [];

  for (let index = 0; index < nodeCount; index += 1) {
    const position = index / nodeCount;
    const angle = position * Math.PI * 2 - Math.PI / 2;
    const wave = Math.sin(angle * helixFrequency);
    const r1 = orbitRadius + wave * helixAmplitude;
    const r2 = orbitRadius - wave * helixAmplitude;

    strand1.push({ x: cx + Math.cos(angle) * r1, y: cy + Math.sin(angle) * r1 });
    strand2.push({ x: cx + Math.cos(angle) * r2, y: cy + Math.sin(angle) * r2 });
    positions.push(position);
  }

  const buildStrand = (points: Point[], phaseOffset: number): HelixSegment[] => {
    const segments: HelixSegment[] = [];
    for (let index = 0; index < nodeCount; index += 1) {
      const next = (index + 1) % nodeCount;
      const midPosition = (positions[index] + positions[next]) / 2 + phaseOffset;
      const d = smoothSegmentD(points, index);
      const color = helixColorAt(midPosition);

      segments.push({ d, color, width: glowWidth, opacity: 0.22 });
      segments.push({ d, color, width: backboneWidth });
      segments.push({ d, color, width: Math.max(1.2, backboneWidth * 0.35), opacity: 0.35 });
    }
    return segments;
  };

  return {
    strand1: buildStrand(strand1, 0),
    strand2: buildStrand(strand2, 0.5),
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
  const dnaGap = 8 * layoutScale;
  const dnaLayoutScale = Math.max(0.78, Math.min(1.12, outermostRadius / 60));
  const helixAmplitude = 10 * dnaLayoutScale;
  const backboneHalf = 3.25 * dnaLayoutScale;
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
  const helixAmplitude = 10 * dnaLayoutScale;
  const backboneWidth = Math.max(3.6, helixAmplitude * 0.46);
  const glowWidth = backboneWidth + 2.8;
  const helixOuter = layout.dnaOrbitRadius + helixAmplitude + glowWidth / 2;
  return Math.ceil(Math.max(0, helixOuter - size / 2 + 2));
}
