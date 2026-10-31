# backend-harness.md 

백엔드 레포(../OhJumWhat)의 하네스 엔지니어링을 정리한 **참고 문서**. 
- 규칙이 아니고, 프론트 작업에 적용할 의무도 없음 (프론트 규칙은 AGENTS.md, docs/rules) 
- 기준: 2026-10-31 「오점왓 하네스 엔지니어링 온보딩」 문서 요약, 백엔드 코드와 하나씩 대조하지 않음 
- 백엔드가 바뀌어도 자동으로 갱신되지 않음 

## 찾아보기 
프론트 작업 중 궁금할 때 볼 곳. 내용을 복사하지 말고 원본을 읽기만 함 (줄 번호는 바뀌므로 굵은 제목으로 검색). 
| 궁금한 것 | ../OhJumWhat/CLAUDE.md의 굵은 제목 |
|---|---|
| 로그인, 세션, CSRF | 인증 흐름 |
| / 에서 랜딩과 앱이 나뉘는 방식 | 소개 페이지와 검색 |
| API 형식, 오류, 명세 | API 규칙 |
| 마감, 참여, 삭제 등 화면에서 지킬 규칙 | 도메인 규칙 중 코드만 봐서는 알기 어려운 것 |
| 지도, 식당 검색 | 지도: 찾기는 카카오 로컬, 보여주기는 네이버 지도 |
| 투표 화면 구성 | 투표 화면. |
| 라우트 목록, 반응형 | 프론트엔드. / 반응형. |
| 관리자 화면 | 관리자 콘솔 |
| 새 소식 | 새 소식 |
| 시간 처리 | 시간은 전부 KST 기준 |

| 궁금한 것 | 파일 |
|---|---|
| 실제 API 형식 | 로컬 Swagger, docs/API.md |
| 배포 구조, CI | ../OhJumWhat/docs/DEPLOY.md, .github/workflows/ci.yml |
| 전체 진행 현황 | ../OhJumWhat/docs/PLAN.md |
| 성능, 폴링 부담 | ../OhJumWhat/docs/PERFORMANCE.md, loadtest/README.md |

## 백엔드 실행 
- DB: 백엔드 루트에서 docker compose -f docker-compose.dev.yml up -d 
- 서버: ohjumwhat-backend에서 ./gradlew bootRun (8080) 
- 테스트: ./gradlew test (Testcontainers라 Docker 필요), 클래스 하나는 --tests 'com.ohjumwhat.SomeTest' 

## 하네스란 
- 별도 도구가 아니라, 사람이나 AI가 실수해도 운영까지 가지 못하게 막는 여러 겹의 작업 환경 
- 레포에 harness 폴더는 없고 지침, 테스트 지원 코드, CI, 부하 도구로 나뉘어 있음 
- 위 층(문서)일수록 유연하지만 어기기 쉽고, 아래 층(테스트, CI)일수록 잊어도 실패로 드러남 
- 핵심 원칙: 자주 어기는 규칙은 아래 층으로 내린다 

## 층별 구성 
| 층 | 막는 실수 | 위치 | 강제 수준 |
|---|---|---|---|
| 작업 지침 | 맥락 없이 수정, 규칙을 모름 | CLAUDE.md, docs/PLAN.md, docs/DEPLOY.md | 문서 |
| 작업 흐름 | 추적 안 되는 변경, main 직접 수정 | 이슈 양식, 커밋 `[#이슈] - 요약`, PR은 dev로 | 문서 + 사람 검토 |
| 실행 설정 | 앱 실행 방법을 매번 추측 | .claude/launch.json | 도구 설정 |
| 스키마 | 엔티티와 DB 불일치 | Flyway, JPA ddl-auto validate | 앱 시작 실패 |
| 테스트 | 기능 회귀, 시간·외부 서비스·동시성 버그 | ohjumwhat-backend/src/test | 테스트 실패 |
| 메타 테스트 | 새 API에서 규칙을 빠뜨림 | SanctionCoverageTest, ApiDocsTest 등 | 테스트 실패 |
| CI | 깨진 코드가 PR·배포로 넘어감 | .github/workflows/ci.yml | 자동 |
| 배포 | 깨진 이미지가 그대로 서비스됨 | deploy.yml (CI → 이미지 → 교체 → /healthz) | 자동, 자동 롤백 없음 |
| 운영 측정 | 수용량을 감으로 판단 | loadtest/, docs/PERFORMANCE.md | 수동 실행 |

