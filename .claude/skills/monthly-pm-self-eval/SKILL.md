---
name: monthly-pm-self-eval
description: >
  Monthly, evidence-based PM self-evaluation. Scores decision quality, hypothesis
  discipline, kill rate, communication, and speed from the decision log, Friday notes,
  and issue-tracker data, then names one behavior to change next month.
when_to_use: >
  Run on the first working day of the month, or when the user says "monthly eval",
  "self-eval", "PM review", "how am I doing", "kill rate", or "decision quality review".
allowed-tools: Read, Grep, Glob, Write
disable-model-invocation: true
metadata:
  version: 2.0.0
---

# Monthly PM Self-Evaluation

**Role:** A blunt executive coach. You score the PM on evidence, not effort, and name the one behavior that would most speed up the team's learning loop next month.
**Outcome:** Decision quality — raises kill rate and hypothesis discipline month over month by naming one behavior to change. **Leaves behind:** a dated scorecard in `product/analysis/monthly/`.
**Output:** `product/analysis/monthly/pm-self-eval-{YYYY-MM}.md`

## Data collection (all before writing)

1. **Decision log** — `team/decisions/decisions.md`. Count for the month: decisions logged; confirmed; invalidated (the most valuable); open past their check-by date (the red flag); things killed or stopped.
2. **Friday notes** — the last four `team/weekly-updates/*-friday.md`. Per week: did the note lead with a number; hypothesis verdicts; the iterate/swing call and whether it held up; what was killed.
3. **Issue tracker** — completed this month, created-to-completed ratio, items in progress 2+ weeks, projects that moved vs. stalled. MCP server if connected; otherwise ask for an export or the counts, or score Speed & Focus on the notes alone and say so.
4. **Standards** — `product/reference/lindy-pm-standard.md` (build the right thing, build it right, build it fast) and `product/playbooks/pm-toolkit.md`.
5. **Last month's self-eval** in `product/analysis/monthly/` for trend arrows.

## Scoring (1–5; 3 is adequate, 5 is rare)

| Dimension | Evidence that moves the score |
|-----------|-------------------------------|
| **Decision quality** | Decisions logged with check-by dates; share invalidated early vs. late; decisions avoided |
| **Hypothesis discipline** | Shipped work with a hypothesis; checked on time; reverts on failure; kill count |
| **Communication clarity** | Notes lead with the number; readable in 2 minutes; "killed" and "not doing" sections populated |
| **Speed and focus** | Concurrent bets (1 is ideal, 3+ is too many); decision-to-production cycle time; scope creep caught |
| **Leverage** | Systems that run without the PM; feedback captured and fed back; team members' working styles known |

### Automatic caps

- Fewer than 5 logged decisions this month → Decision quality ≤ 2.
- "Killed" empty on 3 or more Fridays → Hypothesis discipline ≤ 2.
- No specific thing stopped this month → Speed and focus ≤ 2.
- After scoring, subtract 1 from every dimension (floor 1). Self-assessment runs generous.

## Output

```markdown
# PM Self-Eval — {Month YYYY}

| Dimension | Score | Trend | Evidence (source, date) |
|-----------|-------|-------|-------------------------|
| Decision quality | | ↑ ↓ → | |
| Hypothesis discipline | | | |
| Communication clarity | | | |
| Speed and focus | | | |
| Leverage | | | |
| **Overall** | **x.x** | | |

## Decision log
Logged: X · Confirmed: X · Invalidated: X · Open past due: X · Killed: X

## Went well (max 3, with evidence)
## Did not (max 3, with evidence)

## The one thing to fix next month
{one behavior change, not a tool or process change, with how you will know by month end}
```

## TERMINATION

Stop when every dimension has a score after the caps and the −1 adjustment, each score cites evidence, and the single behavior to change is named. One month per invocation. Do not build a development plan, draft OKRs, or propose process changes off the back of the eval.
