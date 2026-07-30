// src/screens/auth/QuizScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, WELLNESS_CATEGORIES } from '../../theme';
import { useAppStore } from '../../store';
import { wellnessService, userService } from '../../services/firebase';
import { ensureAuthReadyForUid } from '../../services/firebaseReady';
import { onboardingStorage } from '../../services/onboardingStorage';
import AppScreen from '../../components/common/AppScreen';
import { AnimatedPressable } from '../../components/ui';
import { WELLNESS_ASSESSMENT_QUESTIONS } from '../../data/wellnessAssessmentQuestions';
import type { AssessmentQuestion } from '../../data/wellnessAssessmentQuestions';
import { computeWellnessScoreFromAnswers } from '../../utils/wellnessAssessmentScoring';
import { getMiniAssessmentQuestions } from '../../utils/miniAssessmentQuestions';
import { pendingOnboardingStorage } from '../../services/pendingOnboardingStorage';
import {
  goToWellnessResults,
  refreshPreAuthRouteFromPending,
  resumePreAuthOnboardingFromPending,
} from '../../services/onboardingNavigation';

const ADVANCE_DELAY_MS = 280;

export default function QuizScreen() {
  const navigation = useNavigation<any>();
  const { user, setWellnessScore, setLastQuizAnswers, setUser, hasSeenIntro } = useAppStore();
  const [questions, setQuestions] = useState<AssessmentQuestion[]>(WELLNESS_ASSESSMENT_QUESTIONS);
  const [questionsReady, setQuestionsReady] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);
  const [advancing, setAdvancing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // Guest-only resume: never teleport signed-in users into the create-account stack.
      if (!user) {
        const resumed = await resumePreAuthOnboardingFromPending(navigation);
        if (cancelled || resumed === 'handled') return;
      }

      const pending = await pendingOnboardingStorage.get();
      if (cancelled) return;
      if (pending.assessmentPath === 'mini') {
        setQuestions(getMiniAssessmentQuestions(pending.goals, pending.primaryGoal));
      } else {
        setQuestions(WELLNESS_ASSESSMENT_QUESTIONS);
      }
      setQuestionsReady(true);
    })();
    return () => { cancelled = true; };
  }, [navigation, user]);

  const TOTAL = questions.length;
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indexRef = useRef(0);
  const savingRef = useRef(false);

  useEffect(() => {
    indexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => () => {
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
  }, []);

  const safeIndex = TOTAL > 0 ? Math.min(Math.max(currentIndex, 0), TOTAL - 1) : 0;
  const q = questions[safeIndex];
  const progress = TOTAL > 0 ? (safeIndex + 1) / TOTAL : 0;
  const cat = q ? WELLNESS_CATEGORIES.find((c) => c.key === q.category) : undefined;
  const selectedScore = q ? answers[q.id] : undefined;
  const inputLocked = saving || advancing;

  const finishQuiz = async (finalAnswers: Record<string, number>) => {
    if (savingRef.current) return;
    savingRef.current = true;
    setSaving(true);
    setAdvancing(false);

    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }

    const score = computeWellnessScoreFromAnswers(finalAnswers);
    setWellnessScore(score);
    setLastQuizAnswers(finalAnswers);

    try {
      await pendingOnboardingStorage.saveQuiz(score, finalAnswers);

      if (user) {
        await ensureAuthReadyForUid(user.uid);
        await wellnessService.saveScore(user.uid, score);
        await userService.updateProfile(user.uid, { quizComplete: true });
        await onboardingStorage.markQuizComplete(user.uid);
        setUser({ ...user, quizComplete: true });
      } else {
        // Keep frozen preAuthRoute in sync so remounts open Results, not Quiz.
        await refreshPreAuthRouteFromPending(hasSeenIntro);
      }

      // Always show Results after a newly completed quiz — never skip ahead.
      goToWellnessResults(navigation);

      savingRef.current = false;
      setSaving(false);
    } catch (error) {
      console.warn('[QuizScreen] finishQuiz failed:', error);
      Alert.alert(
        'Could not save your results',
        'Your answers were scored locally. You can continue.',
        [
          {
            text: 'Continue',
            onPress: async () => {
              pendingOnboardingStorage.saveQuiz(score, finalAnswers).catch(() => {});
              if (user) {
                setUser({ ...user, quizComplete: true });
                wellnessService.saveScore(user.uid, score).catch(() => {});
                userService.updateProfile(user.uid, { quizComplete: true }).catch(() => {});
                onboardingStorage.markQuizComplete(user.uid).catch(() => {});
              }
              goToWellnessResults(navigation);
            },
          },
        ],
      );
      savingRef.current = false;
      setSaving(false);
    }
  };

  const handleAnswer = (optionScore: number) => {
    if (inputLocked || savingRef.current || !q) return;

    const answeredIndex = indexRef.current;
    const newAnswers = { ...answers, [q.id]: optionScore };
    setAnswers(newAnswers);

    if (answeredIndex < TOTAL - 1) {
      setAdvancing(true);
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = setTimeout(() => {
        advanceTimerRef.current = null;
        setCurrentIndex((i) => Math.min(i + 1, TOTAL - 1));
        setAdvancing(false);
      }, ADVANCE_DELAY_MS);
      return;
    }

    finishQuiz(newAnswers);
  };

  const handleBack = () => {
    if (inputLocked) return;
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
      setAdvancing(false);
    }
    if (currentIndex > 0) setCurrentIndex((i) => Math.max(i - 1, 0));
    else navigation.goBack();
  };

  if (!questionsReady || !q) {
    return (
      <AppScreen style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </AppScreen>
    );
  }

  if (saving) {
    return (
      <AppScreen style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Saving your results…</Text>
      </AppScreen>
    );
  }

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: cat?.color ?? Colors.primary }]} />
      </View>

      <View style={styles.header}>
        <AnimatedPressable
          onPress={handleBack}
          style={styles.backBtn}
          disabled={inputLocked}
          accessibilityRole="button"
          accessibilityLabel="Back"
        >
          <Ionicons name="chevron-back" size={22} color={Colors.primary} />
        </AnimatedPressable>
        <View style={styles.progressBadge}>
          <Text style={styles.progressLabel}>{safeIndex + 1}</Text>
          <Text style={styles.progressDivider}>/</Text>
          <Text style={styles.progressTotal}>{TOTAL}</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.catPill, { backgroundColor: (cat?.color ?? Colors.primary) + '18' }]}>
          <Text style={styles.catPillIcon}>{cat?.icon}</Text>
          <Text style={[styles.catPillText, { color: cat?.color }]}>{cat?.label}</Text>
        </View>

        <Text style={styles.question}>{q.question}</Text>
        <Text style={styles.hint}>Select the option that best describes you</Text>

        <View style={styles.options}>
          {q.options.map((option) => {
            const isSelected = selectedScore === option.score;
            return (
              <AnimatedPressable
                key={option.id}
                style={[
                  styles.option,
                  isSelected && { borderColor: cat?.color ?? Colors.primary, backgroundColor: (cat?.color ?? Colors.primary) + '10' },
                ]}
                onPress={() => handleAnswer(option.score)}
                disabled={inputLocked}
              >
                <View style={styles.optionBody}>
                  <Text style={[styles.optionText, isSelected && { fontWeight: '700' }]}>{option.text}</Text>
                  {option.description ? (
                    <Text style={styles.optionDesc}>{option.description}</Text>
                  ) : null}
                </View>
                <View style={[styles.optionScore, { backgroundColor: (cat?.color ?? Colors.primary) + '18' }]}>
                  <Text style={[styles.optionScoreText, { color: cat?.color ?? Colors.primary }]}>
                    {option.score}
                  </Text>
                </View>
              </AnimatedPressable>
            );
          })}
        </View>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.background,
  },
  loadingText: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  progressTrack: {
    height: 4,
    backgroundColor: Colors.borderLight,
  },
  progressFill: { height: '100%', borderRadius: 2 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
  },
  progressBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  progressLabel: { fontSize: Typography.size.lg, fontWeight: '800', color: Colors.text },
  progressDivider: { fontSize: Typography.size.sm, color: Colors.textTertiary },
  progressTotal: { fontSize: Typography.size.sm, color: Colors.textSecondary, fontWeight: '600' },
  content: { padding: Spacing.base, gap: Spacing.md, paddingBottom: Spacing['3xl'] },
  catPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
  },
  catPillIcon: { fontSize: 16 },
  catPillText: { fontSize: Typography.size.sm, fontWeight: '700' },
  question: {
    fontSize: Typography.size.xl,
    fontWeight: '800',
    color: Colors.text,
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  hint: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  options: { gap: Spacing.sm, marginTop: Spacing.xs },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
  },
  optionBody: { flex: 1, gap: 4 },
  optionText: { fontSize: Typography.size.base, color: Colors.text, lineHeight: 22 },
  optionDesc: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 18 },
  optionScore: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionScoreText: { fontSize: Typography.size.sm, fontWeight: '800' },
});
