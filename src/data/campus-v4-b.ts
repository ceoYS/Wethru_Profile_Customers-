/**
 * WeThru Campus — V4 VARIANT B (A/B test: product positioning).
 *
 * Control A  = /campus-v4/   (src/data/campus-v4.ts, unchanged)
 * Variant B  = /campus-v4-b/ (this module)
 *
 * The experiment's variables are ONLY:
 *   1. product positioning ("이력서만 제출하는 지원자에서, 한 번 더 준비한 지원자로")
 *   2. message structure
 *   3. how concretely Interview Portfolio is described
 *
 * PRICE AND APPLY CONDITIONS ARE NOT VARIABLES. Both pages must offer the same
 * two products at the same prices under the same intake conditions, so this
 * module does not restate them: `applyFormUrl`, every price string, price badge,
 * and price note are imported from the A data. Price parity is therefore
 * structural — it cannot drift when someone edits B's wording. A runtime guard
 * still asserts it (assertPriceParity) so a future refactor that hard-codes a
 * price fails loudly.
 *
 * The scope LISTS are re-worded in B (that is the experiment: how sharply the
 * 99,000원 / 199,000원 difference reads), but nothing A promises is dropped —
 * items pushed out of the visible "포함 (핵심)" list are moved into the
 * "세부 범위 보기" accordion, and `excludes` / `conditional` stay A's verbatim.
 * B frames the difference as 지원 단계 전체 프로필 vs 면접 단계 대표 프로젝트 심층 사례.
 *
 * Claim boundaries (carried over from A, non-negotiable): no 합격 보장, no "인사
 * 담당자가 반드시 본다", no 합격률 수치, no unverified superlative. The Interview
 * Portfolio anatomy block below is illustrative and permanently labelled
 * "구성 예시 · 실제 구매 사례 아님"; it invents no person, school, or metric.
 *
 * Analytics: this module only declares the experiment identifiers and prepares
 * `withVariantUtm()`. There is no analytics service wired up yet, so nothing
 * logs, counts, or reports anything — and no placeholder numbers exist anywhere.
 */
import type { ImageMetadata } from "astro";
import type { CampusAnonProfile } from "./campus-v4-anon/types";
import type {
  CampusV4Faq,
  CampusV4Product,
  CampusV4ProductId,
  CampusV4Step,
} from "./campus-v4";
import { campusV4Offer } from "./campus-v4";
import {
  campusV4AnonCases,
  type CampusV4AnonCase,
} from "./campus-v4-anon-cases";
import { profile as bCaseTwo } from "./campus-v4-b-anon/case-02";
import { profile as caseThree } from "./campus-v4-anon/case-03";
import caseOnePreview from "../assets/campus-v4-public/case-01-preview-v4-safe.webp";
import caseTwoPreview from "../assets/campus-v4-public/case-02-preview-v4-safe.webp";
import caseThreePreview from "../assets/campus-v4-public/case-03-preview-v3-safe.webp";

/* --------------------------------------------------------------------------
   Experiment identity
   -------------------------------------------------------------------------- */

/** Rendered as data-experiment on the B page's <body>. */
export const CAMPUS_EXPERIMENT = "campus-positioning";
/** Rendered as data-variant on the B page's <body>. */
export const CAMPUS_VARIANT = "b";
/** Appended to the apply CTA as utm_content once an intake URL exists. */
export const CAMPUS_VARIANT_UTM_CONTENT = "campus-b";

/**
 * Tag an apply URL with this variant's utm_content, PRESERVING every query
 * parameter the configured URL already carries (a form's prefill keys must
 * survive). Relative URLs stay relative; absolute URLs stay absolute.
 *
 * Not called while `applyFormUrl` is null — the CTA renders disabled — but the
 * wiring is ready for the moment a verified intake URL is configured in
 * src/data/campus-v4.ts. It never invents or rewrites the destination itself.
 */
