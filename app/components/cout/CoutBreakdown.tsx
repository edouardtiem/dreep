import type { CoutBreakdownItem } from "@/app/lib/cout-types";

const formatter = new Intl.NumberFormat("fr-FR");

interface CoutBreakdownProps {
  items: CoutBreakdownItem[];
}

export default function CoutBreakdown({ items }: CoutBreakdownProps) {
  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <section className="space-y-4">
      <h2 className="font-serif text-[22px] font-normal text-ink tracking-[-0.01em]">
        D&eacute;composition du co&ucirc;t
      </h2>

      <div className="bg-cost-wash border border-cost-light/30 rounded-2xl p-6 md:p-8 space-y-4">
        {items.map((item) => (
          <div key={item.label} className="flex items-start justify-between gap-4">
            <div className="space-y-0.5">
              <p className="text-[15px] font-medium text-ink">{item.label}</p>
              <p className="text-[13px] text-mist">{item.formula}</p>
            </div>
            <span className="font-mono text-[15px] font-semibold text-cost tabular-nums shrink-0">
              {formatter.format(item.amount)}&nbsp;&euro;
            </span>
          </div>
        ))}

        <div className="border-t border-cost-light/30 pt-4 flex items-center justify-between">
          <p className="text-[15px] font-semibold text-ink">Total estim&eacute;</p>
          <span className="font-mono text-[18px] font-bold text-cost tabular-nums">
            {formatter.format(total)}&nbsp;&euro;
          </span>
        </div>
      </div>
    </section>
  );
}
