# Decisions

Log of product decisions — what we decided, why, and whether it worked.

## Files

| File | What it is | When to read |
|------|-----------|--------------|
| `decisions.md` | Active decision log with accountability tracking | "Why did we decide X?" or reviewing past decisions |
| `principles.md` | Standing rules compressed from decisions, each with a source and status; `/judge` applies the `active` ones | "Do we have a rule about X?" before asking the PM |
| `questions.md` | Queue of taste and scope questions with judge verdicts (decided / sent back / held) | "What is waiting on the PM?" or before filing a question that may already be answered |

## How It Works

- Add a row when you **decide** something, not when you ship it
- Include what you decided NOT to do
- Check the "Result" column every 2 weeks
- Monthly review: 5 questions about decision quality (template at bottom of file)
- A decision that comes up again becomes a row in `principles.md`; a question nobody has decided goes to `questions.md`, not to chat. `/judge` clears the queue; the PM answers only `held` rows, in the Friday note.
