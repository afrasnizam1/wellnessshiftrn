import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

export type FoodMacros = {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fibreG?: number;
  magnesiumMg?: number;
  potassiumMg?: number;
  calciumMg?: number;
  ironMg?: number;
  vitaminDUg?: number;
};

export type FoodLogEntry = {
  id: string;
  imageUri: string;
  label: string;
  confidence: number;
  macros: FoodMacros;
  notes?: string;
  createdAt: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
};

export type MacroShare = {
  key: 'fat' | 'carbs' | 'protein';
  label: string;
  grams: number;
  percent: number;
  color: string;
};

export type MicroProgress = {
  id: string;
  label: string;
  amount: number;
  target: number;
  unit: string;
  percent: number;
  remainingLabel: string;
  overTarget: boolean;
};

export type NutritionReport = {
  macros: FoodMacros;
  macroShares: MacroShare[];
  netEnergyKcal: number;
  activeBurnKcal: number;
  calorieTarget: number;
  micros: MicroProgress[];
  title: string;
  subtitle?: string;
};

type FoodTemplate = {
  keys: string[];
  label: string;
  macros: FoodMacros;
};

const MACRO_COLORS = {
  fat: '#8DBAFE',
  carbs: '#FFAA47',
  protein: '#FF85B3',
} as const;

export const DAILY_NUTRIENT_TARGETS = {
  calories: 2000,
  fibreG: 30,
  magnesiumMg: 400,
  potassiumMg: 3400,
  calciumMg: 1000,
  ironMg: 18,
  vitaminDUg: 20,
} as const;

const FOOD_TEMPLATES: FoodTemplate[] = [
  {
    keys: ['salad', 'greens', 'caesar'],
    label: 'Mixed salad bowl',
    macros: {
      calories: 320, proteinG: 12, carbsG: 28, fatG: 18, fibreG: 7,
      magnesiumMg: 65, potassiumMg: 520, calciumMg: 90, ironMg: 2.2, vitaminDUg: 0.4,
    },
  },
  {
    keys: ['chicken', 'grill', 'breast'],
    label: 'Grilled chicken plate',
    macros: {
      calories: 480, proteinG: 42, carbsG: 35, fatG: 14, fibreG: 4,
      magnesiumMg: 55, potassiumMg: 680, calciumMg: 70, ironMg: 1.8, vitaminDUg: 0.2,
    },
  },
  {
    keys: ['salmon', 'fish', 'tuna'],
    label: 'Salmon with sides',
    macros: {
      calories: 520, proteinG: 38, carbsG: 22, fatG: 28, fibreG: 3,
      magnesiumMg: 50, potassiumMg: 740, calciumMg: 40, ironMg: 1.1, vitaminDUg: 11,
    },
  },
  {
    keys: ['oatmeal', 'porridge', 'oats'],
    label: 'Oatmeal bowl',
    macros: {
      calories: 350, proteinG: 12, carbsG: 54, fatG: 9, fibreG: 8,
      magnesiumMg: 90, potassiumMg: 310, calciumMg: 180, ironMg: 2.5, vitaminDUg: 0.1,
    },
  },
  {
    keys: ['egg', 'omelette', 'breakfast'],
    label: 'Eggs & toast',
    macros: {
      calories: 390, proteinG: 22, carbsG: 28, fatG: 20, fibreG: 3,
      magnesiumMg: 30, potassiumMg: 250, calciumMg: 140, ironMg: 2.0, vitaminDUg: 2.2,
    },
  },
  {
    keys: ['pasta', 'spaghetti', 'noodle'],
    label: 'Pasta dish',
    macros: {
      calories: 620, proteinG: 22, carbsG: 78, fatG: 22, fibreG: 5,
      magnesiumMg: 60, potassiumMg: 380, calciumMg: 120, ironMg: 2.8, vitaminDUg: 0.3,
    },
  },
  {
    keys: ['rice', 'bowl', 'poke', 'burrito'],
    label: 'Rice bowl',
    macros: {
      calories: 580, proteinG: 28, carbsG: 70, fatG: 18, fibreG: 6,
      magnesiumMg: 70, potassiumMg: 620, calciumMg: 110, ironMg: 3.0, vitaminDUg: 0.5,
    },
  },
  {
    keys: ['burger', 'fries', 'fast'],
    label: 'Burger meal',
    macros: {
      calories: 780, proteinG: 32, carbsG: 68, fatG: 40, fibreG: 4,
      magnesiumMg: 45, potassiumMg: 700, calciumMg: 160, ironMg: 4.2, vitaminDUg: 0.4,
    },
  },
  {
    keys: ['pizza', 'slice'],
    label: 'Pizza (2 slices)',
    macros: {
      calories: 560, proteinG: 24, carbsG: 62, fatG: 24, fibreG: 3,
      magnesiumMg: 40, potassiumMg: 320, calciumMg: 280, ironMg: 2.4, vitaminDUg: 0.3,
    },
  },
  {
    keys: ['smoothie', 'shake', 'protein'],
    label: 'Protein smoothie',
    macros: {
      calories: 310, proteinG: 28, carbsG: 32, fatG: 8, fibreG: 5,
      magnesiumMg: 80, potassiumMg: 540, calciumMg: 320, ironMg: 1.5, vitaminDUg: 1.5,
    },
  },
  {
    keys: ['yogurt', 'yoghurt', 'fruit'],
    label: 'Yogurt & fruit',
    macros: {
      calories: 240, proteinG: 16, carbsG: 30, fatG: 6, fibreG: 3,
      magnesiumMg: 35, potassiumMg: 420, calciumMg: 280, ironMg: 0.6, vitaminDUg: 1.2,
    },
  },
  {
    keys: ['steak', 'beef', 'meat'],
    label: 'Steak dinner',
    macros: {
      calories: 640, proteinG: 48, carbsG: 24, fatG: 36, fibreG: 3,
      magnesiumMg: 48, potassiumMg: 700, calciumMg: 35, ironMg: 5.5, vitaminDUg: 0.8,
    },
  },
  {
    keys: ['sandwich', 'wrap', 'panini'],
    label: 'Sandwich / wrap',
    macros: {
      calories: 450, proteinG: 24, carbsG: 42, fatG: 18, fibreG: 4,
      magnesiumMg: 50, potassiumMg: 400, calciumMg: 180, ironMg: 2.6, vitaminDUg: 0.4,
    },
  },
  {
    keys: ['soup', 'broth', 'stew'],
    label: 'Hearty soup',
    macros: {
      calories: 280, proteinG: 14, carbsG: 32, fatG: 10, fibreG: 6,
      magnesiumMg: 45, potassiumMg: 580, calciumMg: 80, ironMg: 2.0, vitaminDUg: 0.2,
    },
  },
  {
    keys: ['avocado', 'toast'],
    label: 'Avocado toast',
    macros: {
      calories: 360, proteinG: 10, carbsG: 34, fatG: 22, fibreG: 8,
      magnesiumMg: 55, potassiumMg: 620, calciumMg: 50, ironMg: 1.4, vitaminDUg: 0.1,
    },
  },
];

