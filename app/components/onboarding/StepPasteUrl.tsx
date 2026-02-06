"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CompanyUnderstanding, AnalyzeResponse, AnalyzeErrorResponse } from "@/app/lib/types";

const OBJECTIONS = [
  "On n\u2019a pas le budget cette ann\u00e9e",
  "C\u2019est trop cher pour nous",
  "On va r\u00e9fl\u00e9chir en interne",
  "Pas la priorit\u00e9 en ce moment",
  "Revenez l\u2019ann\u00e9e prochaine",
  "On a d\u00e9j\u00e0 un outil",
  "Le timing n\u2019est pas bon",
  "Il faut que j\u2019en parle \u00e0 mon directeur",
  "On n\u2019a pas les ressources",
  "Envoyez-moi un email",
  "On est en r\u00e9duction de co\u00fbts",
  "Ce n\u2019est pas dans notre roadmap",
  "On va comparer avec d\u2019autres solutions",
  "C\u2019est int\u00e9ressant mais pas maintenant",
  "Notre budget est d\u00e9j\u00e0 allou\u00e9",
];

const EUR_PER_SECOND = 0.08;

/* Shared blur-in entrance */
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const blurIn = (delay: number) => ({
  initial: { opacity: 0, y: 20, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.6, delay, ease: EASE },
});

