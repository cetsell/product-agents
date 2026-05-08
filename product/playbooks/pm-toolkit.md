# Product Manager Toolkit — Playbook & Integration Guide

*Added: 2026-03-12*
*Skill file: `.claude/skills/product-manager-toolkit.md`*

---

## What This Skill Does

The `/product-manager-toolkit` provides the **craft layer** of PM work — the fill-in-the-blank templates, scoring tools, and document formats that translate strategic decisions into executable artifacts. While the `pm-principles-guide.md` defines the *why* and *what* of PM frameworks, this toolkit provides the *how to write it*.

It fills specific gaps that are referenced but not fully defined in the principles guide:
- Press Release from the Future (referenced in pm-principles-guide Section XI)
- Pre-Mortem template (referenced in pm-principles-guide Section XI)
- Metric Tree decomposition (referenced in pm-principles-guide Section XI)
- Saying No template (referenced in pm-principles-guide Section XI)

**Output location:** `pm-workflows/analysis/pm-toolkit/[type]-[topic]-[date].md`

---

## The 7 Tools at a Glance

| Tool | When to Use | Time to Run |
|------|-------------|-------------|
| **1. RICE Scoring** | Comparing features within or between bets | 10–15 min |
| **2. Customer Discovery** | User/creator interviews, Supernormal synthesis | 20–30 min |
| **3. Bet Brief** | Any bet moving from Drafting → Ready | 20–30 min |
| **4. Full PRD** | Cross-quarter features, design-heavy work | 45–60 min |
| **5. Discovery Frameworks** | Hypothesis, OST, Press Release, Pre-Mortem, Metric Tree | 15–20 min each |
| **6. Stakeholder Comms** | Saying no, alignment emails, scope decisions | 5–10 min |
| **7. Quality Bar Checklist** | Before marking any bet Done | 10 min |

---

## RICE vs ICE — When to Use Which

The system uses both scoring frameworks for different decisions:

| Framework | Level | When |
|-----------|-------|------|
| **ICE** (from pm-principles-guide) | Bet-level | Choosing between bets for the betting table; Thursday Iterate vs. Swing |
| **RICE** (from this toolkit) | Feature-level | Comparing individual features within a bet; backlog grooming inside a sprint |

**Rule:** Never use ICE for feature-level decisions — the reach dimension matters for features in ways that don't show up in bet-level ICE. Never use RICE for Iterate vs. Swing — that decision needs strategic context, not just reach/impact.

---

## Bet Brief vs Full PRD — Which to Use

| Size | Document | Signal |
|------|----------|--------|
| 1 sprint (≤5 days) | **Bet Brief** (Tool 3) | Standard weekly bet |
| 2–3 sprints | **Bet Brief + technical appendix** | Larger sprint, still tactical |
| 4+ sprints / cross-quarter | **Full PRD** (Tool 4) | Requires design review cycle |
| Strategic / multi-team | **Full PRD + product-strategist GTM** | Major initiative |

For most day-to-day work, Bet Briefs are the right format. Full PRDs are reserved for larger features — things with significant design, data schema, and cross-team coordination needs.

---

## Discovery: Supernormal as Passive Research

You don't always need formal user interviews. Meeting transcripts are a rich source of passive qualitative data. Use Tool 2's "Synthesizing Meetings as Interview Data" pattern weekly:

```
After each week's meeting summaries:
→ Extract JTBD signals (what are users complaining about or requesting?)
→ Log pain points with severity
→ Flag Linear gaps (decisions made in calls not reflected in tickets)
```

This turns every meeting into a low-cost discovery session without scheduling additional user calls.

---

## The Pre-Mortem Gate

A pre-mortem should be run **before finalizing the ICE Confidence score** on any bet that scores Confidence ≥ 7/10. The reason: high-confidence bets are where overconfidence is most dangerous. If pre-mortem reveals a real risk, lower Confidence to reflect it.

Trigger: Run pre-mortem whenever you hear yourself saying "this is obvious" or "we've done this before."

