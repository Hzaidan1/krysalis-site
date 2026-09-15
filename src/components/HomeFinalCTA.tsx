"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button";

export default function HomeFinalCTA() {
  return (
    <section className="w-full flex items-center justify-center bg-[var(--color-bg)] px-6 md:px-10 py-24 md:py-32 border-t border-[var(--color-border)]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-2xl mx-auto text-center"
      >
        <h2 className="font-[family-name:var(--font-display)] font-bold uppercase tracking-wide text-2xl sm:text-4xl lg:text-5xl mb-8 leading-tight">
          What are you trying to make?
        </h2>
        <p className="font-[family-name:var(--font-body)] font-light tracking-wide text-[var(--color-text-dim)] text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-10">
          A full production. A campaign. Raw footage that needs finishing. An
          event that needs covering. A tactical scene that needs people and
          preparation. Send us the brief — even if the brief isn&apos;t
          finished yet.
        </p>
        <Button label="Start a Project" href="/contact" variant="solid" />
      </motion.div>
    </section>
  );
}
