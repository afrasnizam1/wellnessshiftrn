import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Modal, ScrollView, Switch, TouchableOpacity,
} from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import {
  analyticsCustomizationStorage,
  DEFAULT_ANALYTICS_CUSTOMIZATION,
  type AnalyticsCustomization,
} from '../../services/analyticsCustomizationStorage';

type Props = {
  visible: boolean;
  onClose: () => void;
};

function Stepper({
  label, value, min, max, step, suffix, onChange,
}: {
  label: string; value: number; min: number; max: number; step: number; suffix: string;
  onChange: (v: number) => void;
}) {
  return (
    <View style={styles.stepperRow}>
      <Text style={styles.stepperLabel}>{label}</Text>
      <View style={styles.stepperControls}>
        <TouchableOpacity
          style={styles.stepperBtn}
          onPress={() => onChange(Math.max(min, value - step))}
        >
          <Text style={styles.stepperBtnText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.stepperValue}>{value}{suffix}</Text>
        <TouchableOpacity
          style={styles.stepperBtn}
          onPress={() => onChange(Math.min(max, value + step))}
        >
          <Text style={styles.stepperBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function AnalyticsCustomizationModal({ visible, onClose }: Props) {
  const [prefs, setPrefs] = useState<AnalyticsCustomization>(DEFAULT_ANALYTICS_CUSTOMIZATION);

  useEffect(() => {
    if (visible) analyticsCustomizationStorage.get().then(setPrefs);
  }, [visible]);

  const toggle = (key: keyof AnalyticsCustomization) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  };

  const save = async () => {
    await analyticsCustomizationStorage.save(prefs);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.safe}>
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={onClose}><Text style={styles.link}>Cancel</Text></TouchableOpacity>
          <Text style={styles.title}>Customize Analytics</Text>
          <TouchableOpacity onPress={save}><Text style={styles.link}>Done</Text></TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.section}>Sections</Text>
          {([
            ['showSleepAnalysis', 'Sleep Analysis'],
            ['showMoodStress', 'Mood & Stress'],
            ['showActivityBreakdown', 'Activity Breakdown'],
            ['showActivityConsistency', 'Activity Consistency'],
            ['showRecoveryBalance', 'Recovery Balance'],
            ['showCardioLoad', 'Cardio Load'],
            ['showAIInsights', 'AI Insights'],
            ['showGoalsProgress', 'Goals Progress'],
            ['showHabits', 'Habits'],
          ] as const).map(([key, label]) => (
            <View key={key} style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>{label}</Text>
              <Switch
                value={prefs[key]}
                onValueChange={() => toggle(key)}
                trackColor={{ true: Colors.primaryLight, false: Colors.borderLight }}
                thumbColor={prefs[key] ? Colors.primary : Colors.surface}
              />
            </View>
          ))}

          <Text style={styles.section}>Daily Goals</Text>
          <Stepper label="Steps" value={prefs.stepsGoal} min={1000} max={30000} step={500} suffix="" onChange={(v) => setPrefs((p) => ({ ...p, stepsGoal: v }))} />
          <Stepper label="Active calories" value={prefs.caloriesGoal} min={100} max={2000} step={50} suffix=" kcal" onChange={(v) => setPrefs((p) => ({ ...p, caloriesGoal: v }))} />
          <Stepper label="Exercise minutes" value={prefs.exerciseGoal} min={10} max={180} step={5} suffix=" min" onChange={(v) => setPrefs((p) => ({ ...p, exerciseGoal: v }))} />
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  toolbar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.borderLight,
  },
  title: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  link: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.primary },
  content: { padding: Spacing.base, paddingBottom: Spacing['3xl'] },
  section: {
    fontSize: Typography.size.xs, fontWeight: '700', color: Colors.textSecondary,
    textTransform: 'uppercase', letterSpacing: 0.6, marginTop: Spacing.md, marginBottom: Spacing.sm,
  },
  toggleRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: Colors.surface, borderRadius: Radius.lg,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md, marginBottom: Spacing.sm,
  },
  toggleLabel: { fontSize: Typography.size.base, color: Colors.text },
  stepperRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: Colors.surface, borderRadius: Radius.lg,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md, marginBottom: Spacing.sm,
  },
  stepperLabel: { fontSize: Typography.size.base, color: Colors.text, flex: 1 },
  stepperControls: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  stepperBtn: {
    width: 32, height: 32, borderRadius: 8, backgroundColor: Colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
  },
  stepperBtnText: { fontSize: 18, fontWeight: '700', color: Colors.primary },
  stepperValue: { minWidth: 72, textAlign: 'center', fontSize: Typography.size.sm, fontWeight: '700', color: Colors.text },
});
