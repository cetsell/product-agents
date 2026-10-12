# Product Intelligence — 2026-09-10 to 2026-10-12

*Lens: Product Intelligence ("are we shipping to learn?"). Funnel baseline from 2026-08-10. Written 2026-10-12 by /audit. Prior audits: none found in `product/analysis/audit/`, so this is the first baseline; nothing has been carried forward or marked resolved.*

## Summary

Only partly. The active bet (Invite in onboarding) is set up to learn: the dashboard shipped first, the baseline is stable, and it has a dated kill trigger and an early read. Outside the bet, 2 of the 3 customer-facing things shipped in this window (crash fix, welcome sequence v2) have no metric or read-out date. The bet's own measure has a known fault: `invite_sent` fires twice on retry, and ticket ACM-418, which should fix it, has had no update since 2026-10-02 and has no acceptance criteria. The measured cohort starts tomorrow, 2026-10-13. **Recommended action:** Analytics closes ACM-418 and writes down a definition of invited (d7) before the 2026-10-13 cohort starts, and the PM decides whether the bet gets a holdout. Welcome v2 shipped into the same window on 2026-10-08, so without a holdout the 2026-11-02 readout cannot show which change moved the number.

## Feature lifecycle

"Requested" uses the tracker `created` date as a stand-in. The export has no request date, completed-at, or status history. "Shipped" for tracker items is the `updated` date on a Done row.

| Feature | Requested (proxy) | Shipped | Activated / measured | Lag (days) | Metric moved? |
|---------|-------------------|---------|----------------------|------------|---------------|
| Faster editor load (Completed bet) | not in export | 2026-09-11 (betting-table.md, 2026-10-09) | Result recorded in the betting table by 2026-10-09; the date it was measured is not recorded | ≤28 | **Claimed:** p75 load 2.8s → 1.1s; week-1 retention +3 pts. **Unverified:** neither the metrics dictionary nor the funnel export defines or contains week-1 retention. In the funnel export, signup → invited (d7) goes from 33.0–33.5% (Aug cohorts) to 34.0% (from the 2026-09-07 cohort on), and 3-editing/invited stays flat at about 41% (funnel-weekly.csv, cohorts 2026-08-10 → 2026-09-28) |
| Activation dashboard (ACM-401) | 2026-09-22 | Live 2026-10-01 (weekly update, 2026-10-02); Done 2026-10-02 (tracker) | Internal measurement tool, cited as in use in current-bet.md (2026-10-09) | n/a (instrument) | n/a. Shipped before the bet started, which is the right order |
| Editor crash fix on large-table paste (ACM-399) | 2026-09-25 | 2026-10-06 | **No metric, no read-out date.** There is no crash-rate metric in metrics-dictionary.md | open, 6 and counting | Unknown. Known cost: proration was paused about 2 weeks to make room for it (meeting notes, 2026-10-07) |
| Welcome sequence v2 (ACM-409) | 2026-09-20 | 2026-10-08 | **No metric, no experiment row** (experiment-roadmap.md is still the blank template) | open, 4 and counting | Unknown. It also went live 5 days before the bet's measured cohort starts (see Finding 3) |
| Invite step in onboarding (ACM-412, flag `onb_invite_v1`) | 2026-09-30 | **Not shipped.** In Progress as of 2026-10-09; QA was planned for Thu 2026-10-08 (meeting notes, 2026-10-05) | Planned: early read 2026-10-20 (meeting notes, 2026-10-07), gate 2026-11-02 (current-bet.md, 2026-10-09) | planned 7 (early) / 20 (full) from 2026-10-13 | Pending. The measuring event (`invite_sent`) is faulty, and invited (d7) is not defined anywhere |
| Share prompt after first note (ACM-415) | 2026-10-01 | **Blocked since 2026-10-03** (9 days) | — | — | — This is half of the bet's mechanism (current-bet.md, 2026-10-09) |
| Billing per-seat proration (ACM-420) | 2026-09-15 | Paused; last update 2026-09-26 (16 days ago) | — | — | — It is the stated dependency of the Usage-limit paywall bet (betting-table.md, 2026-10-09) |

Still open and not in the table: ACM-405 "Improve onboarding", ACM-418 event naming, ACM-421 upgrade copy, ACM-410 SSO. See Strategic alignment.

## Shipped-to-activated lag

