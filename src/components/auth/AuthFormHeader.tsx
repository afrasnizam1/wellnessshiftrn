import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, Spacing, Radius, Colors, Shadow } from '../../theme';
import { AUTH_GRADIENT } from '../../theme/authTheme';
import { AnimatedPressable } from '../ui';
import WellnessShiftLogoBadge from './WellnessShiftLogoBadge';

type Props = {
  title: string;
  subtitle: string;
  onBack: () => void;
  children: React.ReactNode;
  /** Full-bleed background gradient — defaults to auth purple atmosphere */
  gradient?: readonly [string, string, ...string[]];
};

/** Modern gradient auth shell with frosted glass form area */
export default function AuthFormHeader({
  title,
  subtitle,
  onBack,
  children,
  gradient = AUTH_GRADIENT,
}: Props) {
  return (
    <View style={[styles.root, { backgroundColor: gradient[0] }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LinearGradient
        colors={[...gradient]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.orb, styles.orb1]} />
      <View style={[styles.orb, styles.orb2]} />
      <View style={[styles.orb, styles.orb3]} />

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <AnimatedPressable
          onPress={onBack}
          style={styles.backBtn}
          accessibilityRole="button"
          accessibilityLabel="Back"
        >
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </AnimatedPressable>

        <View style={styles.heroContent}>
          <WellnessShiftLogoBadge diameter={72} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <View style={styles.glassSheet}>{children}</View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  orb: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  orb1: { width: 280, height: 280, top: -90, right: -90 },
  orb2: { width: 200, height: 200, bottom: 120, left: -80, backgroundColor: 'rgba(255,255,255,0.07)' },
  orb3: {
    width: 140,
    height: 140,
    top: '28%',
    left: '55%',
    backgroundColor: 'rgba(242, 77, 128, 0.18)',
  },
  safe: { flex: 1 },
  backBtn: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.xl,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  heroContent: {
    alignItems: 'center',
    gap: Spacing.sm,
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.xl,
  },
  title: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.size.sm,
    color: 'rgba(255,255,255,0.88)',
    textAlign: 'center',
    fontWeight: '500',
    maxWidth: 280,
    lineHeight: 18,
  },
  glassSheet: {
    flex: 1,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    backgroundColor: Colors.glass,
    borderRadius: Radius['2xl'],
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    overflow: 'hidden',
    ...Shadow.lg,
  },
});
