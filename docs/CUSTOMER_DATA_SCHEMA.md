# 고객 데이터 스키마

단일 소스: `src/types/profile.ts` (`CustomerProfile`). 이 문서는 운영자용 해설이다.

## 최상위 필드

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `slug` | string | ✔ | URL 조각. 소문자-하이픈. 파일명과 일치해야 함 |
| `theme` | `navy-black-white` \| `warm-editorial` \| `graphite-minimal` | ✔ | 색/타이포/질감 preset |
| `layout` | `editorial-split` \| `dossier` \| `magazine` \| `minimal-card` | ✔ | 구조 preset |
| `status` | `draft` \| `published` | ✔ | draft는 빌드되지만 noindex + 대시보드에 작게 표시 |
| `seo` | object | ✔ | title / description / ogImage |
| `person` | object | ✔ | 이름, tagline, summary, photo |
| `contact` | object | ✔ | email/링크. phone은 기본 비노출 |
| `badges` | string[] | | hero 전문 분야 태그 |
| `strengths` | array | | 일하는 방식 카드 (2×2 그리드) |
| `experiences` | array | | 경력 타임라인 |
| `projects` | array | | 문제/접근/결과 구조 |
| `proofs` | array | | 숫자 성과 스트립. value + label 필수 |
| `privacy` | object | ✔ | 아래 참조 |

## person

- `name` ✔ — 표기 이름
- `englishName` — hero에서 세리프 이탤릭으로 표시, 모노그램 fallback의 이니셜 소스
- `roleLine` ✔ — 직군 한 줄 (예: "Marketing & Strategy")
- `tagline` ✔ — hero + identity statement 두 곳에 사용되는 핵심 문장
- `summary` ✔ — 2~4문장
- `photo.src` ✔ — `/images/customers/{slug}/profile.webp`
- `photo.alt` ✔ — 누락 시 검증 실패

## contact

- `email` + `showEmail: true` → hero/Contact CTA에 노출
- `phone`은 저장해도 **UI에 절대 렌더링되지 않는다** (컴포넌트가 아예 출력하지 않음)
- `showPhone: true`로 바꾸면 검증 스크립트가 경고를 낸다 — 고객 서면 동의 없이는 금지
- `links` — 외부 링크 (포트폴리오, LinkedIn 등). Contact 섹션에만 표시

## privacy (전부 필수)

```ts
privacy: {
  hideAddress: true,      // 리터럴 true 강제. address 필드 자체가 스키마에 없음
  hideBirthDate: true,    // 리터럴 true 강제. birthDate 필드 자체가 스키마에 없음
  hidePhoneByDefault: true,
}
```

검증 스크립트는 데이터 파일 원문에서 `address:` / `birthDate:` / `birthday:` 패턴도 스캔해 차단한다.

## 검증 규칙 요약 (`npm run validate:customers`)

**에러 (exit 1, 배포 차단):**

- slug/name/tagline/summary/photo.alt/seo.title/seo.description 누락
- slug 형식 불량, 파일명 불일치, 중복
- theme/layout/status 값 불량
- `hideAddress`/`hideBirthDate`가 true가 아님
- 원문에 address/birthDate/birthday 패턴 존재
- proofs 항목에 value 또는 label 누락

**경고 (exit 0):**

- `showPhone: true` (노출 의도 재확인)
- published인데 email 없음
- published인데 사진 파일 없음 (모노그램 fallback으로 배포됨)
- strengths/experiences/projects 비어 있음
- TODO 문자열 잔존
