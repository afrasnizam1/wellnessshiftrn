/**
 * Human-readable React Navigation route names.
 * CSQ screenviews use `Section - Screen` via csqScreenNames.ts (e.g. `Home - Dashboard`).
 */
export const Screen = {
  // Root stack
  welcome: 'Welcome',
  breathWelcome: 'Breath Welcome',
  authentication: 'Sign In & Registration',
  emailVerification: 'Email Verification',
  goalSelection: 'Goal Selection',
  experienceLevel: 'Experience Level',
  onboardingHabits: 'Onboarding Habits',
  onboardingBaseline: 'Baseline Profile',
  firstWinActivity: 'First Activity',
  assessmentPath: 'Assessment Path',
  wellnessQuiz: 'Wellness Quiz',
  wellnessResults: 'Wellness Results',
  quizCategoryDetail: 'Quiz Category Breakdown',
  postQuizActionPlan: 'Post-Quiz Action Plan',
  quickStartGuide: 'Quick Start Guide',
  onboardingMood: 'Onboarding Mood',
  notificationPermissions: 'Notification Permissions',
  healthPermissions: 'Health Permissions',
  patientApp: 'Main App',
  clinicianPortal: 'Clinician Portal',
  clinicianOnboarding: 'Clinician Onboarding',
  subscriptionPaywall: 'Subscription Paywall',

  // Auth
  authLanding: 'Welcome',
  signIn: 'Sign In',
  createAccount: 'Create Account',
  chooseRole: 'Choose Account Role',

  // Main tabs
  tabHome: 'Home Tab',
  tabFitness: 'Fitness Tab',
  tabAiInsights: 'AI Insights Tab',
  tabAnalytics: 'Analytics Tab',
  tabMore: 'More Tab',
  tabMyCare: 'My Care Tab',

  // Home stack
  homeDashboard: 'Home Dashboard',
  dailyPlan: 'Daily Plan',
  taskDetail: 'Daily Task Detail',
  dailyCheckIn: 'Daily Check-In',
  activityDashboard: 'Activity Dashboard',
  stepsDetail: 'Steps Detail',

  // Fitness stack
  fitnessHub: 'Fitness Hub',
  moduleDetail: 'Fitness Module',
  breathingExercise: 'Breathing Exercise',
  meditationTimer: 'Meditation Timer',
  brainGame: 'Brain Game',
  healthCalculator: 'Health Calculator',
  healthTracker: 'Health Tracker',
  anatomyViewer: 'Anatomy Viewer',
  healthTopic: 'Health Topic',
  vitaminsLearning: 'Vitamins Learning',
  nutritionBasics: 'Nutrition Basics',
  learningGuide: 'Learning Guide',
  guidedProgram: 'Guided Program',
  mealPlanner: 'Meal Planner',
  premiumShop: 'Premium Shop',
  organHealthNutrition: 'Organ Health & Nutrition',

  // AI Insights stack
  aiInsightsFeed: 'AI Insights Feed',
  aiHealthCoach: 'AI Health Coach',
  insightDetail: 'AI Insight Detail',

  // Analytics stack
  analyticsDashboard: 'Analytics Dashboard',
  categoryDetail: 'Wellness Category Detail',
  progressTracking: 'Progress Tracking',
  wellnessExport: 'Export Wellness Data',
  analyticsCustomization: 'Customize Analytics',

  // More stack
  moreMenu: 'More Menu',
  myCare: 'My Care',
  connectClinician: 'Connect Clinician',
  contentLibrary: 'Content Library',
  profile: 'My Profile',
  carePlan: 'Care Plan',
  messages: 'Messages',
  programs: 'Wellness Programs',
  programDetail: 'Wellness Program Detail',
  achievements: 'Achievements',
  coaching: 'Coaching',
  notifications: 'Notifications',
  subscription: 'Subscription',
  help: 'Help & Support',
  privacyPolicy: 'Privacy Policy',
  termsOfService: 'Terms of Service',
  aiDisclosure: 'AI Disclosure',
  healthDataDisclosure: 'Health Data Disclosure',
  dataRights: 'Data Rights',
  newsletter: 'Newsletter',
  menstrualCycle: 'Menstrual Cycle',
  website: 'WellnessShift Website',
  blog: 'Blog',
  forum: 'Community Forum',
  scanCustomPlan: 'Import Care Plan',
  goals: 'Goals',
  habitTracking: 'Habit Tracker',
  socialHub: 'Social Hub',
  socialFeed: 'Social Feed',
  leaderboard: 'Community Progress',
  socialFriends: 'Friends',
  socialChallenges: 'Challenges',
  createChallenge: 'Create Challenge',
  addFriend: 'Add Friend',

  // Anatomy screens
  anatomyExplorer: 'Anatomy Explorer',
  anatomyLearning: 'Anatomy Learning',
  anatomyModule: 'Anatomy Module',

  // Health condition screens
  conditionHub: 'Health Conditions',
  conditionDetail: 'Condition Details',

  // Workout screens
  workoutHub: 'Workouts',
  workoutDetail: 'Workout Details',
  workoutTracker: 'Workout Tracker',
  workoutProgram: 'Workout Program',

  // Clinician tabs
  clinicianDashboard: 'Clinician Dashboard',
  patients: 'Patients List',
  clinicianAnalytics: 'Clinician Analytics',
  clinicianSettings: 'Clinician Settings',

  // Clinician stack
  clinicianTabs: 'Clinician Main',
  clinicianInbox: 'Clinician Inbox',
  patientDetail: 'Patient Detail',
  clinicianMessages: 'Clinician Messages',
  createCarePlan: 'Create Care Plan',
  fitnessRecommendations: 'Fitness Recommendations',
  addPatient: 'Add Patient',
  editClinicianProfile: 'Edit Clinician Profile',
  clinicianHelp: 'Clinician Help & Support',
  messageTemplates: 'Message Templates',
  clinicianSchedule: 'Clinician Schedule',
  conversationStarters: 'Conversation Starters',
  betweenVisits: 'Between Visits Care',
  auditLog: 'Audit Log',
  practiceMode: 'Practice Mode',
  clinicianLegal: 'Clinician Legal',
  bulkActions: 'Bulk Patient Actions',
  clinicianModuleLibrary: 'Clinician Module Library',
  evidenceHub: 'Evidence Hub',
  clinicalNotes: 'Clinical Notes',
} as const;

export type ScreenName = typeof Screen[keyof typeof Screen];
