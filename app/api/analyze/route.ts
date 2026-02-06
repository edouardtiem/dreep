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
  CompanyUnderstanding,
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

function extractCompanyName(url: string): string {
  const hostname = new URL(url).hostname;
  return hostname.replace(/^www\./, "").split(".")[0];
}

async function searchCompanyContext(company: string): Promise<string> {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) return "";

  try {
    const res = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          {
            role: "user",
            content: `Que vend l'entreprise ${company} en B2B ? Décris leurs produits/services principaux, leurs clients cibles, et comment fonctionne leur équipe commerciale. Sois factuel et concis.`,
          },
        ],
        max_tokens: 500,
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return "";
    const json = await res.json();
    return json.choices?.[0]?.message?.content ?? "";
  } catch {
    return "";
  }
}

const UNDERSTAND_PROMPT = `Tu es un expert en vente B2B.

On te donne le contenu texte d'un site web d'entreprise. Tu dois analyser cette entreprise et résumer ce qu'elle fait.

Réponds UNIQUEMENT avec un objet JSON valide (pas de markdown, pas de commentaire), avec cette structure exacte :

{
  "understanding": {
    "sells": "Ce que l'entreprise vend en B2B — sois précis sur les produits/services (1-2 phrases)",
    "persona": "À qui ils vendent — rôles, titres des acheteurs (1-2 phrases)",
    "differentiator": "Leur avantage concurrentiel principal (1 phrase)",
    "target": "Taille et industrie cible (1 phrase)"
  }
}

RÈGLES IMPORTANTES :
- Tous les textes en français
- Sois factuel et précis — décris ce que les commerciaux vendent réellement, pas juste le slogan marketing
- Si une recherche web est fournie, utilise-la pour mieux comprendre ce que l'entreprise vend réellement en B2B (pas juste ce que dit le site marketing)`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string" || !isValidUrl(url)) {
      return errorResponse("URL invalide");
    }

    // Fetch page + search company context in parallel
    const cookieFile = join(tmpdir(), `dreep-${randomUUID()}.txt`);
    const companyName = extractCompanyName(url);

    let html: string;
    let searchContext: string;
    try {
      const curlPromise = execFileAsync(
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
      ).then(({ stdout }) => stdout);

      const [htmlResult, searchResult] = await Promise.all([
        curlPromise,
        searchCompanyContext(companyName),
      ]);

      html = htmlResult;
      searchContext = searchResult;
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

    // Call Claude API — understanding only
    let understanding: CompanyUnderstanding;
    try {
      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 500,
        messages: [
          {
            role: "user",
            content: `${UNDERSTAND_PROMPT}${searchContext ? `\n\n--- RECHERCHE WEB (contexte externe) ---\n${searchContext}` : ""}\n\n--- CONTENU DU SITE ---\n${text}`,
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

      const parsed = JSON.parse(jsonText) as { understanding: CompanyUnderstanding };

      if (!parsed.understanding || !parsed.understanding.sells) {
        return errorResponse("Erreur interne. Réessayez.", 500);
      }

      understanding = parsed.understanding;
    } catch {
      return errorResponse("Erreur interne. Réessayez.", 500);
    }

    return NextResponse.json({
      success: true,
      data: { understanding },
    } as AnalyzeResponse);
  } catch {
    return errorResponse("Erreur interne. Réessayez.", 500);
  }
}
