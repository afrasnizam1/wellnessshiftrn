// src/screens/more/HabitTrackingScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Screen } from '../../navigation/screenNames';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppCard, ScreenHeader } from '../../components/ui';
import { useAppStore } from '../../store';
import { habitService, type Habit, type HabitFrequency } from '../../services/habitService';
import AppScreen from '../../components/common/AppScreen';

const FREQUENCIES: HabitFrequency[] = ['daily', 'weekly'];

export default function HabitTrackingScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAppStore();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [emoji, setEmoji] = useState('✅');
  const [frequency, setFrequency] = useState<HabitFrequency>('daily');

  useEffect(() => {
    if (!user) return;
    const unsub = habitService.watchHabits(user.uid, (list) => {
      setHabits(list);
      setLoading(false);
    });
    return unsub;
  }, [user?.uid]);

  const handleCreate = async () => {
    if (!user || !title.trim()) return;
    await habitService.createHabit(user.uid, {
      title: title.trim(),
      emoji: emoji.trim() || '✅',
      frequency,
    });
    setTitle('');
    setEmoji('✅');
    setAdding(false);
  };

  const toggle = (habit: Habit) => {
    if (!user) return;
    habitService.toggleCompletion(user.uid, habit.id);
  };

  const handleDelete = (habit: Habit) => {
    Alert.alert('Delete habit', `Remove "${habit.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          if (user) habitService.deleteHabit(user.uid, habit.id);
        },
      },
    ]);
  };

  const today = new Date().toISOString().split('T')[0];
  const isDoneToday = (habit: Habit) => habit.completions.includes(today);

  return (
    <AppScreen style={styles.safe}>
      <ScreenHeader
        title="Habit Tracker"
        onBack={navigation.canGoBack() ? () => navigation.goBack() : undefined}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? null : habits.length === 0 && !adding ? (
          <AppCard style={styles.empty}>
            <Ionicons name="checkbox-outline" size={40} color={Colors.textTertiary} />
            <Text style={styles.emptyTitle}>No habits yet</Text>
            <Text style={styles.emptySub}>Build streaks by tracking daily or weekly habits.</Text>
          </AppCard>
        ) : (
          <View style={styles.list}>
            {habits.map((habit) => {
              const done = isDoneToday(habit);
              return (
                <AppCard key={habit.id} style={styles.habitCard}>
                  <View style={styles.habitRow}>
                    <Text style={styles.habitEmoji}>{habit.emoji}</Text>
                    <View style={styles.habitInfo}>
                      <Text style={styles.habitTitle}>{habit.title}</Text>
                      <Text style={styles.habitMeta}>
                        {habit.frequency} · streak {habit.streak} · best {habit.longestStreak}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.checkBtn, done && styles.checkBtnDone]}
                      onPress={() => toggle(habit)}
                    >
                      <Ionicons name={done ? 'checkmark' : 'add'} size={22} color={done ? Colors.white : Colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(habit)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                      <Ionicons name="trash-outline" size={20} color={Colors.error} />
                    </TouchableOpacity>
                  </View>
                </AppCard>
              );
            })}
          </View>
        )}

        {adding && (
          <AppCard style={styles.formCard}>
            <Text style={styles.formTitle}>New habit</Text>
            <View style={styles.rowInputs}>
              <TextInput
                style={[styles.input, styles.emojiInput]}
                placeholder="Emoji"
                value={emoji}
                onChangeText={setEmoji}
                maxLength={2}
                placeholderTextColor={Colors.textTertiary}
              />
              <TextInput
                style={[styles.input, styles.flexInput]}
                placeholder="Habit name (e.g. Drink water)"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor={Colors.textTertiary}
              />
            </View>
            <Text style={styles.label}>Frequency</Text>
            <View style={styles.chipRow}>
              {FREQUENCIES.map((f) => (
                <TouchableOpacity
                  key={f}
                  style={[styles.chip, frequency === f && styles.chipActive]}
                  onPress={() => setFrequency(f)}
                >
                  <Text style={[styles.chipText, frequency === f && styles.chipTextActive]}>{f}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.saveBtn} onPress={handleCreate}>
              <Text style={styles.saveBtnText}>Save Habit</Text>
            </TouchableOpacity>
          </AppCard>
        )}

        <TouchableOpacity style={styles.addBtn} onPress={() => setAdding((v) => !v)}>
          <Ionicons name={adding ? 'close-outline' : 'add-outline'} size={22} color={Colors.white} />
          <Text style={styles.addBtnText}>{adding ? 'Cancel' : 'Add Habit'}</Text>
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
  habitCard: { padding: Spacing.md },
  habitRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  habitEmoji: { fontSize: 24 },
  habitInfo: { flex: 1 },
  habitTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  habitMeta: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  checkBtn: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.primaryLight, borderWidth: 1, borderColor: Colors.primary,
  },
  checkBtnDone: { backgroundColor: Colors.success, borderColor: Colors.success },
  formCard: { gap: Spacing.md },
  formTitle: { fontSize: Typography.size.lg, fontWeight: '800', color: Colors.text },
  input: {
    borderWidth: 1, borderColor: Colors.borderLight, borderRadius: Radius.md,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
    fontSize: Typography.size.base, color: Colors.text,
  },
  rowInputs: { flexDirection: 'row', gap: Spacing.sm },
  emojiInput: { width: 70, textAlign: 'center' },
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
