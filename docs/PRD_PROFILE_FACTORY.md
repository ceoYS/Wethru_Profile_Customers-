# PRD: WeThru Profile Factory

## Product Purpose

WeThru 고객들의 온라인 명함/비즈니스 프로필을 반복 제작할 수 있는 프로필 생성 시스템을 만든다.
고객별 프로필은 검색, 공유, 채용, 협업, 영업 상황에서 신뢰를 빠르게 형성하는 것을 목표로 한다.

## Problem

현재 고객 프로필을 매번 새로 만들면 다음 문제가 생긴다.

- 파일 구조가 매번 달라짐
- 디자인 품질이 일정하지 않음
- 개인정보 노출 점검이 누락될 수 있음
- 도메인 연결 방식이 고객별로 흩어짐
- 새 고객을 만들 때마다 반복 작업이 많아짐
- 반대로 템플릿만 쓰면 모든 고객 페이지가 똑같아 보임

## Goal

- 고객 1명을 30분 이내에 신규 등록 가능한 구조
- 고객별 페이지 URL 자동 생성
- theme/layout preset으로 고객별 시각 차별화
- 개인정보 보호 체크 내장
- SEO/OG/meta 기본값 자동 생성
- 향후 커스텀 도메인 연결 가능한 구조

## Target Users

1. **WeThru 운영자**
   - 고객 정보를 입력하고 프로필 페이지를 빠르게 생성해야 함

2. **WeThru 고객**
   - 자신의 신뢰도와 전문성을 보여주는 온라인 프로필이 필요함

3. **프로필 방문자**
   - 고객이 어떤 사람인지 5초 안에 이해해야 함
   - 연락하거나 저장할 이유를 확인해야 함

## Strategic Importance

온라인 명함은 WeThru의 저관여 진입 상품이다.
이 상품은 단발성 제작물이 아니라, 고객 신뢰를 만든 뒤 사업계획서, IR, 회사소개서, 홈페이지 등 상위 서비스로 연결되는 퍼널의 첫 접점이다.
따라서 프로필 페이지는 예쁜 개인 페이지가 아니라 **"검색되는 신뢰 자산"**이어야 한다.

## Success Metrics

- 신규 고객 등록 소요 시간: 30분 이하
- 고객 데이터 필수값 누락 검증 가능 (`npm run validate:customers`)
- 모바일 390px에서 첫 화면 CTA 확인 가능
- Lighthouse Accessibility 90 이상 목표
- 이미지 alt 누락 0개
- 주소/생년월일/불필요한 전화번호 노출 0건
- 고객별 theme/layout preset 적용 가능
- `npm run build` 통과

## Key Features

- 고객 데이터 파일 기반 프로필 생성 (`src/data/customers/{slug}.ts`)
- `/profiles/{slug}/` 정적 라우팅
- theme preset 시스템 (3종: navy-black-white, warm-editorial, graphite-minimal)
- layout variant 시스템 (4종: editorial-split, dossier, magazine, minimal-card)
- 고객별 SEO/OG/meta 관리
- 링크 복사 버튼 (clipboard API + fallback)
- 이메일 CTA
- WeThru subtle footer
- 고객 데이터 검증 스크립트 (`scripts/validate-customers.mjs`)
- 신규 고객 생성 CLI script (`scripts/new-profile.mjs`)
- 도메인 연결 전략 문서 (`docs/DOMAIN_STRATEGY.md`)

## User Flow

1. 운영자가 신규 고객 정보를 받는다.
2. `npm run new:profile -- --slug customer-name` 명령으로 고객 파일을 만든다.
3. 고객 데이터 파일을 채운다.
4. theme/layout preset을 선택한다.
5. `npm run validate:customers`로 개인정보/필수값을 검증한다.
6. `npm run build`로 정적 페이지를 생성한다.
7. `/profiles/{slug}/` 경로로 배포한다.
8. 필요 시 고객 도메인을 domain-map에 추가한다.

## Constraints

- 외부 API 의존 금지 (웹폰트 CDN 포함 — 본문 폰트는 npm self-hosted Pretendard, 외부 요청 없음)
- 고객 개인정보 과노출 금지
- 모든 고객 페이지가 같은 템플릿처럼 보이면 안 됨
- 과한 애니메이션 금지
- 정적 배포 우선
- 도메인 연결은 이번 작업에서 실제 연결하지 않고 구조와 문서만 준비

## Launch Criteria

- [x] 첫 고객 bae-jian 페이지 생성
- [x] 네이비/블랙/화이트 theme 적용
- [x] 고객 데이터 스키마 정의 (`src/types/profile.ts`)
- [x] 신규 고객 생성 스크립트 작동
- [x] 고객 데이터 검증 스크립트 작동
- [x] `npm run build` 통과
- [x] README에 사용법 기록
- [x] 도메인 전략 문서 작성
- [x] `git diff --check` clean
