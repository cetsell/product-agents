---
name: check-artifacts
description: >
  Artifact health check — grades your PM artifacts (roadmap visual, betting table,
  metrics dashboard, Linear initiatives and milestones) A–F for freshness, quality,
  and alignment, then lists prioritized fixes. Use when the user says "check
  artifacts," "artifact health," "do I have it handled," "are my artifacts up to
  date," "grade my roadmap," "CEO confidence check," or before a leadership review.
---

# Check Artifacts - "I Have It Handled" Health Check

**Role:** AI chief-of-staff for Chad (Head of Product)
**Philosophy:** "I Have It Handled" checklist - Fresh artifacts signal control
**Output:** Artifact health report with priority actions

---

## Core Workflow

### 1. Locate & Assess All Artifacts (5 min)
- **Roadmap:** Find `pm-workflows/roadmap.md` (or roadmap.*)
- **Betting Table:** Find `pm-workflows/betting-table.md` (or betting-table.*)
- **Current Bet:** Find `pm-workflows/current-bet.md` (or current-bet.*)
- **Metrics Dashboard:** File-based or external (note URL if external)
- **Linear Initiatives:** Query `mcp__linear__list_initiatives` for strategic alignment
- **Linear Milestones:** Query `mcp__linear__list_milestones` for project checkpoints

### 2. Freshness Check (2 min)
**For each artifact:**
- ✅ Fresh: <7 days old
- ⚠️ Aging: 7-14 days old
- 🔴 Stale: >14 days old
- ❌ Missing: Doesn't exist

### 3. Quality Check (5 min)

**Roadmap:**
- Rolling structure: 6 weeks (concrete) / 6 months (flexible) / 6 years (vision)?
- Balance: New ideas + iterations + customer problems + quality + scale?
- Performance vs Opportunity: Maintaining AND pursuing growth?
- Specific or vague? Opinionated or hedging?

**Betting Table:**
- Pipeline health: 2+ "Ready" bets = 🟢 / 0-1 = 🔴
- Strategic work: High-effort/high-impact or snacking?
- Jobs-to-be-Done: User problems stated or feature-focused?
- Balance: Performance + Opportunity gaps represented?

**Current Bet:**
- Updated this week (Mon-today)?
- Specific metrics stated?
- Jobs-to-be-Done clear?
- North Star connection stated?

### 4. Alignment Check (3 min)
- Compare Roadmap "Now" vs Linear in-progress issues
- Compare Roadmap "6 months" vs Linear Initiatives
- Compare Betting Table vs Linear Project Milestones
- Alignment: ✅ Aligned / ⚠️ Partial Drift / 🔴 Significant Drift

### 5. Generate Health Report (5 min)

