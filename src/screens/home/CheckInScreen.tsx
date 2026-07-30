import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, TextInput, ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { useAppStore } from '../../store';
import { checkInService } from '../../services/checkInService';
import { gamificationService } from '../../services/gamificationService';
import type { MoodLevel } from '../../types';
import AppScreen from '../../components/common/AppScreen';

const MOODS: { emoji: string; label: string; value: MoodLevel; numeric: number }[] = [
  { emoji: '😢', label: 'Struggling', value: 'veryLow', numeric: 1 },
  { emoji: '😔', label: 'Low', value: 'low', numeric: 2 },
  { emoji: '😐', label: 'Okay', value: 'neutral', numeric: 3 },
  { emoji: '🙂', label: 'Good', value: 'good', numeric: 4 },
  { emoji: '😄', label: 'Great', value: 'great', numeric: 5 },
];

const ENERGY = [
  { emoji: '😴', label: 'Exhausted', value: 1 },
  { emoji: '🪫', label: 'Low', value: 2 },
  { emoji: '🔋', label: 'Good', value: 4 },
  { emoji: '⚡', label: 'High', value: 5 },
];

const STRESS = [
  { emoji: '😌', label: 'Low', value: 2 },
  { emoji: '😐', label: 'Medium', value: 5 },
  { emoji: '😰', label: 'High', value: 8 },
];

export default function CheckInScreen() {
  const navigation = useNavigation<any>();
  const { user, setCheckInMeta } = useAppStore();
  const [mood, setMood] = useState<MoodLevel | null>(null);
  const [energy, setEnergy] = useState<number | null>(null);
  const [stress, setStress] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    checkInService.getTodaysCheckIn(user.uid).then((existing) => {
      if (!existing) return;
      setMood(existing.mood);
      setEnergy(existing.energy);
      setStress(existing.stress);
      setNotes(existing.notes ?? '');
    });
  }, [user?.uid]);

  const handleSave = async () => {
    if (!user || mood == null || energy == null || stress == null) return;
    setSaving(true);
    try {
      await checkInService.saveCheckIn(user.uid, {
        mood,
        energy,
        stress,
        notes: notes.trim() || undefined,
      });
      const [streak, checkedIn, todaysCheckIn] = await Promise.all([
        checkInService.getCheckInStreak(user.uid),
        checkInService.hasCheckedInToday(user.uid),
        checkInService.getTodaysCheckIn(user.uid),
      ]);
      setCheckInMeta({ streak, hasCheckedInToday: checkedIn, todaysCheckIn });
      gamificationService.evaluateAchievements(user.uid).catch(() => {});
      setSaved(true);
      setTimeout(() => navigation.goBack(), 1200);
    } finally {
      setSaving(false);
    }
  };

  if (saved) {
    return (
      <AppScreen style={[styles.safe, styles.centered]}>
        <Text style={styles.savedEmoji}>✅</Text>
        <Text style={styles.savedTitle}>Check-in saved!</Text>
      </AppScreen>
    );
  }

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Check-In</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.intro}>How are you feeling today?</Text>
        <Text style={styles.introSub}>Quick check-in to track your wellness</Text>

        <Text style={styles.sectionLabel}>Mood</Text>
        <View style={styles.optionRow}>
          {MOODS.map((m) => (
            <TouchableOpacity
              key={m.value}
              style={[styles.option, mood === m.value && styles.optionActive]}
              onPress={() => setMood(m.value)}
            >
              <Text style={styles.optionEmoji}>{m.emoji}</Text>
              <Text style={[styles.optionLabel, mood === m.value && styles.optionLabelActive]}>
                {m.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Energy</Text>
        <View style={styles.optionRow}>
          {ENERGY.map((e) => (
            <TouchableOpacity
              key={e.value}
              style={[styles.option, energy === e.value && styles.optionActive]}
              onPress={() => setEnergy(e.value)}
            >
              <Text style={styles.optionEmoji}>{e.emoji}</Text>
              <Text style={[styles.optionLabel, energy === e.value && styles.optionLabelActive]}>
                {e.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Stress</Text>
        <View style={styles.optionRow}>
          {STRESS.map((s) => (
            <TouchableOpacity
              key={s.value}
              style={[styles.option, stress === s.value && styles.optionActive]}
              onPress={() => setStress(s.value)}
            >
              <Text style={styles.optionEmoji}>{s.emoji}</Text>
              <Text style={[styles.optionLabel, stress === s.value && styles.optionLabelActive]}>
                {s.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Anything to note?</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Optional note..."
          placeholderTextColor={Colors.textTertiary}
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        <TouchableOpacity
          style={[
            styles.saveBtn,
            (mood == null || energy == null || stress == null || saving) && styles.saveBtnDisabled,
          ]}
          onPress={handleSave}
          disabled={mood == null || energy == null || stress == null || saving}
        >
          {saving ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.saveBtnText}>Save Check-In</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  centered: { justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: Colors.primary, lineHeight: 38 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  content: { padding: Spacing.base, gap: Spacing.lg, paddingBottom: Spacing.xl },
  intro: { fontSize: Typography.size.xl, fontWeight: '700', color: Colors.text, textAlign: 'center' },
  introSub: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center', marginTop: -Spacing.sm },
  sectionLabel: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.8 },
  optionRow: { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap' },
  option: {
    flexGrow: 1,
    minWidth: '18%',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.border,
    ...Shadow.sm,
  },
  optionActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryBg },
  optionEmoji: { fontSize: 28 },
  optionLabel: { fontSize: Typography.size.xs, color: Colors.textSecondary, textAlign: 'center', fontWeight: '500' },
  optionLabelActive: { color: Colors.primary, fontWeight: '700' },
  notesInput: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    minHeight: 90,
    textAlignVertical: 'top',
    fontSize: Typography.size.base,
    color: Colors.text,
  },
  saveBtn: { backgroundColor: Colors.primary, borderRadius: Radius.xl, paddingVertical: Spacing.base, alignItems: 'center', ...Shadow.md },
  saveBtnDisabled: { opacity: 0.4 },
  saveBtnText: { color: Colors.white, fontSize: Typography.size.base, fontWeight: '700' },
  savedEmoji: { fontSize: 64 },
  savedTitle: { fontSize: Typography.size.xl, fontWeight: '700', color: Colors.text, marginTop: Spacing.md },
});
