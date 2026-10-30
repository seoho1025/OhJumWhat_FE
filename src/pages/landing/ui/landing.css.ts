import { keyframes, style } from '@vanilla-extract/css'
import { breakpoint, vars } from '../../../shared/ui'

// shortcut: 간격·둥글기·그림자 토큰이 없어 랜딩 안에서만 쓰는 값, 토큰이 정해지면 교체 (D-027)
// 4px 단위 간격, 키는 px 값 (SPACE[16] = 16px)
export const SPACE = {
  4: '0.25rem',
  8: '0.5rem',
  12: '0.75rem',
  16: '1rem',
  20: '1.25rem',
  24: '1.5rem',
  32: '2rem',
  48: '3rem',
  64: '4rem',
  96: '6rem',
} as const

export const GUTTER = SPACE[20]
export const SECTION_SPACE = SPACE[96]
export const BLOCK_GAP = SPACE[48]
export const CONTENT_MAX = '48rem'
export const WIDE_MAX = '64rem'
// TDS 문서 예시의 카드형 묶음 둥글기 20px (Border 예시), TDS는 그림자 대신 배경 대비로 구분 (D-030)
export const CARD_RADIUS = SPACE[20]
export const HAIRLINE = '1px'
// 둥근 알약 모양 버튼 (D-033)
export const PILL_RADIUS = '999px'
// 고정 헤더 높이, 앵커로 이동할 때 섹션 제목이 헤더에 가리지 않게 같은 값만큼 띄움
export const HEADER_HEIGHT = SPACE[64]

// 랜딩 큰 제목: t1(30px)보다 큰 값이 TDS에 없어 랜딩에서만 정함 (D-033)
export const DISPLAY = {
  mobile: { size: '2.5rem', lineHeight: '3.25rem' },
  desktop: { size: '4rem', lineHeight: '5rem' },
  weight: '800',
} as const

// 스크롤 등장: 천천히 감속하는 곡선, 섹션 안 요소는 STAGGER 간격으로 차례로
export const REVEAL_DURATION = '0.9s'
export const REVEAL_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
export const STAGGER = '0.12s'
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

// 히어로 캐릭터가 다음 섹션으로 겹쳐 내려오는 길이, 다음 섹션 위쪽 여백에 같은 값을 더함
export const HERO_OVERLAP = SPACE[64]

const ENTER_DURATION = '0.8s'

const fadeUp = keyframes({
  from: { opacity: 0, transform: `translateY(${SPACE[24]})` },
  to: { opacity: 1, transform: 'none' },
})

// 처음 열 때 아래에서 떠오름, 움직임 줄이기 설정이면 끔
// .css.ts는 함수를 내보낼 수 없어 객체로 내보내고, 지연은 쓰는 쪽에서 animationDelay로
export const enterAnimation = {
  animation: `${fadeUp} ${ENTER_DURATION} ${REVEAL_EASE} both`,
  '@media': {
    [REDUCED_MOTION]: { animation: 'none' },
  },
}

// 스크롤로 화면에 들어오면 아래에서 떠오름 (useInView가 inView 클래스를 붙임)
export const reveal = style({
  opacity: 0,
  transform: `translateY(${SPACE[32]})`,
  transition: `opacity ${REVEAL_DURATION} ${REVEAL_EASE}, transform ${REVEAL_DURATION} ${REVEAL_EASE}`,
  '@media': {
    [REDUCED_MOTION]: { opacity: 1, transform: 'none', transition: 'none' },
  },
})

export const inView = style({
  opacity: 1,
  transform: 'none',
})

export const section = style({
  scrollMarginTop: HEADER_HEIGHT,
})

// 알약 버튼 공통: 버튼 아래 그림자로 살짝 떠 보이게 (랜딩 예외, D-033)
export const pill = style({
  borderRadius: PILL_RADIUS,
})

export const floatingShadow = style({
  boxShadow: `0 ${SPACE[8]} ${SPACE[24]} color-mix(in srgb, ${vars.brand.primary} 35%, transparent)`,
})

export const secondaryButton = style({
  backgroundColor: vars.bg.base,
  color: vars.text.primary,
  boxShadow: `inset 0 0 0 ${HAIRLINE} ${vars.border.subtle}, 0 ${SPACE[4]} ${SPACE[16]} ${vars.palette.greyOpacity100}`,
})

// 캐릭터 이미지: 폭만 정하고 높이는 원본 비율(width·height 속성)로
export const character = style({
  display: 'block',
  height: 'auto',
})

export const displayTitle = style({
  margin: 0,
  fontSize: DISPLAY.mobile.size,
  lineHeight: DISPLAY.mobile.lineHeight,
  fontWeight: DISPLAY.weight,
  letterSpacing: '-0.02em',
  '@media': {
    [breakpoint.desktop]: { fontSize: DISPLAY.desktop.size, lineHeight: DISPLAY.desktop.lineHeight },
  },
})

export const page = style({
  // hidden은 스크롤 영역을 새로 만들어 sticky(헤더, 단계 카드)가 멈추므로 clip
  overflowX: 'clip',
  color: vars.text.primary,
})

export const sectionTitle = style({
  margin: 0,
  fontSize: vars.font.t1.size,
  lineHeight: vars.font.t1.lineHeight,
  fontWeight: vars.weight.bold,
  textAlign: 'center',
})

export const line = style({ display: 'block' })

// 큰 글자 3:1 기준을 넘는 orange800~900만 글자 그라데이션에 사용 (D-025, D-027)
export const accentLine = style([
  line,
  {
    backgroundImage: `linear-gradient(to right, ${vars.palette.orange900}, ${vars.palette.orange800})`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },
])
