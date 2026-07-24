import type { CustomerProfile } from "../../types/profile";

export const profile: CustomerProfile = {
  slug: "seo-baul",
  theme: "terracotta-atelier",
  layout: "atelier-dossier",
  status: "published",
  locales: ["ko", "en"],

  seo: {
    title: "서바울 | 건축·설비 리서치와 AI를 사업으로 잇는 프로젝트 리더",
    description:
      "건축공학 기반 데이터센터·공조 설비 연구와 멀티모달 AI 연구를, 약 3년간의 스타트업 운영과 5억 원 이상의 투자유치로 연결해온 서바울님의 온라인 프로필입니다.",
    ogImage: "/og/placeholder-og.svg",
  },

  person: {
    name: "서바울",
    // englishName is intentionally omitted — the source document provides no
    // verified English name. The hero monogram falls back to "서".
    roleLine: {
      ko: "건축·설비 리서치 × AI × 사업 실행",
      en: "Facilities Research × AI × Execution",
    },
    tagline: {
      ko: "건축·데이터센터 설비의 문제를, AI와 사업 실행으로 연결합니다.",
      en: "Turning the problems of architecture and data-center facilities into AI research and real business execution.",
    },
    summary: {
      ko: "건축공학을 기반으로 데이터센터와 공조 설비를 연구하고, 재실자의 열적 쾌적성을 판단하는 멀티모달 AI 연구로 이어온 연구자입니다. 동시에 소셜벤처 ‘사라나 지구’를 약 3년간 대표로 운영하며 5억 원 이상의 투자유치를 이끌었고, 글로벌 프로젝트와 컨설팅으로 연구를 사업 실행까지 연결해온 프로젝트 리더입니다.",
      en: "A researcher who works from architectural engineering into data-center and HVAC facilities, and further into multimodal-AI research that reads occupants’ thermal comfort. In parallel, a project leader who ran the social venture ‘Sarana Jigu’ as CEO for about three years, raised over 500 million KRW, and carried research through to execution via global projects and consulting.",
    },
    identitySupport: {
      ko: "데이터센터 설비 논문과 대학 공식 자료집으로 정리된 연구, 장관상·사회혁신 최우수상으로 검증된 사업화, 캄보디아 창업팀 컨설팅과 유럽 산업 탐방까지 — 문제를 연구로 규명하고 사업으로 실행하는 프로젝트 리더입니다.",
      en: "Research captured in a data-center facilities paper and a university proceedings volume; commercialization proven by a Minister’s Grand Prize and a social-innovation top award; reach extended through consulting for Cambodian startup teams and a European industry tour — a project leader who defines problems by research and delivers them as business.",
    },
    photo: {
      // No verified photo was provided. The file is intentionally absent so the
      // hero renders the monogram placeholder ("서"), never a stand-in face.
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

  // Trimmed from a 13-item generic list to the eight that carry the four core
  // axes (facilities research / AI / venture / global). No new skills were
  // added — the removed entries were duplicative or generic role words
  // (Thermal Comfort, AI Convergence, Business Planning, Global Collaboration,
  // Project Leadership).
  skills: [
    "Architectural Engineering",
    "Data Center Facilities",
    "HVAC / 공조 설비",
    "Multimodal AI",
    "Research & Papers",
    "Fundraising / IR",
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
        ko: "건축공학을 기반으로 데이터센터와 공조 설비를 연구하고, 데이터센터 설비 논문으로 정리했습니다.",
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
        ko: "재실자의 열적 쾌적성을 판단해 공조를 제어하는 멀티모달 AI를 연구했고, 결과는 한양대학교 공식 자료집으로 발간됐습니다.",
        en: "Studied a multimodal AI that reads occupants’ thermal comfort to control HVAC; the results were published in a Hanyang University proceedings volume.",
      },
    },
    {
      eyebrow: "Venture",
      title: {
        ko: "스타트업 운영 & 사업화",
        en: "Startup Operations & Commercialization",
      },
      description: {
        ko: "소셜벤처 ‘사라나 지구’를 약 3년간 운영하며 5억 원 이상의 투자유치와 사회혁신 수상을 이끌었습니다.",
        en: "Ran the social venture ‘Sarana Jigu’ for about three years, driving 500M+ KRW in investment and social-innovation awards.",
      },
    },
    {
      eyebrow: "Global",
      title: {
        ko: "글로벌 프로젝트 & 리더십",
        en: "Global Projects & Leadership",
      },
      description: {
        ko: "캄보디아 창업팀 컨설팅과 유럽 산업 탐방을 수행하고, 다수의 프로젝트를 리더로 이끌었습니다.",
        en: "Consulted for Cambodian startup teams, joined a European industry tour, and led numerous projects as the lead.",
      },
    },
  ],

  experiences: [
    {
      company: { ko: "사라나 지구 (Sarana Jigu)", en: "Sarana Jigu" },
      role: { ko: "대표 · 창업팀 리더", en: "CEO · Founding Team Lead" },
      period: "약 3년",
      description: {
        ko: "사회 문제를 사업으로 풀어내는 소셜벤처를 대표로서 약 3년간 운영하며 사업기획, 팀 리딩, 투자유치를 직접 수행했습니다.",
        en: "Ran a social venture solving social problems as CEO for about three years — leading business planning, the team, and fundraising firsthand.",
      },
      bullets: [
        {
          ko: "투자유치 5억 원 이상 달성",
          en: "Raised over 500 million KRW in investment",
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
    {
      company: {
        ko: "한양대학교 건축공학",
        en: "Hanyang University, Architectural Engineering",
      },
      role: {
        ko: "데이터센터·설비 / 멀티모달 AI 연구",
        en: "Data-Center Facilities / Multimodal AI Research",
      },
      period: "연구 프로젝트",
      description: {
        ko: "건축공학을 기반으로 데이터센터·공조 설비와 AI를 결합한 연구를 수행했습니다.",
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
  ],

  additionalExperiences: [
    {
      company: { ko: "전교 학생회", en: "Student Council" },
      role: { ko: "회장 · 부회장", en: "President · Vice President" },
      period: "초·중·고",
    },
    {
      company: { ko: "뮤지컬", en: "Musical Theater" },
      role: { ko: "배우 활동", en: "Performer" },
      period: "대외활동",
    },
  ],

  projects: [
    {
      title: {
        ko: "멀티모달 AI 공조 제어 연구",
        en: "Multimodal-AI HVAC Control Research",
      },
      role: { ko: "연구", en: "Research" },
      period: "연구 프로젝트",
      problem: {
        ko: "건물·데이터센터의 공조는 획일적으로 운전되어 재실자의 실제 쾌적성을 반영하지 못했습니다.",
        en: "Building and data-center HVAC runs on uniform settings that fail to reflect occupants’ real comfort.",
      },
      approach: {
        ko: "멀티모달 AI로 재실자의 열적 쾌적성을 판단해 공조를 제어하는 방식을 건축공학 기반으로 연구했습니다.",
        en: "Studied a multimodal AI that judges occupants’ thermal comfort to control HVAC, grounded in architectural engineering.",
      },
      result: {
        ko: "연구 결과가 한양대학교 공식 자료집으로 발간되고 AI 솔루션 해커톤 장려상을 받았습니다.",
        en: "The results were published in a Hanyang University proceedings volume and won an Encouragement Award at the AI Solution Hackathon.",
      },
    },
    {
      title: {
        ko: "소셜벤처 ‘사라나 지구’",
        en: "Social Venture ‘Sarana Jigu’",
      },
      role: { ko: "대표", en: "CEO" },
      period: "약 3년",
      problem: {
        ko: "사회적 가치를 실제 사업으로 전환하고, 초기 투자와 운영 체계를 확보해야 하는 상황이었습니다.",
        en: "Social value had to become a working business, with early investment and an operating system still to secure.",
      },
      approach: {
        ko: "대표로서 사업기획·팀 리딩·투자유치를 직접 실행하고, 사회혁신 공모전으로 사업 모델을 검증했습니다.",
        en: "As CEO, ran business planning, team leadership, and fundraising firsthand, validating the model through social-innovation competitions.",
      },
      result: {
        ko: "투자유치 5억 원 이상, 2023 소셜벤처 경연대회 대상(장관상)과 KT&G 사회혁신 최우수상, 창업유망팀 300 예선 통과.",
        en: "Over 500M KRW raised, the 2023 Social Venture Grand Prize (Minister’s Award), a KT&G social-innovation top award, and passage through the Promising Startup Team 300 preliminaries.",
      },
    },
    {
      title: {
        ko: "글로벌 프로젝트 & 컨설팅",
        en: "Global Projects & Consulting",
      },
      role: { ko: "프로젝트 리더 · 컨설턴트", en: "Project Lead · Consultant" },
      period: "6개월+",
      problem: {
        ko: "초기 창업팀과 사회 문제는 국경을 넘어 존재했고, 검증된 실행 경험이 필요했습니다.",
        en: "Early startup teams and social problems exist across borders, and proven execution experience was needed.",
      },
      approach: {
        ko: "캄보디아 창업팀을 6개월간 컨설팅하고, 유럽 10일 산업 탐방(스마트팜·EU·ASML)과 그린워싱 주제 글로벌 프론티어 탐방에 참여했습니다.",
        en: "Consulted for Cambodian startup teams over six months and joined a 10-day European industry tour (smart farm, EU, ASML) and a greenwashing-themed Global Frontier program.",
      },
      result: {
        ko: "경기청년 사다리(UCI) Best Student로 선정되어 수료식 대표 연설을 했고, 화성시 글로벌 탐방단과 한양대 대표 글로벌 프론티어에 선발됐습니다.",
        en: "Selected as Best Student of the Gyeonggi Youth Ladder (UCI) with the representative graduation speech, and chosen for the Hwaseong City global tour and Hanyang’s representative Global Frontier.",
      },
    },
  ],

  // Order-only change: the awards lead so the strip doesn't repeat the hero's
  // 투자유치/스타트업 figures immediately below it. No value or label edited.
  proofs: [
    {
      value: "대상",
      label: { ko: "2023 소셜벤처 · 장관상", en: "2023 Social Venture · Grand Prize" },
    },
    {
      value: "최우수상",
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
    { value: "₩500M+", label: { ko: "투자유치", en: "Investment Raised" } },
    { value: "≈3Y", label: { ko: "스타트업 운영", en: "Startup Operation" } },
  ],

  privacy: {
    hideAddress: true,
    hideBirthDate: true,
    hidePhoneByDefault: true,
  },
};
