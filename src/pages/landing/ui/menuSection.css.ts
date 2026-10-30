import { style } from '@vanilla-extract/css'
import { breakpoint, vars } from '../../../shared/ui'
import { BLOCK_GAP, CARD_RADIUS, GUTTER, HAIRLINE, REVEAL_DURATION, REVEAL_EASE, SECTION_SPACE, SPACE, STAGGER } from './landing.css.ts'

// 메뉴 카드: 모바일은 다섯 장이 390px 화면에 들어가는 크기, 겹침은 카드끼리 살짝 포개지는 정도
const CARD_WIDTH = '4.75rem'
const CARD_WIDTH_DESKTOP = '9rem'
const CARD_OVERLAP = '-0.375rem'
const CARD_OVERLAP_DESKTOP = '-0.75rem'
// 모바일 카드 폭 76px에서 가장 긴 라벨(Japanese)이 들어가는 여백
const CARD_PADDING = '0.625rem'
const CARD_RATIO = '3 / 4'
const CARD_SHEEN_ANGLE = '160deg'

// 유리 카드: 반투명 흰색 + 뒤 흐림 + 위쪽 빛 반사 + 얇은 흰 테두리 (D-041)
// 흐림은 뒤에 색이 있어야 보여서 카드 뒤에 넓은 오렌지 빛 하나를 둠
const GLASS_BLUR = 'blur(18px) saturate(160%)'
const GLASS_FILL = `linear-gradient(${CARD_SHEEN_ANGLE}, color-mix(in srgb, ${vars.bg.base} 70%, transparent), color-mix(in srgb, ${vars.bg.base} 30%, transparent))`
const GLASS_EDGE = `color-mix(in srgb, ${vars.bg.base} 70%, transparent)`
const GLASS_SHADOW = [
  `inset 0 ${HAIRLINE} 0 color-mix(in srgb, ${vars.bg.base} 90%, transparent)`,
  `0 ${SPACE[8]} ${SPACE[32]} ${vars.palette.greyOpacity100}`,
].join(', ')
// 카드 묶음 가운데에서 가로로 넓게 퍼지는 타원, 나중에 카드 안에 사진이 들어가도 가리지 않게 연하게
const GLOW_WIDTH = '170%'
const GLOW_HEIGHT = '160%'

// 부채꼴: 바깥 카드는 더 기울고 아래로, 가운데 카드는 위로
const TILT_OUTER = '12deg'
const TILT_INNER = '6deg'
const OUTER_DROP = SPACE[24]
const CENTER_LIFT = SPACE[12]
// 펼쳐지기 전: 가운데에 겹쳐 아래에 숨어 있음
const STACKED = `translateY(${SPACE[48]}) scale(0.9)`

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: BLOCK_GAP,
  padding: `${SECTION_SPACE} ${GUTTER}`,
  // 히어로 아래쪽 색(orange50)에서 이어 받아 흰색으로 풀려서 섹션 경계선이 생기지 않음
  backgroundImage: [
    `linear-gradient(to bottom, ${vars.palette.orange50}, transparent 40%)`,
    `radial-gradient(50% 50% at 50% 70%, ${vars.palette.orange50}, transparent)`,
  ].join(', '),
})

export const thinking = style({
  width: SPACE[96],
  marginBottom: `-${SPACE[24]}`,
})

// 화면에 들어오면 붙는 클래스, 카드가 부채꼴로 펼쳐짐
export const cardsInView = style({})

export const cards = style({
  position: 'relative',
  isolation: 'isolate',
  display: 'flex',
  justifyContent: 'center',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  // 유리 뒤로 비칠 넓은 오렌지 빛 하나
  '::before': {
    content: '""',
    position: 'absolute',
    zIndex: -1,
    top: '50%',
    left: '50%',
    width: GLOW_WIDTH,
    height: GLOW_HEIGHT,
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    backgroundImage: `radial-gradient(closest-side, ${vars.palette.orange100}, ${vars.palette.orange50} 55%, transparent)`,
  },
})

// 가운데 카드를 기준으로 좌우가 부채꼴로 펼쳐짐
export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: SPACE[4],
  width: CARD_WIDTH,
  aspectRatio: CARD_RATIO,
  marginInline: CARD_OVERLAP,
  padding: CARD_PADDING,
  boxSizing: 'border-box',
  borderRadius: CARD_RADIUS,
  border: `${HAIRLINE} solid ${GLASS_EDGE}`,
  backgroundImage: GLASS_FILL,
  backdropFilter: GLASS_BLUR,
  WebkitBackdropFilter: GLASS_BLUR,
  boxShadow: GLASS_SHADOW,
  opacity: 0,
  transform: STACKED,
  transition: `opacity ${REVEAL_DURATION} ${REVEAL_EASE}, transform ${REVEAL_DURATION} ${REVEAL_EASE}`,
  selectors: {
    // 가운데 카드부터 바깥으로 차례로 펼쳐짐
    [`${cardsInView} &`]: { opacity: 1 },
    [`${cardsInView} &:nth-child(1)`]: { transform: `rotate(-${TILT_OUTER}) translateY(${OUTER_DROP})`, transitionDelay: `calc(${STAGGER} * 2)` },
    [`${cardsInView} &:nth-child(2)`]: { transform: `rotate(-${TILT_INNER})`, transitionDelay: STAGGER },
    [`${cardsInView} &:nth-child(3)`]: { transform: `translateY(-${CENTER_LIFT})` },
    [`${cardsInView} &:nth-child(4)`]: { transform: `rotate(${TILT_INNER})`, transitionDelay: STAGGER },
    [`${cardsInView} &:nth-child(5)`]: { transform: `rotate(${TILT_OUTER}) translateY(${OUTER_DROP})`, transitionDelay: `calc(${STAGGER} * 2)` },
  },
  '@media': {
    [breakpoint.desktop]: { width: CARD_WIDTH_DESKTOP, marginInline: CARD_OVERLAP_DESKTOP, padding: SPACE[20] },
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
})

export const label = style({
  fontSize: vars.font.st13.size,
  lineHeight: vars.font.st13.lineHeight,
  color: vars.text.secondary,
})

export const name = style({
  fontSize: vars.font.t6.size,
  lineHeight: vars.font.t6.lineHeight,
  fontWeight: vars.weight.bold,
  '@media': {
    [breakpoint.desktop]: { fontSize: vars.font.t4.size, lineHeight: vars.font.t4.lineHeight },
  },
})
