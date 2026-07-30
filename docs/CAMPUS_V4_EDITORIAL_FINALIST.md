# WeThru Campus V4 — Editorial Finalist

Campus 판매 페이지 V4의 설계·정책·검수 기준 문서.
핸드오프 기록은 `docs/CAMPUS_V4_HOME_HANDOFF_2026-07-27.md`,
상품·동의·후기 운영 기준은 `docs/CAMPUS_OPERATIONS.md`가 원본이다.
이 문서는 그 위에서 **V4가 무엇이고 무엇을 하지 않는가**를 고정한다.

- 브랜치: `feat/campus-v4-editorial-finalist`
- 기준 커밋: V2 clean `e4dbbe5`
- 라우트: `/campus-v4/`

---

## 1. 범위와 격리

V4는 **새 라우트 + 새 데이터 소스**다. 기존 버전을 고치지 않는다.

| 구성 | 파일 |
| --- | --- |
| 콘텐츠 | `src/data/campus-v4.ts` |
| 페이지 | `src/pages/campus-v4.astro` |
| 스타일 | `src/styles/campus-v4.css` |

건드리지 않는 것:

- **V1** — `prototypes/student-profile-mvp/`
- **V2** — `src/data/campus.ts` · `src/pages/campus.astro` · `src/styles/campus.css`
- **V3** — `origin/feat/campus-v3-hybrid` (별도 브랜치, 이 워크트리에 없음)
- 고객 프로필 원본 — `src/data/customers/*.ts`, `src/pages/profiles/[slug].astro`

`campus-v4.css`는 `campus-v4.astro`만 import한다. 그래서 이 파일의 `:root` 토큰과
`html` 규칙(`scroll-padding-top`)은 V4 라우트에만 적용되고 다른 페이지로 새지 않는다.

---

## 2. 디자인 언어

Claude Desktop이 만든 검정·흰색 Editorial 시안이 시각적 기준이다.

- 흰색 중심 지면 + 거의 검정에 가까운 제목 (`--ink #0e1013`)
- 섹션 워시는 **따뜻한 뉴트럴** (`--surface-tint #f6f5f1`) — 파란 배경 금지.
  전면 파란 워시는 V2의 특징이었고 V4에서 폐기했다.
- 코발트(`--accent #2f68d8`)는 **링크와 작은 강조에만**. 헤드라인은 검정 유지,
  강조는 단어 아래 하이라이터 스와이프(`.v4-hero__title .hl`)로만 준다.
- CTA는 검정 pill(`.btn--ink`), 마지막 밴드는 다크(`--surface-ink #101216`)
- 히어로 타이포는 크게 (`clamp(2.6rem, 6.4vw, 4.7rem)`)
- eyebrow·번호·키 라벨은 모노스페이스 — 에디토리얼 리듬용

**증거는 CSS 목업이 아니라 실제 제작 화면이다.** `.v4-live-preview`의 브라우저
프레임은 가짜 화면을 만드는 장치가 아니라, 이미 공개된 실제 페이지를 그대로
담는 액자다. 안에 든 것은 이미지가 아니라 그 페이지 자체(iframe)다.

---

## 3. 페이지 구조 (11)

1. 스티키 상단 바 (`.v4-topbar`) — 검수 리본 + 내비게이션
2. 히어로 — 헤드라인 / 서브 / CTA 2개 / 근거 3줄 / BEFORE → AFTER
3. 문제 3장 — 개수가 아니라 읽히는 순서
4. **실제 제작 사례** — 동의 게이트. 동의 0건이면 섹션과 내비 링크가 렌더링되지 않음
5. 두 상품 비교 — 얼리버드 / Interview Portfolio(featured, 다크 헤더)
6. Interview Portfolio 구성 예시 — 작고 부차적, 항상 "구성 예시 · 실제 구매 사례 아님"
7. 진행 방식 4단계
8. 포함하지 않는 범위 + 초기 피드백 안내
9. FAQ 아코디언 (`<details>`)
10. 최종 CTA — 다크 밴드, 신청 폼 없으면 비활성
11. 푸터 (`WeThruFooter`)

히어로 순서는 이준구 → 배지안 → 조예솔이 아니라, **사례 섹션(4)**의 순서가
이준구 → 배지안 → 조예솔이다. `campusV4Offer.cases` 배열 순서가 곧 화면 순서다.

---

## 4. 콘텐츠 정책

- 공개 상품은 2개뿐. 얼리버드 커리어 프로필 **99,000원**
  (7월 31일까지 · 첫 10명 런칭가), Interview Portfolio **199,000원**.
