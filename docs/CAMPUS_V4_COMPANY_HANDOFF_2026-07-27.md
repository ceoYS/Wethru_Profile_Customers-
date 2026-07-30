# WeThru Campus V4 — Company Handoff

집 PC에서 Campus V4 Editorial을 최종 봉인한 상태를 회사 PC로 넘기기 위한 문서다.
작성 시점 기준으로 구현·QA·commit·push가 모두 끝나 있고, 회사에서는 **받아서
확인만 하면 된다.** 추가 디자인 수정·문구 개선·리팩터링은 이 문서의 범위가 아니다.

작성일: 2026-07-27 (집 PC)

## Source of truth

| 항목 | 값 |
| --- | --- |
| Branch | `feat/campus-v4-editorial-finalist` |
| Previous checkpoint | `14c507d50ffb93a2b302562e8d075efd9b65e953` |
| Final source of truth | `origin/feat/campus-v4-editorial-finalist`의 최신 tip |
| Home worktree | `/mnt/c/Users/Sinabro/Projects/wethru-service/campus-v4-editorial-worktree` |
| Company worktree | `/mnt/d/Projects/wethru-service/campus-v4-editorial-worktree` |
| Main | unchanged (`440e2a2`) |
| Production | unchanged — 이 브랜치는 배포되지 않았다 |

회사에서 로컬 파일을 기준으로 삼지 마라. **원격 브랜치 tip이 유일한 기준이다.**

## Final implementation

- Claude Desktop Editorial 디자인 (검정·흰색 에디토리얼 톤)
- Campus V4 route: `/campus-v4/`
- 실제 사례 순서: **이준구 → 배지안 → 조예솔**
- 미리보기는 로컬 WebP가 아니라 **live iframe preview**를 쓴다.
  로컬 파일 존재 여부에 묶여 있던 이전 구조를 걷어내고, 이미 공개된 페이지를
  URL로 직접 embed한다. 자세한 배경은 `docs/CAMPUS_V4_EDITORIAL_FINALIST.md`
  §5.3 · §7.2 참고.
- 이준구는 외부 페이지(`https://lee-jungu-profile.vercel.app/`) iframe 정상.
  `X-Frame-Options` 없음, CSP `frame-ancestors` 없음 → 차단 근거 0.
- 배지안·조예솔은 내부 profile route(`/profiles/bae-jian/`, `/profiles/yesol/`)
  iframe 정상.
- iframe `src`와 "완성된 프로필 보기" 링크 `href`는 **같은 단일 URL 소스**
  (`caseHref(c)`)에서 나온다. URL을 두 번 쓰지 않는다.
- iframe 보안·접근성 속성:
  `pointer-events: none` / `tabindex="-1"` / `aria-hidden="true"` /
  `loading="lazy"` / `sandbox="allow-scripts allow-same-origin"`
  (`allow-top-navigation` 미부여 — embed된 페이지가 판매 페이지를 다른 곳으로
  돌릴 수 없다) / `referrerpolicy="no-referrer"`
- 프레임 위에 투명 링크 없음. 이동은 본문 텍스트 링크로만 제공한다.
- 프리뷰 크기는 CSS 변수 2개로만 조절한다:
  `--v4-preview-scale`, `--v4-preview-height`.
  폭은 `calc(100% / var(--v4-preview-scale))`로 **유도**하므로 축소 후 컬럼 폭과
  정확히 일치한다 (잘림·여백 0). 높이 변수는 카드 높이 상한이다 — iframe에는
  고유 높이가 없어서 이게 없으면 카드가 무한히 늘어난다.
  값: 모바일 `0.5 / 400px`, ≥600px `0.62 / 400px`, ≥900px `0.46 / 340px`.
- 루트 고객 관리 페이지에 이준구 외부 카드 추가 → **총 고객 카드 4개**
  (배지안 · 서바울 · 조예솔 · 이준구)
- 상품 구조: 얼리버드 커리어 프로필 **99,000원** / Interview Portfolio
  **199,000원**
- 마감 문구: **7월 31일까지 · 첫 10명 런칭가**.
  8월부터는 제작시간과 초기 고객 피드백을 반영해 가격을 조정한다.
- 사례 노출 차이:
  - 일반 production build → 사례 섹션 **전체 미노출**, `#cases` 앵커도 없음
  - `CAMPUS_REVIEW=1` build → 세 사례 iframe 표시 + 상단 빨간 배포 금지 리본
- `applyFormUrl: null` — 신청 CTA는 비활성 상태
- `approvedForCampus: false` × 3
- `noindex, nofollow`

## Local-only WebP (건드리지 마라)

`src/assets/campus-v4/`에 아래 파일이 로컬로 남아 있다.

```
src/assets/campus-v4/case-lee-jungu.webp
src/assets/campus-v4/case-bae-jian.webp
src/assets/campus-v4/case-yesol.webp
```

iframe 전환 이후 **코드가 이 디렉터리를 전혀 읽지 않는다.** 미참조 파일이다.
삭제·이동·stage·commit·push 모두 하지 않는다. 각 PC의 `.git/info/exclude`에
등록된 로컬 전용 경로 상태를 그대로 유지한다.

