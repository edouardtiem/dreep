# Feature: Email Notifications

Transactional emails via Resend — notify salespeople when prospects complete diagnostics, and let prospects receive their results by email.

## Context

Salespeople create diagnostic calculators and share links with prospects. Without notifications, salespeople have no way to know when a prospect completes the calculator. This feature closes the feedback loop.

## What Works ✅

- Salesperson notification on prospect completion (with full cost breakdown)
- Prospect can receive result by email (with full cost breakdown)
- Prospect email captured in Supabase (`responses.prospect_email`)
- Full data chain: prospect → response → diagnostic → salesperson
- BIMI setup for sender branding (DNS + public SVG logo)
- Emails formatted for CRM automation (structured HTML with amounts)

## What Doesn't Work ❌

- BIMI logo may take days/weeks to appear in Gmail (DNS propagation + Google verification)

## Completed Tasks

| Task | Title | Status | Date |
|---|---|---|---|
| DONE-001 | Resend Notifications | ✅ Done | 2026-02-08 |

## Tech

- **Provider**: Resend (free tier, 3000 emails/mo)
- **Sending address**: `notifications@dreep.app`
- **BIMI**: `default._bimi.dreep.app` → `https://www.dreep.app/logo.svg`

Last updated: 2026-02-08
