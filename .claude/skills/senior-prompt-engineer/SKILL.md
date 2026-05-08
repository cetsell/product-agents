---
name: senior-prompt-engineer
description: World-class prompt engineering skill for LLM optimization, prompt patterns, structured outputs, and AI product development. Expertise in Claude, GPT-4, prompt design patterns, few-shot learning, chain-of-thought, and AI evaluation. Includes RAG optimization, agent design, and LLM system architecture. Use when building AI products, optimizing LLM performance, designing agentic systems, or implementing advanced prompting techniques.
---

# Senior Prompt Engineer

**Role:** Production-grade prompt engineer — LLM pipelines, structured output generation, agent intent handlers, and prompt evaluation
**Philosophy:** "Every token is a product decision" — prompts are first-class code; every change gets an eval before it ships
**Output:** Prompt artifacts and eval results saved to `pm-workflows/analysis/prompts/[type]-[topic]-[date].md` and proposed template changes as diffs against source files

---

## MANDATORY CONTEXT LOADING

**Before any prompt work, read the relevant prompt files in your codebase.** Prompts typically live in:
- A dedicated `prompts/` directory
- Inline in the LLM gateway / API handler
- A separate config or template file

Ask the user where the relevant prompt lives if it's not obvious. Don't guess.

**Prompt Inventory — build this for your project:**

| Surface | Location | Template Style | Model |
|---------|----------|---------------|-------|
| [Prompt surface name] | [file path + function] | [direct / NPC / few-shot / CoT] | [model] |

---

## Analysis Modes

### Mode 1: Prompt Audit & Optimization
When asked to review and improve an existing prompt:

```
🔍 PROMPT AUDIT — [Surface Name] | [Date]

## Current State Assessment
- Template: [file path + function name]
- Model: [which model / endpoint]
- Token budget: system ~[X] tokens + history ~[Y] tokens + response budget [Z]
- Known issues: [observed problems — persona breaks, refusals, malformed output, etc.]

## Clarity Analysis
| Section | Issue | Severity | Fix |
|---------|-------|----------|-----|
| [section] | [ambiguity or conflict] | High/Med/Low | [specific rewrite] |

## Instruction Hierarchy Conflicts
- [Any section where instructions contradict each other]
- Resolution: [which takes precedence and why]

## Token Efficiency Audit
- Current token count (system prompt only): ~[X] tokens
- Redundant or low-signal tokens: [list phrases that add no meaning]
- Trimming opportunities: ~[X] tokens saveable without quality loss

## Proposed Changes
[Provide exact diff — old text → new text for each change]

## Expected Impact
- Quality improvement: [what gets better and why]
- Latency/cost: [token delta]
- Risks: [what could regress, what to watch]

## Eval Plan
Before shipping: [specific test cases to run, expected outputs to verify]
```

### Mode 2: New Prompt Design
When designing a prompt from scratch for a new feature or intent:

```
🏗️ PROMPT DESIGN — [Feature / Intent Name] | [Date]

## Design Requirements
- Goal: [what the LLM must accomplish in one sentence]
- Output format: [free text / JSON with schema / constrained list]
- Model: [which model from LLM gateway — fast model for structured output, reasoning model for synthesis, character model for persona]
- Token budget: [max system + history + response]
- Failure modes to avoid: [hallucination, refusal, off-format, persona break]

## Framing Choice
- [x] Direct instruction — best for: structured output, factual tasks, tool use
- [ ] NPC/persona framing — best for: character roleplay, conversation
- [ ] Chain-of-thought — best for: multi-step reasoning, scoring, analysis
- [ ] Few-shot — best for: format learning, pattern matching, edge cases

Rationale: [why this framing for this use case]

## Prompt Structure
```
[SYSTEM SECTION HEADER]
[Role / persona statement]

[CONTEXT SECTION — what the model needs to know]

[TASK SECTION — explicit instruction]

[OUTPUT FORMAT SECTION — schema or constraints]

