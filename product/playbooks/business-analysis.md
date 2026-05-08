# Business Analyst Skill — Playbook & Integration Guide

*Added: 2026-03-12*
*Skill file: `.claude/skills/business-analyst.md`*

---

## What This Skill Does

The `/business-analyst` skill provides on-demand operational analysis calibrated to your team's actual metrics, data sources, and betting workflow. It handles the analytical work that sits *between* strategic direction (product-strategist) and weekly execution tracking (monday-kickoff, friday-demo): requirements briefs, funnel diagnosis, post-mortems, process audits, and KPI frameworks.

**Model:** Claude Sonnet (fast, cost-effective for structured analytical work)
**Output location:** `pm-workflows/analysis/[type]-[topic]-[date].md`

---

## BA vs. Product Strategist — When to Use Which

| Question | Use This Skill |
|----------|---------------|
| "What bets should we be making next quarter?" | `/product-strategist` |
| "How does this bet reinforce our 7 Powers moat?" | `/product-strategist` |
| "What are competitors doing?" | `/product-strategist` |
| "Write the requirements brief for the Proactivity bet" | `/business-analyst` |
| "Why is our onboarding conversion only 20%?" | `/business-analyst` |
| "Did the Latency bet actually move session length?" | `/business-analyst` |
| "Map out the creator onboarding process and find the bottlenecks" | `/business-analyst` |
| "Define KPIs for the new [AI feature]" | `/business-analyst` |

**Rule of thumb:** Product-strategist asks "where do we go?" — Business-analyst asks "what exactly do we build, and did it work?"

---

## Five Analysis Modes

| Mode | When to Use | Output File Pattern |
|------|-------------|---------------------|
| **1. Funnel Analysis** | Conversion is off-target, users are dropping | `funnel-[step]-[date].md` |
| **2. Bet Requirements Brief** | Bet is "Drafting" and needs a full spec | `bet-brief-[bet-name]-[date].md` |
| **3. Bet Post-Mortem** | Bet has shipped, assess actual metric movement | `post-mortem-[bet-name]-[date].md` |
| **4. Process Audit** | A workflow is broken, slow, or unclear | `process-audit-[process]-[date].md` |
| **5. KPI Framework** | New feature needs metrics defined before it ships | `kpi-framework-[feature]-[date].md` |

---

## Integration with the Betting Cycle

The BA skill maps directly onto the lifecycle of each bet:

```
BETTING TABLE LIFECYCLE
─────────────────────────────────────────────────────────────
Drafting ──→ Ready ──→ Active (sprint) ──→ Done ──→ Learning

BA touchpoints:
  Drafting:  /business-analyst bet-brief       ← write the spec
  → Ready:   Requirements brief complete?       ← gate to move columns
  Active:    /business-analyst kpi-framework    ← set up measurement
  Done:      /business-analyst post-mortem      ← assess what moved
  Learning:  → feeds next cycle (funnel or new brief)
─────────────────────────────────────────────────────────────
```

**Gate rule:** A bet should not move from "Drafting" → "Ready" on the betting table without a completed requirements brief in `pm-workflows/analysis/`.

---

## Baseline Metrics (Populate for Your Team)

Every analysis should anchor to your current baselines and show movement. Add your numbers here:

| Metric | Baseline | Direction Goal |
|--------|----------|----------------|
| [Top-of-funnel → signup conversion] | [%] | ↑ |
| [Signup → activation conversion] | [%] | ↑ |
| [Activation → paid conversion] | [%] | ↑ |
| [D1 retention] | [%] | ↑ |
| [MRR] | [$] | ↑ to [$target] by [date] |

*Replace these with your real metrics from `product/analytics/metrics-dictionary.md`.*

---

## Data Sources Available

### Data Warehouse (BigQuery or equivalent)
Primary source for user behavior, funnels, and growth data.
- See `product/analytics/bigquery-reference.md` for dataset names and starter queries

