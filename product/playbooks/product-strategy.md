# Product Strategist Skill — Playbook & Integration Guide

*Added: 2026-03-12*
*Skill file: `.claude/skills/product-strategist.md`*

---

## What This Skill Does

The `/product-strategist` skill gives you an on-demand strategy advisor calibrated to your company's specific strategic context: your positioning, your competitive moat, and your roadmap phasing. Unlike the weekly ritual skills (monday-kickoff, friday-demo), this skill is **situation-triggered** — invoke it when a strategic question, competitive event, or roadmap decision demands more than execution tracking.

**Model:** Claude Opus (use when analysis depth matters)
**Output location:** `pm-workflows/strategy/analysis/[topic]-[date].md`

---

## When to Invoke

### High-Value Trigger Events

| Trigger | What to Run | Example Prompt |
|---------|-------------|----------------|
| Competitor ships a notable feature | Mode 2: Competitive Intel | "[Competitor] just announced [feature] — run product-strategist competitive intel" |
| Evaluating a new bet for the table | Mode 3: Feature Prioritization | "Should [feature] be a Q2 bet? Run product-strategist prioritization" |
| Planning a feature launch | Mode 4: GTM Strategy | "We're launching [feature] — run product-strategist GTM analysis" |
| Considering entering a new segment | Mode 1: Market Opportunity | "Is the [market segment] worth pursuing? Run product-strategist market opportunity" |
| Preparing for a board/investor meeting | Mode 5: Quarterly Review | "Prep a Q1 strategy review for the board meeting" |
| Roadmap feels out of alignment | Mode 5: Quarterly Review | "Our roadmap feels scattered — run a strategy review against our core thesis" |

### Integration with Weekly Cycle

```
Monday:     Validate "One True Priority" against strategic context
            → "Run product-strategist to confirm this bet reinforces our moat"

Thursday:   Pressure-test Iterate vs. Swing with competitive data
            → "Is there any market signal that changes the Swing decision?"

Friday:     Frame weekly learnings in strategic narrative
            → "Help me frame this week's learnings as a strategic signal"

Anytime:    Competitive spike response
            → "[Competitor] just raised $XX — what does this mean for our positioning?"
```

---

## Analysis Modes Reference

| Mode | Use When | Output Type |
|------|----------|-------------|
| **1. Market Opportunity** | New segment, product category, expansion idea | Opportunity memo with TAM/SAM/SOM + 7 Powers verdict |
| **2. Competitive Intel** | Competitor ships something, new entrant, funding news | Threat assessment + counter-move recommendation |
| **3. Feature Prioritization** | Choosing between bet candidates, sequencing roadmap | ICE-scored ranked list + roadmap sequence |
| **4. GTM Strategy** | Feature launch, channel test, pricing decision | Launch sequence + success metrics |
| **5. Quarterly Review** | End of quarter, board prep, strategy drift check | Full scorecard + next quarter thesis |

---

## Data Sources the Skill Uses

### Always Loaded
- `product/roadmap/product-strategy.md` — Mission, phases, differentiators
- `product/roadmap/betting-table.md` — Pipeline health and next bets
- `product/roadmap/current-bet.md` — Active weekly priority
- `product/reference/` — Strategic frameworks and market intelligence files
- Linear MCP — In-flight initiatives, completed work, velocity

### On-Demand (Competitive Mode)
- WebSearch — Competitor news, funding rounds, regulatory changes
- Cost curve data — AI inference, voice, multimodal pricing trends

---

## Output File Structure

All analyses are saved to `pm-workflows/strategy/analysis/`:

```
strategy/
  analysis/
    market-opportunity-[topic]-[date].md
    competitive-intel-[competitor]-[date].md
    feature-prioritization-[context]-[date].md
    gtm-[initiative]-[date].md
    quarterly-review-[quarter]-[date].md
```

Keep the `analysis/` directory as a **chronological intelligence log** — don't delete old analyses. They become valuable when you want to compare how competitive positions shift over time.

---

## How This Fits the Broader System

```
Weekly Ritual Skills             Product Strategist Skill
─────────────────────            ──────────────────────────
/monday-kickoff                  /product-strategist
/wednesday-pulse          ←→     (triggered by events, not calendar)
/thursday-setup
/friday-demo

Cadence: Time-based             Cadence: Event/question-based
Output: Weekly reports          Output: Strategy analyses
Focus: Execution tracking       Focus: Direction validation
```

The weekly skills ensure you're **executing well on the right bet**. This skill ensures you're **choosing the right bets** in the first place — and that the bets collectively add up to a coherent competitive moat.

---

## Company-Specific Context (Populate for Your Team)

### Your Customer Segments
*Document your customer psychographics here — who are you building for?*
- **[Segment 1]** — [Description of what they want / their primary job to be done]
- **[Segment 2]** — [Description]
- **[Segment 3]** — [Description]

### Your Growth Flywheel
*Document the loop that drives your growth here. Features that don't accelerate a step in this loop are likely snacking.*
```
[Step 1]
  → [Step 2]
    → [Step 3]
      → [Revenue]
        → [Reinvestment back to Step 1]
```

### Competitive Landscape
*Replace with your actual competitors.*
- **[Competitor 1]** — [Their positioning and strength]
- **[Competitor 2]** — [Their positioning and strength]

---

## Quality Checklist for Strategy Outputs

Before accepting any strategy recommendation from this skill, verify:

- [ ] Connects to the North Star metric
- [ ] Distinguishes performance gap vs. opportunity gap
- [ ] Names the specific customer segment it serves
- [ ] Includes a concrete next action (not just analysis)
- [ ] Indicates bet table impact (new bet? existing bet priority shift? defer?)
- [ ] Not snacking — high-effort, high-impact framing

---

## Example Invocations

```bash
# Competitive spike
"A competitor just launched [X]. Read .claude/skills/product-strategist.md and run
a competitive intelligence analysis."

# Bet validation
"We're considering [feature] as a Q2 bet. Run the product-strategist prioritization
mode and score it against our other candidates in betting-table.md."

# Launch prep
"We're about to ship [feature]. Run product-strategist GTM analysis for the launch."

# Strategic check-in
"I'm feeling like our roadmap has drifted. Run a product-strategist quarterly
review and tell me where we stand against our core thesis."
```

---

*For the skill definition, see: `.claude/skills/product-strategist.md`*
*For PM principles reference, see: `pm-principles-guide.md`*
*For the core strategy, see: `product/roadmap/product-strategy.md`*
