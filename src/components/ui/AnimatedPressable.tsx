import React from 'react';
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Animation } from '../../theme';

const AnimatedPressableBase = Animated.createAnimatedComponent(Pressable);

type Props = Omit<PressableProps, 'style'> & {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  scaleTo?: number;
};

/** Spring-animated pressable — subtle scale feedback on touch. */
export default function AnimatedPressable({
  children,
  style,
  scaleTo = Animation.pressScale,
  disabled,
  onPressIn,
  onPressOut,
  ...rest
}: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressableBase
      {...rest}
      disabled={disabled}
      style={[animatedStyle, style]}
      onPressIn={(e) => {
        if (!disabled) scale.value = withSpring(scaleTo, Animation.spring);
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        scale.value = withSpring(1, Animation.spring);
        onPressOut?.(e);
      }}
    >
      {children}
    </AnimatedPressableBase>
  );
}
