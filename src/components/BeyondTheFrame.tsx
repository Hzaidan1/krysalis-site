"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button";

export default function BeyondTheFrame() {
  return (
    <div className="w-full flex items-center justify-center bg-[var(--color-bg)] px-4 sm:px-6 lg:px-10 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-xl mx-auto text-center"
      >
        <h2 className="font-[family-name:var(--font-display)] font-bold uppercase tracking-wide text-[24px] sm:text-[30px] mb-5">
          More than a camera crew.
        </h2>
        <p className="font-[family-name:var(--font-body)] font-light tracking-wide text-[var(--color-text-dim)] text-[16px] sm:text-[17px] leading-[1.6] mb-8">
          Performers, kit preparation, movement rehearsal and practical
          support for tactical productions.
        </p>
        <Button label="Explore Production Support" href="/production-support" variant="outline" />
      </motion.div>
    </div>
  );
}
