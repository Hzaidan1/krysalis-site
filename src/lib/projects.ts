export type FilterCategory = "Production" | "Post" | "Brand" | "Event";

export type Project = {
  slug: string;
  /** Client / collaborator name. "[Client]" until a real name is confirmed
   * — never invent one, even one that sounds plausible. */
  client: string;
  /** Project name. "[Project Name]" until confirmed. */
  title: string;
  /** Short "Service — Deliverable" tag, e.g. "Brand Content — Product Film".
   * "[Service — Deliverable]" until confirmed. */
  serviceDeliverable: string;
  /** Drives the ALL / PRODUCTION / POST / BRAND / EVENT filter on /work.
   * This is a structural/taxonomic guess based on the footage itself, not a
   * claim about the client — kept functional rather than bracketed so the
   * filter actually works, but still a best guess pending confirmation. */
  filterCategory: FilterCategory;
  /** Display category for the "[CATEGORY] / [YEAR]" header tag on the
   * detail page, e.g. "Field Film". Same caveat as filterCategory. */
  category: string;
  year: string;
  location?: string;
  /** THE BRIEF — 2-3 sentences on the objective. */
  brief?: string;
  /** OUR ROLE — specific deliverables, e.g. "Concept Development / Direction
   * / Filming / Editing / Sound Design" or "Post-Production / Supplied
   * Footage". */
  role?: string;
  /** THE APPROACH — a short paragraph on creative direction/pacing/visual
   * decisions. */
  approach?: string;
  /** DELIVERABLES — itemized list, e.g. ["1x Hero Film", "3x Social
   * Cutdowns", "Vertical Delivery"]. */
  deliverables?: string[];
  /** CREDITS — verified, real credits only. */
  credits?: string;
  /** Muted, looping, 16:9-cropped clip for the grid card preview. */
  previewVideo?: string;
  /** Full clip with sound for the project detail page. */
  fullVideo?: string;
};

// Video 1-4 map to these four slots in upload order. None of the four have
// confirmed real client/project identities yet — per instruction, nothing
// here is invented (no "Operation First Light"-style placeholder-that-reads-
// as-real). Everything that would assert a specific client, project name or
// exact deliverable stays literally bracketed until the real mapping is
// supplied. filterCategory/category are the one exception: they're a
// structural best guess from the footage itself (needed for the /work
// filter to function), not a claim about who the client is.
export const PROJECTS: Project[] = [
  {
    slug: "project-01",
    client: "[Client]",
    title: "[Project Name]",
    serviceDeliverable: "[Service — Deliverable]",
    filterCategory: "Production",
    category: "Field Film",
    year: "2026",
    previewVideo: "/videos/work/video-1-preview.mp4",
    fullVideo: "/videos/work/video-1-full.mp4",
  },
  {
    slug: "project-02",
    client: "[Client]",
    title: "[Project Name]",
    serviceDeliverable: "[Service — Deliverable]",
    filterCategory: "Post",
    category: "Brand Film",
    year: "2026",
    previewVideo: "/videos/work/video-2-preview.mp4",
    fullVideo: "/videos/work/video-2-full.mp4",
  },
  {
    slug: "project-03",
    client: "[Client]",
    title: "[Project Name]",
    serviceDeliverable: "[Service — Deliverable]",
    filterCategory: "Production",
    category: "Field Film",
    year: "2026",
    previewVideo: "/videos/work/video-3-preview.mp4",
    fullVideo: "/videos/work/video-3-full.mp4",
  },
  {
    slug: "project-04",
    client: "[Client]",
    title: "[Project Name]",
    serviceDeliverable: "[Service — Deliverable]",
    filterCategory: "Event",
    category: "Event Coverage",
    year: "2025",
    previewVideo: "/videos/work/video-4-preview.mp4",
    fullVideo: "/videos/work/video-4-full.mp4",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/** Returns the next project in sequence, wrapping around to the first. */
export function getNextProject(slug: string): Project | undefined {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  if (i === -1) return undefined;
  return PROJECTS[(i + 1) % PROJECTS.length];
}
