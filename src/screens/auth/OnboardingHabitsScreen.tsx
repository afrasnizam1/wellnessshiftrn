import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppCard, AnimatedPressable, BrandButton, BackButton } from '../../components/ui';
import AppScreen from '../../components/common/AppScreen';
import { useAppStore } from '../../store';
import { pendingOnboardingStorage } from '../../services/pendingOnboardingStorage';
import { onboardingStorage } from '../../services/onboardingStorage';
import { userService } from '../../services/firebase';
import type { ReminderAnchor } from '../../types/onboardingPrefs';
import { goBackOrTo, goToOnboardingBaseline, refreshPreAuthRouteFromPending } from '../../services/onboardingNavigation';
import { Screen } from '../../navigation/screenNames';
import { isFitnessRelatedGoal } from '../../data/onboardingGoals';

const ANCHORS: { id: ReminderAnchor; label: string; detail: string }[] = [
  { id: 'morning', label: 'Morning', detail: 'After waking up' },
  { id: 'afternoon', label: 'Afternoon', detail: 'Mid-day reset' },
  { id: 'evening', label: 'Evening', detail: 'Wind down after work' },
];

const FREQUENCY = [2, 3, 4, 5, 6, 7];

export default function OnboardingHabitsScreen() {
  const navigation = useNavigation<any>();
  const { user, setUser, hasSeenIntro } = useAppStore();
  const [anchor, setAnchor] = useState<ReminderAnchor | null>(null);
  const [daysPerWeek, setDaysPerWeek] = useState<number | null>(null);
  const [hasEquipment, setHasEquipment] = useState<boolean | null>(null);
  const [showEquipment, setShowEquipment] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (user) {
        const goals = user.healthGoals ?? [];
        setShowEquipment(goals.some(isFitnessRelatedGoal));
        return;
      }
      const pending = await pendingOnboardingStorage.get();
      setShowEquipment(pending.goals.some(isFitnessRelatedGoal));
    };
    load();
  }, [user]);

  const canContinue = !!anchor && !!daysPerWeek && (!showEquipment || hasEquipment !== null);

  const handleContinue = async () => {
    if (!canContinue || saving || !anchor || !daysPerWeek) return;
    setSaving(true);
    try {
      const patch = {
        reminderAnchor: anchor,
        trainingDaysPerWeek: daysPerWeek,
        hasHomeEquipment: showEquipment ? hasEquipment ?? false : undefined,
      };
      if (user) {
        await userService.updateProfile(user.uid, patch);
        await onboardingStorage.setOnboardingHabits(user.uid, patch);
        setUser({ ...user, ...patch });
      } else {
        await pendingOnboardingStorage.save(patch);
      }
      await refreshPreAuthRouteFromPending(hasSeenIntro);
      goToOnboardingBaseline(navigation);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.topBar}>
        <BackButton onPress={() => goBackOrTo(navigation, Screen.experienceLevel)} />
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Build your routine</Text>
        <Text style={styles.subtitle}>When should we nudge you, and how often do you want to practice?</Text>

        <Text style={styles.sectionLabel}>Best time for your daily reminder</Text>
        <View style={styles.row}>
          {ANCHORS.map((item) => (
            <AnimatedPressable
              key={item.id}
              onPress={() => setAnchor(item.id)}
              style={[styles.chip, anchor === item.id && styles.chipSelected]}
            >
              <Text style={[styles.chipTitle, anchor === item.id && styles.chipTitleSelected]}>{item.label}</Text>
              <Text style={styles.chipSub}>{item.detail}</Text>
            </AnimatedPressable>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Days per week you can commit</Text>
        <View style={styles.freqRow}>
          {FREQUENCY.map((n) => (
            <AnimatedPressable
              key={n}
              onPress={() => setDaysPerWeek(n)}
              style={[styles.freqChip, daysPerWeek === n && styles.chipSelected]}
            >
              <Text style={[styles.freqText, daysPerWeek === n && styles.chipTitleSelected]}>{n}</Text>
            </AnimatedPressable>
          ))}
        </View>

        {showEquipment ? (
          <>
            <Text style={styles.sectionLabel}>Do you have basic home equipment?</Text>
            <View style={styles.row}>
              {[
                { value: true, label: 'Yes', sub: 'Bands, dumbbells, etc.' },
                { value: false, label: 'No', sub: 'Bodyweight only' },
              ].map((item) => (
                <AnimatedPressable
                  key={String(item.value)}
                  onPress={() => setHasEquipment(item.value)}
                  style={[styles.equipChip, hasEquipment === item.value && styles.chipSelected]}
                >
                  <Text style={[styles.chipTitle, hasEquipment === item.value && styles.chipTitleSelected]}>{item.label}</Text>
                  <Text style={styles.chipSub}>{item.sub}</Text>
                </AnimatedPressable>
              ))}
            </View>
          </>
        ) : null}
      </ScrollView>
      <View style={styles.footer}>
        <BrandButton label="Next" onPress={handleContinue} disabled={!canContinue} loading={saving} />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  topBar: { paddingHorizontal: Spacing.sm, paddingTop: Spacing.xs },
  content: { padding: Spacing.base, paddingTop: Spacing.md, gap: Spacing.md, paddingBottom: Spacing.md },
  title: { fontSize: Typography.size['2xl'], fontWeight: '800', color: Colors.text, textAlign: 'center' },
  subtitle: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  sectionLabel: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.text, marginTop: Spacing.sm },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  chip: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
  },
  chipSelected: { borderColor: Colors.primary, backgroundColor: Colors.primaryBg },
  chipTitle: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.text },
  chipTitleSelected: { color: Colors.primary },
  chipSub: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 4 },
  freqRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  freqChip: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
  },
  freqText: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  equipChip: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
  },
  footer: { padding: Spacing.base, paddingBottom: Spacing.xl, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: Colors.borderLight },
});