확인 방법 (상태 확인만, 변경 금지):

```bash
git check-ignore -v src/assets/campus-v4/*
```

집 PC 결과:

```
.../customers/.git/info/exclude:9:src/assets/campus-v4/	src/assets/campus-v4/case-bae-jian.webp
.../customers/.git/info/exclude:9:src/assets/campus-v4/	src/assets/campus-v4/case-lee-jungu.webp
.../customers/.git/info/exclude:9:src/assets/campus-v4/	src/assets/campus-v4/case-yesol.webp
```

빌드 산출물에도 반영되지 않는다 — `find dist -name '*case-*'` → 0건,
review HTML의 `data:image` → 0건.

## Final QA

집 PC에서 실제로 실행한 명령과 결과다.

### 명령

| 명령 | 결과 |
| --- | --- |
| `npm run validate:customers` | ✔ `checked 3 customer file(s)` · `all customers valid` · 경고 2건 (모두 기존 `seo-baul` 건: contact.email 없음, photo 파일 없음 — fallback 동작) |
| `npm run check` | **0 errors / 0 warnings / 2 hints** (38 files) |
| `npm run build` | ✔ 6 page(s) built |
| `CAMPUS_REVIEW=1 npm run build` | ✔ 6 page(s) built |
| `git diff --check` | 0건 (exit 0) |

`astro check`의 hint 2건은 모두 deprecation 알림이고 동작에 영향이 없다.

- `src/scripts/copy-link.ts:19` — `document.execCommand` (기존)
- `src/pages/campus-v4.astro:232` — iframe `scrolling="no"`

`scrolling` 속성은 표준상 obsolete지만, 축소 렌더된 iframe 내부 스크롤바를
없애는 가장 안정적인 방법이라 **의도적으로 유지한다.** 이 hint를 없애려고
추가 리팩터링을 하지 마라.

### 렌더 검수

| 항목 | 결과 |
| --- | --- |
| Desktop 1440px | 2열 교차 배치 유지, 프레임 높이 340px 고정, 세 사례 실제 화면 표시 |
| Mobile 390px | `scrollWidth = 375`, 우측 넘침 요소 **0개**. 프레임 400px · 가상 viewport 약 700px라 히어로 전체가 읽힌다 |
| 이준구 iframe | 표시됨 — 아이보리 에디토리얼, `LEE JUNGU` 워드마크 + 히어로 + 인물 사진 |
| 배지안 iframe | 표시됨 — 다크 코발트 히어로 + 인물 사진 + 태그 칩 |
| 조예솔 iframe | 표시됨 — 라이트 히어로 + 인물 사진 |

390px 스크린샷에서 우측이 잘려 보이는 현상이 한 번 있었는데, 측정 결과 헤드리스
Chrome의 최소 창 폭 때문에 생긴 캡처 아티팩트였다. 실제 레이아웃 넘침은 없다.

### 빌드 산출물 검사

일반 build (`dist/campus-v4/index.html`, 19,050 B) — 전부 **0건**:

```
이준구 · 배지안 · 조예솔 · <iframe · id="cases" · #cases · 배포 금지
src/assets · 스크린샷 · data:image · 49,000 · 100,000 · <!--
```

Review build (`CAMPUS_REVIEW=1`, 25,391 B):

| 항목 | 결과 |
| --- | --- |
| iframe | 3건 |
| iframe `src` 순서 | `https://lee-jungu-profile.vercel.app/` → `/profiles/bae-jian/` → `/profiles/yesol/` |
| 텍스트 링크 `href` 순서 | iframe `src`와 **동일** (단일 소스 확인) |
| 이름 등장 순서 | 이준구 → 배지안 → 조예솔 |
| `tabindex="-1"` / `loading="lazy"` / `sandbox=` | 각 3건 |
| `aria-hidden="true"` | 9건 (iframe 3 + chrome bar 3 + dot group 3) |
| `v4-review-ribbon` / `배포 금지` / `id="cases"` | 각 1건 |
| `완성된 프로필 보기` | 3건 |
| 주소 표시줄 텍스트 | `lee-jungu-profile.vercel.app` / `profile.wethru.com/profiles/bae-jian` / `profile.wethru.com/profiles/yesol` |
| 개발자 placeholder 문구 | `검수용 스크린샷` · `스크린샷 파일 없음` · `src/assets/campus-v4` · `로컬 전용` · `commit 금지` · `data:image` · `v4-shot` **전부 0건** |
| `pointer-events: none` | CSS 번들 `dist/_astro/campus-v4.*.css`의 `.v4-live-preview__frame` 규칙에 존재 |

가격 문자열 (양쪽 빌드 동일):

| 문자열 | 건수 |
| --- | --- |
| `99,000원` | 14 |
| `199,000원` | 6 |
| `7월 31일까지` | 1 |
| `49,000` | 0 |
| `100,000` | 0 |
| `noindex, nofollow` | 1 |

