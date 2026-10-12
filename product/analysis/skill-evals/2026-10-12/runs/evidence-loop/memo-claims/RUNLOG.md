# RUNLOG — evidence-loop / memo-claims

## (a) User message
"Evidence loop on inputs/strategy-memo.md before it goes to leadership."

## (b) Files read
- CLAUDE.md
- .claude/skills/evidence-loop/SKILL.md
- product/playbooks/evidence-loop.md (method reference named by the skill)
- inputs/strategy-memo.md
- inputs/funnel-weekly.csv
- inputs/meeting-notes.md
- inputs/tracker-export.csv
- product/context.md
- product/analysis/CLAUDE.md
- product/roadmap/CLAUDE.md
- product/roadmap/betting-table.md
- product/roadmap/current-bet.md
- product/roadmap/roadmap.md
- product/roadmap/product-strategy.md
- product/roadmap/experiment-roadmap.md
- product/analytics/metrics-dictionary.md
- product/analytics/data-quality-log.md
- team/decisions/decisions.md
- team/cadence.md
- team/roster.md
- product/customer-insights/CLAUDE.md
- engineering/README.md
- (grep across product/, team/, gtm/, engineering/, inputs/ for slack|digest|notification|competitor|1.4x|two weeks|estimate)

## (c) Files created or modified
- Created: product/analysis/evidence/evidence-strategy-memo-2026-10-12.md
- Created: RUNLOG.md
- inputs/strategy-memo.md left unchanged (audit only)

## (d) Final message to the user

Evidence loop written to `product/analysis/evidence/evidence-strategy-memo-2026-10-12.md`. I saved it as a separate file and left the memo untouched. I can append the table to the memo instead if you'd like.

**Bottom line: confidence is low.** I found 13 claims in the memo. Only 1 is supported, 2 are partial, and 10 rest on assumption.

- **Supported:** Week-4 team retention is 52% (`product/context.md`, as of 2026-09-30).
- **Partial:**
  - The "1.4x retention" figure is repeated in `betting-table.md` (2026-10-09), but nothing says where it came from: no query, no cohort, no metric definition.
  - "Slack app review takes 2–3 weeks" also appears there, with no external source.
- **Assumed:** next-bet ranking over Template gallery and the paywall, the 6-point lift, the ~110 teams figure, "competitors all ship Slack", "customers expect it", "start now", the paid-conversion spillover, the two-week engineering estimate, and the Friday commit.
- **The ~110 teams figure looks miscalculated.** It matches 6% of all 1,840 weekly active teams. Week-4 retention only applies to new team cohorts, which run 158–197 activated teams a week (`inputs/funnel-weekly.csv`). That works out to about 9–12 extra teams per cohort, so getting to 110 would take roughly 10 weeks of cohorts plus retention that holds past week 4. The memo assumes neither out loud.
- **The two-week estimate has no source anywhere.** There's no digest ticket in the tracker, no estimate in the meeting notes, and nothing in `engineering/`. The only "two weeks" in the sources is the proration pause.
- **One past result cuts against the paid-conversion claim.** The killed "AI summary on free plan" bet showed "no lift in upgrades" (betting table, 2026-08-29).

**Assumption that would flip this:** that the 1.4x notification–retention gap is causal and would carry over to a Slack digest. If it only reflects already-engaged teams getting more notifications, the lift, the sizing and the upgrade spillover all fall away. The memo would then have no other reason to rank the digest first.

**Human decides here:** whether this memo goes to leadership as written, and whether to commit the digest as the next bet on Friday 2026-10-16. That's the PM's call. Note that Friday comes before the current bet's first early read (2026-10-20) and its gate (2026-11-02). Any effort estimate should come from the Eng Lead before it's quoted.

**Verify before acting:**
1. The warehouse query behind 1.4x, and whether the gap holds after controlling for prior team activity.
2. The impact recomputed from weekly activated cohorts, with a time horizon.
3. A written engineering estimate for the digest.

The warehouse, tracker and meeting-notes servers weren't connected, so I used the exports in `inputs/` instead.
