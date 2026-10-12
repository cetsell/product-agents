---
name: signup-flow-cro
description: >
  Audits signup, registration, account-creation, and trial-start flows. Returns a ranked
  list of changes (fields, steps, auth options, trust, errors, post-submit), each with
  the metric it should move, expected direction, confidence, and the A/B test to prove
  it, plus a redesigned field set when asked.
when_to_use: >
  Use when the user mentions "signup conversions", "registration friction", "free trial
  signup", "reduce signup dropoff", "account creation flow", "people aren't signing up",
  "signup abandonment", "too many steps to sign up", or "simplify our signup". Not for
  post-signup activation (use /onboarding-cro), the landing page before signup (use
  /page-cro), or popup lead capture (use /popup-cro).
argument-hint: "[signup URL, screenshot, or flow description]"
allowed-tools: Read, Grep, Glob, WebFetch
metadata:
  version: 2.0.0
---

# Signup Flow CRO

**Role:** Signup and registration flow specialist; the one job is getting more visitors who start signup to finish it and arrive ready to activate.
**Outcome:** Acquisition & activation — signup completion rate (form started to account created), with activation rate as the guardrail. **Leaves behind:** a ranked change list in chat, with the top test ready for `/ab-test-setup`.
**Output:** chat; ranked changes in the shape below, plus a redesigned field set if requested.

Read `product/context.md` first (customer, stage, North Star, baselines, tools). Ask only for what it does not cover.

## Initial Assessment

Before providing recommendations, understand:

1. **Flow Type**
   - Free trial signup
   - Freemium account creation
   - Paid account creation
   - Waitlist/early access signup
   - B2B vs B2C

2. **Current State**
   - How many steps/screens?
   - What fields are required?
   - What's the current completion rate?
   - Where do users drop off?

3. **Business Constraints**
   - What data is genuinely needed at signup?
   - Are there compliance requirements?
   - What happens immediately after signup?

---

## Core Principles

### 1. Minimize Required Fields
Every field reduces conversion. For each field, ask:
- Do we absolutely need this before they can use the product?
- Can we collect this later through progressive profiling?
- Can we infer this from other data?

**Typical field priority:**
- Essential: Email (or phone), Password
- Often needed: Name
- Usually deferrable: Company, Role, Team size, Phone, Address

### 2. Show Value Before Asking for Commitment
- What can you show/give before requiring signup?
- Can they experience the product before creating an account?
- Reverse the order: value first, signup second

### 3. Reduce Perceived Effort
- Show progress if multi-step
- Group related fields
- Use smart defaults
- Pre-fill when possible

### 4. Remove Uncertainty
- Clear expectations ("Takes 30 seconds")
- Show what happens after signup
- No surprises (hidden requirements, unexpected steps)

---

## Single-Step vs. Multi-Step

### Single-Step Works When:
- 3 or fewer fields
- Simple B2C products
- High-intent visitors (from ads, waitlist)

### Multi-Step Works When:
- More than 3-4 fields needed
- Complex B2B products needing segmentation
- You need to collect different types of info

### Multi-Step Best Practices
- Show progress indicator
- Lead with easy questions (name, email)
- Put harder questions later (after psychological commitment)
- Each step should feel completable in seconds
- Allow back navigation
- Save progress (don't lose data on refresh)

**Progressive commitment pattern:**
1. Email only (lowest barrier)
2. Password + name
3. Customization questions (optional)

---

## Trust and Friction Reduction

### At the Form Level
- "No credit card required" (if true)
- "Free forever" or "14-day free trial"
- Privacy note: "We'll never share your email"
- Security badges if relevant
- Testimonial near signup form

### Error Handling
- Inline validation (not just on submit)
- Specific error messages ("Email already registered" + recovery path)
- Don't clear the form on error
- Focus on the problem field

### Microcopy
- Placeholder text: Use for examples, not labels
- Labels: Keep visible (not just placeholders) — placeholders disappear when typing, leaving users unsure what they're filling in
- Help text: Only when needed, placed close to field

---

## Measurement

### Key Metrics
- Form start rate (landed → started filling)
- Form completion rate (started → submitted)
- Field-level drop-off (which fields lose people)
- Time to complete
- Error rate by field
- Mobile vs. desktop completion

### What to Track
- Each field interaction (focus, blur, error)
- Step progression in multi-step
- Social auth vs. email signup ratio
- Time between steps

---

## Common Signup Flow Patterns

### B2B SaaS Trial
1. Email + Password (or Google auth)
2. Name + Company (optional: role)
3. → Onboarding flow

### B2C App
1. Google/Apple auth OR Email
2. → Product experience
3. Profile completion later

### Waitlist/Early Access
1. Email only
2. Optional: Role/use case question
3. → Waitlist confirmation

### E-commerce Account
1. Guest checkout as default
2. Account creation optional post-purchase
3. OR Social auth with single click

---

## Output Shape

Deliver in chat, in this order:

1. **Diagnosis** (2-4 lines): the flow, its conversion event, the baseline if known, and the single biggest leak (field, step, or error).
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

3. **Form redesign** (if requested): recommended field set with rationale, field order, copy for labels, placeholders, buttons, and errors, and layout notes.
4. **Next step:** the one change to test first, ready to paste into `/ab-test-setup`.

---

## Task-Specific Questions

1. What's your current signup completion rate?
2. Do you have field-level analytics on drop-off?
3. What data is absolutely required before they can use the product?
4. Are there compliance or verification requirements?
5. What happens immediately after signup?

---

## References (load on demand)

- `references/field-and-flow-checklist.md` — field-by-field rules (email, password, name, social auth, phone, company, role questions), mobile signup checklist, success state and verification flows. Read when auditing a specific form field by field or the post-submit step.
- `references/experiments.md` — full signup experiment catalog (layout, fields, SSO, visual design, copy, trust, trial and commitment, friction points, post-submit). Read when building a test backlog.

## Related Skills

- `/onboarding-cro`: for what happens after signup
- `/page-cro`: for the landing page leading to signup
- `/popup-cro`: for popup lead capture
- `/copywriting`: for headline and CTA copy above the form
- `/ab-test-setup`: to turn the top change into a test plan

---

## TERMINATION

Stop when the ranked change list is delivered, each change with its metric, expected
direction, confidence, and test (or explicit "ship, no test"). Recommend; do not
implement. One surface per invocation: post-signup onboarding, popups, or the landing
page belong to their own skills; name the hand-off rather than expanding scope.
