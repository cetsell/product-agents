#!/usr/bin/env node
// SessionStart hook: puts the current bet and any stale planning artifacts in
// front of Claude at the start of every session. Plain stdout from a
// SessionStart hook is added to Claude's context.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const read = (p) => (existsSync(join(root, p)) ? readFileSync(join(root, p), "utf8") : null);
const today = new Date();
const out = [];

// Newest YYYY-MM-DD in a file, preferring a "Last updated" line.
function lastDate(text) {
  const lu = text.match(/Last updated:\**\s*(\d{4}-\d{2}-\d{2})/i);
  if (lu) return lu[1];
  const all = text.match(/\d{4}-\d{2}-\d{2}/g);
  return all ? all.sort().at(-1) : null;
}
const ageDays = (d) => Math.floor((today - new Date(d + "T00:00:00Z")) / 86400000);

const bet = read("product/roadmap/current-bet.md");
if (bet) {
  const believe = bet.match(/\*\*We believe\*\*\s*(.+)/);
  const know = bet.match(/\*\*We'll know it worked when\*\*\s*(.+)/);
  if (believe && !believe[1].includes("[")) {
    out.push(`Current bet: we believe ${believe[1].trim()}`);
    if (know) out.push(`Success: ${know[1].trim()}`);
  } else {
    out.push("Current bet: product/roadmap/current-bet.md is still a template.");
  }
}

const ctx = read("product/context.md");
if (ctx && /\{\{[^}]+\}\}/.test(ctx)) {
  out.push("product/context.md still has {{placeholders}}; strategy, cadence, and audit skills will mark claims that depend on it as assumed.");
}

const windows = [
  ["product/roadmap/current-bet.md", 7],
  ["product/roadmap/betting-table.md", 14],
  ["product/roadmap/roadmap.md", 14],
  ["product/roadmap/experiment-roadmap.md", 14],
  ["product/context.md", 30],
];
const stale = [];
for (const [p, max] of windows) {
  const t = read(p);
  if (!t) continue;
  const d = lastDate(t);
  if (d && ageDays(d) > max) stale.push(`${p} (${ageDays(d)}d old, window ${max}d)`);
}
if (stale.length) out.push(`Stale: ${stale.join("; ")}. Cite with dates or refresh before deciding on them.`);

if (out.length) console.log(["[product-agents]", ...out].join("\n"));
