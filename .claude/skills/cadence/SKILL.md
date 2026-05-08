---
name: cadence
description: >
  Weekly and monthly PM cadence automation. Use when the user says "monday kickoff,"
  "wednesday pulse," "thursday prep," "friday demo," "sunday setup," "weekly update,"
  "Hello All," "stakeholder update," "monthly recap," "investor update," "week in review,"
  or any variation. Also trigger on day-of-week + report keywords like "monday report,"
  "friday summary," "weekly email," "team update," "Eric update," etc.
---

# PM Cadence Engine

**Role:** AI chief-of-staff for Chad (Head of Product)
**Philosophy:** "Protect the Middle" — each day has a purpose in the weekly rhythm.
**Output directory:** `pm-workflows/weekly-reports/2026/week-[XX]-[date]/`

## Routing

Based on what the user requests, execute the matching cadence:

| Request matches | Execute section |
|----------------|-----------------|
| "monday" / "kickoff" / "alignment" | → Monday Kickoff |
| "wednesday" / "pulse" / "mid-week" | → Wednesday Pulse |
| "thursday" / "prep" / "pre-friday" | → Thursday Setup |
| "friday" / "demo" / "decide" / "week in review" | → Friday Demo & Decide |
| "sunday" / "setup" / "pre-planning" / "next week" | → Sunday Setup |
| "hello all" / "weekly update" / "team email" | → Weekly All-Hands Email |
| "stakeholder" / "exec update" / "board" | → Stakeholder Update |
| "monthly" / "recap" / "investor" / "Eric" | → Monthly Recap |

If unclear, ask which cadence they want.

---

## Shared Data Collection (ALL Cadences)

**MANDATORY: Every cadence must collect data before generating output. Never produce a report from memory or assumptions.**

### Linear MCP Queries (Required)

1. **Completed work** — Issues completed in the relevant period (D2C team + GTM team)
2. **In-progress work** — Currently active issues with assignees and status
3. **Blocked issues** — Anything marked blocked with blocker details
4. **Project health** — Active projects with status updates
5. **Initiative progress** — Strategic themes and their health
6. **Milestones** — Upcoming deadlines and their status

### Supernormal API (Required when available)

- Fetch meeting transcripts for the relevant period
- Extract: decisions made, blockers raised, sentiment signals, action items
- Use as passive interview data for team health assessment

### Local File Reads (Required)

