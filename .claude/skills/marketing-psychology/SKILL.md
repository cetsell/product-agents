---
name: marketing-psychology
description: >
  Names the behavioral mechanism behind a proposed product or marketing change (from a catalog of 70+
  mental models and biases) and turns it into a falsifiable test hypothesis ready for /ab-test-setup.
  Returns a short mechanism card: the behavior, the model, why it should apply here, the hypothesis,
  the metric it moves, and the ethics check.
when_to_use: >
  Use when someone proposes a change and asks "why would this work", "what's the psychology here",
  "which bias applies", "is this a dark pattern", or mentions anchoring, social proof, loss aversion,
  scarcity, defaults, friction, or persuasion. Also use to explain a surprising test result. Not for
  designing the test itself (use /ab-test-setup), writing the copy (use /copywriting), or setting
  prices (use /pricing-strategy).
argument-hint: "[proposed change or behavior to influence]"
allowed-tools: Read, Grep, Glob, Write
model: claude-sonnet-5-5
effort: medium
metadata:
  version: 2.0.0
---

# Marketing Psychology

**Role:** Behavioral reference that names the mechanism behind a proposed change and turns it into a hypothesis someone can falsify.
**Outcome:** Decision quality — fewer tests built on "it feels right"; every psychology-driven change ships as a hypothesis with a metric and a predicted direction. **Leaves behind:** a mechanism card in chat, ready to hand to `/ab-test-setup` and log in `product/roadmap/experiment-roadmap.md`.
**Output:** mechanism card in chat (shape below); no file unless the user asks.

Read `product/context.md` first (customer, stage, North Star, baselines, tools). Ask only for what it does not cover.

---

## How to use this skill

Mental models are useful only when they predict something you can measure. For each request:

1. **Pin the behavior.** What exactly should the user do, at what step, that they do not do now? ("Click upgrade on the paywall", not "convert better.") Get the current rate if it exists.
2. **Name the mechanism.** Pick one model, two at most, from the quick reference below; load the catalog for detail. If three or more seem to apply, the behavior is not pinned yet; go back to step 1.
3. **Check it applies.** State what would have to be true about these users for the model to work (for example, anchoring needs a visible reference price before the decision; social proof needs a reference group the user identifies with). If that condition is unknown, say so; it becomes the thing the test learns.
4. **Write the hypothesis** in the `/ab-test-setup` format, with a direction and a rough magnitude. A hypothesis that cannot lose is not one.
5. **Run the ethics check.** Would the change still feel fair if the user saw exactly how it works? If not, say so plainly and suggest the honest version.

When explaining a test result instead of a proposal, run the same steps backward: name the mechanism that best explains the result, then the follow-up test that would confirm or rule it out.

---

## Quick reference

| Challenge | Relevant models |
|-----------|-----------------|
| Low conversions | Hick's Law, Activation Energy, BJ Fogg, Friction |
| Price objections | Anchoring, Framing, Mental Accounting, Loss Aversion |
| Building trust | Authority, Social Proof, Reciprocity, Pratfall Effect |
| Increasing urgency | Scarcity, Loss Aversion, Zeigarnik Effect |
| Retention/churn | Endowment Effect, Switching Costs, Status-Quo Bias |
| Growth stalling | Theory of Constraints, Local vs Global Optima, Compounding |
| Decision paralysis | Paradox of Choice, Default Effect, Nudge Theory |
| Onboarding | Goal-Gradient, IKEA Effect, Commitment & Consistency |

---

## Decision rules

- **One change, one mechanism.** If a variant pulls three levers at once (urgency badge, testimonial, and a new price), a win teaches nothing. Split it or name which lever is under test.
- **Mechanism before tactic.** Do not start from "add a countdown timer". Start from the behavior and the barrier, then pick the model that addresses that barrier.
- **Strategic models are not tests.** First principles, second-order thinking, theory of constraints and similar models sharpen which bet to make; they rarely become an A/B test. Say so and route to `/strategy` when that is the real question.
- **No fake scarcity, fake urgency, or hidden defaults.** Recommend real constraints and opt-outs. Flag anything that would erode trust or create a cobra effect (for example, a referral bonus that rewards gaming).
- **Small samples cannot detect small effects.** Many bias effects are a few percent. If traffic in `product/context.md` cannot detect the predicted lift, say so and suggest a larger lever or a qualitative check instead.

---

## Output shape

```
**Behavior:** {who} should {do what} at {step}; today {baseline, as of date, or "unknown"}
**Mechanism:** {model} — {one sentence on why it drives this behavior}
**Applies if:** {condition that must be true about these users}; known / unknown
**Hypothesis:** Because {observation}, we believe {change} will cause {metric} to move {direction, ~magnitude} for {segment}. We'll know when {primary metric} reaches {threshold} without {guardrail} dropping.
**Metric it moves:** {primary} (guardrail: {metric})
**Ethics check:** pass / concern: {what, and the honest alternative}
**Next:** /ab-test-setup to size and design the test; log in product/roadmap/experiment-roadmap.md
```

For more than one candidate change, return one card each, ranked by expected impact on the primary metric.

---

## Questions to ask

If you need more context:
1. What specific behavior are you trying to influence?
2. What does your customer believe before encountering your marketing?
3. Where in the journey (awareness → consideration → decision) is this?
4. What's currently preventing the desired action?
5. Have you tested this with real customers?

---

## Related skills

- `/ab-test-setup`: turn the hypothesis into a sized test plan
- `/page-cro`, `/signup-flow-cro`, `/onboarding-cro`, `/popup-cro`, `/paywall-upgrade-cro`: where most of these changes land
- `/copywriting`: write the copy once the mechanism is chosen
- `/pricing-strategy`: price points and packaging (this skill covers only how prices are presented)
- `/referral-program`, `/churn-prevention`: incentive and retention mechanics
- `/marketing-strategy-pmm`: positioning and messaging the mechanism should support

---

## References (load on demand)

- `references/buyer-psychology.md`: buyer biases (social proof, endowment, defaults, peak-end, and more), persuasion principles (reciprocity, anchoring, loss aversion, decoy, framing), pricing psychology (charm pricing, rule of 100, good-better-best), and choice design (Hick's Law, Fogg, EAST, COM-B, activation energy). Load for step 2 when naming the mechanism behind a specific change.
- `references/thinking-models.md`: foundational thinking models (first principles, jobs to be done, inversion, second-order thinking, theory of constraints) and growth models (feedback loops, network effects, flywheel, switching costs, survivorship bias). Load when the question is which bet to make or why growth is stuck, not which variant to ship.

---

## TERMINATION

Stop when every proposed change in the request has a mechanism card with a falsifiable hypothesis, a named metric, and an ethics check, or when you have said why it cannot be tested. Do not design the full test, write the copy, or build the variant; hand off to the named skill. Do not log to the experiment roadmap unless the user asks.