- 런칭가는 **날짜가 박힌 실제 기간**이다. 페이지에 "7월 31일까지"를 명시하고,
  이후 가격이 조정되는 이유("8월부터 제작시간과 초기 고객 피드백을 반영해
  가격이 조정됩니다")를 함께 쓴다. 7/31이 지나면 숫자를 손으로 고친다.
  같은 프로모션을 자동으로 연장하는 카운트다운·재계산 로직을 만들지 않는다.
- 존재하지 않는 정가에 취소선을 긋지 않는다. "-50%", "정가 198,000원",
  "기존가 198,000원" 모두 금지. 이 상품에는 이전 정가가 없다.
- **학생을 심사하는 문구를 쓰지 않는다.** 경험이 페이지를 만들 만한 가치가
  있는지, 자격이 되는지 판단하는 표현이 없어야 한다. WeThru는 지금 가진 자료로
  가능한 구성을 정리한다.
- **후기를 강요하지 않는다.** 5분 내외 솔직한 피드백을 부탁하되, 좋은 평가나
  특정 별점을 요구하지 않고, 후기는 결과물 전달의 조건이 아니다.
- 합격을 보장하지 않는다고 먼저 적는다(섹션 8).
- 세 사례는 **디자인·편집 능력**을 증명한다. Interview Portfolio를 구매했다는
  증거가 아니다. 사례 문구에 그런 암시를 넣지 않는다.
- 정적 빌드로 실제 제공할 수 없는 기능은 약속하지 않는다. 직무별 첫 화면 2종 /
  비밀번호 보호 / 발표형 면접 모드는 `conditional`("기술 검토 후 함께 논의")로만.

---

## 5. 안전 모델

### 5.1 신청 게이트

`applyFormUrl: null` 유지. 검증된 폼 URL이 없으므로 추측 URL을 만들지 않는다.

- null인 동안: 신청 버튼 비활성("온라인 신청 준비 중"), 페이지 `noindex, nofollow`
- 검증된 폼이 생기는 순간 값만 채우면 버튼 활성 + 색인 허용으로 바뀐다

### 5.2 사례 동의 게이트 (`approvedForCampus`)

공개된 고객 프로필과 **판매 페이지 사례 사용 동의는 별개**다.

```
visibleCases = REVIEW_MODE ? 전체 후보 : approvedForCampus === true 만
showCases    = visibleCases.length > 0
```

게이팅은 빌드 시점(서버 측)에서 일어난다. 미동의 후보의 이름·직무·링크·설명은
프로덕션 HTML에 **문자열로도 들어가지 않는다.** 현재 동의 0건.

`showCases`는 SEO 문구까지 지배한다. 사례가 렌더링되지 않는 빌드에서는
title·description·og:*가 "실제 제작 사례로 보여드립니다"라고 말하지 않는다.
`noindex`여도 og:*는 메신저 링크 미리보기에 그대로 살아 있으므로, 보이지 않는
것을 약속하지 않기 위한 규칙이다.

### 5.3 미리보기는 파일이 아니라 URL이다

**2026-07-27 변경.** 사례 미리보기를 로컬 WebP 스크린샷에서 **live preview
iframe**으로 바꿨다.

이전 구조는 `src/assets/campus-v4/*.webp`를 `import.meta.glob(?inline)`으로
읽어 data URI로 심었다. 그런데 그 디렉터리는 `.git/info/exclude` 대상이라
**파일이 있는 PC에서만** 그림이 나온다. 회사 PC에서 캡처한 파일은 push되지
않으니 집 PC에는 없고, 집 PC에는 헤드리스 브라우저가 없어 재캡처도 못 했다.
결과적으로 세 사례 모두 "스크린샷 없음" 안내문만 남았다 — 구조가 실제 페이지와
미리보기를 아예 연결하지 않고, 우연히 존재하는 로컬 파일에만 의존했기 때문이다.

지금은 이미 공개된 페이지를 URL로 직접 embed한다.

- iframe `src`는 `caseHref(c)` — "완성된 프로필 보기" 링크와 **같은 값**이다.
  URL을 두 번 쓰지 않는다.
- 넓은 가상 viewport로 렌더한 뒤 `transform: scale()`로 축소한다. 폭은
  `calc(100% / var(--v4-preview-scale))`로 유도하므로 잘림도 여백도 없다.
- 높이는 `--v4-preview-height`로 못 박는다. iframe에는 고유 높이가 없어서,
  이 상한이 없으면 카드가 무한히 늘어난다.
- 장식이므로 `pointer-events: none` · `tabindex="-1"` · `aria-hidden="true"`.
  프레임 위에 투명 링크를 덮지 않는다. 이동 경로는 본문의 텍스트 링크 하나뿐.
- `sandbox="allow-scripts allow-same-origin"` — `allow-top-navigation`이 없으므로
  embed된 페이지가 이 페이지를 다른 곳으로 돌릴 수 없다.

**저장소에 들어가는 이미지 바이트가 0이 됐다.** 사례 스크린샷 파일이라는 개념
자체가 사라졌으므로, 실수로 commit될 대상도 없다. `src/assets/campus-v4/`의
ignore 규칙은 그대로 두되 이제 빈 디렉터리다.

동의 게이트는 그대로다. 미리보기가 URL로 바뀌었어도 **미동의 사례는 프로덕션
빌드의 HTML에 이름조차 들어가지 않는다** (`approvedForCampus` 필터가
서버 사이드). 이미 공개된 페이지라는 사실은 판매 페이지 사례 사용 동의와 별개다.

사례 카드에 이메일·전화·주소·생년월일을 절대 넣지 않는다. 이름·직무·한 줄
설명·본인이 공개한 링크까지만.

### 5.4 유일한 예시 블록

`ipPreview`(섹션 6)만 예시다. 작고 부차적이며(상품 영역 안, 히어로 아님),
항상 "구성 예시 · 실제 구매 사례 아님" 라벨을 달고, 사람·학교·수치를 만들지 않는다.

---

## 6. 로컬 review 절차

```bash
# 프로덕션과 동일한 출력 (미동의 사례 없음)
npm run build

# 후보 포함 검수 화면 (빨간 "배포 금지" 리본)
CAMPUS_REVIEW=1 npm run build
npm run preview
```

`CAMPUS_REVIEW=1 npm run dev`도 같은 게이트를 통과한다.
review 빌드는 항상 `noindex, nofollow`다.

검수 시 확인:

- 사례 순서가 이준구 → 배지안 → 조예솔
- 리본이 상단에 붙어 있고, 스크롤해도 내비게이션과 겹치지 않음
- 모바일 390×844 / 데스크톱 1440px
- FAQ를 키보드(Tab → Enter/Space)만으로 열고 닫을 수 있고 포커스 링이 보임
- 내비 링크 클릭 시 섹션 제목이 스티키 바에 가려지지 않음

---

## 7. 이번 세션에서 고친 것

집 PC 복원 후 V4 소스 전체 검토에서 나온 결함과 수정.

| # | 결함 | 영향 | 수정 |
| - | --- | --- | --- |
| 1 | `scroll-padding-top` 없음 | 모든 내비 링크·CTA 앵커가 스티키 바 아래로 들어가 섹션 제목이 가려짐 | `campus-v4.css`에 라우트 스코프 `html { scroll-padding-top: 5.5rem }`, 리본이 있으면 `8.25rem` (`:has`) |
| 2 | 리본과 내비가 각각 sticky, 내비 오프셋이 `top: 2.1rem` 하드코딩 | 리본이 좁은 화면에서 두 줄로 감기면 내비가 리본 뒤에 영구히 가려짐 | 둘을 `.v4-topbar` 한 컨테이너로 묶고 그 컨테이너만 sticky. 매직 넘버 제거 |
| 3 | title·description·og:*가 사례를 무조건 약속 | 동의 0건 프로덕션 빌드에서 보이지 않는 "실제 제작 사례"를 링크 미리보기가 홍보 | SEO 문구를 `showCases`에 연동 |
| 4 | 스크린샷 없는 상태가 개발자 문구 (`스크린샷 파일 없음 — src/assets/...`) | 동의를 받아 `true`로 바꾸는 순간 공개 페이지에 개발자 문자열이 노출됨 (§5.3대로 배포에는 스크린샷이 없으므로 반드시 발생) | 공개 문구를 기본값으로, 파일 경로 힌트는 `REVIEW_MODE`에서만 |
| 5 | 섹션 주석이 HTML 주석 (`<!-- 4. 실제 제작 사례 (consent-gated…) -->`) | 게이팅 내부 구조가 공개 HTML에 그대로 실림 | Astro 주석 `{/* */}`으로 변경 — 출력에 남지 않음 |
| 6 | 히어로 BEFORE→AFTER 블록이 `aria-hidden="true"` | 실제 카피인데 스크린리더에서 완전히 사라짐 | `aria-hidden` 제거, `role="group"` + 라벨. 화살표 글리프만 숨김 |
| 7 | FAQ `<summary>` 포커스 링이 `overflow: hidden`에 잘림 | 키보드 사용자가 어디에 포커스가 있는지 볼 수 없음 | `.v4-faq__q:focus-visible { outline-offset: -3px }` |

### 7.1 육안 검수 반영 (2026-07-27, 2차)

| # | 항목 | 내용 |
| - | --- | --- |
| 8 | 루트 대시보드에 이준구 누락 | `customer-index.ts`가 `import.meta.glob("./customers/*.ts")`로 **이 저장소 안의 파일만** 수집한다. 이준구는 본인 전용 저장소 + 본인 Vercel 배포로 납품되어 `src/data/customers/`에 모듈이 없다 → glob이 볼 수 없다. 플래그로 숨겨진 게 아니라 애초에 수집 대상이 아니었다 |
| 9 | 외부 프로필 카드 지원 추가 | `src/data/external-profiles.ts` 신설. `CustomerProfile` 스키마로 억지 복제하지 않는다 — 그 스키마는 `/profiles/<slug>/` 라우트를 생성하고 `validate-customers.mjs` 검사를 받으므로, 가짜로 채우면 깨진 중복 라우트가 생기거나 존재하지 않는 필드에서 검증이 실패한다. 링크에 필요한 최소 정보만 담는다 |
| 10 | 4개 카드 레이아웃 | `auto-fill minmax(17rem)`은 60rem 셸에 3개를 넣어 4번째가 혼자 줄바꿈된다. `min-width: 46rem`부터 2열 고정 → 2×2. 그 아래는 기존대로 stack |
| 11 | 얼리버드 가격 49,000원 → 99,000원 | 7월 31일까지 · 첫 10명 런칭가. 취소선·"-50%"·허위 기준가 없이 날짜와 조정 사유만 표기. §4 참고 |

### 7.2 사례 미리보기 → live preview iframe (2026-07-27, 3차)

| # | 항목 | 내용 |
| - | --- | --- |
| 12 | 세 사례 모두 "스크린샷 없음" 안내문만 표시 | 미리보기가 실제 페이지 URL이 아니라 **로컬 WebP 파일의 존재 여부**에 묶여 있었다. `src/assets/campus-v4/`는 git-ignore 대상이라 캡처한 PC에서만 그림이 나온다. 회사 PC의 파일은 push되지 않고, 집 PC에는 헤드리스 브라우저가 없어 재캡처도 불가능했다. 파일 없음 = 안내문이 정상 동작이었던 셈 |
| 13 | live preview iframe으로 교체 | `shot` 필드, `import.meta.glob(?inline)`, `caseShots`, `.v4-shot__missing`/`__hint` 전부 제거. `.v4-live-preview`가 `caseHref(c)`(= "완성된 프로필 보기" 링크와 동일한 값)를 iframe으로 embed한다. 상세는 §5.3 |
| 14 | 이준구 외부 embed 가능 여부 확인 | `X-Frame-Options`·CSP `frame-ancestors` **둘 다 없음** (응답 헤더는 `HTTP/2 200` + `server: Vercel`뿐). 실제 headless Chrome 렌더로도 확인 — 차단 없음, fallback 불필요 |

---

## 8. 검수 기록

`astro check` — **0 errors / 0 warnings / 2 hints**
hint 2건 모두 deprecation 알림이고 동작에는 영향이 없다.
- `src/scripts/copy-link.ts` `document.execCommand` — V4 무관·기존
- `campus-v4.astro` iframe `scrolling="no"` — 표준상 obsolete지만 모든 주요
  브라우저가 지원한다. 축소 렌더된 iframe 안쪽 스크롤바를 없애는 유일하게
  안정적인 방법이라 의도적으로 남겼다

`npm run validate:customers` — 3개 고객 파일 통과. 경고 2건은 모두 기존
`seo-baul` 건(연락처 이메일 없음, 사진 파일 없음)이며 이번 변경과 무관하다.
외부 프로필은 이 검사 대상이 아니다 (§7.1 #9).

프로덕션 빌드 (`npm run build`) — `/campus-v4/index.html` 19,050 bytes

| 확인 | 결과 |
| --- | --- |
| 후보 이름 (이준구·배지안·조예솔, 영문 포함) | 0건 |
| 외부 링크 `lee-jungu-profile` | 0건 |
| `id="cases"` · 내비 "제작 사례" | 없음 |
| `data:image` (이미지 바이트) | 0건 |
| `<iframe` | 0건 |
| "배포 금지" 리본 | 없음 |
| 개발자 문자열 (`src/assets`, "스크린샷", "commit 금지") | 0건 |
| HTML 주석 | 0건 |
| "실제 제작 사례" (SEO 문구 포함) | 0건 |
| `robots` | `noindex, nofollow` |
| `49,000` · `100,000` · `10만원` · `49k` · `4.9만` | 각 0건 |
| `-50%` · `198,000` · "정가" · "취소선" | 각 0건 |
| `99,000원` | 14건 |
| `199,000원` | 6건 |
| "7월 31일까지" / "7.31 마감" / "8월부터" | 각 1건 |

review 빌드 (`CAMPUS_REVIEW=1 npm run build`) — 25,391 bytes

| 확인 | 결과 |
| --- | --- |
| `.v4-topbar` + 빨간 리본 "배포 금지" | 있음 |
| 사례 순서 | 이준구 → 배지안 → 조예솔 |
| iframe `src` | `https://lee-jungu-profile.vercel.app/` · `/profiles/bae-jian/` · `/profiles/yesol/` (= 텍스트 링크와 동일한 값) |
| iframe 속성 | `loading="lazy"` · `tabindex="-1"` · `aria-hidden="true"` · `sandbox` 각 3건 |
| 주소 표시줄 텍스트 | `lee-jungu-profile.vercel.app` / `profile.wethru.com/profiles/bae-jian` / `…/yesol` |
| 외부 링크 | `target="_blank" rel="noopener noreferrer"` |
| 내부 링크 | `/profiles/bae-jian/`, `/profiles/yesol/` |
| 개발자 안내문 ("검수용 스크린샷", `src/assets/campus-v4`, "commit 금지") | 각 0건 |
| `data:image` | 0건 |
| `robots` | `noindex, nofollow` |
| 가격 | `99,000원` 14건 / `199,000원` 6건, 구가격 0건 |

헤드리스 Chrome 실렌더 (1440px · 390px)

| 확인 | 결과 |
| --- | --- |
| 이준구 외부 iframe | 실제 페이지 표시 (LEE JUNGU 히어로 + 인물 사진). 차단 없음 |
| 배지안 iframe | 실제 페이지 표시 (다크 히어로 + 인물 사진) |
| 조예솔 iframe | 실제 페이지 표시 (라이트 히어로 + 인물 사진) |
| 좌우 스크롤 | 390px에서 `scrollWidth = 375` — 넘치는 요소 0개 |
| 카드 높이 | `--v4-preview-height` 상한대로 고정, 무한 확장 없음 |

루트 대시보드 (`/index.html`, 5,693 bytes) — 프로덕션 빌드 기준

| 확인 | 결과 |
| --- | --- |
| 고객 카드 `<a>` | 4개 (로컬 3 + 외부 1) |
| 이준구 카드 링크 | `https://lee-jungu-profile.vercel.app/` |
| `target="_blank"` · `rel="noopener noreferrer"` | 각 1건 |
| 기존 라우트 | `/profiles/bae-jian/`, `/profiles/seo-baul/`, `/profiles/yesol/` 유지 |
| 2열 그리드 | `@media (min-width: 46rem)` 번들에 포함 |
| 외부 저장소 보조 문구 | 1건 |

V1·V2·V3 격리 — 이번 변경 파일은 V4 3개(`campus-v4.ts`,
`campus-v4.astro`, `campus-v4.css`) + 루트 대시보드 3개(`index.astro`,
`external-profiles.ts`, `profile-base.css`) + 문서 3개뿐.
`src/pages/campus.astro`·`src/data/campus.ts`·`src/styles/campus.css`·
`prototypes/`는 변경 0. `origin/feat/campus-v3-hybrid`는 `5027249` 그대로.
V2는 동결 상태라 코드에 49,000원이 남아 있다 — 의도된 것이며,
`docs/CAMPUS_OPERATIONS.md` §1에 되살릴 때의 조건으로 기록했다.

`git diff --check` — 공백 오류 0건.

### 미완료

- **육안 검수** — 390×844 모바일, 1440px 데스크톱, FAQ 키보드 조작은 사람이
  확인해야 한다. §7의 1·2·7번은 코드 레벨 수정이며 렌더링 확인은 아직 안 됐다.
- 스크린샷 재캡처 항목은 §7.2로 해소됐다. 미리보기가 파일이 아니라 URL이므로
  더 이상 캡처가 필요 없다.

---

## 9. 금지사항

- `git add .`
- 실제 사례 이미지 commit 또는 push
- `approvedForCampus`를 본인 동의 없이 `true`로 변경
- `applyFormUrl`에 추측 URL 입력
- main push 또는 merge
- Production 배포 / promotion
- V1·V2·V3 수정 또는 삭제
- 고객 프로필 원본 수정
- 배포되었다는 사실을 "판매 준비 완료"로 보고하는 것
