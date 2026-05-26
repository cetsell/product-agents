# Team OS

Shared context for your product team. AI-agent optimized — every folder has a `CLAUDE.md` index.

## Doc Index

| Query type | Read this | Path |
|------------|-----------|------|
| Metric definition, KPI formula, data source | Metrics dictionary | `product/analytics/metrics-dictionary.md` |
| BigQuery table, SQL query, data issue | BQ reference | `product/analytics/bigquery-reference.md` |
| Funnel stage, conversion event, drop-off | Funnel definitions | `product/analytics/funnel-definitions.md` |
| Known data bug, workaround | Data quality log | `product/analytics/data-quality-log.md` |
| Current sprint priority, bet status | Active bet | `product/roadmap/current-bet.md` |
| Full bet pipeline, what's next | Betting table | `product/roadmap/betting-table.md` |
| Annual product strategy | Strategy | `product/roadmap/product-strategy-2026.md` |
| Linear issue/project template, quality bar | Linear guidelines | `product/playbooks/linear-guidelines.md` |
| PM framework (RICE, bets, PRDs, discovery) | Playbooks | `product/playbooks/` |
| Decision history, what we decided | Decision log | `team/decisions/decisions.md` |
| Who works on what, Slack handles | Team roster | `team/roster.md` |
| Eng or GTM weekly schedule | Team cadence | `team/cadence.md` |
| New team member setup | Onboarding | `team/onboarding/` |
| GTM campaigns, analytics sync | GTM folder | `gtm/` |
| Template for any artifact | Templates | `templates/` |
| Past weekly "Hello All" emails | Archive | `team/weekly-updates/` |
| How to contribute to this repo | Contributing guide | `CONTRIBUTING.md` |
| Maintenance cadence, agent owners, freshness rules | Maintenance playbook | `MAINTENANCE.md` |
| Scheduled + triggered proactive runs, operating rhythm | Proactive agents | `proactive/` |
| fe-main Angular conventions, frozen files, key services | Engineering context | `engineering/` |

## Data Source Hierarchy

