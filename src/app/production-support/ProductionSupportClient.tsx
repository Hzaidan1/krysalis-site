"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/Button";
import StaticBackground from "@/components/StaticBackground";

const PILLARS = [
  {
    title: "Supporting Artists & Performers",
    body: "Access to people comfortable wearing and moving in tactical equipment, reducing basic familiarisation time on set.",
  },
  {
    title: "Performance Preparation",
    body: "Rehearsing movement, equipment interaction, and background action specifically for camera composition.",
  },
  {
    title: "Kit & Loadout Support",
    body: "Sourcing, assembling, and visually preparing authentic, context-appropriate equipment.",
  },
  {
    title: "Continuity & Visual Support",
    body: "Maintaining equipment placement, loadout accuracy, and visual details between takes.",
  },
  {
    title: "On-Set Support",
    body: "Practical visual oversight working alongside the director, AD team, and department heads.",
  },
];

const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function ProductionSupportClient() {
  return (
    <main className="min-h-screen w-full flex justify-center px-6 md:px-10 pt-36 pb-32">
      <StaticBackground src="/images/work-bg-still.jpg" grayscale />
      <div className="relative z-10 w-full max-w-3xl">
        <PageHeader
          kicker="Tactical Production Support"
          title="Helping Build What Happens in Front of the Camera."
          subtitle="Krysalis grew inside the tactical space before becoming a production studio. That familiarity gives us a useful role when a production needs more than somebody operating the camera. For film, television, commercial and creative productions, we can support the visual and practical preparation of tactical scenes — from finding suitable supporting artists to helping performers become comfortable with the kit, movement and environment required for the shot."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="mb-20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
            {PILLARS.map((p, i) => (
              <motion.div key={p.title} variants={itemVariants}>
                <span className="font-[family-name:var(--font-display)] text-[var(--color-earth-light)] text-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-[family-name:var(--font-display)] uppercase tracking-wide text-lg md:text-xl mt-2 mb-2">
                  {p.title}
                </h3>
                <p className="font-[family-name:var(--font-body)] font-light tracking-wide text-sm text-[var(--color-text-dim)] leading-relaxed">
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="border-t border-[var(--color-border)] pt-10 mb-20">
          <p className="font-[family-name:var(--font-body)] font-light tracking-wide text-xs text-[var(--color-text-dim)] leading-relaxed max-w-2xl">
            Authenticity and safety sometimes require disciplines outside our
            scope. Where a production requires military technical advice,
            armoury services, specialist weapons instruction, stunt
            coordination or another regulated/specialist role, Krysalis works
            alongside the production&apos;s appropriately qualified
            professionals.
          </p>
        </div>

        <div className="flex flex-col items-center text-center gap-6">
          <Button label="Discuss Production Support" href="/contact" variant="solid" />
        </div>
      </div>
    </main>
  );
}
