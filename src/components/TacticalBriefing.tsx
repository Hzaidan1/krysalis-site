"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/projects";

// --- tuning ---
const CHAR_INTERVAL_MS = 38; // title typing speed, per character
const SFX_ACTIVE_MS = 2200; // keyboard clicks only play for roughly this long from the start
const SFX_FADE_MS = 200; // then fade out over this long and stay silent for the rest (defensive — titles are short enough this rarely triggers)

/**
 * Synthesizes a mechanical keyboard click via the Web Audio API — no audio
 * file needed. Modeled on a reference clip (analyzed via spectrogram, not
 * sampled directly): real mechanical clicks are a broadband transient
 * spanning near-0Hz up to ~19-20kHz, not a single tone — so this layers a
 * short full-spectrum noise burst (the switch snap) with a punchier low
 * thump arriving almost immediately after (the keycap bottoming out).
 */
function useTypingClick() {
  const ctxRef = useRef<AudioContext | null>(null);

  function ensureContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!ctxRef.current) {
      ctxRef.current = new AudioCtx();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume().catch(() => {});
    }
    return ctxRef.current;
  }

  useEffect(() => {
    return () => {
      ctxRef.current?.close().catch(() => {});
    };
  }, []);

  return function playClick(volumeMultiplier: number = 1) {
    const ctx = ensureContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;

      const noiseDuration = 0.016;
      const bufferSize = Math.floor(ctx.sampleRate * noiseDuration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const decay = Math.pow(1 - i / bufferSize, 1.6);
        data[i] = (Math.random() * 2 - 1) * decay;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const highpass = ctx.createBiquadFilter();
      highpass.type = "highpass";
      highpass.frequency.value = 700;

      const presenceBoost = ctx.createBiquadFilter();
      presenceBoost.type = "peaking";
      presenceBoost.frequency.value = 6000 + Math.random() * 3000;
      presenceBoost.Q.value = 0.8;
      presenceBoost.gain.value = 6;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.12 * volumeMultiplier, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + noiseDuration);

      noise.connect(highpass);
      highpass.connect(presenceBoost);
      presenceBoost.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + noiseDuration);

      const thump = ctx.createOscillator();
      thump.type = "sine";
      thump.frequency.value = 140 + Math.random() * 60;
      const thumpGain = ctx.createGain();
      const thumpStart = now + 0.002;
      thumpGain.gain.setValueAtTime(0.03 * volumeMultiplier, thumpStart);
      thumpGain.gain.exponentialRampToValueAtTime(0.0001, thumpStart + 0.045);
      thump.connect(thumpGain);
      thumpGain.connect(ctx.destination);
      thump.start(thumpStart);
      thump.stop(thumpStart + 0.05);
    } catch {
      // audio is a nice-to-have — never let a failure here matter
    }
  };
}

const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const headingClass =
  "font-[family-name:var(--font-tactical-mono)] text-[var(--color-earth-light)] uppercase tracking-[0.16em] text-sm mb-3 mt-12 block";
const proseClass =
  "font-[family-name:var(--font-body)] text-[var(--color-text-dim)] text-[16px] sm:text-[17px] leading-[1.6] max-w-[55ch] mb-2 block";
const listItemClass = "font-[family-name:var(--font-tactical-mono)] text-[var(--color-text)] text-sm mb-1 block";
const creditsClass = "font-[family-name:var(--font-tactical-mono)] text-[var(--color-text-dim)] text-xs mb-2 block";
const linkClass = "font-[family-name:var(--font-tactical-mono)] text-sm hover:text-[var(--color-earth-light)] transition-colors";

export default function TacticalBriefing({
  project,
  nextHref,
}: {
  project: Project;
  /** Href for "Next Project →" — omitted (falls back to /work) if there's
   * only one project or no next one could be resolved. */
  nextHref?: string;
}) {
  const playClick = useTypingClick();

  // Title types out first, as the dramatic opening beat. Everything else
  // (Brief/Role/Approach/Deliverables/Credits/nav) then reveals together as
  // one staggered block — typing every single line one at a time made the
  // whole case study feel slow to reach.
  const titleText = `${project.title} \u2014 ${project.client}`;
  const [titleCount, setTitleCount] = useState(0);
  const titleDone = titleCount >= titleText.length;
  const sfxStartRef = useRef<number | null>(null);

  useEffect(() => {
    if (titleCount >= titleText.length) return;
    const t = setTimeout(() => {
      setTitleCount((c) => c + 1);

      if (sfxStartRef.current === null) {
        sfxStartRef.current = performance.now();
      }
      const elapsed = performance.now() - sfxStartRef.current;
      if (elapsed <= SFX_ACTIVE_MS) {
        playClick(1);
      } else if (elapsed <= SFX_ACTIVE_MS + SFX_FADE_MS) {
        playClick(1 - (elapsed - SFX_ACTIVE_MS) / SFX_FADE_MS);
      }
    }, CHAR_INTERVAL_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleCount, titleText]);

  const deliverables = project.deliverables ?? ["[Deliverables list \u2014 once supplied.]"];

  return (
    <div>
      <p className="font-[family-name:var(--font-tactical-mono)] text-xs uppercase tracking-[0.16em] text-[var(--color-text-dim)] mb-4 block">
        {project.category} / {project.year}
      </p>

      <h1 className="font-[family-name:var(--font-display)] text-[28px] sm:text-[38px] lg:text-[48px] leading-[1.15] mb-12 block">
        {titleText.slice(0, titleCount)}
        {!titleDone && (
          <span
            aria-hidden
            className="inline-block w-[0.5em] h-[0.9em] align-middle -mt-[2px] ml-[2px] bg-[var(--color-earth-light)]"
            style={{ animation: "tactical-caret-blink 0.9s steps(1) infinite" }}
          />
        )}
      </h1>

      {titleDone && (
        <motion.div initial="hidden" animate="show" variants={sectionVariants}>
          <motion.p variants={itemVariants} className={headingClass}>
            The Brief
          </motion.p>
          <motion.p variants={itemVariants} className={proseClass}>
            {project.brief ?? "[The objective \u2014 2-3 sentences once supplied.]"}
          </motion.p>

          <motion.p variants={itemVariants} className={headingClass}>
            Our Role
          </motion.p>
          <motion.p variants={itemVariants} className={proseClass}>
            {project.role ??
              "[Specific deliverables \u2014 e.g. Concept Development / Direction / Filming / Editing]"}
          </motion.p>

          <motion.p variants={itemVariants} className={headingClass}>
            The Approach
          </motion.p>
          <motion.p variants={itemVariants} className={proseClass}>
            {project.approach ?? "[Creative direction, pacing and visual decisions \u2014 once supplied.]"}
          </motion.p>

          <motion.p variants={itemVariants} className={headingClass}>
            Deliverables
          </motion.p>
          {deliverables.map((d, i) => (
            <motion.p key={i} variants={itemVariants} className={listItemClass}>
              {"\u2014 " + d}
            </motion.p>
          ))}

          <motion.p variants={itemVariants} className={headingClass}>
            Credits
          </motion.p>
          <motion.p variants={itemVariants} className={creditsClass}>
            {project.credits ?? "[Verified credits \u2014 once supplied.]"}
          </motion.p>

          <motion.div variants={itemVariants} className="flex justify-between items-center mt-16 mb-20">
            <Link href={nextHref ?? "/work"} className={linkClass}>
              Next Project &rarr;
            </Link>
            <Link href="/contact" className={linkClass}>
              Start a Project &rarr;
            </Link>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
