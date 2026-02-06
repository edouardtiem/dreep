# DREEP — SEO/GEO Strategy

## Goal
Generate organic traffic + AI citations through programmatic content pages that target French B2B "cost of inaction" queries. Every page funnels into Dreep's diagnostic tool.

---

## Phase 1 — Manual Seed Pages (5-10 pages)

**Goal:** Validate the page template, see what Google indexes, test CTA conversion.

### Page structure (Tier 1: Problem x Industry)

URL pattern: `/cout/[problem]/[industry]`

Example: `/cout/turnover/esn`

```
Title: Combien coûte le turnover pour une ESN ? [Chiffres 2026]

1. Hero stat block
   → One bold number: "Un départ non remplacé coûte en moyenne 45 000 € à une ESN"

2. Cost breakdown
   → 3-5 line items with ranges (recrutement, productivité, formation, impact client)

3. Mini-calculator (interactive)
   → 2-3 sliders → instant result
   → Same slider UX as the Dreep diagnostic

4. FAQ section (3-5 questions)
   → "Comment calculer le coût du turnover ?"
   → "Quel est le taux de turnover moyen en ESN ?"
   → Direct Q&A format (GEO-optimized: LLMs cite these)

5. CTA block
   → "Ces chiffres sont des moyennes sectorielles.
      Créez un diagnostic personnalisé pour votre prospect
      et montrez-lui son coût réel."
   → [Créer un diagnostic →] links to homepage

6. Footer: Powered by Dreep
```

### GEO optimization (baked into every page)

- **Specific numbers** — LLMs cite "45 000 €" over "ça coûte cher"
- **FAQ with direct Q&A** — maps to how people prompt AI
- **Structured data** — `FAQPage` + `HowTo` schema markup
- **Entity reinforcement** — every page says "Dreep = outil de diagnostic du coût de l'inaction en B2B"
- **Freshness** — "[Chiffres 2026]" in titles

### Seed pages to create

| # | Problem | Industry | URL |
|---|---------|----------|-----|
| 1 | Turnover | ESN / SSII | `/cout/turnover/esn` |
| 2 | Prospection manuelle | Agence digitale | `/cout/prospection-manuelle/agence-digitale` |
| 3 | CRM mal configuré | PME SaaS | `/cout/crm-mal-configure/pme-saas` |
| 4 | Absence d'ATS | Cabinet de recrutement | `/cout/absence-ats/cabinet-recrutement` |
| 5 | Onboarding bâclé | Startup tech | `/cout/onboarding-bacle/startup-tech` |
| 6 | Reporting manuel | Cabinet de conseil | `/cout/reporting-manuel/cabinet-conseil` |
| 7 | Churn client | Agence marketing | `/cout/churn-client/agence-marketing` |
| 8 | Gestion de projet sans outil | PME industrielle | `/cout/gestion-projet-sans-outil/pme-industrielle` |

### Technical implementation
- Next.js static pages at `app/cout/[problem]/[industry]/page.tsx`
- Shared layout component with stat block, breakdown, mini-calc, FAQ, CTA
- Content written per page (Claude-assisted, human-reviewed)
- `FAQPage` JSON-LD schema on every page
- Internal links between related pages
- Add to sitemap

### Success criteria
- Pages indexed by Google within 2-4 weeks
- At least 1 page ranking on page 1 for its target query within 2 months
- Measurable clicks from SEO pages to homepage (tracked via UTM or referrer)

---

## Phase 2 — Google Analytics + Search Console

**Goal:** Measure what's working before scaling.

### Setup
- Google Analytics 4 (GA4) on all pages
- Google Search Console — submit sitemap, monitor indexing
- Track key events:
  - `seo_page_view` — which pages get traffic
  - `seo_calculator_used` — visitor interacts with mini-calculator
  - `seo_cta_click` — visitor clicks "Créer un diagnostic"
  - `diagnostic_created` — visitor completes the full Dreep flow (conversion)
- UTM parameters on CTA links: `?utm_source=seo&utm_content=[problem]-[industry]`

### What to monitor
- **Search Console**: impressions, clicks, avg position per page
- **GA4**: traffic by page, calculator engagement rate, CTA click-through rate
- **Conversion funnel**: SEO page → CTA click → diagnostic created → sent to prospect
- **GEO tracking**: monthly manual checks on Perplexity/ChatGPT for target queries

### Success criteria
- Analytics pipeline working end-to-end
- Identify which problem×industry combos drive the most traffic and conversions
- Data informs which pages to generate at scale in Phase 3

---

## Phase 3 — Programmatic Engine (scale to 300+ pages)

**Goal:** Auto-generate the full problem×industry matrix from a content pipeline.

