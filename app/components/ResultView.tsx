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
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

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
      window.prompt("Copiez ce lien :", shareUrl);
    }
  }

  async function handleEmailSubmit() {
    if (!responseId || !email.trim()) return;

    setEmailError("");
    setEmailLoading(true);

    try {
      const res = await fetch(`/api/responses/${responseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const json = await res.json();

      if (json.success) {
        setEmailSent(true);
      } else {
        setEmailError(json.error || "Erreur lors de l'envoi.");
      }
    } catch {
      setEmailError("Erreur réseau. Réessayez.");
    } finally {
      setEmailLoading(false);
    }
  }

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
        </div>
      )}

      {/* Email capture for prospect */}
      {responseId && (
        <div className="mt-6 space-y-3">
          <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-slate">
            Recevoir par email
          </label>
          {emailSent ? (
            <div className="flex items-center gap-2 bg-action-wash border border-action/20 rounded-[10px] py-3.5 px-[18px]">
              <svg
                className="w-5 h-5 text-action shrink-0"
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
              <span className="text-[14px] text-action font-medium">
                R&eacute;sultat envoy&eacute; !
              </span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleEmailSubmit();
                  }}
                  placeholder="votre@email.com"
                  className="flex-1 bg-surface border border-border rounded-[10px] py-3.5 px-[18px] text-[14px] text-ink placeholder:text-mist outline-none focus:border-ink transition-colors duration-150"
                />
                <button
                  onClick={handleEmailSubmit}
                  disabled={emailLoading || !email.trim()}
                  className="bg-ink text-white rounded-[10px] py-3.5 px-7 text-[15px] font-semibold hover:bg-ink-light transition-colors duration-150 shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {emailLoading ? "..." : "Envoyer"}
                </button>
              </div>
              {emailError && (
                <p className="text-[13px] text-red-500">{emailError}</p>
              )}
            </>
          )}
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
