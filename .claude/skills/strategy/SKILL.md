---
name: strategy
description: >
  Product strategy, prioritization, OKR cascading, competitive analysis, discovery
  frameworks, user story generation, and sprint planning. Merges product-strategist,
  product-leadership, product-manager-toolkit, and agile-product-owner into one skill.
  Trigger on: strategy, OKRs, RICE, prioritization, roadmap, vision, user stories,
  sprint planning, competitive analysis, discovery, bet brief, PRD, ICE scoring,
  "what should we build next," "how do I prioritize," feature comparison, backlog,
  stakeholder communication, quality bar.
---

# Product Strategy Engine

**Role:** Strategic product advisor for Chad (Head of Product)
**Output directory:** `pm-workflows/analysis/strategy/`

## Mandatory Context Loading

Before any analysis, read these files to ground recommendations in current reality:

1. `pm-workflows/roadmap.md` — current roadmap and phase
2. `pm-workflows/betting-table.md` — active bets and pipeline
3. `pm-workflows/current-bet.md` — this week's focused bet
4. `pm-workflows/pm-principles-guide.md` — PM principles and standards
5. Linear MCP — query current project health, team velocity, active initiatives

**Strategic Context:**
- **North Star:** Multimodal, memory-backed Digital Twin relationships
- **Phase Roadmap:** The Wedge → Platform → Protocol
- **Three Pillars:** Core Activation / Creative Tools / Business Model
- **Three Teams:** D2C / GTM / Support
- **Baseline Metrics:** 20% session→account, 2% account→payment, 4 msgs/user, $260 MRR

## Routing

Based on what the user requests, execute the matching mode:

| Request matches | Execute section |
|----------------|-----------------|
| "strategy" / "market analysis" / "competitive" / "7 powers" | → Market & Competitive Analysis |
| "OKRs" / "objectives" / "cascade" / "goals" | → OKR Cascade Generator |
| "RICE" / "ICE" / "prioritize" / "rank features" / "what to build" | → Prioritization |
| "discovery" / "hypothesis" / "opportunity tree" / "pre-mortem" | → Discovery Frameworks |
| "bet brief" / "PRD" / "requirements" / "spec" | → Bet Brief & PRD |
| "user stories" / "stories" / "acceptance criteria" / "INVEST" | → User Story Generation |
| "sprint planning" / "sprint" / "backlog" / "capacity" | → Sprint Planning |
| "stakeholder" / "communicate" / "tradeoff" / "present" | → Stakeholder Communication |
| "vision" / "alignment" / "quarterly planning" | → Vision & Alignment |
| "team health" / "velocity" / "org design" / "scaling" | → Team Health & Scaling |
| "quality bar" / "pre-ship" / "checklist" | → Quality Bar Checklist |

If unclear, ask which mode they want.

---

## Market & Competitive Analysis

Assess market opportunity, competitive landscape, and strategic positioning.

**5 Analysis Modes:**
1. **Market Opportunity Assessment** — TAM/SAM/SOM with adjacent market mapping
2. **Competitive Intelligence** — Feature matrix, positioning map, threat assessment
3. **Feature Prioritization** — ICE scoring against strategic pillars
4. **Go-to-Market Strategy** — Channel selection, messaging, launch sequencing
5. **Quarterly Strategy Review** — Retrospective + forward planning

**Framework: 7 Powers Lens**
Apply Hamilton Helmer's 7 Powers to every strategic recommendation:
- Scale Economies, Network Effects, Counter-Positioning, Switching Costs, Branding, Cornered Resource, Process Power

**Output:** `strategy/market-[topic]-[date].md`

**Integration with weekly cycle:**
- Monday: Validate strategic assumptions
- Thursday: Pressure-test recommendations
- Friday: Frame for stakeholder communication

---

## OKR Cascade Generator

Generate aligned OKRs from company → product → team levels.

**5 Strategy Templates:**
- **Growth:** acceleration, PMF, sustainable growth
- **Retention:** customer value, UX, LTV
- **Revenue:** growth, optimization, expansion
- **Innovation:** breakthroughs, competitive moat, speed
- **Operational:** excellence, velocity, scaling

**Process:**
1. Ask which strategy template (or detect from context)
2. Generate 3 company-level objectives × 3-5 KRs each
3. Cascade to product level — target ~30% contribution to each company KR
4. Cascade to teams (D2C, GTM, Support) — filter by relevance
5. Score alignment: vertical (40%), horizontal (20%), coverage (20%), balance (20%)

**Output format:**
```
Company Objective → Product Objective → Team Objectives
Each with: Key Results (measurable), Confidence (H/M/L), Owner
Alignment Score: X/100
```

**Output:** `strategy/okr-cascade-[quarter]-[date].md`

---

## Prioritization (RICE / ICE)

Rank features and bets using quantitative scoring.

**RICE Formula:** `(Reach x Impact x Confidence) / Effort`

| Factor | Scale |
|--------|-------|
| Impact | massive=3.0, high=2.0, medium=1.0, low=0.5, minimal=0.25 |
| Confidence | high=100%, medium=80%, low=50% |
| Effort | XL=13, L=8, M=5, S=3, XS=1 (person-months) |

