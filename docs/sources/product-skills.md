SKILL:

/morning-brief

ROLE: my chief of staff. you read everything overnight and prepare
a one-page briefing.

PULL:
- gmail: last 12 hours, inbox + sent (to see what i committed to)
- slack: DMs + @-mentions, last 12 hours, channels = [list]
- calendar: today + tomorrow morning, with attendee context
- polymarket: open positions, current P&L vs entry
- news: [3 RSS sources], last 12 hours, only items mentioning [keywords]

OUTPUT (markdown, one page max):
## Needs response before 10am
[bullets: sender + 1-line summary + suggested action]

## Can wait
[bullets, max 5]

## Noise — flagged so i know you saw it
[1 line per item, no detail]

TERMINATION: stop when all five sources are processed and the page
is under 400 words. Do not summarize the summary.





/competitor-scan

INPUTS:
- competitors: [comma-separated list, up to 8]
- my_positioning_doc: [Drive path]
- focus: [pricing | product | hiring | go-to-market | full]

WORKFLOW:
1. For each competitor, fetch: homepage, pricing page, last 5 blog
   posts, last 30 days of X posts from main handle, open job listings.
2. Compare positioning against my_positioning_doc.
3. Flag any competitor that has moved closer to my positioning
   in the last 60 days.
4. Flag any new hire or funding round (last 90 days).

OUTPUT (markdown):
## TL;DR (3 lines max)
## Per competitor
- pricing delta vs me
- positioning delta vs me (last 60 days)
- hiring signal
- funding signal
- one paragraph: what they would do that i would not see coming

TERMINATION: stop when each competitor section has all 5 fields filled.
Do not write an industry overview. Do not predict the future.




/research-deep

INPUTS:
- topic: [free text]
- depth: [survey | brief | full]
- timebox: [30min | 60min | 120min]

WORKFLOW (uses sub-agents):
Spawn 5 parallel sub-agents:
- AGENT_A: academic sources (Google Scholar, arXiv, key journals)
- AGENT_B: news + trade press (last 12 months)
- AGENT_C: X discourse (top voices on topic, last 90 days)
- AGENT_D: primary documents (gov filings, company docs, public datasets)
- AGENT_E: contrarian view — the 3 strongest critics, what they argue

Each sub-agent returns: 5 sources + 3-line summary of what they found.

COORDINATOR then synthesizes:
## TL;DR (3 lines, written as if to a smart skeptic)
## Mainstream consensus
## Contrarian case
## Open questions where evidence is genuinely thin
## My recommendation given the evidence

TERMINATION: stop at timebox. One pass per sub-agent. If AGENT_A
returns 5 sources at minute 4 of a 60-minute timebox, do not spawn
a second pass.



/repurpose

INPUTS:
- source: [file path or url of long-form piece]
- channels: [x | linkedin | newsletter | slack | email | all]
- tone: [my default | formal | casual]

WORKFLOW:
For each channel selected:
1. Identify the single strongest claim in the source.
2. Adapt to channel-specific constraints:
   - x: thread, 6-10 posts, each <280 chars, hook in post 1
   - linkedin: 1 post, 300 words, professional voice
   - newsletter: 2-paragraph excerpt + 1-line CTA back to full piece
   - slack: 4-line summary + link, written for #share channel
   - email: 60-word blurb + subject line + CTA

CONSTRAINTS:
- never use the same opening line across channels
- never quote more than 15 consecutive words from the source
- match my voice from [my last 10 posts on the channel, if available]

OUTPUT: one block per channel, ready to copy-paste.

TERMINATION: stop after all selected channels are filled. Do not
generate additional "bonus" versions.




/meeting-prep

INPUTS:
- meeting: [calendar event ID, or "next external meeting"]

WORKFLOW:
1. Identify external attendees (anyone outside my org).
2. For each: last 10 emails (any direction), shared docs,
   last linkedin update, last 30 days of X posts.
