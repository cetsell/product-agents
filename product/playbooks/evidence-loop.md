# Evidence Loop

The discipline that lets a team move fast on AI-generated work *without* shipping
confident nonsense. The output of a good model sounds better than it deserves to —
Microsoft's research on knowledge workers found that higher confidence in the AI
correlates with *less* critical thinking, while higher confidence in yourself
correlates with *more*. Code compiles; product judgment does not. The evidence loop
is how we keep the human in the decision without slowing the work down.

This is the canonical reference. Skills point here instead of re-explaining it.

---

## The five questions

Every consequential output — a strategy recommendation, a prioritization call, a
PRD, an audit finding, a "here's what the data says" — carries an evidence appendix
that answers these five, in order:

1. **What claims is this output making?** List them. A claim is anything a reader
   would act on or repeat. If you can't enumerate them, the output is vibes.
2. **Which claims are actually supported?** Mark each: `supported` / `partial` /
   `unsupported / assumed`.
3. **What source backs each supported claim?** A file + date, a Linear query, a
   BigQuery result, a customer-call line, a named doc. "The model said so" is not
   a source. No source → downgrade to `assumed`.
4. **What assumption would flip the decision?** Name the one belief that, if wrong,
   changes the recommendation. This is the thing to go verify before acting.
5. **Where does a human decide?** Mark the exact point the agent stops and a person
   owns the call. Fast does not mean unattended on the decisions that matter.

## The evidence table (drop-in shape)

Append this to any consequential artifact. Skills generate it; humans read it first.

```markdown
## Evidence Loop

| # | Claim | Status | Source (file + date / query / doc) |
|---|-------|--------|-------------------------------------|
| 1 | [claim] | supported | [source] |
| 2 | [claim] | partial | [source — and what's missing] |
| 3 | [claim] | assumed | none — needs verification |

**Assumption that would flip this:** [the one belief to verify before acting]
**Human decides here:** [the specific decision + who owns it]
**Confidence:** [high / medium / low] — [one line on why]
```

## Rules

- **No undated source.** "The roadmap says" is not a source; "`product/roadmap/current-bet.md`, 2026-05-19" is. Mirrors the team-os rule: every data point has a date.
- **Unsupported is allowed — hiding it is not.** A recommendation built partly on
  assumption is fine *if the assumptions are named*. The failure mode is laundering
  an assumption into a fact through fluent prose.
- **Downgrade on doubt.** If you're unsure whether a source backs a claim, mark it
  `partial` and say what's missing. Never round up.
- **The flip-assumption is the highest-value line.** It tells the human the one
  thing worth checking. If you can't name one, the analysis is too shallow to ship.

## Eval-requirements docs (the loop, applied to building)

For AI product features, the evidence loop changes *what you hand engineering*.
Instead of a prose PRD describing desired behavior, hand an **eval-requirements
doc**: a dataset of inputs + the metrics that define success, so engineering can
optimize against a concrete definition of "good" rather than a paragraph.

- Prose PRD says: "the assistant should be friendly and helpful."
- Eval-requirements doc says: "here are 40 labeled conversations; an output passes
  if the LLM-as-judge scores it `helpful` and `on-tone`; target ≥85% pass rate."

Use text labels (`bad` / `good` / `very good`), not numeric scores — models can't
justify numbers reliably. The PM owns the labels: manually review and label a
sample to define what good looks like, then iterate the judge prompt until the
judge's labels match the human's. Template: `templates/eval-requirements-doc.md`.
Scoring runner: `/eval-runner`.

## Why this makes the team faster, not slower

Slower-feeling on a single output; far faster across the org. A claim with its
source attached is reusable — the next person doesn't re-derive it. An assumption
named once is an assumption the whole team can attack. This is the same mechanism
behind working in the open (Shopify's River): the speed of an organization is set
by how fast good reasoning diffuses, and an evidence trail is reasoning made
searchable. The agent's own quality stays high the same way (cf. aeon's skill-evals
/ operator-scorecard): you write down what it should have known, and it knows it
next time.

## When to apply

| Output type | Evidence loop? |
|-------------|----------------|
| Strategy / prioritization / roadmap call | Yes — always |
| PRD / spec / bet brief | Yes — plus eval-requirements for AI features |
| Audit finding / "the data shows" | Yes — always |
| Metric definition or number cited to a stakeholder | Yes — source + date |
| Brainstorm, draft prose, internal scratch | No — would just add friction |
