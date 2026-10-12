# Model Selection

Which Claude model each skill and agent runs on, and why. Set in each skill's and agent's frontmatter (`model`, `effort`); change it there, then update this table.

*Verified against code.claude.com/docs/en/model-config on 2026-10-12.*

## Aliases vs. full IDs

| Alias | Anthropic API | Bedrock / Google Cloud Agent Platform | Full ID (pin when behavior must match across providers) |
|-------|---------------|----------------------------------------|----------------------------------------------------------|
| `opus` | Opus 5.5 | Opus 5.5 | `claude-opus-5-5` |
| `sonnet` | Sonnet 5.5 | Sonnet 4.5 | `claude-sonnet-5-5` |
| `haiku` | Haiku 5.5 | Haiku 4.5 | `claude-haiku-5-5` |
| `fable` | Fable 5.1 | — | `claude-fable-5-1` |

This repo pins full IDs, so a team on Bedrock or Vertex gets the same models the evals ran on. If your provider does not serve a pinned model, change the ID in frontmatter or set `model: inherit`.

In Claude Code, Opus 5.5, Sonnet 5.5, and Haiku 5.5 default to `effort: medium`; skills that need more set `effort` explicitly. Haiku 5.5 costs more per token once a prompt passes 100K tokens, so the Haiku-run audits keep their reads small.

## By task

| Task | Model | Effort | Why |
|------|-------|--------|-----|
| Freshness audit, artifact grading, scrub checks | `claude-haiku-5-5` | low | Pattern matching over a known, small set of files |
| Cadence notes, weekly email, sprint sweep, ticket drafting, CRO and copy work | `claude-sonnet-5-5` | medium | Structured drafting from collected sources |
| Strategy, PRDs, premortems, audits, evidence loops, positioning, pricing | `claude-opus-5-5` | high | Multi-step reasoning with trade-offs; errors are expensive |
| LLM-as-judge in `/eval-runner` and `/skill-eval` | `claude-opus-5-5` | high | The judge must be at least as strong as the generator |

## By skill and agent

| Skill / agent | Model | Effort |
|---------------|-------|--------|
| check-artifacts | haiku | low |
| freshness-auditor (agent) | haiku | low |
| cadence, sprint-health, issue-creator, data-analyst, monthly-pm-self-eval | sonnet | medium |
| senior-prompt-engineer | sonnet | high |
| ab-test-setup, page-cro, signup-flow-cro, onboarding-cro, paywall-upgrade-cro, popup-cro, churn-prevention, email-sequence, referral-program, programmatic-seo, copywriting, marketing-psychology | sonnet | medium |
| strategy, pm-super-agent, audit, premortem, evidence-loop, marketing-strategy-pmm, pricing-strategy | opus | high |
| eval-runner, skill-eval | opus | high |
| team-os, roadmap-keeper (agents) | sonnet | medium |

The 2026-10-12 evals (`product/analysis/skill-evals/2026-10-12/`) ran each core skill at the tier in this table: Sonnet for cadence, sprint-health, and issue-creator; Opus for pm-super-agent, strategy, audit, eval-runner, and evidence-loop. check-artifacts at Haiku has not been evaluated yet.

`/eval-runner`'s judge is separate from the model the skill runs on: it reads `EVAL_JUDGE_MODEL` (default `claude-opus-5-5`). `claude plugin eval` defaults its judge to Haiku; pass `--judge-model claude-opus-5-5`.

## Two principles behind the table

**Build to swap.** Models improve faster than roadmaps. Keep model choice in frontmatter and in this table, never in a skill's body, so a better model is a one-line change followed by a re-run of that skill's eval. Do not wait for a model to get good enough before building the scaffolding around it.

**Cheapest lever first.** When an AI feature's quality is short, climb this ladder in order and stop at the first rung that clears the eval bar:

| Lever | Effort | What it changes | Mental model |
|-------|--------|-----------------|--------------|
| Prompt and context | Low | Instructions, examples, what is in the window | Clear instructions to a capable colleague |
| Retrieval (RAG) | Medium | What the model can look up at run time | A doctor with the reference text open |
| Fine-tuning | High | The model's defaults; usually for cost or latency, rarely for quality | Sending someone to a specialist degree |

Most quality gaps close on the first rung. Reach for the third only when the eval says the first two are exhausted and the cost or latency case is written down.

## When to change a row

- A skill's eval scorecard shows `bad` on "Wrote into the shape" or "Terminated" at the cheaper tier: move it up one tier and re-run its eval before keeping the change.
- A Haiku-run check starts reading large files: move it to Sonnet rather than let prompts grow past 100K tokens.
- Cost matters more than depth for a high-volume skill: move it down one tier, re-run its eval, and keep the change only if the scorecard holds.
