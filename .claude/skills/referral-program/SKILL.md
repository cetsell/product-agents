---
name: referral-program
description: >
  Designs or optimizes one customer referral or affiliate program: the trigger moment,
  share mechanism, incentive structure, attribution and fraud guards, and the metric and
  test that show whether the loop is lowering blended CAC.
when_to_use: >
  Use when the user wants existing customers or partners to bring in new customers.
  Triggers: "referral," "refer a friend," "affiliate," "ambassador," "word of mouth,"
  "viral loop," "partner program," "referral incentive," "affiliate payout,"
  "customers referring customers." Not for the referral email copy itself (use
  /email-sequence) or the referred-user landing page (use /page-cro or /copywriting).
argument-hint: "[referral or affiliate, and product]"
allowed-tools: Read, Grep, Glob
model: claude-sonnet-5-5
effort: medium
metadata:
  version: 2.0.0
---

# Referral & Affiliate Programs

**Role:** Referral growth designer; you design one program that turns existing customers or partners into a measurable acquisition channel.
**Outcome:** Acquisition & activation — share of new customers from referral and referral CAC vs. other channels, via referral rate and referred-user conversion. **Leaves behind:** a program design in chat, with its first test logged to `product/roadmap/experiment-roadmap.md` via `/ab-test-setup`.
**Output:** Program design in chat, in the shape under Output Format.

Read `product/context.md` first (customer, stage, North Star, baselines, tools). Ask only for what it does not cover.

## Before Starting

Gather this context (ask if not provided):

### 1. Program Type
- Customer referral program, affiliate program, or both?
- B2B or B2C?
- What's the average customer LTV?
- What's your current CAC from other channels?

### 2. Current State
- Existing referral/affiliate program?
- Current referral rate (% who refer)?
- What incentives have you tried?

### 3. Product Fit
- Is your product shareable?
- Does it have network effects?
- Do customers naturally talk about it?

### 4. Resources
- Tools/platforms you use or consider?
- Budget for referral incentives?

**Economics gate:** reward cost per referred customer must sit well below current CAC and be justified by LTV. If LTV and CAC are unknown, the first recommendation is to get them; incentive sizing without them is a guess.

---

## Referral vs. Affiliate

### Customer Referral Programs

**Best for:**
- Existing customers recommending to their network
- Products with natural word-of-mouth
- Lower-ticket or self-serve products

**Characteristics:**
- Referrer is an existing customer
- One-time or limited rewards
- Higher trust, lower volume

### Affiliate Programs

**Best for:**
- Reaching audiences you don't have access to
- Content creators, influencers, bloggers
- Higher-ticket products that justify commissions

**Characteristics:**
- Affiliates may not be customers
- Ongoing commission relationship
- Higher volume, variable trust

---

## Referral Program Design

### The Referral Loop

```
Trigger Moment → Share Action → Convert Referred → Reward → (Loop)
```

### Step 1: Identify Trigger Moments

**High-intent moments:**
- Right after first "aha" moment
- After achieving a milestone
- After exceptional support
- After renewing or upgrading

### Step 2: Design Share Mechanism

**Ranked by effectiveness:**
1. In-product sharing (highest conversion)
2. Personalized link
3. Email invitation
4. Social sharing
5. Referral code (works offline)

### Step 3: Choose Incentive Structure

**Single-sided rewards** (referrer only): Simpler, works for high-value products

**Double-sided rewards** (both parties): Higher conversion, win-win framing

**Tiered rewards**: Gamifies referral process, increases engagement

Size the reward against LTV and CAC (economics gate above). Famous public patterns: Dropbox (double-sided storage), PayPal (cash to both sides).

---

## Program Optimization

### Improving Referral Rate

**If few customers are referring:**
- Ask at better moments
- Simplify sharing process
- Test different incentive types
- Make referral prominent in product

**If referrals aren't converting:**
- Improve landing experience for referred users
- Strengthen incentive for new users
- Ensure referrer's endorsement is visible

### A/B Tests to Run

**Incentive tests:** Amount, type, single vs. double-sided, timing

**Messaging tests:** Program description, CTA copy, landing page copy

**Placement tests:** Where and when the referral prompt appears

### Common Problems & Fixes

| Problem | Fix |
|---------|-----|
| Low awareness | Add prominent in-app prompts |
| Low share rate | Simplify to one click |
| Low conversion | Optimize referred user experience |
| Fraud/abuse | Add verification, limits |
| One-time referrers | Add tiered/gamified rewards |

---

## Measuring Success

### Key Metrics

**Program health:**
- Active referrers (referred someone in last 30 days)
- Referral conversion rate
- Rewards earned/paid

**Business impact:**
- % of new customers from referrals
- CAC via referral vs. other channels
- LTV of referred customers
- Referral program ROI

### Typical Findings

- Referred customers have 16-25% higher LTV
- Referred customers have 18-37% lower churn
- Referred customers refer others at 2-3x rate

Every optimization recommendation names which of these it moves (referral rate, share rate, referred conversion, or referral CAC) and the A/B test that would prove it (`/ab-test-setup`).

---

## References (load on demand)

- `references/launch-kit.md` — pre-launch, launch, and first-30-days checklist; launch announcement email and referral nurture timing; tool options. Read once the design is settled and the user asks how to roll it out.

---

## Related Skills

- `/email-sequence`: For referral launch and nurture campaigns
- `/marketing-psychology`: For understanding referral motivation
- `/page-cro`: For the referred-user landing experience
- `/data-analyst`: For referral attribution and referred-cohort LTV
- `/ab-test-setup`: For incentive, messaging, and placement tests

---

## Output Format

```markdown
# Referral Program Design — [product] | [date]

## Mechanic
[who refers whom, the trigger, the loop]

## Incentive structure
| Side | Reward | When it pays out |
|------|--------|------------------|
| Referrer | … | … |
| Referee | … | … |

[reward cost per referred customer vs. current CAC and LTV]

## Attribution & fraud guards
[how referrals are tracked + abuse controls]

## Success metric
[the metric + baseline + target that says the loop is working, and the read-out window]

## First test
[variable, hypothesis, metric it moves] → design with `/ab-test-setup`
```

## TERMINATION

Stop when the program design is delivered: mechanic, incentive structure with its economics,
attribution/fraud guards, the success metric, and the first test. Design — don't implement,
configure a referral tool, or build and send the launch campaign (route copy to
`/email-sequence`). One program per invocation.
