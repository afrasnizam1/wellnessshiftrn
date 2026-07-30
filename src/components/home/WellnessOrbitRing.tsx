// src/components/home/WellnessOrbitRing.tsx
import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, PixelRatio } from 'react-native';
import Svg, { Circle, Path, G } from 'react-native-svg';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { WELLNESS_CATEGORIES, Colors, Typography, Animation } from '../../theme';
import type { WellnessCategoryKey, WellnessCategoryScores } from '../../types';
import type { ScoreChangeFeedback } from '../../hooks/useWellnessScoreChangeFeedback';
import {
  buildDnaHelixSegments,
  computeHelixCanvasInset,
  computeOrbitPanelSide,
  computeRingLayout,
} from './wellnessHelixPaths';
import type { ChartTapContext } from '../analytics/chartTapAnalytics';
import { chartTapAccessibilityLabel, trackChartCategoryTap } from '../analytics/chartTapAnalytics';

interface Props {
  score: number;
  categories?: WellnessCategoryScores;
  size?: number;
  spin?: boolean;
  selectedCategory?: WellnessCategoryKey | null;
  onCategorySelect?: (category: WellnessCategoryKey, categoryScore: number) => void;
  onCenterPress?: () => void;
  /** CSQ tap labels for category ring presses */
  analytics?: ChartTapContext;
  /** Brief celebration / dip feedback when a score changes */
  scoreFeedback?: ScoreChangeFeedback | null;
}

const SCORE_GREEN = '#33C7A3';

function shortCategoryLabel(label: string): string {
  return label
    .replace(' Health', '')
    .replace(' Wellness', '')
    .replace(' Management', '')
    .replace('–Life Balance', '');
}

function roundPx(value: number): number {
  return PixelRatio.roundToNearestPixel(value);
}

export function getOrbitPanelSize(size: number): number {
  return roundPx(computeOrbitPanelSide(size));
}

