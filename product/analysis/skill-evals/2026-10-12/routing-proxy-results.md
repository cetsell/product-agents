# Routing proxy: answers

Router: a fresh Claude Code subagent (Opus 5.5) given only `routing-proxy-input.md` (every skill's name + description + when_to_use, and the 24 case prompts with labels removed). One run, 2026-10-12. This tests the descriptions, not Claude Code's live skill router.

| # | Case | Router picked | Expected | Result |
|---|------|---------------|----------|--------|
| 1 | audit/copy-out-of-scope | /copywriting | not /audit | pass |
| 2 | audit/no-new-bets-trap | /audit | /audit | pass |
| 3 | audit/product-intel | /audit | /audit | pass |
| 4 | cadence/kickoff-no-friday-trap | /cadence | /cadence | pass |
| 5 | cadence/monday-kickoff | /cadence | /cadence | pass |
| 6 | cadence/prd-request-out-of-scope | /pm-super-agent | not /cadence | pass |
| 7 | eval-runner/no-prompt-fix-trap | /eval-runner | /eval-runner | pass |
| 8 | eval-runner/score-existing-transcripts | /eval-runner | /eval-runner | pass |
| 9 | eval-runner/skill-eval-out-of-scope | /skill-eval | not /eval-runner | pass |
| 10 | evidence-loop/memo-claims | /evidence-loop | /evidence-loop | pass |
| 11 | evidence-loop/no-rewrite-trap | /evidence-loop | /evidence-loop | pass |
| 12 | evidence-loop/prd-out-of-scope | /pm-super-agent | not /evidence-loop | pass |
| 13 | issue-creator/epic-split-trap | /issue-creator | /issue-creator | pass |
| 14 | issue-creator/monday-kickoff-out-of-scope | /cadence | not /issue-creator | pass |
| 15 | issue-creator/ticket-event-naming | /issue-creator | /issue-creator | pass |
| 16 | pm-super-agent/prd-no-roadmap-trap | /pm-super-agent | /pm-super-agent | pass |
| 17 | pm-super-agent/prd-template-gallery | /pm-super-agent | /pm-super-agent | pass |
| 18 | pm-super-agent/rank-bets-out-of-scope | /strategy | not /pm-super-agent | pass |
| 19 | sprint-health/no-ticket-edits-trap | /sprint-health | /sprint-health | pass |
| 20 | sprint-health/pricing-out-of-scope | /pricing-strategy | not /sprint-health | pass |
| 21 | sprint-health/sweep-with-export | /sprint-health | /sprint-health | pass |
| 22 | strategy/ice-queued-bets | /strategy | /strategy | pass |
| 23 | strategy/rice-only-trap | /strategy | /strategy | pass |
| 24 | strategy/ticket-out-of-scope | /issue-creator | not /strategy | pass |

Result: 24/24. The router noted being torn on 6 prompts: 1 copywriting vs page-cro; 7 eval-runner vs senior-prompt-engineer; 11 evidence-loop vs premortem; 13 issue-creator vs pm-super-agent; 16 pm-super-agent vs onboarding-cro; 24 issue-creator vs pm-super-agent.
