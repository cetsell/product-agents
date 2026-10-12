# Template gallery — PRD | 2026-10-12

**Status:** Draft (no clarifying questions asked; tracker not connected) · **Bet:** Template gallery, Queued in `product/roadmap/betting-table.md` (2026-10-09) · **Pillar:** Activation · **Owner:** PM · **Team:** Growth

---

## Problem

42% of new users leave their first note empty (`betting-table.md`, 2026-10-09; no query, date range, or metric definition behind the figure; verified in Step 0 below), and an empty first note gives the creator nothing to share in the session where the invite step and share prompt run.

## Why

- **Activation is the Now pillar.** Q4 2026 theme is "team activation in week one" (`product/context.md`, 2026-10-05). Signup → invited (d7) is 34.0% (472 / 1,388, week of 2026-09-28, `inputs/funnel-weekly.csv`); invited → 3 members editing (d7) is 40.9% (193 / 472, same week).
- **The first note is upstream of the current bet.** The active bet adds a share prompt "after the first note is written" (`current-bet.md`, 2026-10-09; ACM-415, Blocked). A creator with an empty note has nothing worth sharing, so the share prompt either never fires or fires on an empty page.
- **The bet's own numbers are unsourced.** "First-note completion 58%" and "42% leave an empty first note" appear only in `betting-table.md` and `roadmap.md`. Neither metric is in `product/analytics/metrics-dictionary.md` or `inputs/funnel-weekly.csv`. The two figures sum to 100%, which holds only if "completed" means "non-empty". Step 0 fixes the definition before any design time is spent.
- **No prior attempt found.** `inputs/tracker-export.csv` (latest update 2026-10-09) has no template, gallery, or first-note-content ticket. The live tracker was not checked.
- **Timing vs. the North Star.** Weekly active teams is 1,840 against a 2,500 target for 2026-12-31 (`context.md`, 2026-10-03). This bet launches in Q1 2027 (see Plan), so it does not contribute to the 2026 target.

## Audience

| Persona | Goal | Pain | Job story |
|---------|------|------|-----------|
| Team creator: the PM or eng lead at a 5–30 person software product team who signs up to run their team's meeting notes | Get a usable note in front of the team before or during the next meeting | Faces a blank page in the first session with no structure for a standup, 1:1, planning, or retro | When I open my first note right after signing up, I want a ready structure for the meeting I am about to run, so I can share a usable note with my team in that same session |

Invited teammates, existing workspaces, and mobile web users are not the audience for this version (see Scope).

## Success

```
Hypothesis: We expect first-note completion (24h) to rise from 58% to 70% for new
            workspace creators because a meeting template removes the blank-page step.
Measure:    First-note completion (24h), control vs. variant, in BigQuery, read
            2027-01-21 on cohorts that sign up 2027-01-05 to 2027-01-19.
Kill trigger: If variant first-note completion is less than +5 pts absolute over
            control at the 2027-01-21 read, turn the flag off and revert.
Confidence: Low. The mechanism (blank page → empty note) is plausible, but both
            numbers in the hypothesis have no query, date range, or definition,
            and no template test has run. Smaller step first: Step 0 baseline
            check (1–2 Analytics days) before design capacity is committed.
```

**Primary metric (proposed definition, Analytics to confirm in Step 0):** first-note completion (24h) = workspace creators whose first note contains ≥ 20 user-typed words within 24h of signup ÷ workspace creators who signed up in the cohort. Template text inserted by the gallery does not count toward the 20 words.

**Leading indicator:** template selection rate = creators who insert a non-blank template ÷ creators shown the gallery, at 24h. Target ≥ 40% (assumed; no prior data). Below 20% in the first week of exposure means the gallery is ignored; review before the full read.

**Counter-metrics (must not get worse):**

| Counter-metric | Baseline | Stop threshold | Read |
|----------------|----------|----------------|------|
| Signup → invited (d7) | 34.0% (wk 2026-09-28) | Variant ≥ 5 pts below control | 2027-01-27 (last cohort day + 7d + 1) |
| First note created (24h): creators who create any note ÷ creators | Unknown; Step 0 | Variant ≥ 3 pts below control | 2027-01-21 |

**Watched, not gated:** invited → 3 members editing (d7), 40.9% baseline. The 2-week sample is too small to detect a change on this downstream ratio; it is reported for direction only.