| Source | Use for | Priority |
|--------|---------|----------|
| **Linear** (or your issue tracker) | What we're building, velocity, project health, who's working on what | Primary |
| **BigQuery** (or your data warehouse) | Funnels, growth, attribution, device data | Primary (quantitative) |
| **team-os/** | Sprint context, bet pipeline, team roster, templates, definitions | Secondary (shared state) |
| **Google Docs / Notion** | Specs, wiki references, collaborative docs | Secondary (collaborative) |
| **Your meeting tool** | Call notes, meeting transcripts | Secondary (qualitative) |

## Team Roster

*Full details in `team/roster.md`*

| Name | Role |
|------|------|
| [Name] | [Role] |

## External Links

| Tool | URL |
|------|-----|
| Linear | <!-- add workspace URL --> |
| Notion | <!-- add wiki URL --> |
| Google Drive | <!-- add folder URL --> |
| BigQuery | <!-- add console URL --> |
| Mixpanel | <!-- add project URL --> |

## Skill Routing

When working in this repo, load only the skill you need based on the request:

| Request pattern | Load skill | What it does |
|----------------|-----------|-------------|
| Funnel audit, conversion analysis, growth trends, device data | `/data-analyst` | BigQuery queries against your data warehouse + dbt models |
| Sprint health, velocity check, blocker scan | `/sprint-health` | Linear sweep, gate status, risk flags |
| Write a PRD, spec, or break down a feature idea | `/pm-super-agent` | Idea → PRD → tickets pipeline |
| Create or improve Linear issues | `/linear-issue-creator` | Structured ticket creation from product intent |
| RICE scoring, OKRs, roadmap planning, competitive analysis | `/strategy` | Prioritization frameworks + discovery |
| Operational or product health check | `/audit` | Cross-functional health assessment |
| Prompt variant testing, A/B prompt comparison | `/eval-runner` | LLM-as-judge scoring |
| Pressure-test claims, "how do we know," audit an output before it drives a decision | `/evidence-loop` | Claim/source trail, flip-assumption, human decision point |
| "What could kill this," stress-test a plan/launch/hire/bet, find blind spots | `/premortem` | Prospective-hindsight failure analysis → revised plan + checklist |
| Behaviorally eval a skill — did it stay in role / terminate / drift | `/skill-eval` | Runs a skill, scores output vs the quality bar (Layer 2). Static check: `node check-skills.mjs` |
| Monday kickoff, Friday demo, weekly email, monthly recap | `/cadence` | PM cadence automation |
| Grade artifact staleness (A-F) | `/check-artifacts` | Artifact health scoring |
| Monthly PM self-evaluation | `/monthly-pm-self-eval` | Scored self-assessment against PM standards |
| Campaign retrospective | `/project-campaign-review` | Campaign retro with learnings |
| Prompt audit, design, structured output | `/senior-prompt-engineer` | Prompt design & evaluation |
| Marketing copy, headlines, CTAs | `/copywriting` | Page copy, benefit framing |
| Email drip campaigns, nurture sequences | `/email-sequence` | Sequence design, timing, re-engagement |
| Email deliverability, SPF/DKIM, infrastructure | `/email-systems` | SendGrid config, bounce handling |
| Clear prose for docs, UI text, error messages | `/writing-clearly-and-concisely` | Strunk & White principles |
| Positioning, GTM launches, competitive battlecards | `/marketing-strategy-pmm` | Product marketing strategy |
| Cognitive biases, persuasion, consumer behavior | `/marketing-psychology` | 70+ mental models for marketing |
| Pricing model, tier design, willingness-to-pay | `/pricing-strategy` | Pricing frameworks |
| Paywall conversion, upgrade flow | `/paywall-upgrade-cro` | Paywall optimization |
| Signup funnel, registration flow | `/signup-flow-cro` | Signup conversion |
| First-run experience, activation | `/onboarding-cro` | Onboarding optimization |
| Landing page, feature page optimization | `/page-cro` | Page conversion rate |
| A/B test design, sample size, significance | `/ab-test-setup` | Experiment design |
| Churn reduction, retention tactics | `/churn-prevention` | Churn analysis & prevention |
| Popup timing, copy, targeting | `/popup-cro` | Popup conversion |
| Copy polish, tone, readability | `/copy-editing` | Copy refinement |
| pSEO templates, modifier strategy, scale indexing | `/programmatic-seo` | Programmatic SEO |
| Referral mechanics, incentive design, viral loops | `/referral-program` | Referral program design |
| Remotion video animation framework | `/remotion-best-practices` | Video animation patterns |
| Input → knowledge graph → clustered HTML + JSON | `/graphify` | Knowledge graph generation |

**Do not load all skills for every request.** Read the doc index first, load the skill only if the task requires it.

## Agent

One agent handles all Team OS tasks: `.claude/agents/team-os.md`

It routes between **modes** based on intent:
- **Navigate** — find and summarize context (read-only, safe for everyone)
- **Contribute** — format and route updates to the right file
- **Refresh** — pull live data from Linear to update roadmap files (steward: PM, Friday)
- **Audit** — scan for stale content and flag drift (steward: PM, Monday)

See `MAINTENANCE.md` for the full playbook, ownership table, and cadence.

## Maintenance

Three layers keep this repo alive:

| Layer | What | How |
|-------|------|-----|
| **Human PRs** | Anyone adds context via pull requests | `CONTRIBUTING.md` |
| **Agent** | One agent with skill routing handles all repo maintenance | `.claude/agents/team-os.md` |
| **Automated checks** | GitHub Actions flag stale files weekly | `.github/workflows/` |

## Definition of Done

A feature or bet is not "shipped" until:
1. Bet status updated in `betting-table.md`
2. Decision logged in `decisions.md` (if applicable)
3. Metrics updated in `metrics-dictionary.md` (if measurement changed)
4. Experiment updated in `experiment-roadmap.md` (if experiment read out)

## Rules

- Every folder has a `CLAUDE.md` — read it before reading other files in that folder
- Templates in `templates/` use `{{variable}}` placeholders
- Decision log: add a row when you DECIDE, not when you SHIP
- `product/roadmap/` and `product/playbooks/` are PM tools, not team-mandated processes
- Specs live in Google Docs — `product/specs/CLAUDE.md` has the index
- Every data point must have a date — no undated metrics or status claims
- Content >14 days old may be stale — verify before citing
