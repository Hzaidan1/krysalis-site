"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/Button";
import ReactiveBackground from "@/components/ReactiveBackground";

const PROJECT_TYPES = [
  "Full Production",
  "Post-Production",
  "Brand Content",
  "Event Coverage",
  "Production Support",
  "Creative Development",
  "Something Else",
];

// Curated timestamps in bg-prep.mp4 — one per step, evenly spaced so each
// transition takes a similar, moderate amount of time (swap these for your
// own hand-picked sharp/well-composed frames whenever you like).
const FRAMES = [1, 4.5, 8, 11.5];

const labelClass =
  "block font-[family-name:var(--font-tactical-mono)] text-xs md:text-[13px] uppercase tracking-[0.18em] text-[var(--color-text-dim)] mb-3 transition-colors duration-300 group-focus-within:text-[var(--color-earth-light)]";
const inputClass =
  "w-full bg-[var(--color-bg-elevated)]/70 border border-[rgba(212,184,150,0.3)] rounded-sm px-5 py-4 outline-none font-[family-name:var(--font-body)] text-lg md:text-xl placeholder:text-[var(--color-text-dim)]/40 transition-all duration-300 focus:border-[var(--color-earth-light)] focus:bg-[var(--color-bg-elevated)]/90 focus:shadow-[0_0_0_1px_rgba(212,184,150,0.3),0_0_28px_rgba(212,184,150,0.16)]";

const fieldContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const fieldItemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const } },
};

type FormState = {
  name: string;
  org: string;
  email: string;
  projectType: string;
  description: string;
  timeframe: string;
  budget: string;
  links: string;
  website: string; // honeypot
};

const EMPTY: FormState = {
  name: "",
  org: "",
  email: "",
  projectType: "",
  description: "",
  timeframe: "",
  budget: "",
  links: "",
  website: "",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <motion.div variants={fieldItemVariants} className="group">
      <label className={labelClass}>{label}</label>
      {children}
    </motion.div>
  );
}

export default function ContactClient() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  function update(field: keyof FormState, value: string) {
    setData((d) => ({ ...d, [field]: value }));
  }

  function stepValid(): boolean {
    if (step === 0) return data.name.trim() !== "" && data.org.trim() !== "";
    if (step === 1) return data.email.trim() !== "" && data.projectType !== "";
    if (step === 2) return data.description.trim() !== "";
    if (step === 3) return data.timeframe.trim() !== "";
    return true;
  }

  function next() {
    if (!stepValid()) {
      setError("Please fill this in before continuing.");
      return;
    }
    setError("");
    setStep((s) => Math.min(s + 1, FRAMES.length - 1));
  }

  function back() {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit() {
    if (!stepValid()) {
      setError("Please fill this in before sending.");
      return;
    }
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong sending your message — please try again or DM us on Instagram.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center overflow-x-hidden px-6 relative">
        <ReactiveBackground
          src="/videos/bg-prep.mp4"
          frames={FRAMES}
          activeIndex={FRAMES.length - 1}
          grayscale
        />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center max-w-md"
        >
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl mb-4">
            Brief Received
          </h1>
          <p className="font-[family-name:var(--font-body)] font-light tracking-wide text-[var(--color-text-dim)]">
            We&apos;ll take a look and come back to you directly.
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full flex justify-center overflow-x-hidden px-4 sm:px-6 lg:px-10 pt-32 md:pt-36 pb-24 md:pb-32">
      <ReactiveBackground
        src="/videos/bg-prep.mp4"
        frames={FRAMES}
        activeIndex={step}
        grayscale
      />
      <div className="relative z-10 w-full max-w-2xl">
        <PageHeader
          kicker="Contact"
          title="Start a Project."
          subtitle="Full production, post-production, brand content, event coverage or tactical production support — tell us what you're working on and where Krysalis could fit into it. A finished brief isn't required."
        />

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10 font-[family-name:var(--font-tactical-mono)] text-sm text-[var(--color-text-dim)]">
          <span className="uppercase tracking-[0.1em] text-xs">
            UK-based and available for travel.
          </span>
          <a
            href="https://instagram.com/krysalisgrp"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-[var(--color-earth-light)] transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4.2" />
              <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
            </svg>
            @krysalisgrp
          </a>
        </div>

        {/* step progress */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-[family-name:var(--font-tactical-mono)] text-[var(--color-earth-light)] text-base border border-[var(--color-earth-light)]/40 px-3 py-1">
            {String(step + 1).padStart(2, "0")} / {String(FRAMES.length).padStart(2, "0")}
          </span>
          <div className="flex-1 h-[3px] bg-[var(--color-border)]">
            <motion.div
              className="h-full bg-[var(--color-earth-light)]"
              animate={{ width: `${((step + 1) / FRAMES.length) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>
        </div>

        {/* honeypot */}
        <input
          type="text"
          value={data.website}
          onChange={(e) => update("website", e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="bg-[var(--color-bg)]/50 backdrop-blur-md border border-[var(--color-border)] p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={fieldContainerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, x: -16, transition: { duration: 0.3 } }}
              className="space-y-8"
            >
              {step === 0 && (
                <>
                  <Field label="Name">
                    <input
                      className={inputClass}
                      value={data.name}
                      onChange={(e) => update("name", e.target.value)}
                    />
                  </Field>
                  <Field label="Company, brand or production">
                    <input
                      className={inputClass}
                      value={data.org}
                      onChange={(e) => update("org", e.target.value)}
                    />
                  </Field>
                </>
              )}

              {step === 1 && (
                <>
                  <Field label="Email">
                    <input
                      type="email"
                      className={inputClass}
                      value={data.email}
                      onChange={(e) => update("email", e.target.value)}
                    />
                  </Field>
                  <Field label="Project type">
                    <div className="relative">
                      <select
                        className={`${inputClass} appearance-none pr-12`}
                        value={data.projectType}
                        onChange={(e) => update("projectType", e.target.value)}
                      >
                        <option value="" disabled>
                          Select one
                        </option>
                        {PROJECT_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[var(--color-earth-light)]">
                        &darr;
                      </span>
                    </div>
                  </Field>
                </>
              )}

              {step === 2 && (
                <Field label="Project details">
                  <textarea
                    rows={5}
                    className={inputClass}
                    placeholder="What are you trying to make, and where do you need us?"
                    value={data.description}
                    onChange={(e) => update("description", e.target.value)}
                  />
                </Field>
              )}

              {step === 3 && (
                <>
                  <Field label="Ideal timeframe">
                    <input
                      className={inputClass}
                      value={data.timeframe}
                      onChange={(e) => update("timeframe", e.target.value)}
                    />
                  </Field>
                  <Field label="Budget range (optional)">
                    <input
                      className={inputClass}
                      value={data.budget}
                      onChange={(e) => update("budget", e.target.value)}
                    />
                  </Field>
                  <Field label="Reference / footage link (optional)">
                    <input
                      className={inputClass}
                      value={data.links}
                      onChange={(e) => update("links", e.target.value)}
                    />
                  </Field>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {error && (
            <p className="font-[family-name:var(--font-body)] text-sm text-red-400 mt-6">
              {error}
            </p>
          )}

          <div className="flex justify-between items-center mt-10">
            {step > 0 ? (
              <Button label="Back" onClick={back} variant="ghost" arrow={false} />
            ) : (
              <span />
            )}

            {step < FRAMES.length - 1 ? (
              <Button label="Next" onClick={next} variant="solid" />
            ) : (
              <Button
                label={sending ? "Sending…" : "Send Project"}
                onClick={submit}
                variant="solid"
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