**Sample:** ~1,500 creators per arm detects a 5-pt lift from 58% (two-proportion test, α 0.05, power 0.8). At 1,388 signups/week (week of 2026-09-28) and a 50/50 split, that takes about 15 days. The same sample detects a 5-pt drop in invited (d7) from 34% (~1,350 per arm). Recompute once Step 0 produces the real baseline.

## Scope

**In:**
- A gallery shown when a new workspace creator opens their first note, on desktop web.
- 4 meeting templates plus "Blank": Standup, 1:1, Sprint planning, Retro (the 4 are assumed; Step 0 checks first-note titles to confirm or swap them).
- Selecting a template inserts its structure into the note as normal, editable content.
- A/B behind a feature flag (proposed name `onb_template_gallery_v1`), 50/50 on new workspaces only.
- Events for gallery viewed, template selected, and first note completed.

**Out (and why):**
- Custom or team-saved templates: tests reuse, not the blank-page hypothesis.
- Templates for invited teammates or existing workspaces: different job; muddies the new-creator cohort.
- Mobile web: under 4% of edits come from mobile web (`roadmap.md`, 2026-09-15); mobile web keeps the blank first note.
- AI-generated or AI-filled templates: separate cost profile; the AI summary bet was killed on cost (2026-08-29, `betting-table.md`).
- A template library beyond 4 + Blank, search, categories, or previews: expand only if the 4-template version wins.
- Changes to the invite step or share prompt: owned by the current bet.

## What it looks like

**Initial scope:** the creator signs up, lands in their first note, and sees the gallery: 4 template cards plus Blank. Picking a card fills the note with headings and prompts (for example, Standup: "Yesterday / Today / Blockers"). Picking Blank or closing the gallery leaves today's empty note. The gallery appears once per creator.

**Acceptance criteria:**
- [ ] With the flag on, a creator opening their first note in a new workspace on desktop web sees the gallery with exactly 5 options (4 templates + Blank).
- [ ] With the flag off, or for a control-arm creator, the first note opens empty, identical to today.
- [ ] Selecting a template inserts its content into the note in under 500 ms, and every inserted line is editable and deletable like typed text.
- [ ] Selecting Blank or closing the gallery opens an empty note and the gallery does not reappear for that creator.
- [ ] The gallery does not appear on the creator's second or later notes, for invited teammates, for existing workspaces, or on mobile web.
- [ ] `template_gallery_viewed`, `template_selected` (with `template_id`, including `blank`), and `first_note_completed` fire once per creator and appear in BigQuery within 24h.
- [ ] `first_note_completed` counts only user-typed words; a note containing only inserted template text does not fire it.
- [ ] The share prompt (ACM-415) does not fire on template insertion alone; it uses the same "first note written" condition as `first_note_completed`.
- [ ] Arm assignment is stored per workspace, is stable across sessions, and is queryable for the read.
- [ ] Turning the flag off returns all new creators to the empty first note with no deploy.

**Later (only if the kill trigger is not hit):** expand to 8–10 templates ranked by selection rate; show the gallery on "New note" for all users; team-saved templates.

## Plan

| Phase | Dates | Exit criterion |
|-------|-------|----------------|
| Step 0: define + baseline | 2026-10-19 → 2026-10-30 (after ACM-418 event naming closes) | First-note completion and first-note-created defined in `metrics-dictionary.md`; 8-week baseline queried; PM go/no-go on November design time |
| Scope + design | 2026-11-02 → 2026-11-13 | Gallery design and 4 template contents approved; designed against the post-gate onboarding flow (invite bet gate 2026-11-02) |
| Build | 2026-11-16 → 2026-12-04 | Acceptance criteria pass behind the flag in staging |
| Test | 2026-12-07 → 2026-12-11 | QA on desktop browsers; events verified in BigQuery; flag-off path verified |
| Go live (A/B 50/50) | 2027-01-05 | Flag on for new workspaces; holiday cohorts skipped (assumed atypical) |
| Read | Primary 2027-01-21 · guardrail 2027-01-27 | Ship, iterate, or kill (PM decides) |

Build starts only after the invite-in-onboarding gate (2026-11-02), and exposure starts after the 2026-10-13 → 10-26 invite cohorts have read out, so the two tests do not share cohorts.

## Risks and open questions

