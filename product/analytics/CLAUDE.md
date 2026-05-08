# Analytics

Metric definitions, data sources, and query references for your data stack.

## Files

| File | What it is | When to read |
|------|-----------|--------------|
| `metrics-dictionary.md` | Every KPI: name, definition, formula, source, owner | "What does X metric mean?" or "How is Y calculated?" |
| `bigquery-reference.md` | Datasets, tables, known issues, starter queries | Writing or debugging a BigQuery query |
| `funnel-definitions.md` | Each funnel stage: event name, conversion formula | Understanding the signup → paid funnel |
| `data-quality-log.md` | Known data bugs, workarounds, fix status | Something looks wrong in the data |

## Key Facts

- Primary datasets: `your_project` (raw Segment events), `your_project_dbt_analytics` (dbt models) — update these in `bigquery-reference.md` with your real dataset names
- Use the `/data-analyst` skill for BigQuery-powered analysis
- Analytics owner: [Name / Role]
