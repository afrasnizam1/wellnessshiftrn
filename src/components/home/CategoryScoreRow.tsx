import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { AnimatedPressable } from '../ui';
import { Animation, Colors, Typography } from '../../theme';
import type { ScoreChangeFeedback } from '../../hooks/useWellnessScoreChangeFeedback';
import type { WellnessCategoryKey } from '../../types';
import { chartTapA11yProps } from '../analytics/chartTapAnalytics';
import type { ChartTapContext } from '../analytics/chartTapAnalytics';

interface CategoryMeta {
  key: string;
  label: string;
  color: string;
}

interface Props {
  cat: CategoryMeta;
  score: number;
  isSelected: boolean;
  feedback: ScoreChangeFeedback | null;
  analytics: ChartTapContext;
  onPress: () => void;
}

export default function CategoryScoreRow({
  cat,
  score,
  isSelected,
  feedback,
  analytics,
  onPress,
}: Props) {
  const rowScale = useSharedValue(1);
  const scoreScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);

  const isActive =
    feedback != null &&
    (feedback.category === cat.key || (feedback.category === 'overall' && isSelected));

  useEffect(() => {
    if (!isActive || !feedback) return;

    if (feedback.direction === 'up') {
      scoreScale.value = withSequence(
        withSpring(1.18, Animation.spring),
        withSpring(1, Animation.spring),
      );
      glowOpacity.value = withSequence(
        withTiming(1, { duration: 120 }),
        withTiming(0, { duration: 900 }),
      );
      return;
    }

    scoreScale.value = withSequence(
      withTiming(0.92, { duration: 100 }),
      withSpring(1, Animation.spring),
    );
    glowOpacity.value = withSequence(
      withTiming(0.55, { duration: 120 }),
      withTiming(0, { duration: 700 }),
    );
  }, [feedback, isActive, glowOpacity, scoreScale]);

  const rowStyle = useAnimatedStyle(() => ({
    backgroundColor:
      glowOpacity.value > 0
        ? feedback?.direction === 'up'
          ? `rgba(51, 199, 163, ${glowOpacity.value * 0.22})`
          : `rgba(120, 130, 150, ${glowOpacity.value * 0.18})`
        : isSelected
          ? cat.color + '18'
          : 'transparent',
  }));

  const scoreStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scoreScale.value }],
  }));

  const label = cat.label.replace(' Health', '').replace(' Wellness', '');

  return (
    <AnimatedPressable
      style={[styles.row, rowStyle]}
      onPress={onPress}
      {...chartTapA11yProps(analytics, cat.key as WellnessCategoryKey)}
    >
      <View style={[styles.dot, { backgroundColor: cat.color }]} />
      <Text
        style={[styles.label, isSelected && { color: cat.color, fontWeight: '700' }]}
        numberOfLines={1}
      >
        {label}
      </Text>
      <Animated.Text
        style={[
          styles.score,
          isSelected && { color: cat.color },
          isActive && feedback?.direction === 'up' && styles.scoreUp,
          isActive && feedback?.direction === 'down' && styles.scoreDown,
          scoreStyle,
        ]}
      >
        {score}/10
      </Animated.Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 8,
    marginBottom: 2,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
  },
  label: {
    flex: 1,
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  score: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
    fontWeight: '600',
    minWidth: 36,
    textAlign: 'right',
  },
  scoreUp: {
    color: '#2DB88E',
    fontWeight: '700',
  },
  scoreDown: {
    color: Colors.textSecondary,
    fontWeight: '600',
  },
});
