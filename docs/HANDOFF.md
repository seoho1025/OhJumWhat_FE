# HANDOFF.md 

## 최종 갱신 
- 2026-10-29, 기준 커밋 36847ea (main), 작업 폴더 깨끗함(.agents/ 미추적 제외), pnpm check 통과(테스트 13개) 

## 현재 단계와 목표 
- 단계: 개발 기반 완료 → 로그인 화면 시작 전 
- 목표: feat/login 브랜치에서 첫 화면(로그인)과 첫 공통 컴포넌트, 첫 슬라이스를 만든다 

## 완료한 것 
- 하네스: pnpm check = tsc + oxlint + steiger + vitest, pre-commit, commitlint, 권한 deny (9645087, 862846d, 38d0905, 7cf830d) 
- 디자인 토큰: src/shared/ui/theme.css.ts (palette, bg, brand, font, weight, breakpoint) (5b62fbc), 브랜드 orange800 (D-019) 
- 전역 스타일: src/app/global.css.ts, Vite 템플릿 index.css 삭제 (488e8d3) 
- API 문서: docs/API.md, 사용자 77 + 관리자 37, 표 개수를 원본 명세와 대조 (46080d7) 
- 개발 프록시: vite.config.ts가 API_PROXY_TARGET(.env.local)으로 /api(ws), /oauth2, /login/oauth2, /logout 프록시 (869522b) 
  - 검증: /api/config 401, 구글 로그인 후 5173으로 리다이렉트(사용자 확인), WebSocket 업그레이드 401(직접 호출과 동일) 
- 요청 함수: src/shared/api/request.ts의 request, ApiError (659e0f7) 
  - 실제 백엔드로 CSRF 확인: 쿠키 값 그대로 헤더 → 204, 틀린 값 → 403 
- 앱 기반: src/app/queryClient.ts(401 전역 처리, 4xx 재시도 없음), router.tsx(createBrowserRouter), shared/config ROUTES (491b811, 36847ea) 

## 진행 중인 것 
- 없음 

## 다음 할 일 
0. 로컬 백엔드 실행 (API 확인이 필요할 때) 
   - ../OhJumWhat: docker compose -f docker-compose.dev.yml up -d → ohjumwhat-backend에서 ./gradlew bootRun 
   - Homebrew postgresql@15가 5432를 먼저 잡으면 role 오류 → brew services stop postgresql@15 
   - 명세: http://localhost:8080/swagger-ui.html (「Select a definition」 기본값이 관리자 API) 
1. git switch -c feat/login 
2. shared/ui Button (사용자가 직접 작성, Claude는 리뷰) 
   - src/shared/ui/button/{Button.tsx, button.css.ts}, shared/ui/index.ts에서 export 
   - recipe 축 color/variant/size/display는 design.md대로, 값은 확인된 것만 (primary, fill, xlarge, inline/full, disabled, loading=aria-busy) 
   - 커밋: feat: 공통 Button 컴포넌트 추가 
3. entities/user: GET /api/me 조회 훅, Me 타입(API.md "자주 쓰는 응답"), 쿼리 키(entities/user/api/queryKeys.ts) 
4. pages/login: 구글 로그인 이동(/oauth2/authorization/google), ?error, ?error=blocked 문구, 로그인 상태면 / 로 이동, router.tsx에 ROUTES.login 연결 
   - ver1 ../OhJumWhat/ohjumwhat-frontend/src/pages/LoginPage.tsx는 화면 구성 참고만 (복사 금지) 
5. 브라우저에서 로그인 → /api/me 응답 확인, 그 뒤 main에 병합 

## 알려진 문제와 리스크 
- .agents/skills/handoff/SKILL.md: .claude 스킬과 동일한 복사본, 생성 도구 미확인, 삭제/커밋 결정 대기 
- /login 페이지가 없어 지금은 401이면 404 화면으로 이동 → 다음 할 일 4 
- 브라우저 화면(/, 404)은 직접 열어 보지 않음, build 성공까지만 확인 
- 로그인 상태의 /api/me, WebSocket 연결(101)은 미검증 
- origin/main이 743ff8e에 멈춤, 로컬 커밋 35개 미push (36847ea 기준) 
- 글꼴 라이선스, TDS 라이선스 범위 미검증 
- design.md에 없는 값: Button small·medium·large, 카드·모달·입력창 둥글기, 텍스트·테두리 의미 토큰 
- commit.md "제목 25~30자"와 commitlint 50자 불일치, 브랜치 이름 규칙 없음(feat/<기능> 제안) 
- 백엔드 실행에 필요한 값(구글 client_id/secret 등)은 백엔드 루트 .env, 실제 값은 Notion 「개발 필요 파일」 

## 이번 세션의 결정 
- D-019, D-020, D-021, D-022, D-023 
