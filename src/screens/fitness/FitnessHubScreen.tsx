// src/screens/fitness/FitnessHubScreen.tsx
import React, {
  useState, useMemo, useEffect, useCallback, memo, useRef, useImperativeHandle, forwardRef,
} from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, ScrollView, TextInput, Pressable, FlatList,
  InteractionManager, type ListRenderItem, type NativeSyntheticEvent, type NativeScrollEvent,
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
import type { FitnessModule, FitnessHubRecommendation } from '../../types';
import { navigateToFitnessModule, getRouteForModuleId } from '../../utils/fitnessModuleRouter';
import { clinicianService } from '../../services/clinicianService';
import ClinicianRecommendationsCard from '../../components/home/ClinicianRecommendationsCard';
import AppScreen from '../../components/common/AppScreen';

type Tab = 'recommended' | 'all';
type DomainSection = (typeof FITNESS_DOMAIN_GROUPS)[number];
type ProgressHandle = { setProgress: (value: number) => void };

const TAB_OPTIONS: Array<'Recommended' | 'Explore all'> = ['Recommended', 'Explore all'];
const MODULE_COUNT = FITNESS_MODULES.length;
const LIST_BOTTOM = <View style={{ height: 100 }} />;

const LEARNING_ROUTES: Record<string, string> = {
  vitamins: Screen.vitaminsLearning,
  'nutrition-basics': Screen.nutritionBasics,
};

function learningRoute(guideId: string): { screen: string; params?: object } {
  const dedicated = LEARNING_ROUTES[guideId];
  if (dedicated) return { screen: dedicated };
  return { screen: Screen.learningGuide, params: { topicId: guideId } };
}

const LearningGuideItem = memo(function LearningGuideItem({
  guide,
  onOpen,
}: {
  guide: (typeof LEARNING_GUIDES)[number];
  onOpen: (id: string) => void;
}) {
  const onPress = useCallback(() => onOpen(guide.id), [guide.id, onOpen]);
  return <FeaturedGuideCard guide={guide} onPress={onPress} />;
});

/** Progress UI owns its own state so parent lists don't re-render on scroll. */
const ScrollProgressBar = memo(forwardRef<ProgressHandle>(function ScrollProgressBar(_props, ref) {
  const [progress, setProgress] = useState(0);
  useImperativeHandle(ref, () => ({
    setProgress: (value: number) => {
      setProgress((prev) => (Math.abs(prev - value) < 0.008 ? prev : value));
    },
  }), []);

  const clamped = Math.max(0, Math.min(1, progress));
  const thumbPct = 32;
  const leftPct = clamped * (100 - thumbPct);

  return (
    <View style={styles.progressWrap} accessibilityRole="progressbar">
      <View style={styles.progressTrack}>
        <View style={[styles.progressThumb, { width: `${thumbPct}%`, left: `${leftPct}%` }]} />
      </View>
    </View>
  );
}));

const ModuleRow = memo(function ModuleRow({
  module,
  onPress,
  showDivider,
}: {
  module: FitnessModule;
  onPress: (module: FitnessModule) => void;
  showDivider: boolean;
}) {
  const handlePress = useCallback(() => onPress(module), [module, onPress]);
  return (
    <ListRow
      title={module.title}
      subtitle={module.subtitle}
      iconName={fitnessModuleIonIcon(module)}
      iconColor={module.color}
      badge={module.isPremium ? 'PRO' : undefined}
      badgeColor={Colors.brand}
      onPress={handlePress}
      showDivider={showDivider}
      animated={false}
    />
  );
});

const ModuleGroup = memo(function ModuleGroup({
  modules,
  onPress,
}: {
  modules: FitnessModule[];
  onPress: (module: FitnessModule) => void;
}) {
  return (
    <AppCard padded={false}>
      {modules.map((mod, index) => (
        <ModuleRow
          key={mod.id}
          module={mod}
          onPress={onPress}
          showDivider={index < modules.length - 1}
        />
      ))}
    </AppCard>
  );
});

