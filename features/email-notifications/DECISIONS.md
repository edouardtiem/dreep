# Decisions — Email Notifications

## 2026-02-08: Resend over Supabase Edge Functions

**Context**: Needed server-side email sending when prospects complete diagnostics.

**Options considered**:
1. Supabase Edge Functions + SMTP → Adds Deno runtime + webhook + still needs email provider
2. Resend in Next.js API route → 10 lines, no new infrastructure
3. Brevo (ex-Sendinblue) → French company, GDPR-friendly, but more complex SDK

**Decision**: Resend directly in Next.js API routes

**Reason**: Simplest path. No new infrastructure, same deployment (Vercel). Supabase Edge Functions would add an unnecessary layer since we'd still need Resend inside them.

**Result**: Working in <30 min, tested and confirmed.

## 2026-02-08: Breakdown detail in email body

**Context**: User requested cost breakdown in email so sales teams can automate CRM ingestion.

**Options considered**:
1. Just total cost + link to result page
2. Full breakdown table with label, formula, amount per line

**Decision**: Full breakdown table

**Reason**: Enables CRM automation — sales tools (Zapier, Make, n8n) can parse structured email content and extract line items. Also provides immediate value without clicking through.

**Result**: Both salesperson and prospect emails include full breakdown table.
