import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Spacing, Radius } from '../../theme';
import { ClinicianShadow, ClinicianTheme } from '../../theme/clinicianTheme';
import type { PatientSummary } from '../../types';

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

  return (
    <TouchableOpacity
      style={[styles.card, urgent && styles.cardUrgent]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={[color + '28', color + '10']}
        style={styles.avatarRing}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials(patient.displayName)}</Text>
        </View>
      </LinearGradient>

      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{patient.displayName}</Text>
          {urgent || patient.needsAttention ? (
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
        <Text style={styles.scoreLabel}>Wellness</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: ClinicianTheme.surface,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: ClinicianTheme.border,
    ...ClinicianShadow.card,
  },
  cardUrgent: {
    borderColor: Colors.error + '55',
    backgroundColor: '#FFF9F9',
  },
  avatarRing: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ClinicianTheme.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 15, fontWeight: '800', color: ClinicianTheme.accentDark },
  info: { flex: 1, minWidth: 0 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  name: { fontSize: 16, fontWeight: '700', color: Colors.text, flexShrink: 1 },
  urgentPill: {
    backgroundColor: Colors.error + '18',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.pill,
  },
  urgentText: { fontSize: 10, fontWeight: '800', color: Colors.error, textTransform: 'uppercase' },
  email: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  meta: { fontSize: 11, color: Colors.textTertiary, marginTop: 4, fontWeight: '500' },
  scoreBlock: { alignItems: 'center', minWidth: 48 },
  score: { fontSize: 20, fontWeight: '800', letterSpacing: -0.5 },
  scoreLabel: { fontSize: 10, color: Colors.textTertiary, fontWeight: '600', marginTop: 2 },
});
