import React from 'react';
import { View, Image, StyleSheet, ViewStyle, StyleProp, PixelRatio } from 'react-native';
import { Shadow } from '../../theme';

/** Pre-cropped square asset — artwork already centered (no optical offset math). */
const LOGO = require('../../assets/images/wellness-shift-logo-badge.png');

type Props = {
  /** Outer white circle diameter — matches iOS auth landing badge (140pt). */
  diameter?: number;
  style?: StyleProp<ViewStyle>;
  /** Logo size as a fraction of the badge diameter. */
  fill?: number;
};

function roundPx(value: number): number {
  return PixelRatio.roundToNearestPixel(value);
}

/**
 * Wellness Shift logo in a white circular badge.
 * Uses a centered square crop of the wordmark so it sits mid-circle.
 */
export default function WellnessShiftLogoBadge({
  diameter = 140,
  style,
  fill = 0.78,
}: Props) {
  const size = roundPx(diameter);
  const logoSize = roundPx(size * fill);

  return (
    <View
      style={[
        styles.badge,
        {
          width: size,
          height: size,
          minWidth: size,
          minHeight: size,
          borderRadius: size / 2,
        },
        Shadow.md,
        style,
      ]}
    >
      <Image
        source={LOGO}
        style={{ width: logoSize, height: logoSize }}
        resizeMode="contain"
        accessibilityLabel="Wellness Shift logo"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
    aspectRatio: 1,
    flexShrink: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
});
