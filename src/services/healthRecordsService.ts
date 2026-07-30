import AsyncStorage from '@react-native-async-storage/async-storage';

export type HealthRecordKind =
  | 'lab'
  | 'imaging'
  | 'letter'
  | 'prescription'
  | 'vaccination'
  | 'other';

export type HealthRecord = {
  id: string;
  title: string;
  kind: HealthRecordKind;
  notes?: string;
  /** Local file URI (photo / PDF picker). */
  fileUri: string;
  mimeType?: string;
  sharedWithClinician: boolean;
  createdAt: string;
  updatedAt: string;
};

function storageKey(uid: string) {
  return `health_records_v1_${uid}`;
}

export const healthRecordsService = {
  list: async (uid: string): Promise<HealthRecord[]> => {
    try {
      const raw = await AsyncStorage.getItem(storageKey(uid));
      if (!raw) return [];
      const parsed = JSON.parse(raw) as HealthRecord[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  add: async (
    uid: string,
    input: Omit<HealthRecord, 'id' | 'createdAt' | 'updatedAt' | 'sharedWithClinician'> & {
      sharedWithClinician?: boolean;
    },
  ): Promise<HealthRecord> => {
    const now = new Date().toISOString();
    const record: HealthRecord = {
      ...input,
      id: `hr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      sharedWithClinician: input.sharedWithClinician ?? false,
      createdAt: now,
      updatedAt: now,
    };
    const all = await healthRecordsService.list(uid);
    const next = [record, ...all].slice(0, 100);
    await AsyncStorage.setItem(storageKey(uid), JSON.stringify(next));
    return record;
  },

  setShared: async (uid: string, id: string, shared: boolean): Promise<HealthRecord[]> => {
    const all = await healthRecordsService.list(uid);
    const next = all.map((r) =>
      r.id === id
        ? { ...r, sharedWithClinician: shared, updatedAt: new Date().toISOString() }
        : r,
    );
    await AsyncStorage.setItem(storageKey(uid), JSON.stringify(next));
    return next;
  },

  remove: async (uid: string, id: string): Promise<void> => {
    const all = await healthRecordsService.list(uid);
    await AsyncStorage.setItem(
      storageKey(uid),
      JSON.stringify(all.filter((r) => r.id !== id)),
    );
  },

  sharedCount: async (uid: string): Promise<number> => {
    const all = await healthRecordsService.list(uid);
    return all.filter((r) => r.sharedWithClinician).length;
  },
};

export const HEALTH_RECORD_KIND_LABELS: Record<HealthRecordKind, string> = {
  lab: 'Lab results',
  imaging: 'Imaging / scan',
  letter: 'GP / clinic letter',
  prescription: 'Prescription',
  vaccination: 'Vaccination',
  other: 'Other record',
};
