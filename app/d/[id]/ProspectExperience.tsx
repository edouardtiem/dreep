"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ResultView from "@/app/components/ResultView";
import { computeBreakdowns } from "@/app/lib/compute";
import type {
  CompanyUnderstanding,
  DiagnosticQuestion,
  BreakdownTemplate,
  Breakdown,
} from "@/app/lib/types";

interface ProspectExperienceProps {
  diagnosticId: string;
  understanding: CompanyUnderstanding;
  questions: DiagnosticQuestion[];
  breakdownTemplates: BreakdownTemplate[];
}

type Screen = "landing" | "questions" | "result";

const ease = [0.4, 0, 0.2, 1] as const;
const transition = { duration: 0.3, ease };

const screenVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

export default function ProspectExperience({
  diagnosticId,
  understanding,
  questions,
  breakdownTemplates,
}: ProspectExperienceProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [breakdowns, setBreakdowns] = useState<Breakdown[]>([]);
  const [annualCost, setAnnualCost] = useState(0);
  const [shareUrl, setShareUrl] = useState<string | undefined>();

  const answeredCount = Object.keys(answers).length;
  const progressPercent = (answeredCount / questions.length) * 100;

  function handleSliderChange(questionId: string, value: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function getSliderValue(q: DiagnosticQuestion): number {
    return answers[q.id] ?? q.defaultValue;
  }

  async function handleSeeResult() {
    // Build answers array in question order
    const answersArray = questions.map((q) => answers[q.id] ?? q.defaultValue);
    const computed = computeBreakdowns(breakdownTemplates, questions, answersArray);
    const total = computed.reduce((sum, b) => sum + b.amount, 0);

    setBreakdowns(computed);
    setAnnualCost(total);
    setCurrentScreen("result");

    // Save response to DB and build share URL
    try {
      const res = await fetch("/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          diagnosticId,
          answers,
          breakdowns: computed,
          annualCost: total,
        }),
      });
      const json = await res.json();
      if (json.success && json.id) {
        setShareUrl(`${window.location.origin}/r/${json.id}`);
      }
    } catch {
      // Save failed silently — prospect still sees their result
    }
  }

  // Landing
  function renderLanding() {
    return (
      <motion.div
        key="landing"
        variants={screenVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        className="flex flex-col items-center justify-center min-h-[85vh] max-w-xl mx-auto px-6 text-center"
      >
        <h1 className="font-serif text-[36px] font-normal text-ink tracking-[-0.03em] leading-[1.15]">
          Combien vous co&ucirc;te
          <br />
          votre probl&egrave;me&nbsp;?
        </h1>

        <p className="mt-5 text-[15px] text-ink-light tracking-[-0.01em]">
          {understanding.prospectIntro || `${understanding.sells} pour ${understanding.target}.`}
        </p>

        <p className="mt-3 text-[13px] text-mist">
          {questions.length} questions &middot; 2 minutes
        </p>

        <button
          onClick={() => setCurrentScreen("questions")}
          className="mt-12 bg-ink text-white rounded-[10px] px-8 py-4 text-[17px] font-semibold hover:bg-ink-light transition-colors duration-150 cursor-pointer"
        >
          Commencer &rarr;
        </button>
      </motion.div>
    );
  }

  // Questions
  function renderQuestions() {
    return (
      <motion.div
        key="questions"
        variants={screenVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        className="max-w-xl mx-auto px-6 py-12"
      >
        <div className="w-full h-0.5 bg-border rounded-full overflow-hidden mb-10">
          <motion.div
            className="h-full bg-ink rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>

        <h2 className="font-serif text-[22px] font-normal text-ink mb-8">
          R&eacute;pondez aux questions
        </h2>

        <div className="space-y-12">
          {questions.map((q, index) => {
            const value = getSliderValue(q);
            return (
              <div key={q.id}>
                <label className="block text-[15px] font-medium text-ink-light mb-3">
                  <span className="text-mist mr-2">{index + 1}.</span>
                  {q.label}
                </label>

                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={q.min}
                    max={q.max}
                    step={q.step}
                    value={value}
                    onChange={(e) =>
                      handleSliderChange(q.id, Number(e.target.value))
                    }
                    className="flex-1 accent-ink cursor-pointer"
                  />
                  <span className="font-mono text-[16px] font-semibold text-ink w-28 text-right tabular-nums tracking-[-0.01em]">
                    {value} {q.unit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={handleSeeResult}
            className="bg-ink text-white rounded-[10px] px-8 py-4 text-[17px] font-semibold hover:bg-ink-light transition-colors duration-150 cursor-pointer"
          >
            Voir mon r&eacute;sultat &rarr;
          </button>
        </div>
      </motion.div>
    );
  }

  // Result
  function renderResult() {
    return (
      <motion.div
        key="result"
        variants={screenVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
      >
        <ResultView
          annualCost={annualCost}
          breakdowns={breakdowns}
          shareUrl={shareUrl}
        />
      </motion.div>
    );
  }

  return (
    <main className="min-h-screen bg-white font-sans relative hero-noise hero-glow">
      <AnimatePresence mode="wait">
        {currentScreen === "landing" && renderLanding()}
        {currentScreen === "questions" && renderQuestions()}
        {currentScreen === "result" && renderResult()}
      </AnimatePresence>
    </main>
  );
}
