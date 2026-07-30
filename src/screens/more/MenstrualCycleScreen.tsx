import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format, addDays, differenceInCalendarDays } from 'date-fns';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppCard, ScreenHeader } from '../../components/ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppStore } from '../../store';
import AppScreen from '../../components/common/AppScreen';

type CycleData = {
  lastPeriodStart: string;
  cycleLength: number;
};

const PHASES = [
  { name: 'Menstrual', days: [1, 5], color: '#E74C3C', tip: 'Rest and hydrate. Light movement may ease cramps.' },
  { name: 'Follicular', days: [6, 13], color: '#3498DB', tip: 'Energy often rises — good time for new workouts.' },
  { name: 'Ovulation', days: [14, 16], color: '#27AE60', tip: 'Peak energy and fertility window.' },
  { name: 'Luteal', days: [17, 28], color: '#9B59B6', tip: 'Prioritise sleep and magnesium-rich foods.' },
];

function storageKey(uid: string) {
  return `menstrual_cycle_data_${uid}`;
}

export default function MenstrualCycleScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAppStore();
  const [data, setData] = useState<CycleData | null>(null);
  const [cycleLength, setCycleLength] = useState('28');

  useEffect(() => {
    if (!user) return;
    AsyncStorage.getItem(storageKey(user.uid)).then((raw) => {
      if (raw) {
        const parsed = JSON.parse(raw) as CycleData;
        setData(parsed);
        setCycleLength(String(parsed.cycleLength));
      }
    });
  }, [user?.uid]);

  const save = async (next: CycleData) => {
    if (!user) return;
    setData(next);
    await AsyncStorage.setItem(storageKey(user.uid), JSON.stringify(next));
  };

  const logPeriodStart = () => {
    const next: CycleData = {
      lastPeriodStart: new Date().toISOString(),
      cycleLength: parseInt(cycleLength, 10) || 28,
    };
    save(next);
    Alert.alert('Logged', 'Period start date saved.');
  };

  const dayOfCycle = data
    ? ((differenceInCalendarDays(new Date(), new Date(data.lastPeriodStart)) % data.cycleLength) + data.cycleLength) % data.cycleLength + 1
    : null;

  const phase = dayOfCycle
    ? PHASES.find((p) => dayOfCycle >= p.days[0] && dayOfCycle <= p.days[1]) ?? PHASES[3]
    : null;

  const nextPeriod = data
    ? addDays(new Date(data.lastPeriodStart), data.cycleLength)
    : null;

  return (
    <AppScreen style={styles.safe}>
      <ScreenHeader title="Cycle Tracking" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        {dayOfCycle && phase ? (
          <AppCard style={[styles.phaseCard, { borderLeftColor: phase.color }]}>
            <Text style={styles.phaseDay}>Day {dayOfCycle} · {phase.name} phase</Text>
            <Text style={styles.phaseTip}>{phase.tip}</Text>
            {nextPeriod && (
              <Text style={styles.nextPeriod}>
                Next period est. {format(nextPeriod, 'd MMM yyyy')}
              </Text>
            )}
          </AppCard>
        ) : (
          <AppCard style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Start tracking</Text>
            <Text style={styles.emptySub}>Log your last period start to see cycle day and phase insights.</Text>
          </AppCard>
        )}

        <Text style={styles.label}>Average cycle length (days)</Text>
        <TextInput
          style={styles.input}
          value={cycleLength}
          onChangeText={setCycleLength}
          keyboardType="number-pad"
          maxLength={2}
        />

        <TouchableOpacity style={styles.primaryBtn} onPress={logPeriodStart}>
          <Text style={styles.primaryBtnText}>Log period start today</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          For informational use only — not a substitute for medical advice. Consult a GP for irregular cycles or severe symptoms.
        </Text>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, gap: Spacing.md },
  phaseCard: { borderLeftWidth: 4, gap: Spacing.sm },
  phaseDay: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text },
  phaseTip: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 22 },
  nextPeriod: { fontSize: Typography.size.xs, color: Colors.textTertiary, marginTop: Spacing.xs },
  emptyCard: { gap: Spacing.sm },
  emptyTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  emptySub: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  label: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.text },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.base,
    fontSize: Typography.size.base,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  primaryBtn: {
    backgroundColor: Colors.brand,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    alignItems: 'center',
  },
  primaryBtnText: { color: Colors.white, fontWeight: '700' },
  disclaimer: { fontSize: Typography.size.xs, color: Colors.textTertiary, lineHeight: 18 },
});
