# Post-Mortem — Faster editor load | 2026-10-12

**Lens:** Bet Post-Mortem · **Bet shipped:** 2026-09-11 · **Called "Won":** by 2026-10-02 (21 days after ship) · **Author:** /audit · **Decision owner:** PM

**So what:** The "Won" label isn't supported by the evidence we have. We can't find a written hypothesis or success criteria for this bet, so nobody can check whether it hit its target. The load-time result (p75 2.8s → 1.1s) appears in only one place, with no measurement source. The retention result ("week-1 retention +3 pts") is a metric this team doesn't define anywhere. The closest funnel numbers we do track moved +0.3 to +0.9 pts, and that's inside week-to-week noise. My recommendation: re-label the outcome **Won (unverified)** until Analytics and the Eng Lead attach the missing sources. Also take the "Learnings" line out of circulation for now, because as written it would push future bet ranking toward performance work without evidence.

---

**Hypothesis (as written):** *Not found.* There's no bet brief in the repo for this bet. The `betting-table.md` Completed row (last updated 2026-10-09) records only Outcome, Shipped, and Learnings. `current-bet.md` was overwritten on 2026-10-09 by the invite bet. The 2026-10-02 Demo & Decide note says only "faster editor load (won)". Below, the Outcome claims from the betting table stand in for criteria. They are **post-hoc**: they describe what happened and were not committed before ship.

| Criterion (post-hoc, from Outcome column) | Target | Actual | Verdict | Source, date |
|---|---|---|---|---|
| p75 editor load time | Not recorded (outcome says 2.8s → 1.1s) | 1.1s, per betting table only | **Unverified**: one source, no measurement window or tool named | `product/roadmap/betting-table.md`, 2026-10-09; nothing in `inputs/tracker-export.csv` (items updated through 2026-10-09) or `inputs/meeting-notes.md` (2026-10-05, 2026-10-07) |
| "Week-1 retention" | Not recorded (outcome says +3 pts) | No data available | **Unsupported**: metric isn't defined in `metrics-dictionary.md` or `context.md` (context tracks *week-4 team* retention, 52% as of 2026-09-30) | `product/roadmap/betting-table.md`, 2026-10-09; `product/context.md`, 2026-10-05; `product/analytics/metrics-dictionary.md` (undated, no retention-by-week row) |
| Proxy: signup → 3 members editing (d7), the activation definition | n/a | 13.56% → 13.90% (**+0.34 pts**, SE ≈ 0.73 pts) | **No detectable lift** | `inputs/funnel-weekly.csv`, cohorts 2026-08-10 to 2026-08-31 (pre, n=4,947) vs 2026-09-14 to 2026-09-28 (post, n=4,143); export date not recorded |
| Proxy: invited → 3 members editing (d7), the step closest to the editor | n/a | 40.94% → 40.88% (**−0.06 pts**) | **Flat** | Same, `inputs/funnel-weekly.csv`; corroborated by the 41% baseline in `product/context.md`, 2026-10-03 |
| Proxy: signup → invited (d7) | n/a | 33.13% → 34.01% (**+0.88 pts**, SE ≈ 0.99 pts) | **Small, inside noise.** The step-up first appears in the 2026-09-07 cohort, which mostly signed up *before* the 09-11 ship | Same, `inputs/funnel-weekly.csv`; 34% baseline in `product/context.md`, 2026-10-03 |

Method note: the 2026-09-07 cohort is excluded from both pools because the ship date falls inside that week. SE is the standard error of the difference between two pooled proportions.

**Validated:**
- The bet shipped on 2026-09-11, and the team moved on cleanly. The 2026-10-02 Demo & Decide note records the swing to the invite bet with an ICE score. Source: `betting-table.md`, 2026-10-09; `team/weekly-updates/2026-10-02-friday.md`.
- A load-time improvement probably happened: it's an engineering output and likely measurable. It just isn't evidenced in anything we can read. **Confidence: Med.**

