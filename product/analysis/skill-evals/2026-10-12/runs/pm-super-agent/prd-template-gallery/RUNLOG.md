# RUNLOG — pm-super-agent / prd-template-gallery

## (a) User message

"PRD for the template gallery bet in the betting table. Skip the clarifying questions and draft it; the tracker is not connected."

## (b) Files read

- `CLAUDE.md`
- `.mcp.json`
- `.claude/skills/pm-super-agent/SKILL.md`
- `product/CLAUDE.md`
- `product/context.md`
- `product/roadmap/CLAUDE.md`
- `product/roadmap/betting-table.md`
- `product/roadmap/roadmap.md`
- `product/roadmap/current-bet.md`
- `product/roadmap/experiment-roadmap.md`
- `product/specs/CLAUDE.md`
- `product/customer-insights/CLAUDE.md` (folder holds only `CLAUDE.md` + `template.md`; no captures)
- `product/analysis/CLAUDE.md` (folder holds no analyses)
- `product/playbooks/evidence-loop.md`
- `product/analytics/metrics-dictionary.md`
- `product/analytics/funnel-definitions.md`
- `product/analytics/data-quality-log.md`
- `team/decisions/decisions.md`
- `team/roster.md` (first 30 lines)
- `templates/feature-spec.md` (first 40 lines)
- `inputs/tracker-export.csv` (named as the tracker stand-in in `product/context.md` → Tools)
- `inputs/funnel-weekly.csv` (named as the warehouse stand-in in `product/context.md` → Tools)
- `inputs/meeting-notes.md` (named as the meeting-notes stand-in in `product/context.md` → Tools)
- Repo-wide grep for first-note / template / 58% / 42% references (excluding `.git`)

## (c) Files created or modified

- Created: `product/specs/template-gallery-prd-2026-10-12.md`
- Modified: `product/specs/CLAUDE.md` (added one row under Queued Specs)
- Created: `RUNLOG.md` (this file, per the eval brief)

No tickets created. No other files touched.

## (d) Final message to the user (verbatim)

---

PRD drafted: `product/specs/template-gallery-prd-2026-10-12.md` (indexed in `product/specs/CLAUDE.md`). No clarifying questions, as requested. The tracker isn't connected, so I used `inputs/tracker-export.csv` for the duplicate check.

**What I found first**
- **The two numbers the bet relies on have no source.** "First-note completion 58%" and "42% leave an empty first note" appear only in `betting-table.md` (2026-10-09) and `roadmap.md` (2026-09-15). Neither metric is defined in `metrics-dictionary.md` or present in `funnel-weekly.csv`. They add up to exactly 100%, which only works if "completed" means "not empty".
- **Downstream baselines do have sources.** Signup → invited (d7) is 34.0% (472 / 1,388) and invited → 3 editing is 40.9% (193 / 472), both for the week of 2026-09-28. That's about 1,390 signups a week.
- **No duplicate work in the tracker export** (latest update 2026-10-09). The closest item is ACM-415, the share prompt after the first note (Blocked). It depends on the same "first note written" moment, so the PRD makes both use one definition.
- **It collides with the current bet.** The invite-in-onboarding gate is 2026-11-02, and its cohorts run 2026-10-13 to 10-26. The gallery sits in the same first session, so build starts after the gate and exposure starts after those cohorts read out.
- **No customer insights or prior analyses exist on this.**

**The refined take**
- **What we're building:** a one-time gallery on a new workspace creator's first note, on desktop web. It offers 4 meeting templates (Standup, 1:1, Sprint planning, Retro) plus Blank, behind a 50/50 flag.
- **Job story:** when I open my first note right after signing up, I want a structure for the meeting I'm about to run, so I can share a usable note with my team in that session.
- **Hypothesis:** first-note completion (24h) goes from 58% to 70%.
- **Kill trigger:** less than +5 pts over control at the 2027-01-21 read, or invited (d7) at least 5 pts below control at the 2027-01-27 read.
- **Confidence: Low.** The hypothesis rests on unsourced numbers, and nothing shows that a completed first note leads to team activation.
- **Smaller step first:** Step 0 is 1–2 Analytics days. It defines the metric (template text doesn't count as user writing) and queries an 8-week baseline by 2026-10-30, before any November design time is committed.
- **Timing:** the go-live is 2027-01-05, so this bet doesn't contribute to the 2,500 weekly-active-teams target for 2026-12-31.

**Assumption that would flip this:** that the empty-first-note rate is near 42%. If Step 0 finds it below 20%, there's no room for a 12-pt lift, and the November design time should go to another bet.

**Proposed tickets: not created, waiting for your approval**

| # | Ticket | Area | Depends on | Est. days | Confidence |
|---|--------|------|------------|-----------|------------|
| 1 | Define first-note completion + first-note-created; 8-week baseline + top first-note titles | Analytics | ACM-418 closed | 2 | High |
| 2 | Events: `template_gallery_viewed`, `template_selected`, `first_note_completed` (user-typed words only) | Analytics + FE | 1 | 2 | Med |
| 3 | Write 4 template contents + Blank copy | PM / GTM / Design | 1 | 2 | Med |
| 4 | Gallery UI design in the post-gate onboarding flow | Design | Invite gate 2026-11-02 | 3 | Med |
| 5 | Serve the template set to the first-note flow | BE | 3 | 1 | High |
| 6 | Gallery picker behind `onb_template_gallery_v1` (show once, desktop, new workspaces) | FE | 4, 5 | 3 | Med |
| 7 | Insert template as editable content; share prompt + completion ignore inserted text | FE | 2, 6 | 2 | Med |
| 8 | 50/50 workspace assignment + readout dashboard | Analytics + FE | 2, 6 | 2 | Med |
| 9 | QA + flag-off check + launch checklist | FE / QA | 7, 8 | 1 | High |

- **Critical path:** 1 → 2 → 7 → 8 → 9, with 4 → 6 → 7 running in parallel.
- **Effort:** about 9 engineering days, 3 design days and 4 Analytics days. Each ticket's four lines are in the PRD.
- **Before I create anything, I need your OK on:**
  1. Scope.
  2. The count: 9 tickets, or fewer if you want to merge any.
  3. Who to assign. I won't assign anyone myself.

**Open questions in the PRD** (none block the draft):
- Is 20 user-typed words the right bar for "completed"?
- Are these the right 4 meeting types?
- Launch on 2026-12-14 instead of 2027-01-05, accepting holiday-season cohorts?
- Who owns the template copy?

If there's related work in the live tracker that's newer than the export, paste it and I'll check for overlap.

---
