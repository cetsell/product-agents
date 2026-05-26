Layer 1: Company context

This is the obvious one, but most people still underbuild it.
The model needs to know:
what your company does
what your current goals are
what products you own
who is on the team
what constraints shape decisions
You do not need a 40-page strategy dump, every roadmap doc, or the whole knowledge base.
Five clean files are usually enough to start:
COMPANY.md
GOALS.md
TEAM.md
PRODUCTS.md
CONSTRAINTS.md
The point is not to document everything. The point is to document what a competent PM would know before making a recommendation.
This is where a lot of AI strategy work breaks. People ask Claude for a roadmap recommendation with none of the context that makes a roadmap recommendation real.
The output is not bad because Claude is dumb. The output is bad because the PM gave it a pretend version of the job.
Layer 2: Workflow decomposition

Most PM work is not one task.
It is also not just writing.
That is the trap with a lot of AI product work. The surface artifact is a document, so people treat the job as document generation. But the actual burden is reconstructing context, picking the right frame, knowing what evidence matters, and deciding whether the output is good enough to put in front of other people.
"Write a PRD" is not one task.
It is problem framing, evidence collection, assumption mapping, solution shaping, tradeoff analysis, stakeholder translation, acceptance criteria, launch risk, and probably three other things you forgot until somebody asks.
"Do strategy" is even worse.
If you ask AI to "make a strategy," it has to guess the workflow. It guesses something that looks like a strategy doc because the internet is full of strategy docs. It does not know which step you are actually stuck on.
This is why the tool debate gets so boring.
Claude Code vs Claude Desktop vs ChatGPT vs Cursor is often the wrong fight. The better question is:
what is the work made of?
If the work is a one-off question, chat is fine.
If the work touches files, prior decisions, company context, templates, and repeated review loops, chat becomes a bad interface for it, because the work needs a workflow.
The workflow should know what comes first, what evidence is required, when to stop and ask you, and what artifact gets saved at the end.
That is a different thing from a prompt.
Layer 3: Reusable skills

A skill is what happens when you stop explaining the same judgment every time.
Another way to say it: a workflow is encoded knowledge.
The first time you ask AI to review a PRD, you explain what good looks like.
The tenth time, if you are still explaining it, you are wasting the machine.
The useful move is to encode the review logic once:
what to inspect
what failure modes matter
what evidence is required
what output format helps you act
what the model should refuse to do
Then the skill runs every time.
That is where the compounding starts.
You are no longer "using AI." You are moving pieces of your PM judgment into reusable execution.
This is why I think the phrase "prompt library" undersells the category. A prompt library gives you better text to paste. An operating layer knows the context, runs the workflow, checks the evidence, and saves the output back where future work can use it.
This is also where the career anxiety gets more concrete.
The gap between two PMs is not going to be "one uses AI and one doesn't." That framing is already stale.
The gap is going to be:
one PM starts every task from a chat box
another PM has a small library of workflows that already know how they think
Those people are not doing the same job.
Layer 4: Evidence loops

The hardest part of AI product work is that the output sounds better than it deserves to.
Microsoft researchers found something uncomfortable about knowledge workers using GenAI: higher confidence in the AI was associated with less critical thinking, while higher confidence in yourself was associated with more critical thinking.
That tracks with how these tools feel.
When the answer is fluent, your brain relaxes.
For PM work, that is dangerous because product decisions do not compile. Code has tests. Product has judgment, evidence, customers, constraints, and consequences.
So the operating layer needs evidence loops:
what claims is the model making?
which ones are actually supported?
what source backs each claim?
what assumption would change the decision?
what does the model not know?
the point where a human should make the decision
This is why I like workflows like /measure.
If leadership asks "how do you know?", you do not want a better paragraph. You want a chain:
define what would be observable
decompose the big unknown into smaller variables
estimate ranges honestly
calculate which uncertainty is worth reducing
measure only what could change the decision
update the recommendation
That kind of workflow does not make AI "smarter." It makes the PM less able to hide behind a confident answer.
Layer 5: Knowledge memory

PMs collect a stupid amount of knowledge and retrieve almost none of it.
User research, strategy notes, Lenny articles, pricing docs, customer calls, decision journals, stakeholder feedback, random things copied from Slack, frameworks you read once and forgot.
Most of it sits in a folder until you vaguely remember that you read something about this six months ago.
AI makes that waste more obvious.
If the model can access your notes, but your notes are a pile, the model inherits the pile.
So the operating layer needs some kind of knowledge structure:
an index
concept summaries
links between notes
source-aware answers
a way to file useful outputs back into the system
This is the difference between storage and memory: storage is where notes go, and memory is what comes back when the work needs it.