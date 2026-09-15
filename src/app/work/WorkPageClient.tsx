"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/Button";
import StaticBackground from "@/components/StaticBackground";
import { PROJECTS, type Project, type FilterCategory } from "@/lib/projects";

const FILTERS = ["All", "Production", "Post", "Brand", "Event"] as const;
type Filter = (typeof FILTERS)[number];

function matchesFilter(project: Project, filter: Filter) {
  if (filter === "All") return true;
  return project.filterCategory === (filter as FilterCategory);
}

export default function WorkPageClient() {
  const [filter, setFilter] = useState<Filter>("All");

  return (
    <main className="min-h-screen w-full flex justify-center px-6 md:px-10 pt-36 pb-32">
      <StaticBackground src="/images/work-bg-still.jpg" grayscale={false} />
      <div className="relative z-10 w-full max-w-5xl">
        <PageHeader
          kicker="Selected Work"
          title="Projects, Collaborations & Commissions."
          subtitle="Original productions, commissioned work, brand collaborations and post-production — with our role clearly defined on every project."
        />

        <div className="flex flex-wrap gap-3 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.16em] px-4 py-2 border transition-colors duration-300 ${
                filter === f
                  ? "border-[var(--color-earth-light)] text-[var(--color-earth-light)] bg-[var(--color-earth-light)]/10"
                  : "border-[var(--color-border)] text-[var(--color-text-dim)] hover:border-[var(--color-earth-light)]/50 hover:text-[var(--color-text)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {PROJECTS.filter((p) => matchesFilter(p, filter)).map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link
                  href={`/work/${p.slug}`}
                  className="group block border border-[var(--color-border)] hover:border-[var(--color-earth-light)]/50 transition-colors duration-300"
                >
                  <div className="relative aspect-video bg-[var(--color-bg-elevated)] overflow-hidden flex items-center justify-center">
                    {p.previewVideo ? (
                      <video
                        src={p.previewVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <>
                        <div className="placeholder-texture absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]" />
                        <span className="relative font-[family-name:var(--font-body)] text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-dim)] transition-opacity duration-300 group-hover:opacity-0">
                          Thumbnail placeholder
                        </span>
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <span className="font-[family-name:var(--font-display)] text-xs tracking-[0.28em] uppercase border border-[var(--color-earth-light)]/60 text-[var(--color-earth-light)] px-4 py-2 bg-[var(--color-bg)]/70 backdrop-blur-sm">
                        View Project &rarr;
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-7">
                    <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl mb-2 flex items-center gap-2 group-hover:text-[var(--color-earth-light)] transition-colors">
                      {p.client} / {p.title}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:translate-x-1 transform">
                        &rarr;
                      </span>
                    </h3>
                    <p className="font-[family-name:var(--font-body)] font-light tracking-wide text-sm text-[var(--color-text-dim)]">
                      {p.serviceDeliverable}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-24 pt-16 border-t border-[var(--color-border)] flex flex-col items-center text-center gap-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
            Have a story worth telling?
          </h2>
          <Button label="Start a Project" href="/contact" variant="solid" />
        </div>
      </div>
    </main>
  );
}
