// src/screens/auth/GoalSelectionScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing } from '../../theme';
import { AppCard, AnimatedPressable, BrandButton, IconBadge, BackButton } from '../../components/ui';
import AppScreen from '../../components/common/AppScreen';
import { useAppStore } from '../../store';
import { userService } from '../../services/firebase';
import { onboardingStorage } from '../../services/onboardingStorage';
import { notificationService } from '../../services/notifications';
import { pendingOnboardingStorage } from '../../services/pendingOnboardingStorage';
import { goBackOrTo, goToExperienceLevel, refreshPreAuthRouteFromPending } from '../../services/onboardingNavigation';
import { Screen } from '../../navigation/screenNames';
import { ONBOARDING_GOALS, type PrimaryGoal } from '../../data/onboardingGoals';

export type { PrimaryGoal };

export default function GoalSelectionScreen() {
  const navigation = useNavigation<any>();
  const { user, setUser, hasSeenIntro } = useAppStore();
  const { width } = useWindowDimensions();
  const cardWidth = (width - Spacing.base * 2 - Spacing.md) / 2;
  const [selected, setSelected] = useState<Set<PrimaryGoal>>(new Set());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    pendingOnboardingStorage.get().then((pending) => {
      if (pending.goals.length > 0) {
        setSelected(new Set(pending.goals as PrimaryGoal[]));
        return;
      }
      // Clinician purpose → pre-select the clinician goal.
      if (pending.appPurpose === 'clinician' || pending.appPurposes?.includes('clinician') || pending.appPurposes?.includes('all')) {
        setSelected(new Set<PrimaryGoal>(['clinician']));
      }
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

    const goals = ONBOARDING_GOALS.filter((g) => selected.has(g.id)).map((g) => g.id);
    // Prefer clinician as primary when selected so Home/results route toward care.
    const primaryGoal = goals.includes('clinician') ? 'clinician' : goals[0];
    const wantsClinician = goals.includes('clinician');

    setSaving(true);
    try {
      if (user) {
        await userService.updateProfile(user.uid, {
          primaryGoal,
          healthGoals: goals,
          ...(wantsClinician ? { appPurpose: 'clinician' as const } : {}),
        });
        await onboardingStorage.setUserGoals(user.uid, goals);
        await onboardingStorage.setSelectedPrimaryGoal(user.uid, primaryGoal);
        if (wantsClinician) {
          await onboardingStorage.setAppPurpose(user.uid, 'clinician');
        }
        setUser({
          ...user,
          primaryGoal,
          healthGoals: goals,
          ...(wantsClinician ? { appPurpose: 'clinician' as const } : {}),
        });
        await notificationService.scheduleGoalReminder(primaryGoal).catch(() => {});
      } else {
        await pendingOnboardingStorage.saveGoals(goals, primaryGoal);
        if (wantsClinician) {
          await pendingOnboardingStorage.savePurpose('clinician');
        }
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
      <View style={styles.topBar}>
        <BackButton onPress={() => goBackOrTo(navigation, Screen.purposeSelection)} />
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>Focus areas</Text>
        <Text style={styles.title}>What should we prioritise?</Text>
        <Text style={styles.subtitle}>
          Pick all that apply. These feed your wellness score — and help us tailor plans,
          modules, and (if you want) clinician support.
        </Text>

        <View style={styles.grid}>
          {ONBOARDING_GOALS.map((goal) => {
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
        {!user ? (
          <AnimatedPressable
            onPress={() => navigation.navigate(Screen.authentication, { screen: Screen.signIn })}
            accessibilityRole="button"
            accessibilityLabel="Sign in"
          >
            <Text style={styles.signInLink}>Already have an account? Sign in</Text>
          </AnimatedPressable>
        ) : null}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  topBar: {
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.xs,
  },
  content: {
    padding: Spacing.base,
    paddingTop: Spacing.md,
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
  signInLink: {
    fontSize: Typography.size.sm,
    color: Colors.primary,
    textAlign: 'center',
    fontWeight: '600',
    paddingVertical: Spacing.xs,
  },
});