const DEFAULT_MEAL: FoodTemplate = {
  keys: [],
  label: 'Balanced mixed meal',
  macros: {
    calories: 450, proteinG: 24, carbsG: 42, fatG: 18, fibreG: 5,
    magnesiumMg: 55, potassiumMg: 480, calciumMg: 140, ironMg: 2.2, vitaminDUg: 0.8,
  },
};

function storageKey(uid: string) {
  return `food_log_v1_${uid}`;
}

function guessMealType(date = new Date()): FoodLogEntry['mealType'] {
  const h = date.getHours();
  if (h < 11) return 'breakfast';
  if (h < 15) return 'lunch';
  if (h < 20) return 'dinner';
  return 'snack';
}

function scaleMacros(base: FoodMacros, jitter: number): FoodMacros {
  const scale = (n?: number) => (n == null ? undefined : Math.round(n * jitter * 10) / 10);
  return {
    calories: Math.round(base.calories * jitter),
    proteinG: Math.round(base.proteinG * jitter),
    carbsG: Math.round(base.carbsG * jitter),
    fatG: Math.round(base.fatG * jitter),
    fibreG: base.fibreG != null ? Math.round(base.fibreG * jitter) : undefined,
    magnesiumMg: scale(base.magnesiumMg),
    potassiumMg: scale(base.potassiumMg),
    calciumMg: scale(base.calciumMg),
    ironMg: scale(base.ironMg),
    vitaminDUg: scale(base.vitaminDUg),
  };
}

/**
 * On-device meal estimate from optional description + photo context.
 * Swappable later for a true vision model / Cloud Function.
 */
