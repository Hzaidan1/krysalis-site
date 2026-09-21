import { createClient, type SanityClient } from "@sanity/client";
import type { FilterCategory, Project } from "@/lib/projects";
import { nextIndexInSequence } from "@/lib/sequence";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Sanity's own createClient() throws immediately if projectId is empty —
// and since that call used to run at module-load time, just importing this
// file (even for types) crashed every page before real credentials existed.
// Created lazily instead, only once real config is present.
let _client: SanityClient | null = null;
function getClient(): SanityClient | null {
  if (!projectId) return null;
  if (!_client) {
    _client = createClient({ projectId, dataset, apiVersion: "2024-01-01", useCdn: true });
  }
  return _client;
}

// Fill in NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET as
// env vars once you create a free project at sanity.io — see the setup
// steps for exactly where to get each value. Exported for anywhere else
// that needs direct client access (e.g. image URL building later).
export const client = getClient();

const PROJECT_FIELDS = `
  "slug": slug.current,
  client,
  title,
  serviceDeliverable,
  filterCategory,
  category,
  year,
  location,
  brief,
  role,
  approach,
  deliverables,
  credits,
  "previewVideo": previewVideo.asset->url,
  "fullVideo": fullVideo.asset->url,
  order
`;

type SanityProject = Omit<Project, "filterCategory"> & { filterCategory: string };

function normalize(doc: SanityProject): Project {
  return { ...doc, filterCategory: doc.filterCategory as FilterCategory };
}

export async function getAllProjects(): Promise<Project[]> {
  if (!client) return [];
  const docs = await client.fetch<SanityProject[]>(
    `*[_type == "project"] | order(coalesce(order, 999) asc, year desc){${PROJECT_FIELDS}}`
  );
  return docs.map(normalize);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (!client) return undefined;
  const doc = await client.fetch<SanityProject | null>(
    `*[_type == "project" && slug.current == $slug][0]{${PROJECT_FIELDS}}`,
    { slug }
  );
  return doc ? normalize(doc) : undefined;
}

export async function getNextProject(slug: string): Promise<Project | undefined> {
  const all = await getAllProjects();
  const slugs = all.map((p) => p.slug);
  const nextIndex = nextIndexInSequence(slug, slugs);
  return nextIndex === -1 ? undefined : all[nextIndex];
}
