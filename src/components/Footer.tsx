export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-bg)] px-6 md:px-10 py-10 md:py-12">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center gap-1">
        <p className="w-full font-[family-name:var(--font-tactical-mono)] uppercase tracking-[0.2em] text-sm text-[var(--color-text)] text-center">
          Krysalis Media
        </p>
        <p className="w-full font-[family-name:var(--font-tactical-mono)] text-xs uppercase tracking-[0.12em] text-[var(--color-text-dim)] text-center">
          Tactical Media &amp; Production Studio
        </p>
        <p className="w-full font-[family-name:var(--font-body)] text-xs text-[var(--color-text-dim)] text-center mt-2">
          United Kingdom / Available for travel
        </p>
        <p className="w-full font-[family-name:var(--font-body)] text-[10px] text-[var(--color-text-dim)] text-center mt-6">
          &copy; {new Date().getFullYear()} Krysalis Group
        </p>
      </div>
    </footer>
  );
}
