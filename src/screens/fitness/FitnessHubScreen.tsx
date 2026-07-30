// src/screens/fitness/FitnessHubScreen.tsx
import React, { useState, useMemo, useEffect } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, NativeSyntheticEvent, NativeScrollEvent,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, fitnessModuleIonIcon } from '../../theme';
import { AppCard, SectionHeader, ListRow, SegmentedControl } from '../../components/ui';
import FeaturedGuideCard from '../../components/fitness/FeaturedGuideCard';
import StepsPinnedPreviewCard from '../../components/fitness/StepsPinnedPreviewCard';
import { LEARNING_GUIDES } from '../../data/learningGuides';
import { useAppStore } from '../../store';
import {
  FITNESS_MODULES,
  FITNESS_DOMAIN_GROUPS,
  getRecommendedModules,
} from '../../data/fitnessData';
import type { FitnessModule } from '../../types';
import { navigateToFitnessModule, getRouteForModuleId } from '../../utils/fitnessModuleRouter';
import { clinicianService } from '../../services/clinicianService';
import ClinicianRecommendationsCard from '../../components/home/ClinicianRecommendationsCard';
import type { FitnessHubRecommendation } from '../../types';
import AppScreen from '../../components/common/AppScreen';

type Tab = 'recommended' | 'all';

const LEARNING_ROUTES: Record<string, string> = {
  vitamins: Screen.vitaminsLearning,
  'nutrition-basics': Screen.nutritionBasics,
};

function learningRoute(guideId: string): { screen: string; params?: object } {
  const dedicated = LEARNING_ROUTES[guideId];
  if (dedicated) return { screen: dedicated };
  return { screen: Screen.learningGuide, params: { topicId: guideId } };
}

function ScrollProgressBar({ progress }: { progress: number }) {
  const clamped = Math.max(0, Math.min(1, progress));
  return (
    <View style={styles.progressTrack} accessibilityRole="progressbar">
      <View style={[styles.progressFill, { width: `${clamped * 100}%` }]} />
    </View>
  );
}

