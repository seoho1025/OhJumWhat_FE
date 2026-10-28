# fsd.md 

## 레이어 (위 -> 아래로만 import)
- 같은 레이어의 다른 슬라이스 import 금지 
- 슬라이스 외부에서는 index.ts(public API)로만 접근 
- 세그먼트: ui / model / api / lib / config 

## 분류 기준 
- entities: 데이터 개체 자체 (타입, 조회 API, 표시용 UI) ex) poll, user, organization
- features: 사용자가 "하는" 행동(생성, 수정, 삭제, 토글) ex) vote, create-poll
- widgets : 2개 이상 feature/entity를 조합한 블록만 
- 애매하면 일단 pages에 두고, 재사용이 실제로 생기면 내리기

## 새 슬라이스를 만들 때 
- 분류 근거를 먼저 제시하고 확인받기 
- 분류 이유를 docs/DECISIONS.md에 기록 