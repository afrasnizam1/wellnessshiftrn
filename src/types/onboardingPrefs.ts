export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
export type ReminderAnchor = 'morning' | 'afternoon' | 'evening';

/** High-level reason for using the app — set before goal selection. */
export type AppPurpose =
  | 'wellness_score'
  | 'learn'
  | 'fitness'
  | 'clinician'
  | 'all';

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
    title: 'Connect with a clinician about something specific',
    subtitle: 'Link your doctor or care team for plans, messaging, and check-ins',
    icon: 'medkit-outline',
  },
  {
    id: 'all',
    title: 'All of the above',
    subtitle: 'Score, learning, fitness, and clinician support — the full picture',
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
