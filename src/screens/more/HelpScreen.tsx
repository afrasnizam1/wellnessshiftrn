// src/screens/more/HelpScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import AppScreen from '../../components/common/AppScreen';

const FAQS = [
  { q: 'What is my wellness score?', a: 'Your wellness score (0–10) is calculated from your assessment answers, daily task completion, Apple Health data, and AI Insights activity across 10 health categories.' },
  { q: 'How do I improve my score?', a: 'Complete daily plan tasks, engage with AI Insights, use Fitness Hub modules, and connect Apple Health for automatic activity tracking.' },
  { q: 'How do I connect my clinician?', a: 'Clinician connection is only for patients who have a health issue and whose GP has referred them to a clinician on Wellness Shift. Ask that clinician for their invite code, then go to My Care → Connect and enter it. If you have not been GP-referred, you can use the rest of the app without linking a clinician.' },
  { q: 'Who can use clinician features?', a: 'Only patients with a specific health concern who have been referred by their GP. This is not a drop-in booking service for general wellness questions.' },
  { q: 'Is my data shared with anyone?', a: 'Your data is only shared with clinicians you explicitly connect with. We never sell or share your health data. See our Privacy Policy for full details.' },
  { q: 'How do I cancel my subscription?', a: 'Cancel anytime via iPhone Settings → Apple ID → Subscriptions → Wellness Shift. You keep access until the period ends.' },
  { q: 'Can I use the app without Apple Health?', a: 'Yes — Apple Health is optional. Connecting it enhances your wellness score with real activity data, but the app works fully without it.' },
  { q: 'What is the AI Health Coach?', a: 'An in-app wellness coach that answers general health and lifestyle questions based on your profile. Free users get a daily message allowance; Growth and Pro increase that allowance. It is not medical advice and does not replace a clinician.' },
  { q: 'Is this a medical service?', a: 'No. Wellness Shift provides wellness support and education only. For medical advice, consult a qualified healthcare professional. Call 999 for emergencies.' },
];

export default function HelpScreen() {
  const navigation = useNavigation<any>();
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & FAQ</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {FAQS.map((faq, i) => (
          <TouchableOpacity key={i} style={styles.faqCard} onPress={() => setExpanded(expanded === i ? null : i)}>
            <View style={styles.faqHeader}>
              <Text style={styles.faqQ}>{faq.q}</Text>
              <Text style={styles.faqIcon}>{expanded === i ? '∧' : '∨'}</Text>
            </View>
            {expanded === i && <Text style={styles.faqA}>{faq.a}</Text>}
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.contactCard} onPress={() => Linking.openURL('mailto:support@wellnessshift.co.uk')}>
          <Text style={styles.contactIcon}>📧</Text>
          <View>
            <Text style={styles.contactTitle}>Still need help?</Text>
            <Text style={styles.contactSub}>support@wellnessshift.co.uk</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
        <View style={{ height: Spacing.xl }} />
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
  faqCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, ...Shadow.sm, gap: Spacing.sm },
  faqHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  faqQ: { flex: 1, fontSize: Typography.size.base, fontWeight: '600', color: Colors.text },
  faqIcon: { fontSize: 16, color: Colors.textTertiary, marginTop: 2 },
  faqA: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  contactCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, backgroundColor: Colors.primaryBg, borderRadius: Radius.lg, padding: Spacing.base, marginTop: Spacing.md },
  contactIcon: { fontSize: 24 },
  contactTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  contactSub: { fontSize: Typography.size.sm, color: Colors.primary },
  chevron: { fontSize: 20, color: Colors.textTertiary, marginLeft: 'auto' as any },
});
