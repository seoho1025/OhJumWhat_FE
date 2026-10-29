# HANDOFF.md 

## 최종 갱신 
- 2026-10-29, 기준 커밋 7cf830d, 작업 폴더 깨끗함, pnpm check 통과 

## 현재 단계와 목표 
- 단계: 하네스 완료 → 개발 기반 시작 전 
- 목표: theme 토큰, API 문서, shared/api, Provider를 갖추고 첫 화면(로그인)으로 진입 

## 완료한 것 
- 하네스 검증 도구: pnpm check = tsc + oxlint + steiger + vitest, pre-commit 훅, commitlint (9645087, 862846d) 
- 린트 규칙: 인라인 style, fetch 금지(shared/api 제외) (38d0905, 위반 파일로 에러 확인) 
- Claude 권한 deny: --no-verify, .env 계열, 백엔드 레포 쓰기 (7cf830d, 세 가지 모두 거부 확인) 
  - 백엔드 레포 deny는 .claude/settings.local.json(커밋 안 됨, PC마다 따로 설정) 
- FSD 뼈대: src/app(App, main, global.css.ts), src/shared/{api,ui,lib,config}/index.ts (ac9d703, b27e6b8) 
  - pages, widgets, features, entities는 첫 슬라이스를 만들 때 생성 (빈 슬라이스는 steiger 에러) 
- 라이브러리: TanStack Query, React Router(v8), Zustand 설치만 (07adf40, 7121c37, 42d60c8), 코드 연결 전 
- 디자인 문서: docs/rules/design.md(규칙), docs/design/components.md(TDS 컴포넌트 47종) (6097475, f843d8d) 
- 글꼴: NanumSquare Neo 가변 woff2 → public/fonts, @font-face는 src/app/global.css.ts (d32b106, build 결과 확인) 

## 진행 중인 것 
- 없음 

## 다음 할 일 
1. 브랜드 색 결정 받기: TDS primary(blue500) 그대로 / primary만 orange 계열 
2. src/shared/ui/theme.css.ts 작성: design.md "이름 대응" 따라 palette, bg, font(t1~t7, st1~st13, rem), weight 토큰 
   - shared/ui/index.ts에서 export 
3. src/app/index.css(Vite 템플릿) 삭제, 필요한 전역 스타일은 src/app/global.css.ts로 이동 후 main.tsx import 정리 
4. docs/API.md 작성: ../OhJumWhat 읽기 전용으로 인증(세션 쿠키, 로그인 경로), CSRF(XSRF-TOKEN → X-XSRF-TOKEN), 오류 형식({message})만 요약 
5. src/shared/api: 요청 함수(credentials: include, GET 외 CSRF 헤더) + ApiError, 작은 테스트 1개 
6. src/app: QueryClientProvider + React Router 연결 
7. pages/login 착수 전 entities/user 분류 근거를 사용자에게 확인받기 (fsd.md) 

## 알려진 문제와 리스크 
- src/app/index.css는 Vite 템플릿 그대로 (보라 강조색, 18px 기본 글자, 다크모드 변수) → 다음 할 일 3 
- 글꼴 라이선스 미검증 (나눔글꼴 사이트 접속 실패), 이미 커밋됨 
- TDS 문서에 없는 값 미확인: Button small·medium·large 이름과 값, 카드·모달·입력창 둥글기, 텍스트·테두리 의미 토큰 
- TDS 라이선스 범위(D-004의 "앱인토스만 허가") 출처 미확인, 공개 서비스로 운영 시 재확인 
- commit.md "제목 25~30자"와 commitlint 헤더 50자 기준 불일치, 결정 대기 
- 권한 deny는 Bash로 파일을 쓰는 경우를 막지 못함, AGENTS.md 문서 규칙 유지 
- pnpm 12는 설치 스크립트가 있는 새 패키지 추가 시 pnpm-workspace.yaml allowBuilds에 true/false 지정 필요 

## 이번 세션의 결정 
- D-012, D-013, D-014, D-015, D-016, D-017, D-018 
