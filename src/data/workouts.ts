// src/data/workouts.ts
export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'balance' | 'functional';
  muscleGroups: string[];
  equipment: 'none' | 'dumbbells' | 'resistance-bands' | 'yoga-mat' | 'bench' | 'full-gym';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  instructions: string[];
  tips: string[];
  benefits: string[];
  calories: number;
  videoUrl?: string;
  imageUrl?: string;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'balance' | 'functional' | 'hiit' | 'yoga' | 'pilates';
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: Array<{
    exerciseId: string;
    sets?: number;
    reps?: number;
    duration?: number;
    rest?: number;
  }>;
  goals: string[];
  equipment: string[];
  calories: number;
  rating: number;
  reviews: number;
  isPremium?: boolean;
}

export interface WorkoutProgram {
  id: string;
  name: string;
  description: string;
  duration: number; // in weeks
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  workoutsPerWeek: number;
  workouts: string[]; // workout IDs
  goals: string[];
  equipment: string[];
  estimatedCalories: number;
  rating: number;
  reviews: number;
  isPremium?: boolean;
}

export const EXERCISES: Exercise[] = [
  // Bodyweight Strength Exercises
  {
    id: 'push-ups',
    name: 'Push-ups',
    description: 'Classic upper body exercise targeting chest, shoulders, and triceps',
    category: 'strength',
    muscleGroups: ['chest', 'shoulders', 'triceps', 'core'],
    equipment: 'none',
    difficulty: 'beginner',
    duration: 2,
    instructions: [
      'Start in plank position with hands slightly wider than shoulders',
      'Lower your body until chest nearly touches the floor',
      'Push back up to starting position',
      'Keep your core engaged and body in straight line',
    ],
    tips: [
      'Modify by dropping to knees if needed',
      'Keep elbows at 45-degree angle to protect shoulders',
      'Breathe out when pushing up',
    ],
    benefits: ['Builds upper body strength', 'Improves core stability', 'No equipment needed'],
    calories: 8,
  },
  {
    id: 'squats',
    name: 'Squats',
    description: 'Fundamental lower body exercise for legs and glutes',
    category: 'strength',
    muscleGroups: ['quadriceps', 'glutes', 'hamstrings', 'calves'],
    equipment: 'none',
    difficulty: 'beginner',
    duration: 2,
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower your body as if sitting in a chair',
      'Keep your chest up and back straight',
      'Go as low as comfortable, then push back up',
    ],
    tips: [
      'Keep weight in heels',
      'Don\'t let knees go past toes',
      'Start with partial range of motion if needed',
    ],
    benefits: ['Builds leg strength', 'Improves mobility', 'Functional movement pattern'],
    calories: 6,
  },
  {
    id: 'plank',
    name: 'Plank',
    description: 'Core strengthening exercise that builds stability',
    category: 'strength',
    muscleGroups: ['core', 'shoulders', 'back'],
    equipment: 'none',
    difficulty: 'beginner',
    duration: 1,
    instructions: [
      'Start in push-up position',
      'Hold your body in straight line from head to heels',
      'Engage your core and glutes',
      'Keep breathing steadily',
    ],
    tips: [
      'Don\'t let hips sag or rise too high',
      'Start with 20-30 seconds and build up',
      'Focus on quality over duration',
    ],
    benefits: ['Strengthens core', 'Improves posture', 'Reduces back pain risk'],
    calories: 4,
  },
  {
    id: 'lunges',
    name: 'Lunges',
    description: 'Single-leg exercise for lower body strength and balance',
    category: 'strength',
    muscleGroups: ['quadriceps', 'glutes', 'hamstrings', 'calves'],
    equipment: 'none',
    difficulty: 'beginner',
    duration: 3,
    instructions: [
      'Step forward with one leg',
      'Lower your hips until both knees are at 90 degrees',
      'Push back to starting position',
      'Alternate legs or complete all reps on one side',
    ],
    tips: [
      'Keep front knee behind toes',
      'Maintain upright posture',
      'Use arms for balance if needed',
    ],
    benefits: ['Builds leg strength', 'Improves balance', 'Addresses muscle imbalances'],
    calories: 7,
  },

  // Cardio Exercises
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    description: 'Classic cardio exercise for full-body conditioning',
    category: 'cardio',
    muscleGroups: ['full-body', 'cardio'],
    equipment: 'none',
    difficulty: 'beginner',
    duration: 3,
    instructions: [
      'Start standing with feet together, arms at sides',
      'Jump feet apart while raising arms overhead',
      'Jump back to starting position',
      'Maintain steady rhythm',
    ],
    tips: [
      'Land softly to protect joints',
      'Keep movements controlled',
      'Adjust intensity based on fitness level',
    ],
    benefits: ['Improves cardiovascular health', 'Full-body workout', 'Burns calories'],
    calories: 10,
  },
  {
    id: 'burpees',
    name: 'Burpees',
    description: 'High-intensity full-body exercise combining strength and cardio',
    category: 'cardio',
    muscleGroups: ['full-body', 'cardio', 'strength'],
    equipment: 'none',
    difficulty: 'advanced',
    duration: 4,
    instructions: [
      'Start in standing position',
      'Drop to squat position and place hands on floor',
      'Jump feet back to plank position',
      'Do a push-up, then jump feet back to squat',
      'Jump up with arms overhead',
    ],
    tips: [
      'Modify by skipping push-up or stepping back',
      'Focus on form over speed',
      'Land softly when jumping',
    ],
    benefits: ['Full-body conditioning', 'Burns high calories', 'Improves explosive power'],
    calories: 12,
  },
  {
    id: 'high-knees',
    name: 'High Knees',
    description: 'Cardio exercise that mimics running in place',
    category: 'cardio',
    muscleGroups: ['cardio', 'legs', 'core'],
    equipment: 'none',
    difficulty: 'beginner',
    duration: 3,
    instructions: [
      'Stand with feet hip-width apart',
      'Run in place bringing knees up to hip level',
      'Pump arms vigorously',
      'Maintain quick, steady pace',
    ],
    tips: [
      'Focus on bringing knees high',
      'Keep core engaged',
      'Land on balls of feet',
    ],
    benefits: ['Improves cardiovascular fitness', 'Strengthens legs', 'Low impact option available'],
    calories: 9,
  },

  // Flexibility Exercises
  {
    id: 'cat-cow',
    name: 'Cat-Cow Stretch',
    description: 'Gentle spinal mobility exercise for flexibility',
    category: 'flexibility',
    muscleGroups: ['spine', 'core', 'back'],
    equipment: 'yoga-mat',
    difficulty: 'beginner',
    duration: 2,
    instructions: [
      'Start on hands and knees',
      'Arch your back and look up (cow position)',
      'Round your back and tuck chin (cat position)',
      'Alternate slowly between positions',
    ],
    tips: [
      'Move with your breath',
      'Keep movements smooth and controlled',
      'Don\'t force beyond comfortable range',
    ],
    benefits: ['Improves spinal flexibility', 'Relieves back tension', 'Promotes relaxation'],
    calories: 2,
  },
  {
    id: 'hamstring-stretch',
    name: 'Hamstring Stretch',
    description: 'Stretch for the back of the thighs',
    category: 'flexibility',
    muscleGroups: ['hamstrings', 'lower-back'],
    equipment: 'yoga-mat',
    difficulty: 'beginner',
    duration: 2,
    instructions: [
      'Sit on floor with one leg extended',
      'Keep other leg bent with foot against inner thigh',
      'Lean forward over extended leg',
      'Hold stretch without bouncing',
    ],
    tips: [
      'Keep back straight, don\'t round',
      'Go only to point of mild tension',
      'Hold for 20-30 seconds per side',
    ],
    benefits: ['Improves hamstring flexibility', 'Reduces back pain', 'Enhances athletic performance'],
    calories: 1,
  },

  // Balance Exercises
  {
    id: 'single-leg-stand',
    name: 'Single Leg Stand',
    description: 'Balance exercise for stability and proprioception',
    category: 'balance',
    muscleGroups: ['legs', 'core', 'ankles'],
    equipment: 'none',
    difficulty: 'beginner',
    duration: 1,
    instructions: [
      'Stand on one leg',
      'Keep other leg slightly bent',
      'Maintain balance for 30 seconds',
      'Switch legs and repeat',
    ],
    tips: [
      'Focus on a fixed point ahead',
      'Start near wall for support if needed',
      'Engage core for stability',
    ],
    benefits: ['Improves balance', 'Strengthens ankles', 'Enhances body awareness'],
    calories: 2,
  },
];

