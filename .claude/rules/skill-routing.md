# Skill routing

Load only the skill the request needs. Most navigate-and-update tasks need no skill: read the doc index in `AGENTS.md` and the folder's `CLAUDE.md`.

## Velocity

| Request | Skill |
|---------|-------|
| Shipping to learn, shipped-to-activated lag, bet post-mortem, process bottlenecks | `/audit` |
| Monday kickoff, Wednesday pulse, Thursday prep, Friday demo-and-decide, weekly update, stakeholder update, monthly recap | `/cadence` |
| Write a ticket, split an epic into tickets | `/issue-creator` |
| Clear the questions queue, "has this been decided", does a principle cover X | `/judge` |
| PRD, spec, scope or break down an idea, turn notes into product work | `/pm-super-agent` |
| Audit, design, or debug a production prompt; structured output | `/senior-prompt-engineer` |
| Sprint sweep, what's stuck, blocker scan, launch readiness / go-no-go | `/sprint-health` |
| Triage the signals, what came in from support or analytics, is this planned, sort the inbox against the bets | `/triage` |
| What can product-agents do, which skill fits, set up product-agents in a project | `/product-agents-guide` |

## Decision quality

| Request | Skill |
|---------|-------|
| Design or read out an A/B test; log it to the experiment roadmap | `/ab-test-setup` |
| Are our plans current? Grade roadmap, betting table, baselines A–F | `/check-artifacts` |
| Funnel, conversion, cohort, growth, or any question that needs a warehouse number | `/data-analyst` |
| Score AI-feature prompt variants against a labeled dataset | `/eval-runner` |
| How do we know? Pressure-test claims before a stakeholder sees them | `/evidence-loop` |
| Which behavioral mechanism a change relies on, as a testable hypothesis | `/marketing-psychology` |
| Monthly PM self-evaluation (invoke explicitly) | `/monthly-pm-self-eval` |
| What could kill this? Stress-test a plan, launch, bet, or pricing change | `/premortem` |
| Behaviorally eval a product-agents skill | `/skill-eval` |

## Vision & strategy

| Request | Skill |
|---------|-------|
| Prioritize (RICE/ICE), OKRs, competitive move, opportunity or metric tree, vision check, decision memo | `/strategy` |

## Acquisition & activation

| Request | Skill |
|---------|-------|
| Write new page copy, or edit existing copy (Seven Sweeps) | `/copywriting` |
| Lifecycle or drip email sequence | `/email-sequence` |
| Positioning, messaging, launch plan, battlecard | `/marketing-strategy-pmm` |
| First-run experience, activation, time to value | `/onboarding-cro` |
| Landing or feature page conversion | `/page-cro` |
| Popup or modal timing, copy, targeting | `/popup-cro` |
| Template pages at scale for organic acquisition | `/programmatic-seo` |
| Referral or affiliate program design | `/referral-program` |
| Signup or registration completion | `/signup-flow-cro` |

## Retention

| Request | Skill |
|---------|-------|
| Cancel flow, dunning, at-risk saves, win-back | `/churn-prevention` |

## Monetization

| Request | Skill |
|---------|-------|
| In-app paywall, upgrade screen, free-to-paid | `/paywall-upgrade-cro` |
| Pricing model, tiers, value metric, willingness to pay | `/pricing-strategy` |

When a skill hits a taste or scope question the PM has not settled, it files a row in `team/decisions/questions.md` and continues on its stated assumption; `/judge` clears the queue against `team/decisions/principles.md`.

Skill outputs go to `product/analysis/<family>/`, `team/weekly-updates/`, `team/active/`, `product/specs/`, or `gtm/` as each skill states. Models and effort per skill: `product/playbooks/model-selection.md`.
