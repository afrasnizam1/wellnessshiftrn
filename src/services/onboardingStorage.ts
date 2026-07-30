import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  hasSeenAppIntro: 'hasSeenAppIntro',
  hasSeenWelcomeVideo: 'hasSeenWelcomeVideo',
  hasCompletedPostQuizOnboarding: 'hasCompletedPostQuizOnboarding',
  hasCompletedPostQuizActionPlan: 'hasCompletedPostQuizActionPlan',
  hasCompletedWellnessResults: 'hasCompletedWellnessResults',
  hasCompletedQuickStart: 'hasCompletedQuickStart',
  hasSeenHealthKitPrompt: 'hasSeenHealthKitPrompt',
  hasCompletedOnboardingMood: 'hasCompletedOnboardingMood',
  hasSeenNotificationPrompt: 'hasSeenNotificationPrompt',
  hasSeenOnboardingPaywall: 'hasSeenOnboardingPaywall',
  hasCompletedFirstWin: 'hasCompletedFirstWin',
  pendingInAppGuide: 'pendingInAppGuide',
  hasCompletedAppTour: 'hasCompletedAppTour',
  hasCompletedStartHere: 'hasCompletedStartHereOnboarding',
  startHereDate: 'startHereOnboardingDate',
  dayOneChecklistCompleted: 'dayOneChecklistCompleted',
  userGender: 'user_selected_gender',
  userPersona: 'userPersona',
  userGoals: 'userGoals',
  selectedPrimaryGoal: 'selectedPrimaryGoal',
  appPurpose: 'appPurpose',
  appPurposes: 'appPurposes',
  trialStartDate: 'free_trial_start_date',
  trialUsed: 'free_trial_has_been_used',
} as const;

function userKey(base: string, uid: string) {
  return `${base}_${uid}`;
}

export type UserGender = 'female' | 'male' | 'other' | 'prefer_not_to_say';

