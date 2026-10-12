# Team OS

Shared context repository for your product team. AI-agent optimized — every folder has a `CLAUDE.md` index that routes queries to the right file automatically.

## What's Here

| Folder | Contents |
|--------|----------|
| **`product/`** | Analytics definitions, roadmap, playbooks, specs index, reference material |
| **`team/`** | Roster, weekly cadence, onboarding, decision log, retros, weekly updates |
| **`gtm/`** | GTM campaign tracking and sync agendas |
| **`engineering/`** | Codebase conventions and runtime context for your application repos |
| **`templates/`** | Standardized formats for bets, decisions, call summaries, reviews, specs, eval-requirements docs |
| **`proactive/`** | Scheduled + triggered proactive runs — the operating rhythm and reactive triggers, scheduler-agnostic |
| **`.claude/`** | 28 skills, 3 agents, path-scoped rules, and hooks |

## How to Use

**For AI agents (Claude Code):** Open this repo in Claude Code. Start with `CLAUDE.md` at the root — it has the full doc index and skill routing table. Every subfolder has its own `CLAUDE.md` that explains what's inside.

**For humans:** Browse the folders above. Start with `team/roster.md` to see who's who, `team/cadence.md` for the weekly schedule, and `product/roadmap/current-bet.md` for what the team is focused on right now.

## Data Source Hierarchy

