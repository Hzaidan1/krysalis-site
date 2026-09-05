"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/Button";
import ReactiveBackground from "@/components/ReactiveBackground";

// Evenly spaced so the auto-advance cadence feels consistent.
const BG_FRAMES = [0.5, 3, 5.5, 8];

const CAPABILITIES = [
  "Short-form reels",
  "Product launches",
  "Promotional edits",
  "YouTube videos",
  "Colour grading",
  "Sound design",
  "Motion graphics",
  "Captions & subtitles",
  "Thumbnail design (optional)",
];

const WE_SHOOT = [
  "Brand campaigns",
  "Event coverage",
  "Original Krysalis productions",
];

const WE_EDIT = [
  "Client footage",
  "Creator content",
  "Brand assets",
  "Social media reels",
  "YouTube videos",
];

const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function EditingServicesPage() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setBgIndex((i) => (i + 1) % BG_FRAMES.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="min-h-screen w-full flex justify-center px-6 md:px-10 pt-36 pb-32">
      <ReactiveBackground
        src="/videos/bg-contact-film.mp4"
        frames={BG_FRAMES}
        activeIndex={bgIndex}
        grayscale={false}
      />
      <div className="relative z-10 w-full max-w-3xl">
        <PageHeader
          kicker="Editing Services"
          title="Professional Video Editing"
          subtitle="Whether you've filmed gameplay, product demonstrations, events or promotional footage, we turn raw clips into polished cinematic content that reflects your brand."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={sectionVariants}
          className="mb-24"
        >
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl mb-8">
            What&apos;s Included
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
            {CAPABILITIES.map((c) => (
              <motion.div
                key={c}
                variants={itemVariants}
                className="group flex items-center gap-3 border-b border-[var(--color-border)] hover:border-[var(--color-earth-light)]/60 pb-4 transition-colors duration-300"
              >
                <span className="w-1.5 h-1.5 bg-[var(--color-earth-light)] shrink-0 transition-transform duration-300 group-hover:scale-150" />
                <p className="font-[family-name:var(--font-body)] tracking-wide text-sm md:text-base text-[var(--color-text-dim)]">
                  {c}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={sectionVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-24 border-t border-[var(--color-border)] pt-16"
        >
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl mb-5 text-[var(--color-earth-light)]">
              We Shoot
            </h3>
            <ul className="space-y-3">
              {WE_SHOOT.map((s) => (
                <motion.li
                  key={s}
                  variants={itemVariants}
                  className="font-[family-name:var(--font-body)] tracking-wide text-sm md:text-base text-[var(--color-text-dim)]"
                >
                  {s}
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl mb-5 text-[var(--color-earth-light)]">
              We Edit
            </h3>
            <ul className="space-y-3">
              {WE_EDIT.map((s) => (
                <motion.li
                  key={s}
                  variants={itemVariants}
                  className="font-[family-name:var(--font-body)] tracking-wide text-sm md:text-base text-[var(--color-text-dim)]"
                >
                  {s}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="border-t border-[var(--color-border)] pt-16 flex flex-col items-center text-center gap-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
            Already have the footage?
          </h2>
          <Button label="Start a Project" href="/contact" variant="solid" />
        </div>
      </div>
    </main>
  );
}
