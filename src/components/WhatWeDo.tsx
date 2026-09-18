"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const SERVICES = [
  {
    num: "01",
    title: "Full Production",
    body: "Concept, direction, filming and post — from first idea to final delivery.",
  },
  {
    num: "02",
    title: "Post-Production",
    body: "Supplied footage transformed into finished films and social content.",
    link: "/post-production",
    ctaLabel: "Explore Post-Production",
  },
  {
    num: "03",
    title: "Brand Content",
    body: "Campaigns, product films and social content built around the brand.",
  },
  {
    num: "04",
    title: "Tactical Production Support",
    body: "People, kit and practical support for tactical scenes.",
    link: "/production-support",
    ctaLabel: "Production Support",
  },
  {
    num: "05",
    title: "Event & Field Coverage",
    body: "Media captured inside live events, competitions and field environments.",
  },
  {
    num: "06",
    title: "Creative Development",
    body: "Concepts, treatments and visual direction before the camera rolls.",
  },
];

export default function WhatWeDo() {
  return (
    <section className="w-full flex items-center justify-center bg-[var(--color-bg)] px-4 sm:px-6 lg:px-10 py-20 md:py-32 lg:py-40">
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-20 md:mb-28"
        >
          <p className="font-[family-name:var(--font-tactical-mono)] text-xs tracking-[0.3em] uppercase text-[var(--color-earth-light)] mb-4">
            What We Do
          </p>
          <h2 className="font-[family-name:var(--font-display)] font-bold uppercase tracking-wide text-[28px] sm:text-[38px] lg:text-[48px]">
            Craft, on either side of the lens.
          </h2>
        </motion.div>

        <div>
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid grid-cols-1 md:grid-cols-[70px_1fr] gap-3 md:gap-10 py-8 md:py-10"
            >
              <span className="font-[family-name:var(--font-tactical-mono)] text-[var(--color-earth)] text-lg font-semibold">
                {s.num}
              </span>

              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,220px)_1fr] gap-2 md:gap-12">
                <h3 className="font-[family-name:var(--font-display)] font-medium uppercase tracking-wide text-[22px] md:text-[26px]">
                  {s.title}
                </h3>

                <div>
                  <p className="font-[family-name:var(--font-body)] font-light tracking-wide text-[var(--color-text-dim)] text-[16px] sm:text-[17px] leading-[1.6] max-w-[50ch]">
                    {s.body}
                  </p>
                  {s.link && (
                    <Link
                      href={s.link}
                      className="inline-block font-[family-name:var(--font-tactical-mono)] text-xs uppercase tracking-[0.12em] text-[var(--color-earth-light)] mt-4 border-b border-[var(--color-earth-light)]/40 hover:border-[var(--color-earth-light)] transition-colors"
                    >
                      {s.ctaLabel} &rarr;
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
