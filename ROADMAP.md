# DREEP — Roadmap & Strategy

## Positioning
**Paste your company website → get a personalized ROI calculator in 30 seconds.**

No spreadsheets, no setup, no consulting. Works for any B2B business.

## Distribution (dual engine)

### Engine 1: Product-Led Growth (primary)
Every diagnostic creates a `/d/[id]` page. Every page shows "Powered by Dreep". Every prospect who sees it is a potential new user.

Loop: Salesperson creates diagnostic → sends to prospect → prospect sees result + Dreep branding → prospect becomes user → repeat.

Playbook: Calendly, Typeform, Loom.

### Engine 2: Programmatic SEO + LLM indexing (compounding)
Generate hundreds of interactive cost calculator pages on common business pain topics:
- "Combien coute l'absence de CRM pour une PME"
- "Le vrai cout d'un recrutement sans ATS"
- "Ce que vous perdez sans outil de gestion de projet"
- "Cout cache d'une prospection commerciale non structuree"

Each page is a real interactive calculator (not a blog post). Prospect answers sliders → sees their cost → CTA: "Vous voulez la version personnalisee pour votre entreprise ? Collez votre URL."

These pages rank on Google AND get indexed by LLMs (Perplexity, ChatGPT, Gemini).

## Pricing
| Tier | Price | What you get |
|---|---|---|
| Free | 0€ | Unlimited diagnostics, Dreep branding on every page |
| Pro | 29-49€/month | Remove branding, custom domain, email notifications, analytics |
| Team | 19-29€/user/month (min 5) | Team dashboard, shared templates, manager view |

## Roadmap

### Phase 5 — Database + Shareable Links
**Goal:** Diagnostics persist and prospects can actually use them.
- Supabase setup (tables: diagnostics, responses, users)
- Save diagnostic on onboarding completion → get unique ID
- `/d/[id]` loads real data from DB
- Save prospect answers on completion
- Real shareable link in StepLinkReady

### Phase 6 — Product-Led Loop
**Goal:** Every diagnostic sent is an ad for Dreep.
- "Powered by Dreep — Create yours in 30s" footer on every `/d/[id]` page
- Email notification to salesperson when prospect completes
- "Share with your team" feature for prospects (viral within buying committee)
- Basic analytics: opened / completed / shared / meeting booked

### Phase 7 — Programmatic SEO Engine
**Goal:** Hundreds of interactive calculator pages that rank.
- Admin tool: pick a topic → Claude generates questions + formulas → publish as static page
- Template: interactive sliders + animated result + CTA to personalized version
- Sitemap generation for Google indexing
- Schema markup for rich snippets
- Topics sourced from: common B2B pain points, industry-specific problems, tool categories

### Phase 8 — Polish & Growth
- User accounts + login (Clerk or Supabase Auth)
- Custom branding (logo, colors) for Pro tier
- Dashboard: list diagnostics, response status, conversion metrics
- A/B testing question sets
- Stripe integration for paid tiers

## ICP (Ideal Customer Profile)
Start narrow, expand later:
1. **First niche:** Freelance consultants and small agencies selling B2B services
   - They do their own sales, no tools, no process
   - A free ROI calculator they can send before meetings = instant value
   - Price-sensitive → free tier converts them, Pro tier when they see results
2. **Expand to:** SaaS sales teams, SDRs, AEs
3. **Long-term:** Any B2B company with a sales team

## Competitive Advantage
- No direct competitor does "paste URL → get ROI calculator"
- Enterprise ROI tools (Cuvama, ROI Shop) cost 30-50K€ setup + consulting
- Generic calculator builders (Outgrow, Calconic) require manual configuration
- Dreep is instant, AI-generated, zero-config
- Over time: real usage data improves which questions convert and which formulas feel credible
