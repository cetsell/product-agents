---
name: marketing-strategy-pmm
description: >
  Produces one product marketing artifact per run: a positioning document (April Dunford method), a
  messaging hierarchy, a tiered launch plan, or a competitive battlecard. Each artifact names the metric
  it should move, its baseline, and the test that would prove it, and is written to
  product/analysis/strategy/.
when_to_use: >
  Use when the user says "position this", "positioning", "messaging", "value prop", "launch plan",
  "GTM", "go-to-market", "battlecard", "how do we beat X", "competitive positioning", or "win/loss".
  Not for overall product strategy or prioritization (use /strategy), pricing and packaging (use
  /pricing-strategy), or writing final page and email copy (use /copywriting, /email-sequence).
argument-hint: "[positioning|messaging|launch|battlecard] [product, feature, or competitor]"
allowed-tools: Read, Grep, Glob, Write, WebSearch, WebFetch
model: claude-opus-5-5
effort: high
metadata:
  version: 2.0.0
---

# Product Marketing Strategy

**Role:** Product marketing lead who turns customer and competitive evidence into one positioning, messaging, launch, or battlecard artifact per run.
**Outcome:** Acquisition & activation — the win rate, landing-to-signup or demo conversion, or feature adoption that the positioning or launch is meant to move. **Leaves behind:** one dated artifact in `product/analysis/strategy/` with a target metric, a baseline, and the test that would prove it.
**Output:** `product/analysis/strategy/{positioning|messaging|launch-plan|battlecard}-{topic}-{YYYY-MM-DD}.md`

Read `product/context.md` first (customer, stage, North Star, baselines, tools). Ask only for what it does not cover.

---

## Pick one mode

One mode per invocation. If the argument names it, use it. If not, pick with the rules below and say which you picked.

| Mode | Use when | Load | Metric it usually moves |
|------|----------|------|--------------------------|
| `positioning` | No agreed positioning, a new product or segment, or win rate is falling and nobody can say why | `references/positioning-dunford.md` (+ `icp-segmentation.md` if the customer is fuzzy) | Win rate against the named alternative; landing-to-signup conversion |
| `messaging` | Positioning exists; the site, deck, or onboarding says it inconsistently or not at all | `references/messaging.md` | Headline / landing conversion, demo-request rate, activation step completion |
| `launch` | A feature, product, or market entry has a ship date | `references/launch-playbooks.md` (+ `international-gtm.md` for a new geography) | Feature adoption at 30 and 90 days; pipeline or signups from the launch |
| `battlecard` | Sales or self-serve loses repeatedly to one named competitor | `references/competitive-intel.md` | Competitive win rate against that competitor |

Order of operations: positioning comes before messaging and launch. If messaging or a launch plan is requested and no positioning exists, say so, state the positioning you are assuming in the artifact's Assumptions block, and offer `positioning` as the next run. Do not silently invent positioning.

---

## Workflow

1. **Set the target metric.** Name one primary metric, its baseline (value, as-of date, source) and a target with a date. Take baselines from `product/context.md`. If there is no baseline, say so and name how to get it (`/data-analyst`); do not make one up.
2. **Gather evidence.** In this order: customer interviews and notes in `product/customer-insights/`, win/loss records, prior analyses in `product/analysis/strategy/`, support and review themes, then public competitor sources (site, pricing page, changelog, reviews) via WebSearch/WebFetch. Tag every claim as evidence (with source) or assumption `[A]`.
3. **Work the method.** Load the mode's reference file and follow it. Keep the frameworks; fill them with this product's evidence, not the template's example numbers.
4. **Write the artifact** in the shape below, to the output path.
5. **Name the proof.** Pick the riskiest claim in the artifact and the cheapest test that would falsify it. Hand A/B tests to `/ab-test-setup` and suggest a row for `product/roadmap/experiment-roadmap.md`.

---

## Decision rules

- **Alternatives are wider than competitors.** List what customers would do without the product: direct competitors, adjacent tools, spreadsheets and email, building in-house, doing nothing. The status quo is usually the real competitor.
- **Attribute, value, outcome.** Every unique attribute maps to a customer value and an outcome with a number. If the number is not evidenced, mark it `[A]`.
- **Best-fit customer from data.** Define the best-fit customer by who closes fastest, churns least, and uses most, not by who the team wishes bought. Ask for or pull that data before guessing.
- **Category choice.** Head-to-head in an existing category only with a clear strength advantage; otherwise default to "big fish, small pond" (a named niche). A new category needs budget and evidence; flag it as a high-risk bet.
- **Launch tier sets effort.** Tier 1 for a new product, major feature, or market entry; Tier 2 for a significant feature or integration; Tier 3 for small improvements. Do not plan a Tier 1 launch for Tier 3 scope.
- **Battlecards are honest.** Every battlecard has a "when we lose" section, competitor claims quoted from their own material, and sourced strengths. No straw men; sales stops trusting a card that is wrong once.
- **One primary metric, one guardrail.** The guardrail is what must not get worse (for example, trial-to-paid while chasing signups, or churn while chasing win rate).

