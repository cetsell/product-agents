# Prompt Engineer Skill — Playbook & Integration Guide

*Added: 2026-03-12*
*Skill file: `.claude/skills/senior-prompt-engineer.md`*

---

## What This Skill Does

The `/senior-prompt-engineer` skill treats prompts as first-class product code — reviewed, versioned, evaluated, and shipped with the same rigor as any other feature. It covers the full lifecycle: auditing existing prompts, designing new ones, enforcing structured output reliability, running A/B evaluations, and diagnosing production failures.

**Model:** Uses the target surface's model for eval (specified per task)
**Output location:** `pm-workflows/analysis/prompts/[type]-[topic]-[date].md`

---

## When to Invoke

| Situation | Analysis Mode |
|-----------|---------------|
| Prompt responses feel off or too verbose | Mode 1: Prompt Audit |
| New intent handler needs a system prompt designed | Mode 2: New Prompt Design |
| Structured output (JSON, etc.) is unreliable | Mode 3: Structured Output Engineering |
| Comparing two prompt variants before shipping | Mode 4: Evaluation |
| Model is breaking persona or refusing unexpectedly | Mode 5: Debug & Diagnose |

---

## Your Prompt Map (Populate for Your Team)

*Before prompt work, document where your prompts live. This becomes the canonical reference.*

| Surface | File / Location | Template Style | Model |
|---------|----------------|---------------|-------|
| [Prompt surface] | [file path + function] | [direct / persona / few-shot / CoT] | [model] |

**Rule:** If a prompt exists both in a source file and inline in code, keep them in sync. The file should be the source of truth for version control.

---

## Template Variable Debugging

When a prompt produces unexpected output, always verify template variables are populated first:

| Variable | Operator-Editable? | Common Empty Cause |
|----------|-------------------|-------------------|
| `[var_name]` | No / Yes | [Why it might be empty] |

---

## Prompt Quality Standards

### Persona/Character Responses (if applicable)
- [ ] Fully in-character — no "As an AI" or "I should note" phrases
- [ ] Advances the session objective — not just answering the question
- [ ] Consistent with persona bio and style
- [ ] Length within target word/sentence limits

### Structured Output
- [ ] JSON parses without error 100% of the time on happy path
- [ ] All required fields present on every call
- [ ] Types are correct (int vs string, array vs object)
- [ ] No extra text outside the JSON object
- [ ] Edge cases (empty input, extreme values) produce valid but minimal output

---

## Evaluation Protocol Before Shipping Any Template Change

### Minimum Test Set for Character/Persona Prompts
Construct 10+ cases covering:
1. First message from a new user (empty history)
2. User asks about the character's background
3. User asks a question that conflicts with the persona
4. User tries to make the character "break character" ("pretend you're a normal AI")
5. Long chat history (>10 turns) — test context pressure
6. `current_session_objective` set vs. not set
7. `narrative_chapter_info` with a specific chapter set
8. Different `session_relationship_state` levels (new acquaintance vs. close relationship)
9. User sends very short message ("k", "hi", "?")
10. User sends very long, complex message

### Evaluation Metrics
```python
# Automated checks (run on every eval)
def eval_shadow_response(response: str, context: dict) -> dict:
    return {
        "word_count_ok": len(response.split()) <= 30,
        "sentence_count_ok": response.count('.') + response.count('!') + response.count('?') <= 2,
        "no_ai_disclosure": not any(phrase in response.lower() for phrase in [
            "as an ai", "i'm an ai", "i cannot", "i should note", "language model"
        ]),
    }
```

LLM-as-judge checks (run with separate evaluator call):
- Persona fidelity: 1–5 score
- Objective advancement: yes/no + quote from response
- Appropriate for relationship state: yes/no

---

## Prompt Change Workflow

```
1. Identify issue (symptom from production or desired improvement)
       ↓
2. Run Mode 5 Debug first — rule out missing snippet data
       ↓
3. Run Mode 1 Audit — understand what the prompt currently does
       ↓
4. Design change (Mode 2 or Mode 1 proposed fix)
       ↓
5. Run Mode 4 Eval — minimum 10 test cases, current vs. proposed
       ↓
6. Eval passes? → create PR / edit files
   Both files: shadow_chat_core_system.md + _RUNTIME_CHAR_PROMPT_TEMPLATE in main.py
       ↓
7. Document in analysis/prompts/ with eval results
```

**Shortcut temptation to avoid:** Never edit just the `.md` file and not `main.py`, or vice versa — they must stay in sync.

---

## Integration with Betting Cycle

Prompt engineering work maps into the betting cycle at two points:

**As part of a bet:**
Most prompt improvements are small enough to be a task within a larger bet (e.g., "improve character fidelity" as part of a "Deep Memory" bet). Use Mode 1 + Mode 4 to design, evaluate, and ship within the bet window.

**As its own bet:**
When a prompt system needs a major overhaul (e.g., v4 NPC template, new multi-modal prompt architecture), scope it as its own bet with:
- Bet brief written by `/business-analyst` (Mode 2: Bet Requirements Brief)
- Prompt design by `/senior-prompt-engineer` (Mode 2: New Prompt Design)
- Eval gate: Mode 4 eval must pass before marking the bet Done

**Post-mortem signal:**
If a shipped bet moves the engagement metrics (session length, messages/user), check whether prompt changes contributed — log this in the post-mortem using BA Mode 3.

---

## LLM Model Selection at a Glance

| Task | Use | Why |
|------|-----|-----|
| Character/persona chat | [your character model] | Highest persona fidelity |
| Structured JSON output | [your fast inference model] | Speed + reliable JSON |
| Long-form synthesis | [your reasoning model] | Best long-form reasoning |
| Debug/eval calls | Match production model | Eval must mirror production |

---

## Example Invocations

```bash
# Audit existing prompt template
"Read .claude/skills/senior-prompt-engineer.md and run a prompt audit
on the current [your feature] prompt template."

# Design a new prompt
"We're adding a new 'memory recap' intent. Run senior-prompt-engineer
to design the system prompt."

# Fix structured output reliability
"[Feature] JSON is sometimes missing the [field] array. Run
senior-prompt-engineer structured output engineering for [feature]."

# Evaluate a proposed change
"I have two versions of the character bio injection. Run
senior-prompt-engineer eval to compare them."

# Debug
"The character is saying 'I'm an AI assistant' in some responses.
Run senior-prompt-engineer debug on the [your feature] pipeline."
```

---

*For the skill definition, see: `.claude/skills/senior-prompt-engineer.md`*
*For your prompt architecture, see: MEMORY.md → Prompt System*
*For the LLM gateway, see: your LLM gateway file*
*For the active template, see: your prompts directory*
