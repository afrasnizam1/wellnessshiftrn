// src/screens/more/PrivacyScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import AppScreen from '../../components/common/AppScreen';
import { appConfig } from '../../config/appConfig';
import { Screen } from '../../navigation/screenNames';
import { PRIVACY_SECTIONS } from '../../data/legalContent';

export default function PrivacyScreen() {
  const navigation = useNavigation<any>();
  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.updated}>Last updated: July 2026</Text>
        {PRIVACY_SECTIONS.map((s) => (
          <View key={s.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{s.title}</Text>
            <Text style={styles.sectionBody}>{s.body}</Text>
          </View>
        ))}
        <TouchableOpacity
          style={styles.webLink}
          onPress={() => navigation.navigate(Screen.website, {
            url: appConfig.privacyPolicyUrl,
            title: 'Privacy Policy',
          })}
        >
          <Text style={styles.webLinkText}>View website policy at wellnessshift.co.uk →</Text>
        </TouchableOpacity>
        <Text style={styles.webNote}>
          The in-app policy above is the mobile-specific disclosure (HealthKit, IAP, Crashlytics, Contentsquare). Keep the website policy aligned before App Store review.
        </Text>
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
  content: { padding: Spacing.base, gap: Spacing.lg },
  updated: { fontSize: Typography.size.xs, color: Colors.textTertiary },
  section: { gap: Spacing.xs },
  sectionTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  sectionBody: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 22 },
  webLink: { backgroundColor: Colors.primaryBg, borderRadius: Radius.lg, padding: Spacing.base, alignItems: 'center' },
  webLinkText: { fontSize: Typography.size.sm, color: Colors.primary, fontWeight: '600' },
  webNote: { fontSize: Typography.size.xs, color: Colors.textTertiary, lineHeight: 18 },
});
