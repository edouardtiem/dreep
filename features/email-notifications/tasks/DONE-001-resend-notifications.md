# DONE-001: Email Notifications via Resend

**Status**: ✅ Done
**Created**: 2026-02-08
**Feature**: [Email Notifications](../README.md)

---

## Goal

Send email notifications when prospects complete a diagnostic calculator, and allow prospects to receive their results by email. Close the feedback loop for salespeople and capture prospect emails for CRM automation.

---

## Acceptance Criteria

- [x] Salesperson receives email when prospect completes diagnostic
- [x] Email includes full cost breakdown (label, formula, amount per line)
- [x] Email includes total annual cost and link to interactive result
- [x] Prospect can enter email to receive their result
- [x] Prospect email saved to Supabase (`responses.prospect_email`)
- [x] Data chain: prospect_email → response → diagnostic → salesperson email
- [x] BIMI DNS record + public logo SVG for sender branding
- [x] No linter errors introduced

---

## Approach

1. Install `resend` npm package
2. Add `RESEND_API_KEY` to `.env.local`
3. Modify `POST /api/responses` to send notification to salesperson after saving
4. Add `prospect_email` column to `responses` table (migration 003)
5. Create `PATCH /api/responses/[id]` to save prospect email + send result email
6. Update `ResultView` component: replace `mailto:` with email capture form
7. Add BIMI DNS record + `public/logo.svg` for email sender branding

---

## Files Involved

- `app/api/responses/route.ts` — Added Resend import + salesperson notification with breakdown
- `app/api/responses/[id]/route.ts` — **New**: PATCH endpoint for prospect email capture + send result
- `app/components/ResultView.tsx` — Replaced mailto button with email input form
- `public/logo.svg` — **New**: BIMI-compliant SVG for email sender branding
- `supabase/migrations/003_add_prospect_email.sql` — **New**: Add prospect_email column
- `package.json` — Added `resend` dependency
- `.env.local` — Added `RESEND_API_KEY`

---

## Progress Log

### 2026-02-08
- Evaluated email providers: Resend vs Supabase Edge Functions vs Brevo
- Chose Resend (simplest, 3000 emails/mo free, no extra infrastructure)
- Implemented salesperson notification with cost breakdown table in HTML email
- Tested email delivery to edouard@tiemh.com — confirmed working
- Added full breakdown detail (label + formula + amount per line + total)
- Added prospect email capture: new PATCH endpoint + ResultView form
- Created migration 003 for `prospect_email` column (run manually in Supabase dashboard)
- Set up BIMI: DNS record `default._bimi.dreep.app` + public logo SVG
- Fixed duplicate DMARC record (user had both `p=none` and `p=quarantine`)

---

## Decisions

- **Resend over Supabase Edge Functions**: Supabase would add an extra layer (Deno runtime + webhook) but still require an email provider. Resend in Next.js API route = 10 lines, no new infrastructure.
- **Fire-and-forget email sending**: `.catch()` pattern — email failure doesn't block the API response
- **Breakdown in email body**: Enables CRM automation — sales tools can parse structured email content
- **Prospect email on responses table** (not separate table): Simplest schema, direct FK chain to salesperson

---

## Outcome

Full email notification loop working:
1. Salesperson creates diagnostic → enters email at Step 5
2. Prospect completes diagnostic → salesperson gets notification email with full breakdown
3. Prospect sees result → can enter email to receive result by email
4. All emails traceable: prospect → response → diagnostic → salesperson

Tested with real Supabase data (openclassrooms.com, €96,720/an) — both salesperson and prospect emails delivered successfully via Resend.
