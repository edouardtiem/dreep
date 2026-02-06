"use client";

import { useState, useEffect } from "react";
import { useMotionValue, useTransform, animate, motion } from "framer-motion";

const formatter = new Intl.NumberFormat("fr-FR");

interface CountUpNumberProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export default function CountUpNumber({
  value,
  duration = 1.8,
  prefix = "",
  suffix = " \u20AC",
}: CountUpNumberProps) {
  const motionValue = useMotionValue(0);
  const formatted = useTransform(motionValue, (latest) =>
    formatter.format(Math.round(latest))
  );
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    const unsubscribe = formatted.on("change", (latest) => {
      setDisplay(`${prefix}${latest}${suffix}`);
    });

    const controls = animate(motionValue, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, duration, prefix, suffix, motionValue, formatted]);

  return (
    <motion.span
      className="font-mono text-[52px] md:text-[64px] text-cost font-bold tabular-nums tracking-[-0.03em] leading-none"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {display}
    </motion.span>
  );
}
