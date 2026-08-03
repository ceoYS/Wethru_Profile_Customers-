# Domain Strategy

프로필 URL을 단계적으로 확장하는 전략. **이번 작업에서는 어떤 실제 DNS/CNAME 설정도 하지 않는다** — 구조와 문서만 준비한다.

## 0. 도메인 전제 (확정)

| 도메인 | 소유/역할 | 이 저장소와의 관계 |
| --- | --- | --- |
| `career.wethru.com` | 이 저장소가 배포하는 공개 Campus 랜딩 (Vercel 프로젝트 `wethru-profile-customers`) | 유일한 공개 배포 대상. `npm run build`만 사용 |
| `profile.wethru.com` | **기존에 별도로 운영 중인 WeThru 비즈니스 프로필 서비스** | 이 저장소의 배포·canonical·도메인 매핑 대상이 **아님**. 연결·변경 금지 |

`astro.config.mjs`의 `site: "https://career.wethru.com"`은 **공개 Campus의**
canonical/OG 기준이다. 공개 Campus의 대표 주소는 루트(`https://career.wethru.com/`)이며,
`vercel.json`의 rewrite가 루트를 `/campus-v4/` 콘텐츠로 서빙한다. 그래서 canonical과
og:url은 `/campus-v4/`가 아니라 루트를 가리킨다.

고객 프로필은 이 기준을 쓰지 않는다. 공개 빌드에 아예 생성되지 않고(`CUSTOMER_PROFILES`
게이트), noindex이며, 링크로 전달하는 납품물이므로 canonical과 og:url을 **생성하지 않는다**
(`src/layouts/ProfilePage.astro`). 존재하지 않는 `career.wethru.com/profiles/{slug}/`를
canonical로 찍지 않기 위한 의도적 선택이다.

## 1단계 — 경로 기반 (현재)

```
{납품 오리진}/profiles/{slug}/
```

- Astro 정적 빌드 결과를 납품 (로컬 `CUSTOMER_PROFILES=1 npm run build`)
- 공개 Vercel Production 빌드에는 포함되지 않는다
- 고객 추가 = 데이터 파일 추가 → 빌드 → 납품. 인프라 변경 없음.

## 2단계 — 짧은 URL

```
{납품 오리진}/{slug}/
```

- 옵션 A (권장, Vercel): `vercel.json` rewrites로 `/{slug}` → `/profiles/{slug}/`
- 옵션 B: `src/pages/[slug].astro`를 추가해 같은 컴포넌트를 두 경로로 빌드
  - 이 경우 canonical은 반드시 한 경로로 고정 (중복 콘텐츠 방지)
- 예약어 충돌 주의: `og`, `images`, `profiles` 등 기존 경로와 slug 충돌 검증을
  `validate-customers.mjs`에 추가한 뒤 진행

## 3단계 — 고객별 커스텀 도메인

```
jianbae.com  →  bae-jian
```

고객이 소유한 도메인만 매핑한다. `*.profile.wethru.com` 서브도메인은
다른 서비스의 네임스페이스이므로 매핑 대상에서 제외한다
(이전에 있던 `bae-jian.profile.wethru.com` 항목은 잘못된 전제라 제거했다).

- 매핑의 단일 소스: `src/data/domain-map.ts`
- 검증/조회: `npm run domains:map` (존재하지 않는 slug를 가리키면 실패)
- 실제 연결 시 필요한 후속 작업 (이 repo 밖):
  1. DNS: 고객 도메인에 CNAME → 호스팅 엣지
  2. 호스팅: Vercel domains 추가 또는 GitHub Pages CNAME
  3. 라우팅: 도메인 → `/profiles/{slug}/` rewrite (edge middleware 또는 호스팅 설정)
  4. TLS 인증서 자동 발급 확인

### 커스텀 도메인 연결 전 체크리스트

- [ ] 고객이 도메인 소유권을 보유하고 연결에 동의했는가
- [ ] 개인정보 재점검: 노출 범위가 도메인 단위로 커지므로 email/phone 노출 설정 재확인
- [ ] SEO: 프로필에 canonical을 다시 넣을지 결정 (현재는 의도적으로 없음 + noindex).
      넣는다면 커스텀 도메인 기준으로만 넣고, 전역 `site`(career.wethru.com)는 쓰지 않는다
- [ ] OG: `seo.ogImage` URL이 새 도메인에서도 절대경로로 유효한지 확인
- [ ] domain-map에 항목 추가 후 `npm run domains:map` 통과

## 하지 않기로 한 것 (이번 단계)

- CNAME 파일 생성
- vercel.json / 호스팅 설정 파일 생성
- 도메인별 빌드 분리
