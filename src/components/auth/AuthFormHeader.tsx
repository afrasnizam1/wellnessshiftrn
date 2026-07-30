import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, Spacing, Radius, Colors } from '../../theme';
import { AUTH_GRADIENT } from '../../theme/authTheme';
import { AnimatedPressable } from '../ui';
import WellnessShiftLogoBadge from './WellnessShiftLogoBadge';

type Props = {
  title: string;
  subtitle: string;
  onBack: () => void;
  children: React.ReactNode;
};

/** Modern gradient auth shell with frosted glass form area */
export default function AuthFormHeader({ title, subtitle, onBack, children }: Props) {
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[...AUTH_GRADIENT]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.orb, styles.orb1]} />
      <View style={[styles.orb, styles.orb2]} />

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <AnimatedPressable onPress={onBack} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </AnimatedPressable>

        <View style={styles.heroContent}>
          <WellnessShiftLogoBadge diameter={80} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <View style={styles.glassSheet}>{children}</View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: AUTH_GRADIENT[0] },
  orb: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  orb1: { width: 280, height: 280, top: -90, right: -90 },
  orb2: { width: 200, height: 200, bottom: 100, left: -70 },
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
    paddingTop: Spacing['3xl'],
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
  },
  title: {
    fontSize: Typography.size['3xl'],
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.size.base,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    fontWeight: '500',
    maxWidth: 280,
  },
  glassSheet: {
    flex: 1,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderRadius: Radius['2xl'],
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    overflow: 'hidden',
  },
});
