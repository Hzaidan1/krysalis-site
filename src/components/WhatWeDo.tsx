"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const SERVICES = [
  {
    num: "01",
    title: "Brand Films",
    body: "Cinematic edits that turn products, teams and events into stories people remember.",
    quote: "From concept to final delivery.",
  },
  {
    num: "02",
    title: "Video Editing",
    kicker: "Already have the footage?",
    body: "We transform your raw clips into high-impact reels, advertisements and short films ready for Instagram, TikTok and YouTube.",
    quote: "Your footage. Our storytelling.",
    link: "/editing-services",
  },
  {
    num: "03",
    title: "Event Coverage",
    body: "From skirmishes to product launches, we create films that capture the atmosphere—not just the action.",
  },
  {
    num: "04",
    title: "Creative Direction",
    kicker: "Need more than an editor?",
    body: "We help shape concepts, pacing, messaging and visual identity before the first frame is even shot.",
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
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.3em] uppercase text-[var(--color-earth-light)] mb-4">
            What We Do
          </p>
          <h2 className="font-[family-name:var(--font-display)] font-semibold uppercase tracking-wide text-3xl md:text-5xl">
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
              <span className="font-[family-name:var(--font-display)] text-[var(--color-earth)] group-hover:text-[var(--color-earth-light)] transition-colors duration-300 text-lg font-semibold">
                {s.num}
              </span>

              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,220px)_1fr] gap-3 md:gap-12">
                <div>
                  {s.kicker && (
                    <p className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.12em] text-[var(--color-text-dim)] mb-1">
                      {s.kicker}
                    </p>
                  )}
                  <h3 className="font-[family-name:var(--font-display)] font-medium uppercase tracking-wide text-xl md:text-2xl">
                    {s.title}
                  </h3>
                </div>

                <div>
                  <p className="font-[family-name:var(--font-body)] font-light tracking-wide text-[var(--color-text-dim)] text-sm md:text-base leading-relaxed max-w-md">
                    {s.body}
                  </p>
                  {s.quote && (
                    <p className="font-[family-name:var(--font-body)] italic tracking-wide text-[var(--color-earth-light)] text-sm md:text-base mt-4">
                      &ldquo;{s.quote}&rdquo;
                    </p>
                  )}
                  {s.link && (
                    <Link
                      href={s.link}
                      className="inline-block font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.12em] text-[var(--color-earth-light)] mt-4 border-b border-[var(--color-earth-light)]/40 hover:border-[var(--color-earth-light)] transition-colors"
                    >
                      Learn more &rarr;
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
