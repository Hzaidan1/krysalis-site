/**
 * The actual "which one comes next, wrapping back to the start" logic,
 * pulled out as a pure function so it's testable without needing a live
 * data connection — getNextProject (in sanity/client.ts) just fetches the
 * real list and calls this. Returns -1 if the current item isn't found.
 */
export function nextIndexInSequence(currentSlug: string, slugs: string[]): number {
  const i = slugs.indexOf(currentSlug);
  if (i === -1 || slugs.length === 0) return -1;
  return (i + 1) % slugs.length;
}
