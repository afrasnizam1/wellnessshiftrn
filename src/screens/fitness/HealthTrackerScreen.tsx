// src/screens/fitness/HealthTrackerScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow, fitnessModuleIonIcon } from '../../theme';
import AppScreen from '../../components/common/AppScreen';
import { BackButton, IconBadge } from '../../components/ui';

const TRACKERS: Record<string, { title: string; color: string; unit: string; logLabel: string; entries: { time: string; value: string }[] }> = {
  steps: { title: 'Steps Tracker', color: Colors.physical, unit: 'steps', logLabel: 'Steps today', entries: [] },
  'blood-pressure': { title: 'Blood Pressure', color: '#E74C3C', unit: 'mmHg', logLabel: 'Systolic / Diastolic', entries: [{ time: 'Today 08:00', value: '120/80' }, { time: 'Yesterday', value: '118/76' }] },
  'heart-rate-tracker': { title: 'Heart Rate', color: '#E74C3C', unit: 'bpm', logLabel: 'Heart rate', entries: [{ time: 'Today 08:00', value: '72 bpm' }] },
  'blood-glucose': { title: 'Blood Glucose', color: '#E74C3C', unit: 'mmol/L', logLabel: 'Glucose reading', entries: [] },
  'hydration-tracker': { title: 'Hydration', color: '#3498DB', unit: 'ml', logLabel: 'Amount (ml)', entries: [{ time: '10:00', value: '250 ml' }, { time: '12:00', value: '300 ml' }] },
  hydration: { title: 'Hydration', color: '#3498DB', unit: 'ml', logLabel: 'Amount (ml)', entries: [] },
  'pain-scale': { title: 'Pain Scale', color: '#E74C3C', unit: '/10', logLabel: 'Pain level (1–10)', entries: [] },
  'energy-level': { title: 'Energy Level', color: '#F39C12', unit: '/10', logLabel: 'Energy (1–10)', entries: [{ time: 'This morning', value: '6/10' }] },
  'mindfulness-tracker': { title: 'Mindfulness', color: Colors.mindfulness, unit: 'min', logLabel: 'Minutes practised', entries: [] },
  'sleep-quality-log': { title: 'Sleep Quality', color: Colors.sleep, unit: '/10', logLabel: 'How rested (1–10)', entries: [] },
  'heart-monitoring': { title: 'Heart Monitoring', color: '#E74C3C', unit: 'bpm', logLabel: 'Heart rate', entries: [] },
  'resting-heart-rate': { title: 'Resting Heart Rate', color: '#E74C3C', unit: 'bpm', logLabel: 'Morning RHR', entries: [] },
  'diabetes-management': { title: 'Blood Glucose Log', color: '#E74C3C', unit: 'mmol/L', logLabel: 'Glucose reading', entries: [] },
  'recovery-tracker': { title: 'Recovery Tracker', color: '#4338CA', unit: '/10', logLabel: 'Recovery score (1–10)', entries: [] },
  'wellness-tracker-tool': { title: 'Wellness Tracker', color: Colors.primary, unit: '/10', logLabel: 'Overall wellness (1–10)', entries: [] },
  'fiber-tracker': { title: 'Fiber Tracker', color: '#27AE60', unit: 'g', logLabel: 'Fibre intake (grams)', entries: [] },
  default: { title: 'Health Tracker', color: Colors.primary, unit: '', logLabel: 'Value', entries: [] },
};

export default function HealthTrackerScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const trackerId = route.params?.trackerId ?? 'default';
  const tracker = TRACKERS[trackerId] ?? TRACKERS.default;
  const trackerIcon = fitnessModuleIonIcon({ id: trackerId, category: 'trackers' });
  const [value, setValue] = useState('');
  const [entries, setEntries] = useState(tracker.entries);

  const logEntry = () => {
    if (!value.trim()) return;
    const now = new Date();
    setEntries([{ time: `Today ${now.getHours()}:${now.getMinutes().toString().padStart(2,'0')}`, value: `${value} ${tracker.unit}`.trim() }, ...entries]);
    setValue('');
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>{tracker.title}</Text>
        <View style={{ width: 40 }} />
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={[styles.heroCard, { backgroundColor: tracker.color + '15' }]}>
            <IconBadge name={trackerIcon} color={tracker.color} size="lg" />
            <Text style={[styles.heroTitle, { color: tracker.color }]}>{tracker.title}</Text>
            <Text style={styles.heroLatest}>{entries[0]?.value ?? 'No data yet'}</Text>
            <Text style={styles.heroLatestLabel}>Latest reading</Text>
          </View>

          <View style={styles.logCard}>
            <Text style={styles.logTitle}>Log a reading</Text>
            <View style={styles.logRow}>
              <TextInput
                style={styles.logInput}
                placeholder={tracker.logLabel}
                placeholderTextColor={Colors.textTertiary}
                value={value}
                onChangeText={setValue}
                keyboardType="default"
              />
              <TouchableOpacity style={[styles.logBtn, { backgroundColor: tracker.color }]} onPress={logEntry}>
                <Text style={styles.logBtnText}>Log</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.historyTitle}>History</Text>
          {entries.length === 0 ? (
            <Text style={styles.historyEmpty}>No readings yet</Text>
          ) : (
            <View style={styles.historyList}>
              {entries.map((e, i) => (
                <View key={i} style={styles.historyRow}>
                  <Text style={styles.historyTime}>{e.time}</Text>
                  <Text style={[styles.historyValue, { color: tracker.color }]}>{e.value}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.sm, paddingVertical: Spacing.md, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  content: { padding: Spacing.base, gap: Spacing.md },
  heroCard: { borderRadius: Radius.xl, padding: Spacing.xl, alignItems: 'center', gap: Spacing.sm },
  heroTitle: { fontSize: Typography.size.xl, fontWeight: '700' },
  heroLatest: { fontSize: Typography.size['2xl'], fontWeight: '700', color: Colors.text, marginTop: Spacing.sm },
  heroLatestLabel: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  logCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, ...Shadow.sm, gap: Spacing.md },
  logTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  logRow: { flexDirection: 'row', gap: Spacing.sm },
  logInput: { flex: 1, borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.md, paddingHorizontal: Spacing.base, paddingVertical: Spacing.md, fontSize: Typography.size.base, color: Colors.text },
  logBtn: { borderRadius: Radius.md, paddingHorizontal: Spacing.lg, justifyContent: 'center' },
  logBtnText: { color: Colors.white, fontWeight: '700' },
  historyTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  historyEmpty: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center', paddingVertical: Spacing.lg },
  historyList: { backgroundColor: Colors.white, borderRadius: Radius.lg, ...Shadow.sm, overflow: 'hidden' },
  historyRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing.base, borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  historyTime: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  historyValue: { fontSize: Typography.size.base, fontWeight: '700' },
});
