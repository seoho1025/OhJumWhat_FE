# commit.md 

## 형식 
<type>: <제목>
- 콜론 뒤에 공백 필수 
- type은 영어 소문자, 제목은 한글 
- 끝에 마침표 금지, 한글 25 ~ 30 자 이내 

## type 
feat, fix, docs, style, refactor, test, chore, ci, build, perf, revert 
- build: 의존성 설치,빌드 설정 변경
- chore: 린터 설정 등 기타 작업 

## 원칙 
- 한 커밋에는 한 가지 변경만
- --no-verify 사용 금지

## 브랜치 
feature/<이슈번호>-<동사>-<기능>
- 예: feature/1-add-landing 
- 이슈를 먼저 만들고 번호를 붙임, 동사와 기능은 영어 소문자, 단어는 - 로 연결 
- 작업이 끝나면 PR 본문에 Closes #<이슈번호> 

## PR 
- 제목: [#이슈번호] <type>: <요약> (예: [#1] feat: 랜딩 페이지 1차) 
- 본문은 .github/pull_request_template.md, Closes #<이슈번호> 필수 
- 병합: feature/* → main 
