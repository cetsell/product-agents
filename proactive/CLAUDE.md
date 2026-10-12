# Proactive runs

The layer that moves work from reactive (you ask) to proactive (it runs on a schedule or a trigger and hands you a decision). `runs.yml` lists every run and the mechanism that executes it; nothing in it is aspirational.

## What is wired

| Run | When | Mechanism | Needs |
|-----|------|-----------|-------|
| `freshness-audit` | Mon 09:00 UTC | GitHub Actions `freshness-check.yml` (bash, no model) | nothing |
| `artifact-grade` | Mon 09:30 UTC | GitHub Actions `artifact-grade.yml` → `/check-artifacts` → PR | `ANTHROPIC_API_KEY` secret |
| `friday-refresh` | Fri 15:00 UTC | GitHub Actions `roadmap-refresh.yml` → roadmap-keeper → PR | `ANTHROPIC_API_KEY`, `LINEAR_API_KEY` secrets |
| `premortem-high-stakes` | betting-table.md changes | hook (`scripts/hooks/bet-changed.mjs`) | nothing |
| `evidence-gate` | every strategy call, PRD, audit, Friday note | built into those skills | nothing |

The GitHub workflows skip cleanly with a notice when their secrets are missing. On public repositories GitHub disables scheduled workflows after 60 days with no repository activity; re-enable them from the Actions tab.

## What you set up once (routines)

`sprint-health`, `monday-kickoff`, `midweek-pulse`, and `friday-decide` bind to Claude Code routines, which are created in the product rather than from repo files. `routines/` holds the exact prompt for each and the steps (`/schedule`, or a desktop scheduled task for a machine you keep awake).

## Manual on purpose

- `monthly-pm-self-eval`: the skill has `disable-model-invocation: true` (a self-evaluation should not fire on its own), which also means scheduled runs cannot invoke it. The PM runs it by name on the first working day.
- `skill-health`: needs an authenticated `claude plugin eval` (see `evals/README.md`).
- `metric-breach`: team-os ships no metric monitor. If you have one, point it at a routine that runs `/data-analyst`.

## Principles every run obeys

1. **Runs without being asked.** If it only fires when someone types the command, it belongs in `.claude/skills/`, not here.
2. **Works in the open.** Output lands in the repo as a pull request or an issue, never a private window.
3. **Evidence-looped when it drives a decision** (`product/playbooks/evidence-loop.md`).
4. **A human decides.** Every run names a steward and a decision point. Automated runs never push to the default branch.
5. **Hard termination.** Every run names a checkable stop condition.

`node check-skills.mjs` fails if a run names a skill that does not exist, schedules a skill that cannot be model-invoked, or has no `binding`.
