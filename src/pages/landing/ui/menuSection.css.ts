import { style } from '@vanilla-extract/css'
import { breakpoint, vars } from '../../../shared/ui'
import { BLOCK_GAP, CARD_RADIUS, CARD_SHADOW, GUTTER, PHONE_OVERLAP, SECTION_SPACE } from './landing.css.ts'

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
  gap: '0.25rem',
  width: '4.75rem',
  aspectRatio: '3 / 4',
  marginInline: '-0.375rem',
  padding: '0.875rem',
  boxSizing: 'border-box',
  borderRadius: CARD_RADIUS,
  border: `1px solid ${vars.palette.orange100}`,
  backgroundImage: `linear-gradient(160deg, ${vars.bg.base}, ${vars.palette.orange50})`,
  boxShadow: CARD_SHADOW,
  selectors: {
    '&:nth-child(1)': { transform: 'rotate(-12deg) translateY(1.5rem)' },
    '&:nth-child(2)': { transform: 'rotate(-6deg)' },
    '&:nth-child(3)': { transform: 'translateY(-0.75rem)' },
    '&:nth-child(4)': { transform: 'rotate(6deg)' },
    '&:nth-child(5)': { transform: 'rotate(12deg) translateY(1.5rem)' },
  },
  '@media': {
    [breakpoint.desktop]: { width: '9rem', marginInline: '-0.75rem', padding: '1.25rem' },
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
