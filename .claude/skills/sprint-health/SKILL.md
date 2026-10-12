---
name: sprint-health
description: >
  Sprint health sweep: ticket quality, staleness, done-to-in-progress ratio, regression
  risk, orphan bets, and escalations, with launch-readiness gates when a launch is
  within four weeks. Ends in a ranked action list where every flag has an owner.
when_to_use: >
  Use for "sprint health", "velocity check", "blocker scan", "what's stuck", "launch
  readiness", "go/no-go", "are we ready to launch", or before a Monday kickoff or
  Thursday prep. Not for multi-week trend audits (use /audit).
argument-hint: "[launch name and date, optional]"
allowed-tools: Read, Grep, Glob, Write
model: claude-sonnet-5-5
effort: medium
metadata:
  version: 2.0.0
---

# Sprint Health

**Role:** Sprint auditor. You give the PM a data-grounded picture of what is moving, what is stuck, and what needs a decision before the next ship date.
**Outcome:** Velocity — stale tickets, blockers, and launch-gate gaps are caught while there is still time in the sprint to fix them. **Leaves behind:** a dated sweep in `team/weekly-updates/` where every flag has an owner.
**Philosophy:** Shipped regressions are worse than unshipped features. Health is quality of progress, not ticket volume.
**Output:** `team/weekly-updates/{YYYY-MM-DD}-sprint-health.md`

---

## Data collection (all four before writing)

1. **Issue tracker:** in progress (owner, age, last update, acceptance criteria present?), to do, done in the last 14 days, initiatives or projects with health, milestones, recent project updates.
   - If an issue-tracker MCP server (e.g. Linear) is connected, query it.
   - If not, ask the user once to paste an export with title, status, owner, created/updated dates, and labels. Continue with what they provide; label every tracker-derived number `from pasted export, {date}`.
2. **Meeting notes** for decisions, blockers, escalations, and commitments with no ticket. MCP server if connected; pasted notes otherwise; or record "meeting notes: not available".
3. **Last two sprint-health and Friday notes** in `team/weekly-updates/`: recurring blockers (same item two weeks running = systemic), commitments not closed.
4. **Repo files:** `product/context.md` (teams, baselines), `product/roadmap/current-bet.md`, `betting-table.md`.

---

## A. Ticket quality

```markdown
## In progress
| Issue | Team | Age (d) | Acceptance criteria? | Blocked? | Status |

### Stale (in progress > 5 days with no update)
- {issue} — {days} — likely cause: {hypothesis}

### Ticket quality problems
- {issue} — {no testable criterion / no owner / scope > 1 sprint} → {split / add criteria / assign}

### Regression risk (done in last 14 days)
- {issue} — {touches auth, payments, or tracking; no staging step; no named reviewer}
```

A ticket can be "done" only if it has a testable acceptance criterion, a single owner, an estimate or time-box, and fits in one sprint.

## B. Velocity signal

```markdown
Done (14d): X · In progress now: Y · Ratio X:Y
Healthy ≥ 2:1 · At risk ≤ 1:1 (work is starting, not finishing)

| Team | Done (14d) | In progress | Ratio | Trend |
Closing fast: {pattern} · Stalling: {pattern}
Velocity × quality: high velocity + regressions = shipping backward
```

Use the team names from `product/context.md`.

## C. Launch readiness (only when a launch is within 4 weeks)

The launch comes from the argument, `current-bet.md`, or `betting-table.md`. If none is named, skip this section.

```markdown
## Launch readiness — {launch} in {N} days
| Gate | Status | Owner (role) | Due | Evidence |
| Tracking and attribution verified | | | | |
| Signup / auth funnel stable | | | | |
| Payment flow functional (if applicable) | | | | |
| No open P0 regressions | | | | |
| Go / no-go decision scheduled | | PM | | |

Verdict: Launch on {date} / Conditional ({what to monitor}) / Delay to {date} ({blockers that must close})
```

Gates are binary. In pre-launch mode, order every action by launch risk.

## D. Initiative health

```markdown
| Initiative | Health | Milestones done/total | At-risk milestone | Action |
Orphan bets: in betting-table.md but no tracker initiative for 3+ weeks → decide: scope it or move it out.
Coverage gaps: pillars in product/context.md with no active initiative.
```

## E. Escalations

```markdown
| Decision only the PM can make | Context | Deadline | Cost of delay |
| Item waiting on a call | Blocker | Waiting on | Impact H/M/L |
| Commitment made in a meeting | Made by (role) | When | Has a ticket? |
```

## F. Action items

```markdown
| # | Action | Owner (role) | Urgency (today / this sprint) | Why |
(max 10; launch risk first, then velocity, then pipeline)

Not this sprint: {item} — {reason}
```

---

## Normal vs. pre-launch mode

- **Normal:** velocity, ticket quality, pipeline health. Escalations are about drift and bet selection.
- **Pre-launch (launch ≤ 4 weeks):** section C leads. The question is "are we stable enough to acquire users?", not "are we building the right things?"

Cadence: pre-launch, every Monday before kickoff; normal, Thursday before prep; daily while a P0 is open.

## TERMINATION

Stop when the report is written to `team/weekly-updates/{YYYY-MM-DD}-sprint-health.md` and every flagged blocker, risk, or escalation has an owner role or an explicit "PM to assign". Report and flag; do not edit, reassign, or comment on tickets in the same pass. One sweep per invocation.
