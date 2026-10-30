## 프로젝트 
- 오점왓(OhJumWhat) ver2 프론트엔드 
- React + TypeScript + Vite, vanilla-extract, FSD 구조 
- 상태 : TanStack Query(서버), React Router(URL), Zustand(UI)
- 백엔드는 별도 서버, API는 docs/API.md


## 명령 
- 개발 서버: pnpm dev
- 타입 검사 : pnpm exec tsc -b
- 전체 검증: pnpm check (타입 + 린트 + FSD + 테스트 + 빌드)

## 반드시 지켜야 할 수칙 
- 작업 완료 전 pnpm check 통과
- UI 작업 완료 보고 전 docs/rules/design.md, docs/rules/code-quality.md 항목별 대조표(지킴 / 어긋남 / 미확인)를 보고에 포함
- git commit --no-verify 사용 금지, 훅에 막히면 원인을 고칠 것 
- 커밋은 docs/rules/commit.md 컨벤션, 한 커밋에 한가지 변경 
- Tailwind, 인라인 style 금지 
- 다른 슬라이스 직접 import 금지, index.ts로만 접근 
- 서버 데이터를 Zustand에 복사 금지 
- 컴포넌트에서 fetch 직접 호출 금지, shared/api 사용 
- 공통화, 새 슬라이스 생성, 새 라이브러리 추가는 먼저 확인 

## 범위와 보안 
- 이 레포(OhJumWhat_FE) 안에서만 파일 생성 및 수정
- ../OhJumWhat(백엔드 레포)는 읽기 전용, 수정 및 복사 금지
- API 정보는 docs/API.md에 요약으로만 기록 
- .env 생성, 수정, 커밋 금지, 변수는 .env.example에 이름만 
- API 키, 토큰, 서버 주소 하드 코딩 금지 
- 검증용 임시 파일(캡처, 스크립트, 브라우저 프로필)은 node_modules/.cache 아래에만 만들고 끝나면 삭제 

## 작업별로 읽을 문서 
- UI 작업 -> docs/rules/design.md, docs/design/components.md
- 새 기능, 파일 위치 -> docs/rules/fsd.md
- 코드 작성 및 리팩토링 -> docs/rules/code-quality.md
- 상태 관리, 데이터 패칭, mutation -> docs/rules/state.md
- 커밋 -> docs/rules/commit.md 
- API 연동 -> docs/API.md 

## Ponytail과 함께 사용할 때 
- shared/ui 컴포넌트, 디자인 토큰, FSD 구조는 "이미 있는 것"으로 간주하고 우선 사용 
- 브라우저 기본 요소보다 shared/ui 컴포넌트 우선 
- FSD 세그먼트 폴더와 index.ts는 줄이지 말 것 

## 결정과 기록 
- 대안이 있었던 결정, 내 지시로 방향을 바꾼 경우 docs/DECISIONS.md에 기록 
- 사용자가 같은 지적을 반복하면 규칙 추가를 제안할 것 

## 세션 시작 시 
- docs/HANDOFF.md 가 있으면 먼저 확인하고 읽을 것 
- pnpm check로 현재 상태 확인 
- 문서와 실제 코드가 다르면 작업 전 보고할 것 