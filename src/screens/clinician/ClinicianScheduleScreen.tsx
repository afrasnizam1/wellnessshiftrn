import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import AppScreen from '../../components/common/AppScreen';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const SAMPLE = [
  { day: 'Mon', time: '09:00', patient: 'Follow-up call', type: 'Video' },
  { day: 'Wed', time: '14:30', patient: 'Care plan review', type: 'In-app' },
  { day: 'Fri', time: '11:00', patient: 'New patient onboarding', type: 'Call' },
];

export default function ClinicianScheduleScreen() {
  const navigation = useNavigation<any>();
  const [selected, setSelected] = useState('Mon');

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.dayRow}>
            {DAYS.map((d) => (
              <TouchableOpacity
                key={d}
                style={[styles.dayChip, selected === d && styles.dayChipActive]}
                onPress={() => setSelected(d)}
              >
                <Text style={[styles.dayText, selected === d && styles.dayTextActive]}>{d}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        {SAMPLE.filter((s) => s.day === selected).length === 0 ? (
          <Text style={styles.empty}>No appointments on {selected}. Add follow-ups from a patient profile.</Text>
        ) : (
          SAMPLE.filter((s) => s.day === selected).map((s, i) => (
            <View key={i} style={styles.card}>
              <Text style={styles.time}>{s.time}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{s.patient}</Text>
                <Text style={styles.meta}>{s.type}</Text>
              </View>
            </View>
          ))
        )}
        <Text style={styles.hint}>Connect Firebase to sync live calendar data with your practice.</Text>
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
  content: { padding: Spacing.base, gap: Spacing.md },
  dayRow: { flexDirection: 'row', gap: Spacing.sm },
  dayChip: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: Radius.xl, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border },
  dayChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  dayText: { fontWeight: '600', color: Colors.textSecondary },
  dayTextActive: { color: Colors.white },
  card: { flexDirection: 'row', gap: Spacing.md, backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, ...Shadow.sm, alignItems: 'center' },
  time: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.primary, width: 56 },
  cardTitle: { fontSize: Typography.size.base, fontWeight: '600', color: Colors.text },
  meta: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
  empty: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  hint: { fontSize: Typography.size.xs, color: Colors.textTertiary, textAlign: 'center', marginTop: Spacing.md },
});