export const onboardingStorage = {
  hasSeenAppIntro: async () =>
    (await AsyncStorage.getItem(KEYS.hasSeenAppIntro)) === 'true',

  markAppIntroSeen: async () =>
    AsyncStorage.setItem(KEYS.hasSeenAppIntro, 'true'),

  hasSeenWelcomeVideo: async (uid: string) =>
    (await AsyncStorage.getItem(userKey(KEYS.hasSeenWelcomeVideo, uid))) === 'true',

  markWelcomeVideoSeen: async (uid: string) =>
    AsyncStorage.setItem(userKey(KEYS.hasSeenWelcomeVideo, uid), 'true'),

  markQuizComplete: async (uid: string) =>
    AsyncStorage.setItem(userKey('hasCompletedQuiz', uid), 'true'),

  hasCompletedPostQuizActionPlan: async (uid: string) =>
    (await AsyncStorage.getItem(userKey(KEYS.hasCompletedPostQuizActionPlan, uid))) === 'true',

  markPostQuizActionPlanComplete: async (uid: string) =>
    AsyncStorage.setItem(userKey(KEYS.hasCompletedPostQuizActionPlan, uid), 'true'),

  hasCompletedWellnessResults: async (uid: string) =>
    (await AsyncStorage.getItem(userKey(KEYS.hasCompletedWellnessResults, uid))) === 'true',

  markWellnessResultsComplete: async (uid: string) =>
    AsyncStorage.setItem(userKey(KEYS.hasCompletedWellnessResults, uid), 'true'),

  hasCompletedPostQuizOnboarding: async (uid: string) =>
    (await AsyncStorage.getItem(userKey(KEYS.hasCompletedPostQuizOnboarding, uid))) === 'true',

  markPostQuizOnboardingComplete: async (uid: string) =>
    AsyncStorage.setItem(userKey(KEYS.hasCompletedPostQuizOnboarding, uid), 'true'),

  hasCompletedQuickStart: async (uid: string) =>
    (await AsyncStorage.getItem(userKey(KEYS.hasCompletedQuickStart, uid))) === 'true',

  markQuickStartComplete: async (uid: string) =>
    AsyncStorage.setItem(userKey(KEYS.hasCompletedQuickStart, uid), 'true'),

  hasSeenHealthKitPrompt: async (uid: string) =>
    (await AsyncStorage.getItem(userKey(KEYS.hasSeenHealthKitPrompt, uid))) === 'true',

  markHealthKitPromptSeen: async (uid: string) =>
    AsyncStorage.setItem(userKey(KEYS.hasSeenHealthKitPrompt, uid), 'true'),

  hasCompletedOnboardingMood: async (uid: string) =>
    (await AsyncStorage.getItem(userKey(KEYS.hasCompletedOnboardingMood, uid))) === 'true',

  markOnboardingMoodComplete: async (uid: string) =>
    AsyncStorage.setItem(userKey(KEYS.hasCompletedOnboardingMood, uid), 'true'),

  hasSeenNotificationPrompt: async (uid: string) =>
    (await AsyncStorage.getItem(userKey(KEYS.hasSeenNotificationPrompt, uid))) === 'true',

  markNotificationPromptSeen: async (uid: string) =>
    AsyncStorage.setItem(userKey(KEYS.hasSeenNotificationPrompt, uid), 'true'),

  hasSeenOnboardingPaywall: async (uid: string) =>
    (await AsyncStorage.getItem(userKey(KEYS.hasSeenOnboardingPaywall, uid))) === 'true',

  markOnboardingPaywallSeen: async (uid: string) =>
    AsyncStorage.setItem(userKey(KEYS.hasSeenOnboardingPaywall, uid), 'true'),

  markFirstWinComplete: async (uid: string) =>
    AsyncStorage.setItem(userKey(KEYS.hasCompletedFirstWin, uid), 'true'),

  hasCompletedFirstWin: async (uid: string) =>
    (await AsyncStorage.getItem(userKey(KEYS.hasCompletedFirstWin, uid))) === 'true',

  setExperienceLevel: async (uid: string, level: string) =>
    AsyncStorage.setItem(userKey('experienceLevel', uid), level),

  getExperienceLevel: async (uid: string): Promise<string | null> =>
    AsyncStorage.getItem(userKey('experienceLevel', uid)),

  setOnboardingHabits: async (
    uid: string,
    data: { reminderAnchor?: string; trainingDaysPerWeek?: number; hasHomeEquipment?: boolean },
  ) =>
    AsyncStorage.setItem(userKey('onboardingHabits', uid), JSON.stringify(data)),

  getOnboardingHabits: async (
    uid: string,
  ): Promise<{ reminderAnchor?: string; trainingDaysPerWeek?: number; hasHomeEquipment?: boolean } | null> => {
    const raw = await AsyncStorage.getItem(userKey('onboardingHabits', uid));
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  },

  setBaselineMetrics: async (
    uid: string,
    data: { dateOfBirth?: string; heightCm?: number; weightKg?: number },
  ) =>
    AsyncStorage.setItem(userKey('baselineMetrics', uid), JSON.stringify(data)),

  isPendingInAppGuide: async (uid: string) =>
    (await AsyncStorage.getItem(userKey(KEYS.pendingInAppGuide, uid))) === 'true',

  setPendingInAppGuide: async (uid: string, value: boolean) =>
    AsyncStorage.setItem(userKey(KEYS.pendingInAppGuide, uid), value ? 'true' : 'false'),

  hasCompletedAppTour: async (uid: string) =>
    (await AsyncStorage.getItem(userKey(KEYS.hasCompletedAppTour, uid))) === 'true',

  /** True when post-paywall / More menu requested the first-run app tour. */
  shouldShowAppTour: async (uid: string) =>
    (await AsyncStorage.getItem(userKey(KEYS.pendingInAppGuide, uid))) === 'true',

  markInAppGuideComplete: async (uid: string) =>
    Promise.all([
      AsyncStorage.setItem(userKey(KEYS.pendingInAppGuide, uid), 'false'),
      AsyncStorage.setItem(userKey(KEYS.hasCompletedAppTour, uid), 'true'),
    ]),

  hasCompletedStartHere: async (uid: string) =>
    (await AsyncStorage.getItem(userKey(KEYS.hasCompletedStartHere, uid))) === 'true',

  markStartHereComplete: async (uid: string) =>
    Promise.all([
      AsyncStorage.setItem(userKey(KEYS.hasCompletedStartHere, uid), 'true'),
      AsyncStorage.setItem(userKey(KEYS.startHereDate, uid), new Date().toISOString()),
    ]),

  /** Marks legacy/home prompts satisfied after the main onboarding funnel. */
  markMainOnboardingSupplementsComplete: async (uid: string) =>
    Promise.all([
      AsyncStorage.setItem(userKey(KEYS.hasCompletedStartHere, uid), 'true'),
      AsyncStorage.setItem(userKey(KEYS.startHereDate, uid), new Date().toISOString()),
      AsyncStorage.setItem(userKey(KEYS.hasCompletedPostQuizActionPlan, uid), 'true'),
      AsyncStorage.setItem(userKey(KEYS.hasCompletedPostQuizOnboarding, uid), 'true'),
      AsyncStorage.setItem(userKey(KEYS.hasCompletedQuickStart, uid), 'true'),
    ]),

  hasCompletedDayOneChecklist: async (uid: string) =>
    (await AsyncStorage.getItem(userKey(KEYS.dayOneChecklistCompleted, uid))) === 'true',

  markDayOneChecklistComplete: async (uid: string) =>
    AsyncStorage.setItem(userKey(KEYS.dayOneChecklistCompleted, uid), 'true'),

  getUserGender: async (uid: string): Promise<UserGender | null> => {
    const v = await AsyncStorage.getItem(userKey(KEYS.userGender, uid));
    return (v as UserGender) ?? null;
  },

  setUserGender: async (uid: string, gender: UserGender) =>
    AsyncStorage.setItem(userKey(KEYS.userGender, uid), gender),

  getUserGoals: async (uid: string): Promise<string[]> => {
    const raw = await AsyncStorage.getItem(userKey(KEYS.userGoals, uid));
    if (!raw) return [];
    try { return JSON.parse(raw); } catch { return []; }
  },

  setUserGoals: async (uid: string, goals: string[]) =>
    AsyncStorage.setItem(userKey(KEYS.userGoals, uid), JSON.stringify(goals)),

  getUserPersona: async (uid: string): Promise<string | null> =>
    AsyncStorage.getItem(userKey(KEYS.userPersona, uid)),

  setUserPersona: async (uid: string, persona: string) =>
    AsyncStorage.setItem(userKey(KEYS.userPersona, uid), persona),

  getSelectedPrimaryGoal: async (uid: string | null): Promise<string | null> => {
    if (!uid) return AsyncStorage.getItem(KEYS.selectedPrimaryGoal);
    return AsyncStorage.getItem(userKey(KEYS.selectedPrimaryGoal, uid));
  },

  setSelectedPrimaryGoal: async (uid: string | null, goal: string) => {
    if (!uid) return AsyncStorage.setItem(KEYS.selectedPrimaryGoal, goal);
    return AsyncStorage.setItem(userKey(KEYS.selectedPrimaryGoal, uid), goal);
  },

  getAppPurpose: async (uid: string): Promise<string | null> =>
    AsyncStorage.getItem(userKey(KEYS.appPurpose, uid)),

  setAppPurpose: async (uid: string, purpose: string) =>
    AsyncStorage.setItem(userKey(KEYS.appPurpose, uid), purpose),

  getAppPurposes: async (uid: string): Promise<string[]> => {
    const raw = await AsyncStorage.getItem(userKey(KEYS.appPurposes, uid));
    if (!raw) {
      const single = await AsyncStorage.getItem(userKey(KEYS.appPurpose, uid));
      return single ? [single] : [];
    }
    try { return JSON.parse(raw); } catch { return []; }
  },

  setAppPurposes: async (uid: string, purposes: string[]) =>
    AsyncStorage.setItem(userKey(KEYS.appPurposes, uid), JSON.stringify(purposes)),

  getTrialStartDate: async (uid: string): Promise<string | null> =>
    AsyncStorage.getItem(userKey(KEYS.trialStartDate, uid)),

  startTrialIfNeeded: async (uid: string): Promise<string> => {
    const existing = await AsyncStorage.getItem(userKey(KEYS.trialStartDate, uid));
    if (existing) return existing;
    const start = new Date().toISOString();
    await AsyncStorage.setItem(userKey(KEYS.trialStartDate, uid), start);
    return start;
  },
};