const DomainSectionItem = memo(function DomainSectionItem({
  section,
  onPress,
}: {
  section: DomainSection;
  onPress: (module: FitnessModule) => void;
}) {
  return (
    <View>
      <SectionHeader title={String(section.title)} />
      <ModuleGroup modules={section.data} onPress={onPress} />
    </View>
  );
});

export default function FitnessHubScreen() {
  const navigation = useNavigation<any>();
  const user = useAppStore((s) => s.user);
  const wellnessScore = useAppStore((s) => s.wellnessScore);
  const subscriptionTier = useAppStore((s) => s.subscriptionTier);

  const [activeTab, setActiveTab] = useState<Tab>('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const [clinicianRec, setClinicianRec] = useState<FitnessHubRecommendation | null>(null);
  /** Mount Explore list once, then keep it alive so tab switches are instant. */
  const [exploreMounted, setExploreMounted] = useState(false);

  const exploreProgressRef = useRef<ProgressHandle>(null);
  const learningProgressRef = useRef<ProgressHandle>(null);

  useEffect(() => {
    if (!user) return;
    let unsub: (() => void) | undefined;
    const task = InteractionManager.runAfterInteractions(() => {
      unsub = clinicianService.watchFitnessHubRecommendations(user.uid, setClinicianRec);
    });
    return () => {
      task.cancel();
      unsub?.();
    };
  }, [user?.uid]);

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

  const navigateToModule = useCallback((module: FitnessModule) => {
    navigateToFitnessModule(navigation, module, subscriptionTier);
  }, [navigation, subscriptionTier]);

  const openLearningGuide = useCallback((guideId: string) => {
    const route = learningRoute(guideId);
    navigation.navigate(route.screen, route.params);
  }, [navigation]);

  const openClinicianModule = useCallback((moduleId: string) => {
    const route = getRouteForModuleId(moduleId);
    if (route) navigation.navigate(route.screen, route.params);
  }, [navigation]);

  const openSteps = useCallback(() => {
    navigation.navigate(Screen.stepsDetail);
  }, [navigation]);

  const openActivityDashboard = useCallback(() => {
    navigation.navigate(Screen.activityDashboard);
  }, [navigation]);

  const openProgressTracking = useCallback(() => {
    navigation.navigate(Screen.tabAnalytics, { screen: Screen.progressTracking });
  }, [navigation]);

  const switchToExplore = useCallback(() => {
    setExploreMounted(true);
    setActiveTab('all');
  }, []);

  const onTabChange = useCallback((v: string) => {
    const next: Tab = v === 'Recommended' ? 'recommended' : 'all';
    if (next === 'all') setExploreMounted(true);
    exploreProgressRef.current?.setProgress(0);
    setActiveTab(next);
  }, []);

  const onSearchChange = useCallback((text: string) => {
    if (text.length > 0) setExploreMounted(true);
    exploreProgressRef.current?.setProgress(0);
    setSearchQuery(text);
  }, []);

  const clearSearch = useCallback(() => {
    exploreProgressRef.current?.setProgress(0);
    setSearchQuery('');
  }, []);

  const showExplore = activeTab === 'all' || searchQuery.length > 0;
  const segmentValue = activeTab === 'recommended' ? 'Recommended' : 'Explore all';

  const onExploreScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
    const travel = Math.max(1, contentSize.height - layoutMeasurement.height);
    exploreProgressRef.current?.setProgress(contentOffset.y / travel);
  }, []);

  const onLearningScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
    const travel = Math.max(1, contentSize.width - layoutMeasurement.width);
    learningProgressRef.current?.setProgress(contentOffset.x / travel);
  }, []);

  const renderDomainSection = useCallback<ListRenderItem<DomainSection>>(
    ({ item }) => <DomainSectionItem section={item} onPress={navigateToModule} />,
    [navigateToModule]
  );

  const keyExtractor = useCallback((item: DomainSection) => String(item.title), []);

  const exploreEmpty = useMemo(
    () => (
      <View style={styles.emptyState}>
        <View style={styles.emptyIconWrap}>
          <Ionicons name="search-outline" size={32} color={Colors.textTertiary} />
        </View>
        <Text style={styles.emptyTitle}>No modules found</Text>
        <Text style={styles.emptyText}>Try a different search term</Text>
      </View>
    ),
    []
  );

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fitness Hub</Text>
        <Text style={styles.headerSub}>
          {MODULE_COUNT} modules, tools & learning guides
        </Text>

        <SegmentedControl
          options={TAB_OPTIONS}
          value={segmentValue}
          onChange={onTabChange}
        />

        <View style={styles.searchWrap}>
          <Ionicons name="search" size={18} color={Colors.textTertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search modules..."
            placeholderTextColor={Colors.textTertiary}
            value={searchQuery}
            onChangeText={onSearchChange}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={clearSearch} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="close-circle" size={18} color={Colors.textTertiary} />
            </Pressable>
          )}
        </View>

        {showExplore ? <ScrollProgressBar ref={exploreProgressRef} /> : null}
      </View>

      <View style={styles.body}>
        <View
          style={[styles.pane, showExplore && styles.paneHidden]}
          pointerEvents={showExplore ? 'none' : 'auto'}
        >
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
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
              onAction={switchToExplore}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredRow}
              onScroll={onLearningScroll}
              scrollEventThrottle={32}
            >
              {LEARNING_GUIDES.map((g) => (
                <LearningGuideItem
                  key={g.id}
                  guide={g}
                  onOpen={openLearningGuide}
                />
              ))}
            </ScrollView>
            <View style={styles.learningProgressWrap}>
              <ScrollProgressBar ref={learningProgressRef} />
            </View>

            <SectionHeader title="Activity & progress" icon="pulse-outline" />
            <AppCard padded={false}>
              <StepsPinnedPreviewCard onPress={openSteps} />
              <View style={styles.cardDivider} />
              <ListRow
                title="Activity Dashboard"
                subtitle="Weekly goals, heart points & metrics"
                iconName="analytics-outline"
                iconColor={Colors.brand}
                onPress={openActivityDashboard}
                animated={false}
              />
              <ListRow
                title="Track your progress"
                subtitle="Progress charts & body composition"
                iconName="trending-up-outline"
                iconColor={Colors.brand}
                onPress={openProgressTracking}
                showDivider={false}
                animated={false}
              />
            </AppCard>

            <SectionHeader title="Recommended for you" icon="star-outline" />
            <ModuleGroup modules={recommendedModules} onPress={navigateToModule} />

            {LIST_BOTTOM}
          </ScrollView>
        </View>

        {exploreMounted ? (
          <View
            style={[styles.pane, !showExplore && styles.paneHidden]}
            pointerEvents={showExplore ? 'auto' : 'none'}
          >
            <FlatList
              data={domainSections}
              keyExtractor={keyExtractor}
              renderItem={renderDomainSection}
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              onScroll={onExploreScroll}
              scrollEventThrottle={32}
              initialNumToRender={3}
              maxToRenderPerBatch={2}
              windowSize={5}
              removeClippedSubviews
              ListEmptyComponent={exploreEmpty}
              ListFooterComponent={LIST_BOTTOM}
            />
          </View>
        ) : null}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  body: { flex: 1 },
  pane: { flex: 1 },
  paneHidden: { display: 'none' },
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

  progressWrap: {
    alignSelf: 'flex-end',
    width: '42%',
    minWidth: 120,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.borderLight,
    overflow: 'hidden',
    position: 'relative',
  },
  progressThumb: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    borderRadius: 2,
    backgroundColor: Colors.brand,
  },
  learningProgressWrap: {
    marginBottom: Spacing.sm,
    alignItems: 'flex-end',
  },

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
