import React, { useMemo, useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { useAppStore } from '../../store';
import { AppCard, AnimatedPressable, BrandButton, CategoryIcon } from '../../components/ui';
import { scoreLabelColor, chartTapA11yProps, trackChartCategoryTap } from '../../components/analytics';
import { onboardingStorage } from '../../services/onboardingStorage';
import {
  pendingCanShowResults,
  pendingJustFinishedQuiz,
  pendingOnboardingStorage,
} from '../../services/pendingOnboardingStorage';
import { wellnessService } from '../../services/firebase';
import {
  goToOnboardingMood,
  goToOnboardingMoodPreAuth,
  refreshPreAuthRouteFromPending,
  resetOnboardingStack,
} from '../../services/onboardingNavigation';
import { getCategoryScoreSummary } from '../../utils/quizResultsHelpers';
import { getRecommendedModules } from '../../utils/recommendedModules';
import { fitnessModuleIonIcon } from '../../theme';
import { PROGRAM_CATALOG } from '../../data/programCatalog';
import { getProgramDayLesson, getRecommendedProgramId } from '../../data/programDayContent';
import type { WellnessCategoryKey } from '../../types';
import AppScreen from '../../components/common/AppScreen';
import { IconBadge } from '../../components/ui';

export default function EnhancedWellnessResultsScreen() {
  const navigation = useNavigation<any>();
  const { user, wellnessScore, setWellnessScore, setLastQuizAnswers, hasSeenIntro } = useAppStore();
  const categories = wellnessScore?.categories;
  const [recommended, setRecommended] = React.useState<ReturnType<typeof getRecommendedModules>>([]);
  const [programPreview, setProgramPreview] = React.useState<ReturnType<typeof getProgramDayLesson>[]>([]);
  const [saving, setSaving] = useState(false);
  const [ready, setReady] = useState(false);

  // Results only after an explicit quiz finish (awaitingResultsPreview), never from stale store/score.
  // Run once on mount — do not re-run when wellnessScore updates (that caused a race back to Quiz).
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const pending = await pendingOnboardingStorage.get();
      if (cancelled) return;

      if (pendingCanShowResults(pending) || pendingJustFinishedQuiz(pending)) {
        if (pending.wellnessScore) setWellnessScore(pending.wellnessScore);
        if (pending.quizAnswers) setLastQuizAnswers(pending.quizAnswers);
        if (!cancelled) setReady(true);
        return;
      }

      // Signed-in path: allow Results only when this session just finished the quiz.
      if (user) {
        const resultsSeen = await onboardingStorage.hasCompletedWellnessResults(user.uid);
        if (cancelled) return;
        if (!resultsSeen && pending.awaitingResultsPreview && (pending.wellnessScore || wellnessScore)) {
          if (pending.wellnessScore) setWellnessScore(pending.wellnessScore);
          if (pending.quizAnswers) setLastQuizAnswers(pending.quizAnswers);
          if (!cancelled) setReady(true);
          return;
        }
      }

      // In-memory score from finishQuiz (pending write may still be settling).
      if (wellnessScore && pending.awaitingResultsPreview) {
        if (!cancelled) setReady(true);
        return;
      }

      // Truly stale — no finish gate. Send back to quiz.
      // Never clear if awaitingResultsPreview is still set.
      if (pending.awaitingResultsPreview) {
        if (pending.wellnessScore || wellnessScore) {
          if (pending.wellnessScore) setWellnessScore(pending.wellnessScore);
          if (!cancelled) setReady(true);
          return;
        }
      }

      await pendingOnboardingStorage.clearQuizProgress();
      if (cancelled) return;
      if (pending.assessmentPath) {
        await pendingOnboardingStorage.save({ assessmentPath: pending.assessmentPath });
      }
      if (cancelled) return;
      setWellnessScore(null);
      setLastQuizAnswers(null);
      resetOnboardingStack(navigation, Screen.wellnessQuiz);
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only gate; score is set inside
  }, [navigation, setWellnessScore, setLastQuizAnswers, user]);

  React.useEffect(() => {
    if (!ready || !wellnessScore) return;
    if (user) {
      setRecommended(getRecommendedModules(user.primaryGoal, user.healthGoals ?? []));
      const programId = getRecommendedProgramId(user.primaryGoal);
      const catalog = PROGRAM_CATALOG.find((p) => p.id === programId);
      if (catalog) {
        setProgramPreview([1, 2, 3].map((d) => getProgramDayLesson(programId, d, catalog.durationDays)));
      }
      return;
    }
    pendingOnboardingStorage.get().then((pending) => {
      setRecommended(getRecommendedModules(pending.primaryGoal, pending.goals));
      const programId = getRecommendedProgramId(pending.primaryGoal);
      const catalog = PROGRAM_CATALOG.find((p) => p.id === programId);
      if (catalog) {
        setProgramPreview([1, 2, 3].map((d) => getProgramDayLesson(programId, d, catalog.durationDays)));
      }
    });
  }, [user, ready, wellnessScore]);

  const ranked = useMemo(
    () => getCategoryScoreSummary(categories),
    [categories],
  );
  const strengths = ranked.slice(0, 3);
  const focusAreas = [...ranked].reverse().slice(0, 3);

  const continueFlow = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await pendingOnboardingStorage.markResultsPreviewComplete();
      if (user) {
        await onboardingStorage.markWellnessResultsComplete(user.uid);
        const moodDone = await onboardingStorage.hasCompletedOnboardingMood(user.uid);
        if (!moodDone) {
          goToOnboardingMood(navigation);
        } else {
          resetOnboardingStack(navigation, Screen.notificationPermissions);
        }
        return;
      }
      await refreshPreAuthRouteFromPending(hasSeenIntro);
      goToOnboardingMoodPreAuth(navigation);
    } catch (error) {
      console.warn('[WellnessResults] continue failed:', error);
      Alert.alert('Could not continue', 'Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const openCategory = (key: WellnessCategoryKey) => {
    trackChartCategoryTap({ screen: 'Onboarding - Results', chart: 'Category Breakdown' }, key);
    navigation.navigate(Screen.quizCategoryDetail, { category: key });
  };

  if (!ready || !wellnessScore) {
    return (
      <AppScreen style={styles.safe}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.heroEyebrow}>Assessment complete</Text>
          <Text style={styles.heroTitle}>Your Wellness Results</Text>
          <Text style={styles.heroSub}>
            Review how you scored in each category below.
          </Text>
        </View>

        <AppCard>
          <Text style={styles.sectionTitle}>Category breakdown</Text>
          <Text style={styles.sectionSub}>Tap any category to see your quiz answers</Text>
          {ranked.map((cat) => (
            <AnimatedPressable
              key={cat.key}
              style={styles.categoryRow}
              onPress={() => openCategory(cat.key as WellnessCategoryKey)}
              {...chartTapA11yProps(
                { screen: 'Onboarding - Results', chart: 'Category Breakdown' },
                cat.key as WellnessCategoryKey,
              )}
            >
              <View style={[styles.categoryDot, { backgroundColor: cat.color }]} />
              <Text style={styles.categoryLabel} numberOfLines={1}>{cat.label}</Text>
              <Text style={[styles.categoryScore, { color: scoreLabelColor(cat.score) }]}>
                {cat.score.toFixed(1)}
              </Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} />
            </AnimatedPressable>
          ))}
        </AppCard>

        <View style={styles.splitRow}>
          <AppCard style={styles.splitCard}>
            <Text style={styles.splitTitle}>Strengths</Text>
            {strengths.map((cat) => (
              <View key={cat.key} style={styles.splitItem}>
                <CategoryIcon
                  categoryKey={cat.key as WellnessCategoryKey}
                  color={cat.color}
                  size="sm"
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.splitLabel}>{cat.label.split(' ')[0]}</Text>
                  <Text style={[styles.splitScore, { color: cat.color }]}>{cat.score.toFixed(1)}/10</Text>
                </View>
              </View>
            ))}
          </AppCard>
          <AppCard style={styles.splitCard}>
            <Text style={styles.splitTitle}>Focus areas</Text>
            {focusAreas.map((cat) => (
              <View key={cat.key} style={styles.splitItem}>
                <CategoryIcon
                  categoryKey={cat.key as WellnessCategoryKey}
                  color={cat.color}
                  size="sm"
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.splitLabel}>{cat.label.split(' ')[0]}</Text>
                  <Text style={[styles.splitScore, { color: cat.color }]}>{cat.score.toFixed(1)}/10</Text>
                </View>
              </View>
            ))}
          </AppCard>
        </View>

        {programPreview.length > 0 && (
          <AppCard>
            <Text style={styles.sectionTitle}>Your starter program</Text>
            <Text style={styles.sectionSub}>First 3 days of your personalised multi-week plan</Text>
            {programPreview.map((day) => (
              <View key={day.day} style={styles.programDayRow}>
                <View style={styles.programDayBadge}>
                  <Text style={styles.programDayNum}>{day.day}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.moduleTitle}>{day.title}</Text>
                  <Text style={styles.moduleSub}>{day.instructions[0]}</Text>
                  <Text style={styles.programDayMeta}>{day.durationMinutes} min · {day.focus}</Text>
                </View>
              </View>
            ))}
          </AppCard>
        )}

        <AppCard>
          <Text style={styles.sectionTitle}>Recommended for you</Text>
          <Text style={styles.sectionSub}>Based on your goals and assessment scores</Text>
          {recommended.map((module) => (
            <View key={module.id} style={styles.moduleRow}>
              <IconBadge name={fitnessModuleIonIcon(module)} color={module.color} size="sm" />
              <View style={{ flex: 1 }}>
                <Text style={styles.moduleTitle}>{module.title}</Text>
                <Text style={styles.moduleSub}>{module.subtitle}</Text>
              </View>
            </View>
          ))}
        </AppCard>
      </ScrollView>

      <View style={styles.footer}>
        <BrandButton
          label={user ? 'Continue' : 'Next'}
          onPress={continueFlow}
          loading={saving}
          disabled={saving}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { padding: Spacing.base, gap: Spacing.md },
  hero: {
    alignSelf: 'stretch',
    width: '100%',
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(140, 89, 191, 0.14)',
  },
  heroEyebrow: {
    width: '100%',
    fontSize: Typography.size.xs,
    color: Colors.purple,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  heroTitle: {
    width: '100%',
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  heroSub: {
    width: '100%',
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: Spacing.xs,
  },
  sectionTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text },
  sectionSub: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginBottom: Spacing.sm },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderLight,
  },
  categoryDot: { width: 10, height: 10, borderRadius: 5 },
  categoryLabel: { flex: 1, fontSize: Typography.size.sm, color: Colors.text },
  categoryScore: { fontSize: Typography.size.sm, fontWeight: '700', width: 36, textAlign: 'right' },
  splitRow: { flexDirection: 'row', gap: Spacing.sm },
  splitCard: { flex: 1, gap: Spacing.sm },
  splitTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  splitItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  splitLabel: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  splitScore: { fontSize: Typography.size.sm, fontWeight: '700' },
  moduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderLight,
  },
  moduleTitle: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.text },
  moduleSub: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
  programDayRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderLight,
  },
  programDayBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  programDayNum: { fontSize: Typography.size.sm, fontWeight: '800', color: Colors.primary },
  programDayMeta: { fontSize: Typography.size.xs, color: Colors.textTertiary, marginTop: 4 },
  footer: {
    padding: Spacing.base,
    paddingBottom: Spacing.xl,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.borderLight,
    backgroundColor: Colors.background,
  },
});
