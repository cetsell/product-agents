---
paths:
  - "product/analytics/**"
---

# Working in product/analytics/

- `metrics-dictionary.md` is the source of truth for metric names and formulas. Use its names verbatim in every skill output; if a metric is missing, add it here before citing it elsewhere.
- Every metric definition carries a `Last verified:` date. Update it when you confirm a definition against the warehouse.
- Log data bugs in `data-quality-log.md` (date, symptom, affected metrics, workaround, owner role) the moment you find one; `/data-analyst` reads it before every query.
- Queries are read-only `SELECT`. Never write DDL or DML from this repo.
