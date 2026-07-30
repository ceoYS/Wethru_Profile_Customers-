# WeThru Campus V4 — Home Handoff

## Source of truth

- Branch: `feat/campus-v4-editorial-finalist`
- Worktree at company:
  `/mnt/d/Projects/wethru-service/campus-v4-editorial-worktree`
- Base: V2 clean commit `e4dbbe5`
- Main and Production must remain unchanged.

## Goal

Claude Desktop가 만든 검정·흰색 Editorial Campus 디자인을 시각적 기준으로
삼고 다음 최신 내용을 결합한다.

- 실제 사례 중심 구성
- 이준구 → 배지안 → 조예솔
- 얼리버드 커리어 프로필 99,000원 (7월 31일까지 · 첫 10명 런칭가)
- Interview Portfolio 199,000원
- 학생을 심사하는 문구 제거
- 후기 강요 금지
- 사례 동의 게이트
- applyFormUrl=null
- noindex,nofollow

## Company work completed

- `src/data/campus-v4.ts` 작성
- `src/styles/campus-v4.css` 작성
- `src/pages/campus-v4.astro` 작성
- Production-mode build가 한 차례 성공
- `astro check` 0 errors / 0 warnings 확인
- Production build에서 미동의 사례와 이미지가 나오지 않는 것 확인
- 배지안·조예솔 실제 프로필 화면을 로컬 review용 WebP로 캡처
- 이준구 외부 페이지는 회사 환경 TLS 문제로 정상 캡처하지 못함

## Critical privacy rule

GitHub 저장소가 Public이므로 실제 사례 스크린샷은
동의 전 절대 commit·push하지 않는다.

`src/assets/campus-v4/`는 각 PC의 `.git/info/exclude`에 등록한
로컬 review 전용 경로다.

집 PC에서는 해당 이미지를 공개 프로필에서 다시 캡처하거나,
동의 전에는 링크·placeholder만 사용한다.

## Remaining work

1. 현재 V4 소스 전체 검토
2. `docs/CAMPUS_V4_EDITORIAL_FINALIST.md` 작성
3. ~~집 PC에서 실제 사례 화면 재캡처~~ — 불필요. 미리보기를 로컬 WebP에서
   live preview iframe으로 바꿔, 이미 공개된 페이지를 URL로 직접 embed한다
   (`docs/CAMPUS_V4_EDITORIAL_FINALIST.md` §5.3 · §7.2)
4. `CAMPUS_REVIEW=1` 로컬 review build
5. 이준구 → 배지안 → 조예솔 순서 확인
6. 모바일 390×844 육안 검수
7. 데스크톱 1440px 육안 검수
8. FAQ keyboard 접근성 검수
9. Production-mode에서 사례·이미지 미노출 재검증
10. V2와 V3가 변경되지 않았는지 검증
11. 최종 코드·문서만 commit
12. 기능 브랜치만 push
13. main merge 및 Production 배포 금지

## Do not

- `git add .`
- 실제 사례 이미지 commit
- main push 또는 merge
- Production promotion
- approvedForCampus를 임의로 true 변경
- 고객 프로필 원본 수정
- V1·V2·V3 수정 또는 삭제
