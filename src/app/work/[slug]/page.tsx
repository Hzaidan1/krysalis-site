import Link from "next/link";
import { getProjectBySlug } from "@/lib/projects";
import ProjectVideoPlayer from "@/components/ProjectVideoPlayer";
import TacticalBriefing from "@/components/TacticalBriefing";

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

  return (
    <main className="min-h-screen">
      {project.fullVideo ? (
        <ProjectVideoPlayer src={project.fullVideo} title={project.title} />
      ) : (
        <div className="h-[70vh] bg-[var(--color-bg-elevated)] border-b border-[var(--color-border)] flex items-center justify-center">
          <span className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.15em] text-[var(--color-text-dim)]">
            Opening image / embedded film placeholder — [{slug}]
          </span>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 md:px-10 py-20 md:py-28">
        {/* Title, Client/Year/Category/Role, description, credits and the
            nav links below are all one continuous sequential typewriter
            sequence — see TacticalBriefing. */}
        <TacticalBriefing key={project.slug} project={project} />
      </div>
    </main>
  );
}
