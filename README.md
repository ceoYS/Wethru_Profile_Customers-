# WeThru Profile Customers

## 목적

WeThru 고객들의 온라인 명함/비즈니스 프로필을 한 repo에서 관리하는 프로젝트입니다.
고객별 프로필은 `/profiles/{slug}/` 경로에 정적 페이지로 생성되며,
theme(색/타이포) × layout(구조) preset 조합으로 고객마다 다른 디자인을 만듭니다.

- 첫 고객: [배지안](http://localhost:4321/profiles/bae-jian/) — `navy-black-white` × `editorial-split`
- 제품 정의: `docs/PRD_PROFILE_FACTORY.md`
- 제작 가이드: `docs/PROFILE_CREATION_GUIDE.md`

## 로컬 실행

```bash
npm install
npm run dev        # http://localhost:4321
```

요구사항: Node >= 22.18 (검증 스크립트가 TypeScript 데이터 파일을 직접 import)

## 새 고객 추가

```bash
npm run new:profile -- --slug customer-slug --name "고객명" \
  --theme navy-black-white --layout editorial-split
```

- theme: `navy-black-white` | `warm-editorial` | `graphite-minimal`
- layout: `editorial-split` | `dossier` | `magazine` | `minimal-card`

생성된 파일의 TODO를 채우고, 검증 후 `status: "published"`로 변경합니다.
자세한 순서는 `docs/PROFILE_CREATION_GUIDE.md` 참고.

## 고객 데이터 위치

```
src/data/customers/{slug}.ts
```

스키마 해설: `docs/CUSTOMER_DATA_SCHEMA.md` · 타입 정의: `src/types/profile.ts`

## 이미지 위치

```
public/images/customers/{slug}/profile.webp
```

⚠️ **배지안(bae-jian) 프로필 사진은 아직 없습니다.**
`public/images/customers/bae-jian/profile.webp`를 직접 넣어야 합니다 (세로형 4:5, 800px+ 권장).
사진이 없는 동안 페이지는 모노그램 fallback으로 렌더링됩니다 (깨진 이미지는 표시되지 않음).
OG 이미지도 현재 공용 placeholder(`/og/placeholder-og.svg`)이므로, 고객별 PNG(1200×630) 제작 후 교체하세요.

## 검증

```bash
npm run validate:customers   # 필수값 + 개인정보 검증 (에러 시 exit 1)
npm run build                # 정적 빌드
npm run check                # astro check (타입 검사)
npm run domains:map          # 도메인 매핑 검증
```

## 배포

초기에는 `profile.wethru.com/profiles/{slug}/` 구조로 운영합니다.
빌드 결과물은 `dist/`. 커스텀 도메인 연결은 `docs/DOMAIN_STRATEGY.md`를 따릅니다
(도메인 매핑: `src/data/domain-map.ts`, 실제 DNS 연결은 아직 하지 않음).

## 개인정보 원칙

- 주소 저장/노출 금지 (스키마에 필드 자체가 없음)
- 생년월일 저장/노출 금지 (스키마에 필드 자체가 없음)
- 전화번호 기본 노출 금지 (`showPhone: true`는 검증 경고 대상)
- 이메일은 CTA 영역에서만 사용
- 고객 확인 전 임의 정보 추가 금지

## 구조

```
src/
├─ types/profile.ts          # CustomerProfile 스키마 (단일 소스)
├─ data/
│  ├─ customers/{slug}.ts    # 고객 데이터 (자동 수집 — index 수정 불필요)
│  ├─ customer-index.ts      # import.meta.glob 기반 자동 인덱스
│  └─ domain-map.ts          # 커스텀 도메인 → slug 매핑
├─ layouts/ProfilePage.astro # SEO/OG/canonical + theme/layout 적용
├─ pages/
│  ├─ index.astro            # 운영자 대시보드 (noindex)
│  └─ profiles/[slug].astro  # 고객 프로필 동적 라우트
├─ components/profile/       # Hero, ProofStrip, Strengths, Timeline, Projects, CTA, Footer
├─ components/shared/        # CopyLinkButton, SkipLink
└─ styles/
   ├─ profile-base.css       # 구조 레이어 (토큰만 참조, 색 하드코딩 없음)
   └─ themes/*.css           # theme별 토큰 정의
scripts/
├─ new-profile.mjs           # 신규 고객 스캐폴드
├─ validate-customers.mjs    # 필수값/개인정보 검증
└─ generate-domain-map.mjs   # 도메인 매핑 검증/출력
```
