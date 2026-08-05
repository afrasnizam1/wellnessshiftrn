import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Modal, TouchableOpacity, useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Colors, Typography, Spacing, Radius, Shadow, Gradients } from '../../theme';
import { BrandButton } from '../ui';
import type { IoniconName } from '../../theme/icons';
import { getContextualGuideDestination } from '../../utils/onboardingGuide';
import { CLINICIAN_CONNECT_SHORT } from '../../types/onboardingPrefs';

export type InAppGuideDestination =
  | 'home'
  | 'dailyCheckIn'
  | 'dailyPlan'
  | 'aiInsights'
  | 'fitness'
  | 'anatomy'
  | 'foods'
  | 'clinician'
  | 'analytics'
  | 'more';

type TourStep = {
  id: string;
  title: string;
  description: string;
  icon: IoniconName;
  color: string;
  well: [string, string];
  tabHint?: string;
  destination?: InAppGuideDestination;
  actionTitle?: string;
};

function buildTourSteps(primaryGoal?: string | null): TourStep[] {
  const focus = getContextualGuideDestination(primaryGoal);
  return [
    {
      id: 'welcome',
      title: 'Welcome to Wellness Shift',
      description:
        'Your personal hub for daily wellness — track how you feel, follow a plan, train, and get AI guidance tailored to your goals.',
      icon: 'sparkles',
      color: Colors.brand,
      well: [...Gradients.brand],
    },
    {
      id: 'home',
      title: 'Home — your wellness hub',
      description:
        'See your wellness score, daily motivation, and progress signals. Start daily check-ins and open today’s plan from here.',
      icon: 'home',
      color: Colors.primary,
      well: [...Gradients.primary],
      tabHint: 'Bottom tab · Home',
      destination: 'home',
      actionTitle: 'Stay on Home',
    },
    {
      id: 'checkIn',
      title: 'Daily check-in & plan',
      description:
        focus === 'fitness'
          ? 'Log how you feel each day, then follow your daily plan. Based on your goals, Fitness Hub is a great next stop after this.'
          : 'Log today’s mood in one tap — it personalises your plan and AI insights. Your daily plan lives on Home too.',
      icon: focus === 'fitness' ? 'barbell' : 'flame',
      color: focus === 'fitness' ? Colors.fitness : Colors.warning,
      well: focus === 'fitness' ? ['#389EFA', '#007AFF'] : ['#FF9500', '#FFB340'],
      tabHint: focus === 'fitness' ? 'Tab · Fitness' : 'Home · Check-in',
      destination: focus === 'fitness' ? 'fitness' : 'dailyCheckIn',
      actionTitle: focus === 'fitness' ? 'Open Fitness' : 'Do check-in',
    },
    {
      id: 'fitness',
      title: 'Fitness',
      description:
        'Guided modules, workouts, and brain training live in the Fitness tab. Pick a session that matches your energy today.',
      icon: 'barbell',
      color: Colors.fitness,
      well: ['#389EFA', '#5BB8FF'],
      tabHint: 'Bottom tab · Fitness',
      destination: 'fitness',
      actionTitle: 'Open Fitness',
    },
    {
      id: 'body',
      title: 'Learn the human body',
      description:
        'Explore interactive 3D anatomy — heart, brain, lungs, muscles, and more — so you understand how your body works as you build healthier habits.',
      icon: 'body',
      color: Colors.mental,
      well: ['#946BFA', '#7A57F5'],
      tabHint: 'More · Anatomy Explorer',
      destination: 'anatomy',
      actionTitle: 'Explore anatomy',
    },
    {
      id: 'foods',
      title: 'Foods & nutrition',
      description:
        'Learn nutrition basics, browse high-protein meals, and see which foods support organ health — practical guides you can use every day.',
      icon: 'nutrition',
      color: Colors.nutrition,
      well: ['#2EDBBD', '#34C759'],
      tabHint: 'Fitness · Nutrition',
      destination: 'foods',
      actionTitle: 'Explore foods',
    },
    {
      id: 'insights',
      title: 'AI Insights',
      description:
        'Chat with your AI health coach, review insights, and get next-best actions based on your quiz and check-ins.',
      icon: 'sparkles',
      color: Colors.brand,
      well: [...Gradients.brand],
      tabHint: 'Bottom tab · AI Insights',
      destination: 'aiInsights',
      actionTitle: 'Open AI Insights',
    },
    {
      id: 'analytics',
      title: 'Analytics & assessments',
      description:
        'Track trends over time, revisit wellness assessments, and export a year summary when you’re on a paid plan.',
      icon: 'stats-chart',
      color: Colors.physical,
      well: ['#389EFA', '#2EDBBD'],
      tabHint: 'Bottom tab · Analytics',
      destination: 'analytics',
      actionTitle: 'Open Analytics',
    },
    {
      id: 'clinician',
      title: 'Connect with a clinician',
      description:
        `Get personalised care plans and recommendations from a doctor or GP-referred clinician on Wellness Shift. ${CLINICIAN_CONNECT_SHORT}.`,
      icon: 'medkit',
      color: Colors.brand,
      well: ['#F24D80', '#FF8561'],
      tabHint: 'My Care · Connect',
      destination: 'clinician',
      actionTitle: 'Connect clinician',
    },
    {
      id: 'more',
      title: 'More — settings & account',
      description:
        'Manage your profile, subscription, privacy, connected health data, and reopen this guide anytime.',
      icon: 'grid',
      color: Colors.mental,
      well: ['#946BFA', '#B794F6'],
      tabHint: 'Bottom tab · More',
      destination: 'more',
      actionTitle: 'Open More',
    },
  ];
}

