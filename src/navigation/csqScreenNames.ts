import { Screen, type ScreenName } from './screenNames';

/** Short screen label (right side of `Section - Screen`). */
export const CSQ_LEAF_NAMES: Partial<Record<ScreenName, string>> = {
  // Launch
  [Screen.welcome]: 'Welcome',
  [Screen.breathWelcome]: 'Breath Welcome',

  // Auth
  [Screen.signIn]: 'Sign In',
  [Screen.createAccount]: 'Create Account',
  [Screen.chooseRole]: 'Choose Role',

  // Onboarding
  [Screen.emailVerification]: 'Email Verification',
  [Screen.introVideo]: 'Welcome Video',
  [Screen.purposeSelection]: 'Why Here',
  [Screen.goalSelection]: 'Goals',
  [Screen.experienceLevel]: 'Experience Level',
  [Screen.onboardingHabits]: 'Habits',
  [Screen.onboardingBaseline]: 'Baseline',
  [Screen.firstWinActivity]: 'First Activity',
  [Screen.assessmentPath]: 'Assessment Path',
  [Screen.wellnessQuiz]: 'Quiz',
  [Screen.buildingWellnessPlan]: 'Building Plan',
  [Screen.wellnessResults]: 'Results',
  [Screen.quizCategoryDetail]: 'Category Breakdown',
  [Screen.onboardingMood]: 'Mood Check-In',
  [Screen.notificationPermissions]: 'Notifications',
  [Screen.postQuizActionPlan]: 'Action Plan',
  [Screen.quickStartGuide]: 'Quick Start',
  [Screen.healthPermissions]: 'Health Permissions',

  // Subscription
  [Screen.subscriptionPaywall]: 'Paywall',

  // Home
  [Screen.homeDashboard]: 'Dashboard',
  [Screen.dailyPlan]: 'Daily Plan',
  [Screen.taskDetail]: 'Task Detail',
  [Screen.dailyCheckIn]: 'Check-In',
  [Screen.activityDashboard]: 'Activity',
  [Screen.stepsDetail]: 'Steps',

  // Fitness
  [Screen.fitnessHub]: 'Hub',
  [Screen.moduleDetail]: 'Module',
  [Screen.breathingExercise]: 'Breathing',
  [Screen.meditationTimer]: 'Meditation',
  [Screen.brainGame]: 'Brain Game',
  [Screen.healthCalculator]: 'Calculator',
  [Screen.healthTracker]: 'Tracker',
  [Screen.anatomyViewer]: 'Anatomy',
  [Screen.healthTopic]: 'Topic',
  [Screen.vitaminsLearning]: 'Vitamins',
  [Screen.nutritionBasics]: 'Nutrition',
  [Screen.learningGuide]: 'Guide',
  [Screen.guidedProgram]: 'Program',
  [Screen.mealPlanner]: 'Meal Planner',
  [Screen.highProteinMeals]: 'High Protein Meals',
  [Screen.foodScan]: 'Food Scan',
  [Screen.bodyMetrics]: 'Body Metrics',
  [Screen.healthRecords]: 'Health Records',
  [Screen.premiumShop]: 'Shop',
  [Screen.organHealthNutrition]: 'Organ Health',

  // AI Insights
  [Screen.aiInsightsFeed]: 'Feed',
  [Screen.aiHealthCoach]: 'Coach',
  [Screen.insightDetail]: 'Detail',

  // Analytics
  [Screen.analyticsDashboard]: 'Dashboard',
  [Screen.categoryDetail]: 'Category',
  [Screen.progressTracking]: 'Progress',
  [Screen.wellnessExport]: 'Export',
  [Screen.analyticsCustomization]: 'Customize',

  // More
  [Screen.moreMenu]: 'Menu',
  [Screen.myCare]: 'My Care',
  [Screen.connectClinician]: 'Connect Clinician',
  [Screen.contentLibrary]: 'Library',
  [Screen.profile]: 'Profile',
  [Screen.carePlan]: 'Care Plan',
  [Screen.messages]: 'Messages',
  [Screen.programs]: 'Programs',
  [Screen.programDetail]: 'Program Detail',
  [Screen.achievements]: 'Achievements',
  [Screen.coaching]: 'Coaching',
  [Screen.notifications]: 'Notifications',
  [Screen.subscription]: 'Subscription',
  [Screen.help]: 'Help',
  [Screen.privacyPolicy]: 'Privacy',
  [Screen.termsOfService]: 'Terms',
  [Screen.aiDisclosure]: 'AI Disclosure',
  [Screen.healthDataDisclosure]: 'Health Data',
  [Screen.dataRights]: 'Data Rights',
  [Screen.newsletter]: 'Newsletter',
  [Screen.menstrualCycle]: 'Cycle',
  [Screen.website]: 'Website',
  [Screen.blog]: 'Blog',
  [Screen.forum]: 'Forum',
  [Screen.scanCustomPlan]: 'Import Plan',

  // Clinician
  [Screen.clinicianOnboarding]: 'Onboarding',
  [Screen.clinicianDashboard]: 'Dashboard',
  [Screen.patients]: 'Patients',
  [Screen.clinicianAnalytics]: 'Analytics',
  [Screen.clinicianSettings]: 'Settings',
  [Screen.clinicianInbox]: 'Inbox',
  [Screen.patientDetail]: 'Patient Detail',
  [Screen.clinicianMessages]: 'Messages',
  [Screen.createCarePlan]: 'Create Plan',
  [Screen.fitnessRecommendations]: 'Recommendations',
  [Screen.addPatient]: 'Add Patient',
  [Screen.editClinicianProfile]: 'Edit Profile',
  [Screen.clinicianHelp]: 'Help',
  [Screen.messageTemplates]: 'Templates',
  [Screen.clinicianSchedule]: 'Schedule',
  [Screen.conversationStarters]: 'Starters',
  [Screen.betweenVisits]: 'Between Visits',
  [Screen.auditLog]: 'Audit Log',
  [Screen.practiceMode]: 'Practice Mode',
  [Screen.clinicianLegal]: 'Legal',
  [Screen.bulkActions]: 'Bulk Actions',
  [Screen.clinicianModuleLibrary]: 'Module Library',
  [Screen.evidenceHub]: 'Evidence',
  [Screen.clinicalNotes]: 'Notes',
};

