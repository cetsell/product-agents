# Why Product Agents is shaped this way

The short version: a product team's agents are only as good as the shared context they load, the workflows they run, and the evidence they leave behind. Product Agents is those three things in a repo. This note records the ideas it was built from so that future changes stay coherent, and credits where they came from.

## The layers

The repo collapses five layers into three folders of work.

| Layer | What it means | Where it lives here |
|-------|---------------|---------------------|
| Company context | What a competent PM would know before making a recommendation: goals, products, team, constraints, baselines. Five clean files beat a forty-page strategy dump. | `product/context.md`, `product/analytics/`, `product/roadmap/`, `team/` |
| Workflow decomposition | "Write a PRD" is not one task. It is framing, evidence, assumptions, trade-offs, acceptance criteria, and launch risk. A workflow knows what comes first, what evidence is required, when to stop and ask, and what artifact gets saved. | Each skill's steps and output shape |
| Reusable skills | The tenth time you explain what a good PRD review looks like, you are wasting the machine. Encode the judgment once: what to inspect, which failure modes matter, what evidence is required, what to refuse. | `.claude/skills/` |
| Evidence loops | Fluent output relaxes the reader. Product decisions do not compile, so every consequential output carries a claim-by-claim trail, the assumption that would flip the decision, and the point where a human decides. | `product/playbooks/evidence-loop.md`, the appendix on every producer skill |
| Knowledge memory | Storage is where notes go; memory is what comes back when the work needs it. Outputs are filed back where future work can find them, dated. | `product/analysis/`, `team/decisions/`, `team/weekly-updates/` |

A prompt library gives you better text to paste. An operating layer knows the context, runs the workflow, checks the evidence, and files the output where the next run can use it. That distinction is the whole design.

## The quality bar for a skill

Every skill is held to the same checkable shape, enforced by `check-skills.mjs` and the behavioral evals in `evals/`:

- **Role line.** Who the skill is when it runs.
- **Outcome line.** The KPI, decision, or cycle time it moves. If this cannot be written honestly, the skill does not belong here.
- **Pull.** The sources it reads, and what to do when one is missing (ask once for a pasted export, label it, continue).
- **Output shape.** A structured artifact at a repo path, not prose in a chat window.
- **TERMINATION.** The rule that stops an unattended run from expanding to fill its budget.

The shape came from a pattern of writing personal agent skills as `ROLE / PULL / OUTPUT / TERMINATION` blocks. The outcome line is ours.

## Working in the open

Agent output is shared and searchable by default. Every run in `proactive/runs.yml` is `open: true`, every skill writes to a repo path, and automated runs open pull requests rather than pushing to the default branch. The principle is borrowed from Shopify's River: an agent that only works in public channels turns the whole company into an apprenticeship, because everyone can watch the most experienced people work with it. The human still reviews and decides.

## Principles that shaped individual skills

- **Premortem** uses Gary Klein's prospective-hindsight method: "this already failed, explain how" produces more specific and honest failure reasons than "what could go wrong." It also breaks the model's default agreeableness.
- **Eval-requirements docs** replace prose PRDs for AI features: the PM hands engineering a labeled dataset and pass metrics, uses text labels rather than numeric scores because models cannot justify numbers, and relabels a sample when the judge and the human disagree.
- **Model selection** assumes models will keep improving: build the scaffolding now so a better model is a one-line swap, and pick the cheapest lever that moves quality (prompt, then retrieval, then fine-tuning). See `product/playbooks/model-selection.md`.
- **Judge** borrows Spawn's answer to the "700 questions a morning" problem: decisions on the record get compressed into principles, and an agent applies them with exactly three outcomes (decided with a citation, sent back as malformed, held for a human). The human gives each judgment once; the record answers the repeats, and a wrong verdict is corrected by adding a rule, not by editing the judge. The same write-up's point that agents should coordinate through shared state rather than messages is why every run here reads and writes repo files instead of notifying anyone.
- **Signals and triage** take Spawn's other point: the agent should see the error, the bug report, and the metric itself, not a human's summary. `product/signals/` is an inbox of files your tools drop; `/triage` sorts them against the betting table and marks each file with a footer so the next run skips it. The footer is the coordination mechanism (stigmergy: the world is the message bus), which is why there is no database, no queue service, and no run that notifies another run.
- **Evidence loops** respond to a finding from Microsoft Research that higher confidence in the AI correlates with less critical thinking by the person using it.

## Sources and influences

Linked, not copied. If one of these is yours and you want different attribution, open an issue.

- Tobi Lütke, "Learning on the Shop floor" (May 2026): https://x.com/tobi/article/2053121182044451016, and Shopify Engineering, "Under the River": https://shopify.engineering/under-the-river
- Gary Klein, "Performing a Project Premortem," Harvard Business Review (2007). The premortem skill is adapted from a community skill that packaged Klein's method for Claude; original author unknown.
- Aman Khan and Aakash Gupta on becoming an AI product manager (Lenny's Podcast / Product Growth): evals as requirements, text labels over numbers, the prompt / RAG / fine-tune lever ladder.
- An essay on the PM "operating layer" (five layers: context, workflows, skills, evidence loops, memory). Original author unknown; the framing above is a paraphrase.
- Lee, Hao-Ping et al., "The Impact of Generative AI on Critical Thinking," Microsoft Research / CHI 2025.
- Andrej Karpathy's LLM wiki idea, for the memory layer: https://github.com/karpathy/llm-wiki
- Spawn, on running a ten-person company with a permanent agent fleet (October 2026): principles as compressed decisions, AI judges with three outcomes, stigmergic coordination through shared state. The adaptation plan is `UPGRADE-PLAN-2026-11.md`.
