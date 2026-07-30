// src/screens/anatomy/AnatomyLearningScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppScreen from '../../components/common/AppScreen';
import { AppCard } from '../../components/ui';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { Screen } from '../../navigation/screenNames';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  thumbnail?: string;
  prerequisites?: string[];
}

const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'basics',
    title: 'Anatomy Basics',
    description: 'Fundamental concepts, terminology, and body systems overview',
    duration: '15 min',
    difficulty: 'Beginner',
    category: 'Foundations',
    progress: 0,
    totalLessons: 5,
    completedLessons: 0,
  },
  {
    id: 'skeletal',
    title: 'Skeletal System',
    description: 'Bone structure, joint mechanics, and skeletal anatomy',
    duration: '25 min',
    difficulty: 'Intermediate',
    category: 'Systems',
    progress: 0,
    totalLessons: 8,
    completedLessons: 0,
    prerequisites: ['basics'],
  },
  {
    id: 'muscular',
    title: 'Muscular System',
    description: 'Major muscle groups, functions, and movement patterns',
    duration: '20 min',
    difficulty: 'Intermediate',
    category: 'Systems',
    progress: 0,
    totalLessons: 7,
    completedLessons: 0,
    prerequisites: ['basics'],
  },
  {
    id: 'circulatory',
    title: 'Circulatory System',
    description: 'Heart anatomy, blood vessels, and blood circulation',
    duration: '30 min',
    difficulty: 'Advanced',
    category: 'Systems',
    progress: 0,
    totalLessons: 10,
    completedLessons: 0,
    prerequisites: ['basics'],
  },
  {
    id: 'nervous',
    title: 'Nervous System',
    description: 'Brain structure, spinal cord, and peripheral nerves',
    duration: '35 min',
    difficulty: 'Advanced',
    category: 'Systems',
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    prerequisites: ['basics'],
  },
  {
    id: 'movement',
    title: 'Movement Patterns',
    description: 'How body systems work together during movement',
    duration: '30 min',
    difficulty: 'Advanced',
    category: 'Applications',
    progress: 0,
    totalLessons: 9,
    completedLessons: 0,
    prerequisites: ['skeletal', 'muscular'],
  },
];

const CATEGORIES = ['All', 'Foundations', 'Systems', 'Applications'];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return Colors.success;
    case 'Intermediate': return Colors.warning;
    case 'Advanced': return Colors.error;
    default: return Colors.textSecondary;
  }
};

const getDifficultyIcon = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'leaf-outline';
    case 'Intermediate': return 'flame-outline';
    case 'Advanced': return 'trophy-outline';
    default: return 'help-outline';
  }
};

