import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppCard, ScreenHeader, BrandButton, FilterChip } from '../../components/ui';
import AppScreen from '../../components/common/AppScreen';
import { useAppStore } from '../../store';
import {
  CYCLE_SYMPTOMS,
  cycleTrackingService,
  type CycleSnapshot,
  type CycleDayLog,
  type FlowLevel,
} from '../../services/cycleTrackingService';

const FLOW: { id: FlowLevel; label: string }[] = [
  { id: 'none', label: 'None' },
  { id: 'spotting', label: 'Spotting' },
  { id: 'light', label: 'Light' },
  { id: 'medium', label: 'Medium' },
  { id: 'heavy', label: 'Heavy' },
];

export default function MenstrualCycleScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAppStore();
  const [snap, setSnap] = useState<CycleSnapshot | null>(null);
  const [cycleLength, setCycleLength] = useState('28');
  const [periodLength, setPeriodLength] = useState('5');
  const [todayLog, setTodayLog] = useState<CycleDayLog | null>(null);

  const reload = useCallback(async () => {
    if (!user) return;
    const [next, log] = await Promise.all([
      cycleTrackingService.getSnapshot(user.uid),
      cycleTrackingService.getTodayLog(user.uid),
    ]);
    setSnap(next);
    setCycleLength(String(next.profile.cycleLength));
    setPeriodLength(String(next.profile.periodLength));
    setTodayLog(log);
  }, [user?.uid]);

  useEffect(() => {
    reload();
  }, [reload]);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  const persistSettings = async () => {
    if (!user) return;
    const next = await cycleTrackingService.saveSettings(user.uid, {
      cycleLength: parseInt(cycleLength, 10) || 28,
      periodLength: parseInt(periodLength, 10) || 5,
    });
    setSnap(await cycleTrackingService.getSnapshot(user.uid));
    setCycleLength(String(next.cycleLength));
    setPeriodLength(String(next.periodLength));
  };

  const logStart = async (when: Date, label: string) => {
    if (!user) return;
    await cycleTrackingService.logPeriodStart(user.uid, when);
    await persistSettings();
    await reload();
    Alert.alert('Logged', `Period start saved (${label}).`);
  };

  const toggleSymptom = async (name: string) => {
    if (!user || !todayLog) return;
    const symptoms = todayLog.symptoms.includes(name)
      ? todayLog.symptoms.filter((s) => s !== name)
      : [...todayLog.symptoms, name];
    const log = await cycleTrackingService.upsertTodayLog(user.uid, { symptoms });
    setTodayLog(log);
  };

  const setFlow = async (flow: FlowLevel) => {
    if (!user) return;
    const log = await cycleTrackingService.upsertTodayLog(user.uid, { flow });
    setTodayLog(log);
  };

  const phase = snap?.phase;
  const history = snap?.profile.history ?? [];
  const recent = snap ? cycleTrackingService.recentLogs(snap.profile, 5) : [];

  return (
    <AppScreen style={styles.safe}>
      <ScreenHeader title="Cycle & period" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {snap?.dayOfCycle && phase ? (
          <AppCard style={[styles.phaseCard, { borderLeftColor: phase.color }]}>
            <Text style={styles.phaseDay}>
              Day {snap.dayOfCycle} · {phase.name}
            </Text>
            <Text style={styles.phaseTip}>{phase.tip}</Text>
            {snap.nextPeriod ? (
              <Text style={styles.meta}>Next period est. {format(snap.nextPeriod, 'd MMM yyyy')}</Text>
            ) : null}
            {snap.fertileStart && snap.fertileEnd ? (
              <Text style={styles.meta}>
                Typical fertility window {format(snap.fertileStart, 'd MMM')} – {format(snap.fertileEnd, 'd MMM')}
              </Text>
            ) : null}
          </AppCard>
        ) : (
          <AppCard style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Start tracking</Text>
            <Text style={styles.emptySub}>
              Log when your last period started to see cycle day, phase tips, and a next-period estimate.
            </Text>
          </AppCard>
        )}

        <Text style={styles.section}>Log period start</Text>
        <View style={styles.row}>
          <Pressable style={styles.pill} onPress={() => logStart(new Date(), 'today')}>
            <Text style={styles.pillText}>Today</Text>
          </Pressable>
          <Pressable
            style={styles.pill}
            onPress={() => logStart(cycleTrackingService.yesterday(), 'yesterday')}
          >
            <Text style={styles.pillText}>Yesterday</Text>
          </Pressable>
        </View>

        <Text style={styles.section}>Today — flow</Text>
        <View style={styles.wrapChips}>
          {FLOW.map((f) => (
            <FilterChip
              key={f.id}
              label={f.label}
              active={todayLog?.flow === f.id}
              onPress={() => setFlow(f.id)}
            />
          ))}
        </View>

        <Text style={styles.section}>Today — how you feel</Text>
        <View style={styles.wrapChips}>
          {CYCLE_SYMPTOMS.map((s) => (
            <FilterChip
              key={s}
              label={s}
              active={todayLog?.symptoms.includes(s) ?? false}
              onPress={() => toggleSymptom(s)}
            />
          ))}
        </View>

        <Text style={styles.section}>Typical lengths</Text>
        <Text style={styles.label}>Cycle length (days)</Text>
        <TextInput
          style={styles.input}
          value={cycleLength}
          onChangeText={setCycleLength}
          onBlur={persistSettings}
          keyboardType="number-pad"
          maxLength={2}
        />
        <Text style={styles.label}>Period length (days)</Text>
        <TextInput
          style={styles.input}
          value={periodLength}
          onChangeText={setPeriodLength}
          onBlur={persistSettings}
          keyboardType="number-pad"
          maxLength={2}
        />
        <BrandButton label="Save lengths" onPress={persistSettings} compact />

        {history.length > 0 ? (
          <>
            <Text style={styles.section}>Recent period starts</Text>
            <AppCard padded={false}>
              {history.slice(0, 8).map((d, i) => (
                <View key={d} style={[styles.histRow, i < history.length - 1 && styles.histBorder]}>
                  <Ionicons name="calendar-outline" size={16} color={Colors.brand} />
                  <Text style={styles.histText}>{format(new Date(`${d}T12:00:00`), 'EEE d MMM yyyy')}</Text>
                </View>
              ))}
            </AppCard>
          </>
        ) : null}

        {recent.length > 0 ? (
          <>
            <Text style={styles.section}>Recent symptom logs</Text>
            {recent.map((log) => (
              <Text key={log.date} style={styles.histText}>
                {format(new Date(`${log.date}T12:00:00`), 'd MMM')}
                {log.flow && log.flow !== 'none' ? ` · ${log.flow} flow` : ''}
                {log.symptoms.length ? ` · ${log.symptoms.join(', ')}` : ''}
              </Text>
            ))}
          </>
        ) : null}

        <Text style={styles.disclaimer}>
          For information only — not medical advice, contraception, or a fertility diagnostic. See a GP for
          irregular cycles, very heavy bleeding, or severe pain.
        </Text>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, gap: Spacing.sm, paddingBottom: 40 },
  phaseCard: { borderLeftWidth: 4, gap: Spacing.sm },
  phaseDay: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text },
  phaseTip: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 22 },
  meta: { fontSize: Typography.size.sm, color: Colors.text, fontWeight: '600' },
  emptyCard: { gap: Spacing.sm },
  emptyTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text },
  emptySub: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 22 },
  section: {
    marginTop: Spacing.md,
    fontSize: Typography.size.sm,
    fontWeight: '700',
    color: Colors.text,
  },
  label: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: Spacing.sm },
  input: {
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    fontSize: Typography.size.base,
    color: Colors.text,
    backgroundColor: Colors.surface,
  },
  row: { flexDirection: 'row', gap: Spacing.sm },
  pill: {
    flex: 1,
    backgroundColor: Colors.brand,
    borderRadius: Radius.md,
    paddingVertical: 12,
    alignItems: 'center',
  },
  pillText: { color: Colors.white, fontWeight: '700' },
  wrapChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  histRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: Spacing.base,
    paddingVertical: 12,
  },
  histBorder: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.glassBorder },
  histText: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  disclaimer: {
    marginTop: Spacing.lg,
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
    lineHeight: 18,
  },
});
