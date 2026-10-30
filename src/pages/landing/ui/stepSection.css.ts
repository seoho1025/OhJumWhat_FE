import { style } from '@vanilla-extract/css'
import { breakpoint, vars } from '../../../shared/ui'
import { BLOCK_GAP, CARD_RADIUS, CARD_SHADOW, CONTENT_MAX, GUTTER, SECTION_SPACE, SPACE, WIDE_MAX } from './landing.css.ts'

// 데스크톱 2단: 설명보다 화면 자리를 넓게
const DESKTOP_COLUMNS = '1fr 1.4fr'
const SCREEN_RATIO = '4 / 3'
const SCREEN_RADIUS = SPACE[16]

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
  boxShadow: CARD_SHADOW,
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
