# Proactive Agents

The layer that moves work from *reactive* (you ask, it answers) to *proactive*
(it runs without being asked, on a schedule or a trigger, and hands you decisions).
This is the multiplier — the difference between a tool you operate and a team that
operates while you're elsewhere.

The pattern is borrowed from three places, all pointing the same way:
- **aeon** — runs unattended on a schedule, fires on reactive triggers, scores its
  own output, keeps memory across runs. "Configure once, forget forever."
- **Shopify's River** — agents that work *in the open* compound knowledge. The speed
  of an org is set by how fast good reasoning diffuses; an output nobody can see
  doesn't diffuse.
- **The "agents work while you sleep" orchestration pattern** (claude-squad / Actions)
  — independent runs on separate branches/contexts, results waiting in the morning.

## Files

| File | What it is |
|------|-----------|
| `runs.yml` | The manifest — every proactive run: schedule or trigger, skill, what it pulls, where output goes, steward, stop condition. Scheduler-agnostic. |

## Five principles (every run obeys these)

1. **Runs without being asked.** A proactive run is scheduled (time) or reactive
   (event). If it only fires when you type the command, it belongs in `.claude/skills/`,
   not here.
2. **Works in the open.** Output lands in a shared, searchable location (a team-os
   file, a shared channel) — never a private window. River's lesson: the run that
   nobody else can see teaches nobody else.
3. **Evidence-looped when it drives a decision.** Any proactive output a human will
   act on carries the Evidence Loop appendix (`product/playbooks/evidence-loop.md`).
   Fluent + unattended + unsupported is the dangerous combination — the loop is the
   guardrail that lets the run be autonomous.
4. **A human decides.** Every run names a **steward** (accountable for the run) and a
   **decision point** (where a person owns the call). Fast does not mean unattended
   on the decisions that matter.
5. **Hard termination.** Every run names a checkable stop condition (page count,
   field count, "all sources processed") — not "be thorough." Without it, an
   unattended run expands to fill its whole budget. (Source: `product-skills.md`.)

## Cadence (the weekly operating rhythm)

Scheduled runs map onto the rhythm already in `MAINTENANCE.md`. That file remains the
source of truth for the Refresh (Friday) and Audit (Monday) steward duties; this layer
just makes them proactive runs rather than reminders.

| When | Run | Skill | Steward |
|------|-----|-------|---------|
| Daily AM | Morning brief | `/morning-brief` ⚠️ | PM |
| Monday | Sprint health + kickoff | `/sprint-health`, `/cadence` | PM |
| Monday | Freshness audit | team-os agent (Audit mode) | PM |
| Wednesday | Mid-week pulse | `/cadence` | PM |
| Friday | Demo + "Hello All" + roadmap refresh | `/cadence`, team-os agent (Refresh mode) | PM |
| Weekly | Status report | `/weekly-status` ⚠️ | PM |
| Monthly (1st) | PM self-eval | `/monthly-pm-self-eval` | PM |

⚠️ = the skill is currently a **template** in `product-skills.md`, not yet a built
skill. The run is defined; building the skill is a dependency (flagged in `runs.yml`).

## Reactive triggers

| Trigger | Run | Skill |
|---------|-----|-------|
| New high-stakes bet in `betting-table.md`, pricing change, or launch plan | Premortem it, attach report | `/premortem` |
| Any strategy call / PRD / audit finding about to reach a stakeholder | Evidence-loop gate | `/evidence-loop` |
| A tracked metric crosses a threshold | Diagnose + alert | `/data-analyst` |
| Competitor moves (pricing, launch, hire) | Competitor scan | `/competitor-scan` ⚠️ |

## Wiring it later (decided: manifest first, executor later)

`runs.yml` is intentionally **not bound to an executor yet**. Until it is, a human
runs these per the cadence above. When ready to automate, bind each run to one of:

- **`/schedule`** (Claude Code cron routines) — best for the time-based scheduled runs.
- **`/loop`** — for self-paced polling of an external state.
- **GitHub Actions** (aeon-style) — for truly unattended runs that post to a channel;
  needs secrets + workflow setup in this repo.
- **hooks** (`.claude/settings.json`) — for the reactive *gates*: a pre-commit/pre-push
  hook can fire the evidence-loop or a security review so the rule enforces itself
  (dev-agents Part 5). This is how a trigger becomes non-skippable rather than a
  reminder.
