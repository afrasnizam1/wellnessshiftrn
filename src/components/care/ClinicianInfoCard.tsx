import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AnimatedPressable } from '../ui';

type Props = {
  clinicianName: string;
  email?: string;
  specialty?: string;
  clinicName?: string;
  linkedSince?: string;
  loading?: boolean;
  /** Larger layout for My Care hub */
  prominent?: boolean;
  onPress?: () => void;
};

export default function ClinicianInfoCard({
  clinicianName,
  email,
  specialty,
  clinicName,
  linkedSince,
  loading,
  prominent,
  onPress,
}: Props) {
  const initial = clinicianName?.[0]?.toUpperCase() ?? 'C';
  const hasDetails = !!(email || specialty || clinicName);

  const content = (
    <View style={[styles.wrap, prominent && styles.wrapProminent]}>
      <View style={styles.headerRow}>
        {prominent ? (
          <View style={styles.avatar}>
            <Text style={styles.avatarInitial}>{initial}</Text>
          </View>
        ) : (
          <View style={styles.iconTile}>
            <Ionicons name="medkit" size={22} color={Colors.primary} />
          </View>
        )}
        <View style={styles.headerCopy}>
          <Text style={styles.eyebrow}>Your clinician</Text>
          {loading ? (
            <ActivityIndicator size="small" color={Colors.primary} style={styles.loader} />
          ) : (
            <Text style={[styles.name, prominent && styles.nameProminent]} numberOfLines={1}>
              {clinicianName}
            </Text>
          )}
        </View>
        <View style={styles.connectedPill}>
          <View style={styles.connectedDot} />
          <Text style={styles.connectedText}>Connected</Text>
        </View>
      </View>

      {linkedSince ? (
        <Text style={[styles.linkedSince, prominent && styles.metaIndent]}>
          Linked since {linkedSince}
        </Text>
      ) : null}

      {hasDetails && !loading ? (
        <View style={[styles.metaBlock, prominent && styles.metaBlockProminent]}>
          {email ? (
            <View style={styles.metaRow}>
              <Ionicons name="mail-outline" size={16} color={Colors.textSecondary} />
              <View style={styles.metaCopy}>
                <Text style={styles.metaLabel}>Email</Text>
                <Text style={styles.metaValue} numberOfLines={1}>{email}</Text>
              </View>
            </View>
          ) : null}
          {specialty ? (
            <View style={styles.metaRow}>
              <Ionicons name="medical-outline" size={16} color={Colors.textSecondary} />
              <View style={styles.metaCopy}>
                <Text style={styles.metaLabel}>Doctor type</Text>
                <Text style={styles.metaValue} numberOfLines={1}>{specialty}</Text>
              </View>
            </View>
          ) : null}
          {clinicName ? (
            <View style={styles.metaRow}>
              <Ionicons name="business-outline" size={16} color={Colors.textSecondary} />
              <View style={styles.metaCopy}>
                <Text style={styles.metaLabel}>Workplace</Text>
                <Text style={styles.metaValue} numberOfLines={2}>{clinicName}</Text>
              </View>
            </View>
          ) : null}
        </View>
      ) : null}
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
  wrapProminent: {
    paddingHorizontal: 0,
    paddingVertical: 0,
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
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(148, 107, 250, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: Typography.size.xl,
    fontWeight: '700',
    color: '#946BFA',
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
  nameProminent: {
    fontSize: Typography.size.lg,
  },
  loader: { alignSelf: 'flex-start', marginTop: 4 },
  connectedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.success + '18',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.pill,
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
  metaIndent: {
    marginLeft: 64,
  },
  metaBlock: {
    marginTop: Spacing.xs,
    marginLeft: 52,
    gap: 6,
  },
  metaBlockProminent: {
    marginLeft: 0,
    marginTop: Spacing.sm,
    paddingTop: Spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.borderLight,
    gap: Spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  metaCopy: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  metaLabel: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  metaValue: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.text,
  },
});
