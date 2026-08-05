import type { WellnessCategoryKey } from '../types';

export type AssessmentOption = {
  id: string;
  text: string;
  score: number;
  description?: string;
};

export type AssessmentQuestion = {
  id: string;
  category: WellnessCategoryKey;
  question: string;
  options: AssessmentOption[];
};

/** 20 wellness assessment questions (2 per category). Onboarding uses the first of each pair. */
export const WELLNESS_ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'physical_1',
    category: 'physical',
    question: 'How would you rate your overall physical health?',
    options: [
      { id: 'excellent', text: 'Excellent', score: 5, description: 'I feel great and have no health concerns' },
      { id: 'good', text: 'Good', score: 4, description: 'I feel mostly healthy with minor issues' },
      { id: 'fair', text: 'Fair', score: 3, description: 'I have some health concerns but manage them' },
      { id: 'poor', text: 'Poor', score: 2, description: 'I have significant health issues' },
      { id: 'very_poor', text: 'Very Poor', score: 1, description: 'I have serious health problems' },
    ],
  },
  {
    id: 'physical_2',
    category: 'physical',
    question: 'How often do you experience physical pain or discomfort?',
    options: [
      { id: 'never', text: 'Never', score: 5, description: 'I rarely experience pain or discomfort' },
      { id: 'rarely', text: 'Rarely', score: 4, description: 'Occasional minor aches' },
      { id: 'sometimes', text: 'Sometimes', score: 3, description: 'Pain affects me a few times a month' },
      { id: 'often', text: 'Often', score: 2, description: 'Frequent discomfort impacts daily life' },
      { id: 'always', text: 'Always', score: 1, description: 'Chronic pain is a daily challenge' },
    ],
  },
  {
    id: 'mental_1',
    category: 'mental',
    question: 'How would you describe your current mental health?',
    options: [
      { id: 'excellent', text: 'Excellent', score: 5, description: 'I feel mentally strong and positive' },
      { id: 'good', text: 'Good', score: 4, description: 'I feel mostly positive with occasional low moods' },
      { id: 'fair', text: 'Fair', score: 3, description: 'I have ups and downs but manage okay' },
      { id: 'poor', text: 'Poor', score: 2, description: 'I struggle with mental health regularly' },
      { id: 'very_poor', text: 'Very Poor', score: 1, description: 'I have serious mental health challenges' },
    ],
  },
  {
    id: 'mental_2',
    category: 'mental',
    question: 'How often do you feel anxious or worried?',
    options: [
      { id: 'never', text: 'Never', score: 5, description: 'I feel calm and rarely anxious' },
      { id: 'rarely', text: 'Rarely', score: 4, description: 'Occasional worry that passes quickly' },
      { id: 'sometimes', text: 'Sometimes', score: 3, description: 'Anxiety comes and goes' },
      { id: 'often', text: 'Often', score: 2, description: 'Worry affects my daily functioning' },
      { id: 'always', text: 'Always', score: 1, description: 'Persistent anxiety is hard to manage' },
    ],
  },
  {
    id: 'nutrition_1',
    category: 'nutrition',
    question: 'How would you rate your current eating habits?',
    options: [
      { id: 'excellent', text: 'Excellent', score: 5, description: 'I eat a balanced, nutritious diet' },
      { id: 'good', text: 'Good', score: 4, description: 'I eat well most of the time' },
      { id: 'fair', text: 'Fair', score: 3, description: 'I try to eat healthy but could improve' },
      { id: 'poor', text: 'Poor', score: 2, description: 'My diet needs significant improvement' },
      { id: 'very_poor', text: 'Very Poor', score: 1, description: 'My eating habits are unhealthy' },
    ],
  },
  {
    id: 'nutrition_2',
    category: 'nutrition',
    question: 'How often do you eat fruits and vegetables?',
    options: [
      { id: 'daily', text: 'Daily (5+ servings)', score: 5, description: 'Vegetables and fruit at most meals' },
      { id: 'most_days', text: 'Most days (3–4 servings)', score: 4, description: 'Generally eat well, room to add more plants' },
      { id: 'sometimes', text: 'Sometimes (1–2 servings)', score: 3, description: 'Plants are occasional, not a habit' },
      { id: 'rarely', text: 'Rarely', score: 2, description: 'Few fruits or vegetables most weeks' },
      { id: 'never', text: 'Never', score: 1, description: 'Almost no plant foods in my diet' },
    ],
  },
  {
    id: 'fitness_1',
    category: 'fitness',
    question: 'How often do you engage in physical exercise?',
    options: [
      { id: 'daily', text: 'Daily', score: 5, description: 'Movement is part of my everyday routine' },
      { id: 'most_days', text: 'Most days (4–6 times/week)', score: 4, description: 'Regular exercise most of the week' },
      { id: 'sometimes', text: 'Sometimes (2–3 times/week)', score: 3, description: 'Exercise when schedule allows' },
      { id: 'rarely', text: 'Rarely (once a week)', score: 2, description: 'Infrequent activity' },
      { id: 'never', text: 'Never', score: 1, description: 'Little to no intentional exercise' },
    ],
  },
  {
    id: 'fitness_2',
    category: 'fitness',
    question: 'How would you rate your current fitness level?',
    options: [
      { id: 'excellent', text: 'Excellent', score: 5, description: "I'm very fit and active" },
      { id: 'good', text: 'Good', score: 4, description: "I'm reasonably fit" },
      { id: 'fair', text: 'Fair', score: 3, description: "I'm moderately fit" },
      { id: 'poor', text: 'Poor', score: 2, description: "I'm not very fit" },
      { id: 'very_poor', text: 'Very Poor', score: 1, description: "I'm out of shape" },
    ],
  },
  {
    id: 'sleep_1',
    category: 'sleep',
    question: 'How would you rate your sleep quality?',
    options: [
      { id: 'excellent', text: 'Excellent', score: 5, description: 'I sleep deeply and wake refreshed' },
      { id: 'good', text: 'Good', score: 4, description: 'I usually sleep well' },
      { id: 'fair', text: 'Fair', score: 3, description: 'My sleep is okay but could be better' },
      { id: 'poor', text: 'Poor', score: 2, description: 'I often have trouble sleeping' },
      { id: 'very_poor', text: 'Very Poor', score: 1, description: 'I rarely get good sleep' },
    ],
  },
  {
    id: 'sleep_2',
    category: 'sleep',
    question: 'How many hours of sleep do you typically get per night?',
    options: [
      { id: '8_plus', text: '8+ hours', score: 5, description: 'Well within the recommended range' },
      { id: '7_8', text: '7–8 hours', score: 4, description: 'Meets adult sleep guidelines' },
      { id: '6_7', text: '6–7 hours', score: 3, description: 'Slightly below optimal — may affect recovery' },
      { id: '5_6', text: '5–6 hours', score: 2, description: 'Sleep debt likely accumulating' },
      { id: 'under_5', text: 'Under 5 hours', score: 1, description: 'Severely insufficient for most adults' },
    ],
  },
  {
    id: 'stress_1',
    category: 'stress',
    question: 'How well do you manage stress in your daily life?',
    options: [
      { id: 'excellent', text: 'Excellent', score: 5, description: 'I handle stress very well' },
      { id: 'good', text: 'Good', score: 4, description: 'I manage stress reasonably well' },
      { id: 'fair', text: 'Fair', score: 3, description: 'I cope with stress okay' },
      { id: 'poor', text: 'Poor', score: 2, description: 'I struggle with stress management' },
      { id: 'very_poor', text: 'Very Poor', score: 1, description: "I'm overwhelmed by stress" },
    ],
  },
  {
    id: 'stress_2',
    category: 'stress',
    question: 'How often do you feel stressed or overwhelmed?',
    options: [
      { id: 'never', text: 'Never', score: 5, description: 'I feel calm and in control most days' },
      { id: 'rarely', text: 'Rarely', score: 4, description: 'Stress is occasional and manageable' },
      { id: 'sometimes', text: 'Sometimes', score: 3, description: 'Periodic overwhelm but I recover' },
      { id: 'often', text: 'Often', score: 2, description: 'Stress frequently affects my mood or body' },
      { id: 'always', text: 'Always', score: 1, description: 'I feel overwhelmed most of the time' },
    ],
  },
  {
    id: 'mindfulness_1',
    category: 'mindfulness',
    question: 'How often do you practice mindfulness or meditation?',
    options: [
      { id: 'daily', text: 'Daily', score: 5, description: 'Mindfulness is a consistent habit' },
      { id: 'most_days', text: 'Most days', score: 4, description: 'Regular short practices' },
      { id: 'sometimes', text: 'Sometimes', score: 3, description: 'I practise when I remember' },
      { id: 'rarely', text: 'Rarely', score: 2, description: 'Only occasional attempts' },
      { id: 'never', text: 'Never', score: 1, description: 'No mindfulness or meditation practice' },
    ],
  },
  {
    id: 'mindfulness_2',
    category: 'mindfulness',
    question: 'How present and mindful do you feel in your daily activities?',
    options: [
      { id: 'very_present', text: 'Very Present', score: 5, description: "I'm very mindful and present" },
      { id: 'mostly_present', text: 'Mostly Present', score: 4, description: "I'm usually mindful" },
      { id: 'sometimes_present', text: 'Sometimes Present', score: 3, description: "I'm mindful sometimes" },
      { id: 'rarely_present', text: 'Rarely Present', score: 2, description: "I'm often distracted" },
      { id: 'never_present', text: 'Never Present', score: 1, description: "I'm always distracted" },
    ],
  },
  {
    id: 'social_1',
    category: 'social',
    question: 'How satisfied are you with your social relationships?',
    options: [
      { id: 'very_satisfied', text: 'Very Satisfied', score: 5, description: 'I have great relationships' },
      { id: 'satisfied', text: 'Satisfied', score: 4, description: "I'm happy with my relationships" },
      { id: 'neutral', text: 'Neutral', score: 3, description: 'My relationships are okay' },
      { id: 'dissatisfied', text: 'Dissatisfied', score: 2, description: "I'm not happy with my relationships" },
      { id: 'very_dissatisfied', text: 'Very Dissatisfied', score: 1, description: 'I have poor relationships' },
    ],
  },
  {
    id: 'social_2',
    category: 'social',
    question: 'How often do you spend quality time with friends or family?',
    options: [
      { id: 'daily', text: 'Daily', score: 5, description: 'Regular meaningful connection' },
      { id: 'most_days', text: 'Most days', score: 4, description: 'Frequent contact with loved ones' },
      { id: 'weekly', text: 'Weekly', score: 3, description: 'Some social time each week' },
      { id: 'monthly', text: 'Monthly', score: 2, description: 'Social contact is infrequent' },
      { id: 'rarely', text: 'Rarely', score: 1, description: 'I feel socially isolated' },
    ],
  },
  {
    id: 'worklife_1',
    category: 'workLife',
    question: 'How would you rate your work–life balance?',
    options: [
      { id: 'excellent', text: 'Excellent', score: 5, description: 'Perfect balance' },
      { id: 'good', text: 'Good', score: 4, description: 'Good balance most of the time' },
      { id: 'fair', text: 'Fair', score: 3, description: 'Okay balance' },
      { id: 'poor', text: 'Poor', score: 2, description: 'Poor balance' },
      { id: 'very_poor', text: 'Very Poor', score: 1, description: 'No balance at all' },
    ],
  },
  {
    id: 'worklife_2',
    category: 'workLife',
    question: 'How often do you feel overwhelmed by work responsibilities?',
    options: [
      { id: 'never', text: 'Never', score: 5, description: 'Workload feels manageable' },
      { id: 'rarely', text: 'Rarely', score: 4, description: 'Occasional busy periods only' },
      { id: 'sometimes', text: 'Sometimes', score: 3, description: 'Periodic overwhelm' },
      { id: 'often', text: 'Often', score: 2, description: 'Work stress is a regular problem' },
      { id: 'always', text: 'Always', score: 1, description: 'I am constantly overwhelmed by work' },
    ],
  },
  {
    id: 'environment_1',
    category: 'environment',
    question: 'How would you rate your living and working environment?',
    options: [
      { id: 'excellent', text: 'Excellent', score: 5, description: 'Very clean and organized' },
      { id: 'good', text: 'Good', score: 4, description: 'Generally clean and organized' },
      { id: 'fair', text: 'Fair', score: 3, description: 'Okay but could be better' },
      { id: 'poor', text: 'Poor', score: 2, description: 'Cluttered and disorganized' },
      { id: 'very_poor', text: 'Very Poor', score: 1, description: 'Very messy and chaotic' },
    ],
  },
  {
    id: 'environment_2',
    category: 'environment',
    question: 'How often do you spend time in nature or outdoor environments?',
    options: [
      { id: 'daily', text: 'Daily', score: 5, description: 'Regular time outdoors boosts mood and vitamin D' },
      { id: 'most_days', text: 'Most days', score: 4, description: 'Nature is part of my routine' },
      { id: 'weekly', text: 'Weekly', score: 3, description: 'Some outdoor time each week' },
      { id: 'monthly', text: 'Monthly', score: 2, description: 'Rarely outside beyond commuting' },
      { id: 'rarely', text: 'Rarely', score: 1, description: 'Almost always indoors' },
    ],
  },
];

