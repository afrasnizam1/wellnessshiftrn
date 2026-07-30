import React from 'react';
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
    body: 'Link with an invite code to share progress, receive care plans, and message your care team.',
    cta: 'Connect clinician',
    colors: ['#F24D80', '#D93A6A'],
  },
  wellness_score: {
    icon: 'analytics-outline',
    title: 'Grow your wellness score',
    body: 'Workouts, nutrition, sleep, mood, and clinician input all feed one score you can watch improve.',
    cta: 'View analytics',
    colors: ['#8C59BF', '#946BFA'],
  },
  learn: {
    icon: 'book-outline',
    title: 'Learn something useful today',
    body: 'Explore health topics, nutrition, and fitness modules tailored to how you scored.',
    cta: 'Open Fitness Hub',
    colors: ['#2EDBBD', '#389EFA'],
  },
  fitness: {
    icon: 'barbell-outline',
    title: 'Keep your routine moving',
    body: 'Jump into workouts, guided programs, and daily movement that lift your wellness score.',
    cta: 'Start training',
    colors: ['#389EFA', '#007AFF'],
  },
  all: {
    icon: 'apps-outline',
    title: 'Your full wellness toolkit',
    body: 'Score, learning, fitness, and clinician care — all feeding one wellness score.',
    cta: 'View your score',
    colors: ['#007AFF', '#8C59BF'],
  },
};

export default function HomePurposeLeadCard({ purpose, linkedToClinician, onPress }: Props) {
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
          <Ionicons name={copy.icon} size={22} color={Colors.white} />
        </View>
        <View style={styles.textCol}>
          <Text style={styles.title}>{copy.title}</Text>
          <Text style={styles.body}>{copy.body}</Text>
          <View style={styles.ctaRow}>
            <Text style={styles.cta}>{copy.cta}</Text>
            <Ionicons name="arrow-forward" size={14} color={Colors.white} />
          </View>
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: Radius.xl,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.lg,
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCol: { flex: 1, gap: 6 },
  title: {
    fontSize: Typography.size.lg,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -0.3,
  },
  body: {
    fontSize: Typography.size.sm,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.xs,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
  },
  cta: { color: Colors.white, fontWeight: '700', fontSize: Typography.size.sm },
});