export function withVariantUtm(
  url: string,
  utmContent: string = CAMPUS_VARIANT_UTM_CONTENT,
): string {
  const ABSOLUTE = /^[a-z][a-z0-9+.-]*:/i;
  const isAbsolute = ABSOLUTE.test(url) || url.startsWith("//");
  // A base is required to parse a relative URL; it is dropped again below.
  const parsed = new URL(url, "https://profile.wethru.com");
  parsed.searchParams.set("utm_content", utmContent);
  return isAbsolute
    ? parsed.toString()
    : `${parsed.pathname}${parsed.search}${parsed.hash}`;
}

/* --------------------------------------------------------------------------
   Cases — the same three consented anonymous cases as A, mirrored under
   /campus-v4-b/cases/ so each variant owns its URL namespace.

   case-02 is the ONLY case whose copy differs: Variant B unifies its job title
   on 전략 컨설턴트 / STRATEGY CONSULTANT (no 마케팅 전략가 / Data-Driven Marketing
   Strategist / 마케팅 컨설턴트 / MARKETING CONSULTANT on any B surface — card
   title, role eyebrow, blurb, alt text, or mirror metadata). A's cards and A's
   mirrors keep their original wording; the objects here are built from A's list
   read-only and never mutate it.

   `roleScript` exists for typography, not content: a Latin role line may use the
   mono eyebrow style, a Korean one must be set in Pretendard (see §4 of the
   type rules in campus-v4-b.css) instead of relying on a Latin font's Korean
   fallback.
   -------------------------------------------------------------------------- */

export type CampusV4BCase = CampusV4AnonCase & {
  /** Which script the role eyebrow is written in — drives font-family only. */
  roleScript: "latin" | "ko";
  /** Alt text for the sanitized preview capture. */
  previewAlt: string;
};

/*
 * `blurb` and `result` are restated here for every case — not to change their
 * meaning, but because both end in a noun phrase ("… 프로필", "… 1페이지",
 * "… 정보구조") and Variant B drops the sentence-final period on non-sentence
 * strings. They are written out one by one instead of stripped by a regex so the
 * sentence/noun-phrase call stays a manual, reviewable decision: `problem` and
 * `direction` ARE full sentences (…읽혔습니다 / …정리했습니다) and keep their periods.
 */
const caseOverrides: Record<string, Partial<CampusV4BCase>> = {
  "case-01": {
    roleScript: "latin",
    blurb:
      "사람과 브랜드가 만나는 현장에서 전략을 경험과 성과로 연결하는 리테일·CX 프로필",
    result:
      "첫 화면에서 ‘현장을 아는 리테일·CX 사람’이라는 인상이 먼저 잡히는 1페이지",
    previewAlt:
      "리테일·고객경험 직무 지원자 커리어 프로필 실제 제작 화면 — 얼굴 비공개 처리",
  },
  "case-02": {
    title: "전략 컨설턴트 직무 지원자",
    role: "STRATEGY CONSULTANT",
    roleScript: "latin",
    blurb: "데이터와 자동화로 운영 구조를 설계하는 전략 컨설턴트 지원자의 프로필",
    problem:
      "여러 자동화·데이터 경험이 도구 나열로만 남아, ‘구조를 설계하는 사람’이라는 강점이 약하게 읽혔습니다.",
    direction:
      "데이터와 운영 구조 설계를 중심에 두고 대표 경험을 앞세운 뒤, 나머지는 뒤로 정리했습니다.",
    result: "‘구조를 설계하는 전략 컨설턴트’가 먼저 보이는 첫 화면과 정보구조",
    previewAlt:
      "전략 컨설턴트 직무 지원자 커리어 프로필 실제 제작 화면 — 얼굴 비공개 처리",
  },
  "case-03": {
    roleScript: "ko",
    blurb:
      "데이터로 상품과 프로모션을 설계해 브랜드 매출 성장을 이끄는 커머스 MD 프로필",
    result: "‘매출 성장을 만드는 커머스 MD’라는 인상이 첫 화면에서 먼저 오는 페이지",
    previewAlt:
      "커머스·그로스 직무 지원자 커리어 프로필 실제 제작 화면 — 얼굴 비공개 처리",
  },
};

