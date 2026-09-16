export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-6 md:px-10 py-10 md:py-12">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-1">
        <p className="font-[family-name:var(--font-tactical-mono)] uppercase tracking-[0.2em] text-sm text-[var(--color-text)]">
          Krysalis Media
        </p>
        <p className="font-[family-name:var(--font-tactical-mono)] text-xs uppercase tracking-[0.12em] text-[var(--color-text-dim)]">
          Tactical Media &amp; Production Studio
        </p>
        <p className="font-[family-name:var(--font-body)] text-xs text-[var(--color-text-dim)] mt-2">
          United Kingdom / Available for travel
        </p>
        <p className="font-[family-name:var(--font-body)] text-[10px] text-[var(--color-text-dim)] mt-6">
          &copy; {new Date().getFullYear()} Krysalis Group
        </p>
      </div>
    </footer>
  );
}
