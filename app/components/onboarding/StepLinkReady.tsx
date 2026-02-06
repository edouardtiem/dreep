"use client";

import { useState } from "react";

interface StepLinkReadyProps {
  onReset: () => void;
}

const shareableLink = "dreep.app/d/abc123";

const outreachMessage = `Bonjour [Prénom],

Suite à notre échange, j'ai préparé un diagnostic rapide pour vous aider à quantifier l'impact de [problème]. Ça prend 2 minutes :

[lien]

À bientôt,
[Votre nom]`;

export default function StepLinkReady({ onReset }: StepLinkReadyProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${shareableLink}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: do nothing if clipboard API is unavailable
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-10">
      {/* Success header */}
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Green checkmark circle */}
        <div className="w-16 h-16 bg-action-wash rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-action"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        <h2 className="font-serif text-[28px] font-normal text-ink">
          Votre diagnostic est prêt !
        </h2>
      </div>

      {/* Shareable link */}
      <div className="space-y-3">
        <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-slate">
          Lien à partager
        </label>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-surface border border-border rounded-[10px] py-3.5 px-[18px] font-mono text-[14px] text-ink select-all">
            {shareableLink}
          </div>
          <button
            onClick={handleCopy}
            className="bg-ink text-white rounded-[10px] py-3.5 px-7 text-[15px] font-semibold hover:bg-ink-light transition-colors duration-150 shrink-0 cursor-pointer"
          >
            {copied ? "Copié !" : "Copier"}
          </button>
        </div>
      </div>

      {/* Outreach message suggestion */}
      <div className="space-y-3">
        <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-slate">
          Message d&apos;accroche suggéré
        </label>
        <div className="bg-surface border border-border rounded-xl p-6">
          <p className="text-[15px] text-ink-light whitespace-pre-line leading-relaxed">
            {outreachMessage}
          </p>
        </div>
      </div>

      {/* Reset button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onReset}
          className="border border-border text-ink-light rounded-[10px] py-3.5 px-7 text-[15px] font-medium hover:bg-cloud transition-colors duration-150 cursor-pointer"
        >
          Créer un autre diagnostic
        </button>
      </div>
    </div>
  );
}
