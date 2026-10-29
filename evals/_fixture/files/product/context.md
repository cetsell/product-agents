# Product Context

*Fixture for product-agents evals: a fictional product. Not real data.*

**Last updated:** 2026-10-05
**Owner:** PM

---

## Product

| Field | Value |
|-------|-------|
| Product | Acme Notes — shared meeting notes for small product teams |
| Customer | Product teams of 5–30 people at software companies |
| Stage | Early growth |
| Business model | Freemium; Team plan $10/seat/month |

## North Star

| Field | Value |
|-------|-------|
| North Star metric | Weekly active teams (3+ members editing in a week) |
| Current | 1,840 (as of 2026-10-03, source: warehouse `fct_weekly_growth`) |
| Target | 2,500 by 2026-12-31 |
| Why this metric | A team that edits together weekly has adopted the product; solo use churns |

## Strategic pillars (max 3)

1. Activation — new teams reach "3 members editing" in their first week
2. Collaboration depth — notes turn into decisions and tickets
3. Monetization — free teams that hit limits upgrade to Team

## Horizon

| Horizon | Theme | Window |
|---------|-------|--------|
| Now | Team activation in week one | Q4 2026 |
| Next | Notes-to-tickets integrations | H1 2027 |
| Later | Decision memory across meetings | 2027–2028 |

## Teams

| Team | Owns | Lead (role) |
|------|------|-------------|
| Core | Editor, sharing, onboarding | Eng Lead |
| Growth | Signup, activation, upgrade | PM |
| GTM | Campaigns, lifecycle email | GTM Lead |

## Baseline metrics

| Metric | Value | As of | Source |
|--------|-------|-------|--------|
| Visit → signup | 6.1% | 2026-10-03 | product analytics |
| Signup → invited a teammate (day 7) | 34% | 2026-10-03 | warehouse `fct_funnel_activation` |
| Invited → 3 members editing (day 7) | 41% | 2026-10-03 | warehouse `fct_funnel_activation` |
| Active team → paid (day 30) | 7.5% | 2026-09-30 | billing export |
| Week-4 team retention | 52% | 2026-09-30 | warehouse |

## Tools

| Job | Your tool | MCP server name (optional) |
|-----|-----------|----------------------------|
| Issue tracker | Linear | `linear` (not connected in evals; use inputs/tracker-export.csv) |
| Data warehouse | BigQuery | `bigquery` (not connected in evals; use inputs/funnel-weekly.csv) |
| Meeting notes | any | `meeting-notes` (not connected in evals; use inputs/meeting-notes.md) |

## Update audiences

| Audience | Format | Cadence | Owner (role) |
|----------|--------|---------|--------------|
| Team | Weekly update email | Weekly | PM |
| Leadership | Monthly recap | Monthly | PM |
