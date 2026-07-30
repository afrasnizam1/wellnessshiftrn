import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing } from '../../theme';
import type { IoniconName } from '../../theme/icons';
import { AppCard, AnimatedPressable, BrandButton, IconBadge } from '../../components/ui';
import AppScreen from '../../components/common/AppScreen';
import { useAppStore } from '../../store';
import { pendingOnboardingStorage } from '../../services/pendingOnboardingStorage';
import { onboardingStorage } from '../../services/onboardingStorage';
import { userService } from '../../services/firebase';
import type { ExperienceLevel } from '../../types/onboardingPrefs';
import { goToOnboardingHabits, refreshPreAuthRouteFromPending } from '../../services/onboardingNavigation';

const OPTIONS: {
  id: ExperienceLevel;
  icon: IoniconName;
  title: string;
  subtitle: string;
}[] = [
  { id: 'beginner', icon: 'leaf-outline', title: 'New to wellness', subtitle: 'Gentle steps and shorter sessions' },
  { id: 'intermediate', icon: 'trending-up-outline', title: 'Some experience', subtitle: 'Balanced plan with room to grow' },
  { id: 'advanced', icon: 'flash-outline', title: 'Regular practice', subtitle: 'More challenge and depth' },
];

export default function ExperienceLevelScreen() {
  const navigation = useNavigation<any>();
  const { user, setUser, hasSeenIntro } = useAppStore();
  const [selected, setSelected] = useState<ExperienceLevel | null>(null);
  const [saving, setSaving] = useState(false);

  const handleContinue = async () => {
    if (!selected || saving) return;
    setSaving(true);
    try {
      if (user) {
        await userService.updateProfile(user.uid, { experienceLevel: selected });
        await onboardingStorage.setExperienceLevel(user.uid, selected);
        setUser({ ...user, experienceLevel: selected });
      } else {
        await pendingOnboardingStorage.save({ experienceLevel: selected });
      }
      await refreshPreAuthRouteFromPending(hasSeenIntro);
      goToOnboardingHabits(navigation);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppScreen style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>What's your experience level?</Text>
        <Text style={styles.subtitle}>
          We'll tune your daily plan intensity and Fitness Hub recommendations.
        </Text>
        <View style={styles.list}>
          {OPTIONS.map((option) => {
            const isSelected = selected === option.id;
            return (
              <AnimatedPressable key={option.id} onPress={() => setSelected(option.id)}>
                <AppCard style={[styles.card, isSelected && styles.cardSelected]}>
                  <IconBadge name={option.icon} color={Colors.primary} size="md" variant={isSelected ? 'solid' : 'soft'} />
                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>{option.title}</Text>
                    <Text style={styles.cardSub}>{option.subtitle}</Text>
                  </View>
                  {isSelected ? (
                    <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />
                  ) : null}
                </AppCard>
              </AnimatedPressable>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <BrandButton label="Next" onPress={handleContinue} disabled={!selected} loading={saving} />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, paddingTop: Spacing.xl, gap: Spacing.md },
  title: { fontSize: Typography.size['2xl'], fontWeight: '800', color: Colors.text, textAlign: 'center' },
  subtitle: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  list: { gap: Spacing.sm, marginTop: Spacing.md },
  card: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, borderWidth: 1.5, borderColor: Colors.borderLight },
  cardSelected: { borderColor: Colors.primary, backgroundColor: Colors.primaryBg },
  cardBody: { flex: 1, gap: 4 },
  cardTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  cardSub: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  footer: { padding: Spacing.base, paddingBottom: Spacing.xl, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: Colors.borderLight },
});
