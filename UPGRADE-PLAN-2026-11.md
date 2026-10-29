# Product Agents Upgrade Plan — November 2026: from a skill library to a small fleet

*Written 2026-10-29. Source: Spawn's write-up on running a ten-person company with a permanent agent fleet (October 2026). This plan takes the structural ideas and leaves the spend: no 24/7 swarms, no hourly ship SLO, no production write access. Everything here runs on a handful of scheduled runs and one human's attention.*

## The ideas worth stealing, and what they become here

| Spawn idea | What it is at Spawn | What it becomes in Product Agents |
|---|---|---|
| Decisions become principles, principles become judges | Two years of chat → per-person principles → AI judges that decide, send back, or hold for a human. 11,000 verdicts, 27 human words. | `team/decisions/principles.md` + a `/judge` skill + a `team/decisions/questions.md` queue. The PM answers once; the judge answers the repeats. |
| Agents read the world, not messages (stigmergy) | No PRs, no "heads up" messages; the code, the live product, and the DB are the shared state. | The repo already is the world. Make it explicit: every run writes to shared state the next run reads, and nothing asks a human for a fact already in the repo. |
| Close the loop | 60% of work starts from a production error, a bug a user hit, or a metric, never relayed by a human. | A `product/signals/` inbox and a `/triage` run that sorts what landed against the current bet. `metric-breach` goes from manual to wired. |
| Fix forward behind dumb gates | Changes land, a janitor checks hourly, irreversible actions go through hard-coded gates. 0.9% reverts. | Tiered gates: factual refreshes land directly with a janitor check; decisions still go through a PR; tracker writes and anything sent stay behind the existing hard gate. |
| Permanent agents with a name, memory, and commitments | Each owns an area, remembers what it did, makes commitments. | The three agents get an owner card in `team/roster.md`, `memory: project`, and a commitments ledger they must close or carry. |
| The human's two jobs: taste and entropy | Saying no even when it works; asking for 100x instead of 2%; deleting what the last model needed. | A taste log that feeds the judge, a deletion pass in the monthly self-eval, and a 10x step in `/strategy`. |
| Not shipping is an incident | An hour without a ship is a SEV-0. | A week without an iterate-or-swing call, or a shipped bet with no read-out after 14 days, is flagged the way a stale file is. |
| Every new model compounds | Each model generation makes the structure better; scaffolding for the old one becomes a constraint. | A model-upgrade ritual in `MAINTENANCE.md`: re-run evals, then delete guardrails the new model no longer needs. |

## What we are not taking

- Hourly ships, SEV-0 on a missed hour, 5,000 vCPUs. A product team's loop is a week; the plan tightens that week, it does not replace it.
- Agents changing production. Product Agents writes markdown, tickets (gated), and PRs. That stays.
- Killing PRs for everything. Decisions and strategy still arrive as a PR a human reads. Only factual state changes skip it (WS3).
- Helper swarms "trying to break" each output. The existing Evidence Loop appendix is the cheap version; keep it.

## Workstreams

In order of leverage per token. Each ends in a commit; the set ships as `v2.1.0`.

### WS1 — Principles and the judge (highest leverage, lowest cost)

The 700-questions-a-morning problem shows up on a product team as the PM re-answering the same scope, copy, and priority questions in Slack. The fix is the same: write the answers down once, in a form an agent can apply.

1. **`team/decisions/principles.md`** (new, user layer). One line per standing answer, each with the decision it came from and a date. Sections: scope ("we do not build settings for things fewer than 10% of users touch"), quality bar, copy and tone, pricing, what we always say no to. Seeded by a one-time pass over `decisions.md` and the Friday notes; grown weekly by WS4.
2. **`team/decisions/questions.md`** (new). The queue of questions agents and humans file: `date | question | filed by | status (open / decided / sent back / held) | verdict | source line`. Any skill that would otherwise stop and ask the PM a taste question files a row here instead and continues on its stated assumption.
3. **`/judge` skill** (new, `model: claude-sonnet-5-5`, `effort: medium`, MCP-free). Input: one question or the open rows of `questions.md`. For each, exactly one of three outcomes, mirroring Spawn:
   - **decided**: a principle or a dated decision already answers it; cite the line.
   - **sent back**: the question is malformed (asks the human to pick between two things the principles already rank, or hides a bet inside a ticket); return it with the reason.
   - **held**: nobody has given this judgment yet; leave it open with a one-line summary of what the PM needs to decide.
   TERMINATION: every row has a status; no principle invented; no verdict without a cited source. Evidence Loop appendix on the batch.
