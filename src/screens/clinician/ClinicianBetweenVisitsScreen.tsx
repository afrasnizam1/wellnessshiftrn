import React from 'react';
import { Screen } from '../../navigation/screenNames';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import AppScreen from '../../components/common/AppScreen';

const RESOURCES = [
  { icon: '📋', title: 'Between-visit checklists', body: 'Send patients daily task reminders via care plans so they stay on track between appointments.' },
  { icon: '💬', title: 'Secure messaging', body: 'Use the inbox for non-urgent questions. Patients see replies in My Care Plan.' },
  { icon: '🆘', title: 'Urgent symptoms', body: 'Direct patients to call 999 or NHS 111 for emergencies — this app is not for urgent care.' },
  { icon: '📚', title: 'Fitness Hub modules', body: 'Recommend breathing, sleep, or nutrition modules from a patient’s profile.' },
  { icon: '📞', title: 'Practice contact', body: 'Add your clinic phone and hours in Profile so patients know how to reach you.' },
];

export default function ClinicianBetweenVisitsScreen() {
  const navigation = useNavigation<any>();

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Between-Visits Support</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {RESOURCES.map((r) => (
          <View key={r.title} style={styles.card}>
            <Text style={styles.icon}>{r.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{r.title}</Text>
              <Text style={styles.body}>{r.body}</Text>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.linkBtn} onPress={() => Linking.openURL('mailto:support@wellnessshift.co.uk')}>
          <Text style={styles.linkText}>Contact Wellness Shift support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkBtn} onPress={() => navigation.navigate(Screen.clinicianHelp)}>
          <Text style={styles.linkText}>Clinician help & FAQ</Text>
        </TouchableOpacity>
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
  card: { flexDirection: 'row', gap: Spacing.md, backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, ...Shadow.sm },
  icon: { fontSize: 28 },
  cardTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  body: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20, marginTop: 4 },
  linkBtn: { alignItems: 'center', paddingVertical: Spacing.sm },
  linkText: { color: Colors.primary, fontWeight: '600', fontSize: Typography.size.sm },
});
