import React, { memo } from 'react';
import Svg, {
  Circle,
  Defs,
  Line,
  LinearGradient,
  Path,
  Polygon,
  Rect,
  Stop,
} from 'react-native-svg';

const GLYPH_IDS = new Set([
  'number-sequence',
  'quick-math',
  'word-recall',
  'memory-match',
  'reaction-time',
  'pattern-recognition',
  'color-match',
  'attention-switch',
  'speed-reading',
  'focus-training',
  'visual-puzzle',
  'mental-rotation',
]);

export function hasFuturisticGlyph(moduleId: string) {
  return GLYPH_IDS.has(moduleId);
}

type Props = {
  moduleId: string;
  color: string;
  size?: number;
  /** Use on light pastel chips — solid strokes, no white highlights. */
  tone?: 'dark' | 'light';
};

function gid(moduleId: string, suffix: string) {
  return `${moduleId.replace(/[^a-z0-9]/gi, '')}-${suffix}`;
}

function FuturisticModuleGlyph({ moduleId, color, size = 48, tone = 'dark' }: Props) {
  const glow = gid(moduleId, 'glow');
  const fade = gid(moduleId, 'fade');
  const light = tone === 'light';
  const stroke = light ? color : `url(#${glow})`;
  const highlight = light ? color : '#fff';

  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Defs>
        <LinearGradient id={glow} x1="8" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <Stop offset="0.35" stopColor={color} stopOpacity="1" />
          <Stop offset="1" stopColor={color} stopOpacity="0.55" />
        </LinearGradient>
        <LinearGradient id={fade} x1="24" y1="4" x2="24" y2="44" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor={color} stopOpacity={light ? 0.12 : 0.28} />
          <Stop offset="1" stopColor={color} stopOpacity={light ? 0.02 : 0.04} />
        </LinearGradient>
      </Defs>
      {!light ? <Circle cx="24" cy="24" r="21" fill={`url(#${fade})`} /> : null}
      {!light ? (
        <Circle cx="24" cy="24" r="20.5" fill="none" stroke={color} strokeOpacity="0.22" strokeWidth="1" />
      ) : null}
      <Mark id={moduleId} stroke={stroke} accent={color} highlight={highlight} />
    </Svg>
  );
}

