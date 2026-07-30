import type {
  WellnessScore,
  DailyPlan,
  DailyTask,
  WellnessCategoryKey,
  CarePlan,
} from '../types';
import { planService } from './firebase';
import { isFirebaseReady } from './firebaseReady';
import { format, startOfDay } from 'date-fns';

interface PlanQuickAction {
  title: string;
  subtitle: string;
  description: string;
  durationMinutes: number;
  linkedModule?: string;
  scoreBoost: number;
}

function whyThisMatters(category: WellnessCategoryKey): string {
  const map: Record<WellnessCategoryKey, string> = {
    sleep: 'Sleep restores memory, hormones, and immune function — tonight\'s habits shape tomorrow\'s energy and mood.',
    stress: 'Brief calming practices lower cortisol and sharpen focus — small daily resets prevent burnout accumulation.',
    fitness: 'Movement today protects muscle, heart health, and mental clarity — even 10 minutes counts toward your weekly target.',
    nutrition: 'What you eat in the next few hours affects blood sugar, concentration, and recovery from yesterday\'s effort.',
    mindfulness: 'Mindful attention rewires stress reactivity over time — this session trains the mental muscle of presence.',
    mental: 'Checking in with your emotional state early helps you respond rather than react throughout the day.',
    physical: 'Your body\'s signals today — energy, pain, vitality — guide smarter choices for long-term health.',
    social: 'Connection is as vital as exercise for longevity — reaching out strengthens resilience and belonging.',
    workLife: 'Clear boundaries protect recovery time — without them, stress from work bleeds into sleep and relationships.',
    environment: 'Your surroundings shape stress and recovery — a brief outdoor or nature break resets attention and mood.',
  };
  return map[category];
}

function getQuickAction(category: WellnessCategoryKey): PlanQuickAction {
  switch (category) {
    case 'stress':
      return {
        title: 'Box breathing reset',
        subtitle: '4-minute nervous system calm',
        description: 'Open Breathing Exercises and complete one box-breathing cycle. Inhale 4s, hold 4s, exhale 4s, hold 4s — repeat 4 times. Notice shoulder tension release.',
        durationMinutes: 5,
        linkedModule: 'Breathing Exercises',
        scoreBoost: 0.3,
      };
    case 'sleep':
      return {
        title: 'Wind-down ritual start',
        subtitle: 'Prepare your brain for sleep',
        description: 'Dim lights, put screens away, and try 4-7-8 breathing (inhale 4, hold 7, exhale 8) for 4 cycles. Log last night in Sleep Debt Calculator.',
        durationMinutes: 8,
        linkedModule: 'Sleep Tools',
        scoreBoost: 0.3,
      };
    case 'fitness':
      return {
        title: 'Movement snack',
        subtitle: '10 minutes of intentional activity',
        description: 'Brisk walk, bodyweight squats, or the Workout Library circuit — raise heart rate slightly and finish with 60s of stretching.',
        durationMinutes: 10,
        linkedModule: 'Fitness Hub',
        scoreBoost: 0.3,
      };
    case 'nutrition':
      return {
        title: 'Protein-forward meal',
        subtitle: 'Stabilise energy for the afternoon',
        description: 'Plan or eat one meal with palm-sized protein, half-plate vegetables, and water before eating. Log awareness in Meal Planner.',
        durationMinutes: 5,
        linkedModule: 'Meal Planner',
        scoreBoost: 0.3,
      };
    case 'mindfulness':
      return {
        title: 'Guided mindfulness sit',
        subtitle: 'Train attention for 5 minutes',
        description: 'Open Meditation Timer, choose Breath Focus, and sit for 5 minutes. Count breaths 1–10; restart when distracted — each return is the practice.',
        durationMinutes: 5,
        linkedModule: 'Meditation Timer',
        scoreBoost: 0.4,
      };
    case 'mental':
      return {
        title: 'Mood & stress check-in',
        subtitle: 'Name it to tame it',
        description: 'Complete Daily Check-In — rate mood, energy, and stress. Naming emotions reduces amygdala reactivity and guides your evening choices.',
        durationMinutes: 3,
        linkedModule: 'Daily Check-In',
        scoreBoost: 0.3,
      };
    case 'physical':
      return {
        title: 'Heart health pulse check',
        subtitle: 'Connect body awareness',
        description: 'Take resting heart rate after 2 minutes seated rest. Note steps today in Activity Dashboard. Walk 10 minutes if below 6,000 steps.',
        durationMinutes: 8,
        linkedModule: 'Fitness Hub',
        scoreBoost: 0.2,
      };
    case 'social':
      return {
        title: 'Meaningful connection',
        subtitle: 'One message, one conversation',
        description: 'Send a voice note or message to someone you value. Quality connection beats quantity — even 2 minutes of genuine check-in counts.',
        durationMinutes: 5,
        scoreBoost: 0.3,
      };
    case 'workLife':
      return {
        title: 'Boundary micro-step',
        subtitle: 'Protect recovery time',
        description: 'Set one boundary today: a meeting end time, a lunch away from desk, or phone-off window. Write it down to increase follow-through.',
        durationMinutes: 3,
        scoreBoost: 0.3,
      };
    case 'environment':
      return {
        title: 'Nature exposure break',
        subtitle: 'Reset attention in 5 minutes',
        description: 'Step outside or open a window. Notice three sounds, three colours, and take five slow breaths. Natural light supports circadian rhythm.',
        durationMinutes: 5,
        scoreBoost: 0.3,
      };
    default:
      return {
        title: 'Wellness micro-action',
        subtitle: 'One small step forward',
        description: 'Pick the lowest-scoring area in your wellness ring and spend 5 minutes on its linked module in Fitness Hub.',
        durationMinutes: 5,
        scoreBoost: 0.2,
      };
  }
}

