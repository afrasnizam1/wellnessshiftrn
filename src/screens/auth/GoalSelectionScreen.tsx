// src/screens/auth/GoalSelectionScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing } from '../../theme';
import type { IoniconName } from '../../theme/icons';
import { AppCard, AnimatedPressable, BrandButton, IconBadge } from '../../components/ui';
import AppScreen from '../../components/common/AppScreen';
import { useAppStore } from '../../store';
import { userService } from '../../services/firebase';
import { onboardingStorage } from '../../services/onboardingStorage';
import { notificationService } from '../../services/notifications';
import { pendingOnboardingStorage } from '../../services/pendingOnboardingStorage';
import { goToExperienceLevel, refreshPreAuthRouteFromPending } from '../../services/onboardingNavigation';

export type PrimaryGoal =
  | 'sleep'
  | 'stress'
  | 'fitness'
  | 'nutrition'
  | 'mental'
  | 'habits'
  | 'condition'
  | 'general';

const GOALS: {
  id: PrimaryGoal;
  icon: IoniconName;
  color: string;
  title: string;
  subtitle: string;
}[] = [
  { id: 'sleep', icon: 'bed-outline', color: Colors.sleep, title: 'Sleep better', subtitle: 'Improve sleep quality and recovery' },
  { id: 'stress', icon: 'flower-outline', color: Colors.stress, title: 'Reduce stress', subtitle: 'Build calm and resilience' },
  { id: 'fitness', icon: 'barbell-outline', color: Colors.fitness, title: 'Get fitter', subtitle: 'Move more and build strength' },
  { id: 'nutrition', icon: 'nutrition-outline', color: Colors.nutrition, title: 'Eat healthier', subtitle: 'Improve nutrition and energy' },
  { id: 'mental', icon: 'happy-outline', color: Colors.mental, title: 'Improve mental health', subtitle: 'Mood, anxiety, and focus' },
  { id: 'habits', icon: 'checkbox-outline', color: Colors.mindfulness, title: 'Build healthy habits', subtitle: 'Small daily wins that stick' },
  { id: 'condition', icon: 'medical-outline', color: Colors.physical, title: 'Manage a condition', subtitle: 'Track and support a health goal' },
  { id: 'general', icon: 'sparkles-outline', color: Colors.purple, title: 'Overall wellness', subtitle: 'A balanced approach to health' },
];

export default function GoalSelectionScreen() {
  const navigation = useNavigation<any>();
  const { user, setUser, hasSeenIntro } = useAppStore();
  const { width } = useWindowDimensions();
  const cardWidth = (width - Spacing.base * 2 - Spacing.md) / 2;
  const [selected, setSelected] = useState<Set<PrimaryGoal>>(new Set());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    pendingOnboardingStorage.get().then((pending) => {
      if (pending.goals.length === 0) return;
      setSelected(new Set(pending.goals as PrimaryGoal[]));
    });
  }, []);

  const toggleGoal = (goal: PrimaryGoal) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(goal)) next.delete(goal);
      else next.add(goal);
      return next;
    });
  };

  const handleContinue = async () => {
    if (selected.size === 0 || saving) return;

    const goals = GOALS.filter((g) => selected.has(g.id)).map((g) => g.id);
    const primaryGoal = goals[0];

    setSaving(true);
    try {
      if (user) {
        await userService.updateProfile(user.uid, { primaryGoal, healthGoals: goals });
        await onboardingStorage.setUserGoals(user.uid, goals);
        await onboardingStorage.setSelectedPrimaryGoal(user.uid, primaryGoal);
        setUser({ ...user, primaryGoal, healthGoals: goals });
        await notificationService.scheduleGoalReminder(primaryGoal).catch(() => {});
      } else {
        await pendingOnboardingStorage.saveGoals(goals, primaryGoal);
      }
      await refreshPreAuthRouteFromPending(hasSeenIntro);
      goToExperienceLevel(navigation);
    } catch (error) {
      console.warn('[GoalSelection] continue failed:', error);
      Alert.alert('Could not continue', 'Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const selectionCount = selected.size;

  return (
    <AppScreen style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>Let’s personalise</Text>
        <Text style={styles.title}>What brings you here?</Text>
        <Text style={styles.subtitle}>
          Pick all that apply. We'll tailor your plan and recommendations around your focus areas.
        </Text>

        <View style={styles.grid}>
          {GOALS.map((goal) => {
            const isSelected = selected.has(goal.id);
            return (
              <AnimatedPressable
                key={goal.id}
                onPress={() => toggleGoal(goal.id)}
                style={[styles.cardPress, { width: cardWidth }]}
              >
                <AppCard
                  style={[
                    styles.card,
                    isSelected && {
                      borderColor: goal.color,
                      backgroundColor: `${goal.color}10`,
                    },
                  ]}
                >
                  {isSelected ? (
                    <View style={[styles.checkBadge, { backgroundColor: goal.color }]}>
                      <Ionicons name="checkmark" size={12} color={Colors.white} />
                    </View>
                  ) : null}
                  <IconBadge
                    name={goal.icon}
                    color={goal.color}
                    size="lg"
                    variant={isSelected ? 'solid' : 'soft'}
                  />
                  <Text style={styles.cardTitle}>{goal.title}</Text>
                  <Text style={styles.cardSub}>{goal.subtitle}</Text>
                </AppCard>
              </AnimatedPressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.selectionHint}>
          {selectionCount === 0
            ? 'Select at least one focus area'
            : `${selectionCount} focus area${selectionCount === 1 ? '' : 's'} selected`}
        </Text>
        <BrandButton
          label="Next"
          onPress={handleContinue}
          disabled={selectionCount === 0}
          loading={saving}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: {
    padding: Spacing.base,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
    gap: Spacing.md,
  },
  eyebrow: {
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: Colors.brand,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  title: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
    lineHeight: 22,
    paddingHorizontal: Spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginTop: Spacing.lg,
    justifyContent: 'space-between',
  },
  cardPress: { flexGrow: 0 },
  card: {
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.sm,
    minHeight: 168,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
    position: 'relative',
  },
  checkBadge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: Typography.size.sm,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  cardSub: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  footer: {
    padding: Spacing.base,
    paddingBottom: Spacing.xl,
    gap: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.borderLight,
    backgroundColor: Colors.background,
  },
  selectionHint: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: '600',
  },
});
