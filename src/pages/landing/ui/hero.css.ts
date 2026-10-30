import { style } from '@vanilla-extract/css'
import { vars } from '../../../shared/ui'
import { BLOCK_GAP, CARD_RADIUS, CONTENT_MAX, enterAnimation, GUTTER, HERO_OVERLAP, SPACE } from './landing.css.ts'

// 문구 → 버튼 → 캐릭터 순서로 떠오름
const BUTTONS_ENTER_DELAY = '0.15s'
const CHARACTER_ENTER_DELAY = '0.3s'
const CHARACTER_WIDTH = 'min(26rem, 80vw)'
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
  fontSize: vars.font.st11.size,
  lineHeight: vars.font.st11.lineHeight,
  color: vars.text.tertiary,
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

// 대표 캐릭터: 데스크톱 최대 폭, 좁은 화면에서는 화면 폭의 80%
export const heroCharacter = style({
  width: CHARACTER_WIDTH,
  marginBottom: `calc(-1 * ${HERO_OVERLAP})`,
  ...enterAnimation,
  animationDelay: CHARACTER_ENTER_DELAY,
})
