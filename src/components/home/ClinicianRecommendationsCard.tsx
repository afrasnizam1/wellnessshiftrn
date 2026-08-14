import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { fitnessModuleIonIcon } from '../../theme';
import { ANATOMY_MODULE_IMAGES } from '../../assets/anatomy';
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
          const art = ANATOMY_MODULE_IMAGES[mod.id];
          return (
            <TouchableOpacity
              key={mod.id}
              style={styles.chip}
              onPress={() => onModulePress(mod.id)}
            >
              {art ? (
                <Image source={art} style={styles.chipArt} />
              ) : (
                <View style={styles.chipIconWrap}>
                  <Ionicons
                    name={catalog ? fitnessModuleIonIcon(catalog) : 'sparkles-outline'}
                    size={28}
                    color={catalog?.color ?? Colors.primary}
                  />
                </View>
              )}
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
    backgroundColor: '#0A0A0A',
    borderRadius: Radius.lg,
    padding: Spacing.sm,
    paddingBottom: Spacing.md,
    marginRight: Spacing.sm,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  chipArt: {
    width: 104,
    height: 88,
    borderRadius: Radius.md,
    backgroundColor: '#000',
  },
  chipIconWrap: {
    width: 104,
    height: 88,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipTitle: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
    color: Colors.white,
    textAlign: 'center',
  },
});
