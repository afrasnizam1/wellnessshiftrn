import React, { useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import { navigationRef } from '../../navigation/navigationRef';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow, WELLNESS_CATEGORIES } from '../../theme';
import { useAppStore } from '../../store';
import { planService, wellnessScoreService } from '../../services/firebase';
import { gamificationService } from '../../services/gamificationService';
import GymVisitSection from '../../components/home/GymVisitSection';
import { navigateToLinkedModule } from '../../utils/fitnessNavigation';
import { format } from 'date-fns';
import AppScreen from '../../components/common/AppScreen';
import { BackButton, IconBadge } from '../../components/ui';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function DailyPlanScreen() {
  const navigation = useNavigation<any>();
  const {
    user, dailyPlan, wellnessScore,
    markTaskComplete, setGymVisit, setWellnessScore, setDailyPlan,
  } = useAppStore();
  const [completing, setCompleting] = useState<string | null>(null);

  const handleComplete = async (taskId: string) => {
    if (!user || !dailyPlan) return;
    const task = dailyPlan.tasks.find((t) => t.id === taskId);
    if (!task || task.status === 'complete') return;

    setCompleting(taskId);
    markTaskComplete(taskId);
    const updatedPlan = await planService.updateTaskStatus(
      user.uid, dailyPlan.date, taskId, 'complete'
    );
    if (updatedPlan) setDailyPlan(updatedPlan);

    const updatedScore = await wellnessScoreService.applyTaskCompletionBoost(
      user.uid,
      task.category,
      task.scoreBoost
    );
    if (updatedScore) setWellnessScore(updatedScore);
    gamificationService.recordEvent(user.uid, 'tasksCompleted').catch(() => {});
    if (task.category === 'mental' || task.category === 'sleep') {
      gamificationService.recordEvent(user.uid, 'mindfulnessSessions').catch(() => {});
    }
    setCompleting(null);
  };

  const handleGymVisit = async (visited: boolean) => {
    if (!user || !dailyPlan) return;
    setGymVisit(visited);
    await planService.updateGymVisit(user.uid, dailyPlan.date, visited);
    if (visited) {
      const updatedScore = await wellnessScoreService.applyTaskCompletionBoost(
        user.uid,
        'fitness',
        0.2
      );
      if (updatedScore) setWellnessScore(updatedScore);
      gamificationService.recordEvent(user.uid, 'gymVisits').catch(() => {});
    }
  };

  if (!dailyPlan) {
    return (
      <AppScreen style={styles.safe}>
        <View style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text style={styles.headerTitle}>Today's Plan</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.emptyState}>
          <IconBadge name="calendar-outline" color={Colors.primary} size="lg" />
          <Text style={styles.emptyTitle}>No plan yet</Text>
          <Text style={styles.emptySub}>
            Complete your wellness assessment to generate a personalised daily plan.
          </Text>
          <TouchableOpacity
            style={styles.quizBtn}
            onPress={() => {
              if (navigationRef.isReady()) navigationRef.navigate(Screen.wellnessQuiz);
            }}
          >
            <Text style={styles.quizBtnText}>Take Assessment</Text>
          </TouchableOpacity>
        </View>
      </AppScreen>
    );
  }

  const gymDone = dailyPlan.gymVisitToday != null;
  const planCompleted = dailyPlan.tasks.filter((t) => t.status === 'complete').length;
  const totalSections = dailyPlan.tasks.length + 1;
  const completedCount = planCompleted + (gymDone ? 1 : 0);
  const progress = totalSections > 0 ? completedCount / totalSections : 0;

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Today's Plan</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressTextRow}>
          <Text style={styles.progressLabel}>{completedCount}/{totalSections} completed</Text>
          <Text style={styles.progressDate}>{format(new Date(), 'EEEE, d MMM')}</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        {completedCount === totalSections && totalSections > 0 && (
          <View style={styles.celebrationBanner}>
            <Ionicons name="checkmark-circle" size={18} color={Colors.success} />
            <Text style={styles.celebrationText}>
              All tasks complete! Your wellness score is updating.
            </Text>
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {dailyPlan.tasks.map((task) => {
          const cat = WELLNESS_CATEGORIES.find((c) => c.key === task.category);
          const isCompleting = completing === task.id;
          return (
            <View key={task.id} style={[styles.taskCard, task.status === 'complete' && styles.taskCardDone]}>
              <View style={styles.taskTop}>
                <TouchableOpacity
                  style={[styles.checkbox, task.status === 'complete' && styles.checkboxDone]}
                  onPress={() => task.status !== 'complete' && handleComplete(task.id)}
                >
                  {task.status === 'complete' && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.taskInfo}
                  onPress={() => navigation.navigate(Screen.taskDetail, { task })}
                >
                  <View style={styles.taskTitleRow}>
                    <Text style={[styles.taskTitle, task.status === 'complete' && styles.taskTitleDone]}>
                      {task.title}
                    </Text>
                    {task.isFromClinicianPlan && <Text>🩺</Text>}
                  </View>
                  <Text style={styles.taskSubtitle}>{task.subtitle}</Text>
                  {task.whyThisMatters && (
                    <Text style={styles.taskWhy}>{task.whyThisMatters}</Text>
                  )}
                </TouchableOpacity>
                {cat && (
                  <View style={[styles.catPill, { backgroundColor: cat.color + '22' }]}>
                    <Text style={{ fontSize: 12 }}>{cat.icon}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.taskDesc}>{task.description}</Text>
              <View style={styles.taskMeta}>
                <View style={styles.taskDurationRow}>
                  <Ionicons name="time-outline" size={14} color={Colors.textTertiary} />
                  <Text style={styles.taskDuration}>{task.durationMinutes} min</Text>
                </View>
                {task.linkedModule && (
                  <TouchableOpacity onPress={() => navigateToLinkedModule(navigation, task.linkedModule)}>
                    <Text style={styles.taskLink}>• {task.linkedModule} →</Text>
                  </TouchableOpacity>
                )}
                {task.status !== 'complete' && (
                  <TouchableOpacity
                    style={[styles.completeBtn, isCompleting && { opacity: 0.6 }]}
                    onPress={() => handleComplete(task.id)}
                    disabled={isCompleting}
                  >
                    <Text style={styles.completeBtnText}>Mark done</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}

        <GymVisitSection
          gymVisitToday={dailyPlan.gymVisitToday}
          onSelect={handleGymVisit}
        />

        {wellnessScore && (
          <View style={styles.scoreHint}>
            <Text style={styles.scoreHintText}>
              Current wellness score: {wellnessScore.overall.toFixed(1)}/10
            </Text>
          </View>
        )}

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: Colors.primary, lineHeight: 38 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  progressSection: {
    backgroundColor: Colors.white, padding: Spacing.base,
    borderBottomWidth: 1, borderBottomColor: Colors.border, gap: Spacing.sm,
  },
  progressTextRow: { flexDirection: 'row', justifyContent: 'space-between' },
  progressLabel: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.text },
  progressDate: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  progressTrack: { height: 8, backgroundColor: Colors.border, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 4 },
  celebrationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.success + '20',
    borderRadius: Radius.md,
    padding: Spacing.sm,
  },
  celebrationText: { fontSize: Typography.size.sm, color: Colors.success, fontWeight: '600', textAlign: 'center' },
  content: { padding: Spacing.base, gap: Spacing.md },
  taskCard: {
    backgroundColor: Colors.white, borderRadius: Radius.lg,
    padding: Spacing.base, ...Shadow.sm, gap: Spacing.sm,
  },
  taskCardDone: { opacity: 0.65 },
  taskTop: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md },
  checkbox: {
    width: 26, height: 26, borderRadius: 13, borderWidth: 2,
    borderColor: Colors.border, alignItems: 'center', justifyContent: 'center', marginTop: 2,
  },
  checkboxDone: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  checkmark: { color: Colors.white, fontSize: 13, fontWeight: '700' },
  taskInfo: { flex: 1 },
  taskTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  taskTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text, flex: 1 },
  taskTitleDone: { textDecorationLine: 'line-through', color: Colors.textSecondary },
  taskSubtitle: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
  taskWhy: { fontSize: Typography.size.xs, color: Colors.textTertiary, marginTop: 4, fontStyle: 'italic' },
  catPill: { width: 32, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  taskDesc: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  taskMeta: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, flexWrap: 'wrap' },
  taskDurationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  taskDuration: { fontSize: Typography.size.xs, color: Colors.textTertiary },
  taskLink: { fontSize: Typography.size.xs, color: Colors.primary, fontWeight: '600' },
  completeBtn: {
    marginLeft: 'auto' as any, backgroundColor: Colors.primary,
    borderRadius: Radius.xl, paddingHorizontal: Spacing.md, paddingVertical: 4,
  },
  completeBtnText: { fontSize: Typography.size.xs, color: Colors.white, fontWeight: '700' },
  scoreHint: {
    backgroundColor: Colors.primaryBg,
    borderRadius: Radius.md,
    padding: Spacing.md,
    alignItems: 'center',
  },
  scoreHintText: { fontSize: Typography.size.sm, color: Colors.primary, fontWeight: '600' },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.md, padding: Spacing.xl },
  emptyEmoji: { fontSize: 56 },
  emptyTitle: { fontSize: Typography.size.xl, fontWeight: '700', color: Colors.text },
  emptySub: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center' },
  quizBtn: { backgroundColor: Colors.primary, borderRadius: Radius.xl, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md },
  quizBtnText: { color: Colors.white, fontWeight: '700', fontSize: Typography.size.base },
});
