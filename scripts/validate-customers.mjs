#!/usr/bin/env node
/**
 * Validate every customer file in src/data/customers/.
 *
 * Errors (exit 1): missing required fields, invalid theme/layout,
 * privacy violations (address/birthDate present, hideAddress/hideBirthDate
 * not true), broken proofs.
 * Warnings (exit 0): thin content, missing photo file, exposed phone,
 * published profile without email.
 *
 * Requires Node >= 22.18 (native TypeScript type stripping) to import
 * the .ts data files directly.
 */

import { readdir, readFile, access } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CUSTOMERS_DIR = path.join(ROOT, "src", "data", "customers");
const PUBLIC_DIR = path.join(ROOT, "public");

const THEMES = ["navy-black-white", "warm-editorial", "graphite-minimal", "cobalt-air"];
const LAYOUTS = ["editorial-split", "dossier", "magazine", "minimal-card"];
const STATUSES = ["draft", "published"];
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Fields that must never exist. Checked against raw source so even a
// commented-out or renamed variant gets flagged for review.
const FORBIDDEN_KEYS = [/\baddress\s*:/, /\bbirthDate\s*:/, /\bbirthday\s*:/];

const errors = [];
const warnings = [];

function err(file, message) {
  errors.push(`  ✖ [${file}] ${message}`);
}

function warn(file, message) {
  warnings.push(`  ⚠ [${file}] ${message}`);
}

const LOCALES = ["ko", "en"];

/**
 * Unwrap a LocalizedString (plain string or { ko, en }) to its Korean text.
 * Returns null when the shape is invalid.
 */
function localizedText(value) {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && typeof value.ko === "string") {
    return value.ko;
  }
  return null;
}

