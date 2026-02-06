import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, understanding, questions, breakdownTemplates } = body;

    if (!url || !understanding || !questions || !breakdownTemplates) {
      return NextResponse.json(
        { success: false, error: "Champs requis manquants." },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("diagnostics")
      .insert({
        url,
        understanding,
        questions,
        breakdown_templates: breakdownTemplates,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { success: false, error: "Erreur lors de la sauvegarde." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch {
    return NextResponse.json(
      { success: false, error: "Erreur interne." },
      { status: 500 },
    );
  }
}
