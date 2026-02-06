# TASK-001: Supabase Setup + Full Integration

**Status**: ✅ Done
**Created**: 2026-02-06
**Feature**: [Database + Shareable Links](../README.md)

---

## Goal

Wire Supabase so diagnostics persist, `/d/[id]` loads real data, and prospect answers are saved. Turn Dreep from a demo into a usable product.

---

## Acceptance Criteria

### 1. Supabase Project + Client Setup
- [x] Install `@supabase/supabase-js`
- [x] Create `app/lib/supabase.ts` with server client (using env vars)
- [x] Add `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`
- [x] Verify connection works

### 2. Database Schema
- [x] Create `diagnostics` table: `id` (uuid, PK), `url` (text), `understanding` (jsonb), `questions` (jsonb), `breakdown_templates` (jsonb), `created_at` (timestamptz)
- [x] Create `responses` table: `id` (uuid, PK), `diagnostic_id` (uuid, FK), `answers` (jsonb), `breakdowns` (jsonb), `annual_cost` (numeric), `completed_at` (timestamptz)
- [x] RLS policies: diagnostics readable by anyone, responses insertable by anyone
- [x] Migration SQL saved in `supabase/migrations/`

### 3. API: Save Diagnostic
- [x] Create `POST /api/diagnostics` route
- [x] Accepts: `{ url, understanding, questions, breakdownTemplates }`
- [x] Saves to `diagnostics` table, returns `{ id }`
- [x] Validates required fields

### 4. Wire Onboarding → Save on Completion
- [x] After step 4 (result confirmed), call `POST /api/diagnostics` to save
- [x] Pass the returned `id` to StepLinkReady
- [x] StepLinkReady shows real link using `window.location.origin`

### 5. `/d/[id]` Loads Real Data
- [x] Rewrite `app/d/[id]/page.tsx` as server component fetching from Supabase
- [x] Client component `ProspectExperience.tsx` handles interactive UI
- [x] Shows real company understanding, questions, computes breakdowns
- [x] 404 if diagnostic not found

### 6. API: Save Prospect Response
- [x] Create `POST /api/responses` route
- [x] Saves to `responses` table when prospect clicks "Voir mon résultat"

### 7. Build Verification
- [x] `npx tsc --noEmit` passes
- [x] `npx next build` succeeds

---

## Files Involved

- `app/lib/supabase.ts` — Supabase client
- `app/api/diagnostics/route.ts` — POST save diagnostic
- `app/api/responses/route.ts` — POST save prospect response
- `app/d/[id]/page.tsx` — Server component fetching from DB
- `app/d/[id]/ProspectExperience.tsx` — Client component for prospect UI
- `app/page.tsx` — Save diagnostic after step 4, pass ID to step 5
- `app/components/onboarding/StepLinkReady.tsx` — Real link with diagnosticId prop
- `supabase/migrations/001_initial.sql` — Schema migration

---

## Progress Log

### 2026-02-06
- Task created for Phase 5

### 2026-02-06 - Ralph Iteration 1
- **Working on**: Supabase Project + Client Setup
- **Actions**: Installed @supabase/supabase-js, created supabase.ts client, added env vars
- **Result**: Connection verified — table query returns "table not found" (expected)
- **Problems**: None

### 2026-02-06 - Ralph Iteration 2
- **Working on**: Database Schema
- **Actions**: Created migration SQL with diagnostics + responses tables, RLS policies. User ran SQL in Supabase dashboard.
- **Result**: Both tables verified accessible via JS client
- **Problems**: Supabase JS can't run DDL — user had to run SQL manually

### 2026-02-06 - Ralph Iteration 3
- **Working on**: API: Save Diagnostic
- **Actions**: Created POST /api/diagnostics with validation and Supabase insert
- **Result**: Route created
- **Problems**: None

### 2026-02-06 - Ralph Iteration 4
- **Working on**: Wire Onboarding + StepLinkReady
- **Actions**: Added diagnosticId state to page.tsx, save diagnostic after step 4, pass ID to StepLinkReady. Updated StepLinkReady to show real link.
- **Result**: Full save → link flow wired
- **Problems**: None

### 2026-02-06 - Ralph Iteration 5
- **Working on**: `/d/[id]` Loads Real Data
- **Actions**: Rewrote page.tsx as server component + new ProspectExperience.tsx client component. Fetches from Supabase, passes real data to interactive UI.
- **Result**: Prospect page fully wired to DB
- **Problems**: None

### 2026-02-06 - Ralph Iteration 6
- **Working on**: API: Save Prospect Response
- **Actions**: Created POST /api/responses route
- **Result**: Route created
- **Problems**: None

### 2026-02-06 - Ralph Iteration 7
- **Working on**: Build Verification
- **Actions**: tsc + next build
- **Result**: Initial tsc failed — /onboarding/page.tsx missing diagnosticId prop. Fixed by making prop optional.
- **Problems**: StepLinkReady prop became required but /onboarding still used old signature
- **Solutions**: Made diagnosticId optional (`diagnosticId?: string | null`)

---

## Outcome

Phase 5 complete. Diagnostics persist in Supabase. Salespeople get real shareable links. Prospects see real data and their responses are saved. Dreep is now a usable product.

---

## Ralph Sessions

### 2026-02-06 — COMPLETED
**Iterations**: 7
**Summary**: Full Supabase integration — schema, 2 API routes, server-side data fetching, real shareable links, prospect response saving. Build passes cleanly.

**Problems Encountered**:
- Supabase JS can't run DDL → User ran migration SQL manually in dashboard
- StepLinkReady `diagnosticId` prop broke /onboarding → Made prop optional

**Decisions Made**:
- Used service role key for server-side operations (bypasses RLS for inserts)
- Split /d/[id] into server component (data fetch) + client component (interactive UI)
- diagnosticId optional in StepLinkReady to maintain backward compat with /onboarding

**Files Modified**:
- `app/lib/supabase.ts` — NEW: Supabase client
- `app/api/diagnostics/route.ts` — NEW: Save diagnostic
- `app/api/responses/route.ts` — NEW: Save prospect response
- `app/d/[id]/page.tsx` — REWRITE: Server component fetching from DB
- `app/d/[id]/ProspectExperience.tsx` — NEW: Client component for prospect UI
- `app/page.tsx` — Save after step 4, pass diagnosticId to step 5
- `app/components/onboarding/StepLinkReady.tsx` — Real link with optional diagnosticId
- `supabase/migrations/001_initial.sql` — NEW: Schema migration