export function analyseFoodPhoto(input: {
  imageUri: string;
  description?: string;
}): Omit<FoodLogEntry, 'id' | 'createdAt'> {
  const text = (input.description ?? '').toLowerCase().trim();
  let match = DEFAULT_MEAL;
  let confidence = text ? 0.55 : 0.42;

  if (text) {
    for (const template of FOOD_TEMPLATES) {
      if (template.keys.some((k) => text.includes(k))) {
        match = template;
        confidence = 0.78;
        break;
      }
    }
  }

  const jitter = 0.92 + Math.random() * 0.16;
  const macros = scaleMacros(match.macros, jitter);

  return {
    imageUri: input.imageUri,
    label: text
      ? match === DEFAULT_MEAL
        ? text.slice(0, 48)
        : match.label
      : match.label,
    confidence: Math.round(confidence * 100) / 100,
    macros,
    notes: text || undefined,
    mealType: guessMealType(),
  };
}

export type DailyNutritionSummary = {
  entries: FoodLogEntry[];
  totals: FoodMacros;
  nutritionScore: number;
  qualityLabel: string;
  report: NutritionReport;
};

function emptyMacros(): FoodMacros {
  return {
    calories: 0,
    proteinG: 0,
    carbsG: 0,
    fatG: 0,
    fibreG: 0,
    magnesiumMg: 0,
    potassiumMg: 0,
    calciumMg: 0,
    ironMg: 0,
    vitaminDUg: 0,
  };
}

function addMacros(a: FoodMacros, b: FoodMacros): FoodMacros {
  return {
    calories: a.calories + b.calories,
    proteinG: a.proteinG + b.proteinG,
    carbsG: a.carbsG + b.carbsG,
    fatG: a.fatG + b.fatG,
    fibreG: (a.fibreG ?? 0) + (b.fibreG ?? 0),
    magnesiumMg: (a.magnesiumMg ?? 0) + (b.magnesiumMg ?? 0),
    potassiumMg: (a.potassiumMg ?? 0) + (b.potassiumMg ?? 0),
    calciumMg: (a.calciumMg ?? 0) + (b.calciumMg ?? 0),
    ironMg: (a.ironMg ?? 0) + (b.ironMg ?? 0),
    vitaminDUg: (a.vitaminDUg ?? 0) + (b.vitaminDUg ?? 0),
  };
}

function macroShares(macros: FoodMacros): MacroShare[] {
  const fatCal = macros.fatG * 9;
  const carbCal = macros.carbsG * 4;
  const proteinCal = macros.proteinG * 4;
  const total = fatCal + carbCal + proteinCal;
  const pct = (part: number) => (total <= 0 ? 0 : Math.round((part / total) * 100));

  // Keep visual balance similar to Bevel (percentages of calorie share).
  let fat = pct(fatCal);
  let carbs = pct(carbCal);
  let protein = pct(proteinCal);
  const sum = fat + carbs + protein;
  if (sum !== 100 && sum > 0) {
    const diff = 100 - sum;
    // Adjust the largest bucket so labels sum to 100.
    if (carbs >= fat && carbs >= protein) carbs += diff;
    else if (fat >= protein) fat += diff;
    else protein += diff;
  }

  return [
    { key: 'fat', label: 'Fat', grams: macros.fatG, percent: fat, color: MACRO_COLORS.fat },
    { key: 'carbs', label: 'Carbs', grams: macros.carbsG, percent: carbs, color: MACRO_COLORS.carbs },
    { key: 'protein', label: 'Protein', grams: macros.proteinG, percent: protein, color: MACRO_COLORS.protein },
  ];
}

function microRow(
  id: string,
  label: string,
  amount: number,
  target: number,
  unit: string,
): MicroProgress {
  const percent = target <= 0 ? 0 : Math.min(150, Math.round((amount / target) * 100));
  const remaining = target - amount;
  const overTarget = remaining < 0;
  const abs = Math.abs(Math.round(remaining * 10) / 10);
  const remainingLabel = overTarget
    ? `${abs} ${unit} over`
    : `${abs} ${unit} left`;
  return { id, label, amount, target, unit, percent, remainingLabel, overTarget };
}

