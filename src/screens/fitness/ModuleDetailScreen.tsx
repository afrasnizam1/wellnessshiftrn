// src/screens/fitness/ModuleDetailScreen.tsx
import React from 'react';
import { Screen } from '../../navigation/screenNames';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow, fitnessModuleIonIcon } from '../../theme';
import type { FitnessModule } from '../../types';
import { useAppStore } from '../../store';
import { navigateToFitnessModule } from '../../utils/fitnessModuleRouter';
import { getModulePreview } from '../../data/moduleContentPreview';
import AppScreen from '../../components/common/AppScreen';
import { BackButton, IconBadge } from '../../components/ui';

export default function ModuleDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { subscriptionTier } = useAppStore();
  const module: FitnessModule = route.params?.module;
  if (!module) return null;

  const preview = getModulePreview(module);

  const handleStart = () => {
    navigateToFitnessModule(navigation, module, subscriptionTier);
  };

  const categoryLabel: Record<string, string> = {
    mindBody: 'Mind & Body', anatomy: '3D Anatomy', brainGames: 'Brain Training',
    calculators: 'Health Calculator', trackers: 'Health Tracker',
    workouts: 'Workout', education: 'Health Education',
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle} numberOfLines={1}>{module.title}</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { backgroundColor: module.color + '15' }]}>
          <IconBadge name={fitnessModuleIonIcon(module)} color={module.color} size="lg" />
          <Text style={[styles.heroTitle, { color: module.color }]}>{module.title}</Text>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>{categoryLabel[module.category] ?? module.category}</Text>
          </View>
          {module.isPremium && (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>PRO feature</Text>
            </View>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>About this module</Text>
          <Text style={styles.cardBody}>{preview.summary}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaChip}>
              <Text style={styles.metaText}>{preview.duration}</Text>
            </View>
            <View style={styles.metaChip}>
              <Text style={styles.metaText}>{preview.level}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>What you&apos;ll cover</Text>
          {preview.whatYouLearn.map((item) => (
            <View key={item} style={styles.learnRow}>
              <IconBadge name="checkmark-circle" color={module.color} size="sm" variant="plain" />
              <Text style={styles.learnText}>{item}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.startBtn, { backgroundColor: module.color }]}
          onPress={module.isPremium ? () => navigation.navigate(Screen.subscriptionPaywall, { feature: module.id }) : handleStart}
        >
          <Text style={styles.startBtnText}>{module.isPremium ? 'Unlock with PRO' : 'Start'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  content: { padding: Spacing.base, gap: Spacing.base, paddingBottom: Spacing['3xl'] },
  hero: {
    alignItems: 'center',
    padding: Spacing.xl,
    borderRadius: Radius.xl,
    gap: Spacing.sm,
    ...Shadow.sm,
  },
  heroTitle: { fontSize: Typography.size.xl, fontWeight: '800', textAlign: 'center', letterSpacing: -0.4 },
  heroBadge: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
  },
  heroBadgeText: { fontSize: Typography.size.xs, fontWeight: '600', color: Colors.textSecondary },
  premiumBadge: {
    backgroundColor: Colors.brand + '20',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
  },
  premiumBadgeText: { fontSize: Typography.size.xs, fontWeight: '700', color: Colors.brand },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    gap: Spacing.sm,
    ...Shadow.sm,
  },
  cardTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  cardBody: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 22 },
  metaRow: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm },
  metaChip: {
    backgroundColor: Colors.surfaceSecondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.pill,
  },
  metaText: { fontSize: Typography.size.xs, fontWeight: '600', color: Colors.textSecondary },
  learnRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm, marginTop: Spacing.sm },
  learnText: { flex: 1, fontSize: Typography.size.sm, color: Colors.text, lineHeight: 20 },
  startBtn: {
    borderRadius: Radius.lg,
    paddingVertical: Spacing.base,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  startBtnText: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.white },
});
