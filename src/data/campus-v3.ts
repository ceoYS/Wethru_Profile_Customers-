/**
 * WeThru Campus — V3 Hybrid landing content.
 *
 * V3 combines the persuasion + visual proof of the V1 editorial prototype with
 * the product structure + operational safety of the V2 clean page. It is a NEW
 * route (/campus-v3/) and a NEW data source: it does NOT touch src/data/campus.ts
 * (V2) or src/pages/campus.astro (V2), which stay frozen at tag
 * campus-v2-clean-e4dbbe5.
 *
 * Two public products only (unchanged from V2, see docs/CAMPUS_OPERATIONS.md):
 *   A. 얼리버드 커리어 프로필 — 49,000원 (첫 10명 초기 출시가)
 *   B. Interview Portfolio     — 199,000원
 *
 * Safety model carried over verbatim from V2:
 * - applyFormUrl stays null → the apply CTA renders disabled and every page in
 *   this route carries noindex,nofollow. Do NOT invent a URL.
 * - Real case studies are consent-gated via `approvedForCampus` (default false).
 *   Zero approvals → the "실제 제작 사례" section and its nav link do not render
 *   in a production build; unapproved candidates surface ONLY in review mode
 *   (CAMPUS_REVIEW=1) behind a "배포 금지" banner, never with contact data.
 * - The DEMO 결과물 미리보기 section is different: it is fictional, always
 *   labelled "DEMO · 실제 고객 사례 아님", and always renders. It never copies a
 *   real customer's data, screen, review, school, company, or metric.
 * - No copy judges whether a student's experience is worth a page or whether
 *   they qualify. WeThru organises what the current material can become; it does
 *   not screen the applicant.
 */

export type CampusV3ProductId = "earlybird" | "interview-portfolio";

