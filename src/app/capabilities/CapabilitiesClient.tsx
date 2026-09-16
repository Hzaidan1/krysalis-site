"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/Button";
import StaticBackground from "@/components/StaticBackground";

const SECTIONS = [
  {
    num: "01",
    title: "Video Production",
    body: "Original production from concept through delivery. We develop the creative approach, organise the shoot and produce the finished media around the needs of the project.",
    services: [
      "Concept development",
      "Treatments",
      "Pre-production",
      "Direction",
      "Cinematography",
      "Brand films",
      "Product content",
      "Social-first production",
      "Post-production",
    ],
  },
  {
    num: "02",
    title: "Post-Production",
    body: "We turn supplied footage into finished films and content — professional, action-camera, field or night-vision material alike.",
    services: [
      "Editing",
      "Sound design",
      "Colour treatment",
      "Motion graphics",
      "Captions",
      "Social cutdowns",
      "Platform formatting",
      "Existing campaign assets",
    ],
    link: "/post-production",
    ctaLabel: "More About Post-Production",
  },
  {
    num: "03",
    title: "Brand Content",
    body: "Original media built around brand identity — campaigns and product content designed to fit the brand, not just feature it.",
    services: [
      "Product films",
      "Campaign concepts",
      "Brand films",
      "Launch content",
      "Social reels",
      "Content series",
      "Collaborative productions",
    ],
  },
  {
    num: "04",
    title: "Tactical Production Support",
    body: "Specialist support in front of the lens as well as behind it. Practical assistance in building visual performance around tactical scenes.",
    services: [
      "Tactical-background performers",
      "Supporting artists",
      "Performer preparation",
      "Movement rehearsal for camera",
      "Kit familiarity",
      "Loadout preparation",
      "Equipment continuity",
      "Background action",
      "On-set creative support",
    ],
  },
  {
    num: "05",
    title: "Event & Field Coverage",
    body: "Media captured inside live events and field environments, alongside the action as it happens.",
    services: [
      "Event films",
      "Competition coverage",
      "Game-day coverage",
      "Launches",
      "Activations",
      "Behind-the-scenes",
      "Social deliverables",
    ],
  },
  {
    num: "06",
    title: "Creative Development",
    body: "Concepts, treatments and visual direction, developed before a camera is booked.",
    services: [
      "Creative concepts",
      "Treatments",
      "Campaign direction",
      "Visual references",
      "Shot structures",
      "Content planning",
      "Narrative development",
    ],
  },
];

const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function CapabilitiesClient() {
  return (
    <main className="min-h-screen w-full flex justify-center overflow-x-hidden px-4 sm:px-6 lg:px-10 pt-32 md:pt-36 pb-24 md:pb-32">
      <StaticBackground src="/images/work-bg-still.jpg" grayscale />
      <div className="relative z-10 w-full max-w-4xl">
        <PageHeader
          kicker="Capabilities"
          title="One Studio. Different Ways Into a Project."
          subtitle="Krysalis can build the complete production or contribute the part that's missing."
        />

        <div className="space-y-20 md:space-y-24">
          {SECTIONS.map((s) => (
            <motion.div
              key={s.num}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariants}
              className="border-t border-[var(--color-border)] pt-10"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="font-[family-name:var(--font-tactical-mono)] text-[var(--color-earth)] text-lg">
                  {s.num}
                </span>
                <h2 className="font-[family-name:var(--font-display)] uppercase tracking-wide text-2xl md:text-3xl">
                  {s.title}
                </h2>
              </div>
              <p className="font-[family-name:var(--font-body)] font-light tracking-wide text-[var(--color-text-dim)] text-sm md:text-base leading-relaxed max-w-2xl mb-8">
                {s.body}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 mb-6">
                {s.services.map((item) => (
                  <motion.div
                    key={item}
                    variants={itemVariants}
                    className="flex items-center gap-3 text-sm text-[var(--color-text-dim)]"
                  >
                    <span className="w-1 h-1 bg-[var(--color-earth-light)] shrink-0" />
                    <span className="font-[family-name:var(--font-tactical-mono)] tracking-wide">{item}</span>
                  </motion.div>
                ))}
              </div>
              {s.link && (
                <Link
                  href={s.link}
                  className="inline-block font-[family-name:var(--font-tactical-mono)] text-xs uppercase tracking-[0.12em] text-[var(--color-earth-light)] border-b border-[var(--color-earth-light)]/40 hover:border-[var(--color-earth-light)] transition-colors"
                >
                  {s.ctaLabel} &rarr;
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-24 pt-16 border-t border-[var(--color-border)] flex flex-col items-center text-center gap-3">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
            Don&apos;t See Your Project in a Box?
          </h2>
          <p className="font-[family-name:var(--font-body)] font-light tracking-wide text-[var(--color-text-dim)] mb-6">
            Good. Tell us what it needs.
          </p>
          <Button label="Start a Project" href="/contact" variant="solid" />
        </div>
      </div>
    </main>
  );
}
