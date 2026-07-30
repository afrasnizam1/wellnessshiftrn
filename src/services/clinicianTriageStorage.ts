import AsyncStorage from '@react-native-async-storage/async-storage';

const LOW_SCORE_KEY = '@wellnessshift/clinician_triage_low_score';
const INACTIVITY_KEY = '@wellnessshift/clinician_triage_inactivity_days';

export interface ClinicianTriageSettings {
  lowScoreThreshold: number;
  inactivityDays: number;
}

const DEFAULTS: ClinicianTriageSettings = {
  lowScoreThreshold: 5.0,
  inactivityDays: 7,
};

export const clinicianTriageStorage = {
  get: async (): Promise<ClinicianTriageSettings> => {
    const [lowRaw, inactivityRaw] = await Promise.all([
      AsyncStorage.getItem(LOW_SCORE_KEY),
      AsyncStorage.getItem(INACTIVITY_KEY),
    ]);

    const lowScoreThreshold = lowRaw != null ? parseFloat(lowRaw) : DEFAULTS.lowScoreThreshold;
    const inactivityDays = inactivityRaw != null ? parseInt(inactivityRaw, 10) : DEFAULTS.inactivityDays;

    return {
      lowScoreThreshold: Number.isFinite(lowScoreThreshold) ? lowScoreThreshold : DEFAULTS.lowScoreThreshold,
      inactivityDays: Number.isFinite(inactivityDays) ? inactivityDays : DEFAULTS.inactivityDays,
    };
  },

  save: async (settings: Partial<ClinicianTriageSettings>) => {
    const tasks: Promise<void>[] = [];
    if (settings.lowScoreThreshold != null) {
      tasks.push(AsyncStorage.setItem(LOW_SCORE_KEY, String(settings.lowScoreThreshold)));
    }
    if (settings.inactivityDays != null) {
      tasks.push(AsyncStorage.setItem(INACTIVITY_KEY, String(settings.inactivityDays)));
    }
    await Promise.all(tasks);
  },
};

export function patientNeedsAttention(
  score: number,
  lastActivityAt: string | undefined,
  settings: ClinicianTriageSettings
): boolean {
  if (score < settings.lowScoreThreshold) return true;
  if (!lastActivityAt) return false;
  const days =
    (Date.now() - new Date(lastActivityAt).getTime()) / (1000 * 60 * 60 * 24);
  return days >= settings.inactivityDays;
}
