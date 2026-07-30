import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { useAppStore } from '../../store';
import AppScreen from '../../components/common/AppScreen';

const DEMO_LOG = [
  { action: 'Viewed patient dashboard', patient: 'Demo Patient', time: 'Today, 09:14' },
  { action: 'Sent care plan', patient: 'Demo Patient', time: 'Yesterday, 16:02' },
  { action: 'Generated invite code', patient: '—', time: 'Mon, 11:30' },
  { action: 'Updated profile', patient: '—', time: 'Sun, 08:45' },
];

export default function ClinicianAuditLogScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAppStore();

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Audit Log</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.intro}>
          Activity log for {user?.displayName ?? 'your account'}. Full audit history syncs when Firebase is enabled.
        </Text>
        {DEMO_LOG.map((entry, i) => (
          <View key={i} style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.action}>{entry.action}</Text>
              <Text style={styles.meta}>{entry.patient} · {entry.time}</Text>
            </View>
          </View>
        ))}
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
  content: { padding: Spacing.base, gap: Spacing.sm },
  intro: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginBottom: Spacing.sm, lineHeight: 20 },
  row: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, ...Shadow.sm },
  action: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.text },
  meta: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 4 },
});
