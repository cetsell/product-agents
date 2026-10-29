# Signals

The inbox where what users and the product are saying lands as files, so a run can read the alert, the bug report, or the metric itself instead of a human's summary of it. Nothing in Product Agents fetches signals; your webhook, export job, or routine connector drops them here. Zero model cost until `/triage` reads them.

## Drop contract

| Rule | Detail |
|------|--------|
| One file per source drop | `{YYYY-MM-DD}-{source}.md` or `.csv`, e.g. `2026-10-29-analytics-alert.md`, `2026-10-29-support-export.csv`. Two drops from one source on one day: add a suffix (`-2`). |
| Who writes | The team's webhook, scheduled export, or connector. A human pasting an export in by hand also counts. |
| What a file holds | The signal as the source emitted it, plus a one-line header naming the source and the window it covers. No interpretation. |
| Sources that fit | Analytics alerts (threshold crossings), error-tracker digests, support exports, NPS verbatims, app-store reviews, sales call notes. |
| Processed marker | `/triage` appends one footer line to every file it read: `<!-- processed by /triage YYYY-MM-DD -->`. A file with that footer is skipped on the next run. Remove the line to re-triage a file. |
| Samples | `sample-*.md` are tracked examples of the format and are never triaged. Everything else in this folder is gitignored (user layer). |
| Alerts and `/data-analyst` | A file whose name contains `alert` is also what the `metric-breach` run looks for (`proactive/runs.yml`); it quantifies the breach before `/triage` sorts it. |

## What reads this folder

| Run | When | Does |
|-----|------|------|
| `/triage` (`signals-triage`, daily) | a file without the processed footer exists | sorts every item into do now / queue / decline / new bet, writes `team/active/triage-{date}.md`, appends the footer |
| `/data-analyst` (`metric-breach`, daily) | a new `*alert*` file exists | quantifies the breach with source and date in `product/analysis/data/` |

Both runs exit immediately when nothing new is here, so a daily schedule costs nothing on a quiet day.