| Source | Use for |
|--------|---------|
| **Linear** (or your issue tracker) | What we're building, velocity, project health |
| **BigQuery** (or your data warehouse) | Funnels, growth, attribution, device data |
| **team-os/** (this repo) | Sprint context, bet pipeline, roster, templates, definitions |
| **Google Docs / Notion** | Specs, wiki, collaborative docs |
| **Your meeting tool** | Call notes, meeting transcripts |

## Agents (3)

Agents are multi-mode AI workflows in `.claude/agents/`. They route by intent — one agent handles many tasks.

### team-os (Opus)

The primary agent for all Team OS operations. Routes between four modes:

- **Navigate** — Find and summarize context across the repo (read-only, safe for everyone)
- **Contribute** — Format and route updates to the right file with correct structure
- **Refresh** — Pull live data from Linear to update roadmap files (steward: PM, Friday)
- **Audit** — Scan for stale content and flag drift (steward: PM, Monday)

Loads skills on demand based on what the request needs.

### roadmap-keeper (Opus)

Refreshes product roadmap files from live Linear data at sprint boundaries. Maintains `current-bet.md`, `betting-table.md`, and `experiment-roadmap.md` with completion percentages, shipped items, and freshness dates. Runs weekly on Friday after sprint planning.

### freshness-auditor (Sonnet)

Scans Team OS for stale content and flags files past their freshness window (7–30 days depending on file type). Cross-references consistency across roster, metrics, and Linear initiatives. Generates structured reports with ownership. Runs weekly on Monday.

## Operating-System Capabilities

Beyond individual skills, Team OS now has cross-cutting layers that make the whole library move faster and stay trustworthy.

### Evidence loops (decision integrity)

Consequential outputs carry an **Evidence Loop** appendix — a claim-by-claim trail of what's supported by a dated source vs. assumed, the one assumption that would flip the decision, and where a human decides. This is the guardrail that lets the team act fast on AI output without shipping confident nonsense. Method: `product/playbooks/evidence-loop.md`. For AI features, the PRD itself becomes an **eval-requirements doc** (labeled dataset + pass metrics, not prose) — `templates/eval-requirements-doc.md`. Run on demand with `/evidence-loop`; pressure-test plans for failure modes with `/premortem`.

### Proactive layer (`proactive/`)

`proactive/runs.yml` lists every run that happens without being asked and the mechanism that executes it: GitHub Actions for the Monday freshness check, Monday artifact grade, and Friday roadmap refresh (each opens an issue or a pull request); Claude Code routines for the weekly cadence notes (prompts in `proactive/routines/`); a hook that prompts `/premortem` when the betting table changes. See `proactive/CLAUDE.md`.

## Quality

Two layers. **Static:** `node check-skills.mjs --strict` lints every skill and agent (frontmatter fields, outcome line, TERMINATION, 300-line cap, preload and schedule references) and runs in CI with the scrub check. **Behavioral:** `evals/` holds three cases per core skill (in-scope, over-produce trap, out-of-scope) in `claude plugin eval` format, run against a fictional product with no MCP servers.

Latest behavioral run: **2026-10-12** — [summary](product/analysis/skill-evals/2026-10-12/summary.md), raw outputs in the same folder. Method: subagent runs, one per case, judged by a separate Opus 5.5 subagent; triggering measured by a description-routing proxy. `claude plugin eval` has not been run yet (see the summary).

| Skill | Grader pass (in-scope / trap) | Terminated (in-scope / trap) | Verdict |
|-------|-------------------------------|------------------------------|---------|
| cadence | pass / pass | good / good | tighten skill body |
| pm-super-agent | pass / pass | very good / very good | tighten skill body |
| issue-creator | pass / pass | very good / very good | ship as-is |
| sprint-health | pass / pass | very good / very good | ship as-is |
| strategy | pass / pass | good / very good | tighten skill body |
| audit | pass / pass | good / good | tighten skill body |
| eval-runner | pass / pass | very good / very good | ship (after one fix) |
| evidence-loop | pass / pass | very good / very good | ship as-is |

Routing proxy: 24/24 prompts routed to the right skill (or away from it for out-of-scope prompts). Fixes applied after the run are listed in the summary and have not been re-evaluated.

## Skills (28), by the outcome they move

Each skill opens with an **Outcome** line: the KPI, decision, or cycle time it moves, and the evidence it leaves behind. Invoke with `/skill-name`; Claude also loads a skill on its own when your request matches its description.

### Acquisition & activation

| Skill | Moves | Leaves behind |
|-------|-------|---------------|
| `/copywriting` | the page's primary conversion rate (visitor to signup, trial, demo, or purchase) | paste-ready copy, the metric it targets, and a test stub that proves it beat the old copy, in `gtm/copy/` |
| `/email-sequence` | the activation, conversion, or reactivation rate of the audience entering the sequence (retention or recovery rate for dunning and win-back) | a ready-to-load sequence spec with full copy in `gtm/email/` |
| `/marketing-strategy-pmm` | the win rate, landing-to-signup or demo conversion, or feature adoption that the positioning or launch is meant to move | one dated artifact in `product/analysis/strategy/` with a target metric, a baseline, and the test that would prove it |
| `/onboarding-cro` | activation rate and time to activation, with Day 7 retention as the check that activation was real | a ranked change list in chat, with the top test ready for `/ab-test-setup` |
| `/page-cro` | page conversion rate to the primary goal (signup, demo, purchase), with downstream activation or lead quality as the guardrail | a ranked change list in chat, with the top test ready for `/ab-test-setup` |
| `/popup-cro` | popup submission rate (impressions to submissions), with bounce and close rate as guardrails | a ranked change list in chat, with the top test ready for `/ab-test-setup` |
| `/programmatic-seo` | non-brand organic sessions and the signups they produce (indexed pages x clicks per page x conversion rate) | a playbook choice, template, data model, sample pages, and rollout test plan in `gtm/pseo/` |
| `/referral-program` | share of new customers from referral and referral CAC vs. other channels, via referral rate and referred-user conversion | a program design in chat, with its first test logged to `product/roadmap/experiment-roadmap.md` via `/ab-test-setup` |
| `/signup-flow-cro` | signup completion rate (form started to account created), with activation rate as the guardrail | a ranked change list in chat, with the top test ready for `/ab-test-setup` |

### Retention

| Skill | Moves | Leaves behind |
|-------|-------|---------------|
| `/churn-prevention` | monthly logo and revenue churn, via cancel-flow save rate, dunning recovery rate, or at-risk save rate | a prioritized churn plan in chat, with its tests logged to `product/roadmap/experiment-roadmap.md` via `/ab-test-setup` |

### Monetization

| Skill | Moves | Leaves behind |
|-------|-------|---------------|
| `/paywall-upgrade-cro` | free-to-paid or trial-to-paid conversion rate, with post-upgrade churn and free-user retention as guardrails | a paywall review and ranked change list in chat, with the top test ready for `/ab-test-setup` |
| `/pricing-strategy` | ARPU and paid conversion (or expansion revenue), with signup volume and churn as guardrails | a pricing recommendation at `product/analysis/strategy/pricing-{topic}-{date}.md` |

### Velocity

| Skill | Moves | Leaves behind |
|-------|-------|---------------|
| `/audit` | shrinks the lag between shipped and measured, and the blockers that recur week after week | a dated report in `product/analysis/audit/` where every finding has two sources and an owner |
| `/cadence` | holds the idea-to-measured loop to one week by forcing an iterate-or-swing call on the bet every Friday | dated notes in `team/weekly-updates/` that the next week builds on |
| `/issue-creator` | tickets an engineer can start in ten minutes, each instrumented so the shipped work can be read against its hypothesis | drafted (and, on approval, created) tickets with problem, criteria, hypothesis, and analytics |
| `/pm-super-agent` | idea to a buildable, measurable PRD in one session, scoped to the smallest version that proves the bet | a PRD in `product/specs/` with an evidence appendix and a proposed ticket list |
| `/senior-prompt-engineer` | prompt changes ship as reviewed diffs with eval cases attached, so AI-feature iterations take hours instead of guesswork cycles | an audit, design, or debug document in `product/analysis/prompts/` plus the diff |
| `/sprint-health` | stale tickets, blockers, and launch-gate gaps are caught while there is still time in the sprint to fix them | a dated sweep in `team/weekly-updates/` where every flag has an owner |

### Decision quality

| Skill | Moves | Leaves behind |
|-------|-------|---------------|
| `/ab-test-setup` | ship, kill, and iterate calls rest on a pre-registered hypothesis, metric, and sample size instead of opinion, and the idea-to-measured-result loop has a known end date | a test plan in chat and, if the user asks, a row in `product/roadmap/experiment-roadmap.md` |
| `/check-artifacts` | keeps plans and baselines fresh enough to decide on (two weeks for plans, 30 days for baselines) | an A–F grade and an ordered fix list |
| `/data-analyst` | every product call cites a sourced, dated number instead of a guess | an analysis in `product/analysis/data/` with the queries that produced each number |
| `/eval-runner` | AI-feature variants ship or die on measured pass rate against a written bar, not on a demo | an eval report with judge model ID, agreement, and transcripts |
| `/evidence-loop` | no assumption reaches a stakeholder dressed as a fact | an evidence table appended to the artifact (or `product/analysis/evidence/`) |
| `/marketing-psychology` | fewer tests built on "it feels right"; every psychology-driven change ships as a hypothesis with a metric and a predicted direction | a mechanism card in chat, ready to hand to `/ab-test-setup` and log in `product/roadmap/experiment-roadmap.md` |
| `/monthly-pm-self-eval` | raises kill rate and hypothesis discipline month over month by naming one behavior to change | a dated scorecard in `product/analysis/monthly/` |
| `/premortem` | failure modes surface before money and weeks are committed, while the plan can still change | an HTML report and transcript in `product/analysis/premortem/` |
| `/skill-eval` | the library's quality bar is measured and visible, so the team knows which skills to trust unattended | a dated scorecard in `product/analysis/skill-evals/` |

### Vision & strategy

| Skill | Moves | Leaves behind |
|-------|-------|---------------|
| `/strategy` | sharpens which bet the team makes next and why, with the assumption that would flip it named up front | a ranked call in `product/analysis/strategy/` with an evidence appendix |

## MCP servers (optional)

Every skill runs with zero MCP servers connected. Servers make the data step automatic; without them, a skill asks you to paste an export (or writes the SQL for you to run) and continues. `.mcp.json` declares three optional servers. Claude Code asks you to approve each project server on first launch; decline any you do not use.

| Server | Env vars | Used by |
|--------|----------|---------|
| `linear` (issue tracker) | `LINEAR_MCP_URL` (defaults to Linear's hosted server; sign in via `/mcp`) | cadence, sprint-health, audit, strategy, check-artifacts, monthly-pm-self-eval, pm-super-agent, issue-creator, team-os agent (Refresh) |
| `bigquery` (warehouse) | `BIGQUERY_PROJECT`, optional `BIGQUERY_WRITE_MODE` (defaults to `blocked`) | data-analyst |
| `meeting-notes` | `MEETING_NOTES_MCP_URL` (your meeting-notes tool's MCP endpoint) | cadence, sprint-health, audit |

**MCP-free skills** (never call a server): evidence-loop, premortem, eval-runner, skill-eval, senior-prompt-engineer, and every marketing and CRO skill.

## What's NOT Here

- Source code (lives in your application repos)
- API keys or credentials (use environment variables)
- Google Docs or Notion content (linked, not duplicated)
- Meeting recordings or transcripts (they stay in your meeting-notes tool)

## Contributing

See `CONTRIBUTING.md` for how to add or update content. Three methods: GitHub web editor, CLI, or Claude Code agent.
