import React from 'react';
import Svg, {
  Circle,
  Ellipse,
  Path,
  Defs,
  LinearGradient,
  Stop,
  G,
} from 'react-native-svg';
import type { MoodLevel } from '../../types';

type Props = {
  mood: MoodLevel;
  size?: number;
};

/**
 * Soft filled mood faces — expressive, modern, consistent stroke weight.
 */
export default function MoodFaceIcon({ mood, size = 40 }: Props) {
  const s = size;
  switch (mood) {
    case 'veryLow':
    case 'low':
      return <LowFace size={s} />;
    case 'neutral':
      return <OkayFace size={s} />;
    case 'good':
      return <GoodFace size={s} />;
    case 'great':
      return <GreatFace size={s} />;
    default:
      return <OkayFace size={s} />;
  }
}

function LowFace({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <Defs>
        <LinearGradient id="lowFill" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#A78BFA" />
          <Stop offset="100%" stopColor="#7C6FD6" />
        </LinearGradient>
      </Defs>
      <Circle cx="32" cy="32" r="28" fill="url(#lowFill)" />
      <Circle cx="32" cy="32" r="28" fill="rgba(255,255,255,0.12)" />
      {/* soft brows */}
      <Path
        d="M18 24c3-3 8-3.5 11-1"
        stroke="#4C1D95"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
        opacity={0.55}
      />
      <Path
        d="M35 23c3-2.5 8-2 11 1"
        stroke="#4C1D95"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
        opacity={0.55}
      />
      <Circle cx="23.5" cy="30" r="3.2" fill="#312E81" />
      <Circle cx="40.5" cy="30" r="3.2" fill="#312E81" />
      <Circle cx="24.6" cy="28.8" r="1.1" fill="#EDE9FE" />
      <Circle cx="41.6" cy="28.8" r="1.1" fill="#EDE9FE" />
      <Path
        d="M23 44c3.5-5 14.5-5 18 0"
        stroke="#312E81"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

function OkayFace({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <Defs>
        <LinearGradient id="okayFill" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#94A3B8" />
          <Stop offset="100%" stopColor="#64748B" />
        </LinearGradient>
      </Defs>
      <Circle cx="32" cy="32" r="28" fill="url(#okayFill)" />
      <Circle cx="32" cy="32" r="28" fill="rgba(255,255,255,0.14)" />
      <Circle cx="23.5" cy="29.5" r="3.2" fill="#1E293B" />
      <Circle cx="40.5" cy="29.5" r="3.2" fill="#1E293B" />
      <Circle cx="24.6" cy="28.3" r="1.1" fill="#F1F5F9" />
      <Circle cx="41.6" cy="28.3" r="1.1" fill="#F1F5F9" />
      <Path
        d="M23 42.5h18"
        stroke="#1E293B"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </Svg>
  );
}

function GoodFace({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <Defs>
        <LinearGradient id="goodFill" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#4ADE80" />
          <Stop offset="100%" stopColor="#16A34A" />
        </LinearGradient>
      </Defs>
      <Circle cx="32" cy="32" r="28" fill="url(#goodFill)" />
      <Circle cx="32" cy="32" r="28" fill="rgba(255,255,255,0.14)" />
      <Circle cx="23.5" cy="29" r="3.2" fill="#14532D" />
      <Circle cx="40.5" cy="29" r="3.2" fill="#14532D" />
      <Circle cx="24.6" cy="27.8" r="1.1" fill="#ECFDF5" />
      <Circle cx="41.6" cy="27.8" r="1.1" fill="#ECFDF5" />
      {/* soft cheeks */}
      <Ellipse cx="18" cy="36" rx="4.5" ry="2.8" fill="#86EFAC" opacity={0.65} />
      <Ellipse cx="46" cy="36" rx="4.5" ry="2.8" fill="#86EFAC" opacity={0.65} />
      <Path
        d="M22 39c3.5 6 16.5 6 20 0"
        stroke="#14532D"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

function GreatFace({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <Defs>
        <LinearGradient id="greatFill" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#FBBF24" />
          <Stop offset="100%" stopColor="#F59E0B" />
        </LinearGradient>
      </Defs>
      <G>
        {/* sparkles around face */}
        <Path
          d="M8 18l1.4 3.2L12.6 22.6 9.4 24l-1.4 3.2L6.6 24 3.4 22.6 6.6 21.2z"
          fill="#F59E0B"
          opacity={0.9}
        />
        <Path
          d="M54 14l1.1 2.5L57.6 17.6 55.1 18.7 54 21.2 52.9 18.7 50.4 17.6 52.9 16.5z"
          fill="#FBBF24"
        />
        <Path
          d="M56 42l0.9 2L59 45l-2.1 0.9L56 48l-0.9-2.1L53 45l2.1-1z"
          fill="#F59E0B"
          opacity={0.85}
        />
      </G>
      <Circle cx="32" cy="33" r="26" fill="url(#greatFill)" />
      <Circle cx="32" cy="33" r="26" fill="rgba(255,255,255,0.16)" />
      {/* happy squinted eyes */}
      <Path
        d="M17 29c2.2-3.5 7-3.5 9.2 0"
        stroke="#78350F"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M37.8 29c2.2-3.5 7-3.5 9.2 0"
        stroke="#78350F"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />
      <Ellipse cx="18" cy="38" rx="5" ry="3" fill="#FDE68A" opacity={0.75} />
      <Ellipse cx="46" cy="38" rx="5" ry="3" fill="#FDE68A" opacity={0.75} />
      {/* open smile */}
      <Path
        d="M20 40c4 9 20 9 24 0"
        stroke="#78350F"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M24 41c3 5.5 13 5.5 16 0"
        fill="#B45309"
        opacity={0.35}
      />
    </Svg>
  );
}
