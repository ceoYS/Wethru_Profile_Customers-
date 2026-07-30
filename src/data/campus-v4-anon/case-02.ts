import type { CampusAnonProfile } from "./types";
import portrait from "../../assets/campus-v4-public/case-02-portrait-safe.webp";

/**
 * Campus V4 — ANONYMIZED mirror profile for case-02 (data-driven marketing).
 *
 * A throwaway, fully de-identified clone of the design/structure only. Every
 * employer, brand, client, project name, exact date, contact channel, and the
 * person's name has been removed or generalized. It is NOT derived from the real
 * customer object at build time — it is authored here so no scrub step can miss a
 * field. The real profile (/profiles/bae-jian/) is untouched and never imported
 * on this path. Theme/layout are kept so the mirror matches the sanitized card
 * screenshot; contact is empty; the portrait is the mosaicked safe asset.
 */
export const profile: CampusAnonProfile = {
  campusAnonymous: true,
  slug: "case-02",
  theme: "navy-black-white",
  layout: "editorial-split",
  status: "published",
  locales: ["ko", "en"],

  seo: {
    title: "지원자 B | 데이터 기반 마케팅 전략",
    description:
      "AI 전환, 마케팅 자동화, 데이터 정제, 퍼포먼스 마케팅을 연결해 마케팅 운영을 설계하는 데이터 기반 마케팅 직무 지원자의 익명 사례입니다.",
  },

  person: {
    name: "지원자 B",
    englishName: "APPLICANT B",
    roleLine: "Data-Driven Marketing Strategist",
    tagline: {
      ko: "데이터와 자동화로, 피드백이 성과로 이어지는 마케팅 구조를 설계합니다.",
      en: "Designing marketing systems where data, automation, and feedback turn into measurable outcomes.",
    },
    summary: {
      ko: "AI 전환, 마케팅 자동화, 데이터 정제, 퍼포먼스 마케팅을 연결해 마케팅 운영이 더 빠르고 정확하게 움직이도록 설계하는 데이터 드리븐 마케팅 전략가입니다.",
      en: "A data-driven marketing strategist connecting AI transformation, marketing automation, data cleaning, and performance marketing to make marketing operations faster and more precise.",
    },
    identitySupport: {
      ko: "현재 국내 대형 컨설팅펌에서 대기업 마케팅 자동화 컨설팅을 수행하며, 스타트업·제조 플랫폼·브랜드 캠페인 프로젝트를 통해 리서치, 광고 운영, UX 분석, 콘텐츠 전략을 실행해왔습니다.",
      en: "Currently consulting on enterprise marketing automation at a large consulting firm, with hands-on experience in research, ad operations, UX analytics, and content strategy across startup, manufacturing-platform, and brand-campaign projects.",
    },
    photo: {
      src: portrait.src,
      alt: "지원자 B 프로필 — 얼굴 비공개 처리",
    },
  },

  // Anonymized mirror: no personal contact channel of any kind.
  contact: {},

  badges: [
    "AI Transformation",
    "Marketing Automation",
    "Data Cleaning",
    "Keyword Intelligence",
    "Performance Marketing",
    "UX Analytics",
  ],

  skills: [
    "AI Transformation",
    "Marketing Automation",
    "Data Cleaning",
    "Keyword Intelligence",
    "Performance Marketing",
    "UX Analytics",
    "Google Analytics",
    "Looker Studio",
    "Hotjar",
    "Microsoft Clarity",
    "Search & Display Ads",
    "A/B Testing",
    "Figma",
    "Automation Workflows",
  ],

  strengths: [
    {
      eyebrow: "AX",
      title: "AI Transformation",
      description: {
        ko: "AI Agent와 자동화 워크플로우를 기획해 마케팅 조직이 실제 업무에서 쓰는 시스템으로 만듭니다.",
        en: "Plans AI agents and automation workflows that marketing teams actually use in day-to-day operations.",
      },
    },
    {
      eyebrow: "Data",
      title: {
        ko: "Data Cleaning & Keyword Intelligence",
        en: "Data Cleaning & Keyword Intelligence",
      },
      description: {
        ko: "대규모 원시 데이터를 정제하고 키워드 지표를 구조화해 의사결정의 기준을 만듭니다.",
        en: "Cleans large-scale raw data and structures keyword metrics into decision-ready signals.",
      },
    },
    {
      eyebrow: "Performance",
      title: "Performance Marketing",
      description: {
        ko: "검색·디스플레이 광고 운영과 성과 분석으로 예산이 정확한 곳에서 움직이게 합니다.",
        en: "Runs search and display campaigns and ties every budget decision to measured outcomes.",
      },
    },
    {
      eyebrow: "UX",
      title: "UX Analytics",
      description: {
        ko: "행동 분석 도구로 사용자 흐름을 분석해 전환이 막히는 구간을 개선합니다.",
        en: "Analyzes user behavior with analytics tools to fix the points where conversion stalls.",
      },
    },
  ],

  experiences: [
    {
      company: { ko: "국내 대형 컨설팅펌", en: "Large Consulting Firm" },
      role: "Consultant · Transformation Technology",
      period: "재직 중",
      description: {
        ko: "국내 대기업 마케팅 자동화(AX) 프로젝트에서 PMO 운영, AI Agent·workflow 기획, 트렌드 리서치, 키워드 지표 트래킹, 데이터 분석 수행.",
        en: "Enterprise marketing AX project — PMO operations, AI agent/workflow planning, trend research, keyword tracking, and data analysis.",
      },
      bullets: [
        {
          ko: "Marketing AX 프로젝트 운영 및 PMO 지원",
          en: "Marketing AX project operations and PMO support",
        },
        {
          ko: "AI Agent / AI workflow 구축 기획",
          en: "Planned AI Agent and AI workflow builds",
        },
        {
          ko: "AI 마케팅 트렌드 리서치",
          en: "AI marketing trend research",
        },
        {
          ko: "키워드 지표 트래킹 및 데이터 수집·분석",
          en: "Keyword metric tracking with data collection and analysis",
        },
        {
          ko: "100만 건 이상 원시 데이터 / 4만 개 이상 키워드 구조화",
          en: "Structured 1M+ raw data entries and 40k+ keywords",
        },
      ],
    },
    {
      company: { ko: "국내 B2B 제조 플랫폼", en: "B2B Manufacturing Platform" },
      role: "Junior Marketer",
      period: "약 6개월",
      description: {
        ko: "B2B 제조 발주 서비스의 디지털 광고, SEO, UX 분석, CRM 운영 담당.",
        en: "Digital ads, SEO, UX analytics, and CRM for a B2B manufacturing order service.",
      },
      bullets: [
        {
          ko: "검색·디스플레이 기반 디지털 광고 기획 및 운영",
          en: "Planned and ran search and display ad campaigns",
        },
        {
          ko: "행동 분석 도구 기반 사용자 행동 분석",
          en: "Analyzed user behavior with analytics tools",
        },
        {
          ko: "UI/UX 개선안 도출",
          en: "Drafted UI/UX improvements",
        },
        {
          ko: "CRM 콜드메일 및 고객 접점 관리",
          en: "Managed CRM cold outreach and customer touchpoints",
        },
        {
          ko: "콘텐츠 및 광고 소재 기획",
          en: "Planned content and ad creatives",
        },
      ],
    },
    {
      company: { ko: "스타트업 데이터 플랫폼", en: "Startup Data Platform" },
      role: "Marketing Intern",
      period: "약 5개월",
      description: {
        ko: "스타트업·VC 데이터 관리, 시장 리서치, 운영 자료 정리 담당.",
        en: "Startup and VC data management, market research, and operations materials.",
      },
      bullets: [
        {
          ko: "1,000건 이상 스타트업 및 VC 데이터 수집·검수",
          en: "Collected and verified data on 1,000+ startups and VCs",
        },
        {
          ko: "시장 및 마케팅 리서치 지원",
          en: "Supported market and marketing research",
        },
        {
          ko: "서비스 운영 자료 정리 및 보고서 작성",
          en: "Organized service operation materials and wrote reports",
        },
      ],
    },
  ],

  additionalExperiences: [
    {
      company: { ko: "브랜드 스타트업", en: "Brand Startup" },
      role: "Project Intern",
      period: "단기 인턴",
    },
    {
      company: { ko: "마케팅 스타트업", en: "Marketing Startup" },
      role: "Marketing Intern",
      period: "단기 인턴",
    },
  ],

  projects: [
    {
      title: { ko: "대학 마케팅 컨설팅 학회 프로젝트", en: "Campus Marketing Consulting Society" },
      role: { ko: "학술부 부장", en: "Academic Team Lead" },
      period: "약 6개월",
      problem: {
        ko: "소상공인의 온라인 접점과 메뉴·가격 구조가 정리되지 않은 상태.",
        en: "A local business with a scattered online presence and unstructured menu and pricing.",
      },
      approach: {
        ko: "지역 검색 채널, SNS 채널, 메뉴 구성, 가격 구조 개선.",
        en: "Reworked the local search listing, social channel, menu structure, and pricing.",
      },
      result: {
        ko: "프로젝트 후 매출 25% 이상 증가.",
        en: "Sales grew more than 25% after the project.",
      },
    },
    {
      title: { ko: "국내 가전 브랜드 캠페인 공모 프로젝트", en: "Home-Appliance Brand Campaign" },
      role: "Team Lead",
      period: "약 9개월",
      problem: {
        ko: "국내 가전 브랜드의 신제품 메시지를 소비자 경험 중심으로 재정의.",
        en: "A home-appliance brand needed its new-product message reframed around the consumer experience.",
      },
      approach: {
        ko: "TVC·IMC 전략 제안서와 일정·예산·KPI 포함 실행안 설계.",
        en: "A TVC and IMC strategy proposal with an execution plan covering schedule, budget, and KPIs.",
      },
      result: {
        ko: "브랜드 마케팅팀·광고대행사 실무진 대상 최종 발표에서 긍정적 평가.",
        en: "Well received by the brand's marketing team and agency practitioners at the final presentation.",
      },
    },
    {
      title: { ko: "국내 면세 기업 마케팅 공모 프로젝트", en: "Duty-Free Marketing Competition" },
      role: "Team Lead",
      period: "약 9개월",
      problem: {
        ko: "면세업계 침체 이후 MZ세대의 오프라인 경험을 온라인 구매로 연결 필요.",
        en: "After the duty-free downturn, younger customers' offline experiences had to be reconnected to online purchases.",
      },
      approach: {
        ko: "소비자 리서치 기반 팝업스토어, SNS 챌린지, 리워드 프로그램 결합.",
        en: "A pop-up store, social challenge, and rewards program grounded in consumer research.",
      },
      result: {
        ko: "최종 경쟁 PT 2위 수상.",
        en: "Won 2nd place in the final competitive pitch.",
      },
    },
  ],

  proofs: [
    { value: "1M+", label: "Raw Data Entries" },
    { value: "40k+", label: "Keywords Structured" },
    { value: "900+", label: { ko: "TOEIC", en: "TOEIC" } },
    { value: "+27%", label: "UX Retention" },
    { value: "1,000+", label: { ko: "스타트업·VC 데이터", en: "Startup & VC Data" } },
    { value: "AX", label: { ko: "마케팅 AX 프로젝트", en: "Marketing AX Project" } },
  ],

  privacy: {
    hideAddress: true,
    hideBirthDate: true,
    hidePhoneByDefault: true,
  },
};
