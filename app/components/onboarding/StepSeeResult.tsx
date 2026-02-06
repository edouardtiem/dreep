"use client";

import ResultPage from "@/app/components/ResultPage";
import type { Breakdown } from "@/app/lib/types";

interface StepSeeResultProps {
  breakdowns: Breakdown[];
  annualCost: number;
  onNext: () => void;
  onBack: () => void;
}

export default function StepSeeResult({
  breakdowns,
  annualCost,
  onNext,
  onBack,
}: StepSeeResultProps) {
  return (
    <div className="space-y-8">
      {/* Embedded result page */}
      <div className="border border-border rounded-xl overflow-hidden">
        <ResultPage annualCost={annualCost} breakdowns={breakdowns} />
      </div>

      {/* Validation section */}
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h3 className="font-serif text-[22px] font-normal text-ink">
            Ce résultat correspond à la réalité de votre prospect ?
          </h3>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onNext}
            className="bg-action text-white rounded-[10px] py-3.5 px-7 text-[15px] font-semibold hover:opacity-90 transition-opacity duration-150 cursor-pointer"
          >
            Oui, c&apos;est crédible
          </button>
          <button
            onClick={onBack}
            className="bg-cloud text-ink-light rounded-[10px] py-3.5 px-7 text-[15px] font-medium hover:bg-border transition-colors duration-150 cursor-pointer"
          >
            Non, ajuster
          </button>
        </div>
      </div>
    </div>
  );
}
