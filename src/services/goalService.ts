// src/services/goalService.ts
import firestore from '@react-native-firebase/firestore';
import { appConfig } from '../config/appConfig';
import { logFirestoreListenerError } from './firestoreHelpers';

export type GoalType = 'daily' | 'weekly' | 'monthly';
export type GoalCategory = 'fitness' | 'nutrition' | 'mindfulness' | 'sleep' | 'social' | 'health';

export interface Goal {
  id: string;
  userId: string;
  title: string;
  description?: string;
  type: GoalType;
  category: GoalCategory;
  target: number;
  unit: string;
  progress: number;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

const COLLECTION = 'goals';

function serialiseGoal(doc: any): Goal {
  const data = doc.data() ?? {};
  return {
    id: doc.id,
    userId: data.userId ?? '',
    title: data.title ?? '',
    description: data.description,
    type: data.type ?? 'daily',
    category: data.category ?? 'health',
    target: data.target ?? 1,
    unit: data.unit ?? '',
    progress: data.progress ?? 0,
    completedAt: data.completedAt,
    createdAt: data.createdAt ?? new Date().toISOString(),
    updatedAt: data.updatedAt ?? new Date().toISOString(),
  } as Goal;
}

export const goalService = {
  fetchGoals: async (uid: string): Promise<Goal[]> => {
    if (!appConfig.isFirebaseConfigured) return [];
    const snap = await firestore()
      .collection('users')
      .doc(uid)
      .collection(COLLECTION)
      .orderBy('createdAt', 'desc')
      .get();
    return snap.docs.map((d) => serialiseGoal(d));
  },

  watchGoals: (uid: string, callback: (goals: Goal[]) => void) => {
    if (!appConfig.isFirebaseConfigured) return () => {};
    return firestore()
      .collection('users')
      .doc(uid)
      .collection(COLLECTION)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (snap) => {
          callback(snap.docs.map((d) => serialiseGoal(d)));
        },
        (error) => logFirestoreListenerError('watchGoals', error)
      );
  },

  createGoal: async (uid: string, goal: Omit<Goal, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'progress'>): Promise<Goal> => {
    if (!appConfig.isFirebaseConfigured) {
      const now = new Date().toISOString();
      return { ...goal, id: `local_${Date.now()}`, userId: uid, progress: 0, createdAt: now, updatedAt: now };
    }
    const now = new Date().toISOString();
    const ref = firestore().collection('users').doc(uid).collection(COLLECTION).doc();
    const payload = {
      ...goal,
      userId: uid,
      progress: 0,
      createdAt: now,
      updatedAt: now,
    };
    await ref.set(payload);
    return { id: ref.id, ...payload };
  },

  updateGoal: async (uid: string, goalId: string, updates: Partial<Goal>): Promise<void> => {
    if (!appConfig.isFirebaseConfigured) return;
    await firestore()
      .collection('users')
      .doc(uid)
      .collection(COLLECTION)
      .doc(goalId)
      .update({ ...updates, updatedAt: new Date().toISOString() });
  },

  updateProgress: async (uid: string, goalId: string, progress: number): Promise<void> => {
    if (!appConfig.isFirebaseConfigured) return;
    const goalRef = firestore().collection('users').doc(uid).collection(COLLECTION).doc(goalId);
    const snap = await goalRef.get();
    const data = snap.data() as Goal | undefined;
    if (!data) return;
    const completedAt = progress >= data.target ? new Date().toISOString() : data.completedAt ?? null;
    await goalRef.update({
      progress,
      completedAt: completedAt ? completedAt : firestore.FieldValue.delete(),
      updatedAt: new Date().toISOString(),
    });
  },

  deleteGoal: async (uid: string, goalId: string): Promise<void> => {
    if (!appConfig.isFirebaseConfigured) return;
    await firestore().collection('users').doc(uid).collection(COLLECTION).doc(goalId).delete();
  },
};