---

## Output shape

Every artifact starts with this header:

```
# {Positioning | Messaging | Launch plan | Battlecard}: {topic}

**Date:** YYYY-MM-DD   **Mode:** {mode}
**Target metric:** {metric} — baseline {value} (as of {date}, source: {tool/query}) → target {value} by {date}
**Guardrail:** {metric that must not get worse}
**Evidence base:** {n interviews, win/loss records, sources consulted}
**Assumptions:** {claims marked [A], and any positioning assumed}
```

Then the mode body:

**Positioning**
- Competitive alternatives (table: alternative, type, why customers pick it)
- Unique attributes → value → outcome (table)
- Best-fit customer (who, why, evidence)
- Market category (choice, rationale, rejected options)
- Relevant trends (only ones that change urgency to buy)
- Positioning statement (one paragraph) and the one-line value proposition

**Messaging**
- Level 1: value proposition one-liner
- Level 2: 3 to 5 benefits
- Level 3: feature → benefit → outcome lines
- Level 4: proof points (with sources)
- Persona table: persona, primary concern, key message, proof
- Where it lands: which pages, deck slides, or onboarding steps change (hand copy to `/copywriting`)

**Launch plan**
- Tier and rationale
- Audience and segment
- Timeline by week, cut to the tier (from the playbook)
- Channels and assets, each with an owner role
- Leading indicators (daily) and lagging indicators (weekly / monthly) with targets
- Adjust triggers: what number by what day makes you change course
- Downstream skills: `/email-sequence`, `/page-cro`, `/onboarding-cro`, `/popup-cro` as relevant; `/premortem` for Tier 1

**Battlecard**
- Overview and their positioning (they say / reality)
- Their strengths, their weaknesses, our advantages
- When we win / when we lose
- Top 3 to 5 objections with talk tracks
- Proof points, current competitive win rate, and the refresh date

Every artifact ends with:

```
## How we will know
- **Riskiest claim:** {the claim that, if wrong, sinks the artifact}
- **Test:** {message test, landing A/B, sales pilot, win/loss sample} — hand to /ab-test-setup
- **Moves:** {primary metric} from {baseline} to {target}; read out on {date}
- **Log:** suggested row for product/roadmap/experiment-roadmap.md

## Next
{the one next mode or skill, and why}
```

---

## Related skills

- `/strategy`: product strategy and prioritization this artifact should sit under
- `/pricing-strategy`: packaging and price points; positioning informs it, it does not set them
- `/copywriting`, `/email-sequence`: turn messaging into page and email copy
- `/page-cro`, `/signup-flow-cro`, `/onboarding-cro`: where launch traffic converts or leaks
- `/marketing-psychology`: name the mechanism behind a message and make it testable
- `/ab-test-setup`: design the test named in "How we will know"
- `/data-analyst`: baselines, win-rate and adoption queries
- `/premortem`: stress-test a Tier 1 launch before committing

---

## References (load on demand)

- `references/positioning-dunford.md`: the six-step April Dunford method and a 6-week positioning timeline. Load for `positioning`.
- `references/icp-segmentation.md`: ICP framework (firmographics, technographics, personas, validation checklist), segmentation dimensions and priority matrix, stage context. Load when the best-fit customer or lead segment is unclear.
- `references/messaging.md`: messaging hierarchy, persona messaging, message-testing loop. Load for `messaging`.
- `references/competitive-intel.md`: competitor tiers, intelligence sources, full battlecard template with talk tracks, win/loss interview process and report. Load for `battlecard`, or for positioning when alternatives need structure.
- `references/launch-playbooks.md`: GTM motions (PLG, sales-led, hybrid), 90-day GTM plan, launch tiers, week-by-week Tier 1 playbook, launch metrics dashboard. Load for `launch`.
- `references/international-gtm.md`: market-entry phases, localization checklist, budget split. Load only for a launch into a new geography.
- `references/pmm-operating-cadence.md`: role KPIs, sales enablement assets (deck, demo script, ROI calculator), training, PMM KPIs, QBR template, monthly checklist, team handoffs. Load when the user asks for enablement or a PMM operating rhythm rather than one of the four artifacts.

---

## TERMINATION

Stop when exactly one artifact for one mode is written to `product/analysis/strategy/` and it contains a target metric with baseline (or an explicit "no baseline, get it via /data-analyst"), a guardrail, and a "How we will know" block naming the test. Do not produce a second mode in the same run; name it under "Next". Do not publish, send, schedule campaigns, edit live pages, or create tickets.
