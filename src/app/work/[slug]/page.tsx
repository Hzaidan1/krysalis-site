import Link from "next/link";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="min-h-screen">
      {/* opening image/film placeholder */}
      <div className="h-[70vh] bg-[var(--color-bg-elevated)] border-b border-[var(--color-border)] flex items-center justify-center">
        <span className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.15em] text-[var(--color-text-dim)]">
          Opening image / embedded film placeholder — [{slug}]
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl mb-6">
          [Project Title]
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 pb-10 border-b border-[var(--color-border)] font-[family-name:var(--font-body)] text-sm">
          <div>
            <p className="text-[var(--color-earth-light)] uppercase text-xs tracking-[0.1em] mb-1">
              Client
            </p>
            <p className="text-[var(--color-text-dim)]">[Client / Independent Concept]</p>
          </div>
          <div>
            <p className="text-[var(--color-earth-light)] uppercase text-xs tracking-[0.1em] mb-1">
              Year &amp; Location
            </p>
            <p className="text-[var(--color-text-dim)]">[Year], [Location]</p>
          </div>
          <div>
            <p className="text-[var(--color-earth-light)] uppercase text-xs tracking-[0.1em] mb-1">
              Category
            </p>
            <p className="text-[var(--color-text-dim)]">[Category]</p>
          </div>
          <div>
            <p className="text-[var(--color-earth-light)] uppercase text-xs tracking-[0.1em] mb-1">
              My Role
            </p>
            <p className="text-[var(--color-text-dim)]">[Role]</p>
          </div>
        </div>

        <p className="font-[family-name:var(--font-body)] font-light tracking-wide text-[var(--color-text-dim)] leading-relaxed max-w-2xl mb-16">
          [Short explanation of the concept — placeholder copy until real
          project details are supplied.]
        </p>

        {/* production stills placeholder grid */}
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

        <p className="font-[family-name:var(--font-body)] text-xs text-[var(--color-text-dim)] mb-16">
          Credits: [Directed / Filmed / Edited by — placeholder]
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
