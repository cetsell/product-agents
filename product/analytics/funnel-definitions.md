# Funnel Definitions

Each stage of the user journey: what it means, what event marks it, and how we calculate conversion.

## Primary Funnel: Visit → Paid

```
Visit → Signup → Chat → Subscribe
```

| Stage | Event / Condition | Conversion To Next |
|-------|------------------|-------------------|
| **Visit** | `page` event on landing page | Visit → Signup |
| **Signup** | `identify` event (account created) | Signup → Chat |
| **Chat** | `Chat Message Sent` track event | Chat → Subscribe |
| **Subscribe** | Payment completed (Stripe webhook) | — |

## Stage Details

### Visit → Signup
- **Numerator**: Users who fire an `identify` event (registration complete)
- **Denominator**: Unique `anonymous_id` values with a `page` event on landing pages
- **Current benchmark**: ~1.67% (as of Apr 2026)

### Signup → Chat
- **Numerator**: Users with at least one `Chat Message Sent` event
- **Denominator**: Users with an `identify` event
- **Current benchmark**: ~42% (as of Apr 2026)

### Chat → Subscribe
- **Numerator**: Users with a completed payment
- **Denominator**: Users with at least one chat message
- **Current benchmark**: ~0.25% (as of Apr 2026)

## Retention

| Metric | Definition |
|--------|-----------|
| D1 Retention | % of users active on day 1 after signup |
| D7 Retention | % of users active on day 7 after signup |

**Current D1**: ~0.9% (as of Apr 2026)

---

*Update benchmarks when new data is available. Source: weekly "Hello All" email metrics.*