function clinicianTasksFromCarePlan(carePlan: CarePlan, today: string): DailyTask[] {
  return carePlan.tasks
    .filter((t) => !t.isComplete)
    .slice(0, 2)
    .map((task, index) => ({
      id: `clinician_${carePlan.id}_${task.id}`,
      title: task.title,
      subtitle: 'From your care plan',
      description: task.description,
      durationMinutes: 10,
      category: 'physical' as WellnessCategoryKey,
      whyThisMatters: 'Your clinician recommended this as part of your care plan.',
      isFromClinicianPlan: true,
      status: 'pending' as const,
      scoreBoost: 0.4,
    }));
}

function primaryGoalToCategory(goal?: string): WellnessCategoryKey | null {
  const map: Record<string, WellnessCategoryKey> = {
    sleep: 'sleep',
    stress: 'stress',
    fitness: 'fitness',
    nutrition: 'nutrition',
    mental: 'mental',
    habits: 'mindfulness',
    condition: 'physical',
    clinician: 'physical',
    general: 'physical',
  };
  return goal ? map[goal] ?? null : null;
}

export function generateDailyPlan(
  wellnessScore: WellnessScore,
  carePlan?: CarePlan | null,
  primaryGoal?: string,
  options?: {
    experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
    trainingDaysPerWeek?: number;
  },
): DailyPlan {
  const today = format(new Date(), 'yyyy-MM-dd');
  const sortedCategories = Object.entries(wellnessScore.categories)
    .sort(([, a], [, b]) => a - b)
    .map(([key]) => key as WellnessCategoryKey);

  const epoch = startOfDay(new Date(0));
  const todayStart = startOfDay(new Date());
  const daysSinceEpoch = Math.floor(
    (todayStart.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24)
  );

  let selectedCategories: WellnessCategoryKey[] = [];

  const goalCategory = primaryGoalToCategory(primaryGoal);

  if (sortedCategories.length <= 3) {
    selectedCategories = [...sortedCategories];
  } else {
    const startIndex = daysSinceEpoch % sortedCategories.length;
    let index = startIndex;
    while (selectedCategories.length < 3) {
      const category = sortedCategories[index % sortedCategories.length];
      if (!selectedCategories.includes(category)) {
        selectedCategories.push(category);
      }
      index += 1;
      if (index - startIndex >= sortedCategories.length) break;
    }

    const lowest = sortedCategories[0];
    if (lowest && !selectedCategories.includes(lowest)) {
      if (selectedCategories.length >= 3) {
        selectedCategories[2] = lowest;
      } else {
        selectedCategories.push(lowest);
      }
    }
  }

  // Ensure the user's primary goal is represented in today's plan
  if (goalCategory && !selectedCategories.includes(goalCategory)) {
    if (selectedCategories.length >= 3) {
      selectedCategories[2] = goalCategory;
    } else {
      selectedCategories.push(goalCategory);
    }
  }

  const dailyTasks: DailyTask[] = selectedCategories.map((category, index) => {
    const action = getQuickAction(category);
    const durationScale =
      options?.experienceLevel === 'beginner' ? 0.75
        : options?.experienceLevel === 'advanced' ? 1.15
          : 1;
    return {
      id: `daily_plan_${category}_${today}_${index}`,
      title: action.title,
      subtitle: action.subtitle,
      description: action.description,
      durationMinutes: Math.max(2, Math.round(action.durationMinutes * durationScale)),
      category,
      ...(action.linkedModule ? { linkedModule: action.linkedModule } : {}),
      whyThisMatters: whyThisMatters(category),
      isFromClinicianPlan: false,
      status: 'pending',
      scoreBoost: action.scoreBoost,
    };
  });

  const clinicianTasks = carePlan ? clinicianTasksFromCarePlan(carePlan, today) : [];
  let tasks: DailyTask[] = [];

  if (clinicianTasks.length > 0) {
    const remainingSlots = Math.max(0, 3 - clinicianTasks.length);
    const clinicianCategories = new Set(clinicianTasks.map((t) => t.category));
    const filteredDaily = dailyTasks.filter((t) => !clinicianCategories.has(t.category));
    tasks = [...clinicianTasks.slice(0, 3), ...filteredDaily.slice(0, remainingSlots)];
  } else {
    tasks = dailyTasks;
  }

  const seenTitles = new Set<string>();
  const uniqueTasks = tasks.filter((task) => {
    if (seenTitles.has(task.title)) return false;
    seenTitles.add(task.title);
    return true;
  });

  const taskLimit =
    options?.experienceLevel === 'beginner' ? 2
      : options?.trainingDaysPerWeek && options.trainingDaysPerWeek <= 3 ? 2
        : 3;

  return {
    date: today,
    tasks: uniqueTasks.slice(0, taskLimit),
    completedCount: 0,
    gymVisitToday: null,
  };
}

export async function getOrGeneratePlan(
  uid: string,
  wellnessScore: WellnessScore,
  carePlan?: CarePlan | null,
  primaryGoal?: string,
  options?: {
    experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
    trainingDaysPerWeek?: number;
  },
): Promise<DailyPlan> {
  const today = format(new Date(), 'yyyy-MM-dd');
  try {
    const existing = await planService.getDailyPlan(uid, today);
    if (existing) return existing;
  } catch {}

  const plan = generateDailyPlan(wellnessScore, carePlan, primaryGoal, options);
  if (isFirebaseReady()) {
    await planService.saveDailyPlan(uid, plan);
  }
  return plan;
}
