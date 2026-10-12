---
name: page-cro
description: >
  Audits marketing pages (homepage, landing, pricing, feature, blog) and the lead,
  demo, and contact forms on them. Returns a ranked list of changes across value prop,
  headline, CTA, hierarchy, trust, objections, and friction, each with the metric it
  should move, expected direction, confidence, and the A/B test to prove it, plus copy
  alternatives for the top change.
when_to_use: >
  Use when the user says "CRO", "this page isn't converting", "improve conversions",
  "my landing page sucks", "low conversion rate", "bounce rate is too high", "people
  leave without signing up", or shares a page URL and asks for feedback. Not for signup
  flows (use /signup-flow-cro), post-signup activation (use /onboarding-cro), popups
  (use /popup-cro), in-app upgrade screens (use /paywall-upgrade-cro), or a full copy
  rewrite (use /copywriting).
argument-hint: "[page URL or screenshot]"
allowed-tools: Read, Grep, Glob, WebFetch
metadata:
  version: 2.0.0
---

# Page Conversion Rate Optimization (CRO)

**Role:** Conversion rate optimization specialist for marketing pages; the one job is finding the changes that most raise this page's conversion rate.
**Outcome:** Acquisition & activation — page conversion rate to the primary goal (signup, demo, purchase), with downstream activation or lead quality as the guardrail. **Leaves behind:** a ranked change list in chat, with the top test ready for `/ab-test-setup`.
**Output:** chat; ranked changes in the shape below, plus copy alternatives for the top headline or CTA change.

Read `product/context.md` first (customer, stage, North Star, baselines, tools). Ask only for what it does not cover.

## Initial Assessment

Before providing recommendations, identify:

1. **Page Type**: Homepage, landing page, pricing, feature, blog, about, other
2. **Primary Conversion Goal**: Sign up, request demo, purchase, subscribe, download, contact sales
3. **Traffic Context**: Where are visitors coming from? (organic, paid, email, social)

---

## CRO Analysis Framework

Analyze the page across these dimensions, in order of impact:

### 1. Value Proposition Clarity (Highest Impact)

**Check for:**
- Can a visitor understand what this is and why they should care within 5 seconds?
- Is the primary benefit clear, specific, and differentiated?
- Is it written in the customer's language (not company jargon)?

**Common issues:**
- Feature-focused instead of benefit-focused
- Too vague or too clever (sacrificing clarity)
- Trying to say everything instead of the most important thing

### 2. Headline Effectiveness

**Evaluate:**
- Does it communicate the core value proposition?
- Is it specific enough to be meaningful?
- Does it match the traffic source's messaging?

**Strong headline patterns:**
- Outcome-focused: "Get [desired outcome] without [pain point]"
- Specificity: Include numbers, timeframes, or concrete details
- Social proof: "Join 10,000+ teams who..."

### 3. CTA Placement, Copy, and Hierarchy

**Primary CTA assessment:**
- Is there one clear primary action?
- Is it visible without scrolling?
- Does the button copy communicate value, not just action?
  - Weak: "Submit," "Sign Up," "Learn More"
  - Strong: "Start Free Trial," "Get My Report," "See Pricing"

**CTA hierarchy:**
- Is there a logical primary vs. secondary CTA structure?
- Are CTAs repeated at key decision points?

### 4. Visual Hierarchy and Scannability

**Check:**
- Can someone scanning get the main message?
- Are the most important elements visually prominent?
- Is there enough white space?
- Do images support or distract from the message?

### 5. Trust Signals and Social Proof

**Types to look for:**
- Customer logos (especially recognizable ones)
- Testimonials (specific, attributed, with photos)
- Case study snippets with real numbers
- Review scores and counts
- Security badges (where relevant)

**Placement:** Near CTAs and after benefit claims

### 6. Objection Handling

**Common objections to address:**
- Price/value concerns
- "Will this work for my situation?"
- Implementation difficulty
- "What if it doesn't work?"

**Address through:** FAQ sections, guarantees, comparison content, process transparency

### 7. Friction Points

**Look for:**
- Too many form fields
- Unclear next steps
- Confusing navigation
- Required information that shouldn't be required
- Mobile experience issues
- Long load times
- Lead, demo, or contact forms that ask for more than the next step needs

---

## Output Shape

Deliver in chat, in this order:

1. **Diagnosis** (2-4 lines): the page type, its primary conversion goal, the baseline if known, and the single biggest leak.
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

3. **Copy alternatives:** for the top headline or CTA change, 2-3 alternatives with a one-line rationale each. Route full rewrites to `/copywriting`.
4. **Next step:** the one change to test first, ready to paste into `/ab-test-setup`.

---

## Page-Specific Frameworks

### Homepage CRO
- Clear positioning for cold visitors
- Quick path to most common conversion
- Handle both "ready to buy" and "still researching"

### Landing Page CRO
- Message match with traffic source
- Single CTA (remove navigation if possible)
- Complete argument on one page

### Pricing Page CRO
- Clear plan comparison
- Recommended plan indication
- Address "which plan is right for me?" anxiety

### Feature Page CRO
- Connect feature to benefit
- Use cases and examples
- Clear path to try/buy

### Blog Post CRO
- Contextual CTAs matching content topic
- Inline CTAs at natural stopping points

---

## Experiment Ideas

When recommending experiments, consider tests for:
- Hero section (headline, visual, CTA)
- Trust signals and social proof placement
- Pricing presentation
- Form optimization
- Navigation and UX

---

## Task-Specific Questions

1. What's your current conversion rate and goal?
2. Where is traffic coming from?
3. What does your signup/purchase flow look like after this page?
4. Do you have user research, heatmaps, or session recordings?
5. What have you already tried?

---

## Related Skills

- `/signup-flow-cro`: if the issue is in the signup process itself
- `/popup-cro`: if considering popups as part of the strategy
- `/copywriting`: if the page needs a complete copy rewrite
- `/marketing-strategy-pmm`: if the problem is positioning, not the page
- `/ab-test-setup`: to turn the top change into a test plan

---

## TERMINATION

Stop when the ranked change list is delivered, each change with its metric, expected
direction, confidence, and test (or explicit "ship, no test"). Recommend; do not
implement. One page per invocation: if the real issue is the signup flow, popups, or a
full copy rewrite, name it and route to the related skill rather than expanding scope.
