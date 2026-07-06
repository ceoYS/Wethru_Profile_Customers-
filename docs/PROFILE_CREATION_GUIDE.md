# 신규 고객 프로필 제작 가이드

목표: 고객 1명 등록을 30분 안에 끝낸다.

## 0. 준비물

- 고객 기본 정보 (이름, 영문명, 직군 한 줄)
- tagline이 될 한 문장 (없으면 인터뷰에서 뽑는다 — 아래 질문 참고)
- 경력/프로젝트 정리 자료
- 프로필 사진 (밝은 배경, 세로형 권장)
- 노출 동의 범위: 이메일 노출 여부, 전화번호는 기본 비노출

## 1. 스캐폴드 (1분)

```bash
npm run new:profile -- --slug hong-gildong --name "홍길동" \
  --theme navy-black-white --layout editorial-split
```

생성물:

- `src/data/customers/hong-gildong.ts` — status는 `draft`로 시작
- `public/images/customers/hong-gildong/` — 여기에 `profile.webp` 추가

## 2. theme / layout 선택 (2분)

같은 데이터라도 theme × layout 조합이 다르면 완전히 다른 페이지가 된다.
**연속으로 등록하는 고객끼리는 조합을 겹치지 않게 하는 것을 원칙으로 한다.**

| theme | 분위기 | 어울리는 고객 |
|---|---|---|
| `navy-black-white` | 차갑고 정제된 전략 문서 | 전략/컨설팅/데이터형 |
| `warm-editorial` | 따뜻한 종이 질감 매거진 | 브랜드/크리에이티브/대면 직군 |
| `graphite-minimal` | 무채색 스위스 그리드 | 엔지니어링/금융/법률 |

| layout | hero 구조 |
|---|---|
| `editorial-split` | 좌 카피 / 우 인물 카드 분할 |
| `dossier` | 중앙 정렬 좁은 칼럼, 인물 작게 |
| `magazine` | 이름 오버사이즈, 인물 오프셋 |
| `minimal-card` | 명함 한 장으로 압축 |

## 3. 데이터 채우기 (15분)

`src/data/customers/{slug}.ts`의 TODO를 모두 채운다.

문장 품질 기준:

- tagline: 직무 나열이 아니라 **일하는 방식**이 보이는 한 문장
- summary: "무엇을 했다"보다 "어떤 문제를 어떻게 다루는 사람인지"
- projects: 문제 → 접근 → 결과 구조를 반드시 지킨다
- proofs: 숫자/급수/수상 같은 검증 가능한 사실만

tagline 인터뷰 질문 (고객이 문장을 못 주는 경우):

1. 일할 때 남들과 다르게 하는 한 가지는?
2. 동료들이 당신을 찾는 순간은 언제인가?
3. 최근 가장 자랑스러운 결과와 그 이유는?

## 4. 사진 (5분)

- `public/images/customers/{slug}/profile.webp`
- 세로형(4:5) 권장, 800px 이상
- 변환: `cwebp input.jpg -q 85 -o profile.webp` 또는 온라인 변환기
- 사진이 없으면 페이지는 모노그램 fallback으로 렌더링된다 (배포는 가능하지만 권장하지 않음)

## 5. 검증 → 미리보기 → 발행 (5분)

```bash
npm run validate:customers   # 필수값 + 개인정보 검증. 에러면 배포 금지
npm run dev                  # http://localhost:4321/profiles/{slug}/
```

확인 체크리스트:

- [ ] 모바일 390px에서 이름/사진/tagline/CTA가 첫 화면에 보이는가
- [ ] 주소/생년월일/전화번호가 어디에도 없는가
- [ ] 이메일이 CTA 영역에만 있는가
- [ ] 사진 alt 텍스트가 올바른가

통과하면 `status: "published"`로 변경 후:

```bash
npm run validate:customers && npm run build
```

## 6. 배포

빌드 결과(`dist/`)를 배포한다. URL: `profile.wethru.com/profiles/{slug}/`
커스텀 도메인 요청은 `docs/DOMAIN_STRATEGY.md` 절차를 따른다.
