#!/usr/bin/env node
// Skill and agent conformance linter — Layer 1 of skill evals.
//
// Skills (.claude/skills/*/SKILL.md) are scored against the quality bar in
// docs/sources/product-skills.md: frontmatter, role line, outcome line, an
// explicit TERMINATION condition, a size cap, and (for producer skills) a
// structured output shape. Frontmatter is checked against the fields Claude
// Code documents (code.claude.com/docs/en/skills, /sub-agents); unknown keys
// are silently ignored at runtime, so they are flagged here instead.
//
// Agents (.claude/agents/*.md) and proactive/runs.yml are checked for the
// cross-references that break silently: preloaded or scheduled skills that do
// not exist or cannot be model-invoked, removed tools, invalid enum values.
//
// Usage:
//   node check-skills.mjs            # report; exit 1 on hard failures
//   node check-skills.mjs --strict   # warnings fail too (CI uses this)
//   node check-skills.mjs --json     # machine-readable output

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = dirname(fileURLToPath(import.meta.url));
const SKILLS_DIR = join(ROOT, ".claude", "skills");
const AGENTS_DIR = join(ROOT, ".claude", "agents");
const RUNS_FILE = join(ROOT, "proactive", "runs.yml");

const strict = process.argv.includes("--strict");
const asJson = process.argv.includes("--json");

// Reference skills answer from a body of knowledge: exempt only from the
// output-shape rule.
const REFERENCE_SKILLS = new Set(["marketing-psychology"]);
const MAX_LINES = 300; // SKILL.md loads in full on every invocation
const MAX_LISTING_CHARS = 1536; // description + when_to_use are truncated past this

const SKILL_KEYS = new Set([
  "name", "description", "when_to_use", "argument-hint", "arguments",
  "disable-model-invocation", "user-invocable", "allowed-tools", "disallowed-tools",
  "model", "effort", "context", "agent", "background", "hooks", "paths", "shell",
  "metadata", "license", "compatibility",
]);
const AGENT_KEYS = new Set([
  "name", "description", "tools", "disallowedTools", "model", "permissionMode",
  "maxTurns", "skills", "mcpServers", "hooks", "memory", "background", "omitClaudeMd",
  "effort", "isolation", "color", "initialPrompt",
]);
const MODEL_RE = /^(opus|sonnet|haiku|fable|best|inherit|claude-[a-z0-9-]+)$/;
const EFFORTS = new Set(["low", "medium", "high", "xhigh", "max"]);
const PERMISSION_MODES = new Set(["default", "manual", "acceptEdits", "auto", "dontAsk", "bypassPermissions", "plan"]);
const MEMORY = new Set(["user", "project", "local"]);
const REMOVED_TOOLS = ["TodoWrite", "TaskOutput"];