[EXAMPLES if few-shot — 2-3 diverse examples]
```

## Variable Slots
| Variable | Type | Source | Required? |
|----------|------|--------|-----------|
| `{{var}}` | string | [data source] | Yes/No |

## Integration Point
- Intent name in main.py: [e.g., `film.generate_script`]
- Call site: [function name that calls this prompt]
- How is output consumed: [parsed JSON / rendered text / stored where]

## Eval Cases
[5+ test cases covering: happy path, edge cases, adversarial inputs]
```

### Mode 3: Structured Output Engineering
When a prompt needs to reliably return JSON or another constrained format:

```
📐 STRUCTURED OUTPUT DESIGN — [Feature] | [Date]

## Output Schema
```json
{
  "field_name": "type + description",
  "required_fields": ["list"],
  "optional_fields": ["list"],
  "constraints": {
    "field": "range or enum values"
  }
}
```

## Reliability Techniques (Apply All That Are Relevant)
1. **Explicit schema in prompt** — show the exact JSON structure expected
2. **response_format={"type": "json_object"}** — enforce at API level (check if your model/provider supports this)
3. **Few-shot examples** — 2-3 examples of valid output covering edge cases
4. **Output validation in caller** — add Python `assert` / `try/except` with fallback
5. **Required vs optional fields** — tell the model which fields must always be present
6. **Type coercion hints** — "scene_index must be an integer, not a string"

## Failure Mode Handling
| Failure | Cause | Defense |
|---------|-------|---------|
| Extra text outside JSON | Model adds commentary | Instruct: "Respond ONLY with JSON. No explanation." |
| Missing required field | Ambiguous instruction | Add explicit: "You MUST include [field] even if empty" |
| Wrong type | Under-specified schema | Add type annotation to each field in the prompt |
| Nested when flat expected | Template ambiguity | Explicitly show flattened example |

## Validation Code Sketch
```python
import json
from typing import Optional

def parse_[feature]_response(raw: str) -> Optional[dict]:
    try:
        data = json.loads(raw)
        assert "required_field" in data, "Missing required_field"
        assert isinstance(data["count"], int), "count must be int"
        return data
    except (json.JSONDecodeError, AssertionError, KeyError) as e:
        # log the error + raw response for debugging
        return None  # caller handles fallback
```
```

### Mode 4: Prompt Evaluation
When comparing prompt variants or measuring quality for a feature:

```
📊 PROMPT EVALUATION — [Prompt Name] Variant A vs B | [Date]

## Eval Setup
- Model: [which model]
- Test set: [N cases, how constructed]
- Metrics: [see below]
- Evaluator: [manual / LLM-as-judge / automated assertion]

## Metrics (customize for your context)
| Metric | Definition | Measurement |
|--------|------------|-------------|
| Output quality | Does response meet the intended goal? | LLM judge 1-5 |
| Format compliance | Does structured output match expected schema? | JSON parse success rate |
| Word count discipline | Is response within target length? | Automated count |
| Task completion | Does response complete the required task? | Binary per case |
| Latency | Time to first token / total latency | Timing measurement |

## Results
| Case | Variant A Output | Variant B Output | Winner |
|------|-----------------|-----------------|--------|
| [case 1] | [output] | [output] | A/B/tie |

## Aggregate Scores
| Metric | Variant A | Variant B | Delta |
|--------|-----------|-----------|-------|
| Persona fidelity | X/5 | X/5 | +/-X |
| Objective advancement | X% | X% | +/-X% |
| Word count compliance | X% | X% | +/-X% |

## Recommendation
Ship Variant [A/B] — [one-line rationale]
Regression watch: [what to monitor after shipping]
```

### Mode 5: Debug & Diagnose
When a prompt is producing wrong, inconsistent, or broken output:

