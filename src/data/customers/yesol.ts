import type { CustomerProfile } from "../../types/profile";

export const profile: CustomerProfile = {
  slug: "yesol",
  theme: "cobalt-air",
  layout: "editorial-split",
  status: "published",
  locales: ["ko", "en"],

  seo: {
    title: "조예솔 | Beauty Commerce MD & Growth Marketer",
    description:
      "데이터 기반 상품 기획과 프로모션으로 뷰티·글로벌 커머스 브랜드의 매출 성장을 이끄는 조예솔님의 온라인 프로필입니다.",
    ogImage: "/og/placeholder-og.svg",
  },

  person: {
    name: "조예솔",
    englishName: "JO YESOL",
    roleLine: {
      ko: "커머스 MD · 그로스 마케터",
      en: "Commerce MD · Growth Marketer",
    },
    tagline: {
      ko: "데이터로 상품과 프로모션을 설계해, 브랜드 매출이 실제로 자라게 만듭니다.",
      en: "Designing products and promotions with data, so brand revenue actually grows.",
    },
    summary: {
      ko: "뷰티·글로벌 커머스에서 상품 기획부터 프로모션, 광고 운영, 상세페이지 디렉션까지 브랜드 운영 전반을 담당해온 MD이자 그로스 마케터입니다. 손익 분석과 성과 데이터를 근거로 프로모션을 설계하고 ROAS·객단가·재고 회전을 함께 끌어올립니다.",
      en: "An MD and growth marketer who runs brand operations end to end — product planning, promotions, ad operations, and detail-page direction — across beauty and global commerce. Every promotion is built from P&L and performance data to lift ROAS, average order value, and inventory turns together.",
    },
    identitySupport: {
      ko: "현재 토스쇼핑에서 입점 브랜드의 거래액 성장을 담당하며, 이전에는 글로벌 뷰티 커머스와 증권사 재경팀에서 데이터 기반 운영과 정합성 관리를 경험했습니다.",
      en: "Currently driving GMV growth for onboarded brands at Toss Shopping, after data-driven operations in global beauty commerce and financial-close work at a securities firm.",
    },
    photo: {
      src: "/images/customers/yesol/profile.webp",
      alt: "조예솔 프로필 사진",
    },
  },

  contact: {
    email: "ys.cho@tossshopping.com",
    showEmail: true,
    showPhone: false,
  },

  badges: [
    "Beauty Commerce",
    "Merchandising",
    "Promotion Strategy",
    "Performance Ads",
    "Data Analysis",
    "Global Localization",
  ],

  skills: [
    "Excel (VLOOKUP·Pivot)",
    "Figma",
    "Notion",
    "Slack",
    "PowerPoint",
    "Qoo10 Ads",
    "Naver Blog SEO",
    "A/B Testing",
    "P&L / Margin Analysis",
    "ROAS Optimization",
    "STP Positioning",
    "Google Forms",
  ],

  strengths: [
    {
      eyebrow: "Insight",
      title: {
        ko: "소비자·시장 통찰력",
        en: "Consumer & Market Insight",
      },
      description: {
        ko: "시장·소비자 분석과 STP로 브랜드 포지셔닝과 프로모션 전략을 세웁니다.",
        en: "Builds brand positioning and promotion strategy from market and consumer analysis with STP.",
      },
    },
    {
      eyebrow: "Profit",
      title: {
        ko: "데이터 기반 수익성 관리",
        en: "Data-Driven Profitability",
      },
      description: {
        ko: "상품별 손익표와 마진·손익분기 분석으로 수익성과 경쟁력을 동시에 확보합니다.",
        en: "Uses per-product P&L, margin, and break-even analysis to protect profitability and competitiveness at once.",
      },
    },
    {
      eyebrow: "Growth",
      title: {
        ko: "프로모션 & 그로스 실행",
        en: "Promotion & Growth Execution",
      },
      description: {
        ko: "특가·컬래버·리뷰 이벤트와 광고 최적화를 묶어 매출과 재고 회전을 함께 끌어올립니다.",
        en: "Combines deals, collabs, review events, and ad optimization to lift both sales and inventory turns.",
      },
    },
    {
      eyebrow: "Craft",
      title: {
        ko: "비주얼 디렉션 & 콘텐츠",
        en: "Visual Direction & Content",
      },
      description: {
        ko: "상세페이지·썸네일·카탈로그를 A/B로 검증하고 글로벌 현지화까지 디렉션합니다.",
        en: "Directs detail pages, thumbnails, and catalogs — validated by A/B tests and localized for global markets.",
      },
    },
  ],

  experiences: [
    {
      company: { ko: "비바리퍼블리카 (토스쇼핑)", en: "Viva Republica (Toss Shopping)" },
      role: "Merchandising Associate",
      period: "2025.10 ~ Present",
      description: {
        ko: "토스쇼핑 입점 브랜드의 거래액 성장과 프로모션 운영을 담당하는 커머스 MD.",
        en: "Commerce MD driving GMV growth and promotions for brands onboarded to Toss Shopping.",
      },
      bullets: [
        {
          ko: "입점 브랜드 거래액 성장 전략 실행 및 카테고리 볼륨 확장",
          en: "Ran GMV-growth strategies for onboarded brands and expanded category volume",
        },
        {
          ko: "포라·조은식구 등 셀러 거래액 극대화 — 첫 컨택 후 규모 68배 이상 확대",
          en: "Maximized seller GMV (Fora, Joeun-Sikgu) — 68×+ scale after first contact",
        },
        {
          ko: "하루특가·기획전 프로모션으로 정육·수산 카테고리 TOP3 진입",
          en: "Drove daily-deal and feature promotions into a category TOP 3",
        },
        {
          ko: "'기획전 신청 자동화 시트'·'프로모션 안내서' 제작으로 운영 생산성 개선",
          en: "Built a feature-request automation sheet and promotion guide that improved operational productivity",
        },
        {
          ko: "Commerce Monthly 딜당 거래액 최우수자 선정 및 성장 노하우 사내 발표",
          en: "Named top performer for GMV-per-deal in Commerce Monthly and presented growth know-how internally",
        },
      ],
    },
    {
      company: { ko: "부스트랩", en: "Boostrap" },
      role: { ko: "글로벌1팀 MD 인턴", en: "Global Team MD Intern" },
      period: "2025.06 ~ 2025.09",
      description: {
        ko: "글로벌(일본) 뷰티 커머스에서 상품 기획, 광고 운영, 상세페이지 현지화를 담당.",
        en: "Product planning, ad operations, and detail-page localization for global (Japan) beauty commerce.",
      },
      bullets: [
        {
          ko: "글로벌 뷰티 브랜드 매출·실적 지표 분석 및 KPI 관리",
          en: "Analyzed sales and performance metrics and managed KPIs for global beauty brands",
        },
        {
          ko: "Qoo10 광고·스마트세일 운영으로 ROAS 86%→166% 개선",
          en: "Ran Qoo10 ads and smart sales, improving ROAS from 86% to 166%",
        },
        {
          ko: "손익 분석 기반 세트·기획전 상품 구성 및 프로모션 운영",
          en: "Composed sets and feature products from P&L analysis and ran promotions",
        },
        {
          ko: "일본·글로벌 유저 타겟 상세페이지 기획 및 현지화 번역",
          en: "Planned and localized detail pages for Japanese and global users",
        },
      ],
    },
    {
      company: { ko: "유진투자증권", en: "Eugene Investment & Securities" },
      role: { ko: "재경팀 인턴", en: "Finance Team Intern" },
      period: "2024.12 ~ 2025.05",
      description: {
        ko: "결산·감사 대응과 재무 데이터 검증, 보고 프로세스 자동화를 지원.",
        en: "Supported closings, audit response, financial-data verification, and reporting automation.",
      },
      bullets: [
        {
          ko: "월말·분기 결산 및 재무제표 기초 데이터 정리",
          en: "Supported monthly and quarterly closings and financial-statement base data",
        },
        {
          ko: "기말·정기 감사 수감 자료 준비 및 감사인 요구 자료 신속 대응",
          en: "Prepared audit materials and responded quickly to auditor requests",
        },
        {
          ko: "보고서 자동화·템플릿 표준화로 마감 처리 시간 단축",
          en: "Standardized report templates and automation, shortening close time",
        },
        {
          ko: "Advanced Excel(VLOOKUP·피벗)로 데이터 정합성 확보, 마감 기한 100% 준수",
          en: "Ensured data integrity with advanced Excel (VLOOKUP, pivot); met 100% of deadlines",
        },
      ],
    },
  ],

  additionalExperiences: [
    {
      company: { ko: "네이버 블로그 인플루언서", en: "Naver Blog Influencer" },
      role: { ko: "브랜드 협업 콘텐츠 · SEO", en: "Brand Content & SEO" },
      period: "2020 ~ 2025",
    },
  ],

  projects: [
    {
      title: {
        ko: "데이터 기반 수익 최적화",
        en: "Data-Driven Profit Optimization",
      },
      role: { ko: "MD 인턴 · 상품 기획", en: "MD Intern · Merchandising" },
      period: "2025",
      problem: {
        ko: "신규 브랜드의 수익성과 성장 기회가 데이터로 정리되지 않은 상태.",
        en: "A new brand's profitability and growth levers weren't organized into data.",
      },
      approach: {
        ko: "경쟁사 포지셔닝 분석과 상품별 손익표로 마진 기반 프로모션 구성을 기획.",
        en: "Analyzed competitor positioning and built per-product P&L to design margin-based promotions.",
      },
      result: {
        ko: "13일 프로모션에서 신규 고객 5.5K 확보, 전월 대비 매출 133% 성장.",
        en: "A 13-day promotion won 5.5K new customers and grew revenue 133% month over month.",
      },
    },
    {
      title: { ko: "성장 해킹 프로모션", en: "Growth-Hacking Promotion" },
      role: { ko: "기획 · 운영 리드", en: "Planning & Ops Lead" },
      period: "2025",
      problem: {
        ko: "바디케어 과재고와 신규 브랜드의 인지도·리뷰 자산 부족.",
        en: "Body-care overstock plus weak awareness and review assets for a new brand.",
      },
      approach: {
        ko: "손익 기반 특가, IP 컬래버, 포토리뷰 이벤트, 목표 ROAS 광고를 묶은 멀티 솔루션 설계.",
        en: "A multi-solution mix of P&L-based deals, an IP collab, photo-review events, and target-ROAS ads.",
      },
      result: {
        ko: "ROAS 86%→166%, 광고비 비중 116%→60%, 신규 리뷰 1,438건 확보.",
        en: "ROAS rose 86→166%, ad-cost ratio fell 116→60%, and 1,438 new reviews were gathered.",
      },
    },
    {
      title: {
        ko: "비주얼 디렉션 & 콘텐츠 최적화",
        en: "Visual Direction & Content Optimization",
      },
      role: { ko: "콘텐츠 디렉션", en: "Content Direction" },
      period: "2025",
      problem: {
        ko: "차별화 요소 부재와 비효율적 콘텐츠로 상세페이지 이탈 발생.",
        en: "Undifferentiated, inefficient content drove drop-off on product pages.",
      },
      approach: {
        ko: "USP 중심 상세페이지 리뉴얼, 썸네일 A/B 테스트, 카탈로그·일본어 현지화로 브랜드 자산 재정비.",
        en: "Rebuilt brand assets — USP-led detail pages, A/B-tested thumbnails, catalog renewal, and Japanese localization.",
      },
      result: {
        ko: "썸네일 개선으로 클릭률과 매출 상승, 인쇄비 절감과 브랜드 인지도 제고.",
        en: "Better thumbnails lifted CTR and sales, cut print costs, and raised brand awareness.",
      },
    },
  ],

  proofs: [
    { value: "166%", label: { ko: "ROAS · 86→166", en: "ROAS · 86→166" } },
    { value: "1,438", label: { ko: "신규 리뷰", en: "New Reviews" } },
    { value: "68×", label: { ko: "셀러 거래액 성장", en: "Seller GMV Growth" } },
    { value: "5.5K", label: { ko: "신규 고객 · 13일", en: "New Customers · 13d" } },
    { value: "+133%", label: { ko: "전월 대비 매출", en: "MoM Revenue" } },
    { value: "185%", label: { ko: "재고 소진 달성률", en: "Sell-through Rate" } },
  ],

  privacy: {
    hideAddress: true,
    hideBirthDate: true,
    hidePhoneByDefault: true,
  },
};
