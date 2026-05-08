# Metrics Dictionary

Every KPI we track: what it means, how it's calculated, where the data lives, and who owns it.

## Acquisition

| Metric | Definition | Formula | Source | Owner |
|--------|-----------|---------|--------|-------|
| Landing page click → registration | % of landing page visitors who complete registration | `registrations / landing_page_clicks * 100` | Data warehouse | [Analytics owner] |
| Signup rate | % of unique visitors who create an account | `signups / unique_visitors * 100` | Analytics tool | [Analytics owner] |
| Traffic | Unique visitors to landing pages | Count of unique `anonymous_id` with `page` events | Data warehouse | [Analytics owner] |

## Activation

| Metric | Definition | Formula | Source | Owner |
|--------|-----------|---------|--------|-------|
| Signup → [first key action] | % of registered users who complete their first key action | `users_with_action / registered_users * 100` | Data warehouse | [Analytics owner] |
| D1 retention | % of users who return on day 1 after signup | `users_active_day_1 / signups_on_day_0 * 100` | Data warehouse | [Analytics owner] |

## Monetization

| Metric | Definition | Formula | Source | Owner |
|--------|-----------|---------|--------|-------|
| Conversion to paid | % of registered users who make any payment | `paying_users / registered_users * 100` | Data warehouse | [Analytics owner] |
| MRR | Monthly recurring revenue from subscriptions | Sum of active subscription amounts | Payment processor / data warehouse | [Analytics owner] |

## Attribution

| Metric | Definition | Formula | Source | Owner |
|--------|-----------|---------|--------|-------|
| [Attribution metric] | [How you track paid acquisition attribution] | [Event-based tracking method] | [Attribution tool] | [Owner] |

---

*Add new metrics here as they're defined. Each row needs: definition, formula, source, owner.*
