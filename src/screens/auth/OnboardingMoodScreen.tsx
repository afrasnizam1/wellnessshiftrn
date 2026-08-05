import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '../../navigation/screenNames';
import { Colors, Typography, Spacing } from '../../theme';
import { useAppStore } from '../../store';
import { checkInService } from '../../services/checkInService';
import { onboardingStorage } from '../../services/onboardingStorage';
import { pendingOnboardingStorage } from '../../services/pendingOnboardingStorage';
import { BrandButton } from '../../components/ui';
import type { MoodLevel } from '../../types';
import AppScreen from '../../components/common/AppScreen';
import MoodOptionGrid, { ONBOARDING_MOOD_OPTIONS } from '../../components/common/MoodOptionGrid';
import { goToNotificationPermissions, refreshPreAuthRouteFromPending } from '../../services/onboardingNavigation';

export default function OnboardingMoodScreen() {
  const navigation = useNavigation<any>();
  const { user, hasSeenIntro } = useAppStore();
  const [saving, setSaving] = useState(false);
  const isPreAuth = !user;

  const finish = async (mood?: MoodLevel) => {
    if (saving) return;
    setSaving(true);
    try {
      if (isPreAuth) {
        await pendingOnboardingStorage.save({
          moodLevel: mood ?? null,
          moodStepComplete: true,
        });
        await refreshPreAuthRouteFromPending(hasSeenIntro);
        goToNotificationPermissions(navigation);
        return;
      }

      if (!user) return;
      if (mood) {
        await checkInService.saveCheckIn(user.uid, {
          mood,
          energy: 3,
          stress: 5,
          notes: '',
        });
      }
      await onboardingStorage.markOnboardingMoodComplete(user.uid);
      navigation.replace(Screen.notificationPermissions);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppScreen style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>How are you feeling right now?</Text>
        <Text style={styles.subtitle}>
          Optional — one tap helps us tailor your first recommendations and AI insights.
        </Text>

        <MoodOptionGrid
          options={ONBOARDING_MOOD_OPTIONS}
          onSelect={(mood) => finish(mood)}
          disabled={saving}
        />

        <BrandButton label="Skip for now" variant="outline" onPress={() => finish()} disabled={saving} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, gap: Spacing.lg, paddingBottom: Spacing['3xl'] },
  title: { fontSize: Typography.size['2xl'], fontWeight: '800', color: Colors.text, textAlign: 'center' },
  subtitle: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
});
