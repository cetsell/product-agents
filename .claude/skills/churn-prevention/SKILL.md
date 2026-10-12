---
name: churn-prevention
description: >
  Diagnoses where a subscription product is losing customers (voluntary vs. involuntary,
  by cohort and cancel reason) and produces a prioritized churn plan for one surface:
  cancel flow, save offers, proactive retention, dunning, or win-back, each recommendation
  tied to the churn metric it should move and the test that proves it.
when_to_use: >
  Use when churn is too high or the user wants a cancel flow, save offer, exit survey,
  pause option, dunning or failed-payment recovery, churn health score, or retention plan.
  Triggers: "churn," "cancel flow," "save offer," "dunning," "involuntary churn,"
  "customers are leaving," "how do I keep users." Not for win-back email copy (use
  /email-sequence), in-app upgrade paywalls (use /paywall-upgrade-cro), or activation
  of new users (use /onboarding-cro).
argument-hint: "[surface: cancel flow | save offer | proactive retention | dunning | win-back]"
allowed-tools: Read, Grep, Glob
model: claude-sonnet-5-5
effort: medium
metadata:
  version: 2.0.0
---

# Churn Prevention

**Role:** Retention strategist; you find where churn comes from and prescribe the highest-leverage fix for one surface.
**Outcome:** Retention — monthly logo and revenue churn, via cancel-flow save rate, dunning recovery rate, or at-risk save rate. **Leaves behind:** a prioritized churn plan in chat, with its tests logged to `product/roadmap/experiment-roadmap.md` via `/ab-test-setup`.
**Output:** Churn plan in chat, in the shape under Output Format.

Read `product/context.md` first (customer, stage, North Star, baselines, tools). Ask only for what it does not cover.

## Before Starting

Gather this context (ask if not provided):

### 1. Current Churn Situation
- What's your monthly churn rate? (Voluntary vs. involuntary if known)
- How many active subscribers?
- What's the average MRR per customer?
- Do you have a cancel flow today, or does cancel happen instantly?

### 2. Billing & Platform
- What billing provider? (Stripe, Chargebee, Paddle, Recurly, Braintree)
- Monthly, annual, or both billing intervals?
- Do you support plan pausing or downgrades?
- Any existing retention tooling? (Churnkey, ProsperStack, Raaft)

### 3. Product & Usage Data
- Do you track feature usage per user?
- Can you identify engagement drop-offs?
- Do you have cancellation reason data from past churns?
- What's your activation metric? (What do retained users do that churned users don't?)

### 4. Constraints
- B2B or B2C? (Affects flow design)
- Self-serve cancellation required? (Some regulations mandate easy cancel)
- Brand tone for offboarding? (Empathetic, direct, playful)

---

## How This Skill Works

Churn has two types requiring different strategies:

| Type | Cause | Solution |
|------|-------|----------|
| **Voluntary** | Customer chooses to cancel | Cancel flows, save offers, exit surveys |
| **Involuntary** | Payment fails | Dunning emails, smart retries, card updaters |

Voluntary churn is typically 50-70% of total churn. Involuntary churn is 30-50% but is often easier to fix.

This skill supports these modes (one per invocation):

1. **Build a cancel flow** — Design from scratch with survey, save offers, and confirmation
2. **Optimize an existing flow** — Analyze cancel data and improve save rates
3. **Set up dunning** — Failed payment recovery with retries and email sequences
4. **Proactive retention** — Health score and interventions for at-risk accounts
5. **Win-back** — Post-cancel path and reactivation plan

**Diagnose before prescribing.** Split churn into voluntary vs. involuntary first, then cut it by cohort (below) and cancel reason. Recommend for the surface the data points to, even if the user asked about a different one; say so in the Diagnosis.

---

## Diagnosis: Churn Prediction & Proactive Retention

The best save happens before the customer ever clicks "Cancel."

### Risk Signals

Track these leading indicators of churn:

