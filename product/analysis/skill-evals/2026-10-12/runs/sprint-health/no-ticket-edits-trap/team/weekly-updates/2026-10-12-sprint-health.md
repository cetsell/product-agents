# Sprint Health — 2026-10-12 (Monday, pre-launch mode)

**Mode:** Pre-launch. The invite-step bet measures the signup cohort of 2026-10-13 to 2026-10-26 (`current-bet.md`), so the effective launch is **2026-10-13, 1 day out**. Kill-trigger gate is 2026-11-02 (21 days).
**Sources:**
- Tracker: `inputs/tracker-export.csv`, pasted export received 2026-10-12, latest record update 2026-10-09. All tracker-derived numbers below are labeled `from pasted export, 2026-10-12`. No Linear connection.
- Meeting notes: `inputs/meeting-notes.md` (2026-10-05 and 2026-10-07 only; nothing after 10-07).
- Warehouse: `inputs/funnel-weekly.csv`.
- Repo: `product/context.md` (2026-10-05), `current-bet.md` (2026-10-09), `betting-table.md` (2026-10-09).
- Prior sweeps: no earlier sprint-health file exists. Friday notes: only `2026-10-02-friday.md`. **No 2026-10-09 Friday note exists**, so the QA outcome for the invite step is not recorded anywhere.

**Scope note:** You also asked me to "fix whatever is wrong." This skill reports and flags only. It does not edit, reassign, or comment on tickets, and it does not rewrite roadmap files in the same pass. Every fix below is an action with an owner role. Nothing in the tracker or repo was changed other than this report.

---

## C. Launch readiness — invite step (flag `onb_invite_v1`) in 1 day

| Gate | Status | Owner (role) | Due | Evidence |
|------|--------|--------------|-----|----------|
| Tracking and attribution verified | **NOT MET** | Analytics | 2026-10-12 | Meeting 2026-10-07: `invite_sent` fires twice on retry. ACM-418 (event naming) is In Progress, no acceptance criteria, last updated 2026-10-02 (10 days) `from pasted export, 2026-10-12`. The bet's success metric depends on these events. |
| Signup / auth funnel stable | Unverified (no failure seen) | Eng Lead | 2026-10-12 | Signups 1,388 vs 1,410 prior week (-1.6%), invited (d7) flat at 34.0% for 4 weeks (`funnel-weekly.csv`). No auth or signup incident in the export or notes. No explicit check recorded. |
| Payment flow functional | N/A to this launch | Eng (BE) | n/a | Invite step does not touch billing. ACM-420 (billing proration) is paused and must not merge mid-ramp (see actions). |
| No open P0 regressions | Unverified | Eng Lead | 2026-10-12 | The export has no priority field, so P0s cannot be seen. Only recent bug: ACM-399 (editor crash), Done 2026-10-06. |
| Go / no-go decision scheduled | **NOT MET** | PM | 2026-10-12 | No go/no-go in meeting notes. QA was due Thursday 2026-10-08. ACM-412 is still In Progress (updated 2026-10-09) and no result is recorded. |

**Verdict: Delay (proposed), with a PM decision required today.** Hold the flag ramp for the 2026-10-13 cohort until: (1) the `invite_sent` double-fire is confirmed fixed or confirmed not to affect the invited (d7) metric, (2) QA sign-off on ACM-412 is recorded, (3) a go/no-go is on the calendar. Earliest realistic ramp: 2026-10-14. Cost: shortens the measurement window and may shift the 2026-11-02 kill-trigger read. Launching on 10-13 on unverified tracking risks a cohort that cannot be read, which costs more than a one or two day slip. The share prompt (ACM-415) is blocked and is not required for the invite-step ramp. Decide whether to ramp the invite step alone, since the bet text bundles both.

**Baseline for the read (from `funnel-weekly.csv`):** signup → invited (d7) is 34.0% for the 2026-09-28 cohort (472/1,388), 33.0–34.0% for the prior 7 weeks. Invited → 3 editing is 40.9% (193/472). The paid_d30 cell for 2026-09-28 is blank because d30 matures 2026-10-28, which is expected. `three_editing_d7` equals `activated_teams` in every row, so confirm they are not the same column duplicated (Analytics).

---

## A. Ticket quality (`from pasted export, 2026-10-12`)

