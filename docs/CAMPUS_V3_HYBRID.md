# WeThru Campus — V3 Hybrid

V3 is a **new, parallel** landing for the earlybird career-profile offer. It does
not replace V1 or V2 — all three are preserved (see "버전 보존" below).

- Public route: `/campus-v3/`
- Demo detail routes: `/campus-v3/demo/profile/`, `/campus-v3/demo/project/`
- Page: `src/pages/campus-v3.astro` (+ `src/pages/campus-v3/demo/*.astro`)
- Content: `src/data/campus-v3.ts`
- Styles: `src/styles/campus-v3.css`
- Demo components: `src/components/campus-v3/DemoProfileScreen.astro`,
  `DemoProjectScreen.astro`

V3 imports **none** of the V2 files. It does not touch `src/pages/campus.astro`,
`src/data/campus.ts`, or `src/styles/campus.css`.

---

## 1. 목적

두 기존 Campus 디자인의 장점을 결합한다.

- **V1 Editorial** — 강한 Hero("좋은 경험도 흩어져 있으면 약하게 읽힙니다"),
  문제 3개 카드, 실제 화면을 크게 보여주는 결과물 영역, BEFORE→AFTER 서사,
  검정 고대비 CTA, details/summary FAQ, 짧은 진행 과정, 직접적인 판매 문장.
- **V2 Clean** — 얼리버드 49,000원 / Interview Portfolio 199,000원의 2상품 구조,
  모든 상품에 자료 검토·문장 정리 제공, 첫 10명 초기 출시가, 솔직한 피드백 정책,
  사례 동의 게이트, `applyFormUrl=null`, `noindex,nofollow`, 합격 보장 금지,
  범위·수정 횟수 명시, cobalt-air 브랜드 톤.

V3 = V1의 설득력·시각 증거 + V2의 상품 구조·운영 안전성.

---

## 2. 정보구조 (11 섹션)

1. Sticky navigation
2. Hero (편집형 헤드라인 + 결과물 쇼케이스 + BEFORE/AFTER)
3. 문제 3개
4. **결과물 미리보기 (DEMO)** — 신규 핵심 영역
5. 승인된 실제 사례 (동의 게이트, 0건이면 미렌더)
6. 두 상품 비교
7. 진행 방식
8. 포함하지 않는 범위 + 초기 고객 안내
9. FAQ accordion
10. 신청 CTA (검정 패널, 비활성 버튼)
11. Footer

---

## 3. 결과물 미리보기 (DEMO) — 안전 규칙

V2의 약점(포트폴리오를 팔면서 실제 결과물 차이가 안 보임)을 메우는 영역이다.
**사례 동의와 무관하게 항상 렌더된다.**

- 항상 `DEMO · 실제 고객 사례 아님` 라벨을 단다.
- 가상 인물(`campusV3DemoPersona`, 이름 "가온")만 쓴다. 성 없이 이름 하나 →
  특정 실존 인물로 오인되지 않게.
- 실제 고객의 정보·화면·후기·학교·회사·수치를 복제하거나 만들어내지 않는다.
  데모 지표는 넣지 않고, 상황은 "(예시)"로 표기한다.
- A 카드 = 얼리버드 1페이지 예시, B 카드 = Interview Portfolio 프로젝트 상세 예시.
- 각 카드의 "크게 보기" 링크가 `/campus-v3/demo/profile/`,
  `/campus-v3/demo/project/` 상세 화면으로 연결된다(두 상세 페이지도 항상
  `noindex,nofollow`).

---

## 4. 실제 사례 — 동의 게이트 (V2와 동일)

`approvedForCampus` 플래그로 관리한다. 상세 절차는 `docs/CAMPUS_OPERATIONS.md`
§4를 그대로 따른다.

- `approvedForCampus=false` → production 빌드에서 **HTML에 아예 미포함**.
- `CAMPUS_REVIEW=1 npm run build` (검수 모드)에서만 "내부 검수 · 배포 금지"
  배너와 함께 후보가 보인다.
