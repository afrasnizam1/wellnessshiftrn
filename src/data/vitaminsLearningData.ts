export type VitaminScenario = {
  id: string;
  title: string;
  icon: string;
  overview: string;
  suggestions: string[];
  lifestyleTips: string[];
  cautions: string[];
};

export type VitaminDetail = {
  id: string;
  name: string;
  icon: string;
  color: string;
  bestTime: string;
  bestTimeDetails: string;
  dailyDose: string;
  upperLimit?: string;
  foodSources: string[];
  benefits: string[];
  whenUseful: string;
  notes: string;
};

export const VITAMIN_SCENARIOS: VitaminScenario[] = [
  {
    id: 'tired',
    title: 'Tired / Low Energy',
    icon: '😴',
    overview: 'Fatigue can stem from iron, B12, vitamin D, or poor sleep — not always a single deficiency.',
    suggestions: ['Vitamin D if levels are low (common in UK winter)', 'Iron only if tested deficient', 'B12 for plant-based diets'],
    lifestyleTips: ['Prioritise sleep 7–9 hours', 'Eat protein at breakfast', 'Short daylight walks'],
    cautions: ['Do not take high-dose iron without a blood test', 'See GP if fatigue persists >4 weeks'],
  },
  {
    id: 'run_down',
    title: 'Run Down / Stressed',
    icon: '😓',
    overview: 'Chronic stress depletes B vitamins and magnesium. Support recovery before reaching for stimulants.',
    suggestions: ['B-complex with food in the morning', 'Magnesium glycinate in the evening', 'Vitamin C for immune support'],
    lifestyleTips: ['Box breathing 5 minutes daily', 'Reduce caffeine after 2pm', 'Boundary work on workload'],
    cautions: ['Avoid mega-doses of B6 long-term', 'Check interactions if on antidepressants'],
  },
  {
    id: 'sick',
    title: 'Feeling Sick',
    icon: '🤒',
    overview: 'During illness, hydration and rest matter more than supplements. Vitamin C and zinc may modestly support recovery.',
    suggestions: ['Vitamin C 200–500mg with meals', 'Zinc lozenges short-term', 'Vitamin D if deficient'],
    lifestyleTips: ['Fluids and light meals', 'Rest — do not push through workouts', 'Honey for sore throat (adults)'],
    cautions: ['Zinc >40mg/day can cause nausea', 'Seek medical care for high fever or breathing difficulty'],
  },
  {
    id: 'poor_sleep',
    title: 'Poor Sleep',
    icon: '🌙',
    overview: 'Magnesium and melatonin are commonly discussed; sleep hygiene remains first-line.',
    suggestions: ['Magnesium glycinate 1–2 hours before bed', 'Melatonin short-term for jet lag only (low dose)', 'Avoid B vitamins late evening if they energise you'],
    lifestyleTips: ['Fixed wake time', 'Cool, dark bedroom', 'No screens 60 min before bed'],
    cautions: ['Melatonin is not for long-term insomnia without GP advice', 'Rule out sleep apnoea if snoring/gasping'],
  },
  {
    id: 'muscle_recovery',
    title: 'Muscle Recovery',
    icon: '💪',
    overview: 'Protein and sleep drive recovery; vitamin D and magnesium support muscle function.',
    suggestions: ['Vitamin D if deficient', 'Magnesium after evening training', 'Omega-3 for inflammation support'],
    lifestyleTips: ['Protein within 2 hours post-workout', 'Active recovery walks', 'Hydration with electrolytes if sweating heavily'],
    cautions: ['Creatine is separate from vitamins — discuss with GP if kidney issues'],
  },
  {
    id: 'bone_health',
    title: 'Bone Health',
    icon: '🦴',
    overview: 'Calcium and vitamin D work together for bone density, especially after 50 and in menopause.',
    suggestions: ['Vitamin D 10µg (400 IU) daily in UK guidance', 'Calcium from food first; supplement if intake low', 'Vitamin K2 discussed with specialist care'],
    lifestyleTips: ['Weight-bearing exercise', 'Resistance training 2×/week', 'Limit smoking and excess alcohol'],
    cautions: ['Do not exceed 100µg vitamin D without monitoring', 'Kidney stones history — discuss calcium with GP'],
  },
  {
    id: 'hair_nails',
    title: 'Hair & Nail Health',
    icon: '💅',
    overview: 'Biotin is popular but deficiency is rare; iron, zinc, and thyroid issues often underlie brittle hair/nails.',
    suggestions: ['Biotin only if deficient', 'Iron/zinc if blood tests show need', 'Protein adequacy daily'],
    lifestyleTips: ['Gentle hair care', 'Manage stress', 'Balanced diet with variety'],
    cautions: ['High biotin can skew thyroid blood tests — tell your GP before labs'],
  },
];

