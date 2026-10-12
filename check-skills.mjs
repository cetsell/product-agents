#!/usr/bin/env node
// Skill conformance linter — Layer 1 of skill evals.
// Scores every .claude/skills/*/SKILL.md against the quality bar from
// docs/sources/product-skills.md: frontmatter, role line, outcome line, an
// explicit TERMINATION condition, a size cap, and (for producer skills) a
// structured output shape.
//
// Usage:
//   node check-skills.mjs            # report; exit 1 only on hard failures
//   node check-skills.mjs --strict   # exit 1 on any producer-rule miss too
//   node check-skills.mjs --json     # machine-readable output
//
// Producer vs reference: reference skills are exempt only from the output-shape
// rule. Maintain that set below as skills are added.

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const SKILLS_DIR = join(ROOT, ".claude", "skills");

// Reference/knowledge skills: role line and TERMINATION required, but not a
// fixed output shape — they answer from a body of knowledge rather than produce
// an artifact. Every other skill is a producer.
const REFERENCE_SKILLS = new Set(["marketing-psychology"]);

// Progressive disclosure: SKILL.md loads in full on every invocation. Long
// reference material belongs in references/*.md inside the skill folder.
const MAX_LINES = 300;

const strict = process.argv.includes("--strict");
const asJson = process.argv.includes("--json");

function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2];
  }
  // Folded/literal block scalars (`description: >` or `|`) carry their text on the
  // following indented lines — the value on the key line is just the indicator.
  if (/^[>|][-+]?$/.test((fm.description || "").trim())) fm.description = "(block)";
  return fm;
}

function hasRoleLine(body) {
  return (
    /\*\*Role:\*\*/i.test(body) ||
    /^Role:/im.test(body) ||
    /^You are /im.test(body) ||
    /^#\s.*\b(Agent|Engine|Advisor|Partner|Editor|Reference|Auditor)\b/im.test(body)
  );
}

function hasOutputShape(body) {
  return (
    /^#{1,3}\s.*(output|deliverable|format|report)/im.test(body) ||
    /write into this shape/i.test(body) ||
    /\*\*Output:\*\*/i.test(body) ||
    /output directory/i.test(body)
  );
}

function hasTermination(body) {
  return (
    /^#{1,3}\s*TERMINATION/im.test(body) ||
    /\bTERMINATION:/.test(body) ||
    /\bstop when\b/i.test(body)
  );
}

const dirs = readdirSync(SKILLS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

const results = [];
for (const name of dirs) {
  const file = join(SKILLS_DIR, name, "SKILL.md");
  if (!existsSync(file)) continue;
  const text = readFileSync(file, "utf8");
  const fm = parseFrontmatter(text);
  const body = text.replace(/^---\n[\s\S]*?\n---/, "");
  const isRef = REFERENCE_SKILLS.has(name);

  const errors = [];
  const warns = [];

  // Hard rules (all skills)
  if (!fm) errors.push("no frontmatter");
  else {
    if (!fm.name) errors.push("frontmatter missing `name`");
    if (!fm.description) errors.push("frontmatter missing `description`");
    else if (fm.description !== "(block)" && fm.description.length < 40)
      warns.push("description is thin (<40 chars) — weak triggering");
  }
  if (!hasRoleLine(body)) errors.push("no role line");

  // Every skill: outcome line, TERMINATION, size cap
  if (!/^\*\*Outcome:\*\*/m.test(body)) (strict ? errors : warns).push("no **Outcome:** line");
  if (!hasTermination(body)) (strict ? errors : warns).push("no TERMINATION condition");
  const lines = text.split("\n").length;
  if (lines > MAX_LINES) (strict ? errors : warns).push(`${lines} lines (max ${MAX_LINES}; move detail to references/)`);

  // Producer-only rule
  if (!isRef && !hasOutputShape(body)) (strict ? errors : warns).push("no structured output shape");

  results.push({ name, tier: isRef ? "reference" : "producer", errors, warns });
}

if (asJson) {
  console.log(JSON.stringify(results, null, 2));
} else {
  const pad = Math.max(...results.map((r) => r.name.length));
  for (const r of results) {
    const status = r.errors.length ? "FAIL" : r.warns.length ? "warn" : "ok  ";
    const notes = [...r.errors.map((e) => `ERR:${e}`), ...r.warns].join("; ");
    console.log(
      `${status}  ${r.name.padEnd(pad)}  [${r.tier}]${notes ? "  " + notes : ""}`
    );
  }
  const fails = results.filter((r) => r.errors.length).length;
  const warned = results.filter((r) => !r.errors.length && r.warns.length).length;
  console.log(
    `\n${results.length} skills — ${results.length - fails - warned} ok, ${warned} warn, ${fails} fail`
  );
}

const exitFail = results.some((r) => r.errors.length);
process.exit(exitFail ? 1 : 0);
