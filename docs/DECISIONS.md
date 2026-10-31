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

## D-029 랜딩 코드 구조: 응집도 우선 (2026-10-30)
- 맥락: 1차 코드가 문구를 config/content.ts에, 다섯 섹션 스타일을 landing.css.ts 하나에 모아 둠 (code-quality.md 응집도·결합도 점검)
- 결정
  - 문구는 각 섹션 컴포넌트 안에 둠, 로그인 오류 문구만 테스트와 함께 lib/loginError.ts
  - 스타일은 섹션마다 <섹션>.css.ts, 공통(간격 상수, 제목, 등장 애니메이션)만 landing.css.ts
  - 반복되거나 서로 연결된 숫자는 이름 있는 상수 (예: PHONE_OVERLAP은 히어로 아래 겹침과 다음 섹션 여백에 함께 쓰임)
- 우선한 기준: 응집도(함께 바뀌는 문구와 마크업, 섹션과 스타일을 한곳에) > 문구만 모아 보는 편의
- 대안: config에 문구 모으기 (문구 검토는 편하지만 섹션 하나를 고칠 때 파일 두 개를 오감)
- 검증: 리팩터 전후 화면 캡처(1280, 390)가 픽셀 단위로 같음

## D-030 남은 디자인 값을 TDS 방식에 맞춤 (2026-10-30)
- 확인한 TDS 문서: Button(눌림은 dim 층, 값은 CSS 변수 이름만 공개), Colors(배경 4종만, 어두운 배경·테두리·그림자 없음), Border(선 색·두께 없음, padding24는 양쪽 24px)
- 결정
  - 그림자 없음: TDS 문서에 없고 화면이 배경 대비로 구분됨 → 랜딩 카드·목업 그림자 제거
  - 카드형 묶음 둥글기 20px: TDS Border 예시의 묶음 컨테이너 값
  - 토큰 추가(원색에서 정의): bg.inverse(grey900), brand.weak(orange50), border.subtle(grey200), border.inverse(grey800)
  - Button 눌림·hover: TDS처럼 dim 층, 값은 임시(shortcut) / box-sizing border-box(TDS 크기는 padding 포함)
  - 간격: TDS처럼 전역 토큰 없이 4px 단위 값을 컴포넌트·페이지 안에서 사용
- 이유: TDS에 있는 것은 그대로, 없는 것은 TDS가 하는 방식(컴포넌트별 값, 배경 대비)을 따름
- 대안: 그림자 유지(참고 사이트 느낌), 눌림을 scale(0.98)로, 전역 간격 토큰 정의
- 확인 필요: dim 층 실제 값, Button 굵기, border.subtle을 grey100으로 할지(TDS 화면 측정 필요)
- 함께 고친 버그: <a>에 buttonStyle을 쓰면 content-box라 높이 86px(TDS 56px) → border-box로 56px 확인

## D-031 Button small~large 크기와 상태 층 값: 현업 공통 기준 (2026-10-30)
- 맥락: TDS는 small·medium·large 값과 눌림 투명도를 공개하지 않음 (D-030), 사용자 지시로 현업에서 흔한 기준 사용
- 결정
  - 높이 8px 단계: small 32 / medium 40 / large 48 / xlarge 56(TDS 값 유지), 둥글기 8 / 10 / 12 / 16, 글자 14 / 15 / 16 / 17
  - 44px 미만 크기는 ::before로 터치 영역 44px 확보 (design.md 접근성 규칙 유지)
  - 상태 층: grey900 위에 hover 8%, pressed 10% (Material 3 state layer 투명도)
- 이유: 8px 단계 높이는 여러 디자인 시스템이 공통으로 쓰는 값이라 예측 쉬움, 상태 층 투명도는 공개된 기준이 있는 Material 3를 따름
- D-017(TDS 값 그대로)과의 관계: TDS에 값이 있는 xlarge는 그대로, 없는 값만 현업 기준으로 채움
- 대안: TDS 예시 측정값 38을 medium으로 추정, 상태 층을 흰색(on-color, Material 방식 그대로)으로
- 검증: Chrome에서 네 크기 렌더링 측정 (높이 32/40/48/56, 터치 영역 44/44/48/56)

