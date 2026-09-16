"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const SERVICES = [
  {
    num: "01",
    title: "Full Production",
    body: "We develop and produce original films, campaigns and short-form content around the brief — handling concept development, planning, shooting, direction and post-production.",
    tagline: "Concept / Pre-Production / Filming / Direction / Post",
  },
  {
    num: "02",
    title: "Post-Production",
    kicker: "Already have the footage?",
    body: "Raw footage doesn't need to start with us to finish with us. We turn supplied footage into finished films, advertisements and social content — building structure, pace, sound and visual identity around the material already available.",
    tagline: "Editing / Sound Design / Colour / Motion / Social Cutdowns",
    link: "/post-production",
    ctaLabel: "Explore Post-Production",
  },
  {
    num: "03",
    title: "Brand Content",
    body: "Campaign films, product content and social-first media created specifically for tactical, outdoor and performance brands. The aim isn't simply to put a product in frame. It's to create a world in which it belongs.",
    tagline: "Campaigns / Product Films / Launches / Social Content",
  },
  {
    num: "04",
    title: "Tactical Production Support",
    kicker: "Beyond the camera.",
    body: "Practical support for productions working inside the tactical world. From suitable supporting artists and tactical-background performers to kit familiarity, movement rehearsal and visual preparation for camera, Krysalis can help productions build more convincing tactical scenes.",
    tagline: "Supporting Artists / Performance Support / Movement / Kit / Continuity",
    link: "/production-support",
    ctaLabel: "Production Support",
  },
  {
    num: "05",
    title: "Event & Field Coverage",
    body: "Coverage for competitions, game days, launches and activations — capturing the people, atmosphere and details around the action rather than simply documenting what happened.",
    tagline: "Event Films / Social Coverage / BTS / Short-Form",
  },
  {
    num: "06",
    title: "Creative Development",
    kicker: "Before the first frame.",
    body: "Sometimes the project needs an idea before it needs a camera. We develop concepts, treatments, visual direction and shot structures for productions and campaigns — whether Krysalis produces the finished work or contributes to a wider creative team.",
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
                  {s.kicker && (
                    <p className="font-[family-name:var(--font-tactical-mono)] text-xs uppercase tracking-[0.12em] text-[var(--color-text-dim)] mb-1">
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
