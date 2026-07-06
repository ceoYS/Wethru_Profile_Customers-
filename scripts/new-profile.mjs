#!/usr/bin/env node
/**
 * Scaffold a new customer profile.
 *
 * Usage:
 *   npm run new:profile -- --slug hong-gildong --name "홍길동" \
 *     --theme navy-black-white --layout editorial-split
 *
 * Creates:
 *   - src/data/customers/{slug}.ts   (draft profile, required fields stubbed)
 *   - public/images/customers/{slug}/ (drop profile.webp here)
 *
 * No index registration needed — src/data/customer-index.ts auto-collects
 * every file in src/data/customers/.
 */

import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const THEMES = ["navy-black-white", "warm-editorial", "graphite-minimal"];
const LAYOUTS = ["editorial-split", "dossier", "magazine", "minimal-card"];
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2);
    const value =
      argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : "true";
    args[key] = value;
  }
  return args;
}

function fail(message) {
  console.error(`✖ ${message}`);
  process.exit(1);
}

const args = parseArgs(process.argv.slice(2));

const slug = args.slug;
const name = args.name ?? "";
const englishName = args["english-name"] ?? "";
const theme = args.theme ?? "navy-black-white";
const layout = args.layout ?? "editorial-split";

if (!slug) {
  fail(
    'missing --slug. Example:\n  npm run new:profile -- --slug hong-gildong --name "홍길동" --theme navy-black-white --layout editorial-split',
  );
}
if (!SLUG_PATTERN.test(slug)) {
  fail(`invalid slug "${slug}" — use lowercase letters, digits and hyphens (e.g. hong-gildong)`);
}
if (!THEMES.includes(theme)) {
  fail(`unknown theme "${theme}". Available: ${THEMES.join(", ")}`);
}
if (!LAYOUTS.includes(layout)) {
  fail(`unknown layout "${layout}". Available: ${LAYOUTS.join(", ")}`);
}

const dataFile = path.join(ROOT, "src", "data", "customers", `${slug}.ts`);
const imageDir = path.join(ROOT, "public", "images", "customers", slug);

if (existsSync(dataFile)) {
  fail(`customer already exists: src/data/customers/${slug}.ts`);
}

const template = `import type { CustomerProfile } from "../../types/profile";

export const profile: CustomerProfile = {
  slug: "${slug}",
  theme: "${theme}",
  layout: "${layout}",
  status: "draft",

  seo: {
    title: "${name || "TODO 이름"} | Profile",
    description: "TODO: 검색/공유에 노출될 한 문장 설명 (80~120자 권장)",
    ogImage: "/og/placeholder-og.svg",
  },

  person: {
    name: "${name || "TODO"}",
    englishName: "${englishName}",
    roleLine: "TODO: 직군 한 줄 (예: Marketing & Strategy)",
    tagline: "TODO: 일하는 방식을 담은 한 문장",
    summary:
      "TODO: 2~4문장 소개. 어떤 문제를 다루고, 어떤 방식으로 일하는 사람인지.",
    photo: {
      src: "/images/customers/${slug}/profile.webp",
      alt: "${name || "TODO"} 프로필 사진",
    },
  },

  contact: {
    email: "",
    showEmail: true,
    showPhone: false,
  },

  badges: [],

  strengths: [],

  experiences: [],

  projects: [],

  proofs: [],

  privacy: {
    hideAddress: true,
    hideBirthDate: true,
    hidePhoneByDefault: true,
  },
};
`;

await mkdir(path.dirname(dataFile), { recursive: true });
await writeFile(dataFile, template, "utf8");
await mkdir(imageDir, { recursive: true });
await writeFile(path.join(imageDir, ".gitkeep"), "", "utf8");

console.log(`✔ created customer "${slug}" (status: draft)

  data file : src/data/customers/${slug}.ts
  image dir : public/images/customers/${slug}/  ← profile.webp 추가
  theme     : ${theme}
  layout    : ${layout}

next steps:
  1. src/data/customers/${slug}.ts 의 TODO 항목을 채운다
  2. public/images/customers/${slug}/profile.webp 를 추가한다
  3. npm run validate:customers   # 필수값/개인정보 검증
  4. npm run dev                  # http://localhost:4321/profiles/${slug}/
  5. 완성되면 status를 "published"로 변경한다
`);
