"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/Button";
import ReactiveBackground from "@/components/ReactiveBackground";

const FRAMES = [0.5, 3.5, 6.5, 10, 12];

const PHILOSOPHY = [
  "Atmosphere",
  "Preparation",
  "Storytelling through small details",
  "Controlled pacing",
  "Sound design",
  "The pause before the action",
];

const PROCESS = [
  {
    step: "01",
    title: "Concept",
    desc: "Understanding the story, the location and the mission before a single frame is shot.",
  },
  {
    step: "02",
    title: "Shoot",
    desc: "On the ground with the team, capturing atmosphere and detail as it actually happens.",
  },
  {
    step: "03",
    title: "Edit",
    desc: "Pacing, sound design and colour brought together in post — where the story comes alive.",
  },
  {
    step: "04",
    title: "Deliver",
    desc: "Final cuts formatted for your platform, with stills and social edits available on request.",
  },
];

const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function AboutPage() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setBgIndex((i) => (i + 1) % FRAMES.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="min-h-screen w-full flex justify-center px-6 md:px-10 pt-36 pb-32">
      <ReactiveBackground
        src="/videos/bg-prep.mp4"
        frames={FRAMES}
        activeIndex={bgIndex}
        grayscale
        speed={1}
      />
      <div className="relative z-10 w-full max-w-3xl">
        <PageHeader kicker="About" title="About Krysalis" />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={sectionVariants}
          className="font-[family-name:var(--font-body)] font-light text-[var(--color-text-dim)] text-base md:text-lg leading-relaxed space-y-5 mb-24"
        >
          <motion.p variants={itemVariants}>
            Krysalis is primarily an independent tactical media studio,
            creating cinematic films, field visuals and brand content for
            teams, events and organisations that want their story told with
            atmosphere and intent.
          </motion.p>
          <motion.p variants={itemVariants}>
            We&apos;re connected to an active airsoft team and community — the
            roots this studio grew from — and we&apos;re growing toward brand
            campaigns, event media, apparel, short films and wider
            film-adjacent work.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={sectionVariants}
          className="mb-24"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl mb-10">
            Creative Philosophy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
            {PHILOSOPHY.map((p, i) => (
              <motion.div
                key={p}
                variants={itemVariants}
                className="group flex items-center gap-4 border-b border-[var(--color-border)] hover:border-[var(--color-earth-light)]/60 pb-4 transition-colors duration-300"
              >
                <span className="font-[family-name:var(--font-display)] text-[var(--color-earth-light)] text-sm w-6 transition-transform duration-300 group-hover:translate-x-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-[family-name:var(--font-body)] tracking-wide text-sm md:text-base">
                  {p}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="mb-24"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl mb-12">
            How We Work
          </h2>
          <div className="relative">
            <div className="absolute top-5 left-0 right-0 h-px bg-[var(--color-border)] hidden sm:block" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6">
              {PROCESS.map((s) => (
                <motion.div
                  key={s.step}
                  variants={itemVariants}
                  className="relative flex flex-col items-start sm:items-center text-left sm:text-center"
                >
                  <span className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full border border-[var(--color-earth-light)]/60 bg-[var(--color-bg)] font-[family-name:var(--font-display)] text-[var(--color-earth-light)] text-sm mb-4">
                    {s.step}
                  </span>
                  <h4 className="font-[family-name:var(--font-display)] text-lg md:text-xl mb-2">
                    {s.title}
                  </h4>
                  <p className="font-[family-name:var(--font-body)] tracking-wide text-xs md:text-sm text-[var(--color-text-dim)] leading-relaxed">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={sectionVariants}
          className="border-t border-[var(--color-border)] pt-16 mb-24"
        >
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <motion.div
              variants={itemVariants}
              className="w-36 h-36 shrink-0 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] flex items-center justify-center"
            >
              <span className="font-[family-name:var(--font-body)] text-[10px] text-[var(--color-text-dim)] text-center px-2">
                Founder photo placeholder
              </span>
            </motion.div>
            <div>
              <motion.h3 variants={itemVariants} className="font-[family-name:var(--font-display)] text-3xl mb-1">
                [Founder Name]
              </motion.h3>
              <motion.p
                variants={itemVariants}
                className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.12em] text-[var(--color-earth-light)] mb-4"
              >
                Founder &amp; Creative Director
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="font-[family-name:var(--font-body)] font-light tracking-wide text-sm md:text-base text-[var(--color-text-dim)] leading-relaxed max-w-md"
              >
                [Short biography placeholder — directs, films and edits every
                Krysalis production from concept through delivery.]
              </motion.p>
            </div>
          </div>
        </motion.div>

        <div className="pt-4 flex flex-col items-center text-center gap-6 border-t border-[var(--color-border)] pt-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
            Ready to work together?
          </h2>
          <Button label="Work With Krysalis" href="/contact" variant="solid" />
        </div>
      </div>
    </main>
  );
}
