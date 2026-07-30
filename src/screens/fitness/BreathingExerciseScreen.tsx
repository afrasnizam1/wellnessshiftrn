// src/screens/fitness/BreathingExerciseScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated, Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import AppScreen from '../../components/common/AppScreen';
import { BREATHING_COACHING } from '../../data/guidedSessionContent';

type Phase = 'idle' | 'inhale' | 'hold' | 'exhale' | 'rest';

const TECHNIQUES = [
  { id: 'box',     name: 'Box Breathing',         desc: 'Equal 4-4-4-4 pattern — great for stress',  inhale: 4, holdIn: 4, exhale: 4, rest: 4, color: Colors.fitness },
  { id: '478',     name: '4-7-8 Breathing',        desc: 'Calming sleep technique',                  inhale: 4, holdIn: 7, exhale: 8, rest: 0, color: Colors.mental },
  { id: 'calm',    name: 'Calm Breathing',          desc: 'Simple 4-6 pattern for relaxation',        inhale: 4, holdIn: 0, exhale: 6, rest: 0, color: Colors.mindfulness },
  { id: 'energy',  name: 'Energising Breath',       desc: 'Quick 2-2 to boost energy',               inhale: 2, holdIn: 0, exhale: 2, rest: 0, color: Colors.physical },
];

