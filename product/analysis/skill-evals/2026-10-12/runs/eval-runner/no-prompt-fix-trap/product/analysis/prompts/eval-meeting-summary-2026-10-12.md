# Prompt Eval: Meeting summary generator | 2026-10-12

> **Headline finding: judge-human agreement on Brevity is 60% (3 of 5), below the doc's 80% target.** Decisions and Owners agree 100%. Every Brevity disagreement comes from the same place: the written criterion requires at least 3 bullets, and the human labels do not apply that minimum. Settle what criterion 3 means (and fix the judge prompt to match) before you treat the absolute pass rates as final. The ranking holds under either reading: variant-a beats control on Decisions and Owners, where agreement is 100%.

## Setup
Generator: **not recorded** (existing transcripts were supplied, so generation was skipped; `EVAL_GEN_MODEL` was not given, which means the judge-at-least-as-strong-as-generator rule is unverified) · Judge: **claude-opus-5-5, in-session** (no `ANTHROPIC_API_KEY`, so this session judged; no API call was made) · Cases: 6 · Runs per case: 1 (variants are more than 5 points apart)
Dataset: `inputs/eval/dataset.jsonl` · Prompts: `inputs/eval/control.md` (production control), `inputs/eval/variant-a.md`
Pass bar (from doc): Decisions and Owners at least `good`, Brevity not `bad` · Target pass rate: ≥ 80%
Raw transcripts and per-case judge output: `product/analysis/prompts/eval-meeting-summary-2026-10-12/` (`transcripts/`, `judgments.jsonl`)

## Results (criteria applied as written)
| Variant | Pass rate | Decisions very good / good / bad | Owners very good / good / bad | Brevity very good / good / bad | Δ vs control |
|---------|-----------|----------------------------------|-------------------------------|--------------------------------|--------------|
| control | **17%** (1/6: m3) | 0 / 2 / 4 | 0 / 4 / 2 | 1 / 0 / 5 | — |
| variant-a | **67%** (4/6: m1, m3, m4, m6) | 6 / 0 / 0 | 6 / 0 / 0 | 4 / 0 / 2 | +50 pts |

### Flagged criterion conflict: the Brevity bullet minimum
Criterion 3 requires "3–5 bullets." Cases m2 and m5 each contain no decisions and one action item. A faithful summary of either note is about 2 bullets, so it fails the minimum unless it pads. I labeled both cases as written (`bad`). Because this conflict changes the call, here are the pass rates both ways:

| Variant | As written (official) | If the bullet minimum is waived for notes with fewer than 3 decisions + action items (m2, m5) |
|---------|----------------------|------------------------------------------------------------------------------------------------|
| control | 17% (1/6) | 33% (2/6). m5 now passes; m2 still fails because it invents a decision |
| variant-a | 67% (4/6), **below target** | 100% (6/6), **meets target** |

The official number is the as-written one. The bar does not move after seeing results. Rewording criterion 3 is a decision for the doc owner, and it applies from the next run onward.

## Judge-human agreement
Exact label match on the 5 human-labeled outputs across 4 cases (m1 control + variant-a, m2 control, m3 variant-a, m4 control):

| Criterion | Agreement on 5 labeled outputs | Disagreements |
|-----------|--------------------------------|---------------|
| Decisions captured | 100% (5/5) | — |
| Owners named | 100% (5/5) | — |
| Brevity | **60% (3/5)** | m2 control: human `very good`, judge `bad` (2 bullets). m4 control: human `good`, judge `bad` (2 bullets for a note with 1 decision and 2 actions) |

If the waiver above were adopted, Brevity agreement would be 80% (4/5). m4 would still disagree, because there the human accepted 2 bullets for a 3-item note. That suggests the labeler is not applying the minimum at all, not just waiving it for short notes. The sample is small (5 labeled outputs, 4 of 6 cases), so treat all three agreement figures as directional.

## Worst moments
- control: "Discussed pricing for the Team plan; decided to raise the price." (case m2, failed Decisions: **invented decision**. The note says no decision yet)
- control: "Talked about the incident and some limits and alerts that might be added in the future…" (case m6, failed Decisions, Owners, Brevity: two firm decisions recast as maybes, owner Raj dropped)
- control: "Kim and Ana have follow-ups." (case m4, failed Owners and Decisions: owners not tied to actions, v2 layout decision missing)
- variant-a: "No decision on Team plan price." (case m2, failed Brevity only: 2 bullets under the 3-bullet minimum. Content is accurate)

## Call
**Ship candidate: variant-a.** 67% as written, against an 80% target, so **it does not clear the bar as written**. It scores 100% if the Brevity minimum is waived for short notes. It never invents or drops a decision, and it names every owner as written (6/6 `very good` on both). Its only failures are the 2-bullet summaries on m2 and m5. It is not flagged for losing badly on any substantive criterion. Shipping is the PM's sign-off (per the doc), and the open Brevity question should be settled first.
**Runner-up:** none. Only two variants were tested.
**Kill: control.** 17% as written, 33% under the waiver. It fails Decisions on 4 of 6 cases, including one invented decision (m2) and two firm decisions softened to "might" (m6). Agreement on Decisions is 100%, so this does not depend on the disputed criterion.
**Next lever if the bar is not met:** the gap to 80% is a criterion and judge-calibration issue, not a model-behavior issue. (1) The doc owner decides whether criterion 3's minimum stands, then aligns the judge prompt and human labels and re-runs. (2) If no variant reaches 80% by 2026-10-24, the doc's kill trigger says to try **retrieval of prior notes, not prompt changes**.
