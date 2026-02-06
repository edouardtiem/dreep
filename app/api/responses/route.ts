import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { diagnosticId, answers, breakdowns, annualCost } = body;

    if (!diagnosticId || !answers || !breakdowns || annualCost === undefined) {
      return NextResponse.json(
        { success: false, error: "Champs requis manquants." },
        { status: 400 },
      );
    }

    const { error } = await supabase.from("responses").insert({
      diagnostic_id: diagnosticId,
      answers,
      breakdowns,
      annual_cost: annualCost,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { success: false, error: "Erreur lors de la sauvegarde." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Erreur interne." },
      { status: 500 },
    );
  }
}