const TAB_SECTIONS: Partial<Record<ScreenName, string>> = {
  [Screen.tabHome]: 'Home',
  [Screen.tabFitness]: 'Fitness',
  [Screen.tabAiInsights]: 'AI Insights',
  [Screen.tabAnalytics]: 'Analytics',
  [Screen.tabMore]: 'More',
};

const ONBOARDING_SCREENS = new Set<ScreenName>([
  Screen.breathWelcome,
  Screen.purposeSelection,
  Screen.goalSelection,
  Screen.assessmentPath,
  Screen.wellnessQuiz,
  Screen.buildingWellnessPlan,
  Screen.wellnessResults,
  Screen.quizCategoryDetail,
  Screen.onboardingMood,
  Screen.notificationPermissions,
  Screen.postQuizActionPlan,
  Screen.quickStartGuide,
  Screen.healthPermissions,
  Screen.emailVerification,
  Screen.introVideo,
]);

const AUTH_SCREENS = new Set<ScreenName>([
  Screen.signIn,
  Screen.createAccount,
  Screen.chooseRole,
]);

const LAUNCH_SCREENS = new Set<ScreenName>([Screen.welcome, Screen.breathWelcome]);

const CLINICIAN_SCREENS = new Set<ScreenName>([
  Screen.clinicianOnboarding,
  Screen.clinicianTabs,
  Screen.clinicianDashboard,
  Screen.patients,
  Screen.clinicianAnalytics,
  Screen.clinicianSettings,
  Screen.clinicianInbox,
  Screen.patientDetail,
  Screen.clinicianMessages,
  Screen.createCarePlan,
  Screen.fitnessRecommendations,
  Screen.addPatient,
  Screen.editClinicianProfile,
  Screen.clinicianHelp,
  Screen.messageTemplates,
  Screen.clinicianSchedule,
  Screen.conversationStarters,
  Screen.betweenVisits,
  Screen.auditLog,
  Screen.practiceMode,
  Screen.clinicianLegal,
  Screen.bulkActions,
  Screen.clinicianModuleLibrary,
  Screen.evidenceHub,
  Screen.clinicalNotes,
]);

export function resolveCsqSection(
  routePath: string[],
  context: { inPatientApp: boolean; inClinicianApp: boolean }
): string | null {
  for (const name of routePath) {
    const tabSection = TAB_SECTIONS[name as ScreenName];
    if (tabSection) return tabSection;
  }

  if (routePath.includes(Screen.authentication) || routePath.some((n) => AUTH_SCREENS.has(n as ScreenName))) {
    return 'Auth';
  }

  if (context.inClinicianApp || routePath.some((n) => CLINICIAN_SCREENS.has(n as ScreenName))) {
    return 'Clinician';
  }

  if (
    routePath.some((n) => ONBOARDING_SCREENS.has(n as ScreenName)) &&
    !context.inPatientApp
  ) {
    return 'Onboarding';
  }

  if (routePath.includes(Screen.subscriptionPaywall)) {
    return 'Subscription';
  }

  if (routePath.some((n) => LAUNCH_SCREENS.has(n as ScreenName))) {
    return 'Launch';
  }

  return null;
}

export function resolveCsqLeafName(routeName: string, section: string | null): string {
  const mapped = CSQ_LEAF_NAMES[routeName as ScreenName];
  if (mapped) return mapped;

  if (!section) return routeName;

  const prefix = `${section} `;
  if (routeName.startsWith(prefix)) {
    return routeName.slice(prefix.length);
  }

  return routeName;
}
