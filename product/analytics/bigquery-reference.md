# BigQuery Reference

*Replace `your_project` and `your_project_dbt_analytics` with your actual dataset names.*

## Datasets

| Dataset | What it contains |
|---------|-----------------|
| `your_project` | Raw Segment events — page views, identifies, tracks |
| `your_project_dbt_analytics` | dbt-transformed models — funnels, growth, attribution |

## Key dbt Tables

| Table | What it is | Notes |
|-------|-----------|-------|
| `fct_funnel_setup_flow` | Signup funnel stages | |
| `fct_funnel_activation` | Post-signup activation events | |
| `fct_funnel_monetization` | Payment funnel | |
| `fct_weekly_growth` | Week-over-week growth metrics | |
| `fct_dropoff_paths` | Where users drop off | |

## Raw Event Tables

| Table | Common Use |
|-------|-----------|
| `pages` | Page views with URL, referrer, anonymous_id |
| `tracks` | All tracked events (button clicks, form submits, etc.) |
| `identifies` | User identification events (signup, login) |

## Starter Queries

### Count signups in the last 7 days
```sql
SELECT DATE(timestamp) as date, COUNT(DISTINCT user_id) as signups
FROM `your_project.identifies`
WHERE timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
GROUP BY date
ORDER BY date DESC
```

### Funnel: signup → first key action
```sql
SELECT
  COUNT(DISTINCT s.user_id) as signups,
  COUNT(DISTINCT a.user_id) as activated,
  ROUND(COUNT(DISTINCT a.user_id) / COUNT(DISTINCT s.user_id) * 100, 2) as conversion_pct
FROM `your_project.identifies` s
LEFT JOIN `your_project.tracks` a
  ON s.user_id = a.user_id AND a.event = 'Your Activation Event'
WHERE s.timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
```

## Access

- **MCP server**: optional `bigquery` server in `.mcp.json` (read-only `SELECT`); without it, `/data-analyst` writes the SQL for you to run and paste back
- **Skill**: `/data-analyst` for guided analysis
- **Console**: <!-- add BigQuery console URL -->

## Known Issues

See `data-quality-log.md` for active data issues and workarounds.
