export type GuideSection = {
  title: string;
  items: { icon: string; title: string; body: string }[];
};

export type RichLearningGuide = {
  id: string;
  heroTitle: string;
  sections: GuideSection[];
  tips?: { title: string; body: string }[];
  disclaimer?: string;
};

export const RICH_LEARNING_GUIDES: Record<string, RichLearningGuide> = {
  vitamins: {
    id: 'vitamins',
    heroTitle: 'Vitamins & Supplements',
    sections: [
      {
        title: 'Food first',
        items: [
          { icon: '🥗', title: 'Whole foods win', body: 'Most people meet needs through varied diet — supplements fill gaps, not replace meals.' },
          { icon: '☀️', title: 'Vitamin D', body: 'Common deficiency in northern latitudes. Sun exposure, oily fish, fortified foods; supplement if GP confirms low levels.' },
          { icon: '🩸', title: 'Iron & B12', body: 'Vegetarians and heavy exercisers may need monitoring. Fatigue + pale skin warrants a blood test.' },
        ],
      },
      {
        title: 'When supplements help',
        items: [
          { icon: '🤰', title: 'Life stages', body: 'Folic acid in pregnancy, vitamin D in winter, B12 for vegans — evidence-backed exceptions.' },
          { icon: '💊', title: 'Quality matters', body: 'Choose brands with third-party testing (USP, Informed Sport). Avoid mega-doses without clinical reason.' },
          { icon: '⏰', title: 'Timing', body: 'Fat-soluble vitamins (A,D,E,K) with meals; iron away from tea/coffee; magnesium often evening for sleep.' },
        ],
      },
    ],
    tips: [
      { title: 'Check interactions', body: 'Supplements can interact with medications — discuss with your pharmacist or GP.' },
      { title: 'Track symptoms', body: 'Log energy and mood in the app before adding multiple supplements at once.' },
    ],
    disclaimer: 'General education only — not medical advice. Blood tests guide personalised supplementation.',
  },
  'nutrition-basics': {
    id: 'nutrition-basics',
    heroTitle: 'Nutrition Basics',
    sections: [
      {
        title: 'Plate balance',
        items: [
          { icon: '🍽️', title: 'Half plants', body: 'Vegetables and fruit at most meals — fibre, micronutrients, and satiety without excess calories.' },
          { icon: '🥩', title: 'Protein anchor', body: '20–35g per main meal supports muscle, immunity, and stable blood sugar.' },
          { icon: '🌾', title: 'Smart carbs', body: 'Whole grains and legumes over refined flour — slower energy release and better gut health.' },
        ],
      },
      {
        title: 'Sustainable habits',
        items: [
          { icon: '🥑', title: 'Healthy fats', body: 'Olive oil, nuts, avocado, oily fish — essential for hormones and vitamin absorption.' },
          { icon: '📅', title: 'Meal rhythm', body: 'Regular meal times reduce impulsive eating. Use Meal Planner to structure your week.' },
          { icon: '💧', title: 'Hydration', body: 'Thirst mimics hunger — drink water before snacking.' },
        ],
      },
    ],
    tips: [
      { title: 'Start with one change', body: 'Add vegetables to lunch for two weeks before overhauling every meal.' },
      { title: 'Read labels', body: 'Compare protein and fibre per serving — marketing claims often mislead.' },
    ],
  },
  'sleep-recovery': {
    id: 'sleep-recovery',
    heroTitle: 'Sleep & Recovery',
    sections: [
      {
        title: 'Why sleep matters',
        items: [
          { icon: '🧠', title: 'Brain repair', body: 'Deep sleep consolidates memory and clears metabolic waste from the brain.' },
          { icon: '💪', title: 'Muscle recovery', body: 'Growth hormone peaks during deep sleep — essential after exercise.' },
          { icon: '❤️', title: 'Heart health', body: 'Consistent 7–9 hours reduces risk of hypertension and irregular heart rhythms.' },
        ],
      },
      {
        title: 'Sleep hygiene essentials',
        items: [
          { icon: '🕐', title: 'Fixed schedule', body: 'Same wake time daily — even weekends — anchors your circadian rhythm.' },
          { icon: '🌡️', title: 'Cool & dark room', body: 'Aim for 16–19°C. Blackout curtains or eye mask block melatonin-disrupting light.' },
          { icon: '📵', title: 'Screen curfew', body: 'No screens 60 minutes before bed. Blue light delays sleep onset.' },
          { icon: '☕', title: 'Caffeine cutoff', body: 'Avoid caffeine after 2pm — half-life is 5–6 hours.' },
        ],
      },
    ],
    tips: [
      { title: 'Track your debt', body: 'Use the Sleep Debt Calculator in Fitness Hub to see how much rest you need.' },
      { title: 'Wind-down routine', body: 'Try Breathing Exercises or Meditation Timer 10 minutes before bed.' },
    ],
  },
  'stress-mindfulness': {
    id: 'stress-mindfulness',
    heroTitle: 'Stress & Mindfulness',
    sections: [
      {
        title: 'Understanding stress',
        items: [
          { icon: '⚡', title: 'Fight or flight', body: 'Acute stress activates cortisol and adrenaline — useful short-term, harmful when chronic.' },
          { icon: '🫁', title: 'Breath control', body: 'Slow exhales activate the parasympathetic nervous system within minutes.' },
          { icon: '🚶', title: 'Movement breaks', body: 'A 10-minute walk lowers cortisol and improves mood as effectively as some medications short-term.' },
        ],
      },
      {
        title: 'Daily practices',
        items: [
          { icon: '🧘', title: 'Box breathing', body: 'Inhale 4s, hold 4s, exhale 4s, hold 4s — repeat 4 rounds.' },
          { icon: '📝', title: 'Journalling', body: 'Write 3 gratitudes or brain-dump worries before bed.' },
          { icon: '🌿', title: 'Micro-mindfulness', body: 'Notice 5 things you see, 4 you hear, 3 you feel — grounds you in the present.' },
        ],
      },
    ],
  },
  hydration: {
    id: 'hydration',
    heroTitle: 'Hydration',
    sections: [
      {
        title: 'Why water matters',
        items: [
          { icon: '💧', title: 'Every cell', body: 'Water transports nutrients, regulates temperature, and lubricates joints.' },
          { icon: '🧠', title: 'Cognition', body: 'Even 1–2% dehydration impairs focus, mood, and reaction time.' },
          { icon: '🏃', title: 'Exercise', body: 'Sweating increases needs — add 500ml per hour of moderate activity.' },
        ],
      },
      {
        title: 'Practical targets',
        items: [
          { icon: '🥤', title: 'Daily baseline', body: '1.5–2L for most adults; more in heat or during exercise.' },
          { icon: '💛', title: 'Urine check', body: 'Pale yellow = well hydrated. Dark amber = drink more.' },
          { icon: '🍉', title: 'Food counts', body: 'Fruit, soup, and herbal tea contribute to fluid intake.' },
        ],
      },
    ],
    tips: [{ title: 'Track it', body: 'Use the Hydration Tracker in Fitness Hub for a personalised target.' }],
  },
  'gut-health': {
    id: 'gut-health',
    heroTitle: 'Gut Health',
    sections: [
      {
        title: 'Microbiome basics',
        items: [
          { icon: '🦠', title: 'Trillions of bacteria', body: 'Your gut microbiome influences immunity, mood, and nutrient absorption.' },
          { icon: '🌾', title: 'Feed diversity', body: 'Aim for 30 different plant foods weekly to support bacterial diversity.' },
          { icon: '🥛', title: 'Fermented foods', body: 'Yogurt, kefir, sauerkraut, and kimchi add beneficial probiotics.' },
        ],
      },
      {
        title: 'Gut-friendly habits',
        items: [
          { icon: '🍽️', title: 'Eat slowly', body: 'Chew thoroughly — digestion starts in the mouth.' },
          { icon: '😴', title: 'Sleep & stress', body: 'Poor sleep and chronic stress disrupt gut motility and barrier function.' },
          { icon: '🏃', title: 'Stay active', body: 'Regular movement supports healthy bowel transit.' },
        ],
      },
    ],
  },
  'heart-health': {
    id: 'heart-health',
    heroTitle: 'Heart Health',
    sections: [
      {
        title: 'Cardiovascular fundamentals',
        items: [
          { icon: '❤️', title: 'Resting heart rate', body: 'Typical range 60–100 bpm. Regular aerobic exercise often lowers RHR over time.' },
          { icon: '🩺', title: 'Blood pressure', body: 'Target below 120/80 mmHg. Reduce salt, stay active, manage stress.' },
          { icon: '🚶', title: 'Daily movement', body: '150 minutes moderate activity weekly supports arterial health.' },
        ],
      },
      {
        title: 'Track & improve',
        items: [
          { icon: '📱', title: 'Connect health data', body: 'Sync Apple Health or Health Connect to see heart rate in the app.' },
          { icon: '📊', title: 'Log BP readings', body: 'Use the Blood Pressure Tracker for trends to share with your GP.' },
        ],
      },
    ],
  },
  'exercise-fundamentals': {
    id: 'exercise-fundamentals',
    heroTitle: 'Exercise Basics',
    sections: [
      {
        title: 'Start safely',
        items: [
          { icon: '🔥', title: 'Warm up', body: '5–10 minutes of light movement raises heart rate and loosens joints before every session.' },
          { icon: '🧍', title: 'Form first', body: 'Controlled movement with good posture prevents injury and builds strength faster.' },
          { icon: '📅', title: 'Consistency', body: '3–4 sessions weekly beats one intense weekend workout.' },
        ],
      },
      {
        title: 'Balanced week',
        items: [
          { icon: '🏃', title: 'Cardio', body: 'Walking, cycling, swimming — raises heart rate and burns calories.' },
          { icon: '🏋️', title: 'Strength', body: '2× weekly resistance training preserves muscle and bone density.' },
          { icon: '🤸', title: 'Flexibility', body: 'Stretching or yoga improves range of motion and recovery.' },
        ],
      },
    ],
  },
  'protein-recovery': {
    id: 'protein-recovery',
    heroTitle: 'Protein & Recovery',
    sections: [
      {
        title: 'Protein fundamentals',
        items: [
          { icon: '🥩', title: 'Building blocks', body: 'Amino acids repair muscle tissue and support immune function.' },
          { icon: '📊', title: 'How much?', body: '0.8g/kg baseline; 1.2–1.6g/kg if you train regularly.' },
          { icon: '⏰', title: 'Timing', body: 'Spread protein across meals; post-workout within 2 hours supports recovery.' },
        ],
      },
      {
        title: 'Recovery stack',
        items: [
          { icon: '😴', title: 'Sleep', body: 'Muscle repair peaks during deep sleep — prioritise 7–9 hours.' },
          { icon: '💧', title: 'Hydration', body: 'Dehydration slows protein synthesis and increases soreness.' },
          { icon: '📈', title: 'Progressive load', body: 'Increase training gradually — recovery days are when adaptation happens.' },
        ],
      },
    ],
  },
  'healthy-habits': {
    id: 'healthy-habits',
    heroTitle: 'Healthy Habits',
    sections: [
      {
        title: 'Building habits that stick',
        items: [
          { icon: '1️⃣', title: 'Start tiny', body: 'One glass of water on waking beats an ambitious 10-habit overhaul.' },
          { icon: '🔗', title: 'Habit stacking', body: 'Link new habits to existing ones: "After coffee, I stretch for 2 minutes."' },
          { icon: '📊', title: 'Track streaks', body: 'Use daily check-ins and plan tasks to build accountability.' },
        ],
      },
      {
        title: 'Staying on track',
        items: [
          { icon: '🔄', title: 'Forgive slip-ups', body: 'Missing one day does not reset progress — return the next day.' },
          { icon: '👥', title: 'Social support', body: 'Share goals with a friend or clinician for external accountability.' },
          { icon: '🎯', title: 'Review weekly', body: 'Check Analytics each Sunday — adjust one habit based on data.' },
        ],
      },
    ],
  },
};

export function getRichLearningGuide(id: string): RichLearningGuide | undefined {
  return RICH_LEARNING_GUIDES[id];
}
