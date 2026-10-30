# DECISIONS.md 
결정은 추가만 한다. 결정 내용이 바뀌면 새 항목을 만들고 기존 항목에 "변경됨"을 표시한다.
오타, "다음:" 같은 계획 줄은 직접 고쳐도 된다.

## D-001 내 레포에서 독립 작업 (2026-10-28)
- 맥락: 백엔드분 래포에 백엔드 ver1 프론트가 함께 존재, 고아 브랜치로 따로 작업하기로 결정 
- 결정: 당분간 프론트 개인 레포(OhJumWhat_FE)에서만 작업, 백엔드 레포는 읽기 전용 참고 
- 이유: 백엔드 코드, 이력과 섞이지 않게 독립 관리, 포트폴리오로 작업 범위 명확화 
- 추후: 백엔드아 합의 후 브랜치 동기화 

## D-002 React + TypeScript + Vite(SWC) (2026-10-28)
- 맥락: 백엔드가 별도 서버라 프론트는 클라이언트만 담당 
- 결정: Next.js 대신 React + Vite 
- 이유: 서버 기능이 필요 없어 Next.js의 장점을 쓸 일이 없고, 구조가 단순해 설명하기 쉬움 
- 대안: Next.js (서버/클라이언트 경계로 복잡도 증가)
- 변경됨: D-016

## D-003 FSD 구조 채택 (2026-10-28)
- 맥락: 도메인(조직, 투표, 채팅, 편지, 방명록 랭킹 등)과 기능이 많음 
- 결정: Feature-Sliced Design
- 이유: 레이어 규칙으로 의존 방향을 강제, 기능이 늘어도 위치 판단이 쉬움, 협업 연습 
- 대안: domains + shared 구조 (작은 프로젝트에 적합)
- 주의: 애매하면 pages에 두고 재사용이 생길 때 내리기 

## D-004 TDS 참고한 자체 디자인 시스템 (2026-10-28)
- 맥락: 토스 스타일을 원하지만 일반 웹 서비스 
- 결정: TDS 패키지를 설치하지 않고, API 설계 방식만 참고해 자체 구현 
- 이유: TDS는 앱인토스 서비스 범위에서만 사용 허가됨, 직접 설계가 포폴에도 유리 
- 참고 범위: props 구성(size/color/variant), 컴포넌트 단위 / 에셋 , 색상, 값 폰트는 사용 안함 
- 변경됨: D-017

## D-005 vanilla-extract로 스타일링 (2026-10-28)
- 결정: vanilla-extract + recipes 
- 이유: 제로 런타임, 토큰을 타입으로 관리, size, color, variant 조합 정의에 적합 
- 대안: Emotion (TDS를 실제로 쓸 경우에만 필요), Tailwind(사용 안함)

## D-006 상태 관리 역할 분리 (2026-10-28)
- 결정: 서버 상태는 TanStack Query, URL 상태는 React Router, UI 상태는 Zustand
- 이유: 서버 데이터를 전역 스토어에 복사하면 캐시가 두 곳이 되어 데이터가 어긋남 
- 규칙: mutation은 기본 invalidate, 낙관적 업데이트는 이유 기록 후 적용 

## D-007 Toss Frontend Fundamentals를 코드 기준으로 (2026-10-28)
- 결정: 가독성, 예측 가능성, 응집도, 결합도 4 기준을 docs/rules/code-quality.md로 규칙화 
- 이유: "좋은 코드"의 판단 기준을 명시해 사람과 AI가 같은 기준으로 작업 

## D-008 커밋 컨벤션을 도구로 강제(2026-10-28)
- 결정: husky + commitlint, 유형은 영어 소문자, 제목은 한글 
- 이유: 문서 규칙은 사람도 AI도 잊지만 훅은 우회할 수 없음 
- 규칙: --no-verify 사용 금지 

## D-009 하네스 구성 (2026-10-28)
- 결정: AGENTS.md(목차) + @AGENTS.md + docs/rules 상세 규칙
- 이유: 지침 파일이 길면 맥락을 낭비하고 지시를 덜 따름, AGENTS.md로 두면 다른 도구에서도 재사용 가능 
- 다음: 검증 도구(oxlint, Steiger, Vitest, gitleaks)와 권한 설정으로 규칙을 도구화 

## D-010 Ponytail 도입 예정 (lite) (2026-10-28)
- 결정: Claude Code 플러그인으로 설치, lite 모드로 시작 
- 이유: AI의 과잉 구현 방지, 코드량을 줄여 설명 가능성 확보
- 안전 조치: 원본 저장소(DietrichGebert/ponytail)에서만 설치, 설치 시 훅 소스 검토 
- 충돌 대응: 디자인 시스템, FSD 구조 우선 규칙을 AGENTS.md에 명시
- 재검토: 첫 기능 개발 후 효과 비교  
- 설치 완료: local scope, Task board 켜기(로컬 통계), Webhook 미사용 

