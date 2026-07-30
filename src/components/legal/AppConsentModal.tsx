import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { TERMS_SECTIONS, PRIVACY_SECTIONS } from '../../data/legalContent';
import { BrandButton } from '../ui';
import LegalCheckboxRow from './LegalCheckboxRow';

type Props = {
  visible: boolean;
  onClose: () => void;
  onAccept: () => void;
};

export default function AppConsentModal({ visible, onClose, onAccept }: Props) {
  const [tab, setTab] = useState<'terms' | 'privacy'>('terms');
  const [agreed, setAgreed] = useState(false);

  const sections = tab === 'terms' ? TERMS_SECTIONS : PRIVACY_SECTIONS;

  const handleAccept = () => {
    if (!agreed) return;
    setAgreed(false);
    setTab('terms');
    onAccept();
  };

  const handleClose = () => {
    setAgreed(false);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={handleClose}>
      <View style={styles.safe}>
        <View style={styles.toolbar}>
          <Text style={styles.navTitle}>Consent</Text>
          <TouchableOpacity onPress={handleClose} hitSlop={8}>
            <Text style={styles.close}>Close</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tab, tab === 'terms' && styles.tabActive]}
            onPress={() => setTab('terms')}
          >
            <Text style={[styles.tabText, tab === 'terms' && styles.tabTextActive]}>Terms & Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, tab === 'privacy' && styles.tabActive]}
            onPress={() => setTab('privacy')}
          >
            <Text style={[styles.tabText, tab === 'privacy' && styles.tabTextActive]}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>
            {tab === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'}
          </Text>
          {sections.map((section) => (
            <View key={section.title} style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionBody}>{section.body}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <LegalCheckboxRow
            checked={agreed}
            onToggle={() => setAgreed((v) => !v)}
            title="I have read and agree to the Terms of Service and Privacy Policy"
          />
          <BrandButton
            label="Accept & Continue"
            onPress={handleAccept}
            disabled={!agreed}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderLight,
    backgroundColor: Colors.surface,
  },
  navTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  close: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.primary },
  tabRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    padding: Spacing.base,
    backgroundColor: Colors.surface,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
  },
  tabActive: { backgroundColor: Colors.primaryBg },
  tabText: { fontSize: Typography.size.xs, fontWeight: '600', color: Colors.textSecondary },
  tabTextActive: { color: Colors.primary },
  scroll: { padding: Spacing.base, paddingBottom: Spacing.xl, gap: Spacing.sm },
  heading: {
    fontSize: Typography.size.xl,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.sm,
    letterSpacing: -0.3,
  },
  sectionCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
    gap: Spacing.xs,
  },
  sectionTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  sectionBody: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 21 },
  footer: {
    padding: Spacing.base,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.borderLight,
    backgroundColor: Colors.surface,
  },
});
