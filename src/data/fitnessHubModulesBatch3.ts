// Additional Fitness Hub modules — batch 3 (iOS parity expansion)
import { Colors } from '../theme';
import type { FitnessModule } from '../types';

function edu(
  id: string,
  title: string,
  subtitle: string,
  icon: string,
  tags: string[],
  wellnessCategory: FitnessModule['wellnessCategory'] = 'physical',
  isPremium = false,
  domain = 'Health Education',
): FitnessModule {
  return {
    id,
    title,
    subtitle,
    category: 'education',
    icon,
    color: Colors.physical,
    isPremium,
    wellnessCategory,
    exploreTags: tags,
    domain,
  };
}

export const BATCH3_FITNESS_MODULES: FitnessModule[] = [
  // Autoimmune & chronic
  edu('lupus', 'Lupus', 'Living well with SLE', '🦋', ['Autoimmune', 'Chronic Care'], 'physical', false, 'Autoimmune'),
  edu('rheumatoid-arthritis', 'Rheumatoid Arthritis', 'Joint care and mobility', '🦴', ['Autoimmune', 'Musculoskeletal'], 'physical', false, 'Autoimmune'),
  edu('psoriasis', 'Psoriasis', 'Skin flare management', '🌿', ['Dermatology', 'Autoimmune'], 'physical', false, 'Dermatology'),
  edu('eczema', 'Eczema', 'Atopic dermatitis care', '💧', ['Dermatology'], 'physical', false, 'Dermatology'),
  edu('gout', 'Gout', 'Uric acid and diet', '🦶', ['Metabolic', 'Musculoskeletal'], 'nutrition', false, 'Metabolic'),
  edu('celiac-disease', 'Coeliac Disease', 'Gluten-free living', '🌾', ['Digestive', 'Nutrition'], 'nutrition', false, 'Digestive'),
  edu('osteoporosis', 'Osteoporosis', 'Bone density and falls prevention', '🦴', ['Musculoskeletal'], 'physical', false, 'Musculoskeletal'),
  edu('chronic-fatigue', 'Chronic Fatigue', 'Pacing and energy management', '🔋', ['Chronic Care'], 'mental', false, 'Chronic Care'),

  // Kidney & urinary
  edu('kidney-stones', 'Kidney Stones', 'Prevention and hydration', '💎', ['Kidney', 'Hydration'], 'physical', false, 'Kidney & Urinary'),
  edu('uti-prevention', 'UTI Prevention', 'Bladder health habits', '💧', ['Kidney & Urinary'], 'physical', false, 'Kidney & Urinary'),
  edu('prostate-health', 'Prostate Health', 'Screening and lifestyle', '👨', ["Men's Health"], 'physical', false, "Men's Health"),

  // Liver & metabolic
  edu('fatty-liver', 'Fatty Liver (NAFLD)', 'Diet and weight strategies', '🫀', ['Metabolic', 'Digestive'], 'nutrition', false, 'Metabolic'),
  edu('prediabetes', 'Prediabetes', 'Reversing insulin resistance', '📊', ['Diabetes', 'Metabolic'], 'nutrition', false, 'Metabolic'),

  // Life stages
  edu('pregnancy-wellness', 'Pregnancy Wellness', 'Trimester health basics', '🤰', ['Pregnancy', 'Women\'s Health'], 'physical', false, 'Women\'s Health'),
  edu('postpartum-recovery', 'Postpartum Recovery', 'Rest, nutrition and mood', '👶', ['Pregnancy', 'Women\'s Health'], 'physical', false, 'Women\'s Health'),
  edu('healthy-ageing', 'Healthy Ageing', 'Staying active after 65', '🌅', ['Senior Health'], 'fitness', false, 'Senior Health'),
  edu('balance-falls', 'Balance & Falls', 'Strength and stability', '⚖️', ['Senior Health', 'Fitness'], 'fitness', false, 'Senior Health'),

  // Workplace & lifestyle
  edu('workplace-ergonomics', 'Workplace Ergonomics', 'Desk setup and posture', '💺', ['Occupational Health'], 'physical', false, 'Lifestyle'),
  edu('screen-time', 'Screen Time & Eye Strain', 'Digital wellness habits', '📱', ['Eye Health'], 'mental', false, 'Lifestyle'),
  edu('alcohol-awareness', 'Alcohol Awareness', 'Safer drinking limits', '🍷', ['Lifestyle'], 'physical', false, 'Lifestyle'),
  edu('dental-health', 'Dental Health', 'Oral hygiene and gum care', '🦷', ['Preventive Care'], 'physical', false, 'Preventive Care'),

  // Recovery & environment
  edu('post-surgery-recovery', 'Post-Surgery Recovery', 'Mobility and wound care', '🏥', ['Recovery'], 'physical', false, 'Recovery'),
  edu('heat-exhaustion', 'Heat Exhaustion', 'Hot weather safety', '☀️', ['Environmental Health'], 'physical', false, 'Environmental Health'),
  edu('cold-weather-health', 'Cold Weather Health', 'Staying safe in winter', '❄️', ['Environmental Health'], 'physical', false, 'Environmental Health'),
  edu('seasonal-allergies', 'Seasonal Allergies', 'Pollen and hay fever tips', '🌸', ['Allergies'], 'physical', false, 'Allergies'),
  edu('immune-support', 'Immune Support', 'Evidence-based habits', '🛡️', ['Preventive Care'], 'nutrition', false, 'Preventive Care'),
  edu('wound-healing', 'Wound Healing', 'Nutrition and care basics', '🩹', ['Recovery'], 'physical', false, 'Recovery'),

  // Trackers & tools
  {
    id: 'posture-analyzer-tool',
    title: 'Posture Analyzer',
    subtitle: 'Assess desk and standing posture',
    category: 'calculators',
    icon: '🧍',
    color: Colors.fitness,
    isPremium: false,
    wellnessCategory: 'fitness',
    exploreTags: ['Assessments', 'Occupational Health'],
    domain: 'Assessments',
  },
  {
    id: 'blood-pressure-log',
    title: 'Blood Pressure Log',
    subtitle: 'Track readings over time',
    category: 'trackers',
    icon: '📋',
    color: '#E74C3C',
    isPremium: false,
    wellnessCategory: 'physical',
    exploreTags: ['Blood Pressure', 'Health Tracking'],
    domain: 'Health Tracking',
  },
];