### Linear MCP
Source for what shipped, what's in-flight, team velocity.
```python
mcp__linear__list_issues(state="Done", updatedAt="-P14D", limit=50)
mcp__linear__list_issues(state="In Progress", limit=50)
mcp__linear__list_initiatives(includeProjects=True)
```

### Meeting Transcripts
Source for stakeholder commitments and decisions not yet in Linear.
- Check your meeting recording tool (Granola, Supernormal, Gemini, etc.)

### Weekly Reports Archive
Previous bet outcomes and carry-forward items.
```
team/weekly-updates/YYYY-MM-DD.md
```

---

## Bet Requirements Brief: Quality Bar

A requirements brief is "done" when it passes this checklist:

- [ ] Business problem stated with specific current metric (not vague "users drop off")
- [ ] JTBD framed from the user's perspective
- [ ] Functional requirements have explicit acceptance criteria (pass/fail testable)
- [ ] Scope includes an "Out of Scope" section with at least 2 deferrals
- [ ] Primary success metric is a single, unambiguous number
- [ ] Fail-fast signal defined (what triggers a mid-bet pivot?)
- [ ] At least one dependency or risk identified
- [ ] Effort estimated (S/M/L)
- [ ] Approved by PM before moving to "Ready"

---

## Funnel Analysis: Quick Diagnostic Flow

When asked about a conversion problem, run this sequence:

```
1. Pull current funnel rates from your data warehouse (see bigquery-reference.md)
2. Compare to your baseline metrics (see metrics-dictionary.md)
3. Find the step with the largest negative delta
4. Run 5 Whys on that step
5. Identify top 3 fixes ranked by (impact × speed)
6. Draft a bet stub for the highest-priority fix
```

---

## Post-Mortem: When and How

**Trigger:** Run within 48 hours of a Friday bet decision (Iterate or Swing).

**Minimum data to collect before writing:**
- Metric before bet (from prior Monday kickoff report)
- Metric after bet (from DB query or Friday demo data)
- Success criteria from `current-bet.md` (the version from bet start, not updated)
- Team commitments from that week's Monday kickoff

**The single most important question:**
> "Did the primary success metric move in the hypothesized direction, and by how much?"

If yes: document what drove it, propose swing target.
If no: run 5 Whys, update betting table with learnings.

---

## Process Audit: Common Processes to Audit

| Process | Signals It Needs an Audit |
|---------|--------------------------|
| User onboarding flow | Top-of-funnel conversion stuck or declining |
| Creator/supplier onboarding | Slow to get live, friction in self-serve |
| Content moderation | If flagged content creates support load |
| Payment / trial activation | Account→Payment stuck at 2% |
| Bet definition workflow | Bets moving to "Ready" without clear specs |
| Ad Factory pipeline | If CAC is rising or ad velocity is dropping |

---

## Integration with Weekly Skills

```
/monday-kickoff            Pull last bet post-mortem for "wins" and "learnings"
/wednesday-pulse           Flag if any active bet needs requirements clarification
/thursday-setup            Check that next bet has a completed requirements brief
/friday-demo               Post-mortem data collection begins (capture before/after)
/business-analyst          Deep-dive analysis triggered by any of the above
```

---

## Example Invocations

```bash
# Funnel diagnosis
"Read .claude/skills/business-analyst.md and run a funnel analysis on
our session-to-payment conversion based on agent_api.db."

# Bet spec
"The Proactivity Features bet is drafting. Run business-analyst to write
a full requirements brief for it."

# Post-mortem
"The Latency bet just wrapped. Run a business-analyst post-mortem
using the before/after data."

# Process audit
"Our creator onboarding feels broken. Run a business-analyst process
audit on the creator signup and first-content flow."

# KPI setup
"We're about to ship [AI feature]. Run business-analyst to define
the KPI framework before it launches."
```

---

*For the skill definition, see: `.claude/skills/business-analyst.md`*
*For product strategy context, see: `strategy/product-strategy-2026.md`*
*For PM principles, see: `pm-principles-guide.md`*
*For the product-strategist companion, see: `strategy/product-strategist-playbook.md`*
