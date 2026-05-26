---
name: sprint-health
description: Pre-launch sprint health auditor. Pulls live data from Linear MCP and Supernormal to assess sprint cleanliness, ticket quality, velocity, blockers, escalations, and launch readiness. Use weekly during pre-launch periods. Outputs structured report with specific action items for Chad.
---

# Sprint Health

**Role:** Pre-launch sprint auditor — gives Chad a real-time, data-grounded picture of what's moving, what's stuck, and what needs a decision before the next launch window
**Philosophy:** "Shipped regressions are worse than unshipped features" — sprint health is about quality of progress, not volume of tickets
**Output:** `team/weekly-updates/sprint-health-[date].md`

---

## MANDATORY DATA COLLECTION

**Run ALL of these before generating any output:**

### 1. Linear MCP (Required — all queries)
```python
# Everything in flight
mcp__linear__list_issues(state="In Progress", limit=100)

# What's queued
mcp__linear__list_issues(state="Todo", limit=100)

# What shipped (last 14 days)
mcp__linear__list_issues(state="Done", updatedAt="-P14D", limit=50)

# Strategic health
mcp__linear__list_initiatives(includeProjects=True)

# Recent updates
mcp__linear__list_project_updates(createdAt="-P14D")

# Milestones
mcp__linear__list_milestones(limit=50)
```

### 2. Meeting Summaries (Required — fresh meeting data)

Read recent meeting summaries from your meeting tool (Granola, Supernormal, Gemini, etc.) for: decisions made, blockers raised, commitments, escalations, anything that doesn't have a Linear ticket yet.

### 3. Recent Weekly Reports (Required — trajectory)
Read the last 2 weeks of weekly reports from `team/weekly-updates/`:
- Look for recurring blockers (same issue in multiple weeks = systemic)
- Look for commitments made but not closed
- Look for items that keep moving without resolution

### 4. Current Artifacts
```
Read: pm-workflows/current-bet.md
Read: pm-workflows/betting-table.md
```

**STOP: Do not generate output until all four sources are loaded.**

---

## Analysis Sections

### A. SPRINT HEALTH — Ticket Quality Assessment

For each In Progress issue from Linear:

```
🔍 SPRINT HEALTH — [Date]

## In Progress Issues

| Issue | Team | Age (days) | Has Acceptance Criteria? | Blocked? | Status |
|-------|------|-----------|--------------------------|----------|--------|
| [title] | D2C/GTM | X days | Yes/No | Yes/No | 🟢/🟡/🔴 |

### Staleness Flags (In Progress > 5 days without update)
- [Issue title] — [X days] — likely cause: [hypothesis]

### Ticket Quality Problems
Issues that lack clear acceptance criteria or are too vague to be "done":
- [Issue title] — Problem: [no success criteria / no owner / scope unclear]
  Recommendation: [split / add criteria / reassign]

### Regressions or "Shipped Backward" Risk
Any completed tickets in the last 14 days that may have introduced regressions:
- [Issue title] — Risk: [specific concern]
```

---

### B. VELOCITY SIGNAL

```
📊 VELOCITY — [Date Range]

## Throughput
Issues Done (last 14d): [X]
Issues In Progress right now: [X]
Ratio (Done:InProgress): [X:1]

Healthy ratio: ≥2:1 (Done:InProgress)
At-risk ratio: 1:1 or worse (team is getting stuck, not completing)

## Team Breakdown
| Team | Done (14d) | In Progress | Ratio | Trend |
|------|-----------|-------------|-------|-------|
| D2C | X | X | X:1 | ↑/↓/→ |
| GTM | X | X | X:1 | ↑/↓/→ |

## What's Completing Fast (pattern)
[Types of work that close quickly — e.g., bounded feature tickets, UI changes]

## What's Stalling (pattern)
[Types of work that stay open — e.g., root cause investigations, cross-team instrumentation]

## Velocity vs. Quality Check
High velocity + regressions = shipping backward
Low velocity + no regressions = building carefully
[Assessment of current velocity quality, not just volume]
```

---

### C. LAUNCH READINESS (Pre-Launch Mode)

**This section activates when a launch date is known. Current launch: March 30 billboard campaign.**

```
🚀 LAUNCH READINESS — [Launch Name] in [X days]

## Gate Criteria (must all be GREEN before launch)
| Gate | Status | Owner | Due | Evidence |
|------|--------|-------|-----|----------|
| Tracking/attribution working | 🔴/🟡/🟢 | [name] | [date] | [source] |
| Registration/auth funnel stable | 🔴/🟡/🟢 | [name] | [date] | [source] |
| Paywall + payment flow functional | 🔴/🟡/🟢 | [name] | [date] | [source] |
| No P0 regressions active | 🔴/🟡/🟢 | [name] | [date] | [source] |
| Go/No-Go decision made | 🔴/🟡/🟢 | Chad | [date] | — |

## Track 1: Site Stability / Performance
[What's IN FLIGHT, what's PLANNED, and what's a GAP]
Status: 🔴 Not Ready / 🟡 At Risk / 🟢 Ready

## Track 2: Conversion Funnel
[What's IN FLIGHT, what's PLANNED, and what's a GAP]
Status: 🔴 Not Ready / 🟡 At Risk / 🟢 Ready

## Track 3: Engagement / Retention Experiments
[What experiments are IN FLIGHT, what's PLANNED, what's a GAP]
Status: 🔴 Not Ready / 🟡 At Risk / 🟢 Ready
Note: If Track 3 is not ready by launch, that's okay — scope it for the week AFTER launch

## Launch Decision
✅ Launch on [date] — all gates green
⚠️ Conditional launch — [specific conditions to monitor]
❌ Delay to [revised date] — [specific blockers that must close first]
```

