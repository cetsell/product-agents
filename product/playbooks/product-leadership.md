# Product Leadership Skill — Playbook & Integration Guide

*Added: 2026-03-12*
*Skill file: `.claude/skills/product-leadership.md`*

---

## What This Skill Does

The `/product-leadership` skill is the strategic overlay layer — connecting your company's long-arc vision (phases, pillars, competitive moat) to the weekly execution system (bets, artifacts, team velocity). While the weekly ritual skills keep the sprint on track, this skill keeps the sprint pointed in the right direction.

Think of it as a "Head of Product thinking" tool: OKR cascade, vision alignment, team health, org design, and quarterly planning.

**Output location:** `pm-workflows/analysis/leadership/[type]-[date].md`

---

## Why "product-leadership" and Not "product-strategist"

The existing `/product-strategist` skill handles **market-facing strategy**: competitive intelligence, market sizing, GTM planning, feature prioritization against the competitive landscape.

This skill handles **org-facing leadership**: internal goal alignment, team health, OKR structure, capacity planning, and vision fidelity. Same person using them for different audiences — product-strategist faces outward; product-leadership faces inward.

| Outward (product-strategist) | Inward (product-leadership) |
|-----------------------------|---------------------------|
| Competitor moved, what do we do? | Are our bets aligned to our phases? |
| What's the market opportunity in X? | Is the team hitting throughput limits? |
| GTM strategy for this launch | OKR cascade for next quarter |
| Feature prioritization vs. market | Org scaling: hire or restructure? |

---

## The OKR Architecture

Most product teams don't use OKR software — the existing artifacts ARE the OKR system, just named differently. The cascade looks like this:

```
LEVEL            ARTIFACT                        CADENCE
─────────────────────────────────────────────────────────
Company OKR   →  product-strategy.md (Phases)  Quarterly refresh
                 [Phase 1: Your Phase Name]
                 [Phase 2: Your Phase Name]
                 [Phase 3: Your Phase Name]
       ↓
Product OKR   →  product-strategy.md (Pillars) Quarterly refresh
                 [Pillar 1]
                 [Pillar 2]
                 [Pillar 3]
       ↓
Team OKR      →  betting-table.md (Bets)       Weekly refresh
                 [Bets mapped to pillars]
       ↓
Sprint OKR    →  current-bet.md                Monday → Friday
                 This week's single bet
─────────────────────────────────────────────────────────
```

The OKR Cascade tool (Tool 1) makes this implicit structure explicit — useful when onboarding team members, updating investors, or checking for drift between the levels.

---

## The Five Tools at a Glance

| Tool | When to Use | Cadence |
|------|-------------|---------|
| **1. OKR Cascade** | Quarter start, investor update, onboarding | Quarterly |
| **2. Vision Alignment Check** | Roadmap update, drift feeling, board prep | Monthly / As needed |
| **3. Team Health & Velocity** | Velocity drop, morale concern, planning | Monthly |
| **4. Quarterly Planning** | End-of-quarter transition | Quarterly |
| **5. Org Scaling Decision** | Hiring consideration, restructure, throughput ceiling | As needed |

---

## Trigger Signals for Each Tool

### Tool 1: OKR Cascade
- First week of a new quarter
- Before an investor conversation or board update
- When a new team member asks "how does my work connect to the company goals?"
- After a major strategic pivot changes the roadmap

### Tool 2: Vision Alignment Check
- Roadmap or betting table was just updated significantly
- You feel like "we're busy but not sure if we're moving the North Star"
- Before the quarterly planning session (inputs Tool 4)
- After a period of mostly performance-gap bets (are we neglecting the opportunity gap?)

### Tool 3: Team Health & Velocity
- Velocity is down two weeks in a row (Linear shows fewer issues completing)
- A blocker has appeared in the same team 3+ weeks running
- You had a Supernormal call where team morale felt off
- Before quarterly planning (you need capacity data)

### Tool 4: Quarterly Planning
- 2-3 weeks before quarter end (Thursday before the last sprint)
- After a major "swing" decision that resets direction
- When the betting table pipeline is running thin (< 3 Ready bets)

### Tool 5: Org Scaling
- A high-ICE bet has been "Drafting" for 3+ weeks because no one has capacity
- The same type of work keeps being deferred quarter after quarter
- You've hired for "bandwidth" not "skill" — and the bandwidth hire isn't moving the needle

---

## Integration with the Weekly Cycle

```
MONDAY
  → product-leadership provides the "why this bet" framing for monday-kickoff
  → OKR cascade shows how today's bet connects to the quarter's phase goal

THURSDAY
  → Vision alignment check can inform the Iterate vs. Swing decision
  → If vision drift is detected, the bet may need re-scoping before Friday

FRIDAY (end of sprint)
  → Team health signals from the week feed the next weekly cadence
  → If the week's "one insight" is about team dynamics, log it in Tool 3

MONTHLY
  → Run Tool 2 + Tool 3 to assess North Star progress and team health

QUARTERLY
  → Run Tool 4 (quarterly planning) which triggers Tool 1 (OKR cascade) for new quarter
```

---

## Integration with Other Skills

```
/product-leadership         /product-strategist
─────────────────────────────────────────────────
Internal org alignment      External market strategy
OKR cascade (phases→bets)   Competitive intel + GTM
Team velocity assessment    Market opportunity sizing
Vision drift detection      Feature prioritization vs. market
Capacity planning           Quarterly strategy review (Mode 5)
─────────────────────────────────────────────────

/product-leadership         /business-analyst
─────────────────────────────────────────────────
Phase / pillar alignment    Bet-level requirements + post-mortems
Capacity and org health     Funnel analysis and KPI frameworks
OKR progress at level 1-2   Metric movement at level 3-4 (bets)
─────────────────────────────────────────────────
```

---

## The Must-Have Threshold Gate

**Every quarterly planning session (Tool 4) must answer:** are we above or below the 40% "very disappointed" threshold?

This gates the capacity allocation decision:
- **Below 40%:** Product improvement bets must dominate capacity — don't scale acquisition on a product people won't miss
- **Above 40%:** Can safely allocate more capacity to growth/acquisition bets

This is the hardest call to make honestly. The signal is in user behavior (retention, repeat sessions) not in user words ("I love the product"). Use the business-analyst Metric Tree to validate before deciding.

---

## Example Invocations

```bash
# Quarter kick-off
"Read .claude/skills/product-leadership.md and generate the OKR cascade
for Q2 2026, connecting phase goals to pillars to bets."

# Vision check
"Run the product-leadership vision alignment check — I want to know if
our current bets are actually moving the North Star or just maintaining."

# Team assessment
"Velocity seems off this week. Run product-leadership team health assessment
using Linear data from the last 2 weeks."

# Quarterly planning
"We're 2 weeks from end of Q1. Run the product-leadership quarterly planning
session to prep the Q2 transition."

# Hiring decision
"We keep deferring the Creative Tools bet. Run the product-leadership
org scaling assessment for a potential Design Lead hire."
```

---

*For the skill definition, see: `.claude/skills/product-leadership.md`*
*For outward-facing strategy, see: `.claude/skills/product-strategist.md`*
*For PM principles, see: `pm-principles-guide.md` (especially Section XI CPO standards)*
*For the phase strategy, see: `strategy/product-strategy-2026.md`*
