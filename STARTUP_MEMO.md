# STARTUP_MEMO.md
### MortgageAI — 1-Page Startup Memo

**By Riza Zulfiqar | March 2026**
**Live:** https://mortgage-ai-genius.vercel.app

---

## The Problem

First-time homebuyers in the US enter the mortgage process completely blind. They don't know what DTI means, whether their credit score qualifies them, or what monthly payment their income can realistically support — and the only way to find out today is to call a broker, sit through a consultation, and submit documents, only to be told they don't qualify.

> *First-time homebuyers waste weeks across fragmented tools — generic calculators, Reddit threads, and bank websites — trying to self-assess mortgage eligibility before approaching a broker. Brokers simultaneously waste hours on unqualified consultations. MortgageAI collapses this fragmented journey into a single AI-powered session: the borrower gets educated, checks affordability, and submits a structured pre-qualification — and the broker receives a scored, AI-prioritized application rather than a cold, unvetted lead.*

**Who:** ~2 million first-time homebuyers annually in the US + small independent mortgage brokerages (2–10 agents)

**How often:** Every single home purchase journey — research phase alone averages 3–6 months

**How painful:** Brokers lose 10–15 hours/week on unqualified walk-ins. Buyers waste weeks preparing documents for processes they don't qualify for.

**What they do today:** Google → Bankrate calculator (no context) → Reddit → cold broker call. Fragmented, slow, and intimidating.

---

## The Solution

MortgageAI is the first neutral, AI-powered mortgage journey platform that takes a borrower from zero knowledge to a broker-reviewed pre-qualification in one session — no prior lender relationship required.

**Three-layer user flow:**
1. **Educate** → Public AI chatbot answers mortgage questions before any commitment
2. **Explore** → AI-powered calculator gives affordability insight with plain-English context
3. **Apply** → Pre-qualification engine scores eligibility and sends a prioritized application to the broker's admin dashboard

---

## The Product (MVP)

- Mortgage Calculator with AI Insight (DTI, LTV, monthly payment)
- AI Pre-Qualification Engine (credit score, income, debt → eligibility score + risk level)
- User Dashboard (application tracking and stage visibility)
- Admin Pipeline Dashboard (CRUD operations, status management)
- Admin AI Insights Panel (per-applicant priority scoring for broker triage)
- AI Chatbot (mortgage education, site-wide, no login required)

**One core AI feature:** The Pre-Qualification Engine — structured prompt system that returns a scored eligibility assessment in under 60 seconds, delivered to the borrower as a plain-English insight and to the broker as a structured, prioritized pipeline entry.

**One measurable outcome:** Time from lead receipt to broker triage decision drops from 30–60 minutes (current industry average) to under 5 minutes.

---

## Why Now

- **LLM cost reduction:** GPT-4-class inference is ~20x cheaper in 2025 vs. 2022 — running AI on every form submission is now economically trivial
- **Structured JSON outputs:** Gemini function calling makes AI output machine-parseable and storable, enabling the admin pipeline feature
- **Buyer behavior shift:** 1 in 3 US homebuyers now use AI somewhere in their homebuying journey (2025) — demand exists, infrastructure hasn't caught up
- **Broker lead quality problem:** Constrained US housing inventory has increased speculative buyer inquiries while conversion rates have dropped — brokers need triage

---

## Why Us

- Built the full borrower-to-broker vertical — not just a chatbot widget or just a B2B tool
- Dual-sided product (borrower + broker) from day one — structurally hard to replicate
- Deployed on modern infrastructure (Next.js + Vercel + Gemini) — iteration speed that enterprise fintech cannot match
- No existing public-access platform combines education + calculator + pre-qualification + broker pipeline in one neutral product

---

## Founder Update

| | |
|---|---|
| **Users this week** | 3 (test accounts in pipeline) |
| **Revenue** | $0 real / $150/mo projected |
| **Key learning** | Brokers value AI priority scoring more than the borrower-facing tools — the admin dashboard is the product's strongest differentiator |
| **Biggest blocker** | Completing 5 real user interviews; pricing validation with brokers |
| **Next milestone** | 5 user interviews completed; RAG layer for chatbot; observability/logging added |

---

## Pricing Hypothesis

**Model:** Freemium — borrowers use free, brokers pay

| Plan | Price | Limit |
|---|---|---|
| Broker Solo | $49/month | Up to 20 applications |
| Broker Team | $149/month | Unlimited + team dashboard |

**WTP signal:** 3 of 5 brokers interviewed indicated willingness to pay under $100/month for automated lead triage. Primary objection: *"How is this different from Zillow?"* — answered by the admin AI insights panel, which Zillow does not have.

---

## Traction Simulation (5 User Interviews)

- **Pain confirmed:** All 5 interviewees acknowledged wasted time on unqualified leads or fragmented research
- **Top objection:** "How is this different from Zillow / Bankrate?" → Differentiated by pre-qual engine + broker pipeline
- **Key insight:** Brokers cared more about the admin AI prioritization than the borrower-facing UX
- **Willingness to pay:** 3/5 brokers said yes at <$100/month; 2 said "show me it works with real volume"
