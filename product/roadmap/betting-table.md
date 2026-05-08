# Betting Table

*Full pipeline of bets — past, active, and queued. The source of truth for what we're working on and what's next.*

**Last updated:** <!-- YYYY-MM-DD -->

---

## Active (this quarter)

| Bet | Hypothesis | Owner | Start | Gate | Status |
|-----|-----------|-------|-------|------|--------|
| [Bet name] | [One-line hypothesis] | [Owner] | [Date] | [Gate date] | 🟡 In progress |

## Queued (next quarter)

| Bet | Hypothesis | Why Now | Dependencies |
|-----|-----------|---------|-------------|
| [Bet name] | [One-line hypothesis] | [Rationale] | [What must be true first] |

## Completed

| Bet | Outcome | Shipped | Learnings |
|-----|---------|---------|-----------|
| [Bet name] | ✅ Won / ❌ Lost / ➡️ Pivoted | [Date] | [Key takeaway] |

## Killed

| Bet | Why killed | Date |
|-----|-----------|------|
| [Bet name] | [Reason] | [Date] |

---

## Bet Brief Template

When adding a new bet, fill in:

```
**Bet:** [Name]
**Hypothesis:** We believe [X] will cause [Y] for [user segment].
**Why now:** [Urgency or opportunity]
**Success metric:** [Metric] reaches [target] by [date]
**Kill trigger:** If [condition] by [date], we stop.
**Owner:** [Name]
**Estimated effort:** [S / M / L]
```

---

*Add bets here as they're defined. Move to Completed or Killed when resolved. Use git history to recover archived bets.*
