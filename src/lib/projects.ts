export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  location?: string;
  role?: string;
  description?: string;
  credits?: string;
  /** Muted, looping, 16:9-cropped clip for the grid card preview. */
  previewVideo?: string;
  /** Full clip with sound for the project detail page. */
  fullVideo?: string;
};

// Video 1\u20134 map to these four projects in upload order \u2014 swap slug/title/
// client/category/year/description/credits per project once real details
// come in. Re-order the video paths below if a video actually belongs to a
// different project than this default guess.
export const PROJECTS: Project[] = [
  {
    slug: "operation-first-light",
    title: "Operation First Light",
    client: "Independent Concept",
    category: "Field Film",
    year: "2026",
    previewVideo: "/videos/work/video-1-preview.mp4",
    fullVideo: "/videos/work/video-1-full.mp4",
  },
  {
    slug: "brand-film-placeholder",
    title: "[Client Name] \u2014 Brand Film",
    client: "[Client Name]",
    category: "Brand Film",
    year: "2026",
    previewVideo: "/videos/work/video-2-preview.mp4",
    fullVideo: "/videos/work/video-2-full.mp4",
  },
  {
    slug: "event-coverage-placeholder",
    title: "[Event Name] \u2014 Event Coverage",
    client: "[Event/Organiser]",
    category: "Event Coverage",
    year: "2026",
    previewVideo: "/videos/work/video-3-preview.mp4",
    fullVideo: "/videos/work/video-3-full.mp4",
  },
  {
    slug: "product-visuals-placeholder",
    title: "[Client Name] \u2014 Product Visuals",
    client: "[Client Name]",
    category: "Product Visuals",
    year: "2025",
    previewVideo: "/videos/work/video-4-preview.mp4",
    fullVideo: "/videos/work/video-4-full.mp4",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
