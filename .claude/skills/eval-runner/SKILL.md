---
name: eval-runner
description: >
  Automated prompt evaluation for AI product features. Runs test conversations
  against prompt variants, scores with LLM-as-judge, produces comparison tables.
  Use when the user says "eval," "run evals," "compare prompts," "test these
  variants," "which prompt is better," "score these," "prompt evaluation,"
  "eval-runner," or wants to compare two or more prompt approaches systematically.
  Also trigger on: "run the eval," "how does variant A compare to B," "test the
  stage variants."
---

# Eval Runner

**Role:** Automated prompt evaluator for AI products
**Output:** `pm-workflows/analysis/prompts/eval-[name]-[date].md`

## How It Works

```
User provides: variant files (or "all stage variants")
                            ↓
            1. Load prompt variants from files
            2. Load or generate test cases
            3. Run each test case as a simulated multi-turn conversation
            4. Score each response with LLM-as-judge (Claude = the judge)
            5. Produce comparison table + recommendation
```

**Key design:** The eval runner does NOT call the production API. It calls the LLM directly to keep it independent of the runtime pipeline and lets us eval prompts that aren't deployed yet.

## Inputs

The user provides:
1. **Variant files** — paths to prompt variant .md files (or "all stage variants" to load from `dev/docs/prompting docs/prompt variants/`)
2. **Test cases** — either a test case file, or the user describes scenarios and the skill generates them
3. **Config** (optional):
   - Turns per conversation (default: 10)
   - Generation model (default: match whatever model is used in production)
   - Judge model: Claude (the current session — self-judge via structured reasoning)
   - Character persona: default test persona (below) or user-specified

## Default Test Persona

When no specific character is provided, use this test persona to fill `{{char_*}}` template variables:

```
char_name: Mia
char_age: 24
char_occupation: fitness trainer and lifestyle influencer
char_interests: yoga, hiking, cooking, photography
char_description: athletic build, long dark hair, warm brown eyes, always smiling
char_personality_traits: confident, playful, direct, a little competitive, secretly romantic
```

## Test Case Format

Each test case is a sequence of user messages simulating a user archetype:

```yaml
- name: "Friendly opener"
  user_messages:
    - "hey! what's up"
    - "haha that's cute, i'm jake from miami"
    - "yeah just got home from work, pretty tired"
    - "lol what are you wearing rn"
    - "mmm that sounds nice"
    - "you're really fun to talk to"
    - "tell me more about yourself"
    - "that's actually really interesting"
    - "i wish i was there with you"
    - "what would you do if i was?"
```

The eval runner sends `user_messages[0]`, gets a response, sends `user_messages[1]`, gets a response, etc. If the conversation goes beyond scripted messages, the eval runner stops at the last scripted message.

## Standard Test Suite

If the user doesn't provide test cases, use these 5 standard scenarios (10 messages each):

1. **Friendly opener** — casual, responsive, shares when asked
2. **Terse/low-effort** — "hey" / "ok" / "cool" / "lol" responses
3. **Sexually forward** — explicit opener, stays forward throughout
4. **Personal sharer** — volunteers name, location, feelings immediately
5. **Mixed signals** — flirty → distant → "sorry was busy" → flirty again

Generate the full 10-message scripts for each before running.

## Scoring (LLM-as-Judge)

After each full conversation, score using this judge prompt:

