/** Placeholder names written when a real name was never collected. */
const PLACEHOLDER_NAMES = new Set([
  'user',
  'guest',
  'guest user',
  'patient',
  'there',
  'clinician',
]);

export function isPlaceholderName(name?: string | null): boolean {
  const raw = name?.trim() ?? '';
  return !raw || PLACEHOLDER_NAMES.has(raw.toLowerCase());
}

function emailLocalPart(email?: string | null): string | null {
  const local = email?.split('@')[0]?.trim();
  if (!local) return null;
  return local.charAt(0).toUpperCase() + local.slice(1);
}

/**
 * Full display name for UI. Prefers a real displayName;
 * otherwise falls back to the email local-part — never hardcodes "User"
 * when an email is available.
 */
export function resolveDisplayName(
  user?: { displayName?: string | null; email?: string | null; name?: string | null } | null,
  fallback = 'Patient',
): string {
  const candidates = [user?.displayName, user?.name];
  for (const c of candidates) {
    const raw = c?.trim() ?? '';
    if (raw && !isPlaceholderName(raw)) return raw;
  }
  return emailLocalPart(user?.email) ?? fallback;
}

/**
 * First name for greetings. Prefers displayName when it's real;
 * otherwise falls back to the email local-part.
 */
export function greetingName(
  user?: { displayName?: string | null; email?: string | null } | null,
): string {
  const full = resolveDisplayName(user, 'there');
  if (full === 'there') return full;
  return full.split(/\s+/)[0];
}

/** Initials for avatars from a resolved display name. */
export function initialsFromName(name: string, max = 2): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  return parts
    .slice(0, max)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}
