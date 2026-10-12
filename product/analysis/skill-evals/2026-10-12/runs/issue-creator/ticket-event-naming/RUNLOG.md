# RUNLOG: issue-creator / ticket-event-naming

## (a) User message

"Make a ticket for fixing the duplicate invite_sent event that fires twice on retry. Linear is not connected."

## (b) Files read

- CLAUDE.md
- .claude/skills/issue-creator/SKILL.md
- .mcp.json
- inputs/tracker-export.csv
- inputs/meeting-notes.md
- inputs/funnel-weekly.csv
- inputs/strategy-memo.md (first 40 lines)
- product/context.md
- product/analytics/CLAUDE.md
- product/analytics/funnel-definitions.md
- product/analytics/metrics-dictionary.md
- product/analytics/data-quality-log.md
- product/playbooks/linear-guidelines.md
- product/roadmap/betting-table.md (first 60 lines)
- team/decisions/decisions.md (first 40 lines)
- engineering/CLAUDE.md
- engineering/README.md
- grep only (matching lines): inputs/eval/dataset.jsonl, inputs/eval/transcripts/variant-a/m1.txt, product/analytics/bigquery-reference.md
- Directory listings: workspace root, inputs, product, engineering, .claude
- Outside workspace, as instructed: scratchpad/runner-brief-2.md

## (c) Files created or modified

- RUNLOG.md (this file). No other project files were created or modified. Nothing was created in a tracker.

## (d) Final message to the user (verbatim)

Linear is not connected, so this is a paste-ready draft. Nothing has been created.

**Possible duplicate: ACM-418 "Event naming for invite_sent / invite_accepted"** (Growth, Analytics, In Progress, created 2026-10-01, last updated 2026-10-02, no acceptance criteria). The 2026-10-07 growth sync notes link the double-firing to that ticket ("event naming ticket ACM-418 still open"). It is about event names, though, and this is a firing bug. Do you want to update ACM-418 with the criteria below, or create a new ticket and link the two? The draft works either way. I'd lean toward a new ticket: ACM-418 is a naming task that is already in progress and has no criteria, and mixing a bug into it makes both harder to close.

---

**Title:** Fix duplicate invite_sent event on invite retry

## Problem
Each retried invite fires `invite_sent` 2 times instead of 1 (reported by Analytics, growth sync 2026-10-07). The share of invites that retry has not been measured, so the size of the overcount is unknown.

## Summary
Make `invite_sent` fire exactly once per invite attempt, including retries, before the 2026-10-13 cohort is read.

## Details
*Context as of 2026-10-12*

- The active bet "Invite in onboarding" (gate 2026-11-02) is judged on signup → invited (d7): baseline 34% (2026-10-03, warehouse `fct_funnel_activation`), target 45%. The latest weekly row in the funnel export (week of 2026-09-28) is 472 invited of 1,388 signups = 34.0%.
- The invite step is behind flag `onb_invite_v1` (ACM-412, In Progress). The PM wants an early read on invited (d7) for the 2026-10-13 cohort by 2026-10-20.
- If invited (d7) is computed from `invite_sent` events rather than distinct users, duplicates can inflate it and make the bet look better than it is. I could not confirm how the metric is computed (see open questions).
- Related: ACM-418 (event naming for `invite_sent` / `invite_accepted`), ACM-412 (the invite step).
- Repro, as reported: trigger an invite send that fails and is retried, then inspect the events. Exact steps are not documented in any source I have; the reporter (Analytics) can supply them.