export default function WellnessOrbitRing({
  score,
  categories,
  size = 160,
  spin = true,
  selectedCategory = null,
  onCategorySelect,
  onCenterPress,
  analytics,
  scoreFeedback = null,
}: Props) {
  const layout = useMemo(() => computeRingLayout(size), [size]);
  const canvasInset = useMemo(() => computeHelixCanvasInset(size, layout), [size, layout]);
  const panelSide = useMemo(() => roundPx(size + canvasInset * 2), [size, canvasInset]);
  const cx = panelSide / 2;
  const cy = panelSide / 2;
  const helix = useMemo(
    () => buildDnaHelixSegments(panelSide, layout.dnaOrbitRadius),
    [panelSide, layout.dnaOrbitRadius],
  );
  const viewBox = `0 0 ${panelSide} ${panelSide}`;

  const rotation = useSharedValue(0);
  const centerScale = useSharedValue(1);
  const centerShake = useSharedValue(0);
  const glowOpacity = useSharedValue(0);
  const badgeOpacity = useSharedValue(0);
  const badgeTranslateY = useSharedValue(8);
  const sparkleOpacity = useSharedValue(0);

  useEffect(() => {
    if (!spin) return;
    rotation.value = withRepeat(
      withTiming(360, { duration: 45000, easing: Easing.linear }),
      -1,
      false,
    );
  }, [spin, rotation]);

  useEffect(() => {
    if (!scoreFeedback) return;

    if (scoreFeedback.direction === 'up') {
      centerScale.value = withSequence(
        withSpring(1.14, Animation.spring),
        withSpring(1, Animation.spring),
      );
      glowOpacity.value = withSequence(
        withTiming(1, { duration: 140 }),
        withTiming(0, { duration: 1000 }),
      );
      sparkleOpacity.value = withSequence(
        withTiming(1, { duration: 120 }),
        withTiming(0, { duration: 1100 }),
      );
      badgeOpacity.value = withSequence(
        withTiming(1, { duration: 100 }),
        withTiming(1, { duration: 900 }),
        withTiming(0, { duration: 300 }),
      );
      badgeTranslateY.value = withSequence(
        withTiming(-6, { duration: 700 }),
        withTiming(-14, { duration: 600 }),
      );
      return;
    }

    centerScale.value = withSequence(
      withTiming(0.94, { duration: 120 }),
      withSpring(1, Animation.spring),
    );
    centerShake.value = withSequence(
      withTiming(-4, { duration: 60 }),
      withTiming(4, { duration: 60 }),
      withTiming(-2, { duration: 60 }),
      withTiming(0, { duration: 60 }),
    );
    glowOpacity.value = withSequence(
      withTiming(0.7, { duration: 140 }),
      withTiming(0, { duration: 800 }),
    );
    badgeOpacity.value = withSequence(
      withTiming(1, { duration: 100 }),
      withTiming(1, { duration: 700 }),
      withTiming(0, { duration: 300 }),
    );
    badgeTranslateY.value = 4;
  }, [scoreFeedback, badgeOpacity, badgeTranslateY, centerScale, centerShake, glowOpacity, sparkleOpacity]);

  const helixStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const centerWrapStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: centerScale.value },
      { translateX: centerShake.value },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const badgeStyle = useAnimatedStyle(() => ({
    opacity: badgeOpacity.value,
    transform: [{ translateY: badgeTranslateY.value }],
  }));

  const sparkleStyle = useAnimatedStyle(() => ({
    opacity: sparkleOpacity.value,
  }));

  const feedbackAppliesToCenter =
    scoreFeedback &&
    (scoreFeedback.category === 'overall' ||
      scoreFeedback.category === selectedCategory ||
      selectedCategory == null);

  const deltaLabel = scoreFeedback
    ? `${scoreFeedback.delta > 0 ? '+' : ''}${scoreFeedback.delta.toFixed(1)}`
    : '';

  const sortedCategories = useMemo(() => {
    return [...WELLNESS_CATEGORIES].sort((a, b) => {
      const scoreA = categories?.[a.key as WellnessCategoryKey] ?? 0;
      const scoreB = categories?.[b.key as WellnessCategoryKey] ?? 0;
      return scoreB - scoreA;
    });
  }, [categories]);

  const selectedMeta = selectedCategory
    ? WELLNESS_CATEGORIES.find((c) => c.key === selectedCategory)
    : null;
  const selectedScore = selectedCategory
    ? categories?.[selectedCategory] ?? 0
    : score;

  const handleCategoryPress = (key: WellnessCategoryKey, categoryScore: number) => {
    if (analytics) {
      trackChartCategoryTap(analytics, key);
    }
    onCategorySelect?.(key, categoryScore);
  };

  const handleCenterPress = () => {
    if (selectedCategory) {
      onCenterPress?.();
    }
  };

  const disc = layout.centerDisc;
  const scoreFontSize = selectedCategory ? disc * 0.3 : disc * 0.36;
  const labelFontSize = Math.max(8, disc * 0.15);
  const subLabelFontSize = Math.max(7, disc * 0.12);
  const centerTextWidth = disc * 0.88;

  return (
    <View
      style={{
        width: panelSide,
        height: panelSide,
        minWidth: panelSide,
        minHeight: panelSide,
        aspectRatio: 1,
        flexShrink: 0,
        alignSelf: 'flex-start',
      }}
    >
      <Animated.View
        style={[
          styles.helixLayer,
          { width: panelSide, height: panelSide },
          helixStyle,
        ]}
        pointerEvents="none"
      >
        <Svg width={panelSide} height={panelSide} viewBox={viewBox}>
          {[...helix.strand1, ...helix.strand2].map((segment, index) => (
            <Path
              key={`helix-${index}`}
              d={segment.d}
              stroke={segment.color}
              strokeWidth={segment.width}
              strokeOpacity={segment.opacity ?? 1}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          ))}
        </Svg>
      </Animated.View>

      <Svg
        width={panelSide}
        height={panelSide}
        viewBox={viewBox}
        style={styles.ringsLayer}
      >
        {sortedCategories.map((cat, index) => {
          const ringDiameter = layout.maxDiameter - index * layout.sizeStep;
          const radius = ringDiameter / 2;
          const catScore = categories?.[cat.key as WellnessCategoryKey] ?? 0;
          const circumference = 2 * Math.PI * radius;
          const progress = Math.min(catScore / 10, 1) * circumference;
          const gap = circumference - progress;
          const isSelected = selectedCategory === cat.key;
          const isDimmed = selectedCategory != null && !isSelected;
          const isOutermost = index === 0;
          const strokeWidth = layout.lineWidth + (isSelected ? (isOutermost ? 2 : 6) : 0);
          const isFeedbackRing =
            scoreFeedback != null &&
            (scoreFeedback.category === cat.key ||
              (scoreFeedback.category === 'overall' && isSelected));
          const ringBoost = isFeedbackRing && scoreFeedback?.direction === 'up' ? 0.08 : 0;
          const ringDim = isFeedbackRing && scoreFeedback?.direction === 'down' ? 0.12 : 0;
          const ringScale = (isSelected ? (isOutermost ? 1.02 : 1.06) : 1) + ringBoost;

          return (
            <G
              key={cat.key}
              rotation={-90}
              origin={`${cx}, ${cy}`}
              scale={ringScale}
            >
              <Circle
                cx={cx}
                cy={cy}
                r={radius}
                stroke={cat.color}
                strokeWidth={layout.lineWidth}
                strokeOpacity={0.14}
                fill="none"
              />
              <Circle
                cx={cx}
                cy={cy}
                r={radius}
                stroke={cat.color}
                strokeWidth={strokeWidth}
                strokeOpacity={isDimmed ? 0.65 : Math.max(0.45, 0.92 - ringDim)}
                fill="none"
                strokeDasharray={`${progress} ${gap}`}
                strokeLinecap="round"
              />
              {onCategorySelect && (
                <Circle
                  cx={cx}
                  cy={cy}
                  r={radius}
                  stroke="transparent"
                  strokeWidth={Math.max(layout.lineWidth + 14, 18)}
                  fill="none"
                  onPress={() => handleCategoryPress(cat.key as WellnessCategoryKey, catScore)}
                  accessible
                  accessibilityLabel={chartTapAccessibilityLabel(
                    analytics?.chart ?? 'Wellness Ring',
                    shortCategoryLabel(cat.label),
                  )}
                />
              )}
            </G>
          );
        })}
      </Svg>

      <Pressable
        style={[styles.centre, { width: panelSide, height: panelSide }]}
        onPress={handleCenterPress}
        disabled={!selectedCategory}
        accessibilityLabel={
          selectedCategory && selectedMeta
            ? chartTapAccessibilityLabel(analytics?.chart ?? 'Wellness Ring', 'Clear selection')
            : chartTapAccessibilityLabel(analytics?.chart ?? 'Wellness Ring', 'Overall score')
        }
        accessibilityRole="button"
      >
        <Animated.View
          style={[
            styles.centerGlow,
            {
              width: layout.centerDisc * 1.35,
              height: layout.centerDisc * 1.35,
              borderRadius: layout.centerDisc * 0.675,
              backgroundColor:
                scoreFeedback?.direction === 'down'
                  ? 'rgba(120, 130, 150, 0.22)'
                  : 'rgba(51, 199, 163, 0.28)',
            },
            glowStyle,
          ]}
          pointerEvents="none"
        />
        <Animated.View style={[styles.centerContent, centerWrapStyle]}>
          <View
            style={[
              styles.centerDisc,
              {
                width: layout.centerDisc,
                height: layout.centerDisc,
                borderRadius: layout.centerDisc / 2,
              },
            ]}
          />
          <View style={[styles.centerText, { maxWidth: centerTextWidth }]}>
            {selectedCategory && selectedMeta ? (
              <>
                <Text
                  style={[
                    styles.scoreNumber,
                    {
                      fontSize: scoreFontSize,
                      lineHeight: scoreFontSize * 1.05,
                      color: selectedMeta.color,
                    },
                    feedbackAppliesToCenter &&
                      scoreFeedback?.direction === 'up' && styles.scoreNumberUp,
                    feedbackAppliesToCenter &&
                      scoreFeedback?.direction === 'down' && styles.scoreNumberDown,
                  ]}
                >
                  {selectedScore.toFixed(1)}
                </Text>
                <Text
                  style={[
                    styles.categoryName,
                    { fontSize: labelFontSize, lineHeight: labelFontSize * 1.15, color: selectedMeta.color },
                  ]}
                  numberOfLines={2}
                >
                  {shortCategoryLabel(selectedMeta.label)}
                </Text>
                <Text style={[styles.scoreSubLabel, { fontSize: subLabelFontSize }]}>out of 10</Text>
              </>
            ) : (
              <>
                <Text
                  style={[
                    styles.scoreNumber,
                    { fontSize: scoreFontSize, lineHeight: scoreFontSize * 1.05 },
                    feedbackAppliesToCenter &&
                      scoreFeedback?.direction === 'up' && styles.scoreNumberUp,
                    feedbackAppliesToCenter &&
                      scoreFeedback?.direction === 'down' && styles.scoreNumberDown,
                  ]}
                >
                  {score.toFixed(1)}
                </Text>
                <Text style={[styles.scoreLabel, { fontSize: labelFontSize }]}>Wellness</Text>
              </>
            )}
          </View>
        </Animated.View>

        {scoreFeedback && feedbackAppliesToCenter && (
          <Animated.View style={[styles.deltaBadge, badgeStyle]} pointerEvents="none">
            <Text
              style={[
                styles.deltaBadgeText,
                scoreFeedback.direction === 'up' ? styles.deltaUp : styles.deltaDown,
              ]}
            >
              {deltaLabel}
            </Text>
          </Animated.View>
        )}

        {scoreFeedback?.direction === 'up' && feedbackAppliesToCenter && (
          <Animated.View style={[styles.sparkleWrap, sparkleStyle]} pointerEvents="none">
            <Text style={[styles.sparkle, styles.sparkleTopLeft]}>✦</Text>
            <Text style={[styles.sparkle, styles.sparkleTopRight]}>✦</Text>
            <Text style={[styles.sparkle, styles.sparkleBottom]}>✦</Text>
          </Animated.View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  helixLayer: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  ringsLayer: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  centre: {
    position: 'absolute',
    left: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerGlow: {
    position: 'absolute',
  },
  centerDisc: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.95)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  centerText: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  scoreNumber: {
    fontWeight: '700',
    color: SCORE_GREEN,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  scoreNumberUp: {
    color: '#2DB88E',
  },
  scoreNumberDown: {
    color: Colors.textSecondary,
  },
  scoreLabel: {
    color: Colors.textSecondary,
    fontWeight: '500',
    marginTop: 1,
    textAlign: 'center',
  },
  categoryName: {
    fontWeight: '700',
    marginTop: 1,
    textAlign: 'center',
  },
  scoreSubLabel: {
    color: Colors.textTertiary,
    marginTop: 1,
    textAlign: 'center',
  },
  deltaBadge: {
    position: 'absolute',
    top: '22%',
    alignSelf: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.95)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  deltaBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  deltaUp: {
    color: '#2DB88E',
  },
  deltaDown: {
    color: Colors.textSecondary,
  },
  sparkleWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkle: {
    position: 'absolute',
    color: '#5EDBB5',
    fontSize: 14,
    fontWeight: '700',
  },
  sparkleTopLeft: {
    top: '18%',
    left: '24%',
  },
  sparkleTopRight: {
    top: '20%',
    right: '22%',
  },
  sparkleBottom: {
    bottom: '28%',
  },
});
