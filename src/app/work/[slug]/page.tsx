import Link from "next/link";
import { getProjectBySlug } from "@/lib/projects";
import ProjectVideoPlayer from "@/components/ProjectVideoPlayer";
import TacticalProjectDetails from "@/components/TacticalProjectDetails";

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
        <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl mb-12 leading-tight">
          {project.title}
        </h1>

        <TacticalProjectDetails key={project.slug} project={project} />

        <p className="font-[family-name:var(--font-body)] font-light tracking-wide text-[var(--color-text-dim)] leading-relaxed max-w-2xl mb-16">
          {project.description ??
            "[Short explanation of the concept — placeholder copy until real project details are supplied.]"}
        </p>

        {!project.fullVideo && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-[3/4] bg-[var(--color-bg-elevated)] border border-[var(--color-border)] flex items-center justify-center"
              >
                <span className="font-[family-name:var(--font-body)] text-[10px] text-[var(--color-text-dim)]">
                  Still {i}
                </span>
              </div>
            ))}
          </div>
        )}

        <p className="font-[family-name:var(--font-body)] text-xs text-[var(--color-text-dim)] mb-16">
          Credits: {project.credits ?? "[Directed / Filmed / Edited by — placeholder]"}
        </p>

        <div className="flex justify-between items-center pt-10 border-t border-[var(--color-border)] mb-20 font-[family-name:var(--font-body)] text-sm">
          <Link href="/work" className="hover:text-[var(--color-earth-light)] transition-colors">
            &larr; All Work
          </Link>
          <Link href="/contact" className="hover:text-[var(--color-earth-light)] transition-colors">
            Start a Project &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}
