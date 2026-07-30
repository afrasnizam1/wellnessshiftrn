import React, { useCallback, useEffect, useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Share, Switch,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { ClinicianLayout, ClinicianShadow, ClinicianTheme } from '../../theme/clinicianTheme';
import { useAppStore } from '../../store';
import { signOutCurrentUser } from '../../services/authSession';
import { clinicianService } from '../../services/clinicianService';
import { clinicianTriageStorage } from '../../services/clinicianTriageStorage';
import type { ClinicianProfileDoc } from '../../types';
import AppScreen from '../../components/common/AppScreen';
import ClinicianHeroHeader from '../../components/clinician/ClinicianHeroHeader';

function initials(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('');
}

export default function ClinicianSettingsScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAppStore();
  const [profile, setProfile] = useState<ClinicianProfileDoc | null>(null);
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lowScoreThreshold, setLowScoreThreshold] = useState(5);
  const [inactivityDays, setInactivityDays] = useState(7);
  const [messageAlerts, setMessageAlerts] = useState(true);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [p, code, triage] = await Promise.all([
        clinicianService.getClinicianProfile(user.uid),
        clinicianService.ensureInviteCode(user.uid),
        clinicianTriageStorage.get(),
      ]);
      setProfile(p);
      setInviteCode(code);
      setLowScoreThreshold(triage.lowScoreThreshold);
      setInactivityDays(triage.inactivityDays);
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => { load(); }, [load]);

  const saveTriage = async (next: { lowScoreThreshold?: number; inactivityDays?: number }) => {
    await clinicianTriageStorage.save(next);
  };

  const signOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => signOutCurrentUser(user).catch(() => {
          Alert.alert('Sign Out', 'Could not complete sign out. Please try again.');
        }),
      },
    ]);
  };

  if (loading) {
    return (
      <AppScreen style={styles.loading}>
        <ActivityIndicator color={ClinicianTheme.accent} size="large" />
      </AppScreen>
    );
  }

  const displayName = user?.displayName ?? 'Clinician';

  return (
    <View style={styles.root}>
      <ClinicianHeroHeader title="Settings" subtitle="Practice preferences & account" />

      <AppScreen style={styles.body}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.profileCard}>
            <LinearGradient colors={ClinicianTheme.gradient} style={styles.avatar}>
              <Text style={styles.avatarText}>{initials(displayName)}</Text>
            </LinearGradient>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{displayName}</Text>
              <Text style={styles.profileEmail}>{user?.email}</Text>
              <Text style={styles.profileMeta}>
                {profile?.specialty ? `${profile.specialty}` : 'Clinician account'}
                {profile?.clinicName ? ` · ${profile.clinicName}` : ''}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => navigation.navigate(Screen.editClinicianProfile)}
            >
              <Ionicons name="create-outline" size={16} color={ClinicianTheme.accent} />
            </TouchableOpacity>
          </View>

          {inviteCode ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Invite code</Text>
              <TouchableOpacity
                style={styles.codeCard}
                onPress={() => Share.share({ message: `Join my care team on Wellness Shift. Use invite code: ${inviteCode}` })}
              >
                <Text style={styles.codeValue}>{inviteCode}</Text>
                <View style={styles.sharePill}>
                  <Ionicons name="share-outline" size={14} color="#FFF" />
                  <Text style={styles.shareText}>Share</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : null}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Triage rules</Text>
            <View style={styles.card}>
              <Text style={styles.cardHint}>Patients matching these rules appear in your attention queue.</Text>
              <StepperRow
                label="Low score threshold"
                value={`${lowScoreThreshold.toFixed(1)}/10`}
                onDec={() => {
                  const next = Math.max(1, Math.round((lowScoreThreshold - 0.5) * 10) / 10);
                  setLowScoreThreshold(next);
                  saveTriage({ lowScoreThreshold: next });
                }}
                onInc={() => {
                  const next = Math.min(9, Math.round((lowScoreThreshold + 0.5) * 10) / 10);
                  setLowScoreThreshold(next);
                  saveTriage({ lowScoreThreshold: next });
                }}
              />
              <StepperRow
                label="Inactivity alert"
                value={`${inactivityDays} days`}
                onDec={() => {
                  const next = Math.max(3, inactivityDays - 1);
                  setInactivityDays(next);
                  saveTriage({ inactivityDays: next });
                }}
                onInc={() => {
                  const next = Math.min(21, inactivityDays + 1);
                  setInactivityDays(next);
                  saveTriage({ inactivityDays: next });
                }}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            <View style={styles.card}>
              <View style={styles.switchRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowLabel}>Message alerts</Text>
                  <Text style={styles.rowHint}>Push when a patient sends a message</Text>
                </View>
                <Switch
                  value={messageAlerts}
                  onValueChange={setMessageAlerts}
                  trackColor={{ false: Colors.border, true: ClinicianTheme.accent }}
                  thumbColor={Colors.white}
                />
              </View>
            </View>
          </View>

          {profile ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Practice details</Text>
              <View style={styles.card}>
                {[
                  { label: 'Specialty', value: profile.specialty },
                  { label: 'Clinic', value: profile.clinicName },
                  { label: 'License', value: profile.licenseNumber ?? '—' },
                  { label: 'Work email', value: profile.workEmail },
                ].map((row, i, arr) => (
                  <View key={row.label} style={[styles.detailRow, i === arr.length - 1 && styles.detailRowLast]}>
                    <Text style={styles.detailLabel}>{row.label}</Text>
                    <Text style={styles.detailValue}>{row.value}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate(Screen.clinicianHelp)}>
            <View style={styles.linkIcon}>
              <Ionicons name="help-circle-outline" size={20} color={ClinicianTheme.accent} />
            </View>
            <Text style={styles.linkLabel}>Help & support</Text>
            <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.signOutBtn} onPress={signOut}>
            <Ionicons name="log-out-outline" size={18} color={Colors.error} />
            <Text style={styles.signOutText}>Sign out</Text>
          </TouchableOpacity>

          <View style={{ height: ClinicianLayout.tabBarBottomInset }} />
        </ScrollView>
      </AppScreen>
    </View>
  );
}

