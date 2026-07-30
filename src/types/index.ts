// src/types/index.ts

// ─── Auth ────────────────────────────────────────────────────────────────────

export type UserRole = 'patient' | 'clinician';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
  subscriptionTier: SubscriptionTier;
  subscriptionExpiry?: string;
  clinicianId?: string;       // set on patient if linked to a clinician
  linkedPatients?: string[];  // set on clinician
  onboardingComplete: boolean;
  quizComplete: boolean;
  primaryGoal?: string;       // top priority goal from onboarding
  healthGoals?: string[];     // all goals selected during onboarding
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
  trainingDaysPerWeek?: number;
  reminderAnchor?: 'morning' | 'afternoon' | 'evening';
  hasHomeEquipment?: boolean;
  dateOfBirth?: string;
  heightCm?: number;
  weightKg?: number;
  consentAccepted?: boolean;
  medicalDisclaimerAcknowledged?: boolean;
  ageConfirmed?: boolean;
  streakFreezes?: number;     // available streak freezes (resilience mechanic)
  /** Opaque Contentsquare identity — never email or display name */
  csq?: {
    identity: string;
  };
}

/** Native role documents synced on registration (`patients` / `clinicians` + `userProfiles`). */
export interface RegisteredUser {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

// ─── Wellness ────────────────────────────────────────────────────────────────

export type WellnessCategoryKey =
  | 'physical' | 'nutrition' | 'mental' | 'social'
  | 'environment' | 'fitness' | 'sleep' | 'mindfulness'
  | 'stress' | 'workLife';

export type WellnessCategoryScores = Record<WellnessCategoryKey, number>;

export interface WellnessScore {
  overall: number;   // 0–10
  categories: WellnessCategoryScores;
  date: string;
}

// ─── Daily Plan ──────────────────────────────────────────────────────────────

export type TaskStatus = 'pending' | 'complete' | 'skipped';

export interface DailyTask {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  durationMinutes: number;
  category: WellnessCategoryKey;
  linkedModule?: string;
  whyThisMatters?: string;
  isFromClinicianPlan?: boolean;
  status: TaskStatus;
  scoreBoost: number;
}

export interface DailyPlan {
  date: string;
  tasks: DailyTask[];
  completedCount: number;
  gymVisitToday?: boolean | null;
}

export type MoodLevel =
  | 'veryLow'
  | 'low'
  | 'neutral'
  | 'good'
  | 'great';

export interface DailyCheckIn {
  id: string;
  date: string;
  mood: MoodLevel;
  energy: number;
  stress: number;
  sleep: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Activity (HealthKit) ────────────────────────────────────────────────────

export interface ActivitySnapshot {
  steps: number;
  calories: number;
  distanceKm: number;
  exerciseMinutes: number;
  heartRate?: number;
}

export interface DailyActivityPoint {
  date: string;
  steps: number;
  calories: number;
  distanceKm: number;
  exerciseMinutes: number;
  sleepHours?: number;
}

export interface ActivityGoals {
  steps: number;
  calories: number;
  exerciseMinutes: number;
  sleepHours: number;
}

// ─── Fitness Hub ─────────────────────────────────────────────────────────────

export type FitnessModuleCategory =
  | 'mindBody' | 'anatomy' | 'brainGames' | 'calculators'
  | 'trackers' | 'workouts' | 'education';

export interface FitnessModule {
  id: string;
  title: string;
  subtitle: string;
  category: FitnessModuleCategory;
  icon: string;
  color: string;
  isPremium: boolean;
  wellnessCategory?: WellnessCategoryKey;
  /** iOS explore category names for filtering (e.g. "Cardiovascular") */
  exploreTags?: string[];
  /** iOS flat-list domain section */
  domain?: string;
}

// ─── AI Insights ─────────────────────────────────────────────────────────────

export type InsightType = 'Workout' | 'Nutrition' | 'Recovery' | 'Lifestyle' | 'Mental';
export type InsightSeverity = 'Low' | 'Medium' | 'High';

export interface AIInsight {
  id: string;
  title: string;
  type: InsightType;
  severity: InsightSeverity;
  description: string;
  linkedCategory: WellnessCategoryKey;
  linkedModule?: string;
  isComplete: boolean;
  /** Short headline shown when expanded */
  summary?: string;
  /** Why this recommendation matters for the user */
  whyItMatters?: string;
  /** Actionable steps the user can take today */
  actionSteps?: string[];
  /** Data points used to generate this insight */
  basedOn?: string[];
  /** Optional pro tip */
  tip?: string;
  /** Category score from assessment (0–10) */
  categoryScore?: number;
  /** Suggested target score for this category */
  targetScore?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// ─── Programs & Achievements ─────────────────────────────────────────────────

export interface ProgramCatalogItem {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  durationDays: number;
}

export interface ActiveProgram {
  id: string;
  programId: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  durationDays: number;
  startDate: string;
  status: 'active' | 'paused' | 'completed';
  completedDays: number;
  lastSessionDate?: string;
}

export interface AchievementDefinition {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface UserAchievement {
  id: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface GamificationStats {
  tasksCompleted: number;
  aiMessages: number;
  brainGamesCompleted: number;
  gymVisits: number;
  mindfulnessSessions: number;
  updatedAt?: string;
}

// ─── Analytics ───────────────────────────────────────────────────────────────

export interface ScoreTrend {
  date: string;        // 'Mon', 'Tue', etc.
  scores: Partial<WellnessCategoryScores>;
  overall: number;
}

export interface WellnessReportSnapshot {
  userName: string;
  generatedAt: string;
  reportTitle: string;
  overallScore: number | null;
  categoryScores: { key: WellnessCategoryKey; label: string; score: number }[];
  scoreHistory: WellnessScore[];
  strengths: string[];
  areasForImprovement: string[];
  activityToday: ActivitySnapshot | null;
  checkInStreak: number;
  dailyPlanCompletionRate: number | null;
  insightLines: string[];
  disclaimer: string;
}

// ─── Care Plan ───────────────────────────────────────────────────────────────

export interface CarePlanTask {
  id: string;
  title: string;
  description: string;
  type: 'workout' | 'nutrition' | 'sleep' | 'habit' | 'mindfulness' | 'goal';
  dueDate?: string;
  isComplete: boolean;
}

export interface CarePlan {
  id: string;
  clinicianId: string;
  clinicianName: string;
  specialty: string;
  title: string;
  tasks: CarePlanTask[];
  createdAt: string;
  updatedAt: string;
}

// ─── Clinician ───────────────────────────────────────────────────────────────

export interface ClinicianProfile extends UserProfile {
  specialty: string;
  credentials: string;
  workEmail: string;
  practiceCode: string;
}

export interface ClinicianProfileDoc {
  firstName?: string;
  lastName?: string;
  specialty: string;
  clinicName: string;
  licenseNumber?: string;
  licenseState?: string;
  workEmail: string;
  role?: string;
  scopeOfPractice?: string;
  statesOfPractice?: string[];
  timeZone?: string;
  isVerified?: boolean;
  verificationStatus?: string;
  onboardingCompleted: boolean;
  onboardingCompletedAt?: string;
  bio?: string;
  organizationId?: string;
  supervisingPhysician?: string;
  workPhoneNumber?: string;
  clinicalAvailability?: string;
  communicationPreferences?: string[];
  languagesSpoken?: string[];
  typicalResponseTime?: string;
  profilePhotoUrl?: string;
  pronouns?: string;
}

export interface ConnectionRequest {
  id: string;
  clinicianId: string;
  clinicianName: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  requestedAt: string;
  status: 'pending' | 'approved' | 'declined';
}

export interface PatientSummary {
  uid: string;
  displayName: string;
  email: string;
  wellnessScore: number;
  lastActive: string;
  linkedSince: string;
  needsAttention: boolean;
  patientStatus?: string;
}

export interface LinkedPatient {
  patientId: string;
  patientName: string;
  patientEmail: string;
  linkedAt: string;
  latestOverallScore?: number;
  patientStatus?: string;
  lastActivityAt?: string;
  lastCarePlanCompletedAt?: string;
}

export interface CarePlanRecommendation {
  id: string;
  type: string;
  title: string;
  description: string;
  category?: string;
  order: number;
}

export interface CustomCarePlan {
  id: string;
  clinicianId: string;
  clinicianName: string;
  patientId: string;
  planName: string;
  description: string;
  personalNote?: string;
  recommendations: CarePlanRecommendation[];
  createdAt: string;
  sentAt?: string;
  completedAt?: string;
  planStatus?: 'draft' | 'sent' | 'viewed' | 'active' | 'completed';
  fitnessHubCategoryName?: string;
  qrCodeData?: string;
  shareableLink?: string;
}

export interface FitnessHubRecommendedModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  colorName: string;
}

export interface FitnessHubRecommendation {
  id: string;
  clinicianId: string;
  clinicianName: string;
  patientId: string;
  patientName: string;
  recommendedModules: FitnessHubRecommendedModule[];
  personalNote?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId?: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface MessageThread {
  patientId: string;
  clinicianId: string;
  lastMessage?: string;
  lastMessageAt?: string;
  lastSenderId?: string;
  patientUnread?: number;
  clinicianUnread?: number;
  updatedAt?: string;
}

export interface InboxThread extends MessageThread {
  threadId: string;
  patientName: string;
  patientEmail: string;
}

// ─── Subscriptions ───────────────────────────────────────────────────────────

export type SubscriptionTier = 'free' | 'growth' | 'pro';

export interface SubscriptionProduct {
  productId: string;
  tier: SubscriptionTier;
  period: 'monthly' | 'yearly';
  price: string;
  title: string;
}

// ─── Navigation ──────────────────────────────────────────────────────────────

import { Screen } from '../navigation/screenNames';

type AuthNestedScreen =
  | typeof Screen.authLanding
  | typeof Screen.signIn
  | typeof Screen.createAccount
  | typeof Screen.chooseRole;

export type WebViewScreenParams = {
  url: string;
  title?: string;
};

export type RootStackParamList = {
  [Screen.welcome]: undefined;
  [Screen.breathWelcome]: undefined;
  [Screen.authentication]: { screen?: AuthNestedScreen; params?: { savePlan?: boolean } } | undefined;
  [Screen.emailVerification]: undefined;
  [Screen.goalSelection]: undefined;
  [Screen.experienceLevel]: undefined;
  [Screen.onboardingHabits]: undefined;
  [Screen.onboardingBaseline]: undefined;
  [Screen.firstWinActivity]: undefined;
  [Screen.assessmentPath]: undefined;
  [Screen.wellnessQuiz]: undefined;
  [Screen.wellnessResults]: undefined;
  [Screen.quizCategoryDetail]: { category: WellnessCategoryKey };
  [Screen.postQuizActionPlan]: undefined;
  [Screen.quickStartGuide]: undefined;
  [Screen.onboardingMood]: undefined;
  [Screen.notificationPermissions]: undefined;
  [Screen.healthPermissions]: undefined;
  [Screen.patientApp]: undefined;
  [Screen.clinicianPortal]: undefined;
  [Screen.clinicianOnboarding]: undefined;
  [Screen.subscriptionPaywall]: { feature?: string; fromOnboarding?: boolean };
};

export type MainTabParamList = {
  [Screen.tabHome]: undefined;
  [Screen.tabFitness]: undefined;
  [Screen.tabAiInsights]: undefined;
  [Screen.tabAnalytics]: undefined;
  [Screen.tabMore]: undefined;
  [Screen.tabMyCare]: undefined;
};

export type MyCareStackParamList = {
  [Screen.myCare]: undefined;
  [Screen.connectClinician]: undefined;
  [Screen.carePlan]: undefined;
  [Screen.messages]: undefined;
  [Screen.programs]: undefined;
  [Screen.programDetail]: { programId: string };
  [Screen.coaching]: undefined;
  [Screen.scanCustomPlan]: undefined;
  [Screen.subscriptionPaywall]: { feature?: string; fromOnboarding?: boolean };
};

export type ClinicianTabParamList = {
  [Screen.clinicianDashboard]: undefined;
  [Screen.patients]: undefined;
  [Screen.clinicianAnalytics]: undefined;
  [Screen.clinicianSettings]: undefined;
};

export type FitnessStackParamList = {
  [Screen.fitnessHub]: undefined;
  [Screen.moduleDetail]: { module: FitnessModule };
  [Screen.breathingExercise]: undefined;
  [Screen.meditationTimer]: undefined;
  [Screen.brainGame]: { gameId: string };
  [Screen.healthCalculator]: { calculatorId: string };
  [Screen.healthTracker]: { trackerId: string };
  [Screen.anatomyViewer]: { modelId: string };
  [Screen.healthTopic]: { topicId: string };
  [Screen.vitaminsLearning]: undefined;
  [Screen.nutritionBasics]: undefined;
  [Screen.learningGuide]: { topicId: string };
  [Screen.guidedProgram]: { module: FitnessModule };
  [Screen.mealPlanner]: undefined;
  [Screen.activityDashboard]: undefined;
  [Screen.stepsDetail]: undefined;
  [Screen.premiumShop]: undefined;
  [Screen.organHealthNutrition]: undefined;
};

export type ClinicianStackParamList = {
  [Screen.clinicianTabs]: undefined;
  [Screen.clinicianInbox]: undefined;
  [Screen.editClinicianProfile]: undefined;
  [Screen.clinicianHelp]: undefined;
  [Screen.messageTemplates]: undefined;
  [Screen.clinicianSchedule]: undefined;
  [Screen.conversationStarters]: undefined;
  [Screen.betweenVisits]: undefined;
  [Screen.auditLog]: undefined;
  [Screen.practiceMode]: undefined;
  [Screen.clinicianLegal]: undefined;
  [Screen.website]: WebViewScreenParams;
  [Screen.bulkActions]: undefined;
  [Screen.clinicianModuleLibrary]: undefined;
  [Screen.patientDetail]: { patient: PatientSummary };
  [Screen.clinicianMessages]: { patient: PatientSummary };
  [Screen.createCarePlan]: { patient: PatientSummary };
  [Screen.fitnessRecommendations]: { patient: PatientSummary };
  [Screen.addPatient]: undefined;
  [Screen.evidenceHub]: undefined;
  [Screen.clinicalNotes]: { patient: PatientSummary };
} & Omit<FitnessStackParamList, typeof Screen.fitnessHub>;

export type HomeStackParamList = {
  [Screen.homeDashboard]: undefined;
  [Screen.dailyPlan]: undefined;
  [Screen.taskDetail]: { task: DailyTask };
  [Screen.dailyCheckIn]: undefined;
  [Screen.activityDashboard]: undefined;
  [Screen.stepsDetail]: undefined;
  [Screen.healthPermissions]: undefined;
};

export type AIInsightsStackParamList = {
  [Screen.aiInsightsFeed]: undefined;
  [Screen.aiHealthCoach]: undefined;
  [Screen.insightDetail]: { insight: AIInsight };
};

export type AnalyticsStackParamList = {
  [Screen.analyticsDashboard]: undefined;
  [Screen.categoryDetail]: { category: WellnessCategoryKey };
  [Screen.progressTracking]: undefined;
  [Screen.wellnessExport]: undefined;
};

export type MoreStackParamList = {
  [Screen.moreMenu]: undefined;
  [Screen.myCare]: undefined;
  [Screen.connectClinician]: undefined;
  [Screen.contentLibrary]: undefined;
  [Screen.profile]: undefined;
  [Screen.carePlan]: undefined;
  [Screen.messages]: undefined;
  [Screen.programs]: undefined;
  [Screen.programDetail]: { program: ActiveProgram };
  [Screen.achievements]: undefined;
  [Screen.coaching]: undefined;
  [Screen.notifications]: undefined;
  [Screen.subscription]: undefined;
  [Screen.help]: undefined;
  [Screen.privacyPolicy]: undefined;
  [Screen.termsOfService]: { document?: 'terms' } | undefined;
  [Screen.aiDisclosure]: { document?: 'ai' } | undefined;
  [Screen.healthDataDisclosure]: { document?: 'health' } | undefined;
  [Screen.dataRights]: undefined;
  [Screen.newsletter]: undefined;
  [Screen.menstrualCycle]: undefined;
  [Screen.website]: WebViewScreenParams;
  [Screen.blog]: undefined;
  [Screen.forum]: undefined;
  [Screen.scanCustomPlan]: undefined;
  [Screen.goals]: undefined;
  [Screen.habitTracking]: undefined;
  [Screen.socialHub]: undefined;
  [Screen.socialFeed]: undefined;
  [Screen.leaderboard]: undefined;
  [Screen.socialFriends]: undefined;
  [Screen.socialChallenges]: undefined;
  [Screen.createChallenge]: undefined;
  [Screen.addFriend]: undefined;
  [Screen.anatomyExplorer]: undefined;
  [Screen.anatomyLearning]: undefined;
  [Screen.anatomyModule]: { moduleId: string };
  [Screen.conditionHub]: undefined;
  [Screen.conditionDetail]: { conditionId: string };
  [Screen.workoutHub]: undefined;
  [Screen.workoutDetail]: { workoutId: string };
  [Screen.workoutTracker]: { workoutId: string };
  [Screen.workoutProgram]: { programId: string };
};
