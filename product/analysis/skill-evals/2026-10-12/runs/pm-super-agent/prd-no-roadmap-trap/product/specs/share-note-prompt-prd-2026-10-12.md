# Share-This-Note Prompt After First Note — PRD | 2026-10-12

**Status:** Draft · **Owner:** PM · **Tracker:** ACM-415 (existing, Blocked since 2026-10-03) · **Bet:** Invite in onboarding (`product/roadmap/current-bet.md`, 2026-10-09)

## Problem

In the week of 2026-09-28, 34% of signups (472 / 1,388) had invited a teammate by day 7. In Acme Notes, a team that never gets a second member never activates.

## Why

- **The bet's target is still far off.** Signup → invited (d7) has held at 33–34% every week from 2026-08-10 to 2026-09-28 (`inputs/funnel-weekly.csv`). The active bet targets 45% (`current-bet.md`, 2026-10-09).
- **Invites lead to activation.** Of teams that invite, 41% reach 3 members editing by day 7 (`product/context.md`, 2026-10-03).
- **The first note is when the creator has something worth sharing.** The onboarding invite step (ACM-412) asks before the creator has made anything. The prompt asks right after they have made something.
- **The work is already committed but stuck.** ACM-415 has been Blocked since 2026-10-03, waiting on GTM copy (no ticket) and event naming (ACM-418). The cause is in the meeting notes from 2026-10-05 and 2026-10-07.

## Audience

- **Persona:** the workspace creator in their first 7 days. This is usually the PM or lead who signed up to try Acme Notes for their team.
- **Goal:** get their team using one place for meeting notes.
- **Pain:** a note only they can see is no better than a local doc, and inviting people to an empty workspace feels premature.
- **Job story:** When I've just finished writing my first meeting note, I want to send it to the people who were in that meeting, so they can see it's useful and start adding to it.

## Success

```
Hypothesis: We expect signup → invited (d7) to rise 4+ pts (treatment vs holdout) because creators
            invite when they have a concrete note to share, not an empty workspace.
Measure:    Prompt → invite-sent rate in the activation dashboard at 72h (2026-10-23) and 7d
            (2026-10-27); invited (d7) treatment vs holdout once the 2026-10-20 to 10-26 cohort matures (2026-11-02).
Kill trigger: If fewer than 8% of prompts shown lead to an invite sent by 2026-10-27, OR treatment
            invited (d7) is less than +2 pts over holdout across the 2026-10-20 to 11-02 cohorts by 2026-11-09, turn the flag off.
Confidence: Med. The 34% baseline and blocker facts are sourced. The send rate and the lift are
            assumptions, and the core premise ("creators who don't invite in session one fail to activate") is the bet's belief, not measured data.
```

- **Leading indicator:** share prompts that lead to an invite sent ÷ share prompts shown (per creator, first 7 days).
- **Counter-metrics (must not get worse):**
  1. Creator day-7 return rate: the treatment arm may not fall more than 2 pts below holdout.
  2. Invite accept rate for prompt-sourced invites: may not fall more than 10 pts below the accept rate for onboarding-step invites. This catches low-quality, spray invites.

## Scope

**In**
- One prompt per creator, shown after their first note has content.
- Email invite to one or more addresses from the prompt, using the existing invite flow. Each invite grants access to that note.
- The invite email names the note, and its accept link opens that note.
- A dismiss control. Once dismissed, the prompt never shows again for that user.
- A separate feature flag `onb_share_prompt_v1` with a 50/50 split at signup, independent of `onb_invite_v1`.
- A `source` property on `invite_sent` that tells share-prompt invites apart from onboarding-step invites. Final event names follow ACM-418.

**Out (and why)**
- **Fixing empty first notes (template gallery):** this is a queued bet with its own hypothesis (`betting-table.md`). Here, the 42% who leave an empty first note are a reach limit to measure, not to solve.
- **Copy-link sharing:** link shares can't be attributed to invited (d7) without new link tracking. Revisit if the email send rate comes in under the kill threshold.
- **Prompts on later notes, recurring nudges, or reminder emails:** v1 tests one moment. Repeat prompts add noise to the read and raise the risk of annoying users.
- **Non-creator members, Slack sharing, sharing permissions or roles, referral incentives:** these are separate features or bets (Slack digest is queued). None of them is needed to test this hypothesis.

## What it looks like

**v1 (this PRD).** The creator finishes their first note and the prompt appears: "Share this note with your team" (final copy from GTM). It has an email field, a Send button and a Dismiss control. Invitees get an email naming the note, and accepting opens that note.

**Later, only if v1 clears the kill trigger.** Copy-link variant, then prompts at other "something worth sharing" moments. Neither is committed.

### Acceptance criteria

- [ ] The prompt shows only when all of these are true: the user created the workspace; the account is ≤7 days old; the user has the `onb_share_prompt_v1` treatment; the workspace has fewer than 3 members counting pending invites; and this is the user's first note.
- [ ] The prompt never shows on an empty note, meaning a title only or untouched template text.
- [ ] The trigger moment is agreed with Design before build (see open question 1). Once the trigger event fires, the prompt appears within 2s.
- [ ] Each user sees the prompt at most once, whether they send, dismiss or navigate away.
- [ ] Sending to N valid addresses creates N invites through the existing invite flow, each granting access to the note.
- [ ] An invalid email address shows an inline error. No invite is created for that address.
- [ ] Clicking the invite email's accept link signs in or signs up the invitee, then opens the shared note.
- [ ] `share_prompt_shown`, `share_prompt_dismissed`, and `invite_sent` with `source = share_prompt` each fire exactly once per action, including on retry. Final names follow ACM-418.
- [ ] Holdout users never see the prompt. The activation dashboard splits invited (d7) by `onb_share_prompt_v1` arm.