- **Median: cannot be computed.** Three customer-facing items shipped in the window. One has a recorded result: editor load, ≤28 days from ship (2026-09-11) to result (recorded by 2026-10-09). Two have no measurement defined, so their lag has no end point: crash fix (6+ days) and welcome v2 (4+ days). An item with no read-out date never stops accruing lag.
- **Worst offender: Welcome sequence v2 (ACM-409).** It shipped 2026-10-08 with no metric or read-out. It also probably acts on the same step the active bet measures (signup → invited), in the same cohort window. So it is unmeasured, and it also makes the bet's result harder to attribute.
- **Why:** the only measurement plans that exist sit on the bet (current-bet.md, 2026-10-09). Non-bet work is shipped without a metric field. None of the 10 tracker rows records a success metric or read-out date, and the export has no column for one (tracker export, rows updated through 2026-10-09). `has_acceptance_criteria` is "no" on 5 of 10 rows, including the measurement ticket ACM-418.
- **Planned lag on the active bet is good:** 7 days to the early read and 20 days to the full read, from a cohort start of 2026-10-13. That design only holds if the instrument works and the invite step is actually live on 2026-10-13. Neither is confirmed as of 2026-10-12.

## Findings

**1. The bet's success measure is broken, and nobody is actively fixing it.**
- `invite_sent` fires twice on retry (meeting notes, 2026-10-07).
- ACM-418 (event naming for `invite_sent` / `invite_accepted`) is In Progress with no acceptance criteria and no update since 2026-10-02 (tracker export, 10 days without an update).
- Neither metrics-dictionary.md nor funnel-definitions.md defines signup → invited (d7). Both are unfilled templates, and funnel-definitions.md describes an unrelated "Chat" funnel (benchmarks as of Apr 2026). So no written rule says whether invited counts distinct users or events, or whether it is based on `invite_sent` or `invite_accepted`.
- data-quality-log.md (undated template) does not record the double-fire.
- *So what:* if invited counts events, the 2026-11-02 readout will be inflated. If nobody can show it counts distinct users, the readout will be disputed either way. A re-run costs at least 20 days (a two-week cohort plus 7 days). Owner: Analytics.

**2. Half of the bet's mechanism is blocked, and the dependency it waits on has no ticket.**
- ACM-415 (share prompt) has been Blocked since 2026-10-03 (tracker export). It waits on GTM copy and on the event names from ACM-418 (meeting notes, 2026-10-05).
- The GTM copy was promised "by Wednesday" (2026-10-07) with no ticket (meeting notes, 2026-10-05). There is no copy ticket for the share prompt in the export. ACM-421 is upgrade copy for a different bet.
- roadmap.md (last updated 2026-09-15, 27 days ago) still shows the share prompt as "Not started".
- *So what:* if the 2026-10-13 → 2026-10-26 cohort sees only the invite step, a miss on 45% cannot tell "invite step doesn't work" apart from "the share prompt was the part that mattered". Owners: GTM Lead (copy), PM (scope of the read).

**3. The bet's read is a before/after comparison with a confound already shipped into its window.**
- current-bet.md (2026-10-09) defines success as invited (d7) reaching 45% for the 2026-10-13 → 2026-10-26 cohort. That is a before/after comparison against the 34% baseline. The bet is behind a flag, but no holdout is described, and experiment-roadmap.md (undated, blank template) has no EXP row for it.
- Welcome sequence v2 shipped 2026-10-08 (tracker export) and will reach the same cohorts.
- Base rate (disconfirming check): signup → invited (d7) has held between 33.0% and 34.0% for 8 weekly cohorts (funnel-weekly.csv, 2026-08-10 → 2026-09-28). With about 1,400 signups a week, a two-week cohort has a standard error of roughly ±0.9 pts. A move to 38% (the kill line) or 45% (the target) would be real. The sample size is not the problem. Attribution is: the data alone cannot say which change caused a real move. Owner: PM.

**4. Shipped work outside the bet is not being measured.**
- The crash fix (Done 2026-10-06) and welcome v2 (Done 2026-10-08) have no metric (tracker export; metrics-dictionary.md has no crash-rate or email metric).
- decisions.md (undated, template row only) has no entry for the 2026-10-02 SWING (weekly update, 2026-10-02), the 2026-10-05 flag decision (meeting notes), or the 2026-10-07 proration pause (meeting notes).
- The Definition of Done in CLAUDE.md requires the decision log and experiment roadmap to be updated. Neither was. Owners: GTM Lead (welcome v2), Eng Lead (crash fix), PM (decision log).

**5. The one recorded "win" can't be checked against our own data.**
- betting-table.md (2026-10-09) credits Faster editor load with "week-1 retention +3 pts" and concludes "performance work moved retention more than the two features before it".
- Week-1 retention is not in metrics-dictionary.md, funnel-definitions.md, context.md baselines (2026-10-05, which lists only week-4 team retention, 52% as of 2026-09-30), or funnel-weekly.csv.
- The "two features before it" are not named in any file.
- *So what:* this learning is already being used to steer priorities (it appears in the Learnings column), but its source is not on record. Owner: PM.