export interface CampusV3Product {
  id: CampusV3ProductId;
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
  /** Up to 5 headline scope items shown by default. */
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

export interface CampusV3Problem {
  index: string;
  title: string;
  body: string;
}

export interface CampusV3Step {
  step: string;
  title: string;
  body: string;
}

export interface CampusV3Faq {
  q: string;
  a: string;
}

export interface CampusV3Case {
  name: string;
  englishName?: string;
  slug?: string;
  externalUrl?: string;
  role: string;
  blurb: string;
  /** Consent to feature on the SALES page. Default false. */
  approvedForCampus: boolean;
}

/** A fictional demo screen — used only in the always-on 결과물 미리보기 area. */
export interface CampusV3Demo {
  /** Product this demo illustrates. */
  productId: CampusV3ProductId;
  /** Price/positioning label shown on the demo card. */
  label: string;
  /** "크게 보기" destination. */
  href: string;
  hrefLabel: string;
}

export interface CampusV3Offer {
  applyFormUrl: string | null;
  hero: {
    eyebrow: string;
    /** Plain title with a deliberate line break (\n). */
    title: string;
    /** The word inside the title to highlight (rendered in accent). */
    highlight: string;
    subtitle: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    /** Short reassurance chips under the hero actions. */
    proof: string[];
  };
  problems: {
    title: string;
    lead: string;
    cards: CampusV3Problem[];
  };
  difference: {
    earlybird: string;
    interviewPortfolio: string;
  };
  products: CampusV3Product[];
  process: CampusV3Step[];
  /** Service-wide honest boundaries (포함하지 않는 범위). */
  boundaries: string[];
  reviewNote: string;
  cases: CampusV3Case[];
  faqs: CampusV3Faq[];
}

export const campusV3Offer: CampusV3Offer = {
  // Same rule as V2: no verified intake destination exists yet. Keep null so the
  // apply CTA stays disabled and the whole /campus-v3/ route stays noindex.
  applyFormUrl: null,

  hero: {
    eyebrow: "4학년·졸업예정자 첫 10명 초기 고객 모집",
    title: "좋은 경험도 흩어져 있으면\n약하게 읽힙니다.",
    highlight: "흩어져 있으면",
    subtitle:
      "인턴, 공모전, 팀 프로젝트, 노션과 깃허브까지. 따로 흩어진 자료를 읽기 좋은 순서로 정리해 하나의 커리어 웹페이지로 만듭니다. 꾸미는 것보다 무엇을 먼저 보여줄지부터 함께 정합니다.",
    primaryCtaLabel: "49,000원 초기 고객 신청",
    secondaryCtaLabel: "결과물 미리보기",
    proof: ["모바일·PC 반응형", "링크 하나로 공유", "자료 검토·순서 구성 포함"],
  },

  problems: {
    title: "경험의 개수가 아니라,\n읽히는 순서가 인상을 만듭니다.",
    lead: "채용 담당자는 지원자의 모든 파일을 오래 찾아보지 않습니다. 흩어진 자료는 무엇부터 봐야 할지 알기 어려워, 같은 경험도 약하게 읽힙니다.",
    cards: [
      {
        index: "01",
        title: "이력서 한 줄로는 줄어듭니다",
        body: "프로젝트 맥락, 내가 맡은 역할, 결과를 한두 줄로 압축하면 강점이 사라집니다.",
      },
      {
        index: "02",
        title: "링크가 너무 흩어집니다",
        body: "노션·깃허브·블로그·PDF를 따로 보내면 상대가 무엇부터 봐야 할지 알기 어렵습니다.",
      },
      {
        index: "03",
        title: "꾸미기보다 순서가 어렵습니다",
        body: "첫 화면에서 무엇을 말하고, 어떤 프로젝트를 먼저 보여줄지가 인상을 바꿉니다.",
      },
    ],
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
      tagline: "나를 빠르게 이해시키는 맞춤형 1페이지",
      summary:
        "제출한 자료를 직접 읽고, 어떤 경험을 먼저 보여줄지 순서를 잡습니다. 첫 화면 소개 문장부터 경험·프로젝트가 읽히는 흐름까지 사람마다 다르게 구성한, 나에게 맞춘 1페이지입니다.",
      coreIncludes: [
        "제출 자료 검토와 핵심 경험 선별",
        "첫 화면 소개 문장 작성",
        "경험·프로젝트가 읽히는 순서 구성",
        "모바일·PC 개인 웹페이지",
        "고객 피드백 일괄 반영 1회",
      ],
      moreIncludes: [
        "경험 우선순위 정리",
        "필요한 범위의 문장 재작성",
        "사람마다 다른 첫 화면과 정보구조",
        "개인 웹페이지 URL",
        "이력서·노션·깃허브·PDF 등 외부 링크 연결",
        "주요 경험 최대 4개 · 프로젝트 요약 최대 3개",
        "자료 확인 또는 인터뷰 최대 30분",
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
      tagline: "내가 실제로 일한 방식을 프로젝트 사례로 증명하는 사이트",
      summary:
        "“나는 이런 사람입니다”를 보여주는 1페이지를 넘어, “나는 실제로 이런 문제를 이렇게 해결했습니다”를 증명합니다. 대표 프로젝트를 상세 사례로 다시 쓰고 근거 자료까지 연결해, 면접에서 프로젝트를 설명하고 증명할 수 있게 합니다.",
      featured: true,
      featuredBadge: "면접에서 프로젝트를 설명해야 한다면",
      coreIncludes: [
        "얼리버드 커리어 프로필의 전체 범위",
        "대표 프로젝트 상세 사례 최대 2개",
        "문제 → 역할 → 판단 → 행동 → 결과 구조화",
        "PDF·이미지·영상 등 근거 자료 연결",
        "프로젝트별 고유 URL과 피드백 2회",
      ],
      moreIncludes: [
        "각 프로젝트를 문제·상황 → 역할 → 판단 이유 → 실제 행동 → 결과와 근거 → 배운 점 구조로 재작성",
        "실제 기획서·보고서·이미지·영상 등 근거 자료 연결",
        "PDF 웹 열람 최대 1개",
        "이미지 갤러리 최대 1개",
        "영상 또는 Figma 임베드 최대 1개",
        "면접 중 빠르게 넘겨볼 수 있는 프로젝트 탐색 구조",
        "프로젝트 요약 인쇄용 보기",
      ],
      conditional: [
        "지원 직무별 첫 화면 2종",
        "비밀번호 보호 프로젝트",
        "발표형 면접 모드",
      ],
    },
  ],

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
    "합격을 보장하지 않습니다. 이 페이지는 경험을 더 쉽게 이해하도록 돕는 보조 자료입니다.",
    "없는 경력이나 성과를 억지로 부풀리지 않습니다. 지금 가진 자료로 가능한 구성을 함께 정리합니다.",
    "무제한 수정은 아닙니다. 상품별로 정해진 피드백 반영 횟수 안에서 진행합니다.",
    "자소서 전체 첨삭이나 면접 컨설팅은 이 상품 범위가 아닙니다.",
  ],

  reviewNote:
    "첫 10명 초기 고객에게는 완성 후 5분 내외의 솔직한 사용 피드백을 부탁드립니다. 좋은 평가나 특정 별점을 요구하지 않으며, 후기는 결과물을 받는 조건이 아닙니다.",

