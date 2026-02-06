# Feature: SEO/GEO — Organic Traffic & AI Citations

Drive organic search traffic and AI-engine citations to Dreep through "cost of inaction" landing pages.

## Strategy

Create interactive landing pages at `/cout/[problem]/[industry]` that:
1. **Rank on Google** for "coût du [problem] en [industry]" long-tail queries
2. **Get cited by AI** (ChatGPT, Perplexity, Gemini) via structured FAQ, specific numbers, JSON-LD
3. **Convert to Dreep users** via CTA to create a full calculateur de coût

Two page types:
- **Décideur pages** — attract people searching to understand a cost → discover Dreep
- **Commercial pages** — attract salespeople who want to prove a cost to their prospect → use Dreep

## What Works ✅

- 8 seed pages statically pre-rendered at build time
- FAQPage JSON-LD schema on every page
- Interactive mini-calculator with sliders (only client component)
- All FAQ content open/visible in HTML (not collapsed) — GEO-optimized
- Internal linking between related pages
- Sitemap + robots.txt infrastructure (9 URLs submitted to Search Console)
- Reuses existing design system (slider CSS, CountUpNumber, cost card styling)
- Google Analytics 4 (`G-8L0KWN036X`) — confirmed live (realtime shows users)
- Google Search Console verified + sitemap submitted (9 pages discovered, 0 errors)
- Deployed on correct Vercel project (`dreep-n6fc`) with domain `www.dreep.app`
- Supabase client lazy-init — build works even without env vars

## What's Next

- Wait for GA4 data (24-48h for full reports)
- Monitor Search Console indexation (pages should index within days)
- Phase 2: Custom GA4 events (calculator engagement, CTA clicks)
- Phase 3: Content expansion (more industries, more problems)
- Phase 4: Migrate content to Supabase for CMS-like editing

## Active Tasks

_None_

## Completed Tasks

| Task | Title | Status | Date |
|---|---|---|---|
| DONE-001 | SEO/GEO Phase 1 — 8 Seed Pages | ✅ Done | 2026-02-06 |

## Decisions

### 2026-02-06: "Calculateur de coût" not "diagnostic"
- **Context**: Product naming — "diagnostic" sounds medical/clinical
- **Decision**: All user-facing copy uses "calculateur de coût"
- **Reason**: Matches the SEO pages ("coût du..."), more descriptive of what the product does
- **Status**: Confirmed — deployed

### 2026-02-06: Base URL = www.dreep.app
- **Context**: Sitemap was initially using `dreep.fr`, causing Search Console errors
- **Decision**: All canonical URLs, sitemap, robots use `https://www.dreep.app`
- **Status**: Confirmed — Search Console accepted sitemap with 0 errors

Last updated: 2026-02-06
Status: Phase 1 Complete + Analytics Live
