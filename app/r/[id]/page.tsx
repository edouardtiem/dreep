import { notFound } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import ResultView from "@/app/components/ResultView";
import type { Breakdown, CompanyUnderstanding } from "@/app/lib/types";

interface ResponseRow {
  id: string;
  diagnostic_id: string;
  answers: Record<string, number>;
  breakdowns: Breakdown[];
  annual_cost: number;
  diagnostics: {
    understanding: CompanyUnderstanding;
  };
}

export default async function SharedResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("responses")
    .select("id, breakdowns, annual_cost, diagnostics(understanding)")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const row = data as unknown as ResponseRow;
  const understanding = row.diagnostics?.understanding;

  return (
    <main className="min-h-screen bg-white font-sans relative hero-noise hero-glow">
      <ResultView
        annualCost={row.annual_cost}
        breakdowns={row.breakdowns}
        prospectIntro={understanding?.prospectIntro}
        responseId={row.id}
      />
    </main>
  );
}
