export type MealSlot = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type MealOption = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  tags: string[];
  prepMinutes?: number;
  prepSteps?: string[];
};

export const MEAL_SLOTS: { key: MealSlot; label: string; icon: string; targetShare: number }[] = [
  { key: 'breakfast', label: 'Breakfast', icon: '🌅', targetShare: 0.25 },
  { key: 'lunch', label: 'Lunch', icon: '☀️', targetShare: 0.35 },
  { key: 'dinner', label: 'Dinner', icon: '🌙', targetShare: 0.30 },
  { key: 'snack', label: 'Snack', icon: '🍎', targetShare: 0.10 },
];

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
export type DayKey = typeof DAYS[number];

export const MEAL_OPTIONS: Record<MealSlot, MealOption[]> = {
  breakfast: [
    { id: 'oats-berries', name: 'Oats with berries & honey', calories: 320, protein: 12, tags: ['Vegetarian', 'High fibre'], prepMinutes: 8, prepSteps: ['Simmer 50g oats in 200ml milk or water 4–5 min', 'Top with handful of berries and drizzle of honey', 'Add cinnamon or flaxseed for extra fibre'] },
    { id: 'eggs-toast', name: 'Scrambled eggs on wholegrain toast', calories: 380, protein: 22, tags: ['High protein'], prepMinutes: 10, prepSteps: ['Whisk 2–3 eggs with pinch of salt and pepper', 'Cook on low heat, stirring gently until softly set', 'Serve on 2 slices wholegrain toast'] },
    { id: 'greek-yogurt', name: 'Greek yogurt, granola & banana', calories: 350, protein: 18, tags: ['Vegetarian', 'High protein'], prepMinutes: 3, prepSteps: ['Spoon 200g Greek yogurt into a bowl', 'Add 30g granola and sliced banana', 'Optional: drizzle honey or add berries'] },
    { id: 'smoothie-bowl', name: 'Protein smoothie bowl', calories: 400, protein: 25, tags: ['Vegetarian', 'High protein'], prepMinutes: 7, prepSteps: ['Blend frozen banana, berries, protein powder, and splash of milk', 'Pour into bowl — thicker than a drinkable smoothie', 'Top with granola, seeds, and extra fruit'] },
    { id: 'avocado-toast', name: 'Avocado toast with poached egg', calories: 420, protein: 16, tags: ['Balanced'], prepMinutes: 12, prepSteps: ['Toast sourdough or wholegrain bread', 'Mash half avocado with lemon, salt, and chilli flakes', 'Poach or fry one egg; place on top'] },
    { id: 'overnight-oats', name: 'Overnight oats with chia', calories: 310, protein: 14, tags: ['Vegetarian', 'Meal prep'], prepMinutes: 5, prepSteps: ['Mix oats, chia, milk, and yogurt in a jar', 'Refrigerate overnight (or minimum 4 hours)', 'Stir and top with fruit before eating'] },
  ],
  lunch: [
    { id: 'chicken-salad', name: 'Grilled chicken salad', calories: 450, protein: 38, tags: ['High protein', 'Low carb'], prepMinutes: 15, prepSteps: ['Season chicken breast; grill or pan-fry 6–7 min per side', 'Toss mixed leaves, cucumber, tomato, and olive oil dressing', 'Slice chicken and serve on salad'] },
    { id: 'salmon-rice', name: 'Salmon, rice & roasted veg', calories: 520, protein: 32, tags: ['Omega-3', 'Balanced'], prepMinutes: 25, prepSteps: ['Roast broccoli and peppers at 200°C for 20 min', 'Cook brown rice per packet instructions', 'Bake salmon fillet 12–15 min; serve together'] },
    { id: 'lentil-soup', name: 'Lentil soup with wholegrain bread', calories: 400, protein: 18, tags: ['Vegetarian', 'High fibre'], prepMinutes: 30, prepSteps: ['Sauté onion, carrot, and celery; add red lentils and stock', 'Simmer 20 min until lentils break down', 'Serve with wholegrain bread and lemon wedge'] },
    { id: 'turkey-wrap', name: 'Turkey & hummus wholewheat wrap', calories: 480, protein: 28, tags: ['High protein'], prepMinutes: 8, prepSteps: ['Spread hummus on wholewheat wrap', 'Layer sliced turkey, lettuce, tomato, and cucumber', 'Roll tightly and slice in half'] },
    { id: 'tofu-stirfry', name: 'Tofu vegetable stir-fry & noodles', calories: 460, protein: 20, tags: ['Vegetarian'], prepMinutes: 18, prepSteps: ['Press and cube firm tofu; pan-fry until golden', 'Stir-fry mixed veg with garlic and ginger', 'Add cooked noodles and low-sodium soy sauce'] },
    { id: 'bean-burrito-bowl', name: 'Black bean burrito bowl', calories: 490, protein: 22, tags: ['Vegetarian', 'High fibre'], prepMinutes: 15, prepSteps: ['Warm black beans with cumin and paprika', 'Base of rice or quinoa in a bowl', 'Top with beans, corn, salsa, avocado, and lime'] },
  ],
  dinner: [
    { id: 'chicken-veg', name: 'Roast chicken with seasonal vegetables', calories: 500, protein: 40, tags: ['High protein'], prepMinutes: 45, prepSteps: ['Season chicken thighs or breast with herbs', 'Roast at 190°C with chopped seasonal veg for 35–40 min', 'Rest 5 min before serving'] },
    { id: 'fish-traybake', name: 'White fish traybake with potatoes', calories: 480, protein: 30, tags: ['Balanced'], prepMinutes: 35, prepSteps: ['Parboil baby potatoes 10 min', 'Arrange potatoes, fish, cherry tomatoes, and olives on tray', 'Bake 20 min with lemon and olive oil'] },
    { id: 'prawn-pasta', name: 'Prawn tomato wholewheat pasta', calories: 520, protein: 28, tags: ['Balanced'], prepMinutes: 20, prepSteps: ['Cook wholewheat pasta al dente', 'Sauté garlic, prawns, and cherry tomatoes', 'Toss pasta with sauce and fresh basil'] },
    { id: 'chickpea-curry', name: 'Chickpea spinach curry & brown rice', calories: 470, protein: 16, tags: ['Vegetarian'], prepMinutes: 25, prepSteps: ['Sauté onion; add curry spices, chickpeas, and coconut milk', 'Simmer 15 min; stir in spinach at the end', 'Serve over brown rice'] },
    { id: 'beef-stirfry', name: 'Lean beef stir-fry with veg', calories: 510, protein: 35, tags: ['High protein'], prepMinutes: 18, prepSteps: ['Slice lean beef thinly against the grain', 'High-heat wok: beef first, then vegetables', 'Finish with ginger, garlic, and reduced-sodium sauce'] },
    { id: 'mushroom-risotto', name: 'Mushroom & pea risotto', calories: 440, protein: 12, tags: ['Vegetarian'], prepMinutes: 30, prepSteps: ['Toast arborio rice with onion in olive oil', 'Add stock ladle by ladle, stirring until creamy', 'Fold in sautéed mushrooms and peas; finish with parmesan'] },
  ],
  snack: [
    { id: 'apple-nut', name: 'Apple with almond butter', calories: 180, protein: 4, tags: ['Vegetarian'], prepMinutes: 2, prepSteps: ['Slice one medium apple', 'Serve with 1 tbsp almond butter for dipping'] },
    { id: 'protein-shake', name: 'Protein shake', calories: 150, protein: 25, tags: ['High protein'], prepMinutes: 3, prepSteps: ['Add 1 scoop protein powder to shaker', 'Pour 250ml water or milk', 'Shake 20 seconds until smooth'] },
    { id: 'hummus-veg', name: 'Hummus with carrot sticks', calories: 160, protein: 6, tags: ['Vegetarian'], prepMinutes: 3, prepSteps: ['Cut carrots into sticks', 'Portion 3 tbsp hummus', 'Optional: add cucumber or pepper strips'] },
    { id: 'rice-cakes', name: 'Rice cakes with cottage cheese', calories: 140, protein: 10, tags: ['High protein'], prepMinutes: 2, prepSteps: ['Spread cottage cheese on 2 rice cakes', 'Top with black pepper or tomato slices'] },
    { id: 'trail-mix', name: 'Unsalted trail mix', calories: 200, protein: 6, tags: ['Vegetarian'], prepMinutes: 1, prepSteps: ['Portion 30g unsalted nuts and dried fruit', 'Pre-bag for the week to avoid overeating'] },
    { id: 'yogurt', name: 'Natural yogurt & berries', calories: 120, protein: 8, tags: ['Vegetarian'], prepMinutes: 2, prepSteps: ['Spoon 150g natural yogurt into bowl', 'Top with fresh or frozen berries'] },
  ],
};

