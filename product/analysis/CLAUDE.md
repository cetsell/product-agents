# Analysis

Where skills write their outputs. One subfolder per skill family, created on first write. Every file is dated in its name (`{type}-{topic}-{YYYY-MM-DD}.md`).

| Folder | Written by | What is in it |
|--------|-----------|---------------|
| `strategy/` | `/strategy` | Prioritization, OKR cascades, competitive and discovery analyses |
| `audit/` | `/audit` | Operational and product intelligence, post-mortems, process audits |
| `data/` | `/data-analyst` | Funnel audits, growth trends, metric-breach diagnoses |
| `evidence/` | `/evidence-loop` | Stand-alone evidence appraisals |
| `premortem/` | `/premortem` | Premortem reports (HTML) and transcripts |
| `prompts/` | `/senior-prompt-engineer`, `/eval-runner` | Prompt audits, designs, eval runs |
| `monthly/` | `/cadence` (monthly recap), `/monthly-pm-self-eval` | Monthly recaps and self-evaluations |
| `skill-evals/` | `/skill-eval` | Dated behavioral eval results for the skill library |

Treat files here as dated snapshots. Cite them with their date; re-run the skill rather than editing an old analysis.

## Trail

Append-only. Every run or skill that writes a file into this repo adds **one line** here, newest last, and reads the last ten lines before it reads anything else. This is how runs learn what happened since they last ran without anyone sending a message: the trail is the pheromone, not a notification.

Format: `{YYYY-MM-DD} {run or skill} wrote {path}: {one-line result}`

```
2026-10-29 (example) /judge wrote product/analysis/judge/verdicts-2026-10-29.md: 2 decided, 1 sent back, 3 held
```

Keep the last 200 lines; older lines can be deleted, git has them.
