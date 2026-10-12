# Team OS

A shared operating layer that helps a product team get more out of AI on the outcomes that matter: the KPIs, the vision, and the pace. It gives Claude Code your team's context, 29 skills that each move a named metric or decision, and proactive runs that keep the weekly loop from idea to measured result to one week.

## Install (60 seconds)

**As a plugin** (skills and agents only, nothing to fork):

```bash
claude plugin marketplace add cetsell/product-agents
claude plugin install team-os@product-agents
```

Then run `/team-os:team-os-guide setup` in your project: it copies `product/context.md`, the roadmap templates, and the output folders the skills write to, and walks you through filling in the context. Skills are namespaced (`/team-os:cadence`, `/team-os:strategy`).

**As your team's repo** (everything: hooks, rules, GitHub workflows, evals):

```bash
gh repo fork cetsell/product-agents --clone && cd product-agents
claude
```

Fill in `product/context.md` first; every strategy, cadence, and analysis skill reads it.

## Three layers

| Layer | What | Where |
|-------|------|-------|
| **Context** | North Star, pillars, dated baselines, teams, and which tool answers which question, in one file the skills read first; roadmap, betting table, metrics, decisions | `product/context.md`, `product/`, `team/` |
| **Skills** | 29 skills, each opening with the outcome it moves and the evidence it leaves behind; 3 agents for navigating, refreshing, and auditing the repo | `.claude/skills/`, `.claude/agents/` |
| **Proactive** | Runs that fire on a schedule or a trigger and hand a human a decision as a pull request or issue | `proactive/runs.yml`, `.github/workflows/`, `.claude/settings.json` |

Guardrails that make the layers safe to run fast: every consequential output carries an **Evidence Loop** appendix (`product/playbooks/evidence-loop.md`); issue-tracker writes always ask a human first; automated runs never push to the default branch.

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

## Models

Each skill and agent pins its model and effort in frontmatter (full IDs, so Bedrock and Vertex teams get the same models the evals ran on). Details and when to change a row: `product/playbooks/model-selection.md`.

| Task | Model | Effort |
|------|-------|--------|
| Artifact grading, freshness audit | `claude-haiku-5-5` | low |
| Cadence notes, sprint sweeps, tickets, data pulls, CRO and copy | `claude-sonnet-5-5` | medium |
| Strategy, PRDs, audits, premortems, evidence loops, pricing, positioning | `claude-opus-5-5` | high |
| LLM-as-judge (`/eval-runner`, `/skill-eval`) | `claude-opus-5-5` | high |

## Skills (29), by the outcome they move

Invoke with `/skill-name` (or `/team-os:skill-name` as a plugin); Claude also loads a skill when your request matches its description. Routing table: `.claude/rules/skill-routing.md`.

### Velocity

| Skill | Moves | Leaves behind |
|-------|-------|---------------|
| `/audit` | shrinks the lag between shipped and measured, and the blockers that recur week after week | a dated report in `product/analysis/audit/` where every finding has two sources and an owner |
| `/cadence` | holds the idea-to-measured loop to one week by forcing an iterate-or-swing call on the bet every Friday | dated notes in `team/weekly-updates/` that the next week builds on |
| `/issue-creator` | tickets an engineer can start in ten minutes, each instrumented so the shipped work can be read against its hypothesis | drafted (and, on approval, created) tickets with problem, criteria, hypothesis, and analytics |
| `/pm-super-agent` | idea to a buildable, measurable PRD in one session, scoped to the smallest version that proves the bet | a PRD in `product/specs/` with an evidence appendix and a proposed ticket list |
| `/senior-prompt-engineer` | prompt changes ship as reviewed diffs with eval cases attached, so AI-feature iterations take hours instead of guesswork cycles | an audit, design, or debug document in `product/analysis/prompts/` plus the diff |
| `/sprint-health` | stale tickets, blockers, and launch-gate gaps are caught while there is still time in the sprint to fix them | a dated sweep in `team/weekly-updates/` where every flag has an owner |
| `/team-os-guide` | a new team goes from install to its first useful, measured run in one session instead of a week of reading | a filled-in `product/context.md` (setup) or a one-line routing answer |

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

## MCP servers (optional)

Every skill runs with zero MCP servers connected. Servers make the data step automatic; without them, a skill asks you to paste an export (or writes the SQL for you to run) and continues. `.mcp.example.json` declares three optional servers; `cp .mcp.example.json .mcp.json` to enable them, and Claude Code asks you to approve each on the next launch. The file ships as an example on purpose: a root `.mcp.json` would also be auto-registered for everyone who installs the plugin, and a plugin manifest cannot opt out of it.

