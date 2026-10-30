
import { style } from '@vanilla-extract/css'
import { vars } from '../../../shared/ui'
import { GUTTER, HAIRLINE, SPACE } from './landing.css.ts'

export const footer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: SPACE[8],
  padding: `${SPACE[48]} ${GUTTER}`,
  backgroundColor: vars.bg.inverse,
  borderTop: `${HAIRLINE} solid ${vars.border.inverse}`,
  color: vars.text.inverseSecondary,
  fontSize: vars.font.t7.size,
  lineHeight: vars.font.t7.lineHeight,
  textAlign: 'center',
  scrollSnapAlign: 'end',
})

export const name = style({
  fontSize: vars.font.t4.size,
  lineHeight: vars.font.t4.lineHeight,
  fontWeight: vars.weight.bold,
  color: vars.text.inverse,
})
