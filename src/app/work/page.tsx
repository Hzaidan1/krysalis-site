import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import WorkPageClient from "./WorkPageClient";

export const metadata: Metadata = {
  title: "Selected Work | Krysalis Media",
  description:
    "Original productions, commissioned work, brand collaborations and post-production — with our role clearly defined on every project.",
};

export default async function WorkPage() {
  const projects = await getAllProjects();
  return <WorkPageClient projects={projects} />;
}
