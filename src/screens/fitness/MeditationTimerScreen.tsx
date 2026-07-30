// src/screens/fitness/MeditationTimerScreen.tsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import AppScreen from '../../components/common/AppScreen';
import { IconBadge } from '../../components/ui';
import { getMeditationCue, MEDITATION_TECHNIQUES } from '../../data/guidedSessionContent';

const DURATIONS = [3, 5, 10, 15, 20, 30];

export default function MeditationTimerScreen() {
  const navigation = useNavigation<any>();
  const [duration, setDuration] = useState(5);
  const [technique, setTechnique] = useState(MEDITATION_TECHNIQUES[0]);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [complete, setComplete] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = duration * 60;
  const remaining = Math.max(0, total - elapsed);
  const progress = total > 0 ? elapsed / total : 0;

  const guidanceText = useMemo(
    () => getMeditationCue(technique.id, elapsed, total),
    [technique.id, elapsed, total],
  );

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsed((e) => {
          if (e + 1 >= total) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setRunning(false);
            setComplete(true);
            return total;
          }
          return e + 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, total]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
    setElapsed(0);
    setComplete(false);
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { reset(); navigation.goBack(); }} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meditation</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {!running && !complete && (
          <>
            <Text style={styles.sectionLabel}>Duration (minutes)</Text>
            <View style={styles.durationRow}>
              {DURATIONS.map((d) => (
                <TouchableOpacity
                  key={d}
                  style={[styles.durationChip, duration === d && styles.durationChipActive]}
                  onPress={() => setDuration(d)}
                >
                  <Text style={[styles.durationText, duration === d && styles.durationTextActive]}>{d}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionLabel}>Technique</Text>
            <View style={styles.techGrid}>
              {MEDITATION_TECHNIQUES.map((t) => (
                <TouchableOpacity
                  key={t.id}
                  style={[styles.techCard, technique.id === t.id && styles.techCardActive]}
                  onPress={() => setTechnique(t)}
                >
                  <IconBadge name={t.icon} color={Colors.mindfulness} size="md" variant="plain" />
                  <Text style={[styles.techName, technique.id === t.id && styles.techNameActive]}>{t.name}</Text>
                  <Text style={styles.techDesc}>{t.desc}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        <View style={styles.timerWrap}>
          <View style={styles.timerCircle}>
            {!complete && (
              <IconBadge name={technique.icon} color={Colors.mindfulness} size="lg" variant="plain" />
            )}
            <Text style={styles.timerTime}>{formatTime(remaining)}</Text>
            <Text style={styles.timerLabel}>
              {complete ? 'Session complete' : running ? technique.name : `${duration} min session`}
            </Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
        </View>

        {(running || complete) && (
          <View style={styles.guidanceCard}>
            <Text style={styles.guidanceText}>{guidanceText}</Text>
          </View>
        )}

        {complete && (
          <View style={styles.completeCard}>
            <Text style={styles.completeTitle}>Well done</Text>
            <Text style={styles.completeSub}>
              You completed {duration} minutes of {technique.name.toLowerCase()}. Consistency builds calm — return tomorrow.
            </Text>
          </View>
        )}

        <View style={styles.controls}>
          {!complete ? (
            <>
              <TouchableOpacity
                style={[styles.primaryBtn, { backgroundColor: running ? Colors.warning : Colors.mindfulness }]}
                onPress={() => setRunning((r) => !r)}
              >
                <Text style={styles.primaryBtnText}>{running ? 'Pause' : elapsed > 0 ? 'Resume' : 'Begin session'}</Text>
              </TouchableOpacity>
              {elapsed > 0 && (
                <TouchableOpacity style={styles.secondaryBtn} onPress={reset}>
                  <Text style={styles.secondaryBtnText}>Reset</Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: Colors.success }]} onPress={reset}>
              <Text style={styles.primaryBtnText}>New session</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0A0A1A' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
  },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: Colors.white, lineHeight: 38 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: Typography.size.base, fontWeight: '700', color: Colors.white },
  content: { padding: Spacing.base, gap: Spacing.lg },
  sectionLabel: { fontSize: Typography.size.sm, fontWeight: '700', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 0.8 },
  durationRow: { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap' },
  durationChip: {
    width: 52, height: 52, borderRadius: 26, borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center',
  },
  durationChipActive: { backgroundColor: Colors.mindfulness, borderColor: Colors.mindfulness },
  durationText: { fontSize: Typography.size.base, color: 'rgba(255,255,255,0.6)', fontWeight: '600' },
  durationTextActive: { color: Colors.white },
  techGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  techCard: {
    width: '48%', padding: Spacing.md, borderRadius: Radius.lg,
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.15)', gap: 4,
  },
  techCardActive: { borderColor: Colors.mindfulness, backgroundColor: Colors.mindfulness + '22' },
  techName: { fontSize: Typography.size.sm, fontWeight: '700', color: 'rgba(255,255,255,0.8)' },
  techNameActive: { color: Colors.white },
  techDesc: { fontSize: Typography.size.xs, color: 'rgba(255,255,255,0.4)' },
  timerWrap: { alignItems: 'center', gap: Spacing.md },
  timerCircle: {
    width: 200, height: 200, borderRadius: 100,
    borderWidth: 3, borderColor: Colors.mindfulness + '66',
    backgroundColor: Colors.mindfulness + '11',
    alignItems: 'center', justifyContent: 'center', gap: 4,
  },
  timerTime: { fontSize: Typography.size['3xl'], fontWeight: '700', color: Colors.white },
  timerLabel: { fontSize: Typography.size.xs, color: 'rgba(255,255,255,0.5)', textAlign: 'center' },
  progressTrack: { width: '100%', height: 4, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.mindfulness, borderRadius: 2 },
  guidanceCard: {
    backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: Radius.lg,
    padding: Spacing.base, borderLeftWidth: 3, borderLeftColor: Colors.mindfulness,
  },
  guidanceText: { fontSize: Typography.size.sm, color: 'rgba(255,255,255,0.85)', lineHeight: 22 },
  completeCard: {
    backgroundColor: Colors.success + '22', borderRadius: Radius.lg,
    padding: Spacing.base, alignItems: 'center', gap: Spacing.sm,
  },
  completeTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.white },
  completeSub: { fontSize: Typography.size.sm, color: 'rgba(255,255,255,0.7)', textAlign: 'center', lineHeight: 20 },
  controls: { gap: Spacing.sm },
  primaryBtn: { borderRadius: Radius.xl, paddingVertical: Spacing.base, alignItems: 'center' },
  primaryBtnText: { color: Colors.white, fontSize: Typography.size.lg, fontWeight: '700' },
  secondaryBtn: { alignItems: 'center', paddingVertical: Spacing.sm },
  secondaryBtnText: { color: 'rgba(255,255,255,0.4)', fontSize: Typography.size.sm },
});
