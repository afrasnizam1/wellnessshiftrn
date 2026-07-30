import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  type ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Typography, Radius, Gradients, Shadow } from '../../theme';
import AnimatedPressable from './AnimatedPressable';

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  compact?: boolean;
  variant?: 'brand' | 'primary' | 'outline';
  style?: ViewStyle;
};

export default function BrandButton({
  label,
  onPress,
  loading,
  disabled,
  compact,
  variant = 'brand',
  style,
}: Props) {
  const isDisabled = disabled || loading;

  if (variant === 'outline') {
    return (
      <AnimatedPressable
        onPress={onPress}
        disabled={isDisabled}
        style={[styles.wrap, style]}
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        <View style={[styles.outlineBtn, compact && styles.btnCompact, isDisabled && styles.disabled]}>
          {loading ? (
            <ActivityIndicator color={Colors.primary} size="small" />
          ) : (
            <Text style={[styles.outlineLabel, compact && styles.labelCompact]}>{label}</Text>
          )}
        </View>
      </AnimatedPressable>
    );
  }

  const colors = variant === 'primary' ? [...Gradients.primary] : [...Gradients.brandDeep];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.88}
      style={[styles.wrap, styles.wrapGlow, style, isDisabled && styles.disabled]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={[styles.btn, compact && styles.btnCompact]}>
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
          pointerEvents="none"
        />
        <View style={styles.labelWrap} pointerEvents="none">
          {loading ? (
            <ActivityIndicator color={Colors.white} size="small" />
          ) : (
            <Text
              style={[styles.label, compact && styles.labelCompact]}
              numberOfLines={2}
            >
              {label}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrap: { alignSelf: 'stretch' },
  wrapGlow: { ...Shadow.glow(Colors.brand) },
  btn: {
    width: '100%',
    minHeight: 52,
    borderRadius: Radius.pill,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: Colors.brandDark,
  },
  labelWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  outlineBtn: {
    borderRadius: Radius.pill,
    paddingVertical: 15,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primary,
    backgroundColor: Colors.surface,
  },
  btnCompact: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    minHeight: 44,
  },
  disabled: { opacity: 0.55 },
  label: {
    color: Colors.white,
    fontSize: Typography.size.base,
    fontWeight: '700',
    letterSpacing: -0.2,
    textAlign: 'center',
  },
  outlineLabel: {
    color: Colors.primary,
    fontSize: Typography.size.base,
    fontWeight: '700',
  },
  labelCompact: {
    fontSize: Typography.size.sm,
  },
});
