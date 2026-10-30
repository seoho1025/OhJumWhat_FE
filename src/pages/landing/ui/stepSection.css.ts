import { style } from '@vanilla-extract/css'
import { breakpoint, vars } from '../../../shared/ui'
import { BLOCK_GAP, CARD_RADIUS, CARD_SHADOW, GUTTER, SECTION_SPACE, WIDE_MAX } from './landing.css.ts'

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
  gap: '1rem',
  width: '100%',
  maxWidth: WIDE_MAX,
  margin: 0,
  padding: 0,
  listStyle: 'none',
})

export const card = style({
  display: 'grid',
  gap: '1.5rem',
  padding: '2rem 1.5rem',
  borderRadius: CARD_RADIUS,
  backgroundColor: vars.bg.layered,
  boxShadow: CARD_SHADOW,
  '@media': {
    [breakpoint.desktop]: { gridTemplateColumns: '1fr 1.4fr', alignItems: 'center', padding: '3rem' },
  },
})

export const text = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
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
  aspectRatio: '4 / 3',
  borderRadius: '1rem',
  backgroundImage: `linear-gradient(135deg, ${vars.palette.orange50}, ${vars.palette.grey50})`,
})
