"use client";

import { motion } from "framer-motion";

const formatter = new Intl.NumberFormat("fr-FR");

interface CostBarChartProps {
  annualCost: number;
}

export default function CostBarChart({ annualCost }: CostBarChartProps) {
  const periods = [
    { label: "Semaine", value: annualCost / 52 },
    { label: "Mois", value: annualCost / 12 },
    { label: "Trimestre", value: annualCost / 4 },
    { label: "Ann\u00e9e", value: annualCost },
  ];

  return (
    <div className="w-full space-y-3">
      {periods.map((period, index) => {
        const widthPercent = (period.value / annualCost) * 100;
        const isAnnual = index === periods.length - 1;

        return (
          <div key={period.label} className="space-y-1.5 md:space-y-0">
            {/* Mobile: label + value on top row */}
            <div className="flex items-baseline justify-between md:hidden">
              <span className="text-[13px] font-medium text-slate">
                {period.label}
              </span>
              <span
                className={`font-mono text-[15px] font-semibold tracking-[-0.01em] ${
                  isAnnual ? "text-cost" : "text-ink"
                }`}
              >
                {formatter.format(Math.round(period.value))}&nbsp;&euro;
              </span>
            </div>

            {/* Bar row */}
            <div className="flex items-center gap-4">
              {/* Desktop label */}
              <span className="hidden md:block w-24 shrink-0 text-[13px] font-medium text-slate text-right">
                {period.label}
              </span>

              <div className="flex-1 h-10 bg-cloud rounded-[6px] overflow-hidden">
                <motion.div
                  className={`h-full rounded-[6px] ${
                    isAnnual ? "bg-cost" : "bg-ink"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPercent}%` }}
                  transition={{
                    duration: 0.6,
                    delay: (index + 1) * 0.3,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                />
              </div>

              {/* Desktop value */}
              <span
                className={`hidden md:block w-36 shrink-0 text-right font-mono text-[16px] font-semibold tracking-[-0.01em] ${
                  isAnnual ? "text-cost" : "text-ink"
                }`}
              >
                {formatter.format(Math.round(period.value))}&nbsp;&euro;
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
