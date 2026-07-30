import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

let settingsApplied = false;

/** Call once at app start when Firebase is configured. */
export function ensureFirestoreSettings(): void {
  if (settingsApplied) return;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const firestore = require('@react-native-firebase/firestore').default;
    firestore().settings({ ignoreUndefinedProperties: true });
    settingsApplied = true;
  } catch (e) {
    console.warn('Firestore settings failed:', e);
  }
}

export function logFirestoreListenerError(label: string, error: Error): void {
  console.warn(`Firestore listener (${label}) failed:`, error);
}

export function snapshotDocs<T>(
  snap: FirebaseFirestoreTypes.QuerySnapshot | null | undefined,
  map: (doc: FirebaseFirestoreTypes.QueryDocumentSnapshot) => T
): T[] {
  if (!snap?.docs) return [];
  return snap.docs.map(map);
}
