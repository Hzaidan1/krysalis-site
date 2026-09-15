"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/Button";
import ReactiveBackground from "@/components/ReactiveBackground";

// Evenly spaced so the auto-advance cadence feels consistent.
const BG_FRAMES = [0.5, 3, 5.5, 8];

const CAPABILITIES = [
  "Short-form editing",
  "Campaign edits",
  "Product films",
  "Promotional pieces",
  "YouTube content",
  "Social cutdowns",
  "Colour treatment",
  "Sound design",
  "Motion graphics",
  "Captions & subtitles",
  "Platform formatting",
];

const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function PostProductionClient() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setBgIndex((i) => (i + 1) % BG_FRAMES.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="min-h-screen w-full flex justify-center overflow-x-hidden px-4 sm:px-6 lg:px-10 pt-32 md:pt-36 pb-24 md:pb-32">
      <ReactiveBackground
        src="/videos/bg-contact-film.mp4"
        frames={BG_FRAMES}
        activeIndex={bgIndex}
        grayscale={false}
      />
      <div className="relative z-10 w-full max-w-3xl">
        <PageHeader
          kicker="Post-Production"
          title="You've got the footage. Let's find the film."
          subtitle="Not every Krysalis project starts behind our camera. We work with footage captured by brands, creators, teams and production crews and turn it into finished media with structure, pace and purpose. That can mean professionally shot campaign footage, action cameras, event footage, night vision, thermal or a library of clips that hasn't yet found its final form."
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
                <p className="font-[family-name:var(--font-tactical-mono)] tracking-wide text-sm md:text-base text-[var(--color-text-dim)]">
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
          className="mb-24 border-t border-[var(--color-border)] pt-16"
        >
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl mb-6">
            From One Master to a Content System
          </h2>
          <p className="font-[family-name:var(--font-body)] font-light tracking-wide text-[var(--color-text-dim)] text-sm md:text-base leading-relaxed max-w-2xl">
            A project doesn&apos;t necessarily end with one finished film. We
            can develop shorter edits, alternate formats and platform-specific
            versions from the same footage so the material works harder
            across social, web and campaign use.
          </p>
        </motion.div>

        <div className="border-t border-[var(--color-border)] pt-16 flex flex-col items-center text-center gap-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
            Send What You Have.
          </h2>
          <p className="font-[family-name:var(--font-body)] font-light tracking-wide text-[var(--color-text-dim)] text-sm md:text-base leading-relaxed max-w-xl">
            You don&apos;t need to organise everything into a polished brief
            before contacting us. Send the footage, tell us where it needs to
            end up and show us anything that helps explain the direction.
            We&apos;ll work out what the material can become.
          </p>
          <Button label="Start a Post-Production Project" href="/contact" variant="solid" />
        </div>
      </div>
    </main>
  );
}
