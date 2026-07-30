# WeThru Campus V4 A/B Handoff

작성 시각: 2026-07-30 (집 PC `DESKTOP-CTPJ4S5`)
작성 목적: 회사 PC에서 동일 작업을 오차 없이 이어받기 위한 WIP 봉인 문서
이 문서가 Source of Truth. 과거 대화 로그보다 이 문서와 실제 git 상태를 우선한다.

---

## 1. 작업 목적

Campus V4 랜딩의 A/B 실험을 진행 중이다.

- **A안** = 이미 Production에 배포된 `/campus-v4/`. 이번 실험 중 **무변경 유지**가 원칙이었다.
- **B안** = 로컬 전용 `/campus-v4-b/`. A를 건드리지 않는 독립 실험 페이지로, 카피/상품 구조/FAQ/케이스 미러를 새로 구성했다.

현재 단계는 "B 초안 완성 + 사용자 육안 검수 대기" 상태이며, 아직 어떤 안을 채택할지 결정되지 않았다.
이 문서 시점에서는 **추가 기능 수정 없이 WIP로 봉인**하는 것이 목표다.

---

## 2. Repository / branch / commit

| 항목 | 값 |
| --- | --- |
| GitHub | `ceoYS/Wethru_Profile_Customers-` |
| 집 PC worktree | `/home/sinabro/projects/wethru-service/campus-v4-home-worktree` |
| hostname | `DESKTOP-CTPJ4S5` |
| branch | `feat/campus-v4-home-followup` |
| branch base = Production merge commit | `7beeae0eecc5bed6de73cbd5ea5e1f331ff4ca96` |
| WIP commit 이전 HEAD | `7beeae0eecc5bed6de73cbd5ea5e1f331ff4ca96` |
| WIP commit | 이 문서를 담고 있는 commit 자신. subject = `wip: hand off Campus V4 A/B refinement`, parent = `7beeae0…` |

> 문서가 자기 자신의 SHA를 담을 수는 없으므로, WIP commit SHA는 아래로 검증한다.
> ```bash
> git log -1 --format='%H %s'
> # 기대: <sha> wip: hand off Campus V4 A/B refinement
> git rev-parse HEAD^
> # 기대: 7beeae0eecc5bed6de73cbd5ea5e1f331ff4ca96
> git ls-remote origin refs/heads/feat/campus-v4-home-followup
> # 기대: 위 <sha>와 동일
> ```
> 즉 **HEAD는 정확히 `7beeae0…` 바로 위의 WIP commit 하나**여야 한다.

봉인 직전 실제 감사 결과 (가공 없음):

```
$ pwd
/home/sinabro/projects/wethru-service/campus-v4-home-worktree

$ hostname
DESKTOP-CTPJ4S5

$ git branch --show-current
feat/campus-v4-home-followup

$ git rev-parse HEAD
7beeae0eecc5bed6de73cbd5ea5e1f331ff4ca96

$ git status --short --branch
## feat/campus-v4-home-followup...origin/feat/campus-v4-home-followup
?? src/assets/campus-v4-public/case-02-preview-v4-safe.webp
?? src/data/campus-v4-b-anon/
?? src/data/campus-v4-b.ts
?? src/pages/campus-v4-b.astro
?? src/pages/campus-v4-b/
?? src/styles/campus-v4-b.css

$ git diff --name-status
(출력 없음 — tracked 파일 수정 0건)

$ git diff --cached --name-status
(출력 없음 — staged 0건)

$ git ls-files --others --exclude-standard | sort
src/assets/campus-v4-public/case-02-preview-v4-safe.webp
src/data/campus-v4-b-anon/case-02.ts
src/data/campus-v4-b.ts
src/pages/campus-v4-b.astro
src/pages/campus-v4-b/cases/[slug].astro
src/styles/campus-v4-b.css

$ git log --oneline -5
7beeae0 Merge PR #1: deploy anonymized Campus V4 landing
a1f8365 feat: publish anonymized Campus V4 cases
a22c1a0 feat: finalize campus v4 editorial offer
14c507d wip: checkpoint campus v4 editorial finalist
e4dbbe5 fix: remove residual campus judging copy
```

**감사 결론**

- branch = `feat/campus-v4-home-followup` ✅
- HEAD = `7beeae0…` = Production merge commit 그대로, 그 위에 WIP commit 없음 ✅
- staged 0건 ✅
- **A 관련 tracked 파일 수정 0건** — `git diff --name-status`가 완전히 비어 있음 ✅
- 신규 파일은 전부 B 전용 6개 (아래 §6)

