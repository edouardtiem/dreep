import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/app/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Email invalide." },
        { status: 400 },
      );
    }

    // Fetch the response with its diagnostic data
    const { data: response, error: fetchError } = await supabase
      .from("responses")
      .select("id, breakdowns, annual_cost, diagnostic_id")
      .eq("id", id)
      .single();

    if (fetchError || !response) {
      return NextResponse.json(
        { success: false, error: "Résultat introuvable." },
        { status: 404 },
      );
    }

    // Save prospect email
    const { error: updateError } = await supabase
      .from("responses")
      .update({ prospect_email: email.trim().toLowerCase() })
      .eq("id", id);

    if (updateError) {
      console.error("Supabase update error:", updateError);
      return NextResponse.json(
        { success: false, error: "Erreur lors de la mise à jour." },
        { status: 500 },
      );
    }

    // Fetch diagnostic for context (URL)
    const { data: diagnostic } = await supabase
      .from("diagnostics")
      .select("url")
      .eq("id", response.diagnostic_id)
      .single();

    // Send result email to prospect
    const fmt = (n: number) =>
      new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(n);

    const costFormatted = fmt(response.annual_cost);
    const resultUrl = `https://www.dreep.app/r/${response.id}`;

    const breakdownRows = (response.breakdowns as { label: string; amount: number; formula: string; category: string }[])
      .map(
        (b) => `
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #3f3f46; border-bottom: 1px solid #f4f4f5;">
              ${b.label}<br/>
              <span style="font-size: 12px; color: #a1a1aa;">${b.formula}</span>
            </td>
            <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #0a0a0a; text-align: right; white-space: nowrap; vertical-align: top; border-bottom: 1px solid #f4f4f5;">
              ${fmt(b.amount)}
            </td>
          </tr>`,
      )
      .join("");

    resend.emails.send({
      from: "Dreep <notifications@dreep.app>",
      to: email.trim().toLowerCase(),
      subject: `Votre résultat — ${costFormatted}/an`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 0;">
          <h2 style="font-size: 20px; font-weight: 600; color: #0a0a0a; margin: 0 0 16px;">
            Voici votre résultat
          </h2>
          <p style="font-size: 15px; color: #3f3f46; line-height: 1.6; margin: 0 0 8px;">
            Vous avez complété le calculateur de coût${diagnostic?.url ? ` pour <strong>${diagnostic.url}</strong>` : ""}.
          </p>
          <p style="font-size: 15px; color: #3f3f46; line-height: 1.6; margin: 0 0 24px;">
            Coût estimé de l'inaction : <strong style="color: #dc2626;">${costFormatted}/an</strong>
          </p>
          <table style="width: 100%; border-collapse: collapse; margin: 0 0 24px;">
            <tr>
              <td style="padding: 0 0 8px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #a1a1aa;">Détail</td>
              <td style="padding: 0 0 8px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #a1a1aa; text-align: right;">Montant</td>
            </tr>
            ${breakdownRows}
            <tr>
              <td style="padding: 12px 0 0; font-size: 15px; font-weight: 700; color: #0a0a0a;">Total annuel</td>
              <td style="padding: 12px 0 0; font-size: 15px; font-weight: 700; color: #dc2626; text-align: right;">${costFormatted}</td>
            </tr>
          </table>
          <a href="${resultUrl}" style="display: inline-block; background: #0a0a0a; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: 600;">
            Voir le résultat interactif
          </a>
          <p style="font-size: 13px; color: #a1a1aa; margin: 32px 0 0; border-top: 1px solid #e4e4e7; padding-top: 16px;">
            Dreep — Le calculateur de coût pour les commerciaux B2B
          </p>
        </div>
      `,
    }).catch((err) => console.error("Resend prospect email error:", err));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Erreur interne." },
      { status: 500 },
    );
  }
}