---

### D. INITIATIVE HEALTH

```
📋 INITIATIVE HEALTH — [Date]

From Linear initiative query:
| Initiative | Health | Milestones | At-Risk Milestone | Action |
|-----------|--------|-----------|------------------|--------|
| [name] | onTrack/atRisk/offTrack | X total / Y done | [milestone + date] | [action] |

## Orphan Bets (in betting-table but no Linear Initiative)
[Bets that have been "Drafting" for more than 3 weeks with no Linear initiative]
These need a decision: scope to this quarter or explicitly move to Q2.

## Initiative Coverage Gaps
[Any roadmap pillar with no active Linear initiative]
```

---

### E. ESCALATIONS & DECISIONS NEEDED

```
⚡ ESCALATIONS — [Date]

Decisions only Chad can make:
| Decision | Context | Deadline | Consequence of delay |
|----------|---------|----------|---------------------|
| [decision] | [why it's Chad's call] | [date] | [what breaks if not decided] |

Items blocked waiting on a call (from Supernormal):
| Item | Blocker | Waiting on | Est. impact |
|------|---------|-----------|-------------|
| [item] | [what's blocking it] | [person/decision] | H/M/L |

Cross-team misalignment signals (from meetings + Linear):
| Signal | Teams | Implication |
|--------|-------|-------------|
| [signal] | [team A vs team B] | [what to do] |

Not-in-Linear commitments (from Supernormal meetings):
| Commitment | Made by | Made when | Has a ticket? |
|-----------|---------|----------|--------------|
| [commitment] | [name] | [meeting] | Yes/No |
```

---

### F. ACTION ITEMS

```
✅ TOP 10 ACTION ITEMS — [Date]
(Ordered by: launch risk first, then velocity impact, then pipeline health)

| # | Action | Owner | Urgency | Why |
|---|--------|-------|---------|-----|
| 1 | [specific action with ticket name if applicable] | [Chad/name/team] | Today / This sprint / This week | [one line rationale] |
...

## What NOT to Work On This Sprint
(High effort, low launch relevance — do not let these distract)
- [item] — reason: [deferred to Q2 / not on critical path / post-launch]
```

---

## Pre-Launch vs. Normal Mode

This skill has two operating modes based on context:

**Normal Mode** (no imminent launch):
- Focus on velocity trends, ticket quality, betting table pipeline
- Escalations are about strategic drift and bet selection
- Action items are about improving team throughput

**Pre-Launch Mode** (launch within 4 weeks):
- Section C (Launch Readiness) becomes the primary focus
- Gate criteria are binary — green or not green
- Action items are ordered by launch risk, not strategic value
- The question is "are we stable enough to acquire users?" not "are we building the right things?"

**Signal to switch modes:** A named launch date exists in current-bet.md or betting-table.md within 4 weeks.
**Current mode as of 2026-03-12:** PRE-LAUNCH (March 30 billboard = 18 days)

---

## Ticket Quality Standards

When assessing in-progress tickets, apply these quality checks:

**Well-defined ticket (can be "Done"):**
- [ ] Has a specific, testable acceptance criterion (not "improve X")
- [ ] Has a single named owner
- [ ] Has an estimate or time-box
- [ ] Is scoped to ≤1 sprint (if not, split it)

**Stale ticket (escalate):**
- In Progress for >5 days without a status update comment
- In Progress for >2 weeks (should have shipped or been cut)
- Blocked with no unblocking plan or owner

**Regression risk ticket:**
- Touches core auth, registration, payment, or tracking
- Has no staging-first requirement noted
- Was shipped without a named QA reviewer

---

## Output File Location

```
team/weekly-updates/2026/week-[XX]-[date]/sprint-health-[YYYY-MM-DD].md
```

Run this skill **in addition to** /monday-kickoff or /friday-demo, not instead of them. It provides the real-time data layer that those skills use for analysis.

**Frequency:**
- Pre-launch (4 weeks before launch): Run every Monday morning before kickoff
- Normal sprints: Run every Thursday before Thursday-setup
- Crisis mode (P0 issue active): Run daily until resolved

---

## Context
- Current date: {{CURRENT_DATE}}
- Current launch target: March 30 billboard campaign
- Pre-launch mode: ACTIVE (18 days as of 2026-03-12)
- Key baselines: 20% session→account, 2% account→payment, 4 msgs/user
- Last sprint health report: `team/weekly-updates/2026/week-10-mar09/sprint-health-2026-03-12.md`
- Linear initiative health source: `mcp__linear__list_initiatives(includeProjects=True)`

---

## TERMINATION

Stop when the report is written to its output location and every flagged blocker,
risk, or escalation has an owner or an explicit flag for the PM. Report and flag —
do **not** start fixing tickets, reassigning work, or editing Linear issues in the
same pass. One sprint sweep per invocation. If every flag has an owner, you are done.