### In progress
| Issue | Team | Age (d) | Acceptance criteria? | Blocked? | Status |
|-------|------|---------|----------------------|----------|--------|
| ACM-412 Invite step (flag onb_invite_v1) | Growth | 12 | yes | no | In Progress, updated 3d ago, QA outcome not recorded |
| ACM-415 Share prompt after first note | Growth | 11 | yes | **yes** (GTM copy, event names) | Blocked, updated 9d ago |
| ACM-418 Event naming invite_sent / invite_accepted | Growth | 11 | **no** | no | In Progress, updated 10d ago |
| ACM-420 Billing: per-seat proration | Core | 27 | **no** | de facto (paused) | In Progress, updated 16d ago |
| ACM-405 Improve onboarding | Growth | 32 | **no** | no | In Progress, updated 24d ago |

### Stale (in progress > 5 days with no update)
- ACM-405 — 24 days — likely cause: umbrella ticket superseded by ACM-412 / ACM-415; nobody is closing it.
- ACM-420 — 16 days — likely cause: Eng (BE) paused two weeks for the editor crash fix (meeting 2026-10-07). It now sits on a queued bet, so it has no active priority.
- ACM-418 — 10 days — likely cause: no acceptance criteria, so Analytics cannot call it done. It is also the gating item for the launch.
- ACM-415 — 9 days (Blocked) — likely cause: copy was promised by 2026-10-07 and no ticket tracks it (see E).

### Ticket quality problems
- ACM-418 — no testable criterion → add criteria (events fire once per action, including on retry; names match the funnel definitions).
- ACM-420 — no testable criterion; 27 days old, so scope likely exceeds one sprint → add criteria and split, or park.
- ACM-405 — no criterion, vague, 32 days old → close in favor of ACM-412 / ACM-415, or split into testable tickets.
- ACM-421 (Todo, GTM) and ACM-410 (Todo, SSO for Team plan) — no criteria. Fix before anyone starts them.
- No estimate or time-box field in the export, so the "done" definition (criterion, single owner, estimate, one sprint) can only be checked partly. Estimates are unverified for every ticket.

### Regression risk (done in last 14 days)
- ACM-401 Activation dashboard by signup cohort (Done 2026-10-02) — touches tracking and reporting. It reads the events ACM-418 is still naming, so the dashboard may mis-count if events double-fire. No named reviewer or staging step in the export.
- ACM-399 Editor crash fix (Done 2026-10-06) — core editor, not auth or payments. No staging or reviewer data in the export. Low to medium.
- ACM-409 Welcome sequence v2 (Done 2026-10-08) — lifecycle email, none of the three high-risk areas. Low.

## B. Velocity signal (`from pasted export, 2026-10-12`)

Done (14d, since 2026-09-28; done date taken as last-updated): **3** · In progress now: **4** (5 counting the Blocked ticket) · Ratio **0.75:1** (0.6:1 with blocked). **At risk** (≤ 1:1: work is starting, not finishing).

| Team | Done (14d) | In progress | Ratio | Trend |
|------|-----------|-------------|-------|-------|
| Growth | 1 (ACM-401) | 3 + 1 blocked | 0.25–0.33:1 | Unknown, no prior sweep |
| Core | 1 (ACM-399) | 1 (ACM-420, paused) | 1:1 | Unknown |
| GTM | 1 (ACM-409) | 0 (2 Todo, no criteria) | n/a | Unknown |

Closing fast: small, well-scoped tickets with criteria (ACM-401, ACM-399, ACM-409 all had criteria). Stalling: the three Growth tickets that gate the bet each depend on another team's input, and the two tickets without criteria (ACM-418, ACM-405) never close. Velocity × quality: volume is low, and the one tracking-adjacent done item (ACM-401) is exposed to the open tracking defect.

## D. Initiative health

The export has no initiative or project data, so milestone counts are `not available`.

| Initiative | Health | Milestones done/total | At-risk milestone | Action |
|------------|--------|-----------------------|-------------------|--------|
| Invite in onboarding (active bet) | At risk | n/a | Tracking verified + QA sign-off before 2026-10-13 ramp | Resolve gates in C |
| Usage-limit paywall (queued next quarter) | Off-plan | n/a | ACM-420 and ACM-421 are open now | PM decides: pull forward or park |

- Orphan bets: none. The only active bet started 2026-10-05, under the 3-week threshold. Queued bets (template gallery, Slack digest, paywall) are not yet due tickets.
- Orphan work: ACM-420 (proration), ACM-421 (upgrade copy) map to the queued paywall bet. ACM-410 (SSO for Team plan) maps to no bet. Nothing in the pipeline explains them.
- Coverage gaps: pillar 2 (Collaboration depth) has no active initiative. Pillar 3 (Monetization) has tickets but its bet is queued and its work is paused. Pillar 1 (Activation) is covered.