export const VITAMINS_A_TO_Z: VitaminDetail[] = [
  {
    id: 'vitamin_a', name: 'Vitamin A', icon: '🥕', color: '#E67E22',
    bestTime: 'With a meal containing fat', bestTimeDetails: 'Fat-soluble — absorbs with dietary fats.',
    dailyDose: '700µg RAE (women), 900µg (men)', upperLimit: '3000µg',
    foodSources: ['Sweet potato', 'Carrots', 'Spinach', 'Liver'],
    benefits: ['Vision', 'Immune function', 'Skin health'],
    whenUseful: 'Rare deficiency in balanced diets; supplements usually unnecessary unless advised.',
    notes: 'Avoid high-dose retinol in pregnancy.',
  },
  {
    id: 'vitamin_b12', name: 'Vitamin B12', icon: '💊', color: '#3498DB',
    bestTime: 'Morning with food', bestTimeDetails: 'Can be energising — take earlier in the day.',
    dailyDose: '1.5µg (UK reference)', upperLimit: 'No established UL from food',
    foodSources: ['Meat', 'Fish', 'Eggs', 'Fortified plant milks'],
    benefits: ['Nerve function', 'Red blood cells', 'Energy metabolism'],
    whenUseful: 'Vegans, older adults, or malabsorption — often needs supplement or injection.',
    notes: 'Blood test confirms deficiency before high-dose use.',
  },
  {
    id: 'vitamin_c', name: 'Vitamin C', icon: '🍊', color: '#F39C12',
    bestTime: 'With meals', bestTimeDetails: 'Split doses if taking >500mg to reduce stomach upset.',
    dailyDose: '40mg minimum; 200–500mg supplemental during illness sometimes used',
    upperLimit: '1000mg/day supplemental may cause GI upset',
    foodSources: ['Citrus', 'Peppers', 'Broccoli', 'Strawberries'],
    benefits: ['Collagen synthesis', 'Immune support', 'Iron absorption helper'],
    whenUseful: 'Smokers need higher intake; supplement if diet is very limited in produce.',
    notes: 'Food sources preferred over megadoses.',
  },
  {
    id: 'vitamin_d', name: 'Vitamin D', icon: '☀️', color: '#F1C40F',
    bestTime: 'With largest meal', bestTimeDetails: 'Fat-soluble — take with food containing fat.',
    dailyDose: '10µg (400 IU) Oct–Mar in UK; year-round if little sun exposure',
    upperLimit: '100µg (4000 IU) without medical supervision',
    foodSources: ['Oily fish', 'Egg yolks', 'Fortified cereals', 'Sun exposure'],
    benefits: ['Bone health', 'Immune modulation', 'Muscle function'],
    whenUseful: 'Very common to supplement in UK latitude, especially winter.',
    notes: 'Blood test (25-OH vitamin D) guides dosing if deficient.',
  },
  {
    id: 'vitamin_e', name: 'Vitamin E', icon: '🌻', color: '#27AE60',
    bestTime: 'With food', bestTimeDetails: 'Fat-soluble vitamin.',
    dailyDose: '3–4mg alpha-tocopherol (from diet usually sufficient)',
    upperLimit: 'High supplemental doses may increase bleeding risk',
    foodSources: ['Nuts', 'Seeds', 'Vegetable oils', 'Avocado'],
    benefits: ['Antioxidant', 'Cell membrane protection'],
    whenUseful: 'Deficiency rare; avoid high-dose supplements unless prescribed.',
    notes: 'Can interact with blood thinners.',
  },
  {
    id: 'vitamin_k', name: 'Vitamin K', icon: '🥬', color: '#2ECC71',
    bestTime: 'Consistent daily with food', bestTimeDetails: 'Important for those on warfarin — keep intake stable.',
    dailyDose: 'From leafy greens daily', upperLimit: 'Supplements interact with anticoagulants',
    foodSources: ['Kale', 'Spinach', 'Broccoli', 'Fermented foods'],
    benefits: ['Blood clotting', 'Bone metabolism'],
    whenUseful: 'Supplement rarely needed; stability matters on warfarin.',
    notes: 'Tell your GP about any K supplements.',
  },
];
