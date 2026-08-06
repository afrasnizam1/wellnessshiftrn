import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Spacing, Radius, Typography } from '../../theme';
import { ClinicianTheme } from '../../theme/clinicianTheme';
import type { PatientSummary } from '../../types';
import { AnimatedPressable } from '../ui';

function scoreColor(score: number): string {
  if (score >= 7) return Colors.success;
  if (score >= 5) return Colors.warning;
  return Colors.error;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}

type Props = {
  patient: PatientSummary;
  onPress: () => void;
  urgent?: boolean;
  compact?: boolean;
};

export default function ClinicianPatientCard({ patient, onPress, urgent, compact }: Props) {
  const color = scoreColor(patient.wellnessScore);
  const showAttention = urgent || patient.needsAttention;

  return (
    <AnimatedPressable
      style={[styles.card, showAttention && styles.cardUrgent]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${patient.displayName}, wellness ${patient.wellnessScore.toFixed(1)}`}
    >
      <View style={[styles.avatar, { backgroundColor: color + '18' }]}>
        <Text style={[styles.avatarText, { color }]}>{initials(patient.displayName)}</Text>
      </View>

      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{patient.displayName}</Text>
          {showAttention ? (
            <View style={styles.urgentPill}>
              <Text style={styles.urgentText}>Attention</Text>
            </View>
          ) : null}
        </View>
        {!compact && patient.email ? (
          <Text style={styles.email} numberOfLines={1}>{patient.email}</Text>
        ) : null}
        <Text style={styles.meta}>
          {compact ? `Active ${patient.lastActive}` : `Last active · ${patient.lastActive}`}
        </Text>
      </View>

      <View style={styles.scoreBlock}>
        <Text style={[styles.score, { color }]}>{patient.wellnessScore.toFixed(1)}</Text>
        <Text style={styles.scoreLabel}>Score</Text>
      </View>

      <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: ClinicianTheme.surface,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
    marginBottom: Spacing.sm,
  },
  cardUrgent: {
    borderColor: Colors.error + '45',
    backgroundColor: Colors.errorLight,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: Typography.size.sm,
    fontWeight: '800',
  },
  info: { flex: 1, minWidth: 0 },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  name: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
    flexShrink: 1,
    letterSpacing: -0.2,
  },
  urgentPill: {
    backgroundColor: Colors.error + '18',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  urgentText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.error,
    letterSpacing: 0.2,
  },
  email: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  meta: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
    marginTop: 3,
    fontWeight: '500',
  },
  scoreBlock: { alignItems: 'flex-end', minWidth: 40, marginRight: 2 },
  score: {
    fontSize: Typography.size.lg,
    fontWeight: '800',
    letterSpacing: -0.4,
    fontVariant: ['tabular-nums'],
  },
  scoreLabel: {
    fontSize: 10,
    color: Colors.textTertiary,
    fontWeight: '600',
    marginTop: 1,
  },
});
