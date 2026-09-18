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
    body: "Original production from concept through delivery.",
    keywords: ["Concept Development", "Pre-Production", "Direction", "Cinematography", "Post"],
  },
  {
    num: "02",
    title: "Post-Production",
    body: "Supplied footage turned into finished films and content.",
    keywords: ["Editing", "Sound Design", "Colour", "Motion Graphics", "Social Cutdowns"],
    link: "/post-production",
    ctaLabel: "More About Post-Production",
  },
  {
    num: "03",
    title: "Brand Content",
    body: "Original media built around brand identity, not just featuring it.",
    keywords: ["Campaigns", "Product Films", "Launch Content", "Social Reels", "Content Series"],
  },
  {
    num: "04",
    title: "Tactical Production Support",
    body: "Specialist support in front of the lens as well as behind it.",
    keywords: [
      "Supporting Artists",
      "Performer Preparation",
      "Movement Rehearsal",
      "Kit & Loadout",
      "On-Set Support",
    ],
  },
  {
    num: "05",
    title: "Event & Field Coverage",
    body: "Media captured inside live events and field environments.",
    keywords: ["Event Films", "Competition Coverage", "Launches", "Activations", "Behind-the-Scenes"],
  },
  {
    num: "06",
    title: "Creative Development",
    body: "Concepts and direction developed before a camera is booked.",
    keywords: ["Creative Concepts", "Treatments", "Campaign Direction", "Visual References", "Shot Structures"],
  },
];

const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function CapabilitiesClient() {
  return (
    <main className="min-h-screen w-full flex justify-center overflow-x-hidden px-4 sm:px-6 lg:px-10 pt-32 md:pt-36 pb-24 md:pb-40">
      <StaticBackground src="/images/work-bg-still.jpg" grayscale />
      <div className="relative z-10 w-full max-w-4xl">
        <PageHeader
          kicker="Capabilities"
          title="One Studio. Different Ways Into a Project."
          subtitle="Krysalis can build the complete production or contribute the part that's missing."
        />

        <div className="space-y-16 md:space-y-20">
          {SECTIONS.map((s) => (
            <motion.div
              key={s.num}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariants}
            >
              <motion.div variants={itemVariants} className="flex items-baseline gap-4 mb-3">
                <span className="font-[family-name:var(--font-tactical-mono)] text-[var(--color-earth)] text-sm">
                  {s.num}
                </span>
                <h2 className="font-[family-name:var(--font-display)] uppercase tracking-wide text-[22px] md:text-[26px]">
                  {s.title}
                </h2>
              </motion.div>
              <motion.p
                variants={itemVariants}
                className="font-[family-name:var(--font-body)] font-light tracking-wide text-[var(--color-text-dim)] text-[16px] sm:text-[17px] leading-[1.6] max-w-[50ch] mb-3"
              >
                {s.body}
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="font-[family-name:var(--font-tactical-mono)] text-xs sm:text-sm tracking-[0.06em] text-[var(--color-earth-light)]/80"
              >
                {s.keywords.join(" \u00b7 ")}
              </motion.p>
              {s.link && (
                <motion.div variants={itemVariants}>
                  <Link
                    href={s.link}
                    className="inline-block font-[family-name:var(--font-tactical-mono)] text-xs uppercase tracking-[0.12em] text-[var(--color-earth-light)] border-b border-[var(--color-earth-light)]/40 hover:border-[var(--color-earth-light)] transition-colors mt-4"
                  >
                    {s.ctaLabel} &rarr;
                  </Link>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-24 md:mt-32 flex flex-col items-center text-center gap-3">
          <h2 className="font-[family-name:var(--font-display)] uppercase tracking-wide text-[24px] sm:text-[30px]">
            Don&apos;t See Your Project in a Box?
          </h2>
          <p className="font-[family-name:var(--font-body)] font-light tracking-wide text-[var(--color-text-dim)] text-[16px] mb-6">
            Good. Tell us what it needs.
          </p>
          <Button label="Start a Project" href="/contact" variant="solid" />
        </div>
      </div>
    </main>
  );
}
