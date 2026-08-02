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
 *   A. 프로필 베이직 —  99,000원 (8월 31일까지 · 첫 10명 런칭가)
 *      이미 가진 자료를 보기 좋은 커리어 페이지로 정리한다.
 *   B. 커리어 스토리 — 199,000원
 *      자료를 다시 해석해 지원 직무에 맞는 이야기로 설계한다.
 *
 * The boundary between them is the one thing a visitor must understand in five
 * seconds: A organises material that is already written, B re-interprets it. The
 * 30분 온라인 인터뷰 is what makes that possible, so it is B-only and is named in
 * A's 포함하지 않음 list. Any edit that blurs the line — an interview in A, mere
 * "정리" language in B, matching 경험 counts — removes the page's whole reason for
 * showing two prices.
 *
 * The launch price is a real, dated window — not a discount theatre. There is no
 * prior list price for this product, so nothing here may render a struck-through
 * "정가", a "-50%", or a "기존가 198,000원". State the price, the end date, and
 * why it changes afterwards. When 8/31 passes, edit these numbers by hand; the
 * date lives in exactly three places that must move together — hero.deadline,
 * products[0].priceBadge and products[0].priceNote. Do not build anything that
 * rolls the same promotion forward on its own.
 *
 * Safety model carried over verbatim from V2/V3:
 * - applyFormUrl is the WeThru KakaoTalk channel 1:1 chat — the one verified
 *   intake destination. Do NOT invent any other URL, and never point it at a
 *   Google Form. Every page on this route still carries noindex,nofollow; that
 *   gate is now set explicitly in campus-v4.astro, not derived from this field.
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
 * - The 커리어 스토리 구성 예시 (ipPreview) is the ONLY illustrative block.
 *   It is small, secondary (inside the products area, never the hero), and always
 *   labelled "구성 예시 · 실제 구매 사례 아님". It invents no person, school, or metric.
 * - No copy judges whether a student's experience is worth a page or whether they
 *   qualify. WeThru organises what the current material can become; the three real
 *   cases prove design/editing ability, NOT that they bought 커리어 스토리.
 */

export type CampusV4ProductId = "basic" | "story";

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
  /**
   * Emphasis badge for the featured (커리어 스토리) card. Exactly ONE badge is
   * allowed here and it must describe the scope difference (e.g. "인터뷰 포함"),
   * never rank or push — no "추천", no "베스트", no invented discount rate.
   */
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

/** The small, illustrative 커리어 스토리 구성 예시 (never a real case). */
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
    lead: string;
  };
  /**
   * The two-product split, stated in the visitor's own terms. `compare` is the
   * plain-price version rendered as its own strip directly above the cards, so
   * the difference is readable before anyone opens 세부 범위 보기. Each line is
   * split into `price` + `body` so the template can bold the number without a
   * second copy of the sentence living in the markup; the rendered result is
   * "{price}은 {body}".
   */
  difference: {
    basic: string;
    story: string;
    compare: {
      basic: { price: string; body: string };
      story: { price: string; body: string };
      note: string;
    };
  };
  products: CampusV4Product[];
  ipPreview: CampusV4IpPreview;
  process: CampusV4Step[];
  boundaries: string[];
  reviewNote: string;
  cases: CampusV4Case[];
  faqs: CampusV4Faq[];
}

