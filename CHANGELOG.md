# Changelog

## v2.1.0 — unreleased

First two workstreams of `UPGRADE-PLAN-2026-11.md`: decisions become principles, principles get a judge; and a signals inbox closes the loop between what users and the product say and what the team bets on.

### Added

- `team/decisions/principles.md`: standing rules compressed from decisions, each with a source and a status (`active` / `proposed` / `retired`), plus a Judge corrections section where PM overrides land.
- `team/decisions/questions.md`: the queue of taste and scope questions. Skills file a row and continue on a stated assumption instead of stopping for the PM.
- `/judge` skill (Sonnet 5.5, MCP-free): clears open rows with exactly one of three verdicts, decided (citing the rule or dated decision), sent back (malformed), or held (needs a judgment nobody has given). Never invents a principle, never edits the record. Batch notes in `product/analysis/judge/`.
- `questions-triage` reactive run (routine; prompt in `proactive/routines/questions-triage.md`).
- `evals/judge/`: three cases (clear the queue, a single unanswered question with pressure to answer it anyway, out-of-scope). The Acme Notes fixture gains a decision log, principles, and a seven-row questions queue including one overridden verdict.
- `product/signals/`: the signals inbox (user layer, gitignored except `CLAUDE.md` and `sample-*.md`). One file per source drop, `{date}-{source}.md|.csv`, written by the team's webhook or export; a processed file carries a `<!-- processed by /triage {date} -->` footer. Two samples for the Acme Notes fixture: an analytics alert and a support export.
- `/triage` skill (Sonnet 5.5, MCP-free; promoted from `docs/skill-backlog.md`): reads unprocessed signal files plus the current bet and betting table, writes `team/active/triage-{date}.md` with four buckets (do now, queue under a named bet, decline with a cited reason, new bet handed to `/strategy`), appends the footer to each file it read, and files unsettled taste questions as rows in `questions.md` instead of asking in chat. Never writes tickets or edits roadmap files.
- `team/active/`: short-lived working notes a run writes and the week consumes.
- `signals-triage` daily run and `proactive/routines/signals-triage.md`; `proactive/routines/metric-breach.md`.
- `evals/triage/`: three cases (two drops → four-bucket note, footers, idempotent second run; a prompt that also asks for the tickets; a PRD request). The fixture gains the two signal drops under `product/signals/`.

- `team/active/commitments.md`: ledger of what an agent or run promised and has not closed; `/sprint-health` reports rows overdue or carried twice.
- Trail in `product/analysis/CLAUDE.md`: append-only, one line per run output; runs read the last ten lines before anything else (coordination through the repo, not messages).
- Agents table in `team/roster.md`: what each agent and scheduled run owns, its memory, its steward.
- `product/playbooks/pm-toolkit.md`: "The two jobs: taste and entropy" with three worked examples, and deleting as the third job.

### Changed

- `/cadence` Friday Demo & Decide lists held questions for the PM in a new section and does not answer them, and appends this week's taste calls to `principles.md` as `proposed` rows (max five) for the PM to keep or delete in the same PR.
- `/strategy` Prioritization, Decision Memo, and Vision Check carry a bounded five-line "If the constraint did not exist" section before the ranked call; never ranked above the evidence-backed call.
- `/monthly-pm-self-eval` gains a Deletion dimension with caps (nothing deleted → ≤ 2; two months running → 1).
- `product-agents` and `roadmap-keeper` agents keep project memory, like `freshness-auditor` already did; all three open by reading their commitments.
- WS3 (tiered gates) of the plan dropped: automated runs keep opening PRs.
- `AGENTS.md` rules: a recurring decision becomes a principle; an unanswered taste question goes to the queue, not chat.
- `AGENTS.md` definition of done: a bet is not shipped until its success metric is readable by an agent without a human (saved query, alert into `product/signals/`, or dashboard export path). `/audit` gains one measurability check and flags bets that fail it as unmeasurable ships.
- `metric-breach` in `proactive/runs.yml` moves from `binding: manual` to `routine`: `/data-analyst` runs only when a new alert file exists in `product/signals/`. No monitor ships with the repo; the file is the contract.
- README, routing, guide, plugin manifest, maintenance, `team/CLAUDE.md`, `product/CLAUDE.md`, and `proactive/CLAUDE.md` updated for 31 skills and the two new runs. `triage` removed from `docs/skill-backlog.md`.

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