**6. Some work in progress has gone stale or isn't on the roadmap.**
- ACM-405 "Improve onboarding": 32 days old, no update for 24 days, no acceptance criteria, owned by the PM. Its scope overlaps ACM-412 and ACM-415 (tracker export, updated 2026-09-18; current-bet.md, 2026-10-09).
- ACM-420 proration: paused (meeting notes, 2026-10-07), no update since 2026-09-26. The betting table still lists the paywall bet as Queued with this dependency and no slip noted (betting-table.md, 2026-10-09). Meanwhile ACM-421 (upgrade copy for that bet) was opened 2026-10-07.
- ACM-410 SSO for Team plan (opened 2026-10-08) does not appear in roadmap.md (2026-09-15) or betting-table.md (2026-10-09). Owners: PM (405, 410 triage), Eng (BE) (420 date).

## Strategic alignment

Pillars from product/context.md (2026-10-05). Ticket counts come from the tracker export (rows updated through 2026-10-09).

| Pillar | Tickets | Shipped in window | Measured? |
|--------|---------|-------------------|-----------|
| Activation (Now: Q4 2026) | ACM-412, 415, 418, 401, 405, 409 (6 of 10) | ACM-401, ACM-409 | 401 is the measuring tool; 409 is unmeasured |
| Collaboration depth | none (0 of 10) | — | — |
| Monetization | ACM-420, 421; ACM-410 if SSO is a Team-plan driver (not stated) | none | — |
| Unmapped / quality | ACM-399 (crash fix); ACM-410 (not on roadmap) | ACM-399 | Unmeasured |

Read: effort is concentrated on the Now theme (Activation), as it should be, and the empty Collaboration depth row matches its "Next" horizon. That is not a finding. The gaps are the unmapped work (ACM-410) and the Monetization dependency that has slipped without being recorded (ACM-420).

## Recommendations

| # | Action | Owner (role) | Expected effect | Confidence |
|---|--------|--------------|-----------------|------------|
| 1 | Before the 2026-10-13 cohort starts: dedupe `invite_sent` on retry, write the invited (d7) definition (distinct users, which event) into metrics-dictionary.md, add acceptance criteria to ACM-418, and log the double-fire in data-quality-log.md | Analytics | Protects the 2026-11-02 gate; avoids a ≥20-day re-run | High that it's needed; Med that it lands before 2026-10-13 |
| 2 | Decide whether `onb_invite_v1` runs with a holdout, and add an EXP row for the bet in experiment-roadmap.md either way | PM (decision); Eng (FE) (flag config) | Separates the invite step's effect from welcome v2; makes the 45% / 38% read attributable | Med |
| 3 | Open a ticket for the share-prompt copy and deliver it. PM decides now whether the 2026-10-13 → 2026-10-26 read covers the invite step only or both changes, and writes that into current-bet.md | GTM Lead; PM | Ends the 9-day block on ACM-415; keeps a miss interpretable | Med |
| 4 | Give welcome v2 and the crash fix one metric and a read-out date each, or explicitly record them as "unmeasured by choice" | GTM Lead (409); Eng Lead (399) | Turns 2 open-ended lags into a read within about 14 days | Med |
| 5 | Find and record the source and measurement date for "week-1 retention +3 pts" in betting-table.md, or downgrade the learning to "unverified" | PM | Stops an unsourced learning from steering the next bet choice | High |
| 6 | Triage stale and unmapped WIP: close or merge ACM-405 into 412/415; put a new date on ACM-420 and note the paywall slip in betting-table.md; place ACM-410 on the roadmap or park it. Log the 2026-10-02, 2026-10-05, and 2026-10-07 decisions in decisions.md and refresh roadmap.md (27 days old) | PM; Eng (BE) | Cuts zombie WIP; brings the shared state back to ≤14 days old | High |

Not recommended here, because it is out of scope for this audit: new bets, re-ranking the queue, or staffing changes. The paywall slip is reported, not re-planned.

## Anti-bias checklist

