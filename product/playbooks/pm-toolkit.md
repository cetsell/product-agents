# PM Toolkit

The principles the skills grade against. `/check-artifacts`, `/cadence`, `/strategy`, and `/monthly-pm-self-eval` cite this file; change a rule here and every skill that cites it changes with it.

---

## Every bet carries four lines

```
Hypothesis: We expect [metric] to [move how] because [reason]
Measure:    Check [metric] in [tool] at [24h / 72h / 7d]
Kill trigger: If [metric] doesn't improve by [date], revert or stop
Confidence: High / Med / Low — what we know vs. what we assume
```

High = we have data or prior evidence. Med = reasonable, untested. Low = educated guess; run a smaller test first.

## ICE vs. RICE

| Framework | Level | Use for |
|-----------|-------|---------|
| ICE (Impact, Confidence, Ease) | Bet | Choosing the week's bet; Thursday iterate-vs-swing |
| RICE (Reach × Impact × Confidence / Effort) | Feature | Comparing features inside a bet; backlog grooming |

Do not use ICE for features (reach matters there) or RICE for iterate-vs-swing (that call needs strategic context, not reach).

## Iterate vs. swing (Friday)

- **Iterate** if one or two more days close the gap on the success criteria.
- **Swing** if the bet is achieved, invalidated, or the kill trigger fired. Pick the next bet by ICE from the betting table.
- Run `/premortem` before locking a Confidence score of 7/10 or higher. High confidence is where overconfidence costs the most.

## Bet brief vs. PRD

| Size | Document |
|------|----------|
| ≤ 1 sprint | Bet brief (`templates/bet-brief.md`) |
| 2–3 sprints | Bet brief + technical appendix |
| Cross-quarter or multi-team | Full PRD via `/pm-super-agent` |
| AI feature, any size | Eval-requirements doc (`templates/eval-requirements-doc.md`) |

## Rolling roadmap

Now (6 weeks, concrete) / Next (6 months, flexible) / Later (directional), plus a "Not doing" list. Every Now item names the metric it moves. Template: `product/roadmap/roadmap.md`.

## Balance the portfolio

- **Performance gap:** keeping the existing product healthy (reliability, retention, core funnel).
- **Opportunity gap:** new value that expands what the product does.
- A healthy betting table carries both, and spreads bets across more than one leg of the opportunity tree.
- **Strategic work vs. snacking:** high-effort, high-impact work beats a queue of low-effort, low-impact tickets that feel productive.

## "I have it handled"

Fresh (≤ 7 days), specific, aligned artifacts signal control; stale (> 14 days) signals drift. Two or more ready bets in the pipeline means the team always knows what is next. `/check-artifacts` grades this.

## Discovery without scheduling interviews

Meeting notes and support threads are passive interview data. Weekly: extract job-to-be-done signals, log pain points with severity in `product/customer-insights/`, and flag decisions made in meetings that have no ticket.

## When the North Star will not move

Build the metric tree before picking the next bet: decompose the North Star into input metrics and find which input broke. Run it when a headline metric stalls for two weeks or a bet ships without moving its metric.

## The press-release test

Write the launch announcement before building anything significant. If the customer quote sounds like marketing, the value proposition is not real yet. If you cannot write the headline, the feature is not defined.

## Saying no

"Not now, because [current bet] moves [metric] and this does not. Revisit when [condition]." Log it in the roadmap's "Not doing" list.

## The two jobs: taste and entropy

When agents do most of the drafting, building, and triage, the PM's job narrows to two things the models will not do on their own.

**Taste** is saying no to things that work. A toggle that tests fine but makes the product feel like a settings panel. A feature a prospect wants that cheapens the default experience. A copy variant that wins the A/B and reads like a coupon. Each no becomes a row in `team/decisions/principles.md`, so the next agent that asks gets the answer from the record and the PM says it once.

**Entropy** is asking for the version the models would not propose. They compound 2% improvements indefinitely and almost never say "this should be ten times smaller" or "the constraint everyone accepts should not exist." The PM asks: what is the one-second version, the zero-step version, the version with no settings at all? Most answers are not on the table this quarter. The question is on the table every quarter (`/strategy` writes it down as the 100x section).

Three worked examples:

| Situation | Incremental answer | Taste or entropy answer |
|-----------|-------------------|-------------------------|
| Three teams ask for a dark-mode toggle; it is a day of work | Ship the toggle | Taste: no new setting under 10% usage; pick the default that matches the OS and move on. Principle, not a ticket. |
| Onboarding converts 34%; the team proposes a fourth step that tests +2 points | Add the step | Entropy: what is the zero-step version, where the first note is the onboarding? That is a bet brief, not a tweak. |
| A 40-seat prospect wants an export format before signing | Build it for the deal | Taste: no integrations for one prospect before they pay. Say no, log it, and revisit if three paying teams ask. |

**Deleting** is the third job and the least glamorous. Every rule, setting, guardrail, and process step was added because something at the time needed it. The monthly self-eval scores what was removed, because nobody deletes without a scheduled reason to.

## Pre-ship quality bar

- [ ] Success criteria met (from the bet brief)
- [ ] Edge and error states handled
- [ ] Analytics instrumented so the hypothesis can be read
- [ ] Rollback plan defined
- [ ] Demo-ready
- [ ] One-paragraph insight written: what we learned, not a list of tickets
