# ARCHITECTURE.md
### SwiftQualiFi — System Architecture Overview

---

## 1. Product Summary

SwiftQualiFi (`mortgage-ai-genius.vercel.app`) is an AI-powered mortgage pre-qualification and advisory platform. It takes a first-time homebuyer from zero knowledge to a broker-reviewed, AI-scored application — all in one session — while giving mortgage brokers an admin pipeline dashboard with AI-generated applicant summaries and priority scoring.

---

## 2. Stack Overview

| Layer | Technology |
|---|---|
| Frontend | React / Vite |
| Backend / API | Vite API Routes (serverless functions) |
| AI Layer | Gemini API (structured prompts, JSON outputs) |
| Database | Supabase (user sessions, application records) |
| Auth | Email-based authentication |
| Deployment | Vercel (`mortgage-ai-genius.vercel.app`) |
| External APIs | Gemini API |

---

## 3. Architecture Diagram

```
[User Browser]
      |
[Vite Frontend — Vercel]
      |          |           |            |
 [Home Page] [Calculator] [Pre-Qual Form] [Dashboard]
                                 |
                     [Next.js API Routes]
                      /               \
           [Gemini API]            [Supabase DB]
        (AI Insights,           (User Records,
         Chatbot, Scoring)       Applications,
                                 Admin Pipeline)
                      |
               [Admin Dashboard]
           (Pipeline, AI Insights,
            Status Management)
```

---

## 4. Pages & Modules

### 4.1 Public Pages (Unauthenticated)

- **Home** — Hero, CTA, feature overview
- **Calculator** — Inputs: property price, down payment, interest rate, income, debt, loan term. Outputs: loan amount, monthly payment, LTV, DTI + AI Insight
- **How It Works** — Explainer page
- **FAQ** — Frequently asked questions
- **AI Chatbot** — Floating widget, site-wide, mortgage Q&A (no login required)

### 4.2 Authenticated User Pages

- **Pre-Qualification Form** — Step-by-step guided questionnaire: state, intent, property value, income, credit score, monthly debt
- **User Dashboard** — Tracks submitted applications and current stage (Prequalification Completed, In Progress, Pending)

### 4.3 Admin Panel

- **Admin Dashboard** — Total Applications, Pipeline Value, Active Users
- **Application Pipeline Table** — User ID, email, state, intent, current stage, status, suggested deadline, progress %
- **AI Insights Panel** — Per-applicant AI-generated broker summaries with priority recommendation

---

## 5. Data Flow — Pre-Qualification

```
1. User completes Pre-Qualification form
   (income, credit score, debt, property value, state, intent)

2. Form data POST → Next.js API Route

3. API pre-computes DTI server-side

4. Structured prompt constructed → Gemini API called

5. Gemini returns JSON:
   {
     eligibility_score,
     risk_level,
     current_stage,
     recommended_action,
     summary
   }

6. Result stored in Supabase against user ID

7. User Dashboard updated with stage and result

8. Admin Pipeline updated — new application appears

9. Admin AI Insights panel renders per-user GPT summary
   for broker review and priority triage
```

---

## 6. AI Engineering Implementation

| Requirement | Status | Where Used |
|---|---|---|
| Structured prompt engineering | ✅ Done | All prompts |
| Context engineering | ✅ Done | Pre-qual, Admin, Chatbot |
| Structured JSON outputs | ✅ Done | Pre-qual scoring |
| Tool usage (calculator) | ✅ Done | Calculator → AI Insight |
| Guardrails / hallucination reduction | ✅ Done | Prompts 1 & 4 |
| RAG | ❌ Not yet | Planned |
| Evaluation method | ❌ Not yet | Planned |
| Token optimization | ⚠️ Partial | — |
| Observability & logging | ❌ Not yet | Planned |

---

## 7. Security Controls

- API keys stored as Vercel environment variables — never exposed client-side
- `.env` files gitignored — no secrets in repository
- Auth-gated routes for `/dashboard` and `/admin`
- Role-based access: users see only their own data; admin role required for pipeline
- HTTPS enforced via Vercel (TLS 1.2+)
- Input validation on calculator and pre-qualification forms
- Rate limiting: Vercel Edge middleware (recommended, not yet implemented)
- Supabase automated daily backups with point-in-time recovery

---

## 8. Deployment

- **Platform:** Vercel
- **URL:** https://mortgage-ai-genius.vercel.app
- **CI/CD:** GitHub push triggers auto-deploy
- **Environment:** Production
