"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/projects";

// --- tuning ---
const CHAR_INTERVAL_MS = 42; // typing speed, per character
const LINE_PAUSE_MS = 420; // pause after a line completes, before the next starts

type Entry =
  | { kind: "title"; text: string }
  | { kind: "meta"; label: string; value: string }
  | { kind: "prose"; text: string }
  | { kind: "credits"; text: string }
  | { kind: "link"; text: string; href: string };

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

  return function playClick() {
    const ctx = ensureContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;

      // --- broadband snap: short noise burst, highpassed to stay bright
      // and full-spectrum rather than a narrow, tonal "beep" ---
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
      noiseGain.gain.setValueAtTime(0.55, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + noiseDuration);

      noise.connect(highpass);
      highpass.connect(presenceBoost);
      presenceBoost.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + noiseDuration);

      // --- low punch: the keycap bottoming out, arriving almost
      // immediately after the snap, same as a real switch ---
      const thump = ctx.createOscillator();
      thump.type = "sine";
      thump.frequency.value = 140 + Math.random() * 60;
      const thumpGain = ctx.createGain();
      const thumpStart = now + 0.002;
      thumpGain.gain.setValueAtTime(0.13, thumpStart);
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

/** Splits a meta line's revealed text into its label/value portions so the
 * label can stay gold and the value off-white even mid-type. */
function MetaLineContent({ label, revealed }: { label: string; revealed: string }) {
  const prefix = `${label}: `;
  if (revealed.length <= prefix.length) {
    return <span className="text-[var(--color-earth-light)] uppercase tracking-[0.12em]">{revealed}</span>;
  }
  return (
    <>
      <span className="text-[var(--color-earth-light)] uppercase tracking-[0.12em]">{prefix}</span>
      <span className="text-[var(--color-text)]">{revealed.slice(prefix.length)}</span>
    </>
  );
}

function entryFullText(entry: Entry): string {
  if (entry.kind === "meta") return `${entry.label}: ${entry.value}`;
  return entry.text;
}

function entryClassName(entry: Entry): string {
  switch (entry.kind) {
    case "title":
      return "font-[family-name:var(--font-display)] text-4xl md:text-6xl leading-tight mb-10 block";
    case "meta":
      return "font-[family-name:var(--font-tactical-mono)] text-sm md:text-base mb-3 block";
    case "prose":
      return "font-[family-name:var(--font-tactical-mono)] text-[var(--color-text-dim)] text-sm leading-relaxed max-w-2xl mb-6 block";
    case "credits":
      return "font-[family-name:var(--font-tactical-mono)] text-[var(--color-text-dim)] text-xs mb-8 block";
    case "link":
      return "font-[family-name:var(--font-tactical-mono)] text-sm hover:text-[var(--color-earth-light)] transition-colors";
  }
}

export default function TacticalBriefing({ project }: { project: Project }) {
  const playClick = useTypingClick();

  const entries: Entry[] = useMemo(
    () => [
      { kind: "title", text: project.title },
      { kind: "meta", label: "Client", value: project.client },
      {
        kind: "meta",
        label: "Year & Location",
        value: `${project.year}, ${project.location ?? "[Location]"}`,
      },
      { kind: "meta", label: "Category", value: project.category },
      { kind: "meta", label: "My Role", value: project.role ?? "[Role]" },
      {
        kind: "prose",
        text:
          project.description ??
          "[Short explanation of the concept — placeholder copy until real project details are supplied.]",
      },
      {
        kind: "credits",
        text: `Credits: ${project.credits ?? "[Directed / Filmed / Edited by — placeholder]"}`,
      },
      { kind: "link", text: "\u2190 All Work", href: "/work" },
      { kind: "link", text: "Start a Project \u2192", href: "/contact" },
    ],
    [project]
  );

  const [entryIndex, setEntryIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (entryIndex >= entries.length) return;
    const fullText = entryFullText(entries[entryIndex]);

    if (charCount >= fullText.length) {
      const t = setTimeout(() => {
        setEntryIndex((i) => i + 1);
        setCharCount(0);
      }, LINE_PAUSE_MS);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setCharCount((c) => c + 1);
      playClick();
    }, CHAR_INTERVAL_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entryIndex, charCount, entries]);

  function renderEntry(entry: Entry, i: number) {
    const fullText = entryFullText(entry);
    const revealed = i < entryIndex ? fullText : fullText.slice(0, charCount);
    const isActiveLine = i === entryIndex && charCount < fullText.length;

    const caret = isActiveLine && (
      <span
        aria-hidden
        className="inline-block w-[0.5em] h-[0.9em] align-middle -mt-[2px] ml-[2px] bg-[var(--color-earth-light)]"
        style={{ animation: "tactical-caret-blink 0.9s steps(1) infinite" }}
      />
    );

    if (entry.kind === "meta") {
      return (
        <>
          <MetaLineContent label={entry.label} revealed={revealed} />
          {caret}
        </>
      );
    }

    if (entry.kind === "link") {
      return (
        <Link href={entry.href}>
          {revealed}
          {caret}
        </Link>
      );
    }

    return (
      <>
        <span>{revealed}</span>
        {caret}
      </>
    );
  }

  return (
    <div>
      {(() => {
        const nodes: React.ReactNode[] = [];
        let i = 0;
        while (i < entries.length) {
          if (i > entryIndex) break; // not reached yet — like a terminal that hasn't printed it

          const entry = entries[i];

          if (entry.kind === "link") {
            // consecutive link entries share one flex row instead of
            // stacking, since they're rendered side-by-side in the UI
            const rowIndices: number[] = [];
            let j = i;
            while (j < entries.length && entries[j].kind === "link" && j <= entryIndex) {
              rowIndices.push(j);
              j++;
            }
            nodes.push(
              <div
                key={i}
                className="flex justify-between items-center pt-10 border-t border-[var(--color-border)] mb-20"
              >
                {rowIndices.map((idx) => (
                  <span key={idx} className={entryClassName(entries[idx])}>
                    {renderEntry(entries[idx], idx)}
                  </span>
                ))}
              </div>
            );
            i = j;
            continue;
          }

          nodes.push(
            <div key={i} className={entryClassName(entry)}>
              {renderEntry(entry, i)}
            </div>
          );
          i++;
        }
        return nodes;
      })()}
    </div>
  );
}
