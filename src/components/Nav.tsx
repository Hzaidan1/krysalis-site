"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative group py-1">
      {children}
      <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-[var(--color-earth-light)] transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-30 flex items-center justify-between px-6 md:px-10 py-5 md:py-6 bg-gradient-to-b from-[var(--color-bg)]/70 to-transparent">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo/krysalis-logo-main.png"
          alt="Krysalis Group"
          width={180}
          height={90}
          className="w-28 md:w-36 h-auto opacity-95"
          priority
        />
      </Link>

      <nav className="flex items-center gap-6 md:gap-9 font-[family-name:var(--font-tactical-mono)] tracking-wide text-sm md:text-base">
        <NavLink href="/work">Work</NavLink>
        <NavLink href="/capabilities">Capabilities</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/contact">Contact</NavLink>
        <motion.a
          whileHover={{ scale: 1.15, color: "#d4b896" }}
          href="https://instagram.com/krysalisgrp"
          target="_blank"
          rel="noreferrer"
          aria-label="Krysalis on Instagram"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4.2" />
            <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
          </svg>
        </motion.a>
      </nav>
    </header>
  );
}