export default function BreathingExerciseScreen() {
  const navigation = useNavigation<any>();
  const [selectedTech, setSelectedTech] = useState(TECHNIQUES[0]);
  const [phase, setPhase] = useState<Phase>('idle');
  const [countdown, setCountdown] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [totalCycles] = useState(4);
  const animScale = useRef(new Animated.Value(1)).current;
  const animOpacity = useRef(new Animated.Value(0.6)).current;
  const intervalRef = useRef<any>(null);
  const running = useRef(false);

  const phaseLabels: Record<Phase, string> = {
    idle: 'Tap to begin',
    inhale: 'Inhale',
    hold: 'Hold',
    exhale: 'Exhale',
    rest: 'Rest',
  };

  const phaseColors: Record<Phase, string> = {
    idle: Colors.textSecondary,
    inhale: Colors.fitness,
    hold: Colors.warning,
    exhale: Colors.mindfulness,
    rest: Colors.mental,
  };

  const animatePhase = (p: Phase, duration: number) => {
    const toScale = p === 'inhale' ? 1.4 : p === 'exhale' || p === 'rest' ? 0.8 : 1.1;
    const toOpacity = p === 'inhale' ? 1 : p === 'exhale' ? 0.5 : 0.8;
    Animated.parallel([
      Animated.timing(animScale, { toValue: toScale, duration: duration * 1000 * 0.9, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
      Animated.timing(animOpacity, { toValue: toOpacity, duration: duration * 1000 * 0.9, useNativeDriver: true }),
    ]).start();
  };

  const runCycle = async (tech: typeof TECHNIQUES[0]) => {
    const phases: { phase: Phase; duration: number }[] = [
      { phase: 'inhale', duration: tech.inhale },
      ...(tech.holdIn > 0 ? [{ phase: 'hold' as Phase, duration: tech.holdIn }] : []),
      { phase: 'exhale', duration: tech.exhale },
      ...(tech.rest > 0 ? [{ phase: 'rest' as Phase, duration: tech.rest }] : []),
    ];

    for (const { phase: p, duration } of phases) {
      if (!running.current) return;
      setPhase(p);
      setCountdown(duration);
      animatePhase(p, duration);

      await new Promise<void>((resolve) => {
        let remaining = duration;
        intervalRef.current = setInterval(() => {
          remaining -= 1;
          setCountdown(remaining);
          if (remaining <= 0) {
            clearInterval(intervalRef.current);
            resolve();
          }
        }, 1000);
      });
    }
  };

  const start = async () => {
    running.current = true;
    setCycles(0);
    for (let i = 0; i < totalCycles; i++) {
      if (!running.current) break;
      setCycles(i + 1);
      await runCycle(selectedTech);
    }
    if (running.current) {
      setPhase('idle');
      running.current = false;
    }
  };

  const stop = () => {
    running.current = false;
    clearInterval(intervalRef.current);
    setPhase('idle');
    setCountdown(0);
    Animated.parallel([
      Animated.timing(animScale, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(animOpacity, { toValue: 0.6, duration: 500, useNativeDriver: true }),
    ]).start();
  };

  useEffect(() => () => { running.current = false; clearInterval(intervalRef.current); }, []);

  const isRunning = phase !== 'idle';
  const color = phaseColors[phase];
  const coaching = BREATHING_COACHING[selectedTech.id];
  const phaseKey = phase === 'hold' ? 'hold' : phase;
  const liveCue = coaching?.phases[phaseKey] ?? coaching?.phases.inhale;

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { stop(); navigation.goBack(); }} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Breathing Exercise</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Technique selector */}
      {!isRunning && (
        <View style={styles.techRow}>
          {TECHNIQUES.map((t) => (
            <TouchableOpacity
              key={t.id}
              style={[styles.techChip, selectedTech.id === t.id && { backgroundColor: t.color + '22', borderColor: t.color }]}
              onPress={() => setSelectedTech(t)}
            >
              <Text style={[styles.techChipText, selectedTech.id === t.id && { color: t.color, fontWeight: '700' }]}>
                {t.name.split(' ')[0]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Technique info */}
      {!isRunning && (
        <View style={styles.techInfo}>
          <Text style={styles.techName}>{selectedTech.name}</Text>
          <Text style={styles.techDesc}>{coaching?.intro ?? selectedTech.desc}</Text>
          <Text style={styles.techPattern}>
            Inhale {selectedTech.inhale}s
            {selectedTech.holdIn > 0 ? ` · Hold ${selectedTech.holdIn}s` : ''}
            {` · Exhale ${selectedTech.exhale}s`}
            {selectedTech.rest > 0 ? ` · Rest ${selectedTech.rest}s` : ''}
          </Text>
        </View>
      )}

      {/* Breathing animation */}
      <View style={styles.circleWrap}>
        <Animated.View style={[
          styles.circleOuter,
          { borderColor: color, transform: [{ scale: animScale }], opacity: animOpacity },
        ]}>
          <Animated.View style={[styles.circleInner, { backgroundColor: color + '33' }]}>
            <Text style={[styles.phaseLabel, { color }]}>{phaseLabels[phase]}</Text>
            {countdown > 0 && <Text style={[styles.countdown, { color }]}>{countdown}</Text>}
          </Animated.View>
        </Animated.View>

        {isRunning && (
          <>
            <Text style={styles.cycleText}>Cycle {cycles} of {totalCycles}</Text>
            {liveCue ? <Text style={styles.coachingCue}>{liveCue}</Text> : null}
          </>
        )}
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlBtn, { backgroundColor: isRunning ? Colors.error : selectedTech.color }]}
          onPress={isRunning ? stop : start}
        >
          <Text style={styles.controlBtnText}>{isRunning ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
      </View>
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
  techRow: {
    flexDirection: 'row', paddingHorizontal: Spacing.base, gap: Spacing.sm, flexWrap: 'wrap',
  },
  techChip: {
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
    borderRadius: Radius.xl, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.2)',
  },
  techChipText: { fontSize: Typography.size.xs, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  techInfo: { paddingHorizontal: Spacing.base, paddingTop: Spacing.md, gap: 4 },
  techName: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.white },
  techDesc: { fontSize: Typography.size.sm, color: 'rgba(255,255,255,0.6)' },
  techPattern: { fontSize: Typography.size.xs, color: 'rgba(255,255,255,0.4)', marginTop: 4 },
  circleWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.lg },
  circleOuter: {
    width: 220, height: 220, borderRadius: 110,
    borderWidth: 3, alignItems: 'center', justifyContent: 'center',
  },
  circleInner: {
    width: 170, height: 170, borderRadius: 85,
    alignItems: 'center', justifyContent: 'center', gap: 4,
  },
  phaseLabel: { fontSize: Typography.size.xl, fontWeight: '700' },
  countdown: { fontSize: Typography.size['3xl'], fontWeight: '700' },
  cycleText: { fontSize: Typography.size.sm, color: 'rgba(255,255,255,0.5)' },
  coachingCue: {
    fontSize: Typography.size.sm,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.sm,
  },
  controls: { paddingHorizontal: Spacing.base, paddingBottom: Spacing['2xl'] },
  controlBtn: {
    borderRadius: Radius.xl, paddingVertical: Spacing.base, alignItems: 'center',
  },
  controlBtnText: { color: Colors.white, fontSize: Typography.size.lg, fontWeight: '700' },
});
