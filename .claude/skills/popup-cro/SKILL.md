---
name: popup-cro
description: >
  Audits and designs popups, modals, slide-ins, exit-intent overlays, and announcement
  banners. Returns a ranked list of changes (trigger, targeting, offer, copy, frequency),
  each with the metric it should move, expected direction, confidence, and the A/B test
  to prove it, plus a popup spec when designing a new one.
when_to_use: >
  Use when the user mentions "popup", "exit intent", "modal", "lead capture popup",
  "email popup", "announcement banner", "overlay", "slide-in", "scroll trigger",
  "sticky bar", or "collect emails with a popup". Not for the page around the popup
  (use /page-cro), signup forms (use /signup-flow-cro), or in-app upgrade modals (use
  /paywall-upgrade-cro).
argument-hint: "[popup URL, screenshot, or goal]"
allowed-tools: Read, Grep, Glob, WebFetch
metadata:
  version: 2.0.0
---

# Popup CRO

**Role:** Popup and modal conversion specialist; the one job is popups that convert without annoying users or damaging the brand.
**Outcome:** Acquisition & activation — popup submission rate (impressions to submissions), with bounce and close rate as guardrails. **Leaves behind:** a ranked change list in chat, with the top test ready for `/ab-test-setup`.
**Output:** chat; ranked changes in the shape below, plus a popup spec when designing a new one.

Read `product/context.md` first (customer, stage, North Star, baselines, tools). Ask only for what it does not cover.

## Initial Assessment

Before providing recommendations, understand:

1. **Popup Purpose**
   - Email/newsletter capture
   - Lead magnet delivery
   - Discount/promotion
   - Announcement
   - Exit intent save
   - Feature promotion
   - Feedback/survey

2. **Current State**
   - Existing popup performance?
   - What triggers are used?
   - User complaints or feedback?
   - Mobile experience?

3. **Traffic Context**
   - Traffic sources (paid, organic, direct)
   - New vs. returning visitors
   - Page types where shown

---

## Core Principles

### 1. Timing Is Everything
- Too early = annoying interruption
- Too late = missed opportunity
- Right time = helpful offer at moment of need

### 2. Value Must Be Obvious
- Clear, immediate benefit
- Relevant to page context
- Worth the interruption

### 3. Respect the User
- Easy to dismiss
- Don't trap or trick
- Remember preferences
- Don't ruin the experience

---

## Trigger Strategies

### Time-Based
- **Not recommended**: "Show after 5 seconds"
- **Better**: "Show after 30-60 seconds" (proven engagement)
- Best for: General site visitors

### Scroll-Based
- **Typical**: 25-50% scroll depth
- Indicates: Content engagement
- Best for: Blog posts, long-form content
- Example: "You're halfway through—get more like this"

### Exit Intent
- Detects cursor moving to close/leave
- Last chance to capture value
- Best for: E-commerce, lead gen
- Mobile alternative: Back button or scroll up

### Click-Triggered
- User initiates (clicks button/link)
- Zero annoyance factor
- Best for: Lead magnets, gated content, demos
- Example: "Download PDF" → Popup form

### Page Count / Session-Based
- After visiting X pages
- Indicates research/comparison behavior
- Best for: Multi-page journeys
- Example: "Been comparing? Here's a summary..."

### Behavior-Based
- Add to cart abandonment
- Pricing page visitors
- Repeat page visits
- Best for: High-intent segments

---

## Frequency and Rules

### Frequency Capping
- Show maximum once per session
- Remember dismissals (cookie/localStorage)
- 7-30 days before showing again
- Respect user choice

### Audience Targeting
- New vs. returning visitors (different needs)
- By traffic source (match ad message)
- By page type (context-relevant)
- Exclude converted users
- Exclude recently dismissed

### Page Rules
- Exclude checkout/conversion flows
- Consider blog vs. product pages
- Match offer to page context

---

## Measurement

### Key Metrics
- **Impression rate**: Visitors who see popup
- **Conversion rate**: Impressions → Submissions
- **Close rate**: How many dismiss immediately
- **Engagement rate**: Interaction before close
- **Time to close**: How long before dismissing

### What to Track
- Popup views
- Form focus
- Submission attempts
- Successful submissions
- Close button clicks
- Outside clicks
- Escape key

Benchmarks (email popup 2-5%, exit intent 3-10%, click-triggered 10%+) are in `references/popup-types-and-design.md`.

---

## Output Shape

Deliver in chat, in this order:

1. **Diagnosis** (2-4 lines): the popup, its conversion event, the baseline if known, and the single biggest leak.
2. **Ranked changes**, highest expected impact times confidence first, at most 7. Each one:

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

3. **Popup spec** (when designing a new popup): type, trigger, targeting, frequency, copy (headline, subhead, CTA, decline), design notes including mobile. If recommending several popups, list each with purpose, trigger, and audience, plus the conflict rules that stop them overlapping.
4. **Next step:** the one change to test first, ready to paste into `/ab-test-setup`.

---

## Task-Specific Questions

1. What's the primary goal for this popup?
2. What's your current popup performance (if any)?
3. What traffic sources are you optimizing for?
4. What incentive can you offer?
5. Are there compliance requirements (GDPR, etc.)?
6. Mobile vs. desktop traffic split?

---

## References (load on demand)

- `references/popup-types-and-design.md` — best practices per popup type (email capture, lead magnet, discount, exit intent, banner, slide-in), visual hierarchy, sizing, close button, mobile, copy formulas, decline options, GDPR and accessibility rules, intrusive-interstitial guidance, benchmarks. Read when designing or critiquing a specific popup.
- `references/experiments.md` — common popup mixes by business type (e-commerce, B2B SaaS, content, lead gen) and the full experiment catalog (placement, triggers, messaging, personalization, frequency). Read when building a test backlog or choosing a multi-popup strategy.

## Related Skills

- `/page-cro`: for the page context around the popup
- `/copywriting`: for full headline and offer copy
- `/email-sequence`: for what happens after popup conversion
- `/marketing-psychology`: for urgency and reciprocity principles behind offers
- `/ab-test-setup`: to turn the top change into a test plan

---

## TERMINATION

Stop when the ranked change list is delivered, each change with its metric, expected
direction, confidence, and test (or explicit "ship, no test"). Recommend; do not
implement. One surface per invocation: if the issue is really the page, a signup form,
or the post-conversion email, name it and route to the related skill rather than
expanding scope.