**Invalidated (as stated):**
- **"Week-1 retention +3 pts."** No defined metric and no data were found. None of the three activation-stage proxies moves more than 0.9 pts, and all three moves are smaller than their sampling error. Unless Analytics produces the metric (see R2), this claim shouldn't be repeated.
- **"Performance work moved retention more than the two features before it."** This makes two claims at once: that the load work *caused* the retention move, and that the move was *bigger* than two earlier features'. The two earlier features aren't named anywhere in the repo, and no comparison data exists. Status: unsupported.

**Surprised by:**
1. **The "Won" call came before retention could be measured.** At the 2026-10-02 decision, at most two post-ship weekly cohorts had complete day-7 data. No post-ship cohort had reached week 4 (the 2026-09-14 cohort reaches week 4 around 2026-10-12). Whatever "+3 pts" refers to, it rests on one or two cohorts at most. Sources: `team/weekly-updates/2026-10-02-friday.md`, 2026-10-02; `inputs/funnel-weekly.csv`, cohort weeks.
2. **An editor stability bug followed close behind.** ACM-399 ("Fix editor crash on paste of large tables") was opened 2026-09-25, two weeks after ship, and closed 2026-10-06. Fixing it paused per-seat proration for two weeks and pushed the paywall bet back. The timing is *consistent with* a regression from the load work but is *not evidence* of one. If it is related, it's a cost of this bet that the "Won" row doesn't record. Sources: `inputs/tracker-export.csv` (ACM-399, ACM-420); `inputs/meeting-notes.md`, 2026-10-07. **Confidence it's related: Low.** The Eng Lead should confirm or rule it out.
3. **Week-to-week funnel rates are unusually stable.** Pre-ship activation ranged 13.39–13.76% across four cohorts, much tighter than binomial noise at ~1,250 signups a week would predict (about ±1 pt). Either the export is smoothed or modeled, or the cohort definition differs from the one I assumed. That stability matters: a smoothed series would also hide a real step change. Source: `inputs/funnel-weekly.csv` (export date not recorded); definitions in `product/context.md`, 2026-10-05.

**Carry-forward rule:** Before a bet ships, write down its hypothesis, metric definition, target, and measurement window. Don't mark it Won until its Outcome row cites a source and window for every number it claims.

---

## Recommended actions (not taken; human decides)

| # | Action | Owner role | Expected effect | Confidence |
|---|---|---|---|---|
| R1 | Change the `betting-table.md` Completed row Outcome to "Won (unverified)". Move the "Learnings" line out of the row until R2 lands. If the original hypothesis lives in a Linear project or bet-sync notes, attach it. *I didn't make this edit; it's listed here because you didn't ask me to update the table.* | PM | Stops an unverified learning from biasing the next bet-sync ranking | High |
| R2 | Add "week-1 retention" to `metrics-dictionary.md` (or confirm the claim meant something else). Then pull it, plus week-4 team retention, for the four signup cohorts before and the four after 2026-09-11, excluding the 09-07 straddle week. | Analytics | Turns the retention claim into a real verdict. About 1 analyst-day. Week-4 data for post-ship cohorts matures 2026-10-12 to 2026-11-02 | High that it resolves the question; Low that it shows +3 pts, given the proxies |
| R3 | Attach the source for p75 2.8s → 1.1s (RUM or perf dashboard, date range, sample) to the betting-table row. | Eng Lead | Moves the load-time criterion from unverified to supported or refuted. Under 1 hour | Med |
| R4 | Confirm whether ACM-399 traces back to the load-time change. If it does, record the two-week proration slip as a cost in the post-mortem row. | Eng Lead | Gives an honest cost side to the "Won" call. Under 1 hour | Low |
| R5 | Record the funnel export's date and generation method, and log the unusual stability (Surprise 3) in `data-quality-log.md` if it turns out to be smoothing. Separately: the `paid_d30` values for the 2026-09-14 and 2026-09-21 cohorts can't be complete as of 2026-10-12, because their 30-day windows close 10-14 to 10-27. | Analytics | Stops future post-mortems from reading immature or smoothed numbers as results | Med |

Scope note: this report covers only the faster-editor-load bet. It doesn't evaluate queued bets or recommend what to build next.

---

## Anti-bias checklist

