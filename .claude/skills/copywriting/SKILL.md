---
name: copywriting
description: >
  Writes new conversion copy for marketing pages (homepage, landing, pricing, feature,
  about) and edits existing copy with the Seven Sweeps pass. Returns paste-ready copy by
  section, headline and CTA alternatives with rationale, the conversion metric the page
  should move, and the A/B test that would prove the new copy beats the old.
when_to_use: >
  Write mode: "write copy for", "rewrite this page", "marketing copy", "headline help",
  "CTA copy". Edit mode (copy already exists): "edit this copy", "review my copy", "copy
  feedback", "proofread", "polish this", "make this better", "copy sweep", "tighten this
  up", "reads awkwardly", "too wordy", "sharpen the messaging". Not for page structure or
  layout (use /page-cro), email copy (use /email-sequence), popup copy (use /popup-cro),
  or test design (use /ab-test-setup).
argument-hint: "[write|edit] [page type, URL, or pasted copy]"
allowed-tools: Read, Grep, Glob, Write, WebFetch
metadata:
  version: 2.0.0
---

# Copywriting

**Role:** Conversion copywriter and copy editor. One job: words on a page that move its primary conversion, written new or edited from what exists.
**Outcome:** Acquisition & activation — the page's primary conversion rate (visitor to signup, trial, demo, or purchase). **Leaves behind:** paste-ready copy, the metric it targets, and a test stub that proves it beat the old copy, in `gtm/copy/`.
**Output:** `gtm/copy/<page>-<YYYY-MM-DD>.md` (or in chat for a single headline or CTA)

Read `product/context.md` first (customer, stage, North Star, baselines, tools). Ask only for what it does not cover. Match the voice of existing published copy.

## Pick the mode

| Situation | Mode | What you do |
|-----------|------|-------------|
| No copy yet, or the user wants a rewrite from scratch | **Write** | Draft page copy section by section, then run a quick-pass edit on your own draft |
| Copy exists and the core message should survive | **Edit** | Run the Seven Sweeps; change only what has a clear reason |
| Copy exists but the page structure or offer is the problem | Neither | Route to /page-cro; copy cannot fix a broken argument |

If the user does not say, infer from input: pasted copy or a URL with "improve/polish/tighten" is Edit; a page type with "write/draft" is Write. A request to "make this better" on weak copy can start as Edit and switch to Write if more than half the copy would change; say so when you switch.

## Before you start (both modes)

Gather only what `product/context.md` does not answer:

1. **Page purpose** — page type; the ONE primary action; the secondary action, if any.
2. **Audience** — who the page is for; the problem they are solving; what they already tried; objections; the words they use for the problem.
3. **Offer** — what is sold; how it differs from alternatives; the key outcome; proof points (numbers, testimonials, case studies).
4. **Traffic context** — source (ads, organic, email); what visitors know on arrival; the message they saw just before.
5. **Baseline** — the page's current conversion rate and traffic, if known. Without it, mark the metric target `assumed`.
6. **Edit mode only** — known problems, and which proof is available to back claims.

## Principles (both modes)

- **Clarity over cleverness.** If you must choose between clear and creative, choose clear. Every sentence has one job.
- **Benefits over features.** Connect what it does to what that means for the customer.
- **Specificity over vagueness.** "Cut your weekly reporting from 4 hours to 15 minutes," not "save time on your workflow."
- **Customer language over company language.** Mirror voice-of-customer from reviews, interviews, and support tickets.
- **One idea per section.** Each section advances one argument down the page.

Style rules: simple words over complex ("use," not "utilize"); specific over buzzwords ("streamline," "optimize," "innovative" mean nothing); active over passive; confident over hedged (cut "almost," "very," "really"); show the outcome instead of adverbs like "instantly"; never fabricate statistics, claims, or testimonials. No exclamation points.

**Voice and tone:** set formality (casual, professional-friendly, enterprise) and personality (playful or serious, bold or understated, technical or accessible) before writing. Keep it consistent; headlines can be bolder, body copy clearer, CTAs action-oriented.

## Write mode

