# RUNLOG

## (a) User message
"Monday kickoff please. Exports are in inputs/. Keep it tight."  (Skill: cadence; today 2026-10-12)

## (b) Files read
- runner-brief-2.md (scratchpad)
- CLAUDE.md
- .claude/skills/cadence/SKILL.md
- .mcp.json
- inputs/funnel-weekly.csv, inputs/meeting-notes.md, inputs/strategy-memo.md, inputs/tracker-export.csv
- product/context.md
- team/CLAUDE.md, team/weekly-updates/CLAUDE.md, team/weekly-updates/2026-10-02-friday.md, team/weekly-updates/YYYY-MM-DD.md
- product/roadmap/CLAUDE.md, current-bet.md, betting-table.md, roadmap.md
(inputs/eval/ was listed but not read; not part of the skill.)

## (c) Files created/modified
- Created: team/weekly-updates/2026-10-12-kickoff.md
- Created: RUNLOG.md

## (d) Final message

Monday kickoff written to `team/weekly-updates/2026-10-12-kickoff.md`.

**Priority:** invite teammates inside onboarding, live for the 2026-10-13 signup cohort. The bet moves invited (d7) from 34% to 45%. Baseline is 34.0% (472 of 1,388) for the 2026-09-28 signup week, flat at 33-34% for 8 weeks. The kill trigger is below 38% by 2026-11-02.

**Success by Friday (2026-10-16):**
1. Invite step passes QA and `onb_invite_v1` is on for new signups (ACM-412).
2. Event names are final and the `invite_sent` retry double-fire is resolved (ACM-418).
3. Share prompt is demo-able on staging with final GTM copy (ACM-415).

**Last week:** the invite step missed QA and is still In Progress as of 2026-10-09. The editor crash fix (2026-10-06) and welcome sequence v2 (2026-10-08) shipped. Neither has an impact metric yet. No 2026-10-09 Friday note exists, so I rebuilt last week from the tracker and meeting notes.

**PM actions:**
1. Decide by 2026-10-13 whether the cohort starts on time. The success window runs 10-13 to 10-26, so a late flag moves the window and the 11-02 gate.
2. Get Analytics to confirm invited (d7) counts distinct users. The double-fire on retry could inflate it.
3. Chase GTM Lead for share-prompt copy (overdue since 2026-10-07, no ticket) and create a ticket for it.
4. Hold the Slack digest memo. It asks to commit at Friday's sync, but the active bet has no readout until 2026-11-02. Run `/evidence-loop` on it first.
5. Rescope or close ACM-405 "Improve onboarding" (no acceptance criteria, untouched since 2026-09-18).

**Dependencies:** GTM copy is overdue. Event names (ACM-418) have been open since 2026-10-01. I proposed due dates of 10-13 and 10-14; confirm or change them. The early invited (d7) read comes 2026-10-20 and covers only 10-13 signups. The full cohort closes 2026-11-02.

**Gaps:**
- I used the `inputs/` exports because no tracker, warehouse or meeting-notes server is connected.
- "Done" dates use the tracker `updated` field, since the export has no completion date. Treat them as assumed.
- The funnel export ends at the 2026-09-28 week (14 days old).
- ACM-420 (proration) has had no update since 2026-09-26. The notes say it was paused for the crash fix, which closed 2026-10-06, so confirm with BE whether it resumed.
- `roadmap.md` (2026-09-15) and the Week 41 table in `current-bet.md` are stale. I did not edit them.

Team message (paste-ready):
> Priority: invite teammates inside onboarding, live for the 10-13 signup cohort.
> Friday: invite step QA'd and on, event names final, share prompt demo-able with real copy.
> Last week: crash fix and welcome v2 shipped; invite step missed QA.
> Need: GTM share-prompt copy (overdue) and Analytics event names (ACM-418) by Wed 10-14.

I have not sent or posted anything.