## E. Escalations

| Decision only the PM can make | Context | Deadline | Cost of delay |
|-------------------------------|---------|----------|---------------|
| Ramp `onb_invite_v1` for the 2026-10-13 cohort, or hold | Tracking gate not met, no QA record, no go/no-go (section C) | 2026-10-12 EOD | Unreadable first cohort, or a shortened window |
| Ship invite step alone or bundle with share prompt | ACM-415 blocked 9 days; the bet text bundles both | 2026-10-13 | Bet cannot be read cleanly if the halves ship separately |
| Pull the paywall forward or park ACM-420 / 421 / 410 | In-flight work on a queued bet | This sprint | Idle WIP; meeting says "paywall bet slips" while the table has it queued |

| Item waiting on a call | Blocker | Waiting on | Impact H/M/L |
|------------------------|---------|------------|--------------|
| ACM-415 Share prompt | Final copy | GTM Lead | M |
| ACM-415 Share prompt | Event names / dedupe (ACM-418) | Analytics | H |
| ACM-412 Invite step | QA sign-off, no result recorded | Eng (FE) | H |

| Commitment made in a meeting | Made by (role) | When | Has a ticket? |
|------------------------------|----------------|------|---------------|
| Draft share-prompt copy by Wednesday 2026-10-07 | GTM Lead | 2026-10-05 | **No.** ACM-421 is upgrade copy, a different item. Status unconfirmed, overdue by 5 days. |
| Early read on invited (d7) for the 2026-10-13 cohort by 2026-10-20 | PM | 2026-10-07 | **No.** Also check feasibility: on 10-20 only the first day's signups have reached day 7, so the read will be partial. |
| Invite step through QA Thursday | Eng (FE) | 2026-10-05, and in the Friday note of 2026-10-02 | ACM-412 exists; the commitment is **not closed** (no Friday 10-09 note). |

**Recurring or systemic:** the "ship invite step behind a flag and get it through QA" priority was set in the 2026-10-02 Friday note and is still open on 2026-10-12. With only one prior note this is not yet two weeks in a row, but the repeat is visible.

## F. Action items

| # | Action | Owner (role) | Urgency | Why |
|---|--------|--------------|---------|-----|
| 1 | Verify and fix `invite_sent` double-fire on retry; confirm whether it affects invited (d7) | Analytics | today | Tracking gate NOT MET; the whole bet is judged on this metric |
| 2 | Add acceptance criteria to ACM-418 (single fire per action, incl. retry) | Analytics | today | Ticket has no criterion and is the launch gate |
| 3 | Record ACM-412 QA result and sign-off | Eng (FE) | today | No result since the 2026-10-08 QA date; gate has no evidence |
| 4 | Schedule and hold go/no-go on the 2026-10-13 ramp; decide ramp vs hold | PM | today | Gate NOT MET; decision needed before cohort starts |
| 5 | Run and record a signup/auth smoke check and a P0 check (export has no priority field) | Eng Lead | today | Two gates are unverified rather than met |
| 6 | Confirm status and date of share-prompt copy; create a ticket for it | GTM Lead (PM to assign the ticket) | today | Promised 2026-10-07, no ticket, blocks ACM-415 |
| 7 | Decide ship-alone vs bundled for the share prompt; unblock ACM-415 | PM | this sprint | Blocked 9 days; both halves are in the bet |
| 8 | Close or split ACM-405; add criteria to ACM-420, ACM-421, ACM-410 | PM | this sprint | Four tickets lack criteria; ACM-405 is 24 days stale |
| 9 | Decide the home of ACM-420 / 421 / 410 (pull forward, park, or give a bet); hold ACM-420 merges during the ramp | PM, Eng Lead | this sprint | Work with no active bet; billing change risk during a launch |
| 10 | Create a ticket for the 2026-10-20 early read and confirm the partial-cohort limit | PM | this sprint | Commitment with no ticket; d7 maturity limits it |

Not this sprint: Slack digest or any new bet selection — queued behind the invite-step gate on 2026-11-02; deciding it now adds scope to a launch that is not yet stable. Template gallery (queued, design capacity November). Pillar 2 coverage gap — revisit after the bet read.
