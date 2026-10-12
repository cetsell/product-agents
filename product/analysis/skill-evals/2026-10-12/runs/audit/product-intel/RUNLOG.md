# RUNLOG — /audit (product-intel)

## (a) User message
"Run a product intelligence audit: are we shipping to learn? Use the tracker export and meeting notes in inputs/ and the roadmap files."

## (b) Files read
- CLAUDE.md
- .claude/skills/audit/SKILL.md
- product/CLAUDE.md
- product/context.md
- product/analysis/CLAUDE.md
- product/analysis/audit/ (checked: does not exist, so there are no prior audits)
- inputs/tracker-export.csv
- inputs/meeting-notes.md
- inputs/funnel-weekly.csv
- product/roadmap/CLAUDE.md
- product/roadmap/betting-table.md
- product/roadmap/experiment-roadmap.md
- product/roadmap/current-bet.md
- product/roadmap/roadmap.md
- product/roadmap/product-strategy.md
- team/decisions/decisions.md
- team/weekly-updates/2026-10-02-friday.md
- product/analytics/CLAUDE.md
- product/analytics/data-quality-log.md
- product/analytics/metrics-dictionary.md
- product/analytics/funnel-definitions.md
- product/playbooks/evidence-loop.md

## (c) Files created or modified
- Created: product/analysis/audit/product-intelligence-shipping-to-learn-2026-10-12.md
- Created: RUNLOG.md

## (d) Final message to the user (verbatim)

The audit is in `product/analysis/audit/product-intelligence-shipping-to-learn-2026-10-12.md`.

**Are we shipping to learn? Only partly.** The active bet (Invite in onboarding) is set up to learn: the dashboard shipped first, the baseline is stable (invited (d7) has held at 33.0–34.0% for 8 weekly cohorts), and it has a dated kill trigger and a 7-day early read. Outside the bet, 2 of the 3 customer-facing things shipped since 2026-09-11 have no metric or read-out date: the crash fix (ACM-399, 2026-10-06) and welcome sequence v2 (ACM-409, 2026-10-08). That means the median time from shipped to measured can't be computed. The one recorded win (editor load, "week-1 retention +3 pts") can't be checked against any metric or export in team-os.

**Most urgent, because the measured cohort starts tomorrow (2026-10-13):**
1. The bet's success measure is broken. `invite_sent` fires twice on retry (meeting notes, 2026-10-07). The ticket meant to fix it, ACM-418, has had no update since 2026-10-02 and has no acceptance criteria, and invited (d7) is not defined anywhere. Owner: Analytics.
2. The read is a before/after comparison with no documented holdout, and welcome v2 shipped into the same window on 2026-10-08. Even a real move to 45% couldn't be credited to the invite step. Owner: PM.
3. Half of the bet's mechanism (the share prompt, ACM-415) has been blocked since 2026-10-03, waiting on GTM copy that has no ticket. Owners: GTM Lead, PM.

The report also covers stale work in progress (ACM-405 has had no update for 24 days; the proration pause is slipping the paywall bet without that being recorded; SSO, ACM-410, is not on the roadmap) and a strategic alignment check. Effort is correctly concentrated on Activation. The report has six recommendations, each with an owner and a confidence level, plus the Evidence Loop appendix.

**Data gaps:** the tracker export is a 10-row snapshot with no weekly split, completed-at dates, or status history, so cycle times are proxies. The metrics dictionary and funnel definitions are unfilled templates. I couldn't confirm whether ACM-412 will be live on 2026-10-13.

**Decisions for you:**
- PM: add a holdout on `onb_invite_v1`, and scope the 2026-11-02 read to the invite step only or both changes.
- Analytics: write the invited (d7) definition (distinct users, and whether it's based on `invite_sent` or `invite_accepted`).
- GTM Lead and Eng Lead: give welcome v2 and the crash fix a metric, or mark them unmeasured by choice.

I didn't edit the betting table, roadmap, or decision log. Those changes are listed as recommendations.
