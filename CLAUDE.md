# Product Agents

@AGENTS.md

## Claude Code specifics

- **Rules** in `.claude/rules/` load automatically: `skill-routing.md` (which skill for which request), `data-sources.md` (which system answers what, and what to do when an MCP server is not connected). `analytics.md` and `roadmap.md` load only when you work in those folders.
- **Skills** in `.claude/skills/` load on demand. Do not load several for one request; most navigate-and-update tasks need none.
- **Agent:** `.claude/agents/product-agents.md` routes by intent: Navigate (read-only), Contribute (edit and route updates), Refresh (pull the tracker into `product/roadmap/`), Audit (freshness and drift, report only). `roadmap-keeper` and `freshness-auditor` hold the detailed Refresh and Audit procedures. Ownership and cadence: `MAINTENANCE.md`.
- **Hooks** (`.claude/settings.json`): the session starts with the current bet and any stale artifacts; issue-tracker writes always ask for confirmation; changed skills must pass `node check-skills.mjs --strict` before a turn ends. Editing `product/roadmap/betting-table.md` prompts a `/premortem` for new high-stakes bets.
- **MCP servers** are optional: `cp .mcp.example.json .mcp.json` to enable Linear, BigQuery, and a meeting-notes server, then approve them on next launch. Every skill degrades to pasted exports without them.
- **Models:** each skill and agent pins its model and effort in frontmatter. Table and reasoning: `product/playbooks/model-selection.md`.
- **Proactive runs:** `proactive/runs.yml` lists every scheduled and reactive run and the mechanism that executes it.
