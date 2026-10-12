# Product Agents Upgrade Plan — October 2026

*Written 2026-10-12 for an Opus session to execute. Repo last pushed 2026-05-27. Local `main` is in sync with `origin/main` (github.com/cetsell/product-agents).*

## North Star

Every skill in this repo exists to help a product team get more out of AI on the outcomes that matter: the KPIs, the vision, and the pace. The bar is a year's worth of impact in weeks. A skill that only produces a document does not meet it; a skill meets it when it moves a metric, sharpens a bet, or removes a week from the loop between idea and measured result. Use this to decide what to keep, cut, and rewrite.

## Goal

Make product-agents the reference example of a product team's shared operating layer for Claude 5-era agents: safe to clone, current with Claude Code's skill/agent/plugin/hook model, demonstrably evaluated, and free of the one client's internals. Ship it as a release and a LinkedIn post.

## What the audit found (2026-10-12)

| Area | Finding | Severity |
|---|---|---|
| Install-specific context | The client name is already scrubbed. What remains is context from the original install: `$260 MRR` and "Digital Twin" baselines in `audit` and `strategy`, Supernormal named as the meeting tool 19 times, `fe-main` Angular conventions in `engineering/`, and "Chad" 38 times where a role should be. | High. A fresh clone reasons from another team's metrics and tools. |
| Broken output paths | 58 references to `pm-workflows/...` across 14 skills. That folder does not exist in this repo; its folders are `product/`, `team/`, `gtm/`. | High |
| MCP coupling | `lenny`, `sprint-health`, `data-analyst`, `check-artifacts`, `project-valentine-review`, `business-analysis`, `bigquery-reference` hard-code `mcp__lenny__*`, `mcp__linear__*`, `mcp__bigquery__*` tool names. No `.mcp.json` declares them. The lenny transcripts server is dead (503). | High |
| Dead / private skills | `project-valentine-review` is a single-client retro. `lenny` depends on a server that no longer exists. `graphify` (1,222 lines) and `remotion-best-practices` are vendored third-party skills unrelated to a PM operating system. | Medium |
| Skill bloat | 12,027 lines across 35 skills. Eight skills exceed 450 lines; `graphify` 1,222, `marketing-strategy-pmm` 1,165, `email-sequence` 934. Every line loads into context on invocation. | Medium |
| Frontmatter | Skills use only `name`, `description`, and an ad-hoc `metadata` block. No `allowed-tools`, no invocation controls, no `argument-hint`, no `model`. Agents use `tools`, `model: opus|sonnet`, and custom `category/steward/cadence` keys. `context-manager` lists `TodoWrite`. | Medium |
| Quality bar drift | 28 of 35 skills carry a TERMINATION line; `check-skills.mjs` exempts 7 as reference skills. `skill-eval` points at `pm-workflows/analysis/skill-evals/`. No eval results are checked in, so the "every skill is held to a checkable bar" claim has no visible evidence. | Medium |
| Proactive layer | `proactive/runs.yml` is manifest-only. `morning-brief` references a skill that does not exist. Nothing is wired to a scheduler. | Medium |
| Model guidance | Agents hard-code `opus` / `sonnet` aliases from the Claude 4 era. No guidance on which Claude 5 model fits audits vs. reasoning vs. judging. | Medium |
| Distribution | Not installable as a plugin; users must clone the whole repo into their own. README says 32 skills, repo has 35, GitHub description says 32. | Low |
| Docs | `docs/sources/` holds the design notes (product-skills.md, product-os-layers.md, shopify-river.md) but nothing links them from README. `CONTRIBUTING.md` and `MAINTENANCE.md` describe people and cadences from the client. | Low |

## Non-goals

- Do not re-author the marketing/CRO skill content wholesale. Trim, re-shape, and add the outcome line; keep the frameworks.
- Do not add features nobody has asked for (dashboards, web UI, hosted anything).
- Do not keep anything that only works at the original install.

## Workstreams

Execute in order. Each ends with a commit; the whole set ships as `v2.0.0`.

### WS1 — Genericize and fix paths (unblocks everything else)

