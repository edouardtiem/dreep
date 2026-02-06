import type { Breakdown, BreakdownTemplate, DiagnosticQuestion } from "./types";

/**
 * Build a map from question IDs to their current values.
 */
function buildValuesMap(
  questions: DiagnosticQuestion[],
  answers: number[]
): Record<string, number> {
  const map: Record<string, number> = {};
  questions.forEach((q, i) => {
    map[q.id] = answers[i] ?? q.defaultValue;
  });
  return map;
}

/**
 * Safely evaluate a math expression string.
 * Only allows digits, whitespace, and basic operators: + - * / ( ) .
 */
function safeEval(expr: string): number {
  const sanitized = expr.trim();
  if (!/^[\d\s+\-*/().]+$/.test(sanitized)) {
    return 0;
  }
  try {
    const result = new Function(`"use strict"; return (${sanitized});`)();
    if (typeof result !== "number" || !isFinite(result)) return 0;
    return Math.round(result);
  } catch {
    return 0;
  }
}

/**
 * Substitute question IDs in a formula expression with their numeric values.
 * E.g. "q1 * q2 * 48 * q3" with {q1: 15, q2: 3, q3: 45} → "15 * 3 * 48 * 45"
 */
function substituteValues(
  expr: string,
  values: Record<string, number>
): string {
  let result = expr;
  // Sort keys by length descending to avoid partial replacements (q10 before q1)
  const keys = Object.keys(values).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    result = result.replaceAll(key, String(values[key]));
  }
  return result;
}

/**
 * Build a human-readable display formula by replacing {q1} placeholders
 * with formatted values including units.
 */
export function buildDisplayFormula(
  template: string,
  questions: DiagnosticQuestion[],
  answers: number[]
): string {
  const values = buildValuesMap(questions, answers);
  let display = template;
  for (const q of questions) {
    const placeholder = `{${q.id}}`;
    const formatted = `${values[q.id]} ${q.unit}`;
    display = display.replaceAll(placeholder, formatted);
  }
  return display;
}

/**
 * Compute breakdowns from templates, questions, and user answers.
 * Returns an array of Breakdown objects with evaluated amounts and display formulas.
 */
export function computeBreakdowns(
  templates: BreakdownTemplate[],
  questions: DiagnosticQuestion[],
  answers: number[]
): Breakdown[] {
  const values = buildValuesMap(questions, answers);

  return templates.map((t) => {
    const substituted = substituteValues(t.formulaExpr, values);
    const amount = safeEval(substituted);
    const formula = buildDisplayFormula(t.formulaDisplay, questions, answers);

    return {
      label: t.label,
      formula,
      amount,
      category: t.category,
    };
  });
}
