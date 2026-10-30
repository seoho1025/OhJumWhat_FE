import { keyframes, style } from '@vanilla-extract/css'
import { vars } from '../../../shared/ui'

// shortcut: 간격·둥글기·그림자 토큰이 없어 랜딩 안에서만 쓰는 값, 토큰이 정해지면 교체 (D-027)
// 4px 단위 간격, 키는 px 값 (SPACE[16] = 16px)
export const SPACE = {
  4: '0.25rem',
  8: '0.5rem',
  12: '0.75rem',
  16: '1rem',
  20: '1.25rem',
  24: '1.5rem',
  32: '2rem',
  48: '3rem',
  64: '4rem',
  96: '6rem',
} as const

export const GUTTER = SPACE[20]
export const SECTION_SPACE = SPACE[96]
export const BLOCK_GAP = SPACE[48]
export const CONTENT_MAX = '48rem'
export const WIDE_MAX = '64rem'
export const CARD_RADIUS = '1.5rem'
export const CARD_SHADOW = `0 ${SPACE[12]} ${SPACE[32]} ${vars.palette.greyOpacity200}`
export const HAIRLINE = '1px'

// 히어로 목업이 다음 섹션으로 겹쳐 내려오는 길이, 다음 섹션 위쪽 여백에 같은 값을 더함
export const PHONE_OVERLAP = SPACE[64]

const ENTER_DURATION = '0.8s'

const fadeUp = keyframes({
  from: { opacity: 0, transform: `translateY(${SPACE[24]})` },
  to: { opacity: 1, transform: 'none' },
})

// 처음 열 때 아래에서 떠오름, 움직임 줄이기 설정이면 끔
// .css.ts는 함수를 내보낼 수 없어 객체로 내보내고, 지연은 쓰는 쪽에서 animationDelay로
export const enterAnimation = {
  animation: `${fadeUp} ${ENTER_DURATION} ease-out both`,
  '@media': {
    '(prefers-reduced-motion: reduce)': { animation: 'none' },
  },
}

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

// 큰 글자 3:1 기준을 넘는 orange800~900만 글자 그라데이션에 사용 (D-025, D-027)
export const accentLine = style([
  line,
  {
    backgroundImage: `linear-gradient(to right, ${vars.palette.orange900}, ${vars.palette.orange800})`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },
])
