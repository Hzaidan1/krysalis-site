import Image from "next/image";

export default function HeroOutro() {
  return (
    <section className="bg-[var(--color-bg)] py-24 md:py-32 px-6 flex flex-col items-center text-center border-t border-[var(--color-border)]">
      <Image
        src="/logo/krysalis-logo-main.png"
        alt="Krysalis Group"
        width={220}
        height={110}
        className="w-40 md:w-48 h-auto opacity-90 mb-8"
      />
      <div className="font-[family-name:var(--font-body)] text-xs tracking-[0.2em] uppercase text-[var(--color-text-dim)] space-y-2">
        {/* placeholder — swap in real credits */}
        <p>Shot on location — [Location], UK</p>
        <p>Directed &amp; Edited — [Founder Name]</p>
        <p className="pt-2 text-[var(--color-earth-light)]">
          &copy; {new Date().getFullYear()} Krysalis Group
        </p>
      </div>
    </section>
  );
}