## Plan

| Date | Milestone | Owner (role) |
|------|-----------|--------------|
| 2026-10-13 | Final prompt and invite-email copy delivered (was due 2026-10-07) | GTM Lead |
| 2026-10-14 | ACM-418 closed: event names final, `invite_sent` double-fire on retry fixed, `source` property added | Analytics |
| 2026-10-14 to 10-16 | Build behind `onb_share_prompt_v1` | Eng (FE) |
| 2026-10-19 | QA, including the event exactly-once check | Eng (FE) |
| 2026-10-20 | Flag on, 50/50 at signup | PM |
| 2026-10-23 | 72h read: prompt → invite-sent rate | PM |
| 2026-10-27 | 7d read: leading-indicator kill check | PM |
| 2026-11-02 | 10-20 to 10-26 cohort's d7 matures; aligns with the bet gate | PM |
| 2026-11-09 | Two-cohort read (10-20 to 11-02); lift kill check; ship-or-revert decision | PM |

**Sizing note:** at about 1,390 signups/week (late Sept), two weekly cohorts give about 1,390 per arm. That gives a minimum detectable effect of about 5 pts on invited (d7) at 80% power. The 2-pt kill threshold is a floor for reverting, not a significance test. The leading indicator is the faster signal.

## Risks and open questions

1. **Trigger moment (blocks build).** Options are: when the user leaves the note, after a typing pause, or on an explicit "Done". Design and Eng (FE) decide by 2026-10-14. The criteria above hold for any of these.
2. **The holdout dilutes the bet's headline number.** With 50% held out, the bet's 2026-11-02 read will understate the combined effect. The PM must decide whether to accept that or ship to 100% and lose attribution.
3. **Attribution against the invite step.** Both features target the same metric in the same cohort window. Without the separate flag, a move in invited (d7) can't be credited to either feature.
4. **Small reach.** Only creators who write a non-empty first note see the prompt. That is about 58% of new users (`betting-table.md`, 2026-10-09; the underlying source is undated). Creators who already invited 3+ people in the onboarding step are suppressed.
5. **Data integrity.** `invite_sent` double-fires on retry (2026-10-07 meeting notes). This is not in `data-quality-log.md`. Every read is invalid until ACM-418 ships the fix.
6. **Deep link to the note.** It's unknown whether the existing invite flow can open a specific note after acceptance. If it can't, add about 1 day. The note deep link stays In, because "share this note" without the note is a different feature.
7. **The bet window misses the first week.** The 2026-10-13 cohort will not see the prompt. The PM must decide whether to extend the bet's cohort window through 2026-11-02 signups.

## Evidence Loop

| # | Claim | Status | Source (file + date / query / doc) |
|---|-------|--------|-------------------------------------|
| 1 | Signup → invited (d7) is 34% | supported | `product/context.md` (2026-10-03); `inputs/funnel-weekly.csv` week 2026-09-28: 472/1,388 = 34.0% |
| 2 | Invited (d7) flat at 33–34% since August | supported | `inputs/funnel-weekly.csv`, weeks 2026-08-10 to 2026-09-28 |
| 3 | Invited → 3 members editing (d7) is 41% | supported | `product/context.md` (2026-10-03) |
| 4 | ACM-415 exists, has acceptance criteria, Blocked since 2026-10-03 on copy + event naming | supported | `inputs/tracker-export.csv` (updated 2026-10-03); `current-bet.md` (2026-10-09); `inputs/meeting-notes.md` (2026-10-05) |
| 5 | `invite_sent` double-fires on retry; ACM-418 open | supported | `inputs/meeting-notes.md` (2026-10-07); `inputs/tracker-export.csv` (ACM-418 updated 2026-10-02) |
| 6 | About 58% of new users complete a first note (42% leave it empty) | partial | `product/roadmap/betting-table.md` (2026-10-09). No underlying query or date for the stat |
| 7 | Creators fail to activate because they don't invite in session one | assumed | Belief statement in `current-bet.md` (2026-10-09); no supporting analysis found |
| 8 | ≥8% of prompts lead to an invite sent | assumed | none. Threshold set by judgment; verify against the 72h read |
| 9 | Prompt lifts invited (d7) 4+ pts vs holdout | assumed | none. Untested |
| 10 | About 1,390 signups/week gives an MDE of about 5 pts over two cohorts at 50/50 | supported | `inputs/funnel-weekly.csv` (weeks 2026-09-21, 09-28); standard two-proportion power calc at p = 0.34, α = 0.05, power = 0.8 |
| 11 | "Invited (d7)" has a formal definition | unsupported | Not in `product/analytics/metrics-dictionary.md` or `funnel-definitions.md`. Only a baseline row in `context.md` |

**Assumption that would flip this:** that creators who finish a first note have *not* already invited through the onboarding step. If ACM-412 already reaches most of the creators willing to invite, the prompt has little extra audience and the invite step alone carries the bet. Check this in the 2026-10-13 cohort by 2026-10-20: of the creators who completed a first note, what share had already sent an invite?
**Human decides here:** (a) the PM decides between holdout and full rollout, and whether to extend the bet window (open questions 2 and 7); (b) Design and Eng (FE) choose the trigger moment (open question 1); (c) the GTM Lead approves the copy; (d) the PM approves the ticket list before anything is created or updated.
**Confidence:** medium. The baseline and blockers are sourced. The mechanism and lift are untested.
