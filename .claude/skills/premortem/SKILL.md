---
name: premortem
description: "Run a premortem on any plan, launch, product, hire, strategy, or decision. Assumes it already failed 6 months from now and works backward to find every reason why. Produces a revised plan with blind spots exposed. MANDATORY TRIGGERS: 'premortem this', 'premortem my', 'run a premortem', 'what could kill this', 'future-proof this', 'stress test this plan', 'what am i missing here', 'find the blind spots'. STRONG TRIGGERS: 'what could go wrong', 'am i missing anything', 'poke holes in this', 'where will this break', 'devil's advocate this'. Do NOT trigger on simple feedback requests or factual questions. DO trigger when someone has a plan or commitment where the cost of being wrong is high."
---
# Premortem

A premortem is the opposite of a postmortem. Instead of figuring out what went wrong after something fails, you imagine it already failed and figure out why before you start.

The method comes from psychologist Gary Klein (published in HBR). Kahneman called it his single most valuable decision-making technique. Google, Goldman Sachs, and P&G use it before major decisions.

The core insight: when you ask people "what could go wrong?" they give cautious, hedged answers. When you say "this already failed, tell me why," their brains switch into narrative mode and generate far more specific, honest reasons. Wharton/Cornell researchers call this "prospective hindsight."

Why it matters for AI-assisted decisions: Claude defaults to agreeable, optimistic responses. Ask "is this a good plan?" and it finds reasons to say yes. The premortem forces the frame into "this is dead, explain how it died." This is the failure-mode twin of `/evidence-loop` — evidence-loop checks *what's actually supported*, premortem checks *how it dies*. Both exist to beat sycophancy. Method reference: `product/playbooks/evidence-loop.md`.

**Output directory:** `product/analysis/premortem/`

---
## when to run a premortem
Good targets: a product/feature about to be built; a launch with money or reputation on the line; a pricing change or business-model shift; a hire; a strategy or positioning pivot; a partnership or deal; **any new high-stakes bet entering `product/roadmap/betting-table.md`** (this is the proactive auto-trigger — see `proactive/runs.yml`).

Bad targets: vague ideas with no concrete plan (help them plan first); questions with one right answer (just answer them); requests for creative feedback on a draft (that's editing); decisions already made and irreversible (a premortem only helps when you can still change course).

---
## context gathering (the minimum bar)
A premortem is only as good as its context. Vague input produces vague failure scenarios.

### step 1: scan for existing context
Before asking anything, look for context already available:
- **The current conversation** — the user may have been discussing the plan earlier this session. Read back and extract what's relevant.
- **The workspace** — `Glob`/`Read` quickly (≤30s) for: `CLAUDE.md`, any `memory/` folder, the relevant `product/roadmap/` or `product/specs/` files, files the user referenced.

### step 2: evaluate context sufficiency
You need three things:
1. **What is it?** — describe the thing in one sentence.
2. **Who is it for / who does it affect?** — audience, team, stakeholders.
3. **What does success look like?** — failure is defined by inverting success.

### step 3: fill gaps conversationally
If you have all three, proceed. If missing one, ask for the most important missing piece first — one question at a time, evaluate after each answer, never more than needed. Conversational, not interrogative. If you can infer an answer from context, do that instead of asking.

---
## how a premortem session works
### step 1: set the frame
"OK, I have enough context. Let's run the premortem. It's 6 months from now. [The plan] has failed. It's done. We're looking back to understand what went wrong." This shifts the mode from "evaluate this plan" to "explain why this died."

### step 2: generate failure reasons (raw premortem)
Run as a single comprehensive analysis. No prescribed categories. "This plan has failed 6 months from now. Generate every genuine reason it could have died. Be comprehensive, specific, grounded in the actual details. Don't pad with weak reasons; don't stop early if there are more." Some plans have 4 genuine failure modes, others 9 — the number should be whatever is real. Each reason: specific to this plan, grounded in real details, a genuine threat (not a minor inconvenience or unlikely edge case).

### step 3: deep-dive agents (one per failure reason, all in parallel)
Spawn one sub-agent per failure reason, **all in parallel** (sequential spawning wastes time and lets earlier responses bias later ones).

**Sub-agent prompt template:**
```
You are an investigator in a premortem analysis, assigned one specific failure reason.
The plan:
---
[full context: what it is, who it's for, what success looks like, plus relevant workspace context]
---
PREMORTEM FRAME: It is 6 months from now. This plan has failed.
YOUR ASSIGNED FAILURE REASON: [the specific failure reason from step 2]
Go deep on this one failure. Write the story of how it actually played out. Be specific.

Output:
1. THE FAILURE STORY: 2-3 paragraph narrative of how this failure played out. Name specific moments where things went wrong and why.
2. THE UNDERLYING ASSUMPTION: the one thing taken for granted that made this failure possible. One sentence.
3. EARLY WARNING SIGNS: 1-2 concrete, observable signals the user could watch for. Things you can see or measure, not vague feelings.
Keep under 300 words. Direct. Don't hedge. Don't sugarcoat.
```

### step 4: synthesis
Read every deep-dive and produce:
**PREMORTEM REPORT**
1. **The Most Likely Failure** — most probable given what you know, and why. Focus here first.
2. **The Most Dangerous Failure** — most damaging if it happened, even if less likely. Insure against this.
3. **The Hidden Assumption** — the single biggest unquestioned assumption across all analyses. Often where the real value lives.
4. **The Revised Plan** — concrete changes that make the plan more resilient. Not "consider your pricing" but "test pricing at $X with 20 people before committing publicly." Each revision maps to a specific failure scenario.
5. **The Pre-Launch Checklist** — 3-5 specific things to verify/test/put in place before executing, each preventing or detecting one failure mode.

### step 5: generate the report
Single self-contained HTML file with inline CSS, saved to `product/analysis/premortem/premortem-report-[timestamp].html`. Dark background, clean scannable typography. Synthesis prominently at top. One visual card per failure reason (header + story + assumption + warning signs), distinct accent colors, a severity/likelihood indicator. Footer with timestamp and what was premortemed. Open the file after generating.

### step 6: save the transcript
Save the full transcript as `product/analysis/premortem/premortem-transcript-[timestamp].md`: context gathered, raw failure reasons, all deep-dives, full synthesis.

---
## output format
Two files per session:
```
product/analysis/premortem/premortem-report-[timestamp].html    # visual report
product/analysis/premortem/premortem-transcript-[timestamp].md  # full transcript
```
Also give a concise chat summary: most likely failure, hidden assumption, single most important revision. Three sentences max.

---
## important notes
- **Always spawn all failure agents in parallel.**
- **Always set the premortem frame explicitly** — "this has already failed" is the mechanism. Without it you get polite risk assessment, not honest failure identification.
- **Comprehensive but not padded** — find every genuine failure reason; don't force a number.
- **The synthesis is the product** — most users read the synthesis and skim the cards.
- **Don't sugarcoat** — tell the user things they don't want to hear before reality does.
- **The revised plan must be concrete** — every revision should be something doable this week.
- **Respect the minimum context threshold** — better to ask one more question than produce a generic premortem.

---

## TERMINATION

Stop when the synthesis (most likely failure, most dangerous failure, hidden
assumption, revised plan, pre-launch checklist) is written, the HTML report and
transcript are saved, and the 3-sentence chat summary is delivered. One premortem per
invocation — do not start executing the revised plan or re-run the analysis for polish.
