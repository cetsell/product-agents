# Prioritization: queued bets (ICE) | 2026-10-12

**Candidates:** the three queued bets in `product/roadmap/betting-table.md` (2026-10-09).
**Method:** ICE (Impact, Confidence, Ease, each 1–10; score = I × C × E). Reach differs across the three, so Impact is scored as expected movement of the North Star (weekly active teams, 1,840 → 2,500, `product/context.md` 2026-10-05) or, failing that, of the bet's pillar metric. Reach is folded into Impact, not dropped.
**Project status source:** `inputs/tracker-export.csv` (tickets updated through 2026-10-09) and `inputs/meeting-notes.md` (2026-10-05, 2026-10-07). No live tracker connection.

| Rank | Candidate | I | C | E | Score | Pillar | Evidence for C |
|------|-----------|---|---|---|-------|--------|----------------|
| 1 | Template gallery | 6 | 5 | 7 | **210** | Activation | The problem is measured: 42% of new users leave an empty first note (betting table, 2026-10-09). That templates fix it is untested. The link to the North Star is plausible but unmeasured: the current bet's share prompt only fires after a first note is written (`current-bet.md`, 2026-10-09), so an empty first note means the user never sees that invite path. |
| 2 | Slack digest | 7 | 4 | 6 | **168** | Collaboration depth (loose fit) | "Teams that get any notification retain 1.4x" (betting table, 2026-10-09) is a correlation. Teams that are already engaged trigger more notifications, so the lift is likely overstated. The share of customer teams that use Slack is unknown. |
| 3 | Usage-limit paywall | 4 | 4 | 3 | **48** | Monetization | 18% of active free teams hit the 50-note limit monthly (betting table, 2026-10-09). The 7.5% → 9% lift is assumed. The last monetization lever showed "no lift in upgrades" (AI summary on free plan, killed 2026-08-29). |

**Top pick:** Template gallery. It is the most certain way to feed the activation funnel the team is already rebuilding, and it has no external or blocked dependency.
**Flips if:** Template gallery's Confidence is really 4, not 5. That gives a 168–168 tie with the digest, and the digest wins on Impact. This happens if users who complete a first note invite teammates at about the same d7 rate as users who leave it empty. Then fixing the empty note does not move the North Star.
**Quick wins:** Template gallery (highest Ease; its only dependency is internal design capacity in November). **Big bets:** Slack digest (it pulls the most direct lever on the North Star, which is retention, but its confidence is the lowest of the top two and it depends on a 2–3 week external Slack review).
**Not now:** Usage-limit paywall. It is blocked on per-seat proration (ACM-420, In Progress, no acceptance criteria, last updated 2026-09-26, paused about two weeks for the editor crash fix per the 2026-10-07 sync, where "paywall bet slips"). It also moves revenue, not the North Star.

### How the Impact scores were sized

- **Template gallery (6):** about 1,388 signups/week (`inputs/funnel-weekly.csv`, week of 2026-09-28). +12 pts first-note completion ≈ 167 more users/week with a written first note, all of whom then reach the share prompt. How many of them become 3-member teams is unknown.
- **Slack digest (7):** about 193 newly activated teams/week (`funnel-weekly.csv`, week of 2026-09-28). +6 pts week-4 retention ≈ 12 more retained teams per weekly cohort, or about 150 across a 13-week quarter before further decay. This is the only bet that directly protects the North Star base. Note: the draft strategy memo's "≈110 weekly active teams" applies a cohort retention change to the whole 1,840-team base (6% × 1,840). That is not how week-4 retention works.
- **Usage-limit paywall (4):** +1.5 pts on active team → paid (d30) ≈ 3 more paid teams/week on about 193 activated teams/week, or about 38/quarter. Revenue per team is unknown (seats per team not in sources). The North Star impact is zero or negative if the prompt pushes limit-hitting teams away.

### Ease rationale

- **Template gallery (7):** internal design capacity in November. No blocking ticket. It works in the onboarding surface Growth already owns. It must not ship into the invite bet's measured cohort (signups 2026-10-13 to 2026-10-26, gate 2026-11-02), or it confounds that read.
- **Slack digest (6):** the Slack app review takes 2–3 weeks of calendar time outside our control. The "two weeks of work" estimate comes from the draft memo (`inputs/strategy-memo.md`, undated) with no ticket behind it.
- **Usage-limit paywall (3):** hard dependency on ACM-420 (see above). The copy ticket ACM-421 is Todo with no acceptance criteria.

