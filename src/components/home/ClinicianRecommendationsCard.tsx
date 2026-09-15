import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius, Shadow, fitnessModuleIonIcon } from '../../theme';
import { ANATOMY_MODULE_IMAGES } from '../../assets/anatomy';
import type { FitnessHubRecommendation } from '../../types';
import { FITNESS_MODULES } from '../../data/fitnessData';
import FuturisticModuleGlyph, { hasFuturisticGlyph } from '../fitness/FuturisticModuleGlyph';

interface Props {
  recommendation: FitnessHubRecommendation;
  onModulePress: (moduleId: string) => void;
  onViewAll?: () => void;
}

function lightenHex(hex: string, amount = 0.82): string {
  const raw = hex.replace('#', '');
  if (raw.length !== 6) return Colors.primaryLight;
  const r = parseInt(raw.slice(0, 2), 16);
  const g = parseInt(raw.slice(2, 4), 16);
  const b = parseInt(raw.slice(4, 6), 16);
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
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
          const accent = catalog?.color ?? Colors.primary;
          return (
            <TouchableOpacity
              key={mod.id}
              style={styles.chip}
              onPress={() => onModulePress(mod.id)}
              accessibilityRole="button"
              accessibilityLabel={mod.title}
            >
              {art ? (
                <Image source={art} style={styles.chipArt} />
              ) : (
                <View style={[styles.chipIconWrap, { backgroundColor: lightenHex(accent) }]}>
                  {hasFuturisticGlyph(mod.id) ? (
                    <FuturisticModuleGlyph moduleId={mod.id} color={accent} size={48} tone="light" />
                  ) : (
                    <Ionicons
                      name={catalog ? fitnessModuleIonIcon(catalog) : 'sparkles-outline'}
                      size={30}
                      color={accent}
                    />
                  )}
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
    borderRadius: Radius.xl,
    padding: Spacing.base,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    ...Shadow.sm,
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
    backgroundColor: Colors.background,
    borderRadius: Radius.lg,
    padding: Spacing.sm,
    paddingBottom: Spacing.md,
    marginRight: Spacing.sm,
    alignItems: 'center',
    gap: Spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  chipArt: {
    width: 104,
    height: 88,
    borderRadius: Radius.md,
    backgroundColor: Colors.background,
  },
  chipIconWrap: {
    width: 104,
    height: 88,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  chipTitle: {
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    letterSpacing: -0.1,
  },
});
