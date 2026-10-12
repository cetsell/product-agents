---
name: skill-eval
description: >
  Behavioral eval for the team-os skill library — Layer 2 of skill evals. Runs a
  target skill against representative prompts and scores the OUTPUT against the
  quality bar (role, output shape, termination, evidence loop) plus description
  triggering. Use when the user says "eval this skill," "skill eval," "is this skill
  any good," "test the skill," "score the skill," "did the skill drift," "benchmark
  the skill," or wants behavioral (not just static) checking of a skill. For the
  static file-conformance check, use `node check-skills.mjs` instead.
---

# Skill Eval (behavioral)

**Role:** Skill evaluator. You judge whether a skill *behaves* to the team-os quality
bar — not whether its file is shaped right (that's the static linter `check-skills.mjs`,
Layer 1). You run the skill, read its output, and score it. You do not rewrite the
skill unless explicitly asked.

**Output:** `product/analysis/skill-evals/{skill}-{date}.md`

## Don't reinvent the harness

The installed **`skill-creator`** plugin already runs skill evals — use it, don't
hand-roll a judge loop:
- **Triggering:** `skill-creator/scripts/run_eval.py` tests whether a skill's
  *description* causes Claude to trigger the skill for a set of queries. Use it for
  the triggering dimension below.
- **Behavioral runs:** skill-creator's `evals.json` + with-skill-vs-baseline subagent
  loop runs each test prompt twice (with and without the skill) so you can see what
  the skill actually changed. Use that loop to produce the transcripts you score.

This skill supplies the **rubric and test cases**; skill-creator supplies execution.

## The rubric (text labels, not numbers)

Score each dimension `bad` / `good` / `very good`. The five dimensions ARE the quality
bar — the same spec that defines a good skill (`product-skills.md`) and the static
linter:

| # | Dimension | A `very good` output… |
|---|-----------|------------------------|
| 1 | **Stayed in role** | did the one job the role line names — no scope drift into adjacent jobs |
| 2 | **Wrote into the shape** | filled the skill's defined output structure; didn't invent a new shape |
| 3 | **Terminated** | stopped at the TERMINATION condition — didn't over-produce, pad, or iterate for polish |
| 4 | **Evidence loop** (if consequential) | carried the claim/source/flip-assumption appendix where the skill requires it |
| 5 | **Triggered correctly** | fired for in-scope prompts and stayed quiet for out-of-scope ones (from run_eval.py) |

Dimension 4 applies only to skills that mandate an evidence loop (strategy, audit,
pm-super-agent, etc.). Mark `n/a` otherwise.

## Test cases

Reuse skill-creator's format. Save to `evals/{skill}-evals.json`:

```json
{
  "skill_name": "strategy",
  "evals": [
    { "id": 1, "prompt": "in-scope task that should trigger + produce", "expected_output": "what good looks like", "files": [] },
    { "id": 2, "prompt": "an over-produce trap — a narrow ask the skill is tempted to expand", "expected_output": "stays scoped, terminates", "files": [] },
    { "id": 3, "prompt": "an out-of-scope prompt that should NOT trigger this skill", "expected_output": "skill does not fire", "files": [] }
  ]
}
```

Always include at least: one in-scope task, one **over-produce trap** (Dimension 3 is
the one the static linter cannot catch — a skill with a TERMINATION line that still
rambles), and one out-of-scope prompt (Dimension 5).

## Workflow

1. Read the target skill and extract its role, output shape, and TERMINATION condition
   — these become the pass conditions for Dimensions 1–3.
2. Draft 3–5 test cases (above) if none exist. Get a quick OK on the over-produce trap.
3. Run triggering via `run_eval.py`; run behavioral cases via skill-creator's
   with/without loop.
4. Score each run on the 5 dimensions. Quote the single best and worst moment.
5. Write the scorecard.

## Output Format

```markdown
# Skill Eval — {skill} | {date}

## Scorecard
| Dimension | Label | Note |
|-----------|-------|------|
| Stayed in role | very good / good / bad | one line |
| Wrote into the shape | … | … |
| Terminated | … | … |
| Evidence loop | … / n/a | … |
| Triggered correctly | … | trigger rate X/Y in-scope, Z false-fires |

## Verdict: ship as-is | tweak description | tighten skill body | rewrite
## Worst moment: "[quote]" — which dimension it failed and why
## Recommended fix (if any): [one concrete change]
```

## TERMINATION

Stop when every test case has been scored on all five dimensions and the scorecard
yields one verdict + at most one recommended fix. One skill per invocation. Report the
scores — do NOT rewrite the evaluated skill unless the user explicitly asks; that is a
separate, human-approved step.
