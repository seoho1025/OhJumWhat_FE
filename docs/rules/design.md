# design.md 

## 기준 
- 디자인 시스템은 TDS Mobile 기준: 색상, 타이포그래피, 컴포넌트 크기, CTA 규칙을 TDS 문서 값 그대로 사용 (D-017) 
- 변수명만 프로젝트 규칙으로 바꿈 (아래 "이름 대응") 
- TDS 패키지(@toss/tds-*), 토스 로고, Tossface, 토스 에셋은 사용 금지 
- ver1 오점왓 디자인은 화면 구성 참고용 
- 문서에 값이 없는 것은 임의로 만들지 말고 확인 후 이 문서에 추가 

## 레이아웃 (웹 확장) 
- 모바일 퍼스트: 컴포넌트는 모바일 기준, 데스크톱은 배치(widgets, pages)에서 넓힘 
- 기준점 하나: 1024px (breakpoint.desktop) 
- 1024px 미만: 콘텐츠 최대 768px 가운데 정렬 / 이상: 본문 + 오른쪽 사이드 2단 

## 색상 (TDS Colors) 
- 원색: grey, blue, red, orange, yellow, green, teal, purple 각 50~900, greyOpacity 50~900 
- 값은 TDS Colors 문서 그대로 (예: grey900 #191f28, blue500 #3182f6, red500 #f04452) 
- 의미 토큰(배경): base #FFFFFF, grey = grey100, layered #FFFFFF, floated #FFFFFF 
- 텍스트, 테두리 의미 토큰은 TDS 문서에 없어 원색에서 정의 (theme.css.ts에서 결정 후 여기에 기록) 
- 컴포넌트는 의미 토큰 우선, 원색 직접 사용은 Badge처럼 색 자체가 의미인 경우만 

## 타이포그래피 (TDS Typography) 
- 단계: t1~t7(주) + st1~st13(보조), 크기와 행간은 TDS 표 그대로 
- 단위는 rem (px ÷ 16), 브라우저 글자 크기 설정을 따름 

| 토큰 | 크기 / 행간(px) | 용도 |
|---|---|---|
| t1 | 30 / 40 | 매우 큰 제목 |
| t2 | 26 / 35 | 큰 제목 |
| t3 | 22 / 31 | 일반 제목 |
| t4 | 20 / 29 | 작은 제목 |
| t5 | 17 / 25.5 | 일반 본문 |
| t6 | 15 / 22.5 | 작은 본문 |
| t7 | 13 / 19.5 | 보조 정보 |

- 보조 단계 st1~st13은 주 단계 사이 1px 간격 (29/38, 28/37 … 11/16.5) 
- 굵기 5개: light 300 / regular 400 / medium 500 / semibold 600 / bold 700 
- 값 직접 입력 금지, 토큰 사용 

## 글꼴 
- TDS 전용 글꼴 대신 NanumSquare Neo 가변 폰트(woff2, 굵기 100~900) 직접 호스팅 
- 파일 위치: public/fonts/, font-display: swap 
- 대체 글꼴: system-ui, -apple-system, 'Apple SD Gothic Neo', sans-serif 

## Button (TDS Button) 
- color: primary / danger / light / dark 
- variant: fill / weak 
- size: small / medium / large / xlarge (기본 xlarge) 
- display: inline / block / full 
- loading: 폭 유지 + 스피너 + aria-busy / disabled: 투명도로 표시 

| 크기 | 최소 높이 | 최소 폭 | padding | 둥글기 | 글자 | 로더(크기/간격) |
|---|---|---|---|---|---|---|
| xlarge | 56 | 96 | 15 28 | 16 | t5 | 8 / 7 |
| (작은 크기, 이름 미확인) | 38 | 64 | 2 16 | 10 | t6 | 5 / 4 |

- 출처: TDS 문서 예시 화면의 렌더링 값 (작은 크기는 Result, Top 예시), medium·large는 미확인 
- 색 조합 예: fill primary = blue500 + 흰 글자 / weak danger = red300 15% 배경 + red600 글자 / weak 회색 = greyOpacity100 배경 + grey700 글자 

## BottomCTA (TDS BottomCTA) 
- Single(버튼 1개, children) / Double(leftButton, rightButton) 
- fixed: 화면 하단 고정, 고정 시 레이아웃 공간 차지(takeSpace) 
- 아래 여백: max(env(safe-area-inset-bottom), 20px) 
- topAccessory / bottomAccessory로 위아래 보조 요소 
- 웹 전용 아님: 데스크톱에서는 고정 대신 본문 흐름에 두는지 화면별로 결정 

## 둥글기 (radius) 
- TDS에는 전역 radius 단계가 없고 컴포넌트마다 값을 가짐 → 프로젝트도 컴포넌트별 토큰으로 관리 
- 확인된 값: Button xlarge 16 / Button 작은 크기 10 / NumericSpinner 배경 16, 숫자 14 
- 문단 안 링크, 배지 둥글기는 타이포그래피 단계에 묶여 있음 (t6이면 t6용 값) → 값 미확인 
- 카드, 모달, 입력창 둥글기는 미확인 → 정하면 여기에 추가 

## 그라데이션 
- TDS에서 그라데이션은 장식이 아니라 "내용이 배경으로 사라지는 경계"에만 사용 
- 하단 정보(BottomInfo): linear-gradient(bg.grey, 투명) 기본, none은 비권장 
- BottomCTA: background default = 배경색 + 위쪽 그라데이션 / none = 둘 다 없음 
- BottomSheet: CTA 위 그라데이션 높이 34px (= 내용과 CTA 간격) 
- Button loading: 버튼 위 그라데이션 효과 (색은 토큰) 
- 동의(Agreement) 그룹: 왼쪽 세로 그라데이션 선 
- 퍼짐 효과 예: radial-gradient(closest-side, blue100 0%, transparent 100%) 
- 그라데이션 색은 의미 토큰에서 투명으로만, 임의 색 조합 금지 

## 드롭다운, 선택 
- Menu: Menu.Trigger(트리거 + dropdown) → Menu.Dropdown(header) → Menu.DropdownItem(left, right) 
- 체크 항목: Menu.DropdownCheckItem(checked, onCheckedChange) / 아이콘: Menu.DropdownIcon / 제목: Menu.Header 
- 열림: open + onOpen + onClose (controlled), 생략하면 uncontrolled 
- placement: top / right / bottom / left × start / end (12가지), 기본 bottom-start 
- 바깥 클릭 시 닫힘 
- 목록에서 하나 고르기(모바일): BottomSheet.Select(options: { name, value }, value, onChange) 
- 제목 자체가 선택기: ListHeader.TitleSelector(typography t7 / t5 / t4) 
- 입력창 모양 선택기: TextField.Button (오른쪽 아래 화살표 아이콘) 
- 웹에서 추가: 화살표 키 이동, ESC 닫기, 닫힌 뒤 트리거로 포커스 복귀, aria-expanded / aria-haspopup 

## 그 밖의 컴포넌트 
- Badge: variant(fill/weak) / size(xsmall~large) / color(blue, teal, green, red, yellow, elephant) 모두 필수 
- TextField: variant(box/line/big/hero) / label / help / hasError 
- Modal, Dialog, Toast: 열림은 controlled (open + onClose) 
- Tab: Tab.Item compound, size(large/small), role=tablist/tab 내장 
- Switch: checked + onChange, role=switch 내장 
- 새 컴포넌트는 TDS 문서를 먼저 읽고 props 축을 맞춤 
- 전체 컴포넌트 목록과 props: docs/design/components.md 

## 이름 대응 (TDS → 프로젝트) 
| TDS | 프로젝트 (vanilla-extract) |
|---|---|
| colors.blue500 | vars.palette.blue500 |
| colors.background / greyBackground / layeredBackground / floatedBackground | vars.bg.base / grey / layered / floated |
| Typography 1, sub Typography 1 | vars.font.t1, vars.font.st1 |
| _Bold, _Medium … | vars.weight.bold, vars.weight.medium … |
| adaptive.grey700 (컴포넌트 안 색) | vars.palette.grey700 (다크모드 도입 시 의미 토큰으로 분리) |
| --button-border-radius 등 컴포넌트 값 | vars.component.button.xlarge.radius 형태 |
| BottomInfo bottomGradient 등 | vars.gradient.fadeToBg 형태 |
| Button, Badge, Menu 등 props | 이름, 값 그대로 (recipe variants) |

## 상태와 접근성 (웹에서 추가) 
- TDS 문서에 없는 hover, focus-visible은 모든 상호작용 요소에 정의, outline 제거 금지 
- 입력 오류: aria-invalid + aria-describedby로 help 연결 
- 아이콘만 있는 버튼은 aria-label 필수 
- 모달은 네이티브 dialog (ESC 닫기, 포커스 복귀) 
- 터치 영역 최소 44px 

## vanilla-extract 작성 규칙 
- 스타일은 .css.ts 파일에만, 컴포넌트 옆에 둠 
- 토큰, 기준점: shared/ui/theme.css.ts / 전역 스타일, @font-face: app 
- TDS props 축은 recipe variants로, props 타입은 RecipeVariants로 생성 
- 금지: Tailwind, style 속성(oxlint), Emotion 등 런타임 CSS-in-JS 
