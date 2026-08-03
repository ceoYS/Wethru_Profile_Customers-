/**
 * WeThru Campus — V4 Editorial Finalist content.
 *
 * V4 rebuilds the sales page on the black-and-white editorial design made in
 * Claude Desktop: near-black titles on a white-centric field, cobalt reserved
 * for links and small accents, a black CTA, big hero type, and — the point of
 * V4 — REAL built customer profiles shown large as the proof, not CSS mockups.
 *
 * It is a NEW route (/campus-v4/) and a NEW data source. It does NOT touch
 * src/data/campus.ts (V2), src/data/campus-v3.ts (V3), or their pages/styles.
 * V1 (prototypes/), V2 (tag campus-v2-clean-e4dbbe5), and V3
 * (feat/campus-v3-hybrid) all stay frozen.
 *
 * Two public products only (unchanged policy, see docs/CAMPUS_OPERATIONS.md):
 *   A. 얼리버드 커리어 프로필 — 99,000원 (8월 31일까지 · 첫 10명 런칭가)
 *   B. Interview Portfolio     — 199,000원
 *
 * The launch price is a real, dated window — not a discount theatre. There is no
 * prior list price for this product, so nothing here may render a struck-through
 * "정가", a "-50%", or a "기존가 198,000원". State the price, the end date, and
 * why it changes afterwards. When 8/31 passes, edit these numbers by hand; do
 * not build anything that rolls the same promotion forward on its own.
 *
 * Safety model carried over verbatim from V2/V3:
 * - applyFormUrl stays null → the apply CTA renders disabled and every page on
 *   this route carries noindex,nofollow. Do NOT invent a URL.
 * - Real case studies are consent-gated via `approvedForCampus` (default false).
 *   Zero approvals → the "실제 제작 사례" section and its nav link do not render
 *   in a production build (every Vercel deploy is a production build).
 * - The public page never sends a visitor to the customer's ORIGINAL profile
 *   (which shows their real face and contact). Each case has a sanitized Campus
 *   MIRROR page — /campus-v4/cases/{...}/ — that clones the original design but
 *   masks the face, drops all PII, and carries noindex,nofollow. Production and
 *   the public-image QA link the card, the "완성된 프로필 보기" text, and the fake
 *   address bar to `publicCasePath` only; `originalSlug`/`originalUrl` are
 *   REVIEW-ONLY (CAMPUS_REVIEW=1 live iframe + link, behind the red "배포 금지"
 *   ribbon) and must never appear in a public/production build's HTML.
 * - The Interview Portfolio 구성 예시 (ipPreview) is the ONLY illustrative block.
 *   It is small, secondary (inside the products area, never the hero), and always
 *   labelled "구성 예시 · 실제 구매 사례 아님". It invents no person, school, or metric.
 * - No copy judges whether a student's experience is worth a page or whether they
 *   qualify. WeThru organises what the current material can become; the three real
 *   cases prove design/editing ability, NOT that they bought Interview Portfolio.
 */

export type CampusV4ProductId = "earlybird" | "interview-portfolio";

export interface CampusV4Product {
  id: CampusV4ProductId;
  name: string;
  koreanLabel?: string;
  price: string;
  priceBadge?: string;
  priceNote?: string;
  /** One-line positioning. */
  tagline: string;
  /** 2–3 sentence description. */
  summary: string;
  /** Emphasis badge for the featured (Interview Portfolio) card. */
  featuredBadge?: string;
  /** Up to 6 headline scope items shown by default. */
  coreIncludes: string[];
  /** Remaining scope, folded into a "세부 범위 보기" accordion. */
  moreIncludes: string[];
  /** 포함하지 않음 — explicit boundaries (product A). */
  excludes?: string[];
  /** 기술 검토 후에만 함께 논의 — never promised as guaranteed (product B). */
  conditional?: string[];
  /** Featured products get the dark, high-contrast card treatment. */
  featured?: boolean;
}

