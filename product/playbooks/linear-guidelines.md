# Linear Guidelines

How we create and maintain issues and projects in Linear. The goal: every ticket is tight, comprehensive, and based on current information. No tasks built on stale assumptions.

---

## Rule #1: Verify Before You Write

Before creating any issue or project, check what already exists and whether your assumptions are current.

**Minimum checks:**
1. **Search Linear for duplicates** — is there an existing ticket for this? A prior attempt that shipped, stalled, or was killed?
2. **Check the data** — is the metric you're referencing still accurate? Pull the latest number, not last month's.
3. **Check the current bet** — does this align with the active sprint priority in `product/roadmap/current-bet.md`? If not, flag it.
4. **Check dependencies** — who's working on adjacent things? Will this block or be blocked by in-flight work?

If you find a duplicate, update the existing ticket instead of creating a new one.
If you find your assumption is outdated, update the assumption before writing the ticket.

---

## Issue Template

Every Linear issue follows this structure. Not every section applies to every ticket — skip what's irrelevant, but never skip Problem Statement, Acceptance Criteria, or Hypothesis.

```markdown
## Problem Statement

[One sentence with a number. Lead with the data, not the narrative.]

Example: "42% of users who start chat never send a second message."
Not: "Users aren't engaging with chat enough."

## Task Summary

[1-2 sentences. Action verb. What changes when this is done.]

## Details

[Context, requirements, dependencies. Write for someone smart who has
no context on this area.

Include inline references:
- Link to related issues, PRDs, Slack threads
- Quote specific data with source and date
- Link designs/mockups if they exist]

## Acceptance Criteria

- [ ] [Specific, testable outcome — not implementation steps]
- [ ] [Given X, when Y, then Z]
- [ ] [Performance: "loads in < 2s on 3G"]

Each criterion is independently verifiable. Don't bundle.

## Hypothesis

We expect [metric] to [move how] because [reason].

**Measure:** Check [metric] in [tool] at [timeframe].
**Kill trigger:** If [metric] doesn't improve by [date], revert.
**Confidence:** [High / Med / Low] — [what we know vs. assume]

## Scope

**In scope:**
- [thing]

**Out of scope:**
- [thing — and briefly why]
```

**Confidence levels:**
- **High** — We have data or prior evidence.
- **Med** — Reasonable assumption, untested.
- **Low** — Educated guess. Consider running a smaller test first.

Bug fixes can omit hypothesis/kill trigger but must include confidence on the diagnosis.

---

## Project Template

For larger initiatives that span multiple issues. Use this structure in Linear project descriptions.

```markdown
# Description: What is it?

[1-2 sentences]

---

# Problem: What problem is this solving?

[Lead with a number. Who has this problem and how bad is it?]

---

# Why: How do we know this is a real problem and worth solving?

[Data, user feedback, competitive pressure — cite sources with dates]

---

# Success: How do we know if we've solved this problem?

Hypothesis: We expect [metric] to [move how] because [reason]
Measure: Check [metric] in [tool] at [timeframe]
Kill trigger: If [metric] doesn't improve by [date], revert/pivot

---

# Audience: Who are we building for?

| Persona | Goal | Pain Point | JTBD |
|---------|------|-----------|------|
| [who] | [what they want] | [what's broken] | [when/I want/so I can] |

---

# What: What does this look like in the product?

**Initial scope:**
- [item]

**Beyond (not now):**
- [item]

---

# How: What is the plan?

Plan (scope, designs) → Build (BE, FE) → Test (QA) → Go Live ([date])

---

# When: When does it ship and what are the milestones?

| Milestone | Date | Owner |
|-----------|------|-------|
| [milestone] | [date] | [name] |
```

Separate each section with `---` horizontal rules.

---

## Freshness Rules

Stale data creates wrong tickets. Wrong tickets waste engineering time.

1. **Every metric cited must include its date.** Not "conversion is 1.67%" but "conversion is 1.67% (Apr 3, 2026)."
2. **Data older than 2 weeks needs re-verification.** Pull the latest number before using it in a ticket.
3. **Decisions older than 1 month may have expired.** Check `team/decisions/decisions.md` — if the decision's "Check By" date has passed without a result, the assumption may no longer hold.
4. **Prior art check.** If referencing a past ticket or experiment, verify its current status in Linear. It may have shipped, been killed, or changed scope.
5. **"As of" dates on every ticket.** Include `*Context as of YYYY-MM-DD*` at the top of the Details section so readers know the freshness of the information.

---

## Sizing

| Size | Estimate | Signal |
|------|----------|--------|
| Small | < 1 day | Single component, one file, no dependencies |
| Medium | 1-3 days | Multiple components, clear scope, few dependencies |
| Large | 3-5 days | Cross-system, multiple files, needs design input |
| Epic | > 5 days | Break it down. This is not a single issue. |

If it's an epic: propose a decomposition table (title + estimate + dependencies) and get approval before creating sub-issues.

---

## Quality Checklist

Before submitting any issue:

- [ ] Problem statement leads with a number (with date)
- [ ] Data has been verified as current (not stale)
- [ ] No duplicate exists in Linear
- [ ] Acceptance criteria are specific and testable
- [ ] Hypothesis states expected metric movement
- [ ] Kill trigger has a specific date
- [ ] Confidence level is stated with justification
- [ ] Scope boundaries are explicit (in + out)
- [ ] Dependencies are identified
- [ ] Aligns with or explicitly departs from the current bet

---

## Formatting Rules

- Use real markdown line breaks. Never use `\n` or `\\n` escape sequences — they render as literal text in Linear.
- Use `- [ ]` checkbox format for acceptance criteria.
- Use Mermaid diagrams (Linear renders them natively) for flows with 3+ decision points.
- Link related issues, don't just mention them by ID.

---

## Anti-Patterns

- **"Users aren't engaging enough"** — no number, no diagnosis. Start with the data.
- **Acceptance criteria: "it works well"** — not testable. Define the threshold.
- **Citing a metric from 3 weeks ago without re-checking** — it may have moved. Pull fresh data.
- **Creating 10 issues from one conversation without review** — always propose the list first, get approval, then create.
- **Auto-assigning work** — don't assign unless explicitly told who owns it.
- **Dictating implementation** — describe the outcome, not the code. Engineers choose the how.
