---
name: ab-test-setup
description: >
  Turns a proposed change into a pre-registered A/B test plan: hypothesis, control and
  variants, primary, secondary, and guardrail metrics, minimum detectable effect, sample
  size, duration, and decision rule. Reads out results against that rule, and on request
  logs the test to the experiment roadmap.
when_to_use: >
  Use when the user mentions "A/B test", "split test", "experiment", "test this change",
  "hypothesis", "should I test this", "which version is better", "statistical
  significance", or "how long should I run this test", and whenever /page-cro,
  /signup-flow-cro, /popup-cro, /onboarding-cro, /paywall-upgrade-cro, or
  /pricing-strategy hands off a change to prove. Not for generating the change ideas
  (use those skills) or writing variant copy (use /copywriting).
argument-hint: "[change to test, or results to read out]"
allowed-tools: Read, Grep, Glob, Edit
model: claude-sonnet-5-5
effort: medium
metadata:
  version: 2.0.0
---

# A/B Test Setup

**Role:** Experimentation lead; the one job is making sure every change worth shipping is proven with a test that can actually give a valid answer.
**Outcome:** Decision quality — ship, kill, and iterate calls rest on a pre-registered hypothesis, metric, and sample size instead of opinion, and the idea-to-measured-result loop has a known end date. **Leaves behind:** a test plan in chat and, if the user asks, a row in `product/roadmap/experiment-roadmap.md`.
**Output:** the test plan below (design mode) or a read-out against the decision rule (results mode).

Read `product/context.md` first (customer, stage, North Star, baselines, tools). Ask only for what it does not cover.

## Hand-offs In

This is the hub the CRO and monetization skills hand off to. When a change arrives from `/page-cro`, `/signup-flow-cro`, `/popup-cro`, `/onboarding-cro`, `/paywall-upgrade-cro`, or `/pricing-strategy`, take its stated metric, expected direction, and confidence as the starting hypothesis; ask only for the baseline and traffic if they are missing.

## Initial Assessment

Before designing a test, understand:

1. **Test Context** - What are you trying to improve? What change are you considering?
2. **Current State** - Baseline conversion rate? Current traffic volume?
3. **Constraints** - Technical complexity? Timeline? Tools available?

---

## Core Principles

### 1. Start with a Hypothesis
- Not just "let's see what happens"
- Specific prediction of outcome
- Based on reasoning or data

### 2. Test One Thing
- Single variable per test
- Otherwise you don't know what worked

### 3. Statistical Rigor
- Pre-determine sample size
- Don't peek and stop early
- Commit to the methodology

### 4. Measure What Matters
- Primary metric tied to business value
- Secondary metrics for context
- Guardrail metrics to prevent harm

---

## Hypothesis Framework

### Structure

```
Because [observation/data],
we believe [change]
will cause [expected outcome]
for [audience].
We'll know this is true when [metrics].
```

### Example

**Weak**: "Changing the button color might increase clicks."

**Strong**: "Because users report difficulty finding the CTA (per heatmaps and feedback), we believe making the button larger and using contrasting color will increase CTA clicks by 15%+ for new visitors. We'll measure click-through rate from page view to signup start."

---

## Sample Size

### Quick Reference

| Baseline | 10% Lift | 20% Lift | 50% Lift |
|----------|----------|----------|----------|
| 1% | 150k/variant | 39k/variant | 6k/variant |
| 3% | 47k/variant | 12k/variant | 2k/variant |
| 5% | 27k/variant | 7k/variant | 1.2k/variant |
| 10% | 12k/variant | 3k/variant | 550/variant |

