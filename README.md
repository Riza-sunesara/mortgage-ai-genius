# 🏠 Mortgage Pre-Qualification Platform

## Introduction

This project is a **mortgage pre-qualification web application** that allows users to quickly estimate their mortgage eligibility and connect with loan options. It includes:

* **User-facing pre-qualification bot** powered by AI to guide users step-by-step.
* **Admin dashboard** to track leads, conversions, and mortgage-related analytics.

### Problem It Solves

* **Simplifies mortgage pre-qualification** for prospective homebuyers.
* **Reduces administrative overhead** by automating initial data collection.
* **Provides actionable insights** for admins to prioritize high-intent leads.

## How the Project Works

1. **User Flow**

   * Users answer questions about credit score, income, debt, property value, and loan goals.
   * The AI bot calculates an estimated pre-qualification and gives guidance.

2. **Admin Dashboard**

   * Displays lead analytics, funded amounts, conversion rates, and other KPIs.
   * Integrates with Supabase to store user and loan data.

3. **AI Integration**

   * AI bot uses prompts to interpret user inputs and provide relevant mortgage guidance.

## Architecture Diagram

```
[User] → [AI Bot (Front-end)] → [Supabase DB] → [Admin Dashboard] → [Analytics & Insights]
```

## Guardrails & Jailbreak Testing

* AI bot is constrained to **informational guidance only** (not a licensed loan officer).
* Tested prompts to ensure:

  * No personal financial advice beyond estimates.
  * Prevented malicious or trick queries from causing undesired behavior.
* Testing involved:

  * Trying edge-case prompts.
  * Verifying that AI always responds with **general guidance, never personal instructions**.

## Threat Model

* **Data exposure:** User financial data stored in Supabase, secured via authentication.
* **Prompt injection / misuse:** Guardrails prevent AI from executing or suggesting unsafe actions.
* **Deployment security:** HTTPS enforced, environment variables (API keys, DB credentials) are stored securely in Vercel.

## Setup & Deployment Guide

### Local Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

2. Install dependencies:

```bash
npm install
```

3. Add `.env` file with the required keys:

```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_key
```

4. Start development:

```bash
npm run dev:all
```

5. Open `http://localhost:5173` in your browser.

### Deployment

* Connect repository to **Vercel**.
* Ensure environment variables are configured in Vercel dashboard.
* Run the build command:

```bash
npm run build
```

* Vercel automatically deploys after pushing to the main branch.

## AI Prompts Used (Prompt History Record)

* Keep a separate file like `prompts.md` or `prompts.txt` to document all production prompts.
* Include system instructions, user input, and AI responses.
* Example entry:

```
# Prompt 1
System instruction: You are a U.S. mortgage assistant providing general rate ranges.
User input: "I have a 720 credit score, $80k income, $300k property. What am I pre-qualified for?"
Response: AI returns estimated pre-qualification range.
```

* Do not include test prompts unless they were used in production.
* Maintaining prompt history ensures transparency and auditability.

## Notes

* Ensure all JSON and config files are valid before deployment.
* Update architecture diagram if backend or AI integrations change.
* Maintain prompt history for future AI updates or audits.
