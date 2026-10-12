# RUNLOG — cadence / monday-kickoff

## (a) User message
"Run the Monday kickoff for this week. Tracker and meeting notes are not connected; the exports are in inputs/tracker-export.csv and inputs/meeting-notes.md." (Today: Monday 2026-10-12)

## (b) Files read (workspace-relative)
- CLAUDE.md
- .claude/skills/cadence/SKILL.md
- inputs/tracker-export.csv
- inputs/meeting-notes.md
- product/context.md
- product/roadmap/current-bet.md
- product/roadmap/betting-table.md
- product/roadmap/roadmap.md
- team/weekly-updates/2026-10-02-friday.md
- team/weekly-updates/YYYY-MM-DD.md
- team/weekly-updates/CLAUDE.md
- templates/weekly-update.md
- team/cadence.md (first 60 lines)
(Directory listings only: workspace tree, inputs/, templates/, team/weekly-updates/. Did not read inputs/funnel-weekly.csv, strategy-memo.md or inputs/eval/.)

## (c) Files created or modified
- team/weekly-updates/2026-10-12-kickoff.md (created)
- RUNLOG.md (created)

## (d) Final message to the user

Monday kickoff is written to `team/weekly-updates/2026-10-12-kickoff.md`. I used your tracker and meeting-notes exports; Linear and the meeting-notes server were not connected, and I did not pull the warehouse.

**Priority this week:** get the invite step (ACM-412, flag `onb_invite_v1`) live for every signup from 2026-10-13, with trustworthy invite events. The 2026-10-13 to 2026-10-26 cohort is the read on the bet (34% to 45% signup → invited d7; kill trigger below 38% by 2026-11-02), and the cohort starts tomorrow.

**Success by Friday 2026-10-16:**
1. Flag on in production for all new signups.
2. `invite_sent` and `invite_accepted` fire once per action, including on retry (ACM-418 closed).
3. The dashboard shows invites per signup day.

**Last week:** none of the three week-41 areas closed. The invite step is still In Progress, the share prompt has been Blocked since 2026-10-03, and the dashboard was already Done on 2026-10-02. The editor crash fix (ACM-399) and welcome sequence v2 (ACM-409) shipped, but neither was on the bet and neither has a metric yet.

**Data gaps:**
- The tracker and notes show nothing about the Thursday 2026-10-08 QA result or whether the flag is on in production.
- No Friday 2026-10-09 Demo & Decide note exists, so no iterate-or-swing call is on file for week 41.
- Completion dates come from the tracker's `updated` field, so they are `assumed`.

**Decisions and checks for you:**
1. Today, get the ACM-412 QA result and flag state from Eng (FE), then decide go or no-go for flag-on by 2026-10-13.
2. Decide whether the cohort runs on the invite step alone if the share prompt isn't ready. Log it in `decisions.md` once you decide.
3. Decide what to do about `invite_sent` firing twice on retry: fix it before 2026-10-13, or accept it and dedupe at query time. I assumed the dashboard's invited metric reads `invite_sent`; confirm that with Analytics.
4. Get the GTM Lead to ticket the share-prompt copy with a date. It was promised by 2026-10-07 and there is no ticket. ACM-421 (upgrade copy for the 50-note limit) is competing for the same person.
5. The 2026-10-20 early read only covers 2026-10-13 signups, since they are the only ones with a full day 7 by then. The full cohort matures on 2026-11-02, the same day as the kill-trigger deadline, so there is no slack.
6. Housekeeping:
   - `roadmap.md` is stale (2026-09-15) and still says the share prompt is not started.
   - ACM-405 is vague, PM-owned and idle since 2026-09-18.
   - The paywall bet's proration dependency slips because ACM-420 is paused.

The note ends with the paste-ready team message. Nothing was sent or posted to any tracker.
