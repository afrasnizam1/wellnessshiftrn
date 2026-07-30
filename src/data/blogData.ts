export type BlogCategory =
  | 'Fitness'
  | 'Nutrition'
  | 'Mental Health'
  | 'Lifestyle'
  | 'Recovery'
  | 'Technology';

export type BlogPost = {
  id: string;
  title: string;
  category: BlogCategory;
  imageUrl: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  body: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'progressive-overload',
    title: 'The Science of Progressive Overload',
    category: 'Fitness',
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
    excerpt: 'How to implement progressive overload to maximise strength and muscle growth safely.',
    date: '15 Mar 2024',
    readTime: '8 min read',
    author: 'Dr. Sarah Chen',
    body: 'Progressive overload is the gradual increase of stress placed on the body during training. By increasing weight, reps, or volume over time, muscles adapt and grow stronger.\n\nStart with a weight you can lift with good form for 8–12 reps. When you can complete 12 reps comfortably, increase load by 2.5–5%. Track sessions in Analytics to see trends.',
  },
  {
    id: 'macros-basics',
    title: 'Understanding Macronutrients',
    category: 'Nutrition',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
    excerpt: 'Protein, carbs, and fats — what they do and how to balance them for your goals.',
    date: '12 Mar 2024',
    readTime: '6 min read',
    author: 'James Chen',
    body: 'Macronutrients provide energy and building blocks for the body. Protein supports repair, carbohydrates fuel activity, and fats support hormones and cell health.\n\nA practical starting point: 1.6g protein per kg body weight, fill remaining calories with mostly whole-food carbs and healthy fats.',
  },
  {
    id: 'stress-breathing',
    title: 'Breathing Techniques for Stress Relief',
    category: 'Mental Health',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    excerpt: 'Simple breathing patterns that activate your parasympathetic nervous system.',
    date: '8 Mar 2024',
    readTime: '5 min read',
    author: 'Dr. Emma Lewis',
    body: 'Box breathing (4-4-4-4) and extended exhale breathing reduce heart rate and cortisol within minutes.\n\nTry 4 seconds in, 4 hold, 6 out — repeat for 2 minutes before stressful meetings or at bedtime.',
  },
  {
    id: 'sleep-recovery',
    title: 'Sleep & Recovery Essentials',
    category: 'Recovery',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800',
    excerpt: 'Why sleep is your most underrated performance tool.',
    date: '5 Mar 2024',
    readTime: '7 min read',
    author: 'WellnessShift Team',
    body: 'Sleep consolidates memory, repairs tissue, and regulates appetite hormones. Adults need 7–9 hours.\n\nKeep a consistent schedule, limit caffeine after 2pm, and use the Sleep Tools in Fitness Hub to track debt.',
  },
];
