"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/lib/projects";

// --- tuning ---
const CHAR_INTERVAL_MS = 52; // typing speed, per character — was 28 (too fast)
const FIELD_STAGGER_MS = 220; // delay before each subsequent field starts typing

type Field = { label: string; value: string };

/**
 * Synthesizes a short mechanical "keyboard click" via the Web Audio API on
 * demand — no audio file needed. Lazily creates (and resumes) an
 * AudioContext on first use, since browsers require a user gesture before
 * audio can play; navigating to this page via a click satisfies that in
 * most browsers, but if it doesn't, failures are swallowed silently so a
 * blocked click sound never breaks the visual typing animation.
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

  return function playClick() {
    const ctx = ensureContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;

      // --- layer 1: the sharp "snap" of the switch actuating ---
      // A real mechanical click is a broadband transient, not a pure tone —
      // synthesized here as a short burst of noise, decaying fast, shaped
      // through a bandpass filter so it reads as a bright "tick" rather
      // than static.
      const noiseDuration = 0.018;
      const bufferSize = Math.floor(ctx.sampleRate * noiseDuration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const decay = Math.pow(1 - i / bufferSize, 2);
        data[i] = (Math.random() * 2 - 1) * decay;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.value = 2800 + Math.random() * 1400;
      noiseFilter.Q.value = 1.1;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.5, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + noiseDuration);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + noiseDuration);

      // --- layer 2: the low "thock" of the keycap bottoming out ---
      // arrives a few ms after the snap, same as a real switch
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 120 + Math.random() * 50;
      const oscGain = ctx.createGain();
      const thockStart = now + 0.004;
      oscGain.gain.setValueAtTime(0.09, thockStart);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, thockStart + 0.05);
      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(thockStart);
      osc.stop(thockStart + 0.055);
    } catch {
      // audio is a nice-to-have — never let a failure here matter
    }
  };
}

function TypedField({
  label,
  value,
  delay,
  onTick,
}: {
  label: string;
  value: string;
  delay: number;
  onTick: () => void;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let i = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        i += 1;
        setCount(i);
        onTick();
        if (i >= value.length && intervalId) {
          clearInterval(intervalId);
        }
      }, CHAR_INTERVAL_MS);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay]);

  const done = count >= value.length;

  return (
    <div>
      <p className="font-[family-name:var(--font-display)] text-[var(--color-earth-light)] uppercase text-xs tracking-[0.16em] mb-4">
        {label}
      </p>
      {/* min-height + fixed line-height reserved up front so the block
          below never jumps while any field is still typing out */}
      <p className="font-[family-name:var(--font-tactical-mono)] text-[var(--color-text)] text-sm leading-[1.4] min-h-[1.4em]">
        {value.slice(0, count)}
        <span
          aria-hidden
          className="inline-block w-[0.55em] h-[1em] align-middle -mt-[2px] ml-[1px] bg-[var(--color-earth-light)]"
          style={{ opacity: done ? 0 : 1, animation: done ? "none" : "tactical-caret-blink 0.9s steps(1) infinite" }}
        />
      </p>
    </div>
  );
}

export default function TacticalProjectDetails({ project }: { project: Project }) {
  const playClick = useTypingClick();

  const fields: Field[] = useMemo(
    () => [
      { label: "Client", value: project.client },
      { label: "Year & Location", value: `${project.year}, ${project.location ?? "[Location]"}` },
      { label: "Category", value: project.category },
      { label: "My Role", value: project.role ?? "[Role]" },
    ],
    [project]
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-10 mb-16 pb-12 border-b border-[var(--color-border)]">
      {fields.map((f, i) => (
        <TypedField key={f.label} label={f.label} value={f.value} delay={i * FIELD_STAGGER_MS} onTick={playClick} />
      ))}
    </div>
  );
}