function requireText(file, value, label) {
  const text = localizedText(value);
  if (text === null || text.trim() === "") {
    err(file, `${label} is missing or empty`);
    return false;
  }
  const en = typeof value === "object" ? value.en : undefined;
  if (text.includes("TODO") || (typeof en === "string" && en.includes("TODO"))) {
    warn(file, `${label} still contains TODO`);
  }
  if (typeof value === "object" && (typeof en !== "string" || en.trim() === "")) {
    err(file, `${label} is localized but its "en" text is missing or empty`);
    return false;
  }
  return true;
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

let entries;
try {
  entries = (await readdir(CUSTOMERS_DIR)).filter((name) => name.endsWith(".ts"));
} catch {
  console.error(`✖ customers directory not found: ${CUSTOMERS_DIR}`);
  process.exit(1);
}

if (entries.length === 0) {
  console.error("✖ no customer files found in src/data/customers/");
  process.exit(1);
}

const seenSlugs = new Map();

for (const entry of entries) {
  const file = `src/data/customers/${entry}`;
  const absolute = path.join(CUSTOMERS_DIR, entry);

  // 1. Raw-source privacy scan.
  const source = await readFile(absolute, "utf8");
  for (const pattern of FORBIDDEN_KEYS) {
    if (pattern.test(source)) {
      err(file, `forbidden field matching ${pattern} — never store address/birth date`);
    }
  }

  // 2. Import the module (Node >= 22.18 strips types natively).
  let profile;
  try {
    ({ profile } = await import(pathToFileURL(absolute).href));
  } catch (cause) {
    if (cause?.code === "ERR_UNKNOWN_FILE_EXTENSION") {
      console.error(
        "✖ this validator needs Node >= 22.18 (native TypeScript imports).\n" +
          `  current: ${process.version}`,
      );
      process.exit(1);
    }
    err(file, `failed to import: ${cause.message}`);
    continue;
  }

  if (!profile || typeof profile !== "object") {
    err(file, 'must export "profile" (CustomerProfile object)');
    continue;
  }

  // 3. Identity / routing.
  if (requireText(file, profile.slug, "slug")) {
    if (!SLUG_PATTERN.test(profile.slug)) {
      err(file, `slug "${profile.slug}" is not lowercase-hyphen format`);
    }
    if (profile.slug !== entry.replace(/\.ts$/, "")) {
      err(file, `slug "${profile.slug}" does not match filename "${entry}"`);
    }
    if (seenSlugs.has(profile.slug)) {
      err(file, `duplicate slug — already used by ${seenSlugs.get(profile.slug)}`);
    }
    seenSlugs.set(profile.slug, file);
  }

  if (!THEMES.includes(profile.theme)) {
    err(file, `theme "${profile.theme}" invalid. Available: ${THEMES.join(", ")}`);
  }
  if (!LAYOUTS.includes(profile.layout)) {
    err(file, `layout "${profile.layout}" invalid. Available: ${LAYOUTS.join(", ")}`);
  }
  if (!STATUSES.includes(profile.status)) {
    err(file, `status "${profile.status}" invalid. Available: ${STATUSES.join(", ")}`);
  }

  // Locales (optional; defaults to ko-only).
  if (profile.locales !== undefined) {
    if (!Array.isArray(profile.locales) || profile.locales.length === 0) {
      err(file, "locales must be a non-empty array when present");
    } else {
      for (const locale of profile.locales) {
        if (!LOCALES.includes(locale)) {
          err(file, `locales contains "${locale}". Available: ${LOCALES.join(", ")}`);
        }
      }
      if (!profile.locales.includes("ko")) {
        err(file, 'locales must include "ko" — Korean is the default language');
      }
      if (profile.locales.includes("en")) {
        // The KO/EN toggle will render — hero copy needs English text.
        for (const [label, value] of [
          ["person.tagline", profile.person?.tagline],
          ["person.summary", profile.person?.summary],
        ]) {
          if (typeof value === "string") {
            warn(file, `locales includes "en" but ${label} has no en translation`);
          }
        }
      }
    }
  }

  // 4. Required content.
  requireText(file, profile.person?.name, "person.name");
  requireText(file, profile.person?.tagline, "person.tagline");
  requireText(file, profile.person?.summary, "person.summary");
  if (profile.person?.identitySupport !== undefined) {
    requireText(file, profile.person.identitySupport, "person.identitySupport");
  }
  requireText(file, profile.person?.photo?.alt, "person.photo.alt");
  requireText(file, profile.seo?.title, "seo.title");
  requireText(file, profile.seo?.description, "seo.description");

  // 5. Privacy rules.
  if (profile.privacy?.hideAddress !== true) {
    err(file, "privacy.hideAddress must be true");
  }
  if (profile.privacy?.hideBirthDate !== true) {
    err(file, "privacy.hideBirthDate must be true");
  }
  if (profile.contact?.showPhone === true) {
    warn(
      file,
      "showPhone is true — phone number WILL be exposed. Confirm the customer explicitly agreed.",
    );
  }

  // 6. Publishing readiness.
  if (profile.status === "published") {
    if (!profile.contact?.email) {
      warn(file, "published without contact.email — CTA has no destination");
    }
    if (profile.person?.photo?.src) {
      const photoPath = path.join(PUBLIC_DIR, profile.person.photo.src);
      if (!(await fileExists(photoPath))) {
        warn(
          file,
          `photo file missing: public${profile.person.photo.src} — page falls back to monogram`,
        );
      }
    }
  }

  // 7. Proofs.
  (profile.proofs ?? []).forEach((proof, index) => {
    const label = localizedText(proof?.label);
    if (!proof?.value || !label || label.trim() === "") {
      err(file, `proofs[${index}] needs both value and label`);
    }
  });

  // 8. Content depth.
  if (!profile.experiences || profile.experiences.length === 0) {
    warn(file, "experiences is empty");
  }
  if (!profile.projects || profile.projects.length === 0) {
    warn(file, "projects is empty");
  }
  if (!profile.strengths || profile.strengths.length === 0) {
    warn(file, "strengths is empty");
  }
}

console.log(`checked ${entries.length} customer file(s)\n`);

if (warnings.length > 0) {
  console.log(`warnings (${warnings.length}):`);
  console.log(warnings.join("\n"), "\n");
}

if (errors.length > 0) {
  console.error(`errors (${errors.length}):`);
  console.error(errors.join("\n"), "\n");
  console.error("✖ validation failed");
  process.exit(1);
}

console.log("✔ all customers valid");