- 동의 0건인 현재: 5번 "실제 제작 사례" 섹션과 내비게이션 "사례" 링크가
  production에서 렌더되지 않는다(dead `#cases` 링크 없음). DEMO 영역은 계속 보인다.
- 사례 카드에는 이메일·전화·주소를 넣지 않는다. 후보 목록·근거는 V2와 동일
  (이준구 외부 / 배지안 `/profiles/bae-jian/` / 조예솔 `/profiles/yesol/`).

---

## 5. 상품 구조 (V2 유지)

| 상품 | 가격 | 표시 | 한 줄 |
| --- | --- | --- | --- |
| 얼리버드 커리어 프로필 | 49,000원 | 첫 10명 초기 출시가 | 나를 빠르게 이해시키는 맞춤형 1페이지 |
| Interview Portfolio | 199,000원 | — | 내가 실제로 일한 방식을 프로젝트 사례로 증명하는 사이트 |

- 각 카드는 핵심 포함 항목 최대 5개만 노출하고, 나머지는 "세부 범위 보기"
  (details/summary) accordion 안에 넣는다.
- Interview Portfolio 카드는 **어두운 헤더 + "면접에서 프로젝트를 설명해야 한다면"
  배지**로 얼리버드와 시각적으로 다르게 보인다(단순 파란 테두리 차이 아님).
- 가격 표기 원칙(존재하지 않는 정가 취소선·가짜 할인 금지)은 V2와 동일.

---

## 6. 신청 접수 / 색인 상태 (V2와 동일)

- `campusV3Offer.applyFormUrl = null` 유지. 추측 URL을 만들지 않는다.
- null인 동안: 신청 버튼 비활성("온라인 신청 준비 중"), 모든 `/campus-v3/*`
  페이지 `noindex, nofollow`.
- 검증된 폼이 생기면 `applyFormUrl`을 채우는 순간 버튼 활성 + 색인 허용으로 바뀐다.
- **배포되었다고 "판매 준비 완료"로 보고하지 않는다.** 기능 브랜치 Preview는
  실제 Production 도메인이 아니다.

---

## 7. 디자인 결합 원칙

- 기본 브랜드 = cobalt-air 유지. 단 V2처럼 모든 영역이 같은 파란색으로 반복되지
  않도록: **제목은 near-black ink(`--text`)**, 포인트·링크만 cobalt(`--accent`),
  **CTA는 검정(`--v3-ink`)**, Interview Portfolio 헤더는 어두운 대비.
- 실제/데모 화면을 크게 사용, 데스크톱 여백 축소, 본문 줄 길이 제한(`--v3-measure`).
- 모바일에서 Hero·CTA·결과물이 첫 스크롤 안에 들어오도록 히어로를 좁게 스택.

---

## 8. 버전 보존 / Git

- V1 프로토타입: `prototypes/student-profile-mvp/` (그대로 유지).
- V2: 태그 `campus-v2-clean-e4dbbe5` (commit e4dbbe5)로 고정. `/campus/`는 수정 안 함.
- V3: 브랜치 `feat/campus-v3-hybrid`, worktree
  `/mnt/d/Projects/wethru-service/campus-v3-hybrid-worktree`, 기준 commit e4dbbe5.
- `main`과 `feat/student-profile-mvp`는 이 작업에서 수정·머지·push하지 않는다.

---

## 9. QA (package.json 명령만)

```
npm run validate:customers
npm run check
npm run build                 # production: 미동의 사례 미렌더, noindex, 신청 비활성
CAMPUS_REVIEW=1 npm run build  # 검수: 후보 사례 + 배포금지 배너
git diff --check
```

`/mnt/d` (WSL drvfs)에서 npm 권한 문제가 나면 저장소를 손상시키지 말고
Linux-native `/tmp` 사본에서 빌드한다(메모리: npm-build-on-drvfs).

산출물 자산은 별도 바이너리 이미지 없이 CSS로 그린 목업(device mockups)만
사용한다 → `src/assets/campus-v3/`는 두지 않는다.
