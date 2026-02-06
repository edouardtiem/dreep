# TASK-002: Dark Minimal Hero — Strip & Rebrand

**Status**: ✅ Done
**Created**: 2026-02-06
**Completed**: 2026-02-06
**Feature**: [Homepage Redesign](../README.md)

---

## Goal

Strip the hero to 3 core elements (headline + subtitle, pill-shaped inline input + CTA, inaction ticker) on a warm off-black background with subtle noise texture. Remove social proof, micro-explainer, and visual preview. The bet: zero friction (free, no signup, 20s) + high upside copy = conversion without convincing.

---

## Acceptance Criteria

### 1. Warm Dark Background
- [x] Hero section (step 1) uses background color `#0c0a09` (warm off-black, stone-950)
- [x] Subtle noise texture overlay at ~1.5% opacity via SVG feTurbulence, `pointer-events: none`, `mix-blend-mode: overlay`
- [x] Navbar on hero adapts: `bg-hero-bg/80 backdrop-blur-lg border-b border-white/5`
- [x] `min-h-screen` on hero wrapper

### 2. Dark Mode Color Palette (hero only)
- [x] `--hero-*` tokens added to `:root` and `@theme inline` (bg, text, muted, subtle, surface, border, cost)
- [x] Headline: `text-hero-text` (#fafaf9)
- [x] Subtitle: `text-hero-muted` (#a8a29e)
- [x] Objections: `text-hero-subtle` (#78716c)
- [x] Ticker: `text-hero-muted` for text, `text-hero-cost` (#f87171) for red number
- [x] Trust line: `text-hero-subtle`

### 3. Strip Hero to 3 Elements
- [x] `MicroExplainer` deleted entirely
- [x] `VisualPreview` deleted entirely
- [x] `SocialProof` deleted entirely
- [x] Single-column centered layout (no two-column split)
- [x] Only 3 groups: strikethrough + headline + subtitle, input + CTA, ticker + trust

### 4. Pill-Shaped Input + CTA
- [x] Both use `rounded-full`
- [x] Inline on md+, stacked on mobile
- [x] Input: `bg-hero-surface border-hero-border text-hero-text placeholder:text-hero-subtle`
- [x] Focus: `focus:border-brand focus:ring-2 focus:ring-brand/10`
- [x] CTA: `bg-brand text-white rounded-full` — no glow/shadow. Hover: `bg-brand-hover`

### 5. Padding & Centering
- [x] Hero content: `pt-32 md:pt-40` + `min-h-screen flex items-center justify-center`

### 6. Copy
- [x] Trust line: "Gratuit · Sans inscription · 30 secondes"
- [x] Headline, subtitle, CTA text unchanged

### 7. Non-Hero Unaffected
- [x] `/onboarding` path unchanged (white bg, `bg-ink` button)
- [x] Steps 2-5 remain white

### 8. Build
- [x] `npx tsc --noEmit` — zero errors
- [x] `npx next build` — all routes compile

---

## Progress Log

### 2026-02-06 — Ralph Iteration 1 (globals.css)
- **Working on**: Hero color tokens + noise texture
- **Actions**: Added 7 `--hero-*` tokens to `:root` and `@theme inline`. Added `.hero-noise::after` CSS class with SVG feTurbulence noise at 1.5% opacity.
- **Result**: Foundation ready
- **Problems**: None

### 2026-02-06 — Ralph Iteration 2 (page.tsx)
- **Working on**: Dark hero wrapper + navbar + padding
- **Actions**: Split page into two return blocks: step 1 (dark `bg-hero-bg min-h-screen hero-noise`) and steps 2-5 (white). Dark navbar with `bg-hero-bg/80 border-white/5`. Content centered with `min-h-screen flex items-center justify-center pt-32 md:pt-40`.
- **Result**: Clean separation of dark hero vs white steps
- **Problems**: None

### 2026-02-06 — Ralph Iteration 3 (StepPasteUrl.tsx)
- **Working on**: Strip hero + dark colors + pill shapes
- **Actions**: Deleted `MicroExplainer`, `VisualPreview`, `SocialProof` functions entirely. Hero renders single-column centered with 3 groups only. Added `dark` prop to `StrikethroughObjection` and `InactionTicker` for conditional dark colors. Input + CTA both `rounded-full`. Trust line simplified.
- **Result**: Clean, minimal, dark hero
- **Problems**: None

### 2026-02-06 — Ralph Iteration 4 (Verification)
- **Working on**: Build check
- **Actions**: `npx tsc --noEmit` — zero errors. `npx next build` — all routes compile.
- **Result**: Clean build
- **Problems**: None

---

## Outcome

Hero transformed from cluttered white (7 visual blocks) to minimal warm dark (3 elements). Warm off-black (#0c0a09) with noise texture creates French-premium aesthetic. Pill-shaped input + indigo CTA pop against dark background without needing glow effects. Social proof, micro-explainer, and visual preview removed — betting on zero-friction (free, no signup, 30s) to drive conversion.

---

## Ralph Sessions

### 2026-02-06 — COMPLETED
**Iterations**: 4
**Summary**: Stripped hero to 3 elements on warm dark background. Deleted 3 components, added 7 dark tokens, noise texture, pill shapes.

**Problems Encountered**:
- None

**Decisions Made**:
- Added `dark` prop to StrikethroughObjection and InactionTicker instead of creating duplicate components — keeps code DRY
- Split page.tsx into two return blocks (step 1 vs steps 2-5) for cleaner dark/white separation
- Used SVG feTurbulence for noise (inline data URI) — zero network requests, performant

**Files Modified**:
- `app/globals.css` — Hero tokens (`--hero-*` x7) + `.hero-noise::after` noise texture
- `app/page.tsx` — Dark hero wrapper, dark navbar, generous padding, white steps 2-5
- `app/components/onboarding/StepPasteUrl.tsx` — Stripped hero (deleted SocialProof, VisualPreview, MicroExplainer), dark colors, pill shapes, simplified trust line
