#!/usr/bin/env node
/**
 * Resolve and validate the custom-domain map.
 *
 * Reads src/data/domain-map.ts, checks every entry points at an existing
 * customer, and prints the domain → path table a future deploy step
 * (Vercel rewrites / edge middleware / CNAME provisioning) will consume.
 *
 * Usage:
 *   npm run domains:map            # human-readable table
 *   npm run domains:map -- --json  # machine-readable JSON on stdout
 */

import { readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CUSTOMERS_DIR = path.join(ROOT, "src", "data", "customers");
const DOMAIN_MAP_FILE = path.join(ROOT, "src", "data", "domain-map.ts");

const { domainMap } = await import(pathToFileURL(DOMAIN_MAP_FILE).href);

const slugs = new Set(
  (await readdir(CUSTOMERS_DIR))
    .filter((name) => name.endsWith(".ts"))
    .map((name) => name.replace(/\.ts$/, "")),
);

const rows = [];
let hasError = false;

for (const [domain, slug] of Object.entries(domainMap)) {
  const exists = slugs.has(slug);
  if (!exists) hasError = true;
  rows.push({ domain, slug, path: `/profiles/${slug}/`, exists });
}

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(rows, null, 2));
} else {
  console.log("domain map (src/data/domain-map.ts):\n");
  for (const row of rows) {
    const mark = row.exists ? "✔" : "✖ missing customer";
    console.log(`  ${row.domain}  →  ${row.path}  ${mark}`);
  }
  console.log(
    "\nDNS/CNAME is intentionally not configured yet — see docs/DOMAIN_STRATEGY.md",
  );
}

if (hasError) {
  console.error("\n✖ some domains point at customers that do not exist");
  process.exit(1);
}