1. `pm-workflows/current-bet.md` — this week's focused bet
2. `pm-workflows/betting-table.md` — full bet pipeline with ICE scores
3. `pm-workflows/roadmap.md` — current phase and horizon
4. Previous cadence outputs (build on prior work, don't repeat)
5. `pm-workflows/pm-principles-guide.md` — PM standards to apply

### Synthesis Rules (ALL Cadences)

1. **Linear vs Call Data:** Always compare completed work with meeting discussions. What shipped that wasn't discussed? What was discussed but didn't ship?
2. **Insights / What Slipped:** What was planned vs what actually happened?
3. **What Chad Needs to Work On:** Decisions only Chad can make, conversations only he can have
4. **CEO Signals:** Every output should demonstrate — results, learning, decision clarity, momentum, foresight

---

## Monday Kickoff

**Purpose:** Weekly alignment. Monday is for alignment, not execution.
**Day motto:** "Protect the Middle — Monday is for alignment."

### Data Collection
- Standard shared collection (above)
- Last week's Friday Demo report (for continuity)
- Last week's velocity and initiative health

### Workflow

1. **Last Week Closure**
   - Velocity summary (issues completed vs planned)
   - Initiative health changes
   - Team sentiment from meetings

2. **This Week's "One True Priority"**
   - Frame as Jobs-to-be-Done: "When [situation], [user] wants to [job] so they can [outcome]"
   - Success criteria (measurable, demo-able by Friday)
   - Why this bet, why this week

3. **Linear vs Calls Analysis**
   - Required synthesis: compare completed work with meeting discussions
   - Surface gaps and misalignments

4. **What Chad Needs to Work On**
   - Concrete actions only Chad can take
   - Conversations to have, decisions to make

5. **Cross-Team Dependencies**
   - D2C ↔ GTM handoffs needed this week
   - External dependencies with deadlines

### Deliverables

1. **Team Kickoff Slack message:**
   ```
   This week's priority: [One True Priority]

   Last week: [2-3 wins with metrics]

   This week's success looks like: [criteria]

   Key dependencies: [if any]
   ```

2. **Stakeholder "Weekly Focus" note** (1 paragraph)

3. **Monday checklist** with CEO confidence signals

---

## Wednesday Pulse

**Purpose:** Mid-week reality check. Catch drift early before Friday.
**Day motto:** "Protect the Middle — Wednesday is for pulse."

### Data Collection
- Standard shared collection
- Monday Kickoff output (what was committed)
- Mon-Wed meetings for sentiment and blocker updates

### Workflow

1. **Current Bet Progress**
   - ✅ Done / 🟡 In Progress / 🔴 At Risk for each success criterion

2. **Friday Demo Risk Assessment**
   - For each success criterion: will it demo well by Friday?
   - If at risk: what's the mitigation? What can Chad unblock?

3. **ICE Re-Scoring**
   - Has confidence changed since Monday?
   - Any new information that shifts the bet?

4. **Quality Check**
   - "Will the demo be great or just okay?"
   - What separates a 7/10 from a 9/10 this week?

### Deliverables

- Current bet status: 🟢 On Track / 🟡 At Risk / 🔴 Off Track
- Success criteria progress with status tags
- Linear vs calls gap analysis
- Friday demo risk assessment with mitigations
- What Chad needs to work on Wed–Fri
- Auto-post Linear project update with health status

---

## Thursday Setup

**Purpose:** Pre-Friday prep. Ensure Friday is about deciding, not scrambling.
**Day motto:** "Protect the Middle — Thursday is for setup."

### Data Collection
- Standard shared collection
- Monday + Wednesday outputs (full week context)
- Thursday meetings for latest risk/confidence signals

### Workflow

1. **Demo Readiness Check**
   - 🟢 Ready / 🟡 At Risk / 🔴 Not Ready for each demo item
   - What needs to happen in the next 24 hours?

2. **Bet Achievement Analysis**
   - ✅ Success / ⚠️ Partial / ❌ Miss for each criterion
   - Evidence for each verdict

3. **Iterate vs Swing Decision Prep**
   - **ITERATE:** Close to goal, 1-2 more days would complete it
   - **SWING:** Bet achieved (or good enough); pick next bet via ICE scoring
   - Prepare ICE re-scoring for top 3 candidate bets

4. **Artifact Updates**
   - Roadmap: any changes needed?
   - Betting Table: scores current?
   - Metrics: data fresh?
   - Initiative health: accurate?

### Deliverables

- Friday demo readiness report
- This week's bet achievement with North Star impact
- Iterate vs Swing recommendation with ICE scores
- Friday 3pm Bet Sync agenda
- Artifact update checklist (what's stale, what needs refresh)

---

## Friday Demo & Decide

**Purpose:** Synthesize the week, demo results, decide next bet.
**Day motto:** "Protect the Middle — Friday is for demo & decide."

### CRITICAL: Linear Health Check (Step 0)
Before proceeding, verify Linear MCP data is fresh. Query recent issues — if timestamps are >7 days old, STOP and alert Chad that Linear data may be stale.

### Data Collection
- Standard shared collection
- ALL week's outputs (Sunday through Thursday) for full trajectory
- Last Friday's report for week-over-week comparison
- All week's meetings for full synthesis

### Workflow

1. **This Week's Progress Summary**
   - Velocity: issues completed, story points delivered
   - Initiative health: movement on strategic themes
   - Key learnings: what did we learn this week?

2. **Current Bet Achievement**
   - For each success criterion: ✅ Success / ⚠️ Partial / ❌ Miss
   - Evidence and North Star impact for each
   - "Shipping to Learn" — validated/invalidated hypotheses

3. **Bet Decision**
   - **ITERATE:** [why continuing makes sense, what's left, timeline]
   - **SWING:** [why moving on, which bet is next, ICE scores]
   - Prepare ICE scoring for top 3 pipeline candidates

4. **Weekly Report Generation**

### Deliverables

1. **This week's progress** with velocity metrics
2. **Linear vs calls gap analysis** (full week)
3. **Current bet status** with North Star impact
4. **Shipping to Learn:** validated/invalidated hypotheses
5. **2:00pm Demo checklist** — what to show, who presents
6. **3:00pm Bet Sync decision** — Iterate vs Swing with ICE reasoning
7. **"I Have It Handled" status:**
   - Roadmap: current? → [Y/N]
   - Betting Table: scores current? → [Y/N]
   - Metrics: fresh? → [Y/N]
   - Initiative health: accurate? → [Y/N]
8. **Linear project + initiative updates** (auto-post)
9. **4:00pm Stakeholder summary** (2-3 sentences)
10. **Monday preview** with One True Priority for next week

---

## Sunday Setup

**Purpose:** Strategic pre-planning for the week ahead.
**Day motto:** "Protect the Middle — Sunday is for setup."

### Data Collection
- Standard shared collection (full prior week)
- Prior week's Sunday Setup + Friday Demo (for progression tracking)
- Last 7 days of meetings

### 6 Strategic Priorities to Review

1. **Metrics & Data Analysis** — Mixpanel, GTM lifecycle, attribution
2. **Prompting Systems** — Image prompting, LLM tweaking, LoRA training
3. **Locked Content Features** — JOI, galleries, exploding offers
4. **Process & Handoff** — B2B handoffs, internal agent systems
5. **Experimentation** — Acquisition, retention validation, user state
6. **Dev Priorities** — Paywall, payments, image gen, domain work

### Deliverables

1. **Quick scan table** — deadline, blockers, in-progress, experiments per priority
2. **Last week → This week comparison** — trajectory and momentum
3. **6 Strategic Priorities** each with:
   - Current status
   - Relevant Linear issues
   - Meeting context (from Supernormal)
   - This week's action items
   - Open questions
4. **Decisions table** — decision, deadline, confidence, owner
5. **Hypotheses under test** — what we're validating this week
6. **Blockers & risks** with mitigations
7. **Weekly review checkpoints** — Mon/Wed/Fri gates
8. **Monday preview** — talking points for kickoff

---

## Weekly All-Hands Email

**Purpose:** Chad's "Hello All" team-wide email. Not formal — founder voice.
**Audience:** Full team (Dave, Ilia, Karen, Lucky, etc.)
**Tone:** Direct, specific, energetic. Like a founder updating the team.

### Data Collection
- Linear: D2C completed (last 7 days), in-progress, GTM completed
- Current bet and pipeline from local files
- Past emails in `pm-workflows/weekly-updates/` for tone calibration

### Format (STRICT)

```
Hello All,

Metrics:
- [Metric]: [Value] ([+/-X% vs last week])

This Week:
[2-4 short paragraphs on what shipped and what's in flight]

Next Week:
[2-4 short paragraphs on releases, continuations, new kickoffs]

Upcoming:
[1-2 paragraphs on Horizon 2 items]

Thanks,
Chad
```

### Writing Rules
- **Metrics:** 3-6 key metrics with WoW % change. Consistent naming week to week.
- **This Week:** Lead with production shipping. Group related items. Name in-progress work and its state.
- **Next Week:** Be specific on sequencing. Flag dependencies. No hedging — "will", not "hoping to."
- **Upcoming:** Horizon 2 only. 1-2 items max. Motivating glimpses, not commitments.

### Output
1. Draft email (ready to send)
2. Context note (3-5 bullets on what was included/excluded/TBD)

---

## Stakeholder Update

**Purpose:** Executive-grade update for investors/board/partners.
**Format:** "Shipped X. Learned Y. Next week we tackle Z."
**Output:** Ready-to-send message + context notes

### Template

```
Subject: Week of [Date] Update

Hi [Stakeholders],

Shipped: [1-2 concrete wins with North Star impact first]
Learned: [1 key insight as validated/invalidated hypothesis]
Next week: [The bet with Jobs-to-be-Done, confident language]
[Optional: 1 sentence on critical blocker/risk]

[Chad]
```

### Writing Rules
- **Shipped:** Lead with North Star metric movement, use numbers, combine related items
- **Learned:** Frame as hypotheses (validated/invalidated), connect to strategy
- **Next week:** State bet with success criteria, confident language, no hedging

### Audience Variations
- **Investors/Board:** Metrics-heavy, ROI/MRR impact, revenue trajectory
- **Partners:** Integration-focused, co-marketing opportunities
- **Internal Leadership:** Team health, velocity, morale signals

---

## Monthly Recap

**Purpose:** Investor update prep for Eric (CEO). Tight and analytical.
**Output:** `pm-workflows/analysis/monthly/monthly-recap-[YYYY-MM].md`

### Data Collection (ALL SOURCES REQUIRED)
1. Shipped work — Linear D2C + GTM completed, last 30 days
2. Project health — status updates, active projects
3. Initiative progress — strategic themes, status
4. WIP — count, blocked count, longest-running items
5. Local PM artifacts — current-bet, betting-table, roadmap
6. Prior month's recap — for trend identification

### Format (STRICT)

```markdown
# Monthly Recap — [Month YYYY]

## Highlights
- **[Topic]**: [1-line summary with a number]
  - [Supporting detail / metric]
  - [Supporting detail / metric]
[5-8 highlights grouped by theme: product, growth, infrastructure, team]

## Lowlights
- **[Topic]**: [1-line summary with a number]
  - [What happened / root cause]
  - [Impact or consequence]
[3-6 lowlights. Be honest — Eric values candor over spin.]

## Key Metrics (Month-over-Month)
| Metric | This Month | Last Month | Delta |

## Project Health Snapshot
| Status | Count | Projects |

## Active Risks
- **[Risk]**: [Why it matters to the business]
  - Mitigation: [What's being done]

## Next Month Setup
- **[Priority 1]**: [What and why] — Confidence: [High/Med/Low]

## Carry-Forward Items
- [Only if genuine carry-forwards; omit if clean]
```

### What Makes a Highlight
- Shipped to production
- Moved a metric or unblocked strategy
- Solved a previous lowlight
- Team/hiring win with business impact

### What Makes a Lowlight
- Missed deadline/target
- Metric moved wrong direction
- Blocked work that stayed blocked
- Strategic bet that didn't pay off
- Team/capacity issue affecting delivery

### Quality Gate (8 Checks)
1. Every highlight/lowlight leads with a number
2. Lowlights are honest — no spin
3. Metrics section has actual data
4. Project health matches Linear reality
5. Active risks have mitigations
6. Next month priorities connect to roadmap/betting-table
7. Forward items have confidence tags
8. Scannable in under 3 minutes
