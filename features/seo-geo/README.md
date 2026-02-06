# Feature: SEO/GEO — Organic Traffic & AI Citations

Drive organic search traffic and AI-engine citations to Dreep through "cost of inaction" landing pages.

## Strategy

Create interactive landing pages at `/cout/[problem]/[industry]` that:
1. **Rank on Google** for "coût du [problem] en [industry]" long-tail queries
2. **Get cited by AI** (ChatGPT, Perplexity, Gemini) via structured FAQ, specific numbers, JSON-LD
3. **Convert to Dreep users** via CTA to create a full diagnostic

Two page types:
- **Décideur pages** — attract people searching to understand a cost → discover Dreep
- **Commercial pages** — attract salespeople who want to prove a cost to their prospect → use Dreep

## What Works ✅

- 8 seed pages statically pre-rendered at build time
- FAQPage JSON-LD schema on every page
- Interactive mini-calculator with sliders (only client component)
- All FAQ content open/visible in HTML (not collapsed) — GEO-optimized
- Internal linking between related pages
- Sitemap + robots.txt infrastructure
- Reuses existing design system (slider CSS, CountUpNumber, cost card styling)

## What's Next

- Phase 2: Performance monitoring (GA4 events, Search Console indexing)
- Phase 3: Content expansion (more industries, more problems)
- Phase 4: Migrate content to Supabase for CMS-like editing

## Active Tasks

_None_

## Completed Tasks

| Task | Title | Status | Date |
|---|---|---|---|
| DONE-001 | SEO/GEO Phase 1 — 8 Seed Pages | ✅ Done | 2026-02-06 |

Last updated: 2026-02-06
Status: Phase 1 Complete
