---
name: skill-eval
description: >
  Behavioral eval for the team-os skill library. Runs a skill against its eval cases
  and scores the output on five dimensions (stayed in role, wrote into the shape,
  terminated, evidence loop, triggered correctly), then writes a dated scorecard with
  one verdict.
when_to_use: >
  Use for "eval this skill", "skill eval", "is this skill any good", "test the skill",
  "did the skill drift", "benchmark the skill". For the static file check run `node
  check-skills.mjs`; to score an AI product feature use /eval-runner.
argument-hint: "[skill name]"
allowed-tools: Read, Grep, Glob, Write, Bash, Agent
model: claude-opus-5-5
effort: high
metadata:
  version: 2.0.0
---

# Skill Eval (behavioral)

**Role:** Skill evaluator. You judge whether a skill *behaves* to the team-os quality bar, not whether its file is shaped right (that is the static linter `check-skills.mjs`, Layer 1). You run the skill, read its output, and score it. You do not rewrite the skill unless explicitly asked.
**Outcome:** Decision quality — the library's quality bar is measured and visible, so the team knows which skills to trust unattended. **Leaves behind:** a dated scorecard in `product/analysis/skill-evals/`.
**Output:** `product/analysis/skill-evals/{skill}-{YYYY-MM-DD}.md`

## The rubric (text labels, not numbers)

Score each dimension `bad` / `good` / `very good`.

| # | Dimension | A `very good` output… | Grader in `evals/` |
|---|-----------|------------------------|--------------------|
| 1 | **Stayed in role** | did the one job the role line names; no drift into adjacent jobs | `llm` (shape-and-scope) |
| 2 | **Wrote into the shape** | filled the skill's output structure at its output path | `file_exists` + `llm` |
| 3 | **Terminated** | stopped at the TERMINATION condition; the over-produce trap stayed scoped | `llm` on the trap case |
| 4 | **Evidence loop** | carried the claim/source/flip-assumption appendix where the skill requires it (`n/a` otherwise) | `llm` |
| 5 | **Triggered correctly** | fired for in-scope prompts, stayed quiet for the out-of-scope prompt | `tool_used: Skill` (`max: 0` on out-of-scope) |

## Test cases

Each core skill has a suite in `evals/{skill}/`, one folder per case, in `claude plugin eval` format (`case.yaml` with prompt and graders). Every suite has at least:

1. an **in-scope** task,
2. an **over-produce trap**: a narrow ask the skill is tempted to expand (Dimension 3 is the one the static linter cannot catch), and
3. an **out-of-scope** prompt that must not trigger the skill (Dimension 5).

All cases run in a workspace built by `evals/_fixture/scaffold.sh`: the repo template plus a fictional product ("Acme Notes") with filled context, roadmap, and exports in `inputs/`, and no MCP servers. To add a case, copy an existing folder and edit `case.yaml`.

## Workflow

1. Read the target skill: its role line, output shape, and TERMINATION condition are the pass conditions for Dimensions 1–3.
2. If `evals/{skill}/` does not exist, draft the three cases above and get a quick OK on the trap.
3. **Run.** Preferred: from the repo root,
   `claude plugin eval . --case "{skill}-*" --scaffold --allow-tools Write Edit --trust-plugin --judge-model claude-opus-5-5`
   (the default judge is Haiku; use a judge at least as strong as the model the skill runs on — `product/playbooks/model-selection.md`).
   Fallback when the CLI cannot run (not authenticated, or no `claude` binary): build each workspace with `scaffold.sh`, run each in-scope and trap case in a subagent that reads and follows the SKILL.md with no MCP tools, then judge each output in a separate subagent against the case's `llm` criteria. Test triggering by giving a fresh subagent the skill listing (name + description + when_to_use for every skill) and the case prompts, and recording which skill it picks. Label the scorecard "fallback method: subagent runs; triggering is a description-routing proxy".
4. Score each case on the five dimensions. Quote the single worst moment.
5. Write the scorecard.

## Output

```markdown
# Skill Eval — {skill} | {date}

Method: {claude plugin eval vX, runs per case | fallback: subagent runs}
Runner model: {model} · Judge model: {model}

| Dimension | Label | Note |
|-----------|-------|------|
| Stayed in role | | |
| Wrote into the shape | | |
| Terminated | | trap case: {name} |
| Evidence loop | / n/a | |
| Triggered correctly | | in-scope X/Y, false fires Z |

## Verdict: ship as-is | tweak description | tighten skill body | rewrite
## Worst moment: "{quote}" — dimension it failed and why
## Recommended fix (if any): {one concrete change}
```

Record failures as failures. A scorecard that rounds a `bad` up is worse than no scorecard.

## TERMINATION

Stop when every case for the skill is scored on all five dimensions and the scorecard yields one verdict and at most one recommended fix. One skill per invocation. Do not rewrite the evaluated skill unless the user explicitly asks; that is a separate, human-approved step.
