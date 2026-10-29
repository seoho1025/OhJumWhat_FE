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

## D-014 oxlint로 문서 규칙 강제 (예정) (2026-10-29) 
- 결정: oxlint에 인라인 style(react/forbid-dom-props), fetch(no-restricted-globals, shared/api 제외) 금지 추가 
- 이유: D-008과 같음 

## D-015 Claude 권한 deny로 규칙 강제 (예정) (2026-10-29)
- 결정: .claude/settings.json에 --no-verify, .env 읽기, 수정, ../OhJumWhat 쓰기 deny
- 이유: D-008과 같음 
- 한계: Bash로 파일을 쓰는 경우는 경로 deny를 막지 못함, 문서 규칙 유지 

## D-016 Vite React 플러그인: SWC 대신 @vitejs/plugin-react (2026-10-29) 
- 맥락: D-002에 SWC로 적었으나 초기 설정부터 @vitejs/plugin-react(v6)로 생성됨
- 결정: @vitejs/plugin-react 사용
- 이유: Babel을 사용하게 될 경우 SWC를 사용하는 것이 옳았으나 vite 8은 Rolldown/Oxc 기반이라 기본 변환에 Babel을 사용하지 않기 때문에
- 대안: @vitejs/plugin-react-swc
