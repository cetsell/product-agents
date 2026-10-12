# Funnel Definitions

Each stage of the user journey: what it means, what event marks it, and how conversion is calculated. Skills (`/data-analyst`, `/audit`, the CRO skills) use these names verbatim. Fill in your stages; keep every benchmark dated.

**Last verified:** {{YYYY-MM-DD}}

## Primary funnel

```
{{Visit}} → {{Signup}} → {{Activated}} → {{Paid}}
```

| Stage | Event / condition | Conversion to next |
|-------|-------------------|--------------------|
| **{{Visit}}** | {{e.g. `page` event on a landing page}} | {{Visit → Signup}} |
| **{{Signup}}** | {{e.g. `identify` event (account created)}} | {{Signup → Activated}} |
| **{{Activated}}** | {{the first-value action, e.g. `Project Created`}} | {{Activated → Paid}} |
| **{{Paid}}** | {{e.g. payment completed webhook}} | — |

## Stage details

### {{Visit → Signup}}
- **Numerator:** {{users who complete registration}}
- **Denominator:** {{unique visitors with a landing-page view}}
- **Current benchmark:** {{value}} (as of {{date}}, source: {{query or dashboard}})

### {{Signup → Activated}}
- **Numerator:** {{users who complete the first-value action within N days}}
- **Denominator:** {{users who signed up}}
- **Current benchmark:** {{value}} (as of {{date}}, source: {{query or dashboard}})

### {{Activated → Paid}}
- **Numerator:** {{users with a completed payment within N days}}
- **Denominator:** {{activated users}}
- **Current benchmark:** {{value}} (as of {{date}}, source: {{query or dashboard}})

## Retention

| Metric | Definition | Current (as of) |
|--------|------------|-----------------|
| D1 retention | % of users active on day 1 after signup | {{value}} ({{date}}) |
| D7 retention | % of users active on day 7 after signup | {{value}} ({{date}}) |

---

*Update benchmarks when new data is available, and mirror the headline numbers in `product/context.md` → Baseline metrics.*
