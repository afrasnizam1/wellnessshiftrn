import { Colors } from '../theme';

export type OrganSection = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  topicId: string;
  nutrients: string[];
  tips: string[];
};

export const ORGAN_SECTIONS: OrganSection[] = [
  {
    id: 'heart',
    title: 'Heart & Circulation',
    subtitle: 'Cardiovascular health and blood pressure',
    icon: 'heart-outline',
    color: '#E74C3C',
    topicId: 'heart-health',
    nutrients: ['Omega-3 fatty acids', 'Potassium', 'Magnesium', 'Fibre'],
    tips: ['150 min moderate activity weekly', 'Limit added salt', 'Track blood pressure'],
  },
  {
    id: 'brain',
    title: 'Brain & Cognition',
    subtitle: 'Focus, memory, and mental clarity',
    icon: 'bulb-outline',
    color: '#946BFA',
    topicId: 'mental-health',
    nutrients: ['B vitamins', 'Omega-3 DHA', 'Antioxidants', 'Hydration'],
    tips: ['Sleep 7–9 hours', 'Brain games in Fitness Hub', 'Manage stress with breathing'],
  },
  {
    id: 'gut',
    title: 'Gut & Digestion',
    subtitle: 'Microbiome and digestive wellness',
    icon: 'nutrition-outline',
    color: '#27AE60',
    topicId: 'gut-health',
    nutrients: ['Fibre (30g/day target)', 'Fermented foods', 'Prebiotic vegetables'],
    tips: ['Eat diverse plants', 'Chew slowly', 'See GP for persistent symptoms'],
  },
  {
    id: 'liver',
    title: 'Liver & Metabolism',
    subtitle: 'Energy processing and detox support',
    icon: 'leaf-outline',
    color: '#F39C12',
    topicId: 'nutrition-basics',
    nutrients: ['Protein', 'Choline', 'Cruciferous vegetables', 'Limited alcohol'],
    tips: ['Maintain healthy weight', 'Limit ultra-processed foods'],
  },
  {
    id: 'kidney',
    title: 'Kidneys & Hydration',
    subtitle: 'Fluid balance and filtration',
    icon: 'water-outline',
    color: '#3498DB',
    topicId: 'hydration',
    nutrients: ['Adequate water intake', 'Moderate sodium', 'Potassium-rich foods if appropriate'],
    tips: ['Use Hydration Calculator in Fitness Hub', 'Monitor urine colour'],
  },
  {
    id: 'muscle',
    title: 'Muscles & Bones',
    subtitle: 'Strength, bone density, and mobility',
    icon: 'barbell-outline',
    color: Colors.physical,
    topicId: 'protein-recovery',
    nutrients: ['Protein', 'Calcium', 'Vitamin D', 'Collagen-supporting foods'],
    tips: ['Resistance training 2–3×/week', 'Stretching routines in Fitness Hub'],
  },
];
