import { style } from '@vanilla-extract/css'
import { breakpoint, vars } from '../../../shared/ui'
import { BLOCK_GAP, CARD_RADIUS, CONTENT_MAX, GUTTER, HAIRLINE, HEADER_HEIGHT, SECTION_SPACE, SPACE, WIDE_MAX } from './landing.css.ts'

// 데스크톱 2단: 설명보다 화면 자리를 넓게
const DESKTOP_COLUMNS = '1fr 1.4fr'
const SCREEN_RATIO = '4 / 3'
const SCREEN_RADIUS = SPACE[16]
// 스크롤하면 카드가 헤더 아래에 차례로 붙어 쌓임, 뒤 카드가 STACK_STEP만큼 아래에 붙어 앞 카드 윗부분이 보임
const STACK_TOP = `calc(${HEADER_HEIGHT} + ${SPACE[24]})`
const STACK_STEP = SPACE[16]

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: BLOCK_GAP,
  padding: `${SECTION_SPACE} ${GUTTER}`,
  backgroundColor: vars.bg.grey,
})

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: SPACE[16],
  width: '100%',
  // 1024px 미만은 콘텐츠 최대 768px (design.md 레이아웃)
  maxWidth: CONTENT_MAX,
  margin: 0,
  padding: 0,
  listStyle: 'none',
  '@media': {
    [breakpoint.desktop]: { maxWidth: WIDE_MAX },
  },
})

export const card = style({
  display: 'grid',
  gap: SPACE[24],
  padding: `${SPACE[32]} ${SPACE[24]}`,
  borderRadius: CARD_RADIUS,
  backgroundColor: vars.bg.layered,
  boxShadow: `inset 0 0 0 ${HAIRLINE} ${vars.border.subtle}`,
  position: 'sticky',
  top: STACK_TOP,
  selectors: {
    '&:nth-child(2)': { top: `calc(${STACK_TOP} + ${STACK_STEP})` },
    '&:nth-child(3)': { top: `calc(${STACK_TOP} + ${STACK_STEP} * 2)` },
    '&:nth-child(4)': { top: `calc(${STACK_TOP} + ${STACK_STEP} * 3)` },
  },
  '@media': {
    [breakpoint.desktop]: { gridTemplateColumns: DESKTOP_COLUMNS, alignItems: 'center', padding: SPACE[48] },
  },
})

export const text = style({
  display: 'flex',
  flexDirection: 'column',
  gap: SPACE[12],
})

export const label = style({
  fontSize: vars.font.t7.size,
  lineHeight: vars.font.t7.lineHeight,
  fontWeight: vars.weight.bold,
  color: vars.brand.primary,
})

export const title = style({
  margin: 0,
  fontSize: vars.font.t3.size,
  lineHeight: vars.font.t3.lineHeight,
  fontWeight: vars.weight.bold,
})

export const description = style({
  margin: 0,
  fontSize: vars.font.t6.size,
  lineHeight: vars.font.t6.lineHeight,
  color: vars.text.secondary,
})

// 앱 화면이 들어올 자리 (D-024 2차)
export const screenSlot = style({
  aspectRatio: SCREEN_RATIO,
  borderRadius: SCREEN_RADIUS,
  // 랜딩 그라데이션은 orange 계열, 투명, 흰색만 (D-025)
  backgroundImage: `linear-gradient(to bottom right, ${vars.palette.orange50}, ${vars.bg.base})`,
})
