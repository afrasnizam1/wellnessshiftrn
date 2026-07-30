import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Modal, TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { IconBadge, BrandButton } from '../ui';
import type { IoniconName } from '../../theme/icons';
import { getContextualGuideDestination } from '../../utils/onboardingGuide';

export type InAppGuideDestination =
  | 'home'
  | 'dailyCheckIn'
  | 'dailyPlan'
  | 'aiInsights'
  | 'fitness'
  | 'analytics'
  | 'more';

type TourStep = {
  id: string;
  title: string;
  description: string;
  icon: IoniconName;
  color: string;
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
      icon: 'sparkles-outline',
      color: Colors.brand,
    },
    {
      id: 'home',
      title: 'Home — your wellness hub',
      description:
        'See your wellness score, daily motivation, and progress signals. Start daily check-ins and open today’s plan from here.',
      icon: 'home-outline',
      color: Colors.primary,
      tabHint: 'Bottom tab: Home',
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
      icon: focus === 'fitness' ? 'barbell-outline' : 'flame-outline',
      color: focus === 'fitness' ? Colors.fitness : Colors.warning,
      tabHint: 'Home → Check-in / Daily plan',
      destination: focus === 'fitness' ? 'fitness' : 'dailyCheckIn',
      actionTitle: focus === 'fitness' ? 'Open Fitness' : 'Do check-in',
    },
    {
      id: 'fitness',
      title: 'Fitness',
      description:
        'Guided modules, workouts, and brain training live in the Fitness tab. Pick a session that matches your energy today.',
      icon: 'barbell-outline',
      color: Colors.fitness,
      tabHint: 'Bottom tab: Fitness',
      destination: 'fitness',
      actionTitle: 'Open Fitness',
    },
    {
      id: 'insights',
      title: 'AI Insights',
      description:
        'Chat with your AI health coach, review insights, and get next-best actions based on your quiz and check-ins.',
      icon: 'sparkles-outline',
      color: Colors.brand,
      tabHint: 'Bottom tab: AI Insights',
      destination: 'aiInsights',
      actionTitle: 'Open AI Insights',
    },
    {
      id: 'analytics',
      title: 'Analytics & assessments',
      description:
        'Track trends over time, revisit wellness assessments, and export a year summary when you’re on a paid plan.',
      icon: 'stats-chart-outline',
      color: Colors.physical,
      tabHint: 'Bottom tab: Analytics',
      destination: 'analytics',
      actionTitle: 'Open Analytics',
    },
    {
      id: 'more',
      title: 'More — settings & account',
      description:
        'Manage your profile, subscription, privacy, connected health data, and reopen this guide anytime.',
      icon: 'menu-outline',
      color: Colors.mental,
      tabHint: 'Bottom tab: More',
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

  useEffect(() => {
    if (visible) setIndex(0);
  }, [visible]);

  const step = steps[index] ?? steps[0];
  const isLast = index >= steps.length - 1;

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
      <View style={styles.safe}>
        <View style={styles.toolbar}>
          <Text style={styles.navTitle}>App tour</Text>
          <TouchableOpacity onPress={onDismiss} hitSlop={8}>
            <Text style={styles.close}>Skip</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <View style={styles.progressRow}>
            {steps.map((s, i) => (
              <View
                key={s.id}
                style={[styles.progressDot, i === index && styles.progressDotActive, i < index && styles.progressDotDone]}
              />
            ))}
          </View>

          <Text style={styles.stepCount}>
            {index + 1} of {steps.length}
          </Text>

          <View style={styles.hero}>
            <IconBadge name={step.icon} color={step.color} size="lg" />
            {step.tabHint ? (
              <View style={styles.tabHint}>
                <Ionicons name="navigate-outline" size={14} color={Colors.primary} />
                <Text style={styles.tabHintText}>{step.tabHint}</Text>
              </View>
            ) : null}
            <Text style={styles.title}>{step.title}</Text>
            <Text style={styles.sub}>{step.description}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          {step.destination && step.actionTitle && index > 0 ? (
            <TouchableOpacity
              style={styles.secondaryAction}
              onPress={() => onAction(step.destination!)}
            >
              <Text style={styles.secondaryActionText}>{step.actionTitle}</Text>
              <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
            </TouchableOpacity>
          ) : null}

          <View style={styles.navRow}>
            {index > 0 ? (
              <TouchableOpacity style={styles.backBtn} onPress={goBack} hitSlop={8}>
                <Ionicons name="chevron-back" size={20} color={Colors.textSecondary} />
                <Text style={styles.backText}>Back</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.backPlaceholder} />
            )}
            <BrandButton
              label={isLast ? "Got it — let's go" : 'Next'}
              onPress={goNext}
              style={styles.nextBtn}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderLight,
  },
  navTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  close: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.primary },
  body: {
    flex: 1,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.lg,
    gap: Spacing.md,
  },
  progressRow: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.borderLight,
  },
  progressDotActive: {
    backgroundColor: Colors.primary,
    width: 20,
  },
  progressDotDone: {
    backgroundColor: Colors.primary + '88',
  },
  stepCount: {
    textAlign: 'center',
    fontSize: Typography.size.xs,
    fontWeight: '600',
    color: Colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  hero: {
    alignItems: 'center',
    gap: Spacing.md,
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.sm,
  },
  tabHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primaryBg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
  },
  tabHintText: {
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: Colors.primary,
  },
  title: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  sub: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 340,
  },
  footer: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.sm,
    gap: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.borderLight,
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
    color: Colors.primary,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingRight: Spacing.sm,
  },
  backText: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  backPlaceholder: { width: 64 },
  nextBtn: { flex: 1 },
});
