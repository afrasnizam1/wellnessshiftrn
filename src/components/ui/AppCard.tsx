import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { Colors, Radius, Spacing, Shadow } from '../../theme';
import AnimatedPressable from './AnimatedPressable';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  padded?: boolean;
  elevated?: boolean;
  onPress?: () => void;
};

/** Modern grouped card with subtle elevation and optional press feedback. */
export default function AppCard({ children, style, padded = true, elevated = true, onPress }: Props) {
  const card = (
    <View style={[
      styles.card,
      elevated && styles.elevated,
      padded && styles.padded,
      style,
    ]}>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <AnimatedPressable onPress={onPress} style={styles.pressWrap}>
        {card}
      </AnimatedPressable>
    );
  }

  return card;
}

const styles = StyleSheet.create({
  pressWrap: { alignSelf: 'stretch' },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  elevated: {
    ...Shadow.sm,
  },
  padded: {
    padding: Spacing.base,
  },
});
