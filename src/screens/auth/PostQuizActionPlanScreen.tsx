import React, { useMemo, useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, WELLNESS_CATEGORIES } from '../../theme';
import { useAppStore } from '../../store';
import { onboardingStorage } from '../../services/onboardingStorage';
import type { WellnessCategoryKey } from '../../types';
import { CategoryIcon } from '../../components/ui';

const CATEGORY_ACTIONS: Partial<Record<WellnessCategoryKey, { goal: string; step: string }>> = {
  fitness: { goal: 'Build Strength & Fitness', step: 'Explore Fitness Hub' },
  physical: { goal: 'Improve Physical Health', step: 'Track your steps' },
  nutrition: { goal: 'Improve Nutrition', step: 'Set up meal planning' },
  mental: { goal: 'Support Mental Health', step: 'Try mindfulness exercises' },
  sleep: { goal: 'Improve Sleep Quality', step: 'Set up sleep tracking' },
  stress: { goal: 'Reduce Stress', step: 'Learn stress management' },
  mindfulness: { goal: 'Practice Mindfulness', step: 'Start meditation practice' },
  social: { goal: 'Build Social Connections', step: 'Connect with community' },
  workLife: { goal: 'Improve Work-Life Balance', step: 'Review daily boundaries' },
};

export default function PostQuizActionPlanScreen() {
  const navigation = useNavigation<any>();
  const { user, wellnessScore } = useAppStore();
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const { focusAreas, steps } = useMemo(() => {
    const cats = wellnessScore
      ? Object.entries(wellnessScore.categories).sort(([, a], [, b]) => a - b).slice(0, 3)
      : [];

    const goalCategory = user?.primaryGoal
      ? ({
          sleep: 'sleep',
          stress: 'stress',
          fitness: 'fitness',
          nutrition: 'nutrition',
          mental: 'mental',
          habits: 'mindfulness',
          condition: 'physical',
          general: 'physical',
        }[user.primaryGoal] as WellnessCategoryKey | undefined)
      : undefined;

    const focus = cats.filter(([, s]) => s < 5).map(([k]) => k as WellnessCategoryKey);
    const focusWithGoal = goalCategory && !focus.includes(goalCategory)
      ? [goalCategory, ...focus].slice(0, 3)
      : focus;

    const stepList = [
      { title: 'Set Up Your Profile', subtitle: '2 min · More tab', tab: Screen.tabMore },
      ...(goalCategory ? [{
        title: CATEGORY_ACTIONS[goalCategory]?.step ?? 'Explore Fitness Hub',
        subtitle: `Your goal: ${CATEGORY_ACTIONS[goalCategory]?.goal ?? 'Wellness'}`,
        tab: Screen.tabFitness,
      }] : []),
      ...(cats[0] && cats[0][0] !== goalCategory ? [{
        title: CATEGORY_ACTIONS[cats[0][0] as WellnessCategoryKey]?.step ?? 'Explore Fitness Hub',
        subtitle: `Focus: ${CATEGORY_ACTIONS[cats[0][0] as WellnessCategoryKey]?.goal ?? 'Wellness'}`,
        tab: Screen.tabFitness,
      }] : []),
      { title: 'Explore Content Library', subtitle: '5 min · Fitness Hub', tab: Screen.tabFitness },
      { title: 'Set Your First Goal', subtitle: '3 min · More', tab: Screen.tabMore },
      { title: 'Start Daily Check-Ins', subtitle: '1 min · Home', tab: Screen.tabHome },
      ...(cats[1] && cats[1][0] !== goalCategory ? [{
        title: CATEGORY_ACTIONS[cats[1][0] as WellnessCategoryKey]?.step ?? 'Second priority area',
        subtitle: CATEGORY_ACTIONS[cats[1][0] as WellnessCategoryKey]?.goal ?? '',
        tab: Screen.tabFitness,
      }] : []),
    ];
    return {
      focusAreas: focusWithGoal.length > 0 ? focusWithGoal : cats.map(([k]) => k as WellnessCategoryKey),
      steps: stepList,
    };
  }, [wellnessScore, user?.primaryGoal]);

  const finish = async () => {
    if (user) {
      await onboardingStorage.markPostQuizActionPlanComplete(user.uid);
      await onboardingStorage.markPostQuizOnboardingComplete(user.uid);
    }
    navigation.replace(Screen.quickStartGuide);
  };

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <AppScreen style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={32} color={Colors.success} />
          </View>
          <Text style={styles.headerTitle}>Quiz Complete!</Text>
          <Text style={styles.headerSub}>
            Your personalised action plan is ready. Follow these steps to get the most from Wellness Shift.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Your focus areas</Text>
        {focusAreas.map((key) => {
          const cat = WELLNESS_CATEGORIES.find((c) => c.key === key);
          const score = wellnessScore?.categories[key] ?? 0;
          return (
            <View key={key} style={[styles.focusCard, { borderLeftColor: cat?.color ?? Colors.primary }]}>
              {cat ? (
                <CategoryIcon
                  categoryKey={cat.key as WellnessCategoryKey}
                  color={cat.color}
                  size="sm"
                />
              ) : (
                <View style={styles.focusIconFallback}>
                  <Ionicons name="bulb-outline" size={18} color={Colors.primary} />
                </View>
              )}
              <View style={{ flex: 1 }}>
                <Text style={styles.focusTitle}>{cat?.label ?? key}</Text>
                <Text style={styles.focusSub}>Score {score.toFixed(1)}/10 — priority this week</Text>
              </View>
            </View>
          );
        })}

        <Text style={styles.sectionTitle}>Step-by-step guide</Text>
        {steps.map((step, i) => {
          const done = completedSteps.has(i);
          return (
            <TouchableOpacity
              key={step.title}
              style={[styles.stepCard, done && styles.stepDone]}
              onPress={() => toggleStep(i)}
              activeOpacity={0.85}
            >
              <View style={[styles.stepNum, done && styles.stepNumDone]}>
                <Text style={[styles.stepNumText, done && { color: Colors.white }]}>{i + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepSub}>{step.subtitle}</Text>
              </View>
              <Ionicons name={done ? 'checkmark-circle' : 'ellipse-outline'} size={22} color={done ? Colors.success : Colors.textTertiary} />
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity style={styles.primaryBtn} onPress={finish}>
          <Text style={styles.primaryBtnText}>Start My Journey</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={finish}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, paddingBottom: Spacing['3xl'], gap: Spacing.md },
  header: { alignItems: 'center', gap: Spacing.sm, paddingVertical: Spacing.md },
  checkCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontSize: Typography.size.xl, fontWeight: '800', color: Colors.text },
  headerSub: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  sectionTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text, marginTop: Spacing.sm },
  focusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    borderLeftWidth: 4,
  },
  focusIconFallback: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusTitle: { fontSize: Typography.size.base, fontWeight: '600', color: Colors.text },
  focusSub: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
  },
  stepDone: { opacity: 0.85 },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumDone: { backgroundColor: Colors.success },
  stepNumText: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.primary },
  stepTitle: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.text },
  stepSub: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  primaryBtnText: { color: Colors.white, fontWeight: '700', fontSize: Typography.size.base },
  skipText: { textAlign: 'center', color: Colors.textSecondary, fontSize: Typography.size.sm, paddingVertical: Spacing.md },
});
