"use client";

import { useState, useMemo } from "react";
import CountUpNumber from "@/app/components/CountUpNumber";
import type { CoutSlider } from "@/app/lib/cout-types";

interface CoutMiniCalculatorProps {
  sliders: CoutSlider[];
  formula: string;
  resultLabel: string;
}

function evaluate(formula: string, values: number[]): number {
  try {
    const args = values.map((_, i) => `s${i}`);
    const fn = new Function(...args, `return (${formula});`);
    const result = fn(...values);
    return typeof result === "number" && isFinite(result) ? Math.round(result) : 0;
  } catch {
    return 0;
  }
}

export default function CoutMiniCalculator({ sliders, formula, resultLabel }: CoutMiniCalculatorProps) {
  const [values, setValues] = useState<number[]>(() => sliders.map((s) => s.defaultValue));

  const total = useMemo(() => evaluate(formula, values), [formula, values]);

  const updateValue = (index: number, value: number) => {
    setValues((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  return (
    <section className="space-y-6">
      <h2 className="font-serif text-[22px] font-normal text-ink tracking-[-0.01em]">
        Simulez votre situation
      </h2>

      <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 space-y-8">
        {sliders.map((slider, index) => (
          <div key={slider.id} className="space-y-3">
            <div className="flex items-baseline justify-between gap-4">
              <label className="text-[15px] font-medium text-ink-light">
                {slider.label}
              </label>
              <span className="font-mono text-[16px] font-semibold text-ink tracking-[-0.01em] shrink-0">
                {new Intl.NumberFormat("fr-FR").format(values[index])} {slider.unit}
              </span>
            </div>

            <input
              type="range"
              min={slider.min}
              max={slider.max}
              step={slider.step}
              value={values[index]}
              onChange={(e) => updateValue(index, Number(e.target.value))}
              className="w-full h-1.5 bg-cloud rounded-full appearance-none cursor-pointer accent-ink"
            />

            <div className="flex justify-between text-[12px] text-mist">
              <span>
                {new Intl.NumberFormat("fr-FR").format(slider.min)} {slider.unit}
              </span>
              <span>
                {new Intl.NumberFormat("fr-FR").format(slider.max)} {slider.unit}
              </span>
            </div>
          </div>
        ))}

        <div className="border-t border-border pt-6 text-center space-y-2">
          <p className="text-[13px] text-mist font-medium uppercase tracking-wider">
            {resultLabel}
          </p>
          <CountUpNumber value={total} />
          <p className="text-[15px] text-mist font-medium">par an</p>
        </div>
      </div>
    </section>
  );
}