export const campusV4Offer: CampusV4Offer = {
  // The verified intake destination is the WeThru KakaoTalk channel's 1:1 chat
  // (not the channel home). It replaces the never-created apply form: there is
  // no Google Form behind this route and none may be added. Indexing is decided
  // separately in campus-v4.astro — this URL no longer lifts the noindex gate.
  applyFormUrl: "https://pf.kakao.com/_wRVBX/chat",

  hero: {
    eyebrow: "4학년·졸업예정자 첫 10명 초기 고객 모집",
    deadline: "8.31 마감 · 첫 10명",
    title: "이력서에 다 못 담은 나를,\n한 링크로 보여주세요.",
    highlight: "한 링크로",
    subtitle:
      "인턴, 공모전, 프로젝트, 노션과 깃허브까지. 흩어진 경험을 읽히는 순서로 정리해 나만의 커리어 웹페이지로 만듭니다.",
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

  realCases: {
    title: "같은 템플릿에 이름만\n바꾸지 않습니다.",
    lead: "아래는 실제로 제작한 1페이지 커리어 프로필입니다. 사람마다 강조해야 할 경험이 달라 첫 화면과 정보구조도 다르게 만들었습니다.",
  },

  difference: {
    basic: "이미 가진 자료를 보기 좋은 커리어 페이지로 정리",
    story: "자료를 다시 해석해 지원 직무에 맞는 이야기로 설계",
    compare: {
      basic: { price: "99,000원", body: "기존 자료를 정리하는 상품입니다." },
      story: {
        price: "199,000원",
        body: "커리어의 전달 구조부터 다시 설계하는 상품입니다.",
      },
      note: "두 상품 모두 상담으로 범위를 먼저 확인한 뒤 진행합니다. 신청한다고 바로 결제되지 않습니다.",
    },
  },

  products: [
    {
      id: "basic",
      name: "프로필 베이직",
      price: "99,000원",
      priceBadge: "8월 31일까지 · 첫 10명 런칭가",
      priceNote:
        "9월부터 제작시간과 초기 고객 피드백을 반영해 가격이 조정됩니다.",
      tagline: "이미 가진 자료를 보기 좋은 커리어 페이지로 정리합니다.",
      summary:
        "기존 자료는 준비되어 있고, 빠르게 하나의 링크로 정리하고 싶은 분께 적합합니다.",
      // The six headline items are what the visitor compares against 커리어
      // 스토리 line by line, so each one has a deliberate counterpart there:
      // 최대 4개 vs 8개, 교정·요약 vs 전면 재작성, 수정 1회 vs 2회.
      coreIncludes: [
        "이력서·자기소개서·포트폴리오 기반",
        "지원 직무 1개 기준",
        "기본 섹션 구성",
        "핵심 경험·프로젝트 최대 4개",
        "기존 문장 교정 및 요약",
        "수정 1회",
      ],
      moreIncludes: [
        "모바일·PC 반응형 개인 URL",
        "이력서·노션·깃허브·PDF 등 외부 링크 연결",
        "제출한 자료를 기준으로 제작 (별도 인터뷰 없음)",
      ],
      // The interview is listed here on purpose. It is the single clearest
      // dividing line between the two products, so naming it as "not included"
      // is what stops 99,000원 from reading as a cheaper 커리어 스토리.
      excludes: [
        "30분 온라인 인터뷰 (커리어 스토리에 포함)",
        "지원 직무에 맞춘 강점 방향 재설계",
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
      id: "story",
      name: "커리어 스토리",
      price: "199,000원",
      tagline: "자료를 다시 해석해 지원 직무에 맞는 이야기로 설계합니다.",
      summary:
        "자료는 있지만 무엇을 강조해야 할지 모르거나, 지원 직무에 맞게 전달 구조부터 다시 만들고 싶은 분께 적합합니다.",
      featured: true,
      // One badge only, and it names the scope difference rather than ranking
      // the product. See CampusV4Product.featuredBadge.
      featuredBadge: "인터뷰 포함",
      coreIncludes: [
        "30분 온라인 인터뷰",
        "지원 직무와 강점 방향 정리",
        "개인별 섹션 구성 설계",
        "핵심 경험·프로젝트 최대 8개",
        "제목·소개·경험 문장 전면 재작성",
        "수정 2회",
      ],
      moreIncludes: [
        "모바일·PC 반응형 개인 URL",
        "대표 프로젝트 상세 사례 최대 2개와 프로젝트별 고유 URL",
        "문제·상황 → 역할 → 판단 이유 → 행동 → 결과와 근거 → 배운 점 구조화",
        "실제 기획서·보고서·이미지·영상 등 근거 자료 연결",
        "PDF 웹 열람 최대 1개 · 이미지 갤러리 최대 1개",
        "영상 또는 Figma 임베드 최대 1개",
        "면접 중 빠르게 넘겨볼 수 있는 프로젝트 탐색 구조",
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
    lead: "커리어 스토리는 대표 프로젝트 하나를 아래 흐름으로 다시 씁니다. 실제 구매 사례가 아니라, 상품이 만드는 구성의 예시입니다.",
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

  // Scope statements only. Two outcome-disclaimer lines were removed at the
  // owner's request; do not reintroduce them here or as a reworded equivalent
  // elsewhere on the route.
  boundaries: [
    "무제한 수정은 아닙니다. 상품별로 정해진 피드백 반영 횟수 안에서 진행합니다.",
    "자소서 전체 첨삭이나 면접 컨설팅은 이 상품 범위가 아닙니다.",
  ],

  reviewNote:
    "첫 10명 초기 고객에게는 완성 후 5분 내외의 솔직한 사용 피드백을 부탁드립니다. 좋은 평가나 특정 별점을 요구하지 않으며, 후기는 결과물을 받는 조건이 아닙니다.",

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
      a: "프로필 베이직(99,000원)은 이미 가진 자료를 정리하는 상품입니다. 제출한 이력서·자기소개서·포트폴리오를 기준으로 지원 직무 1개에 맞춰 핵심 경험·프로젝트를 최대 4개까지 배치하고, 기존 문장을 교정·요약합니다. 커리어 스토리(199,000원)는 전달 구조부터 다시 설계하는 상품입니다. 30분 온라인 인터뷰로 지원 직무와 강점 방향을 먼저 정리한 뒤 섹션 구성을 새로 짜고, 경험·프로젝트를 최대 8개까지 다루며 제목·소개·경험 문장을 전면 재작성합니다. 수정은 각각 1회와 2회입니다.",
    },
    {
      q: "그냥 노션을 쓰면 되지 않나요?",
      a: "노션도 좋은 방법입니다. 이미 잘 정리돼 있다면 새로 만들 필요가 없습니다. 차이는 직무에 맞춰 무엇을 먼저 보여줄지 순서를 잡고, 모바일에서 링크 하나로 깔끔하게 공유되도록 다듬는 부분입니다.",
    },
    {
      q: "커리어 스토리는 누구에게 필요한가요?",
      a: "자료는 모여 있지만 지원 직무에 맞춰 무엇을 앞세워야 할지 정하기 어려운 분에게 맞습니다. 30분 인터뷰로 강점 방향을 먼저 잡고 섹션 구성과 문장을 새로 씁니다.",
    },
    {
      q: "프로젝트가 별로 없어도 신청할 수 있나요?",
      a: "가능합니다. 현재 가진 자료로 어떤 구성이 가능한지와, 프로필 베이직과 커리어 스토리 중 어느 쪽이 적합한지 상담에서 안내드립니다.",
    },
    {
      q: "수정은 몇 번 가능한가요?",
      a: "프로필 베이직은 피드백 일괄 반영 1회, 커리어 스토리는 2회를 기준으로 합니다. 무제한 수정은 아니며, 정해진 횟수 안에서 문구·순서·구성을 반영합니다.",
    },
    {
      q: "어떤 자료를 준비해야 하나요?",
      a: "지원 직무 한 가지, 보여줄 경험 2~4개, 이력서·노션·깃허브·PDF 같은 원본 링크면 시작할 수 있습니다. 부족한 설명은 상담에서 확인하고, 커리어 스토리는 30분 온라인 인터뷰로 채웁니다. 완벽하지 않아도 됩니다.",
    },
  ],
};

/** Cases consented for public/production use. Empty until someone opts in. */
export const approvedV4Cases: CampusV4Case[] = campusV4Offer.cases.filter(
  (c) => c.approvedForCampus,
);
