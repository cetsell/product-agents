#!/usr/bin/env node
// Scrub check: fails if install-specific context leaks back into the repo.
//
// team-os started life inside one team's install. This check keeps that team's
// paths, metrics, tools, and people out of the generic template so a fresh clone
// never reasons from someone else's context.
//
// Scans every git-tracked file (what CI sees). Run before each commit:
//   node scripts/scrub-check.mjs          # report; exit 1 on any hit
//   node scripts/scrub-check.mjs --list   # print the deny-list
//
// To add a term: append to DENY with a short reason. To allow a legitimate
// occurrence, add it to ALLOW (file + exact substring), never weaken a pattern.

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SELF = "scripts/scrub-check.mjs";

const DENY = [
  { re: /pm-workflows\//, why: "old install's output folder; use product/, team/, gtm/" },
  { re: /\bSTXT\b/i, why: "original install name" },
  { re: /Digital Twin/i, why: "original install's North Star; read product/context.md" },
  { re: /\$260\b/, why: "original install's baseline metric" },
  { re: /Supernormal|Granola/i, why: "named meeting tool; say 'your meeting-notes tool'" },
  { re: /fe-main/, why: "original install's app repo; use engineering/conventions.template.md" },
  { re: /TrafficJunky/i, why: "original install's ad channel" },
  { re: /billboard/i, why: "original install's launch campaign" },
  { re: /mcp__lenny/, why: "dead MCP server" },
  { re: /\b(Chad|Erin|Eric|Ilia|Karen)\b/, why: "personal name; use a role (PM, Eng Lead, GTM Lead, Analytics)" },
];

// Exact substrings allowed in specific files (author / maintainer metadata).
const ALLOW = [
  { file: "README.md", text: "Chad Etsell" },
  { file: ".claude-plugin/plugin.json", text: "Chad Etsell" },
  { file: ".claude-plugin/marketplace.json", text: "Chad Etsell" },
  { file: "package.json", text: "Chad Etsell" },
];

if (process.argv.includes("--list")) {
  for (const d of DENY) console.log(`${d.re}  — ${d.why}`);
  process.exit(0);
}

let files;
try {
  files = execSync("git ls-files -z", { cwd: ROOT, encoding: "utf8" })
    .split("\0")
    .filter(Boolean);
} catch {
  console.error("scrub-check: not a git repository (run from a clone)");
  process.exit(2);
}

const hits = [];
for (const file of files) {
  if (file === SELF) continue;
  if (/ \d+\.[A-Za-z0-9]+$/.test(file)) {
    hits.push({ file, line: 0, match: file, why: "sync-conflict duplicate (e.g. 'name 2.md'); delete it" });
    continue;
  }
  let text;
  try {
    text = readFileSync(join(ROOT, file), "utf8");
  } catch {
    continue; // deleted in working tree, or unreadable
  }
  if (text.includes("\0")) continue; // binary
  const allowed = ALLOW.filter((a) => a.file === file).map((a) => a.text);
  text.split("\n").forEach((line, i) => {
    let scrubbed = line;
    for (const a of allowed) scrubbed = scrubbed.split(a).join("");
    for (const d of DENY) {
      const m = scrubbed.match(d.re);
      if (m) hits.push({ file, line: i + 1, match: m[0], why: d.why });
    }
  });
}

if (hits.length) {
  for (const h of hits) console.log(`${h.file}:${h.line}  "${h.match}"  — ${h.why}`);
  console.log(`\nscrub-check: ${hits.length} hit(s) in ${new Set(hits.map((h) => h.file)).size} file(s)`);
  process.exit(1);
}
console.log(`scrub-check: clean (${files.length} tracked files)`);
