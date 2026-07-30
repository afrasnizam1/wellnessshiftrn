import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '../../navigation/screenNames';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { IconBadge, BrandButton } from '../../components/ui';
import { useAppStore } from '../../store';
import { onboardingStorage } from '../../services/onboardingStorage';
import { notificationService } from '../../services/notifications';
import { REMINDER_ANCHOR_HOURS, type ReminderAnchor } from '../../types/onboardingPrefs';
import AppScreen from '../../components/common/AppScreen';

export default function NotificationPermissionScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAppStore();
  const [loading, setLoading] = useState(false);

  const advance = async (request: boolean) => {
    if (!user || loading) return;
    setLoading(true);
    try {
      if (request) {
        await notificationService.requestPermission();
        await notificationService.registerDevice(user.uid, user.role);
        const habits = await onboardingStorage.getOnboardingHabits(user.uid);
        const anchor = (habits?.reminderAnchor ?? user.reminderAnchor) as ReminderAnchor | undefined;
        const goal = user.primaryGoal ?? 'general';
        if (anchor && REMINDER_ANCHOR_HOURS[anchor]) {
          const { hour, minute } = REMINDER_ANCHOR_HOURS[anchor];
          await notificationService.scheduleGoalReminder(goal, hour, minute);
        }
      }
      await onboardingStorage.markNotificationPromptSeen(user.uid);
      navigation.replace(Screen.healthPermissions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppScreen style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <IconBadge name="notifications-outline" color={Colors.brand} size="lg" />
          <Text style={styles.title}>Build your daily habit</Text>
          <Text style={styles.subtitle}>
            Gentle reminders for check-ins, your daily plan, and mindfulness — only when you want them.
          </Text>
        </View>

        <View style={styles.card}>
          {[
            'Daily wellness check-in reminder',
            'Personalised plan nudges',
            'Mindfulness and goal prompts',
          ].map((line) => (
            <Text key={line} style={styles.bullet}>• {line}</Text>
          ))}
        </View>

        <BrandButton
          label={loading ? 'Please wait…' : 'Enable reminders'}
          onPress={() => advance(true)}
          disabled={loading}
        />
        <BrandButton
          label="Not now"
          variant="outline"
          onPress={() => advance(false)}
          disabled={loading}
        />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, gap: Spacing.md, paddingBottom: Spacing['3xl'] },
  hero: { alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.xl },
  title: { fontSize: Typography.size['2xl'], fontWeight: '800', color: Colors.text, textAlign: 'center' },
  subtitle: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    gap: Spacing.sm,
  },
  bullet: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 22 },
});
