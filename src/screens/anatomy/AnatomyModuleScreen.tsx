// src/screens/anatomy/AnatomyModuleScreen.tsx
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

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | '3d' | 'quiz' | 'reading';
  completed: boolean;
  locked: boolean;
}

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
}

const MODULES_DATA: Record<string, Module & { lessons: Lesson[] }> = {
  basics: {
    id: 'basics',
    title: 'Anatomy Basics',
    description: 'Fundamental concepts, terminology, and body systems overview',
    duration: '15 min',
    difficulty: 'Beginner',
    category: 'Foundations',
    progress: 0,
    totalLessons: 5,
    completedLessons: 0,
    lessons: [
      {
        id: 'intro',
        title: 'Introduction to Anatomy',
        description: 'Overview of human anatomy and why it matters',
        duration: '3 min',
        type: 'video',
        completed: false,
        locked: false,
      },
      {
        id: 'terminology',
        title: 'Anatomical Terminology',
        description: 'Learn the language of anatomy',
        duration: '5 min',
        type: 'reading',
        completed: false,
        locked: false,
      },
      {
        id: 'systems',
        title: 'Body Systems Overview',
        description: 'Introduction to major body systems',
        duration: '4 min',
        type: '3d',
        completed: false,
        locked: false,
      },
      {
        id: 'directions',
        title: 'Directional Terms',
        description: 'Understanding anatomical directions and positions',
        duration: '2 min',
        type: 'reading',
        completed: false,
        locked: false,
      },
      {
        id: 'quiz',
        title: 'Knowledge Check',
        description: 'Test your understanding of anatomy basics',
        duration: '1 min',
        type: 'quiz',
        completed: false,
        locked: false,
      },
    ],
  },
  skeletal: {
    id: 'skeletal',
    title: 'Skeletal System',
    description: 'Bone structure, joint mechanics, and skeletal anatomy',
    duration: '25 min',
    difficulty: 'Intermediate',
    category: 'Systems',
    progress: 0,
    totalLessons: 8,
    completedLessons: 0,
    lessons: [
      {
        id: 'skeleton-overview',
        title: 'Skeletal System Overview',
        description: 'Introduction to the human skeleton',
        duration: '4 min',
        type: 'video',
        completed: false,
        locked: false,
      },
      {
        id: 'bone-types',
        title: 'Types of Bones',
        description: 'Learn about different bone types and structures',
        duration: '3 min',
        type: '3d',
        completed: false,
        locked: false,
      },
      {
        id: 'axial-skeleton',
        title: 'Axial Skeleton',
        description: 'Skull, spine, and rib cage anatomy',
        duration: '6 min',
        type: '3d',
        completed: false,
        locked: false,
      },
      {
        id: 'appendicular-skeleton',
        title: 'Appendicular Skeleton',
        description: 'Limbs and girdles anatomy',
        duration: '5 min',
        type: '3d',
        completed: false,
        locked: false,
      },
      {
        id: 'joints',
        title: 'Joint Types and Movements',
        description: 'Understanding different joint types',
        duration: '4 min',
        type: '3d',
        completed: false,
        locked: false,
      },
      {
        id: 'bone-growth',
        title: 'Bone Growth and Repair',
        description: 'How bones grow and heal',
        duration: '2 min',
        type: 'video',
        completed: false,
        locked: false,
      },
      {
        id: 'common-conditions',
        title: 'Common Skeletal Conditions',
        description: 'Overview of common bone and joint issues',
        duration: '1 min',
        type: 'reading',
        completed: false,
        locked: false,
      },
      {
        id: 'skeletal-quiz',
        title: 'Skeletal System Quiz',
        description: 'Test your knowledge of the skeletal system',
        duration: '2 min',
        type: 'quiz',
        completed: false,
        locked: false,
      },
    ],
  },
};

const getLessonIcon = (type: string) => {
  switch (type) {
    case 'video': return 'play-circle-outline';
    case '3d': return 'cube-outline';
    case 'quiz': return 'help-circle-outline';
    case 'reading': return 'book-outline';
    default: return 'document-outline';
  }
};

const getLessonColor = (type: string) => {
  switch (type) {
    case 'video': return Colors.error;
    case '3d': return Colors.primary;
    case 'quiz': return Colors.warning;
    case 'reading': return Colors.success;
    default: return Colors.textSecondary;
  }
};