---

## 3. 현재 Production 상태

- Production에 떠 있는 것은 **A안 `/campus-v4/`** 하나뿐이다.
- Production merge commit: `7beeae0eecc5bed6de73cbd5ea5e1f331ff4ca96`
- `origin/main` = `7beeae0eecc5bed6de73cbd5ea5e1f331ff4ca96` — 이번 작업으로 **변경되지 않았다**.
- **B안 `/campus-v4-b/`는 Production 미배포.** 로컬/브랜치에만 존재한다.

---

## 4. A안 상태

| 항목 | 값 |
| --- | --- |
| route | `/campus-v4/` |
| 익명 케이스 route | `/campus-v4/cases/case-01/`, `/campus-v4/cases/case-02/`, `/campus-v4/cases/case-03/` |
| 소스 | `src/pages/campus-v4.astro`, `src/pages/campus-v4/cases/[slug].astro`, `src/data/campus-v4.ts`, `src/data/campus-v4-anon/*`, `src/styles/campus-v4.css` |
| 이번 작업 중 변경 | **없음 (byte-identical)** |

검증 근거:

1. `git diff --name-status` 출력 0줄 → A 소스 파일 단 한 줄도 수정되지 않음.
2. 빌드 산출물 md5 비교: A-only 기준선 48개 파일 **48/48 동일**. 차이는 B 전용 산출물 2개가 **추가**된 것뿐.
   - `dist/_astro/campus-v4-b.CKN_iaTp.css` (신규, B 전용)
   - `dist/_astro/case-02-preview-v4-safe.DetldsuQ.webp` (신규, B 전용)
3. A 페이지가 B 번들을 참조하지 않음:
   ```
   $ grep -rl "campus-v4-b\.\|case-02-preview-v4-safe" dist --include=*.html
   dist/campus-v4-b/index.html        ← B 페이지 한 곳뿐

   $ grep -o "_astro/[A-Za-z0-9._-]*\.css" dist/campus-v4/index.html | sort -u
   _astro/_slug_.DjYxr2b7.css
   _astro/campus-v4.B5x42ERF.css      ← A 전용 번들만 참조
   ```

**A안은 사용자가 앞서 준 13개 카피·FAQ·상품 피드백이 아직 반영되지 않은 상태다.** (§9 문제 A 참고)

---

## 5. B안 상태

| 항목 | 값 |
| --- | --- |
| route | `/campus-v4-b/` |
| B 전용 mirror route | `/campus-v4-b/cases/case-01/`, `/campus-v4-b/cases/case-02/`, `/campus-v4-b/cases/case-03/` |
| Production 배포 | **미배포** |
| CSS namespace | `v4b-` (페이지 스코프 CSS로 A와 격리) |
| case-02 직무 표기 | `전략 컨설턴트` / `STRATEGY CONSULTANT` — **B의 case-02에만 적용** |
| 가격 | 99,000원 / 199,000원 (금액 자체는 A와 동일, 설명 문구만 재정의) |

B가 A와 다른 지점 (구현 완료 상태):

- 히어로 BEFORE/AFTER 문구 교체 (`src/data/campus-v4-b.ts:455`, `:460`, `:465`)
- 99,000원 / 199,000원 차이를 **지원 단계의 전체 커리어 프로필** vs **면접 단계의 대표 프로젝트 심층 사례**로 재정의 (`src/data/campus-v4-b.ts:480`, `:481`, `:488`)
- FAQ 2건 제거: `const droppedFaqQuestions = ["후기 작성이 필수인가요?", "합격을 보장하나요?"];` (`src/data/campus-v4-b.ts:382`)
- FAQ 1건 추가: 자체 도메인 (`src/data/campus-v4-b.ts:420`, `:423`) — **가격 미확정 상태로 "별도 안내" 표기**
- case-02 직무 통일 및 B 전용 프리뷰 이미지 사용

**격리 원칙**: B는 A의 데이터 모듈을 import해서 필요한 부분만 override하는 구조다.
`src/data/campus-v4-b.ts`는 `./campus-v4`, `./campus-v4-anon-cases`, `./campus-v4-anon/case-03`을 읽기 전용으로 참조한다. A 파일을 수정하지 않는다.

---

## 6. 현재 변경 파일 전체

tracked 수정: **0건**.
신규(untracked) 파일: **6건**, 전부 B 전용.