1. Replace every `pm-workflows/...` output path with a repo-native path. Proposed map:
   - `pm-workflows/analysis/**` → `product/analysis/**` (new folder, with `CLAUDE.md` index)
   - `pm-workflows/weekly-updates/**` → `team/weekly-updates/**` (exists)
   - `pm-workflows/active/**` → `team/active/**` (new)
   - `pm-workflows/roadmap.md`, `betting-table.md`, `current-bet.md` → `product/roadmap/*` (exist)
   - `pm-workflows/pm-principles-guide.md` → `product/playbooks/pm-toolkit.md`
2. Strip client specifics into placeholders. Every strategy/cadence/audit skill that lists "Strategic Context" (north star, pillars, teams, baseline metrics) must instead read it from one new file: `product/context.md` (template with `{{placeholders}}`, indexed from root `CLAUDE.md`). Skills say "read `product/context.md` first" and never carry the values inline.
3. Replace named people with roles (`PM`, `Eng Lead`, `GTM Lead`, `Analytics`). Replace Supernormal/Granola with "your meeting-notes tool" and point at the data-source hierarchy table.
4. Delete `engineering/fe-main-*.md`; replace with `engineering/README.md` explaining what belongs there and a `conventions.template.md`.
5. Delete `project-valentine-review`. Delete `lenny` (dead server) or rewrite it as a generic "podcast/transcript advisor" that takes any transcript MCP. Move `graphify` and `remotion-best-practices` out (they are not PM skills; link to their upstreams in README if useful).
6. Add `.gitignore` entries and a `scripts/scrub-check.mjs` that greps for a deny-list (`pm-workflows/`, the original client's name, `Digital Twin`, `$260`, personal names) and fails CI. Wire it into `skill-check.yml`.

Acceptance: `node scripts/scrub-check.mjs` exits 0; a fresh clone can run `/cadence "monday kickoff"` and it writes under `team/`.

### WS2 — Decouple from specific MCP servers

1. Add `.mcp.json` with the servers the skills expect (Linear, BigQuery, a meeting-notes server), each marked optional, using `${ENV_VAR}` placeholders.
2. In every skill that calls `mcp__linear__*` or `mcp__bigquery__*`, add a one-line capability check: "If the Linear MCP is not available, ask the user to paste the issue list / export, and continue." No skill may hard-fail on a missing server.
3. Document in README which skills are MCP-enhanced vs. MCP-free.

Acceptance: every skill runs to a useful output with zero MCP servers connected (degraded mode), verified for `cadence`, `sprint-health`, `data-analyst`, `pm-super-agent`.

### WS3 — Skill hygiene, size, and outcome framing

0. Every skill opens with one line naming the outcome it moves (a KPI, a decision, or cycle time) and the evidence it leaves behind. If no such line can be written honestly, the skill is a candidate to cut. Reorganize the README skill table by outcome (Activation, Retention, Monetization, Velocity, Decision quality, Vision and strategy) instead of by discipline.
1. Target: no skill over 300 lines. Move long reference material into `references/*.md` inside the skill folder and load on demand (progressive disclosure). Priority: `marketing-strategy-pmm`, `email-sequence`, `copy-editing`, `copywriting`, `popup-cro`, `linear-issue-creator`, `marketing-psychology`, `churn-prevention`, `cadence`, `pm-super-agent`.
2. Add TERMINATION to the 7 skills missing it or confirm they are reference skills in `check-skills.mjs`.
3. Normalize frontmatter across all skills (exact fields per WS5). Remove the ad-hoc `metadata` block or move it under a supported key.
4. Rename `linear-issue-creator` → `issue-creator` with Linear as the default adapter and a note on Jira/GitHub Issues.

Acceptance: `node check-skills.mjs --strict` passes; `wc -l` shows no SKILL.md over 300 lines.

### WS4 — Make the quality bar visible

1. Run `/skill-eval` on the 8 producer skills a new team touches first (`cadence`, `pm-super-agent`, `issue-creator`, `sprint-health`, `strategy`, `audit`, `eval-runner`, `evidence-loop`) and check the results into `product/analysis/skill-evals/` with dates.
2. Add an `evals/` folder per core skill holding 3–5 representative prompts and the expected output shape, so anyone can rerun them.
3. Add a "Quality" section to README with the latest eval table and the date.

Acceptance: README shows an eval table with real results and a run date.

### WS5 — Adopt current Claude Code platform features

Detail in "Platform features to adopt" below (sections 5.1–5.9). Order: 5.8 deprecations, 5.1 skill frontmatter, 5.2 agents, 5.5 rules/AGENTS.md, 5.4 hooks, 5.9 linter. WS6 implements 5.3, WS7 implements 5.6, WS8 implements 5.7.

Acceptance: `/doctor prompt-audit` clean; `node check-skills.mjs --strict` passes with the new checks; `.claude/settings.json` hooks fire on a fresh clone.

### WS6 — Models and cost

1. Replace bare `opus` / `sonnet` aliases with Claude 5 models per the docs report, choosing by task: cheap/fast for freshness audits and scrub checks, mid for cadence drafting, top for strategy, PRDs, and LLM-as-judge.
2. Add `product/playbooks/model-selection.md`: one table, which model for which skill and why, plus effort guidance.
3. In `eval-runner`, make the judge model explicit and configurable; default to the strongest available.

### WS7 — Proactive layer, actually wired

1. Bind `proactive/runs.yml` entries to real executors per the docs report (scheduled tasks / routines, GitHub Actions, hooks). Ship at least two working: the Monday freshness audit (already a GitHub Action) and the Friday roadmap refresh.
2. Remove `morning-brief` or build it.
3. Each run writes to a repo path and opens a PR rather than committing to `main`.

### WS8 — Distribution and docs

1. Package as a plugin (per docs report) so `claude plugin add` works without cloning the whole repo. Keep the clone-and-fork path too.
2. README rewrite: what it is in two sentences, 60-second install, the three layers (context, skills, proactive), the quality table, model table, "make it yours" checklist. Fix skill counts everywhere. Link `docs/sources/`.
3. `CONTRIBUTING.md` and `MAINTENANCE.md`: roles not names; add "how to add a skill" with the frontmatter template and the eval requirement.
4. `CHANGELOG.md` with `v2.0.0` notes. Tag and release. Update the GitHub description.

## Platform features to adopt (WS5 detail)

*Verified against code.claude.com docs and the changelog through v2.1.296 (2026-10-09). Opus: re-check any item marked "verify" before relying on it.*

### 5.1 Skill frontmatter (docs: code.claude.com/docs/en/skills)

Supported fields: `name`, `description`, `when_to_use`, `argument-hint`, `arguments`, `disable-model-invocation`, `user-invocable`, `allowed-tools`, `disallowed-tools`, `model`, `effort` (low/medium/high/xhigh/max), `context: fork`, `agent`, `background`, `hooks`, `paths`, `shell`, `metadata`, `license`, `compatibility`. Unknown keys are silently ignored; a YAML parse failure loads the skill with no fields. `description` + `when_to_use` are truncated at 1,536 characters in the listing.

Apply:
- Every skill gets `description` (under 1,536 chars with `when_to_use`), `allowed-tools`, and `argument-hint` where it takes input.
- Producer skills that run long (`audit`, `eval-runner`, `skill-eval`, `premortem`) get `context: fork` so they do not flood the main session, and `background: true` where the user does not need to watch.
- Heavy-reasoning skills (`strategy`, `pm-super-agent`, `evidence-loop`, `eval-runner` judge) get `model: opus` and `effort: high`. Cheap checks (`check-artifacts`) get `model: haiku`.
- Skills that must never fire on their own (`monthly-pm-self-eval`, anything that writes to Linear) get `disable-model-invocation: true`. Note this also blocks preloading into subagents and scheduled runs.
- Delete `.claude/commands/create-prd.md`: commands and skills are merged, and `pm-super-agent` already covers it.
- Keep the existing `metadata` block only for `version`; it is a supported key.

### 5.2 Agent frontmatter (docs: code.claude.com/docs/en/sub-agents)

Supported: `name` (no `:`), `description`, `tools`, `disallowedTools`, `model`, `permissionMode`, `maxTurns`, `skills` (preload, max 32, full content injected at start), `mcpServers`, `hooks`, `memory` (`user`/`project`/`local`), `background`, `omitClaudeMd`, `effort`, `isolation: worktree`, `color`, `initialPrompt`. Plugin subagents ignore `permissionMode`, `hooks`, `mcpServers`.

Apply:
- Remove `TodoWrite` from `context-manager` (not available on Claude 5 models without `CLAUDE_CODE_ENABLE_TODO_TOOLS=1`). Reconsider whether `context-manager` earns its place at all; Claude 5 context handling and `autoCompactWindow` (v2.1.296) cover most of it.
- `product-agents` agent: add `skills:` preloading `evidence-loop` and `check-artifacts`; set `permissionMode: acceptEdits` for Contribute/Refresh and document that Navigate/Audit are read-only by instruction, not enforcement.
- `freshness-auditor`: `model: haiku`, `effort: low`, `maxTurns: 25`, `memory: project` so it remembers what it flagged last week.
- `roadmap-keeper`: `isolation: worktree` and open a PR instead of writing to `main`.
- Move the custom `category/steward/cadence` keys into the body or into `proactive/runs.yml`; they are ignored in frontmatter.

### 5.3 Models (docs: code.claude.com/docs/en/model-config)

Aliases on the Anthropic API today: `opus` = Opus 5.5, `sonnet` = Sonnet 5.5, `haiku` = Haiku 5.5, `fable` = Fable 5.1. On Bedrock/Vertex `sonnet` and `haiku` still resolve to 4.5, so pin full IDs (`claude-opus-5-5`, `claude-sonnet-5-5`, `claude-haiku-5-5`) where behavior must match across providers. Opus/Sonnet/Haiku 5.5 default to `effort: medium`. Haiku 5.5 costs more per token above 100K-token prompts, so keep audit prompts small.

`product/playbooks/model-selection.md` table:

| Task | Model | Effort | Why |
|---|---|---|---|
| Freshness audit, scrub check, artifact grading | haiku | low | Pattern matching over known files |
| Cadence drafts, weekly email, ticket formatting | sonnet | medium | Structured drafting from sources |
| Strategy, PRDs, premortems, evidence loops | opus | high | Multi-step reasoning with trade-offs |
| LLM-as-judge in `eval-runner` and `skill-eval` | opus | high | Judge must be at least as strong as the generator |

### 5.4 Hooks (docs: code.claude.com/docs/en/hooks)

Events now include `SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `SubagentStart/Stop`, `Stop`, `PreCompact/PostCompact`, `FileChanged`, `WorktreeCreate`, `PreModelSwitch`, `SessionEnd`, and more. Handler types: `command`, `http`, `mcp_tool`, `prompt`, `agent`. Hooks can live in skill and agent frontmatter.

Apply, as `.claude/settings.json` in the repo (users opt in by copying):
- `SessionStart` → print the current bet and freshness warnings (replaces the "read CLAUDE.md first" instruction with enforcement).
- `PreToolUse` matcher on Linear/Jira MCP write tools → `prompt` hook that blocks batch issue creation without the proposed-list step `pm-super-agent` already describes.
- `Stop` → run `node check-skills.mjs` when any `.claude/skills/**` file changed in the session.
- In `evidence-loop` skill frontmatter: a `once` hook that appends the Evidence Loop appendix check to stakeholder-facing outputs.

### 5.5 CLAUDE.md, rules, AGENTS.md (docs: code.claude.com/docs/en/memory)

- Target under 200 lines per `CLAUDE.md`. Root is already past that once the skill table is counted; move the skill routing table to `.claude/rules/skill-routing.md` (loads at launch) and the data-source hierarchy to `.claude/rules/data-sources.md`.
- Add path-scoped rules: `.claude/rules/analytics.md` with `paths: ["product/analytics/**"]`, `.claude/rules/roadmap.md` with `paths: ["product/roadmap/**"]`.
- Add `AGENTS.md` for non-Claude agents and import it with `@AGENTS.md` from `CLAUDE.md` so both stay one source.
- Run `/doctor prompt-audit` (v2.1.283) on the repo and apply its findings; it flags prompting patterns written for older models.

### 5.6 Scheduling (docs: routines, scheduled-tasks, github-actions, workflows)

No documented `runs.yml` equivalent exists. Map each entry:

| runs.yml entry | Bind to | Notes |
|---|---|---|
| `freshness-audit` (Mon) | GitHub Actions `anthropics/claude-code-action@v1` on `schedule`, prompt `/check-artifacts` | Already half-built; public repos pause schedules after 60 idle days |
| `roadmap-refresh` (Fri) | Routine (`/schedule`, cloud) with Linear MCP, opens a PR | Routines are research preview; min interval one hour |
| `sprint-health`, `monday-kickoff`, `midweek-pulse` | Routine, or desktop scheduled task for teams that keep a machine on | Document both |
| `morning-brief` | Delete (skill does not exist) | |
| Reactive triggers (new bet → `/premortem`) | `FileChanged` hook on `product/roadmap/betting-table.md` | |

Keep `runs.yml` as the human-readable manifest, add a `binding:` field per entry naming which mechanism is live.

### 5.7 Plugin packaging (docs: plugins/manifest-reference, marketplace-reference)

- `.claude-plugin/plugin.json` with `name: product-agents` (not `claude-*`), `"skills": ["./.claude/skills/"]`, and `agents` listing each of the four `.md` files individually (`agents` replaces the default and takes files only). Paths must start with `./`.
- `.claude-plugin/marketplace.json` with `name`, `owner`, `plugins: [{ name: "product-agents", source: "." }]`. **Verify** the same-repo `source: "."` pattern end to end before documenting it.
- A root `CLAUDE.md` is not loaded for plugins, so the routing lives in `.claude/rules/` (5.5) and in a `product-agents-guide` skill.
- `claude plugin validate . --strict` in CI. `claude plugin eval` (v2.1.269) can replace the hand-rolled behavioral eval loop in `skill-eval`; evaluate and adopt if it covers the rubric.
- Install docs: `claude plugin marketplace add cetsell/product-agents` then `claude plugin install product-agents@product-agents`. Skills become `/product-agents:cadence`; keep the clone-and-fork path for teams that want to edit.

### 5.8 Deprecations to clean

- `TodoWrite` (see 5.2). `TaskOutput` removed; read the task output file instead.
- `/simplify` is now `/code-review`; `/doctor` is `/checkup`; any mention in playbooks should update.
- `Task` tool references → `Agent`.
- Permission mode `default` is now `manual`.

### 5.9 Extend `check-skills.mjs`

Add checks: unknown frontmatter keys (warn), `description` + `when_to_use` length ≤ 1,536, valid `model`/`effort` values, agent names without `:`, `skills:` preload ≤ 32, no `disable-model-invocation` skill referenced by a preload or a `runs.yml` entry, no `TodoWrite` in any `tools:` list, no deny-listed strings (WS1 scrub).

## Execution notes for Opus

- Work on a branch `v2-refresh`; one commit per workstream; open a PR at the end.
- Run `node check-skills.mjs --strict` and `node scripts/scrub-check.mjs` before every commit once WS1 lands.
- Prefer deleting over rewriting. If a skill cannot be made generic in under 30 minutes, drop it and note it in the changelog.
- Do not invent eval results. If a skill fails its eval, record the failure.
- Keep every claim in README checkable from the repo.

## Definition of done

- Fresh clone, zero MCP servers, `claude` in the repo root: `/cadence`, `/pm-super-agent`, `/strategy`, `/evidence-loop`, `/premortem` each produce output into repo-native paths.
- CI green: skill conformance, scrub check, freshness check.
- README eval table with dates; model table; plugin install instructions that work.
- `v2.0.0` tagged; GitHub description updated.