export const WORKOUTS: Workout[] = [
  {
    id: 'beginner-full-body',
    name: 'Beginner Full Body',
    description: 'Perfect introduction to strength training with basic exercises',
    category: 'strength',
    duration: 20,
    difficulty: 'beginner',
    exercises: [
      { exerciseId: 'squats', sets: 3, reps: 12, rest: 60 },
      { exerciseId: 'push-ups', sets: 3, reps: 8, rest: 60 },
      { exerciseId: 'plank', sets: 3, duration: 30, rest: 60 },
      { exerciseId: 'lunges', sets: 3, reps: 10, rest: 60 },
    ],
    goals: ['strength', 'weight-loss', 'general-fitness'],
    equipment: ['none'],
    calories: 120,
    rating: 4.5,
    reviews: 234,
  },
  {
    id: 'cardio-blast',
    name: 'Cardio Blast',
    description: 'High-energy cardio workout to boost heart health',
    category: 'cardio',
    duration: 15,
    difficulty: 'intermediate',
    exercises: [
      { exerciseId: 'jumping-jacks', sets: 3, duration: 45, rest: 30 },
      { exerciseId: 'high-knees', sets: 3, duration: 45, rest: 30 },
      { exerciseId: 'burpees', sets: 2, reps: 8, rest: 60 },
    ],
    goals: ['cardio', 'weight-loss', 'endurance'],
    equipment: ['none'],
    calories: 150,
    rating: 4.7,
    reviews: 189,
  },
  {
    id: 'flexibility-flow',
    name: 'Flexibility Flow',
    description: 'Gentle stretching routine for improved mobility',
    category: 'flexibility',
    duration: 15,
    difficulty: 'beginner',
    exercises: [
      { exerciseId: 'cat-cow', sets: 1, duration: 60, rest: 30 },
      { exerciseId: 'hamstring-stretch', sets: 2, duration: 45, rest: 30 },
    ],
    goals: ['flexibility', 'recovery', 'stress-relief'],
    equipment: ['yoga-mat'],
    calories: 40,
    rating: 4.8,
    reviews: 156,
  },
  {
    id: 'balance-foundation',
    name: 'Balance Foundation',
    description: 'Build stability and prevent falls with balance exercises',
    category: 'balance',
    duration: 10,
    difficulty: 'beginner',
    exercises: [
      { exerciseId: 'single-leg-stand', sets: 3, duration: 30, rest: 30 },
    ],
    goals: ['balance', 'stability', 'injury-prevention'],
    equipment: ['none'],
    calories: 20,
    rating: 4.3,
    reviews: 98,
  },
  {
    id: 'morning-energizer',
    name: 'Morning Energizer',
    description: 'Quick wake-up routine combining mobility and light cardio',
    category: 'functional',
    duration: 12,
    difficulty: 'beginner',
    exercises: [
      { exerciseId: 'cat-cow', sets: 1, duration: 60, rest: 15 },
      { exerciseId: 'jumping-jacks', sets: 2, duration: 30, rest: 30 },
      { exerciseId: 'high-knees', sets: 2, duration: 30, rest: 30 },
      { exerciseId: 'squats', sets: 2, reps: 10, rest: 45 },
    ],
    goals: ['general-fitness', 'energy', 'mobility'],
    equipment: ['none'],
    calories: 80,
    rating: 4.6,
    reviews: 142,
  },
  {
    id: 'desk-mobility',
    name: 'Desk Mobility Break',
    description: 'Relieve neck, hip, and back tension from sitting — perfect between meetings',
    category: 'flexibility',
    duration: 8,
    difficulty: 'beginner',
    exercises: [
      { exerciseId: 'cat-cow', sets: 2, duration: 45, rest: 15 },
      { exerciseId: 'hamstring-stretch', sets: 2, duration: 40, rest: 20 },
      { exerciseId: 'single-leg-stand', sets: 2, duration: 20, rest: 20 },
    ],
    goals: ['flexibility', 'recovery', 'stress-relief'],
    equipment: ['yoga-mat'],
    calories: 25,
    rating: 4.9,
    reviews: 267,
  },
  {
    id: 'quick-strength',
    name: 'Quick Strength Circuit',
    description: 'Efficient bodyweight circuit when you are short on time',
    category: 'strength',
    duration: 18,
    difficulty: 'intermediate',
    exercises: [
      { exerciseId: 'squats', sets: 3, reps: 15, rest: 45 },
      { exerciseId: 'push-ups', sets: 3, reps: 12, rest: 45 },
      { exerciseId: 'lunges', sets: 3, reps: 10, rest: 45 },
      { exerciseId: 'plank', sets: 3, duration: 40, rest: 45 },
    ],
    goals: ['strength', 'general-fitness', 'muscle-gain'],
    equipment: ['none'],
    calories: 140,
    rating: 4.7,
    reviews: 198,
  },
];

