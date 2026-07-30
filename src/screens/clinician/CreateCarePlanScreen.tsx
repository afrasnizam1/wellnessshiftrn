import React, { useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import type { ClinicianStackParamList } from '../../types';
import { useAppStore } from '../../store';
import { clinicianService } from '../../services/clinicianService';
import AppScreen from '../../components/common/AppScreen';

type Route = RouteProp<ClinicianStackParamList, typeof Screen.createCarePlan>;

export default function CreateCarePlanScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<Route>();
  const { patient } = route.params;
  const { user } = useAppStore();
  const [planName, setPlanName] = useState('Personalised wellness plan');
  const [description, setDescription] = useState('');
  const [personalNote, setPersonalNote] = useState('');
  const [tasks, setTasks] = useState(['Complete daily check-in', 'Follow daily plan tasks']);
  const [newTask, setNewTask] = useState('');
  const [saving, setSaving] = useState(false);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((t) => [...t, newTask.trim()]);
    setNewTask('');
  };

  const save = async () => {
    if (!user || !planName.trim()) return;
    setSaving(true);
    try {
      await clinicianService.createCustomCarePlan({
        clinicianId: user.uid,
        clinicianName: user.displayName,
        patientId: patient.uid,
        planName: planName.trim(),
        description: description.trim() || 'Care plan from your clinician.',
        personalNote: personalNote.trim() || undefined,
        taskTitles: tasks,
      });
      Alert.alert('Sent', `Care plan sent to ${patient.displayName}.`, [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert('Error', 'Could not save care plan.');
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
        <Text style={styles.headerTitle}>Create care plan</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>For {patient.displayName}</Text>

        <Text style={styles.fieldLabel}>Plan name</Text>
        <TextInput style={styles.input} value={planName} onChangeText={setPlanName} />

        <Text style={styles.fieldLabel}>Description</Text>
        <TextInput style={[styles.input, styles.multiline]} value={description} onChangeText={setDescription} multiline />

        <Text style={styles.fieldLabel}>Personal note (optional)</Text>
        <TextInput style={[styles.input, styles.multiline]} value={personalNote} onChangeText={setPersonalNote} multiline />

        <Text style={styles.fieldLabel}>Tasks</Text>
        {tasks.map((t, i) => (
          <View key={`${t}-${i}`} style={styles.taskRow}>
            <Text style={styles.taskText}>• {t}</Text>
            <TouchableOpacity onPress={() => setTasks((all) => all.filter((_, j) => j !== i))}>
              <Text style={styles.remove}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.addRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={newTask}
            onChangeText={setNewTask}
            placeholder="Add a task…"
            placeholderTextColor={Colors.textTertiary}
          />
          <TouchableOpacity style={styles.addBtn} onPress={addTask}>
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.saveBtn, saving && { opacity: 0.6 }]} onPress={save} disabled={saving}>
          {saving ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.saveBtnText}>Send care plan</Text>}
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
  content: { padding: Spacing.base, gap: Spacing.md, paddingBottom: Spacing.xl },
  label: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  fieldLabel: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.text },
  input: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md, color: Colors.text,
    backgroundColor: Colors.white,
  },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
  taskRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingVertical: Spacing.xs },
  taskText: { flex: 1, fontSize: Typography.size.sm, color: Colors.text },
  remove: { color: Colors.error, padding: 4 },
  addRow: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'center' },
  addBtn: { backgroundColor: Colors.primaryBg, paddingHorizontal: Spacing.base, paddingVertical: Spacing.md, borderRadius: Radius.md },
  addBtnText: { color: Colors.primary, fontWeight: '700' },
  saveBtn: {
    backgroundColor: Colors.accent, borderRadius: Radius.xl,
    paddingVertical: Spacing.base, alignItems: 'center', marginTop: Spacing.md,
  },
  saveBtnText: { color: Colors.white, fontWeight: '700', fontSize: Typography.size.base },
});