export interface CampusV4Problem {
  index: string;
  title: string;
  body: string;
}

export interface CampusV4Step {
  step: string;
  title: string;
  body: string;
}

export interface CampusV4Faq {
  q: string;
  a: string;
}

export interface CampusV4Case {
  name: string;
  englishName?: string;
  /**
   * The person's ORIGINAL public profile as a local slug → /profiles/{slug}/.
   * REVIEW-ONLY: this page shows the real face and contact, so it is used solely
   * by CAMPUS_REVIEW=1 (live iframe + text link). It must never be emitted in a
   * public/production build — public surfaces use `publicCasePath`.
   */
  originalSlug?: string;
  /** The person's ORIGINAL external profile URL. Same review-only rule as `originalSlug`. */
  originalUrl?: string;
  /**
   * The sanitized Campus MIRROR page for this case, e.g.
   * "/campus-v4/cases/lee-jungu/". Face-masked, PII-free, noindex — the ONLY case
   * URL allowed in public-preview and production HTML. The card link, the "완성된
   * 프로필 보기" text link, and the fake browser address bar all resolve to this.
   * Required for every case; the mirror route always exists.
   */
  publicCasePath: string;
  /** Discipline line, from the person's own public profile. */
  role: string;
  /** One factual line, derived only from the public profile. No PII. */
  blurb: string;
  /** 기존 자료의 문제 — about the scattered material, not a judgement of the person. */
  problem: string;
  /** 정리한 설계 방향 — the editorial/structure decision WeThru made. */
  direction: string;
  /** 달라진 점 — how the finished 1-page reads differently. */
  result: string;
  /**
   * Consent to feature this person on the Campus SALES page. Default false.
   * Separate from the customer profile already being public.
   */
  approvedForCampus: boolean;
  /**
   * Stable key → the sanitized, face-masked public preview asset for this case,
   * resolved through the explicit import map in campus-v4-public-previews.ts
   * (src/assets/campus-v4-public/case-{previewKey}-safe.webp). This is NOT a
   * path or a URL: production and the public-image QA mode look it up and FAIL
   * THE BUILD if an approved/shown case has no matching asset — no silent
   * placeholder. Review mode embeds the live page by iframe and never reads it.
   */
  previewKey?: string;
}

/** The small, illustrative Interview Portfolio 구성 예시 (never a real case). */
export interface CampusV4IpPreview {
  title: string;
  /** Always-on label, e.g. "구성 예시 · 실제 구매 사례 아님". */
  note: string;
  lead: string;
  steps: { key: string; body: string }[];
  evidence: string[];
}

export interface CampusV4Offer {
  applyFormUrl: string | null;
  hero: {
    eyebrow: string;
    /**
     * Launch-price window, rendered as its own badge beside the eyebrow.
     * A literal end date — never a live countdown, and never auto-extended.
     */
    deadline: string;
    /** Plain title with a deliberate line break (\n). */
    title: string;
    /** The phrase inside the title to mark with the cobalt accent. */
    highlight: string;
    subtitle: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    proof: string[];
    /** Editorial BEFORE → AFTER statement in the hero (text, not a fake screen). */
    before: string;
    after: string;
  };
  problems: {
    title: string;
    lead: string;
    cards: CampusV4Problem[];
  };
  /** The §5 real-cases framing — proves design ability, not IP purchases. */
  realCases: {
    title: string;
    /** One block per entry so the authored line break is viewport-independent. */
    leadLines: string[];
  };
  difference: {
    earlybird: string;
    interviewPortfolio: string;
  };
  products: CampusV4Product[];
  ipPreview: CampusV4IpPreview;
  process: CampusV4Step[];
  boundaries: string[];
  cases: CampusV4Case[];
  faqs: CampusV4Faq[];
}

