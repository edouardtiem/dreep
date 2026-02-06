interface CoutHeroProps {
  statNumber: string;
  statLabel: string;
  subtitle: string;
}

export default function CoutHero({ statNumber, statLabel, subtitle }: CoutHeroProps) {
  return (
    <section className="text-center space-y-6">
      <p className="font-mono text-[52px] md:text-[64px] text-cost font-bold tabular-nums tracking-[-0.03em] leading-none cost-glow">
        {statNumber}
      </p>
      <h1 className="font-serif text-[28px] md:text-[36px] font-normal text-ink tracking-[-0.02em] leading-tight">
        {statLabel}
      </h1>
      <p className="text-[15px] text-slate tracking-[-0.01em] max-w-lg mx-auto">
        {subtitle}
      </p>
    </section>
  );
}
