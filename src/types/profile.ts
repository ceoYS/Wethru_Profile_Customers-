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
  | "graphite-minimal";

export type ProfileLayout =
  | "editorial-split"
  | "dossier"
  | "magazine"
  | "minimal-card";

export type ProfileStatus = "draft" | "published";

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
  roleLine: string;
  /** One sentence that defines how this person works. */
  tagline: string;
  /** 2–4 sentence introduction shown in the hero. */
  summary: string;
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
  title: string;
  /** Small label above the title, e.g. "Research". */
  eyebrow?: string;
  description: string;
}

export interface ProfileExperience {
  company: string;
  role: string;
  period: string;
  description: string;
  bullets: string[];
}

export interface ProfileProject {
  title: string;
  role: string;
  period: string;
  problem: string;
  approach: string;
  result: string;
}

export interface ProfileProof {
  /** The number or short fact, e.g. "1,000+". */
  value: string;
  label: string;
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
  seo: ProfileSeo;
  person: ProfilePerson;
  contact: ProfileContact;
  badges: string[];
  strengths: ProfileStrength[];
  experiences: ProfileExperience[];
  projects: ProfileProject[];
  proofs: ProfileProof[];
  privacy: ProfilePrivacy;
}

export const PROFILE_THEMES: readonly ProfileTheme[] = [
  "navy-black-white",
  "warm-editorial",
  "graphite-minimal",
] as const;

export const PROFILE_LAYOUTS: readonly ProfileLayout[] = [
  "editorial-split",
  "dossier",
  "magazine",
  "minimal-card",
] as const;