function StepperRow({
  label, value, onDec, onInc,
}: { label: string; value: string; onDec: () => void; onInc: () => void }) {
  return (
    <View style={styles.stepperRow}>
      <Text style={styles.stepperLabel}>{label}</Text>
      <View style={styles.stepper}>
        <TouchableOpacity style={styles.stepperBtn} onPress={onDec}>
          <Ionicons name="remove" size={18} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.stepperValue}>{value}</Text>
        <TouchableOpacity style={styles.stepperBtn} onPress={onInc}>
          <Ionicons name="add" size={18} color={Colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: ClinicianTheme.canvas },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: ClinicianTheme.canvas },
  body: { flex: 1, backgroundColor: ClinicianTheme.canvas },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: ClinicianTheme.surface,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: ClinicianTheme.border,
    ...ClinicianShadow.card,
  },
  avatar: {
    width: 56, height: 56, borderRadius: 28,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 20, fontWeight: '800', color: '#FFF' },
  profileInfo: { flex: 1 },
  profileName: { fontSize: Typography.size.lg, fontWeight: '800', color: Colors.text },
  profileEmail: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginTop: 2 },
  profileMeta: { fontSize: Typography.size.xs, color: ClinicianTheme.accent, fontWeight: '600', marginTop: 4 },
  editBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: ClinicianTheme.accentSoft,
    alignItems: 'center', justifyContent: 'center',
  },
  content: { paddingTop: Spacing.md, gap: Spacing.lg, paddingHorizontal: Spacing.base },
  section: { gap: Spacing.sm },
  sectionTitle: { fontSize: Typography.size.md, fontWeight: '800', color: Colors.text, letterSpacing: -0.3 },
  card: {
    backgroundColor: ClinicianTheme.surface,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: ClinicianTheme.border,
    ...ClinicianShadow.card,
  },
  cardHint: { fontSize: Typography.size.xs, color: Colors.textSecondary, lineHeight: 16 },
  codeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ClinicianTheme.surface,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: ClinicianTheme.border,
    ...ClinicianShadow.card,
  },
  codeValue: { fontSize: Typography.size['2xl'], fontWeight: '800', color: ClinicianTheme.accent, letterSpacing: 4 },
  sharePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: ClinicianTheme.accent,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
  },
  shareText: { color: '#FFF', fontWeight: '700', fontSize: Typography.size.xs },
  stepperRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stepperLabel: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.text, flex: 1 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  stepperBtn: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: ClinicianTheme.accentMuted,
    alignItems: 'center', justifyContent: 'center',
  },
  stepperValue: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.text, minWidth: 72, textAlign: 'center' },
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  rowLabel: { fontSize: Typography.size.base, fontWeight: '600', color: Colors.text },
  rowHint: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
  detailRow: {
    flexDirection: 'row', justifyContent: 'space-between', gap: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: ClinicianTheme.border,
  },
  detailRowLast: { borderBottomWidth: 0 },
  detailLabel: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  detailValue: { flex: 1, textAlign: 'right', fontSize: Typography.size.sm, color: Colors.text, fontWeight: '600' },
  linkRow: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: ClinicianTheme.surface,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: ClinicianTheme.border,
    ...ClinicianShadow.card,
  },
  linkIcon: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: ClinicianTheme.accentMuted,
    alignItems: 'center', justifyContent: 'center',
  },
  linkLabel: { flex: 1, fontSize: Typography.size.base, fontWeight: '600', color: Colors.text },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.error + '12',
    borderRadius: Radius.pill,
    paddingVertical: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.error + '30',
  },
  signOutText: { color: Colors.error, fontSize: Typography.size.base, fontWeight: '700' },
});