4. **Feedback.** When the PM overrides a verdict, the correction is one row in `principles.md` ("judge said X on {date}; the rule is Y"). The judge reads it next run. This is the whole learning loop; no fine-tuning, no memory tricks.
5. **Wire it.** A `questions-triage` reactive run in `proactive/runs.yml`: on any change to `questions.md`, or daily, run `/judge` over open rows and open one PR. `friday-decide` reads the held rows so the PM clears them in the Friday note.

Acceptance: a fresh clone with ten seeded principles and five queued questions runs `/judge` and returns the three outcome types with cited lines; an override added to `principles.md` changes the next verdict.

### WS2 — Close the loop: a signals inbox and triage

Today every proactive run pulls from the tracker and the repo. Nothing reads what users and the product are saying. Spawn's point is that the agent should see the error, the bug report, and the metric itself, not a human's summary of it.

1. **`product/signals/`** (new, user layer, gitignored except `CLAUDE.md` and a sample). One file per source drop: `{date}-{source}.md` or `.csv`. Sources a product team already has: analytics alerts (PostHog, Amplitude), error tracker digests, support exports, NPS verbatims, app store reviews. Nothing in Product Agents fetches them; the team's webhook, export, or routine connector drops them here. Zero model cost until a run reads them.
2. **`/triage` skill** (from `docs/skill-backlog.md`, promoted). Reads unprocessed signal files plus `current-bet.md` and `betting-table.md`. Output `team/active/triage-{date}.md` with four buckets: serves the current bet (do now), serves a queued bet (queue, name it), decline (one-line reason), looks like a new bet (hand to `/strategy`). Marks each signal file processed by appending a footer line, so the next run skips it (stigmergy, not a database). Taste questions it cannot settle go to `questions.md`, not to chat.
3. **`metric-breach` becomes wired.** `runs.yml` binding moves from `manual` to `routine`: a daily routine runs `/data-analyst` only if a new alert file landed in `product/signals/`. The routine prompt lives in `proactive/routines/metric-breach.md`. No monitor ships with the repo; the alert file is the contract.
4. **Instrumented by default.** `issue-creator` already asks for analytics on every ticket. Add to the repo definition of done in `AGENTS.md`: a bet is not shipped until its success metric is readable from a source an agent can pull without a human (a saved query, an alert, a dashboard export path). The `audit` skill flags bets that fail this.

Acceptance: drop two sample signal files, run `/triage`, get a four-bucket note and footers on both files; a second run processes nothing.

### WS3 — Tiered gates: fix forward on facts, PR on judgment

> **Dropped 2026-10-29.** Not pursued: letting automated runs commit to the default branch is an install-specific risk posture, not something a generic operating layer should decide for every team. The existing rule (automated runs open PRs) stays. A team that wants fix-forward on factual fields can adopt the table below in its own fork.

"Automated runs never push to the default branch" is the right rule for decisions and the wrong rule for the Friday roadmap refresh, which updates dates and statuses copied from the tracker. The PM is reviewing a diff of facts they did not produce and cannot check without opening Linear. Spawn's split is the better one: dumb gates for the irreversible, check-after for the rest.

| Tier | What | Lands how | Safety net |
|---|---|---|---|
| Factual state | Tracker-derived fields in `product/roadmap/*`, `Last updated` dates, signal footers, `questions.md` verdicts of type *decided* | Direct commit to the default branch by the run | `freshness-auditor` runs after every automated commit as the janitor: a field that lost its date or source, or a status that is not in the allowed set, is reverted in one commit and filed in `questions.md` |
| Judgment | Strategy calls, PRDs, audit findings, held verdicts, Friday iterate-or-swing, anything with an Evidence Loop | PR, as today | A human reads the evidence table first, as today |
| Irreversible or outward | Tracker writes, email, chat posts, anything sent | Hard-coded gate (`tracker-write-guard.mjs`, routine prompts that forbid sending), as today | Not softened |

1. Add a `tier:` field to every entry in `runs.yml` (`fact | judgment | irreversible`) and make `check-skills.mjs` reject a `fact` run whose output path is not in an allowlist (`product/roadmap/*`, `product/signals/*`, `team/decisions/questions.md`).
2. `roadmap-refresh.yml` commits directly when `tier: fact`; the janitor job runs in the same workflow after it.
3. `freshness-auditor` gets the janitor procedure and a revert budget: at most one revert per run, then stop and file.
4. Record the revert rate in `product/analysis/audit/` monthly. If it climbs past a few percent, the tier was wrong; move that run back to PR. Spawn's number is under 1%; a markdown repo should do better.

Acceptance: the Friday refresh lands without a PR; a deliberately malformed field is reverted by the janitor and shows up in `questions.md`.

### WS4 — Taste in, scaffolding out

Spawn's human jobs are taste ("no standins", "not jazz") and entropy (asking for 100x). Both are cheap to encode because they are things the PM already says.

