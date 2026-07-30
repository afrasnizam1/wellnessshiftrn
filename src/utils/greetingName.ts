/** Placeholder names written when a real name was never collected. */
const PLACEHOLDER_NAMES = new Set([
  'user',
  'guest',
  'guest user',
  'patient',
  'there',
]);

/**
 * First name for greetings. Prefers displayName when it's real;
 * otherwise falls back to the email local-part.
 */
export function greetingName(
  user?: { displayName?: string | null; email?: string | null } | null,
): string {
  const raw = user?.displayName?.trim() ?? '';
  if (raw && !PLACEHOLDER_NAMES.has(raw.toLowerCase())) {
    return raw.split(/\s+/)[0];
  }
  const local = user?.email?.split('@')[0]?.trim();
  if (local) {
    // Capitalize first letter of email local-part for display
    return local.charAt(0).toUpperCase() + local.slice(1);
  }
  return 'there';
}
