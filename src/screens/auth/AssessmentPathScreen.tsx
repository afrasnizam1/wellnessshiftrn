import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Screen } from '../../navigation/screenNames';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppCard, BrandButton, BackButton } from '../../components/ui';
import {
  pendingCanShowResults,
  pendingJustFinishedQuiz,
  pendingOnboardingStorage,
} from '../../services/pendingOnboardingStorage';
import { goBackOrTo, refreshPreAuthRouteFromPending, resetOnboardingStack } from '../../services/onboardingNavigation';
import { useAppStore } from '../../store';
import AppScreen from '../../components/common/AppScreen';

/**
 * Legacy mid-funnel screen (goals → habits → baseline → here).
 * Main onboarding now goes Purpose → 10-question quiz (1 per category) directly.
 * Kept so Back stacks / deep links still resolve; always starts the onboarding quiz.
 */
export default function AssessmentPathScreen() {
  const navigation = useNavigation<any>();
  const { hasSeenIntro, setWellnessScore, setLastQuizAnswers } = useAppStore();

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

      if (
        (pending.wellnessScore || pending.quizComplete) &&
        !pending.awaitingResultsPreview &&
        !pending.resultsPreviewComplete
      ) {
        await pendingOnboardingStorage.clearQuizProgress();
        if (cancelled) return;
        setWellnessScore(null);
        setLastQuizAnswers(null);
      }

      await pendingOnboardingStorage.saveAssessmentPath('full');
      if (cancelled) return;
      await refreshPreAuthRouteFromPending(hasSeenIntro);
      if (cancelled) return;
      resetOnboardingStack(navigation, Screen.wellnessQuiz);
    })();
    return () => { cancelled = true; };
  }, [navigation, setWellnessScore, setLastQuizAnswers, hasSeenIntro]);

  const startFullQuiz = async () => {
    await pendingOnboardingStorage.saveAssessmentPath('full');
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
        <Text style={styles.title}>Wellness assessment</Text>
        <Text style={styles.subtitle}>
          20 questions across 10 categories — about 5 minutes. Your answers power your
          wellness score and personalised plan.
        </Text>

        <AppCard style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconWrap}>
              <Ionicons name="analytics-outline" size={22} color={Colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Full wellness assessment</Text>
              <Text style={styles.cardMeta}>20 questions · ~5 minutes</Text>
            </View>
          </View>
          <Text style={styles.cardDetail}>
            Covers physical health, mental wellbeing, nutrition, fitness, sleep, stress,
            mindfulness, social connection, work-life balance, and environment.
          </Text>
        </AppCard>

        <BrandButton label="Start assessment" onPress={startFullQuiz} />
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
