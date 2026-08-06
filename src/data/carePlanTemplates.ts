/**
 * Ported from native iOS `CarePlanTemplateType` + `CarePlanTemplatesView`
 * (Wellness Shift V2 - CSQ SDK IOS / ClinicianModels.swift).
 */

export type CarePlanTemplateColorKey =
  | 'red'
  | 'orange'
  | 'cyan'
  | 'purple'
  | 'indigo'
  | 'green'
  | 'blue'
  | 'pink'
  | 'yellow'
  | 'mint'
  | 'teal'
  | 'brown'
  | 'gray';

export type CarePlanTemplate = {
  id: string;
  title: string;
  shortDescription: string;
  purpose: string;
  usedFor: string[];
  /** Core plan blocks — used as default tasks when sending. */
  tasks: string[];
  visualExplainers: string[];
  icon: string;
  colorKey: CarePlanTemplateColorKey;
  categoryName: string;
};

export type CarePlanTemplateCategory = {
  name: string;
  icon: string;
  colorKey: CarePlanTemplateColorKey;
  templateIds: string[];
};

export const TEMPLATE_COLOR: Record<CarePlanTemplateColorKey, string> = {
  red: '#E53935',
  orange: '#FB8C00',
  cyan: '#00ACC1',
  purple: '#8C59BF',
  indigo: '#5C6BC0',
  green: '#43A047',
  blue: '#1E88E5',
  pink: '#EC407A',
  yellow: '#F9A825',
  mint: '#26A69A',
  teal: '#00897B',
  brown: '#8D6E63',
  gray: '#78909C',
};