**Risks**
- **Baseline risk (highest).** If Step 0 shows the empty-first-note rate is well below 42%, the headroom for a 12-pt lift does not exist. Mitigation: Step 0 gates design.
- **Adoption.** Creators skip the gallery to get to a blank page faster. Leading indicator (selection rate) catches this in week 1 of exposure.
- **Funnel friction.** One more step before the first note lowers first-note-created. Counter-metric with a 3-pt stop.
- **Interaction with the current bet.** The gallery sits between signup and the share prompt. If the invite bet changes the first-session flow at the 2026-11-02 gate, the design changes with it.
- **Metric gaming by construction.** Template text makes notes look complete. Mitigated by counting only user-typed words.
- **Activation link unproven.** A completed first note is assumed, not shown, to lead to invites and 3 members editing. The gated counter-metric protects invites; the 3-editing ratio is watched for direction only.
- **Dependency.** Design capacity in November (`betting-table.md`) is unconfirmed with Design. Analytics is currently on ACM-418 for the current bet.

**Open questions**
1. Is the 20-word threshold the right "completed" bar, or does Analytics prefer a block count? (Analytics, Step 0)
2. Which 4 meeting types do first notes cover today? (Analytics, Step 0: top first-note titles over 8 weeks)
3. Launch 2026-12-14 instead of 2027-01-05 to gain 3 weeks, accepting holiday cohorts? (PM)
4. Who owns template copy: GTM Lead, Design, or PM? (PM, before 2026-11-02)

## Proposed tickets (not created; awaiting approval)

| # | Ticket | Area | Depends on | Est. days | Confidence |
|---|--------|------|------------|-----------|------------|
| 1 | Define first-note completion + first-note-created; query 8-week baseline and top first-note titles | Analytics | ACM-418 closed | 2 | High |
| 2 | Event spec + instrumentation: `template_gallery_viewed`, `template_selected`, `first_note_completed` (user-typed words only) | Analytics + FE | 1 | 2 | Med |
| 3 | Write 4 template contents + Blank option copy | PM / GTM / Design | 1 (titles) | 2 | Med |
| 4 | Gallery UI design for the first-note flow (post-gate onboarding) | Design | Invite gate 2026-11-02 | 3 | Med |
| 5 | Serve the template set to the first-note flow | BE | 3 | 1 | High |
| 6 | Gallery picker in first note behind `onb_template_gallery_v1` (show-once, desktop web, new workspaces only) | FE | 4, 5 | 3 | Med |
| 7 | Insert selected template as editable content; share prompt and completion ignore inserted text | FE | 2, 6 | 2 | Med |
| 8 | 50/50 workspace-level assignment + readout query/dashboard (primary, leading, counter-metrics) | Analytics + FE | 2, 6 | 2 | Med |
| 9 | QA pass + flag-off verification + launch checklist | FE / QA | 7, 8 | 1 | High |

**Critical path:** 1 → 2 → 7 → 8 → 9, with 4 → 6 → 7 in parallel. Engineering (FE + BE) ≈ 9 days; Design 3; Analytics ≈ 4 (shared). Parallel work: 3, 4, 5 run alongside 2.

