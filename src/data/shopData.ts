export type ShopCategory =
  | 'Meal Plans'
  | 'Workout Guides'
  | 'Ebooks & Guides'
  | 'Programs'
  | 'Video Content'
  | 'Consultations';

export type ShopProduct = {
  id: string;
  title: string;
  description: string;
  category: ShopCategory;
  price: number;
  originalPrice?: number;
  currency: string;
  imageUrl: string;
  author: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  isPremium: boolean;
  isFeatured: boolean;
};

export const SHOP_CATEGORIES: ShopCategory[] = [
  'Meal Plans',
  'Workout Guides',
  'Ebooks & Guides',
  'Programs',
  'Video Content',
  'Consultations',
];

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: 'med-meal-30',
    title: '30-Day Mediterranean Meal Plan',
    description: 'Complete meal plan with shopping lists, recipes, and nutrition tracking for heart-healthy eating.',
    category: 'Meal Plans',
    price: 19.99,
    originalPrice: 29.99,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
    author: 'WellnessShift Nutrition Team',
    rating: 4.8,
    reviewCount: 127,
    tags: ['Mediterranean', 'Heart Health'],
    isPremium: false,
    isFeatured: true,
  },
  {
    id: 'keto-14',
    title: 'Keto Transformation Meal Plan',
    description: '14-day ketogenic plan with macro tracking and low-carb recipes.',
    category: 'Meal Plans',
    price: 24.99,
    originalPrice: 34.99,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
    author: 'Dr. Sarah Mitchell',
    rating: 4.7,
    reviewCount: 89,
    tags: ['Keto', 'Weight Loss'],
    isPremium: false,
    isFeatured: true,
  },
  {
    id: 'strength-guide',
    title: 'Complete Strength Training Guide',
    description: 'Exercise demonstrations, progression plans, and nutrition tips for building strength.',
    category: 'Workout Guides',
    price: 29.99,
    originalPrice: 39.99,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    author: 'Coach Mike Wilson',
    rating: 4.9,
    reviewCount: 214,
    tags: ['Strength', 'Full Body'],
    isPremium: false,
    isFeatured: true,
  },
  {
    id: 'sleep-ebook',
    title: 'Sleep Optimization Guide',
    description: 'Evidence-based strategies for better sleep hygiene and recovery.',
    category: 'Ebooks & Guides',
    price: 12.99,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800',
    author: 'WellnessShift Team',
    rating: 4.6,
    reviewCount: 98,
    tags: ['Sleep', 'Recovery'],
    isPremium: false,
    isFeatured: false,
  },
  {
    id: 'mindfulness-program',
    title: '8-Week Mindfulness Program',
    description: 'Structured mindfulness modules with daily practices and progress tracking.',
    category: 'Programs',
    price: 34.99,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    author: 'Dr. Emma Lewis',
    rating: 4.8,
    reviewCount: 156,
    tags: ['Mindfulness', 'Stress'],
    isPremium: true,
    isFeatured: true,
  },
  {
    id: 'yoga-video',
    title: 'Morning Yoga Flow Series',
    description: '10 follow-along video sessions for mobility and calm.',
    category: 'Video Content',
    price: 14.99,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
    author: 'Yoga with Priya',
    rating: 4.7,
    reviewCount: 73,
    tags: ['Yoga', 'Mobility'],
    isPremium: false,
    isFeatured: false,
  },
  {
    id: 'nutrition-consult',
    title: 'Nutrition Consultation (45 min)',
    description: 'One-to-one video session with a certified nutrition coach.',
    category: 'Consultations',
    price: 59.99,
    currency: 'GBP',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525cd45?w=800',
    author: 'WellnessShift Coaches',
    rating: 5.0,
    reviewCount: 42,
    tags: ['Nutrition', '1-on-1'],
    isPremium: true,
    isFeatured: false,
  },
];