/** Shared care-plan starters used by create flow + templates library. */
export const CARE_PLAN_TEMPLATES: CarePlanTemplate[] = [
  {
    id: 'cardiovascular',
    title: 'Cardiovascular Health',
    shortDescription: 'Heart & circulation health',
    purpose: 'Improve heart health, circulation, BP, endurance, and patient understanding',
    usedFor: ['High BP', 'Family heart risk', 'Post-COVID fatigue', 'Cardiovascular prevention'],
    tasks: [
      'Low-impact cardio routines',
      'Daily step goals',
      'Breathing/HR regulation',
      'Salt & hydration habits',
      'Weekly BP/HR check-ins',
    ],
    visualExplainers: [
      'Interactive heart anatomy',
      'Blood flow & oxygen delivery',
      'Plaque buildup & cholesterol',
      'HR vs HRV (rest vs stress)',
    ],
    icon: 'heart',
    colorKey: 'red',
    categoryName: 'Cardiovascular',
  },
  {
    id: 'heartHealth',
    title: 'Heart Health',
    shortDescription: 'Heart function & monitoring',
    purpose: 'Monitor and improve heart function and cardiovascular fitness',
    usedFor: ['Heart monitoring', 'Arrhythmia', 'Heart rate concerns'],
    tasks: ['Heart rate monitoring', 'Cardio exercises', 'Heart-healthy diet'],
    visualExplainers: ['Heart anatomy', 'Heart rate zones', 'Cardiac function'],
    icon: 'heart-circle',
    colorKey: 'red',
    categoryName: 'Heart Health',
  },
  {
    id: 'bloodPressure',
    title: 'Blood Pressure Management',
    shortDescription: 'BP control & management',
    purpose: 'Manage and control blood pressure through lifestyle changes',
    usedFor: ['Hypertension', 'Hypotension', 'BP monitoring'],
    tasks: ['BP monitoring', 'Sodium reduction', 'Stress management'],
    visualExplainers: ['Blood pressure mechanics', 'Arterial health', 'BP measurement'],
    icon: 'pulse',
    colorKey: 'red',
    categoryName: 'Blood Pressure',
  },
  {
    id: 'metabolic',
    title: 'Metabolic & Blood Sugar',
    shortDescription: 'Blood sugar & metabolism',
    purpose: 'Stabilise blood sugar, insulin response, and metabolic health',
    usedFor: ['Prediabetes', 'Weight management', 'Energy crashes', 'PCOS support'],
    tasks: [
      'Meal timing guidance',
      'Light post-meal movement',
      'Carb quality education',
      'Sleep & glucose link',
      'Weekly fasting glucose check-ins',
    ],
    visualExplainers: [
      'Insulin & glucose loop',
      'Pancreas function',
      'Glycaemic load vs spikes',
      'Visceral fat impact',
    ],
    icon: 'flame',
    colorKey: 'orange',
    categoryName: 'Metabolic',
  },
  {
    id: 'diabetes',
    title: 'Diabetes Management',
    shortDescription: 'Diabetes care & monitoring',
    purpose: 'Comprehensive diabetes management and blood sugar control',
    usedFor: ['Type 2 diabetes', 'Blood sugar control', 'Insulin management'],
    tasks: ['Blood sugar monitoring', 'Carb counting', 'Medication adherence'],
    visualExplainers: ['Blood sugar regulation', 'Insulin function', 'Glucose monitoring'],
    icon: 'water',
    colorKey: 'orange',
    categoryName: 'Diabetes',
  },
  {
    id: 'nutrition',
    title: 'Nutrition & Diet',
    shortDescription: 'Healthy eating & diet',
    purpose: 'Healthy eating habits and balanced nutrition guidance',
    usedFor: ['Healthy eating', 'Diet planning', 'Nutritional deficiencies'],
    tasks: ['Meal planning', 'Portion control', 'Nutrient tracking'],
    visualExplainers: ['Macronutrients', 'Micronutrients', 'Digestion process'],
    icon: 'restaurant',
    colorKey: 'green',
    categoryName: 'Nutrition',
  },
  {
    id: 'respiratory',
    title: 'Respiratory & Oxygen Efficiency',
    shortDescription: 'Breathing & lung health',
    purpose: 'Improve breathing efficiency, oxygen use, and recovery',
    usedFor: ['Asthma support', 'Post-viral fatigue', 'Anxiety-related breathing', 'Endurance improvement'],
    tasks: [
      'Nasal breathing drills',
      'CO₂ tolerance exercises',
      'Light cardio pacing',
      'Air quality awareness',
      'Breath symptom tracking',
    ],
    visualExplainers: [
      'Lung anatomy & alveoli',
      'Oxygen exchange',
      'Breathing patterns (chest vs diaphragm)',
      'VO₂ basics',
    ],
    icon: 'fitness',
    colorKey: 'cyan',
    categoryName: 'Respiratory',
  },
  {
    id: 'breathing',
    title: 'Breathing & Lung Health',
    shortDescription: 'Breath work & exercises',
    purpose: 'Breathing exercises and respiratory wellness techniques',
    usedFor: ['Breathwork', 'Respiratory exercises', 'Lung capacity'],
    tasks: ['Breathing exercises', 'Diaphragmatic breathing', 'Breath awareness'],
    visualExplainers: ['Diaphragm function', 'Breath mechanics', 'Oxygen exchange'],
    icon: 'cloudy-outline',
    colorKey: 'cyan',
    categoryName: 'Breathing',
  },
  {
    id: 'musculoskeletal',
    title: 'Musculoskeletal & Joint Health',
    shortDescription: 'Joint & muscle care',
    purpose: 'Reduce pain, improve mobility, prevent injury',
    usedFor: ['Back pain', 'Knee/shoulder issues', 'Desk-related stiffness', 'Early rehab'],
    tasks: ['Mobility routines', 'Strength basics', 'Posture habits', 'Pain & stiffness check-ins'],
    visualExplainers: [
      'Joint anatomy (knee, spine, shoulder)',
      'Muscle vs tendon vs ligament',
      'Range-of-motion visuals',
      'Load vs injury risk',
    ],
    icon: 'walk',
    colorKey: 'purple',
    categoryName: 'Musculoskeletal',
  },
  {
    id: 'painManagement',
    title: 'Pain Management',
    shortDescription: 'Pain relief & management',
    purpose: 'Strategies for managing chronic and acute pain',
    usedFor: ['Chronic pain', 'Acute pain', 'Pain relief strategies'],
    tasks: ['Pain tracking', 'Relief techniques', 'Activity modification'],
    visualExplainers: ['Pain pathways', 'Inflammation process', 'Pain relief mechanisms'],
    icon: 'medkit',
    colorKey: 'purple',
    categoryName: 'Pain Management',
  },
  {
    id: 'mobility',
    title: 'Mobility & Flexibility',
    shortDescription: 'Flexibility & movement',
    purpose: 'Improve flexibility, range of motion, and movement quality',
    usedFor: ['Flexibility', 'Range of motion', 'Joint stiffness'],
    tasks: ['Stretching routines', 'Flexibility exercises', 'Range of motion work'],
    visualExplainers: ['Joint mechanics', 'Muscle flexibility', 'Range of motion'],
    icon: 'body',
    colorKey: 'purple',
    categoryName: 'Mobility',
  },
  {
    id: 'mentalHealth',
    title: 'Mental Health & Nervous System',
    shortDescription: 'Mental wellness support',
    purpose: 'Regulate stress, anxiety, and emotional resilience',
    usedFor: ['Anxiety', 'Burnout', 'Sleep disruption', 'Psychosomatic symptoms'],
    tasks: [
      'Breathwork',
      'Nervous system down-regulation',
      'Journaling prompts',
      'Sleep hygiene',
      'Mood tracking',
    ],
    visualExplainers: [
      'Sympathetic vs parasympathetic',
      'Stress response loop',
      'Vagus nerve function',
      'Cortisol rhythm',
    ],
    icon: 'happy',
    colorKey: 'indigo',
    categoryName: 'Mental Health',
  },
  {
    id: 'stress',
    title: 'Stress & Anxiety',
    shortDescription: 'Stress & anxiety relief',
    purpose: 'Stress reduction and anxiety management techniques',
    usedFor: ['Work stress', 'Anxiety', 'Tension', 'Overwhelm'],
    tasks: ['Stress tracking', 'Relaxation techniques', 'Coping strategies'],
    visualExplainers: ['Stress response', 'Cortisol cycle', 'Relaxation response'],
    icon: 'thunderstorm-outline',
    colorKey: 'indigo',
    categoryName: 'Stress & Anxiety',
  },
  {
    id: 'mindfulness',
    title: 'Mindfulness & Meditation',
    shortDescription: 'Meditation & awareness',
    purpose: 'Meditation, awareness, and mental clarity practices',
    usedFor: ['Meditation', 'Present awareness', 'Mental clarity'],
    tasks: ['Meditation practice', 'Mindful moments', 'Awareness exercises'],
    visualExplainers: ['Brain activity', 'Meditation effects', 'Mind-body connection'],
    icon: 'sparkles',
    colorKey: 'indigo',
    categoryName: 'Mindfulness',
  },
  {
    id: 'digestive',
    title: 'Digestive & Gut Health',
    shortDescription: 'Gut health & digestion',
    purpose: 'Improve digestion, reduce bloating, support gut-brain health',
    usedFor: ['IBS-type symptoms', 'Inflammation', 'Food sensitivity education'],
    tasks: ['Meal pacing', 'Fiber & hydration habits', 'Stress-digestion link', 'Symptom logging'],
    visualExplainers: [
      'Digestive tract overview',
      'Microbiome balance',
      'Gut-brain axis',
      'Inflammation pathways',
    ],
    icon: 'nutrition',
    colorKey: 'green',
    categoryName: 'Digestive',
  },
  {
    id: 'sleep',
    title: 'Sleep & Recovery',
    shortDescription: 'Better sleep & recovery',
    purpose: 'Improve sleep quality, recovery, hormonal balance',
    usedFor: ['Insomnia', 'Shift workers', 'Fatigue', 'Recovery from illness'],
    tasks: ['Light exposure routines', 'Wind-down habits', 'Caffeine timing', 'Sleep diary'],
    visualExplainers: ['Sleep stages', 'Circadian rhythm', 'Hormone cycles', 'Sleep debt effects'],
    icon: 'moon',
    colorKey: 'blue',
    categoryName: 'Sleep',
  },
  {
    id: 'weightManagement',
    title: 'Weight & Body Composition',
    shortDescription: 'Healthy weight management',
    purpose: 'Healthy weight change without obsession or extremes',
    usedFor: ['Sustainable fat loss', 'Lifestyle change', 'Metabolic reset'],
    tasks: ['NEAT movement', 'Protein habits', 'Strength basics', 'Progress reflection'],
    visualExplainers: [
      'Fat storage types',
      'Muscle vs fat metabolism',
      'Energy balance',
      'Scale vs body composition',
    ],
    icon: 'barbell',
    colorKey: 'pink',
    categoryName: 'Weight',
  },
  {
    id: 'fitness',
    title: 'Fitness & Exercise',
    shortDescription: 'Exercise & workouts',
    purpose: 'Exercise routines and physical fitness improvement',
    usedFor: ['Exercise routines', 'Strength training', 'Cardio fitness'],
    tasks: ['Workout routines', 'Exercise tracking', 'Fitness goals'],
    visualExplainers: ['Muscle anatomy', 'Exercise physiology', 'Energy systems'],
    icon: 'barbell-outline',
    colorKey: 'pink',
    categoryName: 'Fitness',
  },
  {
    id: 'immune',
    title: 'Immune Resilience & Inflammation',
    shortDescription: 'Immune system support',
    purpose: 'Support immune function and reduce chronic inflammation',
    usedFor: ['Frequent illness', 'Autoimmune education', 'Post-viral recovery'],
    tasks: ['Nutrition support habits', 'Sleep optimisation', 'Stress reduction', 'Symptom tracking'],
    visualExplainers: [
      'Immune system overview',
      'Acute vs chronic inflammation',
      'Cytokine response',
      'Lifestyle impact on immunity',
    ],
    icon: 'shield',
    colorKey: 'yellow',
    categoryName: 'Immune',
  },
  {
    id: 'preventative',
    title: 'Preventative Health & Longevity',
    shortDescription: 'Preventive health care',
    purpose: 'Educate + guide long-term health behaviours',
    usedFor: ['Health-curious users', 'Early intervention', 'Executive health'],
    tasks: ['Movement consistency', 'Stress management', 'Sleep discipline', 'Regular check-ins'],
    visualExplainers: [
      'Healthspan vs lifespan',
      'Cellular aging basics',
      'Oxidative stress',
      'Lifestyle leverage points',
    ],
    icon: 'leaf',
    colorKey: 'mint',
    categoryName: 'Preventative',
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle & Habits',
    shortDescription: 'Healthy habits & routines',
    purpose: 'Build healthy daily habits and routines',
    usedFor: ['Habit building', 'Routine optimization', 'Behavior change'],
    tasks: ['Habit tracking', 'Routine building', 'Goal setting'],
    visualExplainers: ['Habit formation', 'Behavior change', 'Routine optimization'],
    icon: 'home',
    colorKey: 'mint',
    categoryName: 'Lifestyle',
  },
  {
    id: 'womensHealth',
    title: "Women's Health & Hormones",
    shortDescription: 'Hormonal balance & care',
    purpose: 'Balance hormones, support menstrual health, address common women\'s health concerns',
    usedFor: ['Hormonal balance', 'Menstrual health', 'Pregnancy support', 'Menopause transition'],
    tasks: ['Hormone tracking', 'Cycle education', 'Nutrition timing', 'Stress management'],
    visualExplainers: [
      'Hormone cycle visualization',
      'Menstrual phase education',
      'Pregnancy body changes',
      'Menopause transition',
    ],
    icon: 'female',
    colorKey: 'pink',
    categoryName: "Women's Health",
  },
  {
    id: 'pregnancy',
    title: 'Pregnancy & Postnatal',
    shortDescription: 'Pregnancy & postnatal care',
    purpose: 'Support healthy pregnancy and postnatal recovery',
    usedFor: ['Prenatal care', 'Postnatal recovery', 'Pregnancy wellness'],
    tasks: ['Prenatal exercises', 'Nutrition guidance', 'Symptom tracking'],
    visualExplainers: ['Fetal development', 'Pregnancy stages', 'Postnatal recovery'],
    icon: 'people',
    colorKey: 'pink',
    categoryName: 'Pregnancy',
  },
  {
    id: 'menstrual',
    title: 'Menstrual Health',
    shortDescription: 'Cycle health & tracking',
    purpose: 'Menstrual cycle health and symptom management',
    usedFor: ['Period pain', 'Cycle tracking', 'PMS management'],
    tasks: ['Cycle tracking', 'Symptom logging', 'Self-care routines'],
    visualExplainers: ['Menstrual cycle phases', 'Hormone fluctuations', 'Symptom patterns'],
    icon: 'calendar',
    colorKey: 'pink',
    categoryName: 'Menstrual',
  },
  {
    id: 'pediatric',
    title: 'Pediatric & Development',
    shortDescription: 'Child development & health',
    purpose: 'Support healthy development, address common childhood conditions, establish healthy habits',
    usedFor: [
      'Growth monitoring',
      'Common childhood illnesses',
      'Developmental milestones',
      'Healthy habits',
    ],
    tasks: ['Growth tracking', 'Age-appropriate activity', 'Nutrition guidance', 'Sleep routines'],
    visualExplainers: [
      'Growth curve visualization',
      'Developmental milestones',
      'Common childhood conditions',
      'Age-appropriate nutrition',
    ],
    icon: 'happy-outline',
    colorKey: 'teal',
    categoryName: 'Pediatric',
  },
  {
    id: 'sportsPerformance',
    title: 'Sports Performance & Athletic',
    shortDescription: 'Athletic performance & training',
    purpose: 'Optimize athletic performance, prevent injuries, enhance recovery and training',
    usedFor: ['Athletic training', 'Injury prevention', 'Performance optimization', 'Recovery protocols'],
    tasks: ['Training periodization', 'Recovery protocols', 'Injury prevention', 'Performance metrics'],
    visualExplainers: [
      'Muscle fiber types',
      'Energy system pathways',
      'Injury mechanics',
      'Recovery physiology',
    ],
    icon: 'bicycle',
    colorKey: 'orange',
    categoryName: 'Sports',
  },
  {
    id: 'recovery',
    title: 'Recovery & Rehabilitation',
    shortDescription: 'Rehab & recovery protocols',
    purpose: 'Rehabilitation and recovery from injury or illness',
    usedFor: ['Post-injury rehab', 'Post-surgery recovery', 'Illness recovery'],
    tasks: ['Rehab exercises', 'Progress tracking', 'Gradual return to activity'],
    visualExplainers: ['Healing process', 'Tissue repair', 'Rehabilitation stages'],
    icon: 'medical',
    colorKey: 'teal',
    categoryName: 'Recovery',
  },
  {
    id: 'hydration',
    title: 'Hydration & Fluids',
    shortDescription: 'Fluid intake & hydration',
    purpose: 'Optimal fluid intake and hydration strategies',
    usedFor: ['Dehydration', 'Fluid balance', 'Electrolytes'],
    tasks: ['Water intake tracking', 'Electrolyte balance', 'Hydration reminders'],
    visualExplainers: ['Body water balance', 'Electrolyte function', 'Dehydration effects'],
    icon: 'water-outline',
    colorKey: 'blue',
    categoryName: 'Hydration',
  },
  {
    id: 'energy',
    title: 'Energy & Fatigue',
    shortDescription: 'Energy levels & fatigue',
    purpose: 'Combat fatigue and optimize energy levels',
    usedFor: ['Chronic fatigue', 'Low energy', 'Tiredness'],
    tasks: ['Energy tracking', 'Sleep optimization', 'Activity pacing'],
    visualExplainers: ['Energy metabolism', 'Fatigue mechanisms', 'ATP production'],
    icon: 'flash',
    colorKey: 'yellow',
    categoryName: 'Energy',
  },
  {
    id: 'aging',
    title: 'Healthy Aging',
    shortDescription: 'Healthy aging & longevity',
    purpose: 'Healthy aging strategies and longevity support',
    usedFor: ['Longevity', 'Age-related concerns', 'Healthy aging'],
    tasks: ['Mobility maintenance', 'Cognitive exercises', 'Social engagement'],
    visualExplainers: ['Cellular aging', 'Longevity factors', 'Age-related changes'],
    icon: 'hourglass-outline',
    colorKey: 'brown',
    categoryName: 'Healthy Aging',
  },
  {
    id: 'chronicConditions',
    title: 'Chronic Conditions',
    shortDescription: 'Long-term condition support',
    purpose: 'Long-term management of chronic health conditions',
    usedFor: ['Long-term illness', 'Condition management', 'Ongoing care'],
    tasks: ['Symptom tracking', 'Medication adherence', 'Lifestyle modifications'],
    visualExplainers: ['Condition management', 'Long-term care', 'Symptom control'],
    icon: 'medkit-outline',
    colorKey: 'gray',
    categoryName: 'Chronic Care',
  },
  {
    id: 'healthTracking',
    title: 'Health Tracking',
    shortDescription: 'Vitals, trackers & trends',
    purpose: 'Monitor vitals, hydration, sleep debt, recovery & activity trends',
    usedFor: ['Daily vitals check-ins', 'Trend review', 'Goal-linked tracking'],
    tasks: ['Log vitals consistently', 'Review weekly trends', 'Adjust habits from data'],
    visualExplainers: ['Trend charts', 'Vitals vs lifestyle', 'Recovery signals'],
    icon: 'trending-up',
    colorKey: 'blue',
    categoryName: 'Health Tracking',
  },
  {
    id: 'healthAssessments',
    title: 'Assessments',
    shortDescription: 'Screenings & self-assessments',
    purpose: 'Structured assessments for mobility, stress, posture & wellness',
    usedFor: [
      'Complete periodic assessments',
      'Discuss results with clinician',
      'Re-test as advised',
    ],
    tasks: ['Schedule assessments', 'Save baseline scores', 'Track change over time'],
    visualExplainers: ['Score interpretation', 'What good looks like', 'When to seek help'],
    icon: 'checkbox-outline',
    colorKey: 'purple',
    categoryName: 'Assessments',
  },
  {
    id: 'healthEducation',
    title: 'Health Education',
    shortDescription: 'Articles, guides & explainers',
    purpose: 'Evidence-based education across body systems & healthy habits',
    usedFor: ['Read assigned topics', 'Complete short reflections', 'Apply one habit per week'],
    tasks: ['Topic deep-dives', 'Visual explainers', 'Skill-building exercises'],
    visualExplainers: ['Body systems overview', 'Prevention basics', 'Lifestyle leverage'],
    icon: 'book',
    colorKey: 'indigo',
    categoryName: 'Health Education',
  },
];