export function buildNutritionReport(
  macros: FoodMacros,
  options: {
    title?: string;
    subtitle?: string;
    activeBurnKcal?: number;
    calorieTarget?: number;
  } = {},
): NutritionReport {
  const calorieTarget = options.calorieTarget ?? DAILY_NUTRIENT_TARGETS.calories;
  const activeBurnKcal = Math.max(0, Math.round(options.activeBurnKcal ?? 0));
  // Net = intake − (target − active burn credit), simplified as intake − target + burn.
  const netEnergyKcal = Math.round(macros.calories - calorieTarget + activeBurnKcal);

  return {
    macros,
    macroShares: macroShares(macros),
    netEnergyKcal,
    activeBurnKcal,
    calorieTarget,
    micros: [
      microRow('fiber', 'Fiber', macros.fibreG ?? 0, DAILY_NUTRIENT_TARGETS.fibreG, 'g'),
      microRow('magnesium', 'Magnesium', macros.magnesiumMg ?? 0, DAILY_NUTRIENT_TARGETS.magnesiumMg, 'mg'),
      microRow('potassium', 'Potassium', macros.potassiumMg ?? 0, DAILY_NUTRIENT_TARGETS.potassiumMg, 'mg'),
      microRow('calcium', 'Calcium', macros.calciumMg ?? 0, DAILY_NUTRIENT_TARGETS.calciumMg, 'mg'),
      microRow('iron', 'Iron', macros.ironMg ?? 0, DAILY_NUTRIENT_TARGETS.ironMg, 'mg'),
      microRow('vitaminD', 'Vitamin D', macros.vitaminDUg ?? 0, DAILY_NUTRIENT_TARGETS.vitaminDUg, 'µg'),
    ],
    title: options.title ?? 'Nutritional Details',
    subtitle: options.subtitle,
  };
}

/** Score day's nutrition 0–10 from logged macros (protein + calorie balance). */
export function scoreDailyNutrition(totals: FoodMacros, mealCount: number): {
  nutritionScore: number;
  qualityLabel: string;
} {
  if (mealCount === 0) {
    return { nutritionScore: 0, qualityLabel: 'No meals logged' };
  }

  let score = 5.5;
  const cal = totals.calories;
  const protein = totals.proteinG;

  if (cal >= 1400 && cal <= 2600) score += 1.2;
  else if (cal >= 1100 && cal <= 3000) score += 0.4;
  else if (cal > 3200 || cal < 900) score -= 1.2;

  if (protein >= 70) score += 1.4;
  else if (protein >= 45) score += 0.7;
  else if (protein < 25) score -= 0.8;

  const fatRatio = cal > 0 ? (totals.fatG * 9) / cal : 0;
  if (fatRatio > 0.45) score -= 0.6;
  if ((totals.fibreG ?? 0) >= 20) score += 0.5;

  if (mealCount >= 2) score += 0.4;

  const nutritionScore = Math.max(1, Math.min(10, Math.round(score * 10) / 10));
  let qualityLabel = 'Fair balance';
  if (nutritionScore >= 8) qualityLabel = 'Strong macros day';
  else if (nutritionScore >= 6.5) qualityLabel = 'Solid nutrition';
  else if (nutritionScore < 4.5) qualityLabel = 'Needs better balance';

  return { nutritionScore, qualityLabel };
}

export const foodLogService = {
  list: async (uid: string): Promise<FoodLogEntry[]> => {
    try {
      const raw = await AsyncStorage.getItem(storageKey(uid));
      if (!raw) return [];
      const parsed = JSON.parse(raw) as FoodLogEntry[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  listToday: async (uid: string, today = new Date()): Promise<FoodLogEntry[]> => {
    const day = format(today, 'yyyy-MM-dd');
    const all = await foodLogService.list(uid);
    return all.filter((e) => e.createdAt.slice(0, 10) === day);
  },

  getTodaySummary: async (
    uid: string,
    activeBurnKcal = 0,
  ): Promise<DailyNutritionSummary> => {
    const entries = await foodLogService.listToday(uid);
    const totals = entries.reduce((acc, e) => addMacros(acc, e.macros), emptyMacros());
    const { nutritionScore, qualityLabel } = scoreDailyNutrition(totals, entries.length);
    const report = buildNutritionReport(totals, {
      title: 'Nutritional Details',
      subtitle: entries.length
        ? `${entries.length} meal${entries.length === 1 ? '' : 's'} logged today`
        : undefined,
      activeBurnKcal,
      calorieTarget: DAILY_NUTRIENT_TARGETS.calories,
    });
    return { entries, totals, nutritionScore, qualityLabel, report };
  },

  add: async (uid: string, draft: Omit<FoodLogEntry, 'id' | 'createdAt'>): Promise<FoodLogEntry> => {
    const entry: FoodLogEntry = {
      ...draft,
      id: `food_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
    };
    const all = await foodLogService.list(uid);
    const next = [entry, ...all].slice(0, 200);
    await AsyncStorage.setItem(storageKey(uid), JSON.stringify(next));
    return entry;
  },

  remove: async (uid: string, id: string): Promise<void> => {
    const all = await foodLogService.list(uid);
    await AsyncStorage.setItem(
      storageKey(uid),
      JSON.stringify(all.filter((e) => e.id !== id)),
    );
  },
};