type Props = {
  visible: boolean;
  primaryGoal?: string | null;
  onAction: (destination: InAppGuideDestination) => void;
  onDismiss: () => void;
};

export default function InAppGuideModal({ visible, primaryGoal, onAction, onDismiss }: Props) {
  const steps = buildTourSteps(primaryGoal);
  const [index, setIndex] = useState(0);
  const { height } = useWindowDimensions();

  useEffect(() => {
    if (visible) setIndex(0);
  }, [visible]);

  const step = steps[index] ?? steps[0];
  const isLast = index >= steps.length - 1;
  const progress = (index + 1) / steps.length;

  const goNext = () => {
    if (isLast) {
      onDismiss();
      return;
    }
    setIndex((i) => Math.min(i + 1, steps.length - 1));
  };

  const goBack = () => {
    setIndex((i) => Math.max(i - 1, 0));
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onDismiss}>
      <LinearGradient
        colors={['#FFF5F8', '#F7F8FC', '#EEF1F8']}
        locations={[0, 0.45, 1]}
        style={styles.root}
      >
        <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
          <View style={styles.toolbar}>
            <View>
              <Text style={styles.eyebrow}>Quick tour</Text>
              <Text style={styles.navTitle}>Get oriented</Text>
            </View>
            <TouchableOpacity
              onPress={onDismiss}
              hitSlop={10}
              style={styles.skipBtn}
              accessibilityRole="button"
              accessibilityLabel="Skip tour"
            >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressBlock}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
            </View>
            <Text style={styles.stepCount}>
              Step {index + 1}
              <Text style={styles.stepCountMuted}> / {steps.length}</Text>
            </Text>
          </View>

          <View style={[styles.body, { minHeight: Math.min(420, height * 0.52) }]}>
            <Animated.View
              key={step.id}
              entering={FadeIn.duration(280)}
              exiting={FadeOut.duration(160)}
              style={styles.hero}
            >
              <View style={styles.orbGlow}>
                <LinearGradient
                  colors={step.well}
                  start={{ x: 0.1, y: 0 }}
                  end={{ x: 0.9, y: 1 }}
                  style={styles.orb}
                >
                  <Ionicons name={step.icon} size={40} color="#fff" />
                </LinearGradient>
              </View>

              {step.tabHint ? (
                <View style={styles.tabHint}>
                  <Ionicons name="navigate" size={13} color={Colors.brand} />
                  <Text style={styles.tabHintText}>{step.tabHint}</Text>
                </View>
              ) : (
                <View style={styles.brandPill}>
                  <Text style={styles.brandPillText}>Wellness Shift</Text>
                </View>
              )}

              <Text style={styles.title}>{step.title}</Text>
              <Text style={styles.sub}>{step.description}</Text>
            </Animated.View>
          </View>

          <View style={styles.footer}>
            {step.destination && step.actionTitle && index > 0 ? (
              <TouchableOpacity
                style={styles.secondaryAction}
                onPress={() => onAction(step.destination!)}
                accessibilityRole="button"
                accessibilityLabel={step.actionTitle}
              >
                <Text style={styles.secondaryActionText}>{step.actionTitle}</Text>
                <Ionicons name="arrow-forward" size={15} color={Colors.brand} />
              </TouchableOpacity>
            ) : (
              <View style={styles.secondarySpacer} />
            )}

            <View style={styles.navRow}>
              {index > 0 ? (
                <TouchableOpacity
                  style={styles.backBtn}
                  onPress={goBack}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel="Back"
                >
                  <Ionicons name="chevron-back" size={18} color={Colors.textSecondary} />
                  <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
              ) : null}
              <BrandButton
                label={isLast ? "Got it — let's go" : 'Next'}
                onPress={goNext}
                style={styles.nextBtn}
              />
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  eyebrow: {
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: Colors.brand,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  navTitle: {
    fontSize: Typography.size.xl,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.4,
  },
  skipBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.pill,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  skipText: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  progressBlock: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(28, 28, 30, 0.08)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: Colors.brand,
  },
  stepCount: {
    fontSize: Typography.size.sm,
    fontWeight: '700',
    color: Colors.text,
  },
  stepCountMuted: {
    fontWeight: '500',
    color: Colors.textTertiary,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  hero: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  orbGlow: {
    marginBottom: Spacing.xs,
    borderRadius: 48,
    ...Shadow.md,
    shadowColor: Colors.brand,
    shadowOpacity: 0.22,
  },
  orb: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandPill: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.pill,
    backgroundColor: Colors.brandSubtle,
  },
  brandPillText: {
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: Colors.brand,
    letterSpacing: 0.3,
  },
  tabHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.brandSubtle,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },
  tabHintText: {
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: Colors.brand,
  },
  title: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.6,
    textAlign: 'center',
    lineHeight: 34,
    maxWidth: 320,
  },
  sub: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 340,
  },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
    paddingTop: Spacing.sm,
    gap: Spacing.xs,
  },
  secondaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: Spacing.sm,
  },
  secondaryActionText: {
    fontSize: Typography.size.sm,
    fontWeight: '700',
    color: Colors.brand,
  },
  secondarySpacer: { height: 12 },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingRight: Spacing.xs,
  },
  backText: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  nextBtn: { flex: 1 },
});
