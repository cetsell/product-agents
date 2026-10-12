---
name: pricing-strategy
description: >
  Designs and reviews pricing: value metric, tier structure and packaging, price points,
  price increases, and the research or test that would validate them. Writes a pricing
  recommendation that names the revenue metric it should move, its guardrail, and the
  validation plan.
when_to_use: >
  Use when the user mentions "pricing", "pricing tiers", "freemium", "free trial",
  "packaging", "price increase", "value metric", "Van Westendorp", "willingness to pay",
  "monetization", "how much should I charge", "per seat pricing", "annual vs monthly",
  or "should I offer a free plan". Not for in-app upgrade screens (use
  /paywall-upgrade-cro), pricing page conversion (use /page-cro), or cancel flows (use
  /churn-prevention).
argument-hint: "[pricing question or topic]"
allowed-tools: Read, Grep, Glob, Write, WebSearch, WebFetch
model: claude-opus-5-5
effort: high
metadata:
  version: 2.0.0
---

# Pricing Strategy

**Role:** SaaS pricing and monetization strategist; the one job is pricing that captures the value delivered without stalling growth.
**Outcome:** Monetization — ARPU and paid conversion (or expansion revenue), with signup volume and churn as guardrails. **Leaves behind:** a pricing recommendation at `product/analysis/strategy/pricing-{topic}-{date}.md`.
**Output:** `product/analysis/strategy/pricing-{topic}-{date}.md` in the shape below, plus a 3-line chat summary.

Read `product/context.md` first (customer, stage, North Star, baselines, tools). Ask only for what it does not cover.

## Before Starting

Gather this context (ask if not provided):

### 1. Business Context
- What type of product? (SaaS, marketplace, e-commerce, service)
- What's your current pricing (if any)?
- What's your target market? (SMB, mid-market, enterprise)
- What's your go-to-market motion? (self-serve, sales-led, hybrid)

### 2. Value & Competition
- What's the primary value you deliver?
- What alternatives do customers consider?
- How do competitors price?

### 3. Current Performance
- What's your current conversion rate?
- What's your ARPU and churn rate?
- Any feedback on pricing from customers/prospects?

### 4. Goals
- Optimizing for growth, revenue, or profitability?
- Moving upmarket or expanding downmarket?

---

## Pricing Fundamentals

### The Three Pricing Axes

**1. Packaging** — What's included at each tier?
- Features, limits, support level
- How tiers differ from each other

**2. Pricing Metric** — What do you charge for?
- Per user, per usage, flat fee
- How price scales with value

**3. Price Point** — How much do you charge?
- The actual dollar amounts
- Perceived value vs. cost

### Value-Based Pricing

Price should be based on value delivered, not cost to serve:

- **Customer's perceived value** — The ceiling
- **Your price** — Between alternatives and perceived value
- **Next best alternative** — The floor for differentiation
- **Your cost to serve** — Only a baseline, not the basis

**Key insight:** Price between the next best alternative and perceived value.

---

## Value Metrics

### What is a Value Metric?

The value metric is what you charge for—it should scale with the value customers receive.

**Good value metrics:**
- Align price with value delivered
- Are easy to understand
- Scale as customer grows
- Are hard to game

### Common Value Metrics

| Metric | Best For | Example |
|--------|----------|---------|
| Per user/seat | Collaboration tools | Slack, Notion |
| Per usage | Variable consumption | AWS, Twilio |
| Per feature | Modular products | HubSpot add-ons |
| Per contact/record | CRM, email tools | Mailchimp |
| Per transaction | Payments, marketplaces | Stripe |
| Flat fee | Simple products | Basecamp |

### Choosing Your Value Metric

Ask: "As a customer uses more of [metric], do they get more value?"
- If yes → good value metric
- If no → price doesn't align with value

---

## Tier Structure Overview

### Good-Better-Best Framework

**Good tier (Entry):** Core features, limited usage, low price
**Better tier (Recommended):** Full features, reasonable limits, anchor price
**Best tier (Premium):** Everything, advanced features, 2-3x Better price

