---
paths:
  - "product/roadmap/**"
---

# Working in product/roadmap/

- Every bet carries four lines: hypothesis, measure, kill trigger with a date or threshold, and confidence (`product/playbooks/pm-toolkit.md`).
- Update the `Last updated:` line on every edit; `/check-artifacts` and the freshness check grade on it.
- A new high-stakes bet in `betting-table.md` gets a `/premortem` before it is committed (reactive trigger in `proactive/runs.yml`).
- Preserve kill criteria and decision notes written by the PM. Automated refreshes (`roadmap-keeper`) change factual fields only: status, percentages, dates, shipped items.
- Move resolved bets to Completed or Killed with the outcome and the learning; never delete them.
