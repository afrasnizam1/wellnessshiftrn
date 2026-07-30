import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { BrandButton, IconBadge } from '../../components/ui';
import AppScreen from '../../components/common/AppScreen';
import { useAppStore } from '../../store';
import { pendingOnboardingStorage } from '../../services/pendingOnboardingStorage';
import { onboardingStorage } from '../../services/onboardingStorage';
import { goToCreateAccount, refreshPreAuthRouteFromPending } from '../../services/onboardingNavigation';

const SESSION_SECONDS = 60;

export default function FirstWinActivityScreen() {
  const navigation = useNavigation<any>();
  const { user, hasSeenIntro } = useAppStore();
  const [mode, setMode] = useState<'intro' | 'active' | 'done'>('intro');
  const [secondsLeft, setSecondsLeft] = useState(SESSION_SECONDS);
  const scale = useRef(new Animated.Value(0.9)).current;
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (mode !== 'active') return;
    const breathe = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.12, duration: 4000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(scale, { toValue: 0.9, duration: 4000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    );
    breathe.start();
    const tick = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(tick);
          setMode('done');
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      breathe.stop();
      clearInterval(tick);
    };
  }, [mode, scale]);

  const advance = async (triedActivity: boolean) => {
    if (saving) return;
    setSaving(true);
    try {
      if (user) {
        await onboardingStorage.markFirstWinComplete(user.uid);
      } else {
        await pendingOnboardingStorage.save({ firstWinComplete: true, triedFirstActivity: triedActivity });
      }
      await refreshPreAuthRouteFromPending(hasSeenIntro);
      goToCreateAccount(navigation);
    } finally {
      setSaving(false);
    }
  };

  if (mode === 'intro') {
    return (
      <AppScreen style={styles.safe}>
        <View style={styles.content}>
          <IconBadge name="flower-outline" color={Colors.brand} size="lg" />
          <Text style={styles.title}>Your first win</Text>
          <Text style={styles.subtitle}>
            Try a 60-second breathing exercise — pre-loaded and ready. Most people feel calmer right away.
          </Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Box breathing · 1 min</Text>
            <Text style={styles.cardSub}>Guided inhale and exhale — a quick preview of what's inside.</Text>
          </View>
          <BrandButton label="Start 1-minute breath" onPress={() => { setSecondsLeft(SESSION_SECONDS); setMode('active'); }} />
          <BrandButton label="Skip for now" variant="outline" onPress={() => advance(false)} disabled={saving} />
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.title}>{mode === 'done' ? 'Nice work' : 'Breathe with the circle'}</Text>
        <Animated.View style={[styles.circle, { transform: [{ scale }] }]} />
        <Text style={styles.timer}>{mode === 'done' ? 'Complete' : `${secondsLeft}s`}</Text>
        {mode === 'done' ? (
          <BrandButton label="Save your plan" onPress={() => advance(true)} loading={saving} />
        ) : (
          <BrandButton label="End early" variant="outline" onPress={() => advance(true)} disabled={saving} />
        )}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1, padding: Spacing.base, justifyContent: 'center', alignItems: 'center', gap: Spacing.md },
  title: { fontSize: Typography.size['2xl'], fontWeight: '800', color: Colors.text, textAlign: 'center' },
  subtitle: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  card: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    gap: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  cardTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  cardSub: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  circle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.primaryBg,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  timer: { fontSize: Typography.size.xl, fontWeight: '700', color: Colors.primary },
});