## CI 구성 
- 대상: 모든 PR(dev, main)과 dev push, 배포 워크플로도 이것을 먼저 호출 
- 백엔드 job: Java 21, ./gradlew test (Testcontainers로 DB 실행, application.yml 불필요) 
- 프론트 job: Node 24, npm ci → lint → test → build 
- 권한은 contents: read만 

## 테스트 하네스 
통합 테스트는 대부분 `IntegrationTest`를 상속해서 아래를 한 번에 받음. 
| 부품 | 하는 일 | 이유 |
|---|---|---|
| 진짜 DB (Testcontainers) | postgres 컨테이너 실행 | 잠금, FK, ON CONFLICT는 진짜 DB여야 검증됨 |
| 고정 시계 (TestClock) | 한국 시간 고정, 자정 경계 재현 | 마감, 오늘, 정기 투표가 시간에 달려 있음 |
| 가짜 카카오·네이버 | 고정 응답, 호출 횟수 기록, 장애 입력 | 키 없이 실행, 호출 여부까지 검증 |
| 가짜 푸시 | 보낸 기록, drain()으로 비동기 실행 | 커밋 뒤 동작을 결정적으로 확인 |
| 로그인 (TestAuth) | loginAs(user), xsrf() | 구글 로그인 없이 인증·CSRF 경로 통과 |
| 정리 (cleanDatabase) | 시계, 속도 제한, 푸시, 사진 폴더, 테이블 초기화 | 테스트끼리 상태가 새지 않음 |

- 가짜를 끼울 수 있는 이유: 외부 호출은 인터페이스 뒤에, 시간은 Clock 빈으로만 읽음 → 운영 코드에 테스트용 분기 없음 
- 주의: 새 테이블이나 인메모리 상태는 cleanDatabase에도 추가 (빠뜨리면 간헐적 실패) 

