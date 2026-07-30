import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, Gradients, Radius, Shadow } from '../../theme';
import { AnimatedPressable } from '../ui';

export type DevSkipAction = { label: string; onPress: () => void };

export type HeroSlide = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
};

type Props = {
  primaryLabel: string;
  onPrimary: () => void;
  onGoogle?: () => void;
  onApple?: () => void;
  onBack: () => void;
  switchPrompt: string;
  switchAction: string;
  onSwitch: () => void;
  googleLabel?: string;
  appleLabel?: string;
  onSkip?: () => void;
  devSkipActions?: DevSkipAction[];
  socialLoading?: 'apple' | 'google' | null;
  primaryLoading?: boolean;
  heroSlides?: HeroSlide[];
};

const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  { icon: 'heart', title: 'Health', subtitle: 'Track and improve your wellbeing' },
  { icon: 'brain', title: 'Mindfulness', subtitle: 'Find peace through guided practices' },
  { icon: 'bar-chart', title: 'Progress', subtitle: 'See your improvements over time' },
  { icon: 'fitness', title: 'Fitness', subtitle: 'Achieve your fitness goals with personalised plans' },
];

const HERO_GRADIENTS = [
  ['#8B5FBF', '#7B4FAF'],
  ['#CC3B5F', '#D95F7F'],
  ['#3366A0', '#4F7AB8'],
  ['#2F8F7A', '#3FA88F'],
];

/** Sign-in / sign-up landing matching the native iOS hero-carousel design. */
export default function AuthLandingScreen({
  primaryLabel,
  onPrimary,
  onGoogle,
  onApple,
  onBack,
  switchPrompt,
  switchAction,
  onSwitch,
  googleLabel,
  appleLabel,
  onSkip,
  devSkipActions,
  socialLoading,
  primaryLoading,
  heroSlides = DEFAULT_HERO_SLIDES,
}: Props) {
  const [index, setIndex] = useState(0);
  const slide = heroSlides[index];
  const gradient = HERO_GRADIENTS[index % HERO_GRADIENTS.length];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const disabled = !!socialLoading || primaryLoading;

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={gradient as [string, string]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={[styles.orb, styles.orb1]} />
      <View style={[styles.orb, styles.orb2]} />

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={onBack}
            style={styles.circleBtn}
            accessibilityRole="button"
            accessibilityLabel="Close"
          >
            <Ionicons name="close" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={styles.topSpacer} />
        </View>

        <View style={styles.hero}>
          <Animated.View
            key={`icon-${index}`}
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(250)}
            style={styles.heroIconWrap}
          >
            <View style={styles.iconCircle}>
              <Ionicons name={slide.icon} size={60} color="#fff" />
            </View>
          </Animated.View>

          <Animated.View
            key={`text-${index}`}
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(250)}
            style={styles.heroTextWrap}
          >
            <Text style={styles.heroTitle}>{slide.title}</Text>
            <Text style={styles.heroSubtitle}>{slide.subtitle}</Text>
          </Animated.View>

          <View style={styles.dots}>
            {heroSlides.map((_, i) => (
              <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
            ))}
          </View>
        </View>

        <ScrollView
          style={styles.actionsScroll}
          contentContainerStyle={styles.actions}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <AnimatedPressable onPress={onPrimary} disabled={disabled} style={styles.primaryWrap}>
            <LinearGradient
              colors={[Colors.brand, Colors.brandLight]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[styles.primaryBtn, disabled && styles.btnDisabled]}
            >
              <Text style={styles.primaryText}>{primaryLabel}</Text>
            </LinearGradient>
          </AnimatedPressable>

          {onGoogle && googleLabel ? (
            <AnimatedPressable
              style={[styles.glassBtn, socialLoading === 'google' && styles.btnDisabled]}
              onPress={onGoogle}
              disabled={disabled}
            >
              <View style={styles.googleMark}>
                <Text style={styles.googleG}>G</Text>
              </View>
              <Text style={styles.glassText}>{googleLabel}</Text>
            </AnimatedPressable>
          ) : null}

          {Platform.OS === 'ios' && onApple && appleLabel ? (
            <AnimatedPressable
              style={[styles.appleBtn, socialLoading === 'apple' && styles.btnDisabled]}
              onPress={onApple}
              disabled={disabled}
            >
              <Ionicons name="logo-apple" size={20} color="#000" />
              <Text style={styles.appleText}>{appleLabel}</Text>
            </AnimatedPressable>
          ) : null}

          <AnimatedPressable onPress={onSwitch} style={styles.switchRow}>
            <Text style={styles.switchPrompt}>{switchPrompt} </Text>
            <Text style={styles.switchAction}>{switchAction}</Text>
          </AnimatedPressable>

          {onSkip ? (
            <AnimatedPressable onPress={onSkip} style={styles.skipRow}>
              <Text style={styles.skipLink}>Skip & Continue to App</Text>
            </AnimatedPressable>
          ) : null}

          {devSkipActions?.length ? (
            <View style={styles.devSkipSection}>
              <Text style={styles.devSkipLabel}>Dev shortcuts</Text>
              {devSkipActions.map((action) => (
                <AnimatedPressable
                  key={action.label}
                  onPress={action.onPress}
                  style={styles.devSkipBtn}
                >
                  <Text style={styles.devSkipBtnText}>{action.label}</Text>
                </AnimatedPressable>
              ))}
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#8B5FBF' },
  safe: { flex: 1, paddingHorizontal: Spacing.xl, justifyContent: 'space-between' },
  orb: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  orb1: { width: 300, height: 300, top: -120, left: -100 },
  orb2: { width: 200, height: 200, bottom: 160, right: -60 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  topSpacer: { width: 44 },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  heroIconWrap: { alignItems: 'center' },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTextWrap: { alignItems: 'center', paddingHorizontal: Spacing.lg },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.white,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: Typography.size.base,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    fontWeight: '500',
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  dots: { flexDirection: 'row', gap: 6, marginTop: Spacing.sm },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  dotActive: { width: 18, backgroundColor: '#fff' },
  actionsScroll: { flexGrow: 0, flexShrink: 1, maxHeight: '50%' },
  actions: { gap: Spacing.md, paddingBottom: Spacing.sm },
  primaryWrap: { ...Shadow.glow(Colors.brand) },
  primaryBtn: {
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: '#fff',
    fontSize: Typography.size.md,
    fontWeight: '700',
  },
  glassBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  glassText: { color: '#fff', fontSize: Typography.size.md, fontWeight: '700' },
  googleMark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleG: { fontSize: 14, fontWeight: '800', color: '#4285F4' },
  appleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    ...Shadow.sm,
  },
  appleText: { color: '#000', fontSize: Typography.size.md, fontWeight: '700' },
  btnDisabled: { opacity: 0.55 },
  switchRow: { flexDirection: 'row', justifyContent: 'center', paddingVertical: Spacing.xs },
  switchPrompt: { color: 'rgba(255,255,255,0.78)', fontSize: Typography.size.sm },
  switchAction: { color: '#fff', fontSize: Typography.size.sm, fontWeight: '700', textDecorationLine: 'underline' },
  skipRow: { alignItems: 'center' },
  skipLink: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: Typography.size.sm,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  devSkipSection: {
    gap: Spacing.xs,
    marginTop: Spacing.xs,
    paddingTop: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  devSkipLabel: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: Typography.size.xs,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  devSkipBtn: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: Radius.lg,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },
  devSkipBtnText: {
    color: 'rgba(255,255,255,0.95)',
    fontSize: Typography.size.sm,
    fontWeight: '600',
  },
});
