"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button";

export default function BeyondTheFrame() {
  return (
    <section className="w-full flex items-center justify-center bg-[var(--color-bg)] px-6 md:px-10 py-24 md:py-32 border-t border-[var(--color-border)]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-3xl mx-auto text-center"
      >
        <p className="font-[family-name:var(--font-tactical-mono)] text-xs tracking-[0.3em] uppercase text-[var(--color-earth-light)] mb-4">
          Beyond the Frame
        </p>
        <h2 className="font-[family-name:var(--font-display)] font-bold uppercase tracking-wide text-2xl sm:text-4xl lg:text-5xl mb-6 leading-tight">
          More than a camera crew.
        </h2>
        <p className="font-[family-name:var(--font-body)] font-light tracking-wide text-[var(--color-text-dim)] text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-10">
          Krysalis can support tactical scenes with performers, kit
          preparation, movement rehearsal and on-set creative support.
        </p>
        <Button label="Explore Production Support" href="/production-support" variant="outline" />
      </motion.div>
    </section>
  );
}
