import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import {
  notificationService,
  notificationPrefsStorage,
  DEFAULT_NOTIFICATION_PREFS,
  type NotificationPrefs,
} from '../../services/notifications';
import AppScreen from '../../components/common/AppScreen';

type ToggleKey = 'dailyPlan' | 'careplan' | 'insights' | 'checkin' | 'milestone' | 'inactivity';

const SETTINGS: { key: ToggleKey; label: string; desc: string; local?: boolean }[] = [
  { key: 'dailyPlan', label: 'Daily Plan Reminders', desc: 'Morning reminder for today\'s tasks (9:00)', local: true },
  { key: 'checkin', label: 'Daily Check-In', desc: 'Morning mood and energy reminder (8:00)', local: true },
  { key: 'careplan', label: 'Care Plan Updates', desc: 'Push when your clinician sends a plan', local: false },
  { key: 'insights', label: 'AI Insights', desc: 'New personalised recommendations', local: false },
  { key: 'milestone', label: 'Milestones & Achievements', desc: 'Celebrate your progress', local: false },
  { key: 'inactivity', label: 'Inactivity Reminders', desc: 'Nudge when you haven\'t opened the app', local: false },
];

export default function NotificationsScreen() {
  const navigation = useNavigation<any>();
  const [settings, setSettings] = useState<NotificationPrefs>(DEFAULT_NOTIFICATION_PREFS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    notificationPrefsStorage.get().then((prefs) => {
      setSettings(prefs);
      setLoading(false);
    });
  }, []);

  const updateSetting = useCallback(async (key: ToggleKey, value: boolean) => {
    const next = { ...settings, [key]: value };
    setSettings(next);
    setSaving(true);
    try {
      await notificationPrefsStorage.save(next);
      await notificationService.syncLocalReminders(next);
    } finally {
      setSaving(false);
    }
  }, [settings]);

  if (loading) {
    return (
      <AppScreen style={[styles.safe, styles.centered]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </AppScreen>
    );
  }

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          {SETTINGS.map((s, i) => (
            <View key={s.key} style={[styles.row, i < SETTINGS.length - 1 && styles.rowBorder]}>
              <View style={styles.rowInfo}>
                <Text style={styles.rowLabel}>{s.label}</Text>
                <Text style={styles.rowDesc}>{s.desc}</Text>
              </View>
              <Switch
                value={Boolean(settings[s.key])}
                onValueChange={(v) => updateSetting(s.key, v)}
                trackColor={{ false: Colors.border, true: Colors.primary }}
                thumbColor={Colors.white}
                disabled={saving}
              />
            </View>
          ))}
        </View>
        <Text style={styles.hint}>
          Daily plan reminders include an evening mindfulness nudge at 20:00. Manage system permissions in Settings → Wellness Shift.
        </Text>
        {saving ? <Text style={styles.saving}>Updating reminders…</Text> : null}
        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  centered: { justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.base, paddingVertical: Spacing.md, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: Colors.primary, lineHeight: 38 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  content: { padding: Spacing.base, gap: Spacing.md },
  card: { backgroundColor: Colors.white, borderRadius: Radius.lg, ...Shadow.sm, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', padding: Spacing.base, gap: Spacing.md },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  rowInfo: { flex: 1 },
  rowLabel: { fontSize: Typography.size.base, fontWeight: '500', color: Colors.text },
  rowDesc: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
  hint: { fontSize: Typography.size.xs, color: Colors.textTertiary, textAlign: 'center', lineHeight: 18 },
  saving: { fontSize: Typography.size.xs, color: Colors.primary, textAlign: 'center' },
});
