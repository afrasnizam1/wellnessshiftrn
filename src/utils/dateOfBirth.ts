/** Date of birth display/input format for the app UI. */
export const DOB_PLACEHOLDER = 'DD-MM-YYYY';

/**
 * Parse a DOB string. Accepts DD-MM-YYYY (preferred) and legacy YYYY-MM-DD.
 */
export function parseDateOfBirth(value: string): Date | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  let day: number;
  let month: number;
  let year: number;

  const dmy = /^(\d{2})-(\d{2})-(\d{4})$/.exec(trimmed);
  const ymd = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);

  if (dmy) {
    day = Number(dmy[1]);
    month = Number(dmy[2]);
    year = Number(dmy[3]);
  } else if (ymd) {
    year = Number(ymd[1]);
    month = Number(ymd[2]);
    day = Number(ymd[3]);
  } else {
    return null;
  }

  const date = new Date(year, month - 1, day);
  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

export function ageFromDateOfBirth(dob: Date, today = new Date()): number {
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age -= 1;
  }
  return age;
}

/** Format a Date as DD-MM-YYYY for display/input. */
export function formatDateOfBirthDisplay(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  return `${day}-${month}-${year}`;
}

/** Canonical storage form (ISO date) for profiles / Firestore. */
export function toStoredDateOfBirth(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  return `${year}-${month}-${day}`;
}

/** Show a stored DOB (ISO or DD-MM-YYYY) as DD-MM-YYYY in the UI. */
export function toDateOfBirthInputValue(stored: string | null | undefined): string {
  if (!stored?.trim()) return '';
  const date = parseDateOfBirth(stored);
  return date ? formatDateOfBirthDisplay(date) : stored.trim();
}

/**
 * Light input helper: keep digits and auto-insert dashes as DD-MM-YYYY.
 * Allows up to 8 digits (DDMMYYYY).
 */
export function maskDateOfBirthInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`;
}