## D-032 하네스 보강: 빌드 검사, UI 대조표, 임시 파일 위치 (2026-10-30)
- 맥락: .css.ts 함수 export 오류가 pnpm check를 통과하고 화면에서만 드러남, design.md·code-quality.md 준수 여부를 사용자가 반복해서 확인, 검증 파일을 레포 밖(/tmp)에 만듦
- 결정: pnpm check에 vite build 추가 / UI 작업 보고에 대조표 필수 / 임시 파일은 node_modules/.cache 아래
- 이유: AGENTS.md "같은 지적이 반복되면 규칙 추가", 문서 규칙만으로는 지켜지지 않던 것을 검사와 절차로 고정
- 대안: build를 pre-commit에만 추가, 대조표 대신 자동 린트 규칙(값 직접 입력 금지 등)
- 비용: pnpm check가 빌드만큼(약 0.2초) 느려짐

## D-033 랜딩 헤더, 히어로 강조, 움직임, FAQ (2026-10-30)
- 맥락: 참고 랜딩처럼 헤더 메뉴, 큰 그라데이션 제목, 알약 버튼과 그림자, 토스식 스크롤 움직임, FAQ 아코디언 요청
- 결정
  - 헤더: 스크롤해도 위에 붙음, 메뉴(주요 기능·사용 예시·자주 묻는 질문)는 같은 페이지 섹션으로 부드럽게 이동, hover 시 brand.primary, 모바일은 메뉴 숨기고 버튼만
  - 로그인·체험해보기·시작하기 모두 구글 로그인 경로로 이동 (/login은 이 랜딩 자신이라 실제 로그인 경로로 보냄)
  - 랜딩만: 큰 제목(t1보다 큼), 굵기 800, 알약 버튼, 버튼 그림자 (D-030의 "그림자 없음"과 design.md "값 임의 금지"의 예외, 사용자 지시)
  - 움직임: 섹션 등장(IntersectionObserver), 목업 떠 있기, 메뉴 카드 펼침, 단계 카드 sticky 쌓임, 움직임 줄이기 설정이면 모두 끔
  - FAQ: TDS BoardRow 사양(button + aria-expanded, Prefix Q, 간격 8, 본문 t6·아래 24), 문서에 없는 여닫기는 grid-template-rows 0.3s, 닫힌 내용은 inert
  - 알약·그림자·보조 버튼은 shared Button을 바꾸지 않고 랜딩 클래스로 덧붙임
- 이유: 참고 스타일과 사용자 요청 반영, 공통 Button과 앱 화면 톤은 그대로 유지
- 대안: CSS scroll-driven animation(animation-timeline, 사파리 지원 부족), 모바일 햄버거 메뉴, details/summary(높이 전환이 어려움)
- 확인 필요: 체험해보기의 실제 동작(체험 모드가 없어 로그인과 같음), FAQ 문구는 초안

## D-034 랜딩 헤더·움직임 조정 (2026-10-30, D-033 일부 변경)
- 사용자 지시로 변경
  - 헤더: 아래 구분선 제거 → 아주 옅은 그림자(greyOpacity100), 흰 배경 85% 불투명, 블러 12px → 4px, 로그인·체험해보기 버튼 medium(40) → small(32, 터치 영역 44 유지)
  - 휴대폰 목업 떠 있기 효과 제거
  - 단계 카드: sticky 쌓임 제거 → 카드마다 화면에 들어올 때 각자 떠오름
  - 등장 효과 반복: 요소가 화면을 완전히 벗어나면 초기 상태로 돌아가, 맨 아래까지 내렸다 올라와도 같은 효과가 다시 보임
  - 히어로 아래 번짐이 섹션 경계에 닿기 전에 사라지게 해 경계 띠 제거
  - 헤더 추가 조정: 로고 brand.primary, 로그인은 배경 없이 메인 색 테두리(1px)와 글자, 체험해보기는 그림자 없는 메인 색 버튼, 메뉴는 grid(1fr auto 1fr)로 화면 정중앙, 헤더 폭 제한 없이 데스크톱 좌우 여백 24로 로고와 버튼을 양끝 가까이(처음 1440·48에서 변경), 이후 체험해보기 버튼 제거(로그인과 같은 곳으로 가서 중복) → 로그인이 오른쪽 끝, 히어로 더 알아보기의 회색 테두리 제거(옅은 그림자만)
