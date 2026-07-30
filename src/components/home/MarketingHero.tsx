import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AnimatedPressable } from '../ui';

type Props = { onStartQuiz: () => void };

export default function MarketingHero({ onStartQuiz }: Props) {
  return (
    <AnimatedPressable onPress={onStartQuiz} style={styles.wrap}>
      <LinearGradient
        colors={['#389EFA', '#946BFA', '#F24D80']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="sparkles" size={28} color={Colors.white} />
        </View>
        <Text style={styles.title}>Your Wellness Journey</Text>
        <Text style={styles.titleAccent}>Starts with your score</Text>
        <Text style={styles.body}>
          Everything you do here — workouts, nutrition, sleep, mood, and clinician care — feeds one wellness score you can watch improve.
        </Text>
        <View style={styles.ctaRow}>
          <Text style={styles.cta}>Take assessment</Text>
          <Ionicons name="arrow-forward" size={16} color={Colors.white} />
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: Radius.xl,
    overflow: 'hidden',
    minHeight: 220,
  },
  content: { padding: Spacing.lg, gap: Spacing.sm },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -0.5,
  },
  titleAccent: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: 'rgba(255,255,255,0.95)',
    letterSpacing: -0.5,
    marginTop: -Spacing.sm,
  },
  body: {
    fontSize: Typography.size.sm,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 22,
    marginTop: Spacing.xs,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.md,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
  },
  cta: { color: Colors.white, fontWeight: '700', fontSize: Typography.size.sm },
});
