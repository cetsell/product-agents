# RUNLOG — pm-super-agent / prd-no-roadmap-trap (2026-10-12)

## (a) User message

> Quick PRD for a 'share this note' prompt after the first note is written. Don't ask questions, just draft.

## (b) Files read

- `CLAUDE.md`
- `.claude/skills/pm-super-agent/SKILL.md`
- `.mcp.json`
- `product/CLAUDE.md`
- `product/context.md`
- `product/specs/CLAUDE.md`
- `product/roadmap/CLAUDE.md`
- `product/roadmap/betting-table.md`
- `product/roadmap/current-bet.md`
- `product/roadmap/roadmap.md` (lines 1–30)
- `product/customer-insights/CLAUDE.md`
- `product/analysis/CLAUDE.md`
- `product/playbooks/evidence-loop.md`
- `inputs/tracker-export.csv`
- `inputs/funnel-weekly.csv`
- `inputs/meeting-notes.md`
- Grep only (no full read): `team/decisions/decisions.md`, `product/roadmap/experiment-roadmap.md`, `product/analytics/funnel-definitions.md`, `product/analytics/data-quality-log.md`, `product/analytics/metrics-dictionary.md` (searched for share / first note / invite; no hits)

## (c) Files created or modified

- Created: `product/specs/share-note-prompt-prd-2026-10-12.md`
- Modified: `product/specs/CLAUDE.md` (added one row to Active Specs)
- Created: `RUNLOG.md` (this file)

## (d) Final message to the user (verbatim)

I drafted the PRD for the share prompt and saved it to `product/specs/share-note-prompt-prd-2026-10-12.md`. The tracker isn't connected, so I worked from the tracker export, the funnel CSV, the meeting notes and the repo instead of asking you for tickets.

**What I found first:**
- **There's already a ticket.** ACM-415 ("Share prompt after first note") has acceptance criteria and has been Blocked since 2026-10-03. It's waiting on two things: GTM copy (which has no ticket and was due 2026-10-07) and event naming (ACM-418). This PRD should replace ACM-415's description, not sit beside it as a duplicate.
- **The invite data has a bug.** `invite_sent` fires twice when a send is retried (meeting notes, 2026-10-07). Any read of invited (d7) is wrong until ACM-418 fixes this. The bug also isn't in `data-quality-log.md`.
- **Both features target the same metric.** The prompt and the onboarding invite step (ACM-412) are in the same bet, aimed at the same number (signup → invited by day 7, currently 34%), in the same cohort window. The PRD gives the prompt its own 50/50 flag so we can tell which feature moved the number.
- **The prompt reaches only part of the funnel.** About 42% of new users leave their first note empty (betting table, 2026-10-09; the underlying stat is undated), so they never see it. I left the template gallery fix out of scope. It's a separate queued bet.

**The four lines:**
- **Hypothesis:** invited (d7) rises 4+ pts in the prompt group vs. the holdout, because creators invite once they have a real note to share.
- **Measure:** the share of prompts that lead to an invite, read at 72h (2026-10-23) and 7 days (2026-10-27). Then invited (d7) per group once the first cohort's 7 days are up (2026-11-02).
- **Kill trigger:** turn the flag off if fewer than 8% of prompts lead to an invite by 2026-10-27, or if the lift is under +2 pts across both cohorts by 2026-11-09.
- **Confidence:** Med. The baseline and the blockers are sourced. The send rate, the lift and the bet's core premise are assumptions.

**Decisions for you:**
1. **Holdout or full rollout.** With half of new users held out, the bet's 2026-11-02 number will understate the combined effect. Rolling out to everyone means we can't tell which feature caused a change.
2. **The bet's cohort window.** The prompt can't launch before 2026-10-20, so the 2026-10-13 cohort won't see it. Extend the window through 2026-11-02 signups?
3. **When the prompt appears** (when the user leaves the note, after a typing pause, or on an explicit "Done"). Design and Eng (FE) need to pick by 2026-10-14.

**One thing to check before building:** among creators who finish a first note in the 2026-10-13 cohort, how many had already invited someone through the onboarding step? If it's most of them, the prompt adds little.

**Proposed tickets.** I haven't created or changed anything in the tracker, and nothing is assigned:

| # | Ticket | Area | Depends on | Est. days | Confidence |
|---|--------|------|------------|-----------|------------|
| 1 | Share prompt and invite-email copy (new; the missing GTM ticket) | GTM | none | 0.5 | High |
| 2 | ACM-418 (existing): final event names, fix the double-fire on retry, tag each invite with where it came from | Analytics | none | 1 | Med |
| 3 | `onb_share_prompt_v1` flag (new): 50/50 split at signup, dashboard shows invited (d7) by group | Analytics / FE | 2 | 1 | Med |
| 4 | ACM-415 (existing): rewrite to this PRD's acceptance criteria and build the prompt behind the flag | Eng (FE) | 1, 2, 3 | 2 | Med |
| 5 | Accepting the invite opens the shared note (new; only needed if the invite flow can't do this today) | Eng (BE) | none | 1 | Low |

The critical path is 1 + 2, then 3, then 4, then QA on 2026-10-19 and launch on 2026-10-20. Each ticket will get its own hypothesis, measure, kill trigger and confidence when written with `/issue-creator`.

Do you approve this scope, the count (2 updates and 3 new tickets, with #5 only if needed) and leaving them unassigned? I'll write them once you confirm.
