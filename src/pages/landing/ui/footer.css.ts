import { style } from '@vanilla-extract/css'
import { vars } from '../../../shared/ui'
import { GUTTER } from './landing.css.ts'

export const footer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  padding: `3rem ${GUTTER}`,
  backgroundColor: vars.palette.grey900,
  borderTop: `1px solid ${vars.palette.grey800}`,
  color: vars.text.inverseSecondary,
  fontSize: vars.font.t7.size,
  lineHeight: vars.font.t7.lineHeight,
  textAlign: 'center',
})

export const name = style({
  fontSize: vars.font.t4.size,
  lineHeight: vars.font.t4.lineHeight,
  fontWeight: vars.weight.bold,
  color: vars.text.inverse,
})
