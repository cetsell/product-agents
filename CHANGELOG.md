# Changelog

## v2.1.0 — unreleased

First workstream of `UPGRADE-PLAN-2026-11.md`: decisions become principles, principles get a judge.

### Added

- `team/decisions/principles.md`: standing rules compressed from decisions, each with a source and a status (`active` / `proposed` / `retired`), plus a Judge corrections section where PM overrides land.
- `team/decisions/questions.md`: the queue of taste and scope questions. Skills file a row and continue on a stated assumption instead of stopping for the PM.
- `/judge` skill (Sonnet 5.5, MCP-free): clears open rows with exactly one of three verdicts, decided (citing the rule or dated decision), sent back (malformed), or held (needs a judgment nobody has given). Never invents a principle, never edits the record. Batch notes in `product/analysis/judge/`.
- `questions-triage` reactive run (routine; prompt in `proactive/routines/questions-triage.md`).
- `evals/judge/`: three cases (clear the queue, a single unanswered question with pressure to answer it anyway, out-of-scope). The Acme Notes fixture gains a decision log, principles, and a seven-row questions queue including one overridden verdict.

### Changed

- `/cadence` Friday Demo & Decide lists held questions for the PM in a new section and does not answer them.
- `AGENTS.md` rules: a recurring decision becomes a principle; an unanswered taste question goes to the queue, not chat.
- README, routing, guide, plugin manifest, and maintenance tables updated for 30 skills.

## v2.0.0 — unreleased (branch `v2-refresh`)

A full refresh around one bar: every skill must help a product team get more out of AI on the outcomes that matter (KPIs, vision, pace). A skill that only produces a document does not meet it.

### At a glance

| | v1 (2026-05) | v2 |
|---|---|---|
| Skills | 35 | 29 |
| Agents / commands | 4 / 1 | 3 / 0 |
| SKILL.md lines (load on every invocation) | 12,027 | 4,888 (+3,960 in `references/`, loaded on demand) |
| Largest SKILL.md | 1,222 | 269 |
| Tracked files with install-specific context | 33 | 0 (enforced by `scripts/scrub-check.mjs` in CI) |
| Skills with behavioral eval suites | 0 | 8 (24 cases; first results 2026-10-12) |
| Skills that run with zero MCP servers | not designed for it | all 29 |

### Removed

| Item | Why |
|------|-----|
| `project-valentine-review` | A single-client campaign retro; nothing generic to keep. |
| `lenny` | Depended on a transcripts MCP server that no longer exists. |
| `graphify` | Vendored third-party skill (1,222 lines), not a product skill. Use its upstream directly if you need it. |
| `remotion-best-practices` | Vendored third-party skill pointing at rule files that were never in this repo. Use its upstream directly. |
| `writing-clearly-and-concisely` | Pointed at reference files that never existed here; polishes prose without moving a metric. |
| `email-systems` | Incomplete stub about mail infrastructure (its fixes table had no fixes). |
| `copy-editing` | Merged into `copywriting` as its Edit mode; the Seven Sweeps live in `copywriting/references/seven-sweeps.md`. |
| `context-manager` agent | Listed `TodoWrite` (off by default on Claude 5 models); Claude Code's own context handling covers its job. |
| `/create-prd` command | Commands and skills are merged; `/pm-super-agent` covers it, and the command referenced files not in this repo. |
| Two `engineering/` convention files | One app repo's conventions; replaced by `engineering/conventions.template.md`. |
| Four playbooks (business-analysis, product-leadership, product-strategy, prompt-engineering) | Documented skills that no longer exist. |
| `morning-brief`, `weekly-status`, `competitor-move` runs | Their skills never existed. |

### Added

- `product/context.md`: the one file strategy, cadence, audit, and analysis skills read first.
- `product-agents-guide` skill: routing and setup for plugin installs.
- Plugin packaging: `.claude-plugin/plugin.json` and `marketplace.json` (`claude plugin marketplace add cetsell/product-agents`, then `claude plugin install product-agents@product-agents`).
- `AGENTS.md` (imported by `CLAUDE.md`), `.claude/rules/` (two always-on, two path-scoped).
- Hooks: SessionStart context, confirmation on every issue-tracker write, skill lint on Stop, premortem nudge when the betting table changes, a once-only evidence-loop check.
- `evals/`: suites in `claude plugin eval` format with a fictional-product fixture; `product/analysis/skill-evals/2026-10-12/` holds the first results.
- Proactive runs wired: Monday artifact grade and Friday roadmap refresh as GitHub Actions that open PRs; routine prompts for the weekly cadence.
- `product/playbooks/model-selection.md`; every skill and agent pins model and effort.
- `.mcp.example.json`: optional Linear, BigQuery, and meeting-notes servers.
- `scripts/scrub-check.mjs`, `scripts/validate-plugin.mjs`; `check-skills.mjs` validates frontmatter, agents, and `runs.yml`.

### Changed

- Every skill opens with an **Outcome** line; README groups skills by outcome.
- `linear-issue-creator` → `issue-creator` (Linear default; Jira and GitHub Issues documented).
- `eval-runner` rewritten for any AI feature: eval-requirements doc, explicit configurable judge, blind judging, judge-human agreement.
- `cadence`, `strategy`, `audit`, `sprint-health`, `check-artifacts`, `monthly-pm-self-eval`, `senior-prompt-engineer`, `pm-super-agent` rewritten without another team's names, metrics, or tools.
- Marketing and CRO skills trimmed with long material moved to `references/`; the five CRO skills share one output shape and hand tests to `/ab-test-setup`.
