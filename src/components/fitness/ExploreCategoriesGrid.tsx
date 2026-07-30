import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { SectionHeader } from '../ui';
import {
  FITNESS_EXPLORE_CATEGORIES,
  countModulesInCategory,
} from '../../data/fitnessExploreCategories';
import type { FitnessModule } from '../../types';

type Props = {
  modules: FitnessModule[];
  selectedCategory?: string | null;
  onSelectCategory: (categoryName: string) => void;
};

export default function ExploreCategoriesGrid({ modules, selectedCategory, onSelectCategory }: Props) {
  return (
    <>
      <SectionHeader title="Explore categories" icon="grid-outline" />
      <View style={styles.grid}>
        {FITNESS_EXPLORE_CATEGORIES.map((cat) => {
          const count = countModulesInCategory(modules, cat.name);
          if (count === 0) return null;
          const selected = selectedCategory === cat.name;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[styles.card, selected && styles.cardSelected]}
              onPress={() => onSelectCategory(cat.name)}
              activeOpacity={0.85}
            >
              <View style={[styles.icon, { backgroundColor: cat.color + '22' }]}>
                <Ionicons
                  name={cat.icon in Ionicons.glyphMap ? cat.icon : 'ellipse-outline'}
                  size={20}
                  color={cat.color}
                />
              </View>
              <Text style={styles.name} numberOfLines={2}>{cat.name}</Text>
              <Text style={styles.count}>{count}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  card: {
    width: '31%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.sm,
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
    minHeight: 96,
  },
  cardSelected: {
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: Colors.primaryLight,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 14,
  },
  count: {
    fontSize: 10,
    color: Colors.textTertiary,
    marginTop: 4,
    fontWeight: '700',
  },
});
