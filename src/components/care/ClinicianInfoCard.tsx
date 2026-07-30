import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing } from '../../theme';
import { AnimatedPressable } from '../ui';

type Props = {
  clinicianName: string;
  specialty?: string;
  clinicName?: string;
  linkedSince?: string;
  loading?: boolean;
  onPress?: () => void;
};

export default function ClinicianInfoCard({
  clinicianName,
  specialty,
  clinicName,
  linkedSince,
  loading,
  onPress,
}: Props) {
  const content = (
    <View style={styles.wrap}>
      <View style={styles.headerRow}>
        <View style={styles.iconTile}>
          <Ionicons name="medkit" size={22} color={Colors.primary} />
        </View>
        <View style={styles.headerCopy}>
          <Text style={styles.eyebrow}>Your clinician</Text>
          {loading ? (
            <ActivityIndicator size="small" color={Colors.primary} style={styles.loader} />
          ) : (
            <Text style={styles.name} numberOfLines={1}>{clinicianName}</Text>
          )}
        </View>
        <View style={styles.connectedPill}>
          <View style={styles.connectedDot} />
          <Text style={styles.connectedText}>Connected</Text>
        </View>
      </View>

      {linkedSince ? (
        <Text style={styles.linkedSince}>Linked since {linkedSince}</Text>
      ) : null}

      {(specialty || clinicName) && (
        <View style={styles.metaBlock}>
          {specialty ? (
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Specialty</Text>
              <Text style={styles.metaValue} numberOfLines={1}>{specialty}</Text>
            </View>
          ) : null}
          {clinicName ? (
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Practice</Text>
              <Text style={styles.metaValue} numberOfLines={1}>{clinicName}</Text>
            </View>
          ) : null}
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <AnimatedPressable onPress={onPress} style={styles.pressable}>
        {content}
      </AnimatedPressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  pressable: {},
  wrap: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconTile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCopy: { flex: 1, minWidth: 0 },
  eyebrow: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'capitalize',
  },
  name: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 2,
  },
  loader: { alignSelf: 'flex-start', marginTop: 4 },
  connectedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.success + '18',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
  },
  connectedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  connectedText: {
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: Colors.success,
  },
  linkedSince: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
    marginLeft: 52,
  },
  metaBlock: {
    marginTop: Spacing.xs,
    marginLeft: 52,
    gap: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  metaLabel: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  metaValue: {
    flex: 1,
    textAlign: 'right',
    fontSize: Typography.size.xs,
    fontWeight: '600',
    color: Colors.text,
  },
});