| 파일 | 크기 | 역할 |
| --- | --- | --- |
| `src/pages/campus-v4-b.astro` | 573 lines | B 랜딩 페이지 |
| `src/pages/campus-v4-b/cases/[slug].astro` | 89 lines | B 케이스 mirror route |
| `src/styles/campus-v4-b.css` | 1480 lines | `v4b-` namespace 페이지 스코프 CSS |
| `src/data/campus-v4-b.ts` | 596 lines | B 카피/상품/FAQ 데이터 (A 데이터 import 후 override) |
| `src/data/campus-v4-b-anon/case-02.ts` | 305 lines | B 전용 case-02 익명 프로필 (전략 컨설턴트) |
| `src/assets/campus-v4-public/case-02-preview-v4-safe.webp` | 48K | B 전용 case-02 프리뷰 이미지 |

import graph 확인 결과 6개 파일 모두 B route에서 실제로 도달 가능하며, 고아 파일 없음.

**커밋에서 제외한 로컬 파일** (의도적):

- `dist/**` — 빌드 산출물
- `.astro/**` — Astro 캐시
- `node_modules/**`
- scratchpad 전체 (`/tmp/claude-1000/…/scratchpad/`) — QA 스크립트 `arrow.mjs` / `arrow-verify.mjs` / `qa3.mjs` / `acc.mjs`, md5 기준선 `base-now.md5` / `handoff-a.md5`, 임시 캡처 `arrow-*.png` / `handoff-arrow-*.png` / `b-*.png` / `qa-a-*.png`
- 기존 원본 고객 자산 및 legacy 이미지 — 손대지 않음

---

## 7. 현재 QA 결과

봉인 직전 실행 결과 (실제 출력):

| 명령 | 결과 |
| --- | --- |
| `npm run validate:customers` | `✔ all customers valid` — checked 3 customer file(s), warnings 2건 (아래) |
| `npm run check` | **0 errors / 0 warnings / 2 hints** (55 files) |
| `npm run build` | **13 page(s) built**, Complete |
| `git diff --check` | clean (whitespace 오류 없음) |

`validate:customers` 경고 2건은 **이번 작업과 무관한 기존 상태**다:

```
⚠ [src/data/customers/seo-baul.ts] published without contact.email — CTA has no destination
⚠ [src/data/customers/seo-baul.ts] photo file missing: public/images/customers/seo-baul/profile.webp
```

`npm run check` hint 2건도 기존 상태:

```
src/pages/campus-v4.astro:320:35 - ts(6385): 'scrolling' is deprecated.
src/scripts/copy-link.ts:19:23 - ts(6387): document.execCommand is deprecated.
```

빌드된 13 페이지: `/`, `/campus/`, `/campus-v4/`, `/campus-v4/cases/case-01|02|03/`, `/campus-v4-b/`, `/campus-v4-b/cases/case-01|02|03/`, `/profiles/bae-jian|seo-baul|yesol/`

---

## 8. 원본 고객 보호 규칙

**절대 위반 금지.**

- 원본 고객 프로필(`src/data/customers/*`, `src/data/campus-v4-anon/*`의 실제 인물 기반 데이터)은 보호 대상이다.
- 배지안 원본 프로필은 **수정 금지**.
- A안의 case-02는 **수정 금지**. 직무 표기 변경(전략 컨설턴트 / STRATEGY CONSULTANT)은 **B의 case-02에만** 적용한다.
- 익명 케이스는 실명·소속·식별 가능한 링크가 노출되지 않아야 한다. 프리뷰 이미지는 `-safe.webp` 계열만 사용한다.
- B 작업 중 A의 익명화 구조(`AnonProfilePage`, `AnonProofStrip`, `AnonContactCTA`)를 변형하지 않는다. B는 동일 컴포넌트를 재사용만 한다.

---

## 9. 알려진 문제

### 문제 A — 13개 피드백이 A가 아니라 B에 적용되어 있다 (미해결, 결정 필요)

사용자가 앞서 제시한 13개 카피·FAQ·상품 수정 피드백은 **원래 A안 `/campus-v4/`에 대한 피드백**이었다.
그러나 실제 working tree를 확인한 결과, 해당 피드백은 **B안 파일에 적용되어 있고 A안은 byte-identical 상태로 남아 있다.**

실측 증거:

