import { style } from '@vanilla-extract/css'
import { vars } from '../../../shared/ui'
import { BLOCK_GAP, CARD_RADIUS, CARD_SHADOW, CONTENT_MAX, enterAnimation, GUTTER, PHONE_OVERLAP, SECTION_SPACE } from './landing.css.ts'

const PHONE_ENTER_DELAY = '0.2s'

export const hero = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: BLOCK_GAP,
  minHeight: '100svh',
  padding: `${SECTION_SPACE} ${GUTTER} 0`,
  boxSizing: 'border-box',
  textAlign: 'center',
  backgroundImage: [
    `radial-gradient(60% 45% at 50% 0%, ${vars.palette.orange100}, transparent)`,
    `radial-gradient(40% 30% at 90% 55%, ${vars.palette.orange50}, transparent)`,
  ].join(', '),
})

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.25rem',
  maxWidth: CONTENT_MAX,
  ...enterAnimation,
})

export const description = style({
  margin: 0,
  fontSize: vars.font.t5.size,
  lineHeight: vars.font.t5.lineHeight,
  color: vars.text.secondary,
})

export const loginError = style({
  margin: 0,
  padding: '0.75rem 1rem',
  borderRadius: CARD_RADIUS,
  backgroundColor: vars.palette.orange50,
  fontSize: vars.font.t6.size,
  lineHeight: vars.font.t6.lineHeight,
})

// 에셋이 들어올 자리, 비율을 고정해 교체해도 레이아웃이 움직이지 않음
export const phoneSlot = style({
  width: 'min(16rem, 70vw)',
  aspectRatio: '9 / 19.5',
  marginBottom: `calc(-1 * ${PHONE_OVERLAP})`,
  borderRadius: '2.5rem',
  border: `0.5rem solid ${vars.palette.grey900}`,
  backgroundImage: `linear-gradient(180deg, ${vars.palette.orange50}, ${vars.bg.base})`,
  boxShadow: CARD_SHADOW,
  ...enterAnimation,
  animationDelay: PHONE_ENTER_DELAY,
})
