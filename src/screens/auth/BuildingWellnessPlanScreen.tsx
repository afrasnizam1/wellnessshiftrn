import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Gradients } from '../../theme';
import AppScreen from '../../components/common/AppScreen';
import { AppCard } from '../../components/ui';
import { pendingOnboardingStorage } from '../../services/pendingOnboardingStorage';
import { goToWellnessResults } from '../../services/onboardingNavigation';

const BUILD_MS = 3000;

const PLAN_ITEMS = [
  'Calories',
  'Carbs',
  'Protein',
  'Fats',
  'Health Score',
] as const;

const STATUS_LINES = [
  'Scoring your answers…',
  'Customizing your wellness plan…',
  'Building your wellness account…',
] as const;

export default function BuildingWellnessPlanScreen() {
  const navigation = useNavigation<any>();
  const [percent, setPercent] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  const finishingRef = useRef(false);

  useEffect(() => {
    const id = progress.addListener(({ value }) => {
      setPercent(Math.min(100, Math.round(value * 100)));
    });

    Animated.timing(progress, {
      toValue: 1,
      duration: BUILD_MS,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (!finished || finishingRef.current) return;
      finishingRef.current = true;
      void (async () => {
        await pendingOnboardingStorage.markPlanBuildingComplete();
        goToWellnessResults(navigation);
      })();
    });

    const statusTimers = STATUS_LINES.map((_, i) =>
      setTimeout(() => setStatusIndex(i), Math.floor((BUILD_MS / STATUS_LINES.length) * i)),
    );

    return () => {
      progress.removeListener(id);
      statusTimers.forEach(clearTimeout);
    };
  }, [navigation, progress]);

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <AppScreen style={styles.safe} backgroundColor={Colors.white} mesh={false}>
      <View style={styles.content}>
        <Text style={styles.percent}>{percent}%</Text>
        <Text style={styles.title}>Building your wellness plan</Text>

        <View style={styles.track}>
          <Animated.View style={[styles.fillWrap, { width: barWidth }]}>
            <LinearGradient
              colors={[...Gradients.sunset]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.fill}
            />
          </Animated.View>
        </View>

        <Text style={styles.status}>{STATUS_LINES[statusIndex]}</Text>

        <AppCard style={styles.card}>
          <Text style={styles.cardTitle}>Daily recommendation for</Text>
          {PLAN_ITEMS.map((item) => (
            <Text key={item} style={styles.bullet}>
              •  {item}
            </Text>
          ))}
        </AppCard>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing['4xl'],
    paddingBottom: Spacing['3xl'],
    justifyContent: 'center',
    gap: Spacing.md,
  },
  percent: {
    fontSize: 56,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -1,
  },
  title: {
    fontSize: Typography.size.xl,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  track: {
    height: 10,
    borderRadius: 999,
    backgroundColor: Colors.border,
    overflow: 'hidden',
    marginTop: Spacing.sm,
  },
  fillWrap: {
    height: '100%',
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    flex: 1,
  },
  status: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  card: {
    marginTop: Spacing['2xl'],
    padding: Spacing.lg,
    gap: Spacing.sm,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  bullet: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
});
