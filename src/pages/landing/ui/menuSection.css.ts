import { style } from '@vanilla-extract/css'
import { breakpoint, vars } from '../../../shared/ui'
import { BLOCK_GAP, CARD_RADIUS, GUTTER, HAIRLINE, PHONE_OVERLAP, SECTION_SPACE, SPACE } from './landing.css.ts'

// 메뉴 카드: 모바일은 다섯 장이 390px 화면에 들어가는 크기, 겹침은 카드끼리 살짝 포개지는 정도
const CARD_WIDTH = '4.75rem'
const CARD_WIDTH_DESKTOP = '9rem'
const CARD_OVERLAP = '-0.375rem'
const CARD_OVERLAP_DESKTOP = '-0.75rem'
const CARD_PADDING = '0.875rem'
const CARD_RATIO = '3 / 4'
const CARD_SHEEN_ANGLE = '160deg'

// 부채꼴: 바깥 카드는 더 기울고 아래로, 가운데 카드는 위로
const TILT_OUTER = '12deg'
const TILT_INNER = '6deg'
const OUTER_DROP = SPACE[24]
const CENTER_LIFT = SPACE[12]

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: BLOCK_GAP,
  padding: `calc(${SECTION_SPACE} + ${PHONE_OVERLAP}) ${GUTTER} ${SECTION_SPACE}`,
  backgroundImage: `radial-gradient(50% 50% at 50% 70%, ${vars.palette.orange50}, transparent)`,
})

export const cards = style({
  display: 'flex',
  justifyContent: 'center',
  margin: 0,
  padding: 0,
  listStyle: 'none',
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
  border: `${HAIRLINE} solid ${vars.border.subtle}`,
  backgroundImage: `linear-gradient(${CARD_SHEEN_ANGLE}, ${vars.bg.base}, ${vars.palette.orange50})`,
  selectors: {
    '&:nth-child(1)': { transform: `rotate(-${TILT_OUTER}) translateY(${OUTER_DROP})` },
    '&:nth-child(2)': { transform: `rotate(-${TILT_INNER})` },
    '&:nth-child(3)': { transform: `translateY(-${CENTER_LIFT})` },
    '&:nth-child(4)': { transform: `rotate(${TILT_INNER})` },
    '&:nth-child(5)': { transform: `rotate(${TILT_OUTER}) translateY(${OUTER_DROP})` },
  },
  '@media': {
    [breakpoint.desktop]: { width: CARD_WIDTH_DESKTOP, marginInline: CARD_OVERLAP_DESKTOP, padding: SPACE[20] },
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
