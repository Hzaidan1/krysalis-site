import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-6 md:px-10 py-12 md:py-16">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div>
          <p className="font-[family-name:var(--font-display)] uppercase tracking-[0.2em] text-sm text-[var(--color-text)]">
            Krysalis Media
          </p>
          <p className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.12em] text-[var(--color-text-dim)] mt-1">
            Tactical Media &amp; Production Studio
          </p>
          <p className="font-[family-name:var(--font-body)] text-xs text-[var(--color-text-dim)] mt-3">
            United Kingdom / Available for travel
          </p>
        </div>

        <nav className="flex items-center gap-6 font-[family-name:var(--font-display)] tracking-wide text-sm">
          <Link href="/work" className="hover:text-[var(--color-earth-light)] transition-colors">
            Work
          </Link>
          <Link href="/capabilities" className="hover:text-[var(--color-earth-light)] transition-colors">
            Capabilities
          </Link>
          <Link href="/about" className="hover:text-[var(--color-earth-light)] transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-[var(--color-earth-light)] transition-colors">
            Contact
          </Link>
          <a
            href="https://instagram.com/krysalisgrp"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--color-earth-light)] transition-colors"
            aria-label="Krysalis on Instagram"
          >
            Instagram
          </a>
        </nav>
      </div>

      <p className="font-[family-name:var(--font-body)] text-[10px] text-[var(--color-text-dim)] text-center mt-10">
        &copy; {new Date().getFullYear()} Krysalis Group
      </p>
    </footer>
  );
}
