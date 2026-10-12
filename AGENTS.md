# Team OS — instructions for any coding agent

A product team's shared operating layer: context, skills, and proactive runs that help the team get more out of AI on the outcomes that matter (KPIs, vision, pace). Claude Code reads this file through `CLAUDE.md`; other agents read it directly. Skills are plain markdown in `.claude/skills/<name>/SKILL.md`: any agent can follow one by reading it.

## Read first

1. `product/context.md` — North Star, pillars, baselines, teams, which tool answers what. Every strategy, cadence, audit, and analysis skill starts here.
2. The `CLAUDE.md` in whatever folder you are about to read.

## Doc index

| Query | Path |
|-------|------|
| North Star, pillars, baselines, teams, tools | `product/context.md` |
| Metric definitions and formulas | `product/analytics/metrics-dictionary.md` |
| Warehouse tables and starter SQL | `product/analytics/bigquery-reference.md` |
| Funnel stages and events | `product/analytics/funnel-definitions.md` |
| Known data bugs and workarounds | `product/analytics/data-quality-log.md` |
| This week's bet | `product/roadmap/current-bet.md` |
| Bet pipeline (active, queued, completed, killed) | `product/roadmap/betting-table.md` |
| Rolling roadmap (Now / Next / Later) | `product/roadmap/roadmap.md` |
| Experiments and read-outs | `product/roadmap/experiment-roadmap.md` |
| Annual strategy | `product/roadmap/product-strategy.md` |
| PM principles the skills grade against | `product/playbooks/pm-toolkit.md` |
| Evidence-loop method | `product/playbooks/evidence-loop.md` |
| Which model for which skill | `product/playbooks/model-selection.md` |
| Ticket templates and quality bar | `product/playbooks/linear-guidelines.md` |
| Past skill outputs (dated) | `product/analysis/` |
| Specs index | `product/specs/CLAUDE.md` |
| Customer insights | `product/customer-insights/` |
| Decisions | `team/decisions/decisions.md` |
| Roster and rituals | `team/roster.md`, `team/cadence.md` |
| Weekly cadence notes | `team/weekly-updates/` |
| GTM campaigns and skill outputs | `gtm/` |
| App-repo context for product work | `engineering/` |
| Artifact templates (`{{placeholders}}`) | `templates/` |
| Scheduled and reactive runs | `proactive/runs.yml` |
| Skill eval suites | `evals/` |

## Rules

- Every data point has a date and a source. No undated metrics or status claims; content older than 14 days may be stale.
- Consequential outputs (strategy calls, PRDs, audit findings, metrics cited to stakeholders) end with an Evidence Loop appendix (`product/playbooks/evidence-loop.md`).
- Never invent data. If a source is unavailable, say which one and continue with what you have, or stop.
- Never create, update, or assign issue-tracker tickets without explicit approval of the proposed list.
- Log a decision in `team/decisions/decisions.md` when it is made, not when it ships.
- Propose changes; the human reviews and commits. Automated runs open pull requests, never push to the default branch.
- `product/roadmap/` and `product/playbooks/` are PM tools, not team-mandated process.

## Definition of done (repo edition)

A bet is not shipped until: its row moves in `betting-table.md`; any decision is in `decisions.md`; changed metric definitions are in `metrics-dictionary.md`; experiment read-outs are in `experiment-roadmap.md`.

## Checks

```bash
node check-skills.mjs --strict     # skill and agent conformance
node scripts/scrub-check.mjs       # no install-specific context
```