const CATEGORY_ORDER: WellnessCategoryKey[] = [
  'physical',
  'mental',
  'nutrition',
  'fitness',
  'sleep',
  'stress',
  'mindfulness',
  'social',
  'workLife',
  'environment',
];

function questionsForIndex(index: 0 | 1): AssessmentQuestion[] {
  return CATEGORY_ORDER.map((category) => {
    const pair = WELLNESS_ASSESSMENT_QUESTIONS.filter((q) => q.category === category);
    return pair[index] ?? pair[0];
  }).filter(Boolean) as AssessmentQuestion[];
}

/** First-session quiz: 1 question per category (10 total). */
export const ONBOARDING_ASSESSMENT_QUESTIONS = questionsForIndex(0);

/** Retake / deeper check-in: the second question per category (10 total). */
export const DEEPER_CHECKIN_QUESTIONS = questionsForIndex(1);

export type AssessmentQuestionSet = 'onboarding' | 'deeper' | 'full';

export function getAssessmentQuestions(set: AssessmentQuestionSet): AssessmentQuestion[] {
  if (set === 'onboarding') return ONBOARDING_ASSESSMENT_QUESTIONS;
  if (set === 'deeper') return DEEPER_CHECKIN_QUESTIONS;
  return WELLNESS_ASSESSMENT_QUESTIONS;
}
