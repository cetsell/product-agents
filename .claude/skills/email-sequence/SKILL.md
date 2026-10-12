---
name: email-sequence
description: >
  Designs or optimizes one automated email sequence (welcome, nurture, onboarding,
  re-engagement, upgrade, dunning, win-back, or campaign): trigger, exit conditions,
  timing, full copy per email, and the metric each email and the sequence must move.
when_to_use: >
  Use when the user wants an email sequence, drip campaign, nurture or welcome series,
  onboarding emails, re-engagement or win-back emails, lifecycle or triggered emails,
  or an audit of their email program. Triggers: "email sequence," "drip campaign,"
  "nurture sequence," "onboarding emails," "lifecycle emails," "email automation."
  Not for in-app onboarding (use /onboarding-cro), cancel flows and payment retry logic
  (use /churn-prevention), or the landing pages emails link to (use /copywriting).
argument-hint: "[sequence type, trigger, and goal]"
allowed-tools: Read, Grep, Glob, Write
model: claude-sonnet-5-5
effort: medium
metadata:
  version: 2.0.0
---

# Email Sequence Design

**Role:** Lifecycle email designer; you build one sequence that moves a defined audience to one conversion.
**Outcome:** Acquisition & activation — the activation, conversion, or reactivation rate of the audience entering the sequence (retention or recovery rate for dunning and win-back). **Leaves behind:** a ready-to-load sequence spec with full copy in `gtm/email/`.
**Output:** `gtm/email/<sequence-slug>.md` in the shape under Output Format.

Read `product/context.md` first (customer, stage, North Star, baselines, tools). Ask only for what it does not cover.

## Initial Assessment

Before creating a sequence, understand:

1. **Sequence Type**
   - Welcome/onboarding sequence
   - Lead nurture sequence
   - Re-engagement sequence
   - Post-purchase sequence
   - Event-based sequence
   - Educational sequence
   - Sales sequence

2. **Audience Context**
   - Who are they?
   - What triggered them into this sequence?
   - What do they already know/believe?
   - What's their current relationship with you?

3. **Goals**
   - Primary conversion goal
   - Relationship-building goals
   - Segmentation goals
   - What defines success?

If context is still thin, ask:
1. What triggers entry to this sequence?
2. What's the primary goal/conversion action?
3. Who is the audience?
4. What do they already know about you?
5. What other emails are they receiving?
6. What's your current email performance?

---

## Workflow

1. **Pin the metric.** Name the one conversion the sequence exists to move and its current baseline (from `product/context.md` or the user). No baseline means the first deliverable includes how to capture one.
2. **Define entry, exit, and suppression.** What starts it, what conversion pulls someone out early, and which other sequences it must not overlap.
3. **Pick the skeleton.** Load the matching template from References below and adapt length and timing to the sales cycle using the rules in Sequence Strategy.
4. **Draft each email** against the Core Principles: one job, one CTA, value before ask. Apply the copy rules in `references/copy-personalization-segmentation.md`.
5. **Attach the measurement.** Per email: the metric it should move. For the sequence: the primary metric, target, and the first A/B test worth running (`/ab-test-setup`).
6. **Write the file** to `gtm/email/<sequence-slug>.md` and stop.

---

## Core Principles

### 1. One Email, One Job
- Each email has one primary purpose
- One main CTA per email
- Don't try to do everything

### 2. Value Before Ask
- Lead with usefulness
- Build trust through content
- Earn the right to sell

### 3. Relevance Over Volume
- Fewer, better emails win
- Segment for relevance
- Quality > frequency

### 4. Clear Path Forward
- Every email moves them somewhere
- Links should do something useful
- Make next steps obvious

---

## Sequence Strategy

### Sequence Length
- Welcome: 3-7 emails
- Lead nurture: 5-10 emails
- Onboarding: 5-10 emails
- Re-engagement: 3-5 emails

Depends on:
- Sales cycle length
- Product complexity
- Relationship stage

### Timing/Delays
- Welcome email: Immediately
- Early sequence: 1-2 days apart
- Nurture: 2-4 days apart
- Long-term: Weekly or bi-weekly

Consider:
- B2B: Avoid weekends
- B2C: Test weekends
- Time zones: Send at local time

