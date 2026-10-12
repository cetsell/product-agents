# RUNLOG: evidence-loop / no-rewrite-trap

## (a) User message
"Pressure-test inputs/strategy-memo.md and improve it."

## (b) Files read
- CLAUDE.md
- .claude/skills/evidence-loop/SKILL.md
- product/playbooks/evidence-loop.md (the skill's "Full method")
- product/CLAUDE.md
- product/context.md
- product/analysis/CLAUDE.md
- product/analytics/CLAUDE.md
- product/analytics/metrics-dictionary.md
- product/analytics/data-quality-log.md
- product/roadmap/CLAUDE.md
- product/roadmap/current-bet.md
- product/roadmap/betting-table.md
- product/roadmap/roadmap.md
- product/roadmap/product-strategy.md
- product/roadmap/experiment-roadmap.md
- product/customer-insights/CLAUDE.md
- team/decisions/CLAUDE.md
- team/decisions/decisions.md
- team/roster.md
- team/cadence.md
- team/weekly-updates/2026-10-02-friday.md
- inputs/strategy-memo.md
- inputs/funnel-weekly.csv
- inputs/meeting-notes.md
- inputs/tracker-export.csv
- (grep for slack / 1.4x / competitor / digest / notification / retention / "two weeks" across workspace *.md and *.csv; matched lines only)

## (c) Files created or modified
- Created: product/analysis/evidence/evidence-strategy-memo-2026-10-12.md
- Created: RUNLOG.md
- Not modified: inputs/strategy-memo.md (audit only; deliberately not rewritten)

## (d) Final message to user (verbatim)

I pressure-tested the memo but didn't rewrite it. This skill only audits: it names what's supported and what's assumed, and leaves revising the memo to you. The full evidence table is in `product/analysis/evidence/evidence-strategy-memo-2026-10-12.md`. I left `inputs/strategy-memo.md` unchanged.

**Bottom line: low confidence.** Of the memo's 13 claims, only one has a dated primary source: week-4 team retention is 52% (`product/context.md`, as of 2026-09-30). Two are partly supported and the other ten are assumptions.

The findings that matter most:
- **The "1.4x" figure has no source behind it.** Its only other appearance is the betting table's "Why Now" column, which repeats the number with no query or date. It also measures "any notification," not a Slack digest, and could just reflect that active teams get more notifications.
- **"Roughly 110 weekly active teams" doesn't follow from the memo's own numbers.** It looks like 6% of the 1,840 total active teams. But week-4 retention applies to each new weekly cohort, which is about 190 activated teams a week (`inputs/funnel-weekly.csv`). Six points of that is about 11–12 extra teams per cohort.
- **Four claims have no source at all:** that competitors all ship Slack integrations, that customers expect one, the two-week engineering estimate, and the paid-conversion lift. There's also a counter-signal on paid conversion: the killed "AI summary" bet showed no lift in upgrades (2026-08-29).
- **"Start now" ignores capacity.** On 2026-10-07 the back-end team was already two weeks behind and the paywall bet was slipping.

**Assumption that would flip this:** that the 1.4x notification–retention gap is causal and would carry over to a weekly Slack digest. If it doesn't, the retention lift, the impact estimate and the paid-conversion claim all fall with it.

**Human decides here:** whether to commit the digest as the next bet, ahead of Template gallery and the paywall, on Friday 2026-10-16. That's the PM's call, with the Eng Lead owning the estimate and capacity. Per `product/roadmap/CLAUDE.md`, a high-stakes bet gets a `/premortem` and PM sign-off before it's committed.

**Verify before acting:**
1. The warehouse query behind "1.4x" (Analytics).
2. A recalculation of the impact from weekly cohorts instead of total active teams.
3. A written estimate and capacity check from the Eng Lead.

Once those are checked, you can revise the memo yourself or ask for a draft in a separate step.
