import type { CustomerProfile } from "../../types/profile";

export const profile: CustomerProfile = {
  slug: "bae-jian",
  theme: "navy-black-white",
  layout: "editorial-split",
  status: "published",
  locales: ["ko", "en"],

  seo: {
    title: "배지안 | Data-Driven Marketing Strategist",
    description:
      "AI Transformation, 마케팅 자동화, 데이터 클리닝, 퍼포먼스 마케팅을 연결해 마케팅 운영을 설계하는 배지안님의 온라인 프로필입니다.",
    ogImage: "/og/placeholder-og.svg",
  },

  person: {
    name: "배지안",
    englishName: "BAE JIAN",
    roleLine: "Data-Driven Marketing Strategist",
    tagline: {
      ko: "데이터와 자동화로, 피드백이 반영된 시도로 정확한 마케팅 성과를 보여주는 팀원",
      en: "A teammate who turns data, automation, and feedback-driven iteration into precise marketing results.",
    },
    summary: {
      ko: "AI Transformation, 마케팅 자동화, 데이터 클리닝, 퍼포먼스 마케팅을 연결해 마케팅 운영이 더 빠르고 정확하게 움직이도록 설계하는 데이터 드리븐 마케팅 전략가입니다.",
      en: "A data-driven marketing strategist connecting AI Transformation, marketing automation, data cleaning, and performance marketing to make marketing operations faster and more precise.",
    },
    identitySupport: {
      ko: "현재 EY컨설팅에서 대기업 마케팅 자동화 컨설팅 중이며 스타트업·제조 플랫폼·브랜드 캠페인 프로젝트를 통해 리서치, 광고 운영, UX 분석, 콘텐츠 전략을 실행해왔습니다.",
      en: "Currently consulting on enterprise marketing automation at EY Consulting, with hands-on experience in research, ad operations, UX analytics, and content strategy across startup, manufacturing-platform, and brand campaign projects.",
    },
    photo: {
      src: "/images/customers/bae-jian/profile.webp",
      alt: "배지안 프로필 사진",
    },
  },

  contact: {
    email: "Jian.bae.biz@gmail.com",
    showEmail: true,
    showPhone: false,
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/jianbaebiz/" },
      { label: "Portfolio", href: "https://buly.kr/FAdcFvx" },
    ],
  },

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
    "Google Ads",
    "Naver SA/DA",
    "Figma",
    "Photoshop",
    "Canva",
    "JIRA",
    "SharePoint",
    "n8n",
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
        ko: "Google·Naver 광고 운영과 성과 분석으로 예산이 정확한 곳에서 움직이게 합니다.",
        en: "Runs Google and Naver campaigns and ties every budget decision to measured outcomes.",
      },
    },
    {
      eyebrow: "UX",
      title: "UX Analytics",
      description: {
        ko: "Hotjar, Microsoft Clarity로 사용자 행동을 분석해 전환이 막히는 구간을 개선합니다.",
        en: "Analyzes user behavior with Hotjar and Microsoft Clarity to fix the points where conversion stalls.",
      },
    },
  ],

  experiences: [
    {
      company: { ko: "EY컨설팅", en: "EY Consulting" },
      role: "Consultant / TC-Tech, Transformation Technology",
      period: "2025.09 ~ Present",
      description: {
        ko: "국내 전자 대기업의 마케팅 자동화(AX) 프로젝트에서 PMO 운영, AI Agent·AI workflow 구축 기획, AI Marketing Trend 리서치, 키워드 지표 트래킹, 데이터 수집·분석 업무를 수행했습니다.",
        en: "Supported the planning and operational execution of a Marketing AI Transformation initiative for a leading electronics corporation, including PMO operations, AI Agent/workflow planning, AI marketing trend research, keyword tracking, and data analysis.",
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
          ko: "AI Marketing Trend 리서치",
          en: "AI marketing trend research",
        },
        {
          ko: "키워드 지표 트래킹 및 데이터 수집·분석",
          en: "Keyword metric tracking with data collection and analysis",
        },
        {
          ko: "1M+ raw data entries / 40k+ keywords 구조화",
          en: "Structured 1M+ raw data entries and 40k+ keywords",
        },
      ],
    },
    {
      company: { ko: "볼트앤너트", en: "BOLT&NUT" },
      role: "Junior Marketer",
      period: "2023.04 ~ 2023.09",
      description: {
        ko: "바로발주 서비스의 디지털 광고, 온라인 마케팅 전략, SEO, UX 분석, CRM 운영을 담당했습니다.",
        en: "Executed digital marketing, SEO, UX analytics, CRM, and campaign operations for the Baro Order B2B manufacturing platform.",
      },
      bullets: [
        {
          ko: "Google/Naver 기반 디지털 광고 기획 및 운영",
          en: "Planned and ran digital ad campaigns on Google and Naver",
        },
        {
          ko: "Hotjar, Microsoft Clarity 기반 사용자 행동 분석",
          en: "Analyzed user behavior with Hotjar and Microsoft Clarity",
        },
        {
          ko: "Figma 기반 UI/UX 개선안 도출",
          en: "Drafted UI/UX improvements in Figma",
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
      company: { ko: "마크앤컴퍼니", en: "MARK&COMPANY" },
      role: "Marketing Intern",
      period: "2022.10 ~ 2023.02",
      description: {
        ko: "혁신의숲 서비스에서 스타트업·VC 데이터 관리, 시장 리서치, 서비스 운영 자료 정리를 수행했습니다.",
        en: "Managed startup and VC data records, supported market research, and prepared service operation materials for the Innovation Forest platform.",
      },
      bullets: [
        {
          ko: "1,000+ 스타트업 및 VC 데이터 수집·검수",
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
      company: "YEOLHANSHI",
      role: "Project Intern",
      period: "2024.02 ~ 2024.03",
    },
    {
      company: "DECANT",
      role: "Marketing Intern",
      period: "2023.07 ~ 2023.08",
    },
  ],

  projects: [
    {
      title: "SoME Consulting Society",
      role: { ko: "학술부 부장", en: "Academic Team Lead" },
      period: "2022.06 ~ 2022.12",
      problem: {
        ko: "소상공인의 온라인 접점과 메뉴·가격 구조가 정리되지 않은 문제를 다뤘습니다.",
        en: "A local business had a scattered online presence and an unstructured menu and pricing setup.",
      },
      approach: {
        ko: "네이버 플레이스, 인스타그램 채널, 메뉴 구성, 가격 구조를 함께 개선했습니다.",
        en: "Reworked the Naver Place listing, Instagram channel, menu structure, and pricing together.",
      },
      result: {
        ko: "프로젝트 후 매출 25% 이상 증가 사례를 만들었습니다.",
        en: "Sales grew more than 25% after the project.",
      },
    },
    {
      title: "LG Electronics Brand Campaign",
      role: "Team Lead",
      period: "2024.03 ~ 2024.12",
      problem: {
        ko: "LG전자 ‘틔운 미니’의 제품 메시지를 소비자 경험 중심으로 전달해야 했습니다.",
        en: "LG's tiiun mini needed its product message reframed around the consumer experience.",
      },
      approach: {
        ko: "TVC 및 IMC 전략 제안서를 기획하고 일정, 예산, KPI를 포함한 실행안을 설계했습니다.",
        en: "Built a TVC and IMC strategy proposal with a full execution plan covering schedule, budget, and KPIs.",
      },
      result: {
        ko: "LG전자 마케팅팀 및 광고대행사 실무진 대상 최종 발표에서 긍정적인 평가를 받았습니다.",
        en: "The final presentation was well received by LG's marketing team and agency practitioners.",
      },
    },
    {
      title: "PRM × Lotte Duty Free",
      role: "Team Lead",
      period: "2024.03 ~ 2024.12",
      problem: {
        ko: "면세업계 침체 이후 MZ세대의 오프라인 경험을 온라인 구매로 연결해야 했습니다.",
        en: "After the duty-free downturn, Gen MZ's offline experiences had to be reconnected to online purchases.",
      },
      approach: {
        ko: "소비자 리서치를 바탕으로 팝업스토어, SNS 챌린지, 리워드 프로그램을 결합했습니다.",
        en: "Combined a pop-up store, a social challenge, and a rewards program grounded in consumer research.",
      },
      result: {
        ko: "최종 경쟁 PT에서 2등을 수상했습니다.",
        en: "Won 2nd place in the final competitive pitch.",
      },
    },
  ],

  proofs: [
    { value: "1M+", label: "Raw Data Entries" },
    { value: "40k+", label: "Keywords Structured" },
    { value: "TOEIC 965", label: "English" },
    { value: "OPIc IH", label: "Speaking" },
    { value: "+27%", label: "UX Retention" },
    { value: "1,000+", label: "Startup & VC Data" },
    { value: "AX", label: "Marketing AX Project" },
  ],

  privacy: {
    hideAddress: true,
    hideBirthDate: true,
    hidePhoneByDefault: true,
  },
};
