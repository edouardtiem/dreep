import { NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";
import { randomUUID } from "crypto";
import { tmpdir } from "os";
import { join } from "path";
import { unlink } from "fs/promises";
import Anthropic from "@anthropic-ai/sdk";
import type {
  AnalyzeResponse,
  AnalyzeErrorResponse,
  DiagnosticData,
} from "@/app/lib/types";

const execFileAsync = promisify(execFile);

const anthropic = new Anthropic();

function errorResponse(error: string, status = 400) {
  return NextResponse.json(
    { success: false, error } as AnalyzeErrorResponse,
    { status }
  );
}

function stripHtml(html: string): string {
  let text = html;
  // Remove script, style, nav, footer, header tags and their content
  text = text.replace(
    /<(script|style|nav|footer|header|noscript|svg|iframe)[^>]*>[\s\S]*?<\/\1>/gi,
    " "
  );
  // Remove all remaining HTML tags
  text = text.replace(/<[^>]+>/g, " ");
  // Decode common HTML entities
  text = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&euro;/g, "\u20AC");
  // Collapse whitespace
  text = text.replace(/\s+/g, " ").trim();
  // Truncate to ~8000 chars
  return text.slice(0, 8000);
}

function isValidUrl(str: string): boolean {
  try {
    const u = new URL(str);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

const CLAUDE_PROMPT = `Tu es un expert en vente B2B et en diagnostic de coûts cachés.

On te donne le contenu texte d'un site web d'entreprise. Tu dois analyser cette entreprise et produire un diagnostic structuré.

Réponds UNIQUEMENT avec un objet JSON valide (pas de markdown, pas de commentaire), avec cette structure exacte :

{
  "understanding": {
    "sells": "Ce que l'entreprise vend (1-2 phrases)",
    "persona": "À qui ils vendent — rôles, titres (1-2 phrases)",
    "differentiator": "Leur avantage concurrentiel principal (1 phrase)",
    "target": "Taille et industrie cible (1 phrase)"
  },
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
- Tous les textes en français`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string" || !isValidUrl(url)) {
      return errorResponse("URL invalide");
    }

    // Fetch the page via curl (cookie jar handles auth redirects like Clerk)
    let html: string;
    const cookieFile = join(tmpdir(), `dreep-${randomUUID()}.txt`);
    try {
      const { stdout } = await execFileAsync(
        "curl",
        [
          "-sL",
          "--max-time", "10",
          "--max-redirs", "10",
          "-c", cookieFile,
          "-b", cookieFile,
          "-A", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "-H", "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          url,
        ],
        { maxBuffer: 5 * 1024 * 1024 }
      );
      html = stdout;
    } catch {
      return errorResponse(
        "Le site n'a pas répondu. Vérifiez l'URL.",
        502
      );
    } finally {
      unlink(cookieFile).catch(() => {});
    }

    if (!html || html.length < 100) {
      return errorResponse(
        "Pas assez de contenu trouvé sur cette page.",
        422
      );
    }

    // Strip HTML to plain text
    const text = stripHtml(html);
    if (text.length < 50) {
      return errorResponse(
        "Pas assez de contenu trouvé sur cette page.",
        422
      );
    }

    // Call Claude API
    let diagnosticData: DiagnosticData;
    try {
      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: `${CLAUDE_PROMPT}\n\n--- CONTENU DU SITE ---\n${text}`,
          },
        ],
      });

      const content = message.content[0];
      if (content.type !== "text") {
        return errorResponse("Erreur interne. Réessayez.", 500);
      }

      // Strip markdown code fences if Claude wraps the JSON
      let jsonText = content.text.trim();
      if (jsonText.startsWith("```")) {
        jsonText = jsonText.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
      }

      diagnosticData = JSON.parse(jsonText) as DiagnosticData;

      // Basic shape validation
      if (
        !diagnosticData.understanding ||
        !Array.isArray(diagnosticData.questions) ||
        !Array.isArray(diagnosticData.breakdownTemplates) ||
        diagnosticData.questions.length === 0 ||
        diagnosticData.breakdownTemplates.length === 0
      ) {
        return errorResponse("Erreur interne. Réessayez.", 500);
      }
    } catch {
      return errorResponse("Erreur interne. Réessayez.", 500);
    }

    return NextResponse.json({
      success: true,
      data: diagnosticData,
    } as AnalyzeResponse);
  } catch {
    return errorResponse("Erreur interne. Réessayez.", 500);
  }
}
