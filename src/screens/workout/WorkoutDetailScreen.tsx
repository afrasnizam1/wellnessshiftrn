// src/screens/workout/WorkoutDetailScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppScreen from '../../components/common/AppScreen';
import { AppCard } from '../../components/ui';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { Screen } from '../../navigation/screenNames';
import { WORKOUTS, EXERCISES, type Workout, type Exercise } from '../../data/workouts';

export default function WorkoutDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { workoutId } = route.params || {};
  
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  
  const workout = WORKOUTS.find(w => w.id === workoutId) || WORKOUTS[0];
  const exercises = workout.exercises.map(exercise => ({
    ...exercise,
    details: EXERCISES.find(e => e.id === exercise.exerciseId)
  }));

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return Colors.success;
      case 'intermediate': return Colors.warning;
      case 'advanced': return Colors.error;
      default: return Colors.textSecondary;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'strength': return '#FF6B6B';
      case 'cardio': return '#FF4444';
      case 'flexibility': return '#4ECDC4';
      case 'balance': return '#946BFA';
      default: return Colors.textSecondary;
    }
  };

  const handleStartWorkout = () => {
    setIsWorkoutStarted(true);
    navigation.navigate(Screen.workoutTracker, { workoutId });
  };

  const renderExerciseItem = (exercise: any, index: number) => (
    <View key={index} style={styles.exerciseItem}>
      <View style={styles.exerciseHeader}>
        <View style={styles.exerciseNumber}>
          <Text style={styles.exerciseNumberText}>{index + 1}</Text>
        </View>
        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseName}>{exercise.details?.name}</Text>
          <Text style={styles.exerciseDescription}>{exercise.details?.description}</Text>
        </View>
        <View style={styles.exerciseMeta}>
          <Text style={styles.exerciseSets}>
            {exercise.sets ? `${exercise.sets} sets` : ''}
            {exercise.reps ? ` × ${exercise.reps} reps` : ''}
            {exercise.duration ? ` × ${exercise.duration}s` : ''}
          </Text>
          {exercise.rest && (
            <Text style={styles.exerciseRest}>Rest: {exercise.rest}s</Text>
          )}
        </View>
      </View>
      
      <View style={styles.exerciseDetails}>
        <View style={styles.exerciseStats}>
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={16} color={Colors.textTertiary} />
            <Text style={styles.statText}>{exercise.details?.duration} min</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="flame-outline" size={16} color={Colors.error} />
            <Text style={styles.statText}>{exercise.details?.calories} cal</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="fitness-outline" size={16} color={getCategoryColor(exercise.details?.category || '')} />
            <Text style={styles.statText}>{exercise.details?.category}</Text>
          </View>
        </View>
        
        <View style={styles.muscleGroups}>
          <Text style={styles.muscleGroupsTitle}>Target Muscles:</Text>
          <View style={styles.muscleGroupList}>
            {exercise.details?.muscleGroups?.map((muscle: string, muscleIndex: number) => (
              <View key={muscleIndex} style={styles.muscleGroupBadge}>
                <Text style={styles.muscleGroupText}>{muscle}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.equipmentSection}>
          <Text style={styles.equipmentTitle}>Equipment:</Text>
          <Text style={styles.equipmentText}>{exercise.details?.equipment === 'none' ? 'None' : exercise.details?.equipment}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <AppScreen style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>{workout.name}</Text>
        </View>

        <AppCard style={styles.workoutInfoCard}>
          <View style={styles.workoutHeader}>
            <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(workout.category) + '20' }]}>
              <Text style={[styles.categoryText, { color: getCategoryColor(workout.category) }]}>
                {workout.category}
              </Text>
            </View>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(workout.difficulty) + '20' }]}>
              <Text style={[styles.difficultyText, { color: getDifficultyColor(workout.difficulty) }]}>
                {workout.difficulty}
              </Text>
            </View>
          </View>
          
          <Text style={styles.workoutDescription}>{workout.description}</Text>
          
          <View style={styles.workoutStats}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={20} color={Colors.primary} />
              <Text style={styles.statValue}>{workout.duration} min</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="flame-outline" size={20} color={Colors.error} />
              <Text style={styles.statValue}>{workout.calories} cal</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="list-outline" size={20} color={Colors.textTertiary} />
              <Text style={styles.statValue}>{workout.exercises.length} exercises</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="star" size={20} color={Colors.warning} />
              <Text style={styles.statValue}>{workout.rating}</Text>
            </View>
          </View>
        </AppCard>

        <View style={styles.equipmentCard}>
          <Text style={styles.sectionTitle}>Equipment Needed</Text>
          <View style={styles.equipmentList}>
            {workout.equipment.length === 0 ? (
              <View style={styles.equipmentItem}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                <Text style={styles.equipmentItemText}>No equipment required</Text>
              </View>
            ) : (
              workout.equipment.map((equipment, index) => (
                <View key={index} style={styles.equipmentItem}>
                  <Ionicons name="cube-outline" size={16} color={Colors.primary} />
                  <Text style={styles.equipmentItemText}>{equipment}</Text>
                </View>
              ))
            )}
          </View>
        </View>

        <View style={styles.exercisesSection}>
          <Text style={styles.sectionTitle}>Exercises</Text>
          {exercises.map((exercise, index) => renderExerciseItem(exercise, index))}
        </View>

        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Workout Tips</Text>
          <AppCard style={styles.tipsCard}>
            <View style={styles.tipItem}>
              <Ionicons name="water-outline" size={20} color={Colors.primary} />
              <Text style={styles.tipText}>Stay hydrated throughout the workout</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="timer-outline" size={20} color={Colors.warning} />
              <Text style={styles.tipText}>Rest between sets as specified</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="body-outline" size={20} color={Colors.success} />
              <Text style={styles.tipText}>Focus on proper form over speed or weight</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="pulse-outline" size={20} color={Colors.error} />
              <Text style={styles.tipText}>Listen to your body and stop if you feel pain</Text>
            </View>
          </AppCard>
        </View>

        <TouchableOpacity style={styles.startButton} onPress={handleStartWorkout}>
          <Ionicons name="play-circle" size={24} color={Colors.white} />
          <Text style={styles.startButtonText}>Start Workout</Text>
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
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  backButton: {
    padding: Spacing.sm,
  },
  title: { 
    fontSize: Typography.size['2xl'], 
    fontWeight: '800', 
    color: Colors.text,
  },
  content: { 
    padding: Spacing.base, 
    paddingTop: Spacing.xl, 
    gap: Spacing.md, 
    paddingBottom: Spacing['2xl'] 
  },
  workoutInfoCard: {
    gap: Spacing.md,
  },
  workoutHeader: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  categoryBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.md,
  },
  categoryText: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
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
  workoutDescription: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  workoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  statItem: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statValue: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  statText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  equipmentCard: {
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
    gap: Spacing.sm,
  },
  sectionTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  equipmentList: {
    gap: Spacing.sm,
  },
  equipmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  equipmentItemText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  exercisesSection: {
    gap: Spacing.md,
  },
  exerciseItem: {
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
    backgroundColor: Colors.white,
    gap: Spacing.md,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  exerciseNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseNumberText: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.white,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  exerciseDescription: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  exerciseMeta: {
    alignItems: 'flex-end',
    gap: Spacing.xs,
  },
  exerciseSets: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  exerciseRest: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
  },
  exerciseDetails: {
    gap: Spacing.sm,
  },
  exerciseStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  muscleGroups: {
    gap: Spacing.xs,
  },
  muscleGroupsTitle: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  muscleGroupList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  muscleGroupBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceSecondary,
  },
  muscleGroupText: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
  },
  equipmentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  equipmentTitle: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  equipmentText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  tipsSection: {
    gap: Spacing.md,
  },
  tipsCard: {
    gap: Spacing.md,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  tipText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    flex: 1,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    marginTop: Spacing.md,
  },
  startButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Typography.size.base,
  },
});
