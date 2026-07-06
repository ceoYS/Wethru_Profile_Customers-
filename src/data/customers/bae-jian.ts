import type { CustomerProfile } from "../../types/profile";

export const profile: CustomerProfile = {
  slug: "bae-jian",
  theme: "navy-black-white",
  layout: "editorial-split",
  status: "published",

  seo: {
    title: "배지안 | Marketing & Strategy Profile",
    description:
      "소비자 리서치, 데이터 정리, 캠페인 기획을 연결해 브랜드와 서비스가 고객에게 닿는 방식을 설계하는 배지안님의 온라인 프로필입니다.",
    ogImage: "/og/placeholder-og.svg",
  },

  person: {
    name: "배지안",
    englishName: "BAE JIAN",
    roleLine: "Marketing & Strategy",
    tagline: "데이터를 읽고, 사람의 선택을 설계합니다.",
    summary:
      "소비자 리서치, 데이터 정리, 캠페인 기획을 연결해 브랜드와 서비스의 접점을 설계합니다. 스타트업 데이터 플랫폼 운영, B2B 제조 플랫폼 마케팅, IMC·PR 캠페인 프로젝트를 경험하며 정보를 구조화하고 실행 가능한 메시지로 바꾸는 일을 해왔습니다.",
    photo: {
      src: "/images/customers/bae-jian/profile.webp",
      alt: "배지안 프로필 사진",
    },
  },

  contact: {
    email: "Jian.bae.biz@gmail.com",
    showEmail: true,
    showPhone: false,
  },

  badges: [
    "Marketing Strategy",
    "Consumer Research",
    "Brand Communication",
    "Data Curation",
    "IMC / PR",
    "Service Operation",
  ],

  strengths: [
    {
      eyebrow: "Research",
      title: "Consumer Research",
      description:
        "소비자 리서치와 시장 분석을 바탕으로 캠페인의 방향과 메시지를 설계합니다.",
    },
    {
      eyebrow: "Data",
      title: "Data Curation",
      description:
        "스타트업·VC 데이터를 수집·정제하며 정보의 구조와 흐름을 다뤘습니다.",
    },
    {
      eyebrow: "Communication",
      title: "Brand Communication",
      description:
        "IMC·PR 프로젝트에서 메시지, 채널, 경험 설계를 연결했습니다.",
    },
    {
      eyebrow: "Operation",
      title: "Service Operation",
      description:
        "서비스 운영, CRM, UI/UX 개선을 통해 사용자 접점을 개선했습니다.",
    },
  ],

  experiences: [
    {
      company: "볼트앤너트",
      role: "Marketing Intern / Junior Marketer",
      period: "2023.04 ~ 2023.09",
      description:
        "B2B 제조 플랫폼 ‘바로발주’의 마케팅 운영과 고객 접점 개선을 담당했습니다.",
      bullets: [
        "오프라인 행사 기획·운영을 통해 스타트업과 제조업체 간 네트워크 형성",
        "콜드메일, 고객 문의 응대, CRM 관리로 잠재 고객 접점 관리",
        "퍼포먼스 마케팅 운영 및 성과 분석",
        "블로그·SNS 채널과 제조 상식 콘텐츠 기획",
      ],
    },
    {
      company: "마크앤컴퍼니",
      role: "Marketing & Service Operation Intern",
      period: "2022.10 ~ 2023.02",
      description:
        "스타트업 데이터 플랫폼 ‘혁신의숲’의 데이터 운영과 서비스 개선 기획을 지원했습니다.",
      bullets: [
        "1,000개 이상 스타트업 및 VC 데이터 수집·정제·입력",
        "검색 및 분류 체계 개선",
        "서비스 홈페이지 UI/UX 기획 지원",
        "데이터 관리 프로세스 표준화",
      ],
    },
  ],

  projects: [
    {
      title: "SoME Consulting Society",
      role: "학술부 부장",
      period: "2022.06 ~ 2022.12",
      problem:
        "소상공인의 온라인 접점과 메뉴·가격 구조가 정리되지 않은 문제를 다뤘습니다.",
      approach:
        "네이버 플레이스, 인스타그램 채널, 메뉴 구성, 가격 구조를 함께 개선했습니다.",
      result: "프로젝트 후 매출 25% 이상 증가 사례를 만들었습니다.",
    },
    {
      title: "LG Electronics Brand Campaign",
      role: "Team Lead",
      period: "2024.03 ~ 2024.12",
      problem:
        "LG전자 ‘틔운 미니’의 제품 메시지를 소비자 경험 중심으로 전달해야 했습니다.",
      approach:
        "TVC 및 IMC 전략 제안서를 기획하고 일정, 예산, KPI를 포함한 실행안을 설계했습니다.",
      result:
        "LG전자 마케팅팀 및 광고대행사 실무진 대상 최종 발표에서 긍정적인 평가를 받았습니다.",
    },
    {
      title: "PRM × Lotte Duty Free",
      role: "Team Lead",
      period: "2024.03 ~ 2024.12",
      problem:
        "면세업계 침체 이후 MZ세대의 오프라인 경험을 온라인 구매로 연결해야 했습니다.",
      approach:
        "소비자 리서치를 바탕으로 팝업스토어, SNS 챌린지, 리워드 프로그램을 결합했습니다.",
      result: "최종 경쟁 PT에서 2등을 수상했습니다.",
    },
  ],

  proofs: [
    { value: "1,000+", label: "Startup & VC Data" },
    { value: "25%+", label: "Sales Growth Case" },
    { value: "TOEIC 965", label: "English" },
    { value: "OPIc IH", label: "Speaking" },
    { value: "2nd", label: "PR Competition" },
  ],

  privacy: {
    hideAddress: true,
    hideBirthDate: true,
    hidePhoneByDefault: true,
  },
};