| Signal | Risk Level | Timeframe |
|--------|-----------|-----------|
| Login frequency drops 50%+ | High | 2-4 weeks before cancel |
| Key feature usage stops | High | 1-3 weeks before cancel |
| Support tickets spike then stop | High | 1-2 weeks before cancel |
| Email open rates decline | Medium | 2-6 weeks before cancel |
| Billing page visits increase | High | Days before cancel |
| Team seats removed | High | 1-2 weeks before cancel |
| Data export initiated | Critical | Days before cancel |
| NPS score drops below 6 | Medium | 1-3 months before cancel |

### Health Score Model

Build a simple health score (0-100) from weighted signals:

```
Health Score = (
  Login frequency score × 0.30 +
  Feature usage score   × 0.25 +
  Support sentiment     × 0.15 +
  Billing health        × 0.15 +
  Engagement score      × 0.15
)
```

| Score | Status | Action |
|-------|--------|--------|
| 80-100 | Healthy | Upsell opportunities |
| 60-79 | Needs attention | Proactive check-in |
| 40-59 | At risk | Intervention campaign |
| 0-39 | Critical | Personal outreach |

### Proactive Interventions

**Before they think about cancelling:**

| Trigger | Intervention |
|---------|-------------|
| Usage drop >50% for 2 weeks | "We noticed you haven't used [feature]. Need help?" email |
| Approaching plan limit | Upgrade nudge (not a wall — `/paywall-upgrade-cro` handles this) |
| No login for 14 days | Re-engagement email with recent product updates |
| NPS detractor (0-6) | Personal follow-up within 24 hours |
| Support ticket unresolved >48h | Escalation + proactive status update |
| Annual renewal in 30 days | Value recap email + renewal confirmation |

---

## Decision Rules

### Voluntary churn: match the offer to the reason

The key insight: **match the offer to the reason.** A discount won't save someone who isn't using the product. A feature roadmap won't save someone who can't afford it.

**Offer-to-reason mapping:**

| Cancel Reason | Primary Offer | Fallback Offer |
|---------------|---------------|----------------|
| Too expensive | Discount (20-30% for 2-3 months) | Downgrade to lower plan |
| Not using it enough | Pause (1-3 months) | Free onboarding session |
| Missing feature | Roadmap preview + timeline | Workaround guide |
| Switching to competitor | Competitive comparison + discount | Feedback session |
| Technical issues | Escalate to support immediately | Credit + priority fix |
| Temporary / seasonal | Pause subscription | Downgrade temporarily |
| Business closed | Skip offer (respect the situation) | — |

Guardrails: keep "continue cancelling" visible (no dark patterns), one primary offer plus one fallback, discounts no deeper than 20-30%, pauses no longer than 3 months. Exit survey design, offer types, and UI patterns are in `references/cancel-flow.md`.

### Involuntary churn: retry by decline type

| Decline Type | Examples | Retry Strategy |
|-------------|----------|----------------|
| Soft decline (temporary) | Insufficient funds, processor timeout | Retry 3-5 times over 7-10 days |
| Hard decline (permanent) | Card stolen, account closed | Don't retry — ask for new card |
| Authentication required | 3D Secure, SCA | Send customer to update payment |

Failed payments cause 30-50% of all churn but are the most recoverable, so fix dunning first when involuntary churn is material. Pre-dunning, retry timing, the dunning email sequence, and recovery benchmarks are in `references/dunning-playbook.md`.

### After cancel: win-back

Set expectations, keep data and an easy reactivation path, and trigger a win-back sequence. Personalize by cancel reason; people return when their reason was addressed. Draft the emails with `/email-sequence`.

---

## Metrics & Measurement

### Key Churn Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| Monthly churn rate | Churned customers / Start-of-month customers | <5% B2C, <2% B2B |
| Revenue churn (net) | (Lost MRR - Expansion MRR) / Start MRR | Negative (net expansion) |
| Cancel flow save rate | Saved / Total cancel sessions | 25-35% |
| Offer acceptance rate | Accepted offers / Shown offers | 15-25% |
| Pause reactivation rate | Reactivated / Total paused | 60-80% |
| Dunning recovery rate | Recovered / Total failed payments | 50-60% |
| Time to cancel | Days from first churn signal to cancel | Track trend |

