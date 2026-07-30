// src/screens/auth/RoleSelectScreen.tsx
// Standalone role selection — used if navigating here directly.
// In normal flow, role selection is embedded inside SignUpScreen (step 2).
import React, { useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { userService } from '../../services/firebase';
import { useAppStore } from '../../store';
import type { UserRole } from '../../types';
import AppScreen from '../../components/common/AppScreen';

const ROLES: { role: UserRole; icon: string; title: string; desc: string; features: string[]; color: string }[] = [
  {
    role: 'patient',
    icon: '🙋',
    title: 'Patient',
    color: Colors.primary,
    desc: 'I want to track and improve my own wellness',
    features: [
      'Personalised wellness score across 10 categories',
      'Daily plans tailored to your weak areas',
      'AI Health Coach for personalised guidance',
      'Apple Health integration',
      'Connect with your clinician',
    ],
  },
  {
    role: 'clinician',
    icon: '🩺',
    title: 'Clinician / Doctor',
    color: Colors.accent,
    desc: 'I want to support my patients\' wellness journey',
    features: [
      'Patient management portal',
      'Custom care plan creation',
      'Patient progress analytics',
      'Secure messaging with patients',
      'Evidence-based recommendation tools',
    ],
  },
];

export default function RoleSelectScreen() {
  const navigation = useNavigation<any>();
  const { user, setUser } = useAppStore();
  const [selected, setSelected] = useState<UserRole>('patient');
  const [saving, setSaving] = useState(false);

  const handleConfirm = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await userService.updateProfile(user.uid, { role: selected });
      setUser({ ...user, role: selected });
      if (selected === 'patient') {
        navigation.replace(Screen.wellnessQuiz);
      } else {
        // Remount root into clinician onboarding (do not replace Main App here).
        setUser({ ...user, role: 'clinician' });
      }
    } catch {
      setSaving(false);
    }
  };

  return (
    <AppScreen style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>How will you use Wellness Shift?</Text>
          <Text style={styles.subtitle}>We'll personalise your experience based on your role.</Text>
        </View>

        {ROLES.map((r) => (
          <TouchableOpacity
            key={r.role}
            style={[styles.roleCard, selected === r.role && { borderColor: r.color, backgroundColor: r.color + '08' }]}
            onPress={() => setSelected(r.role)}
            activeOpacity={0.85}
          >
            {/* Header row */}
            <View style={styles.roleCardHeader}>
              <View style={[styles.roleIconWrap, { backgroundColor: r.color + '20' }]}>
                <Text style={styles.roleIcon}>{r.icon}</Text>
              </View>
              <View style={styles.roleHeaderText}>
                <Text style={[styles.roleTitle, selected === r.role && { color: r.color }]}>{r.title}</Text>
                <Text style={styles.roleDesc}>{r.desc}</Text>
              </View>
              <View style={[styles.radio, selected === r.role && { borderColor: r.color }]}>
                {selected === r.role && <View style={[styles.radioInner, { backgroundColor: r.color }]} />}
              </View>
            </View>

            {/* Features */}
            {selected === r.role && (
              <View style={styles.featureList}>
                {r.features.map((f) => (
                  <View key={f} style={styles.featureRow}>
                    <Text style={[styles.featureCheck, { color: r.color }]}>✓</Text>
                    <Text style={styles.featureText}>{f}</Text>
                  </View>
                ))}
              </View>
            )}
          </TouchableOpacity>
        ))}

        {selected === 'clinician' && (
          <View style={styles.clinicianNote}>
            <Text style={styles.clinicianNoteText}>
              🔒  Clinician accounts require a verified work email and are subject to additional compliance checks before full access is granted.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.confirmBtn, { backgroundColor: selected === 'clinician' ? Colors.accent : Colors.primary }, saving && { opacity: 0.6 }]}
          onPress={handleConfirm}
          disabled={saving}
        >
          {saving
            ? <ActivityIndicator color={Colors.white} />
            : <Text style={styles.confirmBtnText}>Continue as {selected === 'clinician' ? 'Clinician' : 'Patient'} →</Text>
          }
        </TouchableOpacity>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, gap: Spacing.md },
  header: { paddingVertical: Spacing.lg, gap: Spacing.sm },
  title: { fontSize: Typography.size['2xl'], fontWeight: '700', color: Colors.text },
  subtitle: { fontSize: Typography.size.base, color: Colors.textSecondary },
  roleCard: {
    backgroundColor: Colors.white, borderRadius: Radius.xl,
    borderWidth: 2, borderColor: Colors.border,
    padding: Spacing.base, ...Shadow.sm, gap: Spacing.md,
  },
  roleCardHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  roleIconWrap: { width: 52, height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  roleIcon: { fontSize: 26 },
  roleHeaderText: { flex: 1 },
  roleTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text },
  roleDesc: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginTop: 2 },
  radio: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
  radioInner: { width: 12, height: 12, borderRadius: 6 },
  featureList: { gap: Spacing.sm, paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.borderLight },
  featureRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  featureCheck: { fontSize: Typography.size.sm, fontWeight: '700', width: 16, marginTop: 1 },
  featureText: { flex: 1, fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  clinicianNote: { backgroundColor: '#FFF8E6', borderRadius: Radius.lg, padding: Spacing.base },
  clinicianNoteText: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  confirmBtn: { borderRadius: Radius.xl, paddingVertical: Spacing.base, alignItems: 'center', ...Shadow.md },
  confirmBtnText: { color: Colors.white, fontSize: Typography.size.base, fontWeight: '700' },
});
