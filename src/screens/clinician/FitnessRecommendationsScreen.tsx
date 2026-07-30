import React, { useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import type { ClinicianStackParamList } from '../../types';
import { useAppStore } from '../../store';
import { clinicianService } from '../../services/clinicianService';
import { FITNESS_MODULES } from '../../data/fitnessData';
import AppScreen from '../../components/common/AppScreen';

type Route = RouteProp<ClinicianStackParamList, typeof Screen.fitnessRecommendations>;

const PICKABLE = FITNESS_MODULES.filter(
  (m) => ['brainGames', 'calculators', 'mindBody', 'education'].includes(m.category)
).slice(0, 24);

export default function FitnessRecommendationsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<Route>();
  const { patient } = route.params;
  const { user } = useAppStore();
  const [selected, setSelected] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  const toggle = (id: string) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const save = async () => {
    if (!user || selected.length === 0) {
      Alert.alert('Select modules', 'Choose at least one Fitness Hub module.');
      return;
    }
    setSaving(true);
    try {
      await clinicianService.saveFitnessHubRecommendations({
        clinicianId: user.uid,
        clinicianName: user.displayName,
        patientId: patient.uid,
        patientName: patient.displayName,
        moduleIds: selected,
        personalNote: note.trim() || undefined,
      });
      Alert.alert('Sent', `Recommendations sent to ${patient.displayName}.`, [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert('Error', 'Could not save recommendations.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fitness recommendations</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>For {patient.displayName} · {selected.length} selected</Text>

        <TextInput
          style={styles.noteInput}
          value={note}
          onChangeText={setNote}
          placeholder="Personal note (optional)"
          placeholderTextColor={Colors.textTertiary}
          multiline
        />

        {PICKABLE.map((m) => {
          const on = selected.includes(m.id);
          return (
            <TouchableOpacity
              key={m.id}
              style={[styles.moduleRow, on && styles.moduleRowOn]}
              onPress={() => toggle(m.id)}
            >
              <Text style={styles.moduleIcon}>{m.icon}</Text>
              <View style={styles.moduleInfo}>
                <Text style={styles.moduleTitle}>{m.title}</Text>
                <Text style={styles.moduleSub} numberOfLines={1}>{m.subtitle}</Text>
              </View>
              <Text style={styles.check}>{on ? '✓' : '○'}</Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity style={[styles.saveBtn, saving && { opacity: 0.6 }]} onPress={save} disabled={saving}>
          {saving ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.saveBtnText}>Send recommendations</Text>}
        </TouchableOpacity>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: Colors.primary, lineHeight: 38 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  content: { padding: Spacing.base, gap: Spacing.sm, paddingBottom: Spacing.xl },
  subtitle: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginBottom: Spacing.sm },
  noteInput: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md,
    padding: Spacing.base, minHeight: 72, color: Colors.text, backgroundColor: Colors.white,
    textAlignVertical: 'top', marginBottom: Spacing.sm,
  },
  moduleRow: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, ...Shadow.sm,
  },
  moduleRowOn: { borderWidth: 2, borderColor: Colors.primary },
  moduleIcon: { fontSize: 22 },
  moduleInfo: { flex: 1 },
  moduleTitle: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.text },
  moduleSub: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  check: { fontSize: 18, color: Colors.primary, fontWeight: '700' },
  saveBtn: {
    backgroundColor: Colors.accent, borderRadius: Radius.xl,
    paddingVertical: Spacing.base, alignItems: 'center', marginTop: Spacing.md,
  },
  saveBtnText: { color: Colors.white, fontWeight: '700' },
});
