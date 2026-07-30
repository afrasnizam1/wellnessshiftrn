import React, { useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { useAppStore } from '../../store';
import { programService } from '../../services/programService';
import { getProgramDayLesson, getTodayProgramDay } from '../../data/programDayContent';
import type { MoreStackParamList } from '../../types';
import AppScreen from '../../components/common/AppScreen';

type Route = RouteProp<MoreStackParamList, typeof Screen.programDetail>;

export default function ProgramDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<Route>();
  const { user } = useAppStore();
  const [program, setProgram] = useState(route.params.program);
  const [busy, setBusy] = useState(false);

  const { progress, daysLeft } = programService.getProgress(program);
  const doneToday = program.lastSessionDate === format(new Date(), 'yyyy-MM-dd');
  const todayDay = getTodayProgramDay(program.completedDays, program.durationDays);
  const lesson = getProgramDayLesson(program.programId ?? program.id, todayDay, program.durationDays);

  const completeToday = async () => {
    if (!user || doneToday) return;
    setBusy(true);
    try {
      const updated = await programService.completeToday(user.uid, program.id);
      setProgram(updated);
      if (updated.status === 'completed') {
        Alert.alert('Program complete!', `You finished ${program.title}.`, [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }
    } catch (err: any) {
      Alert.alert('Error', err.message ?? 'Could not save progress.');
    } finally {
      setBusy(false);
    }
  };

  const togglePause = async () => {
    if (!user) return;
    setBusy(true);
    try {
      await programService.togglePause(user.uid, program.id);
      setProgram((p) => ({
        ...p,
        status: p.status === 'paused' ? 'active' : 'paused',
      }));
    } finally {
      setBusy(false);
    }
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{program.title}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.hero, { backgroundColor: program.color + '18' }]}>
          <Text style={styles.heroIcon}>{program.icon}</Text>
          <Text style={styles.heroCat}>{program.category}</Text>
          <Text style={styles.heroProgress}>{Math.round(progress * 100)}% complete</Text>
        </View>

        <Text style={styles.desc}>{program.description}</Text>

        <View style={styles.lessonCard}>
          <Text style={styles.lessonEyebrow}>Day {todayDay} · {lesson.focus}</Text>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          <Text style={styles.lessonDuration}>{lesson.durationMinutes} min session</Text>
          {lesson.instructions.map((step) => (
            <View key={step} style={styles.lessonStep}>
              <Text style={styles.lessonBullet}>•</Text>
              <Text style={styles.lessonStepText}>{step}</Text>
            </View>
          ))}
          {lesson.reflection ? (
            <Text style={styles.lessonReflection}>Reflection: {lesson.reflection}</Text>
          ) : null}
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statVal}>{program.completedDays}</Text>
            <Text style={styles.statLbl}>Days done</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statVal}>{daysLeft}</Text>
            <Text style={styles.statLbl}>Days left</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statVal}>{program.durationDays}</Text>
            <Text style={styles.statLbl}>Total days</Text>
          </View>
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: program.color }]} />
        </View>

        <Text style={styles.meta}>
          Started {format(parseISO(program.startDate), 'd MMM yyyy')}
          {program.status === 'paused' ? ' · Paused' : ''}
        </Text>

        <TouchableOpacity
          style={[styles.primaryBtn, (doneToday || program.status === 'paused') && styles.btnDisabled]}
          onPress={completeToday}
          disabled={busy || doneToday || program.status === 'paused'}
        >
          {busy ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.primaryBtnText}>
              {doneToday ? 'Completed for today ✓' : 'Complete today\'s session'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={togglePause} disabled={busy}>
          <Text style={styles.secondaryBtnText}>
            {program.status === 'paused' ? 'Resume program' : 'Pause program'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.base, paddingVertical: Spacing.md, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: Colors.primary, lineHeight: 38 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  content: { padding: Spacing.base, gap: Spacing.md },
  hero: { borderRadius: Radius.xl, padding: Spacing.lg, alignItems: 'center', gap: Spacing.xs },
  heroIcon: { fontSize: 48 },
  heroCat: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  heroProgress: { fontSize: Typography.size.xl, fontWeight: '700', color: Colors.text },
  desc: { fontSize: Typography.size.base, color: Colors.textSecondary, lineHeight: 22 },
  lessonCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    gap: Spacing.sm,
    ...Shadow.sm,
  },
  lessonEyebrow: { fontSize: Typography.size.xs, fontWeight: '700', color: Colors.primary, textTransform: 'uppercase', letterSpacing: 0.6 },
  lessonTitle: { fontSize: Typography.size.lg, fontWeight: '800', color: Colors.text },
  lessonDuration: { fontSize: Typography.size.sm, color: Colors.textSecondary, fontWeight: '600' },
  lessonStep: { flexDirection: 'row', gap: Spacing.sm, paddingTop: 4 },
  lessonBullet: { color: Colors.primary, fontWeight: '700', width: 12 },
  lessonStepText: { flex: 1, fontSize: Typography.size.sm, color: Colors.text, lineHeight: 20 },
  lessonReflection: { fontSize: Typography.size.sm, color: Colors.textSecondary, fontStyle: 'italic', marginTop: Spacing.sm, lineHeight: 20 },
  statsRow: { flexDirection: 'row', gap: Spacing.sm },
  stat: { flex: 1, backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.md, alignItems: 'center', ...Shadow.sm },
  statVal: { fontSize: Typography.size.xl, fontWeight: '700', color: Colors.primary },
  statLbl: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  progressTrack: { height: 10, backgroundColor: Colors.border, borderRadius: 5, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 5 },
  meta: { fontSize: Typography.size.sm, color: Colors.textTertiary, textAlign: 'center' },
  primaryBtn: { backgroundColor: Colors.accent, borderRadius: Radius.xl, paddingVertical: Spacing.base, alignItems: 'center' },
  primaryBtnText: { color: Colors.white, fontWeight: '700', fontSize: Typography.size.base },
  btnDisabled: { opacity: 0.55 },
  secondaryBtn: { borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.xl, paddingVertical: Spacing.base, alignItems: 'center' },
  secondaryBtnText: { color: Colors.textSecondary, fontWeight: '600' },
});
