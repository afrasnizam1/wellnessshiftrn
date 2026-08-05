import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import type { IoniconName } from '../../theme/icons';
import { AppCard, AnimatedPressable, BrandButton, IconBadge } from '../../components/ui';
import AppScreen from '../../components/common/AppScreen';
import { useAppStore } from '../../store';
import { userService, wellnessService } from '../../services/firebase';
import { onboardingStorage } from '../../services/onboardingStorage';
import {
  pendingCanShowResults,
  pendingOnboardingStorage,
} from '../../services/pendingOnboardingStorage';
import { refreshPreAuthRouteFromPending, resetOnboardingStack } from '../../services/onboardingNavigation';
import { resolvePostAuthOnboardingRoute } from '../../services/onboardingRoutes';
import { Screen } from '../../navigation/screenNames';
import {
  APP_PURPOSE_OPTIONS,
  CLINICIAN_CONNECT_ELIGIBILITY,
  resolveLeadPurpose,
  type AppPurpose,
} from '../../types/onboardingPrefs';

const PURPOSE_COLORS: Record<AppPurpose, string> = {
  wellness_score: Colors.purple,
  learn: Colors.nutrition,
  fitness: Colors.fitness,
  clinician: Colors.brand,
  all: Colors.primary,
};

export default function PurposeSelectionScreen() {
  const navigation = useNavigation<any>();
  const { user, setUser, hasSeenIntro } = useAppStore();
  // Always start blank — do not restore prior guest/pending picks for new users.
  const [selected, setSelected] = useState<Set<AppPurpose>>(new Set());
  const [saving, setSaving] = useState(false);

  const togglePurpose = (id: AppPurpose) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (id === 'all') {
        if (next.has('all')) next.clear();
        else {
          next.clear();
          next.add('all');
        }
        return next;
      }
      next.delete('all');
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleContinue = async () => {
    if (selected.size === 0 || saving) return;
    const purposes = APP_PURPOSE_OPTIONS.filter((o) => selected.has(o.id)).map((o) => o.id);
    const primary = resolveLeadPurpose(purposes);
    if (!primary) return;

    setSaving(true);
    try {
      if (user) {
        await userService.updateProfile(user.uid, {
          appPurpose: primary,
          appPurposes: purposes,
        });
        await onboardingStorage.setAppPurpose(user.uid, primary);
        await onboardingStorage.setAppPurposes(user.uid, purposes);
        const updated = { ...user, appPurpose: primary, appPurposes: purposes };
        setUser(updated);

        const score = await wellnessService.getLatestScore(user.uid);
        const resultsSeen = await onboardingStorage.hasCompletedWellnessResults(user.uid);
        const pending = await pendingOnboardingStorage.get();
        const route = await resolvePostAuthOnboardingRoute(updated, {
          hasScore: !!score,
          resultsSeen,
          awaitingResults: pendingCanShowResults(pending),
        });

        if (route === 'complete') {
          await onboardingStorage.markMainOnboardingSupplementsComplete(user.uid);
          await onboardingStorage.setPendingInAppGuide(user.uid, true);
          await userService.updateProfile(user.uid, { onboardingComplete: true });
          setUser({ ...updated, onboardingComplete: true });
          return;
        }
        if (route === Screen.wellnessQuiz) {
          // Full 20-question quiz — clear any legacy mini / stale quiz flags.
          await pendingOnboardingStorage.saveAssessmentPath('full');
        }
        if (route !== Screen.purposeSelection) {
          navigation.replace(route);
          return;
        }
      } else {
        await pendingOnboardingStorage.savePurpose(primary, purposes);
        // Full quiz by default — skip the old goals → habits → assessment-path chain.
        await pendingOnboardingStorage.saveAssessmentPath('full');
        await refreshPreAuthRouteFromPending(hasSeenIntro);
        resetOnboardingStack(navigation, Screen.wellnessQuiz);
      }
    } catch (error) {
      console.warn('[PurposeSelection] continue failed:', error);
      Alert.alert('Could not continue', 'Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const selectionCount = selected.size;

  return (
    <AppScreen style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>Start here</Text>
        <Text style={styles.title}>Why are you here?</Text>
        <Text style={styles.subtitle}>
          Everything in Wellness Shift feeds one wellness score — workouts, nutrition,
          sleep, and mood. Clinician linking is only if your GP referred you for a health
          issue. Pick all that apply.
        </Text>

        <View style={styles.list}>
          {APP_PURPOSE_OPTIONS.map((option) => {
            const isSelected = selected.has(option.id);
            const color = PURPOSE_COLORS[option.id];
            return (
              <AnimatedPressable
                key={option.id}
                onPress={() => togglePurpose(option.id)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: isSelected }}
                accessibilityLabel={option.title}
              >
                <AppCard
                  style={[
                    styles.card,
                    isSelected && {
                      borderColor: color,
                      backgroundColor: `${color}12`,
                    },
                  ]}
                >
                  <IconBadge
                    name={option.icon as IoniconName}
                    color={color}
                    size="md"
                    variant={isSelected ? 'solid' : 'soft'}
                  />
                  <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>{option.title}</Text>
                    <Text style={styles.cardSub}>{option.subtitle}</Text>
                  </View>
                  {isSelected ? (
                    <View style={[styles.check, { backgroundColor: color }]}>
                      <Ionicons name="checkmark" size={14} color={Colors.white} />
                    </View>
                  ) : (
                    <View style={styles.checkEmpty} />
                  )}
                </AppCard>
              </AnimatedPressable>
            );
          })}
        </View>

        {(selected.has('clinician') || selected.has('all')) && (
          <View style={styles.clinicianNotice} accessibilityRole="text">
            <Text style={styles.clinicianNoticeTitle}>Clinician linking — important</Text>
            <Text style={styles.clinicianNoticeBody}>{CLINICIAN_CONNECT_ELIGIBILITY}</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.selectionHint}>
          {selectionCount === 0
            ? 'Select at least one'
            : `${selectionCount} selected`}
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
  list: { gap: Spacing.sm, marginTop: Spacing.lg },
  clinicianNotice: {
    marginTop: Spacing.sm,
    backgroundColor: Colors.brandSubtle,
    borderRadius: Radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.brandMuted,
    padding: Spacing.base,
    gap: Spacing.xs,
  },
  clinicianNoticeTitle: {
    fontSize: Typography.size.sm,
    fontWeight: '800',
    color: Colors.brandDark,
  },
  clinicianNoticeBody: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
    borderRadius: Radius.xl,
  },
  cardText: { flex: 1, gap: 4 },
  cardTitle: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.2,
  },
  cardSub: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkEmpty: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
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