/** Categories matching native `CarePlanTemplatesView.templateCategories`. */
export const CARE_PLAN_TEMPLATE_CATEGORIES: CarePlanTemplateCategory[] = [
  { name: 'Cardiovascular', icon: 'heart', colorKey: 'red', templateIds: ['cardiovascular'] },
  { name: 'Heart Health', icon: 'heart-circle', colorKey: 'red', templateIds: ['heartHealth'] },
  { name: 'Blood Pressure', icon: 'pulse', colorKey: 'red', templateIds: ['bloodPressure'] },
  { name: 'Metabolic', icon: 'flame', colorKey: 'orange', templateIds: ['metabolic'] },
  { name: 'Diabetes', icon: 'water', colorKey: 'orange', templateIds: ['diabetes'] },
  { name: 'Nutrition', icon: 'restaurant', colorKey: 'green', templateIds: ['nutrition'] },
  { name: 'Respiratory', icon: 'fitness', colorKey: 'cyan', templateIds: ['respiratory'] },
  { name: 'Breathing', icon: 'cloudy-outline', colorKey: 'cyan', templateIds: ['breathing'] },
  { name: 'Musculoskeletal', icon: 'walk', colorKey: 'purple', templateIds: ['musculoskeletal'] },
  { name: 'Pain Management', icon: 'medkit', colorKey: 'purple', templateIds: ['painManagement'] },
  { name: 'Mobility', icon: 'body', colorKey: 'purple', templateIds: ['mobility'] },
  { name: 'Mental Health', icon: 'happy', colorKey: 'indigo', templateIds: ['mentalHealth'] },
  { name: 'Stress & Anxiety', icon: 'thunderstorm-outline', colorKey: 'indigo', templateIds: ['stress'] },
  { name: 'Mindfulness', icon: 'sparkles', colorKey: 'indigo', templateIds: ['mindfulness'] },
  { name: 'Digestive', icon: 'nutrition', colorKey: 'green', templateIds: ['digestive'] },
  { name: 'Sleep', icon: 'moon', colorKey: 'blue', templateIds: ['sleep'] },
  { name: 'Weight', icon: 'barbell', colorKey: 'pink', templateIds: ['weightManagement'] },
  { name: 'Fitness', icon: 'barbell-outline', colorKey: 'pink', templateIds: ['fitness'] },
  { name: 'Immune', icon: 'shield', colorKey: 'yellow', templateIds: ['immune'] },
  { name: 'Preventative', icon: 'leaf', colorKey: 'mint', templateIds: ['preventative'] },
  { name: 'Lifestyle', icon: 'home', colorKey: 'mint', templateIds: ['lifestyle'] },
  { name: "Women's Health", icon: 'female', colorKey: 'pink', templateIds: ['womensHealth'] },
  { name: 'Pregnancy', icon: 'people', colorKey: 'pink', templateIds: ['pregnancy'] },
  { name: 'Menstrual', icon: 'calendar', colorKey: 'pink', templateIds: ['menstrual'] },
  { name: 'Pediatric', icon: 'happy-outline', colorKey: 'teal', templateIds: ['pediatric'] },
  { name: 'Sports', icon: 'bicycle', colorKey: 'orange', templateIds: ['sportsPerformance'] },
  { name: 'Recovery', icon: 'medical', colorKey: 'teal', templateIds: ['recovery'] },
  { name: 'Hydration', icon: 'water-outline', colorKey: 'blue', templateIds: ['hydration'] },
  { name: 'Energy', icon: 'flash', colorKey: 'yellow', templateIds: ['energy'] },
  { name: 'Healthy Aging', icon: 'hourglass-outline', colorKey: 'brown', templateIds: ['aging'] },
  { name: 'Chronic Care', icon: 'medkit-outline', colorKey: 'gray', templateIds: ['chronicConditions'] },
  { name: 'Health Tracking', icon: 'trending-up', colorKey: 'blue', templateIds: ['healthTracking'] },
  { name: 'Assessments', icon: 'checkbox-outline', colorKey: 'purple', templateIds: ['healthAssessments'] },
  { name: 'Health Education', icon: 'book', colorKey: 'indigo', templateIds: ['healthEducation'] },
];

