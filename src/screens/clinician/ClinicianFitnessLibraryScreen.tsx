import React, { useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, fitnessModuleIonIcon } from '../../theme';
import { ClinicianTheme, ClinicianType } from '../../theme/clinicianTheme';
import { AppCard, AnimatedPressable, ListRow, ScreenHeader, SectionHeader } from '../../components/ui';
import ExploreCategoriesGrid from '../../components/fitness/ExploreCategoriesGrid';
import {
  FITNESS_MODULES,
  FITNESS_DOMAIN_GROUPS,
  getModulesForExploreCategory,
} from '../../data/fitnessData';
import { getCategoryByName } from '../../data/fitnessExploreCategories';
import type { FitnessModule } from '../../types';
import { navigateClinicianFitnessModule } from '../../utils/fitnessModuleRouter';
import AppScreen from '../../components/common/AppScreen';

function moduleTypeLabel(mod: FitnessModule): string | undefined {
  switch (mod.category) {
    case 'anatomy': return '3D';
    case 'calculators': return 'Tool';
    case 'trackers': return 'Tracker';
    case 'brainGames': return 'Game';
    case 'mindBody': return 'Mind-body';
    case 'workouts': return 'Program';
    case 'education': return 'Guide';
    default: return undefined;
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
          m.id.toLowerCase().includes(q) ||
          (m.exploreTags ?? []).some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [selectedCategory, searchQuery]);

  const categoryMeta = selectedCategory ? getCategoryByName(selectedCategory) : null;
  const showingFiltered = Boolean(selectedCategory || searchQuery.trim());

  const domainGroups = useMemo(() => {
    if (showingFiltered) return [];
    return FITNESS_DOMAIN_GROUPS;
  }, [showingFiltered]);

  const openModule = (mod: FitnessModule) => {
    navigateClinicianFitnessModule(navigation, mod);
  };

  return (
    <AppScreen mesh={false} backgroundColor={ClinicianTheme.canvas} style={styles.safe}>
      <ScreenHeader title="Module Library" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppCard style={styles.hero}>
          <View style={styles.heroTop}>
            <View style={styles.heroIconWrap}>
              <Ionicons name="library-outline" size={22} color={ClinicianTheme.accent} />
            </View>
            <View>
              <Text style={styles.heroStatValue}>{FITNESS_MODULES.length}</Text>
              <Text style={styles.heroStatLabel}>Fitness Hub modules</Text>
            </View>
          </View>
          <Text style={styles.heroTitle}>Same catalog as patients</Text>
          <Text style={styles.heroSub}>
            Preview every Fitness Hub module before recommending — including High Protein Meals, anatomy, trackers, and guides.
          </Text>
        </AppCard>

        <View style={styles.searchWrap}>
          <Ionicons name="search" size={18} color={Colors.textTertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search modules..."
            placeholderTextColor={Colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 ? (
            <AnimatedPressable onPress={() => setSearchQuery('')} hitSlop={8}>
              <Text style={styles.clearBtn}>Clear</Text>
            </AnimatedPressable>
          ) : null}
        </View>

        {!searchQuery ? (
          <ExploreCategoriesGrid
            modules={FITNESS_MODULES}
            selectedCategory={selectedCategory}
            onSelectCategory={(name) => {
              setSelectedCategory((prev) => (prev === name ? null : name));
            }}
          />
        ) : null}

        {selectedCategory && !searchQuery ? (
          <SectionHeader
            title={categoryMeta?.name ?? selectedCategory}
            actionLabel="Clear"
            onAction={() => setSelectedCategory(null)}
          />
        ) : searchQuery.trim() ? (
          <SectionHeader title={`${modules.length} result${modules.length === 1 ? '' : 's'}`} />
        ) : (
          <Text style={styles.browseLabel}>Browse by domain</Text>
        )}

        {showingFiltered && modules.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No modules found</Text>
            <Text style={styles.emptyText}>Try another category or search term</Text>
          </View>
        ) : showingFiltered ? (
          <ModuleGroup modules={modules} onPress={openModule} />
        ) : (
          domainGroups.map((group) => (
            <View key={String(group.title)} style={styles.group}>
              <SectionHeader title={String(group.title)} />
              <ModuleGroup modules={group.data} onPress={openModule} />
            </View>
          ))
        )}

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
            iconName={fitnessModuleIonIcon(mod)}
            iconColor={mod.color}
            badge={mod.isPremium ? 'PRO' : undefined}
            badgeColor={Colors.brand}
            onPress={() => onPress(mod)}
            showDivider={index < modules.length - 1}
            animated={false}
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
  safe: { flex: 1 },
  content: { paddingHorizontal: Spacing.base, paddingBottom: Spacing.base, gap: Spacing.md },
  hero: { gap: Spacing.sm },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.xs,
  },
  heroIconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: ClinicianTheme.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroStatValue: {
    fontSize: Typography.size.xl,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.4,
  },
  heroStatLabel: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: Typography.size.md,
    fontWeight: '700',
    color: Colors.text,
  },
  heroSub: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    gap: Spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  searchInput: { flex: 1, fontSize: Typography.size.base, color: Colors.text, padding: 0 },
  clearBtn: { fontSize: Typography.size.sm, color: ClinicianTheme.accent, fontWeight: '600' },
  browseLabel: {
    ...ClinicianType.sectionLabel,
    marginTop: Spacing.xs,
  },
  group: { gap: Spacing.xs },
  typePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.surfaceSecondary,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: Radius.sm,
  },
  typePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  empty: { alignItems: 'center', paddingTop: Spacing['2xl'], gap: Spacing.sm },
  emptyTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text },
  emptyText: { fontSize: Typography.size.sm, color: Colors.textSecondary },
});
