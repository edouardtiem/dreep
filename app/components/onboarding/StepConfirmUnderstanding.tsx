"use client";

import { useState } from "react";
import type { CompanyUnderstanding } from "@/app/lib/types";

interface StepConfirmUnderstandingProps {
  understanding: CompanyUnderstanding;
  onNext: (understanding: CompanyUnderstanding) => void;
  onBack: () => void;
}

export default function StepConfirmUnderstanding({
  understanding,
  onNext,
  onBack,
}: StepConfirmUnderstandingProps) {
  const [sells, setSells] = useState(understanding.sells);
  const [persona, setPersona] = useState(understanding.persona);
  const [differentiator, setDifferentiator] = useState(
    understanding.differentiator
  );
  const [target, setTarget] = useState(understanding.target);

  const fields = [
    {
      label: "Ce que vous vendez",
      value: sells,
      onChange: setSells,
    },
    {
      label: "À qui vous vendez",
      value: persona,
      onChange: setPersona,
    },
    {
      label: "Votre différenciant clé",
      value: differentiator,
      onChange: setDifferentiator,
    },
    {
      label: "Taille / industrie cible",
      value: target,
      onChange: setTarget,
    },
  ];

  const handleNext = () => {
    onNext({ sells, persona, differentiator, target });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="font-serif text-[28px] font-normal text-ink">
          Voici ce qu&apos;on a compris
        </h2>
        <p className="text-[15px] text-slate tracking-[-0.01em]">
          Vérifiez et ajustez si nécessaire.
        </p>
      </div>

      <div className="space-y-6">
        {fields.map((field) => (
          <div key={field.label} className="space-y-2">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-slate">
              {field.label}
            </label>
            <textarea
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              rows={2}
              className="w-full bg-surface border border-border rounded-[10px] py-3.5 px-[18px] text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-ink/10 focus:border-ink transition-all duration-150 resize-none placeholder:text-mist"
            />
          </div>
        ))}
      </div>

      <div className="bg-signal-wash border border-signal-light/40 rounded-xl px-4 py-3.5">
        <p className="text-[13px] text-ink-light">
          <span className="font-semibold text-signal">Astuce :</span>{" "}
          Ajoutez vos chiffres clés si vous en avez — ça rendra le diagnostic
          plus percutant
        </p>
      </div>

      <div className="flex items-center justify-between pt-4">
        <button
          onClick={onBack}
          className="text-[15px] text-slate hover:text-ink transition-colors duration-150 cursor-pointer"
        >
          &larr; Retour
        </button>
        <button
          onClick={handleNext}
          className="bg-ink text-white rounded-[10px] py-3.5 px-7 text-[15px] font-semibold hover:bg-ink-light transition-colors duration-150 cursor-pointer"
        >
          C&apos;est bon, on continue &rarr;
        </button>
      </div>
    </div>
  );
}
