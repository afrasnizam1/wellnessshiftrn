import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { IconBadge } from '../ui';

interface Props {
  onDismiss: () => void;
}

export default function MedicalDisclaimerBanner({ onDismiss }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <IconBadge name="medical-outline" color={Colors.info} size="sm" />
        <View style={styles.content}>
          <Text style={styles.title}>Wellness support, not emergency care</Text>
          <Text style={styles.body}>
            Wellness Shift supports everyday wellbeing. It does not replace advice from your doctor or emergency services.
          </Text>
          <Text style={styles.body}>
            Life-threatening emergency: call 999 or visit A&E. Urgent but not life-threatening (NHS England): call 111 or use 111 online.
          </Text>
        </View>
        <TouchableOpacity onPress={onDismiss} style={styles.dismiss} hitSlop={8}>
          <Ionicons name="close" size={20} color={Colors.textTertiary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFF6FF',
    borderRadius: Radius.lg,
    padding: Spacing.base,
    borderLeftWidth: 3,
    borderLeftColor: Colors.info,
  },
  row: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'flex-start' },
  content: { flex: 1, gap: 4 },
  title: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.text },
  body: { fontSize: Typography.size.xs, color: Colors.textSecondary, lineHeight: 18 },
  dismiss: { padding: 2 },
});
