# Sprint Health — 2026-10-12 (Monday, Week 42)

**Mode:** Pre-launch (see assumption in C). **Steward:** PM.

## Sources and limits

| Input | Status |
|-------|--------|
| Issue tracker | Linear not connected. All ticket numbers are `from pasted export, 2026-10-12` (`inputs/tracker-export.csv`, 10 tickets, latest update 2026-10-09; the export's own date is not stated). Ages are computed against 2026-10-12. |
| Meeting notes | `inputs/meeting-notes.md`: Mon 2026-10-05 kickoff and Wed 2026-10-07 growth sync only. Nothing after 2026-10-07. |
| Prior notes | Only `2026-10-02-friday.md` exists. There is no prior sprint-health note, so recurring-blocker (systemic) detection is not possible this week. |
| Repo files | `product/context.md` (updated 2026-10-05), `current-bet.md` and `betting-table.md` (both 2026-10-09). Current-bet still says "Week 41". |
| Not in the export | Priority/severity, estimates or time-boxes, reviewer, project/initiative, milestones. Checks that need them are marked "not verifiable", not assumed. "Done date" is proxied by last-updated. |

---

## A. Ticket quality

### In progress (from pasted export, 2026-10-12)

| Issue | Team | Age (d) | Acceptance criteria? | Blocked? | Status |
|-------|------|---------|----------------------|----------|--------|
| ACM-412 Invite step in onboarding (flag `onb_invite_v1`) | Growth | 12 | yes | no | In Progress, updated 2026-10-09 (3d). QA was due Thu 2026-10-08; outcome not recorded anywhere. |
| ACM-418 Event naming for invite_sent / invite_accepted | Growth | 11 | **no** | no (but it blocks ACM-415) | In Progress, updated 2026-10-02 (10d) |
| ACM-420 Billing: per-seat proration | Core | 27 | **no** | no | In Progress, updated 2026-09-26 (16d) |
| ACM-405 Improve onboarding | Growth | 32 | **no** | no | In Progress, updated 2026-09-18 (24d) |
| ACM-415 Share prompt after first note | Growth | 11 | yes | **yes** (GTM copy + ACM-418) | Blocked, updated 2026-10-03 (9d) |

### Stale (in progress > 5 days with no update)
- ACM-418, 10 days. Likely cause: Analytics is working it but not updating, or it was deprioritized. The 2026-10-07 sync says it is "still open" and `invite_sent` double-fires on retry. It has no criteria, so nobody can say when it is done.
- ACM-420, 16 days. Likely cause: paused for the editor crash fix (Eng BE, 2026-10-07 sync). ACM-399 closed 2026-10-06, so the reason for the pause is gone, but the ticket shows no movement and still reads "In Progress".
- ACM-405, 24 days. Likely cause: umbrella ticket nobody owns day to day (owner is PM). It overlaps with the active bet (ACM-412, ACM-415, ACM-418).
- ACM-415 (Blocked, 9 days): blocked, not stale in the usual sense, but the unblockers are overdue (see E).

Pattern: all three stale in-progress tickets have no acceptance criteria.

### Ticket quality problems
- ACM-418: no testable criterion → add one (for example "`invite_sent` fires exactly once per invite including on retry; verified in staging"; PM/Analytics to write the final wording).
- ACM-420: no criterion; 27 days old, so it is more than one sprint → add criteria, or split into proration logic and rollout.
- ACM-405: "Improve onboarding" has no criterion, no concrete scope, and is 32 days old → split into specific tickets or close; the bet tickets already cover the current onboarding work.
- ACM-410 (Todo, Core, SSO for Team plan): no criterion, and it maps to no bet in `betting-table.md` → add criteria and a bet link before it is pulled in.
- ACM-421 (Todo, GTM, upgrade copy for the 50-note limit): no criterion. It belongs to the usage-limit paywall bet, which is queued for next quarter.
- Not verifiable: estimate or time-box for any ticket (not in the export).

### Regression risk (done in last 14 days)
Done tickets: ACM-401, ACM-399, ACM-409. All have criteria and a single owner role. Estimates, staging steps and reviewers are not in the export.
- ACM-401 Activation dashboard by signup cohort (done 2026-10-02): touches tracking. It reports invited (d7), but `invite_sent` double-fires on retry and ACM-418 is open. Treat the dashboard's invited number as unverified until events are deduplicated. This is the highest-risk item and it feeds the bet's kill trigger.
- ACM-409 Welcome sequence v2 (done 2026-10-08): lifecycle email in the onboarding path. No staging step or reviewer is visible; confirm sends and links with GTM Lead.
- ACM-399 Editor crash fix on large-table paste (done 2026-10-06): editor core, not auth/payments/tracking. Low risk by the skill's criteria. It is the work that paused proration.

---

## B. Velocity signal (from pasted export, 2026-10-12)

Done (14d, since 2026-09-28): **3** · In progress now: **4** (+1 Blocked) · Ratio **3:4 = 0.75:1** → **At risk** (≤ 1:1: work is starting, not finishing). Counting the blocked ticket, it is 3:5.

| Team | Done (14d) | In progress | Ratio | Trend |
|------|-----------|-------------|-------|-------|
| Growth | 1 (ACM-401) | 3 (ACM-412, 418, 405) + 1 Blocked (ACM-415) | 0.33:1 | n/a, no prior sweep |
| Core | 1 (ACM-399) | 1 (ACM-420) | 1:1 | n/a |
| GTM | 1 (ACM-409) | 0 (1 Todo) | 1:0 | n/a |

Closing fast: small, well-specified tickets with criteria (all 3 done tickets had criteria). Stalling: Growth, the team carrying the active bet, where 4 of 5 tickets are in progress or blocked and 1 of 5 is done. Velocity × quality: volume is low, and the one tracking deliverable that did close (ACM-401) sits on top of an unresolved event-quality bug, so its quality is not yet proven.

---

## C. Launch readiness — Invite in onboarding, measured cohort starts 2026-10-13 (1 day); bet gate 2026-11-02 (21 days)

**Assumption:** no launch is named in the invocation. `current-bet.md` and `betting-table.md` do not name a ship date either. They do say success is read on the cohort that signs up 2026-10-13 to 2026-10-26, so I treat flag-on for the 2026-10-13 signups as the launch event and the 2026-11-02 gate as the decision date. PM: correct me if the flag rollout date differs.

| Gate | Status | Owner (role) | Due | Evidence |
|------|--------|--------------|-----|----------|
| Tracking and attribution verified | **Not met** | Analytics | Before flag-on (proposed: 2026-10-12) | `invite_sent` fires twice on retry (2026-10-07 sync); ACM-418 open, no criteria, no update since 2026-10-02. |
| Signup / auth funnel stable | **Not met (no evidence)** | Eng Lead (with Eng FE) | Before flag-on | ACM-412 QA outcome (due 2026-10-08) not recorded; export has no QA or staging data. Gates are binary, so unverified counts as not met. |
| Payment flow functional (if applicable) | N/A | n/a | n/a | The invite step does not touch payments. Billing work (ACM-420) is unrelated and must not ship in this window. |
| No open P0 regressions | **Not met (unverifiable)** | Eng Lead | Before flag-on | The export has no priority field and no P0 label. The only bug-labelled ticket (ACM-399) is Done. Needs an explicit confirmation. |
| Go / no-go decision scheduled | **Not met** | PM | 2026-10-12 | No go/no-go appears in the 2026-10-05 or 2026-10-07 notes or in `current-bet.md`. |

**Verdict: Delay the measured-cohort start** (new date for the PM to set) until these close: (1) ACM-418 fixed and verified in staging so `invite_sent` fires once, (2) ACM-412 QA pass recorded and flag confirmed default-off elsewhere, (3) Eng Lead confirms no open P0, (4) go/no-go held.

Why delay and not "conditional": the kill trigger (invited d7 < 38% for the first full cohort by 2026-11-02) reads only this cohort. Starting it on double-counted events would corrupt the one read the bet is judged on. The cost is that every day of delay moves the 2026-11-02 gate by about one day. The cohort window closes 2026-10-26 and d7 matures 2026-11-02, so there is no slack today.

Alternative the PM may choose: enable the flag on 2026-10-13 but define the cohort only after ACM-418 ships, and deduplicate earlier events in the warehouse. This is only acceptable if Analytics confirms dedup is possible, for example by a retry key.

---

## D. Initiative health

The export has no initiatives, projects or milestones. Health below is inferred from tickets and `betting-table.md`.

| Initiative | Health | Milestones done/total | At-risk milestone | Action |
|------------|--------|-----------------------|-------------------|--------|
| Invite in onboarding (active bet, start 2026-10-05, gate 2026-11-02) | **At risk** | not in export | Tracking verified, and flag-on by 2026-10-13 | Close gates in C; unblock ACM-415 (copy plus ACM-418). |

Orphan bets (in `betting-table.md`, no tracker initiative for 3+ weeks): no active orphan, since the active bet has ACM-412, 415 and 418. Queued bets Template gallery and Slack digest have no tickets, which is expected for next quarter. How long they have been on the table is not stated.

Work with no matching bet, or ahead of its bet:
- Usage-limit paywall is queued for next quarter, yet ACM-420 is In Progress and ACM-421 is Todo. Eng BE said on 2026-10-07 that the "paywall bet slips". It is not an active bet, so either the plan or the ticket status is wrong.
- ACM-410 (SSO) and ACM-405 (Improve onboarding) map to no bet.

Coverage gaps (pillars in `product/context.md`): Activation is covered by the active bet. Monetization has no active bet, but it has two live tickets (ACM-420, ACM-421). Collaboration depth has no initiative, which matches its Next horizon (H1 2027).

---

## E. Escalations

| Decision only the PM can make | Context | Deadline | Cost of delay |
|-------------------------------|---------|----------|---------------|
| Go/delay for the 2026-10-13 measured cohort | Gates in C are not met; kill trigger depends on this cohort | 2026-10-12 (today) | Corrupted baseline, or wasted days against the 2026-11-02 gate |
| Paywall and SSO sequencing: park or re-sequence ACM-420, ACM-421, ACM-410 | Queued bet has live tickets; Eng BE capacity pulled to the crash fix | This sprint | Eng BE capacity spent on non-bet work; sprint ratio worsens |
| Scope or close ACM-405 | 32 days, no criteria, overlaps the bet | This sprint | Noise in Growth's WIP |
| What "early read" means for the 2026-10-20 ask | PM asked on 2026-10-07 for early invited (d7) for the 2026-10-13 cohort by 2026-10-20. Most of that cohort will not have reached day 7 by then, and events may be double-counted. | 2026-10-14 | Acting on a partial or inflated number before the 2026-11-02 gate |

| Item waiting on a call | Blocker | Waiting on | Impact H/M/L |
|------------------------|---------|-----------|--------------|
| ACM-415 Share prompt | Final copy and event names | GTM Lead (copy), Analytics (ACM-418) | H |
| ACM-412 Invite step | QA result (due 2026-10-08) not recorded | Eng (FE) / QA | H |
| ACM-420 Proration | Status says In Progress; Eng BE said paused. Pause reason (crash fix) closed 2026-10-06. | Eng (BE) to confirm, PM to re-sequence | M |

| Commitment made in a meeting | Made by (role) | When | Has a ticket? |
|------------------------------|----------------|------|---------------|
| Draft share-prompt copy by Wed 2026-10-07 | GTM Lead | 2026-10-05 | **No.** ACM-421 is the upgrade copy, not this. Due date passed 5 days ago; no delivery visible. |
| Invite step behind flag `onb_invite_v1`, QA Thursday | Team (kickoff decision) | 2026-10-05 | Yes (ACM-412), but there is no QA sub-item and no result. Also the 2026-10-02 Friday commitment "get it through QA". |
| Early read on invited (d7) by 2026-10-20 | PM | 2026-10-07 | **No** |
| Fix duplicate `invite_sent` on retry (via event naming) | Analytics | 2026-10-07 | Partly (ACM-418, no criteria) |

---

## F. Action items (launch risk first, then velocity, then pipeline)

| # | Action | Owner (role) | Urgency | Why |
|---|--------|--------------|---------|-----|
| 1 | Hold the go/no-go and decide go or delay for the 2026-10-13 cohort | PM | today | No gate is currently met; the decision date is tomorrow |
| 2 | Add criteria to ACM-418, fix the `invite_sent` retry double-fire, verify once-per-invite in staging, and post the result | Analytics (PM to assign a named person) | today | Tracking gate; also unblocks ACM-415 |
| 3 | Record the ACM-412 QA outcome (pass/fail, defects) and confirm the signup/auth path is unaffected with the flag on and off | Eng (FE) | today | Funnel-stability gate; the QA date has already passed |
| 4 | Confirm in writing whether any P0 is open, since the export has no priority field | Eng Lead | today | P0 gate cannot be checked from the data |
| 5 | Check ACM-401's invited (d7) numbers against deduplicated events and mark the dashboard "unverified" until then | Analytics | today | Dashboard drives the kill trigger |
| 6 | Create a ticket for the share-prompt copy and deliver it (promised 2026-10-07) | GTM Lead | this sprint | Unblocks ACM-415, so the second half of the bet can ship |
| 7 | Define the 2026-10-20 early read (cohort slice, minimum age, dedup rule) | PM | this sprint (by 2026-10-14) | Prevents a decision on immature data |
| 8 | Reconcile ACM-420 (status vs "paused") and add criteria; decide whether ACM-420, ACM-421 and ACM-410 stay in flight or are parked | PM with Eng (BE) | this sprint | Queued-bet work is competing with the active bet for capacity |
| 9 | Split or close ACM-405 and add criteria to anything that stays | PM | this sprint | Stale, no criteria, overlaps the bet |
| 10 | Update `current-bet.md` (still "Week 41") with the 2026-10-12 status and the go/delay outcome | PM | this sprint | Source files should match reality before the 2026-10-13 kickoff |

Not this sprint: Template gallery and Slack digest bets: queued for next quarter and need no action now. ACM-421 upgrade copy: queued paywall bet, copy not yet needed. ACM-410 SSO: no bet, no criteria; revisit after action 8.