```
$ grep -n "이력서 한 줄" src/data/campus-v4.ts
215:  "이력서 한 줄로는 줄어듭니다",          ← A: 옛 문구 그대로

$ grep -n "전달력이 약합니다" src/data/campus-v4-b.ts
455:  "이력서 하나로는 전달력이 약합니다",     ← B: 새 문구 적용됨

$ grep -n "링크가 너무 흩어집니다" src/data/campus-v4.ts
220:  "링크가 너무 흩어집니다",               ← A: 옛 문구

$ grep -n "분산된 이력" src/data/campus-v4-b.ts
460:  "분산된 이력을 한눈에 볼 수 있도록",     ← B: 새 문구

$ grep -n "꾸미기보다 순서가" src/data/campus-v4.ts
225:  "꾸미기보다 순서가 어렵습니다",          ← A: 옛 문구

$ grep -n "이목을 끌 순서" src/data/campus-v4-b.ts
465:  "이목을 끌 순서 정하기가 어렵습니다",     ← B: 새 문구

$ grep -n "자체 도메인" src/data/campus-v4.ts   → 0 matches   (A: FAQ 없음)
$ grep -n "자체 도메인" src/data/campus-v4-b.ts → 420, 423    (B: FAQ 추가됨)
```

**내일 회사에서 먼저 실제 working tree를 확인한 뒤, 다음 두 가지를 분리해서 처리해야 한다.**

1. A에 13개 피드백을 적용할 것인가?
2. B에서 (원래 A용이었던) 동일 피드백을 원복할 것인가?

→ **사용자 결정 전에는 어느 쪽도 임의로 실행하지 않는다.**

13개 피드백 원문:

1. "이력서 한 줄로는 줄어듭니다" → "이력서 하나로는 전달력이 약합니다"
2. 프로젝트 설명 문구 변경
3. "링크가 너무 흩어집니다" → "분산된 이력을 한눈에 볼 수 있도록"
4. "꾸미기보다 순서가 어렵습니다" → "이목을 끌 순서 정하기가 어렵습니다"
5. "사람마다" 앞 명시적 줄바꿈
6. 명사형 UI 문구의 불필요한 마침표 제거
7. 99,000원과 199,000원의 차이를 **지원 단계 전체 프로필** vs **면접 단계 대표 프로젝트 심층 사례**로 재정의
8. 불필요한 합격·경력 부풀리기 방어 문구 삭제
9. "좋은 평가" 앞 줄바꿈
10. 프로젝트 자료 FAQ의 마지막 문장 삭제
11. 후기 작성 필수 FAQ 삭제
12. 합격 보장 FAQ 삭제
13. 자체 도메인 FAQ 추가 — **단, 가격은 아직 미확정**

### 문제 B — BEFORE/AFTER 화살표 중앙 정렬

사용자 확정 피드백: BEFORE 카드와 AFTER 카드 사이의 아래 방향 화살표를 **카드 컨테이너 기준 수평 중앙**에 정렬한다.

**⚠️ 사용자 지시문에는 "증거 없음 → 미완료로 기록"이라고 되어 있었으나, 실제 working tree 감사 결과 이미 구현되어 있고 계측도 통과했다. 실제 상태를 우선해 아래와 같이 기록한다.**

적용된 코드 (`src/styles/campus-v4-b.css:525-537`):

```css
/* The arrow is a grid item in the same single column as both cards, so
   stretching it and centring the glyph inside puts it on the cards' own
   centre axis at every width. `align-self` only handled the block axis —
   the inline axis defaulted to start, which read as flush-left. */
.v4b-showcard__arrow {
  display: block;
  justify-self: stretch;
  align-self: center;
  text-align: center;
  margin: -0.35rem 0;
  font-size: 1.1rem;
  color: var(--v4b-muted);
}
```

원인: 기존에는 `align-self: center`만 있었다. CSS Grid에서 `align-self`는 **block axis(세로)** 만 제어한다.
inline axis는 기본 `text-align: start` 상태였고, 블록화된 grid item이 컬럼 폭을 채우면서 글리프가 왼쪽 끝에 붙어 보였다.
해결: 화살표를 두 카드와 **같은 단일 grid 컬럼 전체로 stretch** 시키고 글리프를 `text-align: center`로 중앙에 둔다.
→ 매직 넘버 offset 없이, 폭과 무관하게 **화살표 중심축 ≡ 카드 중심축**.

`.v4b-showcase { display: grid; gap: 1rem; }` (`src/styles/campus-v4-b.css:473`) — 미디어 쿼리로 컬럼 수가 바뀌지 않는 단일 컬럼이므로 데스크톱/모바일 모두 동일하게 적용된다.
`line-height`는 의도적으로 건드리지 않았다 (카드 간 세로 간격 유지).