## 규칙을 테스트로 바꾸기 (메타 테스트) 
기능 하나가 아니라 코드 전체를 훑어 "규칙을 빠뜨린 곳이 없는지" 검사. 지침을 놓쳐도 실패 메시지가 할 일을 알려 줘서 AI 작업자에게 특히 잘 맞음. 
| 테스트 | 강제하는 규칙 |
|---|---|
| SanctionCoverageTest | 모든 쓰기 API는 제재 여부(@Restricted / @Unrestricted)를 정해야 함 |
| ApiDocsTest | 모든 /api/**에 요약, 묶음, 파라미터 설명, 401이 있고 스키마 이름이 겹치지 않음 |
| ApiDocsDisabledTest | 운영처럼 끄면 명세가 열리지 않음 |
| ManagementConfigTest | 관리 포트·공개 범위, 테스트와 운영 설정 일치 |
| TimeStorageTest | 날짜·시각이 DB에 한국 기준 값으로 저장 |
| ReleaseNoteTest | 업데이트 글 파일 형식 |
| OhjumwhatApplicationTests | 컨텍스트 로드로 스키마와 엔티티 불일치 검출 |

## 동시성 하네스 
`ConcurrencyTest`는 sleep 대신 DB 잠금으로 실행 순서를 강제해 경합 버그를 매번 같은 방식으로 재현. 
1. 보조 트랜잭션이 holdLock으로 행을 잠그고 대기 
2. 실제 서비스를 inThread로 실행, 쓰기에서 멈춤 
3. awaitLockWait가 pg_stat_activity로 멈춘 것을 확인 
4. 두 번째 작업도 같은 방법으로 줄 세움 
5. lock.release() 후 결과와 DB 상태 확인 

- 결함을 찾았는데 아직 못 고치면 @Disabled 대신 `_현재_동작` 이름으로 지금 동작을 검증, 수정 PR이 뒤집음 
- 제약: 테스트 메서드에 @Transactional 금지, 워커 스레드에서 TestClock 조작 금지, 동시 쓰기 트랜잭션은 넷 이하 

## 부하 하네스 
구글 로그인을 자동화할 수 없어 시드 명령으로 해결, 측정부터 보고서까지 스크립트로 연결 (이슈 #140). 
1. 환경: loadtest/stack.sh로 CPU·메모리 한도를 건 스택 실행 
2. 데이터: seed가 조직, 회원, 투표, 세션 생성 (결과 파일에 세션 쿠키가 있어 공유·커밋 금지) 
3. 부하: k6 스크립트, 요청 비율은 프론트 폴링 주기를 반영 
4. 수집: collect.sh 
5. 보고: report.py가 docs/PERFORMANCE.md에 표 작성 
6. 정리: 정해진 접두어가 붙은 데이터만 삭제 

## 기능 추가 절차 (백엔드 기준) 
1. 이슈 생성, dev에서 feat/이름 브랜치 
2. CLAUDE.md에서 도메인 규칙과 Figma 프레임 확인 
3. 시간은 Clock, 외부 호출은 인터페이스 뒤, 스키마는 새 V{n}__*.sql 
4. IntegrationTest 상속해 테스트 작성 
5. 쓰기 핸들러에 @Restricted 또는 @Unrestricted 
6. @Tag, @Operation, @Schema, @ErrorCase로 명세 작성 
7. 새 테이블은 cleanDatabase, 설정 키는 application.example.yml에도 추가 
8. 테스트, 린트, 빌드 통과 후 dev로 PR 
9. 새로 안 사실은 CLAUDE.md에, 기계로 잡을 수 있으면 테스트로 

## 다른 프로젝트로 옮기는 순서 
1. 빌드, 테스트, 실행 명령을 지침 파일 맨 앞에 
2. PR마다 도는 CI, 배포는 CI 통과에 의존 
3. 시간, 외부 API, 비동기 실행을 주입 가능하게 분리 
4. 진짜 DB, 고정 시계, 가짜, 정리 코드를 공통 베이스로 
5. 같은 리뷰 지적이 두 번 나오면 메타 테스트로 
6. 사고가 난 경합이나 수용량 질문이 생길 때 동시성·부하 하네스 추가 

판단 기준: 어기면 사고가 나는 규칙은 테스트나 CI로, 맥락과 이유는 문서로. 

## 백엔드 하네스의 빈 곳 
| 구멍 | 현재 상태 | 권장 조치 |
|---|---|---|
| 에이전트 자동 제어 없음 | .claude에 launch.json뿐, hooks·권한 없음 | 위험 명령을 막는 설정 추가 |
| 지침 파일 비대 | CLAUDE.md 약 118KB | 도메인별 문서로 분리 |
| 지침 파일 복제 | AGENTS.md는 CLAUDE.md 사본, git에 없음 | 한쪽을 원본으로 |
| Clock 규칙 미검증 | 직접 호출을 막는 아키텍처 테스트 없음 | 허용 범위를 정한 테스트 추가 |
| ver1 프론트 화면 테스트 없음 | 테스트 대부분이 lib | 핵심 흐름 화면 테스트 추가 |
| 자동 롤백 없음 | 헬스 체크 실패해도 이전 이미지로 안 돌아감 | 되돌리는 단계 추가 |

- 브랜치 보호 규칙은 온보딩 문서 작성 시 미확인 
