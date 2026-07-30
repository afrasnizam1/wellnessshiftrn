import React from 'react';
import {
  View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { MEDICAL_DISCLAIMER_SECTIONS } from '../../data/legalContent';
import { BrandButton } from '../ui';

type Props = {
  visible: boolean;
  onAcknowledge: () => void;
};

export default function MedicalDisclaimerModal({ visible, onAcknowledge }: Props) {
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.safe}>
        <View style={styles.toolbar}>
          <Text style={styles.navTitle}>Medical Disclaimer</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.iconWrap}>
            <Ionicons name="warning" size={48} color={Colors.warning} />
          </View>
          <Text style={styles.heading}>Please read carefully</Text>

          {MEDICAL_DISCLAIMER_SECTIONS.map((section, index) => (
            <View
              key={section.title}
              style={[
                styles.sectionCard,
                index === 1 && styles.emergencyCard,
                index === 2 && styles.urgentCard,
              ]}
            >
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionBody}>{section.body}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <BrandButton label="I Understand" onPress={onAcknowledge} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  toolbar: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderLight,
    backgroundColor: Colors.surface,
    alignItems: 'center',
  },
  navTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  scroll: { padding: Spacing.base, paddingBottom: Spacing.xl, gap: Spacing.sm },
  iconWrap: { alignItems: 'center', marginVertical: Spacing.md },
  heading: {
    fontSize: Typography.size.xl,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  sectionCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
    gap: Spacing.xs,
  },
  emergencyCard: {
    backgroundColor: 'rgba(255, 59, 48, 0.08)',
    borderColor: 'rgba(255, 59, 48, 0.2)',
  },
  urgentCard: {
    backgroundColor: 'rgba(0, 122, 255, 0.08)',
    borderColor: 'rgba(0, 122, 255, 0.15)',
  },
  sectionTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  sectionBody: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 21 },
  footer: {
    padding: Spacing.base,
    paddingBottom: Spacing.xl,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.borderLight,
    backgroundColor: Colors.surface,
  },
});
