import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,
  ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { useAppStore } from '../../store';
import { clinicianService } from '../../services/clinicianService';
import { BrandButton } from '../../components/ui';
import { LegalCheckboxRow } from '../../components/legal';
import {
  CLINICIAN_ACKNOWLEDGMENTS,
  CLINICIAN_PLATFORM_STATEMENT,
  REGISTRATION_BODIES,
} from '../../data/legalContent';
import AppScreen from '../../components/common/AppScreen';

const SPECIALTIES = [
  'General Practice', 'Dermatology', 'Cardiology', 'Physiotherapy', 'Psychiatry',
  'Nutrition', 'Sports Medicine', 'Other',
];

const SCOPE_OPTIONS = ['Selective', 'Guided'] as const;

const UK_REGIONS = ['England', 'Scotland', 'Wales', 'Northern Ireland'] as const;

export default function ClinicianOnboardingScreen() {
  const { user, setClinicianProfileReady } = useAppStore();
  const [step, setStep] = useState(0);
  const [specialty, setSpecialty] = useState('General Practice');
  const [scopeOfPractice, setScopeOfPractice] = useState<(typeof SCOPE_OPTIONS)[number]>('Selective');
  const [practiceRegion, setPracticeRegion] = useState<(typeof UK_REGIONS)[number]>('England');
  const [practiceCounty, setPracticeCounty] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [registrationBody, setRegistrationBody] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [acks, setAcks] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);

  const toggleAck = (id: string) => {
    setAcks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allAcknowledged = CLINICIAN_ACKNOWLEDGMENTS.every((item) => acks[item.id]);
  const profileValid = clinicName.trim().length > 0;
  const registrationValid = registrationBody.length > 0 && registrationNumber.trim().length > 0;
  const legalValid = allAcknowledged && registrationValid;

  const finish = async () => {
    if (!user || !profileValid || !legalValid) return;
    setSaving(true);
    try {
      const now = new Date().toISOString();
      const parts = user.displayName.split(' ');
      const regInfo = `${registrationBody}: ${registrationNumber.trim()}`;
      const statesOfPractice = [
        ...(practiceCounty.trim() ? [practiceCounty.trim()] : []),
        practiceRegion,
      ];
      await clinicianService.saveClinicianProfile(user.uid, {
        firstName: parts[0],
        lastName: parts.slice(1).join(' ') || undefined,
        specialty,
        scopeOfPractice,
        statesOfPractice,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'Europe/London',
        role: 'Physician',
        clinicName: clinicName.trim(),
        licenseNumber: `Reg: ${regInfo}`,
        workEmail: user.email,
        languagesSpoken: ['English'],
        communicationPreferences: [],
        onboardingCompleted: true,
        onboardingCompletedAt: now,
      });
      setClinicianProfileReady(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.progressRow}>
        {[0, 1].map((i) => (
          <View key={i} style={[styles.progressDot, i <= step && styles.progressDotActive]} />
        ))}
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {step === 0 ? (
            <>
              <IconBadgeHeader icon="medkit-outline" />
              <Text style={styles.title}>Set up your clinician profile</Text>
              <Text style={styles.subtitle}>
                This helps patients recognise you when they connect. You can update this later in Settings.
              </Text>

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

              <Text style={styles.label}>Scope of practice</Text>
              <View style={styles.chipRow}>
                {SCOPE_OPTIONS.map((scope) => (
                  <TouchableOpacity
                    key={scope}
                    style={[styles.chip, scopeOfPractice === scope && styles.chipOn]}
                    onPress={() => setScopeOfPractice(scope)}
                  >
                    <Text style={[styles.chipText, scopeOfPractice === scope && styles.chipTextOn]}>{scope}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Practice region</Text>
              <View style={styles.chipRow}>
                {UK_REGIONS.map((region) => (
                  <TouchableOpacity
                    key={region}
                    style={[styles.chip, practiceRegion === region && styles.chipOn]}
                    onPress={() => setPracticeRegion(region)}
                  >
                    <Text style={[styles.chipText, practiceRegion === region && styles.chipTextOn]}>{region}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>County / area (optional)</Text>
              <TextInput
                style={styles.input}
                value={practiceCounty}
                onChangeText={setPracticeCounty}
                placeholder="e.g. Bedfordshire"
                placeholderTextColor={Colors.textTertiary}
                autoCapitalize="words"
              />
            </>
          ) : (
            <>
              <IconBadgeHeader icon="shield-checkmark-outline" />
              <Text style={styles.title}>Professional registration & responsibilities</Text>
              <Text style={styles.subtitle}>
                To use this platform you must be registered with a UK professional regulatory body and acknowledge your responsibilities.
              </Text>

              <View style={styles.statementCard}>
                <Ionicons name="information-circle-outline" size={20} color={Colors.purple} />
                <Text style={styles.statementText}>{CLINICIAN_PLATFORM_STATEMENT}</Text>
              </View>

              <Text style={styles.label}>Registration body</Text>
              <View style={styles.chipRow}>
                {REGISTRATION_BODIES.map((body) => (
                  <TouchableOpacity
                    key={body.id}
                    style={[styles.chip, registrationBody === body.id && styles.chipOn]}
                    onPress={() => setRegistrationBody(body.id)}
                  >
                    <Text style={[styles.chipText, registrationBody === body.id && styles.chipTextOn]}>
                      {body.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Registration number</Text>
              <TextInput
                style={styles.input}
                value={registrationNumber}
                onChangeText={setRegistrationNumber}
                placeholder="Your GMC / HCPC / NMC number"
                placeholderTextColor={Colors.textTertiary}
                autoCapitalize="characters"
              />

              <Text style={styles.label}>Professional acknowledgments</Text>
              {CLINICIAN_ACKNOWLEDGMENTS.map((item) => (
                <LegalCheckboxRow
                  key={item.id}
                  checked={!!acks[item.id]}
                  onToggle={() => toggleAck(item.id)}
                  title={item.title}
                  description={item.description}
                  style={{ marginBottom: Spacing.sm }}
                />
              ))}
            </>
          )}
        </ScrollView>

        <View style={styles.footer}>
          {step > 0 ? (
            <TouchableOpacity style={styles.backBtn} onPress={() => setStep(0)}>
              <Text style={styles.backBtnText}>Back</Text>
            </TouchableOpacity>
          ) : null}
          {step === 0 ? (
            <BrandButton
              label="Next"
              onPress={() => setStep(1)}
              disabled={!profileValid}
              style={{ flex: 1 }}
            />
          ) : (
            <BrandButton
              label="Continue to portal"
              onPress={finish}
              disabled={!legalValid || saving}
              loading={saving}
              style={{ flex: 1 }}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}

function IconBadgeHeader({ icon }: { icon: keyof typeof Ionicons.glyphMap }) {
  return (
    <View style={styles.iconHeader}>
      <Ionicons name={icon} size={32} color={Colors.purple} />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  progressRow: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  progressDot: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
  },
  progressDotActive: { backgroundColor: Colors.primary },
  content: { padding: Spacing.xl, gap: Spacing.md, paddingBottom: Spacing.xl },
  iconHeader: {
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  title: { fontSize: Typography.size['2xl'], fontWeight: '800', color: Colors.text, textAlign: 'center' },
  subtitle: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center', lineHeight: 20 },
  label: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.text, marginTop: Spacing.sm },
  input: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    fontSize: Typography.size.base,
    color: Colors.text,
    backgroundColor: Colors.white,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.xl,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipOn: { backgroundColor: Colors.primaryBg, borderColor: Colors.primary },
  chipText: { fontSize: Typography.size.xs, color: Colors.textSecondary, fontWeight: '600' },
  chipTextOn: { color: Colors.primary },
  statementCard: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'flex-start',
    backgroundColor: Colors.primaryBg,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: 'rgba(140, 89, 191, 0.14)',
  },
  statementText: { flex: 1, fontSize: Typography.size.sm, color: Colors.text, lineHeight: 20 },
  footer: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.base,
    paddingBottom: Spacing.xl,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.borderLight,
    backgroundColor: Colors.background,
  },
  backBtn: {
    flex: 1,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.base,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  backBtnText: { color: Colors.text, fontWeight: '600' },
});
