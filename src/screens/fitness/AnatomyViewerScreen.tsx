import React, { useMemo, useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import AppScreen from '../../components/common/AppScreen';
import HologramViewer from '../../components/fitness/HologramViewer';
import { IconBadge, SegmentedControl } from '../../components/ui';
import {
  FactCardsSection,
  ModuleImportanceCard,
  OrganHealthTipsCard,
  QuickStatsRow,
  StatCardsSection,
} from '../../components/fitness/hologram/hologramTutorUi';
import { ANATOMY_MODELS, getAnatomyModel } from '../../data/anatomyModels';
import { getHologramTutorContent } from '../../data/hologramTutorContent';
import type { HologramTutorTab } from '../../types/hologramTutor';

const STATS_SECTION_TITLES: Record<string, string> = {
  'heart-hologram': 'Amazing Heart Statistics',
  'heart-lungs-hologram': 'Heart & Lungs Statistics',
  'heart-conduction-system': 'Heart & Bronchial System Stats',
  'brain-model': 'Amazing Brain Statistics',
  'lung-model': 'Amazing Lung Statistics',
  'stomach-model': 'Stomach Statistics',
  'skeleton-model': 'Skeleton Statistics',
  'muscle-model': 'Muscle Statistics',
  'anatomy-study': 'Amazing Human Anatomy Statistics',
};

const FACTS_SECTION_TITLES: Record<string, string> = {
  'heart-hologram': 'Cool Heart Facts',
  'heart-lungs-hologram': 'Amazing Heart & Lung Facts',
  'heart-conduction-system': 'Amazing Heart & Bronchial Facts',
  'brain-model': 'Cool Brain Facts',
  'lung-model': 'Fascinating Lung Facts',
  'stomach-model': 'Digestion Facts',
  'skeleton-model': 'Fascinating Bone Facts',
  'muscle-model': 'Muscle Facts',
  'anatomy-study': 'Fascinating Muscle Facts',
};

export default function AnatomyViewerScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const modelId = route.params?.modelId ?? 'heart-hologram';
  const model = getAnatomyModel(modelId);
  const tutor = getHologramTutorContent(modelId);
  const [tab, setTab] = useState<HologramTutorTab>('model');

  const tabOptions = useMemo<[HologramTutorTab, HologramTutorTab, HologramTutorTab]>(() => {
    if (tutor?.tabs) {
      return ['model', 'stats', 'facts'];
    }
    return ['model', 'stats', 'facts'];
  }, [tutor]);

  const tabLabels = useMemo(() => {
    if (tutor?.tabs) {
      return [tutor.tabs.model, tutor.tabs.stats, tutor.tabs.facts];
    }
    return ['3D Model', 'Stats', 'Facts'];
  }, [tutor]);

  const segmentedOptions = tabLabels as [string, string, string];
  const segmentedValue = tabLabels[tabOptions.indexOf(tab)] ?? tabLabels[0];

  const onTabChange = (label: string) => {
    const idx = tabLabels.indexOf(label);
    if (idx >= 0) setTab(tabOptions[idx]);
  };

  const statsTitle = STATS_SECTION_TITLES[modelId] ?? 'Statistics';
  const factsTitle = FACTS_SECTION_TITLES[modelId] ?? 'Did you know?';

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{model.title}</Text>
        <View style={{ width: 40 }} />
      </View>

      {tutor && (
        <View style={styles.tabBar}>
          <SegmentedControl
            options={segmentedOptions}
            value={segmentedValue}
            onChange={onTabChange}
            compact
          />
        </View>
      )}

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {tab === 'model' && (
          <>
            <View style={[styles.viewerCard, { borderColor: model.color + '44' }]}>
              <HologramViewer
                modelFile={model.usdzFile}
                preset={model.preset}
                height={420}
              />
            </View>
            {tutor?.importance && <ModuleImportanceCard data={tutor.importance} />}
            {tutor?.quickStats?.length ? (
              <QuickStatsRow stats={tutor.quickStats} accent={model.color} />
            ) : null}
            {tutor?.organHealth && <OrganHealthTipsCard data={tutor.organHealth} />}
            {!tutor && (
              <>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>About</Text>
                  <Text style={styles.cardBody}>{model.description}</Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Did you know?</Text>
                  {model.funFacts.map((f, i) => (
                    <Text key={i} style={styles.fact}>• {f}</Text>
                  ))}
                </View>
              </>
            )}
          </>
        )}

        {tab === 'stats' && tutor && (
          <>
            {tutor.importance && <ModuleImportanceCard data={tutor.importance} />}
            <StatCardsSection title={statsTitle} stats={tutor.stats} />
            {tutor.organHealth && <OrganHealthTipsCard data={tutor.organHealth} />}
          </>
        )}

        {tab === 'facts' && tutor && (
          <>
            {tutor.importance && <ModuleImportanceCard data={tutor.importance} />}
            <FactCardsSection title={factsTitle} facts={tutor.facts} />
            {tutor.organHealth && <OrganHealthTipsCard data={tutor.organHealth} />}
          </>
        )}

        <Text style={styles.sectionTitle}>More holograms</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.moreRow}>
            {Object.entries(ANATOMY_MODELS).filter(([id]) => id !== modelId).map(([id, m]) => (
              <TouchableOpacity
                key={id}
                style={[styles.moreCard, { borderColor: m.color + '44' }]}
                onPress={() => {
                  setTab('model');
                  navigation.replace(Screen.anatomyViewer, { modelId: id });
                }}
              >
                <IconBadge name={m.icon} color={m.color} size="md" />
                <Text style={styles.moreCardTitle}>
                  {m.title.replace(' Hologram', '').replace(' Tutor', '')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: Colors.primary, lineHeight: 38 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  tabBar: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  content: { padding: Spacing.base, gap: Spacing.md },
  viewerCard: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    overflow: 'hidden',
    backgroundColor: '#0a0a0a',
    shadowColor: '#4fc3f7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 12,
  },
  card: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, ...Shadow.sm, gap: Spacing.sm },
  cardTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  cardBody: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 22 },
  fact: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 22 },
  sectionTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  moreRow: { flexDirection: 'row', gap: Spacing.sm },
  moreCard: {
    width: 110, borderRadius: Radius.lg, borderWidth: 1.5,
    padding: Spacing.md, alignItems: 'center', gap: Spacing.xs, backgroundColor: Colors.white,
  },
  moreCardTitle: { fontSize: Typography.size.xs, color: Colors.text, textAlign: 'center', fontWeight: '600' },
});
