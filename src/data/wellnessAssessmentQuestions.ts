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
    question: 'How would you describe your mental health and emotional balance through a typical day?',
    options: [
      {
        id: 'excellent',
        text: 'Excellent',
        score: 5,
        description: 'Steady, positive mood — I stay emotionally balanced most of the day',
      },
      {
        id: 'good',
        text: 'Good',
        score: 4,
        description: 'Mostly positive with brief dips that pass',
      },
      {
        id: 'fair',
        text: 'Fair',
        score: 3,
        description: 'Ups and downs — mood shifts but I manage okay',
      },
      {
        id: 'poor',
        text: 'Poor',
        score: 2,
        description: 'Low or volatile mood often throws off my day',
      },
      {
        id: 'very_poor',
        text: 'Very Poor',
        score: 1,
        description: 'Serious mental health challenges and little emotional balance',
      },
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
    question: 'How would you rate your eating habits and how meals typically leave you feeling?',
    options: [
      {
        id: 'excellent',
        text: 'Excellent',
        score: 5,
        description: 'Balanced, nourishing meals that leave me energized and satisfied',
      },
      {
        id: 'good',
        text: 'Good',
        score: 4,
        description: 'I eat well most of the time and usually feel good after meals',
      },
      {
        id: 'fair',
        text: 'Fair',
        score: 3,
        description: 'Mixed habits — sometimes nourished, sometimes sluggish or unsatisfied',
      },
      {
        id: 'poor',
        text: 'Poor',
        score: 2,
        description: 'Diet needs work; meals often leave me drained or craving more',
      },
      {
        id: 'very_poor',
        text: 'Very Poor',
        score: 1,
        description: 'Unhealthy eating that regularly leaves me feeling worse',
      },
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
    question: 'How often do you exercise, and how does your body typically feel after sitting or long inactivity?',
    options: [
      {
        id: 'daily',
        text: 'Daily & limber',
        score: 5,
        description: 'Daily movement; I stay loose even after sitting',
      },
      {
        id: 'most_days',
        text: 'Most days, mild stiffness',
        score: 4,
        description: 'Exercise most days; brief stiffness that eases quickly',
      },
      {
        id: 'sometimes',
        text: 'Sometimes, noticeable stiffness',
        score: 3,
        description: '2–3 times/week; sitting leaves me stiff or sluggish',
      },
      {
        id: 'rarely',
        text: 'Rarely, often stiff',
        score: 2,
        description: 'Infrequent exercise; long sitting is uncomfortable',
      },
      {
        id: 'never',
        text: 'Never / very stiff',
        score: 1,
        description: 'Little intentional exercise; inactivity leaves me sore or drained',
      },
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
    question: 'Overall, how is your sleep — both how rested you feel and how many hours you typically get?',
    options: [
      {
        id: 'excellent',
        text: 'Excellent',
        score: 5,
        description: '7–9 hours most nights and I wake refreshed',
      },
      {
        id: 'good',
        text: 'Good',
        score: 4,
        description: 'Usually 7+ hours and restful enough',
      },
      {
        id: 'fair',
        text: 'Fair',
        score: 3,
        description: 'Around 6–7 hours or okay quality — room to improve',
      },
      {
        id: 'poor',
        text: 'Poor',
        score: 2,
        description: 'Often under 6–7 hours or unrestful sleep',
      },
      {
        id: 'very_poor',
        text: 'Very Poor',
        score: 1,
        description: 'Chronically short or poor sleep; rarely feel rested',
      },
    ],
  },
  {
    id: 'sleep_2',
    category: 'sleep',
    question: 'How consistent is your sleep schedule from night to night?',
    options: [
      {
        id: 'very_consistent',
        text: 'Very consistent',
        score: 5,
        description: 'Similar bedtime and wake time almost every day',
      },
      {
        id: 'mostly_consistent',
        text: 'Mostly consistent',
        score: 4,
        description: 'Fairly steady, with occasional late nights',
      },
      {
        id: 'somewhat_variable',
        text: 'Somewhat variable',
        score: 3,
        description: 'Timing shifts a few times a week',
      },
      {
        id: 'often_irregular',
        text: 'Often irregular',
        score: 2,
        description: 'Bed and wake times swing a lot',
      },
      {
        id: 'very_irregular',
        text: 'Very irregular',
        score: 1,
        description: 'No reliable sleep pattern',
      },
    ],
  },
  {
    id: 'stress_1',
    category: 'stress',
    question: 'How well do you manage daily stress and recover after particularly stressful days?',
    options: [
      {
        id: 'excellent',
        text: 'Excellent',
        score: 5,
        description: 'I handle stress well and bounce back the same day or next',
      },
      {
        id: 'good',
        text: 'Good',
        score: 4,
        description: 'Usually cope well and recover within a day or two',
      },
      {
        id: 'fair',
        text: 'Fair',
        score: 3,
        description: "I get through stress but recovery takes longer than I'd like",
      },
      {
        id: 'poor',
        text: 'Poor',
        score: 2,
        description: 'Stress piles up and hard days linger',
      },
      {
        id: 'very_poor',
        text: 'Very Poor',
        score: 1,
        description: 'I feel overwhelmed and struggle to recover',
      },
    ],
  },
  {
    id: 'stress_2',
    category: 'stress',
    question: 'How often does stress show up as physical symptoms (tension, headaches, stomach upset)?',
    options: [
      { id: 'never', text: 'Never', score: 5, description: 'Stress stays mental — body stays calm' },
      { id: 'rarely', text: 'Rarely', score: 4, description: 'Occasional tension that passes quickly' },
      { id: 'sometimes', text: 'Sometimes', score: 3, description: 'Physical signs show up now and then' },
      { id: 'often', text: 'Often', score: 2, description: 'Body regularly carries my stress' },
      { id: 'always', text: 'Always', score: 1, description: 'Chronic physical stress symptoms' },
    ],
  },
  {
    id: 'mindfulness_1',
    category: 'mindfulness',
    question: 'How often do you practice mindfulness, and how focused or distracted do you feel day to day?',
    options: [
      {
        id: 'daily',
        text: 'Daily & focused',
        score: 5,
        description: 'Regular practice; I stay present and focused most of the time',
      },
      {
        id: 'most_days',
        text: 'Most days, mostly present',
        score: 4,
        description: 'Frequent short practices; usually present with brief distractions',
      },
      {
        id: 'sometimes',
        text: 'Sometimes, mixed focus',
        score: 3,
        description: 'I practise when I remember; focus comes and goes',
      },
      {
        id: 'rarely',
        text: 'Rarely, often distracted',
        score: 2,
        description: 'Occasional practice; mind wanders a lot',
      },
      {
        id: 'never',
        text: 'Never / always distracted',
        score: 1,
        description: 'No practice and I feel constantly pulled away',
      },
    ],
  },
  {
    id: 'mindfulness_2',
    category: 'mindfulness',
    question: 'When your mind wanders or you feel overwhelmed, how easily can you pause and reset?',
    options: [
      {
        id: 'very_easily',
        text: 'Very easily',
        score: 5,
        description: 'I notice and gently return to the moment',
      },
      {
        id: 'fairly_easily',
        text: 'Fairly easily',
        score: 4,
        description: 'I can reset with a short pause most of the time',
      },
      {
        id: 'sometimes',
        text: 'Sometimes',
        score: 3,
        description: 'I reset when I remember, but it takes effort',
      },
      {
        id: 'with_difficulty',
        text: 'With difficulty',
        score: 2,
        description: 'Hard to interrupt racing thoughts or autopilot',
      },
      {
        id: 'almost_never',
        text: 'Almost never',
        score: 1,
        description: 'I stay stuck in distraction or overwhelm',
      },
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
