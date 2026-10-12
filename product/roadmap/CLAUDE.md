# Roadmap

Sprint bets, pipeline, experiment roadmap, and annual strategy. These are PM tools for managing product priorities.

## Files

| File | What it is | When to read |
|------|-----------|--------------|
| `roadmap.md` | Rolling roadmap: Now (6 weeks) / Next (6 months) / Later, plus Not doing | "What's the plan?" or before a leadership review |
| `current-bet.md` | Active sprint: one priority, success criteria, owners | "What's the current priority?" or "What should I focus on?" |
| `betting-table.md` | Full bet pipeline: active, queued, shipped, killed | "What's next?" or "What's in the pipeline?" |
| `experiment-roadmap.md` | Running and queued experiments with hypotheses and read-out dates | "What experiments are planned?" or "What are we testing next?" |
| `product-strategy.md` | Annual product strategy and direction | Strategic context, annual goals |

## Current State

<!-- Update this section each sprint with a 2-3 line status summary. Delete this comment when you fill it in. -->

- **This week:** [Brief description of current focus]
- **Next gate:** [Next milestone or decision point]
- **Post-[milestone]:** [What comes after]

## Proactive Trigger

When a new high-stakes bet enters `betting-table.md` (or a pricing change / launch
plan is being committed), run `/premortem` on it and attach the report before the bet
is committed. This is a reactive run defined in `proactive/runs.yml` (`premortem-high-stakes`).
The PM signs off on the revised plan as the decision point.

## Update Cadence

- `current-bet.md`: Updated Friday (next week) + Thursday (status check)
- `betting-table.md`: Updated when bet status changes; reviewed weekly
- `experiment-roadmap.md`: Updated when experiments launch, read out, or are killed
- `product-strategy.md`: Reviewed quarterly