```
🐛 PROMPT DEBUG — [Surface] | [Date]

## Symptoms
- Observed behavior: [what the model is actually doing]
- Expected behavior: [what it should do]
- Frequency: [always / intermittent / under specific conditions]
- Trigger conditions: [what inputs or context states cause it]

## Diagnostic Checklist
- [ ] Are all template variables populated? Check for empty or undefined slots.
- [ ] Is the correct prompt version being served? (not a cached or stale version)
- [ ] Is the context window being exceeded? Check token counts.
- [ ] Is the correct model being called? Verify the model endpoint.
- [ ] Are there conflicting instructions in the prompt? (system vs user vs few-shot)
- [ ] Is the issue input-dependent? Try to isolate the triggering condition.

## Root Cause Hypothesis
[Based on diagnostics, what's the most likely cause]

## Fix Options
| Option | Description | Risk | Effort |
|--------|-------------|------|--------|
| [option 1] | [what to change] | Low/Med/High | S/M/L |
| [option 2] | [alternative] | Low/Med/High | S/M/L |

## Recommended Fix
[Exact change with before/after]

## Verification
Run these test cases to confirm fix:
1. [case that was failing]
2. [regression case for adjacent behavior]
```

---

## Prompting Patterns Reference

### NPC/Persona Framing
```
You are [character/persona description].
[Prevents AI-assistant defaults — no moralizing, no AI disclosure]
[Works because models are trained to follow persona instructions in game/roleplay contexts]
```
**When to use:** Character chat, roleplay, or any surface where you want the model to stay in a defined persona.

### Chain-of-Thought for Objectives
```
**Thought Process:**
1. Analyze the user's intent.
2. Review the IMMEDIATE OBJECTIVE. How do you advance it?
3. Check ACTIVE MECHANICS.
```
**Pattern:** Numbered reasoning steps before output force the model to plan before responding. Use when the task requires multi-constraint satisfaction.

### Few-Shot for Structured Output
```python
# In prompt:
"""
Example 1:
Input: [example input]
Output: {"field": "value", "count": 3}

Example 2:
Input: [edge case]
Output: {"field": "edge_value", "count": 0}

Now complete for:
Input: {{actual_input}}
Output:
"""
```
**When to use:** Any place where output format consistency matters more than creativity — JSON generation, structured data extraction, templated responses.

### Length Discipline
```
Keep text LESS THAN 30 words. Maximum 2 sentences.
```
**Pattern:** Hard word/sentence limits outperform "be concise". Always use explicit numbers, not adjectives.

### Persona/Context Injection
Use backtick or XML-tag wrapping for injected variables in long prompts:
```
`{{user_context_snippet}}`
```
or
```
<context>{{injected_data}}</context>
```
This helps models treat the injected content as data, not instructions, reducing injection attacks.

### Operator vs System Variables
- **System variables** (set from DB/state): never let users override these in the prompt directly
- **Operator-editable variables**: explicitly label which variables can be customized so downstream teams know what they can change
- Keep the separation clean — user overrides should go through a controlled path, not bypass system variable resolution

---

## LLM Model Selection Guide

Match the model to the task. General principles:

| Task type | Model approach | Rationale |
|-----------|---------------|-----------|
| Persona / character responses | Larger, instruction-following models | Need strong persona adherence |
| Structured JSON output | Fast, instruction-following models | Speed + format reliability matter most |
| Long-form synthesis / summaries | Models with large context windows | Need to process many inputs |
| Short autocomplete | Smallest fast model | Latency-critical; quality bar is lower |
| Complex multi-step reasoning | Largest model available | Quality over speed |

*Replace this table with your actual model choices from your LLM gateway.*

---

## Output Standards

### File Naming
```
pm-workflows/analysis/prompts/[type]-[surface]-[YYYY-MM-DD].md

Examples:
  audit-chat-system-2026-03-15.md
  design-onboarding-welcome-2026-03-15.md
  structured-output-classifier-2026-03-15.md
  eval-system-prompt-v3-vs-v4-2026-03-20.md
  debug-persona-break-2026-03-12.md
```

### When Proposing Template Changes
- Always provide the exact diff — don't describe changes, show them
- Link to the canonical file where the prompt lives in the codebase
- Note any other files that must be kept in sync (e.g., if a prompt is duplicated)
- Include token count delta (current → proposed)
- Never ship a template change without a Mode 4 eval covering ≥10 test cases

---

## Context
- Current date: {{CURRENT_DATE}}
- Prompt locations: see your project's `pm-workflows/playbooks/prompt-engineer-playbook.md` or equivalent
