"use client";

import { useState, useEffect } from "react";
import CountUpNumber from "@/app/components/CountUpNumber";
import CostBarChart from "@/app/components/CostBarChart";
import DripCounter from "@/app/components/DripCounter";
import CalculationBreakdown from "@/app/components/CalculationBreakdown";
import type { Breakdown } from "@/app/lib/types";

interface ResultViewProps {
  annualCost: number;
  breakdowns: Breakdown[];
  prospectIntro?: string;
  shareUrl?: string;
  responseId?: string;
}

export default function ResultView({
  annualCost,
  breakdowns,
  prospectIntro,
  shareUrl: shareUrlProp,
  responseId,
}: ResultViewProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(shareUrlProp);

  useEffect(() => {
    if (!shareUrlProp && responseId) {
      setShareUrl(`${window.location.origin}/r/${responseId}`);
    }
  }, [shareUrlProp, responseId]);

  async function handleCopyLink() {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: prompt with the URL
      window.prompt("Copiez ce lien :", shareUrl);
    }
  }

  const mailtoSubject = encodeURIComponent("Votre diagnostic de coût");
  const mailtoBody = encodeURIComponent(
    `Bonjour,\n\nVoici le résultat de notre diagnostic :\n${shareUrl ?? ""}\n\nBonne lecture !`,
  );

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      {prospectIntro && (
        <p className="text-[15px] text-ink-light text-center mb-6">
          {prospectIntro}
        </p>
      )}

      <h2 className="font-serif text-[22px] font-normal text-ink-light tracking-[-0.01em] text-center">
        Votre probl&egrave;me vous co&ucirc;te
      </h2>

      <div className="text-center mt-4">
        <CountUpNumber value={annualCost} />
      </div>

      <p className="text-[15px] text-mist font-medium text-center mt-3">
        par an
      </p>

      <div className="mt-16">
        <CostBarChart annualCost={annualCost} />
      </div>

      <div className="mt-12 text-center">
        <DripCounter annualCost={annualCost} />
      </div>

      <div className="mt-12">
        <CalculationBreakdown breakdowns={breakdowns} />
      </div>

      {/* CTAs */}
      {shareUrl && (
        <div className="mt-16 space-y-3">
          <button
            onClick={handleCopyLink}
            className="w-full bg-ink text-white rounded-[10px] py-3.5 px-7 text-[15px] font-semibold hover:bg-ink-light transition-colors duration-150 cursor-pointer"
          >
            {copied ? "Lien copi\u00e9 \u2713" : "Copier le lien"}
          </button>

          <a
            href={`mailto:?subject=${mailtoSubject}&body=${mailtoBody}`}
            className="block w-full text-center border border-border text-ink rounded-[10px] py-3.5 px-7 text-[15px] font-semibold hover:bg-surface transition-colors duration-150"
          >
            Envoyer par email
          </a>
        </div>
      )}

      {/* Footer */}
      <p className="mt-20 text-center text-[12px] text-mist">
        Powered by{" "}
        <a href="/" target="_blank" rel="noopener" className="font-semibold text-slate hover:text-ink transition-colors duration-150">Dreep</a> &mdash;
        Montrez &agrave; vos prospects ce que leur probl&egrave;me leur
        co&ucirc;te
      </p>
    </div>
  );
}
