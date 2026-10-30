# components.md 
TDS Mobile 컴포넌트 카탈로그 (2026-10-29 문서 기준 요약, 원문 복사 아님) 
- props 이름과 값은 TDS 그대로, 구현 이름은 design.md "이름 대응"을 따름 
- 만들 때마다 TDS 원문(tossmini-docs.toss.im/tds-mobile)을 다시 확인하고, 이 문서의 해당 줄을 갱신 
- [웹] = 웹에서 추가로 챙길 것 / [모바일 전용] = 오점왓에서 필요해질 때만 

## 공통 규칙 
- 열림, 선택 상태: controlled(value/open + onChange/onClose) 우선, default* 로 uncontrolled 허용 
- 하위 영역은 compound(X.Item, X.Header) 또는 slot props(left, contents, right) 
- 글자 props: typography(t1~t7, st1~st13), fontWeight(regular/medium/semibold/bold), color 
- 애니메이션 끝 콜백: onEntered(열림 완료), onExited(닫힘 완료) 

## 버튼, 액션 
| 컴포넌트 | 핵심 props | 메모 |
|---|---|---|
| Button | color(primary/danger/light/dark), variant(fill/weak), size(small~xlarge), display(inline/block/full), loading, disabled, 링크는 buttonStyle (D-028, as prop 없음) | 값은 design.md Button 표 |
| TextButton | size(xsmall~xxlarge), variant(clear/arrow/underline), disabled | 글자 props 상속 |
| IconButton | aria-label(필수), variant(clear/fill/border), name 또는 src, color, bgColor(greyOpacity100), iconSize(24) | 아이콘 출처는 프로젝트에서 결정 |
| BottomCTA | Single(children) / Double(leftButton, rightButton), fixed, takeSpace, background(default/none), topAccessory, bottomAccessory, hideOnScroll, showAfterDelay | 아래 여백 max(safe-area, 20px), [웹] 데스크톱 배치 결정 |
| FixedBottomCTA | BottomCTA + fixed=true, Double은 FixedBottomCTA.Double | |

## 입력 
| 컴포넌트 | 핵심 props | 메모 |
|---|---|---|
| TextField | variant(box/line/big/hero, 필수), label, labelOption(appear/sustain), help, hasError, prefix, suffix, right, format | 하위: Clearable(onClear), Password(onVisibilityChange), Button(선택기 모양) |
| TextArea | TextField에서 prefix·suffix·right 제외, minHeight, height | |
| SplitTextField | variant, label, first, second, hasError | 주민번호용 RRN 변형은 [모바일 전용] |
| SearchField | fixed, takeSpace, onDeleteClick | |
| Checkbox | Circle / Line 형태, checked + onCheckedChange, defaultChecked, size(24), disabled, inputType(checkbox/radio) | 라디오로도 사용 |
| Switch | checked + onChange(event, checked), disabled, name | role=switch 내장 |
| SegmentedControl | Item(value, children), value + onChange, defaultValue, size(small/large), alignment(fixed/fluid) | |
| Slider | value + onValueChange, defaultValue, minValue, maxValue, color, label{min, mid, max}, tooltip | [웹] 키보드 화살표 |
| NumericSpinner | size(tiny~large, 필수), number + onNumberChange, defaultNumber, minNumber(0), maxNumber(999), disable | 둥글기 배경 16, 숫자 14 |
| Rating | readOnly(필수), value, size(tiny~big), variant(full/compact/iconOnly, 읽기 전용만), max(5), onValueChange | |
| Agreement V4 | variant(xLarge~small-last), left, middle, right, 하위 Badge·Checkbox·Group(showGradient) | [모바일 전용] 동의 화면 |
| Keypad (Number, Alphabet, FullSecure) | onKeyClick, onBackspaceClick, numbers, secure | [모바일 전용] 웹은 기본 키보드 |

## 오버레이 
| 컴포넌트 | 핵심 props | 메모 |
|---|---|---|
| Modal | Overlay + Content, open + onOpenChange, onExited, portalContainer | [웹] 네이티브 dialog, ESC, 포커스 복귀 |
| AlertDialog | open, title, description, alertButton, onClose(없으면 안 닫힘), closeOnDimmerClick(true), closeOnBackEvent | 버튼 1개 |
| ConfirmDialog | AlertDialog + cancelButton, confirmButton | 버튼 2개 |
| BottomSheet | open, onClose, header, headerDescription, cta(CTA/DoubleCTA), maxHeight, expandBottomSheet, ariaLabelledBy | 하위 Select(options{name,value}), CTA 위 그라데이션 34px, [웹] 데스크톱은 모달로 |
| Toast | open, position(top/bottom), text, leftAddon, button(bottom만), duration(3000, 버튼 있으면 5000), onClose, aria-live(polite) | |
| Tooltip | size(small~large), open + onOpenChange, message, placement(top/bottom), openOnHover, openOnFocus, dismissible, autoFlip, offset | 웹 친화적 옵션 있음 |
| Menu | Trigger(open, onOpen, onClose, placement, dropdown) → Dropdown(header) → DropdownItem(left, right) / DropdownCheckItem / DropdownIcon | design.md 드롭다운 |
| Highlight | open, padding, delay, message, messageColor, onClick, onExited | 화면 일부 강조(코치마크) |
| useDialog / useToast / useBottomSheet | openAlert, openConfirm 등 명령형 호출 | 필요해지면 shared/lib 훅으로 |

