export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
export type ReminderAnchor = 'morning' | 'afternoon' | 'evening';

/** High-level reason for using the app — set before goal selection. */
export type AppPurpose =
  | 'wellness_score'
  | 'learn'
  | 'fitness'
  | 'clinician'
  | 'all';

/**
 * Clear eligibility for clinician linking — patients with a health concern
 * who have been referred by their GP (invite code required).
 */
export const CLINICIAN_CONNECT_ELIGIBILITY =
  'Clinician connection is only for patients who have a health issue and whose GP has referred them to a clinician on Wellness Shift. You will need the invite code they give you.';

export const CLINICIAN_CONNECT_SHORT =
  'Only if your GP referred you for a health issue — invite code required';

export const APP_PURPOSE_OPTIONS: {
  id: AppPurpose;
  title: string;
  subtitle: string;
  icon: string;
}[] = [
  {
    id: 'wellness_score',
    title: 'Track and improve my wellness score',
    subtitle: 'One score that rises as sleep, mood, fitness, and nutrition improve',
    icon: 'analytics-outline',
  },
  {
    id: 'learn',
    title: 'Learn about health, food, and fitness',
    subtitle: 'Guides, anatomy, nutrition, and practical education',
    icon: 'book-outline',
  },
  {
    id: 'fitness',
    title: 'Build a workout or fitness routine',
    subtitle: 'Training plans, habits, and movement that stick',
    icon: 'barbell-outline',
  },
  {
    id: 'clinician',
    title: 'Connect with a clinician (GP referral)',
    subtitle: CLINICIAN_CONNECT_SHORT,
    icon: 'medkit-outline',
  },
  {
    id: 'all',
    title: 'All of the above',
    subtitle: 'Score, learning, fitness — plus clinician link only if your GP referred you',
    icon: 'apps-outline',
  },
];

export const REMINDER_ANCHOR_HOURS: Record<ReminderAnchor, { hour: number; minute: number }> = {
  morning: { hour: 8, minute: 0 },
  afternoon: { hour: 13, minute: 0 },
  evening: { hour: 18, minute: 0 },
};

export interface OnboardingPreferences {
  experienceLevel?: ExperienceLevel;
  trainingDaysPerWeek?: number;
  reminderAnchor?: ReminderAnchor;
  hasHomeEquipment?: boolean;
  dateOfBirth?: string;
  heightCm?: number;
  weightKg?: number;
  appPurpose?: AppPurpose;
  appPurposes?: AppPurpose[];
}

/** Pick the Home lead purpose from a multi-select. */
export function resolveLeadPurpose(purposes: AppPurpose[]): AppPurpose | null {
  if (purposes.length === 0) return null;
  if (purposes.includes('all') || purposes.length >= 3) return 'all';
  if (purposes.includes('clinician')) return 'clinician';
  return purposes[0];
}
