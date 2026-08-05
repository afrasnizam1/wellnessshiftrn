import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AnimatedPressable } from '../ui';
import type { AppPurpose } from '../../types/onboardingPrefs';
import type { IoniconName } from '../../theme/icons';

type Props = {
  purpose: AppPurpose;
  linkedToClinician?: boolean;
  onPress: () => void;
};

const COPY: Record<
  AppPurpose,
  { icon: IoniconName; title: string; body: string; cta: string; colors: [string, string] }
> = {
  clinician: {
    icon: 'medkit-outline',
    title: 'Connect with your clinician',
    body: 'GP referral only — use the invite code for your health issue.',
    cta: 'Connect',
    colors: ['#F24D80', '#D93A6A'],
  },
  wellness_score: {
    icon: 'analytics-outline',
    title: 'Grow your wellness score',
    body: 'Watch workouts, nutrition, and sleep lift one score.',
    cta: 'Analytics',
    colors: ['#8C59BF', '#946BFA'],
  },
  learn: {
    icon: 'book-outline',
    title: 'Learn something useful today',
    body: 'Health topics tailored to how you scored.',
    cta: 'Fitness Hub',
    colors: ['#2EDBBD', '#389EFA'],
  },
  fitness: {
    icon: 'barbell-outline',
    title: 'Keep your routine moving',
    body: 'Workouts and programs that lift your score.',
    cta: 'Train',
    colors: ['#389EFA', '#007AFF'],
  },
  all: {
    icon: 'apps-outline',
    title: 'Your full wellness toolkit',
    body: 'Score, learning, and fitness. Clinician care only if GP-referred.',
    cta: 'View score',
    colors: ['#007AFF', '#8C59BF'],
  },
};

export default memo(function HomePurposeLeadCard({ purpose, linkedToClinician, onPress }: Props) {
  // Once linked, clinician purpose no longer needs the connect CTA as the hero lead.
  if (purpose === 'clinician' && linkedToClinician) return null;

  const copy = COPY[purpose];

  return (
    <AnimatedPressable
      onPress={onPress}
      style={styles.wrap}
      accessibilityRole="button"
      accessibilityLabel={copy.cta}
    >
      <LinearGradient
        colors={copy.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name={copy.icon} size={16} color={Colors.white} />
        </View>
        <View style={styles.textCol}>
          <Text style={styles.title} numberOfLines={1}>
            {copy.title}
          </Text>
          <Text style={styles.body} numberOfLines={1}>
            {copy.body}
          </Text>
        </View>
        <View style={styles.ctaRow}>
          <Text style={styles.cta}>{copy.cta}</Text>
          <Ionicons name="arrow-forward" size={12} color={Colors.white} />
        </View>
      </View>
    </AnimatedPressable>
  );
});

const styles = StyleSheet.create({
  wrap: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    alignItems: 'center',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCol: { flex: 1, gap: 2, minWidth: 0 },
  title: {
    fontSize: Typography.size.sm,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -0.2,
  },
  body: {
    fontSize: Typography.size.xs,
    color: 'rgba(255,255,255,0.88)',
    lineHeight: 16,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: Radius.pill,
    flexShrink: 0,
  },
  cta: { color: Colors.white, fontWeight: '700', fontSize: Typography.size.xs },
});
