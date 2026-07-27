/**
 * WeThru Campus — earlybird career-profile offer content.
 *
 * This is NOT a customer profile. It lives outside src/data/customers/ on
 * purpose: the customer validator and the /profiles/[slug] glob only look in
 * that folder, so nothing here is auto-published as a profile.
 *
 * Two public products only (see docs/CAMPUS_OPERATIONS.md):
 *   A. 얼리버드 커리어 프로필 — 49,000원 (첫 10명 초기 출시가)
 *   B. Interview Portfolio     — 199,000원
 * The earlier three-tier prototype pricing (Campus Start / Job Ready /
 * Career Bundle) is intentionally dropped.
 *
 * Privacy / consent model for case studies:
 * - A public customer profile existing does NOT grant consent to use that
 *   person as a Campus sales case. Consent is tracked separately here via
 *   `approvedForCampus` (default false).
 * - Only approved cases render in a production build. Unapproved candidates
 *   render ONLY in internal review mode (CAMPUS_REVIEW=1) behind a
 *   "내부 검수 · 배포 금지" banner, and never carry any personal contact data.
 */

export type CampusProductId = "earlybird" | "interview-portfolio";

export interface CampusProduct {
  id: CampusProductId;
  name: string;
  /** Optional Korean gloss shown under an English product name. */
  koreanLabel?: string;
  price: string;
  /** Short pricing badge, e.g. "첫 10명 초기 출시가". */
  priceBadge?: string;
  /** Honest pricing note — no fake strikethrough, no invented list price. */
  priceNote?: string;
  /** One-line positioning: what this product is. */
  tagline: string;
  /** 2–3 sentence description. */
  summary: string;
  /** 반드시 포함 — the committed scope. */
  includes: string[];
  /** 포함하지 않음 — explicit boundaries (product A). */
  excludes?: string[];
  /** 기술 검토 후에만 함께 논의 — never promised as guaranteed (product B). */
  conditional?: string[];
  /** Featured products get the emphasized card treatment. */
  featured?: boolean;
}

export interface CampusCase {
  name: string;
  englishName?: string;
  /** Local profile slug → links to /profiles/{slug}/. */
  slug?: string;
  /** Verified external public profile URL (checked to respond). */
  externalUrl?: string;
  /** Discipline line, verbatim from the person's own public profile. */
  role: string;
  /** One factual line, derived only from the person's public profile. No PII. */
  blurb: string;
  /**
   * Consent to feature this person on the Campus SALES page.
   * Default false. Separate from the customer profile being public.
   */
  approvedForCampus: boolean;
}

export interface CampusFaq {
  q: string;
  a: string;
}

export interface CampusOffer {
  /**
   * Verified online application form URL, or null when none exists yet.
   * null → the apply CTA renders disabled and the page carries noindex,nofollow.
   * Do not invent a URL to fill this in.
   */
  applyFormUrl: string | null;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  /** The one-line contrast between the two products. */
  difference: {
    earlybird: string;
    interviewPortfolio: string;
  };
  products: CampusProduct[];
  /** Public-facing feedback note. Never a condition of delivery. */
  reviewNote: string;
  cases: CampusCase[];
  faqs: CampusFaq[];
}