export type WeekPlan = Record<DayKey, Record<MealSlot, string>>;

export function emptyWeekPlan(): WeekPlan {
  return DAYS.reduce((week, day) => {
    week[day] = {
      breakfast: MEAL_OPTIONS.breakfast[0].id,
      lunch: MEAL_OPTIONS.lunch[0].id,
      dinner: MEAL_OPTIONS.dinner[0].id,
      snack: MEAL_OPTIONS.snack[0].id,
    };
    return week;
  }, {} as WeekPlan);
}

export function getMealById(slot: MealSlot, id: string): MealOption | undefined {
  return MEAL_OPTIONS[slot].find((m) => m.id === id);
}

export function dayCalories(plan: WeekPlan, day: DayKey): number {
  return MEAL_SLOTS.reduce((sum, slot) => {
    const meal = getMealById(slot.key, plan[day][slot.key]);
    return sum + (meal?.calories ?? 0);
  }, 0);
}

export function dayProtein(plan: WeekPlan, day: DayKey): number {
  return MEAL_SLOTS.reduce((sum, slot) => {
    const meal = getMealById(slot.key, plan[day][slot.key]);
    return sum + (meal?.protein ?? 0);
  }, 0);
}

/** Pick meals closest to per-slot calorie targets for a balanced day */
function pickForDay(targetCalories: number, dayIndex: number): Record<MealSlot, string> {
  const result = {} as Record<MealSlot, string>;
  for (const slot of MEAL_SLOTS) {
    const target = targetCalories * slot.targetShare;
    const options = MEAL_OPTIONS[slot.key];
    const pick = options[dayIndex % options.length];
    const closest = options.reduce((best, opt) => {
      const bestDiff = Math.abs((getMealById(slot.key, best)?.calories ?? 0) - target);
      const optDiff = Math.abs(opt.calories - target);
      return optDiff < bestDiff ? opt.id : best;
    }, pick.id);
    result[slot.key] = closest;
  }
  return result;
}

export function generateBalancedWeek(targetCalories: number): WeekPlan {
  return DAYS.reduce((week, day, index) => {
    week[day] = pickForDay(targetCalories, index);
    return week;
  }, {} as WeekPlan);
}