export default function AnatomyLearningScreen() {
  const navigation = useNavigation<any>();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredModules = LEARNING_MODULES.filter(module => {
    const matchesCategory = selectedCategory === 'All' || module.category === selectedCategory;
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleModulePress = (module: LearningModule) => {
    navigation.navigate(Screen.anatomyModule, { moduleId: module.id });
  };

  const renderModuleCard = (module: LearningModule) => (
    <TouchableOpacity
      key={module.id}
      style={styles.moduleCard}
      onPress={() => handleModulePress(module)}
      activeOpacity={0.8}
    >
      <View style={styles.moduleHeader}>
        <View style={styles.moduleInfo}>
          <Text style={styles.moduleTitle}>{module.title}</Text>
          <Text style={styles.moduleDescription}>{module.description}</Text>
        </View>
        <View style={styles.moduleMeta}>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(module.difficulty) + '20' }]}>
            <Ionicons
              name={getDifficultyIcon(module.difficulty) as any}
              size={16}
              color={getDifficultyColor(module.difficulty)}
            />
            <Text style={[styles.difficultyText, { color: getDifficultyColor(module.difficulty) }]}>
              {module.difficulty}
            </Text>
          </View>
          <Text style={styles.durationText}>{module.duration}</Text>
        </View>
      </View>

      <View style={styles.moduleStats}>
        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>Progress</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${module.progress}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {module.completedLessons}/{module.totalLessons} lessons
          </Text>
        </View>

        <View style={styles.moduleActions}>
          {module.progress === 0 ? (
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
          ) : module.progress === 100 ? (
            <TouchableOpacity style={styles.completedButton}>
              <Ionicons name="checkmark-circle" size={16} color={Colors.white} />
              <Text style={styles.completedButtonText}>Completed</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.continueButton}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {module.prerequisites && module.prerequisites.length > 0 && (
        <View style={styles.prerequisites}>
          <Ionicons name="lock-closed" size={14} color={Colors.textTertiary} />
          <Text style={styles.prerequisitesText}>
            Requires: {module.prerequisites.join(', ')}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <AppScreen style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Anatomy Learning</Text>
          <Text style={styles.subtitle}>Master human anatomy with interactive 3D lessons</Text>
        </View>

        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={Colors.textTertiary} />
            <Text style={styles.searchPlaceholder}>Search modules...</Text>
          </View>
        </View>

        <View style={styles.categorySection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryTabs}>
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryTab,
                    selectedCategory === category && styles.categoryTabActive,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={[
                    styles.categoryTabText,
                    selectedCategory === category && styles.categoryTabTextActive,
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.statsSection}>
          <AppCard style={styles.statsCard}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{LEARNING_MODULES.length}</Text>
                <Text style={styles.statLabel}>Total Modules</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {LEARNING_MODULES.filter(m => m.progress > 0).length}
                </Text>
                <Text style={styles.statLabel}>Started</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {LEARNING_MODULES.filter(m => m.progress === 100).length}
                </Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
            </View>
          </AppCard>
        </View>

        <View style={styles.modulesSection}>
          <Text style={styles.sectionTitle}>Learning Modules</Text>
          {filteredModules.length === 0 ? (
            <AppCard style={styles.emptyCard}>
              <Ionicons name="search-outline" size={48} color={Colors.textTertiary} />
              <Text style={styles.emptyTitle}>No modules found</Text>
              <Text style={styles.emptyText}>Try adjusting your search or category filter</Text>
            </AppCard>
          ) : (
            filteredModules.map(renderModuleCard)
          )}
        </View>

        <TouchableOpacity
          style={styles.exploreButton}
          onPress={() => navigation.navigate(Screen.anatomyExplorer)}
        >
          <Ionicons name="body-outline" size={20} color={Colors.white} />
          <Text style={styles.exploreButtonText}>Explore 3D Anatomy</Text>
          <Ionicons name="arrow-forward" size={16} color={Colors.white} />
        </TouchableOpacity>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { 
    padding: Spacing.base, 
    paddingTop: Spacing.xl, 
    gap: Spacing.md, 
    paddingBottom: Spacing['2xl'] 
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  title: { 
    fontSize: Typography.size['2xl'], 
    fontWeight: '800', 
    color: Colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  searchSection: {
    marginBottom: Spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },
  searchPlaceholder: {
    fontSize: Typography.size.base,
    color: Colors.textTertiary,
  },
  categorySection: {
    marginBottom: Spacing.sm,
  },
  categoryTabs: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  categoryTab: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    backgroundColor: Colors.backgroundSecondary,
  },
  categoryTabActive: {
    backgroundColor: Colors.primary,
  },
  categoryTabText: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  categoryTabTextActive: {
    color: Colors.white,
  },
  statsSection: {
    marginBottom: Spacing.sm,
  },
  statsCard: {
    padding: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.borderLight,
  },
  modulesSection: {
    gap: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  moduleCard: {
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
    gap: Spacing.md,
    backgroundColor: Colors.white,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  moduleInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  moduleTitle: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  moduleDescription: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  moduleMeta: {
    alignItems: 'flex-end',
    gap: Spacing.xs,
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.md,
  },
  difficultyText: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
  },
  durationText: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
  },
  moduleStats: {
    gap: Spacing.sm,
  },
  progressSection: {
    gap: Spacing.xs,
  },
  progressLabel: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.borderLight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.success,
  },
  progressText: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
  },
  moduleActions: {
    alignSelf: 'flex-start',
  },
  startButton: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  startButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Typography.size.sm,
  },
  continueButton: {
    backgroundColor: Colors.warning,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  continueButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Typography.size.sm,
  },
  completedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.success,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  completedButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Typography.size.sm,
  },
  prerequisites: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  prerequisitesText: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
  },
  emptyCard: {
    alignItems: 'center',
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  emptyTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  emptyText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    marginTop: Spacing.md,
  },
  exploreButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Typography.size.base,
  },
});
