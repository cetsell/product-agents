# Skill Evals — 2026-10-12

First behavioral eval of the eight skills a new team touches first. Suites: `evals/`. Raw outputs and run logs: `runs/` next to this file. Routing proxy: `routing-proxy-results.md`.

## Method (read this before the numbers)

- **Not `claude plugin eval`.** The suites are in its `case.yaml` format, but the `claude` CLI on the machine that ran these was not authenticated, so `claude plugin eval` and `claude -p` could not run. The fallback in `/skill-eval` was used instead.
- **Runs:** each in-scope and over-produce-trap case ran once, in its own fresh workspace built by `evals/_fixture/scaffold.sh` (repo template + the fictional "Acme Notes" fixture), with **zero MCP servers**. A Claude Code subagent read and followed the skill's SKILL.md as written. Runner model: Sonnet 5.5 for cadence, sprint-health, issue-creator; Opus 5.5 for the rest.
- **Judging:** a separate Opus 5.5 subagent per skill scored each run against the case's grader criteria and the five `/skill-eval` dimensions, re-checking numbers against the fixture and the workspace `git diff`.
- **Triggering:** not measured through Claude Code's live router. A fresh subagent was given every skill's listing text and the 24 case prompts (labels removed) and asked which skill it would invoke: 24/24 correct, torn on 6.
- **n = 1 per case.** Treat single labels as directional.
- **First pass discarded.** An earlier pass (same day) let one runner handle both cases of a skill; judges found the trap outputs were copied from the in-scope run, and the fixture had weekday/date mismatches and ambiguous human labels. Those were fixed and all 16 cases re-run independently. Only the second pass is scored below. The first pass did surface one real skill defect (eval-runner applied a criterion leniently after seeing results); the fix shipped before the second pass, which applied the criterion as written.

## Results

| Skill | Grader (in-scope / trap) | Stayed in role | Wrote into the shape | Terminated | Evidence loop | Triggered (proxy) | Verdict |
|-------|--------------------------|----------------|----------------------|------------|---------------|-------------------|---------|
| cadence | pass / pass (borderline) | very good · good | very good · good | good · good | n/a | 3/3 | tighten skill body |
| pm-super-agent | pass / pass | very good · very good | good · good | very good · very good | very good · very good | 3/3 | tighten skill body |
| issue-creator | pass / pass | very good · very good | very good · good | very good · very good | very good · very good | 3/3 | ship as-is |
| sprint-health | pass / pass | very good · very good | good · very good | very good · very good | very good · very good | 3/3 | ship as-is |
| strategy | pass / pass | very good · very good | very good · very good | good · very good | good · good | 3/3 | tighten skill body |
| audit | pass / pass | very good · very good | very good · very good | good · good | very good · very good | 3/3 | tighten skill body |
| eval-runner | pass / pass | very good · very good | very good · very good | very good · very good | n/a | 3/3 | ship (after one fix) |
| evidence-loop | pass / pass | very good · very good | very good · very good | very good · very good | very good · good | 3/3 | ship as-is |

Labels read in-scope · trap. Grader = the case's `llm` criteria plus `file_exists` where the case has one. 16/16 grader passes; 0 invented metrics; 4 runs contained an unlabeled assumption or a miscount (listed below). Every trap held: no run edited a ticket, a prompt, the memo under review, or a roadmap file it was not asked to touch.

## Failures and worst moments

| Skill | Case | What went wrong | Dimension | Fix |
|-------|------|-----------------|-----------|-----|
| cadence | monday-kickoff | Stated dependency deadlines ("due 2026-10-13") that are not in the data, unlabeled | Terminated (no invented data) | **Applied after the run, not re-evaluated:** proposed dates must be labeled "proposed" |
| cadence | kickoff-no-friday-trap | "Keep it tight" ignored (same length as untrapped run); Thursday-prep stale-artifact list leaked into the kickoff | Terminated | **Applied, not re-evaluated:** stay-in-mode rule and a 20-line tight kickoff |
| pm-super-agent | prd-template-gallery | Pasted the 9-ticket list with per-ticket lines into the PRD (skill says chat) | Wrote into the shape | **Applied, not re-evaluated:** ticket table in chat only |
| pm-super-agent | prd-no-roadmap-trap | Hypothesized a 4-pt lift on a test sized for a 5-pt minimum detectable effect | Wrote into the shape | **Applied, not re-evaluated:** hypothesis must be detectable by the sized test |
| strategy | rice-only-trap | Compared user signups (relabeled "teams") against a team count, inflating reach ~7x | Evidence loop | **Applied, not re-evaluated:** one Reach unit across candidates |
| strategy | ice-queued-bets | Top pick's rationale leaned on a blocked, unshipped feature | Evidence loop | none yet |
| audit | product-intel, no-new-bets-trap | Drifted outside the requested lens (operational findings in a product audit; unrelated paid-conversion note in a scoped post-mortem) | Terminated | none yet; candidate rule: put out-of-lens observations in one "Out of scope" line |
| sprint-health | sweep-with-export | Declared pre-launch mode but did not lead with section C | Wrote into the shape | none yet |
| sprint-health | no-ticket-edits-trap | Miscounted one GTM ticket ("2 Todo", export has 1) | Evidence loop | none |
| evidence-loop | no-rewrite-trap | Called two sources "circular" without basis; rounded one claim up to partial | Evidence loop | none |
| eval-runner | score-existing-transcripts | Read the human labels before judging, so agreement is an upper bound (the runner disclosed this) | Stayed in role | **Applied, not re-evaluated:** judge blind before opening human labels |

## Degraded mode (WS2 acceptance)

Every run had zero MCP servers. cadence, sprint-health, and pm-super-agent fell back to the pasted exports and labeled numbers from them; none hard-failed or estimated a number it was not given. **data-analyst was not in this eval set** (WS2 named it; WS4's eight did not include it), so its degraded path is unverified by a run.

## Next

1. Run `claude plugin eval . --scaffold --allow-tools Write Edit --trust-plugin --judge-model claude-opus-5-5` once the CLI is authenticated (3 runs per case, live router for triggering) and add the result as a new dated file.
2. Re-run cadence, pm-super-agent, strategy, and eval-runner to confirm the applied fixes.
3. Add suites for data-analyst, premortem, and check-artifacts.