1. **Name the metric and the job.** State the conversion event this page must move and its baseline before writing a word.
2. **Pick the sections.** Hero (headline, subheadline, primary CTA, supporting visual), then a varied mix: social proof, problem, how it works, 3-5 benefits (not 10), testimonial, use cases, comparison, FAQ, final CTA with risk reversal. Avoid the hero-plus-feature-stack page. Section library and page-type guidance (homepage, landing, pricing, feature, about) are in `references/page-structure.md`.
3. **Draft the hero first.** Headline carries the single most important message; subheadline adds specificity in 1-2 sentences; CTA says what they get, not what they do ("Start Free Trial" over "Sign Up"). Formula: [Action Verb] + [What They Get] + [Qualifier if needed]. Headline formulas and the CTA list are in `references/headlines-and-ctas.md`.
4. **Draft the body** section by section, one argument each, matching the headline to the traffic source on landing pages.
5. **Quick-pass edit your own draft** (word, sentence, paragraph checks in `references/editing-checks.md`). Scan for jargon, sentences with more than 3 conjunctions, passive voice, exclamation points, and buzzwords.
6. **Write 2-3 alternatives** for the headline and primary CTA, each with a one-line rationale. The strongest pair becomes the test challenger.

## Edit mode

Run seven passes in order, one dimension each. After each sweep, loop back through the earlier ones to check new edits did not break them. Full checks, examples, and the checklist are in `references/seven-sweeps.md`.

| # | Sweep | The question |
|---|-------|--------------|
| 1 | Clarity | Can the reader understand it on first read? |
| 2 | Voice and tone | Does it sound like one consistent brand throughout? |
| 3 | So what | Does every claim answer "why should I care?" |
| 4 | Prove it | Is every claim backed by evidence, or softened? |
| 5 | Specificity | Are vague words replaced with numbers, timeframes, examples? |
| 6 | Heightened emotion | Does it make the reader feel the pain and the relief, honestly? |
| 7 | Zero risk | Is every barrier near the CTA removed? |

Rules for Edit mode:
- Preserve the core message and the author's voice. Every change has a stated reason.
- For a fast pass (short asset, low stakes), use the quick-pass checks in `references/editing-checks.md` instead of all seven sweeps, and say which you ran.
- Present findings with proposed edits; the author makes final calls. Stop when a full sweep finds nothing new.
- Flag claims you cannot verify instead of inventing proof.

## Output shape

Write to `gtm/copy/<page>-<YYYY-MM-DD>.md`:

```markdown
# Copy — [page] | [Write|Edit] | [date]

**Metric this copy should move:** [conversion event] — baseline [x% or `assumed`], target [y%]
**Test that proves it:** [old vs new, primary metric, guardrail] — design with /ab-test-setup; log in product/roadmap/experiment-roadmap.md

## Copy (paste-ready)
[Write: by section — headline, subheadline, CTA, section headers, body, secondary CTAs]
[Edit: the revised copy]

## Alternatives (headline and primary CTA)
- Option A: [copy] — [rationale]
- Option B: [copy] — [rationale]

## Notes
[Write: annotations for key choices — principle applied, alternatives considered]
[Edit: | Original | Revised | Why (sweep) | table, plus "Left as-is" with reasons]

## Meta (if relevant)
- Page title / meta description
```

Keep the metric and test lines to one line each. If the user wants no file, return the same shape in chat.

## References (load on demand)

- `references/seven-sweeps.md` — Edit mode: all seven sweeps with checks, examples, process, the collaborative sweep loop, and the full checklist.
- `references/editing-checks.md` — word-, sentence-, and paragraph-level checks (weak-word swaps) and common copy problems with fixes. Use for quick-pass edits and the Write-mode self-edit.
- `references/page-structure.md` — Write mode: above-the-fold anatomy, every section type, strong vs weak section mixes, and page-type guidance.
- `references/headlines-and-ctas.md` — headline formulas with examples, weak vs strong CTAs, and style techniques (directness, rhetorical questions, analogies, humor).

## Related skills

- /page-cro — page structure, offer, or layout is the problem, not the words
- /marketing-psychology — why a given edit should change behavior
- /marketing-strategy-pmm — positioning or messaging hierarchy is unsettled
- /email-sequence — email copy; /popup-cro — popup and modal copy
- /ab-test-setup — design the test that proves the new copy wins

## TERMINATION

Stop when one asset's copy is delivered in the output shape with the metric line and the test line filled. One page or section per invocation, one mode. Do not rewrite adjacent pages, restructure the page (route to /page-cro), design the full experiment (route to /ab-test-setup), publish or ship the copy, or keep polishing past the user's intent.
