import type { ImageSourcePropType } from 'react-native';
import type { IoniconName } from '../theme/icons';

export type LearningGuide = {
  id: string;
  title: string;
  subtitle: string;
  icon: IoniconName;
  /** Remote image (optional if `image` is set) */
  imageUrl?: string;
  /** Bundled local image — preferred when present */
  image?: ImageSourcePropType;
  /** Gradient fallback if the image fails to load */
  fallbackColors: [string, string];
};

/** 10 learning guides — ported from iOS FitnessHubView.learningDestinations */
export const LEARNING_GUIDES: LearningGuide[] = [
  {
    id: 'vitamins',
    title: 'Vitamins & Supplements',
    subtitle: 'Benefits, best time to take, and what to choose when you feel low',
    icon: 'medical-outline',
    image: require('../assets/images/vitamins-supplements.jpg'),
    fallbackColors: ['#9E85EB', '#6BADF5'],
  },
  {
    id: 'nutrition-basics',
    title: 'Nutrition Basics',
    subtitle: 'Simple principles to support energy, recovery, and long-term health',
    icon: 'nutrition-outline',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=90',
    fallbackColors: ['#1A6B42', '#2ECC71'],
  },
  {
    id: 'sleep-recovery',
    title: 'Sleep & Recovery',
    subtitle: 'How sleep affects health, energy, and performance',
    icon: 'moon-outline',
    imageUrl: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=900&q=90',
    fallbackColors: ['#4338CA', '#7C3AED'],
  },
  {
    id: 'stress-mindfulness',
    title: 'Stress & Mindfulness',
    subtitle: 'Simple practices to reduce stress and stay present',
    icon: 'leaf-outline',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&q=90',
    fallbackColors: ['#0D9488', '#06B6D4'],
  },
  {
    id: 'hydration',
    title: 'Hydration',
    subtitle: 'Why water matters and how to stay properly hydrated',
    icon: 'water-outline',
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=900&q=90',
    fallbackColors: ['#0891B2', '#2563EB'],
  },
  {
    id: 'gut-health',
    title: 'Gut Health',
    subtitle: 'Digestive wellness, fiber, and gut-friendly habits',
    icon: 'flower-outline',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=90',
    fallbackColors: ['#EA580C', '#EAB308'],
  },
  {
    id: 'heart-health',
    title: 'Heart Health',
    subtitle: 'Cardio basics, resting heart rate, and blood pressure',
    icon: 'heart-outline',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=90&auto=format&fit=crop',
    fallbackColors: ['#DB2777', '#DC2626'],
  },
  {
    id: 'exercise-fundamentals',
    title: 'Exercise Basics',
    subtitle: 'Warm-ups, form, and building a safe routine',
    icon: 'barbell-outline',
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=90&auto=format&fit=crop',
    fallbackColors: ['#EA580C', '#DC2626'],
  },
  {
    id: 'protein-recovery',
    title: 'Protein & Recovery',
    subtitle: 'Fuel muscle repair and bounce back faster',
    icon: 'flame-outline',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=90&auto=format&fit=crop',
    fallbackColors: ['#DC2626', '#EA580C'],
  },
  {
    id: 'healthy-habits',
    title: 'Healthy Habits',
    subtitle: 'Build routines that stick for the long term',
    icon: 'repeat-outline',
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=900&q=90&auto=format&fit=crop',
    fallbackColors: ['#7C3AED', '#4338CA'],
  },
];

export function getLearningGuide(id: string): LearningGuide | undefined {
  return LEARNING_GUIDES.find((g) => g.id === id);
}
