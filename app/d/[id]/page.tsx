"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUpNumber from "../../components/CountUpNumber";
import CostBarChart from "../../components/CostBarChart";
import DripCounter from "../../components/DripCounter";
import CalculationBreakdown from "../../components/CalculationBreakdown";
import { mockBreakdowns, mockAnnualCost } from "../../components/mockData";

// ---------------------------------------------------------------------------
// Mock diagnostic data (mirrors the salesperson onboarding)
// ---------------------------------------------------------------------------
const salespersonName = "Marie Dupont";
const companyName = "Acme Solutions";
const diagnosticTitle = "Gestion de projet collaborative";

interface Question {
  id: number;
  text: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "Combien de personnes participent aux r\u00e9unions hebdomadaires\u00a0?",
    min: 1,
    max: 50,
    step: 1,
    defaultValue: 15,
    unit: "personnes",
  },
  {
    id: 2,
    text: "Combien d\u2019heures par semaine sont consacr\u00e9es \u00e0 ces r\u00e9unions\u00a0?",
    min: 1,
    max: 20,
    step: 1,
    defaultValue: 3,
    unit: "heures/semaine",
  },
  {
    id: 3,
    text: "Combien d\u2019erreurs de saisie manuelle estimez-vous par mois\u00a0?",
    min: 0,
    max: 500,
    step: 10,
    defaultValue: 200,
    unit: "erreurs/mois",
  },
  {
    id: 4,
    text: "Combien de deals potentiels perdez-vous par mois \u00e0 cause des d\u00e9lais\u00a0?",
    min: 0,
    max: 30,
    step: 1,
    defaultValue: 5,
    unit: "deals/mois",
  },
  {
    id: 5,
    text: "Quel est le co\u00fbt horaire moyen d\u2019un collaborateur (charg\u00e9)\u00a0?",
    min: 20,
    max: 150,
    step: 5,
    defaultValue: 45,
    unit: "\u20ac/heure",
  },
  {
    id: 6,
    text: "Combien de d\u00e9parts li\u00e9s \u00e0 la frustration outil par an\u00a0?",
    min: 0,
    max: 20,
    step: 1,
    defaultValue: 2,
    unit: "d\u00e9parts/an",
  },
];

// ---------------------------------------------------------------------------
// Screen type
// ---------------------------------------------------------------------------
type Screen = "landing" | "questions" | "result";

// ---------------------------------------------------------------------------
// Shared transition config — editorial ease curve
// ---------------------------------------------------------------------------
const ease = [0.4, 0, 0.2, 1] as const;
const transition = { duration: 0.3, ease };

const screenVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function ProspectPage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState("");

  // Track how many questions the prospect has interacted with
  const answeredCount = Object.keys(answers).length;
  const progressPercent = (answeredCount / questions.length) * 100;

  function handleSliderChange(questionId: number, value: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function getSliderValue(q: Question): number {
    return answers[q.id] ?? q.defaultValue;
  }

  // -----------------------------------------------------------------------
  // P1 -- Landing
  // -----------------------------------------------------------------------
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
          Diagnostic&nbsp;: {diagnosticTitle}
        </h1>

        <p className="mt-5 text-[15px] text-ink-light tracking-[-0.01em]">
          {salespersonName} de {companyName} vous a pr&eacute;par&eacute; ce
          diagnostic.
        </p>

        <p className="mt-3 text-[13px] text-mist">
          6 questions &middot; 2 minutes
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

  // -----------------------------------------------------------------------
  // P2 -- Questions (all on one page)
  // -----------------------------------------------------------------------
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
        {/* Progress bar -- thin editorial line */}
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
                  {q.text}
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
            onClick={() => setCurrentScreen("result")}
            className="bg-ink text-white rounded-[10px] px-8 py-4 text-[17px] font-semibold hover:bg-ink-light transition-colors duration-150 cursor-pointer"
          >
            Voir mon r&eacute;sultat &rarr;
          </button>
        </div>
      </motion.div>
    );
  }

  // -----------------------------------------------------------------------
  // P3 -- Result
  // -----------------------------------------------------------------------
  function renderResult() {
    return (
      <motion.div
        key="result"
        variants={screenVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        className="max-w-2xl mx-auto px-6 py-16"
      >
        {/* Big animated number */}
        <h2 className="font-serif text-[22px] font-normal text-ink-light tracking-[-0.01em] text-center">
          Votre probl&egrave;me vous co&ucirc;te
        </h2>

        <div className="text-center mt-4">
          <CountUpNumber value={mockAnnualCost} />
        </div>

        <p className="text-[15px] text-mist font-medium text-center mt-3">
          par an
        </p>

        {/* Bar chart */}
        <div className="mt-16">
          <CostBarChart annualCost={mockAnnualCost} />
        </div>

        {/* Drip counter */}
        <div className="mt-12 text-center">
          <DripCounter annualCost={mockAnnualCost} />
        </div>

        {/* Calculation breakdown */}
        <div className="mt-12">
          <CalculationBreakdown breakdowns={mockBreakdowns} />
        </div>

        {/* CTAs */}
        <div className="mt-16 space-y-3">
          {/* CTA 1 -- Send report to team */}
          {!showEmailInput ? (
            <button
              onClick={() => setShowEmailInput(true)}
              className="w-full bg-ink text-white rounded-[10px] py-3.5 px-7 text-[15px] font-semibold hover:bg-ink-light transition-colors duration-150 cursor-pointer"
            >
              Envoyer ce rapport &agrave; mon &eacute;quipe
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@entreprise.com"
                className="flex-1 border border-border rounded-[10px] py-3.5 px-[18px] text-[15px] bg-surface focus:outline-none focus:ring-2 focus:ring-ink/10 focus:border-ink placeholder:text-mist"
              />
              <button className="shrink-0 bg-ink text-white rounded-[10px] py-3.5 px-7 text-[15px] font-semibold hover:bg-ink-light transition-colors duration-150 cursor-pointer">
                Envoyer
              </button>
            </div>
          )}

          {/* CTA 2 -- Talk to the salesperson */}
          <a
            href="#"
            className="block w-full text-center border border-border text-ink-light rounded-[10px] py-3.5 px-7 text-[15px] font-medium hover:bg-cloud transition-colors duration-150"
          >
            En parler avec {salespersonName}
          </a>
        </div>

        {/* Footer */}
        <p className="mt-20 text-center text-[12px] text-mist">
          Powered by{" "}
          <span className="font-semibold text-slate">Dreep</span> &mdash;
          Montrez &agrave; vos prospects ce que leur probl&egrave;me leur
          co&ucirc;te
        </p>
      </motion.div>
    );
  }

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------
  return (
    <main className="min-h-screen bg-white font-sans">
      <AnimatePresence mode="wait">
        {currentScreen === "landing" && renderLanding()}
        {currentScreen === "questions" && renderQuestions()}
        {currentScreen === "result" && renderResult()}
      </AnimatePresence>
    </main>
  );
}