### Triggered Over Scheduled
Action-based sends (feature used, milestone hit, inactivity) are more relevant than time-based ones. Prefer a behavioral trigger wherever the data exists, and coordinate onboarding email with in-app onboarding: email supports, it does not duplicate.

### Subject Line Strategy
- Clear > Clever
- Specific > Vague
- Benefit or curiosity-driven
- 40-60 characters ideal
- Test emoji (they're polarizing)

**Patterns that work:**
- Question: "Still struggling with X?"
- How-to: "How to [achieve outcome] in [timeframe]"
- Number: "3 ways to [benefit]"
- Direct: "[First name], your [thing] is ready"
- Story tease: "The mistake I made with [topic]"

### Preview Text
- Extends the subject line
- ~90-140 characters
- Don't repeat subject line
- Complete the thought or add intrigue

---

## Testing and Optimization

### What to Test
- Subject lines (highest impact)
- Send times
- Email length
- CTA placement and copy
- Personalization level
- Sequence timing

### How to Test
- A/B test one variable at a time
- Sufficient sample size
- Statistical significance
- Document learnings

Design the test with `/ab-test-setup` and log it in `product/roadmap/experiment-roadmap.md`.

### Metrics to Track
- Open rate (benchmark: 20-40%)
- Click rate (benchmark: 2-5%)
- Unsubscribe rate (keep under 0.5%)
- Conversion rate (specific to sequence goal)
- Revenue per email (if applicable)

Opens and clicks are diagnostics. The sequence is judged on the conversion it was built to move.

---

## Output Format

### Sequence Overview
```
Sequence Name: [Name]
Trigger: [What starts the sequence]
Goal: [Primary conversion goal]
Primary metric: [metric] | Baseline: [value or "capture first"] | Target: [value]
Length: [Number of emails]
Timing: [Delay between emails]
Exit Conditions: [When they leave the sequence]
Suppression: [Overlapping sequences to pause]
```

### For Each Email
```
Email [#]: [Name/Purpose]
Send: [Timing or behavioral trigger]
Subject: [Subject line]
Preview: [Preview text]
Body: [Full copy]
CTA: [Button text] → [Link destination]
Moves: [the metric this email should move, e.g. setup step completion]
Segment/Conditions: [If applicable]
```

### Metrics Plan
- Primary metric, target, and read-out window
- First test to run: [variable, hypothesis, metric] → design with `/ab-test-setup`

---

## References (load on demand)

- `references/core-sequence-templates.md` — email-by-email skeletons for welcome, lead nurture, re-engagement, and product onboarding sequences. Read when drafting any of those four.
- `references/onboarding-and-retention-emails.md` — new user and new customer series, setup reminders, invites, upgrade to paid or higher plan, review asks, proactive support, usage reports, NPS, referral emails. Read for activation and expansion sequences.
- `references/billing-and-winback-emails.md` — switch to annual, failed payment recovery (dunning), cancellation survey, renewal reminder, expired trial and cancelled customer win-back. Read for revenue-protection sequences.
- `references/usage-and-campaign-emails.md` — usage summaries, milestone notifications, newsletter, seasonal promotions, product updates, industry roundups, pricing updates. Read for recurring or campaign sends.
- `references/email-audit-checklist.md` — full lifecycle checklist. Read when the user asks for an audit of their email program; recommend the single highest-impact missing sequence and its metric.
- `references/copy-personalization-segmentation.md` — email structure, formatting, tone, length, CTA rules, merge fields, dynamic content, segmentation options. Read when writing body copy.

---

## Related Skills

- `/onboarding-cro`: For in-app onboarding (email supports this)
- `/churn-prevention`: For cancel flows, save offers, and payment retry logic behind dunning and win-back emails
- `/referral-program`: For the referral mechanic that referral emails promote
- `/copywriting`: For landing pages emails link to
- `/ab-test-setup`: For testing email elements
- `/popup-cro`: For email capture popups

---

## TERMINATION

Stop when the full sequence is delivered — every email with its copy, timing, trigger,
and the metric it moves, plus the sequence metrics plan — written to `gtm/email/`. One
sequence per invocation. Don't load it into an email tool or send anything, and don't
also build the landing pages the emails link to, the in-app onboarding, or the capture
popup; route those to their own skills.
