# API.md

## 출처와 갱신
- 백엔드 OpenAPI 명세(springdoc) 요약, 원본 JSON은 레포에 두지 않음
- 기준: 2026-10-29, 백엔드 dev 브랜치, 로컬 `/v3/api-docs/user`(77) · `/v3/api-docs/admin`(37)
- 다시 보기: 백엔드 루트 `.env`에 `SWAGGER_ENABLED=true` → 백엔드 실행 → `/swagger-ui.html`의 「Select a definition」 (운영에서는 꺼짐)
- 백엔드가 바뀌면 명세를 다시 받아 이 문서를 갱신

## 공통

### 주소
- 모든 API는 `/api/...`, 버전 접두사 없음
- 화면과 같은 출처로만 호출 (CORS 설정 없음) → 요청 경로는 상대 경로, 서버 주소 하드 코딩 금지
- 로컬: Vite 개발 서버가 `/api`, `/oauth2`, `/login/oauth2`, `/logout`을 백엔드로 프록시 (이 레포 vite.config.ts에는 아직 없음)

### 인증: 세션 쿠키
- JWT 없음. 구글 로그인 후 서버가 `SESSION` 쿠키(HttpOnly, SameSite=Lax, 30일)를 내림, 브라우저가 자동 전송
- 로그인은 API가 아니라 페이지 이동: `/oauth2/authorization/google` → 구글 → 항상 `/`로 복귀
  - 실패 `/login?error`, 강제 탈퇴로 차단된 계정 `/login?error=blocked`
  - 로그인 후 어디로 갈지(초대 링크, 최근 조직, 마이페이지)는 프론트가 결정
- `/login`은 프론트(SPA) 화면
- 로그아웃: `POST /logout` → 204 (CSRF 헤더 필요)
- 로그인 여부: `/api/**`가 401이면 비로그인. 리디렉션하지 않음 → 401을 받으면 `GET /api/me`를 다시 확인하고 로그인 화면으로

### CSRF
- 서버가 응답마다 `XSRF-TOKEN` 쿠키를 내림 → GET이 아닌 요청에 같은 값을 `X-XSRF-TOKEN` 헤더로
- 없거나 다르면 403 `{"message": ...}`, CSRF 검사가 로그인 검사보다 먼저 (비로그인이어도 헤더 없으면 403)

### 오류 형식
- 기본: `{"message": "화면에 그대로 보여 줄 문구"}`, `code` 필드 없음 → 종류는 상태 코드로 구분
- 예외
  - 401: 본문 없음 (강제 탈퇴 직후에는 `{"message"}`가 있을 수 있음)
  - Spring 기본 형식(`message` 없음): 경로·쿼리 형식 오류 400, 없는 API 404, 405, 415, 예상 못 한 500 → 상태 코드별 기본 문구 사용

| 코드 | 뜻 |
|---|---|
| 400 | 요청 값 오류 (검증 실패는 걸린 항목 중 하나의 문구만) |
| 401 | 로그인 안 함 |
| 403 | 권한 없음: 남이 쓴 글 수정, 관리자 API, CSRF |
| 404 | 없음. 조직 멤버가 아니어도 404 (존재 여부를 숨김) |
| 409 | 지금 상태에서 불가: 마감된 투표, 중복, 동시 요청 충돌 |
| 413 | 파일이 너무 큼 (사진 5MB) |
| 423 | 관리자 제재로 기능 막힘, 문구에 종료 시각 포함 |
| 429 | 너무 자주 보냄 (채팅, 쪽지, 방명록, 사진) |
| 503 | 외부 서비스(지도 검색 등) 또는 사진 처리 일시 불가 |

### 날짜, 시간
- 시각(`…At`): ISO 8601 UTC(`Z`), 소수 초 가능 → 화면에서 한국 시간으로 변환
- 날짜(`pollDate` 등): `YYYY-MM-DD` 한국 날짜 / 하루 안 시각(`openTime` 등): `HH:mm` 한국 시각
- "오늘", 마감, 정기 투표 판정은 서버가 KST 기준
- 요일 비트마스크: 월1 화2 수4 목8 금16 토32 일64 (평일 31)