export const campusV4BCases: CampusV4BCase[] = campusV4AnonCases.map((c) => {
  const override = caseOverrides[c.id];
  if (!override) {
    throw new Error(
      `Campus V4 B: no variant-B copy for anonymous case "${c.id}". Every shown ` +
        `case needs an explicit entry — refusing to fall back to A's wording silently.`,
    );
  }
  return {
    ...c,
    // Variant B links its own mirror namespace, never A's.
    publicCasePath: c.publicCasePath.replace("/campus-v4/", "/campus-v4-b/"),
    roleScript: "latin",
    previewAlt: `${c.title} 커리어 프로필 실제 제작 화면 — 얼굴 비공개 처리`,
    ...override,
  };
});

/** Cases consented for public/production use (same gate as A). */
export const approvedCampusV4BCases: CampusV4BCase[] = campusV4BCases.filter(
  (c) => c.approvedForCampus,
);

/* --------------------------------------------------------------------------
   Anonymized mirror profiles for the "profile"-renderer cases.
   case-02 is the retitled B copy; case-03 is A's object, imported read-only.
   -------------------------------------------------------------------------- */

const campusV4BAnonProfiles: Record<string, CampusAnonProfile> = {
  "case-02": bCaseTwo,
  "case-03": caseThree,
};

/** Resolve a B mirror profile, or throw (fail-closed — no real-data fallback). */
export function getCampusV4BAnonProfile(id: string): CampusAnonProfile {
  const profile = campusV4BAnonProfiles[id];
  if (!profile) {
    throw new Error(
      `Campus V4 B: no anonymized mirror profile for "${id}" — refusing to fall ` +
        `back to real customer data.`,
    );
  }
  return profile;
}

/* --------------------------------------------------------------------------
   Sanitized preview images — same fail-closed rule as A: an approved case with
   no committed capture breaks the build instead of rendering a placeholder.

   case-02 uses a NEW capture (case-02-preview-v4-safe.webp) taken from the
   retitled B mirror at 1440×900, because the older capture still showed
   "DATA-DRIVEN MARKETING STRATEGIST" burned into the image. It is a fresh
   screenshot of the real B route — not a rename or copy of A's file.
   -------------------------------------------------------------------------- */

const campusV4BPreviews: Record<string, ImageMetadata> = {
  "case-01": caseOnePreview,
  "case-02": caseTwoPreview,
  "case-03": caseThreePreview,
};

export function getCampusV4BPreview(previewKey: string): ImageMetadata {
  const image = campusV4BPreviews[previewKey];
  if (!image) {
    throw new Error(
      `Campus V4 B: no sanitized preview for previewKey "${previewKey}" — ` +
        `refusing to render a placeholder.`,
    );
  }
  return image;
}

/* --------------------------------------------------------------------------
   Offer copy
   -------------------------------------------------------------------------- */

export interface CampusV4BAnatomyRow {
  key: string;
  body: string;
}

export interface CampusV4BOffer {
  /** Shared with A — never re-declared here. */
  applyFormUrl: string | null;
  hero: {
    eyebrow: string;
    deadline: string;
    /** Plain title with a deliberate line break (\n). */
    title: string;
    /** The phrase inside the title to mark with the accent swipe. */
    highlight: string;
    subtitle: string;
    /** The B-only differentiation line, shown under the subtitle. */
    differentiator: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    proof: string[];
    before: string;
    after: string;
  };
  problems: {
    title: string;
    lead: string;
    cards: { index: string; title: string; body: string }[];
  };
  realCases: {
    title: string;
    /**
     * Rendered as one block element per entry, so the break before "사람마다"
     * is in the MARKUP. It must not depend on the container width happening to
     * wrap there — at 360px or 1440px the two sentences stay two blocks.
     */
    leadLines: string[];
  };
  difference: { earlybird: string; interviewPortfolio: string };
  products: CampusV4Product[];
  /** The concrete Interview Portfolio page anatomy (illustrative, labelled). */
  ipAnatomy: {
    note: string;
    title: string;
    lead: string;
    pageTitle: string;
    rows: CampusV4BAnatomyRow[];
    evidenceLabel: string;
    evidence: string[];
    usageLabel: string;
    usage: string[];
  };
  process: CampusV4Step[];
  boundaries: string[];
  /** Same markup-level line split as realCases.leadLines (break before "좋은 평가"). */
  reviewNoteLines: string[];
  faqs: CampusV4Faq[];
}

