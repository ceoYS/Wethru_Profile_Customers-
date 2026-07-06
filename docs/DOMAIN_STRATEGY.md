# Domain Strategy

프로필 URL을 단계적으로 확장하는 전략. **이번 작업에서는 어떤 실제 DNS/CNAME 설정도 하지 않는다** — 구조와 문서만 준비한다.

## 1단계 — 경로 기반 (현재)

```
profile.wethru.com/profiles/{slug}/
```

- Astro 정적 빌드 결과를 그대로 배포 (Vercel 또는 GitHub Pages)
- `astro.config.mjs`의 `site: "https://profile.wethru.com"`이 canonical/OG URL의 기준
- 고객 추가 = 데이터 파일 추가 → 빌드 → 배포. 인프라 변경 없음.

## 2단계 — 짧은 URL

```
profile.wethru.com/{slug}/
```

- 옵션 A (권장, Vercel): `vercel.json` rewrites로 `/{slug}` → `/profiles/{slug}/`
- 옵션 B: `src/pages/[slug].astro`를 추가해 같은 컴포넌트를 두 경로로 빌드
  - 이 경우 canonical은 반드시 한 경로로 고정 (중복 콘텐츠 방지)
- 예약어 충돌 주의: `og`, `images`, `profiles` 등 기존 경로와 slug 충돌 검증을
  `validate-customers.mjs`에 추가한 뒤 진행

## 3단계 — 고객별 커스텀 도메인

```
bae-jian.profile.wethru.com  →  bae-jian
jianbae.com                  →  bae-jian
```

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
- [ ] SEO: canonical을 커스텀 도메인으로 옮길지, profile.wethru.com으로 유지할지 결정
- [ ] OG: `seo.ogImage` URL이 새 도메인에서도 절대경로로 유효한지 확인
- [ ] domain-map에 항목 추가 후 `npm run domains:map` 통과

## 하지 않기로 한 것 (이번 단계)

- CNAME 파일 생성
- vercel.json / 호스팅 설정 파일 생성
- 도메인별 빌드 분리
