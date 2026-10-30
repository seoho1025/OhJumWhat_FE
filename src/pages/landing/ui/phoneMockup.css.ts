import { keyframes, style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../../../shared/ui'
import { enterAnimation, HAIRLINE, SPACE } from './landing.css.ts'

// 휴대폰은 위 절반만 보이고 히어로 아래 끝에서 잘림, 잘린 곳은 다음 섹션 색으로 풀려 자연스럽게 이어짐
const PHONE_WIDTH = 'min(20rem, 82vw)'
const PHONE_RATIO = 19.5 / 9
const VISIBLE_RATIO = 0.55
const PHONE_RADIUS = '2.75rem'
const PHONE_BEZEL = SPACE[8]
const SCREEN_RADIUS = '2.25rem'
const FADE_HEIGHT = SPACE[64]
const PHONE_ENTER_DELAY = '0.3s'
const BAR_HEIGHT = SPACE[8]
const BAR_FILL_DURATION = '1.2s'
const BAR_FILL_DELAY = '0.8s'

export const window = style({
  position: 'relative',
  width: PHONE_WIDTH,
  height: `calc(${PHONE_WIDTH} * ${PHONE_RATIO} * ${VISIBLE_RATIO})`,
  overflow: 'hidden',
  // 첫 화면 아래 끝에 붙음
  marginTop: 'auto',
  ...enterAnimation,
  animationDelay: PHONE_ENTER_DELAY,
  '::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: FADE_HEIGHT,
    backgroundImage: `linear-gradient(to bottom, transparent, ${vars.palette.orange50})`,
    pointerEvents: 'none',
  },
})

export const phone = style({
  aspectRatio: `9 / 19.5`,
  boxSizing: 'border-box',
  borderRadius: PHONE_RADIUS,
  border: `${PHONE_BEZEL} solid ${vars.bg.inverse}`,
  backgroundColor: vars.bg.inverse,
})

export const screen = style({
  display: 'flex',
  flexDirection: 'column',
  gap: SPACE[16],
  height: '100%',
  padding: `${SPACE[32]} ${SPACE[20]}`,
  boxSizing: 'border-box',
  borderRadius: SCREEN_RADIUS,
  backgroundColor: vars.bg.grey,
  textAlign: 'left',
})

export const topRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const team = style({
  fontSize: vars.font.st11.size,
  lineHeight: vars.font.st11.lineHeight,
  fontWeight: vars.weight.semibold,
  color: vars.text.secondary,
})

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: SPACE[12],
  padding: SPACE[16],
  borderRadius: SPACE[16],
  backgroundColor: vars.bg.layered,
})

export const title = style({
  fontSize: vars.font.t4.size,
  lineHeight: vars.font.t4.lineHeight,
  fontWeight: vars.weight.bold,
  color: vars.text.primary,
})

export const meta = style({
  fontSize: vars.font.st12.size,
  lineHeight: vars.font.st12.lineHeight,
  color: vars.text.tertiary,
})

export const option = style({
  display: 'flex',
  flexDirection: 'column',
  gap: SPACE[4],
  paddingTop: SPACE[8],
  borderTop: `${HAIRLINE} solid ${vars.border.subtle}`,
})

export const optionRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: vars.font.st11.size,
  lineHeight: vars.font.st11.lineHeight,
  color: vars.text.primary,
})

export const count = style({
  color: vars.text.secondary,
})

export const track = style({
  height: BAR_HEIGHT,
  borderRadius: BAR_HEIGHT,
  backgroundColor: vars.bg.grey,
  overflow: 'hidden',
})

const fill = keyframes({
  from: { transform: 'scaleX(0)' },
  to: { transform: 'scaleX(1)' },
})

const barBase = style({
  height: '100%',
  borderRadius: BAR_HEIGHT,
  transformOrigin: 'left',
  animation: `${fill} ${BAR_FILL_DURATION} ${BAR_FILL_DELAY} cubic-bezier(0.22, 1, 0.36, 1) both`,
  '@media': {
    '(prefers-reduced-motion: reduce)': { animation: 'none' },
  },
})

// 득표 비율, 1등만 브랜드 색 (PhoneMockup의 OPTIONS와 순서가 같음)
export const bar = styleVariants({
  first: [barBase, { width: '62%', backgroundColor: vars.brand.primary }],
  second: [barBase, { width: '25%', backgroundColor: vars.palette.grey300 }],
  third: [barBase, { width: '13%', backgroundColor: vars.palette.grey300 }],
})
