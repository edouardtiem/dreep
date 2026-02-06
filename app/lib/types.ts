export interface Breakdown {
  label: string;
  formula: string;
  amount: number;
  category: string;
}

export interface CompanyUnderstanding {
  sells: string;
  persona: string;
  differentiator: string;
  target: string;
}

export interface DiagnosticQuestion {
  id: string;
  label: string;
  min: number;
  max: number;
  defaultValue: number;
  unit: string;
  step: number;
}

export interface BreakdownTemplate {
  label: string;
  category: string;
  formulaDisplay: string;
  formulaExpr: string;
}

export interface DiagnosticData {
  understanding: CompanyUnderstanding;
  questions: DiagnosticQuestion[];
  breakdownTemplates: BreakdownTemplate[];
}

export interface AnalyzeRequest {
  url: string;
}

export interface AnalyzeResponse {
  success: true;
  data: { understanding: CompanyUnderstanding };
}

export interface AnalyzeErrorResponse {
  success: false;
  error: string;
}

export interface GenerateQuestionsResponse {
  success: true;
  data: { questions: DiagnosticQuestion[]; breakdownTemplates: BreakdownTemplate[] };
}
