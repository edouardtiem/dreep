# TASK-003: Hero V3 — The €50M Launch Feel

**Status**: ✅ Done
**Created**: 2026-02-06
**Feature**: [Homepage Redesign](../README.md)

---

## Goal

Transform the dark hero from "dark Tailwind template" into "French startup that just shipped something dangerous." Cool zinc dark, radial indigo glow, giant live cost counter as centerpiece, unified input bar, blur entrance choreography, floating wordmark.

---

## Acceptance Criteria

### 1. Cool Zinc Dark (not warm stone)
- [x] Switch hero tokens from stone to zinc: `--hero-bg: #09090b`, `--hero-surface: #18181b`, `--hero-border: #27272a`, `--hero-muted: #a1a1aa`, `--hero-subtle: #71717a`
- [x] Keep `--hero-text: #fafaf9` and `--hero-cost: #f87171`

### 2. Radial Indigo Glow
- [x] Add `.hero-glow::before` in globals.css: `radial-gradient(ellipse 80% 60% at 50% 40%, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0.03) 30%, transparent 70%)`
- [x] Apply `hero-glow` class to hero wrapper in page.tsx
- [x] Bump noise overlay to `opacity: 0.03` with `mix-blend-mode: soft-light`

### 3. Kill Navbar Bar — Floating Wordmark
- [x] Remove the `<header>` bar with background/border/blur
- [x] Replace with floating "Dreep" wordmark: `fixed top-6 left-6 z-30 font-serif text-[20px] text-hero-text/60`
- [x] Remove "Se connecter" link entirely

### 4. Giant Live Cost Counter (THE BOLD MOVE)
- [x] Pull the ticking number out of the sentence into a standalone display
- [x] Number: `font-mono text-[40px] md:text-[56px] font-semibold tabular-nums text-hero-cost`
- [x] Red text-shadow glow: `text-shadow: 0 0 40px rgba(248,113,113,0.15), 0 0 80px rgba(248,113,113,0.05)`
- [x] Label below: "coût de l'inaction depuis votre arrivée" in `text-[13px] text-hero-subtle`
- [x] Position: between headline and input bar
- [x] Uses ref-based textContent + requestAnimationFrame (60fps, zero re-renders)

### 5. Unified Input Container
- [x] Single `rounded-xl` container wrapping both input + button
- [x] Container: `bg-hero-surface border border-hero-border rounded-xl shadow-[0_0_0_1px_rgba(255,255,255,0.06)]`
- [x] Focus state on container: `focus-within:border-brand/40 focus-within:shadow-[0_0_0_1px_rgba(99,102,241,0.15)]`
- [x] Input: `bg-transparent` inside container, no own border
- [x] Button: `rounded-lg m-1.5 bg-brand py-2.5 px-5 text-[14px]` — inset inside container
- [x] Shorter CTA text: "Créer mon diagnostic →" (drop "gratuit")
- [x] Mobile: stacks vertically, both rounded-xl, separate containers

### 6. Entrance Choreography (blur-in stagger)
- [x] Each element enters with `initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}` → `animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}`
- [x] Stagger: objection delay 0, headline delay 0.2, subtitle delay 0.35, cost counter delay 0.5, input bar delay 0.7, trust line delay 0.9
- [x] Total entrance ~1.2s
- [x] Easing: `[0.25, 0.46, 0.45, 0.94]`

### 7. Trust Line Typographic Treatment
- [x] Three items separated by `|` divider in hero-subtle
- [x] "Gratuit | Sans inscription | 30 secondes" with "30" in `font-mono`
- [x] Slightly larger: `text-[13px]` with `font-medium` on each item

### 8. Build Verification
- [x] `npx tsc --noEmit` passes
- [x] `npx next build` succeeds
- [x] Non-hero /onboarding unaffected
- [x] Steps 2-5 remain white

---

## Files Involved

- `app/globals.css` — Update hero tokens (zinc), add hero-glow, update noise
- `app/page.tsx` — Floating wordmark, hero-glow class, kill navbar bar
- `app/components/onboarding/StepPasteUrl.tsx` — Giant cost counter, unified input, blur entrance, trust line

---

## Progress Log

### 2026-02-06
- Task created from design agent feedback
- Key decisions: cool zinc > warm stone, giant cost counter as centerpiece, unified input bar, blur entrance choreography

### 2026-02-06 - Ralph Iteration 1
- **Working on**: Cool Zinc Dark tokens + Radial Indigo Glow + Cost Glow
- **Actions**: Updated globals.css — zinc palette (#09090b, #18181b, #27272a, #a1a1aa, #71717a), hero-glow::before radial gradient, noise bump to 0.03 soft-light, cost-glow text-shadow
- **Result**: All hero tokens and CSS effects in place
- **Problems**: None

### 2026-02-06 - Ralph Iteration 2
- **Working on**: Kill Navbar Bar + Floating Wordmark
- **Actions**: Replaced `<header>` with floating `<span>` wordmark in page.tsx, added hero-glow class, removed "Se connecter"
- **Result**: Clean floating wordmark, no navbar bar
- **Problems**: None

### 2026-02-06 - Ralph Iteration 3
- **Working on**: Giant Cost Counter + Unified Input + Blur Entrance + Trust Line
- **Actions**: Full rewrite of StepPasteUrl.tsx — CostCounter component (56px standalone), unified input bar (Vercel-style), blur-in choreography, trust line with | dividers
- **Result**: All hero elements implemented
- **Problems**: None

### 2026-02-06 - Ralph Iteration 4
- **Working on**: Build Verification
- **Actions**: Ran tsc + next build
- **Result**: Initial build failed with 2 TS errors — `ease: number[]` not assignable to Framer Motion tuple type, and `MotionValue<string>` not usable as ReactNode
- **Problems**: Framer Motion strict typing on ease curves; MotionValue can't be rendered as JSX child
- **Solutions**: Added `as const` to ease tuple; switched from MotionValue/useTransform to ref-based textContent updates (better for 60fps anyway — zero React re-renders). Clean build after fixes.

---

## Outcome

Successfully transformed the hero from "dark Tailwind template" to "€50M launch feel" with:
- Cool zinc dark palette with subtle radial indigo glow
- Giant 56px live cost counter as visual centerpiece (red glow)
- Vercel-style unified input container with inset branded CTA
- Staggered blur-in entrance choreography (~1.2s)
- Floating wordmark instead of navbar bar
- Typographic trust line with | dividers

---

## Ralph Sessions

### 2026-02-06 — COMPLETED
**Iterations**: 4
**Summary**: Implemented all 8 acceptance criteria for the €50M launch hero. Cool zinc dark, indigo glow, giant cost counter, unified input, blur entrance, trust line. Fixed 2 TypeScript issues during build verification.

**Problems Encountered**:
- Framer Motion `ease` type mismatch → Fixed with `as const` tuple assertion
- `MotionValue<string>` not renderable as ReactNode → Switched to ref-based textContent (better perf anyway)

**Decisions Made**:
- Used ref-based DOM updates for tickers instead of MotionValue — bypasses React rendering entirely for 60fps animation
- Kept separate InactionTicker for non-hero mode (simpler inline format)

**Files Modified**:
- `app/globals.css` — Zinc hero tokens, hero-glow radial gradient, noise bump, cost-glow text-shadow, heading color fix (@layer base)
- `app/page.tsx` — Floating wordmark, hero-glow/hero-noise classes, killed navbar bar
- `app/components/onboarding/StepPasteUrl.tsx` — Giant CostCounter, unified input bar, blur-in choreography, trust line, "vous signez" underline animation
