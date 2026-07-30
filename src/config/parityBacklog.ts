/**
 * Prioritized native iOS → React Native parity backlog.
 * Status: done | in_progress | planned
 */

export type ParityPriority = 'high' | 'medium' | 'low';
export type ParityStatus = 'done' | 'in_progress' | 'planned';

export interface ParityItem {
  id: string;
  title: string;
  nativeRef: string;
  priority: ParityPriority;
  status: ParityStatus;
  notes?: string;
}

export const PARITY_BACKLOG: ParityItem[] = [
  // ─── Onboarding & assessment ─────────────────────────────────────────────
  {
    id: 'enhanced-wellness-results',
    title: 'Enhanced wellness results screen',
    nativeRef: 'EnhancedWellnessResultsView',
    priority: 'high',
    status: 'done',
    notes: 'Quiz → results with orbit, category breakdown, strengths/focus areas',
  },
  {
    id: 'quiz-results-detail',
    title: 'Per-category quiz answer breakdown',
    nativeRef: 'QuizResultsDetailView',
    priority: 'high',
    status: 'done',
  },
  {
    id: 'intro-video',
    title: 'Branded intro video onboarding',
    nativeRef: 'OnboardingView',
    priority: 'medium',
    status: 'done',
    notes: 'IntroVideoScreen uses appConfig.introVideoUrl with fallback',
  },

  // ─── Analytics ───────────────────────────────────────────────────────────
  {
    id: 'analytics-dashboard',
    title: 'Modern analytics dashboard',
    nativeRef: 'ModernAnalyticsDashboardView',
    priority: 'high',
    status: 'done',
    notes: 'Radar, trends, health charts, engagement, category explorer',
  },
  {
    id: 'category-detail',
    title: 'Category detail analytics',
    nativeRef: 'CategoryDetailView',
    priority: 'medium',
    status: 'done',
  },

  // ─── Fitness Hub ─────────────────────────────────────────────────────────
  {
    id: 'fitness-hub-modules',
    title: 'Full Fitness Hub module library (~70 modules)',
    nativeRef: 'FitnessHubView',
    priority: 'high',
    status: 'done',
    notes: '149 modules; explore categories; rich content; guided programs; calculators & meal planner complete',
  },

  // ─── AI & coaching ───────────────────────────────────────────────────────
  {
    id: 'ai-coach',
    title: 'Production AI health coach',
    nativeRef: 'AIHealthCoachView',
    priority: 'high',
    status: 'planned',
    notes: 'RN uses mock responses in ai.ts',
  },
  {
    id: 'ai-insights-feed',
    title: 'AI insights feed',
    nativeRef: 'AIInsightsView',
    priority: 'medium',
    status: 'done',
    notes: 'Pull-to-refresh, linked module CTAs, activity-aware insights',
  },

  // ─── Nutrition & premium ─────────────────────────────────────────────────
  {
    id: 'barcode-scanner',
    title: 'Barcode meal scanner',
    nativeRef: 'BarcodeScannerView',
    priority: 'high',
    status: 'planned',
    notes: 'Listed in PREMIUM_FEATURES; no UI yet',
  },
  {
    id: 'meal-planning',
    title: 'Meal planning',
    nativeRef: 'MealPlanningView',
    priority: 'high',
    status: 'done',
    notes: 'Weekly meal planner with calorie targets, swap meals, AsyncStorage persistence',
  },

  // ─── Care & clinician ────────────────────────────────────────────────────
  {
    id: 'my-care-hub',
    title: 'My Care hub',
    nativeRef: 'MyCareView',
    priority: 'medium',
    status: 'done',
    notes: 'MyCareHubScreen unifies care plan, messages, connect clinician',
  },
  {
    id: 'clinician-patient-dashboard',
    title: 'Clinician patient dashboard depth',
    nativeRef: 'ClinicianPatientDashboardView',
    priority: 'medium',
    status: 'done',
    notes: 'Category scores, engagement metrics, trends, fitness recs on PatientDetail',
  },
  {
    id: 'content-library',
    title: 'Comprehensive content library',
    nativeRef: 'ComprehensiveContentLibraryView',
    priority: 'medium',
    status: 'done',
    notes: 'Searchable library across guides, education, programs',
  },

  // ─── Coaching (item 10) ────────────────────────────────────────────────────
  {
    id: 'coaching-booking',
    title: 'Coaching booking flow',
    nativeRef: 'CoachingBookingView',
    priority: 'medium',
    status: 'done',
    notes: 'Specialty/format filters, in-app booking modal, upcoming sessions',
  },

  // ─── Infrastructure ──────────────────────────────────────────────────────
  {
    id: 'firebase-production',
    title: 'Production Firebase configuration',
    nativeRef: 'Firebase',
    priority: 'high',
    status: 'planned',
    notes: 'isFirebaseConfigured: false in appConfig; demo mode active',
  },
];

export function parityByPriority(priority: ParityPriority): ParityItem[] {
  return PARITY_BACKLOG.filter((item) => item.priority === priority);
}

export function parityByStatus(status: ParityStatus): ParityItem[] {
  return PARITY_BACKLOG.filter((item) => item.status === status);
}
