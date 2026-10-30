import { keyframes, style } from '@vanilla-extract/css'
import { breakpoint, vars } from '../../../shared/ui'

// shortcut: 간격·둥글기 토큰이 아직 없어 랜딩 안에서만 쓰는 값, 토큰이 정해지면 교체 (D-027)
const GUTTER = '1.25rem'
const SECTION_SPACE = '6rem'
const CONTENT_MAX = '48rem'
const WIDE_MAX = '64rem'
const CARD_RADIUS = '1.5rem'
const CARD_SHADOW = `0 0.75rem 2rem ${vars.palette.greyOpacity200}`

// 큰 글자 3:1 기준을 넘는 orange800~900만 글자 그라데이션에 사용 (D-025, D-027)
const gradientText = {
  backgroundImage: `linear-gradient(90deg, ${vars.palette.orange900}, ${vars.palette.orange800})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
} as const

const fadeUp = keyframes({
  from: { opacity: 0, transform: 'translateY(1.5rem)' },
  to: { opacity: 1, transform: 'none' },
})

export const page = style({
  overflowX: 'hidden',
  color: vars.text.primary,
})

export const sectionTitle = style({
  margin: 0,
  fontSize: vars.font.t1.size,
  lineHeight: vars.font.t1.lineHeight,
  fontWeight: vars.weight.bold,
  textAlign: 'center',
})

export const line = style({ display: 'block' })

export const accentLine = style([line, gradientText])

/* ① 히어로 */

export const hero = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '3rem',
  minHeight: '100svh',
  padding: `${SECTION_SPACE} ${GUTTER} 0`,
  boxSizing: 'border-box',
  textAlign: 'center',
  backgroundImage: [
    `radial-gradient(60% 45% at 50% 0%, ${vars.palette.orange100}, transparent)`,
    `radial-gradient(40% 30% at 90% 55%, ${vars.palette.orange50}, transparent)`,
  ].join(', '),
})

export const heroContent = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.25rem',
  maxWidth: CONTENT_MAX,
  animation: `${fadeUp} 0.8s ease-out both`,
  '@media': {
    '(prefers-reduced-motion: reduce)': { animation: 'none' },
  },
})

export const heroTitle = style([sectionTitle])

export const heroDescription = style({
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
  marginBottom: '-4rem',
  borderRadius: '2.5rem',
  border: `0.5rem solid ${vars.palette.grey900}`,
  backgroundImage: `linear-gradient(180deg, ${vars.palette.orange50}, ${vars.bg.base})`,
  boxShadow: CARD_SHADOW,
  animation: `${fadeUp} 0.8s 0.2s ease-out both`,
  '@media': {
    '(prefers-reduced-motion: reduce)': { animation: 'none' },
  },
})

/* ② 메뉴 카드 */

export const menuSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '3rem',
  padding: `calc(${SECTION_SPACE} + 4rem) ${GUTTER} ${SECTION_SPACE}`,
  backgroundImage: `radial-gradient(50% 50% at 50% 70%, ${vars.palette.orange50}, transparent)`,
})

export const menuCards = style({
  display: 'flex',
  justifyContent: 'center',
  margin: 0,
  padding: 0,
  listStyle: 'none',
})

const CARD_TILTS = ['rotate(-12deg) translateY(1.5rem)', 'rotate(-6deg)', 'translateY(-0.75rem)', 'rotate(6deg)', 'rotate(12deg) translateY(1.5rem)']

export const menuCard = style({
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
  selectors: Object.fromEntries(CARD_TILTS.map((transform, i) => [`&:nth-child(${i + 1})`, { transform }])),
  '@media': {
    [breakpoint.desktop]: { width: '9rem', marginInline: '-0.75rem', padding: '1.25rem' },
  },
})

export const menuLabel = style({
  fontSize: vars.font.st13.size,
  lineHeight: vars.font.st13.lineHeight,
  color: vars.text.secondary,
})

export const menuName = style({
  fontSize: vars.font.t6.size,
  lineHeight: vars.font.t6.lineHeight,
  fontWeight: vars.weight.bold,
  '@media': {
    [breakpoint.desktop]: { fontSize: vars.font.t4.size, lineHeight: vars.font.t4.lineHeight },
  },
})

/* ③ 단계 카드 */

export const stepSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '3rem',
  padding: `${SECTION_SPACE} ${GUTTER}`,
  backgroundColor: vars.bg.grey,
})

export const stepList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  maxWidth: WIDE_MAX,
  margin: 0,
  padding: 0,
  listStyle: 'none',
})

export const stepCard = style({
  display: 'grid',
  gap: '1.5rem',
  padding: '2rem 1.5rem',
  borderRadius: CARD_RADIUS,
  backgroundColor: vars.bg.layered,
  boxShadow: CARD_SHADOW,
  '@media': {
    [breakpoint.desktop]: { gridTemplateColumns: '1fr 1.4fr', alignItems: 'center', padding: '3rem' },
  },
})

export const stepText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
})

export const stepLabel = style({
  fontSize: vars.font.t7.size,
  lineHeight: vars.font.t7.lineHeight,
  fontWeight: vars.weight.bold,
  color: vars.brand.primary,
})

export const stepTitle = style({
  margin: 0,
  fontSize: vars.font.t3.size,
  lineHeight: vars.font.t3.lineHeight,
  fontWeight: vars.weight.bold,
})

export const stepDescription = style({
  margin: 0,
  fontSize: vars.font.t6.size,
  lineHeight: vars.font.t6.lineHeight,
  color: vars.text.secondary,
})

export const screenSlot = style({
  aspectRatio: '4 / 3',
  borderRadius: '1rem',
  backgroundImage: `linear-gradient(135deg, ${vars.palette.orange50}, ${vars.palette.grey50})`,
})

/* ④ 마지막 CTA, ⑤ 푸터 */

export const finalCta = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem',
  padding: `calc(${SECTION_SPACE} * 1.5) ${GUTTER}`,
  backgroundColor: vars.palette.grey900,
  backgroundImage: `radial-gradient(50% 60% at 50% 100%, ${vars.palette.orange900}, transparent)`,
  textAlign: 'center',
})

export const finalTitle = style([sectionTitle, { color: vars.text.inverse }])

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

export const footerName = style({
  fontSize: vars.font.t4.size,
  lineHeight: vars.font.t4.lineHeight,
  fontWeight: vars.weight.bold,
  color: vars.text.inverse,
})
