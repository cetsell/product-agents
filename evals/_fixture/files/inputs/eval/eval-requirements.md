# Eval-Requirements Doc: Meeting summary generator

*Context as of 2026-10-06* (fixture; fictional)

## What we're building
After a meeting note is saved, Acme Notes generates a 3–5 bullet summary with decisions and owners at the top of the note.

## What "good" means
A teammate who missed the meeting can tell what was decided and who owns what in under 20 seconds.

## Eval criteria
| # | Criterion | What a passing output looks like | Labels |
|---|-----------|----------------------------------|--------|
| 1 | Decisions captured | Every decision in the note appears; no invented decisions | bad / good / very good |
| 2 | Owners named | Each action item names its owner as written in the note | bad / good / very good |
| 3 | Brevity | 3–5 bullets, each under 20 words | bad / good / very good |

**Pass bar:** criteria 1 and 2 are at least `good`, criterion 3 is not `bad`.
**Target pass rate:** ≥ 80% across the dataset.

## Dataset
| Source | Count | How collected | Labeled by human? |
|--------|-------|---------------|-------------------|
| Synthetic meeting notes | 6 | Written by PM | 4 of 6 (labels are per variant output, in `human_labels`) |

Dataset file: `inputs/eval/dataset.jsonl`

## Judge
- Judge: `EVAL_JUDGE_MODEL` (default claude-opus-5-5), or in-session if no API key.
- Human-judge agreement target: ≥ 80%.

## Decision points
- Human decides here: PM signs off on shipping the winning prompt.
- Kill trigger: if no variant reaches 80% by 2026-10-24, try retrieval of prior notes instead of prompt changes.