// --- minimal frontmatter parser: top-level keys, inline values, folded blocks,
// and inline or dash lists. Enough for the fields this repo uses; no deps.
function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const fm = {};
  const lines = m[1].split("\n");
  for (let i = 0; i < lines.length; i++) {
    const kv = lines[i].match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    const [, key, raw] = kv;
    const block = [];
    while (i + 1 < lines.length && /^(\s+|$)/.test(lines[i + 1]) && !/^[A-Za-z_]/.test(lines[i + 1])) {
      block.push(lines[++i]);
    }
    let val = raw.trim();
    if (/^[>|][-+]?$/.test(val)) val = block.map((l) => l.trim()).filter(Boolean).join(" ");
    else if (val === "" && block.some((l) => /^\s*-\s/.test(l)))
      val = block.filter((l) => /^\s*-\s/.test(l)).map((l) => l.replace(/^\s*-\s*/, "").replace(/^["']|["']$/g, ""));
    else if (val === "") val = block.join("\n");
    else if (/^\[.*\]$/.test(val)) val = val.slice(1, -1).split(",").map((s) => s.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
    else val = val.replace(/^["']|["']$/g, "");
    fm[key] = val;
  }
  return fm;
}
const asList = (v) => (Array.isArray(v) ? v : typeof v === "string" ? v.split(/[,\s]+/).filter(Boolean) : []);
const truthy = (v) => v === true || v === "true";

const hasRoleLine = (b) =>
  /\*\*Role:\*\*/i.test(b) || /^Role:/im.test(b) || /^You are /im.test(b) ||
  /^#\s.*\b(Agent|Engine|Advisor|Partner|Editor|Reference|Auditor)\b/im.test(b);
const hasOutputShape = (b) =>
  /^#{1,3}\s.*(output|deliverable|format|report)/im.test(b) || /write into this shape/i.test(b) ||
  /\*\*Output:\*\*/i.test(b) || /output directory/i.test(b);
const hasTermination = (b) => /^#{1,3}\s*TERMINATION/im.test(b) || /\bTERMINATION:/.test(b) || /\bstop when\b/i.test(b);

const results = [];
const push = (kind, name, tier, errors, warns) => results.push({ kind, name, tier, errors, warns });
const soft = (errors, warns) => (msg) => (strict ? errors : warns).push(msg);

// --- skills
const skills = {};
for (const name of readdirSync(SKILLS_DIR, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort()) {
  const file = join(SKILLS_DIR, name, "SKILL.md");
  if (!existsSync(file)) continue;
  const text = readFileSync(file, "utf8");
  const fm = parseFrontmatter(text);
  const body = text.replace(/^---\n[\s\S]*?\n---/, "");
  skills[name] = fm || {};
  const isRef = REFERENCE_SKILLS.has(name);
  const errors = [], warns = [];
  const w = soft(errors, warns);

  if (!fm) errors.push("no frontmatter");
  else {
    if (!fm.name) errors.push("frontmatter missing `name`");
    else if (fm.name !== name) errors.push(`name \`${fm.name}\` does not match folder`);
    if (!fm.description) errors.push("frontmatter missing `description`");
    else if (fm.description.length < 40) w("description is thin (<40 chars)");
    const listing = `${fm.description || ""} ${fm.when_to_use || ""}`.trim().length;
    if (listing > MAX_LISTING_CHARS) errors.push(`description + when_to_use = ${listing} chars (> ${MAX_LISTING_CHARS}, truncated in listing)`);
    for (const k of Object.keys(fm)) if (!SKILL_KEYS.has(k)) w(`unknown frontmatter key \`${k}\` (ignored by Claude Code)`);
    if (fm.model && !MODEL_RE.test(fm.model)) errors.push(`invalid model \`${fm.model}\``);
    if (fm.effort && !EFFORTS.has(fm.effort)) errors.push(`invalid effort \`${fm.effort}\``);
    if (fm.context && fm.context !== "fork") errors.push(`invalid context \`${fm.context}\` (only \`fork\`)`);
  }
  if (!hasRoleLine(body)) errors.push("no role line");
  if (!/^\*\*Outcome:\*\*/m.test(body)) w("no **Outcome:** line");
  if (!hasTermination(body)) w("no TERMINATION condition");
  const lines = text.split("\n").length;
  if (lines > MAX_LINES) w(`${lines} lines (max ${MAX_LINES}; move detail to references/)`);
  if (!isRef && !hasOutputShape(body)) w("no structured output shape");
  push("skill", name, isRef ? "reference" : "producer", errors, warns);
}
const noModelInvoke = new Set(Object.entries(skills).filter(([, fm]) => truthy(fm["disable-model-invocation"])).map(([n]) => n));

// --- agents
if (existsSync(AGENTS_DIR)) {
  for (const f of readdirSync(AGENTS_DIR).filter((f) => f.endsWith(".md")).sort()) {
    const fm = parseFrontmatter(readFileSync(join(AGENTS_DIR, f), "utf8")) || {};
    const errors = [], warns = [];
    const w = soft(errors, warns);
    const name = fm.name || f.replace(/\.md$/, "");
    if (!fm.name) errors.push("frontmatter missing `name`");
    else if (fm.name.includes(":")) errors.push("agent name contains `:`");
    if (!fm.description) errors.push("frontmatter missing `description`");
    for (const k of Object.keys(fm)) if (!AGENT_KEYS.has(k)) w(`unknown frontmatter key \`${k}\` (ignored by Claude Code)`);
    for (const t of asList(fm.tools)) if (REMOVED_TOOLS.includes(t)) errors.push(`tools lists \`${t}\` (not available on Claude 5 models by default)`);
    if (fm.model && !MODEL_RE.test(fm.model)) errors.push(`invalid model \`${fm.model}\``);
    if (fm.effort && !EFFORTS.has(fm.effort)) errors.push(`invalid effort \`${fm.effort}\``);
    if (fm.permissionMode && !PERMISSION_MODES.has(fm.permissionMode)) errors.push(`invalid permissionMode \`${fm.permissionMode}\``);
    if (fm.memory && !MEMORY.has(fm.memory)) errors.push(`invalid memory \`${fm.memory}\``);
    if (fm.isolation && fm.isolation !== "worktree") errors.push(`invalid isolation \`${fm.isolation}\``);
    if (fm.maxTurns && !/^\d+$/.test(fm.maxTurns)) errors.push("maxTurns must be an integer");
    const pre = asList(fm.skills);
    if (pre.length > 32) errors.push(`preloads ${pre.length} skills (max 32)`);
    for (const s of pre) {
      if (!skills[s]) errors.push(`preloads unknown skill \`${s}\``);
      else if (noModelInvoke.has(s)) errors.push(`preloads \`${s}\`, which has disable-model-invocation`);
    }
    push("agent", name, "agent", errors, warns);
  }
}

// --- deny-list (WS1 scrub) rides along so one command covers conformance
const scrub = spawnSync(process.execPath, [join(ROOT, "scripts", "scrub-check.mjs")], { encoding: "utf8" });
if (scrub.status !== null) {
  const errors = scrub.status === 0 ? [] : [`scrub-check: ${(scrub.stdout.trim().split("\n").pop() || "failed")}`];
  push("scrub", "scripts/scrub-check.mjs", "deny-list", errors, []);
}

if (asJson) console.log(JSON.stringify(results, null, 2));
else {
  const pad = Math.max(...results.map((r) => r.name.length));
  for (const r of results) {
    const status = r.errors.length ? "FAIL" : r.warns.length ? "warn" : "ok  ";
    const notes = [...r.errors.map((e) => `ERR:${e}`), ...r.warns].join("; ");
    console.log(`${status}  ${r.name.padEnd(pad)}  [${r.tier}]${notes ? "  " + notes : ""}`);
  }
  const s = results.filter((r) => r.kind === "skill");
  const fails = results.filter((r) => r.errors.length).length;
  const warned = results.filter((r) => !r.errors.length && r.warns.length).length;
  console.log(`\n${s.length} skills, ${results.length - s.length} other checks — ${results.length - fails - warned} ok, ${warned} warn, ${fails} fail`);
}
process.exit(results.some((r) => r.errors.length) ? 1 : 0);