1. **Disconfirming evidence:** I looked for it. The active bet is well designed (dashboard first, stable baseline, kill trigger, early read), and the empty Collaboration depth row is correct for its horizon. Both are stated above.
2. **Timeframes:** 8 weekly funnel cohorts (2026-08-10 → 2026-09-28); tracker rows from 2026-09-10 → 2026-10-09; meetings on 2026-10-05 and 2026-10-07.
3. **Triangulation:** every finding cites at least two independent files with dates.
4. **Correlation vs causation:** the step from 33.0–33.5% to 34.0% invited (d7) from the 2026-09-07 cohort lines up with the editor-load ship (2026-09-11). It is not credited to it, because a load-time change has no obvious path to invites.
5. **Survivorship:** checked the Killed bet (AI summary, 2026-08-29) and the never-started share prompt. The editor-load "learning" compares against two features that aren't named, which is a possible survivorship gap.
6. **Base rates:** checked weekly variance in invited (d7) before judging the 38% / 45% thresholds.
7. **Effort vs impact:** ticket counts by pillar are effort only. No ticket in the window has a measured impact other than the editor load claim.
8. **Missing data:** the tracker export is not split by week, has no completed-at, cycle-time, or status history, and holds only 10 rows (probably filtered). Proxy cycle time (created → Done `updated`) for the 3 Done rows is 10, 11, and 18 days, median 11; treat it as indicative. Paid (d30) for the 2026-09-28 cohort hasn't matured yet. `activated_teams` equals `three_editing_d7` in all 8 rows, which may be a duplicated column or definition; it should be checked but was not used in any finding. There are no customer-insight captures in the window.

## Evidence Loop

| # | Claim | Status | Source (file + date / query / doc) |
|---|-------|--------|-------------------------------------|
| 1 | `invite_sent` double-fires on retry and ACM-418 is stale with no acceptance criteria | supported | inputs/meeting-notes.md, 2026-10-07; inputs/tracker-export.csv, ACM-418 updated 2026-10-02 |
| 2 | Invited (d7) has no written definition | supported | product/analytics/metrics-dictionary.md (undated template); product/analytics/funnel-definitions.md (Apr 2026, wrong funnel) |
| 3 | The double-fire inflates the bet metric | assumed | none. Depends on whether invited counts events or distinct users, which is undocumented |
| 4 | The share prompt is blocked and its copy has no ticket | supported | tracker-export.csv, ACM-415 Blocked since 2026-10-03; meeting-notes.md, 2026-10-05 |
| 5 | The bet read is before/after with no holdout | partial | current-bet.md, 2026-10-09 (success = cohort reaches 45%); experiment-roadmap.md blank. A holdout may exist in flag config that isn't documented here |
| 6 | Welcome v2 is a confound for invited (d7) | partial | tracker-export.csv, ACM-409 Done 2026-10-08. Its content and whether it prompts invites are not in any file |
| 7 | Invited (d7) baseline is stable at 33.0–34.0% | supported | inputs/funnel-weekly.csv, cohorts 2026-08-10 → 2026-09-28; product/context.md 34% as of 2026-10-03 |
| 8 | 2 of 3 customer-facing ships have no metric | supported | tracker-export.csv (ACM-399 Done 2026-10-06, ACM-409 Done 2026-10-08); metrics-dictionary.md; experiment-roadmap.md |
| 9 | "Week-1 retention +3 pts" for editor load is unverifiable from team-os | supported (that it's unverifiable) | betting-table.md, 2026-10-09; context.md, 2026-10-05; funnel-weekly.csv |
| 10 | The invite step will be live for the 2026-10-13 cohort | assumed | tracker-export.csv shows ACM-412 In Progress at 2026-10-09; QA was planned for 2026-10-08 (meeting notes, 2026-10-05); no ship confirmation |
| 11 | Proration pause slips the paywall bet | supported | meeting-notes.md, 2026-10-07; betting-table.md, 2026-10-09 (dependency listed, no slip noted) |
| 12 | ACM-410 SSO is not on the roadmap | supported | tracker-export.csv, 2026-10-08; roadmap.md, 2026-09-15; betting-table.md, 2026-10-09 |

**Assumption that would flip this:** that invited (d7) counts events, or that no holdout exists. If Analytics confirms it already counts distinct users from `invite_accepted`, and the flag already holds out a control, then Findings 1 and 3 shrink to housekeeping. The headline would become only "non-bet work ships unmeasured" (Finding 4).
**Human decides here:** the PM decides whether to add a holdout and how to scope the 2026-11-02 read (invite step only vs. both changes). Analytics decides the invited (d7) definition. GTM Lead and Eng Lead decide whether welcome v2 and the crash fix get a metric or are marked unmeasured by choice.
**Confidence:** medium. The sources agree with each other and are dated. But the tracker export is a thin, unsegmented snapshot, the metric definitions are missing, and two key facts (flag config, ship date of ACM-412) are not in any file.
