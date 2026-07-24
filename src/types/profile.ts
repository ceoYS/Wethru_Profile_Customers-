/**
 * WeThru Profile Factory — customer profile schema.
 *
 * Privacy is enforced at the type level:
 * - There is intentionally NO `address` field and NO `birthDate` field.
 *   Do not add them. The validator (scripts/validate-customers.mjs) rejects
 *   any customer file that mentions them.
 * - `phone` may be stored for operator reference, but is never rendered
 *   unless `showPhone` is explicitly true (and even then the validator warns).
 * - `email` is only ever rendered inside the contact CTA section.
 */

export type ProfileTheme =
  | "navy-black-white"
  | "warm-editorial"
  | "graphite-minimal"
  | "cobalt-air"
  | "terracotta-atelier";

export type ProfileLayout =
  | "editorial-split"
  | "dossier"
  | "magazine"
  | "minimal-card"
  | "atelier-dossier";

export type ProfileStatus = "draft" | "published";

export type ProfileLocale = "ko" | "en";

/**
 * A string that may carry an English translation.
 * Plain strings stay valid — existing single-language customers keep working.
 * When a profile lists "en" in `locales`, the language toggle renders and
 * any `{ ko, en }` values switch with it (plain strings show as-is in both).
 */
export type LocalizedString = string | { ko: string; en: string };

export interface ProfileSeo {
  title: string;
  description: string;
  /** Absolute path under /public, e.g. "/og/bae-jian-og.png". */
  ogImage?: string;
}

export interface ProfilePhoto {
  /** Absolute path under /public, e.g. "/images/customers/bae-jian/profile.webp". */
  src: string;
  /** Required. The validator fails the build when missing. */
  alt: string;
}

export interface ProfilePerson {
  name: string;
  englishName?: string;
  /** Short discipline line, e.g. "Marketing & Strategy". */
  roleLine: LocalizedString;
  /** One sentence that defines how this person works. */
  tagline: LocalizedString;
  /** 2–4 sentence introduction shown in the hero. */
  summary: LocalizedString;
  /**
   * Support line under the identity statement (mid-page section).
   * Falls back to `summary` when omitted.
   */
  identitySupport?: LocalizedString;
  photo: ProfilePhoto;
}

export interface ProfileLink {
  label: string;
  href: string;
}

export interface ProfileContact {
  email?: string;
  showEmail?: boolean;
  /** Stored for operator reference only. Hidden unless showPhone is true. */
  phone?: string;
  showPhone?: boolean;
  links?: ProfileLink[];
}

export interface ProfileStrength {
  title: LocalizedString;
  /** Small label above the title, e.g. "Research". */
  eyebrow?: string;
  description: LocalizedString;
}

export interface ProfileExperience {
  company: LocalizedString;
  role: LocalizedString;
  period: LocalizedString;
  description: LocalizedString;
  bullets: LocalizedString[];
}

/**
 * Minor experience shown as a compact one-line row under the main timeline —
 * keeps the page short while still recording shorter stints.
 */
export interface ProfileAdditionalExperience {
  company: LocalizedString;
  role: LocalizedString;
  period: LocalizedString;
}

export interface ProfileProject {
  title: LocalizedString;
  role: LocalizedString;
  period: LocalizedString;
  problem: LocalizedString;
  approach: LocalizedString;
  result: LocalizedString;
}

export interface ProfileProof {
  /** The number or short fact, e.g. "1,000+". */
  value: LocalizedString;
  label: LocalizedString;
  description?: string;
}

export interface ProfilePrivacy {
  /** Must be literally true. No address is ever stored or rendered. */
  hideAddress: true;
  /** Must be literally true. No birth date is ever stored or rendered. */
  hideBirthDate: true;
  hidePhoneByDefault: boolean;
}

export interface CustomerProfile {
  /** URL slug: lowercase, hyphen-separated. Becomes /profiles/{slug}/. */
  slug: string;
  theme: ProfileTheme;
  layout: ProfileLayout;
  status: ProfileStatus;
  /**
   * Languages this profile supports. Defaults to ["ko"].
   * Include "en" to render the KO/EN toggle — every LocalizedString field
   * should then carry an `en` translation (the validator warns otherwise).
   */
  locales?: readonly ProfileLocale[];
  seo: ProfileSeo;
  person: ProfilePerson;
  contact: ProfileContact;
  badges: string[];
  /** Language-neutral tool/skill chips, e.g. "Google Analytics", "n8n". */
  skills?: string[];
  strengths: ProfileStrength[];
  experiences: ProfileExperience[];
  /** Short stints rendered as compact rows under the timeline. */
  additionalExperiences?: ProfileAdditionalExperience[];
  projects: ProfileProject[];
  proofs: ProfileProof[];
  privacy: ProfilePrivacy;
}

export const PROFILE_THEMES: readonly ProfileTheme[] = [
  "navy-black-white",
  "warm-editorial",
  "graphite-minimal",
  "cobalt-air",
  "terracotta-atelier",
] as const;

export const PROFILE_LAYOUTS: readonly ProfileLayout[] = [
  "editorial-split",
  "dossier",
  "magazine",
  "minimal-card",
  "atelier-dossier",
] as const;