**Four lines per ticket** (all inherit the PRD hypothesis; each ticket's measure is its own done-check):

- **#1** Hypothesis: a defined baseline confirms ≥ 25% of creators leave the first note empty. Measure: query result in BigQuery by 2026-10-30. Kill trigger: if the empty rate is < 20%, PM stops the bet before design. Confidence: High (data exists; needs a query).
- **#2** Hypothesis: the three events give a complete, deduplicated funnel. Measure: each fires exactly once per test creator in staging, visible in BigQuery within 24h. Kill trigger: any event double-fires (cf. `invite_sent` retry bug, meeting notes 2026-10-07) → fix before launch. Confidence: Med.
- **#3** Hypothesis: the 4 chosen meeting types cover most first notes. Measure: the 4 types match ≥ 50% of first-note titles from #1. Kill trigger: < 30% match → swap types before design sign-off. Confidence: Med.
- **#4** Hypothesis: a one-screen gallery adds no measurable time before the first note. Measure: design review against the acceptance criteria by 2026-11-13. Kill trigger: design requires more than one screen or step → cut to a single-row picker. Confidence: Med.
- **#5** Hypothesis: templates load with the note. Measure: template content available to the first note in staging within the 500 ms insert budget. Kill trigger: misses 500 ms → move templates to static client config. Confidence: High.
- **#6** Hypothesis: the gallery appears only for the target audience. Measure: acceptance criteria 1, 2, 4, 5 pass in staging. Kill trigger: shows to any out-of-scope user → block launch. Confidence: Med.
- **#7** Hypothesis: inserted content behaves as typed text and does not inflate completion. Measure: acceptance criteria 3, 7, 8 pass. Kill trigger: template-only note fires `first_note_completed` or the share prompt → block launch. Confidence: Med.
- **#8** Hypothesis: the read is clean. Measure: arm split within 50 ± 2% on the first 3 days of exposure; dashboard shows all gated metrics. Kill trigger: split outside 48–52% → pause exposure and fix assignment. Confidence: Med.
- **#9** Hypothesis: launch is reversible. Measure: flag off restores the empty first note with no deploy in staging. Kill trigger: flag-off fails → no launch. Confidence: High.

## Evidence Loop

| # | Claim | Status | Source (file + date / query / doc) |
|---|-------|--------|-------------------------------------|
| 1 | 42% of new users leave their first note empty | assumed | `product/roadmap/betting-table.md` (2026-10-09) states it with no query, date range, or definition. Needs Step 0 query. |
| 2 | First-note completion baseline is 58% | assumed | `betting-table.md` (2026-10-09), `roadmap.md` (2026-09-15); metric absent from `metrics-dictionary.md` and `inputs/funnel-weekly.csv`. Needs definition + query. |
| 3 | Signup → invited (d7) is 34% | supported | `product/context.md` (as of 2026-10-03); `inputs/funnel-weekly.csv` week 2026-09-28: 472 / 1,388 = 34.0% |
| 4 | Invited → 3 members editing (d7) is 41% | supported | `context.md` (2026-10-03); `funnel-weekly.csv` week 2026-09-28: 193 / 472 = 40.9% |
| 5 | ~1,390 signups per week | supported | `funnel-weekly.csv`, week 2026-09-28 (1,388) and 2026-09-21 (1,410) |
| 6 | ~1,500 creators per arm detects a 5-pt lift; ~15 days at 50/50 | partial | Computed in this PRD (two-proportion, α 0.05, power 0.8); depends on claim 2's baseline holding |
| 7 | Templates lift first-note completion by 12 pts | assumed | none; no prior test in the betting table's completed or killed bets |
| 8 | A completed first note leads to more invites and 3-member editing | assumed | none; no data links note content to team activation |
| 9 | No existing tracker work on templates | partial | `inputs/tracker-export.csv` (latest row updated 2026-10-09); live tracker not checked |
| 10 | Share prompt fires after the first note is written; currently blocked | supported | `current-bet.md` (2026-10-09); ACM-415 in `tracker-export.csv`; meeting notes 2026-10-05 |
| 11 | Invite bet gate is 2026-11-02; its cohort is 2026-10-13 → 10-26 | supported | `current-bet.md` (2026-10-09) |
| 12 | Under 4% of edits come from mobile web | partial | `roadmap.md` (2026-09-15) "Not doing" line; no query or date range cited |
| 13 | Design capacity is available in November | partial | `betting-table.md` (2026-10-09) lists it as a dependency; not confirmed with Design |
| 14 | Standup, 1:1, Sprint planning, Retro are the right 4 templates | assumed | none; ticket #1 checks first-note titles |
| 15 | Holiday-period cohorts are atypical | assumed | none |
| 16 | Event double-firing is a live risk for new events | supported | meeting notes 2026-10-07 (`invite_sent` fires twice on retry; ACM-418 open) |

**Assumption that would flip this:** that the empty-first-note rate is near 42% under a real definition. If Step 0 finds it below 20%, a 12-pt lift has no room and November design capacity belongs to another bet.

**Human decides here:** (1) PM: go/no-go on committing November design capacity after the Step 0 baseline, by 2026-10-30. (2) PM: approve scope, count, and assignment of the proposed tickets before any are created. (3) PM: ship / iterate / kill at the 2027-01-21 read and the 2027-01-27 guardrail read.

**Confidence:** low. Funnel baselines downstream of the first note are sourced, but both numbers the hypothesis rests on are unsourced and the activation link is untested.
