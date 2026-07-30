export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
export type ReminderAnchor = 'morning' | 'afternoon' | 'evening';

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
}
