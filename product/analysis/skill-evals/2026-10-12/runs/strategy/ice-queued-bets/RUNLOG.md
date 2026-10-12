# RUNLOG

## (a) User message
"Rank the three queued bets in the betting table and tell me which to do next."

## (b) Files read
- CLAUDE.md
- .claude/skills/strategy/SKILL.md
- product/CLAUDE.md
- product/context.md
- product/roadmap/CLAUDE.md
- product/roadmap/roadmap.md
- product/roadmap/betting-table.md
- product/roadmap/current-bet.md
- product/roadmap/product-strategy.md (template placeholders, unfilled)
- product/roadmap/experiment-roadmap.md (template placeholders, unfilled)
- product/playbooks/evidence-loop.md
- product/analysis/CLAUDE.md
- product/analytics/data-quality-log.md (template, no entries)
- product/analytics/metrics-dictionary.md, product/analytics/funnel-definitions.md (grep only)
- team/decisions/decisions.md (template, no entries)
- inputs/tracker-export.csv
- inputs/funnel-weekly.csv
- inputs/meeting-notes.md
- inputs/strategy-memo.md

## (c) Files created or modified
- Created: product/analysis/strategy/prioritization-queued-bets-2026-10-12.md
- Created: RUNLOG.md

## (d) Final message to the user (verbatim)

Do the **template gallery** next. Here are the three queued bets ranked with ICE (Impact × Confidence × Ease, each scored 1–10):

| Rank | Bet | I | C | E | Score | Pillar |
|---|---|---|---|---|---|---|
| 1 | Template gallery | 6 | 5 | 7 | **210** | Activation |
| 2 | Slack digest | 7 | 4 | 6 | **168** | Collaboration depth (loose fit) |
| 3 | Usage-limit paywall | 4 | 4 | 3 | **48** | Monetization |

The bets reach different numbers of users, so I scored Impact by how much each could move the North Star (weekly active teams).

- **Why the gallery is first:** 42% of new users leave their first note empty. The share prompt in the current bet only appears after a first note is written, so those users never see that invite path. The gallery feeds the activation funnel you're already rebuilding, and its only dependency is design capacity in November, which is internal. It must not ship into the invite bet's measured cohort (signups Oct 13–26, gate Nov 2).
- **Why the digest is second:** it pulls the most direct lever on the North Star (about 12 more retained teams per weekly cohort, or roughly 150 over a quarter). But the "notified teams retain 1.4x" figure is a correlation, it depends on a 2–3 week Slack review, and the two-week estimate comes from the draft memo with no ticket behind it. The memo's "≈110 weekly active teams" is miscalculated: it applies a 6-point cohort retention gain to the whole 1,840-team base.
- **Why the paywall is last:** it's blocked on per-seat proration (ACM-420). That ticket has no acceptance criteria, was last updated Sep 26, and was paused for the editor crash fix. The paywall moves revenue, not the North Star, and the last monetization bet (AI summary) showed no upgrade lift.

**What would flip the call:** whether users who write a first note invite teammates at a meaningfully higher rate than users who leave it empty. If the rates are about the same, the gallery's Confidence drops to 4, it ties the digest at 168, and the digest takes first place on Impact. A warehouse split of invited_d7 by first-note status would answer this.

Two things to know:
- **Every lift is a guess.** Each improvement in the table is the bet's own hypothesis, not a measurement, so confidence in the ranking is medium-low.
- **None of the three is notes-to-tickets work.** That is the H1 2027 theme, and Linear/Jira export is on the roadmap but not queued.

Can you confirm ACM-420's status? I worked from the tracker export and meeting notes because there's no live tracker connection, and that ticket's last update is more than two weeks old.

The decision is yours at the weekly betting-table review. The invite bet's early read (Oct 20) and gate (Nov 2) are good checkpoints.

Full ranking and evidence table: `product/analysis/strategy/prioritization-queued-bets-2026-10-12.md`