루트 고객 카드 (`dist/index.html`): `customer-card` 3건 +
`customer-card customer-card--external` 1건 = **4건**.
이준구 외부 링크 `https://lee-jungu-profile.vercel.app/` 1건.
기존 profile route `dist/profiles/{bae-jian, seo-baul, yesol}` 정상 생성.

안전 상태:

| 항목 | 결과 |
| --- | --- |
| `approvedForCampus: true` | 0건 |
| `approvedForCampus: false` | 3건 |
| `applyFormUrl` | `null` |
| V1·V2·V3 (`src/pages/campus.astro`, `src/data/campus.ts`, `src/styles/campus.css`, `prototypes/`) | 변경 0건 |
| main | 변경 0건 (`440e2a2`) |

## Company restore

회사 PC에서 **먼저** 저장소 상태부터 본다.

```bash
cd /mnt/d/Projects/wethru-service/customers || exit 1
git fetch origin --prune
git worktree list
git branch -vv
```

### 기존 회사 V4 worktree가 있는 경우

```bash
cd /mnt/d/Projects/wethru-service/campus-v4-editorial-worktree || exit 1
git status --short --branch
```

**working tree가 clean한 경우에만** 다음을 실행한다.

```bash
git fetch origin --prune
git pull --ff-only origin feat/campus-v4-editorial-finalist
```

working tree가 dirty하거나 local commit이 있으면
`reset` · `restore` · `stash` · `rebase` · `pull` **어느 것도 하지 말고 먼저
보고한다.** 회사 PC에는 push되지 않은 작업이 남아 있을 수 있다.

### 기존 worktree가 없는 경우

로컬 브랜치 존재 여부를 먼저 확인한다.

```bash
cd /mnt/d/Projects/wethru-service/customers || exit 1
git branch --list feat/campus-v4-editorial-finalist
```

로컬 브랜치가 **이미 있으면**:

```bash
git worktree add \
  /mnt/d/Projects/wethru-service/campus-v4-editorial-worktree \
  feat/campus-v4-editorial-finalist
```

로컬 브랜치가 **없으면** 원격을 추적하는 브랜치로 새로 만든다:

```bash
git worktree add \
  /mnt/d/Projects/wethru-service/campus-v4-editorial-worktree \
  -b feat/campus-v4-editorial-finalist \
  --track origin/feat/campus-v4-editorial-finalist
```

worktree를 새로 만들었으면 `src/assets/campus-v4/` 로컬 전용 규칙이
그 저장소의 `.git/info/exclude`에 살아 있는지 확인한다.

```bash
grep -n 'campus-v4' /mnt/d/Projects/wethru-service/customers/.git/info/exclude
```

없으면 **한 줄 추가한다** (이미지가 실수로 stage되는 것을 막는 마지막 방어선):

```
src/assets/campus-v4/
```

## Company verification

```bash
cd /mnt/d/Projects/wethru-service/campus-v4-editorial-worktree || exit 1

git rev-parse HEAD
git rev-parse origin/feat/campus-v4-editorial-finalist
git rev-list --left-right --count HEAD...origin/feat/campus-v4-editorial-finalist
git status --short
```

기대값:

- local HEAD == `origin/feat/campus-v4-editorial-finalist`
- divergence **`0	0`**
- working tree clean (출력 없음)

그 다음 빌드:

```bash
npm ci
npm run validate:customers
npm run check
npm run build
CAMPUS_REVIEW=1 npm run build
```

`npm run check`는 **0 errors / 0 warnings / 2 hints**가 나오면 통과다.

Review 서버:

```bash
CAMPUS_REVIEW=1 \
./node_modules/.bin/astro preview \
  --host 0.0.0.0 \
  --port 4322
```

검수 URL:

```
http://localhost:4322/campus-v4/
http://localhost:4322/
```

육안 확인 항목:

- 사례 3개에 실제 화면이 뜨는지 (이준구 → 배지안 → 조예솔)
- 프레임이 클릭·스크롤되지 않는지
- Tab을 눌렀을 때 iframe에 포커스가 걸리지 않는지
- 모바일 390×844 · 데스크톱 1440px
- 루트 페이지 고객 카드 4개

회사 네트워크에서 이준구 외부 iframe이 비어 보이면 TLS 인터셉션 가능성이 있다.
그건 **코드 문제가 아니다.** 헤더 근거는 이미 확보돼 있다:

```bash
curl -sS -I -L --max-time 15 https://lee-jungu-profile.vercel.app/
# HTTP/2 200 / server: Vercel
# X-Frame-Options 없음, Content-Security-Policy 없음
```

## Remaining decisions

전부 **사람이 결정할 사항**이다. 임의로 진행하지 마라.

- 실제 사례 판매페이지 공개 동의 (이준구 · 배지안 · 조예솔)
- `approvedForCampus` 변경 여부
- 실제 신청 폼 URL (`applyFormUrl`)
- main merge
- Production 배포
- 7월 31일 이후 가격
- 에브리타임 최종 게시글

## Do not

- main push
- main merge
- Production promotion
- `approvedForCampus` 임의 변경
- `src/assets/campus-v4` 이미지 commit
- V1·V2·V3 수정
- 허위 할인율 표시
- 프로모션 자동 연장
