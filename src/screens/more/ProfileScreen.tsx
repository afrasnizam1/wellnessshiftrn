// src/screens/more/ProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator, Switch, Share,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Gradients } from '../../theme';
import { AppCard, ScreenHeader, ListRow } from '../../components/ui';
import { useAppStore } from '../../store';
import { userService } from '../../services/firebase';
import { deleteCurrentUserAccount } from '../../services/accountDeletion';
import { appConfig } from '../../config/appConfig';
import { contentsquareService } from '../../services/contentsquareService';
import AppScreen from '../../components/common/AppScreen';

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const { user, setUser } = useAppStore();
  const [name, setName] = useState(user?.displayName ?? '');
  const [heightCm, setHeightCm] = useState(user?.heightCm != null ? String(user.heightCm) : '');
  const [weightKg, setWeightKg] = useState(user?.weightKg != null ? String(user.weightKg) : '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!appConfig.enableContentsquare) {
      setAnalyticsLoading(false);
      return;
    }
    contentsquareService.isAnalyticsEnabled().then((enabled) => {
      setAnalyticsEnabled(enabled);
      setAnalyticsLoading(false);
    });
  }, [user?.uid]);

  const handleAnalyticsToggle = async (enabled: boolean) => {
    setAnalyticsEnabled(enabled);
    await contentsquareService.setAnalyticsEnabled(enabled, user, true);
  };

  const handleSave = async () => {
    if (!user || !name.trim()) return;
    const parsedHeight = heightCm.trim() ? Number(heightCm) : undefined;
    const parsedWeight = weightKg.trim() ? Number(weightKg) : undefined;
    if (heightCm.trim() && (!Number.isFinite(parsedHeight) || (parsedHeight ?? 0) <= 0)) {
      Alert.alert('Invalid height', 'Enter height in centimetres (e.g. 170).');
      return;
    }
    if (weightKg.trim() && (!Number.isFinite(parsedWeight) || (parsedWeight ?? 0) <= 0)) {
      Alert.alert('Invalid weight', 'Enter weight in kilograms (e.g. 70).');
      return;
    }
    setSaving(true);
    try {
      const patch = {
        displayName: name.trim(),
        heightCm: parsedHeight,
        weightKg: parsedWeight,
      };
      await userService.updateProfile(user.uid, patch);
      setUser({ ...user, ...patch });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      Alert.alert('Error', 'Could not save changes.');
    } finally {
      setSaving(false);
    }
  };

  const handleExportData = async () => {
    if (!user) return;
    const payload = JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        profile: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: user.role,
          createdAt: user.createdAt,
          subscriptionTier: user.subscriptionTier,
          primaryGoal: user.primaryGoal,
          healthGoals: user.healthGoals,
          heightCm: user.heightCm,
          weightKg: user.weightKg,
          dateOfBirth: user.dateOfBirth,
        },
      },
      null,
      2,
    );
    await Share.share({
      message: payload,
      title: 'Wellness Shift data export',
    });
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This permanently removes your account and associated data. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setDeleting(true);
            try {
              await deleteCurrentUserAccount();
            } catch (error: any) {
              Alert.alert('Could not delete account', error?.message ?? 'Please try again.');
            } finally {
              setDeleting(false);
            }
          },
        },
      ],
    );
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <ScreenHeader
          title="My Profile"
          onBack={() => navigation.goBack()}
          rightLabel={saving ? '...' : saved ? 'Saved' : 'Save'}
          onRightPress={handleSave}
          rightDisabled={saving}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarSection}>
          <LinearGradient colors={[...Gradients.brand]} style={styles.avatar}>
            <Text style={styles.avatarLetter}>{(name[0] || 'P').toUpperCase()}</Text>
          </LinearGradient>
          <Text style={styles.avatarHint}>Profile photo coming soon</Text>
        </View>

        <AppCard>
          <Text style={styles.fieldLabel}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor={Colors.textTertiary}
            autoCapitalize="words"
          />
          <Text style={styles.fieldLabel}>Email</Text>
          <View style={styles.emailRow}>
            <Text style={styles.emailValue}>{user?.email}</Text>
            <View style={styles.lockedBadge}>
              <Ionicons name="lock-closed-outline" size={12} color={Colors.textTertiary} />
              <Text style={styles.emailLocked}>Locked</Text>
            </View>
          </View>
          <Text style={styles.fieldLabel}>Account Type</Text>
          <Text style={styles.accountType}>
            {user?.role === 'clinician' ? 'Clinician' : 'Patient'}
          </Text>
        </AppCard>

        <AppCard>
          <Text style={styles.sectionTitle}>Body metrics</Text>
          <Text style={styles.analyticsHint}>
            Used for BMI and health calculators. You can also set these during onboarding.
          </Text>
          <Text style={[styles.fieldLabel, { marginTop: Spacing.md }]}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            value={heightCm}
            onChangeText={setHeightCm}
            placeholder="e.g. 170"
            placeholderTextColor={Colors.textTertiary}
            keyboardType="decimal-pad"
          />
          <Text style={styles.fieldLabel}>Weight (kg)</Text>
          <TextInput
            style={[styles.input, { marginBottom: 0 }]}
            value={weightKg}
            onChangeText={setWeightKg}
            placeholder="e.g. 70"
            placeholderTextColor={Colors.textTertiary}
            keyboardType="decimal-pad"
          />
        </AppCard>

        {appConfig.enableContentsquare ? (
          <AppCard>
            <Text style={styles.sectionTitle}>Analytics & Session Replay</Text>
            <Text style={styles.analyticsHint}>
              Usage analytics and session replay are on by default. Turn this off anytime to stop collection.
            </Text>
            <View style={styles.analyticsRow}>
              <Text style={styles.dataRowText}>Allow analytics</Text>
              {analyticsLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Switch
                  value={analyticsEnabled}
                  onValueChange={handleAnalyticsToggle}
                  trackColor={{ false: Colors.border, true: 'rgba(242, 77, 128, 0.35)' }}
                  thumbColor={analyticsEnabled ? Colors.brand : Colors.textTertiary}
                />
              )}
            </View>
          </AppCard>
        ) : null}

        <AppCard padded={false}>
          <Text style={[styles.sectionTitle, styles.sectionTitleInset]}>Data & Privacy</Text>
          {[
            { label: 'Download my data', icon: 'download-outline' as const, action: handleExportData },
            {
              label: deleting ? 'Deleting…' : 'Delete my account',
              icon: 'trash-outline' as const,
              destructive: true,
              action: handleDeleteAccount,
            },
          ].map((row, index, arr) => (
            <ListRow
              key={row.label}
              title={row.label}
              icon={<Ionicons name={row.icon} size={20} color={row.destructive ? Colors.error : Colors.primary} />}
              iconBg={row.destructive ? 'rgba(255, 59, 48, 0.1)' : Colors.primaryLight}
              onPress={row.action}
              showDivider={index < arr.length - 1}
            />
          ))}
        </AppCard>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.base },
  content: { padding: Spacing.base, gap: Spacing.md },
  avatarSection: { alignItems: 'center', paddingVertical: Spacing.lg, gap: Spacing.sm },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: { fontSize: Typography.size['3xl'], fontWeight: '700', color: Colors.white },
  avatarHint: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  fieldLabel: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.xs,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    fontSize: Typography.size.base,
    color: Colors.text,
    backgroundColor: Colors.surfaceSecondary,
    marginBottom: Spacing.md,
  },
  emailRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.md },
  emailValue: { fontSize: Typography.size.base, color: Colors.textSecondary, flex: 1 },
  lockedBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  emailLocked: { fontSize: Typography.size.xs, color: Colors.textTertiary },
  accountType: { fontSize: Typography.size.base, color: Colors.text, fontWeight: '600' },
  sectionTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text, letterSpacing: -0.3 },
  sectionTitleInset: { paddingHorizontal: Spacing.base, paddingTop: Spacing.base, paddingBottom: Spacing.sm },
  analyticsHint: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  analyticsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: Spacing.sm },
  dataRowText: { fontSize: Typography.size.base, color: Colors.text },
});