1. **Taste log.** `friday-decide` adds one step: extract this week's taste calls from the Friday note, meeting notes, and PR review comments into `principles.md` as candidate rows marked `proposed`. The PM keeps or deletes them in the same PR. This is how two years of decisions become principles without a one-time archaeology project.
2. **Deletion pass.** `monthly-pm-self-eval` already scores kill rate. Add a dimension: *what did we delete this month* (features, settings, skills, guardrails, rules in `.claude/rules/`). A month with nothing deleted is scored, not excused.
3. **10x step in `/strategy`.** Before ranking bets, one mandatory section: "If the constraint we are optimizing around did not exist, what would the 100x version be?" Named as entropy, bounded to five lines, never ranked above the evidence-backed call, but always present so the 2% compounding is a choice.
4. **The human says no.** Add to `product/playbooks/pm-toolkit.md` a short section on the two jobs (taste, entropy) with Spawn's framing and three worked examples from a product context (kill a setting that works, refuse a feature that tests well but cheapens the product, ask for the one-second version).

### WS5 — Named owners with memory and commitments

Spawn's agents are permanent, named, and make commitments. Product Agents has three agents and a router; make the ownership legible.

1. **Owner cards.** `team/roster.md` gets an "Agents" table alongside the humans: name, owns, runs on, memory location, steward who reviews it. `roadmap-keeper` owns `product/roadmap/*`; `freshness-auditor` owns consistency and the janitor; a new `signal-triager` (the `/triage` skill run as an agent) owns `product/signals/` and `team/active/triage-*`.
2. **Memory everywhere it is cheap.** `memory: project` on all three agents, not just the auditor. Each agent's memory records what it changed, what it flagged, and what it committed to.
3. **Commitments ledger.** `team/active/commitments.md`: rows an agent writes when it says "I will refresh X by Friday" or "held question #14 needs the PM". Each run opens by reading its own rows and either closes them or carries them with a reason. The Monday `sprint-health` run reports carried commitments the same way it reports stale tickets.
4. **One trail file.** `product/analysis/CLAUDE.md` becomes a dated append-only index every run adds one line to ("{date} {run} wrote {path}: {one-line result}"). The next run reads the last ten lines before it reads anything else. This replaces the "heads up" message with a pheromone trail.

### WS6 — Loop time as a first-class metric

1. `audit` computes and reports **idea-to-measured loop time** per bet (bet brief date → first read-out date) and the **unmeasured-ship count** (shipped bets with no read-out after 14 days).
2. `freshness-check.yml` adds two checks that fire as issues the same way stale files do: no Friday note with an iterate-or-swing call in the last 7 days; a bet marked shipped in `betting-table.md` with no row in `experiment-roadmap.md` after 14 days.
3. The README quality table gains a row for the repo's own loop time, dated, so the claim that the system shortens the loop is checkable.

### WS7 — The model-upgrade ritual

1. `MAINTENANCE.md` quarterly section adds: on a new model generation, (a) re-run `claude plugin eval` and commit the summary, (b) list every guardrail, rule, or skill step added because the previous model needed it, (c) delete the ones the eval shows are now unnecessary, (d) record the deletions in `CHANGELOG.md`. Spawn's observation is that yesterday's scaffolding is today's constraint; the ritual makes deleting it a scheduled job rather than a brave act.
2. `product/playbooks/model-selection.md` gets a "last re-evaluated on {model}" line per row.

## Cost envelope

| Run | Model | Frequency | Rough tokens/run |
|---|---|---|---|
| `/judge` over open questions | Sonnet 5.5 | daily, skips if no open rows | 20–60K |
| `/triage` over new signals | Sonnet 5.5 | daily, skips if nothing new | 30–80K |
| janitor after a fact commit | Haiku 5.5 | after each automated commit | 5–15K |
| taste extraction in `friday-decide` | Sonnet 5.5 (already runs) | weekly | +10K |
| `metric-breach` via `/data-analyst` | Opus 5.5 | only on an alert file | 50–100K |

Everything skips when there is nothing to do. Order of magnitude: tens of dollars a month, not millions.

## Sequencing

WS1 and WS2 are independent and give the biggest change in how the team works; do them first, in either order. WS3 was dropped (see its note). WS4–WS7 are small edits to existing files and can ride along.

## Definition of done

- A fresh clone runs `/judge`, `/triage`, and the Friday taste extraction with zero MCP servers and produces output at the stated paths.
- `decisions.md` holds the tiered-gates decision with a check-by date and a revert-rate threshold.
- `docs/design.md` credits the Spawn write-up under sources and adds one paragraph: principles as the compression of decisions, and the world as the message bus.
- `v2.1.0` tagged; `CHANGELOG.md` lists the four new files and two promoted skills.
