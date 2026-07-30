import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow, WELLNESS_CATEGORIES } from '../../theme';
import { useAppStore } from '../../store';
import { planService, wellnessScoreService } from '../../services/firebase';
import { navigateToLinkedModule } from '../../utils/fitnessNavigation';
import type { DailyTask } from '../../types';
import AppScreen from '../../components/common/AppScreen';

export default function TaskDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { user, dailyPlan, markTaskComplete, setWellnessScore } = useAppStore();
  const task: DailyTask = route.params?.task;
  if (!task) return null;
  const cat = WELLNESS_CATEGORIES.find((c) => c.key === task.category);

  const handleComplete = async () => {
    if (!user || !dailyPlan) return;
    markTaskComplete(task.id);
    await planService.updateTaskStatus(user.uid, dailyPlan.date, task.id, 'complete');
    const updatedScore = await wellnessScoreService.applyTaskCompletionBoost(
      user.uid,
      task.category,
      task.scoreBoost
    );
    if (updatedScore) setWellnessScore(updatedScore);
    navigation.goBack();
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          accessibilityRole="button"
          accessibilityLabel="Back"
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.hero, { backgroundColor: (cat?.color ?? Colors.primary) + '15' }]}>
          <Text style={styles.heroIcon}>{cat?.icon ?? '📋'}</Text>
          <Text style={styles.heroTitle}>{task.title}</Text>
          {task.isFromClinicianPlan && (
            <Text style={styles.clinicianTag}>Recommended by your clinician</Text>
          )}
          <View style={styles.heroMeta}>
            <Text style={styles.heroDuration}>⏱ {task.durationMinutes} min</Text>
            {cat && <Text style={[styles.heroCat, { color: cat.color }]}>{cat.label}</Text>}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>What to do</Text>
          <Text style={styles.cardBody}>{task.description}</Text>
        </View>

        {task.whyThisMatters && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Why this matters</Text>
            <Text style={styles.cardBody}>{task.whyThisMatters}</Text>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Wellness impact</Text>
          <Text style={styles.cardBody}>
            Completing this task will boost your {cat?.label ?? 'wellness'} score by +{task.scoreBoost.toFixed(1)} points.
          </Text>
        </View>

        {task.linkedModule && (
          <TouchableOpacity
            style={styles.moduleCard}
            onPress={() => navigateToLinkedModule(navigation, task.linkedModule)}
          >
            <Text style={styles.moduleIcon}>🏋️</Text>
            <View style={styles.moduleInfo}>
              <Text style={styles.moduleTitle}>Open in Fitness Hub</Text>
              <Text style={styles.moduleSub}>{task.linkedModule}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        )}

        {task.status !== 'complete' ? (
          <TouchableOpacity style={styles.completeBtn} onPress={handleComplete}>
            <Text style={styles.completeBtnText}>✓  Mark as Complete</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.doneCard}>
            <Text style={styles.doneText}>✓ Completed — great work!</Text>
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
  content: { padding: Spacing.base, gap: Spacing.md },
  hero: { borderRadius: Radius.xl, padding: Spacing.xl, alignItems: 'center', gap: Spacing.md },
  heroIcon: { fontSize: 56 },
  heroTitle: { fontSize: Typography.size.xl, fontWeight: '700', color: Colors.text, textAlign: 'center' },
  clinicianTag: { fontSize: Typography.size.xs, color: Colors.info, fontWeight: '600' },
  heroMeta: { flexDirection: 'row', gap: Spacing.md },
  heroDuration: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  heroCat: { fontSize: Typography.size.sm, fontWeight: '700' },
  card: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, ...Shadow.sm, gap: Spacing.sm },
  cardTitle: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5 },
  cardBody: { fontSize: Typography.size.base, color: Colors.text, lineHeight: 24 },
  moduleCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.primaryBg, borderRadius: Radius.lg,
    padding: Spacing.base, borderWidth: 1, borderColor: Colors.primary + '33',
  },
  moduleIcon: { fontSize: 24 },
  moduleInfo: { flex: 1 },
  moduleTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.primary },
  moduleSub: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  chevron: { fontSize: 20, color: Colors.primary },
  completeBtn: { backgroundColor: Colors.primary, borderRadius: Radius.xl, paddingVertical: Spacing.base, alignItems: 'center', ...Shadow.md },
  completeBtnText: { color: Colors.white, fontSize: Typography.size.base, fontWeight: '700' },
  doneCard: { backgroundColor: Colors.success + '20', borderRadius: Radius.xl, paddingVertical: Spacing.base, alignItems: 'center' },
  doneText: { color: Colors.success, fontSize: Typography.size.base, fontWeight: '700' },
});
