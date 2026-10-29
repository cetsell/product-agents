# Routine: metric-breach

Binding for `metric-breach` in `proactive/runs.yml`. Paste everything below the line as the routine prompt. Daily is enough; the run does nothing unless a new alert file has landed. Product Agents ships no metric monitor: the alert file in `product/signals/` is the contract (`product/signals/CLAUDE.md`). Point your analytics tool's alert webhook or a scheduled export at that folder and name the file `{date}-{source}-alert.md`.

---

/data-analyst — Quantify any metric breach that landed as an alert file.

- Read `product/context.md`, `product/analytics/metrics-dictionary.md`, and `CLAUDE.md` for repo rules.
- Candidates are files in `product/signals/` whose name contains `alert`, ends in `.md` or `.csv`, is not `sample-*`, and for which no `product/analysis/data/alert-*-<same date>.md` exists yet. If there are none, stop and write nothing.
- For each alert: restate the metric, threshold, observed value, window, and source as the file gives them. If a warehouse connector is present, run the read-only queries that confirm the breach and split it by the dimension most likely to explain it (flag arm, cohort, platform); otherwise write the SQL and mark every number `from alert file, <date>`. Hypothesize the likely cause in one paragraph with its evidence status. Do not estimate numbers the file or a query did not give.
- Write one file per alert to product/analysis/data/alert-<metric-slug>-<YYYY-MM-DD>.md with an Evidence Loop appendix. Do not append the triage footer to the alert file; `/triage` owns that.
- Create a branch `claude/metric-breach-<YYYY-MM-DD>`, commit only the analysis file(s), push the branch, and open a draft pull request titled "metric-breach — <metric> — <YYYY-MM-DD>" whose body is the breach in two lines and the likely cause in one.
- Do not send email or chat messages, do not create or edit tickets, and do not edit roadmap files.
- Stop when the skill's TERMINATION condition is met.
