// src/screens/more/GoalSettingScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Screen } from '../../navigation/screenNames';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppCard, ListRow, ScreenHeader } from '../../components/ui';
import { useAppStore } from '../../store';
import { goalService, type Goal, type GoalType, type GoalCategory } from '../../services/goalService';
import AppScreen from '../../components/common/AppScreen';

const GOAL_TYPES: GoalType[] = ['daily', 'weekly', 'monthly'];
const GOAL_CATEGORIES: GoalCategory[] = ['fitness', 'nutrition', 'mindfulness', 'sleep', 'social', 'health'];

const CATEGORY_COLORS: Record<GoalCategory, string> = {
  fitness: Colors.fitness,
  nutrition: Colors.nutrition,
  mindfulness: Colors.mindfulness,
  sleep: Colors.sleep,
  social: Colors.social,
  health: Colors.primary,
};

export default function GoalSettingScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAppStore();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('1');
  const [unit, setUnit] = useState('');
  const [type, setType] = useState<GoalType>('daily');
  const [category, setCategory] = useState<GoalCategory>('health');

  useEffect(() => {
    if (!user) return;
    const unsub = goalService.watchGoals(user.uid, (list) => {
      setGoals(list);
      setLoading(false);
    });
    return unsub;
  }, [user?.uid]);

  const handleCreate = async () => {
    if (!user || !title.trim()) return;
    await goalService.createGoal(user.uid, {
      title: title.trim(),
      target: Number(target) || 1,
      unit: unit.trim() || 'times',
      type,
      category,
    });
    setTitle('');
    setTarget('1');
    setUnit('');
    setAdding(false);
  };

  const handleDelete = (goal: Goal) => {
    Alert.alert('Delete goal', `Remove "${goal.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          if (user) goalService.deleteGoal(user.uid, goal.id);
        },
      },
    ]);
  };

  const progressPct = (goal: Goal) => Math.min(1, goal.progress / goal.target);

  return (
    <AppScreen style={styles.safe}>
      <ScreenHeader
        title="Goals"
        onBack={navigation.canGoBack() ? () => navigation.goBack() : undefined}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? null : goals.length === 0 && !adding ? (
          <AppCard style={styles.empty}>
            <Ionicons name="flag-outline" size={40} color={Colors.textTertiary} />
            <Text style={styles.emptyTitle}>No goals yet</Text>
            <Text style={styles.emptySub}>Set wellness goals to stay motivated and track progress.</Text>
          </AppCard>
        ) : (
          <View style={styles.list}>
            {goals.map((goal) => (
              <AppCard key={goal.id} style={styles.goalCard}>
                <View style={styles.goalRow}>
                  <View style={[styles.categoryDot, { backgroundColor: CATEGORY_COLORS[goal.category] }]} />
                  <View style={styles.goalInfo}>
                    <Text style={styles.goalTitle}>{goal.title}</Text>
                    <Text style={styles.goalMeta}>{goal.type} · {goal.target} {goal.unit}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleDelete(goal)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Ionicons name="trash-outline" size={20} color={Colors.error} />
                  </TouchableOpacity>
                </View>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${progressPct(goal) * 100}%`, backgroundColor: CATEGORY_COLORS[goal.category] }]} />
                </View>
                <View style={styles.progressRow}>
                  <Text style={styles.progressText}>{goal.progress} / {goal.target} {goal.unit}</Text>
                  {goal.completedAt && <Text style={styles.completed}>Completed</Text>}
                </View>
              </AppCard>
            ))}
          </View>
        )}

        {adding && (
          <AppCard style={styles.formCard}>
            <Text style={styles.formTitle}>New goal</Text>
            <TextInput
              style={styles.input}
              placeholder="Goal title (e.g. Walk 10,000 steps)"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor={Colors.textTertiary}
            />
            <View style={styles.rowInputs}>
              <TextInput
                style={[styles.input, styles.smallInput]}
                placeholder="Target"
                value={target}
                onChangeText={setTarget}
                keyboardType="numeric"
                placeholderTextColor={Colors.textTertiary}
              />
              <TextInput
                style={[styles.input, styles.flexInput]}
                placeholder="Unit (e.g. steps, minutes)"
                value={unit}
                onChangeText={setUnit}
                placeholderTextColor={Colors.textTertiary}
              />
            </View>
            <Text style={styles.label}>Type</Text>
            <View style={styles.chipRow}>
              {GOAL_TYPES.map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[styles.chip, type === t && styles.chipActive]}
                  onPress={() => setType(t)}
                >
                  <Text style={[styles.chipText, type === t && styles.chipTextActive]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.label}>Category</Text>
            <View style={styles.chipRow}>
              {GOAL_CATEGORIES.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[styles.chip, category === c && styles.chipActive]}
                  onPress={() => setCategory(c)}
                >
                  <Text style={[styles.chipText, category === c && styles.chipTextActive]}>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.saveBtn} onPress={handleCreate}>
              <Text style={styles.saveBtnText}>Save Goal</Text>
            </TouchableOpacity>
          </AppCard>
        )}

        <TouchableOpacity style={styles.addBtn} onPress={() => setAdding((v) => !v)}>
          <Ionicons name={adding ? 'close-outline' : 'add-outline'} size={22} color={Colors.white} />
          <Text style={styles.addBtnText}>{adding ? 'Cancel' : 'Add Goal'}</Text>
        </TouchableOpacity>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, gap: Spacing.md },
  empty: { alignItems: 'center', padding: Spacing.xl, gap: Spacing.sm },
  emptyTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  emptySub: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center' },
  list: { gap: Spacing.md },
  goalCard: { gap: Spacing.sm },
  goalRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  categoryDot: { width: 10, height: 10, borderRadius: 5 },
  goalInfo: { flex: 1 },
  goalTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  goalMeta: { fontSize: Typography.size.xs, color: Colors.textSecondary, textTransform: 'capitalize' },
  progressTrack: { height: 8, backgroundColor: Colors.borderLight, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressText: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  completed: { fontSize: Typography.size.xs, color: Colors.success, fontWeight: '700' },
  formCard: { gap: Spacing.md },
  formTitle: { fontSize: Typography.size.lg, fontWeight: '800', color: Colors.text },
  input: {
    borderWidth: 1, borderColor: Colors.borderLight, borderRadius: Radius.md,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
    fontSize: Typography.size.base, color: Colors.text,
  },
  rowInputs: { flexDirection: 'row', gap: Spacing.sm },
  smallInput: { width: 80 },
  flexInput: { flex: 1 },
  label: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.textSecondary },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs },
  chip: {
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs,
    borderRadius: Radius.lg, backgroundColor: Colors.surfaceSecondary,
    borderWidth: 1, borderColor: Colors.borderLight,
  },
  chipActive: { backgroundColor: Colors.primaryLight, borderColor: Colors.primary },
  chipText: { fontSize: Typography.size.sm, color: Colors.textSecondary, textTransform: 'capitalize' },
  chipTextActive: { color: Colors.primary, fontWeight: '700' },
  saveBtn: {
    backgroundColor: Colors.primary, borderRadius: Radius.lg,
    paddingVertical: Spacing.md, alignItems: 'center',
  },
  saveBtnText: { color: Colors.white, fontWeight: '700', fontSize: Typography.size.base },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.xs,
    backgroundColor: Colors.brand, borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
  },
  addBtnText: { color: Colors.white, fontWeight: '700', fontSize: Typography.size.base },
});
