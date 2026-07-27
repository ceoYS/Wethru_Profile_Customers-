/**
 * Profiles WeThru built that live OUTSIDE this repository.
 *
 * src/data/customer-index.ts auto-collects `./customers/*.ts` with import.meta
 * .glob. That is why the dashboard only ever showed 배지안 · 서바울 · 조예솔:
 * 이준구 was delivered as his own standalone Astro repo with his own Vercel
 * deploy, so he has no module in src/data/customers/ and the glob cannot see
 * him. He was not hidden by a flag — he was never in the collection.
 *
 * These entries are deliberately NOT CustomerProfile objects. That schema
 * drives /profiles/<slug>/ page generation (theme, layout, locales, sections,
 * contact), and scripts/validate-customers.mjs checks it. Faking one here would
 * either generate a broken duplicate route or fail validation for fields that
 * genuinely do not exist on this side. This is an index entry and nothing more:
 * enough to link out, not enough to render a page.
 *
 * Every string below is read from the customer's own repo — do not write fresh
 * copy here, and do not edit the source repo from this one:
 *   references/lee-jungu-profile/src/data/profile.ts   (seo.title, hero.koMessage)
 *   references/lee-jungu-profile/src/styles/global.css (design language, palette)
 */

export interface ExternalProfile {
  name: string;
  englishName: string;
  /** Discipline line, from the customer's own seo.title. */
  roleLine: string;
  /** The customer's own hero statement. */
  tagline: string;
  /** Live public deploy. Different origin — always opens in a new tab. */
  url: string;
  /** Where the source actually lives, so the operator knows where to edit. */
  sourceRepo: string;
  /** Palette + layout chips, mirroring the theme/layout chips on local cards. */
  theme: string;
  layout: string;
}

export const externalProfiles: ExternalProfile[] = [
  {
    name: "이준구",
    englishName: "LEE JUNGU",
    roleLine: "Retail Operations · Customer Experience",
    tagline:
      "사람과 브랜드가 만나는 현장에서, 전략을 경험과 성과로 연결합니다.",
    url: "https://lee-jungu-profile.vercel.app/",
    sourceRepo: "references/lee-jungu-profile",
    theme: "ivory · ink · burgundy",
    layout: "editorial magazine",
  },
];
