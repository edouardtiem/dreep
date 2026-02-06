export type { Breakdown } from "@/app/lib/types";

import type { Breakdown } from "@/app/lib/types";

export const mockBreakdowns: Breakdown[] = [
  { label: "Temps perdu en réunions inutiles", formula: "15 personnes × 3h/sem × 48 sem × 45€/h", amount: 97200, category: "Coût de temps" },
  { label: "Erreurs de saisie manuelle", formula: "200 erreurs/mois × 2h correction × 45€/h", amount: 21600, category: "Coût direct" },
  { label: "Opportunités manquées (délai de réponse)", formula: "5 deals/mois × 15 000€ × 12% perte", amount: 9000, category: "Coût d'opportunité" },
  { label: "Turnover lié à la frustration outil", formula: "2 départs/an × 30 000€ coût remplacement", amount: 60000, category: "Coût de risque" },
];

export const mockAnnualCost = 187800;
