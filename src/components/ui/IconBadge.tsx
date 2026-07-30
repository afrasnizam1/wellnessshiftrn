import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../theme';
import { IconSize, type IoniconName } from '../../theme/icons';

type BadgeSize = 'sm' | 'md' | 'lg';

const BADGE_DIM: Record<BadgeSize, { box: number; radius: number; icon: number }> = {
  sm: { box: 34, radius: 9, icon: IconSize.sm },
  md: { box: 40, radius: 11, icon: IconSize.md },
  lg: { box: 48, radius: 13, icon: IconSize.lg },
};

type Props = {
  name: IoniconName;
  color?: string;
  size?: BadgeSize;
  /** soft = flat tint tile, plain = icon only, solid = filled tile + white icon */
  variant?: 'soft' | 'plain' | 'solid';
  style?: ViewStyle;
};

export function iconTintBg(color: string, alpha = '22'): string {
  return `${color}${alpha}`;
}

/** Flat icon tile — no shadows, single layer. */
export default function IconBadge({
  name,
  color = Colors.primary,
  size = 'md',
  variant = 'soft',
  style,
}: Props) {
  const dim = BADGE_DIM[size];
  const glyphColor = variant === 'solid' ? Colors.white : color;

  return (
    <View
      style={[
        styles.base,
        {
          width: dim.box,
          height: dim.box,
          borderRadius: dim.radius,
          backgroundColor:
            variant === 'soft'
              ? iconTintBg(color)
              : variant === 'solid'
                ? color
                : 'transparent',
        },
        style,
      ]}
    >
      <Ionicons name={name as keyof typeof Ionicons.glyphMap} size={dim.icon} color={glyphColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
