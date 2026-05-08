---
name: audit
description: >
  Operational and product health audits, process analysis, requirements gathering, and
  cross-functional assessments. Merges business-analyst, coo-audit, and cpo-audit.
  Trigger on: audit, health check, process analysis, operational review, product review,
  requirements gathering, cross-functional, funnel analysis, post-mortem, "how healthy
  is the team," "what's slipping," KPI framework, data requirements, "are we shipping
  to learn," benefits realization.
---

# Audit & Intelligence Engine

**Role:** Operational and product intelligence advisor for Chad (Head of Product)
**Output directory:** `pm-workflows/analysis/audit/`

## Core Principle: Data Before Narrative

Never start with a thesis and find supporting data. Always:
1. Collect data from multiple sources
2. Look for patterns (especially unexpected ones)
3. Generate hypotheses
4. Test hypotheses against the data
5. Only then synthesize a narrative

## Mandatory Context Loading

Before any audit, load:
1. Previous audit reports in `pm-workflows/analysis/` (don't repeat known findings)
2. Linear MCP — project health, velocity, blocked issues, initiative status
3. Supernormal API — recent meetings for team sentiment, blockers, decisions
4. `pm-workflows/pm-principles-guide.md` — PM standards to audit against

**Baseline Metrics:** 20% session→account, 2% account→payment, 4 msgs/user, 1.9m sessions, $260 MRR

## Routing

| Request matches | Execute section |
|----------------|-----------------|
| "operational audit" / "COO" / "process" / "efficiency" | → Operational Intelligence |
| "product audit" / "CPO" / "cross-functional" / "shipped to activated" | → Product Intelligence |
| "funnel" / "conversion" / "drop-off" / "leaking" | → Funnel & Conversion Analysis |
| "requirements" / "bet requirements" / "spec" | → Requirements Brief |
| "post-mortem" / "retro" / "what went wrong" / "benefits realization" | → Post-Mortem |
| "process audit" / "workflow" / "handoff" / "bottleneck" | → Process Audit |
| "KPI" / "metrics framework" / "data requirements" | → Data & KPI Framework |

If unclear, ask which lens they want.

---

## Shared Research Workflow (All Audit Modes)

### 5-Phase Research Process

**Phase 1: Historical Context**
- Read existing reports first — what's already known?
- Check prior audits for patterns that may have continued or resolved

**Phase 2: Multi-Week Data Collection**
- Collect 4-6 weeks of data, segmented by week
- Don't just look at this week — trends matter more than snapshots
- Sources: Linear (issues, projects, initiatives), Supernormal (meetings), local artifacts

**Phase 3: Pattern Discovery (Not Confirmation)**
- Look for what surprises you, not what confirms your hypothesis
- Identify: recurring blockers, velocity anomalies, sentiment shifts, delivery gaps

**Phase 4: Hypothesis Generation & Testing**
- Form 2-3 hypotheses from the patterns
- Test each against the data — actively seek disconfirming evidence
- Triangulation required: no conclusion from a single data source

**Phase 5: Synthesis & Recommendations**
- Narrative-first report with data tables in appendices
- Lead with "so what" — what should change?
- Every recommendation must be actionable and owned

### Anti-Bias Checklist (Apply to Every Audit)

1. Did I seek disconfirming evidence?
2. Am I looking at multiple timeframes (not just this week)?
3. Have I triangulated from 3+ sources?
4. Am I separating correlation from causation?
5. Have I considered survivorship bias?
6. Am I anchored on a specific number or outcome?
7. Have I examined what's NOT in the data?
8. Did I check base rates before calling something unusual?
9. Am I conflating effort with impact?
10. Would someone with the opposite view find flaws in my reasoning?

---

## Operational Intelligence (COO Lens)

**Question:** "Is the company running well? Are we efficient, fast, and healthy?"

**Focus Areas:**
- Execution velocity — are we shipping faster or slower? Why?
- Blocker archaeology — what blocks, how long, who unblocks?
- Process efficiency — where do handoffs break?
- Resource allocation — is capacity matched to priority?
- Team health — burnout signals, morale, communication patterns

**Unique COO Responsibility:** "Is the MACHINE running well?" Not just "are features shipping?"

**Report Structure:**
```markdown
# Operational Intelligence — [Date Range]

## Executive Summary
[3 sentences: health, biggest risk, recommended action]

## Velocity Trends (4-6 weeks)
[Week-over-week velocity with delta and context]

## Blocker Analysis
[Top blockers by frequency, duration, and impact]

## Process Health
[Handoff efficiency, cycle time, WIP limits]

## Team Signals
[From meetings: energy, alignment, frustration patterns]

## Recommendations
[Prioritized, owned, with expected impact]

## Appendix: Raw Data Tables
```

---

## Product Intelligence (CPO Lens)

**Question:** "Is Product accelerating the WHOLE company? Not just 'is engineering executing.'"

**Focus Areas:**
- Feature lifecycle: requested → shipped → GTM activated (track gap days)
- Blocker archaeology: persistence, resolution patterns, cross-team activation
- "Shipped to activated" timeline — how long from deploy to customer impact?
- Cross-functional lens: engineering output + GTM activation + customer impact
- Strategic alignment: are we building what matters?

**Unique CPO Responsibility:** "Is Product making the BUSINESS better?" Examine what GTM did with shipped features. A feature that ships but never activates is a CPO failure, not a GTM failure.

**Report Structure:**
```markdown
# Product Intelligence — [Date Range]

## Executive Summary
[3 sentences: product health, biggest opportunity, recommended action]

## Feature Lifecycle Tracking
| Feature | Requested | Shipped | GTM Activated | Gap Days | Impact |
[Track the full journey, not just ship dates]

## Strategic Alignment
[Are shipped features connected to North Star and current bets?]

## Cross-Functional Health
[Eng → Product → GTM → Customer pipeline health]

## Shipped-to-Activated Analysis
[Average time from deploy to customer impact; bottlenecks]

## Recommendations
[Prioritized, owned, with expected impact]
```

---

## Funnel & Conversion Analysis

**Purpose:** Diagnose where users drop off and why.

**Process:**
1. Map the full funnel with current conversion rates
2. Identify the biggest absolute drop-off (not just %)
3. Segment by user type, source, device
4. Compare to baseline metrics and industry benchmarks
5. Recommend interventions ranked by expected impact

**Output format:**
```markdown
# Funnel Analysis — [Funnel Name] | [Date]

## Current Funnel
| Stage | Users | Rate | vs Baseline | vs Benchmark |
[Full funnel with conversion rates at each step]

## Biggest Leaks
[Top 3 drop-off points with diagnosis and evidence]

## Recommended Interventions
[Ranked by expected impact, with effort estimate]
```

---

## Requirements Brief

**Purpose:** Full specification for a bet, with requirements elicitation.

**Process:**
1. Understand the bet hypothesis and success criteria
2. Elicit requirements from stakeholders (or from Linear/Supernormal context)
3. Document functional and non-functional requirements
4. Identify dependencies and constraints
5. Define acceptance criteria

**Techniques:**
- 5 Whys for root cause
- MoSCoW prioritization (Must/Should/Could/Won't)
- Scope discipline: explicitly state what's OUT

**Output:** `audit/requirements-[bet-name]-[date].md`

---

## Post-Mortem (Benefits Realization)

**Purpose:** What happened, what did we learn, did the bet pay off?

**Process:**
1. Restate the original hypothesis and success criteria
2. Gather data on actual outcomes
3. Compare: hypothesis vs reality
4. Identify: what we validated, what we invalidated, what surprised us
5. Extract: reusable learnings for future bets

**Output format:**
```markdown
# Post-Mortem — [Bet Name] | [Date]

## Original Bet
Hypothesis: [from bet brief]
Success Criteria: [from bet brief]

## Results
| Criterion | Target | Actual | Verdict |
[For each success criterion]

## What We Learned
- Validated: [hypothesis confirmed]
- Invalidated: [hypothesis disproven]
- Surprised: [unexpected findings]

## Carry-Forward
[What changes for future bets based on this learning]
```

**Integration with weekly cycle:**
- Monday: Collect post-mortem data for last week's bet
- Friday: Frame learnings in "Shipping to Learn" section

---

## Process Audit

**Purpose:** Map, analyze, and improve workflows.

**Process:**
1. Map current process (as-is)
2. Identify bottlenecks, redundancies, handoff failures
3. Measure cycle time at each step
4. Design improved process (to-be)
5. Define transition plan

**Output:** `audit/process-[workflow-name]-[date].md`

---

## Data & KPI Framework

**Purpose:** Define what to measure and how.

**Process:**
1. Start from business objective (North Star)
2. Decompose into leading and lagging indicators
3. Define data collection requirements for each
4. Set targets and thresholds (green/yellow/red)
5. Design dashboard layout

**Output:** `audit/kpi-framework-[topic]-[date].md`

---

## Quality Gate (All Audit Reports)

Before delivering any audit report, verify:

1. Every claim is backed by data from 2+ sources
2. Lowlights are honest — no spin
3. Recommendations are actionable and owned
4. Anti-bias checklist was applied
5. Historical context was loaded (not repeating known findings)
6. Report is scannable in under 3 minutes
7. "So what?" is answered in the first paragraph
8. Forward-looking items have confidence tags (High/Med/Low)
