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
| **`.claude/`** | 31 Claude Code skills, 4 agents, and commands |

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

## Agents (4)

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

### context-manager (Opus)

Maintains coherent state across multi-agent workflows and long-running tasks. Extracts decisions and rationale from agent outputs, distributes minimal relevant context to each agent, and compresses context between sessions.

## Operating-System Capabilities

Beyond individual skills, Team OS now has cross-cutting layers that make the whole library move faster and stay trustworthy.

### Evidence loops (decision integrity)

Consequential outputs carry an **Evidence Loop** appendix — a claim-by-claim trail of what's supported by a dated source vs. assumed, the one assumption that would flip the decision, and where a human decides. This is the guardrail that lets the team act fast on AI output without shipping confident nonsense. Method: `product/playbooks/evidence-loop.md`. For AI features, the PRD itself becomes an **eval-requirements doc** (labeled dataset + pass metrics, not prose) — `templates/eval-requirements-doc.md`. Run on demand with `/evidence-loop`; pressure-test plans for failure modes with `/premortem`.

### Proactive layer (`proactive/`)

The shift from reactive (you ask) to proactive (it runs without being asked). `proactive/runs.yml` is a scheduler-agnostic manifest of **scheduled runs** (morning brief, sprint health, weekly status, monthly self-eval) and **reactive triggers** (a new high-stakes bet auto-fires `/premortem`; any stakeholder-facing artifact passes an `/evidence-loop` gate). Every run names a steward, a decision point, and a hard stop condition. Wire it to `/schedule`, GitHub Actions, or hooks when ready — see `proactive/CLAUDE.md`.

### Skill evals (quality bar)

Every skill is held to a checkable bar — a role line, a structured output shape, and an explicit **TERMINATION** condition (the rule that prevents an unattended run from expanding to fill its whole budget).

- **Layer 1 — static:** `node check-skills.mjs` lints every `SKILL.md` against the bar and runs in CI (`.github/workflows/skill-check.yml`), so a skill that drops its role line or stop condition fails the build.
- **Layer 2 — behavioral:** `/skill-eval` runs a skill against representative prompts and scores the *output* (stayed in role, wrote into the shape, terminated, evidence loop, triggered correctly), wrapping the `skill-creator` harness.

## Skills (31)

Skills are specialized domain expertise in `.claude/skills/`. Each is a `SKILL.md` with frameworks, data sources, and output conventions. Invoke with `/skill-name`. Load only the skill you need — not all at once.

### PM & Strategy

| Skill | What it does |
|-------|-------------|
| `/cadence` | Weekly/monthly PM rituals — Monday kickoff, Wednesday pulse, Friday demo, weekly email, monthly recap. Pulls from your issue tracker, meeting notes, and the roadmap files. |
| `/strategy` | OKR cascades, RICE/ICE prioritization, competitive analysis, discovery frameworks, bet briefs, PRDs, user stories, sprint planning, vision alignment. |
| `/audit` | Operational and product health audits with 5-phase research process. Modes: operational intel, product intel, funnel analysis, requirements brief, post-mortem, process audit, KPI framework. |
| `/sprint-health` | Pre-launch sprint health check — ticket quality, velocity signals, launch readiness gates, blocker scan. Switches to pre-launch mode 4 weeks before ship date. |

### Analytics & Data

| Skill | What it does |
|-------|-------------|
| `/data-analyst` | Warehouse analytics (BigQuery by default). Conversion funnel audits, weekly growth trends, activation signals, monetization analysis, device breakdowns, acquisition ROI. |

### Issue Creation & Specs

| Skill | What it does |
|-------|-------------|
| `/pm-super-agent` | Master PM agent — refines raw ideas into PRDs, specs, and Linear tickets. Pipeline: context hunt, intake, refine, write PRD, diagram, decompose, retro. |
| `/linear-issue-creator` | Translates product intent into well-structured Linear issues. Enforces hypothesis/kill trigger/confidence on every feature. Right-sized for 1–3 day tickets. |

### Evaluation & Prompts

| Skill | What it does |
|-------|-------------|
| `/eval-runner` | Scores prompt variants for an AI feature against a labeled dataset and the pass bar in its eval-requirements doc, with an explicit, configurable judge model. |
| `/senior-prompt-engineer` | Production prompt engineering. Prompt audit, new prompt design, structured output engineering, evaluation, debug. |
| `/evidence-loop` | Pressure-tests any output for unsupported claims — claim/source trail, the assumption that would flip the decision, and the human decision point. The "how do we know?" guardrail. |
| `/premortem` | Prospective-hindsight failure analysis — assumes the plan already failed and works backward to find every reason why, then returns a revised plan + pre-launch checklist. |
| `/skill-eval` | Behavioral eval for the skill library — runs a skill and scores its output against the quality bar (role, shape, termination, evidence loop, triggering). Static counterpart: `node check-skills.mjs`. |