## Acceptance criteria
- [ ] Given an invite send that is retried once, when the retry succeeds, then exactly 1 `invite_sent` event is recorded for that invite.
- [ ] Given an invite send that is retried N times (N = 1, 2, 3), then exactly 1 `invite_sent` event is recorded for that invite.
- [ ] Given an invite that succeeds on the first attempt, then exactly 1 `invite_sent` event is recorded (no regression).
- [ ] Given an invite that fails on every attempt, then 0 `invite_sent` events are recorded.
- [ ] Two different invites sent by the same user to different recipients still record 2 `invite_sent` events.
- [ ] A query on the warehouse events table for the first 24 hours after release returns 0 pairs of `invite_sent` events that share the same invite and the same user within a retry window.
- [ ] The measured duplicate rate before the fix (duplicate `invite_sent` events / total `invite_sent` events, last 7 days) is recorded in this ticket.
- [ ] The fix is live in production before the 2026-10-13 cohort starts, or the ticket states that the cohort is affected and names the date the fix shipped.

## Job story
When I read invited (d7) for the invite-in-onboarding bet, I want each invite counted once however many times it was retried, so I can trust the lift against the 34% baseline.

## Hypothesis
Bug fix, so no kill trigger. Expected outcome: the `invite_sent` duplicate rate drops from the unmeasured pre-fix level to 0% because each invite attempt is recorded once.
Measure: duplicate rate in the warehouse at 24h and 7d after release.
Confidence: Low to Med on the diagnosis. We know only that it "fires twice on retry" from one verbal report at the 2026-10-07 sync. There is no count, no repro steps, and no confirmed root cause.

## Analytics
- Metric that matters: duplicate rate = duplicate `invite_sent` events / total `invite_sent` events.
- Leading indicator: duplicate pairs in the first 24h after release (target 0).
- Counter-metric (must not get worse): `invite_sent` events reconciled against invites actually created, so the fix does not drop real sends.
- Events and where tracked: `invite_sent` (and, in scope for a check only, `invite_accepted`); tracked in the product analytics pipeline that feeds `fct_funnel_activation`.
- Success threshold and date: duplicate rate 0% and counter-metric within 1% of invites created, verified by 2026-10-20 (the PM's read date).

## Scope
In:
- `invite_sent` firing once per invite attempt, including retries.
- Recording the pre-fix duplicate rate.
- Flagging the affected cohorts in `product/analytics/data-quality-log.md` (currently empty).

Out (and why):
- Renaming `invite_sent` / `invite_accepted`: that is ACM-418.
- Backfilling or deduplicating historical events: separate decision once the pre-fix rate is known.
- Changes to invite step UX or retry behavior: ACM-412; this ticket changes how the event is recorded, not whether retries happen.

## Technical notes
- `engineering/` has no conventions file for the app repo yet, so I could not check whether tracking is a risky or frozen area.
- Where the retry duplicates the event (client, server, or both) is unknown and left to the engineer.

## Design
None needed. Blocker: N.

## Open questions
- Analytics: is invited (d7) in `fct_funnel_activation` counted as distinct users or as `invite_sent` events? This decides whether the bug already distorts the baseline and the 2026-10-13 cohort read.
- Analytics: what are the exact repro steps, and roughly how many `invite_sent` events in the last 7 days are duplicates?
- Eng (FE) / Eng (BE): does the duplicate come from the client retry, the server retry, or both?
- PM: if the fix cannot ship before the 2026-10-13 cohort, do we correct that cohort in analysis or accept the overcount?

---

**Suggested metadata** (I could not fetch real teams and labels from Linear, so I used what appears in the tracker export):
- Team: Growth
- Priority: High (2): it can falsify the read of the active bet, and the 2026-10-13 cohort starts tomorrow
- Labels: `bug`, `tracking`, `onboarding`
- Estimate: 1 to 2 days (Medium)
- Project / bet: Invite in onboarding
- Assignee: none. I do not auto-assign. The meeting notes mention Analytics, and ACM-418 is owned by Analytics, but tell me who should own this.
- Links: relates to ACM-418 and ACM-412

**Two questions before anything is created:**
1. Update ACM-418 or create a new ticket (and link them)?
2. Create this as drafted, or adjust first? (Priority, labels, estimate, and assignee all need your OK.)

Without Linear connected, paste the draft above into a new issue yourself. Reply with approval once it's connected and I'll create it.