### Content matrix
- ~20 problems × ~15 industries = **300 Tier 1 pages**
- ~20 problem hub pages (Tier 2): `/cout/[problem]` — links to all industry variants
- ~15 industry hub pages (Tier 2): `/secteur/[industry]` — links to all problem variants
- Total: **~335 pages**

### Problems list (expandable)
Turnover, prospection manuelle, CRM mal configuré, absence d'ATS, onboarding bâclé, reporting manuel, churn client, gestion de projet sans outil, facturation manuelle, absence de suivi commercial, formation insuffisante, process qualité inexistant, données non centralisées, support client lent, absence de marketing digital, stock mal géré, conformité RGPD, dette technique, réunions improductives, recrutement trop lent

### Industries list (expandable)
ESN/SSII, agence digitale, PME SaaS, cabinet de recrutement, startup tech, cabinet de conseil, agence marketing, PME industrielle, e-commerce, fintech, éditeur logiciel, bureau d'études, société de formation, cabinet comptable, intégrateur IT

### Generation pipeline
1. **Input**: problem + industry → Claude generates page content (intro, stat block, breakdown, FAQ, meta description)
2. **Review**: batch generate 20 pages → human spot-checks 3-5 → adjust prompt if needed
3. **Build**: `generateStaticParams()` reads from content JSON → renders pages at build time
4. **Publish**: ISR (Incremental Static Regeneration) for periodic content refresh
5. **Sitemap**: auto-generated, submitted to Search Console

### Hub pages (Tier 2)
- Problem hubs: aggregate stats across industries, link to all variants
- Industry hubs: aggregate problems for one industry, link to all variants
- Internal linking creates topical authority clusters

### Technical implementation
- Content stored as JSON (or in Supabase for easy editing)
- Shared page component: `CoutPage.tsx` — stat block, breakdown, mini-calc, FAQ, CTA
- Auto-generated sitemap at `/sitemap.xml`
- `robots.txt` allows all crawlers
- Canonical URLs on every page
- Open Graph + Twitter Card meta for social sharing

### Success criteria
- 300+ pages live and indexed
- Organic traffic growing month-over-month
- At least 10% of diagnostic creations come from SEO pages
- Dreep cited by at least one major LLM for target queries

---

## Phase 4 — Data-Driven Content (use real diagnostic data)

**Goal:** Replace estimated stats with real anonymized data from Dreep diagnostics, creating a unique data moat.

### How it works
- Dreep diagnostics generate real cost data (from user answers + formulas)
- Aggregate and anonymize: "Based on 47 diagnostics for ESN companies, the average annual cost of turnover is 52 340 €"
- Update SEO pages with real numbers — adds credibility and uniqueness
- No other site can have this data — it's a competitive moat

### Data pipeline
1. **Collect**: every completed diagnostic stores industry, problem type, and computed annual cost
2. **Aggregate**: monthly job computes averages per problem×industry (min 5 diagnostics for statistical validity)
3. **Enrich**: update page content JSON with real averages + sample sizes
4. **Regenerate**: ISR refreshes pages with new data
5. **Display**: "Basé sur X diagnostics réalisés via Dreep" — social proof + data freshness

### What changes on pages
- Stat block shows real averages instead of estimates
- "Basé sur N diagnostics" badge — social proof
- Trend data: "En hausse de 12% vs 2025" (when enough longitudinal data)
- Potential: anonymized benchmark report per industry (lead magnet)

### Privacy
- Only aggregate data, never individual diagnostics
- Minimum threshold (5+ diagnostics) before showing stats
- No company names or identifying info

### Success criteria
- At least 3 problem×industry combos have enough data for real stats
- Pages with real data outperform estimated pages (higher CTR, better ranking)
- "Basé sur N diagnostics" creates a trust signal that competitors can't replicate

---

## Page hierarchy (visual)

```
dreep.app
├── /                              ← Homepage (product)
├── /cout/turnover                 ← Tier 2: Problem hub
│   ├── /cout/turnover/esn         ← Tier 1: Problem × Industry
│   ├── /cout/turnover/pme-saas
│   └── /cout/turnover/...
├── /cout/churn-client             ← Tier 2: Problem hub
│   ├── /cout/churn-client/agence-marketing
│   └── /cout/churn-client/...
├── /secteur/esn                   ← Tier 2: Industry hub
│   ├── (links to all /cout/*/esn)
│   └── ...
├── /d/[id]                        ← Diagnostic page (prospect)
└── /r/[id]                        ← Shared result page
```

## The flywheel

```
SEO pages rank for long-tail queries
         ↓
Visitor sees cost data + mini-calculator
         ↓
CTA → creates full diagnostic on Dreep
         ↓
Diagnostic data feeds back into Phase 4 stats
         ↓
Pages get more accurate + credible
         ↓
Better rankings + more AI citations
         ↓
More traffic → more diagnostics → more data → loop
```