### Artifact Health

| Skill | What it does |
|-------|-------------|
| `/check-artifacts` | Grades artifact health A–F based on freshness, quality, and alignment with your issue tracker. Checks roadmap, betting table, current bet, and initiative alignment. |
| `/monthly-pm-self-eval` | Evidence-based monthly self-evaluation — scores decision quality, hypothesis discipline, communication, speed, and leverage (each 1–5) and names one behavior to change. |

### Marketing & Growth

| Skill | What it does |
|-------|-------------|
| `/copywriting` | Conversion copywriting for any page — homepage, landing, pricing, feature, about. Hero → Social Proof → Problem → Solution → How It Works → Testimonials → CTA. |
| `/email-sequence` | Design drip campaigns and lifecycle automation. 12+ sequence templates: welcome, nurture, re-engagement, post-purchase, upgrade, win-back, dunning, NPS. |
| `/marketing-strategy-pmm` | Product marketing — April Dunford positioning methodology, ICP definition, messaging hierarchy, launch playbooks, competitive battlecards, market entry. |
| `/marketing-psychology` | 70+ mental models for marketing — first principles, JTBD, inversion, second-order thinking, Pareto, diminishing returns, barbell strategy, buyer decision frameworks. |
| `/pricing-strategy` | SaaS pricing and packaging — value metrics (per-user, per-usage, per-feature), freemium vs trial, tier design, willingness-to-pay research, annual vs monthly. |
| `/referral-program` | Viral growth mechanics — referral program design, affiliate programs, incentive structures, viral coefficient, self-reinforcing growth loops. |
| `/programmatic-seo` | pSEO at scale — page templates, modifier strategy, unique value per page, proprietary data hierarchy, canonicalization, internal linking. |

### Conversion Rate Optimization

| Skill | What it does |
|-------|-------------|
| `/page-cro` | Optimize any marketing page for conversions — value proposition clarity, headline effectiveness, copy flow, CTA design, trust signals, friction reduction. |
| `/signup-flow-cro` | Optimize registration and account creation — minimize required fields, progressive profiling, social login, conditional fields, B2C vs B2B patterns. |
| `/onboarding-cro` | Post-signup activation — time-to-value optimization, aha moment identification, interactive onboarding, empty state design, progress motivation. |
| `/paywall-upgrade-cro` | In-app paywalls and upgrade flows — feature locks, usage limits, trial expiration, value demonstration, comparison tables, save offers. |
| `/ab-test-setup` | Experiment design — hypothesis framework, sample size calculation, statistical power, primary/secondary/guardrail metrics, avoiding peeking. |
| `/churn-prevention` | Reduce churn — cancel flow design with save offers, failed payment recovery (dunning), proactive retention from usage signals, win-back sequences. |
| `/popup-cro` | Popup and modal optimization — timing rules (scroll, time, exit intent, behavior), value-first copy, mobile experience, targeting strategy. |

### Writing & Editorial

| Skill | What it does |
|-------|-------------|
| `/writing-clearly-and-concisely` | Strunk & White for AI — omit needless words, active voice, definite language, positive form. Catches AI puffery (pivotal, crucial, groundbreaking). |
| `/copy-editing` | The Seven Sweeps framework — Clarity, Concision, Flow, Tone, Specificity, Persuasion, Polish. Enhances without rewriting. Preserves voice. |

## Commands

| Command | What it does |
|---------|-------------|
| `/create-prd` | Generate a Product Requirements Document from product context, feature docs, and JTBD. Superseded by `/pm-super-agent`; removal scheduled. |

## MCP servers (optional)

Every skill runs with zero MCP servers connected. Servers make the data step automatic; without them, a skill asks you to paste an export (or writes the SQL for you to run) and continues. `.mcp.json` declares three optional servers. Claude Code asks you to approve each project server on first launch; decline any you do not use.

| Server | Env vars | Used by |
|--------|----------|---------|
| `linear` (issue tracker) | `LINEAR_MCP_URL` (defaults to Linear's hosted server; sign in via `/mcp`) | cadence, sprint-health, audit, strategy, check-artifacts, monthly-pm-self-eval, pm-super-agent, linear-issue-creator, team-os agent (Refresh) |
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
