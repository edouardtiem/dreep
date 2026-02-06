import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

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

    const { error } = await supabase
      .from("diagnostics")
      .update({ email: email.trim().toLowerCase() })
      .eq("id", id);

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json(
        { success: false, error: "Erreur lors de la mise à jour." },
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
