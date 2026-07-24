import type { CustomerProfile } from "../../types/profile";

export const profile: CustomerProfile = {
  slug: "seo-baul",
  theme: "terracotta-atelier",
  layout: "atelier-dossier",
  status: "published",
  locales: ["ko", "en"],

  seo: {
    title: "서바울 | 건축·설비 및 AI 연구 · 소셜벤처 운영 경험",
    description:
      "건축공학 기반 데이터센터·공조 설비 및 멀티모달 AI 연구와, 약 3년간 소셜벤처 운영에 참여한 경험을 두 축으로 소개하는 서바울님의 온라인 프로필입니다.",
    ogImage: "/og/placeholder-og.svg",
  },

  person: {
    name: "서바울",
    // englishName is intentionally omitted — the source document provides no
    // verified English name.
    roleLine: {
      ko: "건축·설비 리서치와 AI 연구 / 소셜벤처 운영 경험",
      en: "Architecture & Building-Systems Research / AI Research / Social-Venture Operations Experience",
    },
    tagline: {
      ko: "건축공학을 기반으로 설비와 AI를 연구하고, 별도의 현장에서 소셜벤처 운영과 사업화를 경험했습니다.",
      en: "Grounded in architectural engineering, I study building systems and AI while separately gaining experience in social-venture operations and commercialization.",
    },
    summary: {
      ko: "건축공학 전공을 바탕으로 데이터센터와 공조 설비를 연구하고, 재실자의 열적 쾌적성을 판단하는 멀티모달 AI 연구를 수행했습니다. 한편 소셜벤처 ‘사라나 지구’의 운영에 약 3년간 참여하며 사업기획, 팀 운영과 사회혁신 프로젝트 경험을 쌓았습니다.",
      en: "With a foundation in architectural engineering, I researched data centers and HVAC systems and conducted multimodal-AI research on assessing occupants’ thermal comfort. Separately, I took part in operating the social venture ‘Sarana Jigu’ for about three years, gaining experience in business planning, team operations, and social-innovation projects.",
    },
    identitySupport: {
      ko: "전공과 연구 축에서는 데이터센터 설비 논문과 대학 공식 자료집을 남겼습니다. 별도의 스타트업과 운영 축에서는 소셜벤처 운영과 사회혁신 프로젝트에 참여했고, 캄보디아 창업팀 컨설팅과 유럽 산업 탐방을 경험했습니다.",
      en: "The academic and research track includes a data-center facilities paper and a university proceedings volume. In a separate startup and operations track, the experience includes social-venture operations, social-innovation projects, consulting for Cambodian startup teams, and a European industry tour.",
    },
    photo: {
      // SeoBaulHero keeps a restrained 4:5 monogram frame at this path until
      // the verified portrait file is available, then swaps it in place.
      src: "/images/customers/seo-baul/profile.webp",
      alt: "서바울 프로필 사진",
    },
  },

  contact: {
    // The source document lists no email, phone, or links. showEmail stays
    // false until a verified address is provided — the Contact section then
    // shows the copy-link action only, never a fabricated contact.
    showEmail: false,
    showPhone: false,
  },

  badges: [
    "Data Center Facilities",
    "HVAC Research",
    "Multimodal AI",
    "Startup Operations",
    "Business Development",
    "Global Projects",
  ],

  // The skills preserve the two distinct tracks: academic research and
  // startup operations. Funding is recorded below as an organizational result,
  // not as a personal responsibility.
  skills: [
    "Architectural Engineering",
    "Data Center Facilities",
    "HVAC / 공조 설비",
    "Multimodal AI",
    "Research & Papers",
    "Business Planning",
    "Startup Operations",
    "Consulting",
  ],

  strengths: [
    {
      eyebrow: "Facilities",
      title: {
        ko: "데이터센터·공조 설비 연구",
        en: "Data-Center & HVAC Research",
      },
      description: {
        ko: "데이터센터·공조 설비 연구 및 데이터센터 설비 논문 작성",
        en: "Researches data-center and HVAC facilities from an architectural-engineering base, captured in a data-center facilities paper.",
      },
    },
    {
      eyebrow: "AI",
      title: {
        ko: "멀티모달 AI 연구",
        en: "Multimodal AI Research",
      },
      description: {
        ko: "재실자의 열적 쾌적성 판단과 공조 제어를 위한 멀티모달 AI 연구 및 한양대학교 공식 자료집 발간",
        en: "Studied a multimodal AI that reads occupants’ thermal comfort to control HVAC; the results were published in a Hanyang University proceedings volume.",
      },
    },
    {
      eyebrow: "Venture",
      title: {
        ko: "소셜벤처 운영 경험",
        en: "Startup Operations & Commercialization",
      },
      description: {
        ko: "소셜벤처 ‘사라나 지구’의 약 3년간 운영 참여를 통한 사업기획, 팀 운영과 사회혁신 프로젝트 경험 및 해당 조직의 5억 원 이상 투자유치 성과",
        en: "Took part in operating the social venture ‘Sarana Jigu’ for about three years, with experience in business planning, team operations, and social-innovation projects. The organization recorded over KRW 500 million in funding.",
      },
    },
    {
      eyebrow: "Global",
      title: {
        ko: "글로벌 프로젝트 & 협업",
        en: "Global Projects & Collaboration",
      },
      description: {
        ko: "캄보디아 창업팀 컨설팅과 유럽 산업 탐방 참여를 통한 다양한 팀·프로젝트 협업",
        en: "Consulted for Cambodian startup teams, joined a European industry tour, and worked with diverse teams across multiple projects.",
      },
    },
  ],

  experiences: [
    {
      company: {
        ko: "한양대학교 건축공학",
        en: "Hanyang University, Architectural Engineering",
      },
      role: {
        ko: "데이터센터·설비 / 멀티모달 AI 연구",
        en: "Data-Center Facilities / Multimodal AI Research",
      },
      period: { ko: "연구 프로젝트", en: "Research Project" },
      description: {
        ko: "건축공학을 기반으로 데이터센터·공조 설비와 AI를 결합한 연구 수행",
        en: "Conducted research combining data-center and HVAC facilities with AI, from an architectural-engineering base.",
      },
      bullets: [
        {
          ko: "데이터센터 설비 관련 논문 작성",
          en: "Authored a paper on data-center facilities",
        },
        {
          ko: "공조 설비 프로젝트 수행",
          en: "Delivered an HVAC facilities project",
        },
        {
          ko: "멀티모달 AI 기반 재실자 열적 쾌적성 판단 공조 제어 방식 연구",
          en: "Researched multimodal-AI-based HVAC control that judges occupant thermal comfort",
        },
        {
          ko: "연구 결과 한양대학교 공식 자료집 발간",
          en: "Results published in a Hanyang University proceedings volume",
        },
        {
          ko: "AI융합 마이크로전공 수강 · AI 솔루션 해커톤 장려상",
          en: "Completed the AI Convergence micro-major · Encouragement Award, AI Solution Hackathon",
        },
      ],
    },
    {
      company: { ko: "사라나 지구 (Sarana Jigu)", en: "Sarana Jigu" },
      role: { ko: "운영 · 사업기획", en: "Operations · Business Planning" },
      period: { ko: "약 3년", en: "About 3 years" },
      description: {
        ko: "소셜벤처 ‘사라나 지구’의 약 3년간 운영 참여를 통한 사업기획, 팀 운영과 사회혁신 프로젝트 수행",
        en: "Took part in operating the social venture ‘Sarana Jigu’ for about three years, contributing to business planning, team operations, and social-innovation projects.",
      },
      bullets: [
        {
          ko: "조직 차원의 투자유치 성과 5억 원 이상",
          en: "The organization recorded over KRW 500 million in funding",
        },
        {
          ko: "2023 소셜벤처 경연대회 대상 (고용노동부 장관상)",
          en: "2023 Social Venture Competition — Grand Prize (Minister of Employment and Labor)",
        },
        {
          ko: "KT&G 사회혁신 아이디어 공모전 최우수상",
          en: "KT&G Social Innovation Idea Competition — Top Excellence Award",
        },
        {
          ko: "창업유망팀 300 예선 통과",
          en: "Passed the preliminaries of Promising Startup Team 300",
        },
        {
          ko: "한양대학교 창업지원단 ‘몬테’ 창업팀 리더",
          en: "Team lead of the ‘Monte’ startup team, Hanyang University Startup Support Group",
        },
      ],
    },
  ],

  additionalExperiences: [
    {
      company: { ko: "전교 학생회", en: "Student Council" },
      role: { ko: "회장 · 부회장", en: "President · Vice President" },
      period: { ko: "초·중·고", en: "Elementary–High School" },
    },
    {
      company: { ko: "뮤지컬", en: "Musical Theater" },
      role: { ko: "배우 활동", en: "Performer" },
      period: { ko: "대외활동", en: "Extracurricular Activity" },
    },
  ],

  projects: [
    {
      title: {
        ko: "멀티모달 AI 공조 제어 연구",
        en: "Multimodal-AI HVAC Control Research",
      },
      role: { ko: "연구", en: "Research" },
      period: { ko: "연구 프로젝트", en: "Research Project" },
      problem: {
        ko: "건물·데이터센터의 획일적인 공조 운전으로 재실자의 실제 쾌적성을 반영하기 어려운 문제",
        en: "Building and data-center HVAC runs on uniform settings that fail to reflect occupants’ real comfort.",
      },
      approach: {
        ko: "건축공학을 기반으로 멀티모달 AI가 재실자의 열적 쾌적성을 판단해 공조를 제어하는 방식 연구",
        en: "Studied a multimodal AI that judges occupants’ thermal comfort to control HVAC, grounded in architectural engineering.",
      },
      result: {
        ko: "한양대학교 공식 자료집 발간 및 AI 솔루션 해커톤 장려상 수상",
        en: "The results were published in a Hanyang University proceedings volume and won an Encouragement Award at the AI Solution Hackathon.",
      },
    },
    {
      title: {
        ko: "소셜벤처 ‘사라나 지구’",
        en: "Social Venture ‘Sarana Jigu’",
      },
      role: { ko: "운영 · 사업기획", en: "Operations · Business Planning" },
      period: { ko: "약 3년", en: "About 3 years" },
      problem: {
        ko: "사회적 가치를 실제 사업으로 전환하고 초기 투자와 운영 체계를 확보해야 했던 과제",
        en: "Social value had to become a working business, with early investment and an operating system still to secure.",
      },
      approach: {
        ko: "운영 과정에서 사업기획과 팀 협업에 참여하고 사회혁신 공모전을 통한 사업 모델 검증",
        en: "Contributed to business planning and team collaboration during operations, using social-innovation competitions to validate the business model.",
      },
      result: {
        ko: "조직의 5억 원 이상 투자유치 성과 및 2023 소셜벤처 경연대회 대상(고용노동부 장관상), KT&G 사회혁신 아이디어 공모전 최우수상 수상",
        en: "The organization recorded over KRW 500 million in funding and received the 2023 Social Venture Competition Grand Prize (Minister of Employment and Labor Award) and the KT&G Social Innovation Idea Competition Top Excellence Award.",
      },
    },
    {
      title: {
        ko: "글로벌 프로젝트 & 컨설팅",
        en: "Global Projects & Consulting",
      },
      role: { ko: "프로젝트 리더 · 컨설턴트", en: "Project Lead · Consultant" },
      period: { ko: "6개월+", en: "6+ months" },
      problem: {
        ko: "국경을 넘는 초기 창업팀과 사회 문제에 필요한 검증된 실행 경험",
        en: "Early startup teams and social problems exist across borders, and proven execution experience was needed.",
      },
      approach: {
        ko: "캄보디아 창업팀 6개월 컨설팅, 유럽 10일 산업 탐방(스마트팜·EU·ASML) 및 그린워싱 주제 글로벌 프론티어 탐방 참여",
        en: "Consulted for Cambodian startup teams over six months and joined a 10-day European industry tour (smart farm, EU, ASML) and a greenwashing-themed Global Frontier program.",
      },
      result: {
        ko: "경기청년 사다리(UCI) Best Student 선정 및 수료식 연설, 화성시 글로벌 탐방단과 한양대학교 글로벌 프론티어 선발",
        en: "Selected as Best Student of the Gyeonggi Youth Ladder (UCI), gave a graduation speech, and was chosen for the Hwaseong City global tour and Hanyang University’s Global Frontier.",
      },
    },
  ],

  // Awards lead so the strip does not repeat the hero's operational figures.
  proofs: [
    {
      value: { ko: "대상", en: "Grand Prize" },
      label: { ko: "2023 소셜벤처 · 장관상", en: "2023 Social Venture · Grand Prize" },
    },
    {
      value: { ko: "최우수상", en: "Top Excellence" },
      label: { ko: "KT&G 사회혁신 아이디어", en: "KT&G Social Innovation" },
    },
    {
      value: "1st",
      label: {
        ko: "건축구조물진단 영상 공모전",
        en: "Structural Diagnosis Video Contest",
      },
    },
    {
      value: "Top 40",
      label: {
        ko: "Habitat Youth Solutions APAC",
        en: "Habitat Youth Solutions APAC",
      },
    },
    {
      value: "₩500M+",
      label: { ko: "조직 투자유치 성과", en: "Organization Funding Outcome" },
    },
    { value: "≈3Y", label: { ko: "운영 참여", en: "Operations Involvement" } },
  ],

  privacy: {
    hideAddress: true,
    hideBirthDate: true,
    hidePhoneByDefault: true,
  },
};
