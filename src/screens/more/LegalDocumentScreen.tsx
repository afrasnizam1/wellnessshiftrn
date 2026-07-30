import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import AppScreen from '../../components/common/AppScreen';
import { appConfig } from '../../config/appConfig';
import { Screen } from '../../navigation/screenNames';
import {
  AI_DISCLOSURE_SECTIONS,
  HEALTH_DATA_DISCLOSURE_SECTIONS,
  PRIVACY_SECTIONS,
  TERMS_SECTIONS,
  type LegalSection,
} from '../../data/legalContent';

type DocKey = 'privacy' | 'terms' | 'ai' | 'health';

const DOCS: Record<DocKey, { title: string; sections: LegalSection[]; web?: { url: string; label: string } }> = {
  privacy: {
    title: 'Privacy Policy',
    sections: PRIVACY_SECTIONS,
    web: { url: appConfig.privacyPolicyUrl, label: 'View full policy at wellnessshift.co.uk →' },
  },
  terms: {
    title: 'Terms of Service',
    sections: TERMS_SECTIONS,
    web: { url: appConfig.termsOfServiceUrl, label: 'View full terms at wellnessshift.co.uk →' },
  },
  ai: {
    title: 'AI Disclosure',
    sections: AI_DISCLOSURE_SECTIONS,
  },
  health: {
    title: 'Health Data Disclosure',
    sections: HEALTH_DATA_DISCLOSURE_SECTIONS,
  },
};

export default function LegalDocumentScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const docKey = (route.params?.document as DocKey) ?? 'privacy';
  const doc = useMemo(() => DOCS[docKey] ?? DOCS.privacy, [docKey]);

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{doc.title}</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.updated}>Last updated: July 2026</Text>
        {doc.sections.map((s) => (
          <View key={s.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{s.title}</Text>
            <Text style={styles.sectionBody}>{s.body}</Text>
          </View>
        ))}
        {doc.web ? (
          <TouchableOpacity
            style={styles.webLink}
            onPress={() => navigation.navigate(Screen.website, {
              url: doc.web!.url,
              title: doc.title,
            })}
          >
            <Text style={styles.webLinkText}>{doc.web.label}</Text>
          </TouchableOpacity>
        ) : null}
        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: Colors.primary, lineHeight: 38 },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  content: { padding: Spacing.base, gap: Spacing.lg },
  updated: { fontSize: Typography.size.xs, color: Colors.textTertiary },
  section: { gap: Spacing.xs },
  sectionTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  sectionBody: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 22 },
  webLink: {
    backgroundColor: Colors.primaryBg,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    alignItems: 'center',
  },
  webLinkText: { fontSize: Typography.size.sm, color: Colors.primary, fontWeight: '600' },
});