## 목록, 구조 
| 컴포넌트 | 핵심 props | 메모 |
|---|---|---|
| ListRow | left, contents, right, withArrow, border(indented/none), verticalPadding(small 8/medium 12/large 16/xlarge 24), horizontalPadding(small 20/medium 24), disabled, disabledStyle(type1/type2) | 하위 AssetIcon(shape), IconButton, Texts, Loader |
| ListHeader | title(TitleParagraph/TitleSelector/TitleTextButton), description, descriptionPosition(top/bottom), right(RightText/RightArrow), titleWidthRatio(0.66) | |
| ListFooter | children("더 보기"), icon, border(full/indented/none), textColor·iconColor(blue500), shadow | |
| BoardRow | title, prefix, icon, children, initialOpened, isOpened + onOpen/onClose | 아코디언(주로 Q&A), 제목은 button + aria-expanded, Prefix와 제목 간격 8, Prefix st8 regular·blue500(프로젝트는 brand.primary), 본문 t6·아래 여백 24, ArrowIcon 24·grey400. 여닫는 움직임과 행 간격은 원문에 없음 → 랜딩 FAQ에서 0.3s 높이 전환, 화살표 90° 회전, 행 20/24 (D-033) |
| TableRow | left, right, align(left/space-between, 필수), leftRatio | |
| GridList | column(1/2/3, 기본 3), Item(image, children) | |
| Border | variant(full 기본/padding24/height16), height(height16일 때만, 높이 직접 지정) | 항목 구분: full(전체 너비) 또는 padding24(여백 24, 원문이 "양쪽"과 "왼쪽"으로 다르게 설명 → 구현 전 렌더링 확인), 구간 구분: height16(높이 16 띠). 선 두께·색은 원문에 없음 → 테두리 의미 토큰 정할 때 결정 |
| Top | title, subtitleTop, subtitleBottom, upper, lower, right, upperGap(24), lowerGap(24) | 화면 상단 제목 영역, LowerButton 기본 small |
| Tab | Item(selected, redBean), onChange(index), size(large/small), fluid, itemGap | |
| Stepper | play, delay, staggerDelay(0.1), Row(left, center, right, hideLine) | 단계 안내 |
| ProgressStepper | variant(compact/icon), activeStepIndex, checkForFinish, paddingTop(default 16/wide 24), Step(title, icon) | |

## 표시, 피드백 
| 컴포넌트 | 핵심 props | 메모 |
|---|---|---|
| Badge | variant(fill/weak), size(xsmall~large), color(blue/teal/green/red/yellow/elephant) 모두 필수 | 크기·색 값은 원문에 없음 → 현업 기준으로 구현, 프로젝트 color primary 추가 (design.md Badge, D-038) |
| Paragraph | typography(필수), display(block/inline), ellipsisAfterLines, textAlign, fontWeight, color | 하위 Text, 링크·배지 둥글기는 typography별 |
| Post | H1(t2)·H2(t3)·H3(st8) 등 제목, Paragraph, Ul/Li, paddingBottom | 본문 글 구조 |
| Bubble | background(blue=나/grey=상대, 필수), withTail(true) | 채팅 말풍선, 꼬리는 나 오른쪽·상대 왼쪽 |
| Result | figure, title, description, button(Result.Button) | 완료, 오류 화면 |
| BottomInfo | bottomGradient(기본 greyBackground → 투명) | 하단 안내, 주의사항 |
| Loader | size(small/medium/large), type(primary/dark/light), label | |
| Skeleton | pattern(topList 등 9종), custom(list/title/subtitle/card/listWithIcon/spacer(n)), repeatLastItemCount(3), background(white/grey/greyOpacity100) | |
| ProgressBar | progress(0~1, 필수), size(light/normal/bold), color(blue400), animate | |
| BarChart | data[{value, maxValue, label, theme, barAnnotation}], fill(all-bar/single-bar/auto), height(205) | theme: blue/green/yellow/orange/red/grey |
| Asset | Frame(shape{width, height, radius, acc, overlap}, content) + Image/Icon/Lottie/Video | 프레임 프리셋 제공, 토스 에셋은 사용 금지 |
