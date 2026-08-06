import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Colors, Typography, Spacing, Radius, Shadow, Animation } from '../../theme';

type Props<T extends string> = {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  compact?: boolean;
};

export default function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  compact,
}: Props<T>) {
  const activeIndex = Math.max(0, options.indexOf(value));
  const translateX = useSharedValue(0);
  const segmentWidth = useSharedValue(0);
  const hasLayout = useSharedValue(0);

  useEffect(() => {
    if (segmentWidth.value > 0) {
      translateX.value = withSpring(activeIndex * segmentWidth.value, Animation.spring);
    }
  }, [activeIndex, segmentWidth, translateX]);

  const onTrackLayout = useCallback((e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    const next = width / options.length;
    const isFirst = segmentWidth.value === 0;
    segmentWidth.value = next;
    hasLayout.value = 1;
    translateX.value = isFirst
      ? activeIndex * next
      : withSpring(activeIndex * next, Animation.spring);
  }, [activeIndex, hasLayout, options.length, segmentWidth, translateX]);

  const pillStyle = useAnimatedStyle(() => ({
    opacity: hasLayout.value,
    transform: [{ translateX: translateX.value }],
    width: Math.max(0, segmentWidth.value - 4),
  }));

  return (
    <View style={styles.track} onLayout={onTrackLayout}>
      <Animated.View style={[styles.pill, pillStyle]} pointerEvents="none" />
      {options.map((option) => {
        const active = option === value;
        return (
          <Pressable
            key={option}
            style={styles.segment}
            onPress={() => {
              if (option === value) return;
              onChange(option);
            }}
            hitSlop={{ top: 10, bottom: 10, left: 4, right: 4 }}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
          >
            <Text style={[styles.label, compact && styles.labelCompact, active && styles.labelActive]} numberOfLines={1}>
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: 'rgba(118, 118, 128, 0.10)',
    borderRadius: Radius.lg,
    padding: 3,
    position: 'relative',
    zIndex: 1,
  },
  pill: {
    position: 'absolute',
    top: 3,
    left: 3,
    bottom: 3,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg - 2,
    zIndex: 0,
    ...Shadow.sm,
  },
  segment: {
    flex: 1,
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    minHeight: 36,
  },
  label: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  labelCompact: { fontSize: Typography.size.xs },
  labelActive: { color: Colors.text, fontWeight: '700' },
});
