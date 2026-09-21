// Shared between the contact form (client-side, so people get instant
// feedback) and the API route (server-side, so a malformed value can never
// slip through even if JS is disabled or something posts to the endpoint
// directly). One definition, both places import it, instead of two regexes
// that could quietly drift apart.
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}
