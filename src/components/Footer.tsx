export default function Footer() {
  return (
    <footer
      className="border-t border-[var(--color-border)] bg-[var(--color-bg)]"
      style={{ width: "100%", textAlign: "center", padding: "40px 24px" }}
    >
      <p
        className="font-[family-name:var(--font-tactical-mono)] uppercase tracking-[0.2em] text-sm text-[var(--color-text)]"
        style={{ textAlign: "center", margin: "0 auto" }}
      >
        Krysalis Media
      </p>
      <p
        className="font-[family-name:var(--font-tactical-mono)] text-xs uppercase tracking-[0.12em] text-[var(--color-text-dim)]"
        style={{ textAlign: "center", margin: "4px auto 0" }}
      >
        Tactical Media &amp; Production Studio
      </p>
      <p
        className="font-[family-name:var(--font-body)] text-xs text-[var(--color-text-dim)]"
        style={{ textAlign: "center", margin: "8px auto 0" }}
      >
        United Kingdom / Available for travel
      </p>
      <p
        className="font-[family-name:var(--font-body)] text-[10px] text-[var(--color-text-dim)]"
        style={{ textAlign: "center", margin: "24px auto 0" }}
      >
        &copy; {new Date().getFullYear()} Krysalis Group
      </p>
    </footer>
  );
}