**Calculators:**
- [Evan Miller's](https://www.evanmiller.org/ab-testing/sample-size.html)
- [Optimizely's](https://www.optimizely.com/sample-size-calculator/)

**Feasibility rule:** if the required sample size means running longer than about 4-6 weeks on the eligible traffic, say so before going further and recommend one of: a bolder change (larger MDE), a higher-funnel proxy metric, or shipping with a before/after read and guardrails, labeled as lower confidence.

---

## Metrics Selection

### Primary Metric
- Single metric that matters most
- Directly tied to hypothesis
- What you'll use to call the test

### Secondary Metrics
- Support primary metric interpretation
- Explain why/how the change worked

### Guardrail Metrics
- Things that shouldn't get worse
- Stop test if significantly negative

### Example: Pricing Page Test
- **Primary**: Plan selection rate
- **Secondary**: Time on page, plan distribution
- **Guardrail**: Support tickets, refund rate

---

## Running the Test

### Pre-Launch Checklist
- [ ] Hypothesis documented
- [ ] Primary metric defined
- [ ] Sample size calculated
- [ ] Variants implemented correctly
- [ ] Tracking verified
- [ ] QA completed on all variants

### The Peeking Problem
Looking at results before reaching sample size and stopping early leads to false positives and wrong decisions. Pre-commit to sample size and trust the process.

---

## Analyzing Results

### Statistical Significance
- 95% confidence = p-value < 0.05
- Means <5% chance result is random
- Not a guarantee—just a threshold

### Analysis Checklist

1. **Reach sample size?** If not, result is preliminary
2. **Statistically significant?** Check confidence intervals
3. **Effect size meaningful?** Compare to MDE, project impact
4. **Secondary metrics consistent?** Support the primary?
5. **Guardrail concerns?** Anything get worse?
6. **Segment differences?** Mobile vs. desktop? New vs. returning?

### Interpreting Results

| Result | Conclusion |
|--------|------------|
| Significant winner | Implement variant |
| Significant loser | Keep control, learn why |
| No significant difference | Need more traffic or bolder test |
| Mixed signals | Dig deeper, maybe segment |

---

## Output Shape

### Design mode: test plan

```
## Test plan: <short name>
- Source: <skill or person that proposed it, and the change>
- Hypothesis: Because <observation>, we believe <change> will cause <outcome> for <audience>. We'll know when <metric>.
- Control: <what users see today>
- Variant(s): <what changes; one variable>
- Primary metric: <the one metric that calls the test>; baseline: <value>
- Secondary metrics: <what explains the result>
- Guardrails and kill trigger: if <guardrail> drops by <X%>, stop.
- MDE: <smallest relative lift worth detecting>
- Sample size: <N per variant>; eligible traffic: <N per week>; duration: <full weeks>
- Allocation: <50/50, or other with reason>
- Decision rule: ship if <primary> is significant at 95% with no guardrail breach; keep control if it loses; if inconclusive, <bolder test / proxy metric / stop>.
- Read-out date: <date>
- Owner: <role>
```

### Results mode: read-out

Sample reached (yes/no), primary result with confidence interval, secondary and guardrail movement, segment notes, and the call: Ship, Kill, or Iterate, stated against the pre-registered decision rule. Name what was learned in one line.

### Logging (only if the user asks)

Read `product/roadmap/experiment-roadmap.md` first and change only the row you add or move:
- New test: append to **Queued** as `| EXP-N | <name> | <hypothesis, one line> | <depends on, or none> | <High / Med / Low> |`, where N is the highest existing EXP number plus one.
- Test already live: add to **Running** with owner, start, and read-out dates; status `Running`.
- Results in: move the row to **Completed** with the result (Lift / No lift / Inconclusive) and the outcome (Ship / Kill / Iterate).
- Update the **Last updated** date.

---

## Task-Specific Questions

1. What's your current conversion rate?
2. How much traffic does this page get?
3. What change are you considering and why?
4. What's the smallest improvement worth detecting?
5. What tools do you have for testing?
6. Have you tested this area before?

---

## References (load on demand)

- `references/test-design.md` — test types (A/B, A/B/n, MVT, split URL), what to vary in variants, traffic allocation options, client- vs. server-side implementation and tools, during-the-test dos and don'ts, and common design, execution, and analysis mistakes. Read when the plan needs a non-default test type, split, or implementation, or when reviewing someone else's plan.

## Related Skills

- `/page-cro`, `/signup-flow-cro`, `/popup-cro`, `/onboarding-cro`, `/paywall-upgrade-cro`: sources of ranked changes to test
- `/pricing-strategy`: source of price and packaging changes to validate
- `/copywriting`: for writing variant copy
- `/data-analyst`: for pulling baselines and traffic, and for deeper result analysis

---

## TERMINATION

Stop when the test is fully specified: hypothesis, variants, primary metric, minimum
detectable effect, sample size, expected duration, and the decision rule (plus the
roadmap row, if the user asked for it). Designing the test and analyzing results are
separate invocations; do not analyze before results exist. Do not write the variant
copy here; route to `/copywriting`.
