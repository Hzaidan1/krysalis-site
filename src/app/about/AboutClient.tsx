"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/Button";
import ReactiveBackground from "@/components/ReactiveBackground";

// Loop bounds in bg-prep.mp4 — plays continuously between these two points,
// no holds (swap for your own in/out points anytime).
const FRAMES = [0.5, 12];

const PHILOSOPHY = [
  "Atmosphere",
  "Preparation",
  "Small details",
  "Controlled pacing",
  "Sound design",
  "The pause before the action",
];

const PROCESS = [
  {
    step: "01",
    title: "Understand",
    desc: "The objective, audience, environment and constraints come before the shot list.",
  },
  {
    step: "02",
    title: "Build",
    desc: "We develop the concept, production plan and the people or resources required around it.",
  },
  {
    step: "03",
    title: "Produce",
    desc: "We shoot the project, support the production or work with the material already available.",
  },
  {
    step: "04",
    title: "Finish",
    desc: "Editing, sound, colour and delivery shaped around where the work will actually be seen.",
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

export default function AboutClient() {
  return (
    <main className="min-h-screen w-full flex justify-center overflow-x-hidden px-4 sm:px-6 lg:px-10 pt-32 md:pt-36 pb-24 md:pb-40">
      <ReactiveBackground
        src="/videos/bg-prep.mp4"
        frames={FRAMES}
        grayscale
        speed={1}
      />
      <div className="relative z-10 w-full max-w-3xl">
        <PageHeader kicker="About" title="Built Inside the World We Film." />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={sectionVariants}
          className="font-[family-name:var(--font-body)] font-light text-[var(--color-text-dim)] text-[16px] sm:text-[17px] leading-[1.6] max-w-[55ch] space-y-5 mb-24 md:mb-32"
        >
          <motion.p variants={itemVariants}>
            Krysalis is a UK tactical media and production studio born from
            the airsoft and tactical community. That familiarity with the
            equipment, environments and culture shapes the work we create for
            brands, events and screen productions.
          </motion.p>
          <motion.p variants={itemVariants}>
            Small team. Flexible production. Built around the brief.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={sectionVariants}
          className="mb-24 md:mb-32"
        >
          <h2 className="font-[family-name:var(--font-display)] text-[28px] sm:text-[38px] lg:text-[48px] mb-12 md:mb-16">
            Creative Philosophy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7">
            {PHILOSOPHY.map((p, i) => (
              <motion.div key={p} variants={itemVariants} className="group flex items-center gap-4">
                <span className="font-[family-name:var(--font-tactical-mono)] text-[var(--color-earth-light)] text-sm w-6 transition-transform duration-300 group-hover:translate-x-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-[family-name:var(--font-tactical-mono)] tracking-wide text-[16px] sm:text-[17px]">
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
          className="mb-24 md:mb-32"
        >
          <h2 className="font-[family-name:var(--font-display)] text-[28px] sm:text-[38px] lg:text-[48px] mb-14">
            How We Work
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-10 gap-x-6">
            {PROCESS.map((s) => (
              <motion.div
                key={s.step}
                variants={itemVariants}
                className="flex flex-col items-start sm:items-center text-left sm:text-center"
              >
                <span className="font-[family-name:var(--font-tactical-mono)] text-[var(--color-earth-light)] text-sm mb-3">
                  {s.step}
                </span>
                <h4 className="font-[family-name:var(--font-display)] text-[20px] sm:text-[22px] mb-2">
                  {s.title}
                </h4>
                <p className="font-[family-name:var(--font-body)] tracking-wide text-[15px] sm:text-[16px] leading-[1.6] text-[var(--color-text-dim)]">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col items-center text-center gap-6">
          <h2 className="font-[family-name:var(--font-display)] text-[24px] sm:text-[30px]">
            Ready to work together?
          </h2>
          <Button label="Work With Krysalis" href="/contact" variant="solid" />
        </div>
      </div>
    </main>
  );
}
