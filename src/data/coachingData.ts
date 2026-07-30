export type SessionFormat = 'video' | 'phone' | 'inperson' | 'chat';

export type CoachProfile = {
  id: string;
  name: string;
  specialty: string;
  specialties: string[];
  rating: number;
  sessions: number;
  formats: SessionFormat[];
  price: string;
  avatar: string;
  bio: string;
  nextAvailable: string;
};

export const COACHING_SPECIALTIES = [
  'All',
  'General Wellness',
  'Nutrition & Fitness',
  'Mental Wellness',
  'Sleep & Recovery',
] as const;

export const SESSION_LENGTHS = [30, 60] as const;

export const TIME_SLOTS = [
  '09:00', '10:30', '12:00', '14:00', '15:30', '17:00', '18:30',
];

export const COACHES: CoachProfile[] = [
  {
    id: '1',
    name: 'Dr Sarah Mitchell',
    specialty: 'General Wellness',
    specialties: ['General Wellness'],
    rating: 4.9,
    sessions: 312,
    formats: ['video', 'phone'],
    price: '£45',
    avatar: '👩‍⚕️',
    bio: 'Specialises in lifestyle medicine and preventative health. 8+ years experience.',
    nextAvailable: 'Tomorrow',
  },
  {
    id: '2',
    name: 'James Okafor',
    specialty: 'Nutrition & Fitness',
    specialties: ['Nutrition & Fitness'],
    rating: 4.8,
    sessions: 198,
    formats: ['video', 'chat'],
    price: '£35',
    avatar: '👨‍💼',
    bio: 'Certified nutritionist and personal trainer. Focuses on sustainable lifestyle change.',
    nextAvailable: 'Today',
  },
  {
    id: '3',
    name: 'Dr Priya Sharma',
    specialty: 'Mental Wellness',
    specialties: ['Mental Wellness'],
    rating: 5.0,
    sessions: 420,
    formats: ['video', 'phone', 'inperson'],
    price: '£55',
    avatar: '👩‍🔬',
    bio: 'Clinical psychologist specialising in stress, anxiety and mindfulness-based therapy.',
    nextAvailable: 'Wed 14:00',
  },
  {
    id: '4',
    name: 'Tom Richardson',
    specialty: 'Sleep & Recovery',
    specialties: ['Sleep & Recovery'],
    rating: 4.7,
    sessions: 156,
    formats: ['video', 'chat'],
    price: '£40',
    avatar: '👨‍⚕️',
    bio: 'Sleep specialist and recovery coach with expertise in circadian biology.',
    nextAvailable: 'Thu 09:00',
  },
];

export type CoachingBooking = {
  id: string;
  coachId: string;
  coachName: string;
  format: SessionFormat;
  date: string;
  time: string;
  durationMin: number;
  createdAt: string;
};

export const FORMAT_INFO: Record<SessionFormat, { icon: string; label: string; desc: string }> = {
  video: { icon: '📹', label: 'Video call', desc: 'Face-to-face via secure video link' },
  phone: { icon: '📞', label: 'Phone call', desc: 'Voice only, no camera required' },
  inperson: { icon: '🏥', label: 'In person', desc: 'At a clinic or practice near you' },
  chat: { icon: '💬', label: 'Chat / message', desc: 'Async written consultation' },
};
