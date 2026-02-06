import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import type {
  AnalyzeErrorResponse,
  CompanyUnderstanding,
  GenerateQuestionsResponse,
  DiagnosticQuestion,
  BreakdownTemplate,
} from "@/app/lib/types";

const anthropic = new Anthropic();

function errorResponse(error: string, status = 400) {
  return NextResponse.json(
    { success: false, error } as AnalyzeErrorResponse,
    { status }
  );
}

const QUESTIONS_PROMPT = `Tu es un expert en vente B2B et en diagnostic de coûts cachés.

On te donne une description validée d'une entreprise. Génère un diagnostic structuré avec des questions et des postes de coût.

Réponds UNIQUEMENT avec un objet JSON valide (pas de markdown, pas de commentaire), avec cette structure exacte :

{
  "prospectIntro": "1-2 phrases qui décrivent l'activité de l'entreprise du point de vue du PROSPECT (utilisez 'vous'). Exemple : 'Vous formez vos équipes aux métiers du numérique avec des parcours diplômants et du mentorat.'",
  "questions": [
    {
      "id": "q1",
      "label": "Question claire pour un prospect (en français)",
      "min": 0,
      "max": 100,
      "defaultValue": 15,
      "unit": "unité courte",
      "step": 1
    }
  ],
  "breakdownTemplates": [
    {
      "label": "Nom du poste de coût (en français)",
      "category": "Coût de temps | Coût direct | Coût d'opportunité | Coût de risque",
      "formulaDisplay": "{q1} personnes × {q2} h/sem × 48 sem × {q3} €/h",
      "formulaExpr": "q1 * q2 * 48 * q3"
    }
  ]
}

RÈGLES IMPORTANTES :
- Génère entre 5 et 7 questions (q1, q2, q3, etc.)
- Génère entre 3 et 5 postes de coût (breakdownTemplates)
- Les "id" des questions sont q1, q2, q3, etc.
- Dans formulaExpr, utilise les id (q1, q2...) avec des opérateurs mathématiques simples (+, -, *, /, parenthèses)
- Dans formulaDisplay, utilise {q1}, {q2} etc. comme placeholders — ils seront remplacés par "valeur unité"
- Les montants doivent être réalistes pour une PME française
- Les questions doivent être compréhensibles par un dirigeant non technique
- Les unités doivent être courtes : "personnes", "h/sem", "€/h", "erreurs/mois", "deals/mois", etc.
- step doit correspondre à l'unité : 1 pour des personnes, 0.5 pour des heures, 5 pour des euros, etc.
- category doit être EXACTEMENT une de ces 4 valeurs : "Coût de temps", "Coût direct", "Coût d'opportunité", "Coût de risque"
- Tous les textes en français
- prospectIntro s'adresse au PROSPECT (pas au commercial) — utilise "vous" et décris ce que l'entreprise fait pour eux, pas ce qu'elle "vend"`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { understanding } = body as { understanding: CompanyUnderstanding };

    if (!understanding || !understanding.sells || !understanding.persona) {
      return errorResponse("Données manquantes");
    }

    const companyContext = `ENTREPRISE :
- Vend : ${understanding.sells}
- À qui : ${understanding.persona}
- Différenciant : ${understanding.differentiator}
- Cible : ${understanding.target}`;

    let questions: DiagnosticQuestion[];
    let breakdownTemplates: BreakdownTemplate[];
    let prospectIntro: string;
    try {
      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: `${QUESTIONS_PROMPT}\n\n${companyContext}`,
          },
        ],
      });

      const content = message.content[0];
      if (content.type !== "text") {
        return errorResponse("Erreur interne. Réessayez.", 500);
      }

      let jsonText = content.text.trim();
      if (jsonText.startsWith("```")) {
        jsonText = jsonText.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
      }

      const parsed = JSON.parse(jsonText) as {
        prospectIntro: string;
        questions: DiagnosticQuestion[];
        breakdownTemplates: BreakdownTemplate[];
      };

      if (
        !Array.isArray(parsed.questions) ||
        !Array.isArray(parsed.breakdownTemplates) ||
        parsed.questions.length === 0 ||
        parsed.breakdownTemplates.length === 0
      ) {
        return errorResponse("Erreur interne. Réessayez.", 500);
      }

      prospectIntro = parsed.prospectIntro || "";
      questions = parsed.questions;
      breakdownTemplates = parsed.breakdownTemplates;
    } catch {
      return errorResponse("Erreur interne. Réessayez.", 500);
    }

    return NextResponse.json({
      success: true,
      data: { questions, breakdownTemplates, prospectIntro },
    } as GenerateQuestionsResponse);
  } catch {
    return errorResponse("Erreur interne. Réessayez.", 500);
  }
}
