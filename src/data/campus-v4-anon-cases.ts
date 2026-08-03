/**
 * Campus V4 — ANONYMIZED public case board (the ONLY case data a public/
 * production build reads).
 *
 * This module is the hard privacy boundary. It contains NO real name, NO real
 * school/company/brand/project name, NO exact date, NO region, NO original URL
 * or slug. Every field here is safe to ship in public HTML. The real customer
 * identities live in two places that a public render path never imports:
 *   - the untouched customer profiles (src/data/customers/*.ts, /profiles/…), and
 *   - campus-v4-review-identities.ts (REVIEW-ONLY name/URL map).
 *
 * The landing page renders these cards for PUBLIC_PREVIEW and production; the
 * mirror route (/campus-v4/cases/case-0X/) is generated from this list too.
 * Production is gated on approvedForCampus; only explicitly approved anonymous
 * cases render. This list removes identity from every case that can be shown.
 *
 * A "profile" case renders through the Campus-only anonymous layout with an
 * authored CampusAnonProfile (campus-v4-anon/case-0X.ts). A "clone" case renders the self-contained
 * anonymized mirror component (CaseOneMirror.astro).
 */

export interface CampusV4AnonCase {
  /** Neutral id == public slug last segment == previewKey. */
  id: string;
  /** Long anonymized label, shown as the card heading. */
  title: string;
  /** Short anonymized label (지원자 A/B/C). */
  short: string;
  /** Discipline line — a non-identifying job family, not a title at a company. */
  role: string;
  /** Factual, non-identifying one-liner about the design work. */
  blurb: string;
  /** 기존 자료의 문제 — generalized, no employer/school/project name. */
  problem: string;
  /** 정리한 설계 방향. */
  direction: string;
  /** 달라진 점. */
  result: string;
  /** Sanitized mirror URL — the ONLY case URL public HTML may contain. */
  publicCasePath: string;
  /** Key into campus-v4-public-previews.ts (== id). */
  previewKey: string;
  /** How the mirror page renders. */
  renderer: "clone" | "profile";
  /** Consent to feature on the SALES page. Default false → 0 in production. */
  approvedForCampus: boolean;
}

export const campusV4AnonCases: CampusV4AnonCase[] = [
  {
    id: "case-01",
    title: "리테일·고객경험 직무 지원자",
    short: "지원자 A",
    role: "Retail Operations · Customer Experience · Brand Communication",
    blurb:
      "사람과 브랜드가 만나는 현장에서 전략을 경험과 성과로 연결하는 리테일·CX 프로필",
    problem:
      "리테일·고객경험 현장의 경험이 이력서 줄글에 흩어져, 무엇을 잘하는 사람인지 한눈에 들어오지 않았습니다.",
    direction:
      "브랜드와 고객이 만나는 현장 경험을 앞세우고, 역할과 성과를 읽히는 순서로 첫 화면부터 다시 배치했습니다.",
    result:
      "첫 화면에서 ‘현장을 아는 리테일·CX 사람’이라는 인상이 먼저 잡히는 1페이지",
    publicCasePath: "/campus-v4/cases/case-01/",
    previewKey: "case-01",
    renderer: "clone",
    approvedForCampus: true,
  },
  {
    id: "case-02",
    title: "데이터 기반 컨설턴트 직무 지원자",
    short: "지원자 B",
    role: "Data-Driven Marketing Strategist",
    blurb: "데이터와 자동화로 마케팅 운영 구조를 설계하는 전략가 프로필",
    problem:
      "여러 마케팅·자동화 경험이 도구 나열로만 남아, ‘전략을 설계하는 사람’이라는 강점이 약하게 읽혔습니다.",
    direction:
      "데이터와 운영 구조 설계를 중심에 두고 대표 경험을 앞세운 뒤, 나머지는 뒤로 정리했습니다.",
    result: "‘구조를 설계하는 마케터’가 먼저 보이는 첫 화면과 정보구조",
    publicCasePath: "/campus-v4/cases/case-02/",
    previewKey: "case-02",
    renderer: "profile",
    approvedForCampus: true,
  },
  {
    id: "case-03",
    title: "커머스·그로스 직무 지원자",
    short: "지원자 C",
    role: "커머스 MD · 그로스 마케터",
    blurb:
      "데이터로 상품과 프로모션을 설계해 브랜드 매출 성장을 이끄는 커머스 MD 프로필",
    problem:
      "상품·프로모션 경험이 여기저기 있었지만, 성장에 기여한 흐름이 한 번에 보이지 않았습니다.",
    direction:
      "커머스 MD로서 상품을 성장으로 연결한 흐름이 먼저 읽히도록 경험의 순서를 다시 잡았습니다.",
    result:
      "‘매출 성장을 만드는 커머스 MD’라는 인상이 첫 화면에서 먼저 오는 페이지",
    publicCasePath: "/campus-v4/cases/case-03/",
    previewKey: "case-03",
    renderer: "profile",
    approvedForCampus: true,
  },
];

/** Cases consented for public/production use. */
export const approvedAnonCases: CampusV4AnonCase[] = campusV4AnonCases.filter(
  (c) => c.approvedForCampus,
);

/** Slug (case-0X) → anon case, for the mirror route. */
export function getAnonCase(id: string): CampusV4AnonCase | undefined {
  return campusV4AnonCases.find((c) => c.id === id);
}
