import type { Metadata } from "next";
import Link from "next/link";
import { getProjectBySlug, getNextProject } from "@/lib/projects";
import ProjectVideoPlayer from "@/components/ProjectVideoPlayer";
import TacticalBriefing from "@/components/TacticalBriefing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project Not Found | Krysalis Media" };
  }
  return {
    title: `${project.title} | Krysalis Media`,
    description: project.brief ?? `${project.serviceDeliverable} — Krysalis Media.`,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="font-[family-name:var(--font-body)] text-[var(--color-text-dim)]">
          Project not found.
        </p>
        <Link href="/work" className="hover:text-[var(--color-earth-light)] transition-colors">
          &larr; All Work
        </Link>
      </main>
    );
  }

  const nextProject = getNextProject(slug);

  return (
    <main className="min-h-screen overflow-x-hidden">
      {project.fullVideo ? (
        <ProjectVideoPlayer src={project.fullVideo} title={project.title} />
      ) : (
        <div className="h-[70vh] bg-[var(--color-bg-elevated)] border-b border-[var(--color-border)] flex items-center justify-center">
          <span className="font-[family-name:var(--font-tactical-mono)] text-xs uppercase tracking-[0.15em] text-[var(--color-text-dim)]">
            Opening image / embedded film placeholder
          </span>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-20 md:py-32">
        {/* Header tag, title block, and the full case-study copy (Brief /
            Role / Approach / Deliverables / Credits) all type out as one
            continuous sequence — see TacticalBriefing. Nav links (Next
            Project / Start a Project) are the final part of that sequence. */}
        <TacticalBriefing
          key={project.slug}
          project={project}
          nextHref={nextProject ? `/work/${nextProject.slug}` : undefined}
        />
      </div>
    </main>
  );
}
