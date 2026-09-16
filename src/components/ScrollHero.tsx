"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";

// Previously this section scroll-scrubbed through 300 frames via a tall
// "runway" container + sticky positioning + a continuous requestAnimationFrame
// loop reading scroll position every frame. That caused real jank (the rAF
// loop never stopped, even long after scrolling past the hero, continuously
// forcing layout via getBoundingClientRect()) and broke native scrolling on
// some devices. Rebuilt as a normal h-screen section with an autoplaying,
// looping background video (the same 300 frames, stitched into an mp4) —
// zero scroll dependency, so native window scrolling is untouched.

type Btn = { label: string; href: string; variant: "solid" | "outline" };

const KICKER = "UK Tactical Media & Production Studio";
const TITLE = "Before the action, there is the story.";
const BODY =
  "Krysalis develops, produces and supports media for the tactical world — from original films and brand content to post-production, event coverage and specialist support for screen productions.";
const BUTTONS: Btn[] = [
  { label: "View Our Work", href: "/work", variant: "solid" },
  { label: "Start a Project", href: "/contact", variant: "outline" },
];

export default function ScrollHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      const resume = () => {
        video.play().catch(() => {});
      };
      document.addEventListener("pointerdown", resume, { once: true });
      document.addEventListener("keydown", resume, { once: true });
      document.addEventListener("touchstart", resume, { once: true });
    });
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[var(--color-bg)]">
      <video
        ref={videoRef}
        src="/videos/hero-loop.mp4"
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(10,10,9,0.55) 0%, rgba(10,10,9,0.75) 55%, rgba(10,10,9,0.85) 100%)",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center"
        >
          <p className="font-[family-name:var(--font-tactical-mono)] text-xs tracking-[0.25em] uppercase text-[var(--color-earth-light)] mb-5">
            {KICKER}
          </p>
          <h1 className="relative font-[family-name:var(--font-display)] font-bold uppercase tracking-wide text-3xl sm:text-5xl lg:text-7xl leading-[1.05] max-w-3xl mb-5">
            {TITLE}
            <span
              aria-hidden="true"
              className="glitch-clone"
              style={{ color: "#ff5b5b", transform: "translateX(-3px)" }}
            >
              {TITLE}
            </span>
            <span
              aria-hidden="true"
              className="glitch-clone"
              style={{ color: "#5bd0ff", transform: "translateX(3px)", animationDelay: "0.02s" }}
            >
              {TITLE}
            </span>
            <span
              aria-hidden="true"
              className="glitch-sweep absolute inset-x-0 top-1/2 h-[2px] bg-[var(--color-earth-light)]"
            />
          </h1>
          <p className="font-[family-name:var(--font-body)] font-light tracking-wide text-[var(--color-text-dim)] max-w-md text-sm md:text-base mb-9">
            {BODY}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pointer-events-auto mt-2 w-full sm:w-auto items-center">
            {BUTTONS.map((b) => (
              <Button key={b.label} {...b} />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-dim)]">
        <span className="animate-pulse">Scroll</span>
      </div>
    </div>
  );
}