**검증 기준 및 실측 결과** — `astro preview` (port 4400) + Chrome DevTools Protocol:

```
containerCenterX = container.left + container.width / 2   (.v4b-showcase)
arrowCenterX     = arrow.left     + arrow.width     / 2   (.v4b-showcard__arrow)
합격 조건: abs(containerCenterX - arrowCenterX) <= 1px
```

| viewport | containerCenterX | arrowCenterX | glyphCenterX | deltaBox | deltaGlyph | arrowW/containerW | 판정 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1440×900 | 1027.29 | 1027.29 | 1027.29 | 0.00 | 0.00 | 505.39 / 505.39 | PASS |
| 390×844 | 195.00 | 195.00 | 194.99 | 0.00 | 0.01 | 350 / 350 | PASS |
| 360×800 | 180.00 | 180.00 | 179.99 | 0.00 | 0.01 | 320 / 320 | PASS |

`glyphCenterX`는 박스 중심이 아니라 `Range.selectNodeContents()`로 측정한 **실제 렌더된 글리프 중심**이다 (박스만 늘어나고 글자가 치우친 경우도 잡아내는 더 엄격한 기준).
`betweenCards=true` — 화살표가 BEFORE 카드 아래·AFTER 카드 위 사이에 위치.
캡처 증거는 scratchpad에만 존재하며 커밋하지 않았다: `handoff-arrow-1440.png`, `handoff-arrow-390.png`, `handoff-arrow-360.png`.

**남은 것: 사용자 육안 최종 승인.** 계측은 통과했으나 사용자 승인 전에는 완료로 간주하지 않는다.

### 문제 C — B의 2번 피드백 미정

사용자가 "2번 피드백은 미정"이라고 명시했다. B에 대한 추가 피드백 항목이 아직 도착하지 않았으므로 대기 상태다.

### 문제 D — 자체 도메인 FAQ 가격 미확정

13번 피드백의 자체 도메인 FAQ는 B에 추가되어 있으나 **가격이 확정되지 않아 "별도로 안내드립니다"로 표기**되어 있다 (`src/data/campus-v4-b.ts:423`). 가격 확정 시 문구 갱신 필요.

---

## 10. 내일 회사에서 가장 먼저 할 작업

순서대로 진행한다.

1. **상태 검증** — §13 재개 명령 실행. `git log -1 --format='%H %s'`의 subject가 `wip: hand off Campus V4 A/B refinement`이고 `git rev-parse HEAD^`가 `7beeae0eecc5bed6de73cbd5ea5e1f331ff4ca96`인지, 그리고 local HEAD == `git ls-remote origin refs/heads/feat/campus-v4-home-followup`인지 확인한다. 하나라도 불일치하면 멈추고 원인부터 파악한다.
2. **A/B 피드백 대상 분리 결정** — §9 문제 A. 사용자에게 다음을 확인받는다.
   - 13개 피드백을 A에 적용할 것인가?
   - B에 적용된 동일 피드백을 유지할 것인가, 원복할 것인가?
   - 결정 전에는 카피를 건드리지 않는다.
3. **B 화살표 정렬 육안 승인** — `http://localhost:4321/campus-v4-b/` 히어로에서 사용자 육안 확인. §9 문제 B 계측표를 근거로 제시한다.
4. **B 2번 피드백 수령 후 반영** — §9 문제 C.
5. 각 단계마다 QA(`check` + `build`) 실행 후 **사용자 육안 검수를 기다린다.**

---

## 11. 금지 사항

- ❌ `main` merge 금지
- ❌ Production deploy 금지
- ❌ PR merge 금지
- ❌ `origin/main` 직접 push 금지
- ❌ `git add .` 금지 — 항상 파일을 명시적으로 지정해서 stage 한다
- ❌ `scratchpad`, `dist`, `.astro`, `node_modules`, 임시 캡처, 브라우저 QA 스크립트 commit 금지
- ❌ A안 원본 고객 프로필·익명화 구조 훼손 금지 (§8)
- ❌ 사용자 결정 전 §9 알려진 문제 임의 해결 금지
- ✅ 허용: `feat/campus-v4-home-followup` 브랜치 push만

---

## 12. 로컬 검수 URL

dev 서버 (`npm run dev`, port 4321):