```
You are evaluating an AI character's conversation performance. You will see a system
prompt and a full conversation transcript. Score the character on these criteria
(1-5 each):

1. PHASE PROGRESSION: Does the character's behavior change across the conversation?
   Does it start different from how it ends? Is there a clear arc?
   1=identical behavior throughout, 5=clear natural progression

2. AHA MOMENT: Is there a point where the conversation feels personal — where the
   character references something the user said, or creates a moment of genuine
   connection?
   1=never feels personal, 5=specific surprising callback that feels real

3. CLIFFHANGER: Does the conversation's final messages create an unresolved thread?
   Something the user would want to come back to find out?
   1=conversation ends flat, 5=irresistible unresolved moment

4. TONE: Does the character sound like a real person texting? Casual, text-speak,
   emojis? Or does it drift into formal/literary/AI-assistant prose?
   1=clearly AI/formal, 5=indistinguishable from a real person texting

5. FLEXIBILITY: When the user does something unexpected, does the character adapt
   smoothly? Or does it ignore the input and continue a scripted path?
   1=ignores user input, 5=seamlessly adapts to anything

6. BREVITY: Are responses ≤30 words and ≤2 sentences as instructed?
   1=regularly exceeds limits, 5=consistently tight and punchy

Respond in this exact JSON format:
{
  "phase_progression": {"score": N, "note": "one line"},
  "aha_moment": {"score": N, "note": "one line"},
  "cliffhanger": {"score": N, "note": "one line"},
  "tone": {"score": N, "note": "one line"},
  "flexibility": {"score": N, "note": "one line"},
  "brevity": {"score": N, "note": "one line"},
  "overall": N,
  "best_moment": "quote the single best character message",
  "worst_moment": "quote the single worst character message"
}
```

## Execution Flow

### Step 1: Prepare

1. Read each variant file
2. Substitute test persona variables into the prompt template using `{{key}}` replacement
3. Generate or load test case scripts

### Step 2: Run Conversations

Create a temporary Python script that:

```python
# Pseudocode — the skill generates and executes this via Bash

import os, json, requests

LLM_API_KEY = os.getenv("LLM_API_KEY")
API_URL = os.getenv("LLM_API_URL", "https://api.openai.com/v1/chat/completions")

def run_conversation(system_prompt, user_messages, model="gpt-4o-mini"):
    messages = [{"role": "system", "content": system_prompt}]
    transcript = []

    for user_msg in user_messages:
        messages.append({"role": "user", "content": user_msg})
        response = requests.post(API_URL, headers={
            "Authorization": f"Bearer {LLM_API_KEY}",
            "Content-Type": "application/json"
        }, json={
            "model": model,
            "messages": messages,
            "max_tokens": 150,
            "temperature": 0.8
        })
        assistant_msg = response.json()["choices"][0]["message"]["content"]
        messages.append({"role": "assistant", "content": assistant_msg})
        transcript.append({"user": user_msg, "assistant": assistant_msg})

    return transcript

# For each variant × each test case, run and save transcript
for variant in variants:
    for test_case in test_cases:
        transcript = run_conversation(variant["system_prompt"], test_case["user_messages"])
        # Save to JSON file
```

The Python script handles the API calls. The skill (Claude) reads the transcripts and produces the judge scores.

### Step 3: Score

For each completed conversation transcript:
1. Feed the system prompt + full transcript to the judge prompt (above)
2. Claude scores each criterion 1-5
3. Collect scores for aggregation

### Step 4: Aggregate and Report

**Env vars needed** (set in .env):
- `LLM_API_KEY` — for LLM generation calls
- `LLM_API_URL` — your LLM endpoint (defaults to OpenAI-compatible endpoint)

## Output Format

```markdown
# Prompt Eval — [Name] | [Date]

## Setup
- Model: [model]
- Test cases: [N]
- Turns per case: [N]
- Judge: Claude (self-eval)

## Results

### Per-Variant Scores

| Metric | Control | Variant A | Variant B | ... |
|--------|---------|-----------|-----------|-----|
| Phase Progression | X.X | X.X | X.X | |
| Aha Moment | X.X | X.X | X.X | |
| Cliffhanger | X.X | X.X | X.X | |
| Tone | X.X | X.X | X.X | |
| Flexibility | X.X | X.X | X.X | |
| Brevity | X.X | X.X | X.X | |
| **Overall** | **X.X** | **X.X** | **X.X** | |

### Best & Worst Moments

**Variant A — Best:** "[quote]" (test case: Friendly opener)
**Variant A — Worst:** "[quote]" (test case: Terse user)
...

### Per-Test-Case Breakdown

| Test Case | Metric | Control | Variant A | Variant B |
|-----------|--------|---------|-----------|-----------|
[Full breakdown: each variant × each test case × each score]

## Recommendation

Ship Variant [X] — [rationale]
Runner-up: [X] — [why]
Kill: [X] — [why]
```
