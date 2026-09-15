// src/screens/fitness/BreathingExerciseScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import AppScreen from '../../components/common/AppScreen';
import {
  BREATHING_COACHING,
  BREATHING_TECHNIQUES,
  BREATHING_WHY_IT_MATTERS,
  type BreathingTechnique,
} from '../../data/breathingTechniques';

type Phase = 'idle' | 'inhale' | 'hold' | 'exhale' | 'rest';

export default function BreathingExerciseScreen() {
  const navigation = useNavigation<any>();
  const [selectedTech, setSelectedTech] = useState<BreathingTechnique>(BREATHING_TECHNIQUES[0]);
  const [phase, setPhase] = useState<Phase>('idle');
  const [countdown, setCountdown] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [totalCycles] = useState(4);
  const animScale = useRef(new Animated.Value(1)).current;
  const animOpacity = useRef(new Animated.Value(0.6)).current;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const running = useRef(false);

  const phaseLabels: Record<Phase, string> = {
    idle: 'Tap to begin',
    inhale: 'Inhale',
    hold: selectedTech.id === 'sigh' ? 'Sip' : 'Hold',
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
      Animated.timing(animScale, {
        toValue: toScale,
        duration: duration * 1000 * 0.9,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }),
      Animated.timing(animOpacity, {
        toValue: toOpacity,
        duration: duration * 1000 * 0.9,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const runCycle = async (tech: BreathingTechnique) => {
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
            if (intervalRef.current) clearInterval(intervalRef.current);
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
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPhase('idle');
    setCountdown(0);
    Animated.parallel([
      Animated.timing(animScale, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(animOpacity, { toValue: 0.6, duration: 500, useNativeDriver: true }),
    ]).start();
  };

  useEffect(
    () => () => {
      running.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    },
    [],
  );

  const isRunning = phase !== 'idle';
  const color = phaseColors[phase];
  const coaching = BREATHING_COACHING[selectedTech.id];
  const phaseKey = phase === 'hold' ? 'hold' : phase;
  const liveCue = coaching?.phases[phaseKey] ?? coaching?.phases.inhale;

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            stop();
            navigation.goBack();
          }}
          style={styles.backBtn}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Breathing Exercises</Text>
        <View style={{ width: 40 }} />
      </View>

      {isRunning ? (
        <View style={styles.sessionBody}>
          <Text style={styles.sessionTechName}>{selectedTech.name}</Text>
          <View style={styles.circleWrap}>
            <Animated.View
              style={[
                styles.circleOuter,
                { borderColor: color, transform: [{ scale: animScale }], opacity: animOpacity },
              ]}
            >
              <Animated.View style={[styles.circleInner, { backgroundColor: color + '33' }]}>
                <Text style={[styles.phaseLabel, { color }]}>{phaseLabels[phase]}</Text>
                {countdown > 0 ? <Text style={[styles.countdown, { color }]}>{countdown}</Text> : null}
              </Animated.View>
            </Animated.View>
            <Text style={styles.cycleText}>
              Cycle {cycles} of {totalCycles}
            </Text>
            {liveCue ? <Text style={styles.coachingCue}>{liveCue}</Text> : null}
          </View>
          <View style={styles.controls}>
            <TouchableOpacity style={[styles.controlBtn, { backgroundColor: Colors.error }]} onPress={stop}>
              <Text style={styles.controlBtnText}>Stop</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.whyCard}>
            <Text style={styles.whyEyebrow}>Why it matters</Text>
            <Text style={styles.whyTitle}>Breathing is a remote control for your nervous system</Text>
            <Text style={styles.whyLead}>
              How you breathe changes heart rate, muscle tension, focus, and sleep readiness —
              often within a few cycles. Pick a technique below that matches what you need right now.
            </Text>
            {BREATHING_WHY_IT_MATTERS.map((item) => (
              <View key={item.title} style={styles.whyRow}>
                <View style={styles.whyIcon}>
                  <Ionicons name={item.icon} size={18} color={Colors.fitness} />
                </View>
                <View style={styles.whyTextCol}>
                  <Text style={styles.whyItemTitle}>{item.title}</Text>
                  <Text style={styles.whyItemBody}>{item.body}</Text>
                </View>
              </View>
            ))}
          </View>

          <Text style={styles.sectionLabel}>Choose a technique</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.techRow}
          >
            {BREATHING_TECHNIQUES.map((t) => {
              const active = selectedTech.id === t.id;
              return (
                <TouchableOpacity
                  key={t.id}
                  style={[
                    styles.techChip,
                    active && { backgroundColor: t.color + '28', borderColor: t.color },
                  ]}
                  onPress={() => setSelectedTech(t)}
                >
                  <Text style={[styles.techChipText, active && { color: t.color, fontWeight: '700' }]}>
                    {t.shortLabel}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={[styles.techCard, { borderColor: selectedTech.color + '55' }]}>
            <Text style={[styles.techName, { color: selectedTech.color }]}>{selectedTech.name}</Text>
            <Text style={styles.techDesc}>{coaching?.intro ?? selectedTech.desc}</Text>
            <Text style={styles.techPattern}>
              Inhale {selectedTech.inhale}s
              {selectedTech.holdIn > 0
                ? ` · ${selectedTech.id === 'sigh' ? 'Sip' : 'Hold'} ${selectedTech.holdIn}s`
                : ''}
              {` · Exhale ${selectedTech.exhale}s`}
              {selectedTech.rest > 0 ? ` · Rest ${selectedTech.rest}s` : ''}
              {' · '}
              {totalCycles} cycles
            </Text>

            <View style={styles.detailBlock}>
              <Text style={styles.detailLabel}>Why it helps</Text>
              <Text style={styles.detailBody}>{selectedTech.benefit}</Text>
            </View>
            <View style={styles.detailBlock}>
              <Text style={styles.detailLabel}>Best for</Text>
              <Text style={styles.detailBody}>{selectedTech.bestFor}</Text>
            </View>
            {selectedTech.caution ? (
              <View style={styles.cautionBlock}>
                <Ionicons name="information-circle-outline" size={16} color={Colors.warning} />
                <Text style={styles.cautionText}>{selectedTech.caution}</Text>
              </View>
            ) : null}
          </View>

          <Text style={styles.typesHint}>
            All types: Box · 4-7-8 · Extended exhale · Diaphragmatic · Coherent · Physiological sigh ·
            Energising
          </Text>

          <View style={styles.circlePreview}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                void start();
              }}
              accessibilityRole="button"
              accessibilityLabel="Tap to begin"
            >
              <Animated.View
                style={[
                  styles.circleOuter,
                  {
                    borderColor: selectedTech.color,
                    transform: [{ scale: animScale }],
                    opacity: animOpacity,
                  },
                ]}
              >
                <Animated.View
                  style={[styles.circleInner, { backgroundColor: selectedTech.color + '33' }]}
                >
                  <Text style={[styles.phaseLabel, { color: selectedTech.color }]}>Tap to begin</Text>
                </Animated.View>
              </Animated.View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.controlBtn, { backgroundColor: selectedTech.color }]}
            onPress={() => {
              void start();
            }}
          >
            <Text style={styles.controlBtnText}>Start {selectedTech.shortLabel}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0A0A1A' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
  },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: Colors.white, lineHeight: 38 },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.white,
  },
  scrollContent: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing['3xl'],
    gap: Spacing.md,
  },
  sessionBody: { flex: 1 },
  sessionTechName: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.7)',
    fontSize: Typography.size.sm,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  whyCard: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: Radius.xl,
    padding: Spacing.base,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  whyEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: Colors.fitness,
  },
  whyTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -0.3,
  },
  whyLead: {
    fontSize: Typography.size.sm,
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 20,
    marginBottom: Spacing.xs,
  },
  whyRow: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'flex-start' },
  whyIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(46, 219, 189, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  whyTextCol: { flex: 1, gap: 2 },
  whyItemTitle: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.white },
  whyItemBody: { fontSize: Typography.size.xs, color: 'rgba(255,255,255,0.55)', lineHeight: 17 },
  sectionLabel: {
    fontSize: Typography.size.sm,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.85)',
    marginTop: Spacing.xs,
  },
  techRow: { gap: Spacing.sm, paddingVertical: Spacing.xs },
  techChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.xl,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  techChipText: { fontSize: Typography.size.xs, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  techCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: Radius.xl,
    padding: Spacing.base,
    gap: Spacing.sm,
    borderWidth: 1.5,
  },
  techName: { fontSize: Typography.size.lg, fontWeight: '800' },
  techDesc: { fontSize: Typography.size.sm, color: 'rgba(255,255,255,0.65)', lineHeight: 20 },
  techPattern: { fontSize: Typography.size.xs, color: 'rgba(255,255,255,0.4)', marginTop: 2 },
  detailBlock: { gap: 4, marginTop: Spacing.xs },
  detailLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.45)',
  },
  detailBody: { fontSize: Typography.size.sm, color: 'rgba(255,255,255,0.78)', lineHeight: 20 },
  cautionBlock: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'flex-start',
    backgroundColor: 'rgba(243, 156, 18, 0.12)',
    borderRadius: Radius.md,
    padding: Spacing.sm,
    marginTop: Spacing.xs,
  },
  cautionText: { flex: 1, fontSize: Typography.size.xs, color: 'rgba(255,255,255,0.75)', lineHeight: 17 },
  typesHint: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.35)',
    lineHeight: 16,
    textAlign: 'center',
  },
  circlePreview: { alignItems: 'center', paddingVertical: Spacing.md },
  circleWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.lg },
  circleOuter: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleInner: {
    width: 170,
    height: 170,
    borderRadius: 85,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
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
    borderRadius: Radius.xl,
    paddingVertical: Spacing.base,
    alignItems: 'center',
  },
  controlBtnText: { color: Colors.white, fontSize: Typography.size.lg, fontWeight: '700' },
});
