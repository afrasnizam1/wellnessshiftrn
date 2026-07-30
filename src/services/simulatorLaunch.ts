import { Platform, Settings } from 'react-native';

type Listener = () => void;

let deferredAccept: (() => Promise<void>) | null = null;
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((listener) => listener());
}

/** iOS Simulator / Android Emulator — set from native on iOS via WS_IS_SIMULATOR. */
export function isSimulatorOrEmulator(): boolean {
  if (Platform.OS === 'ios') {
    try {
      const flag = Settings.get('WS_IS_SIMULATOR');
      return flag === true || flag === 1 || flag === '1';
    } catch {
      return false;
    }
  }

  if (Platform.OS === 'android') {
    const constants = Platform.constants as {
      Brand?: string;
      Model?: string;
      Fingerprint?: string;
      Manufacturer?: string;
    };
    const fingerprint = (constants.Fingerprint ?? '').toLowerCase();
    const model = (constants.Model ?? '').toLowerCase();
    const brand = (constants.Brand ?? '').toLowerCase();
    const manufacturer = (constants.Manufacturer ?? '').toLowerCase();
    return (
      fingerprint.includes('generic') ||
      fingerprint.includes('emulator') ||
      model.includes('emulator') ||
      model.includes('android sdk') ||
      model.includes('sdk_gphone') ||
      brand === 'generic' ||
      manufacturer.includes('genymotion')
    );
  }

  return false;
}

export function setDeferredSimulatorSession(accept: () => Promise<void>): void {
  deferredAccept = accept;
  emit();
}

export function clearDeferredSimulatorSession(): void {
  deferredAccept = null;
  emit();
}

export function hasDeferredSimulatorSession(): boolean {
  return deferredAccept != null;
}

export function subscribeDeferredSimulatorSession(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export async function continueDeferredSimulatorSession(): Promise<boolean> {
  const accept = deferredAccept;
  if (!accept) return false;
  clearDeferredSimulatorSession();
  await accept();
  return true;
}
