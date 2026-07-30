import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Screen } from '../../navigation/screenNames';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppCard, AnimatedPressable, BrandButton, BackButton } from '../../components/ui';
import {
  pendingCanShowResults,
  pendingJustFinishedQuiz,
  pendingOnboardingStorage,
  type AssessmentPath,
} from '../../services/pendingOnboardingStorage';
import { goBackOrTo, refreshPreAuthRouteFromPending, resetOnboardingStack } from '../../services/onboardingNavigation';
import { useAppStore } from '../../store';
import AppScreen from '../../components/common/AppScreen';

const OPTIONS: {
  id: AssessmentPath;
  title: string;
  subtitle: string;
  detail: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    id: 'mini',
    title: 'Quick check-in',
    subtitle: '~2 minutes',
    detail: 'A few questions tailored to your goals — great if you want to start fast.',
    icon: 'flash-outline',
  },
  {
    id: 'full',
    title: 'Full wellness assessment',
    subtitle: '~5 minutes',
    detail: 'All 20 questions across 10 categories for the most detailed results.',
    icon: 'analytics-outline',
  },
];

export default function AssessmentPathScreen() {
  const navigation = useNavigation<any>();
  const { hasSeenIntro, setWellnessScore, setLastQuizAnswers } = useAppStore();

  // Remounts can land here after a finished quiz (frozen preAuthRoute).
  // Never wipe awaitingResultsPreview — send them to Results instead of retaking.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const pending = await pendingOnboardingStorage.get();
      if (cancelled) return;

      if (pendingCanShowResults(pending) || pendingJustFinishedQuiz(pending)) {
        if (pending.wellnessScore) setWellnessScore(pending.wellnessScore);
        if (pending.quizAnswers) setLastQuizAnswers(pending.quizAnswers);
        resetOnboardingStack(navigation, Screen.wellnessResults);
        return;
      }

      // Stale score without a results gate — wipe so we don't skip the quiz.
      if (
        (pending.wellnessScore || pending.quizComplete) &&
        !pending.awaitingResultsPreview &&
        !pending.resultsPreviewComplete
      ) {
        await pendingOnboardingStorage.clearQuizProgress();
        if (cancelled) return;
        setWellnessScore(null);
        setLastQuizAnswers(null);
        if (pending.assessmentPath) {
          await pendingOnboardingStorage.save({ assessmentPath: pending.assessmentPath });
        }
      }

      const fresh = await pendingOnboardingStorage.get();
      if (cancelled) return;
      if (fresh.assessmentPath && !fresh.awaitingResultsPreview && !fresh.resultsPreviewComplete) {
        resetOnboardingStack(navigation, Screen.wellnessQuiz);
      }
    })();
    return () => { cancelled = true; };
  }, [navigation, setWellnessScore, setLastQuizAnswers]);

  const choose = async (path: AssessmentPath) => {
    await pendingOnboardingStorage.saveAssessmentPath(path);
    setWellnessScore(null);
    setLastQuizAnswers(null);
    await refreshPreAuthRouteFromPending(hasSeenIntro);
    resetOnboardingStack(navigation, Screen.wellnessQuiz);
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.topBar}>
        <BackButton onPress={() => goBackOrTo(navigation, Screen.onboardingBaseline)} />
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>How deep should we go?</Text>
        <Text style={styles.subtitle}>
          Both paths give you a personalised score and recommendations. Choose what fits your time right now.
        </Text>

        {OPTIONS.map((option) => (
          <AnimatedPressable key={option.id} onPress={() => choose(option.id)}>
            <AppCard style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.iconWrap}>
                  <Ionicons name={option.icon} size={22} color={Colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{option.title}</Text>
                  <Text style={styles.cardMeta}>{option.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
              </View>
              <Text style={styles.cardDetail}>{option.detail}</Text>
            </AppCard>
          </AnimatedPressable>
        ))}

        <BrandButton label="Quick check-in" onPress={() => choose('mini')} />
        <BrandButton label="Full assessment" variant="outline" onPress={() => choose('full')} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  topBar: { paddingHorizontal: Spacing.sm, paddingTop: Spacing.xs },
  content: { padding: Spacing.base, gap: Spacing.md, paddingBottom: Spacing['3xl'] },
  title: { fontSize: Typography.size['2xl'], fontWeight: '800', color: Colors.text, letterSpacing: -0.4 },
  subtitle: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 22 },
  card: { gap: Spacing.sm },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  cardMeta: { fontSize: Typography.size.xs, color: Colors.primary, fontWeight: '600', marginTop: 2 },
  cardDetail: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
});
