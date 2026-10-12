# Maintenance Playbook

How Team OS stays alive. Three layers: human contributions, agent maintenance, automated checks.

---

## Layer 1: Human Contributions (PRs)

Everyone on the team contributes via pull requests. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

**Who updates what:**

| File / Section | Primary owner | Backup | Trigger |
|---------------|--------------|--------|---------|
| `product/roadmap/current-bet.md` | PM | — | Friday (new week's bet) |
| `product/roadmap/betting-table.md` | PM | — | Bet status changes |
| `product/roadmap/experiment-roadmap.md` | PM | — | Experiment launches/readouts |
| `product/specs/CLAUDE.md` | PM | Design Lead | New spec created or status changes |
| `team/decisions/decisions.md` | Whoever decided | PM | When a decision is made |
| `team/roster.md` | PM | Eng Lead | Team changes |
| `team/cadence.md` | PM | — | Ritual changes |
| `gtm/campaign-tracker.md` | GTM Lead | GTM/Ops | Campaign status changes |
| `gtm/analytics-sync-agenda.md` | Analytics | GTM/Ops | Before Thursday sync |
| `product/analytics/metrics-dictionary.md` | Analytics | PM | Metric definitions change |
| `product/analytics/data-quality-log.md` | Analytics | — | Data bugs found/resolved |
| `team/weekly-updates/` | PM (product), GTM Lead (GTM) | — | Weekly |

---

## Layer 2: Agent — One Loop, Many Modes

One agent handles all Team OS tasks: `.claude/agents/team-os.md`

Instead of a fleet of narrow bots, a single agent routes by **intent** and lazy-loads skills only when needed. (One core loop, skills as loadable context, scoped permissions.)

### Modes

| Mode | Who runs it | What it does | Example |
|------|------------|-------------|---------|
| **Navigate** | Anyone | Find + summarize context. Read-only. | "What's the current bet?" |
| **Contribute** | Anyone | Format + route updates to the right file. | "Log a decision: switching to [tool] for [feature]" |
| **Refresh** | Steward (PM, Friday) | Review the automated roadmap-refresh PR (or run Refresh by hand). | "Refresh the roadmap for this week" |
| **Audit** | Steward (PM, Monday) | Scan for stale content, flag drift. | "What's stale this week?" |

### How to use

Open Claude Code in the `team-os` repo:

```
# Anyone, anytime
"What experiments are planned after the launch?"
"We decided to pause the paid-social campaign — update the repo"

# Steward runs on cadence
"Run freshness audit"
"Refresh the roadmap from Linear"
```

### Why one agent?

Without one owner per managed mode, you get either duplication (three people refresh the roadmap) or diffusion (nobody does because they assume someone else will). The steward is the one person accountable for running Refresh and Audit on cadence. Navigate and Contribute are safe for everyone, anytime.

### Design principles

- **One agent, many modes.** No separate bots. Intent routing replaces agent selection.
- **Progressive disclosure.** Start with doc index. Load a skill only if the task demands it.
- **Propose, don't auto-commit.** Show the user what changed. They review and commit.
- **Cite sources.** Every data point gets a date and origin (e.g., "Source: Linear API, queried 2026-10-09").
- **Never fabricate.** If Linear is unreachable or data isn't in the repo, say so.

---

## Layer 3: Automated Checks

GitHub Actions that run on a schedule to catch drift.

### Freshness Check (weekly)

**File**: `.github/workflows/freshness-check.yml`
**Schedule**: Every Monday at 9am UTC
**What it does**:
1. Scans key files for date patterns (`Updated:`, `as of`, `Week \d+`)
2. Flags any file where the most recent date is >14 days old
3. Opens a GitHub issue listing stale files with suggested owners

**Files monitored**:
- `product/roadmap/current-bet.md` (must be <7 days)
- `product/roadmap/betting-table.md` (must be <14 days)
- `product/roadmap/experiment-roadmap.md` (must be <14 days)
- `gtm/campaign-tracker.md` (must be <14 days)
- `product/analytics/data-quality-log.md` (must be <30 days)

### Proactive runs (wired)

| Run | Workflow / mechanism | Needs | Output |
|-----|----------------------|-------|--------|
| Artifact grade (Mon) | `.github/workflows/artifact-grade.yml` | `ANTHROPIC_API_KEY` secret | PR with `product/analysis/audit/artifacts-{date}.md` |
| Roadmap refresh (Fri) | `.github/workflows/roadmap-refresh.yml` | `ANTHROPIC_API_KEY`, `LINEAR_API_KEY` secrets | PR updating `product/roadmap/` factual fields |
| Cadence notes, sprint health | Claude Code routines (`proactive/routines/`) | a routine per run | draft PRs in `team/weekly-updates/` |
| Repo checks (every PR) | `.github/workflows/skill-check.yml` | nothing | scrub check, skill/agent conformance, plugin validation |

Full manifest: `proactive/runs.yml`.

### Steward rotation

The PM is the default steward for Refresh (Friday) and Audit (Monday). If the PM is out, the Eng Lead runs both; the steward's job is to review and merge or close the automated PRs, not to write the updates by hand.

---

## Maintenance Cadence

### Weekly (Friday)

1. PM updates `current-bet.md` with next week's bet
2. PM or agent updates `betting-table.md` status
3. GTM Lead updates `campaign-tracker.md`
4. Freshness auditor runs (automated or manual)

### After every sprint

1. Move shipped bets to "Shipped" section of `betting-table.md`
2. Add any decisions to `decisions.md`
3. Archive sprint review notes in `team/weekly-updates/`

### Monthly

1. Retro notes added to `team/retros/`
2. Review `product/analytics/data-quality-log.md` — close resolved issues
3. Review `team/roster.md` — anyone joined/left?
4. Review `product/specs/CLAUDE.md` — any specs completed or started?

### Quarterly

1. Review `product/roadmap/product-strategy.md` — still accurate?
2. Review `product/reference/` files — any frameworks outdated?
3. Prune templates that nobody uses

---

## Definition of Done — Repo Edition

A feature or bet is not "done" until the relevant context is updated:

| What shipped | Update required |
|-------------|----------------|
| A bet completed | Move to "Shipped" in `betting-table.md`, update `current-bet.md` |
| An experiment read out | Update `experiment-roadmap.md` with results + kill/iterate decision |
| A metric definition changed | Update `metrics-dictionary.md` |
| A new data issue found | Add row to `data-quality-log.md` |
| A decision was made | Add row to `decisions.md` |
| A team member joined/left | Update `team/roster.md` and root `CLAUDE.md` |
| A campaign launched/paused | Update `campaign-tracker.md` |
| A spec moved to a new status | Update `specs/CLAUDE.md` |

**Who enforces this?** The PR reviewer. If a feature PR doesn't include the relevant context update, request it before merging. This is lightweight — usually one line changed in one file.