/**
 * Positioning copy that replaces A's, per product. Prices stay A's (see the
 * parity guard at the bottom of this file).
 *
 * The two products are deliberately separated by STAGE, not by quality:
 *   99,000원  = 지원 단계 — 커리어 전체를 한 장으로 구조화
 *   199,000원 = 면접 단계 — 대표 프로젝트를 심층 사례로 다시 씀
 * Both hold experience and projects; only the depth and the moment differ. The
 * visible 핵심 list carries that split, and everything A promises but that this
 * shorter list omits is moved into `moreIncludes` (the 세부 범위 accordion) —
 * nothing promised on A disappears from B.
 */
const productCopy: Partial<
  Record<CampusV4ProductId, Partial<CampusV4Product>>
> = {
  earlybird: {
    tagline: "지원할 때, 내 경험 전체를 한눈에 보여주는 1페이지",
    summary:
      "제출한 자료를 직접 읽고, 지원 직무 기준으로 무엇을 먼저 보여줄지 순서를 잡습니다. 학력·경력·활동·프로젝트를 한 장 안에 구조화해, 지원 서류와 함께 보내는 커리어 프로필을 만듭니다.",
    coreIncludes: [
      "지원 서류를 보완하는 전체 커리어 정리",
      "학력·경력·활동·프로젝트 전체 구조화",
      "지원 직무에 맞는 경험 순서 설계",
      "흩어진 자료와 링크 통합",
      "모바일 1페이지 개인 URL",
    ],
    // A's 핵심 항목 중 위 목록에 흡수되지 않은 두 항목을 여기로 내림 (약속 유지).
    moreIncludes: [
      "첫 화면 소개 문장 작성",
      "필요한 범위의 문장 재작성",
      "이력서·노션·깃허브·PDF 등 외부 링크 연결",
      "주요 경험 최대 4개 · 프로젝트 요약 최대 3개",
      "자료 확인 또는 인터뷰 최대 30분",
      "고객 피드백 일괄 반영 1회",
    ],
  },
  "interview-portfolio": {
    tagline: "면접에서 질문받을 대표 프로젝트를 깊게 준비하는 사이트",
    summary:
      "“나는 이런 사람입니다”에서 멈추지 않고 “이 문제를 이렇게 다뤘습니다”까지 보여줍니다. 99,000원 커리어 프로필 전체 구성 위에, 대표 프로젝트를 별도 URL의 상세 사례로 다시 쓰고 면접에서 설명할 근거 자료를 그 자리에 붙입니다.",
    featuredBadge: "대표 프로젝트를 면접에서 설명해야 한다면",
    coreIncludes: [
      "99,000원 커리어 프로필 전체 구성 포함",
      "대표 프로젝트 상세 사례 최대 2개",
      "문제·상황 → 역할 → 판단 → 행동 → 결과·근거",
      "프로젝트별 별도 URL",
      "면접에서 설명할 근거 자료와 흐름 정리",
    ],
    moreIncludes: [
      "실제 기획서·보고서·이미지·영상 등 근거 자료 연결",
      "PDF 웹 열람 최대 1개",
      "이미지 갤러리 최대 1개",
      "영상 또는 Figma 임베드 최대 1개",
      "면접 중 빠르게 넘겨볼 수 있는 프로젝트 탐색 구조",
      "프로젝트 요약 인쇄용 보기",
      "고객 피드백 일괄 반영 2회",
    ],
  },
};

