import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CarePlan } from '../types';

const KEY = 'seenCarePlanIds';

function storageKey(uid: string): string {
  return `${KEY}:${uid}`;
}

async function getSeenIds(uid: string): Promise<Set<string>> {
  try {
    const raw = await AsyncStorage.getItem(storageKey(uid));
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as string[];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

async function saveSeenIds(uid: string, ids: Set<string>): Promise<void> {
  const list = [...ids].slice(-50);
  await AsyncStorage.setItem(storageKey(uid), JSON.stringify(list));
}

export const carePlanSeenStorage = {
  getSeenIds,

  hasUnseenPlan: async (uid: string, plan: CarePlan | null | undefined): Promise<boolean> => {
    if (!plan?.id) return false;
    const seen = await getSeenIds(uid);
    return !seen.has(plan.id);
  },

  markPlanSeen: async (uid: string, planId: string): Promise<void> => {
    if (!planId) return;
    const seen = await getSeenIds(uid);
    if (seen.has(planId)) return;
    seen.add(planId);
    await saveSeenIds(uid, seen);
  },

  markLatestSeen: async (uid: string, plan: CarePlan | null | undefined): Promise<void> => {
    if (!plan?.id) return;
    await carePlanSeenStorage.markPlanSeen(uid, plan.id);
  },
};
