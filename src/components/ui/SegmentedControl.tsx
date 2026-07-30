import React, { useEffect } from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Colors, Typography, Spacing, Radius, Shadow, Animation } from '../../theme';
import AnimatedPressable from './AnimatedPressable';

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
  const [layout, setLayout] = React.useState({ width: 0, segmentWidth: 0 });
  const activeIndex = options.indexOf(value);
  const translateX = useSharedValue(0);

  useEffect(() => {
    if (layout.segmentWidth > 0) {
      translateX.value = withSpring(activeIndex * layout.segmentWidth, Animation.spring);
    }
  }, [activeIndex, layout.segmentWidth]);

  const onTrackLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    setLayout({ width, segmentWidth: width / options.length });
  };

  const pillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: layout.segmentWidth - 4,
  }));

  return (
    <View style={styles.track} onLayout={onTrackLayout}>
      {layout.segmentWidth > 0 && (
        <Animated.View style={[styles.pill, pillStyle]} />
      )}
      {options.map((option) => {
        const active = option === value;
        return (
          <AnimatedPressable
            key={option}
            style={styles.segment}
            onPress={() => onChange(option)}
            scaleTo={0.98}
          >
            <Text style={[styles.label, compact && styles.labelCompact, active && styles.labelActive]} numberOfLines={1}>
              {option}
            </Text>
          </AnimatedPressable>
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
  },
  pill: {
    position: 'absolute',
    top: 3,
    left: 3,
    bottom: 3,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg - 2,
    ...Shadow.sm,
  },
  segment: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    alignItems: 'center',
    zIndex: 1,
  },
  label: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  labelCompact: { fontSize: Typography.size.xs },
  labelActive: { color: Colors.text, fontWeight: '700' },
});
