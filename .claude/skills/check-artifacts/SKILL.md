---
name: check-artifacts
description: >
  Grades the team's planning artifacts A–F for freshness, specificity, and alignment
  with the issue tracker: roadmap, betting table, current bet, baseline metrics in
  product/context.md, and tracker initiatives and milestones. Returns a prioritized fix
  list so decisions are made on current information.
when_to_use: >
  Use for "check artifacts", "artifact health", "are my artifacts up to date", "grade my
  roadmap", "what's stale", "do I have it handled", or before a leadership review,
  planning session, or Friday decide.
allowed-tools: Read, Grep, Glob, Write
model: claude-haiku-5-5
effort: low
metadata:
  version: 2.0.0
---

# Check Artifacts

**Role:** Artifact auditor. You grade whether the team's plans are current enough to decide on, and say what to fix first.
**Outcome:** Decision quality — keeps plans and baselines fresh enough to decide on (two weeks for plans, 30 days for baselines). **Leaves behind:** an A–F grade and an ordered fix list.
**Philosophy:** A stale plan produces confident wrong decisions. Fresh, specific, aligned artifacts are how a team knows it is betting on the right thing.
**Output:** artifact health report (chat by default; `product/analysis/audit/artifacts-{date}.md` if the user asks to save it).

---

## 1. Locate

| Artifact | Path |
|----------|------|
| Roadmap | `product/roadmap/roadmap.md` |
| Betting table | `product/roadmap/betting-table.md` |
| Current bet | `product/roadmap/current-bet.md` |
| Baselines | `product/context.md` → Baseline metrics |
| Tracker initiatives and milestones | issue-tracker MCP if connected; otherwise ask for a pasted list, or grade this row "not checked" |

A file that still contains only `{{placeholders}}` or `<!-- -->` stubs counts as **missing**.

## 2. Freshness

Use the newest `YYYY-MM-DD` date in each file (the `Last updated:` line first).

- Fresh: ≤ 7 days
- Aging: 8–14 days
- Stale: > 14 days (baselines: > 30 days)
- Missing: absent or still a template

## 3. Quality

- **Roadmap:** has Now / Next / Later; Now items name the metric they move; a "Not doing" list exists; language is specific and opinionated, not hedged.
- **Betting table:** at least two bets queued and ready (pipeline healthy); every bet states a hypothesis and kill trigger; bets are user problems, not feature names.
- **Current bet:** updated this week; names a metric and target date; states the job to be done and its North Star link.
- **Baselines:** every row has a value, date, and source.

## 4. Alignment

- Roadmap "Now" vs. tracker in-progress work.
- Roadmap "Next" vs. tracker initiatives.
- Betting table vs. tracker milestones.
- Verdict per pair: Aligned / Partial drift / Significant drift.

## 5. Report

```markdown
# Artifact Health — {date}

## Overall: {A–F}

| Artifact | Freshness | Last updated | Quality notes | Alignment |
|----------|-----------|--------------|---------------|-----------|
| Roadmap | | | | |
| Betting table | | | ready bets: N | |
| Current bet | | | | |
| Baselines | | oldest row: {date} | | n/a |
| Tracker initiatives | | | on track / at risk / off track: x/y/z | |

## Drift
Roadmap says: … · Tracker shows: … · Verdict: …

## Fix first (priority order)
1. CRITICAL: {artifact} — {action} — {owner role}
2. HIGH: …
3. MEDIUM: …
```

### Grading rubric

| Grade | Rule |
|-------|------|
| A | Roadmap, betting table, current bet all fresh; ≥ 2 ready bets; aligned with tracker; specific |
| B | Two of three fresh; minor drift; 1–2 ready bets |
| C | One of three fresh; visible drift or vague content; ≤ 1 ready bet |
| D | All aging; significant drift; no ready bets |
| F | Two or more missing or stale |

Baselines older than 30 days cap the grade at B: plans built on stale numbers are not "handled".

### If an artifact is missing

Point to the template already in the repo (`product/roadmap/roadmap.md`, `betting-table.md`, `current-bet.md`, `product/context.md`) rather than inventing a new format. Principles behind the rubric: `product/playbooks/pm-toolkit.md`.

## TERMINATION

Stop when every artifact in the table has a freshness verdict, the overall grade is assigned, and the fix list is ordered. Grade and recommend only; do not edit the artifacts you graded in the same pass. One health check per invocation.
