# Skill backlog

Skills that would earn a place in Product Agents but are not built yet. Each entry names the outcome it would move; a skill without one does not get built. To claim one, open an issue, write the skill to the quality bar in `docs/design.md`, add an eval suite under `evals/`, and send a PR.

## competitor-scan

- **Outcome:** decision quality on positioning and pricing; catches a competitor move within weeks instead of quarters.
- **Pull:** up to eight competitors; their homepage, pricing page, recent posts, open roles; your positioning doc from `product/context.md`.
- **Output:** `product/analysis/competitive/scan-{date}.md`: three-line TL;DR, per competitor the pricing delta, positioning delta over 60 days, hiring and funding signals, and one paragraph on what they would do that you would not see coming.
- **Termination:** every competitor has all five fields filled. No industry overview. No predictions.

## meeting-prep

- **Outcome:** cycle time; a prepared meeting ends with a decision instead of a follow-up.
- **Pull:** the calendar event, attendees, prior notes on the same people or topic from the meeting-notes tool, open issues tagged to the topic, the current bet.
- **Output:** one page to `team/active/prep-{date}-{slug}.md`: purpose in one line, the decision to get, three questions to ask, what each attendee cares about, open commitments owed to or by them.
- **Termination:** one page, under 300 words, every attendee covered.

## doc-review

- **Outcome:** decision quality; a spec or memo gets a skeptical read before stakeholders see it.
- **Pull:** the document, `product/playbooks/pm-toolkit.md` for the standards, the evidence-loop method.
- **Output:** inline comments plus a summary at the top: the claim most likely to be wrong, the missing evidence, the unstated assumption, what to cut. Writes back to the same file or to `product/analysis/reviews/`.
- **Termination:** every section reviewed; at most ten comments; no rewriting of the author's prose.

## triage

- **Outcome:** velocity; the inbox of ideas, bugs, and requests gets sorted against the current bet daily instead of piling up.
- **Pull:** new issues in the tracker since the last run, support or feedback exports, the betting table.
- **Output:** a short list to `team/active/triage-{date}.md`: do now (serves the current bet), queue (serves a queued bet, with which one), decline (with the one-line reason), and anything that looks like a new bet.
- **Termination:** every new item has a bucket; nothing is assigned to a person without approval.

## morning-brief

- **Outcome:** the PM starts the day on the one decision that matters rather than on the inbox.
- **Pull:** email and chat since yesterday evening, today's calendar, the current bet, any run outputs from overnight.
- **Output:** one page: needs a response before mid-morning, can wait, noise seen and ignored.
- **Termination:** all sources processed, under 400 words, no summary of the summary.
- **Note:** needs email and chat MCP servers that this repo does not ship; build it only once those are standard in your setup.
