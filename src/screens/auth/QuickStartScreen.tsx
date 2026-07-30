import React from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { useAppStore } from '../../store';
import { onboardingStorage } from '../../services/onboardingStorage';
import AppScreen from '../../components/common/AppScreen';
import { BrandButton } from '../../components/ui';

const STEPS = [
  {
    number: 1,
    title: 'Start Here',
    description: 'Set your goals and preferences so your plan stays personalised.',
    icon: '✨',
  },
  {
    number: 2,
    title: 'Daily Check-in',
    description: "Log today's habits to build your streak and keep recommendations accurate.",
    icon: '🔥',
  },
  {
    number: 3,
    title: 'AI Insights',
    description: 'Get your next best action based on your quiz results and progress.',
    icon: '🧠',
  },
  {
    number: 4,
    title: 'Fitness + Analytics',
    description: 'Follow workouts and track progress so you can see momentum build week to week.',
    icon: '📊',
  },
];

export default function QuickStartScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAppStore();

  const finish = async () => {
    if (user) {
      await onboardingStorage.markQuickStartComplete(user.uid);
      await onboardingStorage.setPendingInAppGuide(user.uid, true);
    }
    navigation.replace(Screen.healthPermissions);
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quick Start</Text>
        <TouchableOpacity onPress={finish}>
          <Text style={styles.close}>Close</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Here's what to do next</Text>
        <Text style={styles.subtitle}>
          Follow these steps to get the most out of your plan. You can come back anytime from Home.
        </Text>

        {STEPS.map((step) => (
          <View key={step.number} style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{step.number}</Text>
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>{step.icon} {step.title}</Text>
              <Text style={styles.stepDesc}>{step.description}</Text>
            </View>
          </View>
        ))}

        <BrandButton label="Got it — let's go" onPress={finish} style={styles.cta} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
  },
  headerTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  close: { fontSize: Typography.size.sm, color: Colors.primary, fontWeight: '600' },
  content: { padding: Spacing.base, gap: Spacing.md, paddingBottom: Spacing.xl },
  title: { fontSize: Typography.size.xl, fontWeight: '700', color: Colors.text },
  subtitle: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  stepCard: {
    flexDirection: 'row',
    gap: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    ...Shadow.sm,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: { color: Colors.primary, fontWeight: '700' },
  stepInfo: { flex: 1 },
  stepTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  stepDesc: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginTop: 4, lineHeight: 20 },
  cta: { marginTop: Spacing.md },
});
