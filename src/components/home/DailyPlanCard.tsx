import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius, Gradients, Shadow } from '../../theme';
import { AnimatedPressable, BrandButton } from '../ui';
import type { DailyPlan, DailyTask } from '../../types';
import GymVisitSection from './GymVisitSection';

interface Props {
  plan: DailyPlan;
  onStart: () => void;
  onTaskPress: (task: DailyTask) => void;
  onTaskComplete?: (taskId: string) => void;
  onGymVisit?: (visited: boolean) => void;
}

export default function DailyPlanCard({
  plan,
  onStart,
  onTaskPress,
  onTaskComplete,
  onGymVisit,
}: Props) {
  const totalSections = plan.tasks.length + 1;
  const gymDone = plan.gymVisitToday != null;
  const planCompleted = plan.tasks.filter((t) => t.status === 'complete').length;
  const completedCount = planCompleted + (gymDone ? 1 : 0);
  const progress = totalSections > 0 ? completedCount / totalSections : 0;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Your Plan for Today</Text>
          <Text style={styles.subtitle}>{completedCount}/{totalSections} completed</Text>
          <View style={styles.progressTrack}>
            <LinearGradient
              colors={[...Gradients.brand]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]}
            />
          </View>
        </View>
        {plan.tasks.length > 0 && (
          <BrandButton label="Start" onPress={onStart} compact style={styles.startBtnWrap} />
        )}
      </View>

      {plan.tasks.map((task, index) => (
        <AnimatedPressable key={task.id} style={styles.task} onPress={() => onTaskPress(task)}>
          <AnimatedPressable
            style={[styles.checkbox, task.status === 'complete' && styles.checkboxDone]}
            onPress={() => onTaskComplete?.(task.id)}
          >
            {task.status === 'complete' ? (
              <Ionicons name="checkmark" size={14} color={Colors.white} />
            ) : (
              <Text style={styles.taskNum}>{index + 1}</Text>
            )}
          </AnimatedPressable>
          <View style={styles.taskInfo}>
            <View style={styles.taskTitleRow}>
              <Text
                style={[
                  styles.taskTitle,
                  task.status === 'complete' && styles.taskTitleDone,
                ]}
              >
                {task.title}
              </Text>
              {task.isFromClinicianPlan && (
                <View style={styles.clinicianBadge}>
                  <Ionicons name="medkit" size={12} color={Colors.primary} />
                </View>
              )}
            </View>
            <Text style={styles.taskSubtitle}>{task.subtitle}</Text>
            {task.whyThisMatters ? (
              <Text style={styles.taskWhy}>{task.whyThisMatters}</Text>
            ) : null}
            <View style={styles.taskMeta}>
              <Ionicons name="time-outline" size={12} color={Colors.textTertiary} />
              <Text style={styles.taskDuration}>{task.durationMinutes} min</Text>
              {task.linkedModule ? (
                <Text style={styles.taskModule}>• {task.linkedModule}</Text>
              ) : null}
            </View>
          </View>
          <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} />
        </AnimatedPressable>
      ))}

      {onGymVisit ? (
        <GymVisitSection gymVisitToday={plan.gymVisitToday} onSelect={onGymVisit} />
      ) : null}

      {plan.tasks.length > 3 ? (
        <AnimatedPressable onPress={onStart} style={styles.viewAll}>
          <Text style={styles.viewAllText}>View all {plan.tasks.length} tasks</Text>
        </AnimatedPressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    gap: Spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.glassBorder,
    ...Shadow.card,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.md,
    marginBottom: Spacing.xs,
  },
  headerText: { flex: 1 },
  title: { fontSize: Typography.size.lg, fontWeight: '800', color: Colors.text, letterSpacing: -0.4 },
  subtitle: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginTop: 2, fontWeight: '600' },
  progressTrack: {
    height: 6,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 3,
    marginTop: Spacing.sm,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 3 },
  startBtnWrap: { alignSelf: 'flex-start' },
  task: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.borderLight,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    backgroundColor: Colors.surfaceSecondary,
  },
  checkboxDone: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  taskNum: { fontSize: 11, fontWeight: '700', color: Colors.textSecondary },
  taskInfo: { flex: 1 },
  taskTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  taskTitle: { fontSize: Typography.size.base, fontWeight: '600', color: Colors.text, flex: 1, letterSpacing: -0.2 },
  taskTitleDone: { textDecorationLine: 'line-through', color: Colors.textSecondary },
  clinicianBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskSubtitle: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginTop: 2 },
  taskWhy: { fontSize: Typography.size.xs, color: Colors.textTertiary, marginTop: 4, fontStyle: 'italic' },
  taskMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 4 },
  taskDuration: { fontSize: Typography.size.xs, color: Colors.textTertiary, fontWeight: '500' },
  taskModule: { fontSize: Typography.size.xs, color: Colors.primary, fontWeight: '600' },
  viewAll: { alignItems: 'center', paddingTop: Spacing.sm, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: Colors.borderLight },
  viewAllText: { fontSize: Typography.size.sm, color: Colors.primary, fontWeight: '700' },
});