export const campusV4Offer: CampusV4Offer = {
  // Same rule as V2/V3: no verified intake destination exists yet. Keep null so
  // the apply CTA stays disabled and the whole /campus-v4/ route stays noindex.
  applyFormUrl: null,

  hero: {
    eyebrow: "4학년·졸업예정자 첫 10명 초기 고객 모집",
    deadline: "8.31 마감 · 첫 10명",
    title: "좋은 경험도 흩어져 있으면\n약하게 읽힙니다.",
    highlight: "흩어져 있으면",
    subtitle:
      "인턴, 공모전, 팀 프로젝트, 노션과 깃허브까지. 따로 흩어진 자료를 읽기 좋은 순서로 정리해 하나의 커리어 웹페이지로 만듭니다. 꾸미는 것보다 무엇을 먼저 보여줄지부터 함께 정합니다.",
    primaryCtaLabel: "99,000원 런칭가 신청",
    secondaryCtaLabel: "두 상품 살펴보기",
    proof: ["모바일·PC 반응형", "링크 하나로 공유", "자료 검토·순서 구성 포함"],
    before: "노션·PDF·드라이브 링크가 따로 흩어져 있던 상태",
    after: "링크 하나로 보내는, 읽히는 순서로 정리된 한 사람의 커리어",
  },

  problems: {
    title: "경험의 개수가 아니라,\n읽히는 순서가 인상을 만듭니다.",
    lead: "채용 담당자는 지원자의 모든 파일을 오래 찾아보지 않습니다. 흩어진 자료는 무엇부터 봐야 할지 알기 어려워, 같은 경험도 약하게 읽힙니다.",
    cards: [
      {
        index: "01",
        title: "이력서 하나로는 전달력이 약합니다",
        body: "프로젝트 맥락, 내가 맡은 역할, 결과를 나열만 한다면, 와닿지 않습니다.",
      },
      {
        index: "02",
        title: "분산된 이력을 한눈에 볼 수 있도록",
        body: "노션·깃허브·블로그·PDF를 따로 보내면 상대가 무엇부터 봐야 할지 알기 어렵습니다.",
      },
      {
        index: "03",
        title: "이목을 끌 순서 정하기가 어렵습니다",
        body: "첫 화면에서 무엇을 말하고, 어떤 프로젝트를 먼저 보여줄지가 인상을 바꿉니다.",
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

  products: [
    {
      id: "earlybird",
      name: "얼리버드 커리어 프로필",
      price: "99,000원",
      priceBadge: "8월 31일까지 · 첫 10명 런칭가",
      priceNote:
        "9월부터 제작시간과 초기 고객 피드백을 반영해 가격이 조정됩니다.",
      tagline: "지원할 때, 내 경험 전체를 한눈에 보여주는 1페이지",
      summary:
        "제출한 자료를 직접 읽고, 어떤 경험을 먼저 보여줄지 순서를 잡습니다. 첫 화면 소개 문장부터 경험·프로젝트가 읽히는 흐름까지 사람마다 다르게 구성한, 나에게 맞춘 1페이지입니다.",
      coreIncludes: [
        "지원 서류를 보완하는 전체 커리어 정리",
        "학력·경력·활동·프로젝트 전체 구조화",
        "지원 직무에 맞는 경험 순서 설계",
        "흩어진 자료와 링크 통합",
        "모바일 1페이지 개인 URL",
      ],
      moreIncludes: [
        "제출 자료 검토와 핵심 경험 선별",
        "첫 화면 소개 문장 작성",
        "경험과 프로젝트 순서 설계",
        "사람마다 다른 1페이지 웹사이트",
        "모바일·PC 개인 URL",
        "필요한 범위의 문장 재작성",
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
      tagline: "면접에서 질문받을 대표 프로젝트를 깊게 준비하는 사이트",
      summary:
        "“나는 이런 사람입니다”를 보여주는 1페이지를 넘어, “나는 실제로 이런 문제를 이렇게 해결했습니다”를 증명합니다. 대표 프로젝트를 상세 사례로 다시 쓰고 근거 자료까지 연결해, 면접에서 프로젝트를 설명하고 증명할 수 있게 합니다.",
      featured: true,
      featuredBadge: "대표 프로젝트를 면접에서 설명해야 한다면",
      coreIncludes: [
        "99,000원 커리어 프로필 전체 구성 포함",
        "대표 프로젝트 상세 사례 최대 2개",
        "문제·상황 → 역할 → 판단 → 행동 → 결과·근거",
        "프로젝트별 별도 URL",
        "면접에서 설명할 근거 자료와 흐름 정리",
      ],
      moreIncludes: [
        "문제·상황 → 역할 → 판단 이유 → 행동 → 결과와 근거 → 배운 점 구조화",
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

  ipPreview: {
    title: "프로젝트를 더 깊게 보여줘야 한다면",
    note: "구성 예시 · 실제 구매 사례 아님",
    lead: "Interview Portfolio는 대표 프로젝트 하나를 아래 흐름으로 다시 씁니다. 실제 구매 사례가 아니라, 상품이 만드는 구성의 예시입니다.",
    steps: [
      { key: "문제·상황", body: "어떤 상황에서 무엇이 문제였는지 (예시)" },
      { key: "역할", body: "그 안에서 내가 맡은 범위 (예시)" },
      { key: "판단", body: "왜 그렇게 결정했는지의 이유 (예시)" },
      { key: "행동", body: "실제로 한 일과 과정 (예시)" },
      { key: "결과·근거", body: "결과와 그것을 뒷받침하는 자료 (예시)" },
    ],
    evidence: ["기획서 PDF", "이미지 갤러리", "영상 · Figma"],
  },

  process: [
    {
      step: "STEP 01",
      title: "신청 · 자료 공유",
      body: "지원 직무 한 가지와 현재 가진 자료(이력서·노션·깃허브·PDF)를 공유합니다.",
    },
    {
      step: "STEP 02",
      title: "구성 정리",
      body: "어떤 경험을 먼저 보여줄지 순서와 첫 화면을 함께 정합니다.",
    },
    {
      step: "STEP 03",
      title: "제작",
      body: "모바일과 PC에서 열리는 개인 웹페이지로 만듭니다.",
    },
    {
      step: "STEP 04",
      title: "검수 · 전달",
      body: "정해진 횟수 안에서 피드백을 반영하고 최종 링크를 드립니다.",
    },
  ],

  boundaries: [
    "무제한 수정은 아닙니다. 상품별로 정해진 피드백 반영 횟수 안에서 진행합니다.",
    "자소서 전체 첨삭이나 면접 컨설팅은 이 상품 범위가 아닙니다.",
  ],

  // Candidate cases, priority order 이준구 → 배지안 → 조예솔. All
  // approvedForCampus:false until the person explicitly consents to this SALES
  // page — separate from their profile being public. Zero approvals → the section
  // and its nav link do not render in production. Seo-baul (서바울) stays a
  // customer profile but is intentionally NOT a Campus representative case.
  cases: [
    {
      name: "이준구",
      englishName: "Lee Jungu",
      previewKey: "lee-jungu",
      originalUrl: "https://lee-jungu-profile.vercel.app/",
      publicCasePath: "/campus-v4/cases/lee-jungu/",
      role: "Retail Operations · Customer Experience · Brand Communication",
      blurb:
        "사람과 브랜드가 만나는 현장에서 전략을 경험과 성과로 연결하는 리테일·CX 프로필.",
      problem:
        "리테일·고객경험 현장의 경험이 이력서 줄글에 흩어져, 무엇을 잘하는 사람인지 한눈에 들어오지 않았습니다.",
      direction:
        "브랜드와 고객이 만나는 현장 경험을 앞세우고, 역할과 성과를 읽히는 순서로 첫 화면부터 다시 배치했습니다.",
      result:
        "첫 화면에서 ‘현장을 아는 리테일·CX 사람’이라는 인상이 먼저 잡히는 1페이지.",
      approvedForCampus: false,
    },
    {
      name: "배지안",
      englishName: "BAE JIAN",
      previewKey: "bae-jian",
      originalSlug: "bae-jian",
      publicCasePath: "/campus-v4/cases/bae-jian/",
      role: "Data-Driven Marketing Strategist",
      blurb: "데이터와 자동화로 마케팅 운영 구조를 설계하는 전략가 프로필.",
      problem:
        "여러 마케팅·자동화 경험이 도구 나열로만 남아, ‘전략을 설계하는 사람’이라는 강점이 약하게 읽혔습니다.",
      direction:
        "데이터와 운영 구조 설계를 중심에 두고 대표 경험을 앞세운 뒤, 나머지는 뒤로 정리했습니다.",
      result:
        "‘구조를 설계하는 마케터’가 먼저 보이는 첫 화면과 정보구조.",
      approvedForCampus: false,
    },
    {
      name: "조예솔",
      englishName: "JO YESOL",
      previewKey: "yesol",
      originalSlug: "yesol",
      publicCasePath: "/campus-v4/cases/yesol/",
      role: "커머스 MD · 그로스 마케터",
      blurb:
        "데이터로 상품과 프로모션을 설계해 브랜드 매출 성장을 이끄는 커머스 MD 프로필.",
      problem:
        "상품·프로모션 경험이 여기저기 있었지만, 성장에 기여한 흐름이 한 번에 보이지 않았습니다.",
      direction:
        "커머스 MD로서 상품을 성장으로 연결한 흐름이 먼저 읽히도록 경험의 순서를 다시 잡았습니다.",
      result:
        "‘매출 성장을 만드는 커머스 MD’라는 인상이 첫 화면에서 먼저 오는 페이지.",
      approvedForCampus: false,
    },
  ],

  faqs: [
    {
      q: "두 상품 모두 개인 웹페이지 링크를 받나요?",
      a: "네. 두 상품 모두 모바일과 PC에서 열리는 개인 웹페이지 URL을 드립니다. 이력서나 메시지에 링크 하나로 붙일 수 있습니다.",
    },
    {
      q: "99,000원과 199,000원의 차이가 무엇인가요?",
      a: "얼리버드 커리어 프로필(99,000원)은 지원 단계에서 학력·경력·활동·프로젝트를 한 장으로 구조화한 전체 커리어 프로필입니다. Interview Portfolio(199,000원)는 여기에 더해 대표 프로젝트를 문제·상황 → 역할 → 판단 → 행동 → 결과·근거 구조의 상세 사례로 다시 쓰고, 프로젝트별 별도 URL과 근거 자료까지 연결해 면접 단계에서 그 프로젝트를 설명할 수 있게 합니다.",
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
      a: "가능합니다. 현재 가진 자료로 어떤 구성이 가능한지와, 1페이지형과 프로젝트 상세형 중 어느 쪽이 적합한지 안내드립니다.",
    },
    {
      q: "수정은 몇 번 가능한가요?",
      a: "얼리버드 커리어 프로필은 피드백 일괄 반영 1회, Interview Portfolio는 2회를 기준으로 합니다. 무제한 수정은 아니며, 정해진 횟수 안에서 문구·순서·구성을 반영합니다.",
    },
    {
      q: "어떤 자료를 준비해야 하나요?",
      a: "지원 직무 한 가지, 보여줄 경험 2~4개, 이력서·노션·깃허브·PDF 같은 원본 링크면 시작할 수 있습니다. 부족한 설명은 30분 이내 자료 확인이나 인터뷰로 채웁니다. 완벽하지 않아도 됩니다.",
    },
    {
      q: "자체 도메인도 사용할 수 있나요?",
      a: "가능합니다. 자체 도메인 구매 비용과 연결 설정 비용은 별도로 안내드립니다.",
    },
  ],
};

/** Cases consented for public/production use. Empty until someone opts in. */
export const approvedV4Cases: CampusV4Case[] = campusV4Offer.cases.filter(
  (c) => c.approvedForCampus,
);
