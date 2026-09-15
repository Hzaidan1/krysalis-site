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
  "Storytelling through small details",
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
    <main className="min-h-screen w-full flex justify-center overflow-x-hidden px-4 sm:px-6 lg:px-10 pt-32 md:pt-36 pb-24 md:pb-32">
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
          className="font-[family-name:var(--font-body)] font-light text-[var(--color-text-dim)] text-base md:text-lg leading-relaxed space-y-5 mb-24"
        >
          <motion.p variants={itemVariants}>
            Krysalis is an independent UK tactical media and production
            studio. It began inside the UK airsoft and tactical community,
            creating the kind of media we wanted to see in the space
            ourselves. That origin still shapes how we work — familiarity
            with the equipment, environments, movement and small visual
            details gives us a perspective a general production crew often
            has to learn from scratch.
          </motion.p>
          <motion.p variants={itemVariants}>
            Today, Krysalis develops original productions, creates content
            for brands and events, handles post-production and supports
            wider screen productions working within the tactical space.
            We&apos;re deliberately small and flexible. The team, equipment
            and approach can be built around the project rather than forcing
            every project through the same production model.
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
                <span className="font-[family-name:var(--font-tactical-mono)] text-[var(--color-earth-light)] text-sm w-6 transition-transform duration-300 group-hover:translate-x-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-[family-name:var(--font-tactical-mono)] tracking-wide text-sm md:text-base">
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
                  <span className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full border border-[var(--color-earth-light)]/60 bg-[var(--color-bg)] font-[family-name:var(--font-tactical-mono)] text-[var(--color-earth-light)] text-sm mb-4">
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
