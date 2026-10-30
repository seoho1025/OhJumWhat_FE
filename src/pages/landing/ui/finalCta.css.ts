import { style } from '@vanilla-extract/css'
import { vars } from '../../../shared/ui'
import { GUTTER, SECTION_SPACE, sectionTitle, SPACE } from './landing.css.ts'

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: SPACE[32],
  padding: `calc(${SECTION_SPACE} * 1.5) ${GUTTER}`,
  backgroundColor: vars.bg.inverse,
  backgroundImage: `radial-gradient(50% 60% at 50% 100%, ${vars.palette.orange900}, transparent)`,
  textAlign: 'center',
})

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: SPACE[32],
})

export const cheer = style({
  width: 'min(14rem, 50vw)',
})

export const title = style([sectionTitle, { color: vars.text.inverse }])
