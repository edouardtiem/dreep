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
  "Résultat",
  "Lien prêt",
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [url, setUrl] = useState("");
  const [diagnosticData, setDiagnosticData] = useState<DiagnosticData | null>(null);
  const [understanding, setUnderstanding] = useState<CompanyUnderstanding | null>(null);
  const [breakdowns, setBreakdowns] = useState<Breakdown[]>([]);
  const [annualCost, setAnnualCost] = useState(0);
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

  return (
    <div className="min-h-screen bg-white font-sans relative hero-noise hero-glow">
      {/* Step progress indicator */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center gap-3">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => {
              const step = i + 1;
              const isCompleted = step < currentStep;
              const isCurrent = step === currentStep;

              return (
                <div key={step} className="flex items-center gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        isCompleted
                          ? "bg-ink"
                          : isCurrent
                            ? "bg-ink ring-[3px] ring-ink/15"
                            : "bg-border"
                      }`}
                    />
                    <span
                      className={`text-[11px] font-medium tracking-[0.02em] transition-colors duration-300 hidden sm:block ${
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

      {/* Step content */}
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
            {currentStep === 1 && (
              <StepPasteUrl
                onNext={(submittedUrl, data) => {
                  setUrl(submittedUrl);
                  setDiagnosticData(data);
                  setUnderstanding(data.understanding);
                  goTo(2);
                }}
              />
            )}

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
                onNext={() => goTo(5)}
                onBack={() => goTo(3)}
              />
            )}

            {currentStep === 5 && (
              <StepLinkReady onReset={handleReset} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