### 그 밖의 규칙
- 투표를 바꾸는 API(메뉴 추가·삭제, 참여·패스·취소, 식당 달기)는 최신 투표 상세를 돌려줌 → 응답으로 캐시 갱신
- 마감 판정은 요청 시각이 `closesAt` 이후인지 (별도 상태 값 없음), 마감 후 409
- 페이지: 지난 투표, 방명록, 새 소식은 `page`(0부터) / 채팅, 쪽지는 `before`(그 ID보다 오래된 것)
- 사진 주소(`/api/photos/...`, `/api/chat-photos/...`)도 로그인 필요, `<img>`가 쿠키를 함께 보냄
- 실시간은 투표 채팅 받기만 WebSocket `/api/polls/{pollId}/ws` (같은 출처, 세션 쿠키, STOMP 없음)
  - 받는 메시지: `{"type": "created"|"updated"|"deleted", "message": {...}}`, `{"type": "ping"}`
  - 연결 거절: 404 멤버 아님, 401 비로그인, 409 채팅 기간 아님, 429 한 투표에 3개 초과
  - 서버가 닫는 코드 4001(채팅 닫힘), 4003(더 볼 수 없음)은 재연결하지 않음, 그 밖에 끊기면 재연결
  - 보내기, 고치기, 지우기는 REST / 다른 화면은 폴링 (투표 상세 3초)
- 공개 헬스 체크 `GET /healthz` (명세에 없음)

### 자주 쓰는 응답
- `GET /api/me` (MeResponse): id, name, nickname?, googleName, email, profileImageUrl?, googleProfileImageUrl?, customPhoto, bio?, foodTags[], details, lastVisitedOrgId?, admin, sanctions[]
- `GET /api/me/orgs` (배열): id, name, memberCount, hasOpenPollToday
- `GET /api/config`: naverMapKeyId?, placeSearch, push
- 그 밖의 요청·응답 필드는 Swagger에서 확인 후 필요한 것만 이 문서에 추가

## 표 읽는 법
- 경로는 `/api` 생략 (예: `/me` = `/api/me`)
- 주의: 공통 표 외에 이 API에서 나올 수 있는 409, 413, 423, 429, 503 / multipart = 파일 업로드(form-data)
- 400, 401, 403, 404는 대부분의 API에 있어 생략

## 사용자 화면 API (77)

### 설정
| 메서드 | 경로 | 설명 | 주의 |
|---|---|---|---|
| GET | `/config` | 화면 설정 |  |

### 내 정보·프로필
| 메서드 | 경로 | 설명 | 주의 |
|---|---|---|---|
| GET | `/me` | 내 정보 |  |
| PUT | `/me/nickname` | 별명 바꾸기 | 423 |
| POST | `/me/photo` | 프로필 사진 올리기 | multipart 413,423 |
| DELETE | `/me/photo` | 구글 사진으로 되돌리기 | 423 |
| PUT | `/me/profile` | 한줄 소개·좋아하는 음식 바꾸기 | 423 |
| PUT | `/me/profile/details` | 상세 프로필 바꾸기 | 423 |
| GET | `/photos/{key}.jpg` | 프로필 사진 보기 |  |

### 초대
| 메서드 | 경로 | 설명 | 주의 |
|---|---|---|---|
| GET | `/invites/{token}` | 초대 링크 보기 |  |
| POST | `/invites/{token}/join` | 초대 수락 | 409,423 |

### 조직
| 메서드 | 경로 | 설명 | 주의 |
|---|---|---|---|
| GET | `/me/orgs` | 내 조직 목록 |  |
| POST | `/orgs` | 조직 만들기 | 423 |
| GET | `/orgs/{orgId}` | 조직 정보 |  |
| PATCH | `/orgs/{orgId}` | 조직 이름 바꾸기 | 423 |
| PUT | `/orgs/{orgId}/location` | 조직 위치 바꾸기 | 423 |
| GET | `/orgs/{orgId}/members` | 멤버 목록 |  |
| DELETE | `/orgs/{orgId}/membership` | 조직 탈퇴 |  |

### 투표
| 메서드 | 경로 | 설명 | 주의 |
|---|---|---|---|
| GET | `/orgs/{orgId}/menu-names` | 메뉴 자동완성 |  |
| POST | `/orgs/{orgId}/polls` | 투표 만들기 | 423 |
| GET | `/orgs/{orgId}/polls/history` | 지난 투표 |  |
| GET | `/orgs/{orgId}/polls/today` | 오늘 투표 목록 |  |
| GET | `/orgs/{orgId}/polls/{pollId}` | 투표 상세 |  |
| PUT | `/polls/{pollId}` | 투표 수정 | 409,423 |
| DELETE | `/polls/{pollId}` | 투표 삭제 | 409,423 |
| POST | `/polls/{pollId}/close` | 지금 마감 | 409,423 |
| POST | `/polls/{pollId}/options` | 메뉴 추가 | 409,423 |
| DELETE | `/polls/{pollId}/options/{optionId}` | 메뉴 삭제 | 409 |
| PUT | `/polls/{pollId}/options/{optionId}/link` | 메뉴의 식당 달기·고치기 | 409,423 |
| PUT | `/polls/{pollId}/vote` | 참여·패스 | 409 |
| DELETE | `/polls/{pollId}/vote` | 참여·패스 취소 | 409 |

