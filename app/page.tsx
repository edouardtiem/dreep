"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepPasteUrl from "@/app/components/onboarding/StepPasteUrl";
import StepConfirmUnderstanding from "@/app/components/onboarding/StepConfirmUnderstanding";
import StepTestDiagnostic from "@/app/components/onboarding/StepTestDiagnostic";
import StepSeeResult from "@/app/components/onboarding/StepSeeResult";
import StepLinkReady from "@/app/components/onboarding/StepLinkReady";
import type { DiagnosticData, CompanyUnderstanding, Breakdown } from "@/app/lib/types";
import { computeBreakdowns } from "@/app/lib/compute";

const TOTAL_STEPS = 5;

const stepLabels = [
  "Site web",
  "Validation",
  "Questions",
  "R\u00e9sultat",
  "Lien pr\u00eat",
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [url, setUrl] = useState("");
  const [diagnosticData, setDiagnosticData] = useState<DiagnosticData | null>(null);
  const [understanding, setUnderstanding] = useState<CompanyUnderstanding | null>(null);
  const [breakdowns, setBreakdowns] = useState<Breakdown[]>([]);
  const [annualCost, setAnnualCost] = useState(0);
  const [diagnosticId, setDiagnosticId] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);

  const goTo = (step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  };

  const handleReset = () => {
    setUrl("");
    setDiagnosticData(null);
    setUnderstanding(null);
    setBreakdowns([]);
    setAnnualCost(0);
    setDiagnosticId(null);
    setDirection(-1);
    setCurrentStep(1);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  // Hero (step 1): dark zinc background
  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-hero-bg font-sans relative hero-noise hero-glow">
        {/* Floating wordmark — no navbar */}
        <span className="fixed top-6 left-6 z-30 font-serif text-[20px] text-hero-text/60 tracking-[-0.02em]">
          Dreep
        </span>

        {/* Hero content — centered */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="w-full max-w-2xl"
            >
              <StepPasteUrl
                hero
                onNext={(submittedUrl, data) => {
                  setUrl(submittedUrl);
                  setDiagnosticData(data);
                  setUnderstanding(data.understanding);
                  goTo(2);
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // Steps 2-5: white background
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Step progress */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-6 py-4">
          {/* Mobile: progress bar + fraction */}
          <div className="sm:hidden flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-cloud rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-ink rounded-full"
                initial={false}
                animate={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <span className="text-[13px] font-mono font-semibold text-ink-light tabular-nums shrink-0">
              {currentStep}/{TOTAL_STEPS}
            </span>
          </div>

          {/* Desktop: dots + labels */}
          <div className="hidden sm:flex items-center justify-center gap-3">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => {
              const step = i + 1;
              const isCompleted = step < currentStep;
              const isCurrent = step === currentStep;

              return (
                <div key={step} className="flex items-center gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <motion.div
                      className={`flex items-center justify-center rounded-full transition-colors duration-300 ${
                        isCompleted
                          ? "bg-ink w-2.5 h-2.5"
                          : isCurrent
                            ? "bg-ink ring-[3px] ring-ink/15 w-2.5 h-2.5"
                            : "bg-border w-2.5 h-2.5"
                      }`}
                      animate={isCurrent ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                      transition={isCurrent ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : {}}
                    >
                      {isCompleted && (
                        <svg className="w-2 h-2 text-white" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </motion.div>
                    <span
                      className={`text-[11px] font-medium tracking-[0.02em] transition-colors duration-300 ${
                        isCompleted || isCurrent
                          ? "text-ink-light"
                          : "text-mist"
                      }`}
                    >
                      {stepLabels[i]}
                    </span>
                  </div>
                  {step < TOTAL_STEPS && (
                    <div
                      className={`w-10 h-px transition-colors duration-300 ${
                        isCompleted ? "bg-ink" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {currentStep === 2 && understanding && (
              <StepConfirmUnderstanding
                understanding={understanding}
                onNext={(editedUnderstanding) => {
                  setUnderstanding(editedUnderstanding);
                  goTo(3);
                }}
                onBack={() => goTo(1)}
              />
            )}

            {currentStep === 3 && diagnosticData && (
              <StepTestDiagnostic
                questions={diagnosticData.questions}
                onNext={(answers) => {
                  const computed = computeBreakdowns(
                    diagnosticData.breakdownTemplates,
                    diagnosticData.questions,
                    answers
                  );
                  setBreakdowns(computed);
                  setAnnualCost(
                    computed.reduce((sum, b) => sum + b.amount, 0)
                  );
                  goTo(4);
                }}
                onBack={() => goTo(2)}
              />
            )}

            {currentStep === 4 && (
              <StepSeeResult
                breakdowns={breakdowns}
                annualCost={annualCost}
                onNext={async () => {
                  if (!diagnosticData || !understanding) return goTo(5);
                  try {
                    const res = await fetch("/api/diagnostics", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        url,
                        understanding,
                        questions: diagnosticData.questions,
                        breakdownTemplates: diagnosticData.breakdownTemplates,
                      }),
                    });
                    const json = await res.json();
                    if (json.success) {
                      setDiagnosticId(json.id);
                      // Save to localStorage for returning user experience
                      try {
                        const prev = JSON.parse(localStorage.getItem("dreep_diagnostics") || "[]");
                        const entry = { id: json.id, url, createdAt: new Date().toISOString() };
                        const updated = [entry, ...prev.filter((d: { id: string }) => d.id !== json.id)].slice(0, 10);
                        localStorage.setItem("dreep_diagnostics", JSON.stringify(updated));
                      } catch {
                        // localStorage unavailable — ignore
                      }
                    }
                  } catch {
                    // Save failed silently — still show link step with fallback
                  }
                  goTo(5);
                }}
                onBack={() => goTo(3)}
              />
            )}

            {currentStep === 5 && (
              <StepLinkReady diagnosticId={diagnosticId} onReset={handleReset} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