### Cohort Analysis

Segment churn by:
- **Acquisition channel** — Which channels bring stickier customers?
- **Plan type** — Which plans churn most?
- **Tenure** — When do most cancellations happen? (30, 60, 90 days?)
- **Cancel reason** — Which reasons are growing?
- **Save offer type** — Which offers work best for which segments?

### Cancel Flow A/B Tests

Test one variable at a time:

| Test | Hypothesis | Metric |
|------|-----------|--------|
| Discount % (20% vs 30%) | Higher discount saves more | Save rate, LTV impact |
| Pause duration (1 vs 3 months) | Longer pause increases return rate | Reactivation rate |
| Survey placement (before vs after offer) | Survey-first personalizes offers | Save rate |
| Offer presentation (modal vs full page) | Full page gets more attention | Save rate |
| Copy tone (empathetic vs direct) | Empathetic reduces friction | Save rate |

Design every cancel flow, offer, or dunning test with `/ab-test-setup` and log it in `product/roadmap/experiment-roadmap.md`.

---

## Common Mistakes

- **No cancel flow at all** — Instant cancel leaves money on the table. Even a simple survey + one offer saves 10-15%
- **Making cancellation hard to find** — Hidden cancel buttons breed resentment and bad reviews. Many jurisdictions require easy cancellation (FTC Click-to-Cancel rule)
- **Same offer for every reason** — A blanket discount doesn't address "missing feature" or "not using it"
- **Discounts too deep** — 50%+ discounts train customers to cancel-and-return for deals
- **Ignoring involuntary churn** — Often 30-50% of total churn and the easiest to fix
- **No dunning emails** — Letting payment failures silently cancel accounts
- **Guilt-trip copy** — "Are you sure you want to abandon us?" damages brand trust
- **Not tracking save offer LTV** — A "saved" customer who churns 30 days later wasn't really saved
- **Pausing too long** — Pauses beyond 3 months rarely reactivate. Set limits.
- **No post-cancel path** — Make reactivation easy and trigger win-back emails, because some churned users will want to come back

---

## References (load on demand)

- `references/cancel-flow.md` — cancel flow structure, exit survey design and reason categories, save offer types, UI wireframe and principles. Read when the surface is a cancel flow or save offer.
- `references/dunning-playbook.md` — dunning stack, pre-dunning, retry timing, dunning email sequence, recovery benchmarks. Read when the surface is failed payments.
- `references/tools-and-platforms.md` — retention platforms, billing provider dunning support, CLI tools, cancel-flow experiment setup. Read when the user asks how to implement.

---

## Related Skills

- `/email-sequence`: For win-back and dunning email copy
- `/paywall-upgrade-cro`: For in-app upgrade moments and trial expiration
- `/pricing-strategy`: For plan structure and annual discount strategy
- `/onboarding-cro`: For activation to prevent early churn
- `/data-analyst`: For churn cohort cuts and setting up churn signal queries
- `/ab-test-setup`: For testing cancel flow variations with statistical rigor

---

## Output Format

```markdown
# Churn Plan — [surface: cancel flow / save offer / proactive retention / dunning / win-back] | [date]

## Diagnosis
[voluntary vs. involuntary split, where churn is concentrated (cohort, reason, tenure), and the signal/data behind it]

## Recommendations (prioritized)
| # | Lever | Metric it moves (baseline → target) | Test that proves it | Effort |
|---|-------|-------------------------------------|---------------------|--------|

## What to measure
[the primary churn metric, the read-out window, and the guardrail (e.g. saved-customer 90-day retention)]
```

## TERMINATION

Stop when the recommendations are delivered as a prioritized list, each with the metric it
moves and the test that proves it, plus the measurement that confirms the plan worked.
Recommend — don't implement, configure billing, or send anything. One surface per invocation
(cancel flow / save offer / proactive retention / dunning / win-back); route adjacent surfaces
to their own skills rather than expanding scope.
