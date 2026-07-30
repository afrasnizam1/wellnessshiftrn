// src/screens/workout/WorkoutHubScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppScreen from '../../components/common/AppScreen';
import { AppCard } from '../../components/ui';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { Screen } from '../../navigation/screenNames';
import { WORKOUTS, WORKOUT_PROGRAMS, WORKOUT_CATEGORIES, type Workout, type WorkoutProgram } from '../../data/workouts';

export default function WorkoutHubScreen() {
  const navigation = useNavigation<any>();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<'workouts' | 'programs'>('workouts');

  const filteredWorkouts = WORKOUTS.filter(workout => 
    selectedCategory === 'all' || workout.category === selectedCategory
  );

  const filteredPrograms = WORKOUT_PROGRAMS.filter(program => 
    selectedCategory === 'all' || 
    program.workouts.some(workoutId => {
      const workout = WORKOUTS.find(w => w.id === workoutId);
      return workout?.category === selectedCategory;
    })
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return Colors.success;
      case 'intermediate': return Colors.warning;
      case 'advanced': return Colors.error;
      default: return Colors.textSecondary;
    }
  };

  const getCategoryColor = (category: string) => {
    const categoryData = WORKOUT_CATEGORIES.find(c => c.id === category);
    return categoryData?.color || Colors.textSecondary;
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = WORKOUT_CATEGORIES.find(c => c.id === category);
    return categoryData?.icon || 'fitness-outline';
  };

  const renderWorkoutCard = (workout: Workout) => (
    <TouchableOpacity
      key={workout.id}
      style={styles.workoutCard}
      onPress={() => navigation.navigate(Screen.workoutDetail, { workoutId: workout.id })}
      activeOpacity={0.8}
    >
      <View style={styles.workoutHeader}>
        <View style={[styles.categoryIcon, { backgroundColor: getCategoryColor(workout.category) + '20' }]}>
          <Ionicons name={getCategoryIcon(workout.category) as any} size={20} color={getCategoryColor(workout.category)} />
        </View>
        <View style={styles.workoutMeta}>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(workout.difficulty) + '20' }]}>
            <Text style={[styles.difficultyText, { color: getDifficultyColor(workout.difficulty) }]}>
              {workout.difficulty}
            </Text>
          </View>
          <Text style={styles.durationText}>{workout.duration} min</Text>
        </View>
      </View>

      <Text style={styles.workoutTitle}>{workout.name}</Text>
      <Text style={styles.workoutDescription}>{workout.description}</Text>

      <View style={styles.workoutStats}>
        <View style={styles.statItem}>
          <Ionicons name="flame-outline" size={16} color={Colors.error} />
          <Text style={styles.statText}>{workout.calories} cal</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="list-outline" size={16} color={Colors.textTertiary} />
          <Text style={styles.statText}>{workout.exercises.length} exercises</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="star" size={16} color={Colors.warning} />
          <Text style={styles.statText}>{workout.rating}</Text>
        </View>
      </View>

      <View style={styles.workoutFooter}>
        <View style={styles.equipmentList}>
          {workout.equipment.slice(0, 2).map((eq, index) => (
            <View key={index} style={styles.equipmentBadge}>
              <Text style={styles.equipmentText}>{eq}</Text>
            </View>
          ))}
          {workout.equipment.length > 2 && (
            <Text style={styles.moreEquipmentText}>+{workout.equipment.length - 2}</Text>
          )}
        </View>
        <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} />
      </View>
    </TouchableOpacity>
  );

  const renderProgramCard = (program: WorkoutProgram) => (
    <TouchableOpacity
      key={program.id}
      style={styles.programCard}
      onPress={() => navigation.navigate(Screen.workoutProgram, { programId: program.id })}
      activeOpacity={0.8}
    >
      <View style={styles.programHeader}>
        <View style={styles.programDuration}>
          <Text style={styles.programDurationText}>{program.duration} weeks</Text>
        </View>
        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(program.difficulty) + '20' }]}>
          <Text style={[styles.difficultyText, { color: getDifficultyColor(program.difficulty) }]}>
            {program.difficulty}
          </Text>
        </View>
      </View>

      <Text style={styles.programTitle}>{program.name}</Text>
      <Text style={styles.programDescription}>{program.description}</Text>

      <View style={styles.programStats}>
        <View style={styles.statItem}>
          <Ionicons name="calendar-outline" size={16} color={Colors.primary} />
          <Text style={styles.statText}>{program.workoutsPerWeek}x/week</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="flame-outline" size={16} color={Colors.error} />
          <Text style={styles.statText}>{program.estimatedCalories} cal/week</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="star" size={16} color={Colors.warning} />
          <Text style={styles.statText}>{program.rating}</Text>
        </View>
      </View>

      <View style={styles.programFooter}>
        <Text style={styles.programReviews}>{program.reviews} reviews</Text>
        <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <AppScreen style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Workouts</Text>
          <Text style={styles.subtitle}>Personalized exercise programs for your fitness goals</Text>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'workouts' && styles.tabActive]}
            onPress={() => setActiveTab('workouts')}
          >
            <Text style={[styles.tabText, activeTab === 'workouts' && styles.tabTextActive]}>
              Quick Workouts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'programs' && styles.tabActive]}
            onPress={() => setActiveTab('programs')}
          >
            <Text style={[styles.tabText, activeTab === 'programs' && styles.tabTextActive]}>
              Programs
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categorySection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryTabs}>
              <TouchableOpacity
                style={[styles.categoryTab, selectedCategory === 'all' && styles.categoryTabActive]}
                onPress={() => setSelectedCategory('all')}
              >
                <Text style={[styles.categoryTabText, selectedCategory === 'all' && styles.categoryTabTextActive]}>
                  All
                </Text>
              </TouchableOpacity>
              {WORKOUT_CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.categoryTab, selectedCategory === category.id && styles.categoryTabActive]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Text style={[styles.categoryTabText, selectedCategory === category.id && styles.categoryTabTextActive]}>
                    {category.name}
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
                <Text style={styles.statNumber}>{WORKOUTS.length}</Text>
                <Text style={styles.statLabel}>Workouts</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{WORKOUT_PROGRAMS.length}</Text>
                <Text style={styles.statLabel}>Programs</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {WORKOUTS.filter(w => w.difficulty === 'beginner').length}
                </Text>
                <Text style={styles.statLabel}>Beginner</Text>
              </View>
            </View>
          </AppCard>
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>
            {activeTab === 'workouts' ? 'Quick Workouts' : 'Workout Programs'}
          </Text>
          
          {activeTab === 'workouts' ? (
            filteredWorkouts.length === 0 ? (
              <AppCard style={styles.emptyCard}>
                <Ionicons name="fitness-outline" size={48} color={Colors.textTertiary} />
                <Text style={styles.emptyTitle}>No workouts found</Text>
                <Text style={styles.emptyText}>Try adjusting your category filter</Text>
              </AppCard>
            ) : (
              filteredWorkouts.map(renderWorkoutCard)
            )
          ) : (
            filteredPrograms.length === 0 ? (
              <AppCard style={styles.emptyCard}>
                <Ionicons name="calendar-outline" size={48} color={Colors.textTertiary} />
                <Text style={styles.emptyTitle}>No programs found</Text>
                <Text style={styles.emptyText}>Try adjusting your category filter</Text>
              </AppCard>
            ) : (
              filteredPrograms.map(renderProgramCard)
            )
          )}
        </View>

        <TouchableOpacity
          style={styles.startWorkoutButton}
          onPress={() => navigation.navigate(Screen.workoutTracker)}
        >
          <Ionicons name="play-circle" size={20} color={Colors.white} />
          <Text style={styles.startWorkoutText}>Start Quick Workout</Text>
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.lg,
    padding: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: Radius.md,
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.white,
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
    backgroundColor: Colors.surfaceSecondary,
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
  contentSection: {
    gap: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  workoutCard: {
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
    backgroundColor: Colors.white,
    gap: Spacing.md,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutMeta: {
    alignItems: 'flex-end',
    gap: Spacing.xs,
  },
  difficultyBadge: {
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
  workoutTitle: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  workoutDescription: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  workoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
  workoutFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  equipmentList: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  equipmentBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceSecondary,
  },
  equipmentText: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
  },
  moreEquipmentText: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
  },
  programCard: {
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
    backgroundColor: Colors.white,
    gap: Spacing.md,
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  programDuration: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary + '20',
  },
  programDurationText: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
    color: Colors.primary,
  },
  programTitle: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  programDescription: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  programStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  programFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  programReviews: {
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
  startWorkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    marginTop: Spacing.md,
  },
  startWorkoutText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Typography.size.base,
  },
});
