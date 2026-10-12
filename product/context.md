# Product Context

*The one file every strategy, cadence, audit, and analysis skill reads first. Skills never carry these values inline. Fill the `{{placeholders}}`; delete rows that do not apply. Every number carries an "as of" date.*

**Last updated:** {{YYYY-MM-DD}}
**Owner:** PM

---

## Product

| Field | Value |
|-------|-------|
| Product | {{product name}} — {{one-line description}} |
| Customer | {{who you build for, specific segment}} |
| Stage | {{pre-PMF / early growth / scale}} |
| Business model | {{subscription / usage / marketplace / ...}} |

## North Star

| Field | Value |
|-------|-------|
| North Star metric | {{metric}} |
| Current | {{value}} (as of {{date}}, source: {{tool/query}}) |
| Target | {{value}} by {{date}} |
| Why this metric | {{the user behavior it captures}} |

## Strategic pillars (max 3)

1. {{pillar}} — {{what winning looks like}}
2. {{pillar}} — {{what winning looks like}}
3. {{pillar}} — {{what winning looks like}}

## Horizon

| Horizon | Theme | Window |
|---------|-------|--------|
| Now | {{theme}} | {{e.g. this quarter}} |
| Next | {{theme}} | {{e.g. next two quarters}} |
| Later | {{theme}} | {{e.g. 1–3 years}} |

## Teams

| Team | Owns | Lead (role) |
|------|------|-------------|
| {{team}} | {{area}} | {{PM / Eng Lead / GTM Lead}} |

## Baseline metrics

The numbers skills compare against. Stale baselines produce wrong calls; `/check-artifacts` flags rows older than 30 days.

| Metric | Value | As of | Source |
|--------|-------|-------|--------|
| {{e.g. visit → signup}} | {{value}} | {{date}} | {{tool / query}} |
| {{e.g. signup → activated}} | {{value}} | {{date}} | {{tool / query}} |
| {{e.g. activated → paid}} | {{value}} | {{date}} | {{tool / query}} |
| {{e.g. week-4 retention}} | {{value}} | {{date}} | {{tool / query}} |

## Tools

Which system answers which question. Skills use the MCP server if it is connected and fall back to asking you to paste an export if it is not. See `.mcp.example.json` for the optional servers (copy it to `.mcp.json` to enable).

| Job | Your tool | MCP server name (optional) |
|-----|-----------|----------------------------|
| Issue tracker | {{Linear / Jira / GitHub Issues}} | `linear` |
| Data warehouse | {{BigQuery / Snowflake / Postgres}} | `bigquery` |
| Product analytics | {{Amplitude / Mixpanel / PostHog}} | — |
| Meeting notes | {{your meeting-notes tool}} | `meeting-notes` |
| Docs / wiki | {{Notion / Google Docs / Confluence}} | — |
| Team chat | {{Slack / Teams}} | — |

## Update audiences

| Audience | Format | Cadence | Owner (role) |
|----------|--------|---------|--------------|
| Team | Weekly update email | Weekly | PM |
| Leadership / board | Monthly recap | Monthly | PM |
| {{investors / partners}} | {{format}} | {{cadence}} | {{role}} |
