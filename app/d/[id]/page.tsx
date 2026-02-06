import { notFound } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import type { CompanyUnderstanding, DiagnosticQuestion, BreakdownTemplate } from "@/app/lib/types";
import ProspectExperience from "./ProspectExperience";

interface DiagnosticRow {
  id: string;
  url: string;
  understanding: CompanyUnderstanding;
  questions: DiagnosticQuestion[];
  breakdown_templates: BreakdownTemplate[];
  created_at: string;
}

export default async function ProspectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("diagnostics")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const diagnostic = data as DiagnosticRow;

  return (
    <ProspectExperience
      diagnosticId={diagnostic.id}
      understanding={diagnostic.understanding}
      questions={diagnostic.questions}
      breakdownTemplates={diagnostic.breakdown_templates}
    />
  );
}
