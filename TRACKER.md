# DREEP — Project Tracker

## Phases
| # | Phase | Status |
|---|---|---|
| 1 | Core animations & result page (hardcoded data) | ✅ Done |
| 2 | Onboarding flow (5 screens) | ✅ Done |
| 3 | Prospect experience (`/d/[id]`) | ✅ Done |
| 4 | AI integration (web scraping + Claude) | ✅ Done |
| 5 | Database + shareable links (Supabase) | ✅ Done |
| 6 | Product-led loop (PLG footer link + email capture) | ✅ Done |
| 7 | Programmatic SEO pages engine | Planned |
| 8 | Polish (emails, notifications, analytics) | Planned |

## What Works Today
- Salesperson pastes any company URL → AI analyzes the site → generates personalized diagnostic
- 5-step onboarding: URL → company understanding (editable) → slider questions → animated cost result → shareable link
- Prospect experience at `/d/[id]` with real data from Supabase
- Shareable result links at `/r/[responseId]`
- "Powered by Dreep" footer links to homepage (PLG viral loop)
- Salesperson email capture at Step 5 — stored in DB for future notifications
- Email prefilled from localStorage for returning users
- Tested on: dealslate.app, acceor.com, koban.cloud, axonaut.com, boondmanager.com — all produce relevant diagnostics

## What Doesn't Work Yet
- No email notifications
- No user accounts
- No custom domain (links use localhost in dev)

## Progress Log
| Date | What was done |
|---|---|
| 2026-02-06 | Project bootstrapped: Next.js 16 + TypeScript + Tailwind v4 + Framer Motion |
| 2026-02-06 | PRD written |
| 2026-02-06 | Core animated components: CountUpNumber, CostBarChart, DripCounter, CalculationBreakdown |
| 2026-02-06 | Salesperson onboarding: 5-step wizard with mock data |
| 2026-02-06 | Prospect experience: `/d/[id]` with 3 screens |
| 2026-02-06 | Editorial design system: Instrument Serif, semantic colors, editorial typography |
| 2026-02-06 | **Phase 4**: AI integration — `@anthropic-ai/sdk`, `app/api/analyze/route.ts`, `app/lib/types.ts`, `app/lib/compute.ts` |
| 2026-02-06 | Web scraping via `curl` with cookie jar (handles Clerk auth, redirect loops) |
| 2026-02-06 | Claude Sonnet generates: company understanding, 5-7 slider questions, 3-5 cost formulas |
| 2026-02-06 | All 4 step components wired to real AI data (no more mock in onboarding) |
| 2026-02-06 | Formula engine: `computeBreakdowns()` with safe eval, display formula builder |
| 2026-02-06 | Tested on 5 real company URLs — diagnostics are relevant and realistic |
| 2026-02-06 | Homepage redesign: `app/page.tsx` now serves as product landing page with full onboarding flow |
| 2026-02-06 | `hero` prop on StepPasteUrl — different copy/layout for homepage vs onboarding |
| 2026-02-06 | ~~Floating sales objections background~~ → replaced with "Inaction Meter" hero design |
| 2026-02-06 | StrikethroughObjection: single objection appears in italic serif, red line strikes through it, cycles |
| 2026-02-06 | InactionTicker: live cost counter ticking at 0.08 EUR/s in red monospace below CTA |
| 2026-02-06 | Tagline: "Les meilleurs closers ne pitchent plus. Ils calculent." (chosen via multi-agent copywriting) |
| 2026-02-06 | ROADMAP.md created: positioning, dual distribution strategy, pricing tiers, ICP |
| 2026-02-06 | **Phase 6**: PLG footer link (Dreep → homepage, target=_blank) + salesperson email capture at Step 5 |
| 2026-02-06 | PATCH `/api/diagnostics/[id]` endpoint for email updates, `email` column added to diagnostics table |

## Decisions
| # | Decision | Rationale | Date |
|---|---|---|---|
| 1 | Demo-first (front-to-back) | Build the "wow" first, validate UX before backend | 2026-02-06 |
| 2 | Instrument Serif for headings | Editorial/The Economist feel | 2026-02-06 |
| 3 | Red reserved for cost data only | "Data red, not alarm red" | 2026-02-06 |
| 4 | `curl` instead of Node `fetch` for scraping | Handles cookies/redirects (Clerk, Vercel) that break Node fetch | 2026-02-06 |
| 5 | Claude Sonnet 4.5 for diagnostic generation | Fast, cheap, good structured JSON output | 2026-02-06 |
| 6 | Safe formula eval with regex whitelist | `new Function` only after `/^[\d\s+\-*/().]+$/` validation | 2026-02-06 |
| 7 | Product-led + programmatic SEO as dual distribution | PLG via Dreep branding on every `/d/` link + SEO via generated topic pages | 2026-02-06 |
| 8 | Homepage = product (no separate landing page) | Show the tool immediately, no "why use Dreep" page needed | 2026-02-06 |
| 9 | Identity-based tagline over feature-based | "Les meilleurs closers ne pitchent plus. Ils calculent." — aspirational positioning | 2026-02-06 |
| 10 | "Inaction Meter" over floating quotes | Strikethrough + live ticker creates urgency; floating quotes felt bland | 2026-02-06 |
| 11 | Email capture at Step 5 (not Step 4) | Non-blocking — salesperson sees their link first, then opts into notifications | 2026-02-06 |
| 12 | Skip onboarding/page.tsx for email capture | Legacy route — focus on page.tsx which is the main flow | 2026-02-06 |

## Architecture
```
app/
├── api/analyze/route.ts                # POST: URL → curl → strip HTML → Claude → DiagnosticData
├── api/diagnostics/route.ts            # POST: save new diagnostic to Supabase
├── api/diagnostics/[id]/route.ts       # PATCH: update diagnostic (email capture)
├── lib/
│   ├── types.ts                        # Shared interfaces (DiagnosticData, Breakdown, etc.)
│   └── compute.ts                      # Formula evaluation (computeBreakdowns, buildDisplayFormula)
├── components/
│   ├── mockData.ts                     # Mock data (still used by / and /d/[id])
│   ├── ResultPage.tsx                  # Composes all result components
│   ├── CountUpNumber.tsx               # Animated count-up
│   ├── CostBarChart.tsx                # 4-period bar chart
│   ├── DripCounter.tsx                 # Live ticking counter
│   ├── CalculationBreakdown.tsx        # Expandable formula cards
│   └── onboarding/
│       ├── StepPasteUrl.tsx            # Step 1: URL input → calls /api/analyze
│       ├── StepConfirmUnderstanding.tsx # Step 2: Edit AI understanding
│       ├── StepTestDiagnostic.tsx      # Step 3: AI-generated slider questions
│       ├── StepSeeResult.tsx           # Step 4: Computed results
│       └── StepLinkReady.tsx           # Step 5: Shareable link
├── onboarding/page.tsx                 # Orchestrates all 5 steps with real data
├── d/[id]/page.tsx                     # Prospect experience (mock data for now)
└── page.tsx                            # Product homepage (hero + full onboarding flow)
```
