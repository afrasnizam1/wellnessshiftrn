import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '../../navigation/screenNames';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AUTH_BACKGROUND } from '../../theme/authTheme';
import { pendingOnboardingStorage } from '../../services/pendingOnboardingStorage';
import { refreshPreAuthRouteFromPending, resetOnboardingStack } from '../../services/onboardingNavigation';
import { useAppStore } from '../../store';
import AppScreen from '../../components/common/AppScreen';

const CYCLE_MS = 4000;
const CYCLES = 4;

export default function BreathWelcomeScreen() {
  const navigation = useNavigation<any>();
  const hasSeenIntro = useAppStore((s) => s.hasSeenIntro);
  const scale = useRef(new Animated.Value(0.85)).current;
  const opacity = useRef(new Animated.Value(0.6)).current;
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const [cycle, setCycle] = useState(0);
  const finishingRef = useRef(false);

  useEffect(() => {
    const breathe = () => {
      const inhale = phase === 'in';
      Animated.parallel([
        Animated.timing(scale, {
          toValue: inhale ? 1.15 : 0.85,
          duration: CYCLE_MS / 2,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: inhale ? 1 : 0.55,
          duration: CYCLE_MS / 2,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]).start();
    };
    breathe();
    const timer = setInterval(() => {
      setPhase((p) => {
        const next = p === 'in' ? 'out' : 'in';
        if (next === 'in') setCycle((c) => c + 1);
        return next;
      });
    }, CYCLE_MS / 2);
    return () => clearInterval(timer);
  }, [phase, opacity, scale]);

  const goToAuth = async () => {
    if (finishingRef.current) return;
    finishingRef.current = true;
    await pendingOnboardingStorage.markBreathWelcomeComplete();
    await refreshPreAuthRouteFromPending(hasSeenIntro);
    resetOnboardingStack(navigation, Screen.authentication);
  };

  useEffect(() => {
    if (cycle < CYCLES) return;
    goToAuth().catch(() => {
      finishingRef.current = false;
    });
  }, [cycle, navigation, hasSeenIntro]);

  return (
    <AppScreen style={styles.safe}>
      <LinearGradient colors={[AUTH_BACKGROUND, '#5B2D8E', '#3D1F6E']} style={StyleSheet.absoluteFill} />
      <View style={styles.content}>
        <Text style={styles.eyebrow}>Wellness Shift</Text>
        <Text style={styles.prompt}>{phase === 'in' ? 'Breathe in…' : 'Breathe out…'}</Text>
        <Animated.View style={[styles.orbWrap, { transform: [{ scale }], opacity }]}>
          <View style={styles.orb} />
        </Animated.View>
        <Text style={styles.sub}>Take a moment before we personalise your journey.</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => goToAuth()} style={styles.skipBtn}>
          <Text style={styles.skipText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await pendingOnboardingStorage.markBreathWelcomeComplete();
            await refreshPreAuthRouteFromPending(hasSeenIntro);
            navigation.navigate(Screen.authentication, { screen: Screen.signIn });
          }}
        >
          <Text style={styles.signInText}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: AUTH_BACKGROUND },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.xl, gap: Spacing.lg },
  eyebrow: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: Typography.size.sm,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  prompt: { color: Colors.white, fontSize: Typography.size['3xl'], fontWeight: '800', letterSpacing: -0.5 },
  orbWrap: { width: 160, height: 160, alignItems: 'center', justifyContent: 'center' },
  orb: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.45)',
  },
  sub: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: Typography.size.base,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  footer: { padding: Spacing.xl, gap: Spacing.md, alignItems: 'center' },
  skipBtn: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  skipText: { color: Colors.white, fontWeight: '700', fontSize: Typography.size.base },
  signInText: { color: 'rgba(255,255,255,0.8)', fontSize: Typography.size.sm, fontWeight: '600' },
});
