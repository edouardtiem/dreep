export interface CoutSlider {
  id: string;
  label: string;
  min: number;
  max: number;
  defaultValue: number;
  unit: string;
  step: number;
}

export interface CoutBreakdownItem {
  label: string;
  formula: string;
  /** Static example amount shown in the breakdown */
  amount: number;
  category: string;
}

export interface CoutFaqItem {
  question: string;
  answer: string;
}

export interface CoutRelatedPage {
  problem: string;
  industry: string;
  label: string;
}

export interface CoutPageData {
  /** URL slug — problem part */
  problem: string;
  /** URL slug — industry part */
  industry: string;

  /** SEO meta title */
  metaTitle: string;
  /** SEO meta description */
  metaDescription: string;

  /** Hero section */
  heroStatNumber: string;
  heroStatLabel: string;
  heroSubtitle: string;

  /** Cost breakdown items */
  breakdowns: CoutBreakdownItem[];

  /** Interactive sliders for mini-calculator */
  sliders: CoutSlider[];
  /** Expression evaluated with slider values: e.g. "s0 * s1 * 12" */
  calculatorFormula: string;
  /** Label shown above the calculator result */
  calculatorResultLabel: string;

  /** FAQ items */
  faq: CoutFaqItem[];

  /** CTA text */
  ctaHeading: string;
  ctaButtonLabel: string;

  /** Related pages for internal linking */
  relatedPages: CoutRelatedPage[];

  /** "decideur" or "commercial" — determines CTA utm_content */
  pageType: "decideur" | "commercial";
}
