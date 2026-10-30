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
- 브랜드: primary = orange800(#ed6700), onPrimary = 흰색 (D-019) → Button color primary가 이 색을 씀 
- 토큰 파일: src/shared/ui/theme.css.ts 
- 텍스트 의미 토큰 (D-027): text.primary = grey900(흰 배경 16.6:1), text.secondary = grey600(4.6:1), text.inverse = 흰색, text.inverseSecondary = grey400(grey900 배경 8.3:1), text.tertiary = grey500(흰 배경 3.0:1, AA 미달이라 보조 문구에만, D-036) 
- 배경 추가 (D-030): bg.inverse = grey900(어두운 구역), brand.weak = orange50(연한 강조 배경, 글자는 text.primary) 
- 테두리 의미 토큰 (D-030): border.subtle = grey200, border.inverse = grey800 (TDS Border 문서에 색 없음 → 원색에서 정의) 
- 그림자: TDS 문서에 없음 → 쓰지 않고 배경 대비(bg.grey 위 bg.layered)와 border로 구분 (D-030) 
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
- TDS 전용 글꼴 대신 NanumSquare Neo 직접 호스팅 (D-018) 
- 파일: public/fonts/NanumSquareNeo-Variable.woff2 (가변 폰트, 굵기 100~900) / font-display: swap 
- @font-face와 body 글꼴은 src/app/global.css.ts 
- 대체 글꼴: system-ui, -apple-system, 'Apple SD Gothic Neo', sans-serif 

## Button (TDS Button) 
- color: primary / danger / light / dark 
- variant: fill / weak 
- size: small / medium / large / xlarge (기본 xlarge) 
- display: inline / block / full 
- loading: 폭 유지 + 스피너 + aria-busy / disabled: 투명도로 표시 
- 커서는 기본 화살표(default), 페이지 이동은 <a className={buttonStyle()}> (D-028) 
- 눌림(pressed): TDS처럼 버튼 위에 어두운 층(dim)을 겹침, 웹 hover는 같은 층을 더 옅게 (D-030) 
- 상태 값 (D-031): 어두운 층 grey900, hover 8% / pressed 10% (Material 3 state layer 투명도), disabled 0.4 / focus 2px 
- 크기 표의 높이·폭은 padding 포함 (box-sizing: border-box) 
- 굵기: regular 400 (사용자 지시, D-035) 

| 크기 | 최소 높이 | 최소 폭 | padding | 둥글기 | 글자 | 로더(크기/간격) |
|---|---|---|---|---|---|---|
| small | 32 | 48 | 0 12 | 8 | st11(14) | 미정 |
| medium | 40 | 64 | 0 16 | 10 | t6(15) | 미정 |
| large | 48 | 80 | 0 20 | 12 | st10(16) | 미정 |
| xlarge | 56 | 96 | 15 28 | 16 | t5(17) | 8 / 7 |

- 출처: xlarge는 TDS 문서 예시 화면의 렌더링 값, small~large는 TDS 미공개라 현업에서 흔한 8px 단계 높이(32/40/48/56)로 정함 (D-031) 
- 참고: TDS 예시(Result, Top)의 작은 버튼 측정값 38 / 64 / 2·16 / r10 / t6은 크기 이름이 확인되지 않아 채택하지 않음 
- 높이 44px 미만(small, medium)은 보이지 않는 ::before로 터치 영역을 44px까지 넓힘 
- 색 조합 예: fill primary = brand.primary(orange800, D-019) + 흰 글자 / weak danger = red300 15% 배경 + red600 글자 / weak 회색 = greyOpacity100 배경 + grey700 글자 

## BottomCTA (TDS BottomCTA) 
- Single(버튼 1개, children) / Double(leftButton, rightButton) 
- fixed: 화면 하단 고정, 고정 시 레이아웃 공간 차지(takeSpace) 
- 아래 여백: max(env(safe-area-inset-bottom), 20px) 
- topAccessory / bottomAccessory로 위아래 보조 요소 
- 웹 전용 아님: 데스크톱에서는 고정 대신 본문 흐름에 두는지 화면별로 결정 

## 둥글기 (radius) 
- TDS에는 전역 radius 단계가 없고 컴포넌트마다 값을 가짐 → 프로젝트도 컴포넌트별 토큰으로 관리 
- 확인된 값: Button xlarge 16 / Button 작은 크기 10 / NumericSpinner 배경 16, 숫자 14 
- 간격: TDS도 전역 간격 토큰 없이 컴포넌트마다 값(ListRow 8/12/16/24, 좌우 20/24, Border 24·16)을 가짐, 모두 4px 단위 
  - 프로젝트도 전역 간격 토큰을 만들지 않고 컴포넌트·페이지 안에서 4px 단위 값 사용 (랜딩은 landing.css.ts SPACE) (D-030) 
- 문단 안 링크, 배지 둥글기는 타이포그래피 단계에 묶여 있음 (t6이면 t6용 값) → 값 미확인 
- 카드형 묶음: 20 (TDS Border 문서 예시의 묶음 컨테이너 borderRadius 20) (D-030) 
- 모달, 입력창 둥글기는 미확인 → 정하면 여기에 추가 

## 그라데이션 
- TDS에서 그라데이션은 장식이 아니라 "내용이 배경으로 사라지는 경계"에만 사용 
- 하단 정보(BottomInfo): linear-gradient(bg.grey, 투명) 기본, none은 비권장 
- BottomCTA: background default = 배경색 + 위쪽 그라데이션 / none = 둘 다 없음 
- BottomSheet: CTA 위 그라데이션 높이 34px (= 내용과 CTA 간격) 
- Button loading: 버튼 위 그라데이션 효과 (색은 토큰) 
- 동의(Agreement) 그룹: 왼쪽 세로 그라데이션 선 
- 퍼짐 효과 예: radial-gradient(closest-side, blue100 0%, transparent 100%) 
- 그라데이션 색은 의미 토큰에서 투명으로만, 임의 색 조합 금지 
- 예외: 랜딩 페이지(pages/landing)만 장식 그라데이션 허용 (D-025) 
  - 용도: 제목 글자색, 히어로·섹션 배경 빛 번짐, 카드 배경 
  - 색: palette의 orange 계열(50~900)과 투명, 흰색만 / 다른 색상군 섞기 금지 
  - 앱 화면(로그인 이후)에는 적용 금지 
  - 글자 그라데이션은 orange800~900만 (흰 배경 3.2~3.7:1, 큰 글자 기준 3:1 이상) 
- 랜딩 전용 예외 (D-033): 큰 제목 40/52(모바일)·64/80(데스크톱) px, 굵기 800 / 알약 버튼(radius 999) / 버튼 아래 브랜드색 그림자 / 스크롤 등장(화면을 벗어나면 초기화돼 다시 들어올 때 반복)·카드 펼침·단계 카드 각자 떠오름 (D-034) 
  - 움직임은 모두 prefers-reduced-motion이면 끔, 앱 화면에는 적용 금지 
  - 한 화면씩 넘김(scroll-snap)은 랜딩에만, 고정 요소에 backdrop-filter 금지(스크롤 버벅임) (D-039) 

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
- Badge: variant(fill/weak) / size(xsmall~large) / color(blue, teal, green, red, yellow, elephant) 모두 필수 (D-038) 
  - 구현: src/shared/ui/badge, TDS는 값 미공개라 현업 기준: 높이 18/20/24/28, 글자 11/12/13/14, semibold, 완전히 둥근 모양(999px) 
  - fill = 진한 배경(500, primary는 brand.primary) + 흰 글자 / weak = 연한 배경(50) + 진한 글자(700) 
  - 프로젝트 추가 color: primary(브랜드 오렌지) / elephant는 회색 계열(grey600·100·700)로 대응 
  - 한계: fill의 흰 글자는 작은 글자라 AA 미달(primary 3.2:1, yellow는 더 낮음) 
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
| (TDS primary blue500) | vars.brand.primary (orange800), vars.brand.onPrimary |
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

## 이미지 에셋 (D-037) 
- 위치: 쓰는 슬라이스의 ui 세그먼트 안 (예: pages/landing/ui/characters), assets 같은 이름은 FSD 검사(segments-by-purpose)에 걸림 
- 형식: 투명 배경 WebP, 원본에서 빈 여백을 잘라내고 화면 표시 폭의 2배로 줄임, 한 장 50KB 안팎 
- img에 width·height(원본 크기)를 넣어 불러오기 전에 자리를 잡음, 첫 화면 이미지만 fetchPriority=high, 나머지 loading=lazy 
- 문구가 내용을 전하는 장식 이미지는 alt 비움, 단계 설명처럼 내용이 있는 이미지는 alt 작성 
- 원본은 레포에 넣지 않음 

## vanilla-extract 작성 규칙 
- 스타일은 .css.ts 파일에만, 컴포넌트 옆에 둠 
- 토큰, 기준점: shared/ui/theme.css.ts / 전역 스타일, @font-face: app 
- TDS props 축은 recipe variants로, props 타입은 RecipeVariants로 생성 
- 금지: Tailwind, style 속성(oxlint), Emotion 등 런타임 CSS-in-JS 
