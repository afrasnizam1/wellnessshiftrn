import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { useAppStore } from '../../store';
import { clinicianService } from '../../services/clinicianService';
import AppScreen from '../../components/common/AppScreen';

const SPECIALTIES = [
  'General Practice', 'Cardiology', 'Physiotherapy', 'Psychiatry',
  'Nutrition', 'Sports Medicine', 'Other',
];

export default function ClinicianEditProfileScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAppStore();
  const [specialty, setSpecialty] = useState('General Practice');
  const [clinicName, setClinicName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  React.useEffect(() => {
    if (!user) return;
    clinicianService.getClinicianProfile(user.uid).then((profile) => {
      if (profile) {
        setSpecialty(profile.specialty || 'General Practice');
        setClinicName(profile.clinicName || '');
        setLicenseNumber(profile.licenseNumber || '');
      }
      setLoaded(true);
    });
  }, [user?.uid]);

  const save = async () => {
    if (!user || !clinicName.trim()) return;
    setSaving(true);
    try {
      const parts = user.displayName.split(' ');
      const existing = await clinicianService.getClinicianProfile(user.uid);
      await clinicianService.saveClinicianProfile(user.uid, {
        firstName: existing?.firstName ?? parts[0],
        lastName: existing?.lastName ?? (parts.slice(1).join(' ') || undefined),
        specialty,
        clinicName: clinicName.trim(),
        licenseNumber: licenseNumber.trim() || undefined,
        workEmail: user.email,
        onboardingCompleted: true,
        onboardingCompletedAt: existing?.onboardingCompletedAt ?? new Date().toISOString(),
      });
      navigation.goBack();
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) {
    return (
      <AppScreen style={[styles.safe, styles.centered]}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </AppScreen>
    );
  }

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.label}>Practice / clinic name</Text>
          <TextInput
            style={styles.input}
            value={clinicName}
            onChangeText={setClinicName}
            placeholder="e.g. Riverside Medical Centre"
            placeholderTextColor={Colors.textTertiary}
          />

          <Text style={styles.label}>Specialty</Text>
          <View style={styles.chipRow}>
            {SPECIALTIES.map((s) => (
              <TouchableOpacity
                key={s}
                style={[styles.chip, specialty === s && styles.chipOn]}
                onPress={() => setSpecialty(s)}
              >
                <Text style={[styles.chipText, specialty === s && styles.chipTextOn]}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>License / registration (optional)</Text>
          <TextInput
            style={styles.input}
            value={licenseNumber}
            onChangeText={setLicenseNumber}
            placeholder="GMC / HCPC number"
            placeholderTextColor={Colors.textTertiary}
            autoCapitalize="characters"
          />

          <TouchableOpacity
            style={[styles.saveBtn, (!clinicName.trim() || saving) && styles.btnDisabled]}
            onPress={save}
            disabled={!clinicName.trim() || saving}
          >
            {saving
              ? <ActivityIndicator color={Colors.white} />
              : <Text style={styles.saveBtnText}>Save Changes</Text>
            }
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  centered: { justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: Colors.primary, lineHeight: 38 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  content: { padding: Spacing.base, gap: Spacing.md },
  label: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.text },
  input: {
    backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base,
    borderWidth: 1, borderColor: Colors.border, fontSize: Typography.size.base, color: Colors.text,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  chip: {
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
    borderRadius: Radius.xl, backgroundColor: Colors.surfaceSecondary,
  },
  chipOn: { backgroundColor: Colors.primary },
  chipText: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  chipTextOn: { color: Colors.white, fontWeight: '600' },
  saveBtn: {
    backgroundColor: Colors.primary, borderRadius: Radius.xl,
    paddingVertical: Spacing.base, alignItems: 'center', marginTop: Spacing.md,
  },
  btnDisabled: { opacity: 0.6 },
  saveBtnText: { color: Colors.white, fontSize: Typography.size.base, fontWeight: '700' },
});
