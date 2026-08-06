import { carePlanSeenStorage } from './carePlanSeenStorage';
import type { CarePlan } from '../types';

/** Recompute unseen badge from latest plan + local seen ids. */
export async function syncUnseenCarePlan(
  uid: string,
  plan: CarePlan | null | undefined,
  setHasUnseen: (v: boolean) => void,
): Promise<boolean> {
  const unseen = await carePlanSeenStorage.hasUnseenPlan(uid, plan);
  setHasUnseen(unseen);
  return unseen;
}

/** Mark latest plan seen and clear the My Care badge. */
export async function markCarePlanSeen(
  uid: string,
  plan: CarePlan | null | undefined,
  setHasUnseen: (v: boolean) => void,
): Promise<void> {
  await carePlanSeenStorage.markLatestSeen(uid, plan);
  setHasUnseen(false);
}
