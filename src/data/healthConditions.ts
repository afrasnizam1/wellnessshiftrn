// src/data/healthConditions.ts
export interface HealthCondition {
  id: string;
  name: string;
  category: 'mental' | 'physical' | 'chronic' | 'preventive' | 'womens' | 'mens';
  description: string;
  prevalence: string;
  keySymptoms: string[];
  riskFactors: string[];
  lifestyleImpact: string;
  managementStrategies: string[];
  relatedConditions: string[];
  severity: 'mild' | 'moderate' | 'severe';
  icon: string;
  color: string;
}

export interface ConditionContent {
  overview: string;
  symptoms: Array<{
    name: string;
    description: string;
    severity: 'mild' | 'moderate' | 'severe';
  }>;
  causes: Array<{
    type: string;
    description: string;
  }>;
  diagnosis: Array<{
    test: string;
    description: string;
    preparation?: string;
  }>;
  treatment: Array<{
    category: 'lifestyle' | 'medication' | 'therapy' | 'surgery';
    name: string;
    description: string;
    effectiveness: string;
  }>;
  lifestyle: Array<{
    area: string;
    recommendations: string[];
    benefits: string;
  }>;
  complications: Array<{
    name: string;
    description: string;
    prevention: string;
  }>;
  resources: Array<{
    type: 'article' | 'video' | 'exercise' | 'diet' | 'support';
    title: string;
    description: string;
    url?: string;
  }>;
}

