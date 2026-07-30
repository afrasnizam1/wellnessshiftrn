import firestore from '@react-native-firebase/firestore';
import { appConfig } from '../config/appConfig';
import { onboardingStorage } from './onboardingStorage';
import { startUserTrialNative, FS } from './firestoreSchema';
import type { SubscriptionTier } from '../types';

const TRIAL_DAYS = 14;

/**
 * In-app complimentary preview for free-tier users (Firestore / local).
 * This is NOT an App Store / Play introductory offer — do not market it as a store free trial.
 */

export const COMPLIMENTARY_PREVIEW_DAYS = TRIAL_DAYS;

export type TrialStatus = {
  isActive: boolean;
  daysRemaining: number;
  progressPercent: number;
};

async function loadTrialFromFirestore(uid: string): Promise<{ start: Date; end: Date } | null> {
  try {
    const doc = await firestore().collection(FS.userTrials).doc(uid).get();
    if (!doc.exists) return null;
    const data = doc.data();
    const start = data?.startDate?.toDate?.() as Date | undefined;
    const end = data?.endDate?.toDate?.() as Date | undefined;
    if (!start || !end) return null;
    return { start, end };
  } catch {
    return null;
  }
}

export const freeTrialService = {
  async getStatus(uid: string, tier: SubscriptionTier): Promise<TrialStatus> {
    if (tier !== 'free' || appConfig.enableDevSubscriptionBypass) {
      return { isActive: false, daysRemaining: 0, progressPercent: 100 };
    }

    let startIso = await onboardingStorage.startTrialIfNeeded(uid);
    let start = new Date(startIso);

    const remote = await loadTrialFromFirestore(uid);
    if (remote) {
      start = remote.start;
    } else {
      await startUserTrialNative(uid).catch(() => {});
    }

    // Always use the current preview length from start (14 days), even if an
    // older Firestore endDate was written when the preview was 7 days.
    const end = new Date(start);
    end.setDate(end.getDate() + TRIAL_DAYS);

    const now = new Date();
    if (now > end) {
      return { isActive: false, daysRemaining: 0, progressPercent: 100 };
    }

    const totalMs = end.getTime() - start.getTime();
    const elapsedMs = now.getTime() - start.getTime();
    const daysRemaining = Math.max(0, Math.ceil((end.getTime() - now.getTime()) / 86400000));
    const progressPercent = Math.min(100, Math.round((elapsedMs / totalMs) * 100));

    return { isActive: true, daysRemaining, progressPercent };
  },
};
