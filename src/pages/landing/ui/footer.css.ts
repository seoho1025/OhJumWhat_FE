import { style } from '@vanilla-extract/css'
import { vars } from '../../../shared/ui'
import { GUTTER, SPACE } from './landing.css.ts'

// 높이를 고정해 마지막 화면(CTA + 푸터)을 한 화면에 맞춤 (finalCta.css.ts)
export const FOOTER_HEIGHT = '6rem'

export const footer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: SPACE[4],
  height: FOOTER_HEIGHT,
  padding: `0 ${GUTTER}`,
  boxSizing: 'border-box',
  backgroundColor: vars.bg.inverse,
  color: vars.text.inverseSecondary,
  fontSize: vars.font.st12.size,
  lineHeight: vars.font.st12.lineHeight,
  textAlign: 'center',
})

export const name = style({
  fontSize: vars.font.t6.size,
  lineHeight: vars.font.t6.lineHeight,
  fontWeight: vars.weight.bold,
  color: vars.text.inverse,
})
