# Data sources

Which system answers which question, in priority order. The team's actual tools are in `product/context.md` → Tools.

| Source | Use for | Priority |
|--------|---------|----------|
| Issue tracker (Linear by default) | What is being built, velocity, project health, who owns what | Primary |
| Data warehouse (BigQuery by default) | Funnels, growth, attribution, cohorts | Primary (quantitative) |
| This repo | Context, current bet, betting table, roadmap, definitions, templates, past analyses | Secondary (shared state) |
| Docs / wiki | Long-form specs and collaborative docs (linked, not copied) | Secondary |
| Meeting-notes tool | Decisions, blockers, and commitments said out loud | Secondary (qualitative) |

## Rules

- MCP servers are optional (`.mcp.json`). If the one a task needs is not connected, ask once for a pasted export, label numbers from it as pasted with the date, and continue. Never estimate a number you were not given.
- Every data point carries a date and a source. No undated metrics or status claims.
- Content more than 14 days old may be stale: cite it with its date or verify it before deciding on it.
