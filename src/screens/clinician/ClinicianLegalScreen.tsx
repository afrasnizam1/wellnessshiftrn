import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import AppScreen from '../../components/common/AppScreen';
import { appConfig } from '../../config/appConfig';
import { Screen } from '../../navigation/screenNames';

const SECTIONS = [
  {
    title: 'Medical disclaimer',
    body: 'Wellness Shift provides wellness education and support tools only. It is not a medical device and does not diagnose, treat, or prescribe. Patients must consult qualified healthcare professionals for medical advice.',
  },
  {
    title: 'Clinician responsibilities',
    body: 'You are responsible for verifying patient identity, obtaining appropriate consent, and ensuring care plans comply with your professional standards and local regulations.',
  },
  {
    title: 'Data & privacy',
    body: 'Patient data is shared only with linked clinicians. See our Privacy Policy for retention, export, and deletion rights.',
  },
  {
    title: 'Emergency',
    body: 'This app is not for emergencies. Patients should call 999 (UK) or their local emergency number.',
  },
];

export default function ClinicianLegalScreen() {
  const navigation = useNavigation<any>();

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Legal & Disclaimers</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {SECTIONS.map((s) => (
          <View key={s.title} style={styles.card}>
            <Text style={styles.cardTitle}>{s.title}</Text>
            <Text style={styles.body}>{s.body}</Text>
          </View>
        ))}
        <TouchableOpacity
          onPress={() => navigation.navigate(Screen.website, {
            url: appConfig.privacyPolicyUrl,
            title: 'Privacy Policy',
          })}
        >
          <Text style={styles.link}>Privacy Policy →</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(Screen.website, {
            url: appConfig.termsOfServiceUrl,
            title: 'Terms of Service',
          })}
        >
          <Text style={styles.link}>Terms of Service →</Text>
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
  card: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, ...Shadow.sm, gap: Spacing.sm },
  cardTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  body: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 22 },
  link: { color: Colors.primary, fontWeight: '600', fontSize: Typography.size.sm, textAlign: 'center', paddingVertical: Spacing.sm },
});
