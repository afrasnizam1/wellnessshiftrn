import React from 'react';
import { Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Typography, Spacing, Radius, Gradients } from '../../theme';
import AnimatedPressable from './AnimatedPressable';

type Props = {
  label: string;
  active?: boolean;
  onPress: () => void;
};

export default function FilterChip({ label, active, onPress }: Props) {
  if (active) {
    return (
      <AnimatedPressable onPress={onPress}>
        <LinearGradient
          colors={[...Gradients.brand]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.chipActive}
        >
          <Text style={styles.labelActive}>{label}</Text>
        </LinearGradient>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable onPress={onPress} style={styles.chip}>
      <Text style={styles.label}>{label}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginRight: Spacing.sm,
  },
  chipActive: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    marginRight: Spacing.sm,
  },
  label: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  labelActive: {
    fontSize: Typography.size.sm,
    fontWeight: '700',
    color: Colors.white,
  },
});