export default function FitnessHubScreen() {
  const navigation = useNavigation<any>();
  const { user, wellnessScore, subscriptionTier } = useAppStore();

  const [activeTab, setActiveTab] = useState<Tab>('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const [clinicianRec, setClinicianRec] = useState<FitnessHubRecommendation | null>(null);
  const [exploreProgress, setExploreProgress] = useState(0);
  const [learningProgress, setLearningProgress] = useState(0);

  useEffect(() => {
    if (!user) return;
    return clinicianService.watchFitnessHubRecommendations(user.uid, setClinicianRec);
  }, [user?.uid]);

  useEffect(() => {
    setExploreProgress(0);
  }, [activeTab, searchQuery]);

  const recommendedModules = useMemo(
    () => getRecommendedModules(wellnessScore, 10),
    [wellnessScore]
  );

  const domainSections = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return FITNESS_DOMAIN_GROUPS;
    return FITNESS_DOMAIN_GROUPS
      .map((s) => ({
        ...s,
        data: s.data.filter(
          (m) => m.title.toLowerCase().includes(q) || m.subtitle.toLowerCase().includes(q)
        ),
      }))
      .filter((s) => s.data.length > 0);
  }, [searchQuery]);

  const navigateToModule = (module: FitnessModule) => {
    navigateToFitnessModule(navigation, module, subscriptionTier);
  };

  const openLearningGuide = (guideId: string) => {
    const route = learningRoute(guideId);
    navigation.navigate(route.screen, route.params);
  };

  const openClinicianModule = (moduleId: string) => {
    const route = getRouteForModuleId(moduleId);
    if (route) navigation.navigate(route.screen, route.params);
  };

  const showExplore = activeTab === 'all' || searchQuery.length > 0;
  const moduleCount = FITNESS_MODULES.length;

  const onExploreScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
    const travel = Math.max(1, contentSize.height - layoutMeasurement.height);
    setExploreProgress(contentOffset.y / travel);
  };

  const onLearningScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
    const travel = Math.max(1, contentSize.width - layoutMeasurement.width);
    setLearningProgress(contentOffset.x / travel);
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fitness Hub</Text>
        <Text style={styles.headerSub}>
          {moduleCount} modules, tools & learning guides
        </Text>

        <SegmentedControl
          options={['Recommended', 'Explore all']}
          value={activeTab === 'recommended' ? 'Recommended' : 'Explore all'}
          onChange={(v) => {
            setActiveTab(v === 'Recommended' ? 'recommended' : 'all');
          }}
        />

        <View style={styles.searchWrap}>
          <Ionicons name="search" size={18} color={Colors.textTertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search modules..."
            placeholderTextColor={Colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="close-circle" size={18} color={Colors.textTertiary} />
            </TouchableOpacity>
          )}
        </View>

        {showExplore ? <ScrollProgressBar progress={exploreProgress} /> : null}
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onScroll={showExplore ? onExploreScroll : undefined}
        scrollEventThrottle={16}
      >
        {!showExplore ? (
          <>
            {clinicianRec && (
              <>
                <SectionHeader title="From your clinician" icon="medkit-outline" />
                <ClinicianRecommendationsCard
                  recommendation={clinicianRec}
                  onModulePress={openClinicianModule}
                />
              </>
            )}

            <SectionHeader
              title="Learning"
              icon="book-outline"
              actionLabel="See all"
              onAction={() => setActiveTab('all')}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredRow}
              onScroll={onLearningScroll}
              scrollEventThrottle={16}
            >
              {LEARNING_GUIDES.map((g) => (
                <FeaturedGuideCard
                  key={g.id}
                  guide={g}
                  onPress={() => openLearningGuide(g.id)}
                />
              ))}
            </ScrollView>
            <View style={styles.learningProgressWrap}>
              <ScrollProgressBar progress={learningProgress} />
            </View>

            <SectionHeader title="Activity & progress" icon="pulse-outline" />
            <AppCard padded={false}>
              <StepsPinnedPreviewCard onPress={() => navigation.navigate(Screen.stepsDetail)} />
              <View style={styles.cardDivider} />
              <ListRow
                title="Activity Dashboard"
                subtitle="Weekly goals, heart points & metrics"
                iconName="analytics-outline"
                iconColor={Colors.brand}
                onPress={() => navigation.navigate(Screen.activityDashboard)}
              />
              <ListRow
                title="Track your progress"
                subtitle="Progress charts & body composition"
                iconName="trending-up-outline"
                iconColor={Colors.brand}
                onPress={() => navigation.navigate(Screen.tabAnalytics, { screen: Screen.progressTracking })}
                showDivider={false}
              />
            </AppCard>

            <SectionHeader title="Recommended for you" icon="star-outline" />
            <ModuleGroup modules={recommendedModules} onPress={navigateToModule} />
          </>
        ) : domainSections.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconWrap}>
              <Ionicons name="search-outline" size={32} color={Colors.textTertiary} />
            </View>
            <Text style={styles.emptyTitle}>No modules found</Text>
            <Text style={styles.emptyText}>Try a different search term</Text>
          </View>
        ) : (
          domainSections.map((section) => (
            <View key={String(section.title)}>
              <SectionHeader title={String(section.title)} />
              <ModuleGroup modules={section.data} onPress={navigateToModule} />
            </View>
          ))
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </AppScreen>
  );
}

function ModuleGroup({
  modules,
  onPress,
}: {
  modules: FitnessModule[];
  onPress: (module: FitnessModule) => void;
}) {
  return (
    <AppCard padded={false}>
      {modules.map((mod, index) => (
        <ListRow
          key={mod.id}
          title={mod.title}
          subtitle={mod.subtitle}
          iconName={fitnessModuleIonIcon(mod)}
          iconColor={mod.color}
          badge={mod.isPremium ? 'PRO' : undefined}
          badgeColor={Colors.brand}
          onPress={() => onPress(mod)}
          showDivider={index < modules.length - 1}
        />
      ))}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.base, paddingBottom: Spacing.base },

  header: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
    gap: Spacing.md,
  },
  headerTitle: {
    fontSize: Typography.size['2xl'],
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  headerSub: { fontSize: Typography.size.sm, color: Colors.textSecondary },

  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    gap: Spacing.sm,
  },
  searchInput: { flex: 1, fontSize: Typography.size.base, color: Colors.text, padding: 0 },

  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.borderLight,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: Colors.brand,
  },
  learningProgressWrap: { marginBottom: Spacing.sm },

  featuredRow: { paddingBottom: Spacing.xs, paddingRight: Spacing.base },

  cardDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.borderLight,
    marginHorizontal: Spacing.base,
  },

  emptyState: { alignItems: 'center', paddingTop: Spacing['3xl'], gap: Spacing.sm },
  emptyIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  emptyTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text },
  emptyText: { fontSize: Typography.size.sm, color: Colors.textSecondary },
});
