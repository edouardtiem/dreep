"use client";

import { useState } from "react";
import type { DiagnosticQuestion } from "@/app/lib/types";

interface StepTestDiagnosticProps {
  questions: DiagnosticQuestion[];
  onNext: (answers: number[]) => void;
  onBack: () => void;
}

export default function StepTestDiagnostic({
  questions,
  onNext,
  onBack,
}: StepTestDiagnosticProps) {
  const [answers, setAnswers] = useState<number[]>(
    questions.map((q) => q.defaultValue)
  );

  const updateAnswer = (index: number, value: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Signal banner */}
      <div className="bg-signal-wash border border-signal-light/40 rounded-xl px-4 py-3.5">
        <p className="text-[13px] text-signal font-medium">
          Mettez-vous dans la peau de votre dernier prospect. Répondez comme
          il l&apos;aurait fait.
        </p>
      </div>

      <div className="text-center space-y-2">
        <h2 className="font-serif text-[28px] font-normal text-ink">
          Testez votre diagnostic
        </h2>
        <p className="text-[15px] text-slate tracking-[-0.01em]">
          Ajustez les curseurs pour simuler les réponses d&apos;un prospect.
        </p>
      </div>

      {/* Slider questions */}
      <div className="space-y-8">
        {questions.map((q, index) => (
          <div key={q.id} className="space-y-3">
            <div className="flex items-baseline justify-between gap-4">
              <label className="text-[15px] font-medium text-ink-light">
                {q.label}
              </label>
              <span className="font-mono text-[16px] font-semibold text-ink tracking-[-0.01em] shrink-0">
                {answers[index]} {q.unit}
              </span>
            </div>

            <input
              type="range"
              min={q.min}
              max={q.max}
              step={q.step}
              value={answers[index]}
              onChange={(e) => updateAnswer(index, Number(e.target.value))}
              className="w-full h-1.5 bg-cloud rounded-full appearance-none cursor-pointer accent-ink"
            />

            <div className="flex justify-between text-[12px] text-mist">
              <span>
                {q.min} {q.unit}
              </span>
              <span>
                {q.max} {q.unit}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4">
        <button
          onClick={onBack}
          className="text-[15px] text-slate hover:text-ink transition-colors duration-150 cursor-pointer"
        >
          &larr; Retour
        </button>
        <button
          onClick={() => onNext(answers)}
          className="bg-ink text-white rounded-[10px] py-3.5 px-7 text-[15px] font-semibold hover:bg-ink-light transition-colors duration-150 cursor-pointer"
        >
          Voir le résultat &rarr;
        </button>
      </div>
    </div>
  );
}