**Process:**
1. List candidate features/bets
2. Score each on Reach, Impact, Confidence, Effort
3. Calculate RICE scores and rank
4. Identify: Quick Wins (high score, low effort), Big Bets (high score, high effort)
5. Generate quarterly roadmap based on team capacity

**Portfolio Analysis:**
- Quick wins vs big bets distribution
- Effort allocation across pillars
- Risk/confidence distribution

**Output:** `strategy/rice-[topic]-[date].md`

---

## Discovery Frameworks

Structured approaches to validate hypotheses before building.

**5 Frameworks:**

1. **Hypothesis Template**
   > We believe [change] for [segment] will achieve [outcome] as measured by [metric]. We'll know we're wrong if [falsification criteria].

2. **Opportunity Tree** (Teresa Torres)
   - Desired outcome → Opportunities → Solutions → Experiments
   - Map from business objective down to testable experiments

3. **Press Release / FAQ** (Amazon "Working Backwards")
   - Write the press release first, then build backward to requirements

4. **Pre-Mortem**
   - "It's 3 months from now and this bet failed. Why?"
   - Force team to articulate risks before committing

5. **Metric Tree**
   - Decompose North Star into sub-metrics
   - Identify which sub-metric each bet targets

**Customer Discovery Guides:**
- **End-user interviews:** Pain points, workarounds, willingness to pay
- **Creator interviews:** Content workflow, monetization needs, platform switching costs

**Supernormal Integration:** Use meeting transcripts as passive interview data — extract pain points, feature requests, sentiment.

**Output:** `strategy/discovery-[topic]-[date].md`

---

## Bet Brief & PRD

Lightweight and full specification documents.

**Bet Brief (Lightweight PRD):**
```markdown
# Bet Brief: [Name]

## Hypothesis
We believe [change] for [segment] will achieve [outcome].

## Success Criteria
- [ ] [Measurable outcome 1]
- [ ] [Measurable outcome 2]

## Scope
**In:** [What's included]
**Out:** [What's explicitly excluded]

## ICE Score
Impact: [1-5] | Confidence: [1-5] | Effort: [1-5] | Score: [X]

## Dependencies
- [Dependency 1]

## Timeline
[Duration estimate]
```

**Full PRD (Cross-Quarter Features):**
Uses the Linear Project Description Template from CLAUDE.md:
- Description → Problem → Why → Success → Audience → What → How → When

**Output:** `strategy/bet-brief-[name]-[date].md` or `strategy/prd-[name]-[date].md`

---

## User Story Generation

INVEST-compliant stories with acceptance criteria.

**INVEST Checklist:** Independent, Negotiable, Valuable, Estimable, Small, Testable

**4 Personas:** end_user, admin, power_user, new_user

**Story Format:**
```
As a [persona], I want to [action] so that [benefit].

Acceptance Criteria:
- Given [context], when [action], then [result] (happy path)
- Given [context], when [invalid action], then [error handling]
- Performance: [constraint]
- Accessibility: [requirement]

Story Points: [estimate based on complexity]
Priority: [P0-P3]
```

**Capabilities:**
- Break epics into persona-targeted stories
- Generate technical enabler stories
- Estimate story points based on complexity indicators
- Validate stories against INVEST checklist

---

## Sprint Planning

Plan sprints based on team capacity and prioritized backlog.

**Process:**
1. Calculate team capacity (story points available)
2. Pull prioritized backlog (from RICE/ICE scoring)
3. Select stories that fit capacity
4. Identify dependencies and sequencing
5. Define sprint goal and success criteria

**Output:** Sprint plan with goal, selected stories, capacity utilization, risk flags

---

## Stakeholder Communication

Templates for presenting decisions and tradeoffs.

**Templates:**
1. **Decision Recommendation** — Option A vs B with tradeoffs, data, recommendation
2. **Tradeoff Presentation** — "If we do X, we get Y but lose Z"
3. **Progress Update** — What shipped, what's next, blockers
4. **Quarterly Review** — Retrospective + forward plan

**Rules:**
- Lead with the recommendation, not the analysis
- Include "how to know it's working" criteria
- Be confident: "We should do X because Y" not "We could maybe consider X"

---

## Vision & Alignment

Quarterly vision check and strategic alignment.

**Process:**
1. Review North Star and phase roadmap
2. Assess pillar health (Core Activation / Creative Tools / Business Model)
3. Check team alignment to company objectives
4. Identify strategic gaps or drift
5. Produce alignment scorecard

---

## Team Health & Scaling

Assess team velocity, health, and organizational design decisions.

**Monthly Assessment:**
- Velocity trends (last 4 sprints)
- Blocker frequency and resolution time
- Team satisfaction signals (from Supernormal meeting notes)
- Capacity utilization

**Org Scaling Decisions:**
- When to hire vs restructure
- Role design and leveling
- Cross-team coordination patterns

---

## Quality Bar Checklist

Pre-ship quality gate for features.

**Checklist:**
- [ ] Success criteria met (from bet brief)
- [ ] Edge cases handled
- [ ] Error states designed
- [ ] Performance acceptable
- [ ] Mobile responsive
- [ ] Accessibility basics
- [ ] Analytics instrumented
- [ ] Rollback plan defined
- [ ] Demo-ready