/* ------------------------------------------------------------------ */
/*  StrikethroughObjection                                             */
/* ------------------------------------------------------------------ */
function StrikethroughObjection({ dark = false }: { dark?: boolean }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "pause" | "strike" | "out">("in");

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === "in") {
      timeout = setTimeout(() => setPhase("pause"), 600);
    } else if (phase === "pause") {
      timeout = setTimeout(() => setPhase("strike"), 1500);
    } else if (phase === "strike") {
      timeout = setTimeout(() => setPhase("out"), 1100);
    } else if (phase === "out") {
      timeout = setTimeout(() => {
        setIndex((prev) => (prev + 1) % OBJECTIONS.length);
        setPhase("in");
      }, 800);
    }

    return () => clearTimeout(timeout);
  }, [phase]);

  return (
    <div className="h-[36px] md:h-[44px] flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="relative inline-block text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "out" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: phase === "out" ? 0.8 : 0.6, ease: "easeInOut" }}
        >
          <span className={`font-serif italic text-[18px] md:text-[22px] select-none leading-none ${dark ? "text-hero-subtle" : "text-mist"}`}>
            &laquo;&nbsp;{OBJECTIONS[index]}&nbsp;&raquo;
          </span>

          <motion.span
            className={`absolute left-0 top-1/2 h-[2px] w-full pointer-events-none ${dark ? "bg-hero-cost" : "bg-cost"}`}
            style={{ transformOrigin: "left", translateY: "-50%" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase === "strike" || phase === "out" ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CostCounter — giant standalone display                             */
/* ------------------------------------------------------------------ */
function CostCounter() {
  const spanRef = useRef<HTMLSpanElement>(null);
  const startTime = useRef<number | null>(null);
  const rafId = useRef<number>(0);

  const tick = useCallback((now: number) => {
    if (startTime.current === null) startTime.current = now;
    const elapsed = (now - startTime.current) / 1000;
    const val = (elapsed * EUR_PER_SECOND).toLocaleString("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    if (spanRef.current) spanRef.current.textContent = `${val} €`;
    rafId.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [tick]);

  return (
    <motion.div className="flex flex-col items-center gap-1" {...blurIn(0.5)}>
      <span
        ref={spanRef}
        className="font-mono text-[40px] md:text-[56px] font-semibold tabular-nums tracking-[-0.04em] text-hero-cost cost-glow will-change-contents"
      >
        0,00 &euro;
      </span>
      <span className="text-[13px] text-hero-subtle tracking-[-0.01em]">
        co&ucirc;t de l&apos;inaction depuis votre arriv&eacute;e
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  InactionTicker — small version for non-hero                        */
/* ------------------------------------------------------------------ */
function InactionTicker() {
  const spanRef = useRef<HTMLSpanElement>(null);
  const startTime = useRef<number | null>(null);
  const rafId = useRef<number>(0);

  const tick = useCallback((now: number) => {
    if (startTime.current === null) startTime.current = now;
    const elapsed = (now - startTime.current) / 1000;
    const val = (elapsed * EUR_PER_SECOND).toLocaleString("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    if (spanRef.current) spanRef.current.textContent = val;
    rafId.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [tick]);

  return (
    <motion.p
      className="text-[13px] md:text-[14px] text-slate text-center tracking-[-0.01em] leading-relaxed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1.2 }}
    >
      Pendant que vous lisez ceci, l&apos;inaction a co&ucirc;t&eacute;{" "}
      <span ref={spanRef} className="font-mono text-cost font-semibold tabular-nums will-change-contents">
        0,00
      </span>
      &nbsp;&euro; &agrave; votre prospect
    </motion.p>
  );
}

/* ------------------------------------------------------------------ */
/*  StepPasteUrl                                                       */
/* ------------------------------------------------------------------ */
interface StepPasteUrlProps {
  onNext: (url: string, understanding: CompanyUnderstanding) => void;
  hero?: boolean;
}

interface SavedDiagnostic {
  id: string;
  url: string;
  createdAt: string;
}

export default function StepPasteUrl({ onNext, hero = false }: StepPasteUrlProps) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedDiagnostics, setSavedDiagnostics] = useState<SavedDiagnostic[]>([]);
  const [copied, setCopied] = useState(false);

  // Read saved diagnostics from localStorage (SSR-safe)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("dreep_diagnostics");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedDiagnostics(parsed);
        }
      }
    } catch {
      // localStorage unavailable — ignore
    }
  }, []);

  const handleAnalyze = async () => {
    if (!url.trim()) return;
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const json: AnalyzeResponse | AnalyzeErrorResponse = await res.json();

      if (!json.success) {
        setError(json.error);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      onNext(url, json.data.understanding);
    } catch {
      setError("Erreur interne. R\u00e9essayez.");
      setIsLoading(false);
    }
  };

  // Non-hero: simple centered layout (used in /onboarding)
  if (!hero) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <div className="relative z-10 flex flex-col items-center space-y-8 w-full">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-[28px] font-normal text-ink">
              Commen&ccedil;ons par votre site
            </h2>
            <p className="text-[15px] text-slate tracking-[-0.01em]">
              On va analyser votre activit&eacute; pour cr&eacute;er votre calculateur.
            </p>
          </div>

          <div className="w-full max-w-lg space-y-4">
            <label
              htmlFor="website-url"
              className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-slate"
            >
              Votre site web
            </label>
            <input
              id="website-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.votre-entreprise.com"
              className="w-full border border-border rounded-[10px] py-3.5 px-[18px] text-[15px] bg-surface text-ink focus:outline-none focus:ring-2 focus:ring-ink/10 focus:border-ink transition-all duration-150 placeholder:text-mist"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAnalyze();
              }}
            />

            <button
              onClick={handleAnalyze}
              disabled={!url.trim() || isLoading}
              className="w-full bg-ink text-white rounded-[10px] py-3.5 px-7 text-[15px] font-semibold hover:bg-ink-light transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="inline-block w-1.5 h-1.5 rounded-full bg-white"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 0.9,
                          repeat: Infinity,
                          delay: i * 0.15,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </span>
                  Analyse en cours
                </span>
              ) : (
                "Analyser \u2192"
              )}
            </button>

            {error && (
              <p className="text-[14px] text-cost text-center">{error}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Hero: dark, €50M launch feel
  return (
    <div className="flex flex-col items-center space-y-8">
      {/* 1. Strikethrough objection */}
      <motion.div {...blurIn(0)}>
        <StrikethroughObjection dark />
      </motion.div>

      {/* 2. Headline */}
      <div className="text-center space-y-5 max-w-2xl">
        <motion.h1
          className="font-serif text-[40px] md:text-[56px] lg:text-[64px] font-normal text-hero-text tracking-[-0.04em] leading-[1.08]"
          {...blurIn(0.2)}
        >
          Les meilleurs closers
          <br />
          ne pitchent plus. <span className="italic">Ils calculent.</span>
        </motion.h1>
        <motion.p
          className="text-[16px] md:text-[18px] text-hero-muted tracking-[-0.01em] leading-relaxed"
          {...blurIn(0.35)}
        >
          Collez votre URL. Votre prospect voit ce que
          l&apos;inaction lui co&ucirc;te. Vous,{" "}
          <span className="relative inline-block">
            vous signez.
            {/* Draw-in underline on the punchline */}
            <motion.span
              className="absolute left-0 bottom-[-2px] h-[2px] w-full rounded-[1px] pointer-events-none"
              style={{
                background: "rgba(99, 102, 241, 0.6)",
                transformOrigin: "left",
              }}
              initial={{ scaleX: 0, opacity: 0.6 }}
              animate={{ scaleX: 1, opacity: [0.6, 0.6, 0.85, 0.6] }}
              transition={{
                scaleX: {
                  delay: 1.15,
                  duration: 0.5,
                  ease: [0.22, 0.61, 0.36, 1],
                },
                opacity: {
                  delay: 1.65,
                  duration: 1.5,
                  ease: "easeInOut",
                },
              }}
            />
          </span>
        </motion.p>
      </div>

      {/* 3. Giant live cost counter */}
      <CostCounter />

      {/* 4. Unified input bar */}
      <motion.div className="w-full max-w-xl" {...blurIn(0.7)}>
        {/* Desktop: unified container */}
        <div className="hidden md:flex items-center bg-hero-surface border border-hero-border rounded-xl shadow-[0_0_0_1px_rgba(255,255,255,0.06)] focus-within:border-brand/40 focus-within:shadow-[0_0_0_1px_rgba(99,102,241,0.15)] transition-all duration-200">
          <input
            id="website-url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.votre-entreprise.com"
            className="flex-1 bg-transparent py-3.5 pl-4 pr-2 text-[15px] text-hero-text placeholder:text-hero-subtle focus:outline-none"
            disabled={isLoading}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAnalyze();
            }}
          />
          <button
            onClick={handleAnalyze}
            disabled={!url.trim() || isLoading}
            aria-label="Cr\u00e9er mon calculateur"
            className="m-1.5 bg-brand text-white rounded-lg py-2.5 px-5 text-[14px] font-semibold hover:bg-brand-hover transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="inline-block w-1.5 h-1.5 rounded-full bg-white"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 0.9,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </span>
                Analyse...
              </span>
            ) : (
              "Cr\u00e9er mon calculateur \u2192"
            )}
          </button>
        </div>

        {/* Mobile: stacked */}
        <div className="flex flex-col gap-3 md:hidden">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.votre-entreprise.com"
            className="w-full bg-hero-surface border border-hero-border rounded-xl py-3.5 px-4 text-[15px] text-hero-text placeholder:text-hero-subtle focus:outline-none focus:border-brand/40 transition-all duration-200"
            disabled={isLoading}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAnalyze();
            }}
          />
          <button
            onClick={handleAnalyze}
            disabled={!url.trim() || isLoading}
            aria-label="Cr\u00e9er mon calculateur"
            className="w-full bg-brand text-white rounded-xl py-3.5 px-5 text-[15px] font-semibold hover:bg-brand-hover transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="inline-block w-1.5 h-1.5 rounded-full bg-white"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 0.9,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </span>
                Analyse...
              </span>
            ) : (
              "Cr\u00e9er mon calculateur \u2192"
            )}
          </button>
        </div>

        {error && (
          <p className="text-[14px] text-hero-cost text-center mt-3">{error}</p>
        )}
      </motion.div>

      {/* 5. Trust line */}
      <motion.p
        className="text-[13px] text-hero-subtle text-center font-medium tracking-[-0.01em]"
        {...blurIn(0.9)}
      >
        Gratuit{" "}
        <span className="text-hero-subtle/40 mx-1">|</span>{" "}
        Sans inscription{" "}
        <span className="text-hero-subtle/40 mx-1">|</span>{" "}
        <span className="font-mono">30</span> secondes
      </motion.p>

      {/* 6. Returning user card */}
      {savedDiagnostics.length > 0 && (
        <motion.div
          className="w-full max-w-xl bg-hero-surface border border-hero-border rounded-xl px-4 py-3 flex items-center justify-between gap-3"
          {...blurIn(1.1)}
        >
          <div className="min-w-0">
            <p className="text-[13px] text-hero-muted font-medium">
              Votre dernier calculateur
            </p>
            <p className="text-[13px] text-hero-text truncate">
              {savedDiagnostics[0].url}
            </p>
            {savedDiagnostics.length > 1 && (
              <p className="text-[12px] text-hero-subtle mt-0.5">
                et {savedDiagnostics.length - 1} autre{savedDiagnostics.length > 2 ? "s" : ""}
              </p>
            )}
          </div>
          <button
            onClick={() => {
              const link = window.location.origin + "/d/" + savedDiagnostics[0].id;
              navigator.clipboard.writeText(link).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              });
            }}
            className="shrink-0 text-[13px] text-hero-text bg-hero-border hover:bg-hero-subtle/30 rounded-lg px-3 py-1.5 transition-colors duration-150 cursor-pointer"
          >
            {copied ? "Copi\u00e9 !" : "Copier le lien"}
          </button>
        </motion.div>
      )}
    </div>
  );
}