- B 랜딩: `http://localhost:4321/campus-v4-b/`
- B 케이스: `http://localhost:4321/campus-v4-b/cases/case-01/` · `case-02` · `case-03`
- A 랜딩 (회귀 확인용): `http://localhost:4321/campus-v4/`
- A 케이스: `http://localhost:4321/campus-v4/cases/case-01/` · `case-02` · `case-03`

preview 서버 (`npm run build && npm run preview -- --port 4400`, port 4400):

- 스크린샷/계측 QA는 preview에서 수행한다. dev 툴바가 캡처를 오염시키기 때문이다.
- `http://localhost:4400/campus-v4-b/`

---

## 13. 회사 PC 재개 명령

회사 PC 예상 경로: `/home/founder_ys/projects/wethru-service/campus-v4-home-worktree`

```bash
cd /home/founder_ys/projects/wethru-service/campus-v4-home-worktree

git fetch origin --prune

git status --short --branch
```

⚠️ **여기서 멈춘다.** 회사 worktree에 로컬 변경(tracked 수정 또는 미커밋 B 파일)이 있으면 **pull 하지 말고** 집 PC 상태와 먼저 비교한다. 로컬 변경이 없을 때만 아래를 진행한다.

```bash
git pull --ff-only origin feat/campus-v4-home-followup

git branch --show-current
git rev-parse HEAD
git status --short --branch
```

§2의 검증 블록(`git log -1 --format='%H %s'` / `git rev-parse HEAD^` / `git ls-remote`)으로 HEAD가 맞는지 확인한 뒤:

```bash
npm ci
npm run validate:customers
npm run check
npm run build
```

기대 결과: `✔ all customers valid` (기존 경고 2건) / `0 errors, 0 warnings, 2 hints` / `13 page(s) built`.

---

## 14. Claude Code 재개 프롬프트

아래를 회사 PC의 Claude Code에 그대로 붙여넣는다.

```
docs/handoff/WeThru_Campus_V4_AB_Handoff_2026-07-30.md 를 Source of Truth로 전부 읽어라.

먼저 현재 Git 상태가 문서 §2와 정확히 일치하는지 확인하라.
git log -1 --format='%H %s' 의 subject가 "wip: hand off Campus V4 A/B refinement" 이고,
git rev-parse HEAD^ 가 7beeae0eecc5bed6de73cbd5ea5e1f331ff4ca96 이고,
local HEAD 가 origin/feat/campus-v4-home-followup 과 같아야 한다.
불일치하면 즉시 멈추고 보고하라.

새 수정을 시작하기 전에 A/B 피드백 대상을 반드시 분리하라.
13개 카피·FAQ·상품 피드백은 원래 A안 대상이었으나 현재 B안에 적용되어 있다.
A에 적용할지, B에서 원복할지 나에게 먼저 확인받아라.

A 작업:
기존 13개 카피·FAQ·상품 피드백 적용 (내 확정 지시 후에만)

B 작업:
BEFORE/AFTER 아래 방향 화살표 중앙 정렬 — 육안 최종 승인
B 2번 피드백 — 내가 줄 때까지 대기

A의 기존 고객 프로필·개인정보 보호 구조는 훼손하지 않는다.
A안 case-02와 배지안 원본 프로필은 수정하지 않는다.
한 단계씩 QA 후 내 육안 검수를 기다린다.
commit / push / merge / deploy는 별도 승인 전 금지한다.
git add . 금지, 파일 명시 stage만 허용한다.
```

---

## 15. 완료 조건

이 핸드오프 단계는 아래를 모두 만족하면 완료다.

- [x] 실제 git 상태 감사 완료 (추정 아님)
- [x] `npm run validate:customers` / `npm run check` / `npm run build` / `git diff --check` 통과
- [x] A안 무변경 검증 (tracked diff 0건 + dist 48/48 md5 동일 + A 페이지가 B 번들 미참조)
- [x] 핸드오프 문서 작성 및 실제 출력 삽입
- [x] B 필수 파일 + 문서만 명시적 stage (`git add .` 미사용)
- [x] WIP commit 생성
- [x] `feat/campus-v4-home-followup` 브랜치만 push, LOCAL_SHA == REMOTE_SHA 확인
- [x] `origin/main` 무변경, PR 생성·merge·deploy 없음

미완료로 남는 것 (의도적):

- [ ] §9 문제 A — 13개 피드백의 A/B 귀속 결정
- [ ] §9 문제 B — 화살표 정렬 사용자 육안 최종 승인
- [ ] §9 문제 C — B 2번 피드백 수령
- [ ] §9 문제 D — 자체 도메인 FAQ 가격 확정
