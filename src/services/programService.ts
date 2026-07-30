import firestore from '@react-native-firebase/firestore';
import { differenceInCalendarDays, format, parseISO } from 'date-fns';
import { getCatalogProgram, PROGRAM_CATALOG } from '../data/programCatalog';
import { isFirebaseReady, NOOP_UNSUB } from './firebaseReady';
import { logFirestoreListenerError, snapshotDocs } from './firestoreHelpers';
import type { ActiveProgram, ProgramCatalogItem } from '../types';

function activeRef(uid: string, programId: string) {
  return firestore()
    .collection('users')
    .doc(uid)
    .collection('activePrograms')
    .doc(programId);
}

function mapActive(id: string, data: Record<string, unknown>): ActiveProgram {
  return { ...(data as ActiveProgram), id };
}

export const programService = {
  catalog: (): ProgramCatalogItem[] => PROGRAM_CATALOG,

  watchActivePrograms: (uid: string, cb: (programs: ActiveProgram[]) => void) => {
    if (!isFirebaseReady()) {
      cb([]);
      return NOOP_UNSUB;
    }
    return firestore()
      .collection('users')
      .doc(uid)
      .collection('activePrograms')
      .where('status', 'in', ['active', 'paused'])
      .onSnapshot(
        (snap) => {
          const programs = snapshotDocs(snap, (d) => mapActive(d.id, d.data()));
          cb(programs.sort((a, b) => b.startDate.localeCompare(a.startDate)));
        },
        (error) => logFirestoreListenerError('watchActivePrograms', error)
      );
  },

  getActivePrograms: async (uid: string): Promise<ActiveProgram[]> => {
    if (!isFirebaseReady()) return [];
    const snap = await firestore()
      .collection('users')
      .doc(uid)
      .collection('activePrograms')
      .where('status', 'in', ['active', 'paused'])
      .get();
    return snap.docs.map((d) => mapActive(d.id, d.data()));
  },

  startProgram: async (uid: string, catalogId: string): Promise<ActiveProgram> => {
    const catalog = getCatalogProgram(catalogId);
    if (!catalog) throw new Error('Program not found');

    const existing = await activeRef(uid, catalogId).get();
    if (existing.exists() && existing.data()?.status !== 'completed') {
      throw new Error('You already have this program active.');
    }

    const now = new Date().toISOString();
    const program: ActiveProgram = {
      id: catalogId,
      programId: catalogId,
      title: catalog.title,
      description: catalog.description,
      category: catalog.category,
      icon: catalog.icon,
      color: catalog.color,
      durationDays: catalog.durationDays,
      startDate: now,
      status: 'active',
      completedDays: 0,
    };

    await activeRef(uid, catalogId).set(program);
    return program;
  },

  completeToday: async (uid: string, programId: string): Promise<ActiveProgram> => {
    const ref = activeRef(uid, programId);
    const doc = await ref.get();
    if (!doc.exists()) throw new Error('Program not found');

    const program = mapActive(doc.id, doc.data()!);
    const today = format(new Date(), 'yyyy-MM-dd');
    if (program.lastSessionDate === today) return program;

    const completedDays = program.completedDays + 1;
    const isDone = completedDays >= program.durationDays;
    const next: ActiveProgram = {
      ...program,
      completedDays,
      lastSessionDate: today,
      status: isDone ? 'completed' : program.status,
    };

    if (isDone) {
      const batch = firestore().batch();
      batch.set(
        firestore().collection('users').doc(uid).collection('completedPrograms').doc(programId),
        { ...next, completedAt: new Date().toISOString() }
      );
      batch.delete(ref);
      await batch.commit();
    } else {
      await ref.set(next, { merge: true });
    }

    return next;
  },

  togglePause: async (uid: string, programId: string) => {
    const ref = activeRef(uid, programId);
    const doc = await ref.get();
    if (!doc.exists()) return;
    const program = mapActive(doc.id, doc.data()!);
    const status = program.status === 'paused' ? 'active' : 'paused';
    await ref.set({ status }, { merge: true });
  },

  getProgress: (program: ActiveProgram) => {
    const progress = Math.min(1, program.completedDays / program.durationDays);
    const daysLeft = Math.max(0, program.durationDays - program.completedDays);
    return { progress, daysLeft };
  },

  getDaysSinceStart: (program: ActiveProgram) =>
    differenceInCalendarDays(new Date(), parseISO(program.startDate)),
};
