import React, { useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Gradients } from '../../theme';
import { AppCard, ListRow, ScreenHeader, SectionHeader } from '../../components/ui';
import ExploreCategoriesGrid from '../../components/fitness/ExploreCategoriesGrid';
import {
  FITNESS_MODULES,
  getModulesForExploreCategory,
} from '../../data/fitnessData';
import { getCategoryByName } from '../../data/fitnessExploreCategories';
import type { FitnessModule } from '../../types';
import { navigateClinicianFitnessModule } from '../../utils/fitnessModuleRouter';
import AppScreen from '../../components/common/AppScreen';

function moduleTypeLabel(mod: FitnessModule): string | undefined {
  switch (mod.category) {
    case 'anatomy':
      return '3D';
    case 'calculators':
      return 'Tool';
    case 'trackers':
      return 'Tracker';
    case 'brainGames':
      return 'Game';
    case 'mindBody':
      return 'Mind-body';
    case 'workouts':
      return 'Program';
    case 'education':
      return 'Guide';
    default:
      return undefined;
  }
}

export default function ClinicianFitnessLibraryScreen() {
  const navigation = useNavigation<any>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const modules = useMemo(() => {
    let list = selectedCategory
      ? getModulesForExploreCategory(selectedCategory)
      : FITNESS_MODULES;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.subtitle.toLowerCase().includes(q) ||
          (m.exploreTags ?? []).some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [selectedCategory, searchQuery]);

  const categoryMeta = selectedCategory ? getCategoryByName(selectedCategory) : null;
  const showingList = Boolean(selectedCategory || searchQuery.trim());

  const openModule = (mod: FitnessModule) => {
    navigateClinicianFitnessModule(navigation, mod);
  };

  return (
    <AppScreen style={styles.safe}>
      <ScreenHeader title="Module Library" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[...Gradients.primary]} style={styles.hero}>
          <View style={styles.heroTop}>
            <View style={styles.heroIconWrap}>
              <Ionicons name="library-outline" size={26} color={Colors.white} />
            </View>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>{FITNESS_MODULES.length}</Text>
              <Text style={styles.heroStatLabel}>modules</Text>
            </View>
          </View>
          <Text style={styles.heroTitle}>Clinical content library</Text>
          <Text style={styles.heroSub}>
            Preview modules before recommending them to patients — anatomy holograms, calculators, trackers, and guides.
          </Text>
        </LinearGradient>

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
              <Text style={styles.clearBtn}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        {!searchQuery && (
          <ExploreCategoriesGrid
            modules={FITNESS_MODULES}
            selectedCategory={selectedCategory}
            onSelectCategory={(name) => {
              setSelectedCategory((prev) => (prev === name ? null : name));
            }}
          />
        )}

        {selectedCategory && !searchQuery ? (
          <SectionHeader
            title={categoryMeta?.name ?? selectedCategory}
            actionLabel="Clear"
            onAction={() => setSelectedCategory(null)}
          />
        ) : searchQuery.trim() ? (
          <SectionHeader title={`${modules.length} result${modules.length === 1 ? '' : 's'}`} />
        ) : null}

        {showingList && modules.length > 0 && categoryMeta && !searchQuery ? (
          <View style={[styles.categoryBanner, { backgroundColor: categoryMeta.color + '14' }]}>
            <View style={[styles.categoryDot, { backgroundColor: categoryMeta.color }]} />
            <Text style={styles.categoryBannerText}>
              {modules.length} module{modules.length === 1 ? '' : 's'} in {categoryMeta.name}
            </Text>
          </View>
        ) : null}

        {showingList && modules.length === 0 ? (
          <View style={styles.empty}>
            <View style={styles.emptyIconWrap}>
              <Ionicons name="search-outline" size={32} color={Colors.textTertiary} />
            </View>
            <Text style={styles.emptyTitle}>No modules found</Text>
            <Text style={styles.emptyText}>Try another category or search term</Text>
          </View>
        ) : showingList ? (
          <ModuleGroup modules={modules} onPress={openModule} />
        ) : null}

        <View style={{ height: Spacing['2xl'] }} />
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
      {modules.map((mod, index) => {
        const typeLabel = moduleTypeLabel(mod);
        return (
          <ListRow
            key={mod.id}
            title={mod.title}
            subtitle={mod.subtitle}
            icon={<Text style={styles.moduleEmoji}>{mod.icon}</Text>}
            iconBg={mod.color + '22'}
            badge={mod.isPremium ? 'PRO' : undefined}
            badgeColor={Colors.brand}
            onPress={() => onPress(mod)}
            showDivider={index < modules.length - 1}
            trailing={
              typeLabel ? (
                <View style={styles.typePill}>
                  <Text style={styles.typePillText}>{typeLabel}</Text>
                  <Ionicons name="chevron-forward" size={12} color={Colors.textTertiary} />
                </View>
              ) : undefined
            }
          />
        );
      })}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: Spacing.base, paddingBottom: Spacing.base },

  hero: {
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  heroIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroStat: { alignItems: 'flex-end' },
  heroStatValue: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -0.5,
  },
  heroStatLabel: {
    fontSize: Typography.size.xs,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 6,
  },
  heroSub: {
    fontSize: Typography.size.sm,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
  },

  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    gap: Spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  searchInput: { flex: 1, fontSize: Typography.size.base, color: Colors.text, padding: 0 },
  clearBtn: { fontSize: Typography.size.sm, color: Colors.primary, fontWeight: '600' },

  categoryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    marginBottom: Spacing.sm,
  },
  categoryDot: { width: 8, height: 8, borderRadius: 4 },
  categoryBannerText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    fontWeight: '600',
  },

  moduleEmoji: { fontSize: 22 },
  typePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.surfaceSecondary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },
  typePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 0.3,
  },

  empty: { alignItems: 'center', paddingTop: Spacing['2xl'], gap: Spacing.sm },
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
