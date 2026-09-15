import { Screen } from '../navigation/screenNames';
import type { IoniconName } from '../theme/icons';
import type { PrimaryGoal } from './onboardingGoals';

export type BoostDestination =
  | { tab?: never; screen: string }
  | { tab: string; screen: string }
  | null;

export type DailyWellnessBoost = {
  id: string;
  icon: IoniconName;
  title: string;
  subtitle: string;
  destination: BoostDestination;
  when?: 'morning' | 'day' | 'evening' | 'any';
};

const WALK: DailyWellnessBoost = {
  id: 'walk',
  icon: 'walk-outline',
  title: 'Go for a 10-minute walk',
  subtitle: 'Around the block is enough — just start',
  destination: { screen: Screen.stepsDetail },
  when: 'any',
};

const GYM: DailyWellnessBoost = {
  id: 'gym',
  icon: 'barbell-outline',
  title: 'Do a short gym or home session',
  subtitle: '20 minutes of strength or a class you like',
  destination: { tab: Screen.tabFitness, screen: Screen.workoutHub },
  when: 'day',
};

const FRIEND: DailyWellnessBoost = {
  id: 'friend',
  icon: 'call-outline',
  title: 'Call or message a friend',
  subtitle: 'A real check-in beats scrolling',
  destination: { tab: Screen.tabMore, screen: Screen.socialHub },
  when: 'any',
};

const BREATHE: DailyWellnessBoost = {
  id: 'breathe',
  icon: 'leaf-outline',
  title: 'Take five slow breaths',
  subtitle: 'In for 4, out for 6 — reset your nervous system',
  destination: { tab: Screen.tabFitness, screen: Screen.breathingExercise },
  when: 'any',
};

const WATER: DailyWellnessBoost = {
  id: 'water',
  icon: 'water-outline',
  title: 'Drink a full glass of water',
  subtitle: 'Do it now, then keep a bottle nearby',
  destination: null,
  when: 'any',
};

const OUTSIDE: DailyWellnessBoost = {
  id: 'outside',
  icon: 'sunny-outline',
  title: 'Step outside for 5 minutes',
  subtitle: 'Daylight and fresh air lift energy and mood',
  destination: null,
  when: 'day',
};

const STRETCH: DailyWellnessBoost = {
  id: 'stretch',
  icon: 'body-outline',
  title: 'Stretch for 5 minutes',
  subtitle: 'Neck, hips, and shoulders — especially if you sit a lot',
  destination: null,
  when: 'any',
};

const PROTEIN: DailyWellnessBoost = {
  id: 'protein',
  icon: 'nutrition-outline',
  title: 'Have a protein-rich meal or snack',
  subtitle: 'Eggs, yoghurt, beans, fish, or a simple high-protein plate',
  destination: { tab: Screen.tabFitness, screen: Screen.highProteinMeals },
  when: 'day',
};

const SLEEP: DailyWellnessBoost = {
  id: 'sleep',
  icon: 'moon-outline',
  title: 'Start winding down 20 minutes earlier',
  subtitle: 'Dim lights, park the phone, prepare for sleep',
  destination: { tab: Screen.tabFitness, screen: Screen.meditationTimer },
  when: 'evening',
};

const CHECKIN: DailyWellnessBoost = {
  id: 'checkin',
  icon: 'heart-outline',
  title: 'Log how you feel today',
  subtitle: 'A 30-second check-in keeps your plan honest',
  destination: { screen: Screen.dailyCheckIn },
  when: 'any',
};

const SQUATS: DailyWellnessBoost = {
  id: 'squats',
  icon: 'fitness-outline',
  title: 'Do 10 bodyweight squats',
  subtitle: 'No kit needed — stand up and do them now',
  destination: null,
  when: 'day',
};

const PHONE_OFF: DailyWellnessBoost = {
  id: 'phone',
  icon: 'phone-portrait-outline',
  title: 'Put your phone down for 10 minutes',
  subtitle: 'A short break from the feed is a real wellness win',
  destination: null,
  when: 'evening',
};

const POOLS: Record<PrimaryGoal, DailyWellnessBoost[]> = {
  sleep: [SLEEP, PHONE_OFF, BREATHE, WALK, WATER, STRETCH],
  stress: [BREATHE, WALK, OUTSIDE, FRIEND, PHONE_OFF, STRETCH],
  fitness: [WALK, GYM, SQUATS, STRETCH, WATER, OUTSIDE],
  lose_weight: [WALK, WATER, PROTEIN, GYM, OUTSIDE, CHECKIN],
  gain_weight: [PROTEIN, GYM, WALK, WATER, CHECKIN],
  maintain_weight: [WALK, PROTEIN, WATER, STRETCH, CHECKIN],
  build_muscle: [GYM, PROTEIN, SQUATS, WATER, STRETCH],
  nutrition: [PROTEIN, WATER, WALK, CHECKIN, OUTSIDE],
  mental: [FRIEND, BREATHE, OUTSIDE, WALK, PHONE_OFF, CHECKIN],
  habits: [CHECKIN, WATER, WALK, STRETCH, FRIEND],
  condition: [CHECKIN, WALK, WATER, BREATHE, STRETCH],
  clinician: [],
  general: [WALK, FRIEND, GYM, BREATHE, WATER, OUTSIDE, STRETCH, PROTEIN, SQUATS, CHECKIN, PHONE_OFF, SLEEP],
};

function dayIndex(seed: string, length: number): number {
  let n = 0;
  for (let i = 0; i < seed.length; i += 1) n = (n + seed.charCodeAt(i) * (i + 1)) % 997;
  return length ? n % length : 0;
}

function slotForHour(hour: number): DailyWellnessBoost['when'] {
  if (hour < 11) return 'morning';
  if (hour >= 18) return 'evening';
  return 'day';
}

export function getDailyWellnessBoost(goal: PrimaryGoal, at = new Date()): DailyWellnessBoost {
  const pool = POOLS[goal]?.length ? POOLS[goal] : POOLS.general;
  const slot = slotForHour(at.getHours());
  const timed = pool.filter((b) => !b.when || b.when === 'any' || b.when === slot);
  const list = timed.length ? timed : pool;
  const key = `${at.getFullYear()}-${at.getMonth()}-${at.getDate()}-${goal}`;
  return list[dayIndex(key, list.length)];
}
