# Eval-Requirements Doc: {{feature_name}}

*Context as of {{YYYY-MM-DD}}*

The AI-feature replacement for a prose PRD. You don't describe the desired behavior
in paragraphs — you hand engineering a dataset and the metrics that define success,
so they can optimize against a concrete definition of "good." See
`product/playbooks/evidence-loop.md` for the why.

---

## What we're building

{{One paragraph: the AI feature, the user job it does, where it sits in the product.}}

## What "good" means

{{The end-user experience we're optimizing for, stated as observable behavior — not
adjectives. "Resolves the user's question in ≤2 turns" beats "is helpful."}}

---

## Eval criteria

Text labels, not numbers — models can't justify numeric scores reliably. Use a small
ordinal set per criterion (e.g. `bad` / `good` / `very good`).

| # | Criterion | What a passing output looks like | Labels |
|---|-----------|----------------------------------|--------|
| 1 | {{name}} | {{observable pass condition}} | {{bad / good / very good}} |
| 2 | {{name}} | {{observable pass condition}} | {{bad / good / very good}} |

**Pass bar:** {{e.g. an output passes if criteria 1–2 are ≥ `good`}}
**Target pass rate:** {{e.g. ≥85% across the dataset}}

---

## Dataset

The inputs we evaluate against. The PM owns a labeled sample — manually review and
label {{N}} examples to define ground truth before any judge runs.

| Source | Count | How collected | Labeled by human? |
|--------|-------|---------------|-------------------|
| {{prod logs / synthetic / customer calls}} | {{N}} | {{method}} | {{N of M}} |

Dataset file: {{path or link}}

---

## Judge

How outputs get scored at scale once human labels exist.

- **Judge:** {{LLM-as-judge — Claude self-eval via `/eval-runner`, or specify}}
- **Judge prompt:** {{path, or "see /eval-runner"}}
- **Human-judge agreement:** {{% of judge labels that match human labels on the
  sample. Iterate the judge prompt until this is acceptable — then trust it to scale.}}

---

## The lever

When the bar isn't met, which lever do we pull? (effort vs. impact)

- **Prompt engineering** — low effort, high impact. Adjust tone/instructions.
  *Mental model: clear instructions to an employee.*
- **RAG** — medium effort, high impact. Feed retrieved context the model lacks.
  *Mental model: a doctor with a medical textbook.*
- **Fine-tuning** — high effort. Specialize the base model (cost/latency).
  *Mental model: going to college for a career.*

**Chosen lever this round:** {{which + one-line why}}

---

## Decision points

- **Human decides here:** {{the call a person owns — e.g. sign-off on the pass bar,
  or ship/no-ship at target rate}}
- **Kill / pivot trigger:** {{if pass rate doesn't reach X by {{date}}, do Y}}
