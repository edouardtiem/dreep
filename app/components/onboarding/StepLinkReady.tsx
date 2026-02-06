"use client";

import { useState, useEffect } from "react";

interface StepLinkReadyProps {
  diagnosticId?: string | null;
  onReset: () => void;
}

const outreachMessage = `Bonjour [Prénom],

Suite à notre échange, j'ai préparé un diagnostic rapide pour vous aider à quantifier l'impact de [problème]. Ça prend 2 minutes :

[lien]

À bientôt,
[Votre nom]`;

export default function StepLinkReady({ diagnosticId, onReset }: StepLinkReadyProps) {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const shareableLink = diagnosticId
    ? `${baseUrl}/d/${diagnosticId}`
    : "dreep.app/d/...";

  // Prefill email from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dreep_email");
      if (saved) setEmail(saved);
    } catch {
      // localStorage unavailable
    }
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: do nothing if clipboard API is unavailable
    }
  };

  const handleEmailSubmit = async () => {
    if (!diagnosticId || !email.trim()) return;

    setEmailError("");
    setEmailLoading(true);

    try {
      const res = await fetch(`/api/diagnostics/${diagnosticId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const json = await res.json();

      if (json.success) {
        setEmailSubmitted(true);
        try {
          localStorage.setItem("dreep_email", email.trim());
        } catch {
          // localStorage unavailable
        }
      } else {
        setEmailError(json.error || "Erreur lors de l\u2019enregistrement.");
      }
    } catch {
      setEmailError("Erreur réseau. Réessayez.");
    } finally {
      setEmailLoading(false);
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
          Votre diagnostic est pr&ecirc;t !
        </h2>
      </div>

      {/* Shareable link */}
      <div className="space-y-3">
        <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-slate">
          Lien &agrave; partager
        </label>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-surface border border-border rounded-[10px] py-3.5 px-[18px] font-mono text-[14px] text-ink select-all truncate">
            {shareableLink}
          </div>
          <button
            onClick={handleCopy}
            disabled={!diagnosticId}
            className="bg-ink text-white rounded-[10px] py-3.5 px-7 text-[15px] font-semibold hover:bg-ink-light transition-colors duration-150 shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {copied ? "Copi\u00e9 !" : "Copier"}
          </button>
        </div>
      </div>

      {/* Email capture */}
      {diagnosticId && (
        <div className="space-y-3">
          <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-slate">
            Notifications
          </label>
          {emailSubmitted ? (
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
                Notifications activ&eacute;es
              </span>
            </div>
          ) : (
            <>
              <p className="text-[14px] text-ink-light">
                Recevez une alerte quand un prospect compl&egrave;te ce diagnostic
              </p>
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
                  {emailLoading ? "..." : "Activer"}
                </button>
              </div>
              {emailError && (
                <p className="text-[13px] text-red-500">{emailError}</p>
              )}
            </>
          )}
        </div>
      )}

      {/* Outreach message suggestion */}
      <div className="space-y-3">
        <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-slate">
          Message d&apos;accroche sugg&eacute;r&eacute;
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
          Cr&eacute;er un autre diagnostic
        </button>
      </div>
    </div>
  );
}
