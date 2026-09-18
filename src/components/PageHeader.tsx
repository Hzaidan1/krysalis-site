"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function PageHeader({
  kicker,
  title,
  subtitle,
  backdrop,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  /** path under /public to a still used as a subtle page backdrop, e.g. "/frames/frame_0090.webp" */
  backdrop?: string;
}) {
  return (
    <div className="relative mb-20 md:mb-32 -mx-4 sm:-mx-6 lg:-mx-10 px-4 sm:px-6 lg:px-10 pt-4 pb-20 md:pb-28 overflow-hidden">
      {backdrop && (
        <>
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <Image
              src={backdrop}
              alt=""
              fill
              priority
              className="object-cover backdrop-kenburns opacity-25"
            />
          </div>
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(10,10,9,0.75) 0%, rgba(10,10,9,0.92) 65%, rgba(10,10,9,1) 100%)",
            }}
          />
        </>
      )}

      {/* oversized ghost butterfly mark for texture, sits above the backdrop */}
      <div
        aria-hidden="true"
        className="absolute -top-10 -left-6 md:-left-10 text-[8rem] md:text-[12rem] font-[family-name:var(--font-display)] text-[var(--color-earth)]/[0.06] leading-none pointer-events-none select-none -z-[5]"
      >
        K
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative"
      >
        <p className="font-[family-name:var(--font-tactical-mono)] tracking-[0.3em] uppercase text-[var(--color-earth-light)] text-xs sm:text-sm mb-4">
          {kicker}
        </p>
        <h1 className="font-[family-name:var(--font-display)] uppercase tracking-wide font-bold text-[28px] sm:text-[38px] lg:text-[48px] leading-[1.1] mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className="font-[family-name:var(--font-body)] font-light tracking-wide text-[var(--color-text-dim)] max-w-[55ch] text-[16px] sm:text-[17px] leading-[1.6]">
            {subtitle}
          </p>
        )}
        <div className="w-16 h-[2px] bg-[var(--color-earth-light)] mt-10" />
      </motion.div>
    </div>
  );
}
