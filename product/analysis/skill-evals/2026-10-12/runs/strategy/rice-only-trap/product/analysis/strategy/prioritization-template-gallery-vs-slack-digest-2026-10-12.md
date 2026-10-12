# Prioritization: Template gallery vs. Slack digest | 2026-10-12

Unit: teams (accounts) per quarter, to match the North Star (weekly active teams). Effort is missing from every source, so each score is given as R × I × C ÷ E, with E still open.

| Rank | Candidate | R | I | C | E | Score | Pillar | Evidence for C |
|------|-----------|---|---|---|---|-------|--------|----------------|
| 1 | Template gallery | 16,900 new team creators/qtr (8-wk avg 1,298 signups/wk × 13; `inputs/funnel-weekly.csv`, weeks 2026-08-10 to 2026-09-28) | 0.5 (low): lifts first-note completion 58% → 70%, which sits two funnel steps before the North Star | 80% (medium): problem is measured (42% of new users leave an empty first note), but templates as the fix are untested | not estimated | **6,760 ÷ E** | Activation (matches the Q4 2026 "Now" horizon) | `betting-table.md`, 2026-10-09 |
| 2 | Slack digest | 1,840 weekly active teams (`product/context.md`, as of 2026-10-03). Upper bound: assumes every active team connects Slack | 1 (medium): week-4 team retention 52% → 58%, acting directly on the North Star | 50% (low): "teams that get any notification retain 1.4x" is correlational, since active teams generate notifications | 2 person-weeks per an undated, unattributed draft memo (unverified) | **920 ÷ E** (= 460 if E = 2) | Collaboration depth | `betting-table.md`, 2026-10-09; `inputs/strategy-memo.md` (undated) |

**Top pick:** Template gallery. Its reach × impact × confidence is 7.3x the digest's, and no plausible change to R, I or C closes that gap.
**Flips if:** the gallery costs more than 7.3x the digest in person-weeks. If the digest really is 2 person-weeks, the gallery stays on top up to about 15 person-weeks. Effort is the only input that can flip the pick. Even at its floor (I = 0.25) the gallery scores 3,380, and the digest at I = 3 with C = 100% scores 5,520.
**Quick wins / big bets:** can't tag yet. Neither bet has a sourced effort estimate.

## Evidence Loop

| # | Claim | Status | Source (file + date / query / doc) |
|---|-------|--------|-------------------------------------|
| 1 | About 16,900 new signups (potential team creators) per quarter | supported | `inputs/funnel-weekly.csv`, 8 weeks ending week of 2026-09-28 (sum 10,380 ÷ 8 × 13) |
| 2 | 1,840 weekly active teams can receive the digest | partial | `product/context.md`, 2026-10-03. The share of teams on Slack is not in any source, so 1,840 is an upper bound |
| 3 | Gallery lifts first-note completion 58% → 70% | assumed | `betting-table.md`, 2026-10-09 states the hypothesis. The 58% baseline is not in `context.md` baselines |
| 4 | 42% of new users leave an empty first note | partial | `betting-table.md`, 2026-10-09. Source query and date range not given |
| 5 | Digest lifts week-4 team retention 52% → 58% | assumed | `betting-table.md`, 2026-10-09 hypothesis. The 52% baseline is supported (`context.md`, 2026-09-30) |
| 6 | Teams that get notifications retain 1.4x | partial | `betting-table.md`, 2026-10-09 and `inputs/strategy-memo.md`. Correlation only, so it sets C to low |
| 7 | Digest effort is 2 person-weeks | assumed | `inputs/strategy-memo.md`, undated draft, no named estimator. Slack app review adds 2–3 weeks of elapsed time (`betting-table.md`) |
| 8 | Gallery effort | assumed | none. No ticket in `inputs/tracker-export.csv`. Depends on design capacity in November (`betting-table.md`) |
| 9 | The memo's "+6 pts adds ~110 weekly active teams" | not used | `inputs/strategy-memo.md` applies a new-cohort week-4 retention lift to the whole active base (1,840 × 6%) |

**Assumption that would flip this:** that the gallery costs less than about 7x the digest in person-weeks. Get both estimates, from Eng for the digest and from Design + Eng (FE) for the gallery, before committing.
**Human decides here:** the PM commits next quarter's queued bet once both effort estimates are in. The Template gallery is the default unless its estimate exceeds the break-even.
**Confidence:** medium. The R × I × C gap is wide and robust to each single score, but the call rests on an effort comparison no one has estimated yet. `roadmap.md` (last updated 2026-09-15) is over 14 days old, so it was used only for the pillar mapping. R, I and C come from the fresher `betting-table.md` (2026-10-09).