### 메뉴 댓글
| 메서드 | 경로 | 설명 | 주의 |
|---|---|---|---|
| GET | `/polls/{pollId}/options/{optionId}/comments` | 메뉴 댓글 목록 |  |
| POST | `/polls/{pollId}/options/{optionId}/comments` | 메뉴 댓글 쓰기 | 409,423 |
| PUT | `/polls/{pollId}/options/{optionId}/comments/{commentId}` | 메뉴 댓글 고치기 | 409,423 |
| DELETE | `/polls/{pollId}/options/{optionId}/comments/{commentId}` | 메뉴 댓글 지우기 | 409 |

### 투표 채팅
| 메서드 | 경로 | 설명 | 주의 |
|---|---|---|---|
| GET | `/chat-photos/{key}.jpg` | 채팅 사진 원본 |  |
| GET | `/chat-photos/{key}_t.jpg` | 채팅 사진 썸네일 |  |
| GET | `/polls/{pollId}/messages` | 채팅 메시지 목록 |  |
| POST | `/polls/{pollId}/messages` | 채팅 보내기 | 409,423,429 |
| POST | `/polls/{pollId}/messages/photo` | 채팅 사진 보내기 | multipart 409,413,423,429,503 |
| PUT | `/polls/{pollId}/messages/read` | 채팅 읽음 |  |
| PUT | `/polls/{pollId}/messages/{messageId}` | 채팅 고치기 | 409,423 |
| DELETE | `/polls/{pollId}/messages/{messageId}` | 채팅 지우기 | 409 |

### 정기 투표
| 메서드 | 경로 | 설명 | 주의 |
|---|---|---|---|
| GET | `/orgs/{orgId}/schedules` | 정기 투표 목록 |  |
| POST | `/orgs/{orgId}/schedules` | 정기 투표 추가 | 423 |
| PUT | `/orgs/{orgId}/schedules/{scheduleId}` | 정기 투표 수정 | 423 |
| DELETE | `/orgs/{orgId}/schedules/{scheduleId}` | 정기 투표 삭제 | 423 |

### 식당·지도
| 메서드 | 경로 | 설명 | 주의 |
|---|---|---|---|
| GET | `/orgs/{orgId}/places` | 지도 위치 |  |
| GET | `/orgs/{orgId}/places/search` | 근처 식당 찾기 | 503 |

### 통계·추천
| 메서드 | 경로 | 설명 | 주의 |
|---|---|---|---|
| GET | `/orgs/{orgId}/menu-recommendations` | 메뉴 추천 |  |
| GET | `/orgs/{orgId}/menu-stats` | 메뉴 통계 |  |

### 랭킹
| 메서드 | 경로 | 설명 | 주의 |
|---|---|---|---|
| GET | `/orgs/{orgId}/ranking` | 메뉴 메이커 랭킹 |  |

### 쪽지
| 메서드 | 경로 | 설명 | 주의 |
|---|---|---|---|
| GET | `/letters` | 쪽지함 |  |
| POST | `/letters` | 쪽지 보내기 | 423,429 |
| GET | `/letters/blocks` | 차단 목록 |  |
| DELETE | `/letters/blocks/{blockId}` | 차단 풀기 |  |
| GET | `/letters/unread` | 안 읽은 쪽지 수 |  |
| DELETE | `/letters/{letterId}` | 쪽지 지우기 |  |
| POST | `/letters/{letterId}/block` | 보낸 사람 차단 | 409 |
| PUT | `/letters/{letterId}/read` | 쪽지 읽음 |  |
| POST | `/letters/{letterId}/reply` | 답장 | 409,423,429 |
| POST | `/letters/{letterId}/report` | 쪽지 신고 | 409 |

### 방명록
| 메서드 | 경로 | 설명 | 주의 |
|---|---|---|---|
| GET | `/guestbook/alerts` | 방명록 알림 |  |
| DELETE | `/guestbook/entries/{entryId}` | 방명록 글 지우기 |  |
| POST | `/guestbook/entries/{entryId}/report` | 방명록 글 신고 | 409 |
| POST | `/guestbook/seen` | 내 방명록 봤음 |  |
| GET | `/guestbook/users/{ownerId}` | 방명록 |  |
| POST | `/guestbook/users/{ownerId}` | 방명록 쓰기 | 423,429 |
| POST | `/guestbook/warnings/ack` | 글 제한 경고 확인 |  |

