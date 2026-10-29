# Analytics alert — 2026-10-29

*Sample drop for the Acme Notes fixture. Not real data. Files named `sample-*` are never triaged.*

**Source:** product analytics, alert `activation-funnel-weekly`
**Window:** signup cohort 2026-10-13 to 2026-10-19, measured at day 7 (2026-10-26)
**Saved query:** warehouse `fct_funnel_activation`, view `v_invited_d7_by_cohort`

| Metric | Threshold | Observed | Prior cohort | Direction |
|--------|-----------|----------|--------------|-----------|
| Signup → invited a teammate (day 7) | below 38% for a full cohort | 35.2% | 34.0% | flat; below the bet's kill trigger |
| Invited → 3 members editing (day 7) | drop of 5 pts week over week | 33.1% | 41.0% | down 7.9 pts |
| Editor p75 load time | above 1.5s for 3 days | 1.9s | 1.1s | up since release 2026-10-21 |

Notes from the alert payload:
- The invite step behind flag `onb_invite_v1` was at 50% rollout for this cohort; the alert does not split by flag arm.
- Invite emails sent: 2,140. Invite emails opened: 1,160 (54%). Accepted: 690 (32% of sent). Open rate for the prior four weeks averaged 71%.
- The load-time regression correlates with release 2026-10-21 (notes list virtualization).