- 이유: 쌓임·떠 있기가 과하게 느껴짐, 한 번 끝난 효과가 다시 올라왔을 때 어색함, space-between은 양쪽 폭이 달라 메뉴가 한쪽으로 치우침
- 대안: 등장은 한 번만(이전 방식), 단계 카드는 sticky 유지

## D-035 버튼 글자 굵기 regular (2026-10-30)
- 결정: Button(shared) 글자 굵기 semibold(600) → regular(400), 모든 버튼에 적용
- 이유: 사용자 지시, 버튼 글자가 굵어 보임
- 대안: medium(500), 랜딩 버튼만 변경

## D-036 히어로 보조 문구 더 작고 연하게, text.tertiary 추가 (2026-10-30)
- 결정: 히어로 보조 문구 t6(15px)·grey600 → st11(14px)·grey500, theme에 text.tertiary(grey500) 추가
- 이유: 사용자 지시, 제목과 대비를 키워 보조 문구가 덜 눈에 띄게
- 한계: grey500은 흰 배경 3.04:1로 WCAG AA 본문 기준(4.5:1) 미달, 시력이 약한 사용자는 읽기 어려울 수 있음
- 대안: grey600 유지(4.6:1, AA 통과)하고 크기만 줄이기

## D-037 랜딩 캐릭터 이미지 8장 (2026-10-30)
- 원본: 사용자 제공 PNG 8장(2400×1792, 투명 배경, 합계 약 30MB), 다운로드 폴더에 그대로 둠
- 처리: 빈 여백 자르기 → 표시 폭 2배로 줄이기 → WebP(q82, 투명 유지), 합계 268KB (약 99% 감소)
- 배치: 히어로 welcome(휴대폰 목업 대체) / 메뉴 섹션 thinking / 단계 1~4 invite·search·vote·lunch / FAQ guide / 마지막 CTA cheer
- 위치: pages/landing/ui/characters (assets 폴더는 steiger fsd/segments-by-purpose 오류라 ui 세그먼트 안으로)
- 접근성: 장식 이미지 alt 비움, 단계 이미지는 alt 작성, width·height로 레이아웃 밀림 방지, 첫 화면만 즉시 로드
- 대안: public/ 폴더(해시 없음, 캐시 갱신 어려움), PNG 그대로(30MB), steiger 규칙 끄기
- 확인 필요: 원본 RGB에 AI 생성 도구(Gemini)로 보이는 워터마크가 있으나 투명 영역이라 화면에 보이지 않음, 이미지 이용 조건은 사용자 확인 필요

## D-038 Badge 컴포넌트, 단계 카드 강조 (2026-10-30)
- 맥락: 단계 카드의 STEP 표시를 TDS Badge로, 설명의 핵심 단어를 메인 색으로 강조 요청
- 결정
  - shared/ui/badge 추가: TDS 축(variant·size·color, 모두 필수) 그대로, 값은 TDS 미공개라 현업 기준(높이 18/20/24/28), 완전히 둥근 모양
  - color에 primary(브랜드 오렌지) 추가, elephant는 회색 계열로 대응
  - 단계 카드: STEP n을 Badge(fill, medium, primary)로, 설명의 단어 하나(초대 링크·근처 식당·채팅·메뉴 통계)를 brand.primary + semibold로
  - 히어로 더 알아보기 글자를 보조 문구와 같은 text.tertiary로 (D-036과 같은 AA 미달 한계)
- 이유: 사용자 지시, Badge는 design.md에 축이 정해진 디자인 시스템 요소라 공통 컴포넌트로 둠
- 대안: 랜딩 안에만 STEP 스타일 두기, 강조를 굵기만으로
- 한계: 주황 강조 글자(15px)와 Badge 흰 글자는 대비 3.2:1로 본문 AA(4.5:1) 미달