```markdown
# 🛡 "I Have It Handled" Artifact Health Check
*Run on: [Date]*

## 📊 Overall Score: [A / B / C / D / F]

**Grading:**
- A: All 3 artifacts fresh (<7d), aligned, high quality
- B: 2/3 fresh, minor drift, good quality
- C: 1/3 fresh, some drift, quality concerns
- D: All aging (>7d), significant drift, vague
- F: 2+ missing or stale (>14d)

## 1️⃣ Roadmap Visual
**Status:** ✅ Fresh / ⚠️ Aging / 🔴 Stale / ❌ Missing
**Last Updated:** [X days ago]

**Rolling Structure:**
- 6 weeks: ✅ / ❌
- 6 months: ✅ / ❌
- 6 years: ✅ / ❌

**Balance:**
- ✅ Balanced / ⚠️ Too much performance gap / ⚠️ Too much opportunity gap

**Quality:**
- Specificity: ✅ Specific / ⚠️ Vague
- Language: ✅ Opinionated / ⚠️ Hedging
- Alignment: ✅ Aligned / ⚠️ Drift / 🔴 Major drift

**Action:** [Update "Now" to [X] / None - current]

## 2️⃣ Betting Table
**Status:** ✅ Fresh / ⚠️ Aging / 🔴 Stale / ❌ Missing
**Last Updated:** [X days ago]
**Pipeline Health:** 🟢 Healthy / 🟡 Needs Attention / 🔴 Critical

**Breakdown:**
- "Ready": [X] bets (Need 2+)
- "Drafting": [X] bets
- "On Hold": [X] bets

**Quality:**
- Strategic work: ✅ / ⚠️ Some snacking / ❌ Mostly snacking
- Jobs-to-be-Done: ✅ Clear / ⚠️ Some unclear / ❌ Feature-focused
- North Star: ✅ Stated / ⚠️ Partial / ❌ Missing
- Balance: ✅ Performance + Opportunity / ⚠️ Imbalanced

**Action:** [Draft Bet Briefs for [X, Y] / None - healthy]

## 3️⃣ Metrics Dashboard
**Status:** ✅ Current / ⚠️ Needs Check / 🔴 Outdated / ❌ Missing
**Location:** [File path / External tool]
**Last Updated:** [X days ago]

**Action:** [Review [dashboard URL] / Update metrics.md / None]

## 4️⃣ Linear Initiatives (Strategic Level)
**Status:** ✅ Aligned / ⚠️ Partial / ❌ Missing / 🔴 Drift
**Active Initiatives:** [X]
**Health:** [onTrack: X, atRisk: Y, offTrack: Z]

**Alignment with Roadmap "6 months":**
- ✅ Initiatives match roadmap strategic goals
- ⚠️ Some initiatives not in roadmap (or vice versa)
- 🔴 Major disconnect

**Action:** [Update initiatives / Update roadmap / None]

## 5️⃣ Linear Project Milestones
**Status:** ✅ Current / ⚠️ Needs Update / ❌ Missing
**Total Milestones:** [X]
**Upcoming (next 30d):** [Y]
**Overdue:** [Z]

**Alignment with Betting Table:**
- ✅ Milestones align with bet pipeline
- ⚠️ Missing milestones for some bets
- 🔴 Milestones disconnected from bets

**Action:** [Create milestones for bets / Update milestone dates / None]

## 🔍 Alignment Check
**Roadmap says:** [X]
**Linear shows:** [Y]
**Alignment:** ✅ Aligned / ⚠️ Drift / 🔴 Major drift

**If drift:** [Update roadmap / Clarify priorities]

## ✅ Recommended Actions (Priority Order)
1. **CRITICAL:** [Action with artifact + when]
2. **HIGH:** [Action with artifact + when]
3. **MEDIUM:** [Action with artifact + when]
```

---

## Pre-Launch Mode: Sprint Health Gate

**When a launch is within 4 weeks**, add this section to every artifact check:

```
🚀 PRE-LAUNCH GATE CHECK — [Launch Name] in [X days]

The following must all be GREEN before any acquisition spend:

| Gate | Status | Owner |
|------|--------|-------|
| Tracking / attribution working | 🔴/🟡/🟢 | [name] |
| Auth / registration funnel stable | 🔴/🟡/🟢 | [name] |
| Paywall + payment flow functional | 🔴/🟡/🟢 | [name] |
| No P0 regressions active | 🔴/🟡/🟢 | [name] |
| Go/No-Go decision made | 🔴/🟡/🟢 | Chad |

Launch verdict: ✅ Green / ⚠️ Conditional / ❌ Delay to [date]
```

**In pre-launch mode, also check:**
- Are any In Progress tickets stale (>5 days, no update)?
- Is current-bet.md updated for this sprint?
- Are there P0s without named owners?

For a full sprint health analysis use: **/sprint-health** (runs all Linear queries + Supernormal + recent reports)

---

## Managing Up: CEO Confidence Signals