export const campusOffer: CampusOffer = {
  // No verified online application form or contact channel exists in the repo
  // yet. Keep this null — the apply CTA stays disabled and the page stays
  // noindex until a real intake destination is confirmed.
  applyFormUrl: null,

  hero: {
    eyebrow: "WeThru Campus",
    title: "이력서에 다 못 담은 나를,\n한 링크로 보여주세요.",
    subtitle:
      "인턴, 공모전, 프로젝트, 노션과 깃허브까지. 흩어진 경험을 읽히는 순서로 정리한 나만의 커리어 웹페이지를 만듭니다.",
  },

  difference: {
    earlybird: "나를 빠르게 이해시키는 맞춤형 1페이지",
    interviewPortfolio: "내가 실제로 일한 방식을 프로젝트 사례로 증명하는 사이트",
  },

  products: [
    {
      id: "earlybird",
      name: "얼리버드 커리어 프로필",
      price: "49,000원",
      priceBadge: "첫 10명 초기 출시가",
      priceNote:
        "초기 제작 시간과 피드백을 반영해 이후 가격이 조정될 수 있습니다.",
      tagline: "흩어진 경험을 읽히는 순서로 정리한 맞춤형 1페이지 커리어 웹사이트",
      summary:
        "제출한 자료를 직접 읽고, 어떤 경험을 먼저 보여줄지 순서를 잡습니다. 첫 화면 소개 문장부터 경험·프로젝트가 읽히는 흐름까지 사람마다 다르게 구성한, 나에게 맞춘 1페이지입니다.",
      includes: [
        "제출 자료 검토와 핵심 경험 선별",
        "경험 우선순위 정리",
        "첫 화면 소개 문장 작성",
        "경험·프로젝트가 읽히는 순서 구성",
        "필요한 범위의 문장 재작성",
        "사람마다 다른 첫 화면과 정보구조",
        "모바일·PC 반응형",
        "개인 웹페이지 URL",
        "이력서·노션·깃허브·PDF 등 외부 링크 연결",
        "주요 경험 최대 4개 · 프로젝트 요약 최대 3개",
        "자료 확인 또는 인터뷰 최대 30분",
        "고객 피드백 일괄 반영 1회",
      ],
      excludes: [
        "프로젝트별 상세 페이지와 별도 URL",
        "사이트 내부 프로젝트 사례 문서",
        "PDF 웹 뷰어 · 이미지 갤러리",
        "영상 · Figma 임베드",
        "직무별 복수 지원 페이지",
        "면접 발표 모드",
        "자소서 전체 첨삭",
        "무제한 수정",
      ],
    },
    {
      id: "interview-portfolio",
      name: "Interview Portfolio",
      koreanLabel: "면접용 프로젝트 사례 사이트",
      price: "199,000원",
      tagline:
        "“이렇게 일했습니다”를 프로젝트 사례로 증명하는 면접용 사이트",
      summary:
        "“나는 이런 사람입니다”를 보여주는 1페이지를 넘어, “나는 실제로 이런 문제를 이렇게 해결했습니다”를 증명합니다. 대표 프로젝트를 상세 사례로 다시 쓰고 근거 자료까지 연결해, 면접에서 프로젝트를 설명하고 증명할 수 있게 합니다.",
      featured: true,
      includes: [
        "얼리버드 커리어 프로필의 전체 범위",
        "대표 프로젝트 상세 사례 최대 2개",
        "프로젝트별 고유 URL",
        "각 프로젝트를 문제·상황 → 역할 → 판단 이유 → 실제 행동 → 결과와 근거 → 배운 점 구조로 재작성",
        "실제 기획서·보고서·이미지·영상 등 근거 자료 연결",
        "PDF 웹 열람 최대 1개",
        "이미지 갤러리 최대 1개",
        "영상 또는 Figma 임베드 최대 1개",
        "면접 중 빠르게 넘겨볼 수 있는 프로젝트 탐색 구조",
        "프로젝트 요약 인쇄용 보기",
        "고객 피드백 일괄 반영 2회",
      ],
      conditional: [
        "지원 직무별 첫 화면 2종",
        "비밀번호 보호 프로젝트",
        "발표형 면접 모드",
      ],
    },
  ],

  reviewNote:
    "첫 10명 초기 고객에게는 완성 후 5분 내외의 솔직한 사용 피드백을 부탁드립니다. 좋은 평가나 특정 별점을 요구하지 않으며, 후기는 결과물을 받는 조건이 아닙니다.",

  // Candidate cases, in priority order. Every entry is approvedForCampus:false
  // until the person explicitly consents to being used on this sales page —
  // separate from their profile already being public. With zero approvals,
  // the cases section (and its nav link) does not render in production.
  cases: [
    {
      name: "이준구",
      englishName: "Lee Jungu",
      externalUrl: "https://lee-jungu-profile.vercel.app/",
      role: "Retail Operations · Customer Experience · Brand Communication",
      blurb:
        "사람과 브랜드가 만나는 현장에서 전략을 경험과 성과로 연결하는 리테일·CX 프로필.",
      approvedForCampus: false,
    },
    {
      name: "배지안",
      englishName: "BAE JIAN",
      slug: "bae-jian",
      role: "Data-Driven Marketing Strategist",
      blurb: "데이터와 자동화로 마케팅 운영 구조를 설계하는 전략가 프로필.",
      approvedForCampus: false,
    },
    {
      name: "조예솔",
      englishName: "JO YESOL",
      slug: "yesol",
      role: "커머스 MD · 그로스 마케터",
      blurb:
        "데이터로 상품과 프로모션을 설계해 브랜드 매출 성장을 이끄는 커머스 MD 프로필.",
      approvedForCampus: false,
    },
  ],

  faqs: [
    {
      q: "두 상품 모두 개인 웹페이지 링크를 받나요?",
      a: "네. 두 상품 모두 모바일과 PC에서 열리는 개인 웹페이지 URL을 드립니다. 이력서나 메시지에 링크 하나로 붙일 수 있습니다.",
    },
    {
      q: "49,000원과 199,000원의 차이가 무엇인가요?",
      a: "얼리버드 커리어 프로필(49,000원)은 흩어진 경험을 읽히는 순서로 정리한 맞춤형 1페이지입니다. Interview Portfolio(199,000원)는 여기에 더해 대표 프로젝트를 문제 → 역할 → 판단 → 행동 → 결과 구조의 상세 사례로 만들고 근거 자료까지 연결해, 면접에서 프로젝트를 설명하고 증명할 수 있게 합니다.",
    },
    {
      q: "그냥 노션을 쓰면 되지 않나요?",
      a: "노션도 좋은 방법입니다. 이미 잘 정리돼 있다면 새로 만들 필요가 없습니다. 차이는 직무에 맞춰 무엇을 먼저 보여줄지 순서를 잡고, 모바일에서 링크 하나로 깔끔하게 공유되도록 다듬는 부분입니다.",
    },
    {
      q: "Interview Portfolio는 누구에게 필요한가요?",
      a: "보여줄 대표 프로젝트가 1~2개 있고, 면접에서 그 프로젝트를 어떻게 해결했는지 근거와 함께 설명하고 싶은 분에게 맞습니다.",
    },
    {
      q: "프로젝트가 별로 없어도 신청할 수 있나요?",
      a: "가능합니다. 다만 지금 가진 경험으로 페이지를 만들 가치가 있는지 먼저 솔직하게 안내드립니다. 없는 경력을 억지로 부풀리지 않습니다.",
    },
    {
      q: "후기 작성이 필수인가요?",
      a: "아니요. 첫 10명 초기 고객에게는 완성 후 5분 내외의 솔직한 사용 피드백을 부탁드리지만, 좋은 평가나 특정 별점을 요구하지 않습니다. 후기는 결과물을 받는 조건이 아닙니다.",
    },
    {
      q: "합격을 보장하나요?",
      a: "보장하지 않습니다. 합격은 여러 요인으로 결정됩니다. 이 페이지는 지원자의 경험을 더 쉽게 이해하도록 돕는 보조 자료입니다.",
    },
    {
      q: "수정은 몇 번 가능한가요?",
      a: "얼리버드 커리어 프로필은 피드백 일괄 반영 1회, Interview Portfolio는 2회를 기준으로 합니다. 무제한 수정은 아니며, 정해진 횟수 안에서 문구·순서·구성을 반영합니다.",
    },
    {
      q: "어떤 자료를 준비해야 하나요?",
      a: "지원 직무 한 가지, 보여줄 경험 2~4개, 이력서·노션·깃허브·PDF 같은 원본 링크면 시작할 수 있습니다. 부족한 설명은 30분 이내 자료 확인이나 인터뷰로 채웁니다. 완벽하지 않아도 됩니다.",
    },
  ],
};

/** Cases consented for public/production use. Empty until someone opts in. */
export const approvedCampusCases: CampusCase[] = campusOffer.cases.filter(
  (c) => c.approvedForCampus,
);
