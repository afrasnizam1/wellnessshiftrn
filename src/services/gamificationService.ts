import firestore from '@react-native-firebase/firestore';
import { checkInService } from './checkInService';
import { userService, wellnessService } from './firebase';
import { isFirebaseReady, NOOP_UNSUB } from './firebaseReady';
import { logFirestoreListenerError } from './firestoreHelpers';
import type { AchievementDefinition, GamificationStats, UserAchievement } from '../types';

export const ACHIEVEMENT_DEFINITIONS: AchievementDefinition[] = [
  { id: 'first_steps', icon: '🌟', title: 'First Steps', description: 'Complete your first daily task' },
  { id: 'streak_7', icon: '🔥', title: '7-Day Streak', description: 'Check in 7 days in a row' },
  { id: 'mind_matters', icon: '🧠', title: 'Mind Matters', description: 'Complete 10 mindfulness sessions' },
  { id: 'fitness_fanatic', icon: '💪', title: 'Fitness Fanatic', description: 'Log 20 workouts or gym visits' },
  { id: 'ai_explorer', icon: '🤖', title: 'AI Explorer', description: 'Have 50 AI coach conversations' },
  { id: 'score_climber', icon: '📊', title: 'Score Climber', description: 'Improve your wellness score by 2 points' },
  { id: 'care_connected', icon: '🩺', title: 'Care Connected', description: 'Link with a clinician' },
  { id: 'wellness_champion', icon: '🏆', title: 'Wellness Champion', description: 'Achieve a score of 8.0 or above' },
];

type StatKey = keyof GamificationStats;

const STATS_REF = (uid: string) =>
  firestore().collection('users').doc(uid).collection('stats').doc('gamification');

const DEFAULT_STATS: GamificationStats = {
  tasksCompleted: 0,
  aiMessages: 0,
  brainGamesCompleted: 0,
  gymVisits: 0,
  mindfulnessSessions: 0,
};

async function getStats(uid: string): Promise<GamificationStats> {
  const doc = await STATS_REF(uid).get();
  return { ...DEFAULT_STATS, ...(doc.data() as GamificationStats | undefined) };
}

async function countCompletedTasks(uid: string): Promise<number> {
  const snap = await firestore()
    .collection('users')
    .doc(uid)
    .collection('dailyPlans')
    .orderBy('date', 'desc')
    .limit(60)
    .get();

  let count = 0;
  snap.docs.forEach((d) => {
    const plan = d.data();
    const tasks = (plan.tasks as { status?: string }[]) ?? [];
    count += tasks.filter((t) => t.status === 'complete').length;
    if (plan.gymVisitToday) count += 1;
  });
  return count;
}

function evaluateUnlocks(ctx: {
  stats: GamificationStats;
  tasksCompleted: number;
  checkInStreak: number;
  hasClinician: boolean;
  latestScore: number;
  baselineScore: number;
}): Record<string, boolean> {
  return {
    first_steps: ctx.tasksCompleted >= 1,
    streak_7: ctx.checkInStreak >= 7,
    mind_matters: ctx.stats.mindfulnessSessions >= 10,
    fitness_fanatic: ctx.stats.gymVisits >= 20,
    ai_explorer: ctx.stats.aiMessages >= 50,
    score_climber: ctx.latestScore - ctx.baselineScore >= 2,
    care_connected: ctx.hasClinician,
    wellness_champion: ctx.latestScore >= 8,
  };
}

export const gamificationService = {
  recordEvent: async (uid: string, field: StatKey, amount = 1) => {
    if (!isFirebaseReady()) return;
    if (field === 'updatedAt') return;
    await STATS_REF(uid).set(
      {
        [field]: firestore.FieldValue.increment(amount),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
    await gamificationService.evaluateAchievements(uid);
  },

  evaluateAchievements: async (uid: string): Promise<UserAchievement[]> => {
    if (!isFirebaseReady()) {
      return ACHIEVEMENT_DEFINITIONS.map((def) => ({
        id: def.id,
        unlocked: false,
      }));
    }
    const [stats, tasksCompleted, checkInStreak, profile, latest, history] = await Promise.all([
      getStats(uid),
      countCompletedTasks(uid),
      checkInService.getCheckInStreak(uid),
      userService.getProfile(uid),
      wellnessService.getLatestScore(uid),
      wellnessService.getScoreHistory(uid, 30),
    ]);

    const baselineScore = history.length > 0 ? history[history.length - 1].overall : latest?.overall ?? 0;
    const unlocks = evaluateUnlocks({
      stats,
      tasksCompleted: Math.max(tasksCompleted, stats.tasksCompleted),
      checkInStreak,
      hasClinician: !!(profile?.clinicianId),
      latestScore: latest?.overall ?? 0,
      baselineScore,
    });

    const now = new Date().toISOString();
    const batch = firestore().batch();
    const achievementsRef = firestore().collection('users').doc(uid).collection('achievements');

    const results: UserAchievement[] = [];
    for (const def of ACHIEVEMENT_DEFINITIONS) {
      const existing = await achievementsRef.doc(def.id).get();
      const wasUnlocked = existing.data()?.unlocked === true;
      const shouldUnlock = unlocks[def.id] === true;
      const unlocked = wasUnlocked || shouldUnlock;

      const achievement: UserAchievement = {
        id: def.id,
        unlocked,
        unlockedAt: wasUnlocked
          ? (existing.data()?.unlockedAt as string)
          : shouldUnlock
            ? now
            : undefined,
      };

      if (!wasUnlocked && shouldUnlock) {
        batch.set(achievementsRef.doc(def.id), achievement, { merge: true });
      } else if (!existing.exists() && unlocked) {
        batch.set(achievementsRef.doc(def.id), achievement, { merge: true });
      }

      results.push(achievement);
    }

    await batch.commit();
    return results;
  },

  getAchievements: async (uid: string): Promise<(AchievementDefinition & UserAchievement)[]> => {
    if (!isFirebaseReady()) {
      return ACHIEVEMENT_DEFINITIONS.map((def) => ({
        ...def,
        id: def.id,
        unlocked: false,
      }));
    }
    await gamificationService.evaluateAchievements(uid);
    const snap = await firestore()
      .collection('users')
      .doc(uid)
      .collection('achievements')
      .get();

    const map = new Map(snap.docs.map((d) => [d.id, d.data() as UserAchievement]));
    return ACHIEVEMENT_DEFINITIONS.map((def) => {
      const saved = map.get(def.id);
      return {
        ...def,
        id: def.id,
        unlocked: saved?.unlocked ?? false,
        unlockedAt: saved?.unlockedAt,
      };
    });
  },

  watchAchievements: (
    uid: string,
    cb: (items: (AchievementDefinition & UserAchievement)[]) => void
  ) => {
    if (!isFirebaseReady()) {
      gamificationService.getAchievements(uid).then(cb);
      return NOOP_UNSUB;
    }
    return firestore()
      .collection('users')
      .doc(uid)
      .collection('achievements')
      .onSnapshot(
        async (snap) => {
          if (!snap) return;
          const items = await gamificationService.getAchievements(uid);
          cb(items);
        },
        (error) => logFirestoreListenerError('watchAchievements', error)
      );
  },
};
