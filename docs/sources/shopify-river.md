# Source: "Learning on the Shop floor" (Tobi Lütke, May 2026)

Original post: https://x.com/tobi/article/2053121182044451016
Shopify Engineering companion piece: https://shopify.engineering/under-the-river

Not reproduced here. Read the original; this is the one-paragraph summary of what Team OS borrowed from it.

## What it says

River is an AI agent that lives in Shopify's Slack and is addressed like a teammate. It can read code, run tests, open pull requests, query the data warehouse, and inspect production traces. The constraint that matters: it works only in public channels and declines direct messages, so every exchange becomes a searchable transcript anyone at the company can read, join, or learn from. Lütke frames this as a Lehrwerkstatt, a teaching workshop where apprentices learn by watching experienced people work in the open. He reports thousands of employees using it across thousands of channels, with roughly one in eight merged pull requests authored by the agent and reviewed by humans.

## What Team OS took from it

- **The River principle:** agent output is shared and searchable by default, never private. `proactive/runs.yml` sets `open: true` on every run for this reason, and every skill writes to a repo path rather than a chat window.
- **Watching is onboarding:** the weekly cadence artifacts exist so that anyone on the team can see how decisions were made, not just what was decided.
- **Human review stays in the loop:** the agent proposes, a person decides. That is the "human decision point" line in every producer skill.