export const HEALTH_CONDITIONS: HealthCondition[] = [
  // Mental Health Conditions
  {
    id: 'depression',
    name: 'Depression',
    category: 'mental',
    description: 'A mood disorder causing persistent feelings of sadness and loss of interest',
    prevalence: '1 in 6 adults',
    keySymptoms: ['Persistent sadness', 'Loss of interest', 'Fatigue', 'Sleep changes'],
    riskFactors: ['Genetics', 'Trauma', 'Chronic illness', 'Substance abuse'],
    lifestyleImpact: 'Affects work, relationships, and daily functioning',
    managementStrategies: ['Therapy', 'Medication', 'Exercise', 'Social support'],
    relatedConditions: ['anxiety', 'insomnia', 'chronic-pain'],
    severity: 'moderate',
    icon: 'sad-outline',
    color: '#5B6CFF',
  },
  {
    id: 'anxiety',
    name: 'Anxiety Disorders',
    category: 'mental',
    description: 'Excessive worry, fear, and avoidance behaviors that interfere with daily life',
    prevalence: '1 in 5 adults',
    keySymptoms: ['Excessive worry', 'Restlessness', 'Physical tension', 'Panic attacks'],
    riskFactors: ['Genetics', 'Stress', 'Trauma', 'Medical conditions'],
    lifestyleImpact: 'Impairs decision-making and social interactions',
    managementStrategies: ['CBT', 'Mindfulness', 'Medication', 'Exercise'],
    relatedConditions: ['depression', 'insomnia', 'digestive-issues'],
    severity: 'moderate',
    icon: 'alert-circle-outline',
    color: '#FF9500',
  },
  {
    id: 'insomnia',
    name: 'Insomnia',
    category: 'mental',
    description: 'Persistent difficulty falling asleep, staying asleep, or waking too early',
    prevalence: '1 in 3 adults',
    keySymptoms: ['Difficulty falling asleep', 'Waking frequently', 'Daytime fatigue', 'Irritability'],
    riskFactors: ['Stress', 'Poor sleep habits', 'Medical conditions', 'Medications'],
    lifestyleImpact: 'Reduces cognitive function and quality of life',
    managementStrategies: ['Sleep hygiene', 'CBT-I', 'Medication', 'Relaxation techniques'],
    relatedConditions: ['depression', 'anxiety', 'chronic-pain'],
    severity: 'moderate',
    icon: 'moon-outline',
    color: '#946BFA',
  },
  {
    id: 'burnout',
    name: 'Burnout Syndrome',
    category: 'mental',
    description: 'Emotional, physical, and mental exhaustion caused by prolonged stress',
    prevalence: '1 in 4 professionals',
    keySymptoms: ['Emotional exhaustion', 'Cynicism', 'Reduced effectiveness', 'Physical fatigue'],
    riskFactors: ['Work stress', 'Perfectionism', 'Lack of control', 'Poor work-life balance'],
    lifestyleImpact: 'Affects career performance and personal relationships',
    managementStrategies: ['Stress management', 'Boundary setting', 'Self-care', 'Professional help'],
    relatedConditions: ['depression', 'anxiety', 'chronic-stress'],
    severity: 'moderate',
    icon: 'flame-outline',
    color: '#FF6B6B',
  },

  // Physical Health Conditions
  {
    id: 'hypertension',
    name: 'High Blood Pressure',
    category: 'physical',
    description: 'Elevated blood pressure that can lead to serious health complications',
    prevalence: '1 in 3 adults',
    keySymptoms: ['Often asymptomatic', 'Headaches', 'Shortness of breath', 'Nosebleeds'],
    riskFactors: ['Age', 'Obesity', 'Sedentary lifestyle', 'High sodium diet'],
    lifestyleImpact: 'Increases risk of heart disease and stroke',
    managementStrategies: ['Diet changes', 'Exercise', 'Stress reduction', 'Medication'],
    relatedConditions: ['heart-disease', 'kidney-disease', 'stroke'],
    severity: 'moderate',
    icon: 'heart-outline',
    color: '#FF4444',
  },
  {
    id: 'diabetes',
    name: 'Type 2 Diabetes',
    category: 'physical',
    description: 'Chronic condition affecting how the body processes blood sugar',
    prevalence: '1 in 10 adults',
    keySymptoms: ['Increased thirst', 'Frequent urination', 'Fatigue', 'Blurred vision'],
    riskFactors: ['Obesity', 'Family history', 'Age', 'Physical inactivity'],
    lifestyleImpact: 'Requires daily monitoring and lifestyle management',
    managementStrategies: ['Diet modification', 'Exercise', 'Blood sugar monitoring', 'Medication'],
    relatedConditions: ['heart-disease', 'kidney-disease', 'nerve-damage'],
    severity: 'moderate',
    icon: 'water-outline',
    color: '#34C759',
  },
  {
    id: 'back-pain',
    name: 'Lower Back Pain',
    category: 'physical',
    description: 'Pain in the lower back that can range from mild to severe',
    prevalence: '8 in 10 adults',
    keySymptoms: ['Aching pain', 'Stiffness', 'Limited movement', 'Radiating pain'],
    riskFactors: ['Poor posture', 'Obesity', 'Sedentary work', 'Heavy lifting'],
    lifestyleImpact: 'Limits mobility and affects daily activities',
    managementStrategies: ['Exercise', 'Physical therapy', 'Ergonomics', 'Pain management'],
    relatedConditions: ['sciatica', 'arthritis', 'obesity'],
    severity: 'moderate',
    icon: 'accessibility-outline',
    color: '#FF9500',
  },
  {
    id: 'arthritis',
    name: 'Arthritis',
    category: 'physical',
    description: 'Inflammation of one or more joints causing pain and stiffness',
    prevalence: '1 in 4 adults',
    keySymptoms: ['Joint pain', 'Stiffness', 'Swelling', 'Reduced range of motion'],
    riskFactors: ['Age', 'Genetics', 'Previous injury', 'Obesity'],
    lifestyleImpact: 'Affects mobility and quality of life',
    managementStrategies: ['Exercise', 'Weight management', 'Medication', 'Physical therapy'],
    relatedConditions: ['obesity', 'osteoporosis', 'heart-disease'],
    severity: 'moderate',
    icon: 'medical-outline',
    color: '#AF52DE',
  },

  // Chronic Conditions
  {
    id: 'asthma',
    name: 'Asthma',
    category: 'chronic',
    description: 'Chronic lung disease that inflames and narrows the airways',
    prevalence: '1 in 12 people',
    keySymptoms: ['Wheezing', 'Shortness of breath', 'Chest tightness', 'Coughing'],
    riskFactors: ['Genetics', 'Allergies', 'Environmental factors', 'Respiratory infections'],
    lifestyleImpact: 'Requires ongoing management and emergency planning',
    managementStrategies: ['Inhalers', 'Trigger avoidance', 'Action plan', 'Regular monitoring'],
    relatedConditions: ['allergies', 'copd', 'acid-reflux'],
    severity: 'moderate',
    icon: 'lungs-outline',
    color: '#4ECDC4',
  },
  {
    id: 'migraines',
    name: 'Migraines',
    category: 'chronic',
    description: 'Severe headaches often accompanied by nausea and light sensitivity',
    prevalence: '1 in 7 adults',
    keySymptoms: ['Severe headache', 'Nausea', 'Light sensitivity', 'Visual disturbances'],
    riskFactors: ['Genetics', 'Hormonal changes', 'Stress', 'Certain foods'],
    lifestyleImpact: 'Disrupts work and social activities',
    managementStrategies: ['Medication', 'Trigger identification', 'Stress management', 'Sleep routine'],
    relatedConditions: ['depression', 'anxiety', 'sleep-disorders'],
    severity: 'moderate',
    icon: 'thunderstorm-outline',
    color: '#946BFA',
  },
  {
    id: 'fibromyalgia',
    name: 'Fibromyalgia',
    category: 'chronic',
    description: 'Widespread musculoskeletal pain accompanied by fatigue and sleep issues',
    prevalence: '2-4% of adults',
    keySymptoms: ['Widespread pain', 'Fatigue', 'Sleep problems', 'Cognitive difficulties'],
    riskFactors: ['Genetics', 'Infections', 'Physical trauma', 'Gender (more common in women)'],
    lifestyleImpact: 'Significantly impacts daily functioning and quality of life',
    managementStrategies: ['Exercise', 'Stress reduction', 'Sleep hygiene', 'Medication'],
    relatedConditions: ['depression', 'anxiety', 'chronic-fatigue'],
    severity: 'moderate',
    icon: 'body-outline',
    color: '#FF6B6B',
  },

  // Preventive Health
  {
    id: 'obesity',
    name: 'Obesity',
    category: 'preventive',
    description: 'Excess body fat that increases risk of health problems',
    prevalence: '1 in 3 adults',
    keySymptoms: ['Excess weight', 'Breathlessness', 'Joint pain', 'Fatigue'],
    riskFactors: ['Diet', 'Physical inactivity', 'Genetics', 'Medical conditions'],
    lifestyleImpact: 'Affects mobility and increases disease risk',
    managementStrategies: ['Diet changes', 'Exercise', 'Behavior therapy', 'Medical intervention'],
    relatedConditions: ['diabetes', 'heart-disease', 'arthritis'],
    severity: 'moderate',
    icon: 'scale-outline',
    color: '#FF9500',
  },
  {
    id: 'high-cholesterol',
    name: 'High Cholesterol',
    category: 'preventive',
    description: 'Elevated levels of cholesterol in the blood',
    prevalence: '1 in 3 adults',
    keySymptoms: ['Usually asymptomatic', 'Xanthomas (rare)', 'Chest pain (complication)'],
    riskFactors: ['Diet', 'Genetics', 'Obesity', 'Lack of exercise'],
    lifestyleImpact: 'Increases cardiovascular disease risk',
    managementStrategies: ['Diet modification', 'Exercise', 'Weight management', 'Medication'],
    relatedConditions: ['heart-disease', 'stroke', 'hypertension'],
    severity: 'moderate',
    icon: 'water-outline',
    color: '#34C759',
  },

  // Women's Health
  {
    id: 'menopause',
    name: 'Menopause',
    category: 'womens',
    description: 'Natural decline in reproductive hormones in women',
    prevalence: 'All women experience',
    keySymptoms: ['Hot flashes', 'Mood changes', 'Sleep problems', 'Vaginal dryness'],
    riskFactors: ['Age', 'Smoking', 'Surgery', 'Chemotherapy'],
    lifestyleImpact: 'Affects quality of life and long-term health',
    managementStrategies: ['Hormone therapy', 'Lifestyle changes', 'Alternative therapies', 'Support'],
    relatedConditions: ['osteoporosis', 'heart-disease', 'depression'],
    severity: 'mild',
    icon: 'flower-outline',
    color: '#AF52DE',
  },
  {
    id: 'pcos',
    name: 'PCOS',
    category: 'womens',
    description: 'Hormonal disorder causing enlarged ovaries with small cysts',
    prevalence: '1 in 10 women',
    keySymptoms: ['Irregular periods', 'Excess hair growth', 'Acne', 'Weight gain'],
    riskFactors: ['Genetics', 'Insulin resistance', 'Inflammation'],
    lifestyleImpact: 'Affects fertility and metabolic health',
    managementStrategies: ['Lifestyle changes', 'Medication', 'Fertility treatments', 'Weight management'],
    relatedConditions: ['diabetes', 'infertility', 'endometrial-cancer'],
    severity: 'moderate',
    icon: 'woman-outline',
    color: '#FF6B6B',
  },

  // Men's Health
  {
    id: 'prostate-health',
    name: 'Prostate Health',
    category: 'mens',
    description: 'Conditions affecting the prostate gland',
    prevalence: '1 in 8 men develop prostate cancer',
    keySymptoms: ['Urinary issues', 'Pain', 'Sexual dysfunction', 'Blood in urine'],
    riskFactors: ['Age', 'Family history', 'Race', 'Obesity'],
    lifestyleImpact: 'Affects urinary function and quality of life',
    managementStrategies: ['Regular screening', 'Diet', 'Exercise', 'Medical treatment'],
    relatedConditions: ['prostate-cancer', 'bph', 'prostatitis'],
    severity: 'moderate',
    icon: 'male-outline',
    color: '#4ECDC4',
  },
];

export const CONDITION_CATEGORIES = [
  { id: 'mental', name: 'Mental Health', icon: 'brain-outline', color: '#5B6CFF' },
  { id: 'physical', name: 'Physical Health', icon: 'fitness-outline', color: '#34C759' },
  { id: 'chronic', name: 'Chronic Conditions', icon: 'time-outline', color: '#FF9500' },
  { id: 'preventive', name: 'Preventive Health', icon: 'shield-checkmark-outline', color: '#AF52DE' },
  { id: 'womens', name: "Women's Health", icon: 'woman-outline', color: '#FF6B6B' },
  { id: 'mens', name: "Men's Health", icon: 'male-outline', color: '#4ECDC4' },
];
