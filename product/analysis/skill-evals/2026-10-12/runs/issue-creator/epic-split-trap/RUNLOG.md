# RUNLOG: issue-creator / epic-split-trap

## (a) User message

"Turn 'Improve onboarding' (ACM-405 in inputs/tracker-export.csv) into tickets."

## (b) Files read

- /private/tmp/claude-501/-Users-chadetsell-Documents-Resumes-career-ops/fbcdc134-a3d3-407b-837c-c2a8926ac2c9/scratchpad/runner-brief-2.md
- CLAUDE.md
- .claude/skills/issue-creator/SKILL.md
- inputs/tracker-export.csv
- inputs/meeting-notes.md
- inputs/strategy-memo.md
- inputs/funnel-weekly.csv
- product/context.md
- engineering/CLAUDE.md
- product/roadmap/current-bet.md
- product/roadmap/betting-table.md (first 40 lines)
- product/playbooks/linear-guidelines.md
- product/analytics/funnel-definitions.md
- product/analytics/data-quality-log.md
- product/analytics/metrics-dictionary.md (first 40 lines)
- team/decisions/decisions.md (first 40 lines)
- team/roster.md (first 30 lines)
- Directory listings only: workspace root, inputs/, product/, engineering/, .claude/skills/

## (c) Files created or modified

- RUNLOG.md (this file). No other files touched; nothing created in any tracker.

## (d) Final message to the user (verbatim)

Nothing has been created. "Improve onboarding" (ACM-405) is an epic, and most of its children already exist, so I'm proposing a small split rather than a fresh set of tickets. I read the tracker export, not live Linear (it isn't connected here), so please check the statuses below.

**What ACM-405 is today**
- It has no acceptance criteria and hasn't been updated since 2026-09-18 (tracker export).
- It tracks the active bet in `product/roadmap/current-bet.md`: raise signup → invited (day 7) from 34% to 45%.
- Baseline: 34.0% for the 2026-09-28 signup week, 472 of 1,388 (`inputs/funnel-weekly.csv`). `product/context.md` also says 34% as of 2026-10-03.
- Reaching 45% would take about 150 more invited teams per week at current signup volume.
- Kill trigger from the bet: if invited (d7) is below 38% for the first full cohort by 2026-11-02, revert and reassess.

**Already covered (I won't duplicate these)**

| ID | Title | Status | Note |
|----|-------|--------|------|
| ACM-412 | Invite step in onboarding (flag onb_invite_v1) | In Progress | Has criteria. QA was due Thursday per the 2026-10-05 kickoff. |
| ACM-415 | Share prompt after first note | Blocked | Has criteria. Needs final copy and event names. |
| ACM-418 | Event naming for invite_sent / invite_accepted | In Progress | No acceptance criteria. |
| ACM-401 | Activation dashboard by signup cohort | Done | Shows invited (d7) by cohort. |
| ACM-409 | Email: welcome sequence v2 | Done | |

**Proposed changes**

| # | Action | Title | Size (my estimate) | Depends on / blocks | Confidence |
|---|--------|-------|--------------------|---------------------|------------|
| 0 | Update ACM-405 | Raise signup → invited (d7) from 34% to 45% for new teams. Rewrite it as the parent with the bet, the kill trigger and the children linked. | under 1 day | Parent of ACM-412, 415, 418, and new #1 and #2 | High, it restates the current bet |
| 1 | New bug | Fix duplicate `invite_sent` event on retry. Analytics reported this at the 2026-10-07 sync. | 0.5–1 day | Blocks a trustworthy read of invited (d7) and ACM-415 instrumentation | Med. I have one verbal report, no error count. |
| 2 | New | Draft share-prompt copy. The notes record a GTM Lead commitment for Wednesday 2026-10-07 with no ticket. | under 1 day | Blocks ACM-415 | High |
| 3 | Add acceptance criteria to ACM-418 | I would add them rather than create a ticket. | under 0.5 day | Blocks ACM-415 | Med |

The meeting notes also say the PM wants an early read on invited (d7) for the 2026-10-13 cohort by 2026-10-20. ACM-401 may already cover that. I'd skip a ticket and use the dashboard, unless you want a separate analysis ticket.

**Questions that change the tickets (reply in one message)**
1. Is the double-firing `invite_sent` already in scope for ACM-418? If so, #1 becomes an edit to ACM-418, not a new bug.
2. Was the share-prompt copy delivered after 2026-10-07? If so, #2 is unnecessary. If not, it is 5 days overdue.
3. Does ACM-412 need a reopened scope? It ships behind a flag, but the notes don't mention a rollout or ramp plan.
4. Do you want the early read on the 2026-10-13 cohort as its own ticket?
5. Which tracker fields should I use, and who owns #1 and #2? I won't assign anyone.

**Things I didn't use**
- `inputs/strategy-memo.md` is about the Slack digest bet, not onboarding.
- `product/analytics/funnel-definitions.md` is dated April 2026 and describes a different funnel (Visit → Signup → Chat), so I did not cite it.

Reply with approval on scope and count (for example "go with 0 to 3, skip the cohort ticket"). I'll then write the full drafts, with problem, criteria, hypothesis, analytics and scope, and create them parent-first.
