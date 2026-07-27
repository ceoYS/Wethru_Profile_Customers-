# WeThru Campus MVP

학생용 취업 온라인 프로필 서비스의 정적 웹 프로토타입입니다.

## 포함 화면
- `index.html` — 학생용 랜딩페이지
- `samples.html` — 직무별 샘플 목록
- `pricing.html` — 학생 가격 및 제휴형 구조
- `apply.html` — 사전 신청 폼
- `success.html` — 신청 완료 화면
- `guide.html` — 자료 준비 가이드
- `sample-planner.html` — 기획·마케팅형 프로필 예시
- `sample-designer.html` — 디자인·콘텐츠형 프로필 예시
- `sample-developer.html` — 개발·데이터형 프로필 예시

## 로컬 확인
폴더에서 아래 명령을 실행합니다.

```bash
python -m http.server 8000
```

브라우저에서 `http://localhost:8000`을 엽니다.

## 실제 배포 전에 바꿔야 할 것
1. 신청 폼을 Google Forms, Tally, Supabase 등 실제 저장소에 연결
2. `example.com` 이메일과 임시 링크 교체
3. 환불·도메인 유지·개인정보 처리방침 확정
4. 파일럿 모집 인원과 가격 확정
5. Vercel 프로젝트 및 `campus.wethru.com` 서브도메인 연결

## 권장 검증 지표
- 게시글 조회 대비 랜딩 클릭률
- 랜딩 방문 대비 신청 완료율
- 신청 대비 결제율
- 플랜별 평균 제작시간
- 수정 요청 횟수
- 학생 추천 의향