---

## The Press Release Test

Before committing to build anything significant, write the press release first (Tool 5). This test reveals:
- If the user quote sounds authentic → value prop is real
- If the user quote sounds like marketing → rethink the value prop
- If you can't write the headline → the feature isn't well-defined enough

It takes 10 minutes and saves sprint capacity on features that shouldn't ship.

---

## Quality Bar: The "CPO Standard" Connection

Tool 7 maps directly to the CPO Output Standards in pm-principles-guide Section XI. Specifically:

> "An artifact is still at PM standard if it lists tickets instead of synthesizing insight, flags risk without making a call, or uses placeholder language."

Tool 7 is the pre-ship checklist that prevents CPO-standard violations before they happen. Run it before marking any bet Done — especially the "One Insight" test (not a bullet list, a paragraph).

---

## Opportunity Solution Tree — How to Use It

The OST in Tool 5 maps your North Star metric to specific opportunity areas and solution candidates. Use it during:

- **Monday Kickoff:** Confirm this week's bet addresses the right opportunity leg
- **Betting Table Review:** Ensure the pipeline covers all opportunity legs, not just one
- **Quarterly Review (product-strategist Mode 5):** Check which legs are under-invested

A healthy betting table should have bets spread across multiple OST legs, not all stacked in one.

---

## The Metric Tree — First Response to "The North Star Isn't Moving"

When a metric isn't moving, the instinct is to "work harder on the same thing." The Metric Tree forces you to diagnose *which leg* is broken before choosing the next bet. It's the difference between guessing and knowing.

Run it:
1. When MRR/subscriber growth stalls for 2+ weeks
2. When a bet shipped but the primary metric didn't move
3. Before the quarterly strategy review (product-strategist Mode 5)

The diagnosis output directly informs the next bet selection on the betting table.

---

## Integration with the Weekly Cycle

```
MONDAY
  → Tool 3 or 5: Confirm bet brief is complete for this week's bet
  → Tool 6: Alignment email drafted for stakeholders if needed

TUESDAY (deep work)
  → Tool 1: RICE scoring for features within this sprint
  → Tool 5: Pre-mortem on the bet before team commits

THURSDAY
  → Tool 7: Quality bar check on anything staging for demo
  → Tool 3: Bet brief for next bet must be in "Ready" status

FRIDAY
  → Tool 7: Pre-ship checklist before marking Done
  → Tool 5: "One Insight" paragraph for the post-mortem

ANYTIME
  → Tool 2: Synthesize Supernormal transcripts for passive discovery
  → Tool 5: Press Release test for any new feature proposal
  → Tool 6: Saying No response when stakeholder pushes back
```

---

## Example Invocations

```bash
# RICE scoring
"Read .claude/skills/product-manager-toolkit.md and run RICE scoring
on these [N] feature candidates for the Proactivity bet."

# Discovery synthesis
"Synthesize this week's Supernormal meetings using the PM toolkit
customer discovery format — extract JTBD signals and Linear gaps."

# Bet brief
"The Creative Tools bet is drafting. Use the PM toolkit to write a
bet brief for it."

# Pre-mortem
"We're about to finalize ICE confidence at 8/10 for the Acquisition
Loops bet. Run a PM toolkit pre-mortem first."

# Press release
"We're proposing a Proactive Character Messaging feature. Run the
PM toolkit press release test before we spec it."

# Metric tree
"MRR has been flat for 3 weeks. Run the PM toolkit metric tree
decomposition to diagnose which leg is the constraint."

# Quality check
"Before I mark the Latency bet Done, run the PM toolkit quality
bar checklist."
```

---

*For the skill definition, see: `.claude/skills/product-manager-toolkit.md`*
*For PM principles and frameworks, see: `pm-principles-guide.md`*
*For bet requirements depth, see: `strategy/business-analyst-playbook.md`*
*For strategic framing, see: `strategy/product-strategist-playbook.md`*