export const WORKOUT_PROGRAMS: WorkoutProgram[] = [
  {
    id: '4-week-strength',
    name: '4-Week Strength Builder',
    description: 'Progressive program to build functional strength',
    duration: 4,
    difficulty: 'beginner',
    workoutsPerWeek: 3,
    workouts: ['beginner-full-body', 'beginner-full-body', 'cardio-blast'],
    goals: ['strength', 'muscle-gain', 'general-fitness'],
    equipment: ['none'],
    estimatedCalories: 800,
    rating: 4.6,
    reviews: 342,
  },
  {
    id: '8-week-fitness',
    name: '8-Week Total Fitness',
    description: 'Comprehensive program combining strength, cardio, and flexibility',
    duration: 8,
    difficulty: 'intermediate',
    workoutsPerWeek: 4,
    workouts: ['beginner-full-body', 'cardio-blast', 'flexibility-flow', 'balance-foundation'],
    goals: ['general-fitness', 'weight-loss', 'endurance'],
    equipment: ['yoga-mat'],
    estimatedCalories: 1200,
    rating: 4.7,
    reviews: 278,
  },
];

export const WORKOUT_CATEGORIES = [
  { id: 'strength', name: 'Strength', icon: 'fitness-outline', color: '#FF6B6B' },
  { id: 'cardio', name: 'Cardio', icon: 'pulse-outline', color: '#FF4444' },
  { id: 'flexibility', name: 'Flexibility', icon: 'expand-outline', color: '#4ECDC4' },
  { id: 'balance', name: 'Balance', icon: 'accessibility-outline', color: '#946BFA' },
  { id: 'functional', name: 'Functional', icon: 'body-outline', color: '#34C759' },
  { id: 'hiit', name: 'HIIT', icon: 'flash-outline', color: '#FF9500' },
  { id: 'yoga', name: 'Yoga', icon: 'flower-outline', color: '#AF52DE' },
  { id: 'pilates', name: 'Pilates', icon: 'ellipse-outline', color: '#5B6CFF' },
];

export const EQUIPMENT_OPTIONS = [
  { id: 'none', name: 'No Equipment', icon: 'body-outline' },
  { id: 'dumbbells', name: 'Dumbbells', icon: 'barbell-outline' },
  { id: 'resistance-bands', name: 'Resistance Bands', icon: 'extension-puzzle-outline' },
  { id: 'yoga-mat', name: 'Yoga Mat', icon: 'square-outline' },
  { id: 'bench', name: 'Workout Bench', icon: 'tablet-landscape-outline' },
  { id: 'full-gym', name: 'Full Gym', icon: 'business-outline' },
];