const campusV4BProducts: CampusV4Product[] = campusV4Offer.products.map((p) => ({
  ...p,
  ...(productCopy[p.id] ?? {}),
}));

/* --------------------------------------------------------------------------
   Boundaries — Variant B keeps the two SCOPE limits and drops A's two
   outcome/exaggeration disclaimers (they read as defensive on this page).
   -------------------------------------------------------------------------- */

/** The exact A lines B removes. Kept here so the removal can be verified. */
const droppedBoundaries = [
  "합격을 보장하지 않습니다. 이 페이지는 경험을 더 쉽게 이해하도록 돕는 보조 자료입니다.",
  "없는 경력이나 성과를 억지로 부풀리지 않습니다. 지금 가진 자료로 가능한 구성을 함께 정리합니다.",
];

const BOUNDARIES: string[] = (() => {
  for (const line of droppedBoundaries) {
    if (!campusV4Offer.boundaries.includes(line)) {
      throw new Error(
        `Campus V4 B: boundary line to drop is no longer present in A ` +
          `("${line}"). Re-check which lines Variant B should omit instead of ` +
          `letting the removal become a silent no-op.`,
      );
    }
  }
  return campusV4Offer.boundaries.filter((b) => !droppedBoundaries.includes(b));
})();

/* --------------------------------------------------------------------------
   FAQ — B removes two of A's entries, shortens one answer, and adds two.
   -------------------------------------------------------------------------- */

/** A questions Variant B does not ask at all. */
const droppedFaqQuestions = ["후기 작성이 필수인가요?", "합격을 보장하나요?"];

/** A answers Variant B rewrites (question text unchanged). */
const faqAnswerOverrides: Record<string, string> = {
  // The "없는 경력이나 성과를 억지로 부풀리지는 않습니다." sentence is dropped.
  "프로젝트가 별로 없어도 신청할 수 있나요?":
    "가능합니다. 현재 가진 자료로 어떤 구성이 가능한지와, 1페이지형과 프로젝트 상세형 중 어느 쪽이 적합한지 안내드립니다.",
  // Restated on B's 지원 단계 / 면접 단계 axis so this answer cannot contradict
  // the product cards above it. Same prices, same scope — only the framing.
  "99,000원과 199,000원의 차이가 무엇인가요?":
    "얼리버드 커리어 프로필(99,000원)은 지원 단계에서 학력·경력·활동·프로젝트를 한 장으로 구조화한 전체 커리어 프로필입니다. Interview Portfolio(199,000원)는 여기에 더해 대표 프로젝트를 문제·상황 → 역할 → 판단 → 행동 → 결과·근거 구조의 상세 사례로 다시 쓰고, 프로젝트별 별도 URL과 근거 자료까지 연결해 면접 단계에서 그 프로젝트를 설명할 수 있게 합니다.",
};

const FAQS: CampusV4Faq[] = (() => {
  const questions = new Set(campusV4Offer.faqs.map((f) => f.q));
  for (const q of [...droppedFaqQuestions, ...Object.keys(faqAnswerOverrides)]) {
    if (!questions.has(q)) {
      throw new Error(
        `Campus V4 B: FAQ "${q}" no longer exists in A, so B's edit to it does ` +
          `nothing. Re-check the FAQ list instead of shipping a stale override.`,
      );
    }
  }

  const inherited = campusV4Offer.faqs
    .filter((f) => !droppedFaqQuestions.includes(f.q))
    .map((f) => {
      const a = faqAnswerOverrides[f.q];
      return a ? { ...f, a } : f;
    });

  return [
    {
      q: "이력서와 무엇이 다른가요?",
      a: "이력서는 정해진 양식에 맞춰 경력을 요약하는 문서입니다. 이 커리어 프로필은 지원 직무 기준으로 무엇을 먼저 보여줄지 순서를 정하고, 프로젝트와 성과를 그 순서대로 배치한 웹페이지입니다. 이력서를 대체하는 것이 아니라, 이력서와 함께 보내는 자료입니다.",
    },
    ...inherited,
    {
      q: "자체 도메인도 사용할 수 있나요?",
      // No figure on screen yet: the connection fee is not decided, so it is
      // described as 별도 안내 rather than a number nobody has confirmed.
      a: "가능합니다. 자체 도메인 구매 비용과 연결 설정 비용은 별도로 안내드립니다.",
    },
  ];
})();