## D-039 랜딩 히어로 휴대폰 화면, 한 화면씩 넘김, 스크롤 버벅임 정리 (2026-10-30)
- 히어로: 큰 캐릭터 제거(welcome.webp 삭제) → 휴대폰 안에 투표 화면 예시(PhoneMockup: 진행 중 Badge, 메뉴 3개 득표 막대, 투표하기), 휴대폰은 위 55%만 보이고 아래는 다음 섹션 색으로 풀림, 막대는 처음 열 때 차오름
  - 그림이라 role=img + aria-label로 내용 설명, 안의 버튼은 누를 수 없는 div
- 헤더: 로고 왼쪽에 OhJumWhat 캐릭터(logo.webp, 96px로 줄임, 32px로 표시)
- 한 화면씩 넘김: 랜딩이 열린 동안만 html에 scroll-snap(y mandatory), 섹션은 헤더 아래 한 화면 높이, 헤더 높이만큼 scroll-padding
  - 한 화면보다 긴 사용 예시 섹션은 안에서 자유 스크롤(카드마다 멈추게 했더니 관성 스크롤과 부딪쳐 버벅임)
- 버벅임: 헤더 backdrop-filter 제거(스크롤마다 뒤 화면 다시 그림), 대신 흰 배경 92%
- 단계 카드 회색 테두리 제거
- 대안: scroll-snap proximity(덜 끊기지만 한 장씩 넘기는 느낌 약함), 헤더 블러 유지
- 검증: Chrome 마우스 스크롤 제스처로 멈춤 위치 0 → 796(주요 기능) → 1592(사용 예시) → 안에서 자유 → 3886(FAQ) → 4682(CTA), 헤더 backdrop-filter none
- 한계: GPU 없는 headless에서는 프레임 끊김이 재현되지 않아, 실제 Mac 트랙패드 체감은 사용자 확인 필요

## D-040 마지막 화면 정리 (2026-10-30)
- 덜그럭거림 원인: 마지막 CTA(위쪽 맞춤)와 푸터(아래쪽 맞춤)에 멈춤 지점이 두 개, 약 180px 간격이라 스크롤이 두 번 끊김
- 결정: 푸터 멈춤 제거, 푸터 높이 고정(96px), CTA 최소 높이 = 한 화면 - 푸터 → CTA + 푸터가 정확히 한 화면, 멈춤 지점 하나
- 사용자 지시: CTA의 시작하기 버튼 제거, 배경을 어두운색 + 오렌지 빛에서 흰색으로, 푸터 크기 축소(위아래 48 → 고정 96px, 글자 한 단계씩 작게)
- 검증: CTA 멈춤 위치 = 페이지 최대 스크롤(1280: 4682, 390: 4351), FAQ에서 내리면 한 번에 도착

## D-041 메뉴 카드 유리(글라스) 디자인 (2026-10-30)
- 결정: 한식·중식·일식·분식·샐러드 카드를 유리처럼, 반투명 흰색(70% → 30%) + 뒤 흐림(blur 18px, 채도 160%) + 위쪽 빛 반사(inset 흰 줄) + 얇은 반투명 흰 테두리 + 옅은 그림자
- 흐림이 보이도록 카드 묶음 뒤에 넓은 오렌지 빛 하나(가로 170%·세로 160%, orange100 → orange50 → 투명), 처음 두 개였다가 사용자 지시로 하나로, 이후 카드 안 사진을 고려해 더 넓고 연하게
- D-039 "고정 요소에 backdrop-filter 금지"와의 관계: 카드는 고정이 아니라 내용과 함께 움직여서 예외, 개수도 5개로 적음
- 모바일 카드 여백 14 → 10px (가장 긴 라벨 Japanese가 76px 카드 안에 들어가도록, 측정 확인)
- 대안: 흐림 없이 반투명만(가볍지만 유리 느낌 약함)
- 한계: 오래된 브라우저(backdrop-filter 미지원)에서는 반투명 흰 카드로만 보임, 스크롤 성능은 실제 기기 확인 필요

## D-042 기한 모드 (2026-10-31, 임시)
- 결정: 4시간 기한 동안 보고·기록·커밋 분리·검증 범위를 줄임 (AGENTS.md "기한 모드"), 끝나면 항목 삭제
- 유지: pnpm check(약 2초), 비밀값, --no-verify 금지, 백엔드 읽기 전용, FSD
- 대안: 검사를 줄이기 (2초라 얻는 시간이 거의 없음)
