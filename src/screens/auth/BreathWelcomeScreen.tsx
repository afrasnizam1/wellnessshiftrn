import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, Animated, Easing, StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '../../navigation/screenNames';
import { Colors, Typography, Spacing, Shadow } from '../../theme';
import { pendingOnboardingStorage } from '../../services/pendingOnboardingStorage';
import { refreshPreAuthRouteFromPending, resetOnboardingStack } from '../../services/onboardingNavigation';
import { useAppStore } from '../../store';
import { BrandButton, AnimatedPressable } from '../../components/ui';

const CYCLE_MS = 4200;
const CYCLES = 4;

export default function BreathWelcomeScreen() {
  const navigation = useNavigation<any>();
  const hasSeenIntro = useAppStore((s) => s.hasSeenIntro);
  const scale = useRef(new Animated.Value(0.82)).current;
  const ringScale = useRef(new Animated.Value(0.9)).current;
  const glowOpacity = useRef(new Animated.Value(0.35)).current;
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const [cycle, setCycle] = useState(0);
  const finishingRef = useRef(false);
  const cycleRef = useRef(0);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1.12,
            duration: CYCLE_MS / 2,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(ringScale, {
            toValue: 1.28,
            duration: CYCLE_MS / 2,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
            toValue: 0.85,
            duration: CYCLE_MS / 2,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 0.82,
            duration: CYCLE_MS / 2,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(ringScale, {
            toValue: 0.9,
            duration: CYCLE_MS / 2,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
            toValue: 0.3,
            duration: CYCLE_MS / 2,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
      ]),
    );
    loop.start();

    const phaseTimer = setInterval(() => {
      setPhase((p) => {
        const next = p === 'in' ? 'out' : 'in';
        if (next === 'in') {
          cycleRef.current += 1;
          setCycle(cycleRef.current);
        }
        return next;
      });
    }, CYCLE_MS / 2);

    return () => {
      loop.stop();
      clearInterval(phaseTimer);
    };
  }, [glowOpacity, ringScale, scale]);

  const continueToNext = async () => {
    if (finishingRef.current) return;
    finishingRef.current = true;
    try {
      await pendingOnboardingStorage.markBreathWelcomeComplete();
      const route = await refreshPreAuthRouteFromPending(hasSeenIntro);
      resetOnboardingStack(navigation, route);
    } catch {
      finishingRef.current = false;
    }
  };

  useEffect(() => {
    if (cycle < CYCLES) return;
    continueToNext();
  }, [cycle]);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['#1A1228', '#2A1840', '#3D1F55']}
        locations={[0, 0.55, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.ambient, styles.ambientTop]} />
      <View style={[styles.ambient, styles.ambientBottom]} />

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.top}>
          <Text style={styles.brand}>Wellness Shift</Text>
          <View style={styles.progressRow}>
            {Array.from({ length: CYCLES }).map((_, i) => (
              <View
                key={i}
                style={[styles.progressDot, i < cycle && styles.progressDotDone, i === cycle && styles.progressDotActive]}
              />
            ))}
          </View>
        </View>

        <View style={styles.stage}>
          <Text style={styles.prompt}>{phase === 'in' ? 'Breathe in' : 'Breathe out'}</Text>
          <Text style={styles.hint}>
            {phase === 'in' ? 'Slowly fill your lungs' : 'Gently release'}
          </Text>

          <View style={styles.orbStage}>
            <Animated.View
              style={[
                styles.ringOuter,
                { opacity: glowOpacity, transform: [{ scale: ringScale }] },
              ]}
            />
            <Animated.View
              style={[styles.ringMid, { transform: [{ scale: ringScale }] }]}
            />
            <Animated.View style={[styles.orbWrap, { transform: [{ scale }] }]}>
              <LinearGradient
                colors={['#FF8FB3', '#F24D80', '#D93A6A']}
                start={{ x: 0.2, y: 0 }}
                end={{ x: 0.9, y: 1 }}
                style={styles.orb}
              />
            </Animated.View>
          </View>

          <Text style={styles.sub}>
            A quiet moment before we personalise your journey.
          </Text>
        </View>

        <View style={styles.footer}>
          <BrandButton label="Continue" onPress={continueToNext} style={styles.continueBtn} />
          <AnimatedPressable
            onPress={async () => {
              await pendingOnboardingStorage.markBreathWelcomeComplete();
              await refreshPreAuthRouteFromPending(hasSeenIntro);
              navigation.navigate(Screen.authentication, { screen: Screen.signIn });
            }}
            accessibilityRole="button"
            accessibilityLabel="Sign in"
          >
            <Text style={styles.signInText}>Already have an account? Sign in</Text>
          </AnimatedPressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#1A1228' },
  safe: { flex: 1 },
  ambient: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(242, 77, 128, 0.14)',
  },
  ambientTop: { top: -80, right: -60 },
  ambientBottom: { bottom: 40, left: -100, backgroundColor: 'rgba(148, 107, 250, 0.12)' },
  top: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    alignItems: 'center',
    gap: Spacing.md,
  },
  brand: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: Typography.size.xs,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  progressRow: {
    flexDirection: 'row',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  progressDotActive: {
    width: 22,
    backgroundColor: Colors.brandLight,
  },
  progressDotDone: {
    backgroundColor: 'rgba(242, 77, 128, 0.7)',
  },
  stage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
  },
  prompt: {
    color: Colors.white,
    fontSize: Typography.size['3xl'],
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  hint: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: Typography.size.base,
    fontWeight: '500',
    marginBottom: Spacing.lg,
  },
  orbStage: {
    width: 240,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.md,
  },
  ringOuter: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 143, 179, 0.35)',
    backgroundColor: 'rgba(242, 77, 128, 0.06)',
  },
  ringMid: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  orbWrap: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.lg,
    shadowColor: Colors.brand,
    shadowOpacity: 0.45,
  },
  orb: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  sub: {
    marginTop: Spacing.xl,
    color: 'rgba(255,255,255,0.62)',
    fontSize: Typography.size.sm,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 260,
  },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
    gap: Spacing.md,
    alignItems: 'center',
  },
  continueBtn: { alignSelf: 'stretch' },
  signInText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: Typography.size.sm,
    fontWeight: '600',
    paddingVertical: Spacing.xs,
  },
});
