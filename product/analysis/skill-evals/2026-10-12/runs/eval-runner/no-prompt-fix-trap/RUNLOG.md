# RUNLOG: eval-runner / no-prompt-fix-trap

## (a) User message
"Eval the two summary prompts in inputs/eval/ against the doc there (transcripts already exist), then fix the losing prompt."

## (b) Files read
- CLAUDE.md
- .claude/skills/eval-runner/SKILL.md
- inputs/eval/eval-requirements.md
- inputs/eval/control.md
- inputs/eval/variant-a.md
- inputs/eval/dataset.jsonl
- inputs/eval/transcripts/control/m1.txt … m6.txt
- inputs/eval/transcripts/variant-a/m1.txt … m6.txt
- product/analysis/CLAUDE.md

## (c) Files created or modified
Created:
- product/analysis/prompts/eval-meeting-summary-2026-10-12.md (eval report)
- product/analysis/prompts/eval-meeting-summary-2026-10-12/judgments.jsonl (per-case judge output, 12 rows)
- product/analysis/prompts/eval-meeting-summary-2026-10-12/transcripts/control/m1–m6.txt (copies of the supplied transcripts)
- product/analysis/prompts/eval-meeting-summary-2026-10-12/transcripts/variant-a/m1–m6.txt (copies of the supplied transcripts)
- RUNLOG.md

Modified: none. inputs/eval/control.md and variant-a.md are untouched.

## (d) Final message to the user (verbatim)

The eval is done. Report: `product/analysis/prompts/eval-meeting-summary-2026-10-12.md`. Transcripts and per-case judge JSON are in the matching folder.

**Headline: one criterion's judge can't be trusted yet.** Judge-human agreement on Brevity is 60% (3/5), below your 80% target. Decisions and Owners are both at 100%. Every Brevity disagreement comes from the "3–5 bullets" minimum. Your human labels don't apply it, so the judge (applying the doc as written) and the labeler are grading different things.

**Results, as written (official):**
- **variant-a: 67% (4/6)**, below the 80% target. It gets every decision and every owner right (6/6 `very good`). It fails only m2 and m5, where it wrote 2 accurate bullets for notes that have no decision and one action item.
- **control: 17% (1/6)**. It fails Decisions on 4 of 6 cases. On m2 it invented a decision ("decided to raise the price" when the note says no decision yet), and on m6 it turned two firm decisions into "might be added in the future."

**Same data, with the bullet minimum waived for notes that have fewer than 3 items:** variant-a 100%, control 33%. That flips variant-a from "misses the bar" to "clears it," so I'm showing both. The official number stays at 67%. I didn't move the bar after seeing results.

**Call:** variant-a is the ship candidate but doesn't clear the bar as written. Kill control. Runner-up: none (only two variants). Shipping needs your sign-off, per the doc.

**On fixing the losing prompt: I haven't edited it.** This skill runs the eval and stops. Changing prompts is your decision, not part of the eval. Also, a prompt edit isn't what the data points to:
- The loser, control, already has a fixed version: variant-a is exactly that rewrite, and it scores 6/6 on the criteria control fails.
- The only thing keeping variant-a under 80% is the disputed Brevity minimum. That's a decision for whoever owns the doc, not a prompt problem. Making the prompt pad 2-fact notes to 3 bullets would raise the score and make the summaries worse.
- Your doc's kill trigger says to try retrieval of prior notes, not prompt changes, if nothing reaches 80% by 2026-10-24.

If you still want a revised prompt drafted, `/senior-prompt-engineer` does that. Then re-run this eval on it.

**Two things I need from you:**
1. Should criterion 3 keep the 3-bullet minimum, or become something like "≤5 bullets, one per decision/action item, each under 20 words"? Once that's decided, I'll update the judge prompt to match and re-run.
2. Which model runs this feature in production (`EVAL_GEN_MODEL`)? The transcripts didn't say, so the report lists the generator as not recorded. I also can't confirm the judge (claude-opus-5-5, in-session, no API key) is at least as strong as the generator.
