"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline" | "ghost";
  type?: "button" | "submit";
  arrow?: boolean;
};

export default function Button({
  label,
  href,
  onClick,
  variant = "solid",
  type = "button",
  arrow = true,
}: Props) {
  const base =
    "group relative font-[family-name:var(--font-tactical-mono)] font-medium text-sm tracking-[0.22em] uppercase px-9 py-4 inline-flex items-center justify-center gap-2 overflow-hidden";

  const styles = {
    solid:
      "bg-[var(--color-earth-light)] text-[var(--color-bg)] shadow-[0_0_20px_rgba(212,184,150,0.25)]",
    outline:
      "border-2 border-[var(--color-earth-light)]/70 text-[var(--color-text)] bg-[var(--color-bg)]/40 backdrop-blur-sm",
    ghost:
      "text-[var(--color-text)] border-b border-[var(--color-border)] hover:border-[var(--color-earth-light)] px-1 py-2 transition-[letter-spacing] duration-300 group-hover:tracking-[0.3em]",
  };

  const content = (
    <motion.span
      whileHover={{
        scale: variant === "ghost" ? 1 : 1.05,
        boxShadow:
          variant === "solid"
            ? "0 0 36px rgba(212,184,150,0.6)"
            : variant === "outline"
            ? "0 0 24px rgba(212,184,150,0.35)"
            : "none",
      }}
      whileTap={{ scale: variant === "ghost" ? 1 : 0.94 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={`${base} ${styles[variant]}`}
    >
      {variant !== "ghost" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[120%] group-hover:translate-x-[420%] transition-transform duration-700 ease-out"
        />
      )}
      {label}
      {arrow && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          &rarr;
        </span>
      )}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className="inline-block">
      {content}
    </button>
  );
}
