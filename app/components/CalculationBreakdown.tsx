"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Breakdown } from "./mockData";

const formatter = new Intl.NumberFormat("fr-FR");

interface CalculationBreakdownProps {
  breakdowns: Breakdown[];
}

export default function CalculationBreakdown({
  breakdowns,
}: CalculationBreakdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const grouped: { category: string; items: Breakdown[] }[] = [];
  for (const b of breakdowns) {
    const existing = grouped.find((g) => g.category === b.category);
    if (existing) {
      existing.items.push(b);
    } else {
      grouped.push({ category: b.category, items: [b] });
    }
  }

  const total = breakdowns.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="w-full border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-cloud transition-colors duration-150 cursor-pointer"
      >
        <span className="text-[15px] font-semibold text-ink-light">
          Comment on arrive &agrave; ce chiffre
        </span>
        <svg
          className={`w-5 h-5 text-mist transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-6">
              {grouped.map((group) => (
                <div key={group.category} className="space-y-3">
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-mist">
                    {group.category}
                  </h4>

                  {group.items.map((item, idx) => (
                    <div
                      key={`${group.category}-${idx}`}
                      className="flex items-start justify-between gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-[15px] text-ink-light">{item.label}</p>
                        <p className="text-[13px] text-mist mt-0.5">
                          {item.formula}
                        </p>
                      </div>
                      <span className="font-mono text-[16px] font-semibold text-ink shrink-0 tracking-[-0.01em]">
                        {formatter.format(item.amount)}&nbsp;&euro;
                      </span>
                    </div>
                  ))}
                </div>
              ))}

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-[15px] font-semibold text-ink">
                  Total
                </span>
                <span className="font-mono text-[20px] font-bold text-cost tracking-[-0.02em]">
                  {formatter.format(total)}&nbsp;&euro;
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