### 새 소식
| 메서드 | 경로 | 설명 | 주의 |
|---|---|---|---|
| GET | `/notices` | 새 소식 |  |
| POST | `/notices/seen` | 새 소식 봤음 |  |
| GET | `/notices/unread` | 안 읽은 새 소식 |  |

### 이용 제한·신고
| 메서드 | 경로 | 설명 | 주의 |
|---|---|---|---|
| POST | `/profile-reports/results/seen` | 신고 결과 봤음 |  |
| GET | `/sanctions/alerts` | 안 본 제재 안내·신고 결과 |  |
| POST | `/sanctions/seen` | 제재 안내 봤음 |  |
| POST | `/users/{userId}/report` | 사람 신고 |  |

### 알림 기기
| 메서드 | 경로 | 설명 | 주의 |
|---|---|---|---|
| PUT | `/push/devices/{fid}` | 이 기기에서 알림 켜기 | 409 |
| DELETE | `/push/devices/{fid}` | 이 기기에서 알림 끄기 |  |

## 관리자 콘솔 API (37)
- 모두 `/api/admin/**`, 요청마다 DB 역할 확인, 관리자가 아니면 403 (화면 노출 여부는 `GET /api/me`의 `admin`)
- 인증, CSRF, 오류 형식은 공통과 같음
- 지금은 목록만, 관리자 화면 착수 시 명세를 다시 받아 필드까지 채움 (D-020)

### 개요
| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/admin/stats` | 개요 숫자 |

### 회원
| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/admin/users` | 회원 목록 |
| GET | `/admin/users/{userId}` | 회원 상세 |
| DELETE | `/admin/users/{userId}` | 강제 탈퇴 |
| PUT | `/admin/users/{userId}/nickname` | 회원 별명 바꾸기 |
| DELETE | `/admin/users/{userId}/photo` | 올린 사진 지우기 |
| PUT | `/admin/users/{userId}/profile` | 회원 소개 바꾸기 |
| PUT | `/admin/users/{userId}/profile/details` | 회원 상세 프로필 바꾸기 |
| DELETE | `/admin/users/{userId}/profile/details` | 회원 상세 프로필 지우기 |

### 조직·투표
| 메서드 | 경로 | 설명 |
|---|---|---|
| DELETE | `/admin/chat-messages/{messageId}` | 채팅 메시지 강제 삭제 |
| DELETE | `/admin/menu-comments/{commentId}` | 메뉴 댓글 강제 삭제 |
| DELETE | `/admin/menu-options/{optionId}` | 메뉴 강제 삭제 |
| GET | `/admin/menu-options/{optionId}/comments` | 메뉴 댓글 목록 |
| GET | `/admin/orgs` | 조직 목록 |
| GET | `/admin/orgs/{organizationId}` | 조직 상세 |
| DELETE | `/admin/orgs/{organizationId}` | 조직 삭제 |
| DELETE | `/admin/orgs/{organizationId}/members/{userId}` | 멤버 내보내기 |
| GET | `/admin/polls/{pollId}` | 투표 상세 |
| DELETE | `/admin/polls/{pollId}` | 투표 삭제 |
| GET | `/admin/polls/{pollId}/messages` | 투표 채팅 보기 |
| DELETE | `/admin/schedules/{scheduleId}` | 정기 투표 규칙 삭제 |

### 신고
| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/admin/guestbook-reports` | 방명록 신고 목록 |
| POST | `/admin/guestbook-reports/{reportId}/dismiss` | 방명록 신고 문제 없음 |
| POST | `/admin/guestbook-reports/{reportId}/restrict` | 방명록 글 제한 |
| GET | `/admin/letter-reports` | 쪽지 신고 목록 |
| POST | `/admin/letter-reports/{reportId}/resolve` | 쪽지 신고 처리 완료 |
| GET | `/admin/profile-reports` | 사람 신고 목록 |
| POST | `/admin/profile-reports/{reportId}/dismiss` | 사람 신고 문제 없음 |

### 제재
| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/admin/sanctions` | 제재 목록 |
| POST | `/admin/sanctions/{sanctionId}/lift` | 제재 해제 |
| GET | `/admin/users/{userId}/sanctions` | 회원의 제재 기록 |
| POST | `/admin/users/{userId}/sanctions` | 제재하기 |

### 차단
| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/admin/blocks` | 차단 목록 |
| DELETE | `/admin/blocks/{blockId}` | 차단 해제 |

### 공지
| 메서드 | 경로 | 설명 |
|---|---|---|
| POST | `/admin/notices` | 개발자 노트 쓰기 |
| PUT | `/admin/notices/{noticeId}` | 개발자 노트 고치기 |
| DELETE | `/admin/notices/{noticeId}` | 개발자 노트 지우기 |