  // Candidate cases, priority order. All approvedForCampus:false until the person
  // explicitly consents to this SALES page — separate from their profile being
  // public. Zero approvals → the section and its nav link do not render in
  // production. (Same list and consent state as V2.)
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
      a: "가능합니다. 현재 가진 자료로 어떤 구성이 가능한지와, 1페이지형과 프로젝트 상세형 중 어느 쪽이 적합한지 안내드립니다. 없는 경력이나 성과를 억지로 부풀리지는 않습니다.",
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

/** Demo cards on the always-on 결과물 미리보기 section. */
export const campusV3Demos: CampusV3Demo[] = [
  {
    productId: "earlybird",
    label: "49,000원 — 나를 빠르게 이해시키는 맞춤형 1페이지",
    href: "/campus-v3/demo/profile/",
    hrefLabel: "1페이지 구성 크게 보기",
  },
  {
    productId: "interview-portfolio",
    label: "199,000원 — 내가 어떻게 일했는지 증명하는 프로젝트 사례 사이트",
    href: "/campus-v3/demo/project/",
    hrefLabel: "프로젝트 상세 구성 크게 보기",
  },
];

/**
 * Fictional persona for the DEMO screens ONLY. Not a real person. No real
 * school, company, review, or metric. Every surface that shows this data also
 * shows a "DEMO · 실제 고객 사례 아님" label. `demoName` is intentionally a
 * single given name with no surname so it never reads as a specific real person.
 */
export const campusV3DemoPersona = {
  demoName: "가온",
  demoTag: "가상 예시 인물 · DEMO",
  role: "서비스 기획 지망 · 2027 졸업예정(가상)",
  avatar: "가",
  headline: "복잡한 정보를\n사용자가 따라오는 흐름으로\n바꾸는 기획을 지향합니다.",
  oneLine:
    "흩어진 요구사항을 정리해 사용자가 헤매지 않는 순서로 다시 설계하는 것을 좋아합니다.",
  chips: ["서비스 기획", "UX 리서치", "데이터 정리"],
  experiences: [
    "교내 창업 동아리에서 서비스 기획을 맡아 초기 화면 흐름을 설계",
    "지역 소상공인 주문 화면 UX를 팀 프로젝트로 개선",
    "데이터 정리 스터디를 운영하며 지표 읽는 법을 학습",
  ],
  projectSummary: {
    title: "중고 교재 거래 앱 리뉴얼(가상 프로젝트)",
    line: "온보딩에서 이탈하던 지점을 다시 설계한 팀 프로젝트 — 아래는 구성 예시입니다.",
  },
  links: ["이력서 PDF", "노션", "깃허브"],
  // The Interview Portfolio demo project — STAR structure, all illustrative.
  project: {
    title: "중고 교재 거래 앱 리뉴얼",
    subtitle: "온보딩 이탈 지점 다시 설계하기 (가상 프로젝트 · DEMO)",
    demoUrl: "gaon.example/projects/textbook-app",
    role: "팀 5명 중 서비스 기획 · 온보딩 흐름 담당(가상)",
    steps: [
      {
        key: "문제 · 상황",
        body: "가입 첫 화면에서 이용자가 다음에 무엇을 해야 할지 몰라 자주 멈추는 문제가 반복됐습니다. (예시 상황)",
      },
      {
        key: "역할",
        body: "요구사항을 모으고, 첫 3개 화면의 순서와 문구를 다시 정하는 일을 맡았습니다. (예시)",
      },
      {
        key: "판단",
        body: "기능을 늘리기보다, 처음 보는 사람이 한 번에 이해할 순서로 화면을 줄이는 쪽을 택했습니다. (예시)",
      },
      {
        key: "행동",
        body: "온보딩을 3단계로 다시 설계하고, 팀과 함께 문구와 버튼 위치를 바꿔 시안을 만들었습니다. (예시)",
      },
      {
        key: "결과 · 근거",
        body: "다시 설계한 흐름을 사용성 점검으로 확인했습니다. 근거 자료는 아래 첨부 위치에 연결됩니다. (예시)",
      },
    ],
    evidence: ["기획서 PDF", "화면 이미지 갤러리", "시연 영상"],
  },
};

/** Cases consented for public/production use. Empty until someone opts in. */
export const approvedV3Cases: CampusV3Case[] = campusV3Offer.cases.filter(
  (c) => c.approvedForCampus,
);