function Mark({
  id,
  stroke,
  accent,
  highlight,
}: {
  id: string;
  stroke: string;
  accent: string;
  highlight: string;
}) {
  switch (id) {
    case 'number-sequence':
      return (
        <>
          <Path
            d="M10 32 L18 24 L26 28 L38 14"
            fill="none"
            stroke={stroke}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Circle cx="10" cy="32" r="3.1" fill={accent} />
          <Circle cx="18" cy="24" r="3.1" fill={accent} />
          <Circle cx="26" cy="28" r="3.1" fill={accent} />
          <Circle cx="38" cy="14" r="3.4" fill={highlight} stroke={accent} strokeWidth="1.4" />
          <Line x1="38" y1="14" x2="38" y2="8" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
        </>
      );
    case 'quick-math':
      return (
        <>
          <Polygon
            points="24,7 39,16 39,32 24,41 9,32 9,16"
            fill="none"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <Line x1="18" y1="24" x2="30" y2="24" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
          <Line x1="24" y1="18" x2="24" y2="30" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
          <Circle cx="24" cy="24" r="3" fill={accent} opacity="0.9" />
          <Circle cx="24" cy="7" r="1.6" fill={highlight} />
          <Circle cx="39" cy="32" r="1.6" fill={highlight} />
          <Circle cx="9" cy="32" r="1.6" fill={highlight} />
        </>
      );
    case 'word-recall':
      return (
        <>
          <Circle cx="24" cy="22" r="9" fill="none" stroke={stroke} strokeWidth="1.8" />
          <Circle cx="24" cy="22" r="4.2" fill={accent} opacity="0.85" />
          <Path
            d="M16 33 C18 29, 30 29, 32 33"
            fill="none"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <Path
            d="M12 18 C10 12, 16 8, 22 10"
            fill="none"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <Path
            d="M36 18 C38 12, 32 8, 26 10"
            fill="none"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <Circle cx="14" cy="12" r="1.8" fill={highlight} />
          <Circle cx="34" cy="12" r="1.8" fill={highlight} />
        </>
      );
    case 'memory-match':
      return (
        <>
          <Rect x="9" y="12" width="14" height="18" rx="3" fill="none" stroke={stroke} strokeWidth="1.8" />
          <Rect x="25" y="18" width="14" height="18" rx="3" fill="none" stroke={stroke} strokeWidth="1.8" />
          <Line x1="23" y1="21" x2="25" y2="27" stroke={stroke} strokeWidth="1.6" />
          <Circle cx="16" cy="21" r="2.2" fill={accent} />
          <Circle cx="32" cy="27" r="2.2" fill={accent} />
        </>
      );
    case 'reaction-time':
      return (
        <>
          <Circle cx="24" cy="24" r="13" fill="none" stroke={stroke} strokeWidth="1.6" />
          <Circle cx="24" cy="24" r="7" fill="none" stroke={stroke} strokeWidth="1.8" />
          <Line x1="24" y1="8" x2="24" y2="16" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
          <Line x1="24" y1="32" x2="24" y2="40" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
          <Line x1="8" y1="24" x2="16" y2="24" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
          <Line x1="32" y1="24" x2="40" y2="24" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
          <Circle cx="24" cy="24" r="2.4" fill={highlight} />
        </>
      );
    case 'pattern-recognition':
      return (
        <>
          <Rect x="10" y="10" width="11" height="11" rx="2" fill="none" stroke={stroke} strokeWidth="1.7" />
          <Rect x="27" y="10" width="11" height="11" rx="2" fill={accent} opacity="0.9" />
          <Rect x="10" y="27" width="11" height="11" rx="2" fill={accent} opacity="0.45" />
          <Rect x="27" y="27" width="11" height="11" rx="2" fill="none" stroke={stroke} strokeWidth="1.7" />
        </>
      );
    case 'color-match':
      return (
        <>
          <Circle cx="19" cy="22" r="9" fill="none" stroke={stroke} strokeWidth="1.8" />
          <Circle cx="29" cy="22" r="9" fill="none" stroke={stroke} strokeWidth="1.8" />
          <Circle cx="24" cy="22" r="3.2" fill={highlight} />
        </>
      );
    case 'attention-switch':
      return (
        <>
          <Path d="M14 18 L24 10 L34 18" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M34 30 L24 38 L14 30" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Circle cx="24" cy="24" r="3.2" fill={accent} />
        </>
      );
    case 'speed-reading':
      return (
        <>
          <Path d="M12 14 H36" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          <Path d="M12 22 H30" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          <Path d="M12 30 H34" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          <Path d="M12 38 H24" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          <Polygon points="34,18 41,24 34,30" fill={accent} />
        </>
      );
    case 'focus-training':
      return (
        <>
          <Circle cx="24" cy="24" r="14" fill="none" stroke={stroke} strokeWidth="1.5" />
          <Circle cx="24" cy="24" r="8" fill="none" stroke={stroke} strokeWidth="1.7" />
          <Circle cx="24" cy="24" r="3" fill={highlight} />
        </>
      );
    case 'visual-puzzle':
      return (
        <>
          <Path d="M24 9 L38 17 L38 31 L24 39 L10 31 L10 17 Z" fill="none" stroke={stroke} strokeWidth="1.8" />
          <Path d="M10 17 L24 25 L38 17" fill="none" stroke={stroke} strokeWidth="1.5" />
          <Path d="M24 25 L24 39" stroke={stroke} strokeWidth="1.5" />
        </>
      );
    case 'mental-rotation':
      return (
        <>
          <Polygon points="24,10 36,34 12,34" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinejoin="round" />
          <Path d="M34 14 A14 14 0 0 1 38 28" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
          <Polygon points="38,24 42,30 34,30" fill={accent} />
        </>
      );
    default:
      return (
        <>
          <Circle cx="24" cy="24" r="8" fill="none" stroke={stroke} strokeWidth="1.8" />
          <Circle cx="24" cy="24" r="3" fill={accent} />
        </>
      );
  }
}

export default memo(FuturisticModuleGlyph);