export default function AnatomyModuleScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { moduleId } = route.params || {};
  
  const [module, setModule] = useState(MODULES_DATA[moduleId] || MODULES_DATA.basics);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  const handleLessonPress = (lesson: Lesson, index: number) => {
    if (lesson.locked) return;
    
    if (lesson.type === '3d') {
      navigation.navigate(Screen.anatomyExplorer);
    } else if (lesson.type === 'video') {
      // Navigate to video player
      console.log('Navigate to video player for lesson:', lesson.id);
    } else if (lesson.type === 'quiz') {
      // Navigate to quiz
      console.log('Navigate to quiz for lesson:', lesson.id);
    } else if (lesson.type === 'reading') {
      // Navigate to reading content
      console.log('Navigate to reading for lesson:', lesson.id);
    }
  };

  const startModule = () => {
    const firstUncompletedLesson = module.lessons.find(lesson => !lesson.completed && !lesson.locked);
    if (firstUncompletedLesson) {
      const index = module.lessons.indexOf(firstUncompletedLesson);
      handleLessonPress(firstUncompletedLesson, index);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return Colors.success;
      case 'Intermediate': return Colors.warning;
      case 'Advanced': return Colors.error;
      default: return Colors.textSecondary;
    }
  };

  const renderLessonCard = (lesson: Lesson, index: number) => (
    <TouchableOpacity
      key={lesson.id}
      style={[
        styles.lessonCard,
        lesson.locked && styles.lessonCardLocked,
        lesson.completed && styles.lessonCardCompleted,
      ]}
      onPress={() => handleLessonPress(lesson, index)}
      disabled={lesson.locked}
      activeOpacity={lesson.locked ? 1 : 0.8}
    >
      <View style={styles.lessonHeader}>
        <View style={styles.lessonIconContainer}>
          {lesson.locked ? (
            <Ionicons name="lock-closed" size={20} color={Colors.textTertiary} />
          ) : lesson.completed ? (
            <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
          ) : (
            <Ionicons
              name={getLessonIcon(lesson.type) as any}
              size={20}
              color={getLessonColor(lesson.type)}
            />
          )}
        </View>
        
        <View style={styles.lessonInfo}>
          <Text style={[
            styles.lessonTitle,
            lesson.locked && styles.lessonTitleLocked,
            lesson.completed && styles.lessonTitleCompleted,
          ]}>
            {lesson.title}
          </Text>
          <Text style={[
            styles.lessonDescription,
            lesson.locked && styles.lessonDescriptionLocked,
          ]}>
            {lesson.description}
          </Text>
        </View>
        
        <View style={styles.lessonMeta}>
          <Text style={styles.lessonDuration}>{lesson.duration}</Text>
          <Ionicons 
            name="chevron-forward" 
            size={16} 
            color={lesson.locked ? Colors.textTertiary : Colors.textSecondary} 
          />
        </View>
      </View>
    </TouchableOpacity>
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
          <Text style={styles.title}>{module.title}</Text>
        </View>

        <AppCard style={styles.moduleInfoCard}>
          <View style={styles.moduleHeader}>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(module.difficulty) + '20' }]}>
              <Text style={[styles.difficultyText, { color: getDifficultyColor(module.difficulty) }]}>
                {module.difficulty}
              </Text>
            </View>
            <Text style={styles.moduleDuration}>{module.duration}</Text>
          </View>
          
          <Text style={styles.moduleDescription}>{module.description}</Text>
          
          <View style={styles.moduleStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{module.totalLessons}</Text>
              <Text style={styles.statLabel}>Lessons</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{module.completedLessons}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{Math.round(module.progress)}%</Text>
              <Text style={styles.statLabel}>Progress</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.startButton} onPress={startModule}>
            <Text style={styles.startButtonText}>
              {module.progress === 0 ? 'Start Module' : 'Continue Learning'}
            </Text>
          </TouchableOpacity>
        </AppCard>

        <View style={styles.lessonsSection}>
          <Text style={styles.sectionTitle}>Lessons</Text>
          {module.lessons.map(renderLessonCard)}
        </View>

        <TouchableOpacity
          style={styles.exploreButton}
          onPress={() => navigation.navigate(Screen.anatomyExplorer)}
        >
          <Ionicons name="cube-outline" size={20} color={Colors.white} />
          <Text style={styles.exploreButtonText}>Explore 3D Model</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  backButton: {
    padding: Spacing.sm,
  },
  title: { 
    fontSize: Typography.size['2xl'], 
    fontWeight: '800', 
    color: Colors.text,
  },
  moduleInfoCard: {
    gap: Spacing.md,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  moduleDuration: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  moduleDescription: {
    fontSize: Typography.size.base,
    color: Colors.text,
    lineHeight: 20,
  },
  moduleStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.lg,
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
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.borderLight,
  },
  startButton: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  startButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Typography.size.base,
  },
  lessonsSection: {
    gap: Spacing.sm,
  },
  sectionTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  lessonCard: {
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
    backgroundColor: Colors.white,
  },
  lessonCardLocked: {
    backgroundColor: Colors.surfaceSecondary,
    opacity: 0.7,
  },
  lessonCardCompleted: {
    borderColor: Colors.success,
    backgroundColor: Colors.success + '5',
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  lessonIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  lessonTitleLocked: {
    color: Colors.textTertiary,
  },
  lessonTitleCompleted: {
    color: Colors.success,
  },
  lessonDescription: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  lessonDescriptionLocked: {
    color: Colors.textTertiary,
  },
  lessonMeta: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  lessonDuration: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
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
