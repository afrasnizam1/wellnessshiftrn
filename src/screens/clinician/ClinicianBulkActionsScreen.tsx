import React, { useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import AppScreen from '../../components/common/AppScreen';

const ACTIONS = [
  { id: 'message', icon: '💬', title: 'Send bulk message', desc: 'Message all selected patients' },
  { id: 'plan', icon: '📋', title: 'Assign care plan', desc: 'Apply a template to multiple patients' },
  { id: 'reminder', icon: '🔔', title: 'Send check-in reminder', desc: 'Nudge patients who haven’t logged in' },
  { id: 'export', icon: '📤', title: 'Export summaries', desc: 'Download wellness summaries (CSV)' },
];

export default function ClinicianBulkActionsScreen() {
  const navigation = useNavigation<any>();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const run = () => {
    if (!selected.length) {
      Alert.alert('Select actions', 'Choose at least one bulk action.');
      return;
    }
    Alert.alert('Queued', `${selected.length} bulk action(s) will run when Firebase sync is enabled.`);
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bulk Actions</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.intro}>Select actions to apply to multiple linked patients at once.</Text>
        {ACTIONS.map((a) => (
          <TouchableOpacity
            key={a.id}
            style={[styles.card, selected.includes(a.id) && styles.cardSelected]}
            onPress={() => toggle(a.id)}
          >
            <Text style={styles.icon}>{a.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{a.title}</Text>
              <Text style={styles.desc}>{a.desc}</Text>
            </View>
            <Text style={styles.check}>{selected.includes(a.id) ? '✓' : '○'}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.runBtn} onPress={run}>
          <Text style={styles.runBtnText}>Run selected actions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(Screen.clinicianTabs, { screen: Screen.patients })}>
          <Text style={styles.link}>Select patients from list →</Text>
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
  intro: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  card: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, ...Shadow.sm, borderWidth: 2, borderColor: 'transparent' },
  cardSelected: { borderColor: Colors.primary + '55', backgroundColor: Colors.primaryBg },
  icon: { fontSize: 28 },
  title: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  desc: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
  check: { fontSize: 20, color: Colors.primary, fontWeight: '700' },
  runBtn: { backgroundColor: Colors.primary, borderRadius: Radius.xl, paddingVertical: Spacing.base, alignItems: 'center' },
  runBtnText: { color: Colors.white, fontWeight: '700', fontSize: Typography.size.base },
  link: { textAlign: 'center', color: Colors.primary, fontWeight: '600', fontSize: Typography.size.sm },
});