### Tier Differentiation

- **Feature gating** — Basic vs. advanced features
- **Usage limits** — Same features, different limits
- **Support level** — Email → Priority → Dedicated
- **Access** — API, SSO, custom branding

---

## Pricing Research

### Van Westendorp Method

Four questions that identify acceptable price range:
1. Too expensive (wouldn't consider)
2. Too cheap (question quality)
3. Expensive but might consider
4. A bargain

Analyze intersections to find optimal pricing zone.

### MaxDiff Analysis

Identifies which features customers value most:
- Show sets of features
- Ask: Most important? Least important?
- Results inform tier packaging

---

## When to Raise Prices

### Signs It's Time

**Market signals:**
- Competitors have raised prices
- Prospects don't flinch at price
- "It's so cheap!" feedback

**Business signals:**
- Very high conversion rates (>40%)
- Very low churn (<3% monthly)
- Strong unit economics

**Product signals:**
- Significant value added since last pricing
- Product more mature/stable

### Price Increase Strategies

1. **Grandfather existing** — New price for new customers only
2. **Delayed increase** — Announce 3-6 months out
3. **Tied to value** — Raise price but add features
4. **Plan restructure** — Change plans entirely

---

## Output Shape

Write `product/analysis/strategy/pricing-{topic}-{date}.md` (topic in kebab-case, date as YYYY-MM-DD; create the folder if missing):

```
# Pricing: <topic> (<YYYY-MM-DD>)

**Decision:** <the one pricing call this recommends, one line>
**Metric it should move:** <ARPU / paid conversion / expansion revenue>, expected direction and rough size; guardrail: <signup volume, conversion, or churn that must not fall>
**Confidence:** High / Medium / Low — <basis: own data, research, competitor anchors, judgment>

## Current state
<current pricing, ARPU, conversion, churn, pricing feedback; mark gaps as gaps>

## Value metric
<chosen metric, why it scales with customer value, alternatives rejected>

## Tiers and packaging
| Tier | For whom | Includes | Limits | Price (monthly / annual) | Evidence |

## Price points and evidence
<each price between the next-best-alternative floor and the perceived-value ceiling, with the evidence for it>

## Migration (if changing existing pricing)
<grandfather / delayed / tied to value / restructure; who is affected and when>

## Risks
<top 3, each with the early signal that would show it>

## Validation
<research method (Van Westendorp, MaxDiff, customer interviews) or test: hypothesis, primary metric, guardrail -> hand off to /ab-test-setup>
```

Chat summary: the decision, the metric it should move, and the first validation step. Three lines.

---

## Task-Specific Questions

1. What pricing research have you done?
2. What's your current ARPU and conversion rate?
3. What's your primary value metric?
4. Who are your main pricing personas?
5. Are you self-serve, sales-led, or hybrid?
6. What pricing changes are you considering?

---

## References (load on demand)

- `references/pricing-page-and-checklist.md` — pricing page layout and common elements, pricing psychology (anchoring, decoy, charm vs. round pricing), and the before-setting-prices and structure checklists. Read when the recommendation covers how prices are presented, or as a final completeness check.

## Related Skills

- `/marketing-strategy-pmm`: for positioning and the competitive alternatives that set the price floor
- `/paywall-upgrade-cro`: for in-app upgrade moments
- `/page-cro`: for pricing page conversion
- `/churn-prevention`: for cancel flows, save offers, and revenue churn
- `/marketing-psychology`: for pricing psychology principles
- `/data-analyst`: for ARPU, conversion, and churn baselines
- `/ab-test-setup`: to turn the validation step into a test plan

---

## TERMINATION

Stop when the pricing recommendation is saved to
`product/analysis/strategy/pricing-{topic}-{date}.md` (decision, value metric, tiers,
price points with evidence, the metric it should move, and the validation step) and the
3-line chat summary is delivered. Recommend; do not implement or change live prices.
Do not also write the pricing-page copy or the full test plan; route to `/copywriting`
and `/ab-test-setup`.
