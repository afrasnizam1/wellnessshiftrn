import React from 'react';
import { Image } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import type { MoodLevel } from '../../types';

type Props = {
  mood: MoodLevel;
  size?: number;
};

const MOOD_IMAGES: Record<MoodLevel, ImageSourcePropType> = {
  veryLow: require('../../assets/images/mood/mood-low.png'),
  low: require('../../assets/images/mood/mood-low.png'),
  neutral: require('../../assets/images/mood/mood-okay.png'),
  good: require('../../assets/images/mood/mood-good.png'),
  great: require('../../assets/images/mood/mood-great.png'),
};

/**
 * Premium illustrated mood faces — retina PNG assets with soft 3D lighting.
 */
export default function MoodFaceIcon({ mood, size = 56 }: Props) {
  const source = MOOD_IMAGES[mood] ?? MOOD_IMAGES.neutral;

  return (
    <Image
      source={source}
      style={{ width: size, height: size }}
      resizeMode="contain"
      accessibilityIgnoresInvertColors
    />
  );
}
