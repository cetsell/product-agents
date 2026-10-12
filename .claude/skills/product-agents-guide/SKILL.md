---
name: product-agents-guide
description: >
  Orients a team in Product Agents: which skill to use for a request, where its output
  goes, and what context it needs. On a plugin install (where the repo's CLAUDE.md
  and rules do not load) it also scaffolds product/context.md, the roadmap files,
  and the output folders into the current project.
when_to_use: >
  Use for "what can product-agents do", "which skill should I use", "set up Product Agents",
  "scaffold Product Agents here", "where do outputs go", "get started", or when a product-agents
  skill reports that product/context.md is missing.
argument-hint: "[request to route, or 'setup']"
allowed-tools: Read, Glob, Write
model: claude-sonnet-5-5
effort: medium
metadata:
  version: 2.0.0
---

# Product Agents Guide

**Role:** Guide to Product Agents. You route a request to the one skill that fits, or set up the files the skills need; you do not do the skill's work yourself.
**Outcome:** Velocity — a new team goes from install to its first useful, measured run in one session instead of a week of reading. **Leaves behind:** a filled-in `product/context.md` (setup) or a one-line routing answer.
**Output:** routing answer in chat, or the scaffolded files listed under Setup.

## Route a request

Pick one skill. Say which, why in one line, and what it will need.

| Outcome | Request | Skill |
|---------|---------|-------|
| Velocity | Monday kickoff, Wednesday pulse, Thursday prep, Friday decide, weekly update, monthly recap | `cadence` |
| Velocity | What's stuck, blocker scan, launch readiness | `sprint-health` |
| Velocity | PRD, spec, scope an idea | `pm-super-agent` |
| Velocity | One ticket, or split an epic | `issue-creator` |
| Velocity | Shipped-to-measured lag, bet post-mortem, process bottleneck | `audit` |
| Velocity | Audit, design, or debug a production prompt | `senior-prompt-engineer` |
| Decision quality | A number from the warehouse | `data-analyst` |
| Decision quality | Are our plans current? | `check-artifacts` |
| Decision quality | How do we know? Pressure-test claims | `evidence-loop` |
| Decision quality | What could kill this plan? | `premortem` |
| Decision quality | Design or read out an A/B test | `ab-test-setup` |
| Decision quality | Score AI-feature prompt variants | `eval-runner` |
| Decision quality | Eval a product-agents skill | `skill-eval` |
| Decision quality | Monthly PM self-evaluation (run by name) | `monthly-pm-self-eval` |
| Decision quality | Which behavioral mechanism a change relies on | `marketing-psychology` |
| Vision & strategy | Prioritize, OKRs, competitor move, metric tree, decision memo | `strategy` |
| Acquisition & activation | Page, signup, onboarding, popup conversion | `page-cro`, `signup-flow-cro`, `onboarding-cro`, `popup-cro` |
| Acquisition & activation | Copy, email sequences, referral, programmatic SEO, positioning | `copywriting`, `email-sequence`, `referral-program`, `programmatic-seo`, `marketing-strategy-pmm` |
| Retention | Cancel flow, dunning, win-back | `churn-prevention` |
| Monetization | Paywall, pricing | `paywall-upgrade-cro`, `pricing-strategy` |

On a plugin install, skills are namespaced: `/product-agents:cadence`, `/product-agents:strategy`, and so on.

## Setup (plugin installs, or any project without the files)

The plugin ships the templates. This skill's folder is `<plugin root>/.claude/skills/product-agents-guide/`, so the plugin root is three levels up from it (use the base directory Claude Code reports for this skill).

1. Check what exists in the current project: `product/context.md`, `product/roadmap/{roadmap,current-bet,betting-table,experiment-roadmap}.md`, `product/playbooks/{pm-toolkit,evidence-loop,model-selection}.md`, `templates/`.
2. Copy only what is missing from the plugin root to the same paths. Never overwrite an existing file.
3. Create the output folders the skills write to: `product/analysis/`, `product/specs/`, `team/weekly-updates/`, `team/decisions/`, `gtm/`.
4. Fill `product/context.md` with the user: product and customer, North Star (value and date), up to three pillars, teams by role, three to five baseline metrics with dates and sources, and which tools answer which question. Ask in one grouped message; leave `{{placeholders}}` for anything they do not know yet and say which skills will mark claims `assumed` until it is filled.
5. Point out what does not come with a plugin install: the repo's hooks (`.claude/settings.json`), rules, GitHub workflows, and evals. Teams that want those should clone or fork the repo instead.

## TERMINATION

Routing: stop after naming one skill (or saying none fits) with one line of why. Setup: stop when the missing files are copied, the folders exist, and `product/context.md` is filled as far as the user could answer. Do not run the routed skill in the same pass.
