export type NutritionBasicItem = {
  id: string;
  title: string;
  icon: string;
  imageUrl: string;
  detail: string;
};

export const NUTRITION_FOUNDATIONS: NutritionBasicItem[] = [
  {
    id: 'protein',
    title: 'Prioritise protein',
    icon: '🥩',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=85&auto=format&fit=crop',
    detail: 'Aim for 20–30g protein per meal to support muscle, satiety, and stable blood sugar. Sources: eggs, fish, legumes, Greek yogurt, tofu.',
  },
  {
    id: 'fiber',
    title: 'Add fibre',
    icon: '🌾',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=85&auto=format&fit=crop',
    detail: 'Target 30g fibre daily from vegetables, whole grains, beans, and fruit. Increase gradually and drink water to avoid bloating.',
  },
  {
    id: 'hydrate',
    title: 'Hydrate',
    icon: '💧',
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=85&auto=format&fit=crop',
    detail: 'Most adults need 1.5–2L fluids daily. Thirst, urine colour, and activity level guide intake. Use the Hydration Calculator in Fitness Hub.',
  },
  {
    id: 'carbs',
    title: 'Balance carbs around training',
    icon: '🍚',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=85&auto=format&fit=crop',
    detail: 'Carbohydrates fuel workouts and recovery. Prioritise whole grains and timed carbs around exercise rather than eliminating them.',
  },
  {
    id: 'sleep',
    title: 'Sleep multiplier',
    icon: '😴',
    imageUrl: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=600&q=85&auto=format&fit=crop',
    detail: 'Poor sleep increases hunger hormones and reduces willpower for healthy choices. Nutrition works best with 7–9 hours of sleep.',
  },
  {
    id: 'fats',
    title: 'Healthy fats',
    icon: '🥑',
    imageUrl: 'https://images.unsplash.com/photo-1560155016-bd4879ae8f21?w=600&q=85&auto=format&fit=crop',
    detail: 'Include olive oil, nuts, seeds, and oily fish. Fats support hormones, vitamin absorption, and long-lasting energy.',
  },
  {
    id: 'mindful',
    title: 'Eat mindfully',
    icon: '🧘',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=85&auto=format&fit=crop',
    detail: 'Slow down, chew well, and notice hunger/fullness cues. Mindful eating reduces overeating without strict rules.',
  },
  {
    id: 'omega3',
    title: 'Omega-3',
    icon: '🐟',
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=85&auto=format&fit=crop',
    detail: 'Two portions of oily fish weekly (salmon, mackerel, sardines) support heart and brain health. Algae oil for plant-based diets.',
  },
];

export const SUPPLEMENT_TIMING = [
  { title: 'With food', body: 'Fat-soluble vitamins (A, D, E, K) and most minerals absorb better with meals.' },
  { title: 'Avoid empty stomach', body: 'Iron, zinc, and some B vitamins can cause nausea on an empty stomach.' },
  { title: 'Morning', body: 'B vitamins and iron often suit morning — can be energising.' },
  { title: 'Evening', body: 'Magnesium and some herbal supports may suit pre-bed (check labels).' },
];

export const NUTRITION_HABITS = [
  { title: 'Balance plate', body: 'Half vegetables, quarter protein, quarter whole grains — adjust portions for your goals.' },
  { title: 'Meal timing', body: 'Regular meals prevent extreme hunger. Pre/post workout nutrition supports performance.' },
  { title: 'Mindful eating', body: 'Phone away, sit down, taste your food — improves satisfaction with less overeating.' },
];
