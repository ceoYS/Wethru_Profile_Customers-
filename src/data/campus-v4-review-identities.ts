/**
 * Campus V4 — REVIEW-ONLY real-identity map.
 *
 * ⚠️ SERVER / INTERNAL-REVIEW ONLY. This binds each anonymized case id to the
 * real person and their ORIGINAL page. It is imported EXCLUSIVELY on the
 * CAMPUS_REVIEW=1 render branch of the sales page (internal check, "배포 금지"
 * ribbon, never deployed). It must NEVER be read on the public/production or
 * CAMPUS_PUBLIC_PREVIEW path, and its values must never reach public HTML.
 *
 * The mirror route does not import this at all: public mirrors are built from
 * the anonymized data only. Review mode does not build mirrors — it embeds the
 * real ORIGINAL pages live by iframe, which is what these URLs point at.
 */

export interface CampusV4ReviewIdentity {
  /** Matches CampusV4AnonCase.id. */
  anonId: string;
  name: string;
  englishName?: string;
  /** Local original profile → /profiles/{slug}/ (bae-jian, yesol). */
  originalSlug?: string;
  /** External original profile URL (case-01 has no local profile). */
  originalUrl?: string;
}

export const campusV4ReviewIdentities: CampusV4ReviewIdentity[] = [
  {
    anonId: "case-01",
    name: "이준구",
    englishName: "Lee Jungu",
    originalUrl: "https://lee-jungu-profile.vercel.app/",
  },
  {
    anonId: "case-02",
    name: "배지안",
    englishName: "BAE JIAN",
    originalSlug: "bae-jian",
  },
  {
    anonId: "case-03",
    name: "조예솔",
    englishName: "JO YESOL",
    originalSlug: "yesol",
  },
];
