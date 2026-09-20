import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import WorkPageClient from "./WorkPageClient";

// Without this, Next.js would cache this page at build/deploy time and new
// projects added in Sanity wouldn't show up until the next redeploy — the
// whole point of the CMS is that they show up on their own. Re-checks
// Sanity for fresh data at most once a minute.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Selected Work | Krysalis Media",
  description:
    "Original productions, commissioned work, brand collaborations and post-production — with our role clearly defined on every project.",
};

export default async function WorkPage() {
  const projects = await getAllProjects();
  return <WorkPageClient projects={projects} />;
}