1. **Disconfirming evidence:** I looked for it directly. The proxies were tested for a *lift*, and the only metric near the editor (invited → 3 editing) is flat.
2. **Multiple timeframes:** Four pre-ship cohorts vs three post-ship, with the straddle week excluded. The 09-07 step-up was checked separately.
3. **Triangulation:** Load time and retention each have one source only, so both are marked unverified or unsupported. The funnel proxies are checked against `context.md` baselines.
4. **Correlation vs causation:** The Learnings line's causal claim is flagged. The ACM-399 link is explicitly not asserted. Signup volume rose about 18–19% from Aug to late Sep (1,180 → 1,388–1,410 a week), so mix shift is a possible confounder for any movement.
5. **Survivorship:** I asked what the "Won" row leaves out: the post-ship crash fix and its cost to the paywall bet.
6. **Base rates:** I compared against pre-ship week-to-week range and sampling error before calling anything a lift.
7. **Effort vs impact:** The load reduction (effort/output) is kept separate from retention (impact). Only the first is plausibly true.
8. **What's missing:** a bet brief or hypothesis; a week-1 retention definition and data; a perf measurement source; the export date of `funnel-weekly.csv`; tracker history before 2026-09-10 (the export starts at items created 2026-09-10, so the load-bet tickets themselves aren't in it); names of the "two features before it."

Prior audits: none exist in `product/analysis/audit/` (checked 2026-10-12), so there are no persisted or resolved findings to carry forward.

## Evidence Loop

| # | Claim | Status | Source (file + date / query / doc) |
|---|-------|--------|-------------------------------------|
| 1 | Faster editor load shipped 2026-09-11 and is recorded as Won | supported | `product/roadmap/betting-table.md`, 2026-10-09; `team/weekly-updates/2026-10-02-friday.md`, 2026-10-02 |
| 2 | No written hypothesis or success criteria exist for the bet | supported (absence) | Searched `product/`, `team/`, `templates/`, `inputs/` on 2026-10-12; only mentions are betting-table (2026-10-09) and the 2026-10-02 note |
| 3 | p75 load fell 2.8s → 1.1s | partial | `betting-table.md`, 2026-10-09 only. Missing: measurement tool, window, second source |
| 4 | Week-1 retention rose 3 pts | assumed | `betting-table.md`, 2026-10-09 only. Metric undefined in `metrics-dictionary.md`, absent from `context.md` (2026-10-05) and `funnel-weekly.csv` |
| 5 | Activation proxies moved ≤0.9 pts, inside sampling error | supported | `inputs/funnel-weekly.csv` (cohorts 2026-08-10 to 2026-09-28; export undated), cross-checked against `product/context.md` baselines, 2026-10-03 |
| 6 | "Won" was called before week-4 retention could exist for any post-ship cohort | supported | `team/weekly-updates/2026-10-02-friday.md`, 2026-10-02; cohort weeks in `inputs/funnel-weekly.csv` |
| 7 | Performance work moved retention more than two prior features | assumed | `betting-table.md`, 2026-10-09 only. Prior features unnamed, no comparison data |
| 8 | ACM-399 crash fix cost two weeks of proration work | supported | `inputs/tracker-export.csv` (ACM-399 2026-09-25 → 2026-10-06; ACM-420 last updated 2026-09-26); `inputs/meeting-notes.md`, 2026-10-07 |
| 9 | ACM-399 was caused by the load-time change | assumed | Timing only. Not asserted, needs Eng Lead confirmation |
| 10 | `paid_d30` for 09-14 and 09-21 cohorts is immature | supported | `inputs/funnel-weekly.csv` cohort weeks vs today, 2026-10-12; d30 definition in `product/context.md`, 2026-10-05 |

**Assumption that would flip this:** that "week-1 retention" names a real, tracked metric that Analytics can produce. If R2 shows a +3 pt move across four or more post-ship cohorts (above pre-ship variance), the bet's "Won" verdict stands, and only the documentation gap remains.
**Human decides here:** the PM decides whether to re-label the betting-table row (R1) and whether the "Learnings" line keeps informing bet ranking, after R2 and R3 return.
**Confidence:** medium. The absence of criteria and of a retention source is clear. The proxy analysis depends on an undated, possibly smoothed export.
