# Experiment Roadmap

*Running and queued experiments. Each experiment is a time-boxed bet with a measurable outcome.*

**Last updated:** <!-- YYYY-MM-DD -->

---

## Running

| ID | Experiment | Hypothesis | Owner | Start | Read-out | Status |
|----|-----------|-----------|-------|-------|----------|--------|
| EXP-1 | [Name] | [Hypothesis] | [Owner] | [Date] | [Date] | 🟡 Running |

## Queued

| ID | Experiment | Hypothesis | Depends On | Priority |
|----|-----------|-----------|------------|---------|
| EXP-2 | [Name] | [Hypothesis] | [Dependency] | High / Med / Low |

## Completed

| ID | Experiment | Result | Outcome | Shipped |
|----|-----------|--------|---------|---------|
| EXP-0 | [Name] | [Lift / No lift / Inconclusive] | ✅ Ship / ❌ Kill / ➡️ Iterate | [Date] |

---

## Experiment Brief Template

```
**ID:** EXP-N
**Name:** [Short name]
**Hypothesis:** We believe [change] will [impact metric] by [magnitude] for [segment].
**Control:** [What users see today]
**Variant:** [What we're testing]
**Primary metric:** [Metric name]
**Secondary metrics:** [What else we're watching]
**Sample size needed:** [N users over N days]
**Kill trigger:** If [guardrail metric] drops by [X%], stop immediately.
**Owner:** [Name]
```

---

*Add experiments here when they're prioritized. Move to Completed when read out. Use EXP-N sequential IDs.*
