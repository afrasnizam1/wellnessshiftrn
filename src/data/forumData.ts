export type ForumPost = {
  id: string;
  title: string;
  content: string;
  author: string;
  group: string;
  postType: 'Discussion' | 'Question' | 'Success Story' | 'Support';
  likes: number;
  replies: number;
  tags: string[];
  createdAt: string;
};

export const FORUM_GROUPS = [
  'General Wellness',
  'Fitness & Training',
  'Nutrition',
  'Mental Health',
  'Sleep & Recovery',
];

export const FORUM_POSTS: ForumPost[] = [
  {
    id: '1',
    title: 'How do you stay consistent with daily check-ins?',
    content: 'I keep forgetting after work — any tips for building the habit?',
    author: 'Alex M.',
    group: 'General Wellness',
    postType: 'Question',
    likes: 24,
    replies: 8,
    tags: ['habits', 'check-in'],
    createdAt: '2h ago',
  },
  {
    id: '2',
    title: 'Hit my 10k steps 5 days in a row!',
    content: 'Small walks at lunch made the difference. Sharing in case it helps someone else.',
    author: 'Jordan K.',
    group: 'Fitness & Training',
    postType: 'Success Story',
    likes: 56,
    replies: 12,
    tags: ['steps', 'motivation'],
    createdAt: '5h ago',
  },
  {
    id: '3',
    title: 'Meal prep ideas for busy weeks',
    content: 'Looking for high-protein lunches that reheat well. What works for you?',
    author: 'Sam R.',
    group: 'Nutrition',
    postType: 'Discussion',
    likes: 18,
    replies: 15,
    tags: ['meal-prep', 'protein'],
    createdAt: '1d ago',
  },
  {
    id: '4',
    title: 'Breathing exercises before bed',
    content: 'The 4-7-8 pattern from the app helped me fall asleep faster this week.',
    author: 'Taylor P.',
    group: 'Sleep & Recovery',
    postType: 'Support',
    likes: 31,
    replies: 4,
    tags: ['sleep', 'breathing'],
    createdAt: '2d ago',
  },
];
