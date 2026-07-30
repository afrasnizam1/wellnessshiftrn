// src/services/habitService.ts
import firestore from '@react-native-firebase/firestore';
import { appConfig } from '../config/appConfig';
import { logFirestoreListenerError } from './firestoreHelpers';

export type HabitFrequency = 'daily' | 'weekly';

export interface Habit {
  id: string;
  userId: string;
  title: string;
  emoji?: string;
  frequency: HabitFrequency;
  streak: number;
  longestStreak: number;
  lastCompletedAt?: string;
  completions: string[]; // ISO dates
  createdAt: string;
  updatedAt: string;
}

const COLLECTION = 'habits';

function serialiseHabit(doc: any): Habit {
  const data = doc.data() ?? {};
  return {
    id: doc.id,
    userId: data.userId ?? '',
    title: data.title ?? '',
    emoji: data.emoji,
    frequency: data.frequency ?? 'daily',
    streak: data.streak ?? 0,
    longestStreak: data.longestStreak ?? 0,
    lastCompletedAt: data.lastCompletedAt,
    completions: data.completions ?? [],
    createdAt: data.createdAt ?? new Date().toISOString(),
    updatedAt: data.updatedAt ?? new Date().toISOString(),
  } as Habit;
}

function today(): string {
  return new Date().toISOString().split('T')[0];
}

export const habitService = {
  fetchHabits: async (uid: string): Promise<Habit[]> => {
    if (!appConfig.isFirebaseConfigured) return [];
    const snap = await firestore()
      .collection('users')
      .doc(uid)
      .collection(COLLECTION)
      .orderBy('createdAt', 'desc')
      .get();
    return snap.docs.map((d) => serialiseHabit(d));
  },

  watchHabits: (uid: string, callback: (habits: Habit[]) => void) => {
    if (!appConfig.isFirebaseConfigured) return () => {};
    return firestore()
      .collection('users')
      .doc(uid)
      .collection(COLLECTION)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (snap) => {
          callback(snap.docs.map((d) => serialiseHabit(d)));
        },
        (error) => logFirestoreListenerError('watchHabits', error)
      );
  },

  createHabit: async (uid: string, habit: Omit<Habit, 'id' | 'userId' | 'streak' | 'longestStreak' | 'completions' | 'createdAt' | 'updatedAt'>): Promise<Habit> => {
    if (!appConfig.isFirebaseConfigured) {
      const now = new Date().toISOString();
      return {
        ...habit,
        id: `local_${Date.now()}`,
        userId: uid,
        streak: 0,
        longestStreak: 0,
        completions: [],
        createdAt: now,
        updatedAt: now,
      };
    }
    const now = new Date().toISOString();
    const ref = firestore().collection('users').doc(uid).collection(COLLECTION).doc();
    const payload = {
      ...habit,
      userId: uid,
      streak: 0,
      longestStreak: 0,
      completions: [],
      createdAt: now,
      updatedAt: now,
    };
    await ref.set(payload);
    return { id: ref.id, ...payload };
  },

  toggleCompletion: async (uid: string, habitId: string): Promise<void> => {
    if (!appConfig.isFirebaseConfigured) return;
    const habitRef = firestore().collection('users').doc(uid).collection(COLLECTION).doc(habitId);
    const snap = await habitRef.get();
    const data = snap.data() as Habit | undefined;
    if (!data) return;

    const date = today();
    const completions = data.completions ?? [];
    const isCompleted = completions.includes(date);
    let newCompletions: string[];
    let streak = data.streak ?? 0;
    let longestStreak = data.longestStreak ?? 0;

    if (isCompleted) {
      newCompletions = completions.filter((d) => d !== date);
      streak = Math.max(0, streak - 1);
    } else {
      newCompletions = [...completions, date];
      streak += 1;
      if (streak > longestStreak) longestStreak = streak;
    }

    await habitRef.update({
      completions: newCompletions,
      streak,
      longestStreak,
      lastCompletedAt: isCompleted ? data.lastCompletedAt ?? null : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  },

  deleteHabit: async (uid: string, habitId: string): Promise<void> => {
    if (!appConfig.isFirebaseConfigured) return;
    await firestore().collection('users').doc(uid).collection(COLLECTION).doc(habitId).delete();
  },
};
