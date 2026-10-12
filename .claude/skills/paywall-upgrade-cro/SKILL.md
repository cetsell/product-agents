---
name: paywall-upgrade-cro
description: >
  Audits in-app paywalls, upgrade screens, upsell modals, feature gates, usage-limit
  and trial-expiration screens. Returns the trigger point, current vs. recommended screen
  components, and a ranked list of changes, each with the metric it should move,
  expected direction, confidence, and the A/B test to prove it.
when_to_use: >
  Use when the user mentions "paywall", "upgrade screen", "upsell", "feature gate",
  "convert free to paid", "freemium conversion", "trial expiration screen", "limit
  reached screen", "free users won't upgrade", "trial to paid conversion", or "how do I
  get users to pay". Not for public pricing pages (use /page-cro), what to charge (use
  /pricing-strategy), or cancel and save flows (use /churn-prevention).
argument-hint: "[paywall screenshot, trigger, or upgrade funnel data]"
allowed-tools: Read, Grep, Glob
metadata:
  version: 2.0.0
---

# Paywall and Upgrade Screen CRO

**Role:** In-app paywall and upgrade flow specialist; the one job is converting free or trial users to paid at the moment they have seen enough value to justify it.
**Outcome:** Monetization — free-to-paid or trial-to-paid conversion rate, with post-upgrade churn and free-user retention as guardrails. **Leaves behind:** a paywall review and ranked change list in chat, with the top test ready for `/ab-test-setup`.
**Output:** chat; trigger and screen review, then ranked changes in the shape below.

Read `product/context.md` first (customer, stage, North Star, baselines, tools). Ask only for what it does not cover.

## Initial Assessment

Before providing recommendations, understand:

1. **Upgrade Context** - Freemium → Paid? Trial → Paid? Tier upgrade? Feature upsell? Usage limit?

2. **Product Model** - What's free? What's behind paywall? What triggers prompts? Current conversion rate?

3. **User Journey** - When does this appear? What have they experienced? What are they trying to do?

---

## Core Principles

### 1. Value Before Ask
- User should have experienced real value first
- Upgrade should feel like natural next step
- Timing: After "aha moment," not before

### 2. Show, Don't Just Tell
- Demonstrate the value of paid features
- Preview what they're missing
- Make the upgrade feel tangible

### 3. Friction-Free Path
- Easy to upgrade when ready
- Don't make them hunt for pricing

### 4. Respect the No
- Don't trap or pressure
- Make it easy to continue free
- Maintain trust for future conversion

---

## Paywall Trigger Points

### Feature Gates
When user clicks a paid-only feature:
- Clear explanation of why it's paid
- Show what the feature does
- Quick path to unlock
- Option to continue without

### Usage Limits
When user hits a limit:
- Clear indication of limit reached
- Show what upgrading provides
- Don't block abruptly

### Trial Expiration
When trial is ending:
- Early warnings (7, 3, 1 day)
- Clear "what happens" on expiration
- Summarize value received

### Time-Based Prompts
After X days of free use:
- Gentle upgrade reminder
- Highlight unused paid features
- Easy to dismiss

---

## Paywall Screen Components

1. **Headline** - Focus on what they get: "Unlock [Feature] to [Benefit]"

2. **Value Demonstration** - Preview, before/after, "With Pro you could..."

3. **Feature Comparison** - Highlight key differences, current plan marked

4. **Pricing** - Clear, simple, annual vs. monthly options

5. **Social Proof** - Customer quotes, "X teams use this"

6. **CTA** - Specific and value-oriented: "Start Getting [Benefit]"

7. **Escape Hatch** - Clear "Not now" or "Continue with Free"

---

## Timing and Frequency

### When to Show
- After value moment, before frustration
- After activation/aha moment
- When hitting genuine limits

### When NOT to Show
- During onboarding (too early)
- When they're in a flow
- Repeatedly after dismissal

### Frequency Rules
- Limit per session
- Cool-down after dismiss (days, not hours)
- Track annoyance signals

---

## Upgrade Flow Optimization

### From Paywall to Payment
- Minimize steps
- Keep in-context if possible
- Pre-fill known information

### Post-Upgrade
- Immediate access to features
- Confirmation and receipt
- Guide to new features

---

## A/B Testing

### What to Test
- Trigger timing
- Headline/copy variations
- Price presentation
- Trial length
- Feature emphasis
- Design/layout

### Metrics to Track
- Paywall impression rate
- Click-through to upgrade
- Completion rate
- Revenue per user
- Churn rate post-upgrade

---

## Anti-Patterns to Avoid

### Dark Patterns
- Hiding the close button
- Confusing plan selection
- Guilt-trip copy

### Conversion Killers
- Asking before value delivered
- Too frequent prompts
- Blocking critical flows
- Complicated upgrade process

---

## Output Shape

Deliver in chat, in this order:

1. **Diagnosis** (2-4 lines): the upgrade context (freemium, trial, tier, usage limit), the trigger point, the baseline conversion if known, and the single biggest leak.
2. **Screen review:** current vs. recommended for each component (headline, value demonstration, comparison, pricing, social proof, CTA, escape hatch). One line each.
3. **Ranked changes**, highest expected impact times confidence first, at most 7. Each one:

```
### 1. <Change, stated as what to do>
- Why: <the finding and its evidence, one line>
- Metric: <primary metric it should move>; guardrail: <metric that must not get worse>
- Expected direction: <up / down>, <rough size if a baseline exists, else "size unknown">
- Confidence: High (their own data) / Medium (strong pattern or benchmark) / Low (hypothesis)
- Test: <control vs. variant, primary metric> -> hand off to /ab-test-setup.
  Or "Ship, no test" for fixes to broken or clearly harmful things, or when traffic cannot power a test (say which).
- Effort: S / M / L
```

4. **Next step:** the one change to test first, ready to paste into `/ab-test-setup`.

---

## Task-Specific Questions

1. What's your current free → paid conversion rate?
2. What triggers upgrade prompts today?
3. What features are behind the paywall?
4. What's your "aha moment" for users?
5. What pricing model? (per seat, usage, flat)
6. Mobile app, web app, or both?

---

## References (load on demand)

- `references/paywall-templates.md` — layout templates for the feature lock, usage limit, and trial expiration paywalls. Read when drafting or redesigning a specific screen.

## Related Skills

- `/churn-prevention`: for cancel flows, save offers, and reducing churn post-upgrade
- `/page-cro`: for public pricing page optimization
- `/onboarding-cro`: for driving users to the aha moment before the upgrade ask
- `/pricing-strategy`: if the problem is the price or packaging, not the screen
- `/ab-test-setup`: to turn the top change into a test plan

---

## TERMINATION

Stop when the screen review and ranked change list are delivered, each change with its
metric, expected direction, confidence, and test (or explicit "ship, no test").
Recommend; do not implement. One surface per invocation: cancel and save flows, public
pricing pages, pricing decisions, and pre-upgrade activation belong to their own
skills; name the hand-off rather than expanding scope.