**Pillar note:** all three serve a pillar. The digest's fit is loose because Collaboration depth is defined as "notes turn into decisions and tickets", and the digest targets retention. None of the three serves the H1 2027 horizon theme (notes-to-tickets integrations, `context.md`). "Linear and Jira export" is on `roadmap.md` Next (last updated 2026-09-15, stale) but is not queued.

## Evidence Loop

| # | Claim | Status | Source (file + date / query / doc) |
|---|-------|--------|-------------------------------------|
| 1 | 42% of new users leave an empty first note (first-note completion 58%) | partial | `product/roadmap/betting-table.md`, 2026-10-09. The underlying query and date range are not cited, and the metric is not in `funnel-weekly.csv` or the metrics dictionary |
| 2 | Templates lift first-note completion 58% → 70% | assumed | none. This is the hypothesis itself |
| 3 | First-note completion gates the share-prompt invite path | supported | `product/roadmap/current-bet.md`, 2026-10-09 ("share this note" prompt after the first note is written) |
| 4 | Completing a first note raises the invite rate (link to the North Star) | assumed | none. Needs a warehouse split of invited_d7 by first-note status |
| 5 | Signups ≈ 1,388/week; activated teams ≈ 193/week; funnel ratios match the baselines (34% invited, 41% three editing) | supported | `inputs/funnel-weekly.csv`, weeks 2026-08-10 to 2026-09-28; `product/context.md` baselines as of 2026-10-03 |
| 6 | Notified teams retain 1.4x | partial | `betting-table.md`, 2026-10-09. Correlational; no holdout; source analysis not cited |
| 7 | Digest lifts week-4 retention 52% → 58% (≈12 teams per weekly cohort) | assumed | Baseline 52% from `context.md` (2026-09-30). The lift is the hypothesis; the cohort arithmetic uses `funnel-weekly.csv` |
| 8 | Memo claim "≈110 weekly active teams" from the digest | unsupported | `inputs/strategy-memo.md` (undated draft). Applies a cohort retention change to the full active base |
| 9 | Digest costs two weeks of engineering | assumed | `inputs/strategy-memo.md` (undated draft). No ticket in `tracker-export.csv` |
| 10 | Slack app review takes 2–3 weeks | partial | `betting-table.md`, 2026-10-09. Not verified against Slack's current review times |
| 11 | 18% of active free teams hit the 50-note limit monthly | partial | `betting-table.md`, 2026-10-09. Query not cited; the free vs paid split of the 1,840 active teams is unknown |
| 12 | Paywall lifts active → paid (d30) 7.5% → 9% | assumed | Baseline 7.5% from `context.md` (billing export, 2026-09-30). The lift is the hypothesis |
| 13 | Per-seat proration (paywall dependency) is not ready and has slipped | supported | `inputs/tracker-export.csv` ACM-420 (In Progress, updated 2026-09-26, no AC); `inputs/meeting-notes.md` 2026-10-07 |
| 14 | A prior monetization lever produced no upgrade lift | supported | `betting-table.md` Killed: AI summary on free plan, 2026-08-29 |
| 15 | Template gallery has no blocked or external dependency beyond November design capacity | partial | `betting-table.md`, 2026-10-09. No gallery ticket exists in `tracker-export.csv` to confirm scope |
| 16 | None of the queued bets serves the H1 2027 horizon theme | supported | `product/context.md`, 2026-10-05; `roadmap.md`, 2026-09-15 (stale, more than 14 days old) |

**Assumption that would flip this:** that users who complete a first note invite teammates at a meaningfully higher d7 rate than users who leave it empty. If the rates are about the same, the gallery's Confidence drops to 4 or below and the Slack digest becomes the top pick.
**Human decides here:** the PM commits the next bet in `betting-table.md` at the weekly betting-table review. That is the point where this ranking stops and the PM's call starts. The invite bet's early read (2026-10-20) and gate (2026-11-02) are the natural checkpoints. A strong invite result makes the gallery more valuable, because the share prompt depends on first notes.
**Confidence:** medium-low. The ranking between #1 and #2 rests on one assumed link (claim 4), and every lift estimate is a hypothesis, not a measurement. #3's last place is high-confidence because it is blocked.