## D-011 Caveman 미사용 (2026-10-28)
- 결정: 사용하지 않음 
- 이유: AI 설명이 짧아지면 결정 근거를 이해할 기회가 줄고, 문서 압축은 사람이 읽기 어려워 협업 목적과 충돌 
- 재검토: 토큰 비용이 실제 부담이 될 때 lite 모드만 고려 

## D-012 entities에서 steiger insignificant-slice 끔 (2026-10-29)
- 맥락: state.md는 조회 훅, 쿼리 키를 entities에 두지만, steiger는 한 곳에서만 쓰는 슬라이스를 에러로 봐서 첫 기능부터 pre-commit에 막힘 
- 결정: steiger.config.ts에서 src/entities/**만 끄고 features,widgets 유지 
- 이유: 도메인 목록은 ver1에서 확정되어 entity는 재사용이 확실함, 과잉 분리 검사는 features,widgets에서 유지 
- 대안: 처음엔 pages에 두고 재사용 시 내리기(state.md와 충돌, 화면마다 이동 비용)
- 검증: 임시 폴더에서 steiger 0.8로 off 전 에러, off 후 통과, features는 계속 검사됨

## D-013 DECISIONS.md 수정 범위 한도 완화 (2026-10-29)
- 결정: 결정 내용이 바뀌면 새 항목, 오타, "다음:" 계획 줄은 직접 수정 허용 
- 이유: 계획 줄은 자주 바뀌고 원래 내용은 git 기록에 남음, 매번 새 항목을 만들면 기록만 늘어남

## D-014 oxlint로 문서 규칙 강제 (2026-10-29) 
- 결정: oxlint에 인라인 style(react/forbid-dom-props), fetch(no-restricted-globals, shared/api 제외) 금지 추가 
- 이유: D-008과 같음 

## D-015 Claude 권한 deny로 규칙 강제 (2026-10-29)
- 결정: .claude/settings.json(커밋)에 --no-verify, git commit -n, .env 계열 읽기·수정 deny / .claude/settings.local.json(개인)에 백엔드 레포 쓰기 deny
- 이유: D-008과 같음, 백엔드 경로는 PC마다 달라 개인 설정에 둠
- 검증: --no-verify 커밋, .env 읽기, 백엔드 레포 쓰기 모두 거부 확인 / .env.example은 허용
- 한계: Bash로 파일을 쓰는 경우는 경로 deny를 막지 못함, 문서 규칙 유지 

## D-016 Vite React 플러그인: SWC 대신 @vitejs/plugin-react (2026-10-29) 
- 맥락: D-002에 SWC로 적었으나 초기 설정부터 @vitejs/plugin-react(v6)로 생성됨
- 결정: @vitejs/plugin-react 사용
- 이유: Babel을 사용하게 될 경우 SWC를 사용하는 것이 옳았으나 vite 8은 Rolldown/Oxc 기반이라 기본 변환에 Babel을 사용하지 않기 때문에
- 대안: @vitejs/plugin-react-swc

## D-017 디자인 시스템을 TDS 값 기준으로 (2026-10-29)
- 맥락: 오점왓 ver1 디자인을 그대로 따르지 않기로 함, ver1은 화면 구성 참고용
- 결정: 색상, 타이포그래피, 컴포넌트 크기, CTA, 컴포넌트 props를 TDS 문서 값 그대로 사용하고 변수명만 프로젝트 규칙으로 변경
- 범위: TDS 패키지(@toss/tds-*), 토스 로고, Tossface, 토스 에셋은 사용 안 함
- 이유: ver1 디자인 대신 TDS 방식으로 일관된 디자인 시스템 구성
- 대안: ver1 Figma 토큰 유지 (D-004 방식)
- 기록: docs/rules/design.md, docs/design/components.md

## D-018 글꼴: NanumSquare Neo 직접 호스팅 (2026-10-29)
- 결정: NanumSquare Neo Variable woff2 하나를 public/fonts에서 제공
- 이유: TDS 전용 글꼴은 비공개, 가변 폰트(100~900)라 TDS 굵기 5종을 모두 표현, 웹용 압축 포맷(1.5MB), 외부 CDN 의존 없음
- 대안: 설치된 OTF 2개(700·800만 있어 본문도 굵게 보임, 3.3MB), Noto Sans KR (ver1)
- 확인 필요: 폰트 라이선스(나눔글꼴 OFL 여부)

## D-019 브랜드 색: TDS orange800 (2026-10-29)
- 맥락: TDS 기본 primary는 blue500, ver1 오점왓은 오렌지
- 결정: primary = orange800(#ed6700) + 흰 글자, 나머지 팔레트와 값은 TDS 그대로
- 이유: 기존 오점왓 브랜드 색(오렌지) 유지, 토스 파랑과 구분
- 한계: 흰 글자 대비 3.21:1로 WCAG AA(4.5:1) 미달 (TDS blue500도 3.71:1)
- 대안: orange800 + 검은 글자(5.16:1, AA 통과), orange900 + 흰 글자(3.73:1)

## D-020 관리자 콘솔도 이 레포에서 개발 (2026-10-29)
- 맥락: 백엔드 명세가 사용자 화면 API(77개)와 관리자 콘솔 API(37개)로 나뉨, ver1도 한 프론트 안에 pages/admin(10개 화면)으로 있었음
- 결정: 관리자 콘솔도 이 레포에서 만들고, docs/API.md에 관리자 API도 요약
- 이유: 사용자 지시, 별도 레포를 두면 디자인 토큰과 shared/api를 중복 관리해야 함
- 대안: 관리자 전용 레포 분리, 사용자 화면만 우선 개발
- 미정: 관리자 화면 착수 시점, 라우트 경로, 권한 없는 사용자 처리 방식

## D-021 API 문서: 한 파일, 사용자 API는 자세히, 관리자 API는 목록만 (2026-10-29)
- 맥락: 백엔드 명세가 사용자 77개, 관리자 37개, D-020으로 관리자도 이 레포 범위
- 결정: docs/API.md 한 파일에 공통(인증, CSRF, 오류, 시간) → 사용자 API(화면 흐름 순 표 + 주의 상태 코드) → 관리자 API(메서드, 경로, 설명만)
- 필드: 자주 쓰는 응답(me, me/orgs, config)만 적고 나머지는 화면 작업 때 Swagger에서 확인 후 추가
- 이유: 다음 작업이 로그인과 사용자 화면, 관리자 착수 시점 미정이라 지금 자세히 적으면 낡음, 공통 규칙은 한 번만 쓰고 UI 작업마다 읽는 양을 줄임, "요약만" 규칙
- 대안: docs/api/user.md·admin.md로 분리, 관리자도 필드까지 기록, 전체 필드 기록
- 다시 볼 때: 관리자 화면 착수 시 명세를 다시 받아 관리자 부분 보강, 파일이 너무 길어지면 docs/api/admin.md로 분리



## D-022 API 호출: 상대 경로 + Vite 개발 프록시 (2026-10-29)
- 맥락: 백엔드는 같은 출처만 허용(CORS 없음), 운영은 화면과 서버를 한 이미지로 배포
- 결정: 코드에서는 /api 상대 경로만 사용, 개발 서버가 /api(WebSocket 포함), /oauth2, /login/oauth2, /logout을 API_PROXY_TARGET으로 프록시
- 설정: changeOrigin false (Host 유지 → 구글 로그인 redirect_uri가 프론트 주소 기준), 값은 .env.local, .env.example에는 이름만
- 이유: 운영에서 API 주소 변수가 필요 없음, 서버 주소 하드 코딩 금지 규칙
- 대안: VITE_API_URL로 절대 주소 호출 (CORS 없어 불가), vite.config.ts에 localhost:8080 기본값
- 검증: /api/config 401, /oauth2/authorization/google 302(redirect_uri가 프론트 포트), POST /logout CSRF 없이 403

## D-023 앱 기반: 데이터 라우터 + 401 전역 처리 (2026-10-29)
- 결정
  - 라우터: createBrowserRouter + RouterProvider(react-router/dom), 라우트는 src/app/router.tsx, 경로 상수는 shared/config ROUTES
  - 401: QueryCache, MutationCache의 onError 한곳에서 로그인 화면으로 이동 (이미 /login이면 이동 안 함)
  - 재시도: 4xx는 재시도 없음, 5xx와 네트워크 오류만 1번 (mutation은 기본값 재시도 없음)
- 이유: 401은 어느 요청에서 나든 세션이 끝난 것, 화면마다 처리하면 빠뜨림 / 데이터 라우터는 errorElement와 router.navigate로 컴포넌트 밖 이동 가능
- 대안: 화면마다 Guard에서 401 처리, BrowserRouter + Routes(선언형)
- 남은 것: /login 페이지 없음 → 지금은 401이면 404 화면, pages/login 만들 때 연결

## D-024 랜딩과 로그인을 한 페이지로, 1차는 최소 (2026-10-29)
- 맥락: 백엔드는 비로그인 / 요청에 landing.html을 주고(RootPageController, 없으면 index.html), 로그인 필요·실패 시 /login, /login?error, /login?error=blocked로 보냄
- 결정
  - 첫 화면(로그인 유도 + 구글 로그인 버튼) 아래로 소개 섹션이 이어지는 한 페이지, /login도 같은 페이지에 ?error 문구만 추가
  - landing.html을 별도 Vite 진입점으로 두고 브라우저에서 React로 그림
  - 1차는 글자만, 연출·UI 목업·문구 다듬기는 앱 화면을 만든 뒤
- 이유: 백엔드 동작과 맞고 빌드 플러그인이 필요 없음, 로그인 입구라 지금 필요, 목업은 실제 컴포넌트가 생긴 뒤 넣는 편이 다시 맞출 일이 없음
- 대안: 빌드 때 HTML 미리 그리기(ver1 방식, 검색 노출 유리), React 라우트에서 로그인 여부로 분기(landing.html 미사용), 로그인 페이지 별도
- 다시 볼 때: 검색 노출이 중요해지면 미리 그리기로 전환

## D-025 랜딩 페이지만 장식 그라데이션 허용 (2026-10-30)
- 맥락: 참고한 랜딩 스타일이 제목 글자, 배경 빛 번짐, 카드에 그라데이션을 씀, design.md는 그라데이션을 "사라지는 경계"에만 허용
- 결정: pages/landing에서만 장식 그라데이션 허용, 색은 orange 계열 + 투명, 흰색만
- 이유: 랜딩은 첫인상이 중요, 색을 브랜드 계열로 묶어 "임의 색 조합 금지" 취지는 유지, 앱 화면 톤은 그대로
- 대안: 단색 유지(큰 글자, 여백, 그림자로 구성), 여러 색상군 그라데이션(참고 사이트처럼 보라·분홍)
- 함께 정함: 1차는 섹션 구조(히어로, 카드, 단계, 마지막 CTA, 푸터)와 에셋 자리(aspect-ratio 고정)까지, 에셋과 스크롤 연출은 2차

## D-026 pages/landing 슬라이스 (2026-10-30)
- 분류: pages, 랜딩은 이 화면에서만 쓰는 섹션 조합이라 재사용 대상이 아님 (fsd.md "애매하면 pages")
- 구성: ui(섹션 컴포넌트, landing.css.ts), config(문구), lib(로그인 오류 문구 선택 + 테스트)
- 라우트: / 와 /login 모두 LandingPage (D-024)
- 대안: widgets/landing-*로 섹션 분리 (조합하는 feature·entity가 없어 widgets 기준에 맞지 않음)
- 남은 것: landing.html 진입점, 로그인 상태 분기(entities/user)

## D-027 텍스트 의미 토큰 추가, 간격·둥글기는 임시 상수 (2026-10-30)
- 결정: theme.css.ts에 text.primary(grey900), secondary(grey600), inverse(흰색), inverseSecondary(grey400)
- 간격, 카드 둥글기, 그림자: 토큰이 없어 landing.css.ts 안의 상수로만 사용 (shortcut 주석)
- 글자 그라데이션은 orange800~900만 (큰 글자 3:1 이상), 제목 크기는 t1(30px)이 최대라 데스크톱에서도 t1
- 이유: design.md가 텍스트 토큰을 "원색에서 정의"하도록 예정, 대비를 계산해 AA(본문 4.5:1) 통과 값만 사용, 간격 체계는 앱 화면 기준으로 정해야 해서 랜딩에서 먼저 확정하지 않음
- 대안: 원색 직접 사용, 간격 토큰을 지금 정의, 랜딩 전용 큰 제목 크기 추가
- 확인 필요: 랜딩 제목을 t1보다 크게 할지 (TDS 문서에 없는 값)

## D-028 링크를 버튼 모양으로: buttonStyle 공개 (2026-10-30)
- 맥락: 구글 로그인은 페이지 이동이라 <a>가 맞음, Button은 <button>만 렌더
- 결정: shared/ui에서 recipe를 buttonStyle로 내보내 <a className={buttonStyle()}>로 사용, button base에 textDecoration none
- 이유: 링크 의미(새 탭 열기, 스크린 리더 "링크")를 유지하면서 스타일은 한 곳에서 관리, 코드가 가장 적음
- 대안: Button에 href 또는 as prop 추가, onClick으로 location 이동(링크 의미 상실)