3. Find the last conversation we had and what was unresolved.
4. Generate 3 open questions based on what was unresolved.

OUTPUT (one page):
## Who's in the room
[per attendee: 2-line context]
## Last touchpoint
[when, what we agreed, what's unfinished]
## 3 open questions
## What's changed since
[only things that affect the meeting]

TERMINATION: stop at one page. If you can't fit something on one page,
drop it.





/weekly-status

INPUTS:
- week: [current | last]
- audience: [internal | client | board]

WORKFLOW:
1. Pull all closed Linear issues this week, with PR titles and reviewers.
2. Pull Notion docs created or significantly edited this week.
3. Read Slack #status, #shipping, #design channels for the week.
4. Calendar: count external meetings, internal meetings, deep work blocks.

OUTPUT (markdown, audience-specific length):
- internal: 1 page
- client: 1.5 pages, soften failures, surface risks
- board: 2 pages, with metrics-vs-targets table

Sections:
## Shipped
## In flight
## Blocked / risks
## Metrics (board version only)
## Next week's focus

TERMINATION: stop at length for chosen audience. Do not invent metrics
not present in source data.





/doc-review

INPUTS:
- document: [file path or url]
- my_context: [Drive path with related notes, optional]
- depth: [skim | review | deep]

WORKFLOW:
1. Read the document in full.
2. Identify: thesis, key claims, supporting evidence, gaps in evidence.
3. If my_context provided: flag contradictions or alignments with my prior writing.
4. Generate Q&A: 5 questions a thoughtful reader would ask, with the answer
   from the document (or "not addressed").

OUTPUT:
## Thesis (1 line)
## Key claims (3-5 bullets, each with evidence quality)
## Inconsistencies / gaps
## Contradictions or alignments with my prior work (if context provided)
## Q&A (5 questions)
## Verdict: read in full | skim | skip

TERMINATION: stop at this structure. Do not summarize the document
linearly section by section.




/triage

INPUTS:
- since: [last_run | morning | 24h]

WORKFLOW:
1. Pull all gmail messages since [since], excluding promotions and updates.
2. For each thread: needs_reply | informational | already_handled.
3. For needs_reply, draft a response using:
   - my last 5 sent emails to the same person (matches voice)
   - if no prior thread, default to 3-sentence acknowledgment + question
4. Save drafts in gmail with label "claude_draft", do not send.
5. Group informational by sender, summarize in 1 line each.

OUTPUT:
## Needs my eyes (drafts ready)
[list: sender + subject + 1-line on what the draft says]

## Informational (read-only)
[grouped by sender]

## Already handled / loops
[1 line each]

TERMINATION: stop when all unread threads are categorized.
Do not generate replies for threads you've already drafted.


RULES:

1. Explicit termination criterion.
Every surviving template ends with TERMINATION:. The line names a condition Cowork can check by looking at the output: page count, field count, structural completeness. Not "be thorough" or "be complete." Something checkable. Without this, every prompt expanded to fill the full Cowork session block. With it, the median session length dropped from 2h 20m to 14 minutes.
2. Structured output shape, not free-form synthesis.
Every surviving template specifies the output as named sections with specific contents. The model writes into the shape. It does not get to invent the shape. The discarded templates had outputs like "summarize and synthesize" - undefined containers that the model filled with whatever felt impressive.
3. Role definition in the first line.
Every surviving template names a role: chief of staff, audit-only, coordinator, repurposer. The role limits what the model thinks it should produce. The discarded templates had no role line and produced outputs that tried to be everything at once.
The two failure modes of the discarded twenty-one:
No clean stop. Without TERMINATION, the model spent the time block iterating. Output got longer and worse, not better. This was responsible for 14 of the 21 discards.
Mission creep. Without role definition, an "email triage" prompt would also try to predict reply rates and recommend new contacts. An "audit" prompt would also try to recommend new positions. The model wants to be helpful in every direction — the role cuts it off. This was responsible for the other 7.