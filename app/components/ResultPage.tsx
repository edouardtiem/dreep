"use client";

import type { Breakdown } from "./mockData";
import CountUpNumber from "./CountUpNumber";
import CostBarChart from "./CostBarChart";
import DripCounter from "./DripCounter";
import CalculationBreakdown from "./CalculationBreakdown";

interface ResultPageProps {
  annualCost: number;
  breakdowns: Breakdown[];
  title?: string;
}

export default function ResultPage({
  annualCost,
  breakdowns,
  title = "Votre probl\u00e8me vous co\u00fbte",
}: ResultPageProps) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 md:py-32">
      {/* Cost card */}
      <div className="bg-cost-wash border border-cost-light/30 rounded-2xl p-8 md:p-12 text-center">
        <p className="font-serif text-[22px] text-ink-light tracking-[-0.01em] leading-[1.3]">
          {title}
        </p>

        <div className="mt-6">
          <CountUpNumber value={annualCost} />
        </div>

        <p className="text-[15px] text-mist font-medium mt-3 tracking-[-0.01em]">
          par an
        </p>
      </div>

      <hr className="border-border my-12" />

      <CostBarChart annualCost={annualCost} />

      <hr className="border-border my-12" />

      <DripCounter annualCost={annualCost} />

      <hr className="border-border my-12" />

      <CalculationBreakdown breakdowns={breakdowns} />
    </div>
  );
}
