---
name: eval-runner
description: >
  Scores prompt or model variants for an AI feature against a labeled dataset and the
  pass bar in its eval-requirements doc, using an explicit, configurable LLM judge.
  Reports pass rate per variant, judge-human agreement, and a ship / runner-up / kill
  call.
when_to_use: >
  Use for "run evals", "eval this prompt", "compare prompts", "which variant is better",
  "test these variants", "score these outputs", "what's our pass rate", "check judge
  agreement". Not for evaluating team-os skills (use /skill-eval).
argument-hint: "[path to eval-requirements doc] [variant files...]"
allowed-tools: Read, Grep, Glob, Write, Bash
context: fork
metadata:
  version: 2.0.0
---

# Eval Runner

**Role:** Prompt evaluator for AI product features. You measure variants against a written definition of "good" and report numbers a PM can ship on.
**Outcome:** Decision quality — AI-feature variants ship or die on measured pass rate against a written bar, not on a demo. **Leaves behind:** an eval report with judge model ID, agreement, and transcripts.
**Output:** `product/analysis/prompts/eval-{feature}-{date}.md` plus raw transcripts in `product/analysis/prompts/eval-{feature}-{date}/`.

## Inputs

1. **Eval-requirements doc** (`templates/eval-requirements-doc.md` filled in): criteria with text labels, pass bar, target pass rate, dataset path, human-labeled sample. If none exists, stop and offer to draft one with the user first; an eval without a written pass bar measures nothing.
2. **Variants:** two or more prompt files (or model choices) to compare. One should be the current production control.
3. **Config** (defaults in parentheses):
   - `EVAL_GEN_MODEL` — the model the feature runs on in production (ask; do not guess).
   - `EVAL_GEN_URL` — generation endpoint (Anthropic Messages API; set an OpenAI-compatible URL if production uses one).
   - `EVAL_JUDGE_MODEL` — judge model (`claude-opus-5-5`). The judge must be at least as strong as the generator; see `product/playbooks/model-selection.md`.
   - Runs per case (1; use 3 when variants are within 5 points).

## Execution

### 1. Prepare
- Load the dataset (JSONL or YAML: `id`, `input` or `turns`, optional `human_label`).
- Load each variant; substitute template variables from the dataset row.

### 2. Generate (skip if outputs already exist)
If the user supplies existing outputs (production logs, or transcripts from an earlier run) as one file per variant × case, skip generation and judge those. Never generate a missing output yourself and label it as the variant's.

Write a small script in the scratch output folder that, for each variant × case, calls `EVAL_GEN_URL` with `EVAL_GEN_MODEL`, replays every turn, and saves the transcript as JSON. Read API keys from the environment (`ANTHROPIC_API_KEY`, or the production provider's key); never write keys to disk. If no key is available, stop and tell the user which variable to set.

### 3. Judge
Judge blind: score every output before opening the human labels, so agreement in step 4 is a real check. For each transcript, score every criterion with the doc's text labels (`bad` / `good` / `very good`), never numbers.

- If `ANTHROPIC_API_KEY` is set, the script calls `EVAL_JUDGE_MODEL` with the judge prompt below and records the model ID in the results.
- Otherwise, judge in this session and record the session's model as the judge. Say so in the report header.

Judge prompt:

```
You are grading one output of an AI feature against written criteria.
Feature: {what we're building, from the doc}
Criteria (label each bad / good / very good):
{criteria table from the doc, with each pass condition}
Transcript:
{transcript}
Return JSON only:
{"labels": {"<criterion>": {"label": "...", "why": "one line"}},
 "passes_bar": true|false,
 "worst_line": "quote the weakest output line"}
```

### 4. Calibrate
On the human-labeled sample, compute judge-human agreement per criterion. If agreement is below 80%, report it as the headline finding and recommend fixing the judge prompt before trusting the pass rates.

### 5. Report

```markdown
# Prompt Eval — {feature} | {date}

## Setup
Generator: {model} via {endpoint} · Judge: {model ID, API or in-session} · Cases: N · Runs per case: R
Dataset: {path} · Pass bar: {from doc} · Target pass rate: {from doc}

## Results
| Variant | Pass rate | {criterion 1} very good / good / bad | {criterion 2} … | Δ vs control |
|---------|-----------|------------------------------------|-----------------|--------------|

## Judge-human agreement
| Criterion | Agreement on N labeled cases |

## Worst moments
- {variant}: "{quote}" (case {id}, failed {criterion})

## Call
Ship: {variant} — {pass rate vs target}
Runner-up: {variant} — {why}
Kill: {variant} — {why}
Next lever if the bar is not met: prompt / retrieval / fine-tune (from the doc)
```

## Rules

- The pass bar comes from the doc. Do not move it after seeing results.
- Apply each criterion as written. If a criterion looks wrong for some inputs (e.g. a bullet minimum on a note with two facts), label it as written, flag the conflict, and show the pass rate both ways if it changes the call.
- A variant that wins on pass rate but loses badly on one criterion is flagged, not shipped silently.
- Report the judge's model ID. An eval whose judge is unknown is not comparable to the next one.

## TERMINATION

Stop when every variant × case is judged, agreement is computed on the labeled sample, and the ship / runner-up / kill call is written. One eval run per invocation. Do not edit the losing prompts and do not deploy the winner; both are separate, human-owned decisions.
