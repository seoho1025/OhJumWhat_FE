# state.md 

## 역할 분리 
- 서버 데이터: TanStack Query로만, Zustand에 복사 금지 
- URL로 표현 가능한 상태(조직 ID, 탭, 필터) : 라우터 파리미터, 쿼리스트링 
- Zustand : 서버와 무관한 UI 상태에만 

## TanStack Query
- 쿼리 키는 entities/<도메인>/api/queryKeys.ts에 관리
- 조회 훅은 entities, mutation 훅은 features에

## Mutation 
- 기본은 invalidateQueries
- 낙관적 업데이트는 이유를 DECISIONS.md에 기록 후 적용 
- 제출 버튼은 isPending 동안 비활성화 (중복 제출 방지)

## API 호출 
- 컴포넌트에서 fetch 직접 호출 금지, shared/api 사용
- 모든 요청은 쿠키 포함 + CSRF (shared/api에서 일괄 처리)

