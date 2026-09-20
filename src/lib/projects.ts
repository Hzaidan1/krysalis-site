export type FilterCategory = "Production" | "Post" | "Brand" | "Event";

export type Project = {
  slug: string;
  /** Client / collaborator name. */
  client: string;
  /** Project name. */
  title: string;
  /** Short "Service — Deliverable" tag, e.g. "Brand Content — Product Film". */
  serviceDeliverable: string;
  /** Drives the ALL / PRODUCTION / POST / BRAND / EVENT filter on /work. */
  filterCategory: FilterCategory;
  /** Display category for the "[CATEGORY] / [YEAR]" header tag on the
   * detail page, e.g. "Field Film". */
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

// Data now lives in Sanity (see /studio) rather than hardcoded here — these
// re-exports keep the existing import path (@/lib/projects) working for
// every page that reads project data, so nothing else needs to change.
export { getAllProjects, getProjectBySlug, getNextProject } from "@/sanity/client";
