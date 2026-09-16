"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative group py-1">
      {children}
      <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-[var(--color-earth-light)] transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile menu is open, and always close it if
  // the viewport grows back past the mobile breakpoint (e.g. rotating to
  // landscape) so it can never get stuck open behind the desktop nav.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-30 flex items-center justify-between px-6 md:px-10 py-5 md:py-6 bg-gradient-to-b from-[var(--color-bg)]/70 to-transparent">
      <Link href="/" className="flex items-center relative z-40" onClick={() => setOpen(false)}>
        <Image
          src="/logo/krysalis-logo-main.png"
          alt="Krysalis Group"
          width={180}
          height={90}
          className="w-28 md:w-36 h-auto opacity-95"
          priority
        />
      </Link>

      {/* Desktop nav — hidden below md, where it doesn't reliably fit */}
      <nav className="hidden md:flex items-center gap-9 font-[family-name:var(--font-tactical-mono)] tracking-wide text-base">
        {LINKS.map((l) => (
          <NavLink key={l.href} href={l.href}>
            {l.label}
          </NavLink>
        ))}
        <motion.a
          whileHover={{ scale: 1.15, color: "#d4b896" }}
          href="https://instagram.com/krysalisgrp"
          target="_blank"
          rel="noreferrer"
          aria-label="Krysalis on Instagram"
        >
          <InstagramIcon />
        </motion.a>
      </nav>

      {/* Mobile menu toggle — below md only */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="md:hidden relative z-40 w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
      >
        <span
          className="block w-6 h-[1.5px] bg-[var(--color-text)] transition-transform duration-300"
          style={open ? { transform: "translateY(6.5px) rotate(45deg)" } : undefined}
        />
        <span
          className="block w-6 h-[1.5px] bg-[var(--color-text)] transition-opacity duration-200"
          style={open ? { opacity: 0 } : undefined}
        />
        <span
          className="block w-6 h-[1.5px] bg-[var(--color-text)] transition-transform duration-300"
          style={open ? { transform: "translateY(-6.5px) rotate(-45deg)" } : undefined}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-30 bg-[var(--color-bg)]/98 backdrop-blur-sm flex flex-col items-center justify-center gap-8"
          >
            {LINKS.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 + i * 0.05 }}
              >
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-[family-name:var(--font-tactical-mono)] uppercase tracking-[0.2em] text-2xl"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.a
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 + LINKS.length * 0.05 }}
              href="https://instagram.com/krysalisgrp"
              target="_blank"
              rel="noreferrer"
              aria-label="Krysalis on Instagram"
              className="mt-2"
            >
              <InstagramIcon />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
