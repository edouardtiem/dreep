# DONE-001: SEO/GEO Phase 1 — 8 Seed Pages

**Status**: ✅ Done
**Created**: 2026-02-06
**Feature**: [SEO/GEO](../README.md)

---

## Goal

Create 8 interactive "cost of inaction" landing pages at `/cout/[problem]/[industry]` to drive organic traffic and AI citations. Each page has a hero stat, cost breakdown, mini-calculator with sliders, FAQ, and CTA to create a full diagnostic.

---

## Acceptance Criteria

- [x] 8 pages pre-rendered at build time via `generateStaticParams`
- [x] Each page has: hero stat, breakdown, interactive calculator, FAQ, CTA, related links, footer
- [x] Only 1 client component (`CoutMiniCalculator`) — everything else server-rendered
- [x] FAQPage JSON-LD schema on every page
- [x] OG meta tags + canonical URLs
- [x] `/sitemap.xml` lists homepage + all 8 pages (9 total)
- [x] `/robots.txt` allows all crawlers + points to sitemap
- [x] CTA links include UTM params (`utm_source=seo&utm_content=[problem]-[industry]`)
- [x] Internal links between related pages
- [x] `next build` passes cleanly
- [x] No linter errors introduced

---

## Files Created

### Data layer
- `app/lib/cout-types.ts` — TypeScript interfaces for page data
- `app/lib/cout-content.ts` — Content registry with all 8 pages + `getCoutPage()` helper

### Components (7)
- `app/components/cout/CoutHero.tsx` — Hero stat block (server)
- `app/components/cout/CoutBreakdown.tsx` — Cost breakdown card (server)
- `app/components/cout/CoutMiniCalculator.tsx` — Interactive sliders + live total (client)
- `app/components/cout/CoutFaq.tsx` — Open FAQ section (server)
- `app/components/cout/CoutCta.tsx` — CTA with UTM params (server)
- `app/components/cout/CoutRelatedPages.tsx` — Internal links (server)
- `app/components/cout/CoutFooter.tsx` — Powered by Dreep footer (server)

### Route + SEO
- `app/cout/[problem]/[industry]/page.tsx` — SSG orchestrator
- `app/sitemap.ts` — Sitemap with 9 URLs
- `app/robots.ts` — Allow all crawlers

---

## 8 Pages

| # | Problem | Industry | URL | Type |
|---|---------|----------|-----|------|
| 1 | Turnover | Startup SaaS | `/cout/turnover/startup-saas` | décideur |
| 2 | Recrutement raté | PME | `/cout/recrutement-rate/pme` | décideur |
| 3 | Churn client | SaaS B2B | `/cout/churn-client/saas-b2b` | décideur |
| 4 | Prospection manuelle | Consultant B2B | `/cout/prospection-manuelle/consultant-b2b` | décideur |
| 5 | Pipeline non structuré | Équipe commerciale | `/cout/pipeline-non-structure/equipe-commerciale` | commercial |
| 6 | Absence de CRM | PME | `/cout/absence-crm/pme` | commercial |
| 7 | Poste vacant | Cabinet recrutement | `/cout/poste-vacant/cabinet-recrutement` | commercial |
| 8 | Onboarding bâclé | Agence digitale | `/cout/onboarding-client-bacle/agence-digitale` | commercial |

---

## Progress Log

### 2026-02-06
- Created all 13 files (types, content, 7 components, route, sitemap, robots)
- Reused existing patterns: slider markup from StepTestDiagnostic, CountUpNumber, ResultView footer, cost card styling
- `next build` passes — all 8 pages statically pre-rendered
- Verified: JSON-LD, OG tags, UTM params, internal links, sitemap (9 URLs), robots.txt

---

## Outcome

All 8 seed pages built and verified. Ready for deployment. Content is TypeScript-typed, zero DB dependency. Only 1 client component (calculator). All FAQ content is open (not collapsed) for crawler/LLM visibility.
