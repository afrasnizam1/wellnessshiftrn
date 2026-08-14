import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDays, differenceInCalendarDays, format, parseISO, subDays } from 'date-fns';

export type FlowLevel = 'none' | 'spotting' | 'light' | 'medium' | 'heavy';

export const CYCLE_SYMPTOMS = [
  'Cramps',
  'Headache',
  'Bloating',
  'Fatigue',
  'Low mood',
  'Anxiety',
  'Backache',
  'Nausea',
  'Breast tenderness',
  'Acne',
  'Food cravings',
  'Better energy',
] as const;

export type CycleSymptom = (typeof CYCLE_SYMPTOMS)[number];

export type CycleDayLog = {
  date: string;
  flow?: FlowLevel;
  symptoms: string[];
  notes?: string;
};

export type CycleProfile = {
  cycleLength: number;
  periodLength: number;
  lastPeriodStart: string | null;
  history: string[];
  logs: Record<string, CycleDayLog>;
};

export type CyclePhaseName = 'Menstrual' | 'Follicular' | 'Ovulation' | 'Luteal';

export type CycleSnapshot = {
  profile: CycleProfile;
  dayOfCycle: number | null;
  phase: { name: CyclePhaseName; color: string; tip: string } | null;
  nextPeriod: Date | null;
  fertileStart: Date | null;
  fertileEnd: Date | null;
};

const LEGACY_KEY = (uid: string) => `menstrual_cycle_data_${uid}`;
const KEY = (uid: string) => `menstrual_cycle_v2_${uid}`;

const DEFAULT_PROFILE: CycleProfile = {
  cycleLength: 28,
  periodLength: 5,
  lastPeriodStart: null,
  history: [],
  logs: {},
};

export const CYCLE_PHASES: Record<CyclePhaseName, { color: string; tip: string }> = {
  Menstrual: {
    color: '#E74C3C',
    tip: 'Rest, hydrate, and use gentle movement if it eases cramps. Iron-rich meals can help.',
  },
  Follicular: {
    color: '#3498DB',
    tip: 'Energy often rises — a good window for strength training and trying new workouts.',
  },
  Ovulation: {
    color: '#27AE60',
    tip: 'Peak energy and typical fertility window. Prioritise protein and recovery.',
  },
  Luteal: {
    color: '#9B59B6',
    tip: 'Protect sleep, keep caffeine modest, and choose magnesium-rich foods if PMS hits.',
  },
};

function todayKey(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

function toDayKey(iso: string): string {
  try {
    return format(parseISO(iso), 'yyyy-MM-dd');
  } catch {
    return iso.slice(0, 10);
  }
}

export function shouldShowWomensHealth(gender?: string | null): boolean {
  return !gender || gender === 'female';
}

function phaseForDay(day: number, cycleLength: number): CyclePhaseName {
  const length = Math.max(21, Math.min(45, cycleLength));
  const menstrualEnd = Math.max(3, Math.round((5 / 28) * length));
  const ovulation = Math.round(length / 2);
  const ovulStart = Math.max(menstrualEnd + 1, ovulation - 1);
  const ovulEnd = Math.min(length, ovulation + 1);
  if (day <= menstrualEnd) return 'Menstrual';
  if (day < ovulStart) return 'Follicular';
  if (day <= ovulEnd) return 'Ovulation';
  return 'Luteal';
}

export function buildSnapshot(profile: CycleProfile, at = new Date()): CycleSnapshot {
  if (!profile.lastPeriodStart) {
    return {
      profile,
      dayOfCycle: null,
      phase: null,
      nextPeriod: null,
      fertileStart: null,
      fertileEnd: null,
    };
  }
  const start = parseISO(toDayKey(profile.lastPeriodStart) + 'T12:00:00');
  const length = Math.max(21, Math.min(45, profile.cycleLength || 28));
  const elapsed = differenceInCalendarDays(at, start);
  const dayOfCycle = ((elapsed % length) + length) % length + 1;
  const name = phaseForDay(dayOfCycle, length);
  const meta = CYCLE_PHASES[name];
  const ovulation = Math.round(length / 2);
  const nextPeriod = addDays(start, length);
  return {
    profile,
    dayOfCycle,
    phase: { name, color: meta.color, tip: meta.tip },
    nextPeriod,
    fertileStart: addDays(start, Math.max(1, ovulation - 2)),
    fertileEnd: addDays(start, ovulation + 1),
  };
}

async function readRaw(uid: string): Promise<CycleProfile> {
  const raw = await AsyncStorage.getItem(KEY(uid));
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as CycleProfile;
      return {
        ...DEFAULT_PROFILE,
        ...parsed,
        history: parsed.history ?? [],
        logs: parsed.logs ?? {},
      };
    } catch {
      /* fall through */
    }
  }
  const legacy = await AsyncStorage.getItem(LEGACY_KEY(uid));
  if (legacy) {
    try {
      const parsed = JSON.parse(legacy) as { lastPeriodStart?: string; cycleLength?: number };
      const start = parsed.lastPeriodStart ?? null;
      return {
        ...DEFAULT_PROFILE,
        cycleLength: parsed.cycleLength || 28,
        lastPeriodStart: start,
        history: start ? [toDayKey(start)] : [],
      };
    } catch {
      /* ignore */
    }
  }
  return { ...DEFAULT_PROFILE };
}

async function write(uid: string, profile: CycleProfile): Promise<void> {
  await AsyncStorage.setItem(KEY(uid), JSON.stringify(profile));
}

export const cycleTrackingService = {
  getProfile: readRaw,

  getSnapshot: async (uid: string): Promise<CycleSnapshot> => {
    const profile = await readRaw(uid);
    return buildSnapshot(profile);
  },

  saveSettings: async (
    uid: string,
    patch: Partial<Pick<CycleProfile, 'cycleLength' | 'periodLength'>>,
  ): Promise<CycleProfile> => {
    const current = await readRaw(uid);
    const next = {
      ...current,
      cycleLength: Math.max(21, Math.min(45, patch.cycleLength ?? current.cycleLength)),
      periodLength: Math.max(2, Math.min(10, patch.periodLength ?? current.periodLength)),
    };
    await write(uid, next);
    return next;
  },

  logPeriodStart: async (uid: string, when: Date = new Date()): Promise<CycleProfile> => {
    const current = await readRaw(uid);
    const key = format(when, 'yyyy-MM-dd');
    const history = [key, ...current.history.filter((d) => d !== key)].slice(0, 12);
    const next: CycleProfile = {
      ...current,
      lastPeriodStart: `${key}T12:00:00.000Z`,
      history,
    };
    await write(uid, next);
    return next;
  },

  upsertTodayLog: async (
    uid: string,
    patch: Partial<Pick<CycleDayLog, 'flow' | 'symptoms' | 'notes'>>,
  ): Promise<CycleDayLog> => {
    const current = await readRaw(uid);
    const date = todayKey();
    const existing = current.logs[date] ?? { date, symptoms: [] };
    const log: CycleDayLog = {
      ...existing,
      ...patch,
      date,
      symptoms: patch.symptoms ?? existing.symptoms,
    };
    current.logs[date] = log;
    await write(uid, current);
    return log;
  },

  getTodayLog: async (uid: string): Promise<CycleDayLog> => {
    const current = await readRaw(uid);
    const date = todayKey();
    return current.logs[date] ?? { date, symptoms: [] };
  },

  recentLogs: (profile: CycleProfile, limit = 7): CycleDayLog[] => {
    return Object.values(profile.logs)
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .slice(0, limit);
  },

  yesterday: () => subDays(new Date(), 1),
};
