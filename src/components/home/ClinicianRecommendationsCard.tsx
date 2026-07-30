import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import type { FitnessHubRecommendation } from '../../types';
import { FITNESS_MODULES } from '../../data/fitnessData';

interface Props {
  recommendation: FitnessHubRecommendation;
  onModulePress: (moduleId: string) => void;
  onViewAll?: () => void;
}

export default function ClinicianRecommendationsCard({
  recommendation,
  onModulePress,
  onViewAll,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>From your clinician</Text>
          <Text style={styles.subtitle}>
            {recommendation.clinicianName} · {formatDate(recommendation.createdAt)}
          </Text>
        </View>
        {onViewAll && (
          <TouchableOpacity onPress={onViewAll}>
            <Text style={styles.viewAll}>Fitness Hub →</Text>
          </TouchableOpacity>
        )}
      </View>

      {recommendation.personalNote ? (
        <Text style={styles.note}>"{recommendation.personalNote}"</Text>
      ) : null}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
        {recommendation.recommendedModules.map((mod) => {
          const catalog = FITNESS_MODULES.find((m) => m.id === mod.id);
          return (
            <TouchableOpacity
              key={mod.id}
              style={styles.chip}
              onPress={() => onModulePress(mod.id)}
            >
              <Text style={styles.chipIcon}>{mod.icon || catalog?.icon || '✨'}</Text>
              <Text style={styles.chipTitle} numberOfLines={2}>{mod.title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  } catch {
    return '';
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    gap: Spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  headerText: { flex: 1 },
  title: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  subtitle: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
  viewAll: { fontSize: Typography.size.xs, color: Colors.primary, fontWeight: '600' },
  note: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  row: { marginHorizontal: -Spacing.xs },
  chip: {
    width: 120,
    backgroundColor: Colors.primaryBg,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginRight: Spacing.sm,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  chipIcon: { fontSize: 28 },
  chipTitle: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
});
