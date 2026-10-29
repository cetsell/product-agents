# Team Roster

*Add your team here. Slack handles make it easy for AI agents to know who to reference.*

| Name | Role | Slack | Area |
|------|------|-------|------|
| [Name] | CEO | @[handle] | |
| [Name] | Engineering Lead | @[handle] | |
| [Name] | Engineering: Front End | @[handle] | |
| [Name] | Engineering: Back End | @[handle] | |
| [Name] | Design | @[handle] | |
| [Name] | Product | @[handle] | |
| [Name] | Data/Analytics | @[handle] | |
| [Name] | GTM Lead | @[handle] | |
| [Name] | Marketing | @[handle] | |

## Agents

Permanent agents and scheduled runs own areas of this repo the way people own areas of the product. Each has a name, a memory, a steward who reviews its work, and commitments it must close or carry (`team/active/commitments.md`).

| Agent / run | Owns | Runs | Memory | Steward |
|-------------|------|------|--------|---------|
| `roadmap-keeper` | `product/roadmap/*` factual fields | Friday (`friday-refresh`) | project memory: what it changed and what it could not reach | PM |
| `freshness-auditor` | Consistency and freshness of every dated file | Monday (`freshness-audit`, `artifact-grade`) | project memory: what was stale and for how long; repeat offenders | PM |
| `product-agents` | Routing; Navigate / Contribute / Refresh / Audit | On request | project memory: which files were touched for which request | PM |
| `/judge` (`questions-triage`) | Verdicts in `team/decisions/questions.md` | Daily when a row is open | the record itself (`principles.md` corrections) | PM clears `held` |
| `/triage` (`signals-triage`) | `product/signals/` footers and `team/active/triage-*` | Daily when a signal lands | processed footers on the files | PM |
| `/cadence` (`monday-kickoff`, `midweek-pulse`, `friday-decide`) | `team/weekly-updates/`, proposed principles | Mon / Wed / Fri | the previous notes it builds on | PM |
