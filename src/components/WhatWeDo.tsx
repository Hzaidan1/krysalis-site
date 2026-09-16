"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const SERVICES = [
  {
    num: "01",
    title: "Full Production",
    body: "Concept, planning, direction, filming and post — from first idea to final delivery.",
    tagline: "Concept / Pre-Production / Filming / Direction / Post",
  },
  {
    num: "02",
    title: "Post-Production",
    body: "Already shot it? We turn supplied footage into finished films and social content.",
    tagline: "Editing / Sound Design / Colour / Motion / Social Cutdowns",
    link: "/post-production",
    ctaLabel: "Explore Post-Production",
  },
  {
    num: "03",
    title: "Brand Content",
    body: "Campaigns, product films and social content built around the identity of the brand.",
    tagline: "Campaigns / Product Films / Launches / Social Content",
  },
  {
    num: "04",
    title: "Tactical Production Support",
    body: "People, kit and practical support for tactical scenes — in front of the camera as well as behind it.",
    tagline: "Supporting Artists / Performance Support / Movement / Kit / Continuity",
    link: "/production-support",
    ctaLabel: "Production Support",
  },
  {
    num: "05",
    title: "Event & Field Coverage",
    body: "Films and social content captured inside live events, competitions and field environments.",
    tagline: "Event Films / Social Coverage / BTS / Short-Form",
  },
  {
    num: "06",
    title: "Creative Development",
    body: "Concepts, treatments and visual direction before the camera starts rolling.",
    tagline: "Concepts / Treatments / Visual Direction / Shot Planning",
  },
];

export default function WhatWeDo() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-[var(--color-bg)] px-6 md:px-10 py-24">
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="font-[family-name:var(--font-tactical-mono)] text-xs tracking-[0.3em] uppercase text-[var(--color-earth-light)] mb-4">
            What We Do
          </p>
          <h2 className="font-[family-name:var(--font-display)] font-bold uppercase tracking-wide text-2xl sm:text-4xl lg:text-5xl">
            Craft, on either side of the lens.
          </h2>
        </motion.div>

        <div>
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ x: 6 }}
              className={`group grid grid-cols-1 md:grid-cols-[70px_1fr] gap-3 md:gap-10 py-9 md:py-11 cursor-default transition-colors duration-300 hover:bg-white/[0.02] ${
                i !== 0 ? "border-t border-[var(--color-border)]" : ""
              }`}
            >
              <span className="font-[family-name:var(--font-tactical-mono)] text-[var(--color-earth)] group-hover:text-[var(--color-earth-light)] transition-colors duration-300 text-lg font-semibold">
                {s.num}
              </span>

              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,220px)_1fr] gap-3 md:gap-12">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] font-medium uppercase tracking-wide text-xl md:text-2xl">
                    {s.title}
                  </h3>
                </div>

                <div>
                  <p className="font-[family-name:var(--font-body)] font-light tracking-wide text-[var(--color-text-dim)] text-sm md:text-base leading-relaxed max-w-md">
                    {s.body}
                  </p>
                  {s.tagline && (
                    <p className="font-[family-name:var(--font-tactical-mono)] uppercase tracking-[0.1em] text-[var(--color-earth-light)] text-xs md:text-sm mt-4">
                      {s.tagline}
                    </p>
                  )}
                  {s.link && (
                    <Link
                      href={s.link}
                      className="inline-block font-[family-name:var(--font-tactical-mono)] text-xs uppercase tracking-[0.12em] text-[var(--color-earth-light)] mt-4 border-b border-[var(--color-earth-light)]/40 hover:border-[var(--color-earth-light)] transition-colors"
                    >
                      {s.ctaLabel ?? "Learn more"} &rarr;
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
