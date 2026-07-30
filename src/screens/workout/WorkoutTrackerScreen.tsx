// src/screens/workout/WorkoutTrackerScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Alert, Animated,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppScreen from '../../components/common/AppScreen';
import { AppCard } from '../../components/ui';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { Screen } from '../../navigation/screenNames';
import { WORKOUTS, EXERCISES, type Workout, type Exercise } from '../../data/workouts';

export default function WorkoutTrackerScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { workoutId } = route.params || {};
  
  const [workout] = useState<Workout>(WORKOUTS.find(w => w.id === workoutId) || WORKOUTS[0]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [restTimeRemaining, setRestTimeRemaining] = useState(0);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
  const [workoutStartTime] = useState(Date.now());
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  
  const progressAnim = useRef(new Animated.Value(0)).current;
  const restTimerRef = useRef<NodeJS.Timeout>();

  const currentExercise = workout.exercises[currentExerciseIndex];
  const exerciseDetails = EXERCISES.find(e => e.id === currentExercise.exerciseId);
  const overallProgress = ((currentExerciseIndex / workout.exercises.length) * 100);
  const exerciseProgress = ((currentSet - 1) / (currentExercise.sets || 1)) * 100;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: overallProgress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [overallProgress]);

  useEffect(() => {
    if (isResting && restTimeRemaining > 0) {
      restTimerRef.current = setTimeout(() => {
        setRestTimeRemaining(restTimeRemaining - 1);
      }, 1000);
    } else if (isResting && restTimeRemaining === 0) {
      setIsResting(false);
      if (currentSet >= (currentExercise.sets || 1)) {
        moveToNextExercise();
      }
    }

    return () => {
      if (restTimerRef.current) {
        clearTimeout(restTimerRef.current);
      }
    };
  }, [isResting, restTimeRemaining, currentSet, currentExercise.sets]);

  const startRest = () => {
    if (currentExercise.rest) {
      setIsResting(true);
      setRestTimeRemaining(currentExercise.rest);
    } else {
      if (currentSet >= (currentExercise.sets || 1)) {
        moveToNextExercise();
      } else {
        setCurrentSet(currentSet + 1);
      }
    }
  };

  const moveToNextExercise = () => {
    if (!completedExercises.includes(currentExercise.exerciseId)) {
      setCompletedExercises([...completedExercises, currentExercise.exerciseId]);
    }

    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentSet(1);
      setIsResting(false);
    } else {
      completeWorkout();
    }
  };

  const completeWorkout = () => {
    setIsWorkoutComplete(true);
    const workoutDuration = Math.floor((Date.now() - workoutStartTime) / 1000 / 60);
    
    Alert.alert(
      'Workout Complete! 🎉',
      `Great job! You completed ${workout.name} in ${workoutDuration} minutes.\n\nCalories burned: ~${workout.calories}`,
      [
        { text: 'View Summary', onPress: () => navigation.goBack() },
        { text: 'Start Another', onPress: () => navigation.navigate(Screen.workoutHub) },
      ]
    );
  };

  const skipExercise = () => {
    Alert.alert(
      'Skip Exercise?',
      'Are you sure you want to skip this exercise?',
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Yes', 
          onPress: moveToNextExercise 
        },
      ]
    );
  };

  const pauseWorkout = () => {
    Alert.alert(
      'Pause Workout',
      'Workout paused. Take a break and resume when ready.',
      [{ text: 'Resume', style: 'cancel' }]
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isWorkoutComplete) {
    return (
      <AppScreen style={styles.safe}>
        <View style={styles.completeContainer}>
          <Ionicons name="trophy" size={64} color={Colors.warning} />
          <Text style={styles.completeTitle}>Workout Complete!</Text>
          <Text style={styles.completeSubtitle}>Great job on completing {workout.name}</Text>
          
          <AppCard style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Workout Summary</Text>
            <View style={styles.summaryStats}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{workout.exercises.length}</Text>
                <Text style={styles.summaryLabel}>Exercises</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{workout.duration}</Text>
                <Text style={styles.summaryLabel}>Minutes</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{workout.calories}</Text>
                <Text style={styles.summaryLabel}>Calories</Text>
              </View>
            </View>
          </AppCard>

          <TouchableOpacity 
            style={styles.doneButton}
            onPress={() => navigation.navigate(Screen.workoutHub)}
          >
            <Text style={styles.doneButtonText}>Back to Workouts</Text>
          </TouchableOpacity>
        </View>
      </AppScreen>
    );
  }

  if (isResting) {
    return (
      <AppScreen style={styles.safe}>
        <View style={styles.restContainer}>
          <View style={styles.restHeader}>
            <Text style={styles.restTitle}>Rest Time</Text>
            <Text style={styles.restSubtitle}>Prepare for next set</Text>
          </View>
          
          <View style={styles.restTimer}>
            <Text style={styles.restTime}>{formatTime(restTimeRemaining)}</Text>
            <Animated.View 
              style={[
                styles.restProgress,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }),
                }
              ]} 
            />
          </View>

          <TouchableOpacity 
            style={styles.skipRestButton}
            onPress={() => {
              setIsResting(false);
              setRestTimeRemaining(0);
            }}
          >
            <Text style={styles.skipRestText}>Skip Rest</Text>
          </TouchableOpacity>
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={pauseWorkout}
          >
            <Ionicons name="pause-outline" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{workout.name}</Text>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={skipExercise}
          >
            <Ionicons name="skip-forward-outline" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <Animated.View 
              style={[
                styles.progressFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }),
                }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            Exercise {currentExerciseIndex + 1} of {workout.exercises.length}
          </Text>
        </View>

        <AppCard style={styles.exerciseCard}>
          <View style={styles.exerciseHeader}>
            <Text style={styles.exerciseNumber}>{currentExerciseIndex + 1}</Text>
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseName}>{exerciseDetails?.name}</Text>
              <Text style={styles.exerciseDescription}>{exerciseDetails?.description}</Text>
            </View>
          </View>

          <View style={styles.setInfo}>
            <Text style={styles.setText}>Set {currentSet} of {currentExercise.sets}</Text>
            {currentExercise.reps && (
              <Text style={styles.repsText}>{currentExercise.reps} reps</Text>
            )}
            {currentExercise.duration && (
              <Text style={styles.durationText}>{currentExercise.duration} seconds</Text>
            )}
          </View>

          <View style={styles.exerciseInstructions}>
            <Text style={styles.instructionsTitle}>Instructions:</Text>
            {exerciseDetails?.instructions.map((instruction, index) => (
              <Text key={index} style={styles.instructionText}>
                {index + 1}. {instruction}
              </Text>
            ))}
          </View>

          {exerciseDetails?.tips && exerciseDetails.tips.length > 0 && (
            <View style={styles.tipsSection}>
              <Text style={styles.tipsTitle}>Tips:</Text>
              {exerciseDetails.tips.slice(0, 2).map((tip, index) => (
                <Text key={index} style={styles.tipText}>• {tip}</Text>
              ))}
            </View>
          )}
        </AppCard>

        <View style={styles.actionSection}>
          <TouchableOpacity 
            style={styles.completeSetButton}
            onPress={startRest}
          >
            <Ionicons name="checkmark-circle" size={24} color={Colors.white} />
            <Text style={styles.completeSetText}>Complete Set</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: {
    flex: 1,
    padding: Spacing.base,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  headerButton: {
    padding: Spacing.sm,
  },
  headerTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  progressSection: {
    marginBottom: Spacing.lg,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.borderLight,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  progressText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  exerciseCard: {
    flex: 1,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  exerciseNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 40,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  exerciseDescription: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  setInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
  },
  setText: {
    fontSize: Typography.size.base,
    fontWeight: '600',
    color: Colors.text,
  },
  repsText: {
    fontSize: Typography.size.base,
    color: Colors.primary,
  },
  durationText: {
    fontSize: Typography.size.base,
    color: Colors.primary,
  },
  exerciseInstructions: {
    gap: Spacing.sm,
  },
  instructionsTitle: {
    fontSize: Typography.size.base,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  instructionText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  tipsSection: {
    gap: Spacing.sm,
  },
  tipsTitle: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  tipText: {
    fontSize: Typography.size.sm,
    color: Colors.textTertiary,
  },
  actionSection: {
    gap: Spacing.md,
  },
  completeSetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.success,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
  },
  completeSetText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Typography.size.base,
  },
  restContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  restHeader: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  restTitle: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: Colors.text,
  },
  restSubtitle: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
  },
  restTimer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    position: 'relative',
  },
  restTime: {
    fontSize: Typography.size['3xl'],
    fontWeight: '800',
    color: Colors.primary,
  },
  restProgress: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 8,
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  skipRestButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  skipRestText: {
    fontSize: Typography.size.base,
    fontWeight: '600',
    color: Colors.text,
  },
  completeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  completeTitle: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: Colors.text,
    marginTop: Spacing.lg,
  },
  completeSubtitle: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  summaryCard: {
    width: '100%',
    padding: Spacing.lg,
    marginTop: Spacing.xl,
  },
  summaryTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: Colors.primary,
  },
  summaryLabel: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  doneButton: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.xl,
  },
  doneButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Typography.size.base,
  },
});
