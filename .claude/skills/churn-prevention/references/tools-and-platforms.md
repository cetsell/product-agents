# Retention Tools and Platforms

Options to implement cancel flows, dunning, and churn-signal tracking. Check `product/context.md` for the tools the team already uses before recommending a new one.

## Retention Platforms

| Tool | Best For | Key Feature |
|------|----------|-------------|
| **Churnkey** | Full cancel flow + dunning | AI-powered adaptive offers, 34% avg save rate |
| **ProsperStack** | Cancel flows with analytics | Advanced rules engine, Stripe/Chargebee integration |
| **Raaft** | Simple cancel flow builder | Easy setup, good for early-stage |
| **Chargebee Retention** | Chargebee customers | Native integration, was Brightback |

## Billing Providers (Dunning)

| Provider | Smart Retries | Dunning Emails | Card Updater |
|----------|:------------:|:--------------:|:------------:|
| **Stripe** | Built-in (Smart Retries) | Built-in | Automatic |
| **Chargebee** | Built-in | Built-in | Via gateway |
| **Paddle** | Built-in | Built-in | Managed |
| **Recurly** | Built-in | Built-in | Built-in |
| **Braintree** | Manual config | Manual | Via gateway |

## Related CLI Tools

| Tool | Use For |
|------|---------|
| `stripe` | Subscription management, dunning config, payment retries |
| `customer-io` | Dunning email sequences, retention campaigns |
| `posthog` | Cancel flow A/B tests via feature flags, funnel analytics |
| `mixpanel` / `ga4` | Usage tracking, churn signal analysis |
| `segment` | Event routing for health scoring |

## Running cancel flow experiments

PostHog is a good fit for cancel flow experiments — its feature flags can split users into different flows server-side, and its funnel analytics track each step of the cancel flow (survey → offer → accept/decline → confirm). Design the test itself with `/ab-test-setup`.
