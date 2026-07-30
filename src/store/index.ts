// src/store/index.ts
import { create } from 'zustand';
import type {
  UserProfile, WellnessScore, DailyPlan,
  ActivitySnapshot, AIInsight, CarePlan,
  SubscriptionTier, ChatMessage, DailyCheckIn,
  FitnessHubRecommendation,
} from '../types';
import type { AssessmentAnswerMap } from '../utils/wellnessAssessmentScoring';

interface AppState {
  // Auth
  user: UserProfile | null;
  isAuthLoading: boolean;
  isGuest: boolean;
  setUser: (user: UserProfile | null) => void;
  setAuthLoading: (v: boolean) => void;
  setIsGuest: (v: boolean) => void;

  // Wellness
  wellnessScore: WellnessScore | null;
  lastQuizAnswers: AssessmentAnswerMap | null;
  dailyPlan: DailyPlan | null;
  setWellnessScore: (score: WellnessScore | null) => void;
  setLastQuizAnswers: (answers: AssessmentAnswerMap | null) => void;
  setDailyPlan: (plan: DailyPlan | null) => void;
  markTaskComplete: (taskId: string) => void;
  setGymVisit: (visited: boolean) => void;
  checkInStreak: number;
  hasCheckedInToday: boolean;
  todaysCheckIn: DailyCheckIn | null;
  streakFreezes: number;
  streakBroken: boolean;
  longestStreak: number;
  setCheckInMeta: (data: {
    streak: number;
    hasCheckedInToday: boolean;
    todaysCheckIn: DailyCheckIn | null;
    streakFreezes?: number;
    streakBroken?: boolean;
    longestStreak?: number;
  }) => void;

  // Activity
  activity: ActivitySnapshot | null;
  setActivity: (a: ActivitySnapshot) => void;

  // AI Insights
  insights: AIInsight[];
  chatMessages: ChatMessage[];
  setInsights: (insights: AIInsight[]) => void;
  markInsightComplete: (id: string) => void;
  addChatMessage: (msg: ChatMessage) => void;
  clearChat: () => void;

  // Care Plan
  carePlan: CarePlan | null;
  setCarePlan: (plan: CarePlan | null) => void;
  clinicianRecommendations: FitnessHubRecommendation | null;
  setClinicianRecommendations: (rec: FitnessHubRecommendation | null) => void;

  // Subscription
  subscriptionTier: SubscriptionTier;
  setSubscriptionTier: (tier: SubscriptionTier) => void;

  // Clinician
  clinicianProfileReady: boolean;
  setClinicianProfileReady: (v: boolean) => void;

  // UI
  hasSeenIntro: boolean;
  setHasSeenIntro: (v: boolean) => void;

  /** Bumped on explicit sign-out to remount root navigation. */
  sessionEpoch: number;
  resetSession: (options?: { bumpEpoch?: boolean }) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Auth
  user: null,
  isAuthLoading: true,
  isGuest: false,
  setUser: (user) => set({ user }),
  setAuthLoading: (isAuthLoading) => set({ isAuthLoading }),
  setIsGuest: (isGuest) => set({ isGuest }),

  // Wellness
  wellnessScore: null,
  lastQuizAnswers: null,
  dailyPlan: null,
  setWellnessScore: (wellnessScore) => set({ wellnessScore }),
  setLastQuizAnswers: (lastQuizAnswers) => set({ lastQuizAnswers }),
  setDailyPlan: (dailyPlan) => set({ dailyPlan }),
  markTaskComplete: (taskId) =>
    set((state) => {
      if (!state.dailyPlan) return state;
      const tasks = state.dailyPlan.tasks.map((t) =>
        t.id === taskId ? { ...t, status: 'complete' as const } : t
      );
      const planCompleted = tasks.filter((t) => t.status === 'complete').length;
      const gymDone = state.dailyPlan.gymVisitToday != null ? 1 : 0;
      return {
        dailyPlan: {
          ...state.dailyPlan,
          tasks,
          completedCount: planCompleted + gymDone,
        },
      };
    }),
  setGymVisit: (visited) =>
    set((state) => {
      if (!state.dailyPlan) return state;
      const planCompleted = state.dailyPlan.tasks.filter((t) => t.status === 'complete').length;
      return {
        dailyPlan: {
          ...state.dailyPlan,
          gymVisitToday: visited,
          completedCount: planCompleted + 1,
        },
      };
    }),
  checkInStreak: 0,
  hasCheckedInToday: false,
  todaysCheckIn: null,
  streakFreezes: 0,
  streakBroken: false,
  longestStreak: 0,
  setCheckInMeta: ({ streak, hasCheckedInToday, todaysCheckIn, streakFreezes = 0, streakBroken = false, longestStreak = 0 }) =>
    set({ checkInStreak: streak, hasCheckedInToday, todaysCheckIn, streakFreezes, streakBroken, longestStreak }),

  // Activity
  activity: null,
  setActivity: (activity) => set({ activity }),

  // AI Insights
  insights: [],
  chatMessages: [],
  setInsights: (insights) => set({ insights }),
  markInsightComplete: (id) =>
    set((state) => ({
      insights: state.insights.map((i) =>
        i.id === id ? { ...i, isComplete: true } : i
      ),
    })),
  addChatMessage: (msg) =>
    set((state) => ({ chatMessages: [...state.chatMessages, msg] })),
  clearChat: () => set({ chatMessages: [] }),

  // Care Plan
  carePlan: null,
  setCarePlan: (carePlan) => set({ carePlan }),
  clinicianRecommendations: null,
  setClinicianRecommendations: (clinicianRecommendations) => set({ clinicianRecommendations }),

  // Subscription
  subscriptionTier: 'free',
  setSubscriptionTier: (subscriptionTier) => set({ subscriptionTier }),

  // Clinician
  clinicianProfileReady: false,
  setClinicianProfileReady: (clinicianProfileReady) => set({ clinicianProfileReady }),

  // UI
  hasSeenIntro: false,
  setHasSeenIntro: (hasSeenIntro) => set({ hasSeenIntro }),

  sessionEpoch: 0,
  resetSession: (options) =>
    set((state) => ({
      user: null,
      isAuthLoading: true,
      isGuest: false,
      wellnessScore: null,
      lastQuizAnswers: null,
      dailyPlan: null,
      activity: null,
      insights: [],
      chatMessages: [],
      carePlan: null,
      clinicianRecommendations: null,
      checkInStreak: 0,
      hasCheckedInToday: false,
      todaysCheckIn: null,
      streakFreezes: 0,
      streakBroken: false,
      longestStreak: 0,
      clinicianProfileReady: false,
      subscriptionTier: 'free',
      sessionEpoch: options?.bumpEpoch ? state.sessionEpoch + 1 : state.sessionEpoch,
    })),
}));
