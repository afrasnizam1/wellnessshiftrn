import firestore from '@react-native-firebase/firestore';
import { format, startOfDay, subDays, isSameDay, parseISO } from 'date-fns';
import { isFirebaseReady } from './firebaseReady';
import type { DailyCheckIn, MoodLevel } from '../types';

function todayKey() {
  return format(new Date(), 'yyyy-MM-dd');
}

export const checkInService = {
  getTodaysCheckIn: async (uid: string): Promise<DailyCheckIn | null> => {
    if (!isFirebaseReady()) return null;
    const doc = await firestore()
      .collection('users')
      .doc(uid)
      .collection('dailyCheckIns')
      .doc(todayKey())
      .get();
    return doc.exists() ? (doc.data() as DailyCheckIn) : null;
  },

  saveCheckIn: async (
    uid: string,
    data: {
      mood: MoodLevel;
      energy: number;
      stress: number;
      sleep?: number;
      notes?: string;
    }
  ): Promise<DailyCheckIn> => {
    if (!isFirebaseReady()) {
      const now = new Date().toISOString();
      return {
        id: todayKey(),
        date: todayKey(),
        mood: data.mood,
        energy: data.energy,
        stress: data.stress,
        sleep: data.sleep ?? 5,
        notes: data.notes,
        createdAt: now,
        updatedAt: now,
      };
    }
    const now = new Date().toISOString();
    const existing = await checkInService.getTodaysCheckIn(uid);
    const checkIn: DailyCheckIn = {
      id: todayKey(),
      date: todayKey(),
      mood: data.mood,
      energy: data.energy,
      stress: data.stress,
      sleep: data.sleep ?? 5,
      notes: data.notes,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };

    await firestore()
      .collection('users')
      .doc(uid)
      .collection('dailyCheckIns')
      .doc(todayKey())
      .set(checkIn);

    return checkIn;
  },

  getCheckInStreak: async (uid: string, freezes = 0): Promise<number> => {
    if (!isFirebaseReady()) return 0;
    const snap = await firestore()
      .collection('users')
      .doc(uid)
      .collection('dailyCheckIns')
      .orderBy('date', 'desc')
      .limit(30)
      .get();

    const dates = snap.docs.map((d) => parseISO(d.data().date as string));
    let streak = 0;
    let cursor = startOfDay(new Date());
    let remainingFreezes = freezes;

    for (const date of dates) {
      if (isSameDay(date, cursor)) {
        streak += 1;
        cursor = subDays(cursor, 1);
      } else if (remainingFreezes > 0 && isSameDay(date, subDays(cursor, 1))) {
        // Used a freeze to bridge a one-day gap
        remainingFreezes -= 1;
        streak += 1;
        cursor = subDays(cursor, 1);
      } else if (streak > 0) {
        break;
      }
    }

    return streak;
  },

  getStreakStatus: async (uid: string, freezes = 0): Promise<{ current: number; longest: number; frozen: number; broken: boolean }> => {
    if (!isFirebaseReady()) return { current: 0, longest: 0, frozen: 0, broken: false };
    const snap = await firestore()
      .collection('users')
      .doc(uid)
      .collection('dailyCheckIns')
      .orderBy('date', 'desc')
      .limit(60)
      .get();

    const dates = snap.docs.map((d) => parseISO(d.data().date as string));
    const today = startOfDay(new Date());
    const mostRecent = dates[0] ? startOfDay(dates[0]) : today;
    let current = 0;
    let longest = 0;
    let run = 0;
    let frozen = 0;
    let remainingFreezes = freezes;
    let cursor = mostRecent;

    for (const date of dates) {
      if (isSameDay(date, cursor)) {
        run += 1;
        cursor = subDays(cursor, 1);
      } else if (remainingFreezes > 0 && isSameDay(date, subDays(cursor, 1))) {
        remainingFreezes -= 1;
        frozen += 1;
        run += 1;
        cursor = subDays(cursor, 1);
      } else {
        longest = Math.max(longest, run);
        run = 1;
        cursor = startOfDay(date);
      }
    }
    longest = Math.max(longest, run);
    current = run;

    const checkedInToday = dates.some((d) => isSameDay(d, today));
    const broken = !checkedInToday && current === 0 && dates.length > 0;

    return { current, longest, frozen, broken };
  },

  hasCheckedInToday: async (uid: string): Promise<boolean> => {
    const checkIn = await checkInService.getTodaysCheckIn(uid);
    return checkIn != null;
  },

  getRecentCheckInDates: async (uid: string, days = 28): Promise<string[]> => {
    if (!isFirebaseReady()) return [];
    const snap = await firestore()
      .collection('users')
      .doc(uid)
      .collection('dailyCheckIns')
      .orderBy('date', 'desc')
      .limit(days)
      .get();
    return snap.docs.map((d) => d.data().date as string);
  },

  /**
   * Checks if yesterday was missed and a freeze is available. If so, it records a
   * placeholder check-in for yesterday to preserve the streak without decrementing
   * the user's freeze count (freezes are a finite resource, but this initial version
   * treats each freeze as a one-time use that is tracked in the profile elsewhere).
   */
  maybeApplyStreakFreeze: async (uid: string, freezes: number): Promise<{ used: boolean; remaining: number }> => {
    if (!isFirebaseReady() || freezes <= 0) return { used: false, remaining: freezes };
    const today = startOfDay(new Date());
    const yesterday = format(subDays(today, 1), 'yyyy-MM-dd');
    const yesterdayDoc = await firestore()
      .collection('users')
      .doc(uid)
      .collection('dailyCheckIns')
      .doc(yesterday)
      .get();
    if (yesterdayDoc.exists()) return { used: false, remaining: freezes };

    const todayDoc = await firestore().collection('users').doc(uid).collection('dailyCheckIns').doc(format(today, 'yyyy-MM-dd')).get();
    if (todayDoc.exists()) return { used: false, remaining: freezes };

    // Apply freeze by creating a synthetic placeholder for yesterday
    await firestore()
      .collection('users')
      .doc(uid)
      .collection('dailyCheckIns')
      .doc(yesterday)
      .set({
        date: yesterday,
        mood: 'good',
        energy: 5,
        stress: 5,
        sleep: 5,
        notes: 'Streak freeze — day preserved',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isFreeze: true,
      });
    return { used: true, remaining: Math.max(0, freezes - 1) };
  },
};
