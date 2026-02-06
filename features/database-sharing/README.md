# Feature: Database + Shareable Links

Diagnostics persist in Supabase so salespeople get real shareable links and prospects can actually complete them.

## Context

Phase 4 (AI integration) is complete. The onboarding flow works end-to-end but everything is ephemeral — diagnostics are lost on refresh and `/d/[id]` uses mock data. This feature makes Dreep usable in production.

## What Works

- Diagnostics saved to Supabase on onboarding completion
- Real shareable links (`/d/{uuid}`) with actual data from DB
- Prospect page fetches real questions/formulas, computes breakdowns
- Prospect responses saved to DB when they see their result
- 404 for invalid diagnostic IDs

## Completed Tasks

| Task | Title | Status | Date |
|---|---|---|---|
| DONE-001 | Supabase Setup + Full Integration | ✅ Done | 2026-02-06 |