export const campusV4BOffer: CampusV4BOffer = {
  // Single source of truth: whatever A's intake setting is, B has the same one.
  applyFormUrl: campusV4Offer.applyFormUrl,

  hero: {
    eyebrow: "4학년·졸업예정자 첫 10명 초기 고객 모집",
    deadline: "7.31 마감 · 첫 10명",
    title: "이력서만 제출하는 지원자에서,\n한 번 더 준비한 지원자로.",
    // Kept to one phrase so the accent swipe lands on a single rendered line.
    highlight: "한 번 더 준비한",
    subtitle:
      "WeThru는 지원자의 프로젝트, 성과, 강점을 직무에 맞게 구조화해 채용담당자가 더 빠르게 이해할 수 있는 지원자 전용 온라인 커리어 프로필을 제작합니다.",
    differentiator: "나를 보여주기 위해 한 번 더 고민하고 준비했다는 인상까지.",
    primaryCtaLabel: "99,000원 런칭가 신청",
    secondaryCtaLabel: "두 상품 살펴보기",
    proof: ["모바일·PC 반응형", "링크 하나로 공유", "직무 기준 구조화 포함"],
    before: "이력서 한 장과 흩어진 링크만 제출한 상태",
    after: "직무 기준으로 구조화된 커리어 프로필 링크까지 함께 보내는 상태",
  },

  problems: {
    title: "이력서는 제출하지만,\n그 다음 자료가 없습니다.",
    lead: "지원 서류는 정해진 양식에서 끝납니다. 어떤 문제를 다뤘고 그 안에서 무엇을 맡았는지는 그 양식에 잘 담기지 않아, 같은 경험도 짧게 요약된 채로 남습니다.",
    // Card titles are UI headings, not prose → no sentence-final period.
    cards: [
      {
        index: "01",
        title: "이력서 하나로는 전달력이 약합니다",
        body: "프로젝트 맥락, 내가 맡은 역할, 결과를 나열만 한다면, 와닿지 않습니다.",
      },
      {
        index: "02",
        title: "분산된 이력을 한눈에 볼 수 있도록",
        body: "노션·깃허브·PDF를 각각 보내면, 무엇부터 열어야 할지를 받는 사람이 정해야 합니다.",
      },
      {
        index: "03",
        title: "이목을 끌 순서 정하기가 어렵습니다",
        body: "지원 직무가 먼저 확인하고 싶은 것에 맞춰 정리하지 않으면, 강점이 뒤쪽에 남습니다.",
      },
    ],
  },

  realCases: {
    title: "같은 템플릿에 이름만\n바꾸지 않습니다.",
    leadLines: [
      "아래는 실제로 제작한 1페이지 커리어 프로필입니다.",
      "사람마다 강조해야 할 경험이 달라 첫 화면과 정보구조도 다르게 만들었습니다.",
    ],
  },

  difference: {
    earlybird: "지원 단계의 전체 커리어 프로필",
    interviewPortfolio: "면접 단계의 대표 프로젝트 심층 사례",
  },

  products: campusV4BProducts,

  ipAnatomy: {
    note: "구성 예시 · 실제 구매 사례 아님",
    title: "199,000원 Interview Portfolio는 이렇게 생깁니다",
    lead: "대표 프로젝트 하나가 아래 순서를 가진 상세 페이지 한 장으로 다시 쓰입니다. 아래는 상품이 만드는 페이지의 구성 예시이며, 특정 구매 사례가 아닙니다.",
    pageTitle: "프로젝트 상세 페이지 1개의 구성",
    rows: [
      {
        key: "헤더",
        body: "프로젝트를 한 문장으로 정의하고, 기간과 내 역할을 함께 둡니다 (예시).",
      },
      {
        key: "문제·상황",
        body: "어떤 상황에서 무엇이 문제였는지를 먼저 적습니다 (예시).",
      },
      {
        key: "내 역할",
        body: "팀 안에서 내가 맡은 범위와 맡지 않은 범위를 구분합니다 (예시).",
      },
      {
        key: "판단",
        body: "여러 선택지 중 왜 그 방향을 택했는지의 이유를 남깁니다 (예시).",
      },
      {
        key: "행동",
        body: "실제로 한 일을 순서대로, 확인할 수 있는 수준으로 적습니다 (예시).",
      },
      {
        key: "결과·근거",
        body: "결과와 그것을 뒷받침하는 자료를 같은 자리에 붙입니다 (예시).",
      },
      {
        key: "배운 점",
        body: "다음에 같은 문제를 만나면 무엇을 다르게 할지 적습니다 (예시).",
      },
    ],
    evidenceLabel: "근거 자료가 붙는 자리",
    evidence: [
      "기획서·보고서 PDF 웹 열람 1개",
      "이미지 갤러리 1개",
      "영상 또는 Figma 임베드 1개",
    ],
    usageLabel: "면접에서 쓰는 방식",
    usage: [
      "프로젝트별 고유 URL로 바로 열기",
      "면접 중 빠르게 넘겨보는 탐색 구조",
      "프로젝트 요약 인쇄용 보기",
    ],
  },

  // Same four steps as A — the intake and delivery process is not a variable.
  process: campusV4Offer.process,

  /*
   * Variant B states only the two SCOPE boundaries. A's first two lines ("합격을
   * 보장하지 않습니다 …", "없는 경력이나 성과를 억지로 부풀리지 않습니다 …") are dropped
   * from B on purpose — see droppedBoundaries below, which fails the build if
   * those exact lines ever stop existing in A (i.e. if this deletion silently
   * became a no-op). Dropping a disclaimer creates no claim: B still promises no
   * outcome anywhere, and 합격/합격률 wording appears nowhere on the page.
   */
  boundaries: BOUNDARIES,

  reviewNoteLines: [
    "첫 10명 초기 고객에게는 완성 후 5분 내외의 솔직한 사용 피드백을 부탁드립니다.",
    "좋은 평가나 특정 별점을 요구하지 않으며, 후기는 결과물을 받는 조건이 아닙니다.",
  ],

  faqs: FAQS,
};

