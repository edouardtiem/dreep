"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface DripCounterProps {
  annualCost: number;
}

export default function DripCounter({ annualCost }: DripCounterProps) {
  const costPerSecond = annualCost / (365 * 24 * 3600);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = performance.now();

    const interval = setInterval(() => {
      const secondsElapsed = (performance.now() - start) / 1000;
      setElapsed(secondsElapsed * costPerSecond);
    }, 50);

    return () => clearInterval(interval);
  }, [costPerSecond]);

  const formatted = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(elapsed);

  return (
    <div className="flex items-center justify-center gap-2 py-5">
      {/* Pulsing red dot -- heartbeat effect */}
      <motion.span
        className="inline-block w-2 h-2 rounded-full bg-cost"
        animate={{
          opacity: [1, 0.4, 1],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <span className="text-[14px] text-slate">
        Depuis que vous lisez
      </span>
      <span className="font-mono text-[14px] font-medium text-cost tabular-nums tracking-[-0.01em]">
        -{formatted}&nbsp;&euro;
      </span>
    </div>
  );
}
