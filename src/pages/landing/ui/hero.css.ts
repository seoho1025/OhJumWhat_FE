import { style } from '@vanilla-extract/css'
import { vars } from '../../../shared/ui'
import { BLOCK_GAP, CARD_RADIUS, CONTENT_MAX, enterAnimation, GUTTER, PHONE_OVERLAP, SPACE } from './landing.css.ts'

// 문구 → 버튼 → 목업 순서로 떠오름
const BUTTONS_ENTER_DELAY = '0.15s'
const PHONE_ENTER_DELAY = '0.3s'
// 휴대폰 목업: 데스크톱 최대 폭, 좁은 화면에서는 화면 폭의 70%
const PHONE_WIDTH = 'min(16rem, 70vw)'
const PHONE_RATIO = '9 / 19.5'
const PHONE_RADIUS = '2.5rem'
const PHONE_BEZEL = SPACE[8]
const HERO_TOP_SPACE = SPACE[64]

export const hero = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: BLOCK_GAP,
  padding: `${HERO_TOP_SPACE} ${GUTTER} 0`,
  textAlign: 'center',
  // 아래쪽으로 갈수록 브랜드 색이 번짐 (D-033)
  // 번짐은 아래 끝에 닿기 전에 사라지고, 끝 색은 orange50이라 다음 섹션 시작 색과 이어짐
  backgroundImage: [
    `radial-gradient(50% 30% at 50% 70%, ${vars.palette.orange100}, transparent)`,
    `linear-gradient(to bottom, ${vars.bg.base} 30%, ${vars.palette.orange50})`,
  ].join(', '),
})

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: SPACE[16],
  maxWidth: CONTENT_MAX,
  ...enterAnimation,
})

export const description = style({
  margin: 0,
  fontSize: vars.font.t6.size,
  lineHeight: vars.font.t6.lineHeight,
  color: vars.text.secondary,
})

export const loginError = style({
  margin: 0,
  padding: `${SPACE[12]} ${SPACE[16]}`,
  borderRadius: CARD_RADIUS,
  backgroundColor: vars.brand.weak,
  fontSize: vars.font.t6.size,
  lineHeight: vars.font.t6.lineHeight,
})

export const buttons = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: SPACE[12],
  marginTop: SPACE[8],
  ...enterAnimation,
  animationDelay: BUTTONS_ENTER_DELAY,
})

// 에셋이 들어올 자리, 비율을 고정해 교체해도 레이아웃이 움직이지 않음
export const phoneSlot = style({
  width: PHONE_WIDTH,
  marginBottom: `calc(-1 * ${PHONE_OVERLAP})`,
  ...enterAnimation,
  animationDelay: PHONE_ENTER_DELAY,
})

export const phone = style({
  aspectRatio: PHONE_RATIO,
  borderRadius: PHONE_RADIUS,
  border: `${PHONE_BEZEL} solid ${vars.bg.inverse}`,
  backgroundImage: `linear-gradient(to bottom, ${vars.palette.orange50}, ${vars.bg.base})`,
})