| Server | Env vars | Used by |
|--------|----------|---------|
| `linear` (issue tracker) | `LINEAR_MCP_URL` (defaults to Linear's hosted server; sign in via `/mcp`) | cadence, sprint-health, audit, strategy, check-artifacts, monthly-pm-self-eval, pm-super-agent, issue-creator, team-os agent (Refresh) |
| `bigquery` (warehouse) | `BIGQUERY_PROJECT`, optional `BIGQUERY_WRITE_MODE` (defaults to `blocked`) | data-analyst |
| `meeting-notes` | `MEETING_NOTES_MCP_URL` (your meeting-notes tool's MCP endpoint) | cadence, sprint-health, audit |

**MCP-free skills** (never call a server): evidence-loop, premortem, eval-runner, skill-eval, senior-prompt-engineer, and every marketing and CRO skill.

## Agents (3)

| Agent | Model | What it does |
|-------|-------|--------------|
| `team-os` | Sonnet 5.5 | Routes by intent: Navigate (read-only), Contribute (route an update to the right file), Refresh (tracker → `product/roadmap/`), Audit (freshness and drift, report only). Preloads `evidence-loop` and `check-artifacts`. |
| `roadmap-keeper` | Sonnet 5.5 | Friday refresh procedure: factual fields only, in its own worktree, ends in a pull request. |
| `freshness-auditor` | Haiku 5.5 | Monday audit procedure with project memory, so repeat offenders show up. |

## Proactive runs

| Run | When | Mechanism |
|-----|------|-----------|
| Freshness check | Mon | GitHub Actions, no API key; opens an issue |
| Artifact grade (`/check-artifacts`) | Mon | GitHub Actions + `ANTHROPIC_API_KEY`; opens a PR |
| Roadmap refresh (roadmap-keeper) | Fri | GitHub Actions + `ANTHROPIC_API_KEY`, `LINEAR_API_KEY`; opens a PR |
| Sprint health, Monday kickoff, Wednesday pulse, Friday decide | weekly | Claude Code routines; prompts in `proactive/routines/` |
| Premortem nudge | betting table changes | hook |

Full manifest and what stays manual on purpose: `proactive/CLAUDE.md`.

## Make it yours

- [ ] Fill `product/context.md`: North Star with a date, up to three pillars, teams by role, 3–5 dated baselines, your tools.
- [ ] Fill `product/roadmap/current-bet.md`, `betting-table.md`, and `roadmap.md` (or let `/check-artifacts` tell you what is missing).
- [ ] Replace the example rows in `product/analytics/` with your metric and funnel definitions.
- [ ] `cp .mcp.example.json .mcp.json` and set the env vars for the servers you use, or skip it and paste exports.
- [ ] Add `ANTHROPIC_API_KEY` (and `LINEAR_API_KEY`) as repository secrets to turn on the Monday grade and Friday refresh.
- [ ] Create the routines in `proactive/routines/` you want.
- [ ] Add one file per app repo in `engineering/` (from `conventions.template.md`).
- [ ] Delete skills your team will not use; run `node check-skills.mjs --strict` after.
- [ ] Run `claude plugin eval . --scaffold --allow-tools Write Edit --trust-plugin --judge-model claude-opus-5-5` and commit the summary to `product/analysis/skill-evals/`.

## Checks

```bash
node check-skills.mjs --strict      # skills, agents, runs.yml, scrub check
node scripts/scrub-check.mjs        # no install-specific context
node scripts/validate-plugin.mjs    # claude plugin validate --strict
```

All three run in CI (`.github/workflows/skill-check.yml`).

## Repo map

| Folder | Contents |
|--------|----------|
| `product/` | Context, analytics definitions, roadmap, specs index, playbooks, dated skill outputs (`analysis/`), customer insights |
| `team/` | Roster, rituals, decisions, retros, weekly cadence notes |
| `gtm/` | Campaign tracking; copy, email, and pSEO outputs |
| `engineering/` | One context file per app repo, for product work |
| `templates/` | Bet brief, decision record, eval-requirements doc, specs, reviews |
| `proactive/` | Run manifest and routine prompts |
| `evals/` | Behavioral eval suites and fixture |
| `docs/` | `design.md` (why the repo is shaped this way, quality bar, sources) and `skill-backlog.md` |
| `.claude/` | Skills, agents, rules, hooks |

## Contributing and maintenance

`CONTRIBUTING.md` (how to add context or a skill, with the frontmatter template and eval requirement), `MAINTENANCE.md` (who refreshes what, and when), `CHANGELOG.md`.

## What is not here

- Source code (it lives in your app repos), credentials (environment variables only), full docs from your wiki (link them), meeting recordings (they stay in your meeting-notes tool).

---

Maintained by Chad Etsell ([github.com/cetsell](https://github.com/cetsell)).
