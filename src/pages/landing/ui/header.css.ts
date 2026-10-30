import { style } from '@vanilla-extract/css'
import { breakpoint, vars } from '../../../shared/ui'
import { GUTTER, HAIRLINE, HEADER_HEIGHT, SPACE, WIDE_MAX } from './landing.css.ts'

// 스크롤해도 위에 붙어 있고, 뒤 내용이 살짝 비치는 흰 배경
const HEADER_BG = `color-mix(in srgb, ${vars.bg.base} 85%, transparent)`
const HEADER_BLUR = 'blur(12px)'

export const header = style({
  position: 'sticky',
  top: 0,
  zIndex: 1,
  height: HEADER_HEIGHT,
  backgroundColor: HEADER_BG,
  backdropFilter: HEADER_BLUR,
  WebkitBackdropFilter: HEADER_BLUR,
  borderBottom: `${HAIRLINE} solid ${vars.border.subtle}`,
})

export const inner = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: SPACE[16],
  height: '100%',
  maxWidth: WIDE_MAX,
  margin: '0 auto',
  padding: `0 ${GUTTER}`,
  boxSizing: 'border-box',
})

export const logo = style({
  fontSize: vars.font.t4.size,
  lineHeight: vars.font.t4.lineHeight,
  fontWeight: vars.weight.bold,
  color: vars.text.primary,
  textDecoration: 'none',
})

// 메뉴는 데스크톱에서만, 모바일은 로고와 버튼만
export const nav = style({
  display: 'none',
  '@media': {
    [breakpoint.desktop]: { display: 'block' },
  },
})

export const navList = style({
  display: 'flex',
  gap: SPACE[32],
  margin: 0,
  padding: 0,
  listStyle: 'none',
})

export const navLink = style({
  fontSize: vars.font.t6.size,
  lineHeight: vars.font.t6.lineHeight,
  fontWeight: vars.weight.medium,
  color: vars.text.secondary,
  textDecoration: 'none',
  transition: 'color 0.2s',
  selectors: {
    '&:hover': { color: vars.brand.primary },
    '&:focus-visible': { color: vars.brand.primary, outline: `2px solid ${vars.brand.primary}`, outlineOffset: SPACE[4] },
  },
})

export const actions = style({
  display: 'flex',
  gap: SPACE[8],
})
