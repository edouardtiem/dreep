# DONE-002: GA4 + Search Console + Funnel Events

**Status**: ✅ Done
**Created**: 2026-02-06
**Feature**: [SEO/GEO](../README.md)

---

## Goal

Set up analytics infrastructure: Google Analytics 4, Google Search Console, and funnel event tracking to measure user engagement through the onboarding flow.

---

## Acceptance Criteria

- [x] GA4 tag (`G-8L0KWN036X`) loads on all pages
- [x] GA4 realtime shows active users
- [x] Google Search Console verified (HTML file method)
- [x] Sitemap submitted to Search Console (9 pages, 0 errors)
- [x] Funnel events fire at each onboarding step transition
- [x] `link_copied` and `email_captured` events fire on user actions
- [x] No build errors

---

## Files Created/Modified

- `app/layout.tsx` — Added GA4 `next/script` tags
- `app/gtag.d.ts` — TypeScript declaration for `window.gtag`
- `app/page.tsx` — Added `funnel_step` events at each step transition
- `app/components/onboarding/StepLinkReady.tsx` — Added `link_copied` + `email_captured` events
- `public/google7e4d1dd2dd792358.html` — Search Console verification file

---

## Events Tracked

| Event | Trigger | Data |
|-------|---------|------|
| `funnel_step` (2) | URL analyzed | `step_name`, `url` |
| `funnel_step` (3) | Questions generated | `step_name` |
| `funnel_step` (4) | Result viewed | `step_name`, `annual_cost` |
| `funnel_step` (5) | Link ready | `step_name` |
| `link_copied` | User clicks "Copier" | — |
| `email_captured` | User submits email | — |

---

## Progress Log

### 2026-02-06
- Added GA4 tag, fixed script placement (head → body for App Router)
- Verified Search Console with HTML file, submitted sitemap
- Fixed base URL from `dreep.fr` to `www.dreep.app` (was causing SC errors)
- Added funnel events at all 5 step transitions + 2 action events
- Confirmed GA4 realtime shows users

---

## Outcome

Full analytics stack live. GA4 tracks page views + custom funnel events. Search Console indexing 9 pages. Data will populate in 24-48h.