**What CEOs Need to See in Artifacts:**
1. ✅ **Current** - All <7 days old (shows active management)
2. ✅ **Specific** - Clear bets with metrics (not vague)
3. ✅ **Aligned** - Roadmap matches Linear reality
4. ✅ **Pipeline** - 2+ Ready bets (always know what's next)
5. ✅ **Balanced** - Performance + Opportunity work represented

**Red Flags to Avoid:**
- ❌ Stale artifacts (>14 days) = "Lost control"
- ❌ Empty pipeline (0 Ready bets) = "No plan"
- ❌ Vague goals = "Unclear direction"
- ❌ Roadmap-Linear drift = "Not executing plan"

**CEO-Ready Artifact Status (auto-generated):**
```markdown
**If CEO asks "What's the plan?"**
→ "Roadmap is current ([X] days old). Now: [Current bet]. Next 6 weeks: [Next 2 bets]. Pipeline healthy with [X] Ready bets. All artifacts aligned with Linear execution."

**If CEO asks "Do you have this handled?"**
→ "Yes. Artifact health: [Grade]. Roadmap: [Fresh/Aging]. Betting Table: [X Ready bets]. Current bet: [Updated this week]. [If stale: Updating Thursday per workflow]."

**If CEO asks "What are the options for next week?"**
→ "Betting Table shows [X] Ready bets. Top ICE scores: [Bet 1: Score], [Bet 2: Score]. All have Bet Briefs with Jobs-to-be-Done. Decision Thursday 3pm."
```

---

## Appendix: PM Principles Applied

**Rolling Roadmap:** Validate 6 weeks / 6 months / 6 years structure
**I Have It Handled:** Fresh (<7d) = control; Stale (>14d) = losing grip
**Holding the Bar (Taste):** Specific and opinionated vs vague and hedging
**Performance vs Opportunity Balance:** Maintaining + pursuing growth
**Strategic Work:** High-effort/high-impact vs snacking
**Jobs-to-be-Done:** Clear user problems vs just features

**Detailed Reference:** See `pm-workflows/pm-principles-guide.md`

---

## Appendix: Grading Rubric

**A Grade:**
- All 3 artifacts <7 days old
- Roadmap has Rolling structure (6w/6m/6y)
- Betting Table: 2+ Ready bets
- Everything specific, opinionated, aligned with Linear
- Balanced: Performance + Opportunity work

**B Grade:**
- 2/3 artifacts <7 days old
- Minor alignment issues
- Good quality (mostly specific)
- 1-2 Ready bets

**C Grade:**
- 1/3 artifacts <7 days old
- Some drift (Roadmap doesn't match Linear)
- Quality concerns (vague content)
- 0-1 Ready bets

**D Grade:**
- All artifacts 7-14 days old
- Significant drift
- Very vague content
- No Ready bets

**F Grade:**
- 2+ artifacts missing or >14 days old
- Major disconnect from reality
- Unclear what's next

---

## Appendix: Missing Artifact Templates

**If Roadmap missing, offer:**
```markdown
# Product Roadmap

## Now (6 weeks - Concrete)
**Current Bet:** [Name]
- [Deliverable 1]
- [Deliverable 2]

## Next (6 months - Flexible)
- [Next bet 1]
- [Next bet 2]

## Later (6 years - Vision)
- [Strategic initiative 1]
- [Strategic initiative 2]
```

**If Betting Table missing, offer:**
```markdown
# Betting Table - Next 6 Priorities

| Bet | Status | Target Metric | ICE | Brief |
|-----|--------|---------------|-----|-------|
| [Bet 1] | Ready | [Goal] | [Score] | [Link] |
| [Bet 2] | Drafting | [Goal] | [Score] | [Link] |
```

**If Current Bet missing, offer:**
```markdown
# Current Bet - Week of [Date]

**One True Priority:** [Bet name]
**Target:** [Specific goal with metric]
**Jobs-to-be-Done:** [User problem being solved]
**North Star Impact:** [Expected movement]

**Success Criteria:**
- [ ] [Criterion 1]
- [ ] [Criterion 2]
```

---

**Context:**
- Current date: {{CURRENT_DATE}}
- Read: `pm-workflows/weekly-workflow.md` for artifact philosophy
- Read: `pm-workflows/pm-principles-guide.md` for PM principles

---

## TERMINATION

Stop when every artifact in the checklist has a letter grade, the overall score is
assigned, and the Recommended Actions list is ordered by priority. Do **not** fix the
artifacts you graded in the same pass — grade and recommend, then stop; fixing each
one is a separate, explicit task. One health check per invocation.