export const BLANK_CARE_PLAN = {
  id: 'blank',
  title: 'Custom care plan',
  description: 'Care plan from your clinician.',
  tasks: [] as string[],
} as const;

/** Starter for native “Comprehensive Care Plan” path. */
export const COMPREHENSIVE_CARE_PLAN = {
  id: 'comprehensive',
  title: 'Comprehensive wellness plan',
  description:
    'Complete care plan including workouts, nutrition goals, sleep targets, habits, mindfulness, and mood tracking.',
  tasks: [
    'Workouts & fitness sessions',
    'Nutrition & hydration goals',
    'Sleep targets',
    'Daily habits & mindfulness',
    'Mood tracking',
  ],
} as const;

export function getCarePlanTemplate(id: string): CarePlanTemplate | undefined {
  return CARE_PLAN_TEMPLATES.find((t) => t.id === id);
}

export function templatesForCategory(category: CarePlanTemplateCategory): CarePlanTemplate[] {
  return category.templateIds
    .map((id) => getCarePlanTemplate(id))
    .filter((t): t is CarePlanTemplate => Boolean(t));
}

export function searchCarePlanCategories(query: string): CarePlanTemplateCategory[] {
  const q = query.trim().toLowerCase();
  if (!q) return CARE_PLAN_TEMPLATE_CATEGORIES;
  return CARE_PLAN_TEMPLATE_CATEGORIES.filter((c) => {
    if (c.name.toLowerCase().includes(q)) return true;
    return templatesForCategory(c).some(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.shortDescription.toLowerCase().includes(q) ||
        t.purpose.toLowerCase().includes(q),
    );
  });
}