/* --------------------------------------------------------------------------
   A/B invariant guard — price and intake conditions must be identical.
   -------------------------------------------------------------------------- */

/**
 * Fails the build if Variant B's price surface ever diverges from A's. The B
 * products are derived from A's objects, so this can only fire if someone
 * hard-codes a price/badge/note or a different intake URL into B later.
 */
function assertPriceParity(): void {
  const a = campusV4Offer;
  const b = campusV4BOffer;

  if (a.applyFormUrl !== b.applyFormUrl) {
    throw new Error(
      "Campus V4 A/B: applyFormUrl differs between A and B. The intake condition " +
        "is not an experiment variable.",
    );
  }

  for (const aProduct of a.products) {
    const bProduct = b.products.find((p) => p.id === aProduct.id);
    if (!bProduct) {
      throw new Error(
        `Campus V4 A/B: Variant B is missing product "${aProduct.id}".`,
      );
    }
    const fields = ["price", "priceBadge", "priceNote"] as const;
    for (const field of fields) {
      if (aProduct[field] !== bProduct[field]) {
        throw new Error(
          `Campus V4 A/B: product "${aProduct.id}" ${field} differs between A ` +
            `("${aProduct[field]}") and B ("${bProduct[field]}"). Price is not an ` +
            `experiment variable.`,
        );
      }
    }
  }
}

assertPriceParity();
